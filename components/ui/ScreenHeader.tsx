import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/theme';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: React.ReactNode;
}

export function ScreenHeader({ title, showBack = true, onBack, rightIcon }: ScreenHeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack ?? (() => router.back())}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.rightSlot}>{rightIcon}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
  },
  rightSlot: {
    width: 40,
    alignItems: 'center',
  },
});
