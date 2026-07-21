import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { env } from '#/core/config/env.js';
import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import type { User } from '#/domain/fit-food/entities/user.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
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
    private userRepository: UserRepository
  ) {}

  async execute({
    email,
    password,
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
    const refreshToken = jwt.sign(
      { role: userExists.role },
      env.REFRESH_JWT_SECRET,
      {
        subject: userExists.id,
        expiresIn: '30d',
      }
    );

    return {
      user: userExists,
      accessToken,
      refreshToken,
    };
  }
}
