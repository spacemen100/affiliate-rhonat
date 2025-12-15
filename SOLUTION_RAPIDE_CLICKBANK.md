# 🎯 SOLUTION RAPIDE - ClickBank API 401 Error

## Probleme
```
❌ https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
   {"status":"error","message":"Cannot reach ClickBank API"}

✅ https://affiliate-rhonat-delta.vercel.app/
   {"message":"ClickBank Backend API","status":"running"}
```

**Le backend fonctionne, mais la cle API ClickBank est INVALIDE (401 Unauthorized)**

## Cause
Votre cle API `KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT` retourne **401 Non autorise** pour tous les formats d'authentification testes.

## Solution en 3 Etapes

### 📝 Etape 1: Obtenir une Cle API Valide

1. Allez sur **https://accounts.clickbank.com**
2. Connectez-vous a votre compte
3. Allez dans **Settings → API Keys** (ou **Account Settings → API Management**)
4. Verifiez votre cle actuelle OU creez-en une nouvelle:
   - Cliquez sur "Create New API Key"
   - Selectionnez les permissions: Read Orders, Read Products, Read Analytics
   - **COPIEZ LA CLE IMMEDIATEMENT** (elle ne sera plus visible)

### 🧪 Etape 2: Tester la Nouvelle Cle

1. Editez le fichier `test-clickbank-auth.ps1`
2. Remplacez la ligne 8:
   ```powershell
   $API_KEY = "VOTRE_NOUVELLE_CLE_ICI"
   ```
3. Executez:
   ```powershell
   .\test-clickbank-auth.ps1
   ```
4. Verifiez que vous obtenez "SUCCES!" pour au moins un format

### 🚀 Etape 3: Deployer sur Vercel

Une fois que le test local reussit:

1. Allez sur **https://vercel.com/dashboard**
2. Selectionnez le projet **affiliate-rhonat-delta** (backend)
3. **Settings → Environment Variables**
4. Modifiez les variables:

```env
CLICKBANK_DEV_KEY = VOTRE_NOUVELLE_CLE
CLICKBANK_API_KEY = VOTRE_NOUVELLE_CLE
CLICKBANK_BASE_URL = https://api.clickbank.com
FRONTEND_URL = https://affiliate-rhonat-3c2b.vercel.app
```

5. **Redeployez**:
   - Option A: Deployments → ... → Redeploy
   - Option B: Push un commit vide sur Git

6. **Testez** (attendez 2-3 minutes):
   ```bash
   curl https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
   ```

   Resultat attendu:
   ```json
   {"status":"ok","message":"ClickBank API is reachable"}
   ```

## Points de Verification ClickBank

### Type de Cle API

ClickBank a change son systeme d'API en aout 2023:

**Ancien format (avant aout 2023):**
- Developer Key: `DEV-xxxxx...`
- Clerk Key: `xxxxx...`
- Authentification: `DEV_KEY:CLERK_KEY`

**Nouveau format (apres aout 2023):**
- API Key unique: `xxxxx...`
- Authentification: `API_KEY` seul

### Permissions Requises

Assurez-vous que votre cle API a ces permissions:
- ✅ Read Orders
- ✅ Read Products  
- ✅ Read Analytics

### Restrictions IP

Si votre compte a des restrictions IP:
- Vercel utilise des IP dynamiques
- Vous devrez peut-etre desactiver les restrictions IP
- Ou utiliser un proxy avec IP fixe

## Troubleshooting

### "401 Unauthorized" persiste

1. **Verifiez le format de la cle**:
   - Pas d'espaces avant/apres
   - Pas de caracteres speciaux ajoutes
   - Cle complete copiee

2. **Verifiez le statut du compte**:
   - Compte actif
   - Pas de suspension
   - Termes de l'API acceptes

3. **Regenerez la cle**:
   - Supprimez l'ancienne cle
   - Creez-en une nouvelle
   - Testez immediatement

### "Cannot reach ClickBank API" (pas 401)

1. **Probleme de reseau**:
   - Verifiez que https://api.clickbank.com est accessible
   - Testez avec curl ou Postman

2. **Timeout**:
   - Augmentez le timeout dans le code (actuellement 30s)

### Variables d'environnement non prises en compte

1. **Apres modification sur Vercel**:
   - TOUJOURS redeployer
   - Les variables ne sont pas rechargees automatiquement

2. **Verifiez les logs**:
   - Vercel → Deployments → [dernier deploiement] → Functions
   - Cherchez les erreurs de variables manquantes

## Ressources

- **ClickBank API Settings**: https://accounts.clickbank.com/account/api.htm
- **ClickBank API Docs**: https://api.clickbank.com/rest/1.3/doc
- **Support ClickBank**: https://support.clickbank.com
- **Vercel Env Vars**: https://vercel.com/docs/concepts/projects/environment-variables

## Contact Support

Si le probleme persiste apres avoir suivi ces etapes:

**Support ClickBank:**
- Email: support@clickbank.com
- Ticket: https://support.clickbank.com/hc/en-us/requests/new
- Demandez: "API Key authentication returning 401"

**Informations a fournir:**
- Votre account nickname ClickBank
- Type de compte (vendeur/affilie)
- Message d'erreur exact
- Format d'authentification utilise
