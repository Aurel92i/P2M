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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get<AddressList>(`/address-lists/${id}`);
      setList(res.data);
    } catch (err: any) {
      console.error('Erreur lors du chargement:', err);
      setError(err.response?.data?.message || err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const optimize = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', 'La permission de localisation est requise');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      await apiClient.post(`/address-lists/${id}/optimize-route`, {
        startLat: loc.coords.latitude,
        startLng: loc.coords.longitude
      });
      await load();
      Alert.alert('Succès', 'Itinéraire optimisé');
    } catch (err: any) {
      console.error('Erreur lors de l\'optimisation:', err);
      Alert.alert('Erreur', err.response?.data?.message || err.message || 'Erreur lors de l\'optimisation');
    }
  };

  const saveComments = async (addr: Address) => {
    try {
      if (!list) return;
      const updated = list.addresses.map((a) => (a.id === addr.id ? addr : a));
      await apiClient.put(`/address-lists/${id}/addresses`, {
        addresses: updated.map((a) => ({ id: a.id, formattedAddress: a.formattedAddress, comment: a.comment, orderIndex: a.orderIndex }))
      });
      await load();
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde:', err);
      Alert.alert('Erreur', err.response?.data?.message || err.message || 'Erreur lors de la sauvegarde');
    }
  };

  const sendEmail = async () => {
    try {
      const emails = recipients.split(',').map((e) => e.trim()).filter(Boolean);
      if (emails.length === 0) {
        Alert.alert('Erreur', 'Veuillez entrer au moins une adresse email');
        return;
      }
      await apiClient.post(`/address-lists/${id}/send-route-email`, { recipients: emails });
      Alert.alert('Succès', 'Email envoyé');
      setRecipients('');
    } catch (err: any) {
      console.error('Erreur lors de l\'envoi:', err);
      Alert.alert('Erreur', err.response?.data?.message || err.message || 'Erreur lors de l\'envoi de l\'email');
    }
  };

  if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Chargement...</Text></View>;
  if (error) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Text style={{ color: '#c00', marginBottom: 16 }}>{error}</Text>
      <Button title="Réessayer" onPress={load} />
    </View>
  );
  if (!list) return <Text>Aucune donnée</Text>;

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
