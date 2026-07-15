import { pgTable, smallint, timestamp, uuid } from 'drizzle-orm/pg-core';

import { usersTable } from '#/infra/database/schemas/users.js';

export const HEALTH_RESTRICTION_STATES = {
  NO: 0,
  YES: 1,
  UNKNOWN: 2,
};

export const userHealthRestrictionsTable = pgTable('user_health_restrictions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => usersTable.id, {
      onDelete: 'cascade',
    })
    .unique()
    .notNull(),
  isDiabetic: smallint('is_diabetic')
    .notNull()
    .default(HEALTH_RESTRICTION_STATES.UNKNOWN),
  isCeliac: smallint('is_celiac')
    .notNull()
    .default(HEALTH_RESTRICTION_STATES.UNKNOWN),
  isLactoseIntolerant: smallint('is_lactose_intolerant')
    .notNull()
    .default(HEALTH_RESTRICTION_STATES.UNKNOWN),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
