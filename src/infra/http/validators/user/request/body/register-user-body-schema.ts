import { z } from 'zod';

import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';

export const registerUserBodySchema = z.object({
  name: z
    .string(ERROR_CODES.INVALID_NAME)
    .transform((value) => value.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(1, ERROR_CODES.NAME_VERY_SHORT)
        .max(255, ERROR_CODES.NAME_VERY_LONG)
    ),
  email: z.email(ERROR_CODES.INVALID_EMAIL),
  password: z
    .string()
    .min(8, ERROR_CODES.PASSWORD_VERY_SHORT)
    .max(100, ERROR_CODES.PASSWORD_VERY_LONG),
});
