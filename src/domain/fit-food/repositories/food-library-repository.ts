import type { FoodLibrary } from '#/domain/fit-food/entities/food-library.js';

export interface FoodLibraryRepository {
  create(food: FoodLibrary): Promise<void>;
  findById(id: string): Promise<FoodLibrary | null>;
  findByName(name: string): Promise<FoodLibrary[]>;
  save(food: FoodLibrary): Promise<void>;
}
