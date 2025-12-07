import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

const FALLBACK_GOOGLE_MAPS_KEY = AIzaSyCJmYRiBoF4lVWQIOPhx1vI4ExlRmJBOPg;

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
    console.warn('Aucune clé Google Maps dans l\'environnement : utilisation de la clé fournie en secours.');
  }
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const googleMapsKey = process.env.GOOGLE_MAPS_KEY;

  return {
    ...config,
    name: config.name ?? 'route-optimizer-mobile',
    slug: config.slug ?? 'route-optimizer-mobile',
    extra: {
      ...config.extra,
      googleMapsApiKey: googleMapsKey ?? ''
      googleMapsApiKey: googleMapsKey
    },
    android: {
      ...config.android,
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
      config: {
        ...(config.ios?.config ?? {}),
        googleMapsApiKey: googleMapsKey
      }
    }
  };
};
