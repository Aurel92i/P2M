import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { colors, typography, borderRadius } from '../../theme';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  style?: ViewStyle;
}

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64,
  xlarge: 96,
};

const fontSizeMap = {
  small: 14,
  medium: 18,
  large: 24,
  xlarge: 36,
};

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getBackgroundColor(name: string): string {
  const colors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#F97316', '#14B8A6', '#6366F1', '#A855F7',
  ];
  const charCode = name.charCodeAt(0);
  return colors[charCode % colors.length];
}

export function Avatar({ source, name = 'User', size = 'medium', style }: AvatarProps) {
  const containerSize = sizeMap[size];
  const fontSize = fontSizeMap[size];
  const backgroundColor = getBackgroundColor(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
          backgroundColor: source ? colors.border : backgroundColor,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: containerSize,
              height: containerSize,
              borderRadius: containerSize / 2,
            },
          ]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize }]}>{getInitials(name)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.textInverse,
    fontWeight: '600',
  },
});
