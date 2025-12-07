import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { NewListingScreen } from '../screens/NewListingScreen';
import { ListingDetailScreen } from '../screens/ListingDetailScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  NewListing: undefined;
  ListingDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Créer un compte" }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Mes listings' }} />
        <Stack.Screen name="NewListing" component={NewListingScreen} options={{ title: 'Nouveau listing' }} />
        <Stack.Screen name="ListingDetail" component={ListingDetailScreen} options={{ title: 'Détail listing' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
