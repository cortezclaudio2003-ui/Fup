@echo off
[cite_start]title FUP - GitHub Sync [cite: 4]
color 0b
echo ==========================================
echo       SINCRONIZANDO SISTEMA FUP
echo ==========================================
echo.
[cite_start]git remote set-url origin https://github.com/systemdevx/Fup.git [cite: 4]

[cite_start]echo [1/3] Adicionando alteracoes... [cite: 4]
git add .
[cite_start]echo [2/3] Criando commit de atualizacao... [cite: 4]
git commit -m "Full System Upgrade: Dashboard and Auth Logic"

[cite_start]echo [3/3] Enviando para o GitHub... [cite: 4]
git push origin main

echo.
[cite_start]echo Processo Finalizado com sucesso! [cite: 4]
pause