-- ============================================================
-- Solimouv' — Schéma Supabase
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Table des profils utilisateurs
create table if not exists public.user_profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  public_cible  text,                    -- profil public cible (famille, jeune, etc.)
  sports_interests text[],              -- sports préférés (multi-select)
  niveau        text,                    -- niveau de pratique
  dynamique     text,                    -- solo / groupe / famille
  onboarded     boolean default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Trigger pour mettre à jour updated_at automatiquement
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on public.user_profiles;
create trigger set_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.user_profiles enable row level security;

-- Policies RLS
drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Créer automatiquement un profil vide à chaque nouvel utilisateur
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Migration : ajout des colonnes niveau et dynamique
-- (à exécuter si la table existe déjà sans ces colonnes)
-- ============================================================
alter table public.user_profiles
  add column if not exists niveau    text,
  add column if not exists dynamique text;
