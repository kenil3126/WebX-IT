-- Run this once in your Supabase project: SQL Editor -> New Query -> paste -> Run

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'replied'))
);

-- Row Level Security: locks the table down by default, then opens two narrow doors.
alter table contact_submissions enable row level security;

-- Door 1: anyone (including the public website, not logged in) can INSERT a new
-- submission — this is what lets the Contact form work for visitors.
create policy "Public can submit contact form"
  on contact_submissions for insert
  to anon
  with check (true);

-- Door 2: only logged-in users (i.e. you, via the admin login) can READ or
-- UPDATE submissions — visitors can never see or edit other people's messages.
create policy "Authenticated users can view submissions"
  on contact_submissions for select
  to authenticated
  using (true);

create policy "Authenticated users can update submissions"
  on contact_submissions for update
  to authenticated
  using (true);
