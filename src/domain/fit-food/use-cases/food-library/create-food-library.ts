import { inject, injectable } from 'tsyringe';

import type { IngredientStatus } from '#/domain/constants/contamination-status.js';
import { FoodLibrary } from '#/domain/fit-food/entities/food-library.js';
import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';

interface CreateFoodLibraryUseCaseRequest {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  sugarStatus: IngredientStatus;
  glutenStatus: IngredientStatus;
  lactoseStatus: IngredientStatus;
}

interface CreateFoodLibraryUseCaseResponse {
  food: FoodLibrary;
}

@injectable()
export class CreateFoodLibraryUseCase {
  constructor(
    @inject('FoodLibraryRepository')
    private foodLibraryRepository: FoodLibraryRepository
  ) {}

  async execute({
    name,
    kcal,
    protein,
    carbs,
    fat,
    sugarStatus,
    glutenStatus,
    lactoseStatus,
  }: CreateFoodLibraryUseCaseRequest): Promise<CreateFoodLibraryUseCaseResponse> {
    const existingFoods = await this.foodLibraryRepository.findManyByName(name);

    const hasDuplicate = existingFoods.some(
      (food) => food.name.toLowerCase() === name.toLowerCase()
    );

    if (hasDuplicate)
      throw new Error('A food with this some already exists in the library');

    const food = new FoodLibrary({
      name,
      kcal,
      protein,
      carbs,
      fat,
      sugarStatus,
      glutenStatus,
      lactoseStatus,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.foodLibraryRepository.create(food);

    return { food };
  }
}
