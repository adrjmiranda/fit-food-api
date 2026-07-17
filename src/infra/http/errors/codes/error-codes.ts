import { FOOD_LIBRARY_ERRORS } from '#/infra/http/errors/codes/modules/food-library-errors.js';
import { MEALS_ERRORS } from '#/infra/http/errors/codes/modules/meals-errors.js';
import { NUTRITION_ERRORS } from '#/infra/http/errors/codes/modules/nutrition-errors.js';
import { ORDERS_ERRORS } from '#/infra/http/errors/codes/modules/orders-errors.js';
import { RESTAURANTS_ERRORS } from '#/infra/http/errors/codes/modules/restaurants-errors.js';
import { SYSTEM_ERRORS } from '#/infra/http/errors/codes/modules/system-errors.js';
import { USERS_ERRORS } from '#/infra/http/errors/codes/modules/users-errors.js';

export const ERROR_CODES = {
  ...SYSTEM_ERRORS,
  ...NUTRITION_ERRORS,
  ...USERS_ERRORS,
  ...FOOD_LIBRARY_ERRORS,
  ...RESTAURANTS_ERRORS,
  ...MEALS_ERRORS,
  ...ORDERS_ERRORS,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
