import * as z from 'zod';

import { contaminationStatusSchema } from '#/infra/http/validators/shared/contamination-status-schema.js';

export const createFoodLibraryResponseSchema = z.object({
  food: z.object({
    id: z.uuid(),
    name: z.string().min(1),
    kcal: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    carbs: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    sugarStatus: contaminationStatusSchema,
    glutenStatus: contaminationStatusSchema,
    lactoseStatus: contaminationStatusSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});
