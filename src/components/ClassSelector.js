import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CLASSES } from "../constants/classes";
import { COLORS } from "../constants/colors";

export default function ClassSelector({ selected, onSelect }) {
  return (
    <View style={styles.row}>
      {CLASSES.map((c) => {
        const active = c === selected;
        return (
          <TouchableOpacity
            key={c}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(c)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              Class {c}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.text, fontWeight: "600" },
  chipTextActive: { color: COLORS.white },
});
