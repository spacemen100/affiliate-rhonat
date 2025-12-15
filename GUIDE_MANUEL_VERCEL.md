# 🎯 Guide Rapide : Mettre à Jour les Variables sur Vercel

## ⚡ Méthode la Plus Simple : Via Dashboard Vercel

### 📱 **Étape 1: Frontend (affiliate-rhonat-3c2b)**

1. **Allez sur:** https://vercel.com/dashboard
2. **Cliquez sur:** Le projet `affiliate-rhonat-3c2b`
3. **Allez dans:** Settings (en haut) → Environment Variables (à gauche)

4. **Trouvez et modifiez ces variables:**

#### Variable 1: `VITE_BASE_GO_URL`
- **Cliquez sur** les 3 points (...) à droite de la variable
- **Cliquez sur** "Edit"
- **Nouvelle valeur:** `https://affiliate-rhonat-3c2b.vercel.app/go`
- **Cliquez sur** "Save"

#### Variable 2: `VITE_API_URL`
- **Cliquez sur** les 3 points (...) à droite de la variable
- **Cliquez sur** "Edit"
- **Nouvelle valeur:** `https://affiliate-rhonat-delta.vercel.app`
- **Cliquez sur** "Save"

---

### 🔧 **Étape 2: Backend ClickBank (affiliate-rhonat-delta)**

1. **Retournez sur:** https://vercel.com/dashboard
2. **Cliquez sur:** Le projet `affiliate-rhonat-delta`
3. **Allez dans:** Settings → Environment Variables

4. **Trouvez et modifiez:**

#### Variable: `FRONTEND_URL`
- **Cliquez sur** les 3 points (...) à droite
- **Cliquez sur** "Edit"
- **Nouvelle valeur:** `https://affiliate-rhonat-3c2b.vercel.app`
- **Cliquez sur** "Save"

---

### 🚀 **Étape 3: Redéployer**

#### Option A: Redéploiement Automatique
- Vercel redéploiera automatiquement dans quelques minutes

#### Option B: Redéploiement Manuel (Plus Rapide)

**Pour le Frontend:**
1. Restez sur le projet `affiliate-rhonat-3c2b`
2. Allez dans l'onglet **Deployments**
3. Trouvez le dernier déploiement (en haut de la liste)
4. Cliquez sur les **3 points (...)** à droite
5. Cliquez sur **"Redeploy"**
6. Confirmez en cliquant sur **"Redeploy"** à nouveau

**Pour le Backend:**
1. Allez sur le projet `affiliate-rhonat-delta`
2. Répétez les mêmes étapes

---

## 📋 Récapitulatif des Valeurs

### Frontend (`affiliate-rhonat-3c2b`)
| Variable | Nouvelle Valeur |
|----------|----------------|
| `VITE_BASE_GO_URL` | `https://affiliate-rhonat-3c2b.vercel.app/go` |
| `VITE_API_URL` | `https://affiliate-rhonat-delta.vercel.app` |

### Backend (`affiliate-rhonat-delta`)
| Variable | Nouvelle Valeur |
|----------|----------------|
| `FRONTEND_URL` | `https://affiliate-rhonat-3c2b.vercel.app` |

---

## ✅ Vérification

### 1. Vérifier que les variables sont bien enregistrées
- Retournez dans Settings → Environment Variables
- Vérifiez que les valeurs sont correctes

### 2. Attendre le redéploiement
- Allez dans l'onglet **Deployments**
- Attendez que le statut passe à **"Ready"** (environ 1-2 minutes)

### 3. Tester le Backend ClickBank
Ouvrez PowerShell et testez:
```powershell
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/health"
```

**Résultat attendu:**
```json
{
  "status": "ok",
  "message": "ClickBank API is reachable"
}
```

### 4. Tester le Frontend
```powershell
Start-Process "https://affiliate-rhonat-3c2b.vercel.app"
```

### 5. Tester la Génération de Liens
1. Connectez-vous à votre application
2. Allez dans **Mes liens affiliés**
3. Créez un nouveau lien
4. Vérifiez que l'URL commence par: `https://affiliate-rhonat-3c2b.vercel.app/go/...`

---

## 🎯 Checklist Complète

- [ ] Variables Frontend modifiées sur Vercel
  - [ ] `VITE_BASE_GO_URL` = `https://affiliate-rhonat-3c2b.vercel.app/go`
  - [ ] `VITE_API_URL` = `https://affiliate-rhonat-delta.vercel.app`
- [ ] Variables Backend modifiées sur Vercel
  - [ ] `FRONTEND_URL` = `https://affiliate-rhonat-3c2b.vercel.app`
- [ ] Frontend redéployé
- [ ] Backend redéployé
- [ ] Test Backend Health Check réussi
- [ ] Test Frontend réussi
- [ ] Test Génération de liens réussi

---

## 💡 Conseils

### Si vous ne voyez pas une variable
- Cliquez sur **"Add New"** pour l'ajouter
- Entrez le nom exact (respectez les majuscules)
- Entrez la valeur
- Cochez **Production**, **Preview**, et **Development**
- Cliquez sur **"Save"**

### Si le redéploiement échoue
- Vérifiez les logs dans l'onglet **Deployments**
- Cliquez sur le déploiement pour voir les détails
- Cherchez les erreurs en rouge

### Si le Health Check échoue
- Vérifiez que `CLICKBANK_DEV_KEY` et `CLICKBANK_API_KEY` sont bien configurées sur le backend
- Attendez 2-3 minutes après le redéploiement

---

## 🆘 Besoin d'Aide?

**Problème:** Je ne trouve pas le projet sur Vercel
- **Solution:** Vérifiez que vous êtes connecté au bon compte Vercel

**Problème:** Les variables ne se sauvegardent pas
- **Solution:** Vérifiez que vous avez les droits d'administration sur le projet

**Problème:** Le redéploiement prend trop de temps
- **Solution:** C'est normal, cela peut prendre 2-3 minutes

---

## 📸 Capture d'Écran de Référence

Voici à quoi ressemble la page des variables d'environnement:

![Variables Vercel](../image.png)

Vous devriez voir toutes vos variables listées avec leurs valeurs (partiellement masquées).

---

## ⏱️ Temps Estimé

- **Modification des variables:** 2-3 minutes
- **Redéploiement:** 2-3 minutes par projet
- **Total:** ~10 minutes

---

Bonne chance ! 🚀
