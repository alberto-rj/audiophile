CREATE TYPE "public"."order_payment_method" AS ENUM('e-money', 'cash-on-delivery');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
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
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "carts_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "carts_uk_user_id" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "categories_uk_image" UNIQUE("image"),
	CONSTRAINT "categories_uk_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "galleries" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"first" text NOT NULL,
	"second" text NOT NULL,
	"third" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "galleries_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "galleries_uk_product_id" UNIQUE("product_id"),
	CONSTRAINT "galleries_uk_first" UNIQUE("first"),
	CONSTRAINT "galleries_uk_second" UNIQUE("second"),
	CONSTRAINT "galleries_uk_third" UNIQUE("third")
);
--> statement-breakpoint
CREATE TABLE "includes" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"item" varchar(128) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "includes_pk_id" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "order_items_pk_id" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"zip" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"payment_method" "order_payment_method" DEFAULT 'e-money' NOT NULL,
	"subtotal" integer NOT NULL,
	"shipping" integer NOT NULL,
	"vat" integer NOT NULL,
	"grand_total" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_pk_id" PRIMARY KEY("id")
);
--> statement-breakpoint
CREATE TABLE "other_products" (
	"other_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "other_products_pk_other_id_product_id" PRIMARY KEY("other_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial NOT NULL,
	"category_id" integer NOT NULL,
	"slug" text NOT NULL,
	"image" text NOT NULL,
	"name" varchar(128) NOT NULL,
	"description" text,
	"features" text NOT NULL,
	"is_new" boolean DEFAULT false NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "products_uk_image" UNIQUE("image"),
	CONSTRAINT "products_uk_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "refresh_tokens_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "refresh_tokens_uk_token" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(128) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_pk_id" PRIMARY KEY("id"),
	CONSTRAINT "users_uk_email" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "includes" ADD CONSTRAINT "includes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_other_id_products_id_fk" FOREIGN KEY ("other_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "other_products" ADD CONSTRAINT "other_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;