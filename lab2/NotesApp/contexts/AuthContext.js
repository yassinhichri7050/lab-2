// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/auth-service";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error checking current user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (email, password, name) => {
    try {
      const session = await authService.createAccount(email, password, name);
      
      // Get the current user after registration
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      return { success: true, data: session };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message || "Registration failed. Please try again.",
      };
    }
  };

  // Log in an existing user
  const login = async (email, password) => {
    try {
      const session = await authService.login(email, password);

      // Get the current user after login
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);

      return { success: true, data: session };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.message || "Login failed. Please check your credentials.",
      };
    }
  };

  // Log out the current user
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return {
        success: false,
        error: error.message || "Logout failed. Please try again.",
      };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
