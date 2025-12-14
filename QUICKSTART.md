# 🚀 Guide de Démarrage Rapide - ClickBank Integration

## ⚡ Installation en 5 minutes

### 1️⃣ Configuration du Backend

```bash
cd backend
npm install
copy .env.example .env
```

**Important:** Éditez `backend/.env` et remplacez les valeurs par vos credentials ClickBank:

```env
CLICKBANK_DEV_KEY=VOTRE_VRAIE_DEV_KEY
CLICKBANK_API_KEY=VOTRE_VRAIE_API_KEY
CLICKBANK_CLERK_KEY=VOTRE_VRAIE_CLERK_KEY
```

### 2️⃣ Configuration du Frontend

```bash
cd frontend
copy .env.example .env
```

Le fichier `.env` devrait contenir:
```env
VITE_API_URL=http://localhost:3001
```

### 3️⃣ Démarrage

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4️⃣ Test

Ouvrez votre navigateur sur `http://localhost:5173`

Pour tester le backend directement:
```bash
curl http://localhost:3001/api/clickbank/health
```

## 📍 Où trouver vos credentials ClickBank?

1. Allez sur https://accounts.clickbank.com
2. Cliquez sur **Settings** (Paramètres)
3. Cliquez sur **API Settings**
4. Copiez vos clés:
   - Developer Key
   - API Key
   - Clerk Key

## ✅ Vérification

Si tout fonctionne, vous devriez voir:

**Backend:**
```
🚀 Server running on port 3001
📍 Environment: development
```

**Frontend:**
```
VITE v6.0.0  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## 🎯 Prochaines étapes

Consultez `PLAN_ACTION.md` pour les étapes détaillées d'intégration dans votre application.

## 🆘 Besoin d'aide?

- Backend ne démarre pas? → Vérifiez `backend/.env`
- Erreur CORS? → Vérifiez que les deux serveurs tournent
- Pas de données? → Vérifiez vos credentials ClickBank

Consultez `CLICKBANK_INTEGRATION.md` pour plus de détails.
