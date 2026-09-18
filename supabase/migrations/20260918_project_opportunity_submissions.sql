-- New World Kids project-provider intake
-- Server writes only. Do not expose this table directly to public clients.

create table if not exists public.project_opportunity_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  contact_name text not null,
  organization text not null,
  email text not null,
  phone text,
  project_title text not null,
  project_description text not null,
  location text not null,
  timeline text not null,
  skills text not null,
  estimated_hours text not null,
  compensation_type text not null,
  compensation_details text not null,
  youth_count integer not null check (youth_count between 1 and 12),
  adult_supervision text not null,
  safety_considerations text not null,
  accessibility_considerations text,
  participant_requirements text,
  contact_consent boolean not null default false,
  status text not null default 'new' check (status in ('new','reviewing','accepted','declined','archived'))
);

alter table public.project_opportunity_submissions enable row level security;

-- No public SELECT/INSERT/UPDATE/DELETE policies are created intentionally.
-- The Next.js route writes with the server-only service role.
