import { Platform } from 'react-native';

export const fontFamilies = {
  inter: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  poppins: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
} as const;

export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
} as const;

export const lineHeights = {
  xs: 14,
  sm: 16,
  base: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 44,
  '5xl': 48,
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

// Typography styles
export const typography = {
  // Headers
  h1: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['4xl'],
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['3xl'],
    fontWeight: fontWeights.bold,
  },
  h3: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights['2xl'],
    fontWeight: fontWeights.semiBold,
  },
  h4: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
    fontWeight: fontWeights.semiBold,
  },

  // Body text
  bodyLarge: {
    fontFamily: fontFamilies.inter.regular,
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },
  body: {
    fontFamily: fontFamilies.inter.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
  },
  bodySmall: {
    fontFamily: fontFamilies.inter.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
  },

  // Labels
  labelLarge: {
    fontFamily: fontFamilies.inter.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.medium,
  },
  label: {
    fontFamily: fontFamilies.inter.medium,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    fontWeight: fontWeights.medium,
  },
  labelSmall: {
    fontFamily: fontFamilies.inter.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.medium,
  },

  // Button
  button: {
    fontFamily: fontFamilies.inter.semiBold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontWeight: fontWeights.semiBold,
  },

  // Caption
  caption: {
    fontFamily: fontFamilies.inter.regular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
  },
} as const;
