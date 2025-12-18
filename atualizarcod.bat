@echo off
title FUP - GitHub Sync
color 0b
echo ==========================================
echo       SINCRONIZANDO SISTEMA FUP
echo ==========================================
echo.

git remote set-url origin https://github.com/systemdevx/Fup.git

echo [1/3] Adicionando alteracoes...
git add .

echo [2/3] Criando commit...
git commit -m "UI Update: Blue/White Theme and Fixes"

echo [3/3] Enviando para o GitHub...
git push origin main

echo.
echo Processo Finalizado com sucesso!
pause