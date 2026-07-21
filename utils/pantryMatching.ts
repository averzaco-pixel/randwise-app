import { Recipe, PantryItem, PantryMatchResult, RecipeIngredient } from '@/types';

const NAME_ALIASES: Record<string, string[]> = {
  'chicken': ['chicken portions', 'chicken breast', 'chicken thighs', 'chicken pieces', 'chicken drumsticks', 'chicken wings', 'cooked chicken', 'leftover chicken'],
  'rice': ['white rice', 'cooked rice', 'leftover rice', 'basmati rice', 'long grain rice'],
  'onions': ['onion', 'brown onion', 'red onion', 'onions'],
  'tomatoes': ['tomato', 'tomatoes', 'fresh tomatoes', 'chopped tomatoes'],
  'potatoes': ['potato', 'potatoes', 'baby potatoes'],
  'eggs': ['egg', 'eggs'],
  'milk': ['milk 2l', 'full cream milk', 'low fat milk', 'fresh milk'],
  'maize meal': ['maize meal 5kg', 'maize meal', 'mealie meal', 'pap'],
  'cooking oil': ['oil', 'sunflower oil', 'vegetable oil', 'canola oil'],
  'bread': ['brown bread', 'white bread', 'bread loaf', 'slices bread'],
  'mince': ['beef mince', 'mince 500g', 'ground beef', 'minced beef'],
  'boerewors': ['boerewors 500g', 'wors', 'sausage'],
  'fish': ['hake fillets', 'fish fillets', 'tuna', 'pilchards', 'any white fish'],
  'cheese': ['cheddar cheese', 'cheese block', 'grated cheese', 'mozzarella'],
  'carrots': ['carrot', 'carrots'],
  'butternut': ['butternut squash', 'butternut'],
  'spinach': ['spinach', 'morogo', 'Swiss chard'],
  'pasta': ['macaroni', 'spaghetti', 'pasta shapes', 'penne', 'fusilli', 'noodles', 'instant noodles'],
  'flour': ['cake flour', 'plain flour', 'self-raising flour', 'wheat flour'],
  'sugar': ['white sugar', 'brown sugar', 'sugar 2kg'],
  'butter': ['margarine', 'butter', 'baking margarine'],
  'cream': ['fresh cream', 'cooking cream', 'double cream', 'thick cream'],
  'garlic': ['garlic cloves', 'garlic', 'minced garlic', 'garlic paste'],
  'ginger': ['fresh ginger', 'ginger root', 'ginger paste'],
  'curry powder': ['curry powder', 'mild curry powder', 'hot curry powder', 'rajah curry powder'],
  'stock cubes': ['chicken stock cubes', 'beef stock cubes', 'vegetable stock cubes', 'stock'],
  'soy sauce': ['soy sauce', 'dark soy sauce', 'light soy sauce'],
  'baked beans': ['baked beans', 'beans in tomato sauce'],
  'lentils': ['red lentils', 'brown lentils', 'dry lentils'],
  'tuna': ['canned tuna', 'tuna in brine', 'tuna in oil', 'tuna chunks'],
  'sweet corn': ['cream style corn', 'sweet corn', 'canned corn'],
  'peas': ['frozen peas', 'green peas', 'garden peas'],
  'sweet potato': ['sweet potatoes', 'sweet potato'],
  'pumpkin': ['pumpkin', 'butternut pumpkin'],
  'cabbage': ['cabbage', 'green cabbage'],
  'green pepper': ['green pepper', 'bell pepper', 'capsicum'],
  'mushrooms': ['button mushrooms', 'mushrooms', 'fresh mushrooms'],
  'beef stew': ['stewing beef', 'beef cubes', 'beef stew pack'],
  'sausages': ['vienna sausages', 'sausages', 'pork sausages', 'beef sausages'],
  'samp': ['samp', 'samp and beans', 'umngqusho'],
  'chicken livers': ['chicken livers', 'livers'],
  'oats': ['rolled oats', 'oats', 'instant oats', 'porridge oats'],
  'rooibos': ['rooibos tea', 'tea bags', 'tea'],
  'coffee': ['coffee 200g', 'instant coffee', 'coffee'],
  'paprika': ['paprika', 'smoked paprika'],
  'cumin': ['cumin', 'ground cumin', 'jeera'],
  'coriander': ['fresh coriander', 'coriander', 'dhania'],
  'vinegar': ['spirit vinegar', 'white vinegar', 'brown vinegar'],
  'mustard': ['mustard', 'wholegrain mustard', 'dijon mustard'],
  'mayonnaise': ['mayo', 'mayonnaise'],
  'baking powder': ['baking powder'],
  'vanilla': ['vanilla essence', 'vanilla extract'],
  'cinnamon': ['ground cinnamon', 'cinnamon'],
  'nutmeg': ['ground nutmeg', 'nutmeg'],
  'bananas': ['banana', 'bananas'],
  'apples': ['apple', 'apples'],
  'avocado': ['avocado', 'hass avocado'],
  'lettuce': ['lettuce', 'iceberg lettuce'],
  'cucumber': ['cucumber'],
  'tomato sauce': ['tomato sauce', 'ketchup'],
  'chutney': ['chutney', 'peach chutney', 'fruit chutney'],
  'worcestershire': ['worcestershire sauce', 'worcestershire'],
  'peri-peri': ['peri peri sauce', 'peri-peri', 'hot sauce'],
  'baked beans': ['baked beans'],
  'wraps': ['tortilla wraps', 'wraps', 'flour tortillas'],
  'tortillas': ['tortilla wraps', 'wraps', 'flour tortillas'],
  'noodles': ['instant noodles', '2-minute noodles', 'ramen'],
};

