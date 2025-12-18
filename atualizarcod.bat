@echo off
echo ==========================================
echo       SINCRONIZANDO SISTEMA FUP...
echo ==========================================
echo.

:: Tenta baixar atualizações do servidor primeiro para evitar conflitos
echo [1/3] Verificando atualizações no GitHub...
git pull origin main

echo.
echo [2/3] Adicionando novos arquivos...
git add .

:: O commit usa a data e hora atual no comentário 
echo [3/3] Criando pacote de atualização...
git commit -m "Update: UI Blue Light Style - %date% %time%" 

echo.
echo Tentando enviar para o GitHub...
git push origin main

echo.
echo ==========================================
echo       PROCESSO FINALIZADO.
echo       Verifique se houve erros acima.
echo ==========================================
pause