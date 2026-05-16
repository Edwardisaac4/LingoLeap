import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, radius } from "@/theme";

/**
 * Design System Preview Screen
 * Demonstrates all tokens are wired up correctly.
 * Remove or replace this screen once real screens are built.
 */
export default function DesignSystemScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <Text style={typography.h1}>LingoLeap</Text>
        <Text style={[typography.bodyMedium, { color: colors.textSecondary, marginBottom: spacing["2xl"] }]}>
          Design System Preview
        </Text>

        {/* ── Typography ──────────────────────────────────────── */}
        <SectionLabel label="TYPOGRAPHY" />
        <Text style={typography.h1}>H1 — 32px Bold</Text>
        <Text style={typography.h2}>H2 — 24px SemiBold</Text>
        <Text style={typography.h3}>H3 — 20px SemiBold</Text>
        <Text style={typography.h4}>H4 — 16px Medium</Text>
        <Text style={typography.bodyLarge}>Body Large — 16px Regular</Text>
        <Text style={typography.bodyMedium}>Body Medium — 14px Regular</Text>
        <Text style={typography.bodySmall}>Body Small — 13px Regular</Text>
        <Text style={[typography.caption, { marginBottom: spacing["2xl"] }]}>
          Caption — 11px Regular
        </Text>

        {/* ── Primary Colors ──────────────────────────────────── */}
        <SectionLabel label="PRIMARY" />
        <View style={styles.row}>
          <ColorSwatch color={colors.linguaPurple} label="Lingua Purple" hex="#6C4EF5" />
          <ColorSwatch color={colors.linguaDeepPurple} label="Deep Purple" hex="#5B3BF6" />
          <ColorSwatch color={colors.linguaBlue} label="Lingua Blue" hex="#4D8BFF" />
          <ColorSwatch color={colors.linguaGreen} label="Lingua Green" hex="#21C16B" />
        </View>

        {/* ── Semantic Colors ─────────────────────────────────── */}
        <SectionLabel label="SEMANTIC" />
        <View style={styles.row}>
          <ColorSwatch color={colors.success} label="Success" hex="#21C16B" />
          <ColorSwatch color={colors.warning} label="Warning" hex="#FFC800" />
          <ColorSwatch color={colors.streak} label="Streak" hex="#FF8A00" />
          <ColorSwatch color={colors.error} label="Error" hex="#FF4D4F" />
          <ColorSwatch color={colors.info} label="Info" hex="#4D8BFF" />
        </View>

        {/* ── Neutral Colors ──────────────────────────────────── */}
        <SectionLabel label="NEUTRALS" />
        <View style={[styles.row, { marginBottom: spacing["2xl"] }]}>
          <ColorSwatch color={colors.textPrimary} label="Text Primary" hex="#0D132B" />
          <ColorSwatch color={colors.textSecondary} label="Text Secondary" hex="#6B7280" />
          <ColorSwatch color={colors.border} label="Border" hex="#E5E7EB" bordered />
          <ColorSwatch color={colors.surface} label="Surface" hex="#F6F7FB" bordered />
          <ColorSwatch color={colors.background} label="Background" hex="#FFFFFF" bordered />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Helper components ────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <Text
      style={[
        typography.caption,
        {
          color: colors.linguaPurple,
          fontFamily: "Poppins_700Bold",
          letterSpacing: 1.2,
          marginBottom: spacing.sm,
          marginTop: spacing.md,
        },
      ]}
    >
      {label}
    </Text>
  );
}

function ColorSwatch({
  color,
  label,
  hex,
  bordered = false,
}: {
  color: string;
  label: string;
  hex: string;
  bordered?: boolean;
}) {
  return (
    <View style={styles.swatchWrapper}>
      <View
        style={[
          styles.swatch,
          { backgroundColor: color },
          bordered && styles.swatchBorder,
        ]}
      />
      <Text style={[typography.caption, { textAlign: "center" }]}>{label}</Text>
      <Text style={[typography.caption, { textAlign: "center", color: colors.textSecondary }]}>
        {hex}
      </Text>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    padding: spacing.base,
    paddingBottom: spacing["5xl"],
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.base,
  },
  swatchWrapper: {
    alignItems: "center",
    width: 68,
  },
  swatch: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    marginBottom: spacing.xs,
  },
  swatchBorder: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
