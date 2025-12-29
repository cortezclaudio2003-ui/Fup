document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DATA ATUAL NO HEADER
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        let dateString = today.toLocaleDateString('pt-BR', options);
        dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
        dateDisplay.textContent = dateString;
    }

    // 2. DETECÇÃO DE PÁGINA ATIVA (Menu Inteligente)
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');

        if (linkHref === currentPath || (currentPath === '' && linkHref === 'dashboard.html')) {
            link.classList.add('active');
        }
    });

    // 3. ANIMAÇÃO DE CONTAGEM (KPIs)
    const counters = document.querySelectorAll('.card-value');
    if (counters.length > 0) {
        const speed = 100;

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
                    setTimeout(updateCount, 15);
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
            alert("Sessão encerrada");
            window.location.href = 'index.html'; 
        });
    }
});