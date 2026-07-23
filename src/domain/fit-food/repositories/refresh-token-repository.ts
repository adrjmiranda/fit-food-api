import type { RefreshToken } from '#/domain/fit-food/entities/refresh-token.js';

export interface RefreshTokenRepository {
  create(refreshToken: RefreshToken): Promise<void>;
  findById(id: string): Promise<RefreshToken | null>;
  findByToken(token: string): Promise<RefreshToken | null>;
  delete(id: string): Promise<void>;
  deleteByToken(token: string): Promise<void>;
  deleteByUserId(userId: string): Promise<void>;
}
