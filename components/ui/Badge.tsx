import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'green' | 'gold' | 'red' | 'blue' | 'gray';
  size?: 'small' | 'medium';
}

export function Badge({ label, variant = 'green', size = 'medium' }: BadgeProps) {
  const colors = {
    green: { bg: Colors.green100, text: Colors.green700 },
    gold: { bg: Colors.gold100, text: Colors.gold600 },
    red: { bg: Colors.red100, text: Colors.red600 },
    blue: { bg: Colors.blue100, text: Colors.blue500 },
    gray: { bg: Colors.slate100, text: Colors.slate600 },
  };

  const c = colors[variant];
  const sizeStyles = {
    small: { paddingVertical: 3, paddingHorizontal: 8, fontSize: 11 },
    medium: { paddingVertical: 5, paddingHorizontal: 12, fontSize: 12 },
  };

  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, sizeStyles[size]]}>
      <Text style={[styles.text, { color: c.text, fontSize: sizeStyles[size].fontSize }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});
