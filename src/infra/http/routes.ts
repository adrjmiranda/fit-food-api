import type { FastifyInstance } from 'fastify';

import { foodLibraryRoutes } from '#/infra/http/routes/food-library-routes.js';

export async function appRoutes(app: FastifyInstance): Promise<void> {
  app.log.info('Application routes initialized');

  await app.register(foodLibraryRoutes, { prefix: '/food-library' });
}
