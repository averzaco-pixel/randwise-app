import { ShoppingCategory, PantryItem, ShoppingItem, Expense, MealPlanEntry, PricingPlan, HouseholdMember, NotificationItem } from '@/types';
import { allRecipes } from '@/constants/recipes';

export { allRecipes as recipes };

export const shoppingCategories: { name: ShoppingCategory; icon: string }[] = [
  { name: 'Fruit and Vegetables', icon: '🥬' },
  { name: 'Meat and Poultry', icon: '🍗' },
  { name: 'Bakery', icon: '🍞' },
  { name: 'Dairy and Eggs', icon: '🥛' },
  { name: 'Frozen Foods', icon: '🧊' },
  { name: 'Pantry Staples', icon: '🥫' },
  { name: 'Breakfast', icon: '🍳' },
  { name: 'Snacks', icon: '🍪' },
  { name: 'Drinks', icon: '🥤' },
  { name: 'Household Cleaning', icon: '🧹' },
  { name: 'Toiletries', icon: '🧴' },
  { name: 'Baby', icon: '🍼' },
  { name: 'Pet', icon: '🐾' },
  { name: 'Other', icon: '🛒' },
];

export const shoppingItems: ShoppingItem[] = [
  { id: '1', name: 'Milk 2L', category: 'Dairy and Eggs', quantity: 2, unit: 'L', price: 36.99, checked: false },
  { id: '2', name: 'Brown Bread', category: 'Bakery', quantity: 1, unit: 'loaf', price: 16.99, checked: true },
  { id: '3', name: 'Maize Meal 5kg', category: 'Pantry Staples', quantity: 1, unit: 'bag', price: 64.99, checked: false },
  { id: '4', name: 'Chicken portions 1kg', category: 'Meat and Poultry', quantity: 1, unit: 'kg', price: 89.99, checked: false },
  { id: '5', name: 'Rice 2kg', category: 'Pantry Staples', quantity: 1, unit: 'bag', price: 49.99, checked: true },
  { id: '6', name: 'Tomatoes 1kg', category: 'Fruit and Vegetables', quantity: 1, unit: 'kg', price: 24.99, checked: false },
  { id: '7', name: 'Potatoes 5kg', category: 'Fruit and Vegetables', quantity: 1, unit: 'bag', price: 54.99, checked: false },
  { id: '8', name: 'Eggs (dozen)', category: 'Dairy and Eggs', quantity: 1, unit: 'dozen', price: 39.99, checked: false },
  { id: '9', name: 'Cooking oil 2L', category: 'Pantry Staples', quantity: 1, unit: 'bottle', price: 79.99, checked: false },
  { id: '10', name: 'Rooibos Tea 100s', category: 'Drinks', quantity: 1, unit: 'box', price: 44.99, checked: true },
  { id: '11', name: 'Coffee 200g', category: 'Drinks', quantity: 1, unit: 'jar', price: 69.99, checked: false },
  { id: '12', name: 'Onions 1kg', category: 'Fruit and Vegetables', quantity: 1, unit: 'kg', price: 19.99, checked: false },
  { id: '13', name: 'Sugar 2kg', category: 'Pantry Staples', quantity: 1, unit: 'bag', price: 42.99, checked: false },
  { id: '14', name: 'Boerewors 500g', category: 'Meat and Poultry', quantity: 1, unit: 'pack', price: 59.99, checked: false },
  { id: '15', name: 'Mince 500g', category: 'Meat and Poultry', quantity: 1, unit: 'pack', price: 54.99, checked: false },
];

