// src/infra/http/errors/codes/modules/users-errors.ts
// All code suggestions must be strictly in English

export const USERS_ERRORS = {
  USER_NOT_FOUND: 'user_not_found',
  EMAIL_ALREADY_EXISTS: 'user_email_already_exists', // unique() da usersTable
  INVALID_CREDENTIALS: 'user_invalid_credentials',
  HEALTH_RESTRICTIONS_ALREADY_EXISTS: 'user_health_restrictions_already_exists', // unique() da userHealthRestrictionsTable
  WEEKLY_TARGETS_ALREADY_EXISTS: 'user_weekly_targets_already_exists', // unique() da userWeeklyTargetsTable
  CONSUMPTION_NOT_FOUND: 'user_consumption_not_found',
} as const;
