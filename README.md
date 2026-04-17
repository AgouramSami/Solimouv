# Solimouv' PWA

Progressive Web App du festival du sport inclusif [Solimouv'](https://www.unispourlesport.paris/solimouv-une-premiere-edition-qui-a-fait-bouger-les-lignes-du-sport-inclusif/) organisé par [Up Sport!](https://www.unispourlesport.paris/).

## Stack

- **Framework** : Next.js 15 (App Router)
- **Styling** : Tailwind CSS
- **PWA** : @ducanh2912/next-pwa (Service Worker + manifest)
- **Base de données** : Supabase
- **Hosting** : Vercel
- **Automation** : Make

## Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.local.example .env.local
# → Renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build & déploiement

```bash
npm run build   # build de production
npm run start   # lancer en production local
```

Déploiement automatique sur **Vercel** à chaque push sur `main`.

## Architecture

```
src/
├── app/                  # Pages (App Router)
│   ├── page.tsx          # Accueil
│   ├── a-propos/
│   ├── programme/
│   ├── associations/
│   ├── contact/
│   ├── sitemap.ts        # SEO sitemap auto
│   └── robots.ts
├── components/
│   ├── Navigation.tsx
│   └── Footer.tsx
└── lib/
    └── supabase.ts       # Client Supabase + types

public/
├── manifest.json         # Config PWA
└── icons/                # Icônes (192px, 512px)
```

## Charte graphique

Les couleurs sont centralisées dans `tailwind.config.ts` :
- `brand.primary` → couleur principale (DA : à remplacer)
- `brand.secondary` → couleur secondaire
- `brand.dark` / `brand.light` → fonds

## Intégration Rust/WASM (optionnel)

Le projet est configuré pour accepter du Rust compilé en WebAssembly :

```ts
// next.config.ts
experimental: { asyncWebAssembly: true }
```

Pour compiler un module Rust :
```bash
cd rust/
wasm-pack build --target web
```

Puis importer dans un composant Next.js :
```ts
const { ma_fonction } = await import("../rust/pkg");
```

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase |
| `NEXT_PUBLIC_SITE_URL` | URL de production |

## Documentation

| Document | Description |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Stack, schéma BDD, routes, intégrations Make, design system |
| [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) | Déploiement Vercel, configuration Supabase, Make webhooks |
| [docs/RGPD.md](docs/RGPD.md) | Données collectées, sous-traitants, droits utilisateurs, sécurité |

## Répartition équipe

| Fichier | Responsable |
|---|---|
| `tailwind.config.ts` → couleurs, typos | DA |
| `public/manifest.json` → thème, icônes | DA |
| `src/app/*/page.tsx` → textes, contenu | Brand Content |
| `src/lib/supabase.ts` → schéma DB | DCX |
| `.env.local`, Supabase, Make | DCX |
| Figma handoff → composants | UX/UI |
| Architecture, déploiement, briques | Tech Lead |
