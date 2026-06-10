/* ============================================================
   LOGIN — autenticación real contra el backend
   ============================================================ */
import { useState } from "react";
import { I, Logo } from "../icons.jsx";
import { api, auth } from "../api.js";

export default function Login({ onLogin, theme, toggleTheme }) {
  const [email, setEmail] = useState("ana.torres@orquesta.io");
  const [pass, setPass] = useState("orquesta");
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, pass);
      auth.save(data);
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión");
      setLoading(false);
    }
  };

  const ticker = [
    { t: "14:52:04", s: "crit", m: "Maersk recorta previsión · impacto 88" },
    { t: "14:52:01", s: "ok",   m: "75 vectores → qdrant:noticias" },
    { t: "14:51:40", s: "info", m: "Resumidor · lote de 12 en 3.4s" },
    { t: "14:51:22", s: "warn", m: "1 msg → dead-letter (timeout)" },
    { t: "14:51:05", s: "info", m: "EventBridge · 8 fuentes leídas" },
  ];
  const sc = { crit: "var(--crit)", ok: "var(--pos)", warn: "var(--neu)", info: "var(--text-faint)" };

  return (
    <div className="login-grid" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1.05fr 0.95fr" }}>
      {/* ---- panel de marca ---- */}
      <div className="grid-bg login-brand" style={{
        position: "relative", background: "var(--bg-sunken)", borderRight: "1px solid var(--border)",
        padding: "48px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 100% 0%, var(--accent-soft), transparent 55%)", opacity: 0.7, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}><Logo size={30} /></div>

        <div style={{ position: "relative", maxWidth: 460 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>// orquestador de eventos cloud + agentes ia</div>
          <h1 className="serif" style={{ fontSize: 46, lineHeight: 1.04, fontWeight: 500, letterSpacing: "-0.02em" }}>
            El mundo genera <em style={{ color: "var(--accent)", fontStyle: "italic" }}>miles de eventos</em> por hora.
            <br />Tú lees solo los que importan.
          </h1>
          <p style={{ marginTop: 18, fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 420 }}>
            Ingesta de RSS, traducción, resumen, análisis de sentimiento y alertas críticas. Orquestado en la nube, vigilado por agentes de IA.
          </p>

          {/* ticker en vivo */}
          <div className="card" style={{ marginTop: 30, padding: "12px 14px", background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} />
              <span className="eyebrow">pipeline en vivo</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {ticker.map((r, i) => (
                <div key={i} className="mono" style={{ display: "flex", gap: 10, fontSize: 11, alignItems: "baseline",
                  opacity: 0, animation: `fadeUp 0.5s var(--ease) ${0.3 + i * 0.12}s both` }}>
                  <span style={{ color: "var(--text-faint)" }}>{r.t}</span>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: sc[r.s], alignSelf: "center", flex: "none" }} />
                  <span style={{ color: r.s === "crit" ? "var(--crit)" : "var(--text-muted)" }}>{r.m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mono" style={{ position: "relative", fontSize: 10.5, color: "var(--text-faint)", display: "flex", gap: 20, flexWrap: "wrap" }}>
          <span>SQS · Pub/Sub · SNS</span><span>n8n · Gemini · Qdrant</span><span>PostgreSQL · Spring Boot</span>
        </div>
      </div>

      {/* ---- formulario ---- */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <button className="btn btn-ghost btn-icon btn-sm" onClick={toggleTheme}
          style={{ position: "absolute", top: 28, right: 28 }} title="Cambiar tema">
          {theme === "dark" ? <I.sun size={15} /> : <I.moon size={15} />}
        </button>

        <form onSubmit={submit} style={{ width: "100%", maxWidth: 360 }} className="fade-up">
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>Iniciar sesión</h2>
          <p style={{ color: "var(--text-muted)", marginTop: 6, marginBottom: 28, fontSize: 13.5 }}>Accede a tu panel de orquestación de eventos.</p>

          <label className="eyebrow" style={{ display: "block", marginBottom: 7 }}>correo</label>
          <div className={`login-field ${focus === "e" ? "on" : ""}`}>
            <I.user size={16} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocus("e")} onBlur={() => setFocus("")} placeholder="tu@empresa.com" />
          </div>

          <label className="eyebrow" style={{ display: "block", margin: "16px 0 7px" }}>contraseña</label>
          <div className={`login-field ${focus === "p" ? "on" : ""}`}>
            <I.lock size={16} />
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} onFocus={() => setFocus("p")} onBlur={() => setFocus("")} placeholder="••••••••" />
          </div>

          {error && (
            <div className="mono" style={{ marginTop: 14, fontSize: 11.5, color: "var(--crit)", display: "flex", alignItems: "center", gap: 6 }}>
              <I.bolt size={12} fill /> {error}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0 24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--text-muted)", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)", width: 15, height: 15 }} /> Recordarme
            </label>
            <a style={{ fontSize: 12.5, color: "var(--accent)", fontWeight: 600 }}>¿Olvidaste la contraseña?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", height: 44 }} disabled={loading}>
            {loading ? <><I.refresh size={16} className="spin" /> Verificando…</> : <>Entrar al panel <I.arrow size={16} /></>}
          </button>

          <p className="mono" style={{ textAlign: "center", marginTop: 26, fontSize: 10.5, color: "var(--text-faint)" }}>
            demo · ana.torres@orquesta.io · orquesta
          </p>
        </form>
      </div>
    </div>
  );
}
