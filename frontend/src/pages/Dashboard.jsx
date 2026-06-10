/* ============================================================
   DASHBOARD — feed de eventos con análisis IA
   ============================================================ */
import { useMemo, useState } from "react";
import { I } from "../icons.jsx";
import { SECTORS } from "../constants.js";
import { SENT, SentBadge, ImpactBar, StatTile, SectorChip } from "../components/ui.jsx";

function NewsRow({ n, onOpen, i, resumen = true }) {
  const [hover, setHover] = useState(false);
  const crit = n.criticidad === "critica";
  return (
    <article
      onClick={() => onOpen(n)}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      className="card fade-up"
      style={{
        padding: "18px 20px 16px", cursor: "pointer", position: "relative", overflow: "hidden",
        animationDelay: `${i * 0.04}s`,
        borderColor: hover ? "var(--accent-border)" : "var(--border)",
        boxShadow: hover ? "var(--shadow-md)" : "none",
        transform: hover ? "translateY(-1px)" : "none",
        transition: "all 0.18s var(--ease)",
      }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: crit ? "var(--crit)" : "var(--accent)", opacity: hover || crit ? 1 : 0, transition: "opacity 0.2s" }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{n.fuente}</span>
        {n.traducida && <span className="badge" title={`Traducida del ${n.langOrig}`}><I.trans size={11} /> {n.langOrig}→ES</span>}
        <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>· {n.hora}</span>
        {crit && <span className="badge" style={{ background: "color-mix(in oklch, var(--crit) 14%, transparent)", color: "var(--crit)", borderColor: "transparent", fontWeight: 600 }}><I.bolt size={10} fill /> CRÍTICA</span>}
        <span style={{ flex: 1 }} />
        <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-faint)", opacity: hover ? 1 : 0, transition: "opacity 0.2s" }}>
          <span className="mono" style={{ fontSize: 10.5 }}>abrir</span><I.arrow size={13} />
        </span>
      </div>

      <h3 className="serif" style={{ fontSize: 20, lineHeight: 1.22, fontWeight: 500, letterSpacing: "-0.01em", textWrap: "balance", marginBottom: 12 }}>
        {n.titulo}
      </h3>

      {resumen && (
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        <div style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingTop: 2 }}>
          <I.spark size={13} style={{ color: "var(--accent)" }} />
          <div style={{ width: 1, flex: 1, background: "var(--border)" }} />
        </div>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
          {n.resumen.slice(0, 3).map((r, k) => (
            <li key={k} style={{ display: "flex", gap: 8 }}>
              <span className="mono" style={{ color: "var(--accent)", fontSize: 11, flex: "none", marginTop: 2 }}>{String(k + 1).padStart(2, "0")}</span>
              <span style={{ textWrap: "pretty" }}>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <SentBadge s={n.sentimiento} score={n.scoreSent} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="eyebrow">impacto</span><ImpactBar v={n.impacto} />
        </div>
        <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 2px" }} />
        {n.sectores.map((s) => <span key={s} className="tag">{SECTORS[s]?.label || s}</span>)}
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", display: "flex", alignItems: "center", gap: 4 }}><I.clock size={12} /> {n.tiempoLectura} min</span>
      </div>
    </article>
  );
}

export default function Dashboard({ noticias = [], onOpen, resumenFeed = true }) {
  const [sector, setSector] = useState(null);
  const [sent, setSent] = useState(null);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("reciente");

  const filtered = useMemo(() => {
    let list = noticias.filter((n) =>
      (!sector || n.sectores.includes(sector)) &&
      (!sent || n.sentimiento === sent) &&
      (!q || n.titulo.toLowerCase().includes(q.toLowerCase()) || n.entidades.some((e) => e.toLowerCase().includes(q.toLowerCase())))
    );
    if (sort === "impacto") list = [...list].sort((a, b) => b.impacto - a.impacto);
    return list;
  }, [noticias, sector, sent, q, sort]);

  const pos = noticias.filter((n) => n.sentimiento === "positivo").length;
  const neg = noticias.filter((n) => n.sentimiento === "negativo").length;
  const neu = noticias.length - pos - neg;
  const avgSent = noticias.length ? (noticias.reduce((s, n) => s + n.scoreSent, 0) / noticias.length) : 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 296px", gap: 22, alignItems: "start" }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          <StatTile label="Procesadas hoy" value="4.788" sub="+312 última hora" color="var(--accent)" icon={I.layers} spark={[12,18,9,14,22,31,28,19,24,33,41,38,29,35,44,52,48,39,42,55,61,49,44,38]} />
          <StatTile label="Alertas críticas" value="3" sub="2 enviadas · 1 hace 4 min" color="var(--crit)" icon={I.bolt} />
          <StatTile label="Sentimiento medio" value={(avgSent >= 0 ? "+" : "") + avgSent.toFixed(2)} sub={avgSent >= 0 ? "tono general positivo" : "tono general negativo"} color={avgSent >= 0 ? "var(--pos)" : "var(--neg)"} icon={I.spark} />
          <StatTile label="Fuentes activas" value="7/8" sub="1 pausada · 1 lenta" color="var(--neu)" icon={I.rss} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginRight: 4 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Feed</h2>
            <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>{filtered.length} de {noticias.length}</span>
          </div>
          <div className="search-box" style={{ flex: 1, minWidth: 180 }}>
            <I.search size={15} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar titular o entidad…" />
            {q && <button className="btn-quiet btn-icon btn-sm" onClick={() => setQ("")}><I.x size={13} /></button>}
          </div>
          <div className="seg">
            <button className={sort === "reciente" ? "on" : ""} onClick={() => setSort("reciente")}>Reciente</button>
            <button className={sort === "impacto" ? "on" : ""} onClick={() => setSort("impacto")}>Impacto</button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          <span className="eyebrow" style={{ marginRight: 4 }}>sector</span>
          {Object.keys(SECTORS).map((s) => <SectorChip key={s} id={s} active={sector === s} onClick={() => setSector(sector === s ? null : s)} />)}
          <span style={{ width: 1, height: 16, background: "var(--border)", margin: "0 6px" }} />
          <span className="eyebrow" style={{ marginRight: 4 }}>tono</span>
          {["positivo", "neutral", "negativo"].map((s) => (
            <button key={s} className="tag" onClick={() => setSent(sent === s ? null : s)}
              style={sent === s ? { borderColor: SENT[s].color, color: SENT[s].color, background: "color-mix(in oklch, " + SENT[s].color + " 10%, transparent)" } : {}}>
              {SENT[s].label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((n, i) => <NewsRow key={n.id} n={n} i={i} onOpen={onOpen} resumen={resumenFeed} />)}
          {filtered.length === 0 && (
            <div className="card grid-bg" style={{ padding: 48, textAlign: "center", color: "var(--text-muted)" }}>
              <I.search size={22} style={{ opacity: 0.5 }} />
              <p style={{ marginTop: 10, fontSize: 14 }}>Sin resultados para estos filtros.</p>
            </div>
          )}
        </div>
      </div>

      <aside style={{ position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>pulso de sentimiento · hoy</div>
          <div style={{ display: "flex", height: 10, borderRadius: 99, overflow: "hidden", gap: 2, marginBottom: 12 }}>
            <div style={{ flex: pos || 1, background: "var(--pos)" }} title={`${pos} positivas`} />
            <div style={{ flex: neu || 1, background: "var(--neu)" }} title={`${neu} neutrales`} />
            <div style={{ flex: neg || 1, background: "var(--neg)" }} title={`${neg} negativas`} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[["positivo", pos], ["neutral", neu], ["negativo", neg]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: SENT[k].color }} />
                <span style={{ color: "var(--text-muted)" }}>{SENT[k].label}</span>
                <span style={{ flex: 1 }} />
                <span className="mono" style={{ fontWeight: 600 }}>{v}</span>
                <span className="mono" style={{ color: "var(--text-faint)", fontSize: 11 }}>{noticias.length ? Math.round(v / noticias.length * 100) : 0}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>sectores en tendencia</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {[["ia", 5, 0.51], ["mercados", 5, 0.0], ["logistica", 2, -0.27], ["startups", 2, 0.6], ["energia", 2, 0.44], ["politica", 2, -0.18]].map(([s, c, scv]) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button className="tag" style={{ width: 86, justifyContent: "flex-start" }}>{SECTORS[s].label}</button>
                <div style={{ flex: 1, height: 5, background: "var(--surface-2)", borderRadius: 99, overflow: "hidden", border: "1px solid var(--border)" }}>
                  <div style={{ width: `${c / 5 * 100}%`, height: "100%", background: "var(--accent)", opacity: 0.55 }} />
                </div>
                <span className="mono" style={{ fontSize: 11, width: 40, textAlign: "right", color: scv >= 0 ? "var(--pos)" : "var(--neg)" }}>{scv >= 0 ? "+" : ""}{scv.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card grid-bg" style={{ padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span className="eyebrow">orquestador</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} />
              <span className="mono" style={{ fontSize: 10.5, color: "var(--pos)" }}>operativo</span>
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["en cola", "1.6k"], ["latencia", "8.6s"], ["agentes", "5/6"], ["coste hoy", "$12.40"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>{v}</div>
                <div className="eyebrow" style={{ marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
