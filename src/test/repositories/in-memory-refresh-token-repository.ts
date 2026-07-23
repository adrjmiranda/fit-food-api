import type { RefreshToken } from '#/domain/fit-food/entities/refresh-token.js';
import type { RefreshTokenRepository } from '#/domain/fit-food/repositories/refresh-token-repository.js';

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private items: RefreshToken[] = [];

  async create(refreshToken: RefreshToken): Promise<void> {
    this.items.push(refreshToken);
  }

  async findById(id: string): Promise<RefreshToken | null> {
    const refreshToken = this.items.find(
      (refreshToken) => refreshToken.id === id
    );

    if (!refreshToken) return null;

    return refreshToken;
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = this.items.find(
      (refreshToken) => refreshToken.token === token
    );

    if (!refreshToken) return null;

    return refreshToken;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex(
      (refreshToken) => refreshToken.id === id
    );

    if (index !== -1) this.items.splice(index, 1);
  }

  async deleteByToken(token: string): Promise<void> {
    const index = this.items.findIndex(
      (refreshToken) => refreshToken.token === token
    );

    if (index !== -1) this.items.splice(index, 1);
  }

  async deleteByUserId(userId: string): Promise<void> {
    this.items = this.items.filter(
      (refreshToken) => refreshToken.userId !== userId
    );
  }
}
