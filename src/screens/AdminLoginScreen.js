import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../constants/colors";

export default function AdminLoginScreen({ navigation }) {
  const { login, isAdmin, initializing } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If a session is already active (persisted from last time), skip
  // straight to the dashboard instead of showing the form again.
  useEffect(() => {
    if (!initializing && isAdmin) {
      navigation.replace("AdminDashboard");
    }
  }, [initializing, isAdmin]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing info", "Please enter both email and password.");
      return;
    }
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      navigation.replace("AdminDashboard");
    } else {
      Alert.alert("Login failed", result.error);
    }
  };

  if (initializing) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <ActivityIndicator color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Login</Text>
        <Text style={styles.subtitle}>Manage quizzes, tutorials & workbooks</Text>

        <TextInput
          style={styles.input}
          placeholder="Admin email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          editable={!submitting}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          editable={!submitting}
        />
        <TouchableOpacity
          style={[styles.button, submitting && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.text, textAlign: "center" },
  subtitle: { fontSize: 13, color: COLORS.muted, textAlign: "center", marginBottom: 24 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: { backgroundColor: COLORS.primary, borderRadius: 10, padding: 14, alignItems: "center", marginTop: 8 },
  buttonText: { color: COLORS.white, fontWeight: "700" },
});
