document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const step1 = document.getElementById('step-1');
    const step2Cadastro = document.getElementById('step-2-cadastro');
    const step2Busca = document.getElementById('step-2-busca');
    const footer = document.getElementById('main-footer');
    
    const btnVoltar = document.getElementById('btn-voltar');
    const btnEnviar = document.getElementById('btn-enviar');
    const buscaTitulo = document.getElementById('busca-titulo');
    
    // Inputs
    const inputData = document.getElementById('data-criacao');
    const inputOrdem = document.getElementById('num-ordem');
    
    const options = document.querySelectorAll('.option-row');
    
    let tipoSelecionado = null;
    let proximoId = 1;

    // 1. Data Automática
    if(inputData) {
        inputData.value = new Date().toISOString().split('T')[0];
    }

    // 2. Número da Ordem (Simulado)
    if(inputOrdem) {
        const ultimoIdSalvo = localStorage.getItem('fup_last_order_id') || 0;
        proximoId = parseInt(ultimoIdSalvo) + 1;
        inputOrdem.value = `P - ${proximoId.toString().padStart(2, '0')}`;
    }

    // Navegação Passo 1 -> Passo 2
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            tipoSelecionado = opt.getAttribute('data-tipo');
            // Feedback visual rápido
            opt.style.borderColor = '#0065a3'; 
            setTimeout(() => { irParaPasso2(); }, 150);
        });
    });

    function irParaPasso2() {
        step1.classList.add('hidden');
        footer.classList.remove('hidden');

        if (tipoSelecionado === 'Cadastro') {
            step2Cadastro.classList.remove('hidden');
        } else {
            step2Busca.classList.remove('hidden');
            buscaTitulo.innerText = tipoSelecionado === 'Bloqueio' 
                ? 'Buscar Item para Bloqueio' 
                : 'Buscar Item para Alteração';
        }
    }

    btnVoltar.addEventListener('click', () => {
        step2Cadastro.classList.add('hidden');
        step2Busca.classList.add('hidden');
        footer.classList.add('hidden');
        step1.classList.remove('hidden');
        // Reseta estilos
        options.forEach(opt => opt.style.borderColor = '');
    });

    btnEnviar.addEventListener('click', () => {
        btnEnviar.innerText = 'Processando...';
        btnEnviar.disabled = true;

        setTimeout(() => {
            if (tipoSelecionado === 'Cadastro') {
                localStorage.setItem('fup_last_order_id', proximoId);
            }
            alert(`Solicitação de ${tipoSelecionado} (Ordem: P - ${proximoId.toString().padStart(2, '0')}) enviada com sucesso!`);
            window.location.href = 'cadastros.html';
        }, 800);
    });
    
    // Seleção na tabela de busca
    const resultItems = document.querySelectorAll('.result-row.item');
    resultItems.forEach(item => {
        item.addEventListener('click', () => {
            resultItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });
});