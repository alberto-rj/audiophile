ALTER TABLE "other_products" RENAME COLUMN "otherId" TO "other_id";--> statement-breakpoint
ALTER TABLE "other_products" DROP CONSTRAINT "other_products_otherId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "other_products" DROP CONSTRAINT "other_products_otherId_product_id_pk";--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_other_id_product_id_pk" PRIMARY KEY("other_id","product_id");--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_other_id_products_id_fk" FOREIGN KEY ("other_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "is_new";