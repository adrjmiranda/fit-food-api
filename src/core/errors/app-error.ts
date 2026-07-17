import type { ErrorCode } from '#/core/errors/codes/error-codes.js';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;

  constructor(code: ErrorCode, status = 400) {
    super(code);
    this.code = code;
    this.status = status;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
