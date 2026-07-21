import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, Rect, Ellipse, G, Line, Polygon } from 'react-native-svg';

type IllusProps = { size?: number };

export function FamilyShoppingIllustration({ size = 200 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 240 240" fill="none">
      <Defs>
        <LinearGradient id="fsBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#F0FDF4" />
          <Stop offset="1" stopColor="#DCFCE7" />
        </LinearGradient>
      </Defs>
      <Circle cx="120" cy="120" r="110" fill="url(#fsBg)" />
      <Rect x="70" y="160" width="100" height="14" rx="7" fill="#16A34A" opacity="0.1" />
      <Path d="M80 100 Q80 75 120 75 Q160 75 160 100" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" fill="none" />
      <Path d="M72 100 L168 100 L160 158 Q160 164 154 164 H86 Q80 164 80 158 Z" fill="#FFFFFF" />
      <Path d="M72 100 H168 L165 108 H75 Z" fill="#16A34A" />
      <Rect x="92" y="108" width="5" height="50" rx="2.5" fill="#16A34A" opacity="0.15" />
      <Rect x="118" y="108" width="5" height="50" rx="2.5" fill="#FBBF24" opacity="0.3" />
      <Rect x="144" y="108" width="5" height="50" rx="2.5" fill="#16A34A" opacity="0.15" />
      <Circle cx="100" cy="95" r="4" fill="#FBBF24" />
      <Circle cx="120" cy="92" r="4" fill="#16A34A" />
      <Circle cx="140" cy="95" r="4" fill="#EF4444" />
      <Circle cx="60" cy="130" r="14" fill="#16A34A" />
      <Circle cx="56" cy="126" r="3" fill="#FFFFFF" opacity="0.3" />
      <Path d="M48 155 Q48 142 60 142 Q72 142 72 155" stroke="#16A34A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Circle cx="180" cy="125" r="12" fill="#FBBF24" />
      <Circle cx="177" cy="122" r="2.5" fill="#FFFFFF" opacity="0.3" />
      <Path d="M170 148 Q170 136 180 136 Q190 136 190 148" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export function ShoppingBasketIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Path d="M50 85 Q50 55 100 55 Q150 55 150 85" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" fill="none" />
      <Path d="M40 85 H160 L150 145 Q150 152 143 152 H57 Q50 152 50 145 Z" fill="#FFFFFF" />
      <Path d="M40 85 H160 L155 95 H45 Z" fill="#16A34A" />
      <Rect x="65" y="95" width="6" height="48" rx="3" fill="#16A34A" opacity="0.15" />
      <Rect x="97" y="95" width="6" height="48" rx="3" fill="#FBBF24" opacity="0.3" />
      <Rect x="129" y="95" width="6" height="48" rx="3" fill="#16A34A" opacity="0.15" />
      <Circle cx="80" cy="78" r="6" fill="#16A34A" />
      <Circle cx="100" cy="72" r="6" fill="#FBBF24" />
      <Circle cx="120" cy="78" r="6" fill="#EF4444" />
    </Svg>
  );
}

export function PantryShelvesIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Rect x="55" y="55" width="90" height="100" rx="8" fill="#FFFFFF" />
      <Line x1="55" y1="88" x2="145" y2="88" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <Line x1="55" y1="121" x2="145" y2="121" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <Rect x="63" y="63" width="14" height="20" rx="3" fill="#16A34A" />
      <Rect x="82" y="66" width="14" height="17" rx="3" fill="#FBBF24" />
      <Rect x="101" y="63" width="14" height="20" rx="3" fill="#16A34A" opacity="0.5" />
      <Rect x="120" y="66" width="14" height="17" rx="3" fill="#EF4444" opacity="0.5" />
      <Rect x="68" y="95" width="16" height="22" rx="4" fill="#FBBF24" />
      <Rect x="90" y="98" width="16" height="19" rx="4" fill="#16A34A" opacity="0.6" />
      <Rect x="112" y="95" width="16" height="22" rx="4" fill="#16A34A" />
      <Rect x="63" y="128" width="14" height="20" rx="3" fill="#FBBF24" opacity="0.5" />
      <Rect x="82" y="130" width="14" height="18" rx="3" fill="#16A34A" />
      <Rect x="101" y="128" width="14" height="20" rx="3" fill="#FBBF24" />
      <Rect x="120" y="130" width="14" height="18" rx="3" fill="#16A34A" opacity="0.4" />
    </Svg>
  );
}

export function FamilyMealIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Ellipse cx="100" cy="165" rx="70" ry="12" fill="#16A34A" opacity="0.1" />
      <Circle cx="100" cy="110" r="45" fill="#FFFFFF" />
      <Circle cx="100" cy="110" r="40" fill="#FBBF24" opacity="0.15" />
      <Path d="M100 78 Q100 70 108 70" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Path d="M100 78 Q100 70 92 70" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Circle cx="85" cy="105" r="5" fill="#16A34A" />
      <Circle cx="115" cy="105" r="5" fill="#16A34A" />
      <Path d="M88 120 Q100 128 112 120" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Rect x="70" y="150" width="60" height="8" rx="4" fill="#16A34A" opacity="0.2" />
      <Circle cx="55" cy="140" r="8" fill="#16A34A" opacity="0.3" />
      <Circle cx="145" cy="140" r="8" fill="#FBBF24" opacity="0.4" />
      <Rect x="48" y="148" width="14" height="10" rx="2" fill="#FFFFFF" />
      <Rect x="138" y="148" width="14" height="10" rx="2" fill="#FFFFFF" />
    </Svg>
  );
}

