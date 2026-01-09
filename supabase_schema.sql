-- Create the posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  media_url text, -- URL to image/video in storage
  media_type text check (media_type in ('image', 'video', 'code', 'none')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.posts enable row level security;

-- Create policies (modify as needed for real auth, here simplistic for demo)
-- Allow read access to everyone
create policy "Public posts are viewable by everyone" on public.posts
  for select using (true);

-- Allow insert/update/delete to authenticated users only (or anyone if you want to test without auth first)
-- For now, we'll allow anon insert for testing if you don't setup Auth fully yet, but BETTER to use anon key with policy
create policy "Allow anon insert for testing" on public.posts
  for insert with check (true); 
  
-- Create Storage Bucket
insert into storage.buckets (id, name, public) 
values ('blog-media', 'blog-media', true);

-- Storage Policies
create policy "Public Access" on storage.objects for select
using ( bucket_id = 'blog-media' );

create policy "Anon Upload" on storage.objects for insert
with check ( bucket_id = 'blog-media' );
