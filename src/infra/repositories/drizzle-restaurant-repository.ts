import { eq } from 'drizzle-orm';

import { Restaurant } from '#/domain/fit-food/entities/restaurant.js';
import type { RestaurantRepository } from '#/domain/fit-food/repositories/restaurant-repository.js';
import { db } from '#/infra/database/client/db.js';
import { restaurantsTable } from '#/infra/database/schemas/restaurants.js';

type DatabaseRestaurantRow = typeof restaurantsTable.$inferSelect;

class DrizzleRestaurantMapper {
  static toDomain(raw: DatabaseRestaurantRow): Restaurant {
    return new Restaurant(
      {
        ownerId: raw.ownerId,
        name: raw.name,
        cnpj: raw.cnpj,
        phone: raw.phone,
        isActive: raw.isActive,
        isOpen: raw.isOpen,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }

  static toPersistence(domain: Restaurant) {
    return {
      id: domain.id,
      name: domain.name,
      ownerId: domain.ownerId,
      cnpj: domain.cnpj,
      phone: domain.phone,
      isActive: domain.isActive,
      isOpen: domain.isOpen,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

export class DrizzleRestaurantRepository implements RestaurantRepository {
  async create(restaurant: Restaurant): Promise<void> {
    const raw = DrizzleRestaurantMapper.toPersistence(restaurant);
    await db.insert(restaurantsTable).values(raw).execute();
  }

  async findById(id: string): Promise<Restaurant | null> {
    const [row] = await db
      .select()
      .from(restaurantsTable)
      .where(eq(restaurantsTable.id, id))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleRestaurantMapper.toDomain(row);
  }

  async findByCnpj(cnpj: string): Promise<Restaurant | null> {
    const [row] = await db
      .select()
      .from(restaurantsTable)
      .where(eq(restaurantsTable.cnpj, cnpj))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleRestaurantMapper.toDomain(row);
  }

  async findManyByOwnerId(ownerId: string): Promise<Restaurant[]> {
    const rows = await db
      .select()
      .from(restaurantsTable)
      .where(eq(restaurantsTable.ownerId, ownerId))
      .execute();

    return rows.map((row) => DrizzleRestaurantMapper.toDomain(row));
  }

  async save(restaurant: Restaurant): Promise<void> {
    const raw = DrizzleRestaurantMapper.toPersistence(restaurant);

    await db
      .update(restaurantsTable)
      .set(raw)
      .where(eq(restaurantsTable.id, restaurant.id))
      .execute();
  }
}
