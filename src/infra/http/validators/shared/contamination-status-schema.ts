import * as z from 'zod';

import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import {
  CONTAMINATION_STATUS,
  type IngredientStatus,
} from '#/domain/constants/contamination-status.js';

const contaminationValues = Object.values(CONTAMINATION_STATUS).map((value) =>
  z.literal(value)
);

export const contaminationStatusSchema = z.union(
  contaminationValues as [
    z.ZodLiteral<IngredientStatus>,
    z.ZodLiteral<IngredientStatus>,
    ...z.ZodLiteral<IngredientStatus>[],
  ],
  ERROR_CODES.INVALID_CONTAMINATION_STATUS
);
