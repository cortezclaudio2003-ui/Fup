// Configurações de conexão com o Banco de Dados (Supabase)
const supabaseUrl = 'https://yhumhqwbllqljzztkkrl.supabase.co';
const supabaseKey = 'sb_publishable_cSr2_fWj8PgdFcsteEXDEQ__JdOU0jA';
const sb = supabase.createClient(supabaseUrl, supabaseKey);

// Função para realizar o Login
async function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const msg = document.getElementById('message');

    msg.innerText = "Verificando credenciais...";
    msg.style.color = "#0284c7";

    try {
        const { data, error } = await sb.auth.signInWithPassword({ email, password });
        if (error) {
            msg.innerText = "Acesso negado: " + error.message;
            msg.style.color = "#ef4444";
        } else {
            window.location.href = "dashboard.html"; // Redireciona para o painel
        }
    } catch (e) {
        msg.innerText = "Erro ao conectar com o servidor.";
    }
}

// Função para encerrar a sessão
async function handleLogout() {
    await sb.auth.signOut();
    window.location.href = "index.html"; // Volta para a página inicial
}

// Verifica se existe um usuário logado
async function checkUser() {
    const { data: { user } } = await sb.auth.getUser();
    return user;
}