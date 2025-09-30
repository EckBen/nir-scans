import { Query } from 'react-native-appwrite';

import asyncWithTimeout from '../utils/serviceHelpers';
import { config, database } from './appwrite';

const initDataStub = [
  {
    "authID": "689267890026a49a66ea",
    "$id": "6898967400037298f9bb",
    "$createdAt": "2025-08-10T12:54:12.130+00:00",
    "$updatedAt": "2025-08-31T12:24:12.927+00:00",
    "$permissions": [
      "read(\"user:689267890026a49a66ea\")",
      "update(\"user:689267890026a49a66ea\")"
    ],
    "scanners": [
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
      },
      {
        "scannerID": "P000000001",
        "lastSampleUpdate": "2025-08-31 12:12:12.012",
        "$id": "6898981b002645e7a878",
        "$sequence": 2,
        "$createdAt": "2025-08-10T13:01:15.688+00:00",
        "$updatedAt": "2025-08-31T13:37:45.034+00:00",
        "$permissions": [],
        "samples": [
          {
            "modelResult": 0.2,
            "timestamp": "2025-08-09T12:12:12.121+00:00",
            "measurementIds": [
              5330711,
              5330712
            ],
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx3",
            "$id": "68989a0c002e5cd52eae",
            "$sequence": 1,
            "$createdAt": "2025-08-10T13:09:32.824+00:00",
            "$updatedAt": "2025-08-10T14:16:52.230+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          },
          {
            "modelResult": 1.12,
            "timestamp": "2025-08-04T12:12:12.121+00:00",
            "measurementIds": [
              5330708,
              5330709,
              5330710
            ],
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx2",
            "$id": "68989a3e0006d97d6e68",
            "$sequence": 2,
            "$createdAt": "2025-08-10T13:10:22.178+00:00",
            "$updatedAt": "2025-08-10T14:12:05.784+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          },
          {
            "modelResult": 6,
            "timestamp": "2025-08-10T02:02:02.020+00:00",
            "measurementIds": [],
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx5",
            "$id": "6898b392000f89319c13",
            "$sequence": 5,
            "$createdAt": "2025-08-10T14:58:26.326+00:00",
            "$updatedAt": "2025-08-10T14:58:26.326+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          }
        ],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "scanners"
      },
      {
        "scannerID": "P000000004",
        "lastSampleUpdate": "2025-08-31 12:12:12.012",
        "$id": "6898b2e2001c58ff00ba",
        "$sequence": 4,
        "$createdAt": "2025-08-10T14:55:30.515+00:00",
        "$updatedAt": "2025-08-31T13:36:40.618+00:00",
        "$permissions": [],
        "samples": [],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "scanners"
      }
    ],
    "fields": [
      {
        "fieldID": 1754834624331,
        "name": "Test Field 1",
        "$id": "6898a6ca0003dd396a6c",
        "$sequence": 1,
        "$createdAt": "2025-08-10T14:03:54.139+00:00",
        "$updatedAt": "2025-08-31T12:30:49.997+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "plants": [
          {
            "$id": "6898a6b800029d11d1dc",
            "$sequence": 3,
            "$createdAt": "2025-08-10T14:03:36.103+00:00",
            "$updatedAt": "2025-08-31T12:28:48.207+00:00",
            "$permissions": [
              "read(\"user:689267890026a49a66ea\")",
              "update(\"user:689267890026a49a66ea\")",
              "delete(\"user:689267890026a49a66ea\")"
            ],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "plants"
          },
          {
            "$id": "6898a6a50006f7b1eb40",
            "$sequence": 2,
            "$createdAt": "2025-08-10T14:03:17.182+00:00",
            "$updatedAt": "2025-08-31T12:29:00.141+00:00",
            "$permissions": [
              "read(\"user:689267890026a49a66ea\")",
              "update(\"user:689267890026a49a66ea\")",
              "delete(\"user:689267890026a49a66ea\")"
            ],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "plants"
          },
          {
            "$id": "6898a68b0006af48b4f5",
            "$sequence": 1,
            "$createdAt": "2025-08-10T14:02:51.209+00:00",
            "$updatedAt": "2025-08-31T12:29:13.072+00:00",
            "$permissions": [
              "read(\"user:689267890026a49a66ea\")",
              "update(\"user:689267890026a49a66ea\")",
              "delete(\"user:689267890026a49a66ea\")"
            ],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "plants"
          }
        ],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "fields"
      },
      {
        "fieldID": 1754834636516,
        "name": "Test Sub-Field 1",
        "$id": "6898a6e0002a04037911",
        "$sequence": 2,
        "$createdAt": "2025-08-10T14:04:16.746+00:00",
        "$updatedAt": "2025-08-31T12:30:31.666+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "plants": [
          {
            "$id": "6898a6b800029d11d1dc",
            "$sequence": 3,
            "$createdAt": "2025-08-10T14:03:36.103+00:00",
            "$updatedAt": "2025-08-31T12:28:48.207+00:00",
            "$permissions": [
              "read(\"user:689267890026a49a66ea\")",
              "update(\"user:689267890026a49a66ea\")",
              "delete(\"user:689267890026a49a66ea\")"
            ],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "plants"
          }
        ],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "fields"
      },
      {
        "fieldID": 1754837959229,
        "name": "Field without Plants",
        "$id": "6898b3d300246978268e",
        "$sequence": 4,
        "$createdAt": "2025-08-10T14:59:31.651+00:00",
        "$updatedAt": "2025-08-31T12:30:18.146+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "plants": [],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "fields"
      }
    ],
    "plants": [
      {
        "plantID": 1754834552473,
        "name": "Test Plant 1",
        "$id": "6898a68b0006af48b4f5",
        "$sequence": 1,
        "$createdAt": "2025-08-10T14:02:51.209+00:00",
        "$updatedAt": "2025-08-31T12:29:13.072+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "samples": [
          {
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx2",
            "$id": "68989a3e0006d97d6e68",
            "$sequence": 2,
            "$createdAt": "2025-08-10T13:10:22.178+00:00",
            "$updatedAt": "2025-08-10T14:12:05.784+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          },
          {
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx3",
            "$id": "68989a0c002e5cd52eae",
            "$sequence": 1,
            "$createdAt": "2025-08-10T13:09:32.824+00:00",
            "$updatedAt": "2025-08-10T14:16:52.230+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          }
        ],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "plants"
      },
      {
        "plantID": 1754834584873,
        "name": "Test Plant 2",
        "$id": "6898a6a50006f7b1eb40",
        "$sequence": 2,
        "$createdAt": "2025-08-10T14:03:17.182+00:00",
        "$updatedAt": "2025-08-31T12:29:00.141+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "samples": [
          {
            "sampleID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx3",
            "$id": "68989a0c002e5cd52eae",
            "$sequence": 1,
            "$createdAt": "2025-08-10T13:09:32.824+00:00",
            "$updatedAt": "2025-08-10T14:16:52.230+00:00",
            "$permissions": [],
            "$databaseId": "689261e7001977746c1f",
            "$collectionId": "samples"
          }
        ],
        "$databaseId": "689261e7001977746c1f",
        "$collectionId": "plants"
      },
      {
        "plantID": 1754834606198,
        "name": "Test Plant 3",
        "$id": "6898a6b800029d11d1dc",
        "$sequence": 3,
        "$createdAt": "2025-08-10T14:03:36.103+00:00",
        "$updatedAt": "2025-08-31T12:28:48.207+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "samples": [
          {
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
        "$collectionId": "plants"
      },
      {
        "plantID": 1754837991652,
        "name": "Plant without Field",
        "$id": "6898b406003aa9ade5fd",
        "$sequence": 5,
        "$createdAt": "2025-08-10T15:00:23.028+00:00",
        "$updatedAt": "2025-08-31T12:27:55.208+00:00",
        "$permissions": [
          "read(\"user:689267890026a49a66ea\")",
          "update(\"user:689267890026a49a66ea\")",
          "delete(\"user:689267890026a49a66ea\")"
        ],
        "samples": [
          {
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
        "$collectionId": "plants"
      }
    ],
    "$sequence": 0
  }
];

const databaseService = {
  // List documents
  async listDocuments(colName, queries=[]) {
    try {
      const response = await asyncWithTimeout(database.listDocuments(config.dbId, config.collIds[colName], queries));
      return { data: response.documents || [], error: null };
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      return { error: error.message };
    }
  },
  // Create Documents
  async createDocument(colName, data, id = null) {
    try {
      return await asyncWithTimeout(database.createDocument(config.dbId, config.collIds[colName], id || undefined, data));
    } catch (error) {
      console.error('Error creating document:', error.message);
      return { error: error.message };
    }
  },
  // Update Document
  async updateDocument(colName, id, data) {
    try {
      return await asyncWithTimeout(database.updateDocument(config.dbId, config.collIds[colName], id, data));
    } catch (error) {
      console.error('Error updating document:', error.message);
      return { error: error.message };
    }
  },
  // Delete Document
  async deleteDocument(colName, id) {
    try {
      await asyncWithTimeout(database.deleteDocument(config.dbId, config.collIds[colName], id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error.message);
      return { error: error.message };
    }
  },
  // Specialized function to get initial data from appwrite database
  async getInitData() {
    let initData;
    if (config.stub) {
      await new Promise((res) => setTimeout(() => res(null), config.stubPause));
      initData = initDataStub;
    } else {
      initData = await database.listDocuments(
        'users',
        [
          Query.select([
            'scanners.samples.*',
            'fields.plants.$id',
            'plants.samples.$id'
          ])
        ]
      );
    }
    return initData;
  }
};

export default databaseService;