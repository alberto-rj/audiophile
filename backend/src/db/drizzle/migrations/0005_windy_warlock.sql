ALTER TABLE "categories" ADD CONSTRAINT "categories_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_image_unique" UNIQUE("image");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_first_unique" UNIQUE("first");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_second_unique" UNIQUE("second");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_third_unique" UNIQUE("third");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_image_unique" UNIQUE("image");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");