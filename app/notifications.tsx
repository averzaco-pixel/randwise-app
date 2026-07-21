import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { notifications } from '@/constants/mockData';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const iconMap = {
    warning: { icon: AlertTriangle, color: Colors.gold600, bg: Colors.gold100 },
    info: { icon: Info, color: Colors.blue500, bg: Colors.blue100 },
    success: { icon: CheckCircle, color: Colors.primary, bg: Colors.green100 },
    error: { icon: XCircle, color: Colors.error, bg: Colors.red100 },
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Notifications" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Recent</Text>
          <TouchableOpacity>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        </View>

        {notifications.map(notif => {
          const cfg = iconMap[notif.type];
          const Icon = cfg.icon;
          return (
            <Card key={notif.id} style={[styles.notifCard, !notif.read && styles.unreadCard]} padding={16}>
              <View style={styles.notifRow}>
                <View style={[styles.notifIcon, { backgroundColor: cfg.bg }]}>
                  <Icon size={20} color={cfg.color} />
                </View>
                <View style={styles.notifInfo}>
                  <View style={styles.notifHeader}>
                    <Text style={styles.notifTitle}>{notif.title}</Text>
                    {!notif.read && <View style={styles.unreadDot} />}
                  </View>
                  <Text style={styles.notifMessage}>{notif.message}</Text>
                  <Text style={styles.notifTime}>{notif.time}</Text>
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
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  markAllText: { fontSize: 14, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.primary },
  notifCard: { marginBottom: 10 },
  unreadCard: { borderWidth: 1.5, borderColor: Colors.green200 },
  notifRow: { flexDirection: 'row', gap: 12 },
  notifIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  notifInfo: { flex: 1 },
  notifHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  notifTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text, flex: 1 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  notifMessage: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4, lineHeight: 20 },
  notifTime: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.slate400, marginTop: 6 },
});
