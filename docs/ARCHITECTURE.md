# Architecture technique — Solimouv' PWA

## Stack

| Couche | Outil | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Styling | Tailwind CSS | 3 |
| Animations | Framer Motion | 12 |
| PWA | @ducanh2912/next-pwa | 10 |
| Base de données + Auth | Supabase | 2 |
| Hosting | Vercel | — |
| Automation | Make.com | — |
| Icônes | Lucide React | 1 |

---

## Structure des dossiers

```
solimouv-pwa/
├── src/
│   ├── app/                    # Pages et routes (Next.js App Router)
│   │   ├── (public)/           # Routes sans authentification
│   │   │   ├── page.tsx        # Landing page
│   │   │   ├── cgu/            # Conditions générales d'utilisation
│   │   │   └── confidentialite/ # Politique de confidentialité
│   │   ├── (pwa)/              # Routes de l'application PWA
│   │   │   ├── auth/
│   │   │   │   ├── login/      # Page de connexion
│   │   │   │   └── callback/   # Échange du code OAuth → session
│   │   │   ├── onboarding/     # Questionnaire d'accueil (5 étapes)
│   │   │   ├── admin/          # Dashboard admin (rôle admin requis)
│   │   │   │   ├── programme/  # CRUD activités
│   │   │   │   ├── partenariats/ # CRUD associations
│   │   │   │   └── utilisateurs/ # Gestion des utilisateurs
│   │   │   └── (app)/          # Pages principales (authentification requise)
│   │   │       ├── home/       # Tableau de bord
│   │   │       ├── programme/  # Programme des activités
│   │   │       ├── associations/ # Associations partenaires
│   │   │       ├── quiz/       # Quiz / badges
│   │   │       ├── a-propos/   # À propos du festival
│   │   │       ├── contact/    # Formulaire de contact
│   │   │       ├── compte/     # Profil utilisateur
│   │   │       └── parametres/ # Paramètres
│   │   ├── layout.tsx          # Layout racine (metadata, fonts, Schema.org)
│   │   ├── robots.ts           # Génération robots.txt
│   │   └── sitemap.ts          # Génération sitemap.xml
│   ├── components/
│   │   ├── AppTopNav.tsx       # Barre de navigation supérieure
│   │   ├── AppBottomNav.tsx    # Navigation inférieure mobile
│   │   ├── InstallPwaButton.tsx # Prompt installation PWA
│   │   ├── SignOutButton.tsx   # Déconnexion
│   │   ├── UserMenu.tsx        # Menu utilisateur
│   │   ├── icons/              # Composants icônes
│   │   ├── quiz/               # Composants quiz/badges
│   │   ├── map/                # Composants carte
│   │   └── shared/             # Composants UI partagés
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts       # Client navigateur (@supabase/ssr)
│   │   │   ├── server.ts       # Client serveur (Server Components)
│   │   │   └── admin.ts        # Client admin (service role, serveur uniquement)
│   │   ├── supabase.ts         # Types TypeScript (Atelier, Association, Contact)
│   │   └── utils.ts            # Utilitaire cn() (clsx + tailwind-merge)
│   └── middleware.ts           # Protection des routes + gestion session
├── supabase/
│   └── migrations/             # Migrations SQL versionnées
├── public/
│   ├── manifest.json           # Configuration PWA
│   ├── icons/                  # Icônes PWA (192px, 512px)
│   └── figma-assets/           # Assets exportés depuis Figma
├── next.config.ts              # Config Next.js + PWA + WebAssembly
└── tailwind.config.ts          # Design system (couleurs, typographie)
```

---

## Schéma de base de données

