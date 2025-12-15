# Script pour ajouter la variable VITE_BASE_GO_URL manquante
# Usage: .\add-missing-env-var.ps1

Write-Host "=== Ajout de la Variable Manquante VITE_BASE_GO_URL ===" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Vercel CLI est installé
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI n'est pas installé." -ForegroundColor Red
    Write-Host "Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "✅ Vercel CLI est installé" -ForegroundColor Green
Write-Host ""

# Demander l'URL de base
Write-Host "Quelle URL voulez-vous utiliser pour les liens affiliés?" -ForegroundColor Yellow
Write-Host ""
Write-Host "Options suggérées:" -ForegroundColor Gray
Write-Host "  1. https://affiliate-rhonat-ujyn.vercel.app/go (Production Vercel)" -ForegroundColor Gray
Write-Host "  2. http://localhost:5173/go (Développement local)" -ForegroundColor Gray
Write-Host "  3. Votre domaine personnalisé" -ForegroundColor Gray
Write-Host ""

$baseGoUrl = Read-Host "URL de base (ex: https://affiliate-rhonat-ujyn.vercel.app/go)"

if ([string]::IsNullOrWhiteSpace($baseGoUrl)) {
    $baseGoUrl = "https://affiliate-rhonat-ujyn.vercel.app/go"
    Write-Host "Utilisation de la valeur par défaut: $baseGoUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  VITE_BASE_GO_URL: $baseGoUrl" -ForegroundColor Gray
Write-Host ""

$confirm = Read-Host "Confirmer et ajouter sur Vercel? (y/n)"
if ($confirm -ne "y") {
    Write-Host "❌ Annulé" -ForegroundColor Red
    exit
}

# Se déplacer dans le dossier frontend
Set-Location "$PSScriptRoot\frontend"

Write-Host ""
Write-Host "🔐 Ajout de la variable sur Vercel..." -ForegroundColor Cyan

# Ajouter la variable pour tous les environnements
Write-Host "Ajout pour Production..." -ForegroundColor Yellow
Write-Output $baseGoUrl | vercel env add VITE_BASE_GO_URL production

Write-Host "Ajout pour Preview..." -ForegroundColor Yellow
Write-Output $baseGoUrl | vercel env add VITE_BASE_GO_URL preview

Write-Host "Ajout pour Development..." -ForegroundColor Yellow
Write-Output $baseGoUrl | vercel env add VITE_BASE_GO_URL development

Write-Host ""
Write-Host "✅ Variable ajoutée pour tous les environnements!" -ForegroundColor Green
Write-Host ""

# Demander si on doit redéployer
$deploy = Read-Host "Voulez-vous redéployer le frontend maintenant? (y/n)"
if ($deploy -eq "y") {
    Write-Host ""
    Write-Host "🚀 Déploiement en cours..." -ForegroundColor Cyan
    vercel --prod
    
    Write-Host ""
    Write-Host "✅ Déploiement terminé!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Les liens affiliés utiliseront maintenant: $baseGoUrl" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "N'oubliez pas de redéployer pour que les changements prennent effet:" -ForegroundColor Yellow
    Write-Host "cd frontend && vercel --prod" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Configuration terminée ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Note: La variable a également été ajoutée à frontend/.env.example" -ForegroundColor Gray
