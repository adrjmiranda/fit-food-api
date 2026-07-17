// src/infra/http/errors/codes/modules/restaurants-errors.ts
// All code suggestions must be strictly in English

export const RESTAURANTS_ERRORS = {
  RESTAURANT_NOT_FOUND: 'restaurant_not_found',
  CNPJ_ALREADY_EXISTS: 'restaurant_cnpj_already_exists', // unique() da restaurantsTable
  INGREDIENT_NOT_FOUND: 'restaurant_ingredient_not_found',
} as const;
