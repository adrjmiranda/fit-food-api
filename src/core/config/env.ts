import * as z from 'zod';

if (process.env.NODE_ENV !== 'production') {
  try {
    if (process.env.NODE_ENV === 'test') {
      process.loadEnvFile('.env.test');
    } else {
      process.loadEnvFile('.env');
    }
  } catch (error) {
    void error;
  }
}

const envSchema = z.object({
  SERVER_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  SERVER_PORT: z.coerce.number().default(3333),
  SERVER_HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.url(),
  ACCESS_JWT_SECRET: z.string().min(1),
  REFRESH_JWT_SECRET: z.string().min(1),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const msg = 'Invalid environment variables';
  const formattedError = z.treeifyError(_env.error);

  console.error(msg, formattedError);
  throw new Error(msg);
}

export const env = _env.data;
