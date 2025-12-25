import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import { getMembers } from "@/services/member.service";
import { markPaymentPaid } from "@/services/payments.service";
import getWhatsAppMessage from "@/services/whatsapp.service";

/**
 * 🔑 PAYMENT STATUS LOGIC
 * - PAID → only when admin marks paid
 * - UPCOMING → due within next 5 days
 * - GRACE → 1–5 days late (no fee)
 * - LATE → after grace period (₹50 fee)
 */
export function getDueInfo(member: any) {
  const today = new Date();
  const dueDate = member.nextDueDate?.toDate?.();

  if (!dueDate) {
    return { status: "UNKNOWN", emoji: "⚪", color: "#6b7280", lateFee: 0 };
  }

  // 🔑 Calculate the payment cycle that covers UNTIL dueDate
  const paidCycleDate = new Date(dueDate);
  paidCycleDate.setMonth(paidCycleDate.getMonth() - 1);
  const paidCycle = paidCycleDate.toISOString().slice(0, 7);

  // ✅ PAID if last payment covers this cycle
  if (member.lastPaidMonth === paidCycle) {
    return {
      status: "PAID",
      emoji: "✅",
      color: "#22c55e",
      lateFee: 0,
    };
  }

  // 🔹 Date difference in days
  const diffDays = Math.floor(
    (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // 🟡 UPCOMING (within next 5 days)
  if (diffDays <= 0 && diffDays >= -5) {
    return {
      status: "UPCOMING",
      emoji: "🟡",
      color: "#f59e0b",
      lateFee: 0,
    };
  }

  // 🟢 GRACE (1–5 days late)
  if (diffDays > 0 && diffDays <= 5) {
    return {
      status: "GRACE",
      emoji: "🟢",
      color: "#16a34a",
      lateFee: 0,
    };
  }

  // 🔴 LATE (after grace)
  if (diffDays > 5) {
    return {
      status: "LATE",
      emoji: "🔴",
      color: "#dc2626",
      lateFee: 50,
    };
  }

  return {
    status: "UPCOMING",
    emoji: "🟡",
    color: "#f59e0b",
    lateFee: 0,
  };
}

export default function PaymentScreen() {
  const [members, setMembers] = useState<any[]>([]);

  const loadMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  function openWhatsApp(phone: string, message: string) {
    const url = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments Overview</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const { status, color, lateFee, emoji } = getDueInfo(item);
          const dueDate = item.nextDueDate?.toDate?.();
          const totalAmount = item.monthlyFee + lateFee;

          return (
            <View style={styles.card}>
              {/* LEFT INFO */}
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.fee}>₹{item.monthlyFee} / month</Text>

                <Text style={styles.date}>
                  Next Payment:{" "}
                  {dueDate ? dueDate.toLocaleDateString() : "Not set"}
                </Text>

                <Text style={[styles.status, { color }]}>
                  {emoji} {status}
                  {lateFee > 0 && ` (+₹${lateFee})`}
                </Text>
              </View>

              {/* ACTIONS */}
              <View style={{ justifyContent: "space-between" }}>
                {/* ✅ ADMIN CONTROL – MARK PAID */}
                {status !== "PAID" && (
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: "#16a34a" }]}
                    onPress={async () => {
                      await markPaymentPaid({
                        ...item,
                        monthlyFee: totalAmount,
                      });
                      loadMembers();
                    }}
                  >
                    <Text style={{ color: "#fff" }}>
                      Mark Paid
                    </Text>
                  </TouchableOpacity>
                )}

                {/* 📲 WHATSAPP REMINDER */}
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: "#25D366" }]}
                  onPress={() =>
                    openWhatsApp(
                      item.phone,
                      getWhatsAppMessage(item, lateFee)
                    )
                  }
                >
                  <Text style={{ color: "#fff" }}>WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f7fb",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  fee: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
  },

  actionBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 6,
    alignItems: "center",
  },
});
