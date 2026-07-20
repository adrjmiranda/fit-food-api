import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { RegisterUserController } from '#/infra/http/controllers/user/register-user-controller.js';
import { registerUserResponseSchema } from '#/infra/http/validators/user/reply/register-user-response-schema.js';
import { registerUserBodySchema } from '#/infra/http/validators/user/request/body/register-user-body-schema.js';

const registerUserController = new RegisterUserController();

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register a user',
        body: registerUserBodySchema,
        response: {
          201: registerUserResponseSchema,
        },
      },
    },
    registerUserController.handle
  );
}
