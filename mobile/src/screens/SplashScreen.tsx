import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuthStore } from '../store/useAuthStore';
import { LoadingSpinner } from '../components/ui';
import { colors, typography } from '../theme';

export function SplashScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Splash'>) {
  const { bootstrap } = useAuthStore();

  useEffect(() => {
    bootstrap().then(() => {
      // Small delay for smooth transition
      setTimeout(() => {
        // Read the current auth state after bootstrap completes
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        navigation.replace(isAuthenticated ? 'Main' : 'Welcome');
      }, 500);
    });
  }, [bootstrap, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🗺️</Text>
      <Text style={styles.title}>P2M</Text>
      <Text style={styles.subtitle}>Pro My Maps</Text>
      <LoadingSpinner message="Chargement..." style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    fontSize: 96,
    marginBottom: 16,
  },
  title: {
    ...typography.h1,
    color: colors.textInverse,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.textInverse,
    opacity: 0.9,
  },
  loader: {
    marginTop: 40,
  },
});