export const pantryItems: PantryItem[] = [
  { id: '1', name: 'Milk 2L', category: 'Dairy and Eggs', quantity: 2, unit: 'L', expiryDate: '2026-07-20', lowStock: false, price: 36.99 },
  { id: '2', name: 'Brown Bread', category: 'Bakery', quantity: 1, unit: 'loaf', expiryDate: '2026-07-19', lowStock: false, price: 16.99 },
  { id: '3', name: 'Maize Meal 5kg', category: 'Pantry Staples', quantity: 3, unit: 'kg', expiryDate: '2026-10-15', lowStock: false, price: 64.99 },
  { id: '4', name: 'Chicken portions', category: 'Meat and Poultry', quantity: 500, unit: 'g', expiryDate: '2026-07-18', lowStock: false, price: 89.99 },
  { id: '5', name: 'Rice', category: 'Pantry Staples', quantity: 1, unit: 'kg', expiryDate: '2026-12-01', lowStock: true, price: 49.99 },
  { id: '6', name: 'Tomatoes', category: 'Fruit and Vegetables', quantity: 4, unit: 'pcs', expiryDate: '2026-07-18', lowStock: false, price: 24.99 },
  { id: '7', name: 'Eggs', category: 'Dairy and Eggs', quantity: 3, unit: 'pcs', expiryDate: '2026-07-25', lowStock: true, price: 39.99 },
  { id: '8', name: 'Cooking oil', category: 'Pantry Staples', quantity: 1, unit: 'L', expiryDate: '2026-11-30', lowStock: false, price: 79.99 },
  { id: '9', name: 'Onions', category: 'Fruit and Vegetables', quantity: 5, unit: 'pcs', expiryDate: '2026-07-22', lowStock: false, price: 19.99 },
  { id: '10', name: 'Coffee 200g', category: 'Drinks', quantity: 1, unit: 'jar', expiryDate: '2026-09-01', lowStock: true, price: 69.99 },
];

export const expenses: Expense[] = [
  { id: '1', name: 'Pick n Pay — Monthly shop', amount: 1245.5, date: '2026-07-14', category: 'Monthly Shop', items: 23 },
  { id: '2', name: 'Woolworths — Fresh produce', amount: 320.0, date: '2026-07-12', category: 'Fresh Produce', items: 8 },
  { id: '3', name: 'Checkers — Meat and poultry', amount: 456.75, date: '2026-07-10', category: 'Meat and Poultry', items: 5 },
  { id: '4', name: 'Spar — Bread and milk', amount: 89.5, date: '2026-07-08', category: 'Bakery and Dairy', items: 4 },
  { id: '5', name: 'Boxer — Maize meal and rice', amount: 134.25, date: '2026-07-05', category: 'Pantry Staples', items: 6 },
  { id: '6', name: 'Pick n Pay — Vegetables', amount: 78.0, date: '2026-07-03', category: 'Fresh Produce', items: 5 },
];

export const weeklyMealPlan: MealPlanEntry[] = [
  { id: '1', day: 'Monday', recipeId: 'st-pap-tomato-relish', recipeName: 'Pap and Tomato Relish', mealType: 'Dinner', servings: 4, cooked: false },
  { id: '2', day: 'Tuesday', recipeId: 'st-egg-fried-rice', recipeName: 'Egg Fried Rice', mealType: 'Dinner', servings: 3, cooked: false },
  { id: '3', day: 'Wednesday', recipeId: 'st-chicken-veg-stew', recipeName: 'Chicken and Vegetable Stew', mealType: 'Dinner', servings: 6, cooked: false },
  { id: '4', day: 'Thursday', recipeId: 'st-beef-curry-rice', recipeName: 'Beef Mince Curry and Rice', mealType: 'Dinner', servings: 4, cooked: false },
  { id: '5', day: 'Friday', recipeId: 'st-chicken-pasta', recipeName: 'Chicken Pasta', mealType: 'Dinner', servings: 4, cooked: false },
  { id: '6', day: 'Saturday', recipeId: 'st-veg-soup', recipeName: 'Bean-Free Vegetable Soup', mealType: 'Dinner', servings: 4, cooked: false },
  { id: '7', day: 'Sunday', recipeId: 'st-boerewors-pap', recipeName: 'Boerewors and Pap', mealType: 'Dinner', servings: 4, cooked: false },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'RandWise Free',
    price: 0,
    period: 'month',
    description: 'Get started with smart grocery budgeting.',
    features: [
      'One household',
      'One monthly budget',
      'Up to 30 shopping items',
      'Up to 30 pantry items',
      'Three meal suggestions monthly',
      'Basic spending summary',
    ],
    popular: false,
    cta: 'Start Free',
  },
  {
    id: 'family',
    name: 'RandWise Family',
    price: 79,
    period: 'month',
    description: 'Everything a growing household needs.',
    features: [
      'Up to five household members',
      'Unlimited shopping items',
      'Unlimited pantry items',
      'Weekly meal planning',
      '30 AI meal suggestions monthly',
      'Expiry reminders',
      'Low-stock alerts',
      'Detailed reports',
    ],
    popular: true,
    cta: 'Choose Family',
  },
  {
    id: 'plus',
    name: 'RandWise Plus',
    price: 129,
    period: 'month',
    description: 'Premium insights for serious savers.',
    features: [
      'Up to ten household members',
      'Advanced savings insights',
      'Unlimited AI meal suggestions (fair use)',
      'Pantry waste tracking',
      'Downloadable reports',
      'Priority support',
      'Early feature access',
    ],
    popular: false,
    cta: 'Choose Plus',
  },
];

