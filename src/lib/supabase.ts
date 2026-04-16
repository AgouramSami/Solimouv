import { createClient } from "@supabase/supabase-js";

// DCX : créer le projet sur supabase.com et renseigner ces variables dans .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types de base — DCX : à étendre selon les briques choisies
export type Atelier = {
  id: number;
  titre: string;
  description: string;
  heure_debut: string;
  heure_fin: string;
  lieu: string;
  association: string;
  public_cible: string;
  capacite: number;
  places_restantes: number;
  tag: string;
  created_at: string;
};

export type Association = {
  id: number;
  nom: string;
  description: string;
  site_web: string | null;
  instagram: string | null;
  logo_url: string | null;
  tags: string[];
  created_at: string;
};

export type Contact = {
  id: number;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  rgpd_consent: boolean;
  created_at: string;
};
