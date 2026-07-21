import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { pricingPlans } from '@/constants/mockData';
import { Check, Crown, Sparkles, Shield } from 'lucide-react-native';

export default function PricingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Choose Your Plan" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <Text style={styles.title}>Premium grocery budgeting</Text>
        <Text style={styles.subtitle}>Pick the plan that fits your household. Upgrade or downgrade anytime.</Text>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {pricingPlans.map(plan => (
            <Card
              key={plan.id}
              style={[styles.planCard, plan.popular && styles.popularCard]}
              padding={20}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Crown size={12} color={Colors.white} />
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}
              <View style={styles.planHeader}>
                {plan.id === 'free' && <View style={[styles.planIcon, { backgroundColor: Colors.slate100 }]}><Sparkles size={20} color={Colors.slate600} /></View>}
                {plan.id === 'family' && <View style={[styles.planIcon, { backgroundColor: Colors.green100 }]}><Crown size={20} color={Colors.primary} /></View>}
                {plan.id === 'plus' && <View style={[styles.planIcon, { backgroundColor: Colors.gold100 }]}><Crown size={20} color={Colors.gold600} /></View>}
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDesc}>{plan.description}</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceSymbol}>R</Text>
                <Text style={styles.priceAmount}>{plan.price}</Text>
                <Text style={styles.pricePeriod}>/{plan.period}</Text>
              </View>

              <View style={styles.featuresList}>
                {plan.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <View style={styles.featureCheck}>
                      <Check size={12} color={Colors.white} />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <View style={{ marginTop: 16 }}>
                <Button
                  title={plan.cta}
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="large"
                  fullWidth
                  onPress={() => plan.id === 'free' ? router.replace('/(tabs)') : router.push({ pathname: '/checkout', params: { planId: plan.id } })}
                />
              </View>
            </Card>
          ))}
        </View>

        {/* Payment security */}
        <View style={styles.securityRow}>
          <Shield size={16} color={Colors.slate400} />
          <Text style={styles.securityText}>Secure recurring card payment powered by PayFast.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6, lineHeight: 22 },
  plansContainer: { marginTop: 24, gap: 16 },
  planCard: { position: 'relative' },
  popularCard: { borderWidth: 2, borderColor: Colors.primary, shadowColor: Colors.primary, shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  popularBadge: { position: 'absolute', top: -12, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  popularBadgeText: { fontSize: 10, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white, letterSpacing: 0.5 },
  planHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  planName: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  planDesc: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 16 },
  priceSymbol: { fontSize: 20, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  priceAmount: { fontSize: 40, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  pricePeriod: { fontSize: 16, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  featuresList: { marginTop: 16, gap: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureCheck: { width: 18, height: 18, borderRadius: 5, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  featureText: { flex: 1, fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.text, lineHeight: 20 },
  securityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, paddingHorizontal: 20 },
  securityText: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, textAlign: 'center' },
});
