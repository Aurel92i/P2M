import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../navigation/AppNavigator';
import { useListingsStore } from '../store/useListingsStore';

type DashboardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Dashboard'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { lists, fetchLists, loading, error } = useListingsStore();

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Nouveau listing" onPress={() => navigation.navigate('NewListing')} />
      <Button title="Tester la carte" onPress={() => navigation.navigate('MapTest')} />
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Réessayer" onPress={fetchLists} />
        </View>
      )}
      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchLists} />}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ListingDetail', { id: item.id })}>
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text>{item.addresses.length} adresses</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  errorContainer: {
    padding: 16,
    margin: 8,
    backgroundColor: '#fee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fcc'
  },
  errorText: {
    color: '#c00',
    marginBottom: 8
  }
});
