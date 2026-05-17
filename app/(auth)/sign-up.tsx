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
import { useSignUp } from "@clerk/expo/legacy";
import { images } from "@/constants/images";
import { colors } from "@/theme";
import { VerificationModal } from "@/components/VerificationModal";
import { useOAuthFlow } from "@/hooks/useOAuthFlow";

// ─── Sign Up Screen ────────────────────────────────────────────────────────────

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startFlow } = useOAuthFlow();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [verifyError, setVerifyError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | undefined>();
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  // ── Step 1: Create account and send email verification code ────────────────

  async function handleSignUp() {
    if (!isLoaded || !signUp) return;
    setLoading(true);
    setVerifyError(undefined);
    try {
      // Clerk v3: signUp.create() returns SignUpResource directly and throws on error
      await signUp.create({
        emailAddress: email,
        password,
        username,
        firstName,
        lastName,
      });

      // Explicitly trigger the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Both calls succeeded — show the verification modal
      setModalVisible(true);
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { longMessage?: string; message?: string }[] };
      const msg =
        clerkErr.errors?.[0]?.longMessage ??
        clerkErr.errors?.[0]?.message ??
        "Sign-up failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: Verify the 6-digit code ───────────────────────────────────────

  async function handleVerified(code: string) {
    if (!isLoaded || !signUp) return;
    if (verifyLoading) return;
    setVerifyLoading(true);
    setVerifyError(undefined);
    try {
      // Clerk v3: returns SignUpResource directly, throws on error
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId });
        setModalVisible(false);
        router.replace("/language-select");
      } else {
        console.error("Sign-up not complete after verification:", result.status, result.missingFields);
        setVerifyError(`Incomplete (${result.status}). Missing: ${result.missingFields?.join(', ')}`);
      }
    } catch (err: unknown) {
      console.error("Verification error:", JSON.stringify(err, null, 2));
      const clerkErr = err as { errors?: { message?: string }[] };
      setVerifyError(
        clerkErr.errors?.[0]?.message ?? "Invalid code. Please try again.",
      );
    } finally {
      setVerifyLoading(false);
    }
  }

  // ── Resend code ────────────────────────────────────────────────────────────

  async function handleResend() {
    if (!isLoaded || !signUp) return;
    setResendStatus(undefined);
    try {
      // Clerk v3: throws on error
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResendStatus("Code resent! Check your inbox.");
    } catch (err: unknown) {
      console.error("Resend error:", err);
      const clerkErr = err as { errors?: { longMessage?: string; message?: string }[] };
      const msg =
        clerkErr.errors?.[0]?.longMessage ??
        clerkErr.errors?.[0]?.message ??
        "Failed to resend code. Please try again.";
      setResendStatus(`Error: ${msg}`);
    }
  }

  // ── OAuth sign-up ──────────────────────────────────────────────────────────

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

        {/* ── Heading — plain View + Text: NativeWind ──────────────────── */}
        <View className="px-6 pt-2 pb-4">
          <Text className="font-bold text-[28px] text-text-primary leading-9">
            Create your account
          </Text>
          <Text className="font-sans text-[15px] text-text-secondary mt-1">
            Start your language journey today ✨
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

          {/* First Name & Last Name row */}
          <View className="flex-row gap-3">
            <View
              className="flex-1 border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
              style={firstNameFocused ? { borderColor: colors.linguaPurple } : undefined}
            >
              <Text className="font-sans text-[12px] text-text-secondary mb-0.5">First Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Alex"
                placeholderTextColor={colors.textSecondary}
                value={firstName}
                onChangeText={setFirstName}
                onFocus={() => setFirstNameFocused(true)}
                onBlur={() => setFirstNameFocused(false)}
                underlineColorAndroid="transparent"
              />
            </View>

            <View
              className="flex-1 border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
              style={lastNameFocused ? { borderColor: colors.linguaPurple } : undefined}
            >
              <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Last Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Smith"
                placeholderTextColor={colors.textSecondary}
                value={lastName}
                onChangeText={setLastName}
                onFocus={() => setLastNameFocused(true)}
                onBlur={() => setLastNameFocused(false)}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          {/* Username field */}
          <View
            className="border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
            style={usernameFocused ? { borderColor: colors.linguaPurple } : undefined}
          >
            <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Username</Text>
            <TextInput
              style={styles.textInput}
              placeholder="alexsmith"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              underlineColorAndroid="transparent"
            />
          </View>

          {/* Email field */}
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

          {/* Password field */}
          <View
            className="border-[1.5px] border-border rounded-[14px] px-4 py-[10px] bg-background"
            style={passwordFocused ? { borderColor: colors.linguaPurple } : undefined}
          >
            <Text className="font-sans text-[12px] text-text-secondary mb-0.5">Password</Text>
            <View className="flex-row items-center">
              {/* TextInput — AGENTS.md exception */}
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="••••••••••"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                underlineColorAndroid="transparent"
              />
              {/* TouchableOpacity style — AGENTS.md exception */}
              <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                activeOpacity={0.7}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up button — TouchableOpacity style: AGENTS.md exception */}
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              (!email || !password || !username || !firstName || !lastName || loading) && styles.primaryBtnDisabled,
            ]}
            activeOpacity={0.85}
            onPress={handleSignUp}
            disabled={!email || !password || !username || !firstName || !lastName || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="font-semibold text-[16px] text-white">Sign Up</Text>
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")} activeOpacity={0.7}>
            <Text className="font-semibold text-body-md text-lingua-purple">Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Verification modal ──────────────────────────────────────────── */}
      <VerificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerified={handleVerified}
        onResend={handleResend}
        subtitle={resendStatus ?? "We sent a 6-digit verification code to your email.\nEnter it below."}
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
  eyeBtn: {
    paddingLeft: 8,
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
