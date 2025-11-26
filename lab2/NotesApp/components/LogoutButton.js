// src/components/LogoutButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const LogoutButton = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await logout();
              if (result.success) {
                // Navigation will happen automatically via AuthNavigator
                // but we can also explicitly navigate to be safe
                navigation.replace("Auth");
              } else {
                Alert.alert("Error", "Failed to logout. Please try again.");
              }
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "An error occurred during logout.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#e74c3c",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LogoutButton;
