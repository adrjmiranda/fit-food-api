import { faker } from '@faker-js/faker';

import {
  Restaurant,
  type RestaurantProps,
} from '#/domain/fit-food/entities/restaurant.js';

export function makeRestaurant(
  override: Partial<RestaurantProps> = {}
): Restaurant {
  return new Restaurant({
    ownerId: faker.string.uuid(),
    name: faker.company.name(),
    cnpj: faker.string.numeric({ length: 14 }),
    phone: faker.string.numeric({ length: 11 }),
    isActive: true,
    isOpen: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  });
}
