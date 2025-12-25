import { View, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { addMember } from "@/services/member.service";

export default function AddMember() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fee, setFee] = useState("");
  const router = useRouter();

  const handleAdd = async () => {
    console.log("ADD MEMBER CLICKED");
  
    console.log("DATA:", {
      name,
      phone,
      monthlyFee: Number(fee),
      status: "active",
    });
  
    try {
      const result = await addMember({
        name,
        phone,
        monthlyFee: Number(fee),
        status: "active",
      });
  
      console.log("MEMBER ADDED SUCCESS:", result);
  
      router.back();
    } catch (error) {
      console.log("ADD MEMBER ERROR:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} onChangeText={setName} />
      <TextInput placeholder="Phone" style={styles.input} onChangeText={setPhone} />
      <TextInput
        placeholder="Monthly Fee"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setFee}
      />
      <Button title="Add Member" onPress={handleAdd} />
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
