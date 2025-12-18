// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a data
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        dateEl.textContent = new Date().toLocaleDateString('pt-BR', options);
    }

    // Pega o nome do usuário salvo no localStorage durante o login
    const userEl = document.getElementById('sidebar-user');
    const savedUser = localStorage.getItem('fup_user_name');
    if (userEl && savedUser) {
        userEl.textContent = savedUser;
    }
});