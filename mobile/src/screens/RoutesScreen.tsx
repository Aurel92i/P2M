import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { useListingsStore } from '../store/useListingsStore';
import { LoadingSpinner, EmptyState, Card } from '../components/ui';
import { colors, typography, spacing } from '../theme';

type RoutesScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Routes'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function RoutesScreen({ navigation }: RoutesScreenProps) {
  const { lists, fetchLists, loading, error } = useListingsStore();

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  if (loading && lists.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingSpinner message="Chargement des tournées..." />
      </View>
    );
  }

  if (error && lists.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Erreur de chargement"
          message={error}
          actionLabel="Réessayer"
          onAction={fetchLists}
        />
      </View>
    );
  }

  if (lists.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Aucune tournée"
          message="Créez votre première tournée pour commencer"
          actionLabel="Nouvelle tournée"
          onAction={() => navigation.navigate('NewListing')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Tournées</Text>
        <Text style={styles.headerSubtitle}>{lists.length} tournée{lists.length > 1 ? 's' : ''}</Text>
      </View>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ListingDetail', { id: item.id })}>
            <Card variant="elevated" style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📍</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.label}</Text>
                  <Text style={styles.cardSubtitle}>
                    {item.addresses.length} adresse{item.addresses.length > 1 ? 's' : ''}
                  </Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
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
  listContent: {
    padding: spacing[4]
  },
  card: {
    marginBottom: spacing[3]
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3]
  },
  icon: {
    fontSize: 24
  },
  cardContent: {
    flex: 1
  },
  cardTitle: {
    ...typography.bodyLarge,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing[1]
  },
  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary
  },
  arrow: {
    fontSize: 28,
    color: colors.textSecondary,
    marginLeft: spacing[2]
  }
});
