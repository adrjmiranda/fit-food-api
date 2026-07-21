import type { FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import type { UserRoles } from '#/domain/constants/user-roles.js';

export function verifyUserRole(roleToVerify: UserRoles) {
  return async (
    request: FastifyRequest,
    _reply: FastifyReply
  ): Promise<void> => {
    const { role } = request.user as { role: UserRoles };

    if (role !== roleToVerify)
      throw new AppError(ERROR_CODES.UNAUTHORIZED, 403);
  };
}
