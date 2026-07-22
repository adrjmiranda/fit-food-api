import type { Restaurant } from '#/domain/fit-food/entities/restaurant.js';

export class RestaurantPresenter {
  static toHTTP(restaurant: Restaurant) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      cnpj: restaurant.cnpj,
      phone: restaurant.phone,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    };
  }
}
