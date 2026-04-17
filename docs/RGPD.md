# Documentation RGPD — Solimouv' PWA

**Application** : Solimouv' PWA  
**Responsable de traitement** : Association Up Sport!  
**Date** : Avril 2026  
**DPO / Contact** : [À renseigner par l'association]

---

## 1. Données collectées et finalités

### 1.1 Création de compte et authentification

| Donnée | Finalité | Base légale |
|---|---|---|
| Adresse email | Authentification (magic link), communication | Exécution du contrat |
| Prénom, nom | Personnalisation de l'expérience | Exécution du contrat |
| Âge | Adaptation des recommandations sportives | Exécution du contrat |

### 1.2 Questionnaire d'onboarding

| Donnée | Finalité | Base légale |
|---|---|---|
| Type de pratique sportive | Recommandations personnalisées | Consentement |
| Rythme de pratique | Recommandations personnalisées | Consentement |
| Situation personnelle | Adaptation de l'accompagnement | Consentement |
| Type d'accompagnement souhaité | Orientation vers les activités adaptées | Consentement |
| Intérêt pour la communauté | Propositions de mise en relation | Consentement |

Ces données sont transmises à Make.com pour la segmentation CRM et l'envoi d'emails personnalisés.

### 1.3 Inscriptions aux activités

| Donnée | Finalité | Base légale |
|---|---|---|
| Identifiant utilisateur + activité | Gestion des inscriptions | Exécution du contrat |
| Statut (confirmé/annulé/liste d'attente) | Suivi des places disponibles | Exécution du contrat |

### 1.4 Formulaire de contact

| Donnée | Finalité | Base légale |
|---|---|---|
| Nom, email | Réponse à la demande | Intérêt légitime |
| Message, sujet | Traitement de la demande | Intérêt légitime |

Ces données sont transmises à Make.com (Google Sheets + Gmail).

### 1.5 Données de navigation

Le service worker PWA met en cache les ressources statiques localement sur l'appareil de l'utilisateur. Aucune donnée de navigation n'est collectée à des fins analytiques dans la version actuelle.

---

## 2. Durées de conservation

| Catégorie | Durée |
|---|---|
| Comptes utilisateurs actifs | Jusqu'à suppression par l'utilisateur ou 2 ans d'inactivité |
| Données onboarding | Jusqu'à suppression du compte |
| Inscriptions | 1 an après la date de l'événement |
| Formulaires de contact | 1 an |
| Logs d'authentification (Supabase) | 90 jours (géré par Supabase) |

---

## 3. Destinataires des données

### 3.1 Sous-traitants

| Sous-traitant | Rôle | Localisation | Garanties |
|---|---|---|---|
| **Supabase** (Supabase Inc.) | Base de données, authentification | EU (Frankfurt) | DPA disponible, conformité RGPD |
| **Vercel** (Vercel Inc.) | Hébergement de l'application | USA + CDN EU | DPA disponible, Standard Contractual Clauses |
| **Make.com** (Celonis SE) | Automatisation (CRM, emails) | EU | Conforme RGPD, DPA disponible |
| **Google** (Gmail, Sheets via Make) | Réponses automatiques, suivi contacts | USA | Standard Contractual Clauses |

### 3.2 Transferts hors UE

Vercel et Google hébergent des données aux États-Unis. Ces transferts sont encadrés par des Clauses Contractuelles Types (CCT) conformément à l'article 46 du RGPD.

---

## 4. Droits des utilisateurs

Conformément aux articles 15 à 22 du RGPD, les utilisateurs disposent des droits suivants :

| Droit | Description | Comment l'exercer |
|---|---|---|
| **Accès** | Obtenir une copie de ses données | Paramètres → Mon compte |
| **Rectification** | Corriger des données inexactes | Paramètres → Mon compte |
| **Effacement** | Supprimer son compte et toutes ses données | Paramètres → Supprimer mon compte |
| **Opposition** | S'opposer au traitement à des fins marketing | Décocher l'opt-in email en paramètres |
| **Portabilité** | Recevoir ses données dans un format structuré | Contacter l'association |
| **Limitation** | Limiter le traitement | Contacter l'association |

**Contact pour exercer ses droits** : [email DPO de l'association — À renseigner]

En cas de réclamation non résolue : [CNIL](https://www.cnil.fr) — 3, place de Fontenoy, 75007 Paris.

---

## 5. Consentement et opt-in

### Email marketing (`email_optin`)

- L'utilisateur coche explicitement la case lors de l'onboarding
- Valeur stockée dans `user_profiles.email_optin`
- Révocable à tout moment depuis les paramètres
- Sans opt-in : aucun email marketing, seuls les emails transactionnels (confirmation inscription) sont envoyés

### Données onboarding

- La collecte des données de questionnaire est présentée comme optionnelle
- L'utilisateur peut passer l'onboarding
- Les données sont utilisées uniquement pour personnaliser l'expérience

---

## 6. Sécurité des données

### Mesures techniques

| Mesure | Détail |
|---|---|
| **Chiffrement en transit** | HTTPS obligatoire (Vercel + Supabase) |
| **Chiffrement au repos** | Géré par Supabase (PostgreSQL chiffré) |
| **Contrôle d'accès** | Row Level Security (RLS) activé sur toutes les tables |
| **Séparation des privilèges** | Clé `service_role` uniquement côté serveur, jamais exposée au client |
| **Authentification** | Magic link (sans mot de passe), session sécurisée via cookies HttpOnly |
| **Rôles admin** | Accès admin restreint via la fonction `is_admin()` et RLS |

### Mesures organisationnelles

- Accès production limité aux membres tech autorisés
- Variables d'environnement sensibles gérées exclusivement via Vercel (jamais en dur dans le code)
- Repository GitHub privé recommandé en production

---

## 7. Cookies

| Cookie | Type | Finalité | Durée |
|---|---|---|---|
| `sb-*-auth-token` | Technique | Session Supabase (authentification) | Session / 1 semaine |

Aucun cookie analytics ou publicitaire n'est déposé dans la version actuelle.

La bannière de consentement cookies n'est pas obligatoire pour les cookies strictement nécessaires au fonctionnement du service.

---

## 8. Mineurs

La PWA est destinée au grand public incluant potentiellement des mineurs. Les données collectées (questionnaire) ne comprennent pas d'informations sensibles au sens de l'article 9 du RGPD.

Pour les utilisateurs de moins de 15 ans, le consentement parental est recommandé pour la collecte des données d'onboarding. [À préciser selon la politique de l'association.]

---

## 9. Mentions légales et pages réglementaires

Les pages suivantes sont disponibles dans la PWA :

- `/cgu` — Conditions Générales d'Utilisation
- `/confidentialite` — Politique de confidentialité

Ces pages doivent être maintenues à jour par l'association en cas de modification des traitements.

---

## 10. Registre des activités de traitement (extrait)

| N° | Activité | Responsable | Données | Base légale | Durée |
|---|---|---|---|---|---|
| 1 | Gestion des comptes utilisateurs | Up Sport! | Email, prénom, nom, âge | Contrat | 2 ans inactivité |
| 2 | Personnalisation via onboarding | Up Sport! | Profil sportif, situation | Consentement | Durée du compte |
| 3 | Gestion des inscriptions | Up Sport! | ID utilisateur, activité, statut | Contrat | 1 an post-événement |
| 4 | CRM et emailing | Up Sport! + Make | Email, prénom, catégorie CRM | Consentement (marketing) / Contrat (transac.) | 2 ans |
| 5 | Formulaire de contact | Up Sport! | Nom, email, message | Intérêt légitime | 1 an |

---

*Document à faire valider par un juriste RGPD avant mise en production.*
