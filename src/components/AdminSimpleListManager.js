import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import ClassSelector from "./ClassSelector";
import { subscribeToCollection, addItem, updateItem, deleteItem } from "../services/firestoreService";
import { COLORS } from "../constants/colors";

// Generic admin CRUD manager for collections shaped like:
// { classLevel, subject, title, url }
// Used for: Practice Tests, Tutorials, Workbook.
export default function AdminSimpleListManager({ collectionName, screenTitle, urlLabel }) {
  const [classLevel, setClassLevel] = useState("6");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToCollection(collectionName, classLevel, (data, error) => {
      if (error) Alert.alert("Error", error.message);
      setItems(data);
      setLoading(false);
    });
    return unsub;
  }, [classLevel]);

  const resetForm = () => {
    setSubject("");
    setTitle("");
    setUrl("");
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!subject.trim() || !title.trim() || !url.trim()) {
      Alert.alert("Missing fields", "Please fill in subject, title, and link.");
      return;
    }
    try {
      const data = { classLevel, subject, title, url };
      if (editingId) {
        await updateItem(collectionName, editingId, data);
      } else {
        await addItem(collectionName, data);
      }
      resetForm();
    } catch (e) {
      Alert.alert("Save failed", e.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setSubject(item.subject || "");
    setTitle(item.title || "");
    setUrl(item.url || "");
  };

  const handleDelete = (item) => {
    Alert.alert("Delete", `Remove "${item.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteItem(collectionName, item.id);
          } catch (e) {
            Alert.alert("Delete failed", e.message);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>{screenTitle}</Text>
            <ClassSelector selected={classLevel} onSelect={setClassLevel} />

            <View style={styles.form}>
              <TextInput style={styles.input} placeholder="Subject (e.g. Mathematics)" value={subject} onChangeText={setSubject} />
              <TextInput style={styles.input} placeholder="Title (e.g. Chapter 3 - Fractions)" value={title} onChangeText={setTitle} />
              <TextInput style={styles.input} placeholder={urlLabel} value={url} onChangeText={setUrl} autoCapitalize="none" />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{editingId ? "Update" : "Add"} for Class {classLevel}</Text>
              </TouchableOpacity>
              {editingId && (
                <TouchableOpacity onPress={resetForm}>
                  <Text style={styles.cancelText}>Cancel editing</Text>
                </TouchableOpacity>
              )}
            </View>

            {loading && <ActivityIndicator style={{ marginTop: 20 }} color={COLORS.primary} />}
          </View>
        }
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.subject}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconBtn}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>Nothing added yet for Class {classLevel}.</Text>}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  title: { fontSize: 20, fontWeight: "800", color: COLORS.text, padding: 16, paddingBottom: 0 },
  form: { paddingHorizontal: 16, paddingTop: 12 },
  input: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, marginBottom: 10 },
  button: { backgroundColor: COLORS.primary, borderRadius: 10, padding: 14, alignItems: "center" },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  cancelText: { textAlign: "center", color: COLORS.muted, marginTop: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rowTitle: { fontWeight: "700", color: COLORS.text },
  rowSubtitle: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  iconBtn: { paddingHorizontal: 8 },
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 30 },
});
