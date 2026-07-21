import type { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from '#/domain/fit-food/use-cases/user/authenticate-user.js';
import { UserPresenter } from '#/infra/http/presenters/user-presenter.js';
import { authenticateUserBodySchema } from '#/infra/http/validators/user/request/body/authenticate-user-body-schema.js';

export class AuthenticateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = authenticateUserBodySchema.parse(request.body);

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, accessToken, refreshToken } =
      await authenticateUserUseCase.execute({ email, password });

    reply.status(200).send({
      user: UserPresenter.toHTTP(user),
      accessToken,
      refreshToken,
    });
  }
}
