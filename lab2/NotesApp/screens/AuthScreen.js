// src/screens/AuthScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const AuthScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { login, register, isAuthenticated, loading } = useAuth();

  // Redirect to Home if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigation.replace("Home");
    }
  }, [isAuthenticated, loading, navigation]);

  const handleSubmit = async () => {
    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (!isLogin && !name.trim()) {
      setErrorMessage("Name is required for registration.");
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      let result;

      if (isLogin) {
        // Login
        result = await login(email, password);
      } else {
        // Register
        result = await register(email, password, name);
      }

      if (result.success) {
        // Navigation will happen automatically via useEffect
        navigation.replace("Home");
      } else {
        setErrorMessage(result.error);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.error("Auth error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage(null);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Notes App</Text>
            <Text style={styles.headerSubtitle}>
              {isLogin ? "Welcome Back!" : "Create Account"}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input (only for registration) */}
            {!isLogin && (
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#95a5a6"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                editable={!submitting}
              />
            )}

            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#95a5a6"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!submitting}
            />

            {/* Password Input */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#95a5a6"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!submitting}
            />

            {/* Error Message */}
            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, submitting && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {isLogin ? "Login" : "Register"}
                </Text>
              )}
            </TouchableOpacity>

            {/* Toggle Mode */}
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={toggleMode}
              disabled={submitting}
            >
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? Register"
                  : "Already have an account? Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#7f8c8d",
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#ecf0f1",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    color: "#2c3e50",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleButton: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#3498db",
    fontSize: 16,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default AuthScreen;
