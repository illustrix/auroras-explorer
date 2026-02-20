CREATE TABLE "public"."user_plans" (
  "id" TEXT NOT NULL,
  "username" TEXT NOT NULL,
  "group_id" TEXT NOT NULL,
  "planet" TEXT NOT NULL,
  "plan" TEXT NOT NULL,
  "created_at" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "created_by" TEXT NOT NULL,
  "inputs" TEXT[] DEFAULT '{}',
  "outputs" TEXT[] DEFAULT '{}',
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "uniq_user_planet" ON "public"."user_plan"("username","planet");
