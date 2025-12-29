document.addEventListener('DOMContentLoaded', () => {
    // Filtros visuais (pílulas)
    const pills = document.querySelectorAll('.filter-pill');
    
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Simulação de ação de filtro
            console.log(`Filtrando por: ${pill.innerText}`);
        });
    });
});