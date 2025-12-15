# Script de Test ClickBank API - Avec Account Nickname
# Ce script teste l'API ClickBank avec le format NICKNAME:API_KEY

Write-Host "Test de l'API ClickBank - Avec Account Nickname" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$ACCOUNT_NICKNAME = "FREENZY"
$API_KEY = "API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"
$BASE_URL = "https://api.clickbank.com"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  Account Nickname: $ACCOUNT_NICKNAME" -ForegroundColor Gray
Write-Host "  API_KEY: $($API_KEY.Substring(0, 15))..." -ForegroundColor Gray
Write-Host "  BASE_URL: $BASE_URL" -ForegroundColor Gray
Write-Host ""

# Test 1: Format NICKNAME:API_KEY en Basic Auth
Write-Host "Test 1: Format NICKNAME:API_KEY" -ForegroundColor Yellow
$credentials1 = "${ACCOUNT_NICKNAME}:${API_KEY}"
$bytes1 = [System.Text.Encoding]::UTF8.GetBytes($credentials1)
$encodedAuth1 = [System.Convert]::ToBase64String($bytes1)

Write-Host "  Credentials: $credentials1" -ForegroundColor Gray
Write-Host "  Encoded: $($encodedAuth1.Substring(0, 20))..." -ForegroundColor Gray

try {
    $headers1 = @{
        "Authorization" = "Basic $encodedAuth1"
        "Content-Type"  = "application/json"
    }
    
    $response1 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers1 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response1 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== LE FORMAT NICKNAME:API_KEY FONCTIONNE! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_DEV_KEY = $ACCOUNT_NICKNAME" -ForegroundColor White
    Write-Host "  CLICKBANK_API_KEY = $API_KEY" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 2: Format NICKNAME:API_KEY (sans prefixe API-)
Write-Host "Test 2: Format NICKNAME:API_KEY (sans prefixe)" -ForegroundColor Yellow
$API_KEY_NO_PREFIX = $API_KEY -replace '^API-', ''
$credentials2 = "${ACCOUNT_NICKNAME}:${API_KEY_NO_PREFIX}"
$bytes2 = [System.Text.Encoding]::UTF8.GetBytes($credentials2)
$encodedAuth2 = [System.Convert]::ToBase64String($bytes2)

Write-Host "  Credentials: $credentials2" -ForegroundColor Gray
Write-Host "  Encoded: $($encodedAuth2.Substring(0, 20))..." -ForegroundColor Gray

try {
    $headers2 = @{
        "Authorization" = "Basic $encodedAuth2"
        "Content-Type"  = "application/json"
    }
    
    $response2 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers2 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response2 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== LE FORMAT NICKNAME:KEY (sans prefixe) FONCTIONNE! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_DEV_KEY = $ACCOUNT_NICKNAME" -ForegroundColor White
    Write-Host "  CLICKBANK_API_KEY = $API_KEY_NO_PREFIX" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Format ClickBank-FREENZY:API_KEY
Write-Host "Test 3: Format ClickBank-FREENZY:API_KEY" -ForegroundColor Yellow
$FULL_NICKNAME = "ClickBank-FREENZY"
$credentials3 = "${FULL_NICKNAME}:${API_KEY}"
$bytes3 = [System.Text.Encoding]::UTF8.GetBytes($credentials3)
$encodedAuth3 = [System.Convert]::ToBase64String($bytes3)

Write-Host "  Credentials: $credentials3" -ForegroundColor Gray
Write-Host "  Encoded: $($encodedAuth3.Substring(0, 20))..." -ForegroundColor Gray

try {
    $headers3 = @{
        "Authorization" = "Basic $encodedAuth3"
        "Content-Type"  = "application/json"
    }
    
    $response3 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers3 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response3 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== LE FORMAT ClickBank-FREENZY:API_KEY FONCTIONNE! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_DEV_KEY = $FULL_NICKNAME" -ForegroundColor White
    Write-Host "  CLICKBANK_API_KEY = $API_KEY" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Format API_KEY:NICKNAME (inverse)
Write-Host "Test 4: Format API_KEY:NICKNAME (inverse)" -ForegroundColor Yellow
$credentials4 = "${API_KEY}:${ACCOUNT_NICKNAME}"
$bytes4 = [System.Text.Encoding]::UTF8.GetBytes($credentials4)
$encodedAuth4 = [System.Convert]::ToBase64String($bytes4)

Write-Host "  Credentials: $($credentials4.Substring(0, 30))..." -ForegroundColor Gray

try {
    $headers4 = @{
        "Authorization" = "Basic $encodedAuth4"
        "Content-Type"  = "application/json"
    }
    
    $response4 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers4 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response4 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "=== LE FORMAT API_KEY:NICKNAME FONCTIONNE! ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_DEV_KEY = $API_KEY" -ForegroundColor White
    Write-Host "  CLICKBANK_API_KEY = $ACCOUNT_NICKNAME" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Tous les tests ont echoue
Write-Host "========================================" -ForegroundColor Red
Write-Host "TOUS LES TESTS ONT ECHOUE" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""
Write-Host "Ni la cle API, ni le nickname FREENZY ne fonctionnent." -ForegroundColor Red
Write-Host ""
Write-Host "ACTIONS URGENTES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Verifiez dans votre compte ClickBank (image-4.png):" -ForegroundColor White
Write-Host "   - Le statut de la cle (Active/Inactive)" -ForegroundColor Gray
Write-Host "   - Les permissions de la cle" -ForegroundColor Gray
Write-Host "   - Les restrictions IP" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Verifiez votre Account Nickname ClickBank:" -ForegroundColor White
Write-Host "   - Est-ce bien 'FREENZY' ?" -ForegroundColor Gray
Write-Host "   - Ou est-ce 'ClickBank-FREENZY' ?" -ForegroundColor Gray
Write-Host "   - Ou un autre nom ?" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Contactez le support ClickBank:" -ForegroundColor White
Write-Host "   - Email: support@clickbank.com" -ForegroundColor Gray
Write-Host "   - Demandez: 'Comment authentifier avec l'API REST ?'" -ForegroundColor Gray
Write-Host "   - Mentionnez: 'Erreur 401 avec Developer API Key'" -ForegroundColor Gray
Write-Host ""
Write-Host "4. OU Creez une NOUVELLE cle API:" -ForegroundColor White
Write-Host "   - Allez dans Settings > API Keys" -ForegroundColor Gray
Write-Host "   - Cliquez sur 'Create New API Key'" -ForegroundColor Gray
Write-Host "   - Copiez la nouvelle cle immediatement" -ForegroundColor Gray

exit 1
