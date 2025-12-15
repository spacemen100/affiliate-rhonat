# Script pour mettre à jour les URLs sur Vercel
# Usage: .\update-vercel-urls.ps1

Write-Host "=== Mise à Jour des URLs Vercel ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend: https://affiliate-rhonat-3c2b.vercel.app" -ForegroundColor Green
Write-Host "Backend ClickBank: https://affiliate-rhonat-delta.vercel.app" -ForegroundColor Green
Write-Host ""

# Vérifier Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "=== Étape 1: Mise à Jour du Frontend ===" -ForegroundColor Cyan
Write-Host ""

Set-Location "$PSScriptRoot\frontend"

Write-Host "Mise à jour de VITE_BASE_GO_URL..." -ForegroundColor Yellow
Write-Output "https://affiliate-rhonat-3c2b.vercel.app/go" | vercel env rm VITE_BASE_GO_URL production -y 2>$null
Write-Output "https://affiliate-rhonat-3c2b.vercel.app/go" | vercel env add VITE_BASE_GO_URL production

Write-Host "Mise à jour de VITE_API_URL..." -ForegroundColor Yellow
Write-Output "https://affiliate-rhonat-delta.vercel.app" | vercel env rm VITE_API_URL production -y 2>$null
Write-Output "https://affiliate-rhonat-delta.vercel.app" | vercel env add VITE_API_URL production

Write-Host ""
Write-Host "Variables Frontend mises à jour!" -ForegroundColor Green
Write-Host ""

Write-Host "=== Étape 2: Mise à Jour du Backend ClickBank ===" -ForegroundColor Cyan
Write-Host ""

Set-Location "$PSScriptRoot\backend-serverless"

Write-Host "Mise à jour de FRONTEND_URL..." -ForegroundColor Yellow
Write-Output "https://affiliate-rhonat-3c2b.vercel.app" | vercel env rm FRONTEND_URL production -y 2>$null
Write-Output "https://affiliate-rhonat-3c2b.vercel.app" | vercel env add FRONTEND_URL production

Write-Host ""
Write-Host "Variables Backend mises à jour!" -ForegroundColor Green
Write-Host ""

Write-Host "=== Étape 3: Redéploiement ===" -ForegroundColor Cyan
Write-Host ""

$deploy = Read-Host "Voulez-vous redéployer maintenant? (y/n)"
if ($deploy -eq "y") {
    Write-Host ""
    Write-Host "Redéploiement du Frontend..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\frontend"
    vercel --prod
    
    Write-Host ""
    Write-Host "Redéploiement du Backend..." -ForegroundColor Yellow
    Set-Location "$PSScriptRoot\backend-serverless"
    vercel --prod
    
    Write-Host ""
    Write-Host "Déploiements terminés!" -ForegroundColor Green
}
else {
    Write-Host ""
    Write-Host "N'oubliez pas de redéployer manuellement:" -ForegroundColor Yellow
    Write-Host "  cd frontend && vercel --prod" -ForegroundColor Gray
    Write-Host "  cd backend-serverless && vercel --prod" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=== Configuration Terminée ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "URLs Finales:" -ForegroundColor White
Write-Host "  Frontend: https://affiliate-rhonat-3c2b.vercel.app" -ForegroundColor Green
Write-Host "  Backend: https://affiliate-rhonat-delta.vercel.app" -ForegroundColor Green
Write-Host "  Liens: https://affiliate-rhonat-3c2b.vercel.app/go/CODE" -ForegroundColor Green
Write-Host ""
