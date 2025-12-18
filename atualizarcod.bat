@echo off
title Atualizador FUP - GitHub
echo ==========================================
echo       SISTEMA FUP - SINCRONIZACAO
echo ==========================================
echo.

:: Configura o repositório remoto caso ele tenha se perdido
git remote set-url origin https://github.com/systemdevx/Fup.git

echo [1/4] Puxando mudancas do GitHub (Pull)...
:: O pull evita o erro de "atualizacao rejeitada"
git pull origin main --rebase

echo.
echo [2/4] Preparando arquivos...
git add .

echo.
echo [3/4] Criando registro de alteracao (Commit)...
:: Usa a data e hora para identificar a versao
git commit -m "Auto-update: %date% %time%"

echo.
echo [4/4] Enviando para: https://github.com/systemdevx/Fup.git
git push origin main

echo.
echo ==========================================
echo       PROCESSO CONCLUIDO!
echo ==========================================
pause