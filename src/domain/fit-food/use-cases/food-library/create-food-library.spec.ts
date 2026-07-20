import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { CreateFoodLibraryUseCase } from '#/domain/fit-food/use-cases/food-library/create-food-library.js';
import { makeFoodLibrary } from '#/test/factories/make-food-library.js';
import { InMemoryFoodLibraryRepository } from '#/test/repositories/in-memory-food-library-repository.js';

let foodLibraryRepository: InMemoryFoodLibraryRepository;
let sut: CreateFoodLibraryUseCase;

describe('Create Food Library Use Case (Spec)', () => {
  beforeEach(() => {
    foodLibraryRepository = new InMemoryFoodLibraryRepository();
    sut = new CreateFoodLibraryUseCase(foodLibraryRepository);
  });

  it('should be able to create a food library item', async () => {
    const foodLibraryItemName = 'Oatmeal';
    const foodLibraryItem = makeFoodLibrary({ name: foodLibraryItemName });

    const { food } = await sut.execute({
      name: foodLibraryItem.name,
      kcal: foodLibraryItem.kcal,
      protein: foodLibraryItem.protein,
      carbs: foodLibraryItem.carbs,
      fat: foodLibraryItem.fat,
      sugarStatus: foodLibraryItem.sugarStatus,
      glutenStatus: foodLibraryItem.glutenStatus,
      lactoseStatus: foodLibraryItem.lactoseStatus,
    });

    assert.ok(food.id);
    assert.ok(typeof food.id === 'string');
    assert.strictEqual(foodLibraryRepository.items.length, 1);
    assert.strictEqual(
      foodLibraryRepository.items[0]?.name,
      foodLibraryItemName
    );
  });

  it('should not be able to create a food library item with a duplicate name', async () => {
    const foodLibraryItemName = 'Oatmeal';
    const existingFood = makeFoodLibrary({ name: foodLibraryItemName });

    await foodLibraryRepository.create(existingFood);

    await assert.rejects(() =>
      sut.execute({
        name: existingFood.name,
        kcal: existingFood.kcal,
        protein: existingFood.protein,
        carbs: existingFood.carbs,
        fat: existingFood.fat,
        sugarStatus: existingFood.sugarStatus,
        glutenStatus: existingFood.glutenStatus,
        lactoseStatus: existingFood.lactoseStatus,
      })
    );
  });
});
