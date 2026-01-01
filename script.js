function mostrarTela(telaId, elementoClicado) {
    // Esconde todas as telas
    const telas = document.querySelectorAll('.tela');
    telas.forEach(tela => tela.classList.remove('active-tela'));

    // Tira o 'active' de todos os links do menu
    const linksMenu = document.querySelectorAll('nav ul li a');
    linksMenu.forEach(link => link.classList.remove('active'));

    // Mostra a tela certa
    const telaParaMostrar = document.getElementById(telaId);
    if (telaParaMostrar) {
        telaParaMostrar.classList.add('active-tela');
    }

    // Adiciona o 'active' no botão clicado
    if (elementoClicado) {
        elementoClicado.classList.add('active');
    }
}