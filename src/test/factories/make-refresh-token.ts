import { faker } from '@faker-js/faker';

import {
  RefreshToken,
  type RefreshTokenProps,
} from '#/domain/fit-food/entities/refresh-token.js';

export function makeRefreshToken(
  override: Partial<RefreshTokenProps> = {}
): RefreshToken {
  return new RefreshToken({
    userId: faker.string.uuid(),
    token: faker.internet.jwt(),
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    expiresInDays: faker.number.int({ min: 1, max: 30 }),
    createdAt: new Date(),
    ...override,
  });
}
