import { inject, injectable } from 'tsyringe';

import type { Restaurant } from '#/domain/fit-food/entities/restaurant.js';
import type { RestaurantRepository } from '#/domain/fit-food/repositories/restaurant-repository.js';

interface ListOwnerRestaurantsUseCaseRequest {
  ownerId: string;
}

interface ListOwnerRestaurantsUseCaseResponse {
  restaurants: Restaurant[];
}

@injectable()
export class ListOwnerRestaurantsUseCase {
  constructor(
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute({
    ownerId,
  }: ListOwnerRestaurantsUseCaseRequest): Promise<ListOwnerRestaurantsUseCaseResponse> {
    const restaurants =
      await this.restaurantRepository.findManyByOwnerId(ownerId);

    return { restaurants };
  }
}
