document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const footer = document.getElementById('main-footer');
    const btnVoltar = document.getElementById('btn-voltar');
    const btnEnviar = document.getElementById('btn-enviar');
    
    // Navegação
    document.querySelectorAll('.option-row').forEach(opt => {
        opt.addEventListener('click', () => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            footer.classList.remove('hidden');
        });
    });

    btnVoltar.addEventListener('click', () => {
        step2.classList.add('hidden');
        footer.classList.add('hidden');
        step1.classList.remove('hidden');
    });

    btnEnviar.addEventListener('click', () => {
        btnEnviar.innerText = 'Salvando...';
        setTimeout(() => {
            alert('Contrato iniciado! Enviado para Aprovação.');
            window.location.href = 'transacoes.html';
        }, 800);
    });
});