export const householdMembers: HouseholdMember[] = [
  { id: '1', name: 'Lezahn', role: 'Owner', avatar: 'L', color: '#16A34A' },
  { id: '2', name: 'Mariam', role: 'Admin', avatar: 'M', color: '#FBBF24' },
  { id: '3', name: 'Thabo', role: 'Member', avatar: 'T', color: '#3B82F6' },
  { id: '4', name: 'Naledi', role: 'Member', avatar: 'N', color: '#EF4444' },
];

export const notifications: NotificationItem[] = [
  { id: '1', title: 'Milk expiring soon', message: 'Your 2L milk expires in 3 days. Use it before it goes to waste.', time: '2h ago', type: 'warning', read: false },
  { id: '2', title: 'Low stock alert', message: 'Rice is running low. Add it to your shopping list.', time: '5h ago', type: 'info', read: false },
  { id: '3', title: 'Budget milestone', message: 'You have spent 55% of your monthly grocery budget. Keep it up!', time: '1d ago', type: 'success', read: true },
  { id: '4', title: 'Meal suggestion', message: 'Creamy Chicken Pasta is recommended for tonight based on your pantry.', time: '1d ago', type: 'info', read: true },
  { id: '5', title: 'Payment received', message: 'Your RandWise Family subscription is active. Enjoy premium features!', time: '3d ago', type: 'success', read: true },
];

export const comingSoonFeatures = [
  { title: 'Receipt Scanner', description: 'Snap a photo of your till slip and let AI capture every line item automatically.', icon: 'scan' },
  { title: 'Store Price Comparison', description: 'Compare prices across Pick n Pay, Checkers, Woolworths and Spar in real time.', icon: 'compare' },
  { title: 'Budget Goals', description: 'Set weekly and monthly savings goals and track your progress with smart nudges.', icon: 'target' },
  { title: 'Family Challenges', description: 'Turn saving money into a game. Compete with your household to cut food waste.', icon: 'trophy' },
  { title: 'Nutrition Tracking', description: 'See the nutritional breakdown of your weekly meal plan at a glance.', icon: 'heart' },
  { title: 'Voice Shopping', description: 'Add items to your list by speaking. Perfect for hands-free kitchen moments.', icon: 'mic' },
];

export const faqItems = [
  { question: 'How does RandWise track my grocery budget?', answer: 'RandWise lets you set a monthly grocery budget and automatically tracks every purchase you record. Your remaining balance updates in real time so you always know where you stand.' },
  { question: 'Can I share my account with my family?', answer: 'Yes! RandWise Family and Plus plans support multiple household members. Each member can view and update shared shopping lists, pantry items and meal plans.' },
  { question: 'How do expiry reminders work?', answer: 'RandWise monitors your pantry items and sends you a notification when food is about to expire, helping you reduce waste and save money.' },
  { question: 'Is my payment information secure?', answer: 'All payments are processed securely through PayFast, a trusted South African payment gateway. RandWise never stores your card details.' },
  { question: 'Can I cancel my subscription anytime?', answer: 'Absolutely. You can cancel or downgrade your plan at any time from the Billing screen. Your premium features remain active until the end of your billing cycle.' },
  { question: 'Does RandWise work offline?', answer: 'Most features work offline. Your data syncs automatically once you reconnect to the internet.' },
];
