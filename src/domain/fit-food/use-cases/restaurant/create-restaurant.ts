import { inject, injectable } from 'tsyringe';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { Restaurant } from '#/domain/fit-food/entities/restaurant.js';
import type { RestaurantRepository } from '#/domain/fit-food/repositories/restaurant-repository.js';

interface CreateRestaurantUseCaseRequest {
  ownerId: string;
  name: string;
  cnpj: string;
  phone: string;
}

interface CreateRestaurantUseCaseResponse {
  restaurant: Restaurant;
}

@injectable()
export class CreateRestaurantUseCase {
  constructor(
    @inject('RestaurantRepository')
    private restaurantRepository: RestaurantRepository
  ) {}

  async execute({
    ownerId,
    name,
    cnpj,
    phone,
  }: CreateRestaurantUseCaseRequest): Promise<CreateRestaurantUseCaseResponse> {
    const restaurantWithCnpjExists =
      await this.restaurantRepository.findByCnpj(cnpj);

    if (restaurantWithCnpjExists)
      throw new AppError(ERROR_CODES.CNPJ_ALREADY_EXISTS, 409);

    const restaurant = new Restaurant({
      ownerId,
      name,
      cnpj,
      phone,
      isActive: true,
      isOpen: false,
    });

    await this.restaurantRepository.create(restaurant);

    return { restaurant };
  }
}
