export const CONTAMINATION_STATUS = {
  FREE: 0,
  CONTAINS: 1,
  MAY_CONTAIN: 2,
} as const;

export type IngredientStatus =
  (typeof CONTAMINATION_STATUS)[keyof typeof CONTAMINATION_STATUS];
