import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const googleMapsKey = process.env.GOOGLE_MAPS_KEY;

  return {
    ...config,
    name: config.name ?? 'route-optimizer-mobile',
    slug: config.slug ?? 'route-optimizer-mobile',
    extra: {
      ...config.extra,
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
