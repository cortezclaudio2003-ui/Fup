document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Atualizar Data no Topo
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let dateStr = now.toLocaleDateString('pt-BR', options);
        dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1); // Capitalizar
        dateEl.textContent = dateStr;
    }

    // 2. Navegação do Menu (Active State)
    const links = document.querySelectorAll('.menu-items a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.getAttribute('href') === '#') e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 3. Nome do Usuário
    const userEl = document.getElementById('sidebar-user');
    const savedUser = localStorage.getItem('fup_user_name');
    if (userEl && savedUser) userEl.textContent = savedUser;
});