import * as z from 'zod';

import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';

export const createRestaurantBodySchema = z.object({
  name: z
    .string(ERROR_CODES.INVALID_NAME)
    .transform((value) => value.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(1, ERROR_CODES.NAME_VERY_SHORT)
        .max(255, ERROR_CODES.NAME_VERY_LONG)
    ),
  cnpj: z
    .string(ERROR_CODES.INVALID_CNPJ)
    .transform((value) => value.replace(/\D/g, ''))
    .pipe(z.string().length(14, ERROR_CODES.INVALID_CNPJ)),
  phone: z
    .string(ERROR_CODES.INVALID_PHONE)
    .transform((value) => value.replace(/\D/g, ''))
    .pipe(z.string().length(11, ERROR_CODES.INVALID_PHONE)),
});
