-- Create athlete table

create table "public"."athletes" (
    "id" smallint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "first_name" character varying not null,
    "last_name" character varying not null,
    "dob" date not null,
    "branch" branch not null,
    "email" character varying,
    "phone" character varying
);


alter table "public"."athletes" enable row level security;

CREATE UNIQUE INDEX athletes_id_key ON public.athletes USING btree (id);

CREATE UNIQUE INDEX athletes_pkey ON public.athletes USING btree (id);

alter table "public"."athletes" add constraint "athletes_pkey" PRIMARY KEY using index "athletes_pkey";

alter table "public"."athletes" add constraint "athletes_id_key" UNIQUE using index "athletes_id_key";

grant delete on table "public"."athletes" to "anon";

grant insert on table "public"."athletes" to "anon";

grant references on table "public"."athletes" to "anon";

grant select on table "public"."athletes" to "anon";

grant trigger on table "public"."athletes" to "anon";

grant truncate on table "public"."athletes" to "anon";

grant update on table "public"."athletes" to "anon";

grant delete on table "public"."athletes" to "authenticated";

grant insert on table "public"."athletes" to "authenticated";

grant references on table "public"."athletes" to "authenticated";

grant select on table "public"."athletes" to "authenticated";

grant trigger on table "public"."athletes" to "authenticated";

grant truncate on table "public"."athletes" to "authenticated";

grant update on table "public"."athletes" to "authenticated";

grant delete on table "public"."athletes" to "service_role";

grant insert on table "public"."athletes" to "service_role";

grant references on table "public"."athletes" to "service_role";

grant select on table "public"."athletes" to "service_role";

grant trigger on table "public"."athletes" to "service_role";

grant truncate on table "public"."athletes" to "service_role";

grant update on table "public"."athletes" to "service_role";


-- Create athlete_progress table

create table "public"."athlete_progress" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "athlete_id" smallint,
    "year" numeric not null,
    "quarter" smallint not null,
    "passing" smallint,
    "dribbling" smallint,
    "shooting" smallint,
    "discipline" smallint,
    "awareness" smallint,
    "attendance" smallint,
    "comments" text
);


alter table "public"."athlete_progress" enable row level security;

CREATE UNIQUE INDEX athlete_progress_pkey ON public.athlete_progress USING btree (id);

alter table "public"."athlete_progress" add constraint "athlete_progress_pkey" PRIMARY KEY using index "athlete_progress_pkey";

alter table "public"."athlete_progress" add constraint "athlete_progress_athlete_id_fkey" FOREIGN KEY (athlete_id) REFERENCES athletes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."athlete_progress" validate constraint "athlete_progress_athlete_id_fkey";

grant delete on table "public"."athlete_progress" to "anon";

grant insert on table "public"."athlete_progress" to "anon";

grant references on table "public"."athlete_progress" to "anon";

grant select on table "public"."athlete_progress" to "anon";

grant trigger on table "public"."athlete_progress" to "anon";

grant truncate on table "public"."athlete_progress" to "anon";

grant update on table "public"."athlete_progress" to "anon";

grant delete on table "public"."athlete_progress" to "authenticated";

grant insert on table "public"."athlete_progress" to "authenticated";

grant references on table "public"."athlete_progress" to "authenticated";

grant select on table "public"."athlete_progress" to "authenticated";

grant trigger on table "public"."athlete_progress" to "authenticated";

grant truncate on table "public"."athlete_progress" to "authenticated";

grant update on table "public"."athlete_progress" to "authenticated";

grant delete on table "public"."athlete_progress" to "service_role";

grant insert on table "public"."athlete_progress" to "service_role";

grant references on table "public"."athlete_progress" to "service_role";

grant select on table "public"."athlete_progress" to "service_role";

grant trigger on table "public"."athlete_progress" to "service_role";

grant truncate on table "public"."athlete_progress" to "service_role";

grant update on table "public"."athlete_progress" to "service_role";