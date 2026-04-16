# GitFlow Solimouv' — Automatisation complète

Tu es un assistant GitFlow. En fonction de l'argument passé, exécute le bon workflow Git.

**Argument reçu :** $ARGUMENTS

---

## Règles de base

- `main` = production uniquement, toujours stable, taggé (v0.1, v0.2, v1.0…)
- `develop` = branche d'intégration, toutes les features y mergent
- `feature/*` = une feature = une branche, part de `develop`, revient dans `develop`
- `release/*` = stabilisation avant prod, part de `develop`, merge dans `main` + `develop`
- `hotfix/*` = correctif urgent sur prod, part de `main`, merge dans `main` + `develop`

---

## Commandes disponibles

### `feature start <nom>`
Crée une nouvelle branche feature depuis develop.
```bash
git checkout develop
git pull origin develop
git checkout -b feature/<nom>
git push -u origin feature/<nom>
```
Confirme à l'utilisateur : "Branche feature/<nom> créée. Travaille ici, puis /gitflow feature finish <nom> quand tu as terminé."

### `feature finish <nom>`
Merge la feature dans develop et supprime la branche.
```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/<nom> -m "feat: merge feature/<nom> dans develop"
git push origin develop
git branch -d feature/<nom>
git push origin --delete feature/<nom>
```
Confirme : "Feature/<nom> mergée dans develop."

### `release start`
Crée une branche release depuis develop. Détermine automatiquement le prochain numéro de version en listant les tags existants (git tag -l).
```bash
git checkout develop
git pull origin develop
git checkout -b release/<version>
git push -u origin release/<version>
```
Confirme : "Branche release/<version> créée. Teste et corrige ici, puis /gitflow release finish quand c'est prêt."

### `release finish`
Merge release dans main ET develop, tag la version, supprime la branche.
```bash
git checkout main
git pull origin main
git merge --no-ff release/<version> -m "chore: release <version>"
git tag -a <version> -m "Release <version>"
git push origin main
git push origin <version>
git checkout develop
git merge --no-ff release/<version> -m "chore: back-merge release <version> dans develop"
git push origin develop
git branch -d release/<version>
git push origin --delete release/<version>
```
Confirme : "Version <version> déployée sur main et taguée."

### `hotfix start <nom>`
Correctif urgent depuis main.
```bash
git checkout main
git pull origin main
git checkout -b hotfix/<nom>
git push -u origin hotfix/<nom>
```
Confirme : "Branche hotfix/<nom> créée depuis main. Fais ton correctif puis /gitflow hotfix finish <nom>."

### `hotfix finish <nom>`
Merge le hotfix dans main ET develop, incrémente le patch tag.
```bash
git checkout main
git pull origin main
git merge --no-ff hotfix/<nom> -m "fix: hotfix/<nom>"
git tag -a <version-patch> -m "Hotfix <nom>"
git push origin main
git push origin <version-patch>
git checkout develop
git merge --no-ff hotfix/<nom> -m "fix: back-merge hotfix/<nom> dans develop"
git push origin develop
git branch -d hotfix/<nom>
git push origin --delete hotfix/<nom>
```
Confirme : "Hotfix appliqué sur main et develop."

### `status`
Affiche l'état des branches et des tags.
```bash
git branch -a
git tag -l
git log --oneline --graph --decorate --all -20
```

### `sync`
Met à jour toutes les branches locales depuis le remote.
```bash
git fetch --all --tags --prune
git checkout main && git pull origin main
git checkout develop && git pull origin develop
git checkout main
```

---

## Instructions d'exécution

1. Lis l'argument `$ARGUMENTS` pour déterminer la commande et le nom éventuel
2. Exécute les commandes bash dans l'ordre indiqué
3. Si une commande échoue, diagnostique l'erreur et propose une solution
4. Affiche un résumé clair de ce qui a été fait en français
5. Si aucun argument n'est fourni, affiche la liste des commandes disponibles avec des exemples
