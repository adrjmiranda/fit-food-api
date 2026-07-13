import { defineConfig } from 'drizzle-kit';

import { env } from '#/core/config/env.js';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/infra/database/schemas',
  out: './drizzle',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
