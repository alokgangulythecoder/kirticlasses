import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert, SafeAreaView } from "react-native";
import { COLORS } from "../constants/colors";
import { WHATSAPP_NUMBER } from "../constants/classes";

export default function WhatsAppScreen() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi KirtiClasses, I have a question about a course.");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("WhatsApp not found", "Please install WhatsApp to use this feature.")
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.icon}>💬</Text>
        <Text style={styles.title}>Chat with KirtiClasses</Text>
        <Text style={styles.subtitle}>
          Have a doubt or question? Message us directly on WhatsApp and our team will help you out.
        </Text>
        <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
          <Text style={styles.buttonText}>Open WhatsApp Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  icon: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: "800", color: COLORS.text, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.muted, textAlign: "center", marginBottom: 24 },
  button: { backgroundColor: "#25D366", paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10 },
  buttonText: { color: COLORS.white, fontWeight: "700", fontSize: 15 },
});
