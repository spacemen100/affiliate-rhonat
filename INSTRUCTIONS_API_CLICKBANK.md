# 🔑 Instructions pour Configurer l'API ClickBank

## Ce que je vois dans votre image (image-4.png)

Vous avez une **Developer API Key** dans votre compte ClickBank.

## ⚠️ IMPORTANT - Information Manquante

Dans l'image que vous avez partagée, je peux voir qu'il y a une Developer API Key, mais **la clé complète n'est pas visible** dans la capture d'écran.

## 📋 Ce dont j'ai besoin

Pour vous aider à configurer correctement, j'ai besoin de voir :

### 1. La Developer API Key Complète

Dans votre compte ClickBank (image-4.png), vous devriez voir :
- **Developer API Key** : Une longue chaîne de caractères (généralement 40-50 caractères)
- Format possible : `DEV-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. Vérifier si vous avez aussi besoin d'une Clerk Key

Selon la documentation ClickBank, vous pourriez avoir besoin de :
- **Developer Key** (DEV-xxx...)
- **Clerk API Key** (pour un utilisateur API spécifique)

## 🎯 Actions à Faire MAINTENANT

### Étape 1 : Copier la Clé Complète

1. Dans votre compte ClickBank (la page de l'image-4.png)
2. Trouvez votre **Developer API Key**
3. Cliquez sur "Show" ou l'icône pour révéler la clé complète
4. **COPIEZ LA CLÉ ENTIÈRE** (elle devrait être très longue)

### Étape 2 : Vérifier le Format

Votre clé devrait ressembler à l'un de ces formats :

**Format A (Ancien - avec préfixe DEV-):**
```
DEV-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

**Format B (Nouveau - sans préfixe):**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

**Format C (Avec préfixe API-):**
```
API-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

### Étape 3 : Me Donner l'Information

Une fois que vous avez copié la clé, dites-moi :

1. **Le format de votre clé** (A, B, ou C ci-dessus)
2. **Les 10 premiers caractères** de votre clé (pour vérifier le format)
   - Exemple : Si votre clé est `DEV-abc123...`, dites-moi `DEV-abc123`
   - ⚠️ NE PARTAGEZ PAS LA CLÉ COMPLÈTE publiquement

### Étape 4 : Vérifier si vous avez une Clerk Key

Dans la même page ClickBank :
1. Cherchez une section "API Users" ou "Clerk Keys"
2. Si vous voyez une autre clé là-bas, notez-le

## 🔍 Ce que je vais faire ensuite

Une fois que vous me donnez ces informations, je vais :

1. ✅ Mettre à jour le script `test-clickbank-auth.ps1` avec le bon format
2. ✅ Vous guider pour tester localement
3. ✅ Vous donner les commandes exactes pour Vercel
4. ✅ Résoudre le problème 401 définitivement

## 📸 Alternative : Nouvelle Capture d'Écran

Si vous préférez, vous pouvez :

1. Prendre une nouvelle capture d'écran de votre page API ClickBank
2. **MASQUER** les 20 derniers caractères de la clé (pour la sécurité)
3. Mais **MONTRER** les 15-20 premiers caractères (pour que je voie le format)

Exemple de ce que je devrais voir :
```
Developer API Key: DEV-abc123def456ghi789... [MASQUÉ]
                   ^^^^^^^^^^^^^^^^^^^^^ (visible)
```

## ⏰ Prochaine Étape

**Dites-moi :**
1. Le format de votre Developer API Key (commence par quoi ?)
2. Les 10-15 premiers caractères
3. Si vous voyez une Clerk Key ou API User Key

Ensuite, je pourrai vous donner la solution exacte ! 🚀
