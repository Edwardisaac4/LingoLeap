import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/expo";
import { colors } from "@/theme";
import { useLanguageStore } from "@/store/languageStore";

// ─── SSO Callback ─────────────────────────────────────────────────────────────
// Clerk redirects to this route after a browser-based OAuth flow.
// expo-web-browser closes itself, then Clerk sets the session automatically.
// We just need to wait for isSignedIn and redirect.

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded || !_hasHydrated) return;
    if (isSignedIn) {
      if (!selectedLanguage) {
        router.replace("/language-select");
      } else {
        router.replace("/home");
      }
    } else {
      router.replace("/onboarding");
    }
  }, [isLoaded, _hasHydrated, isSignedIn, selectedLanguage, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
      <ActivityIndicator size="large" color={colors.linguaPurple} />
    </View>
  );
}
