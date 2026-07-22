import type { FastifyInstance } from 'fastify';

import { foodLibraryRoutes } from '#/infra/http/routes/food-library-routes.js';
import { restaurantsRoutes } from '#/infra/http/routes/restaurants-routes.js';
import { usersRoutes } from '#/infra/http/routes/users-routes.js';

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.log.info('Application routes initialized');

  await app.register(foodLibraryRoutes, { prefix: '/food-library' });
  await app.register(usersRoutes, { prefix: '/users' });
  await app.register(restaurantsRoutes, { prefix: '/restaurants' });
}
