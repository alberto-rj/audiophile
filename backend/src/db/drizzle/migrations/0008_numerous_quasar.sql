ALTER TABLE "order_items" ADD COLUMN "image" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "phone";