CREATE TABLE "cart_items" (
	"id" serial NOT NULL,
	"cart_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cart_items_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "cart_items_uk_cart_id_product_id" UNIQUE("cart_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "carts_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "carts_uk_user_id" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_slug_unique";--> statement-breakpoint
ALTER TABLE "categories" DROP CONSTRAINT "categories_image_unique";--> statement-breakpoint
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_product_id_unique";--> statement-breakpoint
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_first_unique";--> statement-breakpoint
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_second_unique";--> statement-breakpoint
ALTER TABLE "galleries" DROP CONSTRAINT "galleries_third_unique";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_slug_unique";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_image_unique";--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_token_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "other_products" DROP CONSTRAINT "other_products_other_id_product_id_pk";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'categories'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "categories" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'products'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "products" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'refresh_tokens'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "refresh_tokens" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'users'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "users" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "includes" ADD CONSTRAINT "includes_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_pk_other_id_product_id" PRIMARY KEY("other_id","product_id");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_pk_id" PRIMARY KEY("id");--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_uk_image" UNIQUE("image");--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_uk_slug" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_uk_product_id" UNIQUE("product_id");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_uk_first" UNIQUE("first");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_uk_second" UNIQUE("second");--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_uk_third" UNIQUE("third");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_uk_image" UNIQUE("image");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_uk_slug" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_uk_token" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_uk_email" UNIQUE("email");