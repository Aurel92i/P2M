import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { apiClient } from '../services/apiClient';
import { Address, AddressList } from '../types/entities';
import * as Location from 'expo-location';

export function ListingDetailScreen({ route }: NativeStackScreenProps<RootStackParamList, 'ListingDetail'>) {
  const { id } = route.params;
  const [list, setList] = useState<AddressList | null>(null);
  const [recipients, setRecipients] = useState('');

  const load = async () => {
    const res = await apiClient.get<AddressList>(`/address-lists/${id}`);
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const optimize = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;
    const loc = await Location.getCurrentPositionAsync({});
    await apiClient.post(`/address-lists/${id}/optimize-route`, {
      startLat: loc.coords.latitude,
      startLng: loc.coords.longitude
    });
    load();
  };

  const saveComments = async (addr: Address) => {
    if (!list) return;
    const updated = list.addresses.map((a) => (a.id === addr.id ? addr : a));
    await apiClient.put(`/address-lists/${id}/addresses`, {
      addresses: updated.map((a) => ({ id: a.id, formattedAddress: a.formattedAddress, comment: a.comment, orderIndex: a.orderIndex }))
    });
    load();
  };

  const sendEmail = async () => {
    const emails = recipients.split(',').map((e) => e.trim()).filter(Boolean);
    await apiClient.post(`/address-lists/${id}/send-route-email`, { recipients: emails });
    Alert.alert('Succès', 'Email envoyé');
  };

  if (!list) return <Text>Chargement...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.title}>{list.label}</Text>
      <Button title="Optimiser l'itinéraire" onPress={optimize} />
      <FlatList
        scrollEnabled={false}
        data={[...list.addresses].sort((a, b) => a.orderIndex - b.orderIndex)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.formattedAddress}</Text>
            <Text>Ordre: {item.orderIndex + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Commentaire"
              value={item.comment ?? ''}
              onChangeText={(txt) => saveComments({ ...item, comment: txt })}
            />
          </View>
        )}
      />
      <Text style={styles.subtitle}>Carte</Text>
      <MapView style={{ height: 200 }}>
        {list.addresses.map(
          (addr) =>
            addr.latitude &&
            addr.longitude && (
              <Marker key={addr.id} coordinate={{ latitude: addr.latitude, longitude: addr.longitude }} title={addr.formattedAddress} />
            )
        )}
      </MapView>
      <Text style={styles.subtitle}>Envoyer par email</Text>
      <TextInput style={styles.input} placeholder="email1@example.com,email2@example.com" value={recipients} onChangeText={setRecipients} />
      <Button title="Envoyer" onPress={sendEmail} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { marginTop: 16, fontWeight: 'bold' },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginVertical: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 8, marginTop: 8 }
});
