import { z } from 'zod';

import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { contaminationStatusSchema } from '#/infra/http/validators/shared/contamination-status-schema.js';

export const createFoodLibraryBodySchema = z.object({
  name: z
    .string(ERROR_CODES.INVALID_NAME)
    .transform((value) => value.trim().replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .min(1, ERROR_CODES.NAME_VERY_SHORT)
        .max(255, ERROR_CODES.NAME_VERY_LONG)
    ),

  kcal: z
    .number(ERROR_CODES.INVALID_KCAL)
    .nonnegative(ERROR_CODES.KCAL_VERY_LOW),

  protein: z
    .number(ERROR_CODES.INVALID_PROTEIN)
    .nonnegative(ERROR_CODES.PROTEIN_VERY_LOW),

  carbs: z
    .number(ERROR_CODES.INVALID_CARBS)
    .nonnegative(ERROR_CODES.CARBS_VERY_LOW),

  fat: z.number(ERROR_CODES.INVALID_FAT).nonnegative(ERROR_CODES.FAT_VERY_LOW),

  sugarStatus: contaminationStatusSchema,
  glutenStatus: contaminationStatusSchema,
  lactoseStatus: contaminationStatusSchema,
});
