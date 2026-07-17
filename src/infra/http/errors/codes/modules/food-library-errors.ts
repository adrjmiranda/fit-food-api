// src/infra/http/errors/codes/modules/food-library-errors.ts
// All code suggestions must be strictly in English

export const FOOD_LIBRARY_ERRORS = {
  FOOD_LIBRARY_NOT_FOUND: 'food_library_not_found',
  FOOD_LIBRARY_NAME_ALREADY_EXISTS: 'food_library_name_already_exists', // unique() da foodLibraryTable
} as const;
