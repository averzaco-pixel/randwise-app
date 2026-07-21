import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { Colors } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  icon,
}: ButtonProps) {
  const variantStyles = {
    primary: { backgroundColor: Colors.primary, borderWidth: 0 },
    secondary: { backgroundColor: Colors.slate100, borderWidth: 0 },
    outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.primary },
    gold: { backgroundColor: Colors.accent, borderWidth: 0 },
    danger: { backgroundColor: Colors.error, borderWidth: 0 },
    ghost: { backgroundColor: 'transparent', borderWidth: 0 },
  };

  const textStyles = {
    primary: { color: Colors.white },
    secondary: { color: Colors.text },
    outline: { color: Colors.primary },
    gold: { color: Colors.text },
    danger: { color: Colors.white },
    ghost: { color: Colors.primary },
  };

  const sizeStyles = {
    small: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 13 },
    medium: { paddingVertical: 14, paddingHorizontal: 24, fontSize: 15 },
    large: { paddingVertical: 16, paddingHorizontal: 32, fontSize: 16 },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textStyles[variant].color} size="small" />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, textStyles[variant], { fontSize: sizeStyles[size].fontSize }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
