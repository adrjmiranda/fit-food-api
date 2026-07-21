CREATE TYPE "public"."user_roles" AS ENUM('CUSTOMER', 'PARTNER', 'ADMIN');--> statement-breakpoint
ALTER TABLE "restaurants" ADD COLUMN "owner_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'CUSTOMER' NOT NULL;--> statement-breakpoint
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;