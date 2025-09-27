import os

from appwrite.client import Client
from appwrite.id import ID
from appwrite.query import Query
from appwrite.services.tables_db import TablesDB

from .corn_moisture_prediction import measurements_to_scored_samples_by_scanner
from .trinami_api import get_new_measurements


def main(context):
    # Configure client
    user_client = (
        Client()
        .set_endpoint(os.environ['APPWRITE_FUNCTION_API_ENDPOINT'])
        .set_project(os.environ['APPWRITE_FUNCTION_PROJECT_ID'])
    )

    # Check JWT to authorize user
    if 'x-appwrite-user-jwt' in context.req.headers:
        user_client.set_jwt(context.req.headers['x-appwrite-user-jwt'])
    else:
        context.error('Access Denied: User is not authorized, no JWT provided')
        return context.res.json({
            'error': True,
            'status': 'Access Denied',
            'message': 'User is not authorized',
            'data': None
        })

    # Only allow these endpoints
    if context.req.path == "/ping":
        return context.res.json({
            'error': False,
            'status': 'Success',
            'message': 'Ping is good',
            'data': None
        })
    elif context.req.path == "/updateDatabase":
        # Only allow POST method
        if context.req.method == 'POST':
            try:
                is_dev = True
                use_trinami_api = False

                # Get the list of scanners to return
                scanners_list = context.req.body_json['scanners']

                # Get the last updated datetime and last update sample ids (in case of incomplete samples now completed)
                if is_dev:
                    last_updated = {
                        'lastUpdated': '2025-09-06T16:30:00.000+00:00',
                        'sampleIDs': ['a5fe5007-4d51-4255-9a76-51493a6b8a14']
                    }
                else:
                    # Configure admin client
                    admin_client = (
                        Client()
                        .set_endpoint(os.environ['APPWRITE_FUNCTION_API_ENDPOINT'])
                        .set_project(os.environ['APPWRITE_FUNCTION_PROJECT_ID'])
                        .set_key(context.req.headers["x-appwrite-key"])
                    )

                    admin_tablesDB = TablesDB(admin_client)
                    last_updated = admin_tablesDB.get_row(
                        os.environ['APPWRITE_DATABASE_ID'],
                        table_id='updates',
                        row_id='lastUpdate'
                    )

                context.log(last_updated['lastUpdated'])

                # Get the new measurements from TrinamiX
                new_measurements = get_new_measurements(last_updated['lastUpdated'], last_updated['sampleIDs'], is_dev=is_dev, use_trinami_api=use_trinami_api)
               
                context.log('Done getting measurements')

                # Group the new measurements by sample, average their spectra, score them, and group the resulting samples by scanner
                new_samples_by_scanner, new_last_updated, new_sample_ids = measurements_to_scored_samples_by_scanner(new_measurements)
                
                context.log('Done scoring measurements')

                # Update the database
                if is_dev:
                    sample_by_scanner_with_db_info = {}
                    for scanner_id, scanner_samples in new_samples_by_scanner.items():
                        sample_by_scanner_with_db_info[scanner_id] = []
                        for new_sample in scanner_samples:
                            sample_by_scanner_with_db_info[scanner_id].append({
                                **new_sample,
                                "$id": ID.unique(),
                                "$permissions":[],
                                "$createdAt":"2025-09-27T12:19:28.986+00:00",
                                "$updatedAt":"2025-09-27T12:19:28.986+00:00",
                                "$sequence":7,
                                "$databaseId":"689261e7001977746c1f",
                                "$tableId":"samples"
                            })

                    context.log('1')
                    context.log('New samples: ', sample_by_scanner_with_db_info)
                    context.log('2')
                    context.log('New last_updated: ', new_last_updated)
                    context.log('3')
                    context.log('New sample ids: ', new_sample_ids)
                    context.log('4')
                else:
                    # Update last updated datetime and sample ids
                    admin_tablesDB.update_row(
                        os.environ['APPWRITE_DATABASE_ID'],
                        table_id='updates',
                        row_id=last_updated['$id'],
                        data={
                            'lastUpdated': new_last_updated,
                            'sampleIDs': new_sample_ids
                        }
                    )

                    # Loop all samples scored in this execution updating db and adding db info to the return
                    sample_by_scanner_with_db_info = {}
                    for scanner_id, scanner_samples in new_samples_by_scanner.items():
                        sample_by_scanner_with_db_info[scanner_id] = []
                        for new_sample in scanner_samples:
                            # If the sample was updated, update the corresponding row in the samples table
                            # Otherwise create a new sample row
                            if new_sample['sampleID'] in last_updated['sampleIDs']:
                                result = admin_tablesDB.list_rows(
                                    os.environ['APPWRITE_DATABASE_ID'],
                                    table_id='samples',
                                    queries=[Query.equal('sampleID', new_sample['sampleID'])]
                                )
                                old_row_id = result['rows'][0]['$id']
                                db_sample = admin_tablesDB.update_row(
                                    os.environ['APPWRITE_DATABASE_ID'],
                                    table_id='samples',
                                    row_id=old_row_id,
                                    data=new_sample
                                )
                            else:
                                db_sample = admin_tablesDB.create_row(
                                    os.environ['APPWRITE_DATABASE_ID'],
                                    table_id='samples',
                                    data=new_sample
                                )
                            sample_by_scanner_with_db_info[scanner_id].append(db_sample)

                # Send the new data back for the scanners requested
                results = { scanner_id: scanner_data for scanner_id, scanner_data in sample_by_scanner_with_db_info.items() if scanner_id in scanners_list }
                return context.res.json({
                    'error': False,
                    'status': 'Success',
                    'message': 'Updated scanners for user successfully',
                    'data': results
                })
            except Exception as err:
                context.error("Error Updating Database: " + repr(err))
                return context.res.json({
                    'error': True,
                    'status': 'Error Updating Database',
                    'message': 'If this error persists please contact be99@cornell.edu for assistance',
                    'data': None
                })
        else:
            context.error('Invalid method: Missing requested scanners')
            return context.res.json({
                'error': True,
                'status': 'Invalid method',
                'message': 'Missing requested scanners',
                'data': None
            })
    elif context.req.path == "/runAppwriteTestsCreateDelete":
        try:
            context.log('1')
            # Configure admin client and database connection
            admin_client = (
                Client()
                .set_endpoint(os.environ['APPWRITE_FUNCTION_API_ENDPOINT'])
                .set_project(os.environ['APPWRITE_FUNCTION_PROJECT_ID'])
                .set_key(context.req.headers["x-appwrite-key"])
            )
            admin_tablesDB = TablesDB(admin_client)
            context.log('2')

            test_row = {
                'sampleID': 'test-row-xxxxxxxxxxxxxxxxxxxxxxxxxxx',
                'measurementIds': [],
                'timestamp': '2025-09-06T16:30:00.000+00:00',
                'modelResult': 2
            }

            row_id = ID.unique()

            create_return = admin_tablesDB.create_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='samples',
                row_id=row_id,
                data=test_row
            )

            context.log(create_return)

            admin_tablesDB.delete_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='samples',
                row_id=row_id
            )

            context.log('done')
            return context.res.json({ 'good': 'ok' })
        except Exception as err:
            context.error(err)
            return context.res.json({
                'error': True,
                'status': 'Error in appwrite tests',
                'message': '',
                'data': None
            })
    elif context.req.path == "/runAppwriteTests":
        try:
            context.log('1')
            # Configure admin client and database connection
            admin_client = (
                Client()
                .set_endpoint(os.environ['APPWRITE_FUNCTION_API_ENDPOINT'])
                .set_project(os.environ['APPWRITE_FUNCTION_PROJECT_ID'])
                .set_key(context.req.headers["x-appwrite-key"])
            )
            admin_tablesDB = TablesDB(admin_client)
            context.log('2')

            # Get row from last updated
            last_updated = admin_tablesDB.get_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='updates',
                row_id='lastUpdate'
            )
            # Test the results
            last_updated_datetime_matches = last_updated['lastUpdated'] == '2025-09-06T16:30:00.000+00:00'
            last_updated_sample_ids_match = set(last_updated['sampleIDs']) == set(['xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1','xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2'])
            context.log('3')

            # Test updating row
            admin_tablesDB.update_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='updates',
                row_id='lastUpdate',
                data={
                    'lastUpdated': '2025-01-01T01:01:01.010+00:00',
                    'sampleIDs': ['xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3']
                }
            )
            context.log('4')

            # Get updated row from last updated
            updated_last_updated = admin_tablesDB.get_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='updates',
                row_id='lastUpdate'
            )
            # Test the updated results
            updated_last_updated_datetime_matches = updated_last_updated['lastUpdated'] == '2025-01-01T01:01:01.010+00:00'
            updated_last_updated_sample_ids_match = set(updated_last_updated['sampleIDs']) == set(['xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3'])
            context.log('5')

            # Reset last updated
            admin_tablesDB.update_row(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='updates',
                row_id='lastUpdate',
                data={
                    'lastUpdated': '2025-09-06T16:30:00.000+00:00',
                    'sampleIDs': ['xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1','xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2']
                }
            )
            context.log('6')

            # Test getting a specific sample
            result = admin_tablesDB.list_rows(
                os.environ['APPWRITE_DATABASE_ID'],
                table_id='samples',
                queries=[Query.equal('sampleID', 'update-this-sample-xxxxxxxxxxxxxxxx1')]
            )
            context.log(result)
            correct_row = len(result['rows']) == 1 and result['rows'][0]['$id'] == 'update-this-sample-id-xxxxxxxxxxxxx1' and result['rows'][0]['modelResult'] == 9
            context.log('7')

            return context.res.json({
                'error': False,
                'status': 'Tests complete',
                'message': 'Tests complete',
                'data': {
                    'last_updated_datetime_matches': 'pass' if last_updated_datetime_matches else 'fail',
                    'last_updated_sample_ids_match': 'pass' if last_updated_sample_ids_match else 'fail',
                    'updated_last_updated_datetime_matches': 'pass' if updated_last_updated_datetime_matches else 'fail',
                    'updated_last_updated_sample_ids_match': 'pass' if updated_last_updated_sample_ids_match else 'fail',
                    'correct_row': 'pass' if correct_row else 'fail'
                }
            })
        except Exception as err:
            context.error(err)
            return context.res.json({
                'error': True,
                'status': 'Error in appwrite tests',
                'message': '',
                'data': None
            })
    elif context.req.path == "/runTrinamiTests":
        try:
            import json

            import requests

            token_response = requests.post(
                'https://nirs.trinamixsensing.com/api/general/oauth/v2.0/token',
                json={
                'client_id': os.environ['TRINAMI_CLIENT_ID'],
                'client_secret': os.environ['TRINAMI_CLIENT_SECRET']
                }
            )
            token = json.loads(token_response.text)
            context.log('1')

            measurements_response = requests.post(
                f'https://nirs.trinamixsensing.com/api/organization/dataScience/measurements?PageNumber=1&PageSize=100&IncludeSpectra=true',
                headers={
                    'Authorization': f'Bearer {token["access_token"]}',
                    'Api-Version': '11.0',
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                json={
                    'after': '2025-09-06T17:31:30.000+00:00',
                    'before': '2025-09-06T17:31:40.000+00:00'
                }
            )
            measurements_results = json.loads(measurements_response.text)
            new_measurements = measurements_results['data']
            context.log('2')

            expected_sample_id = '33becb75-35af-4fc0-969b-5f2936f43d6a'
            expected_device_id = 'P200020218'

            correct_og_length = len(new_measurements) == 2
            correct_measurement_ids = set([m['measurementId'] for m in new_measurements]) == set([5972083, 5972084])
            correct_sample_ids = new_measurements[0]['sampleIdentity'] == expected_sample_id and new_measurements[1]['sampleIdentity'] == expected_sample_id
            correct_device_ids = new_measurements[0]['deviceIdentity'] == expected_device_id and new_measurements[1]['deviceIdentity'] == expected_device_id
            context.log('3')

            redo_measurements = []
            fetched_sample_ids = []
            # Loop measurements checking their sample ids against the sample ids from the last update
            #   If they match then get all of the measurements for that sample id and add them to the return
            #   This will allow the full samples to be scored later
            for measurement in new_measurements:
                if measurement['sampleIdentity'] in [expected_sample_id] and measurement['sampleIdentity'] not in fetched_sample_ids:
                    response = requests.post(
                        f'https://nirs.trinamixsensing.com/api/organization/dataScience/measurements?IncludeSpectra=true',
                        headers={
                        'Authorization': f'Bearer {token["access_token"]}',
                        'Api-Version': '11.0',
                        'accept': '*/*',
                        'Content-Type': 'application/json'
                        },
                        json={
                        'sampleIdentity': measurement['sampleIdentity']
                        }
                    )
                    sample_fetch_results = json.loads(response.text)
                    
                    redo_measurements += [s for s in sample_fetch_results['data'] if s['deviceIdentity'] == measurement['deviceIdentity']]
                    fetched_sample_ids.append(measurement['sampleIdentity'])
            new_measurements += redo_measurements
            context.log('4')

            fetched_list_correct = set(fetched_sample_ids) == set([expected_sample_id])
            correct_all_length = len(new_measurements) == 5
            context.log(len(new_measurements))
            context.log(set([m['measurementId'] for m in new_measurements]))
            correct_all_measurement_ids = set([m['measurementId'] for m in new_measurements]) == set([5972086,5972085,5972084,5972083,5972082])
            context.log('5')
            
            return context.res.json({
                'error': False,
                'status': 'Tests complete',
                'message': 'Tests complete',
                'data': {
                    'correct_og_length': 'pass' if correct_og_length else 'fail',
                    'correct_measurement_ids': 'pass' if correct_measurement_ids else 'fail',
                    'correct_sample_ids': 'pass' if correct_sample_ids else 'fail',
                    'correct_device_ids': 'pass' if correct_device_ids else 'fail',
                    'fetched_list_correct': 'pass' if fetched_list_correct else 'fail',
                    'correct_all_length': 'pass' if correct_all_length else 'fail',
                    'correct_all_measurement_ids': 'pass' if correct_all_measurement_ids else 'fail'
                }
            })
        except Exception as err:
            context.error(err)
            return context.res.json({
                'error': True,
                'status': 'Error in trinami tests',
                'message': '',
                'data': None
            })
    else:
        context.error(f'Invalid Endpoint: {context.req.path}')
        return context.res.json({
            'error': True,
            'status': 'Invalid Endpoint',
            'message': f'{context.req.path} is not a valid endpoint',
            'data': None
        })
    













# To impersonate user: --user-id <user-id>
#   fake1@email.com = 689e3b6f000c3e185d6f
#   fake2@email.com = 689baa2b00025add1ad2
#   eck_ben@yahoo.com = 689267890026a49a66ea

'''
### Scanner
{
    "scannerID": "P000000002",
    "lastSampleUpdate": "2025-08-31 12:12:12.012",
    "$id": "68989785001ddfe0bac8",
    "$sequence": 1,
    "$createdAt": "2025-08-10T12:58:45.546+00:00",
    "$updatedAt": "2025-08-31T13:37:57.667+00:00",
    "$permissions": [],
    "samples": [
        {
            "modelResult": 2,
            "timestamp": "2025-08-01T12:12:12.121+00:00",
            "measurementIds": [
            5330707,
            5330706
            ],
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx1",
            "$id": "68989a6f0010bcd4fb61",
            "$sequence": 3,
            "$createdAt": "2025-08-10T13:11:11.337+00:00",
            "$updatedAt": "2025-08-10T14:13:21.827+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
        }
    ],
    "$databaseId": "689261e7001977746c1f",
    "$collectionId": "scanners"
}

### Measurement
{
  "identity": "8d12d90d-0901-4bea-a3d4-6ff20d7e406b",
  "userIdentity": "2b90b37d-45de-4328-9f7e-7ccacd421189",
  "deviceIdentity": "P200020218",
  "deviceTypeIdentity": "SYS-IR-R-P2.0",
  "deviceModel": "PAL Two",
  "sampleIdentity": "a5fe5007-4d51-4255-9a76-51493a6b8a14",
  "calibrationIdentity": "a058eee7-a207-4aae-944f-dfb2b8e2be20",
  "campaignIdentity": "dd0667aa-268e-42b7-90b7-7264a2320c12",
  "wasTakenOffline": false,
  "spectra": [
    {
      "x": [],
      "y": [],
      "xlabel": "Wavelength [nm]",
      "ylabel": "-log(R)"
    }
  ],
  "metadata": [
    {
      "type": "string",
      "source": "SSF",
      "name": "Version",
      "value": "0.5.14"
    },
    {
      "type": "integer",
      "name": "DeviceIntegrationTime",
      "value": "2",
      "unit": "s"
    }
  ],
  "measurementId": 5971973,
  "timestamp": "2025-09-06T16:31:35.409565+00:00"
}
'''