export function RandWalletIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Rect x="50" y="70" width="100" height="70" rx="14" fill="#16A34A" />
      <Rect x="50" y="70" width="100" height="22" rx="14" fill="#15803D" />
      <Rect x="115" y="95" width="40" height="30" rx="6" fill="#FBBF24" />
      <Circle cx="135" cy="110" r="7" fill="#15803D" />
      <Rect x="60" y="78" width="30" height="6" rx="3" fill="#FBBF24" opacity="0.4" />
      <Path d="M85 55 Q85 45 95 45" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <Circle cx="95" cy="42" r="6" fill="#FBBF24" />
    </Svg>
  );
}

export function SavingsPiggyIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Ellipse cx="100" cy="120" rx="55" ry="40" fill="#FBBF24" />
      <Ellipse cx="100" cy="120" rx="50" ry="36" fill="#FEF3C7" />
      <Circle cx="72" cy="105" r="5" fill="#16A34A" />
      <Circle cx="128" cy="105" r="5" fill="#16A34A" />
      <Path d="M150 110 Q165 110 165 125 Q165 135 155 135" stroke="#FBBF24" strokeWidth="6" fill="none" strokeLinecap="round" />
      <Rect x="92" y="80" width="16" height="10" rx="5" fill="#FBBF24" />
      <Circle cx="100" cy="76" r="4" fill="#16A34A" />
      <Rect x="80" y="155" width="12" height="8" rx="4" fill="#FBBF24" />
      <Rect x="108" y="155" width="12" height="8" rx="4" fill="#FBBF24" />
      <Path d="M88 130 Q100 136 112 130" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function EmptyShoppingListIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Rect x="65" y="50" width="70" height="100" rx="10" fill="#FFFFFF" />
      <Line x1="78" y1="75" x2="122" y2="75" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <Line x1="78" y1="90" x2="122" y2="90" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <Line x1="78" y1="105" x2="110" y2="105" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <Line x1="78" y1="120" x2="122" y2="120" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
      <Circle cx="100" cy="150" r="18" fill="#FBBF24" />
      <Path d="M100 142 V158 M92 150 H108" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

export function EmptyPantryIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Rect x="55" y="60" width="90" height="90" rx="10" fill="#FFFFFF" />
      <Line x1="55" y1="90" x2="145" y2="90" stroke="#16A34A" strokeWidth="3" opacity="0.2" />
      <Line x1="55" y1="120" x2="145" y2="120" stroke="#16A34A" strokeWidth="3" opacity="0.2" />
      <Circle cx="100" cy="105" r="22" fill="#FBBF24" opacity="0.2" />
      <Path d="M100 95 V115 M90 105 H110" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
}

export function EmptyMealPlannerIllustration({ size = 160 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <Circle cx="100" cy="100" r="90" fill="#F0FDF4" />
      <Rect x="60" y="55" width="80" height="80" rx="12" fill="#FFFFFF" />
      <Rect x="60" y="55" width="80" height="20" rx="12" fill="#16A34A" opacity="0.15" />
      <Rect x="70" y="62" width="20" height="6" rx="3" fill="#16A34A" opacity="0.4" />
      <Circle cx="100" cy="100" r="20" fill="#FBBF24" opacity="0.2" />
      <Path d="M100 92 V108 M92 100 H108" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <Rect x="70" y="135" width="60" height="6" rx="3" fill="#16A34A" opacity="0.2" />
    </Svg>
  );
}

export function PaymentSuccessIllustration({ size = 180 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      <Circle cx="110" cy="110" r="100" fill="#F0FDF4" />
      <Circle cx="110" cy="110" r="70" fill="#16A34A" />
      <Path d="M80 112 L100 132 L145 88" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <Circle cx="50" cy="60" r="8" fill="#FBBF24" />
      <Circle cx="175" cy="70" r="6" fill="#16A34A" opacity="0.4" />
      <Circle cx="180" cy="150" r="10" fill="#FBBF24" opacity="0.5" />
      <Circle cx="40" cy="160" r="7" fill="#16A34A" opacity="0.3" />
      <Path d="M55 45 L58 51 L64 54 L58 57 L55 63 L52 57 L46 54 L52 51 Z" fill="#FBBF24" />
    </Svg>
  );
}

export function PaymentFailureIllustration({ size = 180 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      <Circle cx="110" cy="110" r="100" fill="#FEF2F2" />
      <Circle cx="110" cy="110" r="70" fill="#EF4444" />
      <Path d="M85 85 L135 135 M135 85 L85 135" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
      <Circle cx="50" cy="60" r="6" fill="#FBBF24" opacity="0.4" />
      <Circle cx="180" cy="150" r="8" fill="#EF4444" opacity="0.3" />
    </Svg>
  );
}

export function ComingSoonIllustration({ size = 180 }: IllusProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      <Circle cx="110" cy="110" r="100" fill="#F0FDF4" />
      <Rect x="75" y="65" width="70" height="90" rx="12" fill="#FFFFFF" />
      <Rect x="85" y="80" width="50" height="8" rx="4" fill="#16A34A" opacity="0.2" />
      <Rect x="85" y="96" width="40" height="8" rx="4" fill="#FBBF24" opacity="0.3" />
      <Rect x="85" y="112" width="50" height="8" rx="4" fill="#16A34A" opacity="0.15" />
      <Circle cx="150" cy="145" r="22" fill="#FBBF24" />
      <Path d="M150 135 V156 M139 145 H161" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <Circle cx="55" cy="55" r="5" fill="#16A34A" opacity="0.3" />
      <Circle cx="180" cy="80" r="7" fill="#FBBF24" opacity="0.4" />
      <Path d="M40 160 L43 166 L49 169 L43 172 L40 178 L37 172 L31 169 L37 166 Z" fill="#FBBF24" opacity="0.5" />
    </Svg>
  );
}
