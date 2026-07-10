import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../constants/colors";

const MENU = [
  { key: "PracticeTest", label: "Practice Tests", icon: "📝", desc: "Chapter-wise practice papers" },
  { key: "Quiz", label: "Quiz", icon: "❓", desc: "Test yourself with quick quizzes" },
  { key: "Tutorials", label: "Tutorials", icon: "🎥", desc: "Video lessons by subject" },
  { key: "Workbook", label: "Workbook", icon: "📘", desc: "Downloadable worksheets" },
  { key: "WhatsApp", label: "WhatsApp Chat", icon: "💬", desc: "Chat with KirtiClasses" },
  { key: "Contact", label: "Contact Us", icon: "✉️", desc: "Send us your query" },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KirtiClasses</Text>
          <Text style={styles.headerSubtitle}>Learning Made Simple By Kirti Ganguly</Text>
           <Link href="www.kirticlasses.in" style={styles.linkText}>www.kirticlasses.in</Link>
        </View>
        <View style={styles.grid}>
          {MENU.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.tile}
              onPress={() => navigation.navigate(item.key)}
            >
              <Text style={styles.tileIcon}>{item.icon}</Text>
              <Text style={styles.tileLabel}>{item.label}</Text>
              <Text style={styles.tileDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.adminLink} onPress={() => navigation.navigate("AdminLogin")}>
          <Text style={styles.adminLinkText}>Admin Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: { backgroundColor: COLORS.primary, padding: 24, paddingTop: 32, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { color: COLORS.white, fontSize: 26, fontWeight: "800" },
  headerSubtitle: { color: "#E0EAFF", marginTop: 4, fontSize: 13 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 16 },
  tile: {
    width: "47%",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tileIcon: { fontSize: 28, marginBottom: 8 },
  tileLabel: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  tileDesc: { fontSize: 12, color: COLORS.muted, marginTop: 4 },
  adminLink: { alignItems: "center", paddingVertical: 20 },
  adminLinkText: { color: COLORS.muted, fontSize: 12, textDecorationLine: "underline" },
});
