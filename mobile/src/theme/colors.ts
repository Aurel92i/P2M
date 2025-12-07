export const colors = {
  // Primary colors
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#60A5FA',

  // Secondary & accent
  secondary: '#10B981',
  secondaryDark: '#059669',
  accent: '#F59E0B',
  accentDark: '#D97706',

  // Background & surface
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceHover: '#F1F5F9',

  // Text colors
  text: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Borders & dividers
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  divider: '#F1F5F9',

  // Overlays & shadows
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',

  // Transparent variants
  transparent: 'transparent',
} as const;

export type ColorName = keyof typeof colors;
