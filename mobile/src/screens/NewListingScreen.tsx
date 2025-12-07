import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { apiClient } from '../services/apiClient';

export function NewListingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'NewListing'>) {
  const [label, setLabel] = useState('');
  const [rawAddresses, setRawAddresses] = useState('');

  const saveListing = async () => {
    try {
      const addresses = rawAddresses
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      await apiClient.post('/address-lists', { label: label || 'Listing', addresses });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Nouveau listing</Text>
      <TextInput placeholder="Nom" style={styles.input} value={label} onChangeText={setLabel} />
      <View style={styles.noticeBox}>
        <Text style={styles.noticeTitle}>Capture photo indisponible</Text>
        <Text style={styles.noticeBody}>
          L'analyse automatique nécessite le module Expo "expo-image-picker", absent dans cet environnement. Ajoutez vos
          adresses manuellement dans la zone ci-dessous pour créer le listing.
        </Text>
      </View>
      <Text style={styles.subtitle}>Adresses (une par ligne)</Text>
      <TextInput
        multiline
        numberOfLines={8}
        style={[styles.input, { height: 160 }]}
        value={rawAddresses}
        onChangeText={setRawAddresses}
      />
      <Button title="Enregistrer" onPress={saveListing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  subtitle: { marginTop: 16, marginBottom: 8, fontWeight: 'bold' },
  noticeBox: { borderWidth: 1, borderColor: '#f0ad4e', backgroundColor: '#fff9ed', padding: 12, borderRadius: 8, marginBottom: 12 },
  noticeTitle: { fontWeight: 'bold', color: '#8a6d3b', marginBottom: 4 },
  noticeBody: { color: '#8a6d3b' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 }
});
