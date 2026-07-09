import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import ClassSelector from "../components/ClassSelector";
import SubjectCard from "../components/SubjectCard";
import { subscribeToCollection } from "../services/firestoreService";
import { COLORS } from "../constants/colors";

export default function QuizScreen({ navigation }) {
  const [classLevel, setClassLevel] = useState("6");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = subscribeToCollection("quizzes", classLevel, (data, error) => {
      if (error) Alert.alert("Error loading quizzes", error.message);
      setItems(data);
      setLoading(false);
    });
    return unsub;
  }, [classLevel]);

  return (
    <View style={styles.container}>
      <ClassSelector selected={classLevel} onSelect={setClassLevel} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.primary} />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>No quizzes added yet for Class {classLevel}.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <SubjectCard
              title={item.title}
              subtitle={`${item.subject} · ${(item.questions || []).length} questions`}
              onPress={() => navigation.navigate("QuizPlay", { quiz: item })}
            />
          )}
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 40 },
});
