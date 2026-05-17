import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSignIn } from "@clerk/expo/legacy";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { VerificationModal } from "@/components/VerificationModal";
import { useOAuthFlow } from "@/hooks/useOAuthFlow";

// ─── Sign In Screen ────────────────────────────────────────────────────────────

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startFlow } = useOAuthFlow();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyError, setVerifyError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  // ── Step 1: Sign in with email + password ─────────────────────────────────

  async function handleSignIn() {
    if (!isLoaded || !signIn) return;
    setLoading(true);
    setVerifyError(undefined);
    try {
      // Clerk v3: signIn.create() returns SignInResource directly and throws on error
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        // No MFA — activate session directly
        await setActive!({ session: result.createdSessionId });
        router.replace("/language-select" as any);
      } else if (result.status === "needs_second_factor") {
        // MFA required — show verification modal
        setModalVisible(true);
      } else {
        console.error("Sign-in not complete:", result.status);
        alert(`Sign-in incomplete (${result.status}). Please try again.`);
      }
    } catch (err: unknown) {
      console.error("Sign-in error:", JSON.stringify(err, null, 2));
      const clerkErr = err as { errors?: { longMessage?: string; message?: string }[] };
      const msg =
        clerkErr.errors?.[0]?.longMessage ??
        clerkErr.errors?.[0]?.message ??
        "Sign-in failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2 (MFA): Verify second-factor code ───────────────────────────────

  async function handleVerified(code: string) {
    if (!isLoaded || !signIn) return;
    if (verifyLoading) return;
    setVerifyLoading(true);
    setVerifyError(undefined);
    try {
      // Clerk v3: returns SignInResource directly, throws on error
      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId });
        setModalVisible(false);
        router.replace("/language-select" as any);
      } else {
        console.error("Sign-in verification not complete:", result.status);
        setVerifyError(`Incomplete (${result.status}). Please try again.`);
      }
    } catch (err: unknown) {
      console.error("Verify error:", JSON.stringify(err, null, 2));
      const clerkErr = err as { errors?: { message?: string }[] };
      setVerifyError(
        clerkErr.errors?.[0]?.message ?? "Invalid code. Please try again.",
      );
    } finally {
      setVerifyLoading(false);
    }
  }

  // ── OAuth sign-in ──────────────────────────────────────────────────────────

  async function handleOAuth(strategy: "oauth_google" | "oauth_apple" | "oauth_facebook") {
    setOauthLoading(strategy);
    try {
      await startFlow(strategy);
    } finally {
      setOauthLoading(null);
    }
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

        {/* ── Heading ───────────────────────────────────────────────────── */}
        <View className="px-6 pt-2 pb-4">
          <Text className="font-bold text-[28px] text-text-primary leading-9">
            Welcome back!
          </Text>
          <Text className="font-sans text-[15px] text-text-secondary mt-1">
            Sign in to continue your journey ✨
          </Text>
        </View>

        {/* ── Mascot ────────────────────────────────────────────────────── */}
        <View className="items-center mb-4">
          <Image
            source={images.mascotAuth}
            className="w-[180px] h-[180px]"
            resizeMode="contain"
          />
        </View>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <View className="px-6 gap-3">

          {/* Email or Username field */}
          <View
            className="border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
            style={emailFocused ? { borderColor: colors.linguaPurple } : undefined}
          >
            <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Email or Username</Text>
            {/* TextInput — AGENTS.md exception */}
            <TextInput
              style={styles.textInput}
              placeholder="alexsmith or alex@gmail.com"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Password field */}
          <View className="border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background">
            <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Password</Text>
            {/* TextInput — AGENTS.md exception */}
            <TextInput
              style={styles.textInput}
              placeholder="••••••••••"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Sign In button — TouchableOpacity style: AGENTS.md exception */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              (!email || !password || loading) && styles.primaryBtnDisabled,
            ]}
            activeOpacity={0.85}
            onPress={handleSignIn}
            disabled={!email || !password || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="font-semibold text-[16px] text-white">Sign In</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <View className="flex-row items-center mx-6 my-5 gap-[10px]">
          <View className="flex-1 h-px bg-border" />
          <Text className="font-sans text-body-sm text-text-secondary">or continue with</Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* ── Social buttons — TouchableOpacity style: AGENTS.md exception */}
        <View className="px-6 gap-3">
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.8}
            onPress={() => handleOAuth("oauth_google")}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "oauth_google" ? (
              <ActivityIndicator size="small" color={colors.textPrimary} style={{ width: 22 }} />
            ) : (
              <Text className="font-bold text-[18px] text-[#4285F4] w-[22px] text-center">G</Text>
            )}
            <Text className="font-medium text-body-md text-text-primary">Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.8}
            onPress={() => handleOAuth("oauth_facebook")}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "oauth_facebook" ? (
              <ActivityIndicator size="small" color={colors.textPrimary} style={{ width: 22 }} />
            ) : (
              <View className="w-[22px] h-[22px] rounded-full bg-[#1877F2] items-center justify-center">
                <Text className="font-bold text-body-md text-white leading-[22px]">f</Text>
              </View>
            )}
            <Text className="font-medium text-body-md text-text-primary">Continue with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.8}
            onPress={() => handleOAuth("oauth_apple")}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === "oauth_apple" ? (
              <ActivityIndicator size="small" color={colors.textPrimary} style={{ width: 22 }} />
            ) : (
              <Ionicons name="logo-apple" size={22} color="#000" />
            )}
            <Text className="font-medium text-body-md text-text-primary">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* ── Footer link ───────────────────────────────────────────────── */}
        <View className="flex-row justify-center items-center mt-7">
          <Text className="font-sans text-body-md text-text-secondary">
            Don&apos;t have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")} activeOpacity={0.7}>
            <Text className="font-semibold text-body-md text-lingua-purple">Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Verification modal (MFA / 2FA) ───────────────────────────────── */}
      <VerificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerified={handleVerified}
        subtitle={"We sent a 6-digit sign-in code to your email.\nEnter it below."}
        error={verifyError}
        isLoading={verifyLoading}
      />
    </SafeAreaView>
  );
}

// ─── StyleSheet — only for AGENTS.md-mandated exceptions ────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backBtn: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: colors.textPrimary,
    padding: 0,
    margin: 0,
  },
  primaryBtn: {
    backgroundColor: colors.linguaPurple,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 4,
  },
  primaryBtnDisabled: {
    opacity: 0.55,
  },
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
