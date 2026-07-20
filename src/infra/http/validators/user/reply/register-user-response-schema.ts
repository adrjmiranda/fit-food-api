import * as z from 'zod';

export const registerUserResponseSchema = z.object({
  user: z.object({
    id: z.uuid(),
    name: z.string().min(1),
    email: z.email(),
    streakDays: z.number().min(0),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});
