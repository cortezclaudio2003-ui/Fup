document.addEventListener('DOMContentLoaded', async () => {
    // 1. Verificação de Segurança (Conexão Supabase)
    if (typeof sb === 'undefined') {
        console.error("Erro Crítico: SDK do Supabase não encontrado no auth.js");
        return;
    }

    // 2. Proteção de Rota: Valida se a conexão ainda está ativa 
    const { data: { user } } = await sb.auth.getUser(); [cite: 1]
    
    if (!user) {
        // Se a conexão falhar ou não houver usuário, redireciona para o login 
        window.location.href = "login.html"; [cite: 1]
        return;
    }

    // 3. Atualização da UI com Dados do Usuário
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        // Extrai a parte antes do @ para um ar mais amigável ou exibe o email completo
        const userName = user.email.split('@')[0];
        userDisplay.innerText = userName.charAt(0).toUpperCase() + userName.slice(1);
    }

    // 4. Formatação de Data Corporativa
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        // Exemplo: "quarta-feira, 17 de dezembro de 2025"
        const formattedDate = new Date().toLocaleDateString('pt-BR', options);
        dateEl.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    // 5. Interatividade dos Itens do Menu
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove classe ativa de todos e adiciona ao clicado
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});