# 📖 Guide d'utilisation - Page ClickBank

## 🎯 Vue d'ensemble

La page ClickBank vous permet de gérer toutes vos interactions avec l'API ClickBank depuis une interface unique et intuitive. Toutes les requêtes passent par le backend Vercel sécurisé.

## 🚀 Accès à la page

1. Démarrez le serveur de développement :
   ```bash
   cd frontend
   npm run dev
   ```

2. Ouvrez votre navigateur : http://localhost:5173

3. Cliquez sur **"ClickBank"** dans la sidebar (menu latéral)

## 🔑 Configuration des clés API

### Étape 1 : Obtenir votre clé API

1. Allez sur https://accounts.clickbank.com/developer-api-keys
2. Connectez-vous avec votre compte ClickBank
3. Cliquez sur **"Create New Key"**
4. Copiez la clé générée (format : `API-XXXXXXXXXX`)

### Étape 2 : Configurer dans l'interface

1. Dans la section **"Identifiants API"** :
   - **Influenceur (UUID)** : Votre UUID utilisateur (optionnel, utilisé pour les HopLinks)
   - **Developer API Key** : Collez votre clé API

2. Cliquez sur **"Sauvegarder"**

> ⚠️ **Note** : Les clés sont stockées localement dans la session. Pour la production, migrez vers Supabase.

## 📊 Fonctionnalités disponibles

### 1. Résumé backend ClickBank (Vercel)

**Objectif** : Obtenir un résumé rapide des ventes et du chiffre d'affaires

**Utilisation** :
1. Sélectionnez une **Date de début** et une **Date de fin**
2. Cliquez sur **"Analyser la période"**

**Résultats affichés** :
- 📈 Nombre de ventes
- 💰 Chiffre d'affaires total (totalOrderAmount)
- 💵 Commissions (si disponibles)

**Endpoints utilisés** :
- `/api/clickbank/orders`
- `/api/clickbank/analytics`

---

### 2. Test de connexion API

**Objectif** : Vérifier que votre clé API fonctionne

**Utilisation** :
1. Assurez-vous d'avoir sauvegardé votre clé API
2. Cliquez sur **"Tester la connexion"**

**Résultats** :
- ✅ **Connexion réussie** : Affiche le JSON de la première page de commandes
- ❌ **Échec** : Affiche le message d'erreur

---

### 3. Requête ClickBank (exemple)

**Objectif** : Voir un exemple de requête cURL et sa réponse JSON

**Contenu** :
- Requête cURL complète (copiable)
- Réponse JSON type de l'API ClickBank
- Explication des paramètres

**Utilisation** : Référence pour comprendre le format des requêtes

---

### 4. Analytics vendor paramétrables

**Objectif** : Tester les requêtes analytics avec différents paramètres

**Utilisation** :
1. **Account (vendor)** : Nom du vendeur (ex: `freenzy`)
2. **Select (metrics)** : Métriques à récupérer (ex: `HOP_COUNT,SALE_COUNT`)
3. **Date de début** et **Date de fin**
4. Cliquez sur **"Lancer la requête"**

**Résultats** :
- cURL générée (pour référence)
- Résultat JSON complet

**Métriques disponibles** :
- `HOP_COUNT` : Nombre de clics
- `SALE_COUNT` : Nombre de ventes
- `REBILL_COUNT` : Nombre de rebills
- `REFUND_COUNT` : Nombre de remboursements
- `CHARGEBACK_COUNT` : Nombre de chargebacks
- `REVENUE` : Revenu total
- `COMMISSION` : Commission totale

---

### 5. Analytics par vendeur (live)

**Objectif** : Exécuter une requête analytics prédéfinie

**Utilisation** :
1. Cliquez sur **"Exécuter"**

**Paramètres fixes** :
- startDate : 2025-12-01
- endDate : 2025-12-11
- account : freenzy
- select : HOP_COUNT,SALE_COUNT
- role : AFFILIATE
- dimension : vendor

**Résultat** : JSON brut de la réponse ClickBank

---

### 6. Récupérer les ventes

**Objectif** : Obtenir la liste détaillée des commandes

**Utilisation** :
1. Remplissez les filtres (tous optionnels) :
   - **Date de début** et **Date de fin** (yyyy-mm-dd)
   - **Rôle** : `VENDOR` ou `AFFILIATE`
   - **Nickname vendeur** : ex: `freenzy`
   - **Type** : `SALE`, `RFND`, `CGBK`
   - **Tracking ID** : ID de suivi spécifique

2. Cliquez sur **"Récupérer les ventes"**

**Résultats** :
- Résumé des commandes (nombre, montant total, répartition)
- JSON brut complet

**Détails inclus** :
- Receipt (numéro de commande)
- Transaction time
- Product title
- Amount
- Customer info
- Tracking ID
- Et plus...

---

### 7. Statistiques de clics

**Objectif** : Obtenir les statistiques de clics par Tracking ID

**Utilisation** :
1. Remplissez les paramètres :
   - **Date de début** et **Date de fin**
   - **Tracking ID** (optionnel) : Filtrer par ID spécifique
   - **Dimension** : `vendor` ou `TRACKING_ID`
   - **Account (vendor)** : Requis si dimension = vendor
   - **Metrics (select)** : ex: `HOP_COUNT,SALE_COUNT`

