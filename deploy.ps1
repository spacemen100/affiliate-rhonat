#!/usr/bin/env pwsh
# Script de déploiement automatique pour Windows PowerShell

Write-Host "🚀 Déploiement de l'application ClickBank" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si Vercel CLI est installé
Write-Host "📦 Vérification de Vercel CLI..." -ForegroundColor Yellow
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI n'est pas installé" -ForegroundColor Red
    Write-Host "📥 Installation de Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation de Vercel CLI" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Vercel CLI installé" -ForegroundColor Green
Write-Host ""

# Demander le mode de déploiement
Write-Host "🎯 Que voulez-vous déployer ?" -ForegroundColor Cyan
Write-Host "1. Backend seulement"
Write-Host "2. Frontend seulement"
Write-Host "3. Backend + Frontend (complet)"
Write-Host ""
$choice = Read-Host "Votre choix (1/2/3)"

# Fonction pour déployer le backend
function Deploy-Backend {
    Write-Host ""
    Write-Host "🔧 Déploiement du Backend..." -ForegroundColor Cyan
    Write-Host "=============================" -ForegroundColor Cyan
    
    Set-Location backend-serverless
    
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation des dépendances" -ForegroundColor Red
        Set-Location ..
        return $false
    }
    
    Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Yellow
    vercel --prod
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec du déploiement" -ForegroundColor Red
        Set-Location ..
        return $false
    }
    
    Write-Host "✅ Backend déployé avec succès !" -ForegroundColor Green
    Set-Location ..
    return $true
}

# Fonction pour déployer le frontend
function Deploy-Frontend {
    Write-Host ""
    Write-Host "🎨 Déploiement du Frontend..." -ForegroundColor Cyan
    Write-Host "==============================" -ForegroundColor Cyan
    
    Set-Location frontend
    
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec de l'installation des dépendances" -ForegroundColor Red
        Set-Location ..
        return $false
    }
    
    Write-Host "🚀 Déploiement sur Vercel..." -ForegroundColor Yellow
    vercel --prod
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Échec du déploiement" -ForegroundColor Red
        Set-Location ..
        return $false
    }
    
    Write-Host "✅ Frontend déployé avec succès !" -ForegroundColor Green
    Set-Location ..
    return $true
}

# Exécuter selon le choix
$success = $true

switch ($choice) {
    "1" {
        $success = Deploy-Backend
    }
    "2" {
        $success = Deploy-Frontend
    }
    "3" {
        $backendSuccess = Deploy-Backend
        if ($backendSuccess) {
            Write-Host ""
            Write-Host "⏳ Attente de 5 secondes avant de déployer le frontend..." -ForegroundColor Yellow
            Start-Sleep -Seconds 5
            $frontendSuccess = Deploy-Frontend
            $success = $backendSuccess -and $frontendSuccess
        } else {
            $success = $false
        }
    }
    default {
        Write-Host "❌ Choix invalide" -ForegroundColor Red
        exit 1
    }
}

# Résumé final
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
if ($success) {
    Write-Host "🎉 Déploiement terminé avec succès !" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Prochaines étapes :" -ForegroundColor Yellow
    Write-Host "1. Vérifier les URLs de déploiement ci-dessus"
    Write-Host "2. Configurer les variables d'environnement si nécessaire"
    Write-Host "3. Tester l'application en production"
    Write-Host ""
    Write-Host "📚 Documentation :" -ForegroundColor Cyan
    Write-Host "- DEPLOY_CHECKLIST.md : Checklist complète"
    Write-Host "- PRODUCTION_DEPLOYMENT.md : Guide détaillé"
    Write-Host "- DEPLOY_QUICK.md : Commandes rapides"
} else {
    Write-Host "❌ Le déploiement a échoué" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔍 Vérifiez :" -ForegroundColor Yellow
    Write-Host "1. Que vous êtes connecté à Vercel (vercel login)"
    Write-Host "2. Les logs d'erreur ci-dessus"
    Write-Host "3. Que les dépendances sont correctement installées"
    Write-Host ""
    Write-Host "📚 Consultez PRODUCTION_DEPLOYMENT.md pour plus d'aide"
}
Write-Host "==========================================" -ForegroundColor Cyan
