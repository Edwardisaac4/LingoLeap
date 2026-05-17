import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@/theme";
import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();

  // Wait for Clerk and Zustand to load before redirecting
  if (!isAuthLoaded || !_hasHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.linguaPurple} />
      </View>
    );
  }

  // Authenticated → check language, unauthenticated → onboarding
  if (isSignedIn) {
    if (!selectedLanguage) {
      return <Redirect href="/language-select" />;
    }
    return <Redirect href="/home" />;
  }

  return <Redirect href="/onboarding" />;
}
