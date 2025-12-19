function logout() {
    window.location.href = "login.html";
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dashboard carregado.");
    
    // Toggle do Menu de Ações (3 pontinhos)
    const moreOptionsBtn = document.getElementById('moreOptionsBtn');
    const actionsMenu = document.getElementById('actionsMenu');

    if (moreOptionsBtn && actionsMenu) {
        moreOptionsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita fechar imediatamente
            actionsMenu.classList.toggle('show');
            moreOptionsBtn.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!actionsMenu.contains(e.target) && !moreOptionsBtn.contains(e.target)) {
                actionsMenu.classList.remove('show');
                moreOptionsBtn.classList.remove('active');
            }
        });
    }

    // Exemplo de interatividade nos filtros
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            console.log("Filtro clicado: " + pill.innerText);
        });
    });
});