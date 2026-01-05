document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o recarregamento da página

            const usuario = document.getElementById('usuario').value;
            const senha = document.getElementById('senha').value;

            // Simulação simples de validação
            if (usuario && senha) {
                
                // Feedback visual rápido no botão (opcional)
                const btn = loginForm.querySelector('button');
                const textoOriginal = btn.innerText;
                
                btn.innerText = 'Autenticando...';
                btn.style.opacity = '0.8';

                setTimeout(() => {
                    // Salva um "token" fictício para simular sessão iniciada
                    localStorage.setItem('vivara_user_token', 'logged_in');
                    localStorage.setItem('vivara_user_name', usuario);

                    // REDIRECIONA PARA O DASHBOARD
                    window.location.href = 'dashboard.html';
                }, 800); // Pequeno delay para parecer real

            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});