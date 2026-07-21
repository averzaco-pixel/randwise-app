import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Logo } from '@/components/illustrations/Logo';
import { householdMembers } from '@/constants/mockData';
import { ChevronRight, Crown, Settings, Bell, LifeBuoy, Shield, FileText, Sparkles, CreditCard, Users, LogOut } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const menuSections = [
    {
      title: 'Account',
      items: [
        { label: 'Household Management', icon: Users, route: '/household' },
        { label: 'Billing & Subscription', icon: CreditCard, route: '/billing', badge: 'Family' },
        { label: 'Settings', icon: Settings, route: '/settings' },
      ],
    },
    {
      title: 'App',
      items: [
        { label: 'Notifications', icon: Bell, route: '/notifications' },
        { label: 'Support', icon: LifeBuoy, route: '/support' },
        { label: 'Coming Soon', icon: Sparkles, route: '/coming-soon' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', icon: Shield, route: '/privacy' },
        { label: 'Terms of Service', icon: FileText, route: '/terms' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Profile" showBack={false} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}>
        {/* Profile card */}
        <Card style={styles.profileCard} padding={20}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>L</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Lezahn du Toit</Text>
              <Text style={styles.profileEmail}>lezahn@example.com</Text>
              <View style={styles.planBadge}>
                <Crown size={13} color={Colors.accent} />
                <Text style={styles.planText}>RandWise Family</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Household preview */}
        <TouchableOpacity onPress={() => router.push('/household')} activeOpacity={0.8}>
          <Card style={styles.householdCard} padding={16}>
            <View style={styles.householdHeader}>
              <Text style={styles.householdTitle}>Household Members</Text>
              <ChevronRight size={18} color={Colors.slate400} />
            </View>
            <View style={styles.memberRow}>
              {householdMembers.map(member => (
                <View key={member.id} style={styles.memberAvatar}>
                  <View style={[styles.memberCircle, { backgroundColor: member.color }]}>
                    <Text style={styles.memberText}>{member.avatar}</Text>
                  </View>
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
              ))}
            </View>
          </Card>
        </TouchableOpacity>

        {/* Menu sections */}
        {menuSections.map((section, si) => (
          <View key={si} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <Card padding={0}>
              {section.items.map((item, ii) => (
                <TouchableOpacity
                  key={ii}
                  style={[styles.menuItem, ii > 0 && styles.menuItemBorder]}
                  onPress={() => router.push(item.route as any)}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <item.icon size={18} color={Colors.primary} />
                    </View>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.badge && <Badge label={item.badge!} variant="gold" size="small" />}
                    <ChevronRight size={18} color={Colors.slate400} />
                  </View>
                </TouchableOpacity>
              ))}
            </Card>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>RandWise v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  profileCard: { marginBottom: 16 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  profileEmail: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  planBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, backgroundColor: Colors.gold100, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, alignSelf: 'flex-start' },
  planText: { fontSize: 12, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.gold600 },
  householdCard: { marginBottom: 20 },
  householdHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  householdTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  memberRow: { flexDirection: 'row', justifyContent: 'space-around' },
  memberAvatar: { alignItems: 'center' },
  memberCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  memberText: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  memberName: { fontSize: 11, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4 },
  menuSection: { marginBottom: 20 },
  menuSectionTitle: { fontSize: 13, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.textMuted, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  menuItemBorder: { borderTopWidth: 1, borderTopColor: Colors.slate100 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.green100, alignItems: 'center', justifyContent: 'center' },
  menuItemLabel: { fontSize: 15, fontFamily: 'Inter-Medium', fontWeight: '500', color: Colors.text },
  menuItemRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14, backgroundColor: Colors.red50, borderWidth: 1, borderColor: Colors.red100, marginBottom: 16 },
  logoutText: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.error },
  versionText: { fontSize: 12, fontFamily: 'Inter-Regular', color: Colors.slate400, textAlign: 'center' },
});
