# 📚 ClickBank Orders API - Corrections Basées sur la Documentation

## 📖 Documentation Consultée
`clickbanddocumentation.md` - Orders API officielle ClickBank

## ✅ Corrections Apportées

### 1. **Endpoint Confirmé**
- ✓ `/rest/1.3/orders2/list` est le bon endpoint

### 2. **Pagination via Headers**
Selon la documentation:
> "This method supports pagination, so if the second page of the next 100 items is required a **request header 'Page'** with value 2 will return them."

**Correction:**
```typescript
const headers: Record<string, string> = {};
if (options?.page) {
    headers['Page'] = String(options.page);
}

const response = await this.axiosInstance.get('/rest/1.3/orders2/list', {
    params,
    headers,  // ← Ajout du header Page
});
```

### 3. **Parsing de la Réponse Amélioré**
Selon la documentation, la réponse contient `orderData` qui peut être:
- Un tableau d'objets
- Un seul objet (si une seule commande)

**Correction:**
```typescript
let orders: any[] = [];

if (response.data) {
    if (Array.isArray(response.data.orderData)) {
        orders = response.data.orderData;
    } else if (response.data.orderData) {
        // Si c'est un seul objet, le mettre dans un tableau
        orders = [response.data.orderData];
    } else if (Array.isArray(response.data)) {
        orders = response.data;
    }
}
```

### 4. **Logs de Débogage Améliorés**
```typescript
console.log('[ClickBank Service] Orders response data keys:', Object.keys(response.data || {}));
console.log('[ClickBank Service] Parsed orders count:', orders.length);
console.error('[ClickBank Service] Error response:', error.response?.data);
console.error('[ClickBank Service] Error status:', error.response?.status);
```

## 📋 Paramètres Supportés (Confirmés par la Doc)

| Paramètre | Requis | Description |
|-----------|--------|-------------|
| `startDate` | Non | Date de début (yyyy-mm-dd) |
| `endDate` | Non | Date de fin (yyyy-mm-dd) |
| `role` | Non | VENDOR ou AFFILIATE |
| `type` | Non | SALE, RFND, CGBK, FEE, BILL, TEST_SALE, etc. |
| `affiliate` | Non | Nickname de l'affilié (supporte wildcard %) |
| `vendor` | Non | Nickname du vendeur (supporte wildcard %) |
| `tid` | Non | Tracking ID ou Promo Code |
| `email` | Non | Email du client (supporte wildcard %) |
| `lastName` | Non | Nom du client (supporte wildcard %) |
| `postalCode` | Non | Code postal (supporte wildcard %) |
| `item` | Non | Numéro d'item |
| `amount` | Non | Montant total de la transaction |

## 🔍 Structure de Réponse (Selon la Doc)

```xml
<orderData>
  <transactionTime>2025-12-16T...</transactionTime>
  <receipt>ABCD1234</receipt>
  <trackingId>my-tracking-id</trackingId>
  <paymentMethod>VISA</paymentMethod>
  <transactionType>SALE</transactionType>
  <totalOrderAmount>97.00</totalOrderAmount>
  <vendor>vendorname</vendor>
  <affiliate>affiliatename</affiliate>
  <currency>USD</currency>
  <email>customer@example.com</email>
  <role>AFFILIATE</role>
  <lineItemData>
    <itemNo>1</itemNo>
    <productTitle>Product Name</productTitle>
    <customerAmount>97.00</customerAmount>
    <recurring>false</recurring>
    ...
  </lineItemData>
</orderData>
```

## 🚀 Déploiement

- ✅ Changements committés
- ✅ Changements poussés sur GitHub
- ⏳ Vercel redéploie automatiquement (1-2 minutes)

## 🧪 Test Après Déploiement

### PowerShell Test
```powershell
$headers = @{
  "Authorization" = "API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"
  "Accept"        = "application/json"
}

Invoke-RestMethod -Method GET `
  -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/orders?startDate=2025-12-01&endDate=2025-12-16&role=AFFILIATE&type=SALE" `
  -Headers $headers
```

### Frontend Test
1. Rafraîchir le navigateur
2. Aller sur l'onglet "💰 Ventes & Commissions"
3. Cliquer sur "Récupérer les ventes"
4. Vérifier la console pour les logs détaillés

## 📝 Notes Importantes

### Codes de Statut
- `200` - Tous les résultats récupérés
- `206` - Résultats partiels (plus de résultats disponibles via pagination)
- `403` - Pas d'accès ou pas de contenu
- `500` - Erreur serveur

### Limite de Résultats
- **100 commandes maximum** par page
- Utiliser le header `Page` pour la pagination

### Dates par Défaut
Si aucune date n'est spécifiée:
- Par défaut: d'hier à aujourd'hui
- Les deux dates doivent être fournies ensemble

## 🔧 Prochaines Étapes

1. ⏳ Attendre le redéploiement Vercel
2. ⏳ Tester l'endpoint
3. ⏳ Vérifier les logs dans la console
4. ⏳ Ajuster si nécessaire selon les erreurs

---

**Dernière mise à jour:** 16 Décembre 2025, 21:26  
**Status:** ✅ Code corrigé selon la documentation officielle, en attente du déploiement
