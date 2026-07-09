import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../constants/colors";

export default function AdminLoginScreen({ navigation }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (login(username, password)) {
      navigation.replace("AdminDashboard");
    } else {
      Alert.alert("Login failed", "Incorrect username or password.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Login</Text>
        <Text style={styles.subtitle}>Manage quizzes, tutorials & workbooks</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
