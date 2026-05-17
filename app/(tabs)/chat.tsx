import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";

export default function ChatScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.center}>
        <Text style={styles.emoji}>💬</Text>
        <Text style={styles.title}>AI Chat Tutor</Text>
        <Text style={styles.subtitle}>Chat sessions with your interactive AI tutor are coming soon.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});
