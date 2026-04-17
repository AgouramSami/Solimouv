-- ============================================================
-- Migration 004 — Rôles admin + politiques RLS étendues
-- ============================================================

-- 1. Colonne role sur user_profiles
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS role text DEFAULT 'user'
  CHECK (role IN ('user', 'admin'));

-- 2. Attribuer le rôle admin à l'email défini en env
UPDATE public.user_profiles SET role = 'admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'sami.agouram22@gmail.com'
);

-- 3. Fonction helper SECURITY DEFINER (évite la récursion RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT COALESCE(
    (SELECT role = 'admin' FROM public.user_profiles WHERE id = auth.uid()),
    false
  );
$$;

-- 4. user_profiles : admins peuvent lire et modifier tous les profils
DROP POLICY IF EXISTS "Lecture profil personnel" ON public.user_profiles;
CREATE POLICY "Lecture profil"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Mise à jour profil personnel" ON public.user_profiles;
CREATE POLICY "Mise à jour profil"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_admin());

-- 5. activites : admins peuvent tout faire
DROP POLICY IF EXISTS "Lecture publique activités" ON public.activites;
CREATE POLICY "Lecture activités"
  ON public.activites FOR SELECT
  USING (actif = true OR public.is_admin());

CREATE POLICY "Admin CRUD activités"
  ON public.activites FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 6. associations : admins peuvent tout faire
DROP POLICY IF EXISTS "Lecture publique associations" ON public.associations;
CREATE POLICY "Lecture associations"
  ON public.associations FOR SELECT
  USING (actif = true OR public.is_admin());

CREATE POLICY "Admin CRUD associations"
  ON public.associations FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 7. inscriptions : admins peuvent lire toutes les inscriptions
DROP POLICY IF EXISTS "Lecture inscriptions personnelles" ON public.inscriptions;
CREATE POLICY "Lecture inscriptions"
  ON public.inscriptions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

-- 8. Vérification
SELECT u.email, p.role, p.full_name
FROM auth.users u JOIN public.user_profiles p ON p.id = u.id
ORDER BY p.role DESC;
