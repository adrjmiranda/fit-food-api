import { z } from 'zod';

import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';

export const authenticateUserBodySchema = z.object({
  email: z.email(ERROR_CODES.INVALID_EMAIL),
  password: z
    .string()
    .min(8, ERROR_CODES.PASSWORD_VERY_SHORT)
    .max(100, ERROR_CODES.PASSWORD_VERY_LONG),
});
