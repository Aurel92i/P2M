export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { typography, fontSizes, lineHeights, fontWeights } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  fontSizes,
  lineHeights,
  fontWeights,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
