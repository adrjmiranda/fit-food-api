// src/infra/http/errors/codes/modules/system-errors.ts
// All code suggestions must be strictly in English

export const SYSTEM_ERRORS = {
  VALIDATION_ERROR: 'system_validation_error',
  TOO_MANY_REQUESTS: 'system_too_many_requests',
  INTERNAL_SERVER_ERROR: 'system_internal_server_error',
  RESOURCE_NOT_FOUND: 'system_resource_not_found',
  UNAUTHORIZED: 'system_unauthorized',
  FORBIDDEN: 'system_forbidden',
} as const;
