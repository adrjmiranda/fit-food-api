import { eq } from 'drizzle-orm';

import { User } from '#/domain/fit-food/entities/user.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';
import { db } from '#/infra/database/client/db.js';
import { usersTable } from '#/infra/database/schemas/users.js';

type DatabaseUserRow = typeof usersTable.$inferSelect;

class DrizzleUserMapper {
  static toDomain(raw: DatabaseUserRow): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.passwordHash,
        streakDays: raw.streakDays,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
  }

  static toPersistence(domain: User) {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      passwordHash: domain.passwordHash,
      streakDays: domain.streakDays,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

export class DrizzleUserRepository implements UserRepository {
  async create(user: User): Promise<void> {
    const raw = DrizzleUserMapper.toPersistence(user);
    await db.insert(usersTable).values(raw).execute();
  }

  async findById(id: string): Promise<User | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleUserMapper.toDomain(row);
  }

  async findByEmail(email: string): Promise<User | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleUserMapper.toDomain(row);
  }

  async findManyByName(name: string): Promise<User[]> {
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, name))
      .execute();

    return rows.map((row) => DrizzleUserMapper.toDomain(row));
  }

  async save(user: User): Promise<void> {
    const raw = DrizzleUserMapper.toPersistence(user);

    await db
      .update(usersTable)
      .set(raw)
      .where(eq(usersTable.id, user.id))
      .execute();
  }
}
