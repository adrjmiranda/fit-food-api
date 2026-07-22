import type { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { ListOwnerRestaurantsUseCase } from '#/domain/fit-food/use-cases/restaurant/list-owner-restaurants.js';
import { RestaurantPresenter } from '#/infra/http/presenters/restaurant-presenter.js';

export class ListOwnerRestaurantsController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { sub: ownerId } = request.user as { sub: string };

    const listOwnerRestaurantsUseCase = container.resolve(
      ListOwnerRestaurantsUseCase
    );

    const { restaurants } = await listOwnerRestaurantsUseCase.execute({
      ownerId,
    });

    reply.status(200).send({
      restaurants: restaurants.map((restaurant) =>
        RestaurantPresenter.toSummaryHTTP(restaurant)
      ),
    });
  }
}
