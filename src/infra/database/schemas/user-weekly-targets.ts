import { jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import type { WeeklyTargetsSchema } from '#/domain/types/targets.js';
import { usersTable } from '#/infra/database/schemas/users.js';

export const userWeeklyTargetsTable = pgTable('user_weekly_targets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    })
    .unique()
    .notNull(),
  targets: jsonb('targets').$type<WeeklyTargetsSchema>().notNull().default({}),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
