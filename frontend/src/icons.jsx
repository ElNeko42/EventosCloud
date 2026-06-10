/* ============================================================
   ICONOS (stroke, currentColor) + LOGO
   ============================================================ */

export const Icon = ({ d, fill, size = 18, sw = 1.7, ...p }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={fill ? "currentColor" : "none"}
       stroke={fill ? "none" : "currentColor"} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);

export const I = {
  feed:    (p) => <Icon {...p} d="M4 6h16M4 12h16M4 18h10" />,
  grid:    (p) => <Icon {...p} d={<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>} />,
  chat:    (p) => <Icon {...p} d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />,
  bell:    (p) => <Icon {...p} d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />,
  flow:    (p) => <Icon {...p} d={<><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="9" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M9 6h3a3 3 0 0 1 3 3M9 18h3a3 3 0 0 0 3-3"/></>} />,
  rss:     (p) => <Icon {...p} d={<><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none"/></>} />,
  search:  (p) => <Icon {...p} d={<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>} />,
  sun:     (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></>} />,
  moon:    (p) => <Icon {...p} d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />,
  arrow:   (p) => <Icon {...p} d="M5 12h14M13 6l6 6-6 6" />,
  back:    (p) => <Icon {...p} d="M19 12H5M11 6l-6 6 6 6" />,
  trans:   (p) => <Icon {...p} d="M4 5h7M9 3v2c0 4-2 7-6 8M5 9c0 3 3 5 6 6M13 19l4-9 4 9M14.5 16h5" />,
  spark:   (p) => <Icon {...p} d="M12 3v4M12 17v4M5 12H1M23 12h-4M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />,
  up:      (p) => <Icon {...p} d="M7 17 17 7M9 7h8v8" />,
  down:    (p) => <Icon {...p} d="M7 7 17 17M9 17h8V9" />,
  dash:    (p) => <Icon {...p} d="M5 12h14" />,
  bolt:    (p) => <Icon {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  send:    (p) => <Icon {...p} d="m22 2-7 20-4-9-9-4 20-7Z" />,
  check:   (p) => <Icon {...p} d="M20 6 9 17l-5-5" />,
  x:       (p) => <Icon {...p} d="M18 6 6 18M6 6l12 12" />,
  ext:     (p) => <Icon {...p} d="M15 3h6v6M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />,
  clock:   (p) => <Icon {...p} d={<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>} />,
  filter:  (p) => <Icon {...p} d="M3 5h18l-7 8v6l-4 2v-8L3 5Z" />,
  layers:  (p) => <Icon {...p} d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />,
  db:      (p) => <Icon {...p} d={<><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></>} />,
  mail:    (p) => <Icon {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></>} />,
  phone:   (p) => <Icon {...p} d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L17 11l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  cpu:     (p) => <Icon {...p} d={<><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></>} />,
  dot:     (p) => <Icon {...p} d={<circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>} />,
  user:    (p) => <Icon {...p} d={<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>} />,
  lock:    (p) => <Icon {...p} d={<><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>} />,
  refresh: (p) => <Icon {...p} d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />,
  settings:(p) => <Icon {...p} d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V1a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H23a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/></>} />,
  logout:  (p) => <Icon {...p} d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  plus:    (p) => <Icon {...p} d="M12 5v14M5 12h14" />,
  sliders: (p) => <Icon {...p} d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
};

/* ---------- logo ---------- */
export function Logo({ size = 26, withText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", width: size, height: size, flex: "none" }}>
        <svg viewBox="0 0 32 32" width={size} height={size}>
          <rect x="1" y="1" width="30" height="30" rx="8" fill="var(--accent)" />
          <circle cx="16" cy="16" r="3.2" fill="var(--on-accent)" />
          <g stroke="var(--on-accent)" strokeWidth="1.7" fill="none" opacity="0.9">
            <path d="M16 4.5v4.3M16 23.2v4.3M4.5 16h4.3M23.2 16h4.3" />
            <circle cx="16" cy="4.5" r="1.5" fill="var(--on-accent)" stroke="none" />
            <circle cx="16" cy="27.5" r="1.5" fill="var(--on-accent)" stroke="none" />
            <circle cx="4.5" cy="16" r="1.5" fill="var(--on-accent)" stroke="none" />
            <circle cx="27.5" cy="16" r="1.5" fill="var(--on-accent)" stroke="none" />
          </g>
        </svg>
      </div>
      {withText && (
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontWeight: 800, fontSize: 14.5, letterSpacing: "-0.02em" }}>Orquesta</div>
          <div className="mono" style={{ fontSize: 9, letterSpacing: "0.18em", color: "var(--text-faint)", textTransform: "uppercase" }}>eventos cloud</div>
        </div>
      )}
    </div>
  );
}
