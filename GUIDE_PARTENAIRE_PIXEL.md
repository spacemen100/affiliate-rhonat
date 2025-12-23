# 🎯 Guide Partenaire - Pixel de Conversion Simplifié

## 🚀 3 Versions au Choix (de la plus simple à la plus avancée)

---

## ✨ VERSION 1 : AUTOMATIQUE (RECOMMANDÉ)

### 🎉 Le Plus Simple !

**Copier-coller le code, c'est TOUT !**

Aucune modification nécessaire, le pixel détecte automatiquement :
- ✅ L'ID de commande (dans l'URL ou la page)
- ✅ Le montant (dans l'URL ou la page)
- ✅ Génère un ID unique si rien n'est trouvé

### 📋 Ce que fait le code automatiquement

Le pixel cherche les informations dans cet ordre :

#### Pour l'ID de commande :
1. Dans l'URL : `?order_id=XXX` ou `?order=XXX` ou `?transaction_id=XXX`
2. Dans un élément avec `data-order-id`
3. Dans un élément avec la classe `.order-id`
4. Dans un élément avec l'ID `#order-id`
5. Si rien trouvé → Génère un ID unique

#### Pour le montant :
1. Dans l'URL : `?amount=XXX` ou `?total=XXX` ou `?price=XXX`
2. Dans un élément avec `data-amount`
3. Dans un élément avec la classe `.order-total`
4. Dans un élément avec l'ID `#order-total`
5. Dans un élément avec la classe `.total-amount`

### ✅ Exemples de Pages Compatibles

#### Exemple 1 : URL avec paramètres
```
https://monsite.com/merci?order_id=12345&amount=99.90
```
✅ **Fonctionne automatiquement !**

#### Exemple 2 : Page avec éléments HTML
```html
<div class="order-confirmation">
  <h1>Merci pour votre commande !</h1>
  <p class="order-id">Commande #12345</p>
  <p class="order-total">Total : 99,90€</p>
</div>
```
✅ **Fonctionne automatiquement !**

### 🔍 Vérification

Le pixel affiche des messages dans la console du navigateur :
```
🎯 Pixel de conversion Rhonat: { orderId: "12345", amount: 99.90 }
✅ Pixel Rhonat chargé
```

---

## 📋 VERSION 2 : SEMI-AUTOMATIQUE

### 🎯 Pour les Partenaires Organisés

**Ajouter 2 attributs HTML, c'est tout !**

### Comment faire ?

1. **Trouvez** l'élément qui affiche l'ID de commande
2. **Ajoutez** l'attribut `data-order-id="VOTRE_ID"`
3. **Trouvez** l'élément qui affiche le montant
4. **Ajoutez** l'attribut `data-amount="VOTRE_MONTANT"`
5. **Collez** le script (version 2)

### 📝 Exemple Avant/Après

#### ❌ Avant (sans attributs)
```html
<div class="confirmation">
  <p>Commande #12345</p>
  <p>Total : 99,90€</p>
</div>
```

#### ✅ Après (avec attributs)
```html
<div class="confirmation">
  <p data-order-id="12345">Commande #12345</p>
  <p data-amount="99.90">Total : 99,90€</p>
</div>
```

### 💡 Avantages

- Plus de contrôle que la version automatique
- Pas besoin de modifier le JavaScript
- Fonctionne même si la structure de la page change

---

## ⚙️ VERSION 3 : MANUELLE

### 🔧 Pour les Experts

**Contrôle total sur les valeurs envoyées**

### Comment faire ?

1. **Copiez** le code (version 3)
2. **Remplacez** `{{ORDER_ID}}` par votre ID de commande
3. **Remplacez** `{{AMOUNT}}` par le montant (nombre sans guillemets)
4. **Collez** sur votre page de confirmation

### 📝 Exemple

#### ❌ Avant (avec placeholders)
```javascript
var orderId = '{{ORDER_ID}}';
var amount = {{AMOUNT}};
```

#### ✅ Après (avec vraies valeurs)
```javascript
var orderId = 'ORD-2025-12345';
var amount = 99.90;
```

### ⚠️ Attention

- `orderId` : **AVEC** guillemets (c'est du texte)
- `amount` : **SANS** guillemets (c'est un nombre)

---

## 🤔 Quelle Version Choisir ?

### Choisissez la VERSION 1 (Automatique) si :
- ✅ Vous voulez la solution la plus simple
- ✅ Votre page de confirmation a une structure standard
- ✅ Vous ne voulez rien modifier dans le code

### Choisissez la VERSION 2 (Semi-automatique) si :
- ✅ Vous avez accès au HTML de votre page
- ✅ Vous voulez plus de contrôle
- ✅ Vous préférez indiquer explicitement où sont les infos

### Choisissez la VERSION 3 (Manuelle) si :
- ✅ Vous êtes développeur
- ✅ Vous voulez un contrôle total
- ✅ Vous générez la page dynamiquement (PHP, etc.)

---

## 📊 Comparaison Rapide

| Critère | Version 1 | Version 2 | Version 3 |
|---------|-----------|-----------|-----------|
| **Simplicité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Contrôle** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Modifications** | Aucune | 2 attributs | Code complet |
| **Fiabilité** | Très bonne | Excellente | Excellente |
| **Recommandé pour** | Débutants | Intermédiaires | Experts |

---

## 🆘 Problèmes Courants

### Le pixel ne détecte pas l'ID de commande

**Solution VERSION 1** :
- Vérifiez la console du navigateur
- Ajoutez l'ID dans l'URL : `?order_id=12345`
- Ou utilisez la VERSION 2 avec `data-order-id`

**Solution VERSION 2** :
- Vérifiez que l'attribut `data-order-id` est bien présent
- Vérifiez l'orthographe exacte

**Solution VERSION 3** :
- Vérifiez que vous avez bien remplacé `{{ORDER_ID}}`
- Vérifiez les guillemets

### Le pixel ne détecte pas le montant

**Solution VERSION 1** :
- Ajoutez le montant dans l'URL : `?amount=99.90`
- Ou utilisez la VERSION 2 avec `data-amount`

**Solution VERSION 2** :
- Vérifiez que l'attribut `data-amount` contient un nombre
- Format : `99.90` (point, pas virgule)

**Solution VERSION 3** :
- Vérifiez que vous avez bien remplacé `{{AMOUNT}}`
- Vérifiez qu'il n'y a PAS de guillemets autour du nombre

---

## 🎓 Exemples Complets

### Exemple 1 : Page PHP (VERSION 3)

```php
<!DOCTYPE html>
<html>
<head>
    <title>Merci !</title>
</head>
<body>
    <h1>Merci pour votre commande !</h1>
    <p>Commande #<?php echo $order_id; ?></p>
    <p>Total : <?php echo $total; ?>€</p>
    
    <!-- Pixel de conversion -->
    <script>
    (function() {
      var orderId = '<?php echo $order_id; ?>';
      var amount = <?php echo $total; ?>;
      
      var img = new Image(1, 1);
      img.src = 'https://votre-url.supabase.co/functions/v1/record-sale?order_id=' + orderId + '&amount=' + amount;
      img.style.display = 'none';
      document.body.appendChild(img);
    })();
    </script>
</body>
</html>
```

### Exemple 2 : Page HTML simple (VERSION 2)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Merci !</title>
</head>
<body>
    <h1>Merci pour votre commande !</h1>
    <p data-order-id="12345">Commande #12345</p>
    <p data-amount="99.90">Total : 99,90€</p>
    
    <!-- Pixel de conversion (VERSION 2) -->
    <script>
    (function() {
      var orderElement = document.querySelector('[data-order-id]');
      var amountElement = document.querySelector('[data-amount]');
      
      var orderId = orderElement ? orderElement.getAttribute('data-order-id') : 'ORD-' + Date.now();
      var amount = amountElement ? parseFloat(amountElement.getAttribute('data-amount')) : 0;
      
      var img = new Image(1, 1);
      img.src = 'https://votre-url.supabase.co/functions/v1/record-sale?order_id=' + orderId + '&amount=' + amount;
      img.style.display = 'none';
      document.body.appendChild(img);
    })();
    </script>
</body>
</html>
```

### Exemple 3 : URL avec paramètres (VERSION 1)

```
https://monsite.com/merci?order_id=12345&amount=99.90
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Merci !</title>
</head>
<body>
    <h1>Merci pour votre commande !</h1>
    
    <!-- Pixel de conversion (VERSION 1 - Automatique) -->
    <!-- Copier-coller tel quel, aucune modification ! -->
    <script id="rhonat-conversion-pixel">
    (function() {
      // Le code détecte automatiquement order_id et amount dans l'URL
      // Aucune modification nécessaire !
      
      // ... (code complet fourni par le générateur)
    })();
    </script>
</body>
</html>
```

---

## ✅ Checklist de Vérification

Avant de mettre en production :

- [ ] Le pixel est sur la page de **confirmation** (pas la page de paiement)
- [ ] L'utilisateur a **cliqué sur un lien d'affiliation** avant
- [ ] Le cookie `aff_link_id` est présent (vérifier dans DevTools)
- [ ] Le pixel se charge sans erreur (vérifier la console)
- [ ] Les informations sont correctes (vérifier dans la console)
- [ ] La conversion apparaît dans le dashboard `/conversions`

---

## 🎉 C'est Tout !

Choisissez la version qui vous convient le mieux et commencez à tracker vos conversions ! 🚀

**Questions ?** Consultez la documentation complète ou contactez le support.

---

**Version** : 2.0.0  
**Date** : 23 décembre 2025  
**Statut** : ✅ Production Ready
