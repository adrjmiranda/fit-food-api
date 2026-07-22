import type { Restaurant } from '#/domain/fit-food/entities/restaurant.js';

export class RestaurantPresenter {
  static toHTTP(restaurant: Restaurant) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      cnpj: restaurant.cnpj,
      phone: restaurant.phone,
      isActive: restaurant.isActive,
      isOpen: restaurant.isOpen,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    };
  }

  static toSummaryHTTP(restaurant: Restaurant) {
    return {
      id: restaurant.id.toString(),
      name: restaurant.name,
      isActive: restaurant.isActive,
      isOpen: restaurant.isOpen,
      createdAt: restaurant.createdAt,
      updatedAt: restaurant.updatedAt,
    };
  }
}
