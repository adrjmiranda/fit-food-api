export interface DailyTargetSchema {
  kcalTarget?: number;
  proteinTarget?: number;
  carbsTarget?: number;
  fatTarget?: number;
  isCheatDay?: boolean;
}

export type WeeklyTargetsSchema = Record<string, DailyTargetSchema>;
