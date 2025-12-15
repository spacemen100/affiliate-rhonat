# 🔧 Solution Complète - Authentification ClickBank

## 📋 Diagnostic

Votre backend retourne: `{"status":"error","message":"Cannot reach ClickBank API"}`

### Problème Identifié

Selon la documentation ClickBank (mise à jour août 2023), l'authentification a changé:

**Ancien format (avant août 2023):**
```
Authorization: DEV_KEY:CLERK_KEY
```

**Nouveau format (après août 2023):**
```
Authorization: SINGLE_API_KEY
```

## 🎯 Solutions Possibles

### Solution 1: Utiliser un Seul API Key (RECOMMANDÉ)

ClickBank utilise maintenant principalement **un seul API key** pour l'authentification.

#### Sur Vercel (Backend: affiliate-rhonat-delta)

Modifiez vos variables d'environnement:

```env
# Utilisez la même clé pour les deux variables
CLICKBANK_DEV_KEY=KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_API_KEY=KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_BASE_URL=https://api.clickbank.com
FRONTEND_URL=https://affiliate-rhonat-3c2b.vercel.app
```

**Pourquoi ça marche:**
Le code backend combine `DEV_KEY:API_KEY`, donc si les deux sont identiques, vous obtenez:
```
KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT:KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
```

### Solution 2: Modifier le Code Backend

Si vous voulez utiliser seulement `CLICKBANK_API_KEY`, modifiez le backend:

#### Fichier: `backend/src/services/clickbank.service.ts`

**Ligne 47-56 (Actuel):**
```typescript
private generateAuthHeaders(): Record<string, string> {
    // ClickBank utilise une authentification basique
    // Format: "DEV_KEY:API_KEY" encodé en base64
    const credentials = `${this.devKey}:${this.apiKey}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    return {
        Authorization: `Basic ${encodedCredentials}`,
    };
}
```

**Nouveau (Option A - Un seul key):**
```typescript
private generateAuthHeaders(): Record<string, string> {
    // ClickBank utilise maintenant un seul API key (depuis août 2023)
    const encodedCredentials = Buffer.from(this.apiKey).toString('base64');

    return {
        Authorization: `Basic ${encodedCredentials}`,
    };
}
```

**Nouveau (Option B - Format flexible):**
```typescript
private generateAuthHeaders(): Record<string, string> {
    // Support des deux formats: ancien (DEV:API) et nouveau (API seul)
    let credentials: string;
    
    if (this.devKey && this.apiKey && this.devKey !== this.apiKey) {
        // Format ancien: DEV_KEY:API_KEY
        credentials = `${this.devKey}:${this.apiKey}`;
    } else {
        // Format nouveau: API_KEY seul
        credentials = this.apiKey;
    }
    
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    return {
        Authorization: `Basic ${encodedCredentials}`,
    };
}
```

### Solution 3: Vérifier le Format Exact sur ClickBank

1. Connectez-vous à votre compte ClickBank
2. Allez dans **Settings → API Management**
3. Vérifiez le format exact de votre clé API
4. Notez si c'est:
   - Une seule clé (format moderne)
   - Deux clés séparées: Developer Key + Clerk Key (format ancien)

## 🚀 Étapes de Déploiement

### Étape 1: Mettre à Jour les Variables d'Environnement sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez `affiliate-rhonat-delta` (backend)
3. Settings → Environment Variables
4. Modifiez:

```
CLICKBANK_DEV_KEY = KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_API_KEY = KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
```

5. Cliquez sur "Save"

### Étape 2: Redéployer le Backend

Deux options:

**Option A: Via l'interface Vercel**
1. Allez dans l'onglet "Deployments"
2. Cliquez sur les trois points (...) du dernier déploiement
3. Sélectionnez "Redeploy"

**Option B: Via Git**
```bash
cd c:\Users\stagiaire\Desktop\affiliate-rhonat\backend
git commit --allow-empty -m "Redeploy with updated env vars"
git push
```

### Étape 3: Tester

Attendez que le déploiement soit terminé (2-3 minutes), puis testez:

```bash
# Test du health check
curl https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
```

**Résultat attendu:**
```json
{
  "status": "ok",
  "message": "ClickBank API is reachable"
}
```

### Étape 4: Tester le Frontend

Une fois le backend fonctionnel, testez votre frontend:

```
https://affiliate-rhonat-3c2b.vercel.app/clickbank
```

## 🧪 Test Local (Optionnel)

Pour tester localement avant de déployer:

### 1. Créer `.env` dans `backend/`

```env
PORT=3001
CLICKBANK_DEV_KEY=KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_API_KEY=KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_BASE_URL=https://api.clickbank.com
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### 2. Lancer le Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Tester

```bash
# Dans un autre terminal
curl http://localhost:3001/api/clickbank/health
```

## 📊 Vérification de l'Authentification

Pour vérifier que l'authentification fonctionne correctement, vous pouvez ajouter des logs temporaires:

### Dans `backend/src/services/clickbank.service.ts`

```typescript
private generateAuthHeaders(): Record<string, string> {
    const credentials = `${this.devKey}:${this.apiKey}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    // LOG TEMPORAIRE (À RETIRER EN PRODUCTION)
    console.log('🔑 Auth Debug:');
    console.log('  DEV_KEY:', this.devKey?.substring(0, 10) + '...');
    console.log('  API_KEY:', this.apiKey?.substring(0, 10) + '...');
    console.log('  Credentials:', credentials.substring(0, 20) + '...');
    console.log('  Encoded:', encodedCredentials.substring(0, 20) + '...');

    return {
        Authorization: `Basic ${encodedCredentials}`,
    };
}
```

Puis vérifiez les logs sur Vercel:
1. Allez dans votre projet backend sur Vercel
2. Onglet "Deployments"
3. Cliquez sur le dernier déploiement
4. Onglet "Functions" → Sélectionnez une fonction
5. Consultez les logs en temps réel

## 🔍 Dépannage

### Erreur: "Cannot reach ClickBank API"

**Causes possibles:**
1. ✅ Variables d'environnement incorrectes
2. ✅ Format d'authentification incorrect
3. ❌ Clé API invalide ou expirée
4. ❌ Restrictions IP sur votre compte ClickBank
5. ❌ API ClickBank temporairement indisponible

**Solutions:**
1. Vérifiez que vos clés API sont valides sur ClickBank
2. Vérifiez qu'il n'y a pas de restrictions IP
3. Testez avec Postman ou curl directement

### Test Direct avec curl

```bash
# Testez directement l'API ClickBank
curl -X GET "https://api.clickbank.com/rest/1.3/products/listings" \
  -H "Authorization: Basic $(echo -n 'KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT:KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT' | base64)"
```

Si cette commande fonctionne, le problème vient de votre backend.
Si elle ne fonctionne pas, le problème vient de vos credentials ClickBank.

## 📚 Ressources

- [ClickBank API Documentation](https://api.clickbank.com/rest/1.3/doc)
- [ClickBank API Changes (August 2023)](https://support.clickbank.com/hc/en-us/articles/220374588)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## ✅ Checklist

- [ ] Variables d'environnement mises à jour sur Vercel
- [ ] Backend redéployé
- [ ] Health check retourne `"status": "ok"`
- [ ] Frontend peut appeler le backend
- [ ] Logs vérifiés (pas d'erreurs)
