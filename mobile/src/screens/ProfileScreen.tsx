import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/AppNavigator';
import { useAuthStore } from '../store/useAuthStore';
import { Button, Card, Avatar } from '../components/ui';
import { colors, typography, spacing } from '../theme';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, logout } = useAuthStore();

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) return user.firstName;
    if (user?.lastName) return user.lastName;
    return 'Utilisateur';
  };

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Déconnexion',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Welcome');
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <Avatar
            name={getUserName()}
            size="xlarge"
            style={styles.avatar}
          />
          <Text style={styles.userName}>{getUserName()}</Text>
          <Text style={styles.userEmail}>{user?.email || 'Email non défini'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du compte</Text>
          <Card variant="outlined">
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Prénom</Text>
              <Text style={styles.infoValue}>{user?.firstName || '-'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nom</Text>
              <Text style={styles.infoValue}>{user?.lastName || '-'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email || '-'}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>{user?.phone || '-'}</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <Button
            title="Modifier le profil"
            variant="outline"
            onPress={() => Alert.alert('À venir', 'La modification du profil sera bientôt disponible')}
            style={styles.actionButton}
          />
          <Button
            title="Changer le mot de passe"
            variant="outline"
            onPress={() => Alert.alert('À venir', 'Le changement de mot de passe sera bientôt disponible')}
            style={styles.actionButton}
          />
        </View>

        <View style={styles.section}>
          <Button
            title="Se déconnecter"
            variant="danger"
            onPress={handleLogout}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>P2M - Pro My Maps</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text
  },
  content: {
    padding: spacing[4]
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing[6],
    marginBottom: spacing[4]
  },
  avatar: {
    marginBottom: spacing[3]
  },
  userName: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing[1]
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary
  },
  section: {
    marginBottom: spacing[6]
  },
  sectionTitle: {
    ...typography.bodyLarge,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing[3]
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4]
  },
  infoLabel: {
    ...typography.body,
    color: colors.textSecondary
  },
  infoValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '500'
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing[4]
  },
  actionButton: {
    marginBottom: spacing[2]
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  footerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[1]
  }
});
