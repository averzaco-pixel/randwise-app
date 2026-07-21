import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Shield } from 'lucide-react-native';

export default function PrivacyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const sections = [
    { title: 'Information We Collect', body: 'RandWise collects information you provide directly, including your name, email address, household details, grocery budgets, shopping lists, pantry inventory, and meal planning preferences. We also collect usage data to improve our services.' },
    { title: 'How We Use Your Information', body: 'We use your information to provide and improve the RandWise app, send you budget alerts and expiry notifications, generate AI meal suggestions, process subscription payments, and provide customer support.' },
    { title: 'Data Storage and Security', body: 'Your data is stored securely using industry-standard encryption. We use Supabase for data storage with row-level security policies. Payment information is processed by PayFast and never stored on our servers.' },
    { title: 'Data Sharing', body: 'We do not sell or rent your personal information. We share data only with trusted service providers (PayFast for payments, Supabase for storage) who are bound by confidentiality obligations.' },
    { title: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information. You can export your data from Settings or request deletion by contacting support@randwise.co.za.' },
    { title: 'Data Retention', body: 'We retain your data for as long as your account is active. After account deletion, we remove your data within 30 days, except where retention is required by South African law.' },
    { title: 'Children\'s Privacy', body: 'RandWise is not intended for children under 13. We do not knowingly collect data from children under 13. If you believe we have collected such data, please contact us immediately.' },
    { title: 'Changes to This Policy', body: 'We may update this privacy policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of RandWise constitutes acceptance of the updated policy.' },
    { title: 'Contact Us', body: 'If you have questions about this privacy policy, contact us at privacy@randwise.co.za or write to RandWise (Pty) Ltd, Cape Town, South Africa.' },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Privacy Policy" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.iconRow}>
          <View style={styles.icon}>
            <Shield size={28} color={Colors.primary} />
          </View>
        </View>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.updated}>Last updated: 17 July 2026</Text>
        <Text style={styles.intro}>
          At RandWise, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information in accordance with the Protection of Personal Information Act (POPIA).
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
