-- ============================================================
-- Migration 002 — Mise à jour user_profiles + trigger auth
-- ============================================================

-- 1. Ajouter les colonnes manquantes
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS full_name       text,
  ADD COLUMN IF NOT EXISTS avatar_url      text,
  ADD COLUMN IF NOT EXISTS type_sport      text,
  ADD COLUMN IF NOT EXISTS rythme          text,
  ADD COLUMN IF NOT EXISTS situation       text,
  ADD COLUMN IF NOT EXISTS accompagnement  text,
  ADD COLUMN IF NOT EXISTS communaute      text,
  ADD COLUMN IF NOT EXISTS crm_categorie   text,
  ADD COLUMN IF NOT EXISTS email_optin     boolean default false;

-- 2. Migrer les données existantes vers les nouvelles colonnes
UPDATE public.user_profiles SET
  type_sport     = sports_interests[1],
  rythme         = niveau,
  situation      = public_cible,
  accompagnement = dynamique
WHERE type_sport IS NULL;

-- 3. Trigger auto-création profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email_optin)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE((NEW.raw_user_meta_data->>'email_optin')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name  = COALESCE(EXCLUDED.full_name, public.user_profiles.full_name),
    email_optin = COALESCE(EXCLUDED.email_optin, public.user_profiles.email_optin),
    updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Backfill full_name pour les utilisateurs existants
UPDATE public.user_profiles p SET full_name = u.raw_user_meta_data->>'full_name'
FROM auth.users u
WHERE u.id = p.id AND p.full_name IS NULL;

-- 5. Vérification
SELECT id, full_name, onboarded, type_sport, situation FROM public.user_profiles;
