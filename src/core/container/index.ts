import { container } from 'tsyringe';

import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';
import type { RefreshTokenRepository } from '#/domain/fit-food/repositories/refresh-token-repository.js';
import type { RestaurantRepository } from '#/domain/fit-food/repositories/restaurant-repository.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';
import { CreateFoodLibraryUseCase } from '#/domain/fit-food/use-cases/food-library/create-food-library.js';
import { CreateRefreshTokenUseCase } from '#/domain/fit-food/use-cases/refresh-token/create-refresh-token.js';
import { CreateRestaurantUseCase } from '#/domain/fit-food/use-cases/restaurant/create-restaurant.js';
import { AuthenticateUserUseCase } from '#/domain/fit-food/use-cases/user/authenticate-user.js';
import { RegisterUserUseCase } from '#/domain/fit-food/use-cases/user/register-user.js';
import { DrizzleFoodLibraryRepository } from '#/infra/repositories/drizzle-food-library-repository.js';
import { DrizzleRefreshTokensRepository } from '#/infra/repositories/drizzle-refresh-tokens-repository.js';
import { DrizzleRestaurantRepository } from '#/infra/repositories/drizzle-restaurant-repository.js';
import { DrizzleUserRepository } from '#/infra/repositories/drizzle-user-repository.js';

// Food Library
container.registerSingleton<FoodLibraryRepository>(
  'FoodLibraryRepository',
  DrizzleFoodLibraryRepository
);

container.registerSingleton(CreateFoodLibraryUseCase);

// Refresh Token
container.registerSingleton<RefreshTokenRepository>(
  'RefreshTokenRepository',
  DrizzleRefreshTokensRepository
);

container.registerSingleton(CreateRefreshTokenUseCase);

// User
container.registerSingleton<UserRepository>(
  'UserRepository',
  DrizzleUserRepository
);

container.registerSingleton(RegisterUserUseCase);
container.registerSingleton(AuthenticateUserUseCase);

// Restaurant
container.registerSingleton<RestaurantRepository>(
  'RestaurantRepository',
  DrizzleRestaurantRepository
);

container.registerSingleton(CreateRestaurantUseCase);
