# 🎯 SOLUTION SIMPLE : Utiliser affiliate-rhonat-delta

## 📊 Situation Actuelle

Vous avez maintenant **3 projets Vercel** :

| Projet | URL | Statut | Utilité |
|--------|-----|--------|---------|
| `affiliate-rhonat-delta` | https://affiliate-rhonat-delta.vercel.app | ✅ Fonctionne | **Backend ClickBank (à utiliser)** |
| `affiliate-rhonat-3c2b` | https://affiliate-rhonat-3c2b.vercel.app | ✅ Fonctionne | Frontend |
| `affiliate-rhonat-backend-serverless` | https://affiliate-rhonat-backend-serverless.vercel.app | ❌ 404 | **À supprimer** |

---

## ✅ SOLUTION RECOMMANDÉE

**Utilisez `affiliate-rhonat-delta`** qui fonctionne déjà ! Il suffit juste d'ajouter les credentials.

### **Étape 1 : Configurer les Credentials sur affiliate-rhonat-delta**

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur **`affiliate-rhonat-delta`**
3. Settings → Environment Variables
4. Ajoutez ces 3 variables :

| Variable | Valeur |
|----------|--------|
| `CLICKBANK_DEV_KEY` | `API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT` |
| `CLICKBANK_API_KEY` | `KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT` |
| `CLICKBANK_BASE_URL` | `https://api.clickbank.com` |

5. Redéployez le projet

### **Étape 2 : Mettre à Jour le Frontend**

Le frontend doit pointer vers `affiliate-rhonat-delta` (c'est déjà le cas dans votre `.env`).

Vérifiez que `frontend/.env` contient :
```env
VITE_API_URL=https://affiliate-rhonat-delta.vercel.app
```

### **Étape 3 : Supprimer le Projet Inutile (Optionnel)**

Pour éviter la confusion, supprimez `affiliate-rhonat-backend-serverless` :

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur `affiliate-rhonat-backend-serverless`
3. Settings → General → Delete Project

---

## 🧪 TEST

Une fois les credentials configurés sur `affiliate-rhonat-delta` :

```powershell
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/health"
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "message": "ClickBank API is reachable"
}
```

---

## 📝 POURQUOI affiliate-rhonat-delta ?

1. ✅ **Déjà déployé et fonctionnel**
2. ✅ **Bon endpoint API** (`/rest/1.3/orders2/list`)
3. ✅ **CORS configuré** pour le frontend
4. ✅ **Structure correcte**
5. ⚠️ **Il manque juste les credentials** (facile à ajouter)

---

## 🎯 ARCHITECTURE FINALE

```
Frontend (affiliate-rhonat-3c2b.vercel.app)
    ↓ /api/clickbank/*
Backend ClickBank (affiliate-rhonat-delta.vercel.app)
    ↓ avec credentials
ClickBank API (api.clickbank.com)
```

---

## ⏱️ TEMPS ESTIMÉ

- Ajouter les 3 credentials : **2 minutes**
- Redéployer : **2 minutes**
- Tester : **1 minute**
- **Total : 5 minutes**

---

## 🚀 ACTION IMMÉDIATE

**NE PERDEZ PAS DE TEMPS avec le nouveau projet.**

**Utilisez `affiliate-rhonat-delta` qui fonctionne déjà !**

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur `affiliate-rhonat-delta`
3. Ajoutez les 3 credentials
4. Redéployez
5. Testez
6. ✅ Terminé !

---

## 📋 CHECKLIST

- [ ] Aller sur Vercel Dashboard
- [ ] Sélectionner `affiliate-rhonat-delta`
- [ ] Settings → Environment Variables
- [ ] Ajouter `CLICKBANK_DEV_KEY`
- [ ] Ajouter `CLICKBANK_API_KEY`
- [ ] Ajouter `CLICKBANK_BASE_URL`
- [ ] Redéployer le projet
- [ ] Tester le health check
- [ ] ✅ Profiter !

---

**C'est la solution la plus simple et la plus rapide !** 🚀
