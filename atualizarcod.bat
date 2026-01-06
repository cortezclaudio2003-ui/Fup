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

echo.
set /p commitmsg="Digite a mensagem do commit (ou ENTER para padrao): "
if "%commitmsg%"=="" set commitmsg=Atualizacao de arquivos do sistema (Asset Page)

echo [2/3] Criando commit: "%commitmsg%"...
git commit -m "%commitmsg%"

echo [3/3] Enviando para o GitHub...
git push origin main

echo.
echo Processo Finalizado com sucesso!
pause