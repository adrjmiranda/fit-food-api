import { container } from 'tsyringe';

import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';
import { DrizzleFoodLibraryRepository } from '#/infra/repositories/drizzle-food-library-repository.js';

container.registerSingleton<FoodLibraryRepository>(
  'FoodLibraryRepository',
  DrizzleFoodLibraryRepository
);
