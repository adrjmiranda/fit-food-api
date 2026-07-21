import type { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CreateFoodLibraryUseCase } from '#/domain/fit-food/use-cases/food-library/create-food-library.js';
import { FoodLibraryPresenter } from '#/infra/http/presenters/food-library-presenter.js';
import { createFoodLibraryBodySchema } from '#/infra/http/validators/food-library/request/body/create-food-library-body-schema.js';

export class CreateFoodLibraryController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const data = createFoodLibraryBodySchema.parse(request.body);

    const createFoodLibraryUseCase = container.resolve(
      CreateFoodLibraryUseCase
    );

    const { food } = await createFoodLibraryUseCase.execute(data);

    await reply.status(201).send({
      food: FoodLibraryPresenter.toHTTP(food),
    });
  }
}
