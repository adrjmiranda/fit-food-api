import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { AuthenticateUserController } from '#/infra/http/controllers/user/authenticate-user-controller.js';
import { RegisterUserController } from '#/infra/http/controllers/user/register-user-controller.js';
import { authenticateUserResponseSchema } from '#/infra/http/validators/user/reply/authenticate-user-response-schema.js';
import { registerUserResponseSchema } from '#/infra/http/validators/user/reply/register-user-response-schema.js';
import { authenticateUserBodySchema } from '#/infra/http/validators/user/request/body/authenticate-user-body-schema.js';
import { registerUserBodySchema } from '#/infra/http/validators/user/request/body/register-user-body-schema.js';

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Users'],
        summary: 'Register an user',
        body: registerUserBodySchema,
        response: {
          201: registerUserResponseSchema,
        },
      },
    },
    registerUserController.handle
  );
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate an user',
        body: authenticateUserBodySchema,
        response: {
          200: authenticateUserResponseSchema,
        },
      },
    },
    authenticateUserController.handle
  );
}
