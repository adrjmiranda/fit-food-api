import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { CreateRefreshTokenUseCase } from '#/domain/fit-food/use-cases/refresh-token/create-refresh-token.js';
import { makeRefreshToken } from '#/test/factories/make-refresh-token.js';
import { InMemoryRefreshTokenRepository } from '#/test/repositories/in-memory-refresh-token-repository.js';

let refreshTokenRepository: InMemoryRefreshTokenRepository;
let sut: CreateRefreshTokenUseCase;

describe('Create Refresh Token Use Case (Spec)', () => {
  beforeEach(() => {
    refreshTokenRepository = new InMemoryRefreshTokenRepository();
    sut = new CreateRefreshTokenUseCase(refreshTokenRepository);
  });

  it('should create the refresh token correctly', async () => {
    const refreshToken = makeRefreshToken();

    const { token } = await sut.execute({
      token: refreshToken.token,
      userId: refreshToken.userId,
      expiresAt: refreshToken.expiresAt,
      ipAddress: refreshToken.ipAddress ?? null,
      userAgent: refreshToken.userAgent ?? null,
    });

    const createdRefreshToken = await refreshTokenRepository.findByToken(token);

    assert(createdRefreshToken);
    assert.ok(createdRefreshToken.id);
    assert.strictEqual(token, createdRefreshToken.token);
    assert.strictEqual(
      refreshToken.expiresAt.getTime(),
      createdRefreshToken.expiresAt.getTime()
    );
    assert.strictEqual(refreshToken.userId, createdRefreshToken.userId);
    assert.strictEqual(refreshToken.ipAddress, createdRefreshToken.ipAddress);
    assert.strictEqual(refreshToken.userAgent, createdRefreshToken.userAgent);
  });
});