### `user_profiles`
Profils utilisateurs, créés automatiquement à l'inscription via trigger Supabase.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Référence `auth.users.id` |
| `prenom` | text | Prénom |
| `nom` | text | Nom de famille |
| `full_name` | text | Nom complet |
| `age` | integer | Âge |
| `avatar_url` | text | URL de l'avatar |
| `role` | text | `user` ou `admin` |
| `onboarded` | boolean | Questionnaire complété |
| `type_sport` | text | Pratique sportive (onboarding) |
| `rythme` | text | Rythme de pratique (onboarding) |
| `situation` | text | Situation (onboarding) |
| `accompagnement` | text | Type d'accompagnement (onboarding) |
| `communaute` | text | Intérêt communauté (onboarding) |
| `crm_categorie` | text | Catégorie CRM Make |
| `email_optin` | boolean | Consentement email marketing |
| `created_at` | timestamptz | Date de création |
| `updated_at` | timestamptz | Dernière mise à jour |

### `associations`
Associations partenaires du festival.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Identifiant |
| `nom` | text | Nom de l'association |
| `description` | text | Description |
| `logo_url` | text | URL du logo |
| `tags` | text[] | Tags (ex. handisport, jeunesse) |
| `ordre` | integer | Ordre d'affichage |
| `active` | boolean | Visibilité publique |
| `created_at` | timestamptz | Date de création |

### `activites`
Ateliers et activités sportives du programme.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Identifiant |
| `titre` | text | Titre de l'activité |
| `description` | text | Description |
| `date_debut` | timestamptz | Début |
| `date_fin` | timestamptz | Fin |
| `lieu` | text | Lieu |
| `capacite` | integer | Capacité maximale |
| `inscrits` | integer | Nombre d'inscrits (calculé auto) |
| `public_cible` | text | Public visé |
| `association_id` | uuid (FK) | Association responsable |
| `active` | boolean | Activité visible |
| `created_at` | timestamptz | Date de création |

### `inscriptions`
Inscriptions des utilisateurs aux activités.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Identifiant |
| `user_id` | uuid (FK) | Référence `user_profiles.id` |
| `activite_id` | uuid (FK) | Référence `activites.id` |
| `statut` | text | `confirme`, `annule`, `liste_attente` |
| `created_at` | timestamptz | Date d'inscription |

### `badges`
Badges de gamification.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Identifiant |
| `nom` | text | Nom du badge |
| `description` | text | Description |
| `icon_url` | text | URL de l'icône |
| `condition` | text | Condition d'obtention |

Badges initiaux : `onboarded`, `first_activity`, `sport_explorer`, `festival_fan`, `inclusive`.

### `user_badges`
Badges obtenus par chaque utilisateur.

| Colonne | Type | Description |
|---|---|---|
| `id` | uuid (PK) | Identifiant |
| `user_id` | uuid (FK) | Référence `user_profiles.id` |
| `badge_id` | uuid (FK) | Référence `badges.id` |
| `earned_at` | timestamptz | Date d'obtention |

---

## Row Level Security (RLS)

| Table | Public (non connecté) | Utilisateur connecté | Admin |
|---|---|---|---|
| `user_profiles` | — | Lecture/modif de son propre profil | Accès complet |
| `associations` | Lecture (actives) | Lecture | CRUD complet |
| `activites` | Lecture (actives) | Lecture | CRUD complet |
| `inscriptions` | — | Lecture/création des siennes | CRUD complet |
| `badges` | Lecture | Lecture | CRUD complet |
| `user_badges` | — | Lecture des siens | CRUD complet |

La fonction `is_admin()` vérifie `role = 'admin'` dans `user_profiles`.

---

## Routing et middleware

### Groupes de routes

| Groupe | Path | Authentification |
|---|---|---|
| `(public)` | `/`, `/cgu`, `/confidentialite` | Non requise |
| `(pwa)/auth` | `/auth/login`, `/auth/callback` | Non requise |
| `(pwa)/onboarding` | `/onboarding` | Requise |
| `(pwa)/(app)` | `/home`, `/programme`, etc. | Requise |
| `(pwa)/admin` | `/admin/**` | Requise + rôle admin |

### Middleware (`src/middleware.ts`)

