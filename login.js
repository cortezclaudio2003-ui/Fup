document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.querySelector('.btn-login');
    btn.innerText = "Verificando...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Autenticado com sucesso no ecossistema Fup!");
        // window.location.href = "home.html";
    }, 1500);
});