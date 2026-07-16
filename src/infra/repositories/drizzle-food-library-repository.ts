import { eq } from 'drizzle-orm';

import type { IngredientStatus } from '#/domain/constants/contamination-status.js';
import { FoodLibrary } from '#/domain/fit-food/entities/food-library.js';
import type { FoodLibraryRepository } from '#/domain/fit-food/repositories/food-library-repository.js';
import { db } from '#/infra/database/client/db.js';
import { foodLibraryTable } from '#/infra/database/schemas/food-library.js';

type DatabaseFoodRow = typeof foodLibraryTable.$inferSelect;

class DrizzleFoodLibraryMapper {
  static toDomain(raw: DatabaseFoodRow): FoodLibrary {
    return new FoodLibrary({
      name: raw.name,
      kcal: raw.kcal,
      protein: raw.protein,
      carbs: raw.carbs,
      fat: raw.fat,
      sugarStatus: raw.sugarStatus as IngredientStatus,
      glutenStatus: raw.glutenStatus as IngredientStatus,
      lactoseStatus: raw.lactoseStatus as IngredientStatus,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(domain: FoodLibrary) {
    return {
      id: domain.id,
      name: domain.name,
      kcal: domain.kcal,
      protein: domain.protein,
      carbs: domain.carbs,
      fat: domain.fat,
      sugarStatus: domain.sugarStatus,
      glutenStatus: domain.glutenStatus,
      lactoseStatus: domain.lactoseStatus,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

export class DrizzleFoodLibraryRepository implements FoodLibraryRepository {
  async create(food: FoodLibrary): Promise<void> {
    const raw = DrizzleFoodLibraryMapper.toPersistence(food);
    await db.insert(foodLibraryTable).values(raw);
  }

  async findById(id: string): Promise<FoodLibrary | null> {
    const [row] = await db
      .select()
      .from(foodLibraryTable)
      .where(eq(foodLibraryTable.id, id))
      .limit(1);

    if (!row) return null;

    return DrizzleFoodLibraryMapper.toDomain(row);
  }

  async findByName(name: string): Promise<FoodLibrary[]> {
    const rows = await db
      .select()
      .from(foodLibraryTable)
      .where(eq(foodLibraryTable.name, name))
      .limit(1);

    return rows.map((row) => DrizzleFoodLibraryMapper.toDomain(row));
  }

  async save(food: FoodLibrary): Promise<void> {
    const raw = DrizzleFoodLibraryMapper.toPersistence(food);

    await db
      .update(foodLibraryTable)
      .set(raw)
      .where(eq(foodLibraryTable.id, food.id));
  }
}
