import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();

  // If not loaded or store not hydrated yet, show nothing
  if (!isLoaded || !_hasHydrated) {
    return null;
  }

  // If already signed in, send them to the correct screen
  if (isSignedIn) {
    if (!selectedLanguage) {
      return <Redirect href="/language-select" />;
    }
    return <Redirect href="/home" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
