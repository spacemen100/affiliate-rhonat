# Script de configuration des variables d'environnement Vercel
# Pour l'intégration ClickBank

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Configuration Vercel - ClickBank" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Vercel CLI est installé
Write-Host "Vérification de Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
    Write-Host ""
    Write-Host "Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation de Vercel CLI" -ForegroundColor Red
        Write-Host "Veuillez l'installer manuellement: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Vercel CLI installé avec succès" -ForegroundColor Green
}
else {
    Write-Host "✅ Vercel CLI est déjà installé" -ForegroundColor Green
}

Write-Host ""
Write-Host "Connexion à Vercel..." -ForegroundColor Yellow
vercel login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Échec de la connexion à Vercel" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Configuration des Variables" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Demander les clés ClickBank
Write-Host "Entrez vos credentials ClickBank:" -ForegroundColor Yellow
Write-Host "(Vous pouvez les trouver dans votre compte ClickBank > Settings > API Keys)" -ForegroundColor Gray
Write-Host ""

$devKey = Read-Host "CLICKBANK_DEV_KEY"
$apiKey = Read-Host "CLICKBANK_API_KEY"

if ([string]::IsNullOrWhiteSpace($devKey) -or [string]::IsNullOrWhiteSpace($apiKey)) {
    Write-Host "❌ Les clés ne peuvent pas être vides" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Voulez-vous utiliser l'environnement sandbox pour les tests? (o/N)" -ForegroundColor Yellow
$useSandbox = Read-Host

$baseUrl = "https://api.clickbank.com"
if ($useSandbox -eq "o" -or $useSandbox -eq "O") {
    $baseUrl = "https://api.sandbox.clickbank.com"
    Write-Host "✅ Utilisation du sandbox" -ForegroundColor Green
}

Write-Host ""
Write-Host "URL de votre frontend (optionnel, appuyez sur Entrée pour '*'):" -ForegroundColor Yellow
$frontendUrl = Read-Host
if ([string]::IsNullOrWhiteSpace($frontendUrl)) {
    $frontendUrl = "*"
}

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Ajout des variables..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Fonction pour ajouter une variable d'environnement
function Add-VercelEnv {
    param (
        [string]$Name,
        [string]$Value
    )
    
    Write-Host "Ajout de $Name..." -ForegroundColor Yellow
    
    # Créer un fichier temporaire avec la valeur
    $tempFile = New-TemporaryFile
    Set-Content -Path $tempFile.FullName -Value $Value -NoNewline
    
    # Ajouter la variable pour tous les environnements
    $result = Get-Content $tempFile.FullName | vercel env add $Name production
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $Name ajouté pour production" -ForegroundColor Green
    }
    
    $result = Get-Content $tempFile.FullName | vercel env add $Name preview
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $Name ajouté pour preview" -ForegroundColor Green
    }
    
    $result = Get-Content $tempFile.FullName | vercel env add $Name development
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $Name ajouté pour development" -ForegroundColor Green
    }
    
    Remove-Item $tempFile.FullName
    Write-Host ""
}

# Ajouter les variables
Add-VercelEnv -Name "CLICKBANK_DEV_KEY" -Value $devKey
Add-VercelEnv -Name "CLICKBANK_API_KEY" -Value $apiKey
Add-VercelEnv -Name "CLICKBANK_BASE_URL" -Value $baseUrl
Add-VercelEnv -Name "FRONTEND_URL" -Value $frontendUrl

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Configuration terminée!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Les variables d'environnement ont été configurées." -ForegroundColor Green
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Redéployez votre application avec: vercel --prod" -ForegroundColor White
Write-Host "2. Ou attendez le redéploiement automatique depuis GitHub" -ForegroundColor White
Write-Host "3. Testez l'endpoint: https://votre-app.vercel.app/api/clickbank/health" -ForegroundColor White
Write-Host ""
Write-Host "Voulez-vous redéployer maintenant? (o/N)" -ForegroundColor Yellow
$deploy = Read-Host

if ($deploy -eq "o" -or $deploy -eq "O") {
    Write-Host ""
    Write-Host "Déploiement en cours..." -ForegroundColor Yellow
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Déploiement réussi!" -ForegroundColor Green
    }
    else {
        Write-Host ""
        Write-Host "❌ Échec du déploiement" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Terminé! 🎉" -ForegroundColor Green
