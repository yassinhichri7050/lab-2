import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function HomeScreen({ navigation }) {
  const { user, isAuthenticated, loading } = useAuth();

  // Redirect to Auth if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.replace("Auth");
    }
  }, [loading, isAuthenticated, navigation]);

  // Set up the header with logout button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton navigation={navigation} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes App</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.name || "User"}!
        </Text>
        <Text style={styles.instructionText}>
          Keep your ideas, lists, and reminders in one place
        </Text>

        <TouchableOpacity
          style={styles.notesButton}
          onPress={() => navigation.navigate("Notes")}
        >
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 100,
    backgroundColor: "#3498db",
    justifyContent: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 18,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 40,
  },
  notesButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});