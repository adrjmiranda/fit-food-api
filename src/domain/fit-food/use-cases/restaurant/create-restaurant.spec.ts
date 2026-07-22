import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { faker } from '@faker-js/faker';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { CreateRestaurantUseCase } from '#/domain/fit-food/use-cases/restaurant/create-restaurant.js';
import { makeRestaurant } from '#/test/factories/make-restaurant.js';
import { InMemoryRestaurantRepository } from '#/test/repositories/in-memory-restaurant-respository.js';

let restaurantRepository: InMemoryRestaurantRepository;
let sut: CreateRestaurantUseCase;

describe('Create Restaurant Use Case (Spec)', () => {
  beforeEach(() => {
    restaurantRepository = new InMemoryRestaurantRepository();
    sut = new CreateRestaurantUseCase(restaurantRepository);
  });

  it('should create a successful restaurant', async () => {
    const restaurant = makeRestaurant();

    const { restaurant: createdRestaurant } = await sut.execute({
      ownerId: restaurant.ownerId,
      name: restaurant.name,
      cnpj: restaurant.cnpj,
      phone: restaurant.phone,
    });

    assert.ok(createdRestaurant.id);
    assert.ok(typeof createdRestaurant.id === 'string');
    assert.strictEqual(createdRestaurant.ownerId, restaurant.ownerId);
    assert.strictEqual(createdRestaurant.name, restaurant.name);
    assert.strictEqual(createdRestaurant.cnpj, restaurant.cnpj);
    assert.strictEqual(createdRestaurant.phone, restaurant.phone);
    assert.strictEqual(createdRestaurant.isActive, true);
    assert.strictEqual(createdRestaurant.isOpen, false);
  });

  it('should not create a restaurant using a CNPJ that is already registered', async () => {
    const restaurantCnpj = faker.string.numeric({ length: 14 });
    const restaurant = makeRestaurant({ cnpj: restaurantCnpj });

    await restaurantRepository.create(restaurant);

    await assert.rejects(
      () =>
        sut.execute({
          ownerId: restaurant.ownerId,
          name: restaurant.name,
          cnpj: restaurant.cnpj,
          phone: restaurant.phone,
        }),
      (error: unknown) => {
        assert.ok(error instanceof AppError);
        assert.strictEqual(error.code, ERROR_CODES.CNPJ_ALREADY_EXISTS);
        assert.strictEqual(error.status, 409);

        return true;
      }
    );
  });
});
