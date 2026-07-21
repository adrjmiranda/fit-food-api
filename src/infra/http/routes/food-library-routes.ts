import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { USER_ROLES } from '#/domain/constants/user-roles.js';
import { CreateFoodLibraryController } from '#/infra/http/controllers/food-library/create-food-library-controller.js';
import { verifyJwt } from '#/infra/http/middlewares/verify-jwt.js';
import { verifyUserRole } from '#/infra/http/middlewares/verify-user-role.js';
import { createFoodLibraryResponseSchema } from '#/infra/http/validators/food-library/reply/create-food-library-response-schema.js';
import { createFoodLibraryBodySchema } from '#/infra/http/validators/food-library/request/body/create-food-library-body-schema.js';

const createFoodLibraryController = new CreateFoodLibraryController();

export async function foodLibraryRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('preHandler', verifyJwt);
  app.addHook('preHandler', verifyUserRole(USER_ROLES.ADMIN));

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
