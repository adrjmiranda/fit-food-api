import {
  integer,
  pgTable,
  smallint,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';
import { usersTable } from '#/infra/database/schemas/users.js';

export const ORDER_STATUS = {
  PENDING: 1,
  PREPARING: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
  CANCELED: 5,
} as const;

export const ordersTable = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
  restaurantId: uuid('restaurant_id')
    .references(() => restaurantsTable.id)
    .notNull(),
  totalPrice: integer('total_price').notNull(),
  status: smallint('status').notNull().default(ORDER_STATUS.PENDING),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
