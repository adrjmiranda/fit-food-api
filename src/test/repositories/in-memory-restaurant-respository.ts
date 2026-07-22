import type { Restaurant } from '#/domain/fit-food/entities/restaurant.js';
import type { RestaurantRepository } from '#/domain/fit-food/repositories/restaurant-repository.js';

export class InMemoryRestaurantRepository implements RestaurantRepository {
  public items: Restaurant[] = [];

  async create(restaurant: Restaurant): Promise<void> {
    this.items.push(restaurant);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = this.items.find((restaurant) => restaurant.id === id);

    if (!restaurant) return null;

    return restaurant;
  }

  async findByCnpj(cnpj: string): Promise<Restaurant | null> {
    const restaurant = this.items.find(
      (restaurant) => restaurant.cnpj === cnpj
    );

    if (!restaurant) return null;

    return restaurant;
  }

  async findManyByOwnerId(ownerId: string): Promise<Restaurant[]> {
    return this.items.filter((restaurant) => restaurant.ownerId === ownerId);
  }

  async save(restaurant: Restaurant): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === restaurant.id);

    if (itemIndex >= 0) this.items[itemIndex] = restaurant;
  }
}
