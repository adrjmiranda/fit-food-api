// src/infra/http/errors/codes/modules/meals-errors.ts
// All code suggestions must be strictly in English

export const MEALS_ERRORS = {
  MEAL_NOT_FOUND: 'meal_not_found',
  MEAL_INGREDIENT_NOT_FOUND: 'meal_ingredient_not_found',
  DUPLICATE_MEAL_INGREDIENT: 'meal_duplicate_ingredient', // Para a constraint uq_meal_food_library
  PRICE_MUST_BE_POSITIVE: 'meal_price_must_be_positive',
} as const;
