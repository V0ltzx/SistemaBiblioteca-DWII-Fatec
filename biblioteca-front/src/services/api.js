const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(caminho, opcoes = {}) {
  const token = localStorage.getItem('token');

  return fetch(`${BASE_URL}${caminho}`, {
    ...opcoes,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
      ...opcoes.headers,
    },
  });
}