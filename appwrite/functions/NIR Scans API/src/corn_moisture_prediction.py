import numpy as np

from .CornMoisturePredictor import apply


def measurements_to_scored_samples_by_scanner(measurements):
  # Group new measurements into samples
  samples = {}
  for measurement in measurements:
    # Extract measurement data
    sample_id = measurement['sampleIdentity']
    measurement_id = measurement['measurementId']
    timestamp = measurement['timestamp']
    scanner_id = measurement['deviceIdentity']

    # Create new sample if the id does not exist
    if sample_id not in samples:
      samples[sample_id] = {
        'scannerID': scanner_id,
        'sampleID': sample_id,
        'timestamp': None,
        'measurementIds': [],
        'spectra': []
      }
    
    # If this measurement id has not already been added then add it
    if measurement_id not in samples[sample_id]['measurementIds']:
      # Only keep the measurement id and y values from the spectra
      samples[sample_id]['measurementIds'].append(measurement_id)
      samples[sample_id]['spectra'].append(measurement['spectra'][0]['y'])
      
      # Update the timestamp to have the sample timestamp be the last measurement datetime
      if samples[sample_id]['timestamp'] == None or samples[sample_id]['timestamp'] < timestamp:
        samples[sample_id]['timestamp'] = timestamp
  
  # Process samples and group them by scanner
  last_updated = None
  new_samples_by_scanner = {}
  for sample_dict in samples.values():
    # Create spot for results
    if sample_dict['scannerID'] not in new_samples_by_scanner:
      new_samples_by_scanner[sample_dict['scannerID']] = []

    # Average the spectra measurements and calculate the model score
    sample_mean = np.array(sample_dict['spectra']).mean(axis=0)
    modelResult = apply(list(sample_mean))['yhat'][0][0]

    # Add the sample results
    new_samples_by_scanner[sample_dict['scannerID']].append({
      'modelResult': modelResult,
      'timestamp': sample_dict['timestamp'],
      'measurementIds': sample_dict['measurementIds'],
      'sampleID': sample_dict['sampleID'],
    })

    # Update the last updated timestamp
    if last_updated == None or last_updated < sample_dict['timestamp']:
      last_updated = sample_dict['timestamp']

  return new_samples_by_scanner, last_updated, samples.keys()