function normalizeName(name: string): string {
  const lower = name.toLowerCase().trim();
  for (const [canonical, aliases] of Object.entries(NAME_ALIASES)) {
    if (lower === canonical || aliases.some(a => lower === a || lower.includes(a))) {
      return canonical;
    }
  }
  return lower;
}

export function matchRecipeToPantry(
  recipe: Recipe,
  pantry: PantryItem[],
  enabledStapleNames: string[],
): PantryMatchResult {
  const pantryNormalized = new Set(pantry.map(p => normalizeName(p.name)));
  const staplesNormalized = new Set(enabledStapleNames.map(s => normalizeName(s)));

  const available: { name: string; quantity: number; unit: string }[] = [];
  const missing: { name: string; quantity: number; unit: string; estimatedPrice: number }[] = [];

  for (const ingredient of recipe.ingredients) {
    const normalized = normalizeName(ingredient.name);
    const inPantry = pantryNormalized.has(normalized);
    const isStaple = staplesNormalized.has(normalized) || ingredient.isStaple;
    const isWater = normalized === 'water';

    if (inPantry || isStaple || isWater) {
      available.push({ name: ingredient.name, quantity: ingredient.quantity, unit: ingredient.unit });
    } else {
      missing.push({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        estimatedPrice: ingredient.estimatedPrice,
      });
    }
  }

  const totalNonStaple = recipe.ingredients.filter(i => {
    const normalized = normalizeName(i.name);
    return !staplesNormalized.has(normalized) && !i.isStaple && normalized !== 'water';
  }).length;

  const matchPercentage = totalNonStaple === 0 ? 100 : Math.round((available.length / (available.length + missing.length)) * 100);
  const missingCostTotal = missing.reduce((sum, m) => sum + m.estimatedPrice, 0);

  return {
    matchPercentage,
    availableIngredients: available,
    missingIngredients: missing,
    missingCostTotal,
  };
}

export function adjustIngredientQuantity(
  ingredient: RecipeIngredient,
  originalServings: number,
  newServings: number,
): RecipeIngredient {
  const ratio = newServings / originalServings;
  return {
    ...ingredient,
    quantity: Math.round(ingredient.quantity * ratio * 100) / 100,
  };
}

export function getMissingIngredientsCost(recipe: Recipe, pantry: PantryItem[], enabledStapleNames: string[]): number {
  const result = matchRecipeToPantry(recipe, pantry, enabledStapleNames);
  return result.missingCostTotal;
}

export { normalizeName };
