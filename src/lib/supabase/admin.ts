import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase avec la clé service role — usage serveur uniquement.
 * Bypass toutes les RLS policies → réservé aux routes /admin.
 * Nécessite SUPABASE_SERVICE_ROLE_KEY dans les variables d'environnement.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY manquant. Ajoutez-le dans .env.local et dans Vercel."
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
