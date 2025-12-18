document.addEventListener('DOMContentLoaded', async () => {
    const { data: { user } } = await sb.auth.getUser();
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userDisplay = document.getElementById('user-display');
    if (userDisplay) userDisplay.innerText = user.email;

    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', day: 'numeric', month: 'long' 
        });
    }
});