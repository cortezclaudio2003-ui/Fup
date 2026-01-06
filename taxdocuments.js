document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Toggle Menu Lateral
    const toggleBtn = document.getElementById('toggleSidebarBtn');
    const sidebar = document.getElementById('sidebarTax');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('closed');
        });
    }

    // 2. Accordion Menu
    const groupTitles = document.querySelectorAll('.group-title');
    groupTitles.forEach(title => {
        title.addEventListener('click', () => {
            const list = title.nextElementSibling;
            const arrow = title.querySelector('.arrow');
            if (list) {
                if (list.style.display !== 'none') {
                    list.style.display = 'none';
                    if (arrow) arrow.innerText = 'expand_more';
                } else {
                    list.style.display = 'block';
                    if (arrow) arrow.innerText = 'expand_less';
                }
            }
        });
    });

    // 3. Busca no Menu
    const sidebarSearchInput = document.querySelector('.sidebar-inner-search input');
    if (sidebarSearchInput) {
        sidebarSearchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            const itensMenu = document.querySelectorAll('.menu-group li');
            
            itensMenu.forEach(item => {
                const texto = item.innerText.toLowerCase();
                item.style.display = texto.includes(termo) ? '' : 'none';
            });

            // Se digitou algo, expande os grupos
            if (termo.length > 0) {
                document.querySelectorAll('.menu-group ul').forEach(ul => ul.style.display = 'block');
            }
        });
    }

    // 4. Carregar Dados Iniciais
    carregarDadosFicticios();

    // 5. Busca Principal (Filtra a Tabela)
    const mainSearchInput = document.querySelector('.erp-input-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', function() {
            const termo = this.value.toLowerCase();
            const linhas = document.querySelectorAll('#tabelaTaxBody tr');
            linhas.forEach(linha => {
                const texto = linha.innerText.toLowerCase();
                linha.style.display = texto.includes(termo) ? '' : 'none';
            });
        });
    }
});

// Dados mockados para simular o funcionamento
const dadosFicticios = [
    { id: '1020', tipo: 'NF', numero: '000.453.982', emissor: 'Dell Computadores Ltda', valor: 'R$ 15.450,00', status: 'Escriturado', data: '05/01/2026' },
    { id: '1021', tipo: 'DI', numero: '23/001589-7', emissor: 'Receita Federal / China Exp', valor: 'USD 45.000,00', status: 'Desembaraçado', data: '04/01/2026' },
    { id: '1022', tipo: 'Correios', numero: 'OJ987654321BR', emissor: 'Logística SP', valor: '-', status: 'Em Trânsito', data: '04/01/2026' },
    { id: '1023', tipo: 'NF', numero: '000.112.333', emissor: 'Kalunga Comércio', valor: 'R$ 890,50', status: 'Pendente', data: '03/01/2026' },
    { id: '1024', tipo: 'DI', numero: '23/001600-1', emissor: 'Receita Federal / USA Parts', valor: 'USD 12.300,00', status: 'Em Análise', data: '02/01/2026' },
];

function carregarDadosFicticios() {
    const tbody = document.getElementById('tabelaTaxBody');
    if(!tbody) return;

    tbody.innerHTML = '';

    dadosFicticios.forEach(d => {
        let badgeClass = '';
        let icon = '';
        
        // Estilização condicional simples
        if (d.tipo === 'NF') { badgeClass = 'badge-nf'; icon = 'receipt'; }
        else if (d.tipo === 'DI') { badgeClass = 'badge-di'; icon = 'local_shipping'; }
        else { badgeClass = 'badge-co'; icon = 'inventory_2'; }

        const html = `
            <tr>
                <td style="text-align:center;"><input type="checkbox"></td>
                <td>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span class="material-icons-outlined" style="font-size:18px; color:#777;">${icon}</span>
                        <span class="badge ${badgeClass}">${d.tipo}</span>
                    </div>
                </td>
                <td class="text-orange-link"><strong>${d.numero}</strong></td>
                <td>${d.emissor}</td>
                <td>${d.valor}</td>
                <td><span style="font-weight:600; color:#555;">${d.status}</span></td>
                <td style="color:#666;">${d.data}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', html);
    });
}

// Função chamada pelo clique no menu lateral para filtrar visualmente
window.filtrarTabela = function(tipo) {
    const termo = tipo.toLowerCase();
    const mainInput = document.querySelector('.erp-input-search');
    
    // Simplesmente joga o tipo no campo de busca e dispara o evento
    if(mainInput) {
        mainInput.value = tipo === 'Todos' ? '' : tipo;
        mainInput.dispatchEvent(new Event('input'));
    }
};