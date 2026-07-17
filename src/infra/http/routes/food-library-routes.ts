import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { CreateFoodLibraryController } from '#/infra/http/controllers/food-library/create-food-library-controller.js';
import { createFoodLibraryResponseSchema } from '#/infra/http/validators/reply/create-food-library-response-schema.js';
import { createFoodLibraryBodySchema } from '#/infra/http/validators/request/body/create-food-library-body-schema.js';

const createFoodLibraryController = new CreateFoodLibraryController();

export async function foodLibraryRoutes(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Food Library'],
        summary: 'Create a food library item',
        body: createFoodLibraryBodySchema,
        response: {
          201: createFoodLibraryResponseSchema,
        },
      },
    },
    createFoodLibraryController.handle
  );
}
