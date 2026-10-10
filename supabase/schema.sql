-- Gemma application storage.
-- Run this in the Supabase SQL editor before using the form.
-- The app uploads the CV to the private "resumes" bucket, then inserts one row into "applicants".

create table if not exists public.applicants (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  country text not null,
  discord_username text not null,
  email text not null,
  phone_number text not null,
  cv_path text not null,
  brief_description text not null,
  created_at timestamptz not null default now()
);

alter table public.applicants enable row level security;

revoke all on table public.applicants from anon, authenticated;
grant insert on table public.applicants to anon, authenticated;

drop policy if exists "Applicants can be submitted" on public.applicants;
create policy "Applicants can be submitted"
  on public.applicants
  for insert
  to anon, authenticated
  with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,
  8388608,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Resumes can be uploaded" on storage.objects;
create policy "Resumes can be uploaded"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

drop policy if exists "Uploaded resumes can be removed" on storage.objects;
create policy "Uploaded resumes can be removed"
  on storage.objects
  for delete
  to anon, authenticated
  using (bucket_id = 'resumes');
