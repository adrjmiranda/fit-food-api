import type { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CreateRestaurantUseCase } from '#/domain/fit-food/use-cases/restaurant/create-restaurant.js';
import { RestaurantPresenter } from '#/infra/http/presenters/restaurant-presenter.js';
import { createRestaurantBodySchema } from '#/infra/http/validators/restaurant/request/body/create-restaurant-body-schema.js';

export class CreateRestaurantController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { sub: ownerId } = request.user as { sub: string };
    const { name, cnpj, phone } = createRestaurantBodySchema.parse(
      request.body
    );

    const createRestaurantUseCase = container.resolve(CreateRestaurantUseCase);

    const { restaurant } = await createRestaurantUseCase.execute({
      ownerId,
      name,
      cnpj,
      phone,
    });

    reply.status(201).send({
      restaurant: RestaurantPresenter.toHTTP(restaurant),
    });
  }
}
