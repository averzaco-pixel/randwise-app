export interface HouseholdStaple {
  id: string;
  name: string;
  defaultEnabled: boolean;
}

export const householdStaples: HouseholdStaple[] = [
  { id: 'salt', name: 'Salt', defaultEnabled: true },
  { id: 'pepper', name: 'Pepper', defaultEnabled: true },
  { id: 'cooking-oil', name: 'Cooking oil', defaultEnabled: true },
  { id: 'mixed-herbs', name: 'Mixed herbs', defaultEnabled: false },
  { id: 'curry-powder', name: 'Curry powder', defaultEnabled: false },
  { id: 'garlic', name: 'Garlic', defaultEnabled: false },
  { id: 'onions', name: 'Onions', defaultEnabled: true },
  { id: 'tomato-paste', name: 'Tomato paste', defaultEnabled: false },
  { id: 'soy-sauce', name: 'Soy sauce', defaultEnabled: false },
  { id: 'chicken-stock', name: 'Stock cubes', defaultEnabled: false },
  { id: 'sugar', name: 'Sugar', defaultEnabled: true },
  { id: 'flour', name: 'Flour', defaultEnabled: false },
  { id: 'rice', name: 'Rice', defaultEnabled: false },
  { id: 'maize-meal', name: 'Maize meal', defaultEnabled: false },
];
