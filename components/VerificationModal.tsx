import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { colors } from "@/theme";

// ─── Props ─────────────────────────────────────────────────────────────────────

export interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerified: (code: string) => void;
  onResend?: () => void;
  title?: string;
  subtitle?: string;
  error?: string;
  /** When true the submit auto-trigger and the Resend button are disabled */
  isLoading?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function VerificationModal({
  visible,
  onClose,
  onVerified,
  onResend,
  title = "Check your email",
  subtitle = "We sent a 6-digit verification code to your email.\nEnter it below.",
  error,
  isLoading = false,
}: VerificationModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  function handleDigit(index: number, value: string) {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-navigate when all 6 digits are filled
    if (digit && index === 5) {
      const full = [...next].join("");
      if (full.length === 6 && !isLoading) {
        setTimeout(() => {
          setCode(["", "", "", "", "", ""]);
          onVerified(full);
        }, 200);
      }
    }
  }

  function handleKeyPress(index: number, key: string) {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop — Pressable style must use StyleSheet (AGENTS.md: Pressable/absoluteFillObject) */}
      <Pressable style={styles.modalBackdrop} onPress={onClose} />

      {/* KeyboardAvoidingView — must use inline/StyleSheet (AGENTS.md exception) */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalKeyboardView}
        pointerEvents="box-none"
      >
        {/* Sheet — shadow requires StyleSheet (AGENTS.md: Shadow exception) */}
        <View style={styles.modalSheet}>

          {/* Handle bar — plain View, use NativeWind */}
          <View className="w-10 h-1 rounded-sm bg-border self-center mb-6" />

          {/* Header — plain Text, use NativeWind */}
          <Text className="font-bold text-[22px] text-text-primary mb-2">{title}</Text>
          <Text className="font-sans text-body-md text-text-secondary leading-[22px] mb-7">
            {subtitle}
          </Text>

          {/* Error message — only shown when error prop is provided */}
          {error ? (
            <Text className="font-sans text-body-sm text-[#E53E3E] mb-3 text-center">{error}</Text>
          ) : null}

          {/* Code inputs row — plain View, use NativeWind */}
          <View className="flex-row gap-[10px] justify-center mb-6">
            {code.map((digit, i) => (
              <TextInput
                key={i}
                ref={(el) => { inputs.current[i] = el; }}
                // TextInput style & dynamic state — must use StyleSheet (AGENTS.md exceptions)
                style={[styles.codeBox, digit ? styles.codeBoxFilled : null]}
                value={digit}
                onChangeText={(v) => handleDigit(i, v)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(i, nativeEvent.key)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
              />
            ))}
          </View>

          {/* Resend — TouchableOpacity style must use StyleSheet (AGENTS.md exception) */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.resendRow}
            onPress={onResend}
            disabled={isLoading}
          >
            <Text className="font-sans text-body-md text-text-secondary">
              Didn&apos;t receive it?{" "}
              <Text className={`font-semibold ${isLoading ? "text-text-secondary" : "text-lingua-purple"}`}>Resend code</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// ─── StyleSheet — only for exceptions listed in AGENTS.md ────────────────────
// Pressable (absoluteFillObject), KeyboardAvoidingView, Shadow, TextInput, dynamic

const styles = StyleSheet.create({
  // Pressable backdrop — absoluteFillObject + transparent bg
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  // KeyboardAvoidingView — AGENTS.md exception
  modalKeyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // Shadow — AGENTS.md exception (platform-specific shadow syntax)
  modalSheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 20,
  },
  // TextInput — AGENTS.md exception
  codeBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: "center",
  },
  // Dynamic style (runtime-calculated) — AGENTS.md exception
  codeBoxFilled: {
    borderColor: colors.linguaPurple,
    backgroundColor: "#F0EDFF",
  },
  // TouchableOpacity style — AGENTS.md exception
  resendRow: {
    alignItems: "center",
    marginTop: 8,
  },
});