Le middleware intercepte toutes les requêtes et :
1. Gère l'échange de code OAuth → session Supabase
2. Redirige les utilisateurs non authentifiés vers `/auth/login`
3. Redirige les utilisateurs connectés depuis `/auth/login` vers `/home`
4. Détecte le lancement PWA (`sec-fetch-site: none`) et redirige vers `/home` ou `/auth/login`
5. Maintient les cookies de session Supabase

---

## API Routes

### `GET /auth/callback`
**Fichier** : `src/app/(pwa)/auth/callback/route.ts`

Échange le code OAuth Supabase contre une session utilisateur, puis redirige :
- Vers `/onboarding` si l'utilisateur n'a pas encore complété le questionnaire
- Vers le paramètre `next` (défaut `/home`) sinon

---

## Intégrations Make.com

### Webhooks entrants (depuis la PWA vers Make)

Tous les appels utilisent `NEXT_PUBLIC_MAKE_WEBHOOK_URL`.

| Point d'envoi | Événement | Données envoyées |
|---|---|---|
| `onboarding/page.tsx` | Questionnaire complété | prénom, type_sport, rythme, situation, accompagnement, communaute, email, email_optin |
| `auth/login/page.tsx` | Création de compte | email, prénom (si renseigné) |
| `contact/page.tsx` | Formulaire contact | nom, email, message, sujet |

### Scénarios recommandés

```
Onboarding complété
└── Webhook reçu
    ├── Créer/mettre à jour contact CRM
    ├── Ajouter à liste email segmentée (selon type_sport)
    └── Envoyer email de bienvenue personnalisé

Formulaire contact
└── Webhook reçu
    ├── Ajouter ligne Google Sheets (suivi)
    └── Envoyer email de confirmation auto (Gmail)

Nouvelle inscription
└── Webhook reçu
    └── Envoyer confirmation d'inscription (email)
```

---

## PWA

### Configuration (`public/manifest.json`)

```json
{
  "name": "Solimouv'",
  "start_url": "/home",
  "display": "standalone",
  "theme_color": "#474194",
  "background_color": "#FFFFFF",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192" },
    { "src": "/icons/icon-512.png", "sizes": "512x512" }
  ]
}
```

### Service Worker

Géré par `@ducanh2912/next-pwa` :
- Désactivé en développement (`NODE_ENV === 'development'`)
- Cache agressif sur la navigation front-end
- Rechargement automatique au retour en ligne

---

## Design system

Défini dans `tailwind.config.ts` :

| Token | Valeur | Usage |
|---|---|---|
| `brand.primary` | `#D81D61` | Rose — CTAs principaux |
| `brand.secondary` | `#474194` | Violet — navbar, états sélectionnés |
| `brand.blue` | `#1F74BB` | Bleu — tags, badges info |
| `brand.red` | `#C11720` | Rouge — alertes, tags Senior |
| `brand.green` | `#2E7E33` | Vert — succès, tags Débutant |
| `brand.dark` | `#050505` | Noir — textes, boutons primaires |
| `brand.light` | `#FFFFFF` | Blanc — fonds |

Typographies (Fontshare) :
- **Titres** : Cabinet Grotesk (`var(--font-heading)`)
- **Corps** : Author (`var(--font-body)`)

---

## SEO

Configuré dans `src/app/layout.tsx` :
- Balises `<meta>` Open Graph et Twitter Card
- Schema.org `Event` + `Organization` (JSON-LD)
- `sitemap.xml` généré automatiquement (`src/app/sitemap.ts`)
- `robots.txt` généré automatiquement (`src/app/robots.ts`)

---

## WebAssembly / Rust (optionnel)

Le projet est configuré pour accepter du code Rust compilé en WASM :

```ts
// next.config.ts
webpack(config) {
  config.experiments = { asyncWebAssembly: true };
}
```

Pour compiler un module Rust :
```bash
cd rust/
wasm-pack build --target web
```

Puis importer dans un composant :
```ts
const { ma_fonction } = await import("../rust/pkg");
```
