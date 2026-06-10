/* ============================================================
   Cliente API — habla con el backend Spring Boot vía /api
   El token JWT se guarda en localStorage y se adjunta a cada
   petición. Vite hace proxy de /api a http://localhost:8080.
   ============================================================ */

const TOKEN_KEY = "orq_token";
const USER_KEY = "orq_user";

export const auth = {
  token: () => localStorage.getItem(TOKEN_KEY),
  user: () => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  },
  isAuthed: () => !!localStorage.getItem(TOKEN_KEY),
  save: ({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

async function request(method, path, body) {
  const headers = { "Content-Type": "application/json" };
  const token = auth.token();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    auth.clear();
    window.dispatchEvent(new CustomEvent("orq:unauthorized"));
    throw new Error("No autorizado");
  }
  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try { const j = await res.json(); msg = j.message || j.error || msg; } catch { /* noop */ }
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  login: (email, password) => request("POST", "/auth/login", { email, password }),
  noticias: () => request("GET", "/noticias"),
  noticia: (id) => request("GET", `/noticias/${id}`),
  fuentes: () => request("GET", "/fuentes"),
  addFuente: (url) => request("POST", "/fuentes", { url }),
  toggleFuente: (id) => request("PATCH", `/fuentes/${id}/toggle`),
  alertas: () => request("GET", "/alertas"),
  reglas: () => request("GET", "/alertas/reglas"),
  toggleRegla: (id) => request("PATCH", `/alertas/reglas/${id}/toggle`),
  pipeline: () => request("GET", "/pipeline"),
  chat: (pregunta) => request("POST", "/chat", { pregunta }),
};