2. Cliquez sur **"Récupérer les clics"**

**Résultats** :
- Nombre de Tracking IDs trouvés
- JSON détaillé avec métriques

---

### 8. Créer un lien d'affiliation

**Objectif** : Générer un HopLink ClickBank

**Utilisation** :
1. Remplissez les champs :
   - **Influenceur UUID** : Votre UUID (sera dans le HopLink)
   - **Nickname Vendeur** : ex: `produitx`
   - **Tracking ID** : ex: `campagne_fb_1`

2. Cliquez sur **"Créer le lien"**

**Résultat** :
- URL du HopLink : `https://[UUID].[VENDOR].hop.clickbank.net/?tid=[TID]`
- JSON complet avec détails du lien

**Format du lien** :
```
https://[INFLUENCEUR_UUID].[VENDOR_NICKNAME].hop.clickbank.net/?tid=[TRACKING_ID]
```

**Exemple** :
```
https://abc123.produitx.hop.clickbank.net/?tid=campagne_fb_1
```

---

### 9. Checklist de connexion

**Objectif** : Vérifier que tout est configuré correctement

**Étapes** :
1. ✅ Activez les API Keys depuis ClickBank
2. ✅ Autorisez l'IP de votre backend dans ClickBank
3. ✅ Planifiez une tâche CRON pour récupération automatique
4. ✅ Mappez les produits ClickBank vers vos produits internes

---

### 10. Statut d'intégration

**Objectif** : Vue d'ensemble de l'état de l'intégration

**Informations affichées** :
- **Dernier appel API** : État de la dernière connexion
- **Ventes importées** : Nombre de ventes récupérées
- **Remboursements** : État de synchronisation
- **Webhook** : État de configuration

**Badge** : `Sandbox` (environnement de test)

---

## 🎨 Interface utilisateur

### Sections principales

1. **En-tête**
   - Titre : "ClickBank"
   - Badge : "Nouveau"
   - Breadcrumb : "Connecteur partenaires"

2. **Identifiants API**
   - Formulaire de configuration
   - Lien vers création de clés

3. **Résumé backend**
   - Cartes avec métriques clés
   - Sélecteur de dates

4. **Tests et requêtes**
   - Formulaires interactifs
   - Affichage JSON brut
   - Exemples cURL

5. **Checklist et statut**
   - Suivi de configuration
   - État de l'intégration

### Codes couleur

- 🟢 **Vert** : Succès, connexion réussie
- 🔴 **Rouge** : Erreur, échec de connexion
- 🔵 **Bleu** : Information, état neutre
- 🟡 **Orange** : Avertissement, action requise

---

## 💡 Conseils d'utilisation

### Pour débuter

1. **Commencez par le test de connexion**
   - Vérifiez que votre clé API fonctionne
   - Examinez le JSON retourné

2. **Explorez les analytics**
   - Utilisez le playground pour comprendre les paramètres
   - Testez différentes métriques

3. **Récupérez vos premières ventes**
   - Commencez avec une plage de dates courte
   - Examinez les détails des commandes

### Pour la production

1. **Migrez vers un stockage sécurisé**
   - Utilisez Supabase pour stocker les clés
   - Ne stockez jamais les clés en clair dans le code

2. **Automatisez la synchronisation**
   - Configurez une tâche CRON
   - Récupérez régulièrement les nouvelles ventes

3. **Configurez les webhooks**
   - Recevez les notifications en temps réel
   - Mettez à jour automatiquement votre base de données

---

## 🐛 Dépannage

### Erreur "Veuillez entrer votre Developer API Key"

**Cause** : Clé API non configurée

**Solution** :
1. Allez dans la section "Identifiants API"
2. Collez votre clé
3. Cliquez sur "Sauvegarder"

### Erreur "Failed to fetch"

**Cause** : Le backend n'est pas accessible

**Solution** :
1. Vérifiez que le backend est en ligne : https://affiliate-rhonat-delta.vercel.app/api/clickbank/health
2. Redémarrez le serveur de développement : `npm run dev`

### Erreur 401 Unauthorized

**Cause** : Clé API invalide ou expirée

**Solution** :
1. Vérifiez le format : `API-XXXXXXXXXX`
2. Créez une nouvelle clé sur ClickBank
3. Mettez à jour la clé dans l'interface

### Aucune donnée retournée

**Cause** : Aucune vente dans la période sélectionnée

**Solution** :
1. Élargissez la plage de dates
2. Vérifiez les filtres (rôle, vendor, type)
3. Testez avec un compte ayant des ventes

---

## 📚 Ressources

- [Architecture ClickBank](./CLICKBANK_ARCHITECTURE.md)
- [Guide d'intégration](./CLICKBANK_INTEGRATION.md)
- [Documentation API ClickBank](https://api.clickbank.com/rest/1.3/)
- [Créer des clés API](https://accounts.clickbank.com/developer-api-keys)

---

**Dernière mise à jour** : 2025-12-15
