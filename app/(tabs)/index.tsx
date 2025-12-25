import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import StatCard from "@/components/dashboard/StatCard";
import { getDashboardStats } from "@/services/dashboard.service";

export default function DashboardScreen() {
  const [stats, setStats] = useState<{
    totalMembers: number;
    activeMembers: number;
    duePayments: number;
    revenue: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading || !stats) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome Admin 👋</Text>
        <Text style={styles.subtitle}>
          Here’s what’s happening in your gym today
        </Text>
      </View>

      {/* Stats Row 1 */}
      <View style={styles.row}>
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          icon="people"
          color="#2563eb"
        />
        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          icon="checkmark-circle"
          color="#16a34a"
        />
      </View>

      {/* Stats Row 2 */}
      <View style={styles.row}>
        <StatCard
          title="Due Payments"
          value={stats.duePayments}
          icon="alert-circle"
          color="#dc2626"
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${stats.revenue}`}
          icon="cash"
          color="#f59e0b"
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionCard}>
          <Text style={styles.actionText}>
            🔔 {stats.duePayments} members have pending payments
          </Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.actionText}>
            📅 Memberships expiring soon
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    backgroundColor: "#2563eb",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#dbeafe",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  actionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  actionText: {
    fontSize: 14,
    color: "#333",
  },
});
