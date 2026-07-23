import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { env } from '#/core/config/env.js';
import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { RefreshToken } from '#/domain/fit-food/entities/refresh-token.js';
import type { User } from '#/domain/fit-food/entities/user.js';
import type { RefreshTokenRepository } from '#/domain/fit-food/repositories/refresh-token-repository.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
  userAgent?: string | null;
  ipAddress?: string | null;
}

interface AuthenticateUserUseCaseResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({
    email,
    password,
    userAgent,
    ipAddress,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (!userExists) throw new AppError(ERROR_CODES.USER_NOT_FOUND, 404);

    const passwordIsCorrect = await compare(password, userExists.passwordHash);

    if (!passwordIsCorrect)
      throw new AppError(ERROR_CODES.INVALID_PASSWORD, 400);

    const accessToken = jwt.sign(
      { role: userExists.role },
      env.ACCESS_JWT_SECRET,
      {
        subject: userExists.id,
        expiresIn: '15m',
      }
    );

    const expiresInDays = 30;
    const refreshToken = jwt.sign(
      { role: userExists.role },
      env.REFRESH_JWT_SECRET,
      {
        subject: userExists.id,
        expiresIn: `${expiresInDays}d`,
      }
    );

    await this.refreshTokenRepository.create(
      new RefreshToken({
        token: refreshToken,
        userId: userExists.id,
        expiresInDays,
        userAgent: userAgent ?? null,
        ipAddress: ipAddress ?? null,
      })
    );

    return {
      user: userExists,
      accessToken,
      refreshToken,
    };
  }
}
