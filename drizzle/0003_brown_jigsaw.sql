CREATE TYPE "public"."role" AS ENUM('CUSTOMER', 'PARTNER', 'ADMIN');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::text::"public"."role";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';--> statement-breakpoint
DROP TYPE "public"."user_roles";