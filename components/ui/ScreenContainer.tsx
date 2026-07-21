import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  padding?: number;
  noBottomPadding?: boolean;
}

export function ScreenContainer({
  children,
  scroll = true,
  padding = 20,
  noBottomPadding = false,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();
  const content = (
    <View style={{ paddingHorizontal: padding, paddingTop: insets.top + 8, paddingBottom: noBottomPadding ? 0 : insets.bottom + 100 }}>
      {children}
    </View>
  );

  if (scroll) {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          {content}
        </ScrollView>
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
