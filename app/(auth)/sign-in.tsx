import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { VerificationModal } from "@/components/VerificationModal";

// ─── Sign In Screen ────────────────────────────────────────────────────────────

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSignIn() {
    setModalVisible(true);
  }

  function handleVerified() {
    setModalVisible(false);
    router.replace("/home");
  }

  return (
    // SafeAreaView — AGENTS.md exception: must use inline style
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* ScrollView contentContainerStyle — AGENTS.md exception */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back button — TouchableOpacity style: AGENTS.md exception ──── */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* ── Heading — plain View + Text: NativeWind ──────────────────── */}
        <View className="px-6 pt-2 pb-4">
          <Text className="font-bold text-[28px] text-text-primary leading-9">
            Welcome back!
          </Text>
          <Text className="font-sans text-[15px] text-text-secondary mt-1">
            Sign in to continue your journey ✨
          </Text>
        </View>

        {/* ── Mascot — Image: NativeWind className supported in NW v5 ─── */}
        <View className="items-center mb-4">
          <Image
            source={images.mascotAuth}
            className="w-[180px] h-[180px]"
            resizeMode="contain"
          />
        </View>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <View className="px-6 gap-3">

          {/* Email field — plain View base uses NativeWind;
              focused border is dynamic so uses inline style (AGENTS.md: Dynamic styles) */}
          <View
            className="border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
            style={emailFocused ? { borderColor: colors.linguaPurple } : undefined}
          >
            <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Email</Text>
            {/* TextInput — AGENTS.md exception */}
            <TextInput
              style={styles.textInput}
              placeholder="alex@gmail.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Sign In button — TouchableOpacity style: AGENTS.md exception */}
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.85}
            onPress={handleSignIn}
          >
            <Text className="font-semibold text-[16px] text-white">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* ── Divider — plain Views + Text: NativeWind ─────────────────── */}
        <View className="flex-row items-center mx-6 my-5 gap-[10px]">
          <View className="flex-1 h-px bg-border" />
          <Text className="font-sans text-[13px] text-text-secondary">or continue with</Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* ── Social buttons — TouchableOpacity style: AGENTS.md exception */}
        <View className="px-6 gap-3">
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <Text className="font-bold text-[18px] text-[#4285F4] w-[22px] text-center">G</Text>
            <Text className="font-medium text-[14px] text-text-primary">Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <View className="w-[22px] h-[22px] rounded-full bg-[#1877F2] items-center justify-center">
              <Text className="font-bold text-[14px] text-white leading-[22px]">f</Text>
            </View>
            <Text className="font-medium text-[14px] text-text-primary">Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <Ionicons name="logo-apple" size={22} color="#000" />
            <Text className="font-medium text-[14px] text-text-primary">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer link — plain View + Text: NativeWind ──────────────── */}
        <View className="flex-row justify-center items-center mt-7">
          <Text className="font-sans text-[14px] text-text-secondary">
            Don't have an account?{" "}
          </Text>
          {/* TouchableOpacity without a style prop — no exception needed */}
          <TouchableOpacity onPress={() => router.replace("/(auth)/sign-up")} activeOpacity={0.7}>
            <Text className="font-semibold text-[14px] text-lingua-purple">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Verification modal ───────────────────────────────────────────── */}
      <VerificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerified={handleVerified}
        subtitle={"We sent a 6-digit sign-in code to your email.\nEnter it below."}
      />
    </SafeAreaView>
  );
}

// ─── StyleSheet — only for AGENTS.md-mandated exceptions ────────────────────
// ScrollView contentContainerStyle, TouchableOpacity style, TextInput style

const styles = StyleSheet.create({
  // ScrollView contentContainerStyle — AGENTS.md exception
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  // TouchableOpacity style — AGENTS.md exception
  backBtn: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  // TextInput style — AGENTS.md exception
  textInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  // TouchableOpacity style — AGENTS.md exception
  primaryBtn: {
    backgroundColor: colors.linguaPurple,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  // TouchableOpacity style — AGENTS.md exception
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 14,
    backgroundColor: colors.background,
  },
});
