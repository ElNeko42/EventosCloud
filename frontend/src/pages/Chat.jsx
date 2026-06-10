/* ============================================================
   CHAT RAG — consulta al backend (/api/chat)
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { I } from "../icons.jsx";
import { api } from "../api.js";

const CHAT_INICIAL = [{
  rol: "asistente",
  texto: "Hola. Soy tu analista sobre el archivo de eventos procesados. Puedo buscar, resumir y cruzar información de todo lo ingerido. Pregúntame por un sector, una empresa o una semana concreta.",
  citas: [],
}];

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 6, height: 6, borderRadius: 99, background: "var(--text-faint)",
          animation: `blink 1.2s ${i * 0.18}s infinite` }} />
      ))}
      <style>{`@keyframes blink{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-2px)}}`}</style>
    </span>
  );
}

function CitaCard({ c, noticias, onOpen }) {
  const n = noticias.find((x) => x.id === c.id);
  return (
    <button onClick={() => n && onOpen(n)} className="cita-card">
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <I.db size={12} style={{ color: "var(--accent)" }} />
        <span className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>{c.fuente}</span>
        <span style={{ flex: 1 }} />
        <span className="mono" style={{ fontSize: 10, color: "var(--accent)" }}>{(c.rel * 100).toFixed(0)}%</span>
      </div>
      <span className="serif" style={{ fontSize: 13, lineHeight: 1.3, fontWeight: 500, textWrap: "pretty", display: "block" }}>{c.titulo}</span>
    </button>
  );
}

function Bubble({ m, noticias, onOpen }) {
  const user = m.rol === "usuario";
  const render = (txt) => txt.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.+?)\*\*/g);
    return <p key={i} style={{ margin: line ? "0 0 8px" : "0 0 4px", textWrap: "pretty" }}>
      {parts.map((p, k) => k % 2 ? <strong key={k} style={{ color: "var(--text)", fontWeight: 700 }}>{p}</strong> : p)}
    </p>;
  });
  return (
    <div className="fade-up" style={{ display: "flex", gap: 12, flexDirection: user ? "row-reverse" : "row", alignItems: "flex-start" }}>
      <div style={{ flex: "none", width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
        background: user ? "var(--surface-2)" : "var(--accent)", border: user ? "1px solid var(--border)" : "none" }}>
        {user ? <I.user size={15} style={{ color: "var(--text-muted)" }} /> : <I.spark size={15} style={{ color: "var(--on-accent)" }} />}
      </div>
      <div style={{ maxWidth: user ? "70%" : "84%" }}>
        <div style={{
          padding: user ? "11px 15px" : "14px 17px",
          borderRadius: user ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          background: user ? "var(--accent)" : "var(--surface)",
          color: user ? "var(--on-accent)" : "var(--text)",
          border: user ? "none" : "1px solid var(--border)",
          fontSize: 14, lineHeight: 1.6,
        }}>
          {m.typing ? <TypingDots /> : render(m.texto)}
        </div>
        {m.citas && m.citas.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div className="eyebrow" style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <I.layers size={12} /> {m.citas.length} fuentes recuperadas · qdrant
            </div>
            <div className="cita-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {m.citas.map((c) => <CitaCard key={c.id} c={c} noticias={noticias} onOpen={onOpen} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Chat({ noticias = [], onOpen }) {
  const [msgs, setMsgs] = useState(CHAT_INICIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  const ask = async (pregunta) => {
    if (!pregunta.trim() || busy) return;
    setInput("");
    setBusy(true);
    setMsgs((m) => [...m, { rol: "usuario", texto: pregunta }]);
    setTimeout(() => setMsgs((m) => [...m, { rol: "asistente", typing: true }]), 250);
    try {
      const res = await api.chat(pregunta);
      setMsgs((m) => [...m.filter((x) => !x.typing), { rol: "asistente", texto: res.texto, citas: res.citas }]);
    } catch (err) {
      setMsgs((m) => [...m.filter((x) => !x.typing), { rol: "asistente", texto: "Error consultando el archivo: " + err.message, citas: [] }]);
    } finally {
      setBusy(false);
    }
  };

  const sugerencias = [
    "¿Qué ha pasado esta semana con el sector logístico?",
    "Resume las noticias de IA con sentimiento negativo",
    "¿Cuáles son las noticias más críticas de hoy?",
  ];

  return (
    <div className="chat-main" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: 22, height: "calc(100vh - 132px)", alignItems: "stretch" }}>
      <div className="card" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span className="dot pulse" style={{ background: "var(--pos)", color: "var(--pos)" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Analista RAG</div>
              <div className="mono" style={{ fontSize: 10, color: "var(--text-faint)" }}>gemini-1.5-pro · 4.788 docs indexados</div>
            </div>
          </div>
          <span style={{ flex: 1 }} />
          <button className="btn btn-ghost btn-sm" onClick={() => setMsgs(CHAT_INICIAL)}><I.refresh size={14} /> Nueva</button>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 22, display: "flex", flexDirection: "column", gap: 22 }}>
          {msgs.map((m, i) => <Bubble key={i} m={m} noticias={noticias} onOpen={onOpen} />)}
          {msgs.length === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {sugerencias.map((s) => (
                <button key={s} className="suggestion" onClick={() => ask(s)}>
                  <I.search size={14} style={{ color: "var(--accent)", flex: "none" }} />
                  <span>{s}</span>
                  <I.arrow size={14} style={{ color: "var(--text-faint)", flex: "none", marginLeft: "auto" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="chat-input">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pregunta a tus eventos…" disabled={busy} />
            <button type="submit" className="btn btn-primary btn-icon btn-sm" disabled={busy || !input.trim()} style={{ width: 34, height: 34 }}>
              {busy ? <I.refresh size={15} className="spin" /> : <I.send size={15} />}
            </button>
          </form>
        </div>
      </div>

      <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card grid-bg" style={{ padding: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>cómo funciona</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Tu pregunta", "se convierte en un vector de embedding", I.search],
              ["Búsqueda", "Qdrant recupera los eventos más cercanos", I.db],
              ["Síntesis", "Gemini redacta la respuesta con citas", I.spark],
            ].map(([t, d, Ico], i) => (
              <div key={i} style={{ display: "flex", gap: 11 }}>
                <span style={{ flex: "none", width: 26, height: 26, borderRadius: 7, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ico size={14} style={{ color: "var(--accent)" }} />
                </span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{t}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.4 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>colección vectorial</div>
          {[["Documentos", "4.788"], ["Dimensiones", "768"], ["Métrica", "cosine"], ["Última sync", "hace 2 min"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "5px 0" }}>
              <span style={{ color: "var(--text-muted)" }}>{k}</span><span className="mono" style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
