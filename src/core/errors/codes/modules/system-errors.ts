export const SYSTEM_ERRORS = {
  VALIDATION_ERROR: 'system_validation_error',
  TOO_MANY_REQUESTS: 'system_too_many_requests',
  INTERNAL_SERVER_ERROR: 'system_internal_server_error',
  RESOURCE_NOT_FOUND: 'system_resource_not_found',
  UNAUTHORIZED: 'system_unauthorized',
  FORBIDDEN: 'system_forbidden',
  INVALID_NAME: 'system_invalid_name',
  NAME_VERY_SHORT: 'system_name_very_short',
  NAME_VERY_LONG: 'system_name_very_long',
  INVALID_CONTAMINATION_STATUS: 'system_invalid_contamination_status',
} as const;
