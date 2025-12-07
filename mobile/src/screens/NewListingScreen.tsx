import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { apiClient } from '../services/apiClient';

export function NewListingScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'NewListing'>) {
  const [label, setLabel] = useState('');
  const [rawAddresses, setRawAddresses] = useState('');

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ base64: true });
    if (!result.canceled && result.assets[0].base64) {
      const form = new FormData();
      form.append('file', {
        // @ts-expect-error FormData typing for React Native
        uri: result.assets[0].uri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });
      const res = await apiClient.post('/ocr/from-image', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const addresses = (res.data.addresses as string[]).join('\n');
      setRawAddresses(addresses);
    }
  };

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
      <Button title="Prendre une photo" onPress={pickImage} />
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 }
});
