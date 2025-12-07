# P2M Mobile App - Pro My Maps

Application mobile React Native / Expo pour l'optimisation d'itinéraires de tournées professionnelles.

## 🚀 Stack Technique

- **Framework**: React Native avec Expo SDK 54
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Zustand
- **Forms & Validation**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Maps**: React Native Maps (Google Maps)
- **Styling**: StyleSheet avec Design System personnalisé

## 📦 Dépendances Principales

### Core
- `expo` ^54.0.0
- `react` 19.1.0
- `react-native` 0.81.5

### Navigation
- `@react-navigation/native` ^6.1.9
- `@react-navigation/native-stack` ^6.9.17
- `@react-navigation/bottom-tabs` ^6.5.20

### State & Data
- `zustand` ^4.5.2
- `axios` ^1.7.2

### Forms
- `react-hook-form`
- `zod`
- `@hookform/resolvers`

### UI & Fonts
- `@expo-google-fonts/inter`
- `@expo-google-fonts/poppins`
- `expo-font`

### Maps & Location
- `react-native-maps` 1.20.1
- `expo-location` ~19.0.8

### Storage & Auth
- `expo-secure-store` ~15.0.8
- `expo-local-authentication` (à configurer)

### Autres
- `react-native-reanimated` ~4.1.1
- `react-native-gesture-handler` ~2.28.0
- `@react-native-async-storage/async-storage`
- `expo-notifications`
- `react-native-chart-kit`

## 🎨 Design System

### Palette de Couleurs
```typescript
{
  primary: '#2563EB',        // Bleu professionnel
  primaryDark: '#1E40AF',
  secondary: '#10B981',      // Vert succès
  accent: '#F59E0B',         // Orange
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  error: '#EF4444',
  border: '#E2E8F0',
}
```

### Typographie
- **Headers**: Poppins (Bold, SemiBold)
- **Body**: Inter (Regular, Medium, SemiBold)

### Composants UI Réutilisables
```
src/components/ui/
├── Button.tsx          # Variants: primary, secondary, outline, ghost, danger
├── Input.tsx           # Avec validation et états d'erreur
├── Card.tsx            # Variants: default, outlined, elevated
├── Avatar.tsx          # Avec initiales fallback
├── Badge.tsx           # Statuts colorés
├── LoadingSpinner.tsx  # Indicateur de chargement
├── EmptyState.tsx      # État vide avec action
└── BottomSheet.tsx     # Modal glissante
```

## 📂 Structure du Projet

```
mobile/
├── App.tsx                      # Point d'entrée avec chargement des fonts
├── app.config.ts                # Configuration Expo
├── src/
│   ├── components/
│   │   └── ui/                  # Composants UI réutilisables
│   ├── hooks/
│   │   └── useFonts.ts         # Hook pour charger les fonts
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Configuration navigation
│   ├── screens/
│   │   ├── auth/               # Écrans d'authentification
│   │   │   ├── WelcomeScreen.tsx
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── RegisterScreen.tsx
│   │   │   └── ForgotPasswordScreen.tsx
│   │   ├── SplashScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── NewListingScreen.tsx
│   │   ├── ListingDetailScreen.tsx
│   │   └── MapTestScreen.tsx
│   ├── services/
│   │   └── apiClient.ts        # Configuration Axios
│   ├── store/
│   │   ├── useAuthStore.ts     # Store d'authentification
│   │   └── useListingsStore.ts # Store des tournées
│   ├── theme/
│   │   ├── colors.ts           # Palette de couleurs
│   │   ├── typography.ts       # Styles de texte
│   │   ├── spacing.ts          # Espacements et ombres
│   │   └── index.ts
│   └── types/
│       └── entities.ts         # Types TypeScript
```

## 🔐 Authentification

Le store d'authentification (`useAuthStore`) gère :
- Login / Register / Logout
- Stockage sécurisé du token JWT (SecureStore)
- Refresh automatique du token
- Mise à jour du profil utilisateur
- Bootstrap au démarrage de l'app

### Flow d'authentification
1. **SplashScreen** : Vérifie le token stocké et bootstrap l'auth
2. **WelcomeScreen** : Onboarding avec 3 slides
3. **LoginScreen** : Connexion avec validation (email + mot de passe)
4. **RegisterScreen** : Inscription avec force du mot de passe
5. **ForgotPasswordScreen** : Réinitialisation du mot de passe

## 🗺️ Navigation

### Structure
- **Stack Navigator** (Auth Flow + Main App)
  - Splash
  - Welcome
  - Login / Register / ForgotPassword
  - **Bottom Tab Navigator** (Main App)
    - Dashboard (🏠)
    - Routes (🗺️)
    - Clients (👥)
    - Profile (👤)
  - Modals (NewListing, ListingDetail, MapTest)

## 🚀 Commandes

```bash
# Installer les dépendances
npm install

# Démarrer l'app
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web

# Type check
npm run typecheck
```

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env` à la racine du dossier `mobile/` :
```env
GOOGLE_MAPS_KEY=votre_cle_google_maps
```

### API Backend
Par défaut, l'app se connecte à `http://localhost:4000`.
Modifier dans `src/services/apiClient.ts` si nécessaire.

## ✅ Fonctionnalités Implémentées

- ✅ Design System complet avec composants UI
- ✅ Authentification complète (Login, Register, Forgot Password)
- ✅ Navigation avec tabs
- ✅ Store Auth avec refresh token automatique
- ✅ Validation des formulaires avec Zod
- ✅ Chargement des fonts personnalisées
- ✅ Écran d'onboarding

## 🚧 Fonctionnalités à Implémenter

- [ ] Dashboard amélioré avec statistiques
- [ ] Écrans de gestion des tournées (Routes)
- [ ] Optimisation d'itinéraires (algorithme TSP)
- [ ] Carte interactive avec markers
- [ ] Navigation active vers Google Maps/Waze
- [ ] Gestion des clients
- [ ] Mode hors-ligne avec sync
- [ ] Notifications push
- [ ] Profil utilisateur complet
- [ ] Statistiques et graphiques
- [ ] Biométrie (Face ID / Touch ID)
- [ ] Social login (Google, Apple)

## 📝 Notes

- L'app utilise Expo pour simplifier le développement et le build
- Les fonts Inter et Poppins sont chargées au démarrage
- Le token JWT est stocké de manière sécurisée avec SecureStore
- La navigation utilise des types TypeScript stricts pour la sécurité

## 🐛 Debug

Si vous rencontrez des problèmes :
1. Vérifier que toutes les dépendances sont installées : `npm install`
2. Nettoyer le cache : `npx expo start -c`
3. Vérifier la clé Google Maps dans `.env`
4. Vérifier que le backend est bien lancé sur `localhost:4000`

## 📄 License

Projet privé - Tous droits réservés
