-- Backend for the process scanner pages (process-scan_1_mistral.html here, and
-- process-scan_2_mistral.html in the AIprocesses repository). One shared table holds
-- the saved rankings of both sites, separated by the site column.
--
-- Setup, once:
--   1. Create a free project at supabase.com.
--   2. Run this file in the project's SQL Editor.
--   3. Copy the project URL and the anon (public) key from Settings > API Keys into the
--      SUPABASE constant near the bottom of each scanner page.
--
-- The anon key ships in the page source, so these policies make the rankings readable
-- and writable by anyone who visits the pages. That is the intended trade-off for a
-- public tool with no login. Do not store anything sensitive in it; the model API keys
-- never touch this table.

create table if not exists public.processes (
  id         bigint not null,             -- Date.now() of the scan, assigned by the page
  site       text   not null,             -- 'ppdeleeuw' or 'aiprocesses'
  name       text,
  data       jsonb  not null,             -- the full process object: scores, layer, schedule, risk, eval, cost
  updated_at timestamptz not null default now(),
  primary key (site, id)
);

alter table public.processes enable row level security;

create policy "public read"   on public.processes for select to anon using (true);
create policy "public insert" on public.processes for insert to anon with check (true);
create policy "public update" on public.processes for update to anon using (true) with check (true);
create policy "public delete" on public.processes for delete to anon using (true);
