# Guide de déploiement — Solimouv' PWA

## Prérequis

- Compte [Vercel](https://vercel.com) connecté au repository GitHub
- Projet [Supabase](https://supabase.com) créé
- Compte [Make.com](https://make.com) avec scénarios configurés
- Node.js ≥ 18

---

## 1. Supabase — Configuration base de données

### 1.1 Créer le projet

1. Aller sur [supabase.com](https://supabase.com) → **New project**
2. Choisir une région proche (ex. `West EU - Frankfurt`)
3. Noter le **Project URL** et les deux clés : `anon` et `service_role`

### 1.2 Appliquer les migrations

```bash
# Installer la CLI Supabase
npm install -g supabase

# Lier au projet distant
supabase link --project-ref <PROJECT_REF>

# Appliquer toutes les migrations
supabase db push
```

Les migrations se trouvent dans `supabase/migrations/` et s'appliquent dans cet ordre :
- `001_schema_solimouv.sql` — schéma principal (tables, RLS, triggers)
- `002_fix_user_profiles.sql` — colonnes profil + trigger enrichi
- `003_add_prenom_nom_age.sql` — split prénom/nom/âge
- `004_admin_roles.sql` — rôles admin + RLS admin

### 1.3 Configurer l'authentification

Dans le dashboard Supabase → **Authentication → URL Configuration** :

| Champ | Valeur |
|---|---|
| Site URL | `https://solimouv.vercel.app` (ou URL Vercel finale) |
| Redirect URLs | `https://solimouv.vercel.app/auth/callback` |

Activer **Email Auth** (magic link recommandé).

### 1.4 Définir le compte admin

Remplacer l'email dans `004_admin_roles.sql` avant de pousser la migration, ou exécuter manuellement dans l'éditeur SQL Supabase :

```sql
UPDATE user_profiles SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'votre@email.com');
```

---

## 2. Make.com — Automatisations

### 2.1 Scénarios à créer

| Scénario | Déclencheur | Actions |
|---|---|---|
| **Onboarding CRM** | Webhook POST (formulaire 5 étapes) | Créer contact, envoyer email de bienvenue |
| **Contact form** | Webhook POST (formulaire contact) | Ajouter ligne Google Sheets, envoyer réponse auto Gmail |
| **Inscription sign-up** | Webhook POST (login/signup) | Ajouter à liste CRM |

### 2.2 Créer le webhook Make

1. Dans Make → **Create a scenario**
2. Ajouter module **Webhooks → Custom Webhook**
3. Copier l'URL générée (ex. `https://hook.eu2.make.com/xxxx`)
4. Répéter pour chaque scénario ou utiliser un seul webhook avec routeur

### 2.3 Variable d'environnement

Ajouter dans Vercel :

```
NEXT_PUBLIC_MAKE_WEBHOOK_URL=https://hook.eu2.make.com/xxxx
```

---

## 3. Vercel — Déploiement

### 3.1 Import du projet

1. Aller sur [vercel.com](https://vercel.com) → **Add New Project**
2. Importer le repository GitHub `solimouv-pwa`
3. Framework détecté automatiquement : **Next.js**
4. Build command : `npm run build` (par défaut)
5. Output directory : `.next` (par défaut)

### 3.2 Variables d'environnement

Dans Vercel → **Settings → Environment Variables**, ajouter :

| Variable | Source | Scope |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard Supabase → Project Settings → API | Production + Preview |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Dashboard Supabase → `anon` key | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY` | Dashboard Supabase → `service_role` key | Production uniquement |
| `NEXT_PUBLIC_SITE_URL` | URL Vercel de production | Production |
| `NEXT_PUBLIC_MAKE_WEBHOOK_URL` | URL webhook Make | Production + Preview |

> **Sécurité** : Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY` côté client. Elle est uniquement utilisée dans les routes serveur (`/src/lib/supabase/admin.ts`).

### 3.3 Déploiement

```bash
# Push sur main → déploiement automatique
git push origin main
```

Chaque push sur `main` déclenche un déploiement automatique sur Vercel.

Les pull requests génèrent automatiquement des **Preview deployments** avec URL unique.

### 3.4 Domaine personnalisé (optionnel)

Dans Vercel → **Settings → Domains** :
- Ajouter le domaine (ex. `solimouv.fr`)
- Suivre les instructions DNS (CNAME ou A record)
- Mettre à jour `NEXT_PUBLIC_SITE_URL` et les URLs de redirect Supabase

---

## 4. Vérification post-déploiement

```bash
# Vérifier le build local avant de pousser
npm run build
npm run start
```

Checklist en production :
- [ ] PWA installable (manifest.json détecté, service worker actif)
- [ ] Authentification fonctionnelle (magic link + callback)
- [ ] Données Supabase chargées (activités, associations)
- [ ] Formulaire contact → Make webhook reçoit les données
- [ ] Score Lighthouse PWA > 70
- [ ] HTTPS actif (Vercel le gère automatiquement)

---

## 5. Mise à jour du schéma Supabase

Pour toute modification du schéma en production :

```bash
# Créer une nouvelle migration
supabase migration new ma_modification

# Éditer le fichier créé dans supabase/migrations/
# Puis pousser
supabase db push
```

Ne jamais modifier directement les tables en production sans migration versionnée.
