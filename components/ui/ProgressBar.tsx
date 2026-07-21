import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

interface ProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  trackColor?: string;
  borderRadius?: number;
}

export function ProgressBar({
  progress,
  height = 10,
  color = Colors.primary,
  trackColor = Colors.slate200,
  borderRadius,
}: ProgressBarProps) {
  const pct = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: borderRadius ?? height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${pct * 100}%`,
            backgroundColor: color,
            borderRadius: borderRadius ?? height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
  },
});
