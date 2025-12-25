import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { markPaymentPaid } from "@/services/payments.service";
import { getDueInfo } from "@/app/(tabs)/payment";
/**
 * 🔑 SAME PAYMENT LOGIC AS PAYMENT PAGE
 */


export default function MemberCard({
  member,
  onEdit,
  onDelete,
}: any) {
  const { status, emoji, color, lateFee } = getDueInfo(member);
  const dueDate = member.nextDueDate?.toDate?.();

  return (
    <View style={styles.card}>
      {/* LEFT INFO */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{member.name}</Text>
        <Text style={styles.phone}>{member.phone}</Text>

        {/* Payment Info */}
        <Text style={styles.date}>
          Next Due:{" "}
          {dueDate ? dueDate.toLocaleDateString() : "Not set"}
        </Text>

        <Text style={[styles.paymentStatus, { color }]}>
          {emoji} {status}
          {lateFee > 0 && ` (+₹${lateFee})`}
        </Text>
      </View>

      {/* RIGHT ACTIONS */}
      <View style={styles.actions}>
        {/* ✅ ADMIN PAYMENT CONTROL */}
        {status !== "PAID" && (
          <TouchableOpacity
            style={styles.payBtn}
            onPress={async () => {
              await markPaymentPaid({
                ...member,
                monthlyFee: member.monthlyFee + lateFee,
              });
            }}
          >
            <Ionicons name="cash" size={20} color="#16a34a" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create" size={22} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={22} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  phone: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  paymentStatus: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  payBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#ecfdf5",
  },
});
