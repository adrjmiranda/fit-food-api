import type { FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';

export async function verifyJwt(
  request: FastifyRequest,
  _reply: FastifyReply
): Promise<void> {
  try {
    await request.jwtVerify();
  } catch {
    throw new AppError(ERROR_CODES.INVALID_CREDENTIALS, 401);
  }
}
