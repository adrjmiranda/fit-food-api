import type { User } from '#/domain/fit-food/entities/user.js';

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      streakDays: user.streakDays,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
