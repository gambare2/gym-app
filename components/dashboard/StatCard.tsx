import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export default function StatCard({ title, value, icon, color }: Props) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Ionicons name={icon} size={28} color={color} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    margin: 8,
    borderLeftWidth: 5,
    elevation: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
