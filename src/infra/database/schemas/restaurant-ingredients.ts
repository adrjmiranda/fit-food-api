import {
  integer,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { CONTAMINATION_STATUS } from '#/domain/constants/contamination-status.js';
import { UNIT_TYPES } from '#/domain/constants/unit-types.js';
import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';

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
    .default(CONTAMINATION_STATUS.FREE),
  glutenStatus: smallint('gluten_status')
    .notNull()
    .default(CONTAMINATION_STATUS.FREE),
  lactoseStatus: smallint('lactose_status')
    .notNull()
    .default(CONTAMINATION_STATUS.FREE),
  unitType: smallint('unit_type').default(UNIT_TYPES.GRAMS).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
