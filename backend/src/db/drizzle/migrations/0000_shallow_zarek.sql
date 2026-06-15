CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(125),
	"email" varchar(256),
	"password" varchar(256)
);
