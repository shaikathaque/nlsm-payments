alter type "public"."branch" rename to "branch__old_version_to_be_dropped";

create type "public"."branch" as enum ('UTTARA_IHSB', 'BASHUNDHARA_SG', '100FT_HGT');

alter table "public"."athletes" alter column branch type "public"."branch" using branch::text::"public"."branch";

alter table "public"."payments" alter column branch type "public"."branch" using branch::text::"public"."branch";

drop type "public"."branch__old_version_to_be_dropped";