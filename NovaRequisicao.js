document.addEventListener('DOMContentLoaded', () => {
    console.log("Script NovaRequisicao carregado.");

    // --- ELEMENTOS DO DOM ---
    const btnOpenConfig = document.getElementById('btnOpenConfig');
    const modal = document.getElementById('configModal');
    const btnCloseIcon = document.getElementById('btnCloseIcon');
    const btnCloseBtn = document.getElementById('btnCloseBtn');
    const btnSave = document.querySelector('.btn-modal-save');
    
    // --- FUNÇÕES ---

    // Abrir Modal
    if (btnOpenConfig) {
        btnOpenConfig.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Fechar Modal
    const closeModal = () => {
        modal.classList.add('hidden');
    };

    // Eventos de Fechar
    if (btnCloseIcon) btnCloseIcon.addEventListener('click', closeModal);
    if (btnCloseBtn) btnCloseBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora do modal (overlay)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Botão Salvar
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            console.log("Configurações salvas!");
            closeModal();
        });
    }
});

function logout() {
    window.location.href = "login.html";
}