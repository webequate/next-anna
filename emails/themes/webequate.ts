export const colors = {
  // Light colors
  lightPrimary: "#f5f5f5", // 100
  lightSecondary: "#a3a3a3", // 400
  lightTertiary: "#404040", // 700

  // Dark colors
  darkPrimary: "#262626", // 800
  darkSecondary: "#525252", // 600
  darkTertiary: "#d4d4d4", // 300

  // Accent colors
  lightAccent: "#5b8ee1",
  darkAccent: "#346ac2",
};

export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 28,
};

export const lineHeight = {
  tight: "115%",
  base: "150%",
  relaxed: "185%",
};

export const fontWeight = {
  normal: 400,
  bold: 700,
};

export const borderRadius = {
  sm: 8,
  base: 16,
  full: 9999,
};

export const fontFamily = {
  sans: 'neue-haas-unica, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  serif:
    'swear-display-cilati, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const spacing = {
  s0: 0,
  s1: 4,
  s3: 8,
  s4: 12,
  s5: 16,
  s6: 20,
  s7: 24,
  s8: 32,
  s9: 40,
  s10: 48,
  s11: 56,
};

export const screens = {
  xs: "480px",
  sm: "640px",
};

export const themeDefaults = {
  fontFamily: fontFamily.sans,
  lineHeight: lineHeight.base,
  fontWeight: fontWeight.normal,
  fontSize: fontSize.base,
  color: colors.lightPrimary,
  padding: 0,
};
