import 'reflect-metadata';
import '#/core/container/index.js';

import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';

import { env } from '#/core/config/env.js';
import { GlobalErrorHandler } from '#/infra/http/errors/global-error-handler.js';
import { appRoutes } from '#/infra/http/routes.js';

const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setErrorHandler(GlobalErrorHandler.handle);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyJwt, {
  secret: env.ACCESS_JWT_SECRET,
  sign: {
    expiresIn: '15m',
  },
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'FitFood API',
      description: 'FitFood API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(appRoutes);

export { app };
