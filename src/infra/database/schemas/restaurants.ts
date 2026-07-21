import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { usersTable } from '#/infra/database/schemas/users.js';

export const restaurantsTable = pgTable('restaurants', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: uuid('owner_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  cnpj: varchar('cnpj', { length: 14 }).unique().notNull(),
  phone: varchar('phone', { length: 11 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  isOpen: boolean('is_open').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
