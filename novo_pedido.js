document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const footer = document.getElementById('main-footer');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnEnviar = document.getElementById('btn-enviar');
    
    let tipoSelecionado = null;

    // Navegação Passo 1 -> 2
    document.querySelectorAll('.option-row').forEach(opt => {
        opt.addEventListener('click', () => {
            tipoSelecionado = opt.getAttribute('data-tipo');
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            footer.classList.remove('hidden');
        });
    });

    // Voltar
    btnVoltar.addEventListener('click', () => {
        step2.classList.add('hidden');
        footer.classList.add('hidden');
        step1.classList.remove('hidden');
    });

    // Enviar
    btnEnviar.addEventListener('click', () => {
        btnEnviar.innerText = 'Processando...';
        setTimeout(() => {
            alert('Pedido criado com sucesso!');
            window.location.href = 'transacoes.html';
        }, 800);
    });
});