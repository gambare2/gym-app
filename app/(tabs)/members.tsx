import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import MemberCard from "@/components/members/MemberCard";
import { getMembers, deleteMember } from "@/services/member.service";

export default function MembersScreen() {
  const [members, setMembers] = useState<any[]>([]);
  const router = useRouter();

  const loadMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMembers();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* 🔹 Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Members</Text>
      </View>

      {/* 🔹 Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/members/add")}
      >
        <Text style={styles.addButtonText}>+ Add Member</Text>
      </TouchableOpacity>

      {/* 🔹 Members List */}
      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MemberCard
            member={item}
            onEdit={() => router.push(`/members/${item.id}`)}
            onDelete={async () => {
              await deleteMember(item.id);
              loadMembers();
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#2563eb",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  addButton: {
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    alignItems: "center",
    elevation: 2,
  },

  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
