import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ComingSoonIllustration } from '@/components/illustrations/Illustrations';
import { comingSoonFeatures } from '@/constants/mockData';
import { ScanLine, GitCompareArrows, Target, Trophy, Heart, Mic } from 'lucide-react-native';

const iconMap: Record<string, any> = {
  scan: ScanLine,
  compare: GitCompareArrows,
  target: Target,
  trophy: Trophy,
  heart: Heart,
  mic: Mic,
};

export default function ComingSoonScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Coming Soon" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.header}>
          <ComingSoonIllustration size={180} />
          <Text style={styles.title}>Exciting Features Ahead</Text>
          <Text style={styles.subtitle}>We're working hard to bring you even more ways to save. Here's what's coming to RandWise soon.</Text>
        </View>

        {comingSoonFeatures.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Target;
          return (
            <Card key={i} style={styles.featureCard} padding={16}>
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Icon size={22} color={Colors.primary} />
                </View>
                <View style={styles.featureInfo}>
                  <View style={styles.featureHeader}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Badge label="Soon" variant="gold" size="small" />
                  </View>
                  <Text style={styles.featureDesc}>{feature.description}</Text>
                </View>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { alignItems: 'center', marginTop: 8, marginBottom: 24 },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16, textAlign: 'center' },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, textAlign: 'center', lineHeight: 22 },
  featureCard: { marginBottom: 12 },
  featureRow: { flexDirection: 'row', gap: 14 },
  featureIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  featureInfo: { flex: 1 },
  featureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  featureTitle: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  featureDesc: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, lineHeight: 20 },
});
