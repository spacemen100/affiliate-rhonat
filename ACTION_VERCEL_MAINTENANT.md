# ⚡ ACTION IMMÉDIATE - Mettre à Jour Vercel

## ✅ Code Déployé avec Succès

Le code corrigé a été pushé vers GitHub et Vercel va automatiquement redéployer.

## 🚨 ACTION CRITIQUE REQUISE

**VOUS DEVEZ** mettre à jour les variables d'environnement sur Vercel **MAINTENANT** :

### Étape 1 : Aller sur Vercel

1. Ouvrez https://vercel.com/dashboard
2. Cliquez sur le projet **affiliate-rhonat-delta** (backend)
3. Cliquez sur **Settings**
4. Cliquez sur **Environment Variables**

### Étape 2 : Modifier les Variables

Trouvez et modifiez ces variables :

#### Variable 1 : CLICKBANK_API_KEY

**Valeur actuelle** : `KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT`

**Nouvelle valeur** : `API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT`

⚠️ **IMPORTANT** : Ajoutez le préfixe `API-` !

#### Variable 2 : CLICKBANK_DEV_KEY

**Valeur actuelle** : `API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT`

**Nouvelle valeur** : `API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT`

✅ Cette variable est déjà correcte, mais vérifiez qu'elle a bien le préfixe `API-`.

### Étape 3 : Sauvegarder

1. Cliquez sur **Save** pour chaque variable modifiée
2. Vercel vous demandera peut-être de redéployer → Cliquez sur **Redeploy**

### Étape 4 : Attendre le Déploiement

1. Allez dans l'onglet **Deployments**
2. Attendez que le statut passe à **Ready** (2-3 minutes)
3. Vous verrez un message "Deployment completed"

### Étape 5 : Tester

Une fois le déploiement terminé, testez :

```bash
curl https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
```

**Résultat attendu** :
```json
{"status":"ok","message":"ClickBank API is reachable"}
```

## 📋 Récapitulatif des Variables Vercel

Voici ce que vous devez avoir sur Vercel (projet affiliate-rhonat-delta) :

```env
CLICKBANK_API_KEY = API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_DEV_KEY = API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT
CLICKBANK_BASE_URL = https://api.clickbank.com
FRONTEND_URL = https://affiliate-rhonat-3c2b.vercel.app
```

## ⚠️ Points Critiques

1. **Le préfixe `API-` est OBLIGATOIRE** dans `CLICKBANK_API_KEY`
2. **Les deux variables** (API_KEY et DEV_KEY) doivent avoir la **même valeur**
3. **Redéployez** après avoir modifié les variables

## ✅ Checklist

- [ ] Aller sur Vercel Dashboard
- [ ] Sélectionner affiliate-rhonat-delta
- [ ] Settings → Environment Variables
- [ ] Modifier CLICKBANK_API_KEY (ajouter préfixe API-)
- [ ] Vérifier CLICKBANK_DEV_KEY (doit avoir préfixe API-)
- [ ] Sauvegarder les changements
- [ ] Redéployer si demandé
- [ ] Attendre "Ready" (2-3 min)
- [ ] Tester le health check
- [ ] Vérifier que ça retourne "ok"

## 🎯 Après le Test

Si le health check retourne `{"status":"ok"}` :
- ✅ **SUCCÈS !** Votre backend ClickBank fonctionne !
- ✅ Votre frontend peut maintenant appeler l'API
- ✅ La génération de liens d'affiliation va fonctionner

Si ça ne fonctionne pas :
- Vérifiez les logs Vercel (Deployments → Functions)
- Vérifiez que les variables ont bien le préfixe `API-`
- Vérifiez que le nouveau code a été déployé

## ⏰ Timeline

```
Maintenant : Mettre à jour les variables Vercel → 2 minutes
Attendre : Déploiement automatique → 2-3 minutes
Tester : Health check → 30 secondes
---
TOTAL : ~5 minutes jusqu'au succès complet
```

## 🚀 GO !

**Allez sur Vercel MAINTENANT et mettez à jour les variables !**

Dès que c'est fait, testez et dites-moi le résultat ! 🎉
