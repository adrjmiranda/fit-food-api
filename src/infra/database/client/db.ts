import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { env } from '#/core/config/env.js';
import { usersTable } from '#/infra/database/schemas/users.js';

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: { usersTable },
});
