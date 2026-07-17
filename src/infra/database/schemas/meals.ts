import {
  boolean,
  integer,
  pgTable,
  real,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { UNIT_TYPES } from '#/domain/constants/unit-types.js';
import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';

const MEAL_STATUS = {
  FREE: 0,
  CONTAINS: 1,
  MAY_CONTAIN: 2,
} as const;

export const mealsTable = pgTable('meals', {
  id: uuid('id').primaryKey().defaultRandom(),
  restaurantId: uuid('restaurant_id')
    .references(() => restaurantsTable.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  isAvailable: boolean('is_available').notNull().default(true),
  kcal: real('kcal').notNull().default(0),
  protein: real('protein').notNull().default(0),
  carbs: real('carbs').notNull().default(0),
  fat: real('fat').notNull().default(0),
  sugarStatus: smallint('sugar_status').notNull().default(MEAL_STATUS.FREE),
  glutenStatus: smallint('gluten_status').notNull().default(MEAL_STATUS.FREE),
  lactoseStatus: smallint('lactose_status').notNull().default(MEAL_STATUS.FREE),
  unitType: smallint('unit_type').default(UNIT_TYPES.GRAMS).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
