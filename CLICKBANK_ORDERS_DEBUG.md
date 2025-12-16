# 🔍 Test ClickBank Orders API

## Problème
L'endpoint `/api/clickbank/orders` retourne une erreur 500.

## Tests à effectuer

### 1. Test basique (sans filtres)
```powershell
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/orders" `
  -Headers @{"Authorization"="API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"}
```

### 2. Test avec dates seulement
```powershell
Invoke-RestMethod -Uri "https://affiliate-rhonat-delta.vercel.app/api/clickbank/orders?startDate=2025-12-01&endDate=2025-12-16" `
  -Headers @{"Authorization"="API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"}
```

### 3. Test direct ClickBank API
```powershell
$headers = @{
  "Authorization" = "API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"
  "Accept"        = "application/json"
}

# Test endpoint orders2/list
Invoke-RestMethod -Method GET `
  -Uri "https://api.clickbank.com/rest/1.3/orders2/list?startDate=2025-12-01&endDate=2025-12-16" `
  -Headers $headers
```

## Solutions Possibles

### Option 1: L'endpoint orders2/list n'existe peut-être pas
ClickBank pourrait utiliser un endpoint différent pour les commandes.

### Option 2: Paramètres requis manquants
L'API pourrait nécessiter des paramètres obligatoires que nous n'envoyons pas.

### Option 3: Permissions insuffisantes
La clé API pourrait ne pas avoir accès à cet endpoint.

## Prochaines Étapes

1. Vérifier les logs Vercel pour voir l'erreur exacte
2. Tester directement l'API ClickBank
3. Consulter la documentation ClickBank pour l'endpoint correct
