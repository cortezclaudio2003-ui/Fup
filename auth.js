// Supabase
const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_PUBLIC_ANON_KEY';


const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);


async function handleLogin() {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const message = document.getElementById('message');


message.textContent = 'Verificando credenciais...';
message.style.color = '#38bdf8';


const { error } = await supabase.auth.signInWithPassword({
email,
password
});


if (error) {
message.textContent = 'Login inválido';
message.style.color = '#ef4444';
return;
}


window.location.href = 'dashboard.html';
}


async function requireAuth() {
const { data } = await supabase.auth.getUser();
if (!data.user) {
window.location.href = 'index.html';
}
}


async function logout() {
await supabase.auth.signOut();
window.location.href = 'index.html';
}