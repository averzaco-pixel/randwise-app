import { useState, useRef } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/illustrations/Logo';
import { FamilyShoppingIllustration, ShoppingBasketIllustration, PantryShelvesIllustration, FamilyMealIllustration, SavingsPiggyIllustration } from '@/components/illustrations/Illustrations';
import { Check } from 'lucide-react-native';

const steps = [
  {
    title: 'Set Your Monthly Budget',
    description: 'Tell RandWise how much you can spend on groceries each month. We will track every rand so you never overspend.',
    illustration: <ShoppingBasketIllustration size={220} />,
  },
  {
    title: 'Track Your Pantry',
    description: 'Add items to your pantry and we will monitor expiry dates and low stock, sending you reminders before food goes to waste.',
    illustration: <PantryShelvesIllustration size={220} />,
  },
  {
    title: 'Plan Your Meals',
    description: 'Get AI-powered recipe suggestions based on what is already in your pantry. Cook smarter and spend less.',
    illustration: <FamilyMealIllustration size={220} />,
  },
  {
    title: 'Watch Your Savings Grow',
    description: 'See how much you save each month with smart budgeting and reduced food waste. Every rand matters.',
    illustration: <SavingsPiggyIllustration size={220} />,
  },
  {
    title: 'Share With Your Household',
    description: 'Invite family members to share shopping lists, pantry items and meal plans. Saving is a team effort.',
    illustration: <FamilyShoppingIllustration size={220} />,
  },
];

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);

  const goToStep = (index: number) => {
    setStep(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      goToStep(step + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Logo size={40} />
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        style={styles.scrollView}
      >
        {steps.map((s, i) => (
          <View key={i} style={styles.stepContainer}>
            <View style={styles.illustrationWrapper}>{s.illustration}</View>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.description}>{s.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.dotsRow}>
        {steps.map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={step === steps.length - 1 ? 'Get Started' : 'Continue'}
          variant="primary"
          size="large"
          fullWidth
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12 },
  skipText: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.textMuted },
  scrollView: { flex: 1 },
  stepContainer: { width, alignItems: 'center', paddingHorizontal: 32, paddingTop: 20 },
  illustrationWrapper: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, textAlign: 'center', lineHeight: 34 },
  description: { fontSize: 16, fontFamily: 'Inter-Regular', color: Colors.textMuted, textAlign: 'center', marginTop: 16, lineHeight: 24 },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.slate300 },
  dotActive: { width: 28, backgroundColor: Colors.primary },
  footer: { paddingHorizontal: 24, paddingBottom: 16 },
});
