/* ============================================================
   DETALLE DE NOTICIA
   ============================================================ */
import { I } from "../icons.jsx";
import { SECTORS } from "../constants.js";
import { SentBadge, ImgSlot } from "../components/ui.jsx";

function Gauge({ v, label }) {
  const color = v >= 85 ? "var(--crit)" : v >= 70 ? "var(--accent)" : "var(--text-faint)";
  const r = 30, c = 2 * Math.PI * r, off = c - (v / 100) * c;
  return (
    <div style={{ position: "relative", width: 76, height: 76 }}>
      <svg width="76" height="76" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="38" cy="38" r={r} fill="none" stroke="var(--surface-2)" strokeWidth="6" />
        <circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset 0.8s var(--ease)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 800, color }}>{v}</span>
        <span className="eyebrow" style={{ fontSize: 8 }}>{label}</span>
      </div>
    </div>
  );
}

export default function NewsDetail({ n, noticias = [], onBack, onOpen }) {
  const relacionadas = noticias.filter((x) => x.id !== n.id && x.sectores.some((s) => n.sectores.includes(s))).slice(0, 3);
  const crit = n.criticidad === "critica";
  const ruta = ["Ingesta", "Traducción", "Resumen", "Sentimiento", "Etiquetado", "Vector→Qdrant", crit ? "Alerta" : "Archivo"];

  return (
    <div className="fade-up" style={{ maxWidth: 1180, margin: "0 auto" }}>
      <button className="btn btn-ghost btn-sm" onClick={onBack} style={{ marginBottom: 20 }}><I.back size={15} /> Volver al feed</button>

      <div className="split-main detail-main" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 32, alignItems: "start" }}>
        <article>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {n.sectores.map((s) => <span key={s} className="badge badge-accent">{SECTORS[s]?.label || s}</span>)}
            {crit && <span className="badge" style={{ background: "color-mix(in oklch, var(--crit) 14%, transparent)", color: "var(--crit)", borderColor: "transparent" }}><I.bolt size={10} fill /> CRÍTICA</span>}
            <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>{n.hora} · {n.tiempoLectura} min de lectura</span>
          </div>

          <h1 className="serif" style={{ fontSize: 38, lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.02em", textWrap: "balance" }}>{n.titulo}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0 24px", paddingBottom: 22, borderBottom: "1px solid var(--border)" }}>
            <span className="mono" style={{ fontSize: 12.5, fontWeight: 600 }}>{n.fuente}</span>
            {n.traducida && <span className="badge"><I.trans size={11} /> Traducida del {n.langOrig}</span>}
            <span style={{ flex: 1 }} />
            <button className="btn btn-ghost btn-sm"><I.ext size={14} /> Fuente original</button>
          </div>

          <div className="card" style={{ padding: "18px 20px", marginBottom: 28, background: "var(--accent-soft)", borderColor: "var(--accent-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <I.spark size={15} style={{ color: "var(--accent)" }} />
              <span className="eyebrow" style={{ color: "var(--accent)" }}>resumen del agente · 3 puntos clave</span>
            </div>
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {n.resumen.map((r, k) => (
                <li key={k} style={{ display: "flex", gap: 12, fontSize: 14.5, lineHeight: 1.5, color: "var(--text)" }}>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", flex: "none", marginTop: 2 }}>{String(k + 1).padStart(2, "0")}</span>
                  <span style={{ textWrap: "pretty" }}>{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <ImgSlot label="imagen del artículo · arrastra aquí" h={200} />

          <div className="serif" style={{ fontSize: 17, lineHeight: 1.72, color: "var(--text)", marginTop: 26, whiteSpace: "pre-line", textWrap: "pretty" }}>
            {n.cuerpo}
          </div>

          <div style={{ marginTop: 30, paddingTop: 22, borderTop: "1px solid var(--border)" }}>
            <span className="eyebrow">entidades detectadas</span>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
              {n.entidades.map((e) => <span key={e} className="badge" style={{ height: 26, fontSize: 11.5 }}><I.dot size={10} fill style={{ color: "var(--accent)" }} /> {e}</span>)}
            </div>
          </div>
        </article>

        <aside style={{ position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>análisis del agente ia</div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
              <Gauge v={n.impacto} label="impacto" />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>sentimiento</div>
                  <SentBadge s={n.sentimiento} score={n.scoreSent} />
                </div>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 6 }}>criticidad</div>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, textTransform: "capitalize", color: crit ? "var(--crit)" : n.criticidad === "alta" ? "var(--accent)" : "var(--text-muted)" }}>{n.criticidad}</span>
                </div>
              </div>
            </div>
            <hr className="divider" />
            <div style={{ display: "flex", flexDirection: "column", gap: 11, marginTop: 16 }}>
              {[["Modelo", "gemini-1.5-pro"], ["Tokens", "1.842"], ["Latencia", "4.8s"], ["Confianza", "94%"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                  <span style={{ color: "var(--text-muted)" }}>{k}</span>
                  <span className="mono" style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card grid-bg" style={{ padding: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>ruta de procesamiento</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {ruta.map((paso, k) => (
                <div key={k} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: "none" }}>
                    <span style={{ width: 14, height: 14, borderRadius: 99, background: k === ruta.length - 1 && crit ? "var(--crit)" : "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <I.check size={9} sw={3} style={{ color: "var(--on-accent)" }} />
                    </span>
                    {k < ruta.length - 1 && <span style={{ width: 1.5, height: 18, background: "var(--accent)", opacity: 0.4 }} />}
                  </div>
                  <span className="mono" style={{ fontSize: 11.5, paddingTop: 0, color: "var(--text-muted)", paddingBottom: k < ruta.length - 1 ? 6 : 0 }}>{paso}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>relacionadas</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {relacionadas.map((r) => (
                <button key={r.id} onClick={() => onOpen(r)} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 5, padding: 0 }} className="rel-item">
                  <span className="serif" style={{ fontSize: 13.5, lineHeight: 1.3, fontWeight: 500, textWrap: "pretty" }}>{r.titulo}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <SentBadge s={r.sentimiento} />
                    <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>{r.hora}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
