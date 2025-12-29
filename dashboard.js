document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Exibir Data Atual no formato corporativo
    const dateDisplay = document.getElementById('date-display');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    
    // Capitalizar a primeira letra do dia
    let dateString = today.toLocaleDateString('pt-BR', options);
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    dateDisplay.textContent = dateString;

    // 2. Animação de contagem dos números (Efeito de carregamento de dados)
    const counters = document.querySelectorAll('.card-value');
    const speed = 200; // Quanto menor, mais rápido

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/\D/g, ''); // Remove formatação para cálculo
            
            // Incremento suave
            const inc = target / speed;

            if (count < target) {
                // Formatação condicional
                let displayValue = Math.ceil(count + inc);
                
                // Se o target for o valor monetário grande
                if(target > 1000000) {
                     counter.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(displayValue);
                } else {
                     counter.innerText = displayValue;
                }
                
                setTimeout(updateCount, 15);
            } else {
                // Valor final exato com formatação
                if(target > 1000000) {
                     counter.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(target);
                } else {
                     counter.innerText = target;
                }
            }
        };

        updateCount();
    });

    // 3. Simulação de interação no menu (Apenas visual)
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active de todos
            menuItems.forEach(i => i.classList.remove('active'));
            // Adiciona no clicado
            item.classList.add('active');
        });
    });
});