import 'reflect-metadata';

import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { faker } from '@faker-js/faker';
import { compareSync, hashSync } from 'bcrypt';

import { AppError } from '#/core/errors/app-error.js';
import { ERROR_CODES } from '#/core/errors/codes/error-codes.js';
import { RegisterUserUseCase } from '#/domain/fit-food/use-cases/user/register-user.js';
import { makeUser } from '#/test/factories/make-user-library.js';
import { InMemoryUserRepository } from '#/test/repositories/in-memory-user-repository.js';

let userRepository: InMemoryUserRepository;
let sut: RegisterUserUseCase;

describe('Register User Use Case (Spec)', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUserUseCase(userRepository);
  });

  it('should successfully register a user', async () => {
    const userName = 'Robervaldo';
    const userPassword = faker.internet.password({ length: 8 });
    const userPasswordHash = hashSync(userPassword, 10);
    const user = makeUser({ name: userName, passwordHash: userPasswordHash });

    const { user: registeredUser } = await sut.execute({
      name: user.name,
      email: user.email,
      password: userPassword,
    });

    assert.ok(registeredUser.id);
    assert.ok(typeof registeredUser.id === 'string');
    assert.strictEqual(userName, registeredUser.name);
    assert.ok(compareSync(userPassword, registeredUser.passwordHash));
  });

  it('should not register a user with an already registered email', async () => {
    const userEmail = faker.internet.email();
    const existingUser = makeUser({ email: userEmail });

    await userRepository.create(existingUser);

    await assert.rejects(
      () =>
        sut.execute({
          name: existingUser.name,
          email: existingUser.email,
          password: faker.internet.password(),
        }),
      (error: unknown) => {
        assert.ok(error instanceof AppError);
        assert.strictEqual(error.code, ERROR_CODES.EMAIL_ALREADY_EXISTS);
        assert.strictEqual(error.status, 409);

        return true;
      }
    );
  });

  it('should hash user password upon registration', async () => {
    const password = faker.internet.password({ length: 8 });

    const { user } = await sut.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    });

    const userOnRepository = await userRepository.findById(user.id);

    assert.ok(userOnRepository);
    assert.notStrictEqual(userOnRepository.passwordHash, password);
    assert.ok(compareSync(password, userOnRepository.passwordHash));
  });

  it('should initialize user with zero streak days', async () => {
    const { user } = await sut.execute({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
    });

    assert.strictEqual(user.streakDays, 0);
  });
});
