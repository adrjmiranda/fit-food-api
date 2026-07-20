import type { FastifyReply, FastifyRequest } from 'fastify';

import { RegisterUserUseCase } from '#/domain/fit-food/use-cases/user/register-user.js';
import { UserPresenter } from '#/infra/http/presenters/user-presenter.js';
import { registerUserBodySchema } from '#/infra/http/validators/user/request/body/register-user-body-schema.js';
import { DrizzleUserRepository } from '#/infra/repositories/drizzle-user-repository.js';

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { name, email, password } = registerUserBodySchema.parse(
      request.body
    );

    const userRepository = new DrizzleUserRepository();
    const registerUserUseCase = new RegisterUserUseCase(userRepository);

    const { user } = await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    reply.status(201).send({
      user: UserPresenter.toHTTP(user),
    });
  }
}
