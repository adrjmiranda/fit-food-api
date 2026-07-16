import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { CreateFoodLibraryUseCase } from '#/domain/fit-food/use-cases/create-food-library.js';
import { InMemoryFoodLibraryRepository } from '#/test/repositories/in-memory-food-library-repository.js';

let foodLibraryRepository: InMemoryFoodLibraryRepository;
let sut: CreateFoodLibraryUseCase; // SUT = System Under Test (Convenção de testes)

describe('Create Food Library Use Case', () => {
  beforeEach(() => {
    foodLibraryRepository = new InMemoryFoodLibraryRepository();
    sut = new CreateFoodLibraryUseCase(foodLibraryRepository);
  });

  it('should be able to create a food library item', async () => {
    const { food } = await sut.execute({
      name: 'Oatmeal',
      kcal: 389,
      protein: 16.9,
      carbs: 66.3,
      fat: 6.9,
      sugarStatus: 0,
      glutenStatus: 1,
      lactoseStatus: 0,
    });

    assert.ok(food.id);
    assert.ok(typeof food.id === 'string');
    assert.strictEqual(foodLibraryRepository.items.length, 1);
    assert.strictEqual(foodLibraryRepository.items[0]?.name, 'Oatmeal');
  });

  it('should not be able to create a food library item with a duplicate name', async () => {
    await sut.execute({
      name: 'Oatmeal',
      kcal: 389,
      protein: 16.9,
      carbs: 66.3,
      fat: 6.9,
      sugarStatus: 0,
      glutenStatus: 1,
      lactoseStatus: 0,
    });

    await assert.rejects(() =>
      sut.execute({
        name: 'oatmeal',
        kcal: 389,
        protein: 16.9,
        carbs: 66.3,
        fat: 6.9,
        sugarStatus: 0,
        glutenStatus: 1,
        lactoseStatus: 0,
      })
    );
  });
});
