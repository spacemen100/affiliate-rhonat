# Guide Pas à Pas : Ajouter VITE_BASE_GO_URL

## 🎯 Objectif
Ajouter la variable d'environnement `VITE_BASE_GO_URL` sur Vercel pour le projet frontend.

---

## 📍 Où Ajouter la Variable

**Plateforme:** Vercel Dashboard  
**Projet:** `affiliate-rhonat-ujyn` (FRONTEND)  
**URL:** https://vercel.com/dashboard

---

## 🔧 Étapes Détaillées

### Étape 1: Accéder au Dashboard Vercel
1. Ouvrez votre navigateur
2. Allez sur: https://vercel.com/dashboard
3. Connectez-vous si nécessaire

### Étape 2: Sélectionner le Projet Frontend
1. Dans la liste de vos projets, cliquez sur **`affiliate-rhonat-ujyn`**
   - ⚠️ Attention: Pas `affiliate-rhonat-delta` (c'est le backend ClickBank)
   - ✅ Choisissez bien celui qui se termine par `-ujyn` (c'est le frontend)

### Étape 3: Accéder aux Variables d'Environnement
1. Cliquez sur l'onglet **Settings** (en haut)
2. Dans le menu de gauche, cliquez sur **Environment Variables**

### Étape 4: Ajouter la Nouvelle Variable
1. Cliquez sur le bouton **"Add New"** ou **"Add Variable"**
2. Remplissez le formulaire:

   **Name (Nom):**
   ```
   VITE_BASE_GO_URL
   ```

   **Value (Valeur):**
   ```
   https://affiliate-rhonat-ujyn.vercel.app/go
   ```

   **Environments (Environnements):**
   - ✅ Cochez **Production**
   - ✅ Cochez **Preview**
   - ✅ Cochez **Development**

3. Cliquez sur **Save** ou **Add**

### Étape 5: Redéployer (Important!)
Les variables d'environnement ne sont appliquées qu'après un redéploiement.

**Option A: Redéploiement Automatique**
- Vercel redéploiera automatiquement après quelques minutes

**Option B: Redéploiement Manuel (Recommandé)**
1. Allez dans l'onglet **Deployments**
2. Trouvez le dernier déploiement réussi
3. Cliquez sur les 3 points (...) à droite
4. Cliquez sur **Redeploy**
5. Confirmez

**Option C: Via Terminal (Plus Rapide)**
```powershell
cd frontend
vercel --prod
```

---

## ✅ Vérification

Une fois le redéploiement terminé:

1. Allez sur votre application: https://affiliate-rhonat-ujyn.vercel.app
2. Connectez-vous
3. Allez dans la section **Liens** ou **Mes liens affiliés**
4. Créez un nouveau lien affilié
5. Vérifiez que l'URL générée commence bien par:
   ```
   https://affiliate-rhonat-ujyn.vercel.app/go/...
   ```

---

## 📊 Récapitulatif

**Variable à ajouter:**
```
VITE_BASE_GO_URL=https://affiliate-rhonat-ujyn.vercel.app/go
```

**Où:**
- Projet: `affiliate-rhonat-ujyn` (frontend)
- Section: Settings → Environment Variables

**Environnements:**
- Production ✅
- Preview ✅
- Development ✅

**Après:**
- Redéployer le frontend

---

## 🤔 Pourquoi Cette Variable?

Cette variable contrôle l'URL de base pour tous vos liens de redirection affiliés.

**Exemple:**
- Vous créez un lien avec le code: `PROMO123`
- Sans la variable: `https://affiliate-rhonat.vercel.app/go/PROMO123` (mauvais domaine)
- Avec la variable: `https://affiliate-rhonat-ujyn.vercel.app/go/PROMO123` (bon domaine!)

---

## 🆘 Besoin d'Aide?

Si vous avez des questions ou des problèmes:
1. Vérifiez que vous êtes bien sur le projet **frontend** (`-ujyn`)
2. Vérifiez l'orthographe exacte de la variable: `VITE_BASE_GO_URL`
3. Vérifiez que vous avez bien coché les 3 environnements
4. N'oubliez pas de redéployer!

---

## 📝 Alternative: Ajouter via Terminal

Si vous préférez utiliser le terminal:

```powershell
# Se connecter à Vercel
vercel login

# Aller dans le dossier frontend
cd frontend

# Ajouter la variable pour Production
vercel env add VITE_BASE_GO_URL production
# Quand demandé, entrez: https://affiliate-rhonat-ujyn.vercel.app/go

# Ajouter pour Preview
vercel env add VITE_BASE_GO_URL preview
# Entrez la même valeur

# Ajouter pour Development
vercel env add VITE_BASE_GO_URL development
# Entrez la même valeur

# Redéployer
vercel --prod
```
