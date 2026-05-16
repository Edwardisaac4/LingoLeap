import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { View, ActivityIndicator } from "react-native";
import { colors } from "@/theme";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load before redirecting
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.linguaPurple} />
      </View>
    );
  }

  // Authenticated → home, unauthenticated → onboarding
  if (isSignedIn) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/onboarding" />;
}
