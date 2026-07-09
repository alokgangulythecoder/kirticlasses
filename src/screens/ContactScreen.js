import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { COLORS } from "../constants/colors";
import { CONTACT_EMAIL } from "../constants/classes";

// This screen opens the phone's email app pre-filled with the message.
// If you'd rather send messages silently without opening an email app,
// swap sendViaMailto() for a call to Formspree / EmailJS (see README).
export default function ContactScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendViaMailto = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      Alert.alert("Missing info", "Please fill in name, email, and message.");
      return;
    }
    const subject = encodeURIComponent(`KirtiClasses enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const url = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("No email app found", "Please install an email app to send your message.")
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Send us a message and we'll get back to you.</Text>

        <Text style={styles.label}>Your Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full name" />

        <Text style={styles.label}>Your Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={message}
          onChangeText={setMessage}
          placeholder="How can we help?"
          multiline
          numberOfLines={5}
        />

        <TouchableOpacity style={styles.button} onPress={sendViaMailto}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.text },
  subtitle: { fontSize: 13, color: COLORS.muted, marginTop: 4, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: "700", color: COLORS.text, marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
  },
  textArea: { height: 110, textAlignVertical: "top" },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: { color: COLORS.white, fontWeight: "700" },
});
