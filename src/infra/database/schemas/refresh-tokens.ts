import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { usersTable } from '#/infra/database/schemas/users.js';

export const refreshTokensTable = pgTable('refresh_tokens', {
  id: uuid('id').primaryKey().defaultRandom(),
  token: text('token').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});
