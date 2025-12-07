import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const DEFAULT_REGION: Region = {
  latitude: 48.8566,
  longitude: 2.3522,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05
};

export function MapTestScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Demande des permissions...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const prepareLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setStatusMessage('');
          setErrorMessage('Permission localisation refusée.');
          return;
        }

        setStatusMessage('Récupération de la position...');
        const currentPosition = await Location.getCurrentPositionAsync({});

        setRegion({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        });
        setStatusMessage('');
      } catch (error) {
        setStatusMessage('');
        setErrorMessage('Impossible de récupérer la position.');
      }
    };

    prepareLocation();
  }, []);

  const googleMapsApiKey =
    Constants.expoConfig?.extra?.googleMapsApiKey ??
    Constants.manifest2?.extra?.googleMapsApiKey ??
    Constants.manifest?.extra?.googleMapsApiKey ??
    '';
  const isExpoGo = Constants.appOwnership === 'expo';
  const platformSupportsGoogleProvider = Platform.OS === 'ios' || Platform.OS === 'android';
  const hasGoogleKey = Boolean(googleMapsApiKey);
  const isGoogleProviderEnabled = platformSupportsGoogleProvider && hasGoogleKey && !isExpoGo;
  const providerStatus = isGoogleProviderEnabled
    ? 'Oui'
    : !platformSupportsGoogleProvider
      ? 'Non (plateforme non supportée)'
      : isExpoGo
        ? 'Non (nécessite un build dev/production, pas Expo Go)'
        : 'Non (clé absente)';
  const providerHint = !platformSupportsGoogleProvider
    ? null
    : isGoogleProviderEnabled
      ? null
      : isExpoGo
        ? 'Utilisez un build dev client ou EAS pour activer le provider Google.'
        : "Ajoutez GOOGLE_MAPS_KEY dans l'environnement et reconstruisez l'app pour activer le provider Google.";
  const activeStatusMessage = errorMessage ?? statusMessage;
  const shouldShowLoader = !region && !errorMessage && Boolean(statusMessage);

  if (isExpoGo) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>Google Maps n'est pas disponible dans Expo Go.</Text>
        <Text style={styles.infoText}>
          Utilisez un Dev Client (`expo run:android` / `expo run:ios`) ou un build EAS pour tester l'affichage des tuiles Google
          et de la position.
        </Text>
        <Text style={styles.infoText}>
          Si vous voyez des erreurs de compilation JS dans Expo Go, relancez l'application après avoir construit un Dev Client;
          le code de la carte nécessite le native module Google Maps absent d'Expo Go.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {activeStatusMessage && <Text style={styles.infoText}>{activeStatusMessage}</Text>}
      <Text style={styles.infoText}>
        Clé Google Maps chargée : {googleMapsApiKey ? 'Oui' : 'Non (GOOGLE_MAPS_KEY manquante)'}
      </Text>
      <Text style={styles.infoText}>Provider Google activé : {providerStatus}</Text>
      {isExpoGo && (
        <Text style={styles.infoText}>
          Exécution dans Expo Go : le provider Google n'est pas disponible. Utilisez un Dev Client ou un build EAS pour valider
          les tuiles Google.
        </Text>
      )}
      {providerHint && <Text style={styles.infoText}>{providerHint}</Text>}
      <View style={styles.mapContainer}>
        {region ? (
          <MapView
            style={styles.map}
            provider={isGoogleProviderEnabled ? PROVIDER_GOOGLE : undefined}
            showsUserLocation
            initialRegion={region}
          >
            <Marker coordinate={region} title="Position actuelle" />
          </MapView>
        ) : shouldShowLoader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <MapView
            style={styles.map}
            provider={isGoogleProviderEnabled ? PROVIDER_GOOGLE : undefined}
            initialRegion={DEFAULT_REGION}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  infoText: { marginBottom: 8 },
  mapContainer: { flex: 1, borderWidth: 1, borderColor: '#e1e1e1', borderRadius: 8, overflow: 'hidden' },
  map: { flex: 1 },
  loaderContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
