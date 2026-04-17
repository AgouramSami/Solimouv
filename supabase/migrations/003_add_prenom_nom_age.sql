-- Migration 003 — Séparation prénom/nom + âge

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS prenom text,
  ADD COLUMN IF NOT EXISTS nom    text,
  ADD COLUMN IF NOT EXISTS age    int;

-- Backfill depuis full_name existant (premier mot = prénom, reste = nom)
UPDATE public.user_profiles
SET
  prenom = split_part(trim(full_name), ' ', 1),
  nom    = trim(substr(trim(full_name), length(split_part(trim(full_name), ' ', 1)) + 2))
WHERE full_name IS NOT NULL AND prenom IS NULL;

-- Mettre à jour le trigger pour stocker prenom/nom/age séparément
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_full_name text;
BEGIN
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
  INSERT INTO public.user_profiles (id, full_name, prenom, nom, age, email_optin)
  VALUES (
    NEW.id,
    v_full_name,
    COALESCE(NEW.raw_user_meta_data->>'prenom', split_part(trim(v_full_name), ' ', 1), ''),
    COALESCE(NEW.raw_user_meta_data->>'nom', trim(substr(trim(v_full_name), length(split_part(trim(v_full_name), ' ', 1)) + 2)), ''),
    NULLIF(NEW.raw_user_meta_data->>'age', '')::int,
    COALESCE((NEW.raw_user_meta_data->>'email_optin')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name   = COALESCE(EXCLUDED.full_name, public.user_profiles.full_name),
    prenom      = COALESCE(EXCLUDED.prenom, public.user_profiles.prenom),
    nom         = COALESCE(EXCLUDED.nom, public.user_profiles.nom),
    age         = COALESCE(EXCLUDED.age, public.user_profiles.age),
    email_optin = COALESCE(EXCLUDED.email_optin, public.user_profiles.email_optin),
    updated_at  = now();
  RETURN NEW;
END;
$$;

-- Vérification
SELECT email, p.prenom, p.nom, p.age, p.full_name
FROM auth.users u JOIN public.user_profiles p ON p.id = u.id;
