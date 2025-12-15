# Script de Test ClickBank API - Format API-
# Ce script teste l'API ClickBank avec le format API-

Write-Host "Test de l'API ClickBank - Format API-" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration - REMPLACEZ PAR VOTRE CLE COMPLETE
$FULL_API_KEY = "API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT"
$BASE_URL = "https://api.clickbank.com"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "  API_KEY: $($FULL_API_KEY.Substring(0, 15))..." -ForegroundColor Gray
Write-Host "  BASE_URL: $BASE_URL" -ForegroundColor Gray
Write-Host ""

# Test 1: Format API-KEY seul (comme Authorization header)
Write-Host "Test 1: Format API-KEY seul" -ForegroundColor Yellow
try {
    $headers1 = @{
        "Authorization" = $FULL_API_KEY
        "Content-Type"  = "application/json"
    }
    
    $response1 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers1 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response1 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le format API-KEY seul fonctionne!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_API_KEY = $FULL_API_KEY" -ForegroundColor White
    Write-Host "  CLICKBANK_DEV_KEY = $FULL_API_KEY" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 2: Format Basic Auth avec API-KEY
Write-Host "Test 2: Format Basic Auth avec API-KEY" -ForegroundColor Yellow
$bytes2 = [System.Text.Encoding]::UTF8.GetBytes($FULL_API_KEY)
$encodedAuth2 = [System.Convert]::ToBase64String($bytes2)

try {
    $headers2 = @{
        "Authorization" = "Basic $encodedAuth2"
        "Content-Type"  = "application/json"
    }
    
    $response2 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers2 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response2 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le format Basic Auth avec API-KEY fonctionne!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_API_KEY = $FULL_API_KEY" -ForegroundColor White
    Write-Host "  CLICKBANK_DEV_KEY = $FULL_API_KEY" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 3: Format API-KEY:API-KEY en Basic Auth
Write-Host "Test 3: Format API-KEY:API-KEY en Basic Auth" -ForegroundColor Yellow
$credentials3 = "${FULL_API_KEY}:${FULL_API_KEY}"
$bytes3 = [System.Text.Encoding]::UTF8.GetBytes($credentials3)
$encodedAuth3 = [System.Convert]::ToBase64String($bytes3)

try {
    $headers3 = @{
        "Authorization" = "Basic $encodedAuth3"
        "Content-Type"  = "application/json"
    }
    
    $response3 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers3 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response3 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le format API-KEY:API-KEY fonctionne!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_API_KEY = $FULL_API_KEY" -ForegroundColor White
    Write-Host "  CLICKBANK_DEV_KEY = $FULL_API_KEY" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Test 4: Retirer le prefixe API- et utiliser la cle sans prefixe
Write-Host "Test 4: Format sans prefixe API- en Basic Auth" -ForegroundColor Yellow
$KEY_WITHOUT_PREFIX = $FULL_API_KEY -replace '^API-', ''
$bytes4 = [System.Text.Encoding]::UTF8.GetBytes($KEY_WITHOUT_PREFIX)
$encodedAuth4 = [System.Convert]::ToBase64String($bytes4)

Write-Host "  Cle sans prefixe: $($KEY_WITHOUT_PREFIX.Substring(0, 15))..." -ForegroundColor Gray

try {
    $headers4 = @{
        "Authorization" = "Basic $encodedAuth4"
        "Content-Type"  = "application/json"
    }
    
    $response4 = Invoke-RestMethod -Uri "$BASE_URL/rest/1.3/products/listings" -Headers $headers4 -Method Get -TimeoutSec 30
    Write-Host "  SUCCES!" -ForegroundColor Green
    Write-Host "  Reponse: $($response4 | ConvertTo-Json -Depth 1 -Compress)" -ForegroundColor Green
    Write-Host ""
    Write-Host "Le format sans prefixe fonctionne!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Action a faire sur Vercel:" -ForegroundColor Cyan
    Write-Host "  CLICKBANK_API_KEY = $KEY_WITHOUT_PREFIX" -ForegroundColor White
    Write-Host "  CLICKBANK_DEV_KEY = $KEY_WITHOUT_PREFIX" -ForegroundColor White
    exit 0
}
catch {
    Write-Host "  ECHEC" -ForegroundColor Red
    Write-Host "  Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# Tous les tests ont echoue
Write-Host "TOUS LES TESTS ONT ECHOUE" -ForegroundColor Red
Write-Host ""
Write-Host "La cle API-KM27URMQL9C2275OIUEIX7FBMX4NHIM6VCHT n'est pas valide" -ForegroundColor Red
Write-Host ""
Write-Host "Verifications a faire:" -ForegroundColor Yellow
Write-Host "  1. Verifiez que c'est bien la cle complete de votre compte ClickBank" -ForegroundColor White
Write-Host "  2. Copiez la cle EXACTE depuis votre compte (cliquez sur Show/Reveal)" -ForegroundColor White
Write-Host "  3. Verifiez qu'il n'y a pas de restrictions IP sur votre compte" -ForegroundColor White
Write-Host "  4. Verifiez que votre compte ClickBank est actif" -ForegroundColor White
Write-Host ""
Write-Host "Si la cle dans votre compte est DIFFERENTE:" -ForegroundColor Yellow
Write-Host "  1. Editez ce fichier (test-clickbank-auth.ps1)" -ForegroundColor White
Write-Host "  2. Ligne 8: Remplacez par votre VRAIE cle" -ForegroundColor White
Write-Host "  3. Executez a nouveau: .\test-clickbank-auth.ps1" -ForegroundColor White

exit 1
