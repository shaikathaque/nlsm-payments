alter table "public"."athlete_progress" add column "date" date not null;

alter table "public"."athlete_progress" alter column "athlete_id" set not null;

alter table "public"."athlete_progress" alter column "scores" set not null;