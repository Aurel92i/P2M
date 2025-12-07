import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { apiClient } from '../services/apiClient';
import { useAuthStore } from '../store/useAuthStore';

export function SignupScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Signup'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthStore();

  const onSignup = async () => {
    try {
      const res = await apiClient.post<{ token: string }>('/auth/signup', { email, password });
      await setToken(res.data.token);
      navigation.replace('Dashboard');
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="S'inscrire" onPress={onSignup} />
      <Button title="Déjà inscrit ?" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 }
});
