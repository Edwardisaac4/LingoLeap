import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/theme";
import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { languages } from "@/data/languages";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();
  const selectedLangDetails = languages.find((l) => l.id === selectedLanguage);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/onboarding");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.center}>
        <Text style={styles.emoji}>🦊</Text>
        <Text style={styles.title}>You are in!</Text>
        <Text style={styles.subtitle}>
          {selectedLangDetails
            ? `Learning: ${selectedLangDetails.name} ${selectedLangDetails.flagEmoji || ""}`
            : "Home screen coming soon."}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/language-select")}
          style={styles.languageButton}
        >
          <Text style={styles.languageButtonText}>Choose Target Language</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSignOut}
          style={styles.signOutButton}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
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
  },
  languageButton: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: colors.linguaPurple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  languageButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: colors.linguaPurple,
  },
  signOutButton: {
    marginTop: 12,
    backgroundColor: colors.linguaPurple,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.linguaPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  signOutText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
