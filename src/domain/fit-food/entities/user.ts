import { randomUUID } from 'node:crypto';

export interface UserProps {
  name: string;
  email: string;
  passwordHash: string;
  streakDays: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UpdateUserProps = Partial<
  Omit<UserProps, 'createdAt' | 'updatedAt'>
>;

export class User {
  private readonly _id: string;
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    if (!value) throw new Error('User name must not be empty');

    this.props.name = value;
    this.touch();
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    if (!value || !value.includes('@') || !value.includes('.'))
      throw new Error('Invalid user email format');

    this.props.email = value;
    this.touch();
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  set passwordHash(value: string) {
    if (!value) throw new Error('User password hash must not be empty');

    this.props.passwordHash = value;
    this.touch();
  }

  get streakDays(): number {
    return this.props.streakDays;
  }

  set streakDays(value: number) {
    if (value < 0) throw new Error('Streak days cannot be negative');

    this.props.streakDays = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt ?? new Date();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private validateProps(
    name: string,
    email: string,
    passwordHash: string,
    streakDays: number
  ): void {
    if (!name) throw new Error('User name must not be empty');
    if (!email || !email.includes('@') || !email.includes('.'))
      throw new Error('User email must not be empty');
    if (!passwordHash) throw new Error('User password hash must not be empty');
    if (streakDays < 0) throw new Error('Streak days cannot be negative');
  }

  public update(props: UpdateUserProps): void {
    const name = props.name ?? this.props.name;
    const email = props.email ?? this.props.email;
    const passwordHash = props.passwordHash ?? this.props.passwordHash;
    const streakDays = props.streakDays ?? this.props.streakDays;

    this.validateProps(name, email, passwordHash, streakDays);

    this.props = {
      ...this.props,
      ...props,
    };

    this.touch();
  }
}
