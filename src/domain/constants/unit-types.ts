export const UNIT_TYPES = {
  GRAMS: 1,
  MILLILITERS: 2,
} as const;

export type UnitType = (typeof UNIT_TYPES)[keyof typeof UNIT_TYPES];
