export type ShoppingCategory =
  | 'Fruit and Vegetables'
  | 'Meat and Poultry'
  | 'Bakery'
  | 'Dairy and Eggs'
  | 'Frozen Foods'
  | 'Pantry Staples'
  | 'Breakfast'
  | 'Snacks'
  | 'Drinks'
  | 'Household Cleaning'
  | 'Toiletries'
  | 'Baby'
  | 'Pet'
  | 'Other';

export interface ShoppingItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unit: string;
  price: number;
  checked: boolean;
}

export interface PantryItem {
  id: string;
  name: string;
  category: ShoppingCategory;
  quantity: number;
  unit: string;
  expiryDate: string;
  lowStock: boolean;
  price: number;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  estimatedCost: number;
  availableIngredients: string[];
  missingIngredients: string[];
  steps: string[];
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  category: string;
  items: number;
}

export interface MealPlanEntry {
  id: string;
  day: string;
  recipeId: string;
  recipeName: string;
  mealType: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export interface HouseholdMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'warning' | 'info' | 'success' | 'error';
  read: boolean;
}
