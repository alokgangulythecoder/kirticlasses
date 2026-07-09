import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../constants/colors";

const SECTIONS = [
  { key: "AdminManagePracticeTests", label: "📝 Manage Practice Tests" },
  { key: "AdminManageQuiz", label: "❓ Manage Quizzes" },
  { key: "AdminManageTutorials", label: "🎥 Manage Tutorials" },
  { key: "AdminManageWorkbook", label: "📘 Manage Workbook" },
];

export default function AdminDashboardScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>
        {SECTIONS.map((s) => (
          <TouchableOpacity key={s.key} style={styles.item} onPress={() => navigation.navigate(s.key)}>
            <Text style={styles.itemText}>{s.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.item, styles.logout]}
          onPress={() => {
            logout();
            navigation.replace("Home");
          }}
        >
          <Text style={[styles.itemText, { color: COLORS.danger }]}>🚪 Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "800", color: COLORS.text, marginBottom: 20 },
  item: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemText: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  logout: { marginTop: 20, borderColor: "#FECACA" },
});
