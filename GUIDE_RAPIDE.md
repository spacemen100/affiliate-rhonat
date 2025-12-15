# 🚀 Guide Rapide - Correction du Crash Serverless

## ✅ Problème Résolu

Le crash de votre fonction serverless Vercel était causé par **l'absence des variables d'environnement ClickBank**.

### Ce qui a été corrigé dans le code :

1. ✅ **Suppression du crash au démarrage** - Le service ne lance plus d'erreur dans le constructeur
2. ✅ **Vérification gracieuse** - Chaque méthode vérifie maintenant si les credentials sont configurés
3. ✅ **Messages d'erreur clairs** - Vous savez exactement quelles variables manquent
4. ✅ **Build TypeScript corrigé** - Utilisation correcte de l'API Axios pour les headers

## 🔧 Action Requise : Configurer les Variables d'Environnement

### Option 1 : Via le Dashboard Vercel (Le plus simple)

1. Allez sur **[vercel.com](https://vercel.com)** et connectez-vous
2. Sélectionnez votre projet **affiliate-rhonat**
3. Cliquez sur **Settings** (dans le menu de gauche)
4. Cliquez sur **Environment Variables**
5. Ajoutez ces variables :

   | Nom | Valeur | Environnements |
   |-----|--------|----------------|
   | `CLICKBANK_DEV_KEY` | Votre clé développeur ClickBank | Production, Preview, Development |
   | `CLICKBANK_API_KEY` | Votre clé API ClickBank | Production, Preview, Development |
   | `CLICKBANK_BASE_URL` | `https://api.clickbank.com` (ou sandbox) | Production, Preview, Development |
   | `FRONTEND_URL` | URL de votre frontend (optionnel) | Production, Preview, Development |

6. Cliquez sur **Save** pour chaque variable
7. **Redéployez** votre application (Vercel le fera automatiquement)

### Option 2 : Via Script PowerShell (Automatique)

Exécutez simplement ce script dans PowerShell :

```powershell
.\setup-vercel-env.ps1
```

Le script vous guidera étape par étape pour :
- Installer Vercel CLI si nécessaire
- Vous connecter à Vercel
- Configurer toutes les variables d'environnement
- Redéployer l'application

## 📍 Où Trouver vos Clés ClickBank ?

1. Connectez-vous à votre compte ClickBank
2. Allez dans **Settings** > **API Settings**
3. Vous y trouverez :
   - **Developer Key** (CLICKBANK_DEV_KEY)
   - **API Key** (CLICKBANK_API_KEY)

> ⚠️ **Important** : Si vous n'avez pas encore de clés API, vous devrez les générer dans cette section.

## 🧪 Tester que Tout Fonctionne

Une fois les variables configurées et l'application redéployée :

### 1. Testez l'endpoint de santé

Ouvrez dans votre navigateur ou avec curl :
```
https://votre-app.vercel.app/api/clickbank/health
```

### 2. Résultats attendus

**✅ Si tout est OK :**
```json
{
  "status": "ok",
  "message": "ClickBank API is reachable"
}
```

**❌ Si les credentials manquent encore :**
```json
{
  "status": "error",
  "message": "ClickBank credentials (CLICKBANK_DEV_KEY and CLICKBANK_API_KEY) are not configured..."
}
```

**❌ Si les credentials sont incorrects :**
```json
{
  "status": "error",
  "message": "Cannot reach ClickBank API"
}
```

## 📝 Commits Effectués

1. **`ddfd9fe`** - Fix TypeScript build error (headers Axios)
2. **`4f0c67c`** - Fix serverless crash (gestion gracieuse des credentials manquants)

## 🎯 Prochaines Étapes

1. ✅ Configurez les variables d'environnement (voir ci-dessus)
2. ✅ Attendez le redéploiement automatique (ou lancez-le manuellement)
3. ✅ Testez `/api/clickbank/health`
4. ✅ Une fois que ça fonctionne, testez les autres endpoints :
   - `/api/clickbank/products` - Liste des produits
   - `/api/clickbank/orders` - Liste des commandes
   - `/api/clickbank/analytics` - Statistiques

## 💡 Besoin d'Aide ?

- **Documentation complète** : Voir `VERCEL_ENV_SETUP.md`
- **Script automatique** : Exécutez `setup-vercel-env.ps1`
- **Logs Vercel** : Consultez les logs dans le dashboard Vercel pour plus de détails

## 🔒 Sécurité

⚠️ **NE JAMAIS** :
- Committer vos clés API dans Git
- Partager vos clés publiquement
- Utiliser les clés de production pour les tests

✅ **TOUJOURS** :
- Utiliser les variables d'environnement
- Utiliser le sandbox pour les tests
- Garder vos clés secrètes
