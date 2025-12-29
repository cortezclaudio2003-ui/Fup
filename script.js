document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const userDisplay = document.getElementById('user-display');
    const logoutBtn = document.getElementById('logout-btn');

    // Função de Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const user = usernameInput.value.trim();

        if (user === "") {
            // Feedback visual sutil de erro (balançar ou borda vermelha)
            usernameInput.style.borderColor = "#ef4444"; // Vermelho
            usernameInput.placeholder = "Identificação obrigatória";
            return;
        }

        // Simulação de autenticação bem-sucedida
        // 1. Atualiza o nome no dashboard
        userDisplay.textContent = user;

        // 2. Transição suave (ocultar login, mostrar dashboard)
        loginView.style.opacity = '0';
        
        setTimeout(() => {
            loginView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
            
            // Pequena animação de entrada para o dashboard
            dashboardView.style.opacity = '0';
            setTimeout(() => {
                dashboardView.style.transition = 'opacity 0.5s ease';
                dashboardView.style.opacity = '1';
            }, 50);
            
        }, 300); // Tempo igual à transição CSS padrão
    });

    // Resetar estilo de erro ao digitar
    usernameInput.addEventListener('input', () => {
        usernameInput.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });

    // Função de Logout (apenas para teste)
    logoutBtn.addEventListener('click', () => {
        location.reload(); // Recarrega a página para voltar ao início
    });
});