import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { FileText } from 'lucide-react-native';

export default function TermsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sections = [
    { title: 'Acceptance of Terms', body: 'By creating a RandWise account and using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.' },
    { title: 'Description of Service', body: 'RandWise is a grocery budgeting and household savings app that provides tools for tracking expenses, managing shopping lists, monitoring pantry inventory, generating AI meal suggestions, and producing spending reports.' },
    { title: 'Subscription Plans', body: 'RandWise offers three plans: Free (R0/month), Family (R79/month), and Plus (R129/month). Paid subscriptions are billed monthly via PayFast. You may upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the next billing cycle.' },
    { title: 'Payment Terms', body: 'Paid subscriptions are processed securely through PayFast. By subscribing, you authorise recurring monthly charges to your chosen payment method until cancellation. Failed payments may result in suspension of premium features.' },
    { title: 'User Responsibilities', body: 'You are responsible for maintaining the accuracy of your pantry and budget data. You agree not to misuse the app, attempt to bypass subscription limits, or use the service for any unlawful purpose.' },
    { title: 'AI Meal Suggestions', body: 'AI-generated meal suggestions are based on your pantry items and preferences. We do not guarantee nutritional adequacy or suitability for specific dietary needs. Always use your own judgement when preparing meals.' },
    { title: 'Intellectual Property', body: 'RandWise, its logo, illustrations, and software are the property of RandWise (Pty) Ltd. You may not copy, modify, or distribute our content without permission.' },
    { title: 'Limitation of Liability', body: 'RandWise is provided "as is" without warranties of any kind. We are not liable for any losses resulting from inaccurate budget tracking, missed expiry alerts, or meal suggestions that do not meet your dietary requirements.' },
    { title: 'Termination', body: 'You may delete your account at any time. We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your data will be deleted within 30 days.' },
    { title: 'Governing Law', body: 'These terms are governed by the laws of the Republic of South Africa. Any disputes will be resolved in the courts of Cape Town, South Africa.' },
    { title: 'Changes to Terms', body: 'We may update these terms from time to time. We will notify you of significant changes via email or in-app notification. Continued use of RandWise after changes constitutes acceptance of the updated terms.' },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Terms of Service" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.iconRow}>
          <View style={styles.icon}>
            <FileText size={28} color={Colors.primary} />
          </View>
        </View>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.updated}>Last updated: 17 July 2026</Text>
        <Text style={styles.intro}>
          Please read these terms carefully before using RandWise. By using our services, you agree to be bound by the following terms and conditions.
        </Text>

        {sections.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{`${i + 1}. ${section.title}`}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  iconRow: { alignItems: 'center', marginTop: 8 },
  icon: { width: 64, height: 64, borderRadius: 20, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 16, textAlign: 'center' },
  updated: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  intro: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 16, lineHeight: 22 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  sectionBody: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 8, lineHeight: 22 },
});
