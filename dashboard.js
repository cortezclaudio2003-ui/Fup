document.addEventListener('DOMContentLoaded', async () => {
    [cite_start]// 1. Verifica se o usuário está logado [cite: 2]
    const user = await checkUser();
    
    if (user) {
        [cite_start]// Formata o nome de exibição baseado no e-mail [cite: 2]
        const userName = user.email.split('@')[0];
        document.getElementById('welcome').innerText = `Olá, ${userName.toUpperCase()}`;
    } else {
        [cite_start]// Se não houver usuário, volta para o login [cite: 2]
        window.location.href = "login.html";
    }

    [cite_start]// 2. Atualiza a data atual no topo [cite: 2]
    const dateEl = document.getElementById('date');
    if (dateEl) {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        dateEl.innerText = new Date().toLocaleDateString('pt-BR', options);
    }
});