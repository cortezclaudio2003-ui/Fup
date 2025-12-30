document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA ATUAL NO BREADCRUMB
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        let dateString = today.toLocaleDateString('pt-BR', options);
        // Capitalizar primeira letra
        dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
        dateDisplay.textContent = dateString;
    }

    // 2. CONTROLE DE ABAS ATIVAS (Simulação para quando clicar nos links)
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const tabItems = document.querySelectorAll('.tab-item');

    tabItems.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');

        // Se estiver na página atual ou se for home vazia
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'dashboard.html')) {
            link.classList.add('active');
        }
    });

    // 3. ANIMAÇÃO DE CONTAGEM (KPIs)
    const counters = document.querySelectorAll('.card-value');
    if (counters.length > 0) {
        const speed = 50; // Aumentei um pouco a velocidade

        counters.forEach(counter => {
            const rawText = counter.innerText;
            const isCurrency = rawText.includes('R$');
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const currentVal = +counter.getAttribute('data-current') || 0;
                const inc = Math.ceil(target / speed);

                if (currentVal < target) {
                    const newVal = currentVal + inc;
                    counter.setAttribute('data-current', newVal);
                    
                    if (isCurrency) {
                        counter.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(newVal);
                    } else {
                        counter.innerText = newVal;
                    }
                    setTimeout(updateCount, 20);
                } else {
                    if (isCurrency) {
                        counter.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(target);
                    } else {
                        counter.innerText = target;
                    }
                }
            };
            updateCount();
        });
    }

    // 4. LOGOUT
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Deseja realmente sair?")) {
                window.location.href = 'index.html'; 
            }
        });
    }
});