import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useListingsStore } from '../store/useListingsStore';

export function DashboardScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Dashboard'>) {
  const { lists, fetchLists, loading } = useListingsStore();

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <View style={{ flex: 1 }}>
      <Button title="Nouveau listing" onPress={() => navigation.navigate('NewListing')} />
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
  cardTitle: { fontSize: 18, fontWeight: 'bold' }
});
