import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { usersTable } from '#/infra/database/schemas/users.js';

export const userDailyConsumptionsTable = pgTable('user_daily_consumptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  description: varchar('description', { length: 255 }),
  kcal: integer('kcal').notNull(),
  protein: integer('protein').default(0).notNull(),
  carbs: integer('carbs').default(0).notNull(),
  fat: integer('fat').default(0).notNull(),
  consumedAt: timestamp('consumed_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
