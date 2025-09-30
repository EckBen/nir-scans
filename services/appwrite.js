import { Platform } from "react-native";
import { Account, Client, Databases, Functions } from "react-native-appwrite";

const config = {
  stub: true,
  stubPause: 2000,
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  functionId: process.env.EXPO_PUBLIC_APPWRITE_FUNCTION_ID,
  dbId: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  collIds: {
    users: process.env.EXPO_PUBLIC_APPWRITE_COL_USERS,
    scanners: process.env.EXPO_PUBLIC_APPWRITE_COL_SCANNERS,
    samples: process.env.EXPO_PUBLIC_APPWRITE_COL_SAMPLES,
    fields: process.env.EXPO_PUBLIC_APPWRITE_COL_FIELDS,
    plants: process.env.EXPO_PUBLIC_APPWRITE_COL_PLANTS
  },
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

switch(Platform.OS) {
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
    break;
  case 'andriod':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
    break;
}

const database = new Databases(client);

const account = new Account(client);

const functions = new Functions(client);

export { account, client, config, database, functions };

