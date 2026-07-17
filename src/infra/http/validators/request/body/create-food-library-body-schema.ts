import * as z from 'zod';

import {
  CONTAMINATION_STATUS,
  type IngredientStatus,
} from '#/domain/constants/contamination-status.js';

export const createFoodLibraryBodySchema = z.object({
  name: z.string().min(1),
  kcal: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
  sugarStatus: z
    .number()
    .refine((value) =>
      Object.values(CONTAMINATION_STATUS).includes(value as IngredientStatus)
    )
    .transform((value) => value as IngredientStatus),
  glutenStatus: z
    .number()
    .refine((value) =>
      Object.values(CONTAMINATION_STATUS).includes(value as IngredientStatus)
    )
    .transform((value) => value as IngredientStatus),
  lactoseStatus: z
    .number()
    .refine((value) =>
      Object.values(CONTAMINATION_STATUS).includes(value as IngredientStatus)
    )
    .transform((value) => value as IngredientStatus),
});
