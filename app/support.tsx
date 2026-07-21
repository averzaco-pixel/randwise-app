import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { faqItems } from '@/constants/mockData';
import { Mail, MessageCircle, ChevronDown, LifeBuoy, Phone } from 'lucide-react-native';

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Support" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <Text style={styles.title}>How can we help?</Text>
        <Text style={styles.subtitle}>Our team is here to help you make the most of RandWise.</Text>

        {/* Contact options */}
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
            <View style={[styles.contactIcon, { backgroundColor: Colors.green100 }]}>
              <Mail size={20} color={Colors.primary} />
            </View>
            <Text style={styles.contactLabel}>Email us</Text>
            <Text style={styles.contactValue}>support@randwise.co.za</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactCard} activeOpacity={0.8}>
            <View style={[styles.contactIcon, { backgroundColor: Colors.gold100 }]}>
              <MessageCircle size={20} color={Colors.gold600} />
            </View>
            <Text style={styles.contactLabel}>Live chat</Text>
            <Text style={styles.contactValue}>Available 8am-6pm</Text>
          </TouchableOpacity>
        </View>

        {/* Contact form */}
        <Text style={styles.sectionTitle}>Send a Message</Text>
        <Card padding={20}>
          <Input label="Subject" value={subject} onChangeText={setSubject} placeholder="How can we help?" />
          <Text style={styles.label}>Message</Text>
          <View style={styles.messageWrapper}>
            <Input value={message} onChangeText={setMessage} placeholder="Describe your issue..." multiline numberOfLines={4} style={styles.messageInput} />
          </View>
          <View style={{ marginTop: 8 }}>
            <Button title="Send Message" variant="primary" size="medium" fullWidth icon={<Mail size={18} color={Colors.white} />} />
          </View>
        </Card>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqItems.map((faq, i) => (
          <Card key={i} style={styles.faqCard} padding={16}>
            <TouchableOpacity
              style={styles.faqHeader}
              onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
              activeOpacity={0.7}
            >
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <ChevronDown
                size={20}
                color={Colors.slate400}
                style={{ transform: [{ rotate: expandedFaq === i ? '180deg' : '0deg' }] }}
              />
            </TouchableOpacity>
            {expandedFaq === i && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  title: { fontSize: 24, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginTop: 8 },
  subtitle: { fontSize: 15, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 6 },
  contactRow: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 20 },
  contactCard: { flex: 1, alignItems: 'center', backgroundColor: Colors.white, borderRadius: 16, borderWidth: 1, borderColor: Colors.slate200, paddingVertical: 20 },
  contactIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginTop: 10 },
  contactValue: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, textAlign: 'center' },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  label: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, marginBottom: 8 },
  messageWrapper: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: Colors.slate50, borderWidth: 1.5, borderColor: Colors.slate200, borderRadius: 14, paddingHorizontal: 16 },
  messageInput: { minHeight: 80, paddingVertical: 14 },
  faqCard: { marginBottom: 10 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQuestion: { flex: 1, fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, lineHeight: 20 },
  faqAnswer: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 10, lineHeight: 22 },
});
