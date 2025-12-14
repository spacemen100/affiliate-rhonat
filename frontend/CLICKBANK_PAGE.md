# 📊 Page ClickBank Analytics

## ✅ Nouvelle Route Créée

Une nouvelle page **ClickBank Analytics** a été ajoutée au frontend pour afficher les données en temps réel depuis le backend ClickBank déployé.

## 🌐 Accès

**URL** : `http://localhost:5173/clickbank` (en local)

**Lien dans la sidebar** : 📊 ClickBank Analytics

## 📋 Fonctionnalités

### 1. **Cartes de Statistiques**

Affichage de 4 métriques clés :

- **Total Ventes** 💰 - Montant total des ventes
- **Commissions** 💵 - Total des commissions gagnées
- **Commandes** 📦 - Nombre total de commandes
- **Valeur Moyenne** 📈 - Valeur moyenne par commande

### 2. **Sélecteur de Période**

- Date de début et date de fin personnalisables
- Par défaut : 30 derniers jours
- Bouton "Appliquer" pour rafraîchir les données

### 3. **Tableau des Commandes Récentes**

Affiche les 10 dernières commandes avec :

- ID de commande
- Date
- Produit
- Montant
- Commission
- Statut (avec code couleur)

### 4. **Gestion des États**

- ✅ **Loading** : Spinner pendant le chargement
- ❌ **Error** : Message d'erreur avec possibilité de réessayer
- 📭 **No Data** : Message quand aucune donnée n'est disponible

## 🔌 Connexion au Backend

La page utilise les hooks React personnalisés :

- `useClickBankAnalytics(startDate, endDate)` - Pour les statistiques globales
- `useClickBankOrders(startDate, endDate)` - Pour la liste des commandes

Ces hooks appellent automatiquement le backend déployé : `https://affiliate-rhonat-ujyn.vercel.app`

## 🎨 Design

- **Cartes colorées** avec dégradés (vert, bleu, violet, orange)
- **Icônes SVG** pour chaque métrique
- **Tableau responsive** avec hover effects
- **Design moderne** avec Tailwind CSS

## 📱 Responsive

La page est entièrement responsive :

- **Desktop** : 4 colonnes pour les stats
- **Tablet** : 2 colonnes
- **Mobile** : 1 colonne

## 🚀 Utilisation

### 1. Démarrer le Frontend

```bash
cd frontend
npm run dev
```

### 2. Se Connecter

Aller sur `http://localhost:5173` et se connecter

### 3. Accéder à ClickBank Analytics

Cliquer sur **📊 ClickBank Analytics** dans la sidebar

ou

Aller directement sur `http://localhost:5173/clickbank`

## 🧪 Test

### Vérifier la Connexion au Backend

La page devrait automatiquement charger les données depuis :
`https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/analytics`
`https://affiliate-rhonat-ujyn.vercel.app/api/clickbank/orders`

### En Cas d'Erreur

Si tu vois un message d'erreur :

1. Vérifier que le backend est accessible
2. Vérifier que `.env.local` contient la bonne URL
3. Vérifier la console du navigateur (F12)

## 📊 Exemple de Données Affichées

```
┌─────────────────────────────────────────────────────────────┐
│  Total Ventes    │  Commissions  │  Commandes  │  Valeur Moy│
│    $12,450       │    $3,112     │     156     │   $79.81   │
└─────────────────────────────────────────────────────────────┘

Commandes Récentes
┌──────────┬────────────┬─────────────┬─────────┬───────────┬─────────┐
│ ID       │ Date       │ Produit     │ Montant │ Commission│ Statut  │
├──────────┼────────────┼─────────────┼─────────┼───────────┼─────────┤
│ CB12345  │ 14/12/2024 │ Product A   │ $97.00  │ $48.50    │ SALE    │
│ CB12346  │ 14/12/2024 │ Product B   │ $67.00  │ $33.50    │ SALE    │
└──────────┴────────────┴─────────────┴─────────┴───────────┴─────────┘
```

## 🔄 Actualisation

- **Bouton "Actualiser"** en haut à droite
- **Bouton "Appliquer"** après modification des dates
- **Auto-refresh** : Les données se rechargent automatiquement au changement de dates

## 📝 Fichiers Créés

1. **`frontend/src/pages/ClickBank.tsx`** - Page principale
2. **`frontend/src/App.tsx`** - Route ajoutée
3. **`frontend/src/components/Sidebar.tsx`** - Lien ajouté

## 🎯 Prochaines Améliorations Possibles

- [ ] Graphiques de tendances (Chart.js ou Recharts)
- [ ] Export des données en CSV
- [ ] Filtres avancés (par produit, par statut)
- [ ] Pagination pour les commandes
- [ ] Notifications en temps réel
- [ ] Comparaison de périodes

---

**🎉 La page est maintenant fonctionnelle et connectée au backend ClickBank !**

---

*Créé le : Décembre 2024*
