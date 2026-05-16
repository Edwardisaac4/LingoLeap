import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { colors } from "@/theme";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

      {/* ── Logo row ──────────────────────────────────── */}
      <View className="flex-row items-center justify-center pt-5 gap-2">
        <Image
          source={images.mascotLogo}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="font-bold text-[22px] text-text-primary">
          LingoLeap
        </Text>
      </View>

      {/* ── Hero text ─────────────────────────────────── */}
      <View className="px-8 pt-8 pb-5">
        <Text className="font-bold text-[34px] leading-[42px] text-text-primary">
          Your AI language{"\n"}
          <Text className="font-bold text-[34px] leading-[42px] text-lingua-purple">
            teacher
          </Text>
          <Text className="font-bold text-[34px] leading-[42px] text-text-primary">
            .
          </Text>
        </Text>
        <Text className="font-sans text-[15px] leading-6 text-text-secondary mt-2">
          Real conversations, personalized{"\n"}lessons, anytime, anywhere.
        </Text>
      </View>

      {/* ── Mascot + speech bubbles ───────────────────── */}
      <View className="flex-1 items-center justify-center relative">

        {/* Hello bubble – top-left */}
        <View
          style={styles.shadow}
          className="absolute top-[8%] left-[4%] bg-[#F0F2FF] rounded-xl px-4 py-2"
        >
          <Text className="font-semibold text-[15px] text-text-primary">
            Hello!
          </Text>
        </View>

        {/* ¡Hola! bubble – top-right */}
        <View
          style={styles.shadow}
          className="absolute top-[4%] right-[4%] bg-[#EFF1FF] rounded-xl px-4 py-2"
        >
          <Text className="font-semibold text-[15px] text-lingua-purple">
            ¡Hola!
          </Text>
        </View>

        {/* 你好! bubble – middle-right */}
        <View
          style={styles.shadow}
          className="absolute top-[42%] right-[4%] bg-[#FFF0F0] rounded-xl px-4 py-2"
        >
          <Text className="font-semibold text-[15px] text-[#E53E3E]">
            你好!
          </Text>
        </View>

        {/* Mascot */}
        <Image
          source={images.mascotWelcome}
          className="w-[500px] h-[500px]"
          resizeMode="contain"
        />
      </View>

      {/* ── CTA Button ────────────────────────────────── */}
      <View className="px-8 pb-8 pt-4">
        {/* TouchableOpacity — StyleSheet required per AGENTS.md */}
        <TouchableOpacity
          style={styles.ctaButton}
          activeOpacity={0.85}
          onPress={() => router.push("/(auth)/sign-up")}
        >
          <Text className="font-semibold text-[17px] text-background">
            Get Started
          </Text>
          <Ionicons name="arrow-forward" size={20} color={colors.background} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

// StyleSheet — only for SafeAreaView bg, TouchableOpacity style prop, and shadows (platform-specific)
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.linguaPurple,
    borderRadius: 20,
    paddingVertical: 16,
    gap: 8,
  },
});
