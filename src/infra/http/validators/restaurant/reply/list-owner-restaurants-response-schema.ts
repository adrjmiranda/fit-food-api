import * as z from 'zod';

export const listOwnerRestaurantsResponseSchema = z.object({
  restaurants: z.array(
    z.object({
      id: z.uuid(),
      name: z.string().min(1),
      isActive: z.boolean(),
      isOpen: z.boolean(),
      createdAt: z.coerce.date(),
      updatedAt: z.coerce.date(),
    })
  ),
});
