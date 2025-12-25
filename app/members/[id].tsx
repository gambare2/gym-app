import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateMember } from "@/services/member.service";

export default function EditMember() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleUpdate = async () => {
    await updateMember(id as string, { name, phone });
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Phone" style={styles.input} onChangeText={setPhone} />
      <Button title="Update Member" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
