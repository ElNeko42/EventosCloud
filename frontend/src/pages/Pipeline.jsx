/* ============================================================
   PIPELINE / ORQUESTADOR — datos de /api/pipeline
   ============================================================ */
import { useEffect, useState } from "react";
import { I } from "../icons.jsx";
import { StatTile } from "../components/ui.jsx";
import { api } from "../api.js";

function QueueCard({ q }) {
  const pct = Math.min(100, q.profundidad / 1500 * 100);
  const warn = q.estado === "warn";
  const tipoColor = { SQS: "var(--accent)", "Pub/Sub": "var(--pos)", SNS: "var(--neu)", DLQ: "var(--crit)" }[q.tipo] || "var(--text-faint)";
  return (
    <div className="card" style={{ padding: 15, borderColor: warn ? "color-mix(in oklch,var(--neu) 40%,var(--border))" : "var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="badge solid" style={{ background: "color-mix(in oklch," + tipoColor + " 14%,transparent)", color: tipoColor }}>{q.tipo}</span>
        <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{q.nombre}</span>
        <span style={{ flex: 1 }} />
        {warn && <span className="dot pulse" style={{ background: "var(--neu)", color: "var(--neu)" }} />}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>{q.profundidad.toLocaleString("es")}</span>
        <span className="eyebrow" style={{ marginBottom: 4 }}>en cola</span>
      </div>
      <div style={{ height: 5, background: "var(--surface-2)", borderRadius: 99, overflow: "hidden", marginBottom: 12, border: "1px solid var(--border)" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: warn ? "var(--neu)" : tipoColor, opacity: 0.7 }} />
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        {[["→ in", q.entrada + "/s", "var(--text-muted)"], ["out →", q.salida + "/s", "var(--pos)"], ["lat", q.latencia, "var(--text-muted)"]].map(([l, v, c]) => (
          <div key={l}>
            <div className="eyebrow" style={{ fontSize: 8.5 }}>{l}</div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: c, marginTop: 2 }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentRow({ a }) {
  const activo = a.estado === "activo";
  return (
    <div className="agent-row" style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderBottom: "1px solid var(--border)" }}>
      <span style={{ flex: "none", width: 34, height: 34, borderRadius: 8, background: activo ? "var(--accent-soft)" : "var(--surface-2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <I.cpu size={17} style={{ color: activo ? "var(--accent)" : "var(--text-faint)" }} />
      </span>
      <div style={{ minWidth: 150 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{a.nombre}</div>
        <div className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)" }}>{a.modelo}</div>
      </div>
      <div style={{ flex: 1, minWidth: 120 }}>
        <span className="mono" style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{a.tarea}</span>
      </div>
      <div style={{ textAlign: "right", minWidth: 70 }}>
        <div className="mono" style={{ fontSize: 13, fontWeight: 600 }}>{a.procesadas.toLocaleString("es")}</div>
        <div className="eyebrow" style={{ fontSize: 8.5 }}>procesadas</div>
      </div>
      <div style={{ textAlign: "right", minWidth: 56 }}>
        <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: a.throughput > 0 ? "var(--pos)" : "var(--text-faint)" }}>{a.throughput}/m</div>
        <div className="eyebrow" style={{ fontSize: 8.5 }}>ritmo</div>
      </div>
      <div style={{ textAlign: "right", minWidth: 52 }}>
        <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: a.tasaError > 1 ? "var(--neg)" : "var(--text-muted)" }}>{a.tasaError}%</div>
        <div className="eyebrow" style={{ fontSize: 8.5 }}>error</div>
      </div>
      <span className="badge" style={{ minWidth: 90, justifyContent: "center", background: activo ? "var(--pos-soft)" : "var(--neu-soft)", color: activo ? "var(--pos)" : "var(--neu)", borderColor: "transparent" }}>
        <span className={"dot" + (activo ? " pulse" : "")} style={{ background: "currentColor", color: "currentColor" }} /> {a.estado}
      </span>
    </div>
  );
}

export default function Pipeline() {
  const niv = { info: "var(--text-faint)", ok: "var(--pos)", warn: "var(--neu)", crit: "var(--crit)" };
  const [data, setData] = useState(null);

  useEffect(() => { api.pipeline().then(setData).catch(() => setData(null)); }, []);

  if (!data) return <div className="card grid-bg" style={{ padding: 48, textAlign: "center", color: "var(--text-muted)" }}>Cargando pipeline…</div>;

  return (
    <div className="fade-up" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <StatTile label="Procesadas hoy" value={data.metricas.procesadasHoy.toLocaleString("es")} sub="ritmo 21/min" color="var(--accent)" icon={I.layers} spark={data.metricas.throughput24h} />
        <StatTile label="Latencia media" value={data.metricas.latenciaMedia} sub="end-to-end" color="var(--pos)" icon={I.clock} />
        <StatTile label="Uptime 30d" value={data.metricas.uptime} sub="SLA 99.9%" color="var(--pos)" icon={I.check} />
        <StatTile label="Coste hoy" value={data.metricas.coste} sub="Gemini + infra" color="var(--neu)" icon={I.bolt} />
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em" }}>Colas de mensajes</h2>
          <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>SQS · Pub/Sub · SNS</span>
          <span style={{ flex: 1 }} />
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} /><span className="mono" style={{ fontSize: 10.5, color: "var(--pos)" }}>en vivo</span></span>
        </div>
        <div className="queue-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
          {data.colas.map((q) => <QueueCard key={q.id} q={q} />)}
        </div>
      </div>

      <div className="split-main" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.55fr) minmax(0,1fr)", gap: 22, alignItems: "start" }}>
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <I.cpu size={16} style={{ color: "var(--accent)" }} />
            <h2 style={{ fontSize: 15, fontWeight: 800 }}>Agentes de IA</h2>
            <span className="mono" style={{ fontSize: 11, color: "var(--text-faint)" }}>n8n · {data.agentes.filter((a) => a.estado === "activo").length} activos</span>
          </div>
          {data.agentes.map((a) => <AgentRow key={a.id} a={a} />)}
        </div>

        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
            <span className="dot pulse" style={{ background: "var(--accent)", color: "var(--accent)" }} />
            <h2 style={{ fontSize: 15, fontWeight: 800 }}>Eventos</h2>
            <span style={{ flex: 1 }} />
            <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>stream</span>
          </div>
          <div style={{ padding: "8px 0", maxHeight: 360, overflowY: "auto" }}>
            {data.eventos.map((e, i) => (
              <div key={i} className={i === 0 ? "fade-up" : ""} style={{ display: "flex", gap: 10, padding: "7px 16px", alignItems: "flex-start" }}>
                <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", flex: "none", marginTop: 1 }}>{e.t}</span>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: niv[e.nivel], flex: "none", marginTop: 5 }} />
                <span className="mono" style={{ fontSize: 11, lineHeight: 1.45, color: e.nivel === "crit" ? "var(--crit)" : "var(--text-muted)" }}>{e.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
