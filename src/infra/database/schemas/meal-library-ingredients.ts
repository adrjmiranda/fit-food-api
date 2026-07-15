import { integer, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

import { foodLibraryTable } from '#/infra/database/schemas/food-library.js';
import { mealsTable } from '#/infra/database/schemas/meals.js';

export const mealLibraryIngredientsTable = pgTable(
  'meal_library_ingredients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    mealId: uuid('meal_id')
      .references(() => mealsTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    foodLibraryId: uuid('food_library_id')
      .references(() => foodLibraryTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    amount: integer('amount').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique('uq_meal_food_library').on(table.mealId, table.foodLibraryId),
  ]
);
