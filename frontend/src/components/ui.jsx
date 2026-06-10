/* ============================================================
   COMPONENTES COMPARTIDOS
   ============================================================ */
import { useMemo } from "react";
import { I } from "../icons.jsx";
import { SECTORS } from "../constants.js";

/* ---------- sentimiento ---------- */
export const SENT = {
  positivo: { label: "Positivo", cls: "badge-pos", icon: I.up,   color: "var(--pos)" },
  neutral:  { label: "Neutral",  cls: "badge-neu", icon: I.dash, color: "var(--neu)" },
  negativo: { label: "Negativo", cls: "badge-neg", icon: I.down, color: "var(--neg)" },
};

export function SentBadge({ s, score }) {
  const m = SENT[s] || SENT.neutral;
  return (
    <span className={`badge ${m.cls}`}>
      <m.icon size={11} sw={2.4} />
      {m.label}{typeof score === "number" && <span style={{ opacity: 0.7 }}>{score > 0 ? "+" : ""}{score.toFixed(2)}</span>}
    </span>
  );
}

/* ---------- barra de impacto ---------- */
export function ImpactBar({ v, w = 44 }) {
  const color = v >= 85 ? "var(--crit)" : v >= 70 ? "var(--accent)" : "var(--text-faint)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: w, height: 5, borderRadius: 99, background: "var(--surface-2)", overflow: "hidden", border: "1px solid var(--border)" }}>
        <div style={{ width: `${v}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span className="mono" style={{ fontSize: 11, color, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

/* ---------- sparkline ---------- */
export function Spark({ data, w = 120, h = 32, color = "var(--accent)", fill = true }) {
  const gid = useMemo(() => "sg" + Math.random().toString(36).slice(2), []);
  if (!data || !data.length) return <svg width={w} height={h} />;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 4 - ((v - min) / (max - min || 1)) * (h - 8);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.22" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient></defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- chip de sector ---------- */
export function SectorChip({ id, active, onClick }) {
  const s = SECTORS[id];
  if (!s) return null;
  return (
    <button className="tag" onClick={onClick}
      style={active ? { borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-soft)" } : {}}>
      {s.label}
    </button>
  );
}

/* ---------- placeholder de imagen ---------- */
export function ImgSlot({ label, h = 160, r = "var(--r-md)" }) {
  return (
    <div style={{
      height: h, borderRadius: r, border: "1px solid var(--border)",
      background: "repeating-linear-gradient(135deg, var(--surface-2) 0 10px, transparent 10px 20px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span className="mono" style={{ fontSize: 10.5, color: "var(--text-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
}

/* ---------- tarjeta de estadística ---------- */
export function StatTile({ label, value, sub, spark, color = "var(--accent)", icon: Ico }) {
  return (
    <div className="card" style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span className="eyebrow">{label}</span>
        {Ico && <Ico size={15} style={{ color: "var(--text-faint)" }} />}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
          {sub && <div className="mono" style={{ fontSize: 10.5, color, marginTop: 5 }}>{sub}</div>}
        </div>
        {spark && <Spark data={spark} w={84} h={34} color={color} />}
      </div>
    </div>
  );
}
