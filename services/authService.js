import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

import asyncWithTimeout from "../utils/serviceHelpers";

const authService = {
  // Register a user
  async register(email, password) {
    return await asyncWithTimeout(
      account.create(ID.unique(), email, password),
      undefined,
      'Registration failed. Please try again'
    );
  },
  // Login
  async login(email, password) {
    return await asyncWithTimeout(
      account.createEmailPasswordSession(email, password),
      undefined,
      'Login failed. Please check your credentials'
    );
  },
  // Get logged in user
  async getUser() {
    return await asyncWithTimeout(
      account.get(),
      undefined,
      'Failed to get user information. Please try again'
    );
  },
  // Logout
  async logout() {
    await asyncWithTimeout(
      account.deleteSession('current'),
      undefined,
      'Logout failed. Please try again'
    );
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