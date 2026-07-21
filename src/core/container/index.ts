import { container } from 'tsyringe';

import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';
import { CreateFoodLibraryUseCase } from '#/domain/fit-food/use-cases/food-library/create-food-library.js';
import { AuthenticateUserUseCase } from '#/domain/fit-food/use-cases/user/authenticate-user.js';
import { RegisterUserUseCase } from '#/domain/fit-food/use-cases/user/register-user.js';
import { DrizzleFoodLibraryRepository } from '#/infra/repositories/drizzle-food-library-repository.js';
import { DrizzleUserRepository } from '#/infra/repositories/drizzle-user-repository.js';

// Food Library
container.registerSingleton<FoodLibraryRepository>(
  'FoodLibraryRepository',
  DrizzleFoodLibraryRepository
);

container.registerSingleton(CreateFoodLibraryUseCase);

// User
container.registerSingleton<UserRepository>(
  'UserRepository',
  DrizzleUserRepository
);

container.registerSingleton(RegisterUserUseCase);
container.registerSingleton(AuthenticateUserUseCase);
