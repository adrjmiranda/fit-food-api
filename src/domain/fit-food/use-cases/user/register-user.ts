import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { User } from '#/domain/fit-food/entities/user.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  user: User;
}

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) throw new AppError(ERROR_CODES.EMAIL_ALREADY_EXISTS, 409);

    const passwordHash = await hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      streakDays: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userRepository.create(user);

    return { user };
  }
}
