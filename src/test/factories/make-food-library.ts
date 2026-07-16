import { faker } from '@faker-js/faker';

import type { IngredientStatus } from '#/domain/constants/contamination-status.js';
import {
  FoodLibrary,
  type FoodLibraryProps,
} from '#/domain/fit-food/entities/food-library.js';

export function makeFoodLibrary(
  override: Partial<FoodLibraryProps> = {}
): FoodLibrary {
  return new FoodLibrary({
    name: faker.food.ingredient(),
    kcal: faker.number.int({ min: 0, max: 900 }),
    protein: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    carbs: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    fat: faker.number.float({ min: 0, max: 100, fractionDigits: 1 }),
    sugarStatus: faker.helpers.arrayElement([0, 1, 2]) as IngredientStatus,
    glutenStatus: faker.helpers.arrayElement([0, 1, 2]) as IngredientStatus,
    lactoseStatus: faker.helpers.arrayElement([0, 1, 2]) as IngredientStatus,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  });
}
