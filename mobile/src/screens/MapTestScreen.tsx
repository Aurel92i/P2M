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
          setErrorMessage('Permission localisation refusée.');
          setStatusMessage('');
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
        setErrorMessage('Impossible de récupérer la position.');
        setStatusMessage('');
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

  const activeStatusMessage = errorMessage ?? statusMessage;
  const shouldShowLoader = !region && !errorMessage && Boolean(statusMessage);

  return (
    <View style={styles.container}>
      {isExpoGo ? (
        <Text style={styles.infoText}>
          Mode Expo Go : les tuiles Google nécessitent un Dev Client ou un build EAS, mais vous pouvez
          tester la récupération de localisation et les autres écrans via le QR code Expo Go.
        </Text>
      ) : null}
      {activeStatusMessage ? <Text style={styles.infoText}>{activeStatusMessage}</Text> : null}
      <Text style={styles.infoText}>
        Clé Google Maps chargée : {googleMapsApiKey ? 'Oui' : 'Non (GOOGLE_MAPS_KEY manquante)'}
      </Text>
      <Text style={styles.infoText}>
        Provider Google activé : {isGoogleProviderEnabled ? 'Oui' : 'Non'}
      </Text>
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