import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Button } from '../../components/ui';
import { colors, typography, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    title: 'Optimisez vos tournées',
    description: 'P2M calcule automatiquement le meilleur itinéraire pour visiter tous vos clients',
    icon: '🗺️',
  },
  {
    title: 'Gagnez du temps',
    description: 'Réduisez votre temps de route et visitez plus de clients chaque jour',
    icon: '⏱️',
  },
  {
    title: 'Suivez vos performances',
    description: 'Visualisez vos statistiques et améliorez votre efficacité au quotidien',
    icon: '📊',
  },
];

export function WelcomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Welcome'>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setCurrentSlide(slideIndex);
  };

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * (currentSlide + 1),
        animated: true,
      });
    }
  };

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.content}>
              <Text style={styles.icon}>{slide.icon}</Text>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentSlide && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {isLastSlide ? (
          <View style={styles.actions}>
            <Button
              title="Créer un compte"
              onPress={() => navigation.navigate('Register')}
              fullWidth
              style={styles.button}
            />
            <Button
              title="J'ai déjà un compte"
              variant="ghost"
              onPress={() => navigation.navigate('Login')}
              fullWidth
            />
          </View>
        ) : (
          <Button title="Suivant" onPress={goToNextSlide} fullWidth />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  icon: {
    fontSize: 120,
    marginBottom: spacing[8],
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  description: {
    ...typography.bodyLarge,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[8],
    paddingTop: spacing[4],
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: spacing[1],
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  actions: {
    gap: spacing[3],
  },
  button: {
    marginBottom: spacing[2],
  },
});
