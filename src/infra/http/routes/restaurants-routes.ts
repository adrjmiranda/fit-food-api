import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { CreateRestaurantController } from '#/infra/http/controllers/restaurant/create-restaurant-controller.js';
import { verifyJwt } from '#/infra/http/middlewares/verify-jwt.js';
import { createRestaurantResponseSchema } from '#/infra/http/validators/restaurant/reply/create-restaurant-response-schema.js';
import { createRestaurantBodySchema } from '#/infra/http/validators/restaurant/request/body/create-restaurant-body-schema.js';

const createRestaurantController = new CreateRestaurantController();

export async function restaurantsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', verifyJwt);

  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Restaurants'],
        summary: 'Create a restaurant',
        body: createRestaurantBodySchema,
        response: {
          201: createRestaurantResponseSchema,
        },
      },
    },
    createRestaurantController.handle
  );
}
