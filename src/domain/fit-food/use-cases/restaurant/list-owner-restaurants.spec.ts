import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { faker } from '@faker-js/faker';

import { ListOwnerRestaurantsUseCase } from '#/domain/fit-food/use-cases/restaurant/list-owner-restaurants.js';
import { makeRestaurant } from '#/test/factories/make-restaurant.js';
import { InMemoryRestaurantRepository } from '#/test/repositories/in-memory-restaurant-respository.js';

let restaurantRepository: InMemoryRestaurantRepository;
let sut: ListOwnerRestaurantsUseCase;

describe('List Owner Restaurants (Spec)', () => {
  beforeEach(() => {
    restaurantRepository = new InMemoryRestaurantRepository();
    sut = new ListOwnerRestaurantsUseCase(restaurantRepository);
  });

  it("must list all of the user's restaurants", async () => {
    const ownerId = faker.string.uuid();
    const restaurants = Array.from({ length: 5 }).map(() =>
      makeRestaurant({ ownerId })
    );

    await Promise.all(
      restaurants.map((restaurant) => restaurantRepository.create(restaurant))
    );

    const { restaurants: createdRestaurants } = await sut.execute({ ownerId });

    assert.deepStrictEqual(createdRestaurants, restaurants);
  });

  it('should not list restaurants from other users', async () => {
    const ownerId = faker.string.uuid();
    const otherOwnerId = faker.string.uuid();

    await restaurantRepository.create(makeRestaurant({ ownerId }));
    await restaurantRepository.create(
      makeRestaurant({ ownerId: otherOwnerId })
    );

    const { restaurants } = await sut.execute({ ownerId });

    assert.strictEqual(restaurants.length, 1);
    assert.strictEqual(restaurants[0]?.ownerId, ownerId);
  });
});
