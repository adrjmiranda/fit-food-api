ALTER TABLE "food_library" ALTER COLUMN "kcal" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "food_library" ALTER COLUMN "protein" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "food_library" ALTER COLUMN "carbs" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "food_library" ALTER COLUMN "fat" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "meals" ALTER COLUMN "kcal" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "meals" ALTER COLUMN "protein" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "meals" ALTER COLUMN "carbs" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "meals" ALTER COLUMN "fat" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "restaurant_ingredients" ALTER COLUMN "kcal" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "restaurant_ingredients" ALTER COLUMN "protein" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "restaurant_ingredients" ALTER COLUMN "carbs" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "restaurant_ingredients" ALTER COLUMN "fat" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "user_daily_consumptions" ALTER COLUMN "kcal" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "user_daily_consumptions" ALTER COLUMN "protein" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "user_daily_consumptions" ALTER COLUMN "carbs" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "user_daily_consumptions" ALTER COLUMN "fat" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "food_library" ADD CONSTRAINT "food_library_name_unique" UNIQUE("name");