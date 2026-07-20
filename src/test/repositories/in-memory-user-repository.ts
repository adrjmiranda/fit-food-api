import type { User } from '#/domain/fit-food/entities/user.js';
import type { UserRepository } from '#/domain/fit-food/repositories/user-repository.js';

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findManyByName(name: string): Promise<User[]> {
    return this.items.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async save(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id);

    if (itemIndex >= 0) this.items[itemIndex] = user;
  }
}
