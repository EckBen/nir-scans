import { ID } from "react-native-appwrite";

import asyncWithTimeout from "../utils/serviceHelpers";
import { account, config } from "./appwrite";

const userDataStub = {
  "$id": "689267890026a49a66ea",
  "$createdAt": "2025-08-05T20:20:25.710+00:00",
  "$updatedAt": "2025-08-14T20:03:39.859+00:00",
  "name": "Benjamin Eck",
  "registration": "2025-08-05T20:20:25.709+00:00",
  "status": true,
  "labels": [],
  "passwordUpdate": "2025-08-14T20:03:39.856+00:00",
  "email": "eck_ben@yahoo.com",
  "phone": "+16073517150",
  "emailVerification": false,
  "phoneVerification": false,
  "mfa": false,
  "prefs": {},
  "targets": [
    {
      "$id": "68926789eae4edf5cac9",
      "$createdAt": "2025-08-05T20:20:25.962+00:00",
      "$updatedAt": "2025-08-05T20:20:25.962+00:00",
      "name": "",
      "userId": "689267890026a49a66ea",
      "providerId": null,
      "providerType": "email",
      "identifier": "eck_ben@yahoo.com",
      "expired": false
    },
    {
      "$id": "68926789ee4593e174e7",
      "$createdAt": "2025-08-05T20:20:25.975+00:00",
      "$updatedAt": "2025-08-05T20:20:25.975+00:00",
      "name": "",
      "userId": "689267890026a49a66ea",
      "providerId": null,
      "providerType": "sms",
      "identifier": "+16073517150",
      "expired": false
    }
  ],
  "accessedAt": "2025-08-14 20:03:55.554"
};

const loginDataStub = {
  "$id": "689e412acc585b3370b7",
  "$createdAt": "2025-08-14T20:03:55.243+00:00",
  "$updatedAt": "2025-08-14T20:03:55.243+00:00",
  "userId": "689267890026a49a66ea",
  "expire": "2026-08-14T20:03:54.837+00:00",
  "provider": "email",
  "providerUid": "eck_ben@yahoo.com",
  "providerAccessToken": "",
  "providerAccessTokenExpiry": "",
  "providerRefreshToken": "",
  "ip": "2601:83:4200:2f60:a422:db35:bb1:4bea",
  "osCode": "AND",
  "osName": "Android",
  "osVersion": "11",
  "clientType": "browser",
  "clientCode": "SB",
  "clientName": "Samsung Browser",
  "clientVersion": "14.2",
  "clientEngine": "WebKit",
  "clientEngineVersion": "537.36",
  "deviceName": "smartphone",
  "deviceBrand": "Samsung",
  "deviceModel": "Galaxy S10",
  "countryCode": "us",
  "countryName": "United States",
  "current": true,
  "factors": [
    "password"
  ],
  "secret": "",
  "mfaUpdatedAt": ""
};

const authService = {
  // Register a user
  async register(email, password) {
    let registerResponse;
    if (config.stub) {
      await new Promise((res) => setTimeout(() => res(null), config.stubPause));
      registerResponse = { success: true };
    } else {
      registerResponse = await asyncWithTimeout(
        account.create(ID.unique(), email, password),
        undefined,
        'Registration failed. Please try again'
      );
    }
    return registerResponse;
  },
  // Login
  async login(email, password) {
    let loginData;
    if (config.stub) {
      await new Promise((res) => setTimeout(() => res(null), config.stubPause));
      loginData = loginDataStub;
    } else {
      loginData = await asyncWithTimeout(
        account.createEmailPasswordSession(email, password),
        undefined,
        'Login failed. Please check your credentials'
      );
    }
    return loginData;
  },
  // Get logged in user
  async getUser() {
    let userData;
    if (config.stub) {
      await new Promise((res) => setTimeout(() => res(null), config.stubPause));
      userData = userDataStub;
    } else {
      userData = await asyncWithTimeout(
        account.get(),
        undefined,
        'Failed to get user information. Please try again'
      );
    }
    return userData;
  },
  // Logout
  async logout() {
    if (config.stub) {
      await new Promise((res) => setTimeout(() => res(null), config.stubPause));
    } else {
      await asyncWithTimeout(
        account.deleteSession('current'),
        undefined,
        'Logout failed. Please try again'
      );
    }
  },
  // Create a JWT
  async createJwt() {
    try {
      const response = await asyncWithTimeout(account.createJWT());
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export default authService;