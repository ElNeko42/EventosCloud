/* ============================================================
   ALERTAS CRÍTICAS — datos de /api/alertas
   ============================================================ */
import { useEffect, useState } from "react";
import { I } from "../icons.jsx";
import { SECTORS } from "../constants.js";
import { ImpactBar } from "../components/ui.jsx";
import { api } from "../api.js";

function AlertCard({ a, noticias, onOpen, i }) {
  const enviada = a.estado === "enviada";
  const sectorLabel = SECTORS[a.sector]?.label || a.sector;
  const canalIcon = (c) => c.includes("SMS") ? I.phone : I.mail;
  return (
    <div className="card fade-up" style={{ padding: 0, overflow: "hidden", animationDelay: `${i * 0.05}s`, opacity: enviada ? 1 : 0.66 }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: 4, background: enviada ? "var(--crit)" : "var(--text-faint)", flex: "none" }} />
        <div style={{ flex: 1, padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10, flexWrap: "wrap" }}>
            <span className="badge" style={{ background: enviada ? "color-mix(in oklch,var(--crit) 14%,transparent)" : "var(--surface-2)", color: enviada ? "var(--crit)" : "var(--text-muted)", borderColor: "transparent", fontWeight: 600 }}>
              <I.bolt size={10} fill /> {enviada ? "DISPARADA" : "DESCARTADA"}
            </span>
            <span className="badge badge-accent">{sectorLabel}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="eyebrow">impacto</span><ImpactBar v={a.impacto} w={48} />
            </span>
            <span style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{a.hora}</span>
          </div>

          <button onClick={() => { const n = noticias.find((x) => x.id === a.noticiaId); if (n) onOpen(n); }}
            className="serif alert-title" style={{ fontSize: 17, lineHeight: 1.25, fontWeight: 500, textAlign: "left", textWrap: "balance", padding: 0, display: "block" }}>
            {a.noticia}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>regla:</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{a.motivo}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
            {a.canal.map((c) => {
              const Ico = canalIcon(c);
              return <span key={c} className="badge" style={{ height: 24 }}><Ico size={11} style={{ color: enviada ? "var(--accent)" : "var(--text-faint)" }} /> {c}</span>;
            })}
            <span style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 11, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 5 }}>
              <I.user size={12} /> {a.destinatarios} destinatarios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Alerts({ noticias = [], onOpen }) {
  const [alertas, setAlertas] = useState([]);
  const [reglas, setReglas] = useState([]);

  useEffect(() => {
    api.alertas().then(setAlertas).catch(() => {});
    api.reglas().then(setReglas).catch(() => {});
  }, []);

  const toggle = async (id) => {
    setReglas((rs) => rs.map((r) => r.id === id ? { ...r, activa: !r.activa } : r));
    try { await api.toggleRegla(id); } catch { /* revert on error */ api.reglas().then(setReglas); }
  };
  const enviadas = alertas.filter((a) => a.estado === "enviada").length;

  return (
    <div className="fade-up split-main" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 22, alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Alertas críticas</h2>
          <span className="badge" style={{ background: "color-mix(in oklch,var(--crit) 12%,transparent)", color: "var(--crit)", borderColor: "transparent" }}>{enviadas} hoy</span>
          <span style={{ flex: 1 }} />
          <button className="btn btn-ghost btn-sm"><I.check size={14} /> Marcar leídas</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {alertas.map((a, i) => <AlertCard key={a.id} a={a} i={i} noticias={noticias} onOpen={onOpen} />)}
        </div>
      </div>

      <aside style={{ position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <I.filter size={15} style={{ color: "var(--accent)" }} />
            <span style={{ fontWeight: 800, fontSize: 14 }}>Reglas de disparo</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {reglas.map((r) => (
              <div key={r.id} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                <button onClick={() => toggle(r.id)} className={"switch" + (r.activa ? " on" : "")}><span /></button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: r.activa ? "var(--text)" : "var(--text-faint)" }}>{r.nombre}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--text-muted)", marginTop: 3, lineHeight: 1.4 }}>{r.cond}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
                    <I.arrow size={11} style={{ color: "var(--text-faint)" }} />
                    <span className="mono" style={{ fontSize: 10.5, color: r.activa ? "var(--accent)" : "var(--text-faint)" }}>{r.accion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ width: "100%", marginTop: 16 }}><I.plus size={14} /> Nueva regla</button>
        </div>

        <div className="card grid-bg" style={{ padding: 18 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>canales de salida</div>
          {[[I.mail, "Amazon SES", "Email + Newsletter", "var(--pos)"], [I.phone, "Amazon SNS", "SMS a directivos", "var(--pos)"]].map(([Ico, t, d, c], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none" }}>
              <span style={{ width: 30, height: 30, borderRadius: 7, background: "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                <Ico size={15} style={{ color: "var(--text-muted)" }} />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{d}</div>
              </div>
              <span className="dot pulse" style={{ background: c, color: c }} />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
