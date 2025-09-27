import { Platform } from "react-native";
import { Account, Client, Databases, Functions } from "react-native-appwrite";

const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    users: process.env.EXPO_PUBLIC_APPWRITE_COL_USERS_ID,
    scanners: process.env.EXPO_PUBLIC_APPWRITE_COL_SCANNERS_ID,
    samples: process.env.EXPO_PUBLIC_APPWRITE_COL_SAMPLES_ID
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

