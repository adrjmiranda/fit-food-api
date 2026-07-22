import type { Restaurant } from '#/domain/fit-food/entities/restaurant.js';

export interface RestaurantRepository {
  create(restaurant: Restaurant): Promise<void>;
  findById(id: string): Promise<Restaurant | null>;
  findByCnpj(cnpj: string): Promise<Restaurant | null>;
  findManyByOwnerId(ownerId: string): Promise<Restaurant[]>;
  save(restaurant: Restaurant): Promise<void>;
}
