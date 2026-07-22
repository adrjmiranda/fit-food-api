import * as z from 'zod';

export const createRestaurantResponseSchema = z.object({
  restaurant: z.object({
    id: z.uuid(),
    name: z.string().min(1),
    cnpj: z.string().length(14),
    phone: z.string().length(11),
    isActive: z.boolean(),
    isOpen: z.boolean(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});
