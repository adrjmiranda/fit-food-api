import { randomUUID } from 'node:crypto';

export interface RefreshTokenProps {
  token: string;
  userId: string;
  userAgent?: string | null;
  ipAddress?: string | null;
  createdAt?: Date;
  expiresInDays?: number;
  expiresAt?: Date;
}

export class RefreshToken {
  private readonly _id: string;
  private readonly _token: string;
  private readonly _userId: string;
  private readonly _userAgent?: string | null;
  private readonly _ipAddress?: string | null;
  private readonly _expiresAt: Date;
  private readonly _createdAt: Date;

  constructor(props: RefreshTokenProps, id?: string) {
    this._createdAt = props.createdAt ?? new Date();

    if (props.expiresAt) {
      this._expiresAt = props.expiresAt;
    } else if (props.expiresInDays) {
      if (props.expiresInDays <= 0)
        throw new Error('The expiration time must be greater than 0');
      this._expiresAt = new Date(this._createdAt);
      this._expiresAt.setDate(this._createdAt.getDate() + props.expiresInDays);
    } else {
      throw new Error('Either expiresInDays or expiresAt must be provided');
    }

    this._id = id ?? randomUUID();
    this._token = props.token;
    this._userId = props.userId;
    this._userAgent = props.userAgent ?? null;
    this._ipAddress = props.ipAddress ?? null;
  }

  get id(): string {
    return this._id;
  }

  get token(): string {
    return this._token;
  }

  get userId(): string {
    return this._userId;
  }

  get userAgent(): string | null | undefined {
    return this._userAgent;
  }

  get ipAddress(): string | null | undefined {
    return this._ipAddress;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get expiresAt(): Date {
    return this._expiresAt;
  }
}
