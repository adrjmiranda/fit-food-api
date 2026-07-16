import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { env } from '#/core/config/env.js';
import { foodLibraryTable } from '#/infra/database/schemas/food-library.js';
import { mealLibraryIngredientsTable } from '#/infra/database/schemas/meal-library-ingredients.js';
import { mealsTable } from '#/infra/database/schemas/meals.js';
import { orderItemsTable } from '#/infra/database/schemas/order-items.js';
import { ordersTable } from '#/infra/database/schemas/orders.js';
import { restaurantIngredientsTable } from '#/infra/database/schemas/restaurant-ingredients.js';
import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';
import { userDailyConsumptionsTable } from '#/infra/database/schemas/user-daily-consumptions.js';
import { userHealthRestrictionsTable } from '#/infra/database/schemas/user-health-restrictions.js';
import { userWeeklyTargetsTable } from '#/infra/database/schemas/user-weekly-targets.js';
import { usersTable } from '#/infra/database/schemas/users.js';

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: {
    usersTable,
    userWeeklyTargetsTable,
    userHealthRestrictionsTable,
    userDailyConsumptionsTable,
    restaurantsTable,
    restaurantIngredientsTable,
    ordersTable,
    orderItemsTable,
    mealsTable,
    mealLibraryIngredientsTable,
    foodLibraryTable,
  },
});
