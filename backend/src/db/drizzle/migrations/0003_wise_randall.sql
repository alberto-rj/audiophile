ALTER TABLE "includes" DROP CONSTRAINT "includes_product_id_unique";--> statement-breakpoint
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "includes" DROP CONSTRAINT "includes_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "other_products" DROP CONSTRAINT "other_products_other_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "other_products" DROP CONSTRAINT "other_products_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "includes" ADD CONSTRAINT "includes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_other_id_products_id_fk" FOREIGN KEY ("other_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;