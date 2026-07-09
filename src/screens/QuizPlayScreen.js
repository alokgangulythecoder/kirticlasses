import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { COLORS } from "../constants/colors";

export default function QuizPlayScreen({ route, navigation }) {
  const { quiz } = route.params;
  const questions = quiz.questions || [];
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.empty}>This quiz has no questions yet.</Text>
      </SafeAreaView>
    );
  }

  const q = questions[current];

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Quiz Complete! 🎉</Text>
          <Text style={styles.resultScore}>
            You scored {score} / {questions.length}
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Back to Quizzes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.progress}>
          Question {current + 1} of {questions.length}
        </Text>
        <Text style={styles.question}>{q.question}</Text>
        {(q.options || []).map((opt, idx) => {
          let bg = COLORS.white;
          if (selected !== null) {
            if (idx === q.correctIndex) bg = "#DCFCE7";
            else if (idx === selected) bg = "#FEE2E2";
          }
          return (
            <TouchableOpacity
              key={idx}
              style={[styles.option, { backgroundColor: bg }]}
              onPress={() => handleSelect(idx)}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {selected !== null && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {current + 1 < questions.length ? "Next Question" : "Finish Quiz"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 40 },
  progress: { color: COLORS.muted, marginBottom: 8, fontWeight: "600" },
  question: { fontSize: 18, fontWeight: "700", color: COLORS.text, marginBottom: 16 },
  option: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  optionText: { fontSize: 15, color: COLORS.text },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: { color: COLORS.white, fontWeight: "700" },
  resultBox: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  resultTitle: { fontSize: 22, fontWeight: "800", color: COLORS.text, marginBottom: 8 },
  resultScore: { fontSize: 16, color: COLORS.muted, marginBottom: 24 },
});
