import { FoodLibrary } from '#/domain/fit-food/entities/food-library.js';
import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';

export class InMemoryFoodLibraryRepository implements FoodLibraryRepository {
  public items: FoodLibrary[] = [];

  async create(food: FoodLibrary): Promise<void> {
    this.items.push(food);
  }

  async findById(id: string): Promise<FoodLibrary | null> {
    const food = this.items.find((item) => item.id === id);

    if (!food) return null;

    return food;
  }

  async findManyByName(name: string): Promise<FoodLibrary[]> {
    return this.items.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async save(food: FoodLibrary): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === food.id);

    if (itemIndex >= 0) this.items[itemIndex] = food;
  }
}
