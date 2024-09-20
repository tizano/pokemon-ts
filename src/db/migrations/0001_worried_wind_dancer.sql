ALTER TABLE "pokemon" RENAME COLUMN "hp" TO "image_url";--> statement-breakpoint
ALTER TABLE "pokemon" ALTER COLUMN "image_url" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "card" ADD COLUMN "image_url" text NOT NULL;