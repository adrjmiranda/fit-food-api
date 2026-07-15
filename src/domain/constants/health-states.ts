export const HEALTH_RESTRICTION_STATES = {
  NO: 0,
  YES: 1,
  UNKNOWN: 2,
} as const;

export type HealthRestrictionState =
  (typeof HEALTH_RESTRICTION_STATES)[keyof typeof HEALTH_RESTRICTION_STATES];
