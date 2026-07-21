export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  PARTNER: 'PARTNER',
  ADMIN: 'ADMIN',
} as const;

export type UserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];
