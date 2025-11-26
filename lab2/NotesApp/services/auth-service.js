// src/services/auth-service.js
import { Account, ID } from "appwrite";
import client from "./appwrite-config";

class AuthService {
  constructor() {
    this.account = new Account(client);
  }

  // Create a new user account and automatically log them in
  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        // Automatically log in after account creation
        return await this.login(email, password);
      }

      return userAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  // Log in with email and password
  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Get the current logged in user
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      // User is not logged in
      return null;
    }
  }

  // Log out the current user
  async logout() {
    try {
      await this.account.deleteSession("current");
      return { success: true };
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

// Export a single instance
const authService = new AuthService();
export default authService;
