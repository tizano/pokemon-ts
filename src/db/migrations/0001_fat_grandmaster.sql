ALTER TABLE "pokemon_type" DROP CONSTRAINT "pokemon_type_name_unique";--> statement-breakpoint
ALTER TABLE "pokemon_type" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemon_type" ADD CONSTRAINT "pokemon_type_slug_unique" UNIQUE("slug");