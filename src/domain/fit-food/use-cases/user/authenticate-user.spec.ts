import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { AuthenticateUserUseCase } from '#/domain/fit-food/use-cases/user/authenticate-user.js';
import { makeUser } from '#/test/factories/make-user.js';
import { InMemoryUserRepository } from '#/test/repositories/in-memory-user-repository.js';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUserUseCase;

describe('Authenticate User Use Case (Spec)', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUserUseCase(userRepository);
  });

  it('should authenticate a user correctly', async () => {
    const userPassword = faker.internet.password();
    const userPasswordHash = hashSync(userPassword, 10);
    const user = makeUser({ passwordHash: userPasswordHash });

    await userRepository.create(user);

    const {
      user: authenticatedUser,
      accessToken,
      refreshToken,
    } = await sut.execute({ email: user.email, password: userPassword });

    assert.ok(authenticatedUser.id);
    assert.ok(typeof authenticatedUser.id === 'string');
    assert.ok(accessToken);
    assert.ok(refreshToken);
  });

  it('should not authenticate a user with an email that does not exist', async () => {
    const nonExistentUserEmail = 'invalid@mail.com';

    const userEmail = 'valid@email.com';
    const userPassword = faker.internet.password();
    const userPasswordHash = hashSync(userPassword, 10);
    const user = makeUser({ email: userEmail, passwordHash: userPasswordHash });

    await userRepository.create(user);

    await assert.rejects(
      () =>
        sut.execute({
          email: nonExistentUserEmail,
          password: userPassword,
        }),
      (error: unknown) => {
        assert.ok(error instanceof AppError);
        assert.strictEqual(error.code, ERROR_CODES.USER_NOT_FOUND);
        assert.strictEqual(error.status, 404);

        return true;
      }
    );
  });

  it('should not authenticate a user with an incorrect password', async () => {
    const invalidUserPassword = 'invalid-password';

    const userPassword = 'valid-password';
    const userPasswordHash = hashSync(userPassword, 10);
    const user = makeUser({ passwordHash: userPasswordHash });

    await userRepository.create(user);

    await assert.rejects(
      () =>
        sut.execute({
          email: user.email,
          password: invalidUserPassword,
        }),
      (error: unknown) => {
        assert.ok(error instanceof AppError);
        assert.strictEqual(error.code, ERROR_CODES.INVALID_PASSWORD);
        assert.strictEqual(error.status, 400);

        return true;
      }
    );
  });
});
