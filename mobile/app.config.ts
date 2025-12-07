import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const FALLBACK_GOOGLE_MAPS_KEY = "AIzaSyCJmYRiBoF4lVWQIOPhx1vI4ExlRmJBOPg";

export default ({ config }: ConfigContext): ExpoConfig => {
  const envGoogleMapsKey = process.env.GOOGLE_MAPS_KEY;
  const googleMapsKey = envGoogleMapsKey ?? FALLBACK_GOOGLE_MAPS_KEY;
  const missingKeyMessage =
    'GOOGLE_MAPS_KEY est manquante. Définissez-la dans votre environnement (ex: .env, eas secrets) pour activer Google Maps.';

  if (!googleMapsKey) {
    if (process.env.CI || process.env.EAS_BUILD) {
      throw new Error(missingKeyMessage);
    }

    console.warn(missingKeyMessage);
  } else if (!envGoogleMapsKey) {
    console.warn("Aucune clé Google Maps dans l'environnement : utilisation de la clé fournie en secours.");
  }

  return {
    ...config,
    name: config.name ?? 'P2M',
    slug: config.slug ?? 'p2m',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#2563EB'
    },
    extra: {
      ...config.extra,
      googleMapsApiKey: googleMapsKey
    },
    android: {
      ...config.android,
      package: 'com.p2m.app',
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION', 'CAMERA'],
      config: {
        ...(config.android?.config ?? {}),
        googleMaps: {
          ...config.android?.config?.googleMaps,
          apiKey: googleMapsKey
        }
      }
    },
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: 'com.p2m.app',
      infoPlist: {
        NSLocationWhenInUseUsageDescription: 'P2M utilise votre position pour optimiser vos itinéraires',
        NSLocationAlwaysUsageDescription: 'P2M utilise votre position pour optimiser vos itinéraires',
        NSCameraUsageDescription: 'P2M utilise la caméra pour scanner les adresses',
        NSPhotoLibraryUsageDescription: 'P2M accède à vos photos pour scanner les adresses',
        NSFaceIDUsageDescription: 'P2M utilise Face ID pour sécuriser votre connexion'
      },
      config: {
        ...(config.ios?.config ?? {}),
        googleMapsApiKey: googleMapsKey
      }
    },
    plugins: [
      'expo-font',
      'expo-secure-store',
      'expo-local-authentication',
      'expo-location',
      [
        'expo-notifications',
        {
          icon: './assets/notification-icon.png',
          color: '#2563EB'
        }
      ]
    ]
  };
};
