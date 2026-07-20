import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';

import { User, type UserProps } from '#/domain/fit-food/entities/user.js';

export function makeUser(override: Partial<UserProps> = {}): User {
  return new User({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: hashSync(faker.internet.password({ length: 8 }), 10),
    streakDays: faker.number.int({ min: 0 }),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  });
}
