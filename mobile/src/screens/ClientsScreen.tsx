import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/AppNavigator';
import { EmptyState, Card } from '../components/ui';
import { colors, typography, spacing } from '../theme';

export function ClientsScreen({ navigation }: BottomTabScreenProps<MainTabParamList, 'Clients'>) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Clients</Text>
        <Text style={styles.headerSubtitle}>Gérez vos clients et leurs adresses</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <EmptyState
          title="Fonctionnalité à venir"
          message="La gestion des clients sera bientôt disponible. Vous pourrez organiser vos contacts et leurs adresses."
        />
        <View style={styles.infoSection}>
          <Card variant="outlined" style={styles.infoCard}>
            <Text style={styles.infoTitle}>📋 Prochaines fonctionnalités</Text>
            <View style={styles.featureList}>
              <Text style={styles.featureItem}>• Liste complète des clients</Text>
              <Text style={styles.featureItem}>• Ajout et modification de clients</Text>
              <Text style={styles.featureItem}>• Historique des tournées par client</Text>
              <Text style={styles.featureItem}>• Recherche et filtres avancés</Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing[1]
  },
  headerSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary
  },
  content: {
    padding: spacing[4],
    flexGrow: 1,
    justifyContent: 'center'
  },
  infoSection: {
    marginTop: spacing[4]
  },
  infoCard: {
    padding: spacing[4]
  },
  infoTitle: {
    ...typography.bodyLarge,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing[3]
  },
  featureList: {
    gap: spacing[2]
  },
  featureItem: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing[1]
  }
});
