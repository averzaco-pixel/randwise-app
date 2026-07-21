import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, Rect, G } from 'react-native-svg';

export function Logo({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <Defs>
        <LinearGradient id="logoBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#16A34A" />
          <Stop offset="1" stopColor="#15803D" />
        </LinearGradient>
        <LinearGradient id="basketHandle" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FBBF24" />
          <Stop offset="1" stopColor="#D97706" />
        </LinearGradient>
      </Defs>
      <Rect x="6" y="6" width="108" height="108" rx="28" fill="url(#logoBg)" />
      <Path d="M30 54 Q30 34 60 34 Q90 34 90 54" stroke="url(#basketHandle)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <Path d="M22 54 H98 L92 88 Q92 96 84 96 H36 Q28 96 28 88 Z" fill="#FFFFFF" />
      <Path d="M22 54 H98 L96 62 H24 Z" fill="#FBBF24" />
      <Rect x="40" y="62" width="6" height="26" rx="3" fill="#16A34A" opacity="0.2" />
      <Rect x="57" y="62" width="6" height="26" rx="3" fill="#16A34A" opacity="0.2" />
      <Rect x="74" y="62" width="6" height="26" rx="3" fill="#16A34A" opacity="0.2" />
      <Circle cx="50" cy="48" r="5" fill="#16A34A" />
      <Circle cx="70" cy="48" r="5" fill="#FBBF24" />
    </Svg>
  );
}

export function AppIcon({ size = 120 }: { size?: number }) {
  return <Logo size={size} />;
}
