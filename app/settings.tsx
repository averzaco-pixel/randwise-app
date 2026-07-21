import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Bell, Globe, Moon, Shield, Download, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(true);
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const Toggle = ({ on, onPress }: { on: boolean; onPress: () => void }) => (
    <TouchableOpacity style={[styles.toggle, on && styles.toggleOn]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.toggleKnob, on && styles.toggleKnobOn]} />
    </TouchableOpacity>
  );

  const sections = [
    {
      title: 'Notifications',
      items: [
        { label: 'Push notifications', value: notifications, setter: () => setNotifications(!notifications) },
        { label: 'Expiry alerts', value: expiryAlerts, setter: () => setExpiryAlerts(!expiryAlerts) },
        { label: 'Low stock alerts', value: lowStockAlerts, setter: () => setLowStockAlerts(!lowStockAlerts) },
        { label: 'Budget threshold alerts', value: budgetAlerts, setter: () => setBudgetAlerts(!budgetAlerts) },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { label: 'Dark mode', value: darkMode, setter: () => setDarkMode(!darkMode) },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Settings" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {sections.map((section, si) => (
          <View key={si} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card padding={0}>
              {section.items.map((item, ii) => (
                <View key={ii} style={[styles.settingRow, ii > 0 && styles.settingBorder]}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Toggle on={item.value} onPress={item.setter} />
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Other settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <Card padding={0}>
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <Globe size={18} color={Colors.primary} />
                <Text style={styles.settingLabel}>Language</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>English</Text>
                <ChevronRight size={18} color={Colors.slate400} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingRow, styles.settingBorder]} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <Download size={18} color={Colors.primary} />
                <Text style={styles.settingLabel}>Export data</Text>
              </View>
              <ChevronRight size={18} color={Colors.slate400} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.settingRow, styles.settingBorder]} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <Shield size={18} color={Colors.primary} />
                <Text style={styles.settingLabel}>Privacy</Text>
              </View>
              <ChevronRight size={18} color={Colors.slate400} />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.textMuted, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  settingBorder: { borderTopWidth: 1, borderTopColor: Colors.slate100 },
  settingLabel: { fontSize: 15, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingValue: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: Colors.slate200, padding: 2, justifyContent: 'center' },
  toggleOn: { backgroundColor: Colors.primary },
  toggleKnob: { width: 22, height: 22, borderRadius: 11, backgroundColor: Colors.white, shadowColor: Colors.slate900, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  toggleKnobOn: { alignSelf: 'flex-end' },
});
