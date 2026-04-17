-- ============================================================
-- SoliMouv' — Schéma complet v1
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. USER PROFILES (onboarding + CRM)
-- ============================================================
create table if not exists public.user_profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  avatar_url      text,
  -- Onboarding
  type_sport      text,                        -- collectif | arts_martiaux | danse | plein_air | bien_etre
  rythme          text,                        -- calme | intermediaire | avance
  situation       text,                        -- etudiant | recherche | activite | famille
  accompagnement  text,                        -- solo | groupe | famille
  communaute      text,                        -- lgbtqia | refugie | handicap | senior | aucun
  -- CRM
  crm_categorie   text,                        -- LGBTQIA+ | Réfugié·e | Handicap | Senior | Jeune | En insertion | Actif | Famille | Grand public
  email_optin     boolean default false,
  onboarded       boolean default false,
  -- Compatibilité ancienne version
  public_cible    text generated always as (situation) stored,
  sports_interests text[] generated always as (array[type_sport]) stored,
  niveau          text generated always as (rythme) stored,
  dynamique       text generated always as (accompagnement) stored,
  --
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- RLS
alter table public.user_profiles enable row level security;

create policy "Lecture profil personnel"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Mise à jour profil personnel"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Création profil personnel"
  on public.user_profiles for insert
  with check (auth.uid() = id);

-- Trigger auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger trg_user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.set_updated_at();

-- Auto-create profil à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.user_profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- 2. ASSOCIATIONS PARTENAIRES
-- ============================================================
create table if not exists public.associations (
  id          uuid primary key default uuid_generate_v4(),
  nom         text not null,
  description text,
  logo_url    text,
  site_url    text,
  tags        text[],                          -- ex: ['handicap', 'jeunesse']
  actif       boolean default true,
  ordre       int default 0,
  created_at  timestamptz default now()
);

alter table public.associations enable row level security;

create policy "Lecture publique associations"
  on public.associations for select
  using (actif = true);


-- ============================================================
-- 3. PROGRAMME / ACTIVITÉS
-- ============================================================
create table if not exists public.activites (
  id              uuid primary key default uuid_generate_v4(),
  titre           text not null,
  description     text,
  sport           text,                        -- Badminton | Tennis | Basket…
  niveau          text,                        -- calme | intermediaire | avance
  public_cible    text[],                      -- ['handicap','senior',…]
  association_id  uuid references public.associations(id),
  lieu            text,                        -- Salle A | Salle B | Terrain ext.
  heure_debut     time not null,
  heure_fin       time not null,
  date_activite   date not null,
  capacite_max    int default 20,
  inscriptions    int default 0,
  actif           boolean default true,
  created_at      timestamptz default now()
);

alter table public.activites enable row level security;

create policy "Lecture publique activités"
  on public.activites for select
  using (actif = true);


-- ============================================================
-- 4. INSCRIPTIONS AUX ACTIVITÉS
-- ============================================================
create table if not exists public.inscriptions (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  activite_id  uuid not null references public.activites(id) on delete cascade,
  statut       text default 'confirme',       -- confirme | annule | liste_attente
  created_at   timestamptz default now(),
  unique (user_id, activite_id)
);

alter table public.inscriptions enable row level security;

create policy "Lecture inscriptions personnelles"
  on public.inscriptions for select
  using (auth.uid() = user_id);

create policy "Création inscription personnelle"
  on public.inscriptions for insert
  with check (auth.uid() = user_id);

create policy "Annulation inscription personnelle"
  on public.inscriptions for update
  using (auth.uid() = user_id);

-- Compteur inscriptions automatique
create or replace function public.update_inscriptions_count()
returns trigger language plpgsql security definer as $$
begin
  if TG_OP = 'INSERT' and NEW.statut = 'confirme' then
    update public.activites set inscriptions = inscriptions + 1 where id = NEW.activite_id;
  elsif TG_OP = 'UPDATE' then
    if OLD.statut = 'confirme' and NEW.statut = 'annule' then
      update public.activites set inscriptions = greatest(0, inscriptions - 1) where id = NEW.activite_id;
    elsif OLD.statut = 'annule' and NEW.statut = 'confirme' then
      update public.activites set inscriptions = inscriptions + 1 where id = NEW.activite_id;
    end if;
  elsif TG_OP = 'DELETE' and OLD.statut = 'confirme' then
    update public.activites set inscriptions = greatest(0, inscriptions - 1) where id = OLD.activite_id;
  end if;
  return coalesce(NEW, OLD);
end;
$$;

create trigger trg_inscriptions_count
  after insert or update or delete on public.inscriptions
  for each row execute function public.update_inscriptions_count();


-- ============================================================
-- 5. BADGES (gamification)
-- ============================================================
create table if not exists public.badges (
  id           uuid primary key default uuid_generate_v4(),
  code         text unique not null,           -- ex: 'first_activity', 'sport_master'
  nom          text not null,
  description  text,
  icone        text,                           -- emoji ou URL
  couleur      text default '#474194',
  condition    text,                           -- description lisible de la condition
  actif        boolean default true
);

alter table public.badges enable row level security;

create policy "Lecture publique badges"
  on public.badges for select using (true);

-- Badges gagnés par utilisateur
create table if not exists public.user_badges (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  badge_id    uuid not null references public.badges(id) on delete cascade,
  obtenu_le   timestamptz default now(),
  unique (user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "Lecture badges personnels"
  on public.user_badges for select
  using (auth.uid() = user_id);

create policy "Ajout badge personnel"
  on public.user_badges for insert
  with check (auth.uid() = user_id);


-- ============================================================
-- 6. DONNÉES DE DÉMO — Badges initiaux
-- ============================================================
insert into public.badges (code, nom, description, icone, couleur, condition) values
  ('onboarded',       'Bienvenue !',        'Profil complété',                  '🎉', '#474194', 'Terminer l''onboarding'),
  ('first_activity',  'Premier pas',        'Inscrit à une première activité',  '👟', '#2E7E33', 'S''inscrire à 1 activité'),
  ('sport_explorer',  'Explorateur',        'Inscrit à 3 sports différents',    '🧭', '#1F74BB', 'S''inscrire à 3 activités différentes'),
  ('festival_fan',    'Fan du festival',    'Présent toute la journée',         '🏟️', '#D81D61', 'Participer à 5 activités'),
  ('inclusive',       'Esprit inclusif',    'Participé avec 3 publics différents','🤝', '#474194', 'Badge spécial inclusivité')
on conflict (code) do nothing;
