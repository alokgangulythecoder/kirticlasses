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
import ClassSelector from "../components/ClassSelector";
import { subscribeToCollection, addItem, updateItem, deleteItem } from "../services/firestoreService";
import { COLORS } from "../constants/colors";

const emptyQuestion = () => ({ question: "", options: ["", "", "", ""], correctIndex: 0 });

export default function AdminManageQuizScreen() {
  const [classLevel, setClassLevel] = useState("6");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToCollection("quizzes", classLevel, (data, error) => {
      if (error) Alert.alert("Error", error.message);
      setQuizzes(data);
      setLoading(false);
    });
    return unsub;
  }, [classLevel]);

  const resetForm = () => {
    setSubject("");
    setTitle("");
    setQuestions([emptyQuestion()]);
    setEditingId(null);
  };

  const updateQuestionField = (qIdx, field, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx] = { ...copy[qIdx], [field]: value };
      return copy;
    });
  };

  const updateOption = (qIdx, oIdx, value) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const opts = [...copy[qIdx].options];
      opts[oIdx] = value;
      copy[qIdx] = { ...copy[qIdx], options: opts };
      return copy;
    });
  };

  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeQuestion = (qIdx) =>
    setQuestions((prev) => prev.filter((_, i) => i !== qIdx));

  const handleSave = async () => {
    if (!subject.trim() || !title.trim()) {
      Alert.alert("Missing fields", "Please fill in subject and title.");
      return;
    }
    const invalid = questions.some(
      (q) => !q.question.trim() || q.options.some((o) => !o.trim())
    );
    if (invalid) {
      Alert.alert("Incomplete question", "Every question needs text and all 4 options filled in.");
      return;
    }
    try {
      const data = { classLevel, subject, title, questions };
      if (editingId) {
        await updateItem("quizzes", editingId, data);
      } else {
        await addItem("quizzes", data);
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
    setQuestions(item.questions && item.questions.length ? item.questions : [emptyQuestion()]);
  };

  const handleDelete = (item) => {
    Alert.alert("Delete", `Remove quiz "${item.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteItem("quizzes", item.id);
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
            <Text style={styles.title}>Manage Quizzes</Text>
            <ClassSelector selected={classLevel} onSelect={setClassLevel} />

            <View style={styles.form}>
              <TextInput style={styles.input} placeholder="Subject (e.g. Science)" value={subject} onChangeText={setSubject} />
              <TextInput style={styles.input} placeholder="Quiz title (e.g. Chapter 2 Quiz)" value={title} onChangeText={setTitle} />

              {questions.map((q, qIdx) => (
                <View key={qIdx} style={styles.questionBox}>
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionLabel}>Question {qIdx + 1}</Text>
                    {questions.length > 1 && (
                      <TouchableOpacity onPress={() => removeQuestion(qIdx)}>
                        <Text style={{ color: COLORS.danger }}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Question text"
                    value={q.question}
                    onChangeText={(v) => updateQuestionField(qIdx, "question", v)}
                  />
                  {q.options.map((opt, oIdx) => (
                    <View key={oIdx} style={styles.optionRow}>
                      <TouchableOpacity
                        style={[styles.radio, q.correctIndex === oIdx && styles.radioActive]}
                        onPress={() => updateQuestionField(qIdx, "correctIndex", oIdx)}
                      />
                      <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        placeholder={`Option ${oIdx + 1}`}
                        value={opt}
                        onChangeText={(v) => updateOption(qIdx, oIdx, v)}
                      />
                    </View>
                  ))}
                  <Text style={styles.hint}>Tap the circle to mark the correct answer.</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.addQuestionBtn} onPress={addQuestion}>
                <Text style={styles.addQuestionText}>+ Add another question</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>{editingId ? "Update" : "Save"} Quiz for Class {classLevel}</Text>
              </TouchableOpacity>
              {editingId && (
                <TouchableOpacity onPress={resetForm}>
                  <Text style={styles.cancelText}>Cancel editing</Text>
                </TouchableOpacity>
              )}
            </View>

            {loading && <ActivityIndicator style={{ marginTop: 20 }} color={COLORS.primary} />}
            <Text style={styles.listHeading}>Existing quizzes — Class {classLevel}</Text>
          </View>
        }
        data={quizzes}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>
                {item.subject} · {(item.questions || []).length} questions
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconBtn}>
              <Text>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={!loading && <Text style={styles.empty}>No quizzes yet for Class {classLevel}.</Text>}
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
  questionBox: { backgroundColor: "#FAFBFF", borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, padding: 12, marginBottom: 14 },
  questionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  questionLabel: { fontWeight: "700", color: COLORS.text },
  optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: COLORS.border, marginRight: 8 },
  radioActive: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  hint: { fontSize: 11, color: COLORS.muted },
  addQuestionBtn: { alignItems: "center", paddingVertical: 10, marginBottom: 12 },
  addQuestionText: { color: COLORS.primary, fontWeight: "700" },
  button: { backgroundColor: COLORS.primary, borderRadius: 10, padding: 14, alignItems: "center" },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  cancelText: { textAlign: "center", color: COLORS.muted, marginTop: 10 },
  listHeading: { fontWeight: "700", color: COLORS.text, paddingHorizontal: 16, marginTop: 10 },
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
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 10, marginBottom: 20 },
});
