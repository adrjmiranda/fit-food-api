import {
  integer,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';

export const INGREDIENT_STATUS = {
  FREE: 0,
  CONTAINS: 1,
  MAY_CONTAIN: 2,
} as const;

export const UNIT_TYPES = {
  GRAMS: 1,
  MILLILITERS: 2,
} as const;

export const restaurantIngredientsTable = pgTable('restaurant_ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  restaurantId: uuid('restaurant_id')
    .references(() => restaurantsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  kcal: integer('kcal').notNull(),
  protein: integer('protein').notNull(),
  carbs: integer('carbs').notNull(),
  fat: integer('fat').notNull(),
  sugarStatus: smallint('sugar_status')
    .notNull()
    .default(INGREDIENT_STATUS.FREE),
  glutenStatus: smallint('gluten_status')
    .notNull()
    .default(INGREDIENT_STATUS.FREE),
  lactoseStatus: smallint('lactose_status')
    .notNull()
    .default(INGREDIENT_STATUS.FREE),
  unitType: smallint('unit_type').default(UNIT_TYPES.GRAMS).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
