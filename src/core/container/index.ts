import { container } from 'tsyringe';

import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';
import { DrizzleFoodLibraryRepository } from '#/infra/repositories/drizzle-food-library-repository.js';
import { DrizzleUserRepository } from '#/infra/repositories/drizzle-user-repository.js';

container.registerSingleton<FoodLibraryRepository>(
  'FoodLibraryRepository',
  DrizzleFoodLibraryRepository
);
container.registerSingleton<UserRepository>(
  'UserRepository',
  DrizzleUserRepository
);
