import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { householdMembers } from '@/constants/mockData';
import { UserPlus, Crown, ChevronRight, LogOut } from 'lucide-react-native';

export default function HouseholdScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top }}>
        <ScreenHeader title="Household" onBack={() => router.back()} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 40 }}>
        {/* Household summary */}
        <Card style={styles.summaryCard} padding={20}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Du Toit Household</Text>
            <Badge label="Family Plan" variant="gold" size="small" />
          </View>
          <Text style={styles.summarySubtitle}>{householdMembers.length} of 5 members</Text>
          <View style={styles.memberAvatars}>
            {householdMembers.map(member => (
              <View key={member.id} style={[styles.memberAvatar, { backgroundColor: member.color }]}>
                <Text style={styles.memberAvatarText}>{member.avatar}</Text>
              </View>
            ))}
            <View style={styles.addAvatar}>
              <UserPlus size={18} color={Colors.slate400} />
            </View>
          </View>
        </Card>

        {/* Members list */}
        <Text style={styles.sectionTitle}>Members</Text>
        {householdMembers.map(member => (
          <Card key={member.id} style={styles.memberCard} padding={16}>
            <View style={styles.memberRow}>
              <View style={[styles.memberCircle, { backgroundColor: member.color }]}>
                <Text style={styles.memberCircleText}>{member.avatar}</Text>
              </View>
              <View style={styles.memberInfo}>
                <View style={styles.memberNameRow}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  {member.role === 'Owner' && <Crown size={14} color={Colors.accent} />}
                </View>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
              {member.role !== 'Owner' && (
                <TouchableOpacity style={styles.removeBtn}>
                  <LogOut size={16} color={Colors.slate400} />
                </TouchableOpacity>
              )}
            </View>
          </Card>
        ))}

        {/* Invite */}
        <View style={{ marginTop: 20 }}>
          <Button title="Invite Member" variant="primary" size="large" fullWidth icon={<UserPlus size={20} color={Colors.white} />} />
        </View>

        {/* Plan info */}
        <Text style={styles.sectionTitle}>Plan Info</Text>
        <TouchableOpacity onPress={() => router.push('/pricing')} activeOpacity={0.8}>
          <Card style={styles.planInfoCard} padding={16}>
            <View style={styles.planInfoRow}>
              <View style={styles.planInfoIcon}>
                <Crown size={18} color={Colors.accent} />
              </View>
              <View style={styles.planInfoContent}>
                <Text style={styles.planInfoTitle}>RandWise Family</Text>
                <Text style={styles.planInfoSubtitle}>Up to 5 members · R79/month</Text>
              </View>
              <ChevronRight size={18} color={Colors.slate400} />
            </View>
          </Card>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryCard: { marginBottom: 20 },
  summaryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryTitle: { fontSize: 20, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text },
  summarySubtitle: { fontSize: 14, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 4 },
  memberAvatars: { flexDirection: 'row', gap: 8, marginTop: 16 },
  memberAvatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  memberAvatarText: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  addAvatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: Colors.slate200, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.text, marginBottom: 12, marginTop: 8 },
  memberCard: { marginBottom: 10 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  memberCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  memberCircleText: { fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700', color: Colors.white },
  memberInfo: { flex: 1 },
  memberNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  memberName: { fontSize: 16, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  memberRole: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
  removeBtn: { padding: 8 },
  planInfoCard: { marginBottom: 10 },
  planInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planInfoIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.gold100, alignItems: 'center', justifyContent: 'center' },
  planInfoContent: { flex: 1 },
  planInfoTitle: { fontSize: 15, fontFamily: 'Inter-SemiBold', fontWeight: '600', color: Colors.text },
  planInfoSubtitle: { fontSize: 13, fontFamily: 'Inter-Regular', color: Colors.textMuted, marginTop: 2 },
});
