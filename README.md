# Solimouv' — PWA Festival du Sport Inclusif

> Progressive Web App de communication et de pilotage pour le festival [Solimouv'](https://www.unispourlesport.paris/solimouv-une-premiere-edition-qui-a-fait-bouger-les-lignes-du-sport-inclusif/) organisé par [Up Sport!](https://www.unispourlesport.paris/) à Paris.

---

##Lien : 

## Sommaire

- [Stack technique](#stack-technique)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Architecture](#architecture)
- [Base de données](#base-de-données)
- [API & Routes](#api--routes)
- [Automatisations Make](#automatisations-make)
- [PWA](#pwa)
- [Déploiement](#déploiement)
- [Équipe & responsabilités](#équipe--responsabilités)
- [Documentation complémentaire](#documentation-complémentaire)

---

## Stack technique


| Couche                 | Outil                 | Version |
| ---------------------- | --------------------- | ------- |
| Framework              | Next.js (App Router)  | 15      |
| Langage                | TypeScript            | 5       |
| Styling                | Tailwind CSS          | 3       |
| Animations             | Framer Motion         | 12      |
| PWA                    | @ducanh2912/next-pwa  | 10      |
| Base de données + Auth | Supabase (PostgreSQL) | 2       |
| Hosting                | Vercel                | —       |
| Automation             | Make.com              | —       |
| Icônes                 | Lucide React          | 1       |


---

## Démarrage rapide

### Prérequis

- Node.js ≥ 18
- npm ≥ 9
- Compte Supabase (projet créé)
- Compte Make.com (optionnel pour les automations)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/AgouramSami/Solimouv.git
cd Solimouv/solimouv-pwa

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# → Éditer .env.local avec vos clés (voir section suivante)

# 4. Appliquer le schéma Supabase
npm install -g supabase
supabase link --project-ref <PROJECT_REF>
supabase db push

# 5. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

```bash
npm run dev      # Serveur de développement (http://localhost:3000)
npm run build    # Build de production
npm run start    # Serveur de production local
npm run lint     # Linter ESLint
```

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine du projet. **Ne jamais committer ce fichier** (inclus dans `.gitignore`).

### Fichier `.env.local.example`

```env
# ── Supabase ─────────────────────────────────────────────────────────────────
# Dashboard Supabase → Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clé service role — SERVEUR UNIQUEMENT, ne jamais exposer côté client
# Dashboard Supabase → Project Settings → API → service_role
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ── Site ─────────────────────────────────────────────────────────────────────
# URL de production (sans slash final)
NEXT_PUBLIC_SITE_URL=https://solimouv-liart.vercel.app

# ── Make.com ─────────────────────────────────────────────────────────────────
# Make → Create scenario → Webhooks → Custom Webhook → Copy URL
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/xxxxxxxxxxxx
```

### Où trouver chaque valeur


| Variable                               | Emplacement                                                     |
| -------------------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase Dashboard → Project Settings → API → Project URL       |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Dashboard → Project Settings → API → `anon` public     |
| `SUPABASE_SERVICE_ROLE_KEY`            | Supabase Dashboard → Project Settings → API → `service_role` ⚠️ |
| `NEXT_PUBLIC_SITE_URL`                 | URL Vercel de production (disponible après premier déploiement) |
| `NEXT_PUBLIC_MAKE_WEBHOOK_URL`         | Make.com → Scénario → Module Webhook → URL générée              |


> ⚠️ **Sécurité** : `SUPABASE_SERVICE_ROLE_KEY` bypass les règles RLS. Elle ne doit jamais apparaître dans du code client. Elle est utilisée uniquement dans `src/lib/supabase/admin.ts` (Server Components).

### Configuration Vercel (production)

Dans Vercel → Settings → Environment Variables, ajouter les 5 variables ci-dessus avec le scope `Production`. Ajouter également `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` en scope `Preview` pour les déploiements de branches.

---

## Architecture

### Structure des dossiers

```
solimouv-pwa/
├── src/
│   ├── app/
│   │   ├── (public)/               # Routes publiques (pas d'auth requise)
│   │   │   ├── page.tsx            # → redirige vers /home ou /auth/login
│   │   │   ├── cgu/                # Conditions générales
│   │   │   └── confidentialite/    # Politique de confidentialité
│   │   ├── (pwa)/
│   │   │   ├── auth/
│   │   │   │   ├── login/          # Page de connexion (magic link + OAuth)
│   │   │   │   └── callback/       # Échange code OAuth → session Supabase
│   │   │   ├── onboarding/         # Questionnaire 5 étapes (premier login)
│   │   │   ├── admin/              # Dashboard admin (rôle admin requis)
│   │   │   │   ├── programme/      # CRUD activités
│   │   │   │   ├── partenariats/   # CRUD associations
│   │   │   │   └── utilisateurs/   # Gestion utilisateurs
│   │   │   └── (app)/              # Pages app (auth requise)
│   │   │       ├── home/           # Tableau de bord + countdown festival
│   │   │       ├── programme/      # Programme interactif des activités
│   │   │       ├── associations/   # Associations partenaires
│   │   │       ├── quiz/           # Quiz + badges gamification
│   │   │       ├── a-propos/       # À propos Up Sport! + Solimouv'
│   │   │       ├── contact/        # Formulaire de contact
│   │   │       ├── compte/         # Profil utilisateur
│   │   │       └── parametres/     # Paramètres de l'app
│   │   ├── layout.tsx              # Layout racine (metadata, fonts, Schema.org)
│   │   ├── sitemap.ts              # Génération sitemap.xml
│   │   └── robots.ts               # Génération robots.txt
│   ├── components/
│   │   ├── AppTopNav.tsx           # Navbar desktop (labels uniquement)
│   │   ├── AppBottomNav.tsx        # Navbar mobile bottom (icônes + labels)
│   │   ├── InstallPwaButton.tsx    # Bouton install PWA (détection iOS/Android)
│   │   ├── SignOutButton.tsx       # Bouton déconnexion
│   │   └── UserMenu.tsx            # Menu utilisateur
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           # Client navigateur (@supabase/ssr)
│   │   │   ├── server.ts           # Client Server Components
│   │   │   └── admin.ts            # Client service role (serveur uniquement)
│   │   └── utils.ts                # Utilitaire cn() (clsx + tailwind-merge)
│   └── middleware.ts               # Protection routes + session
├── supabase/
│   └── migrations/                 # Migrations SQL versionnées (appliquer dans l'ordre)
├── public/
│   ├── manifest.json               # Configuration PWA
│   ├── icons/                      # Icônes PWA 192px + 512px
│   └── figma-assets/               # Assets exportés depuis Figma
├── docs/
│   ├── ARCHITECTURE.md             # Documentation architecture détaillée
│   ├── DEPLOIEMENT.md              # Guide déploiement complet
│   └── RGPD.md                     # Conformité RGPD
├── next.config.ts                  # Config Next.js + PWA
└── tailwind.config.ts              # Design system (tokens couleurs + typo)
```

### Middleware de protection des routes

Le fichier `src/middleware.ts` intercepte toutes les requêtes :


| Cas                      | Comportement                                      |
| ------------------------ | ------------------------------------------------- |
| `/?code=…`               | Redirige vers `/auth/callback` (OAuth Supabase)   |
| Route app + non connecté | Redirige vers `/auth/login?next=<path>`           |
| `/auth/login` + connecté | Redirige vers `/home`                             |
| `/`                      | Redirige vers `/home` (connecté) ou `/auth/login` |


---

## Base de données

Schéma PostgreSQL géré via Supabase. Migrations dans `supabase/migrations/`.

### Tables principales

#### `user_profiles`

Profils utilisateurs, alimentés automatiquement via trigger sur `auth.users`.


| Colonne                               | Type      | Description            |
| ------------------------------------- | --------- | ---------------------- |
| `id`                                  | uuid (PK) | = `auth.users.id`      |
| `prenom` / `nom`                      | text      | Identité               |
| `role`                                | text      | `user` ou `admin`      |
| `onboarded`                           | boolean   | Onboarding complété    |
| `type_sport` / `rythme` / `situation` | text      | Données onboarding     |
| `email_optin`                         | boolean   | Consentement marketing |
| `crm_categorie`                       | text      | Segment CRM Make       |


#### `activites`

Ateliers du programme festival.


| Colonne                   | Type        | Description             |
| ------------------------- | ----------- | ----------------------- |
| `titre`                   | text        | Nom de l'atelier        |
| `date_debut` / `date_fin` | timestamptz | Créneau                 |
| `lieu`                    | text        | Salle / zone            |
| `capacite` / `inscrits`   | integer     | Gestion des places      |
| `association_id`          | uuid (FK)   | Association responsable |
| `actif`                   | boolean     | Visible publiquement    |


#### `inscriptions`

Inscriptions utilisateur ↔ activité.


| Colonne       | Type      | Description                             |
| ------------- | --------- | --------------------------------------- |
| `user_id`     | uuid (FK) | Utilisateur                             |
| `activite_id` | uuid (FK) | Activité                                |
| `statut`      | text      | `confirme` / `annule` / `liste_attente` |


#### `associations`

Associations partenaires du festival.

#### `badges` + `user_badges`

Système de gamification (badges débloqués par actions).

### Row Level Security (RLS)


| Table           | Non connecté      | Utilisateur           | Admin         |
| --------------- | ----------------- | --------------------- | ------------- |
| `user_profiles` | —                 | Son profil uniquement | Accès complet |
| `associations`  | Lecture (actives) | Lecture               | CRUD          |
| `activites`     | Lecture (actives) | Lecture               | CRUD          |
| `inscriptions`  | —                 | Ses inscriptions      | CRUD          |
| `badges`        | Lecture           | Lecture               | CRUD          |


> La fonction `is_admin()` vérifie `role = 'admin'` dans `user_profiles`.

### Définir un compte admin

```sql
-- Exécuter dans l'éditeur SQL Supabase
UPDATE user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'votre@email.com'
);
```

---

## API & Routes

### `GET /auth/callback`

**Fichier** : `src/app/(pwa)/auth/callback/route.ts`

Reçoit le code OAuth Supabase, échange contre une session, puis redirige :

- `/onboarding` si `onboarded = false`
- `?next=<path>` ou `/home` sinon

### `GET /sitemap.xml`

Généré automatiquement par `src/app/sitemap.ts` — inclut toutes les routes publiques avec priorités SEO.

### `GET /robots.txt`

Généré par `src/app/robots.ts` — autorise tous les crawlers sur les routes publiques.

---

## Automatisations Make

### Webhooks sortants (PWA → Make)

La PWA envoie des événements à Make via `NEXT_PUBLIC_MAKE_WEBHOOK_URL`.


| Événement           | Fichier source        | Données envoyées                                                                                      |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------- |
| Onboarding complété | `onboarding/page.tsx` | `prenom`, `type_sport`, `rythme`, `situation`, `accompagnement`, `communaute`, `email`, `email_optin` |
| Compte créé         | `auth/login/page.tsx` | `email`, `prenom`                                                                                     |
| Formulaire contact  | `contact/page.tsx`    | `nom`, `email`, `sujet`, `message`                                                                    |


### Scénarios recommandés

**Scénario 1 — Onboarding CRM**

```
Déclencheur : Webhook POST
├── Router selon email_optin
│   ├── [optin = true]  → Créer contact CRM + ajouter liste segmentée (type_sport)
│   │                   → Envoyer email de bienvenue personnalisé (Gmail)
│   └── [optin = false] → Créer contact CRM sans liste marketing
└── Mettre à jour crm_categorie dans Supabase (HTTP module)
```

**Scénario 2 — Formulaire Contact**

```
Déclencheur : Webhook POST
├── Ajouter ligne Google Sheets (suivi des demandes)
└── Envoyer email de confirmation automatique (Gmail)
```

**Scénario 3 — Nouveau compte**

```
Déclencheur : Webhook POST
└── Ajouter à liste CRM "Inscrits Solimouv'"
```

### Exporter / importer un scénario Make

Pour livrer les scénarios au client :

1. Make → Scénario → ⋯ → **Export Blueprint** → télécharger le `.json`
2. Placer les fichiers dans `docs/make-scenarios/`
3. Le client peut les importer via Make → **Create a new scenario** → **Import Blueprint**

---

## PWA

### Installation

- **Android / Chrome** : bannière native `beforeinstallprompt` → bouton "Installer l'app"
- **iOS Safari** : bouton "Installer l'app" → instructions étape par étape (Partager → Sur l'écran d'accueil)
- **Autres navigateurs** : lien direct vers l'app

### Configuration (`public/manifest.json`)

```json
{
  "name": "Solimouv'",
  "short_name": "Solimouv'",
  "start_url": "/home",
  "display": "standalone",
  "theme_color": "#474194",
  "background_color": "#FFFFFF",
  "lang": "fr"
}
```

### Service Worker

Géré par `@ducanh2912/next-pwa` :

- Désactivé en développement automatiquement
- Cache stratégique sur les assets statiques
- Rechargement au retour en ligne

---

## Design system

Tokens définis dans `tailwind.config.ts` :


| Token             | Hex       | Usage                       |
| ----------------- | --------- | --------------------------- |
| `brand.primary`   | `#D81D61` | Rose — CTAs principaux      |
| `brand.secondary` | `#474194` | Violet — navbar, sélections |
| `brand.blue`      | `#1F74BB` | Bleu — tags info            |
| `brand.green`     | `#2E7E33` | Vert — succès, inscriptions |
| `brand.red`       | `#C11720` | Rouge — alertes             |
| `brand.dark`      | `#050505` | Noir — textes               |


Typographies (Fontshare) :

- **Titres** : Cabinet Grotesk (`font-heading`)
- **Corps** : Author (`font-body`)

---

## Déploiement

### Déploiement automatique

Chaque push sur `main` déclenche un déploiement Vercel automatique.

```bash
git push origin main   # → déploiement production
```

Les pull requests génèrent des **Preview deployments** avec URL unique.

### Déploiement manuel

```bash
npm run build    # Vérifier que le build passe en local
npm run start    # Tester le build de production localement
git push origin main
```

### Checklist post-déploiement

- PWA installable (manifest détecté, service worker actif)
- Auth fonctionnelle (magic link reçu, callback `/auth/callback`)
- Données Supabase chargées (activités, associations visibles)
- Formulaire contact → Make webhook reçoit les données
- Score Lighthouse PWA ≥ 70
- HTTPS actif

> Guide complet : `[docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)`

---

## Équipe & responsabilités


| Fichier / Outil                         | Responsable   |
| --------------------------------------- | ------------- |
| `tailwind.config.ts` → couleurs, typos  | DA            |
| `public/manifest.json` → thème, icônes  | DA            |
| `public/figma-assets/` → assets visuels | DA            |
| Textes de toutes les pages              | Brand Content |
| Stratégie RS + calendrier éditorial     | Brand Content |
| `supabase/migrations/` → schéma BDD     | DCX           |
| Scénarios Make → automatisations        | DCX           |
| `docs/RGPD.md` → conformité données     | DCX           |
| Architecture, déploiement, code         | Tech Lead     |
| Figma handoff → composants UI           | UX/UI         |


---

## Documentation complémentaire


| Document                                       | Description                                                     |
| ---------------------------------------------- | --------------------------------------------------------------- |
| `[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)` | Stack détaillée, schéma BDD complet, RLS, routes, design system |
| `[docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md)`   | Guide pas-à-pas Vercel + Supabase + Make                        |
|                                                |                                                                 |


---

## Licence

Projet réalisé dans le cadre du Hackathon No-Code M1 2026.
Association Up Sport! — Festival Solimouv' · Paris · 2026