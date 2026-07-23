import { eq } from 'drizzle-orm';

import { RefreshToken } from '#/domain/fit-food/entities/refresh-token.js';
import type { RefreshTokenRepository } from '#/domain/fit-food/repositories/refresh-token-repository.js';
import { db } from '#/infra/database/client/db.js';
import { refreshTokensTable } from '#/infra/database/schemas/refresh-tokens.js';

type DatabaseRefreshTokenRow = typeof refreshTokensTable.$inferSelect;

class DrizzleRefreshTokenMapper {
  static toDomain(raw: DatabaseRefreshTokenRow): RefreshToken {
    return new RefreshToken(
      {
        userId: raw.userId,
        userAgent: raw.userAgent,
        ipAddress: raw.ipAddress,
        token: raw.token,
        createdAt: raw.createdAt,
        expiresAt: raw.expiresAt,
      },
      raw.id
    );
  }

  static toPersistence(domain: RefreshToken) {
    return {
      id: domain.id,
      userId: domain.userId,
      userAgent: domain.userAgent,
      ipAddress: domain.ipAddress,
      token: domain.token,
      createdAt: domain.createdAt,
      expiresAt: domain.expiresAt,
    };
  }
}

export class DrizzleRefreshTokensRepository implements RefreshTokenRepository {
  async create(refreshToken: RefreshToken): Promise<void> {
    const raw = DrizzleRefreshTokenMapper.toPersistence(refreshToken);
    await db.insert(refreshTokensTable).values(raw).execute();
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const [row] = await db
      .select()
      .from(refreshTokensTable)
      .where(eq(refreshTokensTable.id, id))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleRefreshTokenMapper.toDomain(row);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const [row] = await db
      .select()
      .from(refreshTokensTable)
      .where(eq(refreshTokensTable.token, token))
      .limit(1)
      .execute();

    if (!row) return null;

    return DrizzleRefreshTokenMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.id, id))
      .execute();
  }

  async deleteByToken(token: string): Promise<void> {
    await db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.token, token))
      .execute();
  }

  async deleteByUserId(userId: string): Promise<void> {
    await db
      .delete(refreshTokensTable)
      .where(eq(refreshTokensTable.userId, userId))
      .execute();
  }
}
