CREATE TABLE "public"."user_plans" (
  "id" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "group_id" TEXT NOT NULL,
  "planet" TEXT NOT NULL,
  "plan" TEXT NOT NULL,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_by" TEXT NOT NULL,
  "buildings" TEXT[] DEFAULT '{}',
  "inputs" TEXT[] DEFAULT '{}',
  "outputs" TEXT[] DEFAULT '{}',
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uniq_user_planet" ON "public"."user_plan"("username","planet");

CREATE TABLE "public"."group_plan" (
  "id" TEXT NOT NULL,
  "group_id" TEXT NOT NULL,
  "plan_id" TEXT NOT NULL,
  "planet_id" TEXT NOT NULL,
  "data" JSONB NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "created_by" TEXT NOT NULL,
  "updated_by" TEXT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uniq_group_id_plan_id" ON "public"."group_plan"("group_id", "plan_id");
