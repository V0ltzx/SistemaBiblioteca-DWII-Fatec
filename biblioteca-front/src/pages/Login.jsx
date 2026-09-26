// dentro da função que trata o submit do formulário
const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});
const data = await res.json();
localStorage.setItem('token', data.token);