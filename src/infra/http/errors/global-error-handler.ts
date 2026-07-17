import type {
  FastifyReply,
  FastifyRequest,
  FastifySchemaValidationError,
} from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/infra/http/errors/codes/error-codes.js';

interface FastifyErrorWithValidation extends Error {
  validation?: FastifySchemaValidationError[];
  statusCode?: number;
}

export class GlobalErrorHandler {
  public static handle(
    error: FastifyErrorWithValidation,
    _request: FastifyRequest,
    reply: FastifyReply
  ): FastifyReply {
    if (error instanceof ZodError) {
      const validationErrors = error.issues.reduce<Record<string, string>>(
        (acc, issue) => {
          const path = issue.path[0]?.toString();
          if (path) {
            acc[path] = issue.message;
          }
          return acc;
        },
        {}
      );

      return reply.status(400).send({
        code: ERROR_CODES.VALIDATION_ERROR,
        errors: validationErrors,
      });
    }

    if (error.validation) {
      const validationErrors = error.validation.reduce<Record<string, string>>(
        (acc, issue) => {
          const genericIssue = issue as unknown as Record<string, unknown>;
          let path = 'error';

          if (issue.instancePath) {
            path = issue.instancePath.replace(/^\//, '');
          } else if (Array.isArray(genericIssue.path) && genericIssue.path[0]) {
            path = genericIssue.path[0].toString();
          }

          acc[path] = issue.message ?? 'Invalid value';
          return acc;
        },
        {}
      );

      return reply.status(400).send({
        code: ERROR_CODES.VALIDATION_ERROR,
        errors: validationErrors,
      });
    }

    if (error.statusCode === 429) {
      return reply.status(429).send({
        code: ERROR_CODES.TOO_MANY_REQUESTS,
      });
    }

    if (error instanceof AppError) {
      return reply.status(error.status).send({
        code: error.code,
      });
    }

    console.error(error);

    return reply.status(500).send({
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
    });
  }
}
