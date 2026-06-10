/* ============================================================
   APP SHELL + ROUTER + AUTH
   ============================================================ */
import { useEffect, useState } from "react";
import { I, Logo } from "./icons.jsx";
import { api, auth } from "./api.js";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Chat from "./pages/Chat.jsx";
import Alerts from "./pages/Alerts.jsx";
import Pipeline from "./pages/Pipeline.jsx";
import Sources from "./pages/Sources.jsx";

const NAV = [
  { id: "feed",     label: "Feed",      icon: I.feed,  desc: "Eventos procesados" },
  { id: "chat",     label: "Chat RAG",  icon: I.chat,  desc: "Pregunta al archivo" },
  { id: "alertas",  label: "Alertas",   icon: I.bell,  desc: "Críticas y reglas", badge: 3 },
  { id: "pipeline", label: "Pipeline",  icon: I.flow,  desc: "Orquestador en vivo" },
  { id: "fuentes",  label: "Fuentes",   icon: I.rss,   desc: "RSS y cron" },
];

function Sidebar({ route, go, user, onLogout }) {
  const initials = (user?.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <nav className="sidebar">
      <div style={{ padding: "20px 18px 22px" }}><Logo size={28} /></div>

      <div style={{ padding: "0 12px", flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        <div className="eyebrow" style={{ padding: "8px 10px 6px" }}>navegación</div>
        {NAV.map((n) => (
          <button key={n.id} onClick={() => go(n.id)} className={"nav-item" + (route === n.id ? " on" : "")}>
            <n.icon size={17} />
            <span style={{ flex: 1, textAlign: "left" }}>{n.label}</span>
            {n.badge && <span className="nav-badge">{n.badge}</span>}
          </button>
        ))}

        <div className="eyebrow" style={{ padding: "18px 10px 6px" }}>estado del sistema</div>
        <div style={{ padding: "0 10px", display: "flex", flexDirection: "column", gap: 9 }}>
          {[["Orquestador", "var(--pos)", "operativo"], ["Cola ingest", "var(--accent)", "1.2k"], ["Agentes IA", "var(--pos)", "5/6"], ["Dead-letter", "var(--neu)", "17"]].map(([l, c, v]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <span className={"dot" + (l === "Orquestador" ? " pulse" : "")} style={{ background: c, color: c }} />
              <span style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>{l}</span>
              <span style={{ flex: 1 }} />
              <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-user">
        <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", color: "var(--on-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flex: "none" }}>{initials}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "Usuario"}</div>
          <div className="mono" style={{ fontSize: 9.5, color: "var(--text-faint)" }}>{user?.role || "—"} · pro</div>
        </div>
        <button className="btn-quiet btn-icon btn-sm" onClick={onLogout} title="Cerrar sesión"><I.logout size={15} /></button>
      </div>
    </nav>
  );
}

function Topbar({ route, theme, toggleTheme }) {
  const cur = NAV.find((n) => n.id === route) || NAV[0];
  return (
    <header className="topbar">
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <h1 style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>{cur.label}</h1>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>/ {cur.desc}</span>
        </div>
      </div>
      <span style={{ flex: 1 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="badge" style={{ height: 30, paddingInline: 11 }}>
          <span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} />
          <span style={{ color: "var(--text-muted)" }}>tiempo real</span>
        </span>
        <kbd className="kbd" style={{ height: 30, display: "inline-flex", alignItems: "center", gap: 5 }}><I.search size={12} /> ⌘K</kbd>
        <button className="btn btn-ghost btn-icon" onClick={toggleTheme} title="Cambiar tema">
          {theme === "dark" ? <I.sun size={16} /> : <I.moon size={16} />}
        </button>
      </div>
    </header>
  );
}

export default function App() {
  const [user, setUser] = useState(() => auth.user());
  const [authed, setAuthed] = useState(() => auth.isAuthed());
  const [route, setRoute] = useState(() => localStorage.getItem("orq_route") || "feed");
  const [detail, setDetail] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("orq_theme") || "light");
  const [noticias, setNoticias] = useState([]);

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("orq_theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("orq_route", route); }, [route]);

  // session expiry -> bounce to login
  useEffect(() => {
    const onUnauth = () => { setAuthed(false); setUser(null); };
    window.addEventListener("orq:unauthorized", onUnauth);
    return () => window.removeEventListener("orq:unauthorized", onUnauth);
  }, []);

  // load shared news once authenticated
  useEffect(() => {
    if (authed) api.noticias().then(setNoticias).catch(() => setNoticias([]));
  }, [authed]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const login = (u) => { setUser(u); setAuthed(true); };
  const logout = () => { auth.clear(); setAuthed(false); setUser(null); };
  const go = (r) => { setDetail(null); setRoute(r); window.scrollTo({ top: 0 }); };
  const openNews = (n) => { setDetail(n); window.scrollTo({ top: 0 }); };

  if (!authed) return <Login onLogin={login} theme={theme} toggleTheme={toggleTheme} />;

  let screen;
  if (detail) screen = <NewsDetail n={detail} noticias={noticias} onBack={() => setDetail(null)} onOpen={openNews} />;
  else if (route === "feed") screen = <Dashboard noticias={noticias} onOpen={openNews} />;
  else if (route === "chat") screen = <Chat noticias={noticias} onOpen={openNews} />;
  else if (route === "alertas") screen = <Alerts noticias={noticias} onOpen={openNews} />;
  else if (route === "pipeline") screen = <Pipeline />;
  else if (route === "fuentes") screen = <Sources />;

  return (
    <div className="app-shell">
      <Sidebar route={detail ? "feed" : route} go={go} user={user} onLogout={logout} />
      <div className="app-main">
        <Topbar route={detail ? "feed" : route} theme={theme} toggleTheme={toggleTheme} />
        <main className="app-content">{screen}</main>
      </div>
    </div>
  );
}
