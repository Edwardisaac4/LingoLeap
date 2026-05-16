/**
 * LingoLeap Design Tokens
 * Matches the design system defined in 01-design-system.png
 *
 * Use these tokens in components and StyleSheet when NativeWind is insufficient.
 */

// ---------------------------------------------------------------------------
// COLOR PALETTE
// ---------------------------------------------------------------------------

export const colors = {
  // Primary
  linguaPurple: "#6C4EF5",
  linguaDeepPurple: "#5B3BF6",
  linguaBlue: "#4D8BFF",
  linguaGreen: "#21C16B",

  // Semantic
  success: "#21C16B",
  warning: "#FFC800",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D8BFF",

  // Neutrals
  textPrimary: "#0D132B",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",

  // Transparent helpers
  transparent: "transparent",
} as const;

export type ColorToken = keyof typeof colors;

// ---------------------------------------------------------------------------
// TYPOGRAPHY
// ---------------------------------------------------------------------------

export const fontFamily = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
} as const;

/** Font size in px (logical pixels for React Native) */
export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,
  caption: 11,
} as const;

/** Line height multipliers */
export const lineHeight = {
  h1: 1.2,
  h2: 1.3,
  h3: 1.3,
  h4: 1.4,
  bodyLarge: 1.6,
  bodyMedium: 1.6,
  bodySmall: 1.6,
  caption: 1.4,
} as const;

/** Pre-computed line heights (fontSize × lineHeight multiplier) */
export const lineHeightPx = {
  h1: Math.round(fontSize.h1 * lineHeight.h1),        // 38
  h2: Math.round(fontSize.h2 * lineHeight.h2),        // 31
  h3: Math.round(fontSize.h3 * lineHeight.h3),        // 26
  h4: Math.round(fontSize.h4 * lineHeight.h4),        // 22
  bodyLarge: Math.round(fontSize.bodyLarge * lineHeight.bodyLarge),   // 26
  bodyMedium: Math.round(fontSize.bodyMedium * lineHeight.bodyMedium), // 22
  bodySmall: Math.round(fontSize.bodySmall * lineHeight.bodySmall),   // 21
  caption: Math.round(fontSize.caption * lineHeight.caption),         // 15
} as const;

// Convenience typography preset objects for StyleSheet.create()
export const typography = {
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    lineHeight: lineHeightPx.h1,
    color: colors.textPrimary,
  },
  h2: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h2,
    lineHeight: lineHeightPx.h2,
    color: colors.textPrimary,
  },
  h3: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.h3,
    lineHeight: lineHeightPx.h3,
    color: colors.textPrimary,
  },
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.h4,
    lineHeight: lineHeightPx.h4,
    color: colors.textPrimary,
  },
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyLarge,
    lineHeight: lineHeightPx.bodyLarge,
    color: colors.textPrimary,
  },
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodyMedium,
    lineHeight: lineHeightPx.bodyMedium,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeightPx.bodySmall,
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.caption,
    lineHeight: lineHeightPx.caption,
    color: colors.textSecondary,
  },
} as const;

// ---------------------------------------------------------------------------
// SPACING
// ---------------------------------------------------------------------------

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 64,
} as const;

// ---------------------------------------------------------------------------
// BORDER RADIUS
// ---------------------------------------------------------------------------

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// SHADOWS
// ---------------------------------------------------------------------------

export const shadows = {
  sm: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
