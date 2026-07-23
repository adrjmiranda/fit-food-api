import { inject, injectable } from 'tsyringe';

import { RefreshToken } from '#/domain/fit-food/entities/refresh-token.js';
import type { RefreshTokenRepository } from '#/domain/fit-food/repositories/refresh-token-repository.js';

interface CreateRefreshTokenUseCaseRequest {
  token: string;
  userId: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  expiresInDays?: number;
  expiresAt?: Date;
}

interface CreateRefreshTokenUseCaseResponse {
  token: string;
}

@injectable()
export class CreateRefreshTokenUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({
    token,
    userId,
    userAgent,
    ipAddress,
    expiresInDays,
    expiresAt,
  }: CreateRefreshTokenUseCaseRequest): Promise<CreateRefreshTokenUseCaseResponse> {
    const refreshToken = new RefreshToken({
      token,
      userId,
      userAgent: userAgent ?? null,
      ipAddress: ipAddress ?? null,
      createdAt: new Date(),
      expiresInDays: expiresInDays ?? 7,
      ...(expiresAt && { expiresAt }),
    });

    await this.refreshTokenRepository.create(refreshToken);

    return { token: refreshToken.token };
  }
}
