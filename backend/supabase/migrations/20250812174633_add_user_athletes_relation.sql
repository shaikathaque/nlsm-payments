create table "public"."user_athletes" (
    "user_id" uuid not null,
    "athlete_id" smallint not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."user_athletes" enable row level security;

CREATE UNIQUE INDEX user_athletes_pkey ON public.user_athletes USING btree (user_id, athlete_id);

alter table "public"."user_athletes" add constraint "user_athletes_pkey" PRIMARY KEY using index "user_athletes_pkey";

alter table "public"."user_athletes" add constraint "user_athletes_athlete_id_fkey" FOREIGN KEY (athlete_id) REFERENCES athletes(id) not valid;

alter table "public"."user_athletes" validate constraint "user_athletes_athlete_id_fkey";

alter table "public"."user_athletes" add constraint "user_athletes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."user_athletes" validate constraint "user_athletes_user_id_fkey";

grant delete on table "public"."user_athletes" to "anon";

grant insert on table "public"."user_athletes" to "anon";

grant references on table "public"."user_athletes" to "anon";

grant select on table "public"."user_athletes" to "anon";

grant trigger on table "public"."user_athletes" to "anon";

grant truncate on table "public"."user_athletes" to "anon";

grant update on table "public"."user_athletes" to "anon";

grant delete on table "public"."user_athletes" to "authenticated";

grant insert on table "public"."user_athletes" to "authenticated";

grant references on table "public"."user_athletes" to "authenticated";

grant select on table "public"."user_athletes" to "authenticated";

grant trigger on table "public"."user_athletes" to "authenticated";

grant truncate on table "public"."user_athletes" to "authenticated";

grant update on table "public"."user_athletes" to "authenticated";

grant delete on table "public"."user_athletes" to "service_role";

grant insert on table "public"."user_athletes" to "service_role";

grant references on table "public"."user_athletes" to "service_role";

grant select on table "public"."user_athletes" to "service_role";

grant trigger on table "public"."user_athletes" to "service_role";

grant truncate on table "public"."user_athletes" to "service_role";

grant update on table "public"."user_athletes" to "service_role";