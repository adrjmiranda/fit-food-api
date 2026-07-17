import { inject, injectable } from 'tsyringe';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
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
      throw new AppError(ERROR_CODES.FOOD_LIBRARY_NAME_ALREADY_EXISTS, 409);

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
