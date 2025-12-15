# 🔧 Correction de l'Endpoint ClickBank API

## ✅ Problème Identifié

Grâce à la documentation officielle ClickBank (`frontend/CLICKBANK_OFFICIAL_DOCS.md`), j'ai identifié que **le backend utilisait le mauvais endpoint API**.

### **Avant (Incorrect) :**
```typescript
// ❌ Mauvais endpoint
await this.axiosInstance.get('/rest/1.3/orders', { params });
```

### **Après (Correct) :**
```typescript
// ✅ Bon endpoint selon la documentation officielle
await this.axiosInstance.get('/rest/1.3/orders2/list', { params });
```

---

## 📚 Documentation Officielle ClickBank

D'après `CLICKBANK_OFFICIAL_DOCS.md` :

### **URL de Base**
```
https://api.clickbank.com/rest/1.3/orders2
```

### **Endpoints Disponibles**
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/1.3/orders2/list` | Liste des commandes (avec pagination) |
| GET | `/1.3/orders2/{receipt}` | Détails d'une commande spécifique |
| GET | `/1.3/orders2/count` | Nombre de commandes |
| GET | `/1.3/orders2/schema` | Schéma XML des données |

### **Paramètres Supportés pour `/orders2/list`**
- `startDate` (yyyy-mm-dd)
- `endDate` (yyyy-mm-dd)
- `role` (VENDOR ou AFFILIATE)
- `type` (SALE, RFND, CGBK, etc.)
- `vendor` (nickname du vendeur)
- `affiliate` (nickname de l'affilié)
- `email`, `lastName`, `postalCode`, etc.

### **Pagination**
- Maximum 100 résultats par page
- Header `Page` pour spécifier la page (défaut: 1)
- Status 200 si toutes les données sont retournées
- Status 206 s'il y a plus de résultats

---

## 🔧 Corrections Effectuées

### **Fichier : `backend-serverless/lib/clickbank.service.ts`**

```typescript
// Ligne 127 - Correction de l'endpoint
- const response = await this.axiosInstance.get('/rest/1.3/orders', {
+ const response = await this.axiosInstance.get('/rest/1.3/orders2/list', {
```

---

## 🚀 Prochaines Étapes

### **1. Redéployer le Backend**

Le code a été corrigé localement, mais il faut le déployer sur Vercel :

```powershell
cd backend-serverless
vercel --prod
```

**Important :** Lors du déploiement, sélectionnez le projet **`affiliate-rhonat-delta`** (PAS `affiliate-rhonat-3c2b`).

### **2. Configurer les Credentials ClickBank**

Une fois le backend redéployé avec le bon endpoint, ajoutez les credentials sur Vercel :

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez **`affiliate-rhonat-delta`**
3. Settings → Environment Variables
4. Ajoutez :
   - `CLICKBANK_DEV_KEY` = Votre clé développeur
   - `CLICKBANK_API_KEY` = Votre clé API
   - `CLICKBANK_BASE_URL` = `https://api.clickbank.com`
5. Redéployez

### **3. Tester**

```powershell
# Test du health check
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/health"

# Test des commandes
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/orders?startDate=2024-01-01&endDate=2024-12-31"
```

---

## 📊 Résumé des Changements

| Composant | Avant | Après | Statut |
|-----------|-------|-------|--------|
| Endpoint Orders | `/rest/1.3/orders` ❌ | `/rest/1.3/orders2/list` ✅ | Corrigé |
| Code Backend | Ancien endpoint | Nouveau endpoint | ✅ Modifié localement |
| Déploiement | - | - | ⚠️ À faire |
| Credentials | - | - | ⚠️ À configurer |

---

## ✅ Checklist

- [x] Documentation officielle ClickBank consultée
- [x] Endpoint corrigé dans le code
- [ ] Backend redéployé sur Vercel
- [ ] Credentials ClickBank configurés
- [ ] Tests de vérification réussis

---

## 🔐 Credentials Requis

Pour que le backend fonctionne, vous devez configurer ces 3 variables sur Vercel :

| Variable | Valeur | Où la trouver |
|----------|--------|---------------|
| `CLICKBANK_DEV_KEY` | `API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT` | ClickBank → Settings → API Keys |
| `CLICKBANK_API_KEY` | `KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT` | Même clé sans `API-` |
| `CLICKBANK_BASE_URL` | `https://api.clickbank.com` | URL de base de l'API |

---

## 🎯 Résultat Attendu

Une fois tout configuré :

```json
{
  "status": "ok",
  "message": "ClickBank API is reachable"
}
```

Et les commandes seront récupérées avec succès ! 🎉
