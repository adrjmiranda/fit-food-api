import type { FoodLibrary } from '#/domain/fit-food/entities/food-library.js';

export class FoodLibraryPresenter {
  static toHTTP(food: FoodLibrary) {
    return {
      id: food.id,
      name: food.name,
      kcal: food.kcal,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      sugarStatus: food.sugarStatus,
      glutenStatus: food.glutenStatus,
      lactoseStatus: food.lactoseStatus,
      createdAt: food.createdAt,
      updatedAt: food.updatedAt,
    };
  }
}
