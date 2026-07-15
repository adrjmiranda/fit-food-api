import { integer, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';

import { mealsTable } from '#/infra/database/schemas/meals.js';
import { ordersTable } from '#/infra/database/schemas/orders.js';

export const orderItemsTable = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .references(() => ordersTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    mealId: uuid('meal_id')
      .references(() => mealsTable.id)
      .notNull(),
    quantity: integer('quantity').notNull(),
    priceAtSale: integer('price_at_sale').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [unique('uq_order_meal').on(table.orderId, table.mealId)]
);
