ALTER TABLE "other_products" RENAME TO "suggestions";--> statement-breakpoint
ALTER TABLE "suggestions" RENAME COLUMN "other_id" TO "source_id";--> statement-breakpoint
ALTER TABLE "suggestions" RENAME COLUMN "product_id" TO "target_id";--> statement-breakpoint
ALTER TABLE "suggestions" DROP CONSTRAINT "other_products_other_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "suggestions" DROP CONSTRAINT "other_products_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "suggestions" DROP CONSTRAINT "other_products_pk_other_id_product_id";--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_pk_source_id_target_id" PRIMARY KEY("source_id","target_id");--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_source_id_products_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_target_id_products_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;