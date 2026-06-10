/* ============================================================
   FUENTES RSS — datos de /api/fuentes
   ============================================================ */
import { useEffect, useState } from "react";
import { I } from "../icons.jsx";
import { StatTile } from "../components/ui.jsx";
import { api } from "../api.js";

function SourceRow({ f, onToggle }) {
  const salud = { ok: ["var(--pos)", "saludable"], lento: ["var(--neu)", "lento"], off: ["var(--text-faint)", "pausada"] }[f.salud] || ["var(--text-faint)", f.salud];
  return (
    <div className="source-row" style={{ display: "flex", alignItems: "center", gap: 16, padding: "15px 18px", borderBottom: "1px solid var(--border)", opacity: f.activa ? 1 : 0.6 }}>
      <button onClick={() => onToggle(f.id)} className={"switch" + (f.activa ? " on" : "")}><span /></button>
      <span style={{ flex: "none", width: 36, height: 36, borderRadius: 8, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}>
        <I.rss size={16} style={{ color: f.activa ? "var(--accent)" : "var(--text-faint)" }} />
      </span>
      <div style={{ minWidth: 190 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{f.nombre}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{f.url}</div>
      </div>
      <span className="badge" style={{ flex: "none" }}>{f.lang}</span>
      <div style={{ flex: 1, textAlign: "center", minWidth: 80 }}>
        <div className="mono" style={{ fontSize: 12, color: "var(--text-muted)" }}>cada {f.intervalo} min</div>
        <div className="eyebrow" style={{ fontSize: 8.5, marginTop: 2 }}>frecuencia</div>
      </div>
      <div style={{ textAlign: "right", minWidth: 64 }}>
        <div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{f.articulosHoy}</div>
        <div className="eyebrow" style={{ fontSize: 8.5 }}>hoy</div>
      </div>
      <div style={{ textAlign: "right", minWidth: 92 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span className={"dot" + (f.activa && f.salud !== "off" ? " pulse" : "")} style={{ background: salud[0], color: salud[0] }} />
          <span className="mono" style={{ fontSize: 11, color: salud[0] }}>{salud[1]}</span>
        </span>
        <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 3 }}>{f.ultimaLectura}</div>
      </div>
      <button className="btn-quiet btn-icon btn-sm" style={{ flex: "none" }}><I.settings size={15} /></button>
    </div>
  );
}

export default function Sources() {
  const [fuentes, setFuentes] = useState([]);
  const [nueva, setNueva] = useState("");

  useEffect(() => { api.fuentes().then(setFuentes).catch(() => {}); }, []);

  const toggle = async (id) => {
    setFuentes((fs) => fs.map((f) => f.id === id ? { ...f, activa: !f.activa, salud: !f.activa ? "ok" : "off", ultimaLectura: !f.activa ? "ahora" : "pausada" } : f));
    try { await api.toggleFuente(id); } catch { api.fuentes().then(setFuentes); }
  };

  const add = async (e) => {
    e.preventDefault();
    if (!nueva.trim()) return;
    try {
      const f = await api.addFuente(nueva.trim());
      setFuentes((fs) => [f, ...fs]);
      setNueva("");
    } catch { /* noop */ }
  };

  const activas = fuentes.filter((f) => f.activa).length;
  const total = fuentes.reduce((s, f) => s + f.articulosHoy, 0);

  return (
    <div className="fade-up" style={{ maxWidth: 1080 }}>
      <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
        <StatTile label="Fuentes activas" value={`${activas}/${fuentes.length}`} sub="RSS + Google Alerts" color="var(--accent)" icon={I.rss} />
        <StatTile label="Artículos hoy" value={total.toLocaleString("es")} sub="ingeridos a la cola" color="var(--pos)" icon={I.layers} />
        <StatTile label="Cron" value="EventBridge" sub="próx. lectura en 6 min" color="var(--neu)" icon={I.clock} />
      </div>

      <form onSubmit={add} className="card source-add" style={{ padding: 14, display: "flex", gap: 10, alignItems: "center", marginBottom: 18 }}>
        <I.plus size={16} style={{ color: "var(--accent)", marginLeft: 4, flex: "none" }} />
        <input value={nueva} onChange={(e) => setNueva(e.target.value)} placeholder="https://medio.com/feed.xml  ·  pega una URL de RSS para añadirla"
          style={{ flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "var(--text)", fontFamily: "var(--font-mono)" }} />
        <button type="submit" className="btn btn-primary btn-sm" disabled={!nueva.trim()}>Añadir fuente</button>
      </form>

      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <h2 style={{ fontSize: 15, fontWeight: 800 }}>Fuentes conectadas</h2>
          <span style={{ flex: 1 }} />
          <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>auto-refresco activo</span>
          <span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} />
        </div>
        {fuentes.map((f) => <SourceRow key={f.id} f={f} onToggle={toggle} />)}
      </div>
    </div>
  );
}
