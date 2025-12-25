import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getPaymentHistory } from "@/services/payments.service";

export default function MemberPayments() {
  const { id } = useLocalSearchParams();
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    getPaymentHistory(id as string).then(setPayments);
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Payment History
      </Text>

      <FlatList
        data={payments}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12, marginTop: 8, backgroundColor: "#fff" }}>
            <Text>₹{item.amount}</Text>
            <Text>Month: {item.month}</Text>
            <Text>
              Paid On: {item.paidAt.toDate().toDateString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
