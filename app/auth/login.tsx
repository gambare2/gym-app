import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const isDark = colorScheme === "dark";

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      console.log("LOGIN SUCCESS");

      // ✅ MANUAL NAVIGATION (KEY FIX)
      router.replace("/(tabs)");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Dynamic styles based on theme
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={isDark ? "#888" : "#666"}
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={isDark ? "#888" : "#666"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: isDark ? "#121212" : "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      marginBottom: 20,
      color: isDark ? "#fff" : "#000",
      textAlign: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? "#444" : "#ccc",
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      color: isDark ? "#fff" : "#000",
      backgroundColor: isDark ? "#1e1e1e" : "#f9f9f9",
    },
    button: {
      backgroundColor: "#2563eb",
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
  });
