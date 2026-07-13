import type { FastifyInstance } from 'fastify';

export const appRoutes = async (app: FastifyInstance): Promise<void> => {
  app.log.info('Application routes initialized');
};
