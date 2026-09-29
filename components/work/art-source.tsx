import type { ArtKind } from "@/data/projects";

/**
 * Original interface sketches used until real screenshots are supplied
 * (see `thumbnail` / `heroImage` in data/projects.ts). They are drawn only from features
 * the projects genuinely have, contain no fake metrics, and are captioned as sketches.
 * All artwork lives in a 1600x1000 box and is cropped with `slice`, so keep the
 * important content between y=140 and y=860.
 */

const f = (o: number) => ({ fill: "currentColor", fillOpacity: o });

function Backdrop({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={`g-${id}`} width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M64 0H0V64" fill="none" className="stroke-fg/10" strokeWidth="1" />
        </pattern>
        <radialGradient id={`v-${id}`} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#ff5b2e" stopOpacity="0.14" />
          <stop offset="60%" stopColor="#ff5b2e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#g-${id})`} />
      <rect width="1600" height="1000" fill={`url(#v-${id})`} />
    </>
  );
}

function Lines({ x, y, widths, gap = 22, h = 10 }: { x: number; y: number; widths: number[]; gap?: number; h?: number }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} {...f(25/100)} />
      ))}
    </>
  );
}

function Phone({ x, y, children, title }: { x: number; y: number; children: React.ReactNode; title: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="360" height="730" rx="34" className="fill-[#0f0e0b] stroke-fg/20" strokeWidth="1.5" />
      <rect x="140" y="16" width="80" height="8" rx="4" {...f(15/100)} />
      <text x="28" y="66" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: 1.6 }}>
        {title.toUpperCase()}
      </text>
      {children}
    </g>
  );
}

function CampusConnect() {
  return (
    <>
      <Backdrop id="cc" />
      {/* Feed */}
      <Phone x={200} y={190} title="Campus feed">
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(28 ${96 + i * 300})`}>
            <circle cx="22" cy="22" r="22" {...f(20/100)} />
            <rect x="58" y="10" width="120" height="11" rx="5" {...f(45/100)} />
            <rect x="58" y="30" width="72" height="8" rx="4" {...f(20/100)} />
            {i === 0 && (
              <g transform="translate(192 8)">
                <circle cx="13" cy="13" r="13" fill="#ff5b2e" />
                <path d="M7 13.5l4 4 8-8.5" fill="none" stroke="#0e0d0b" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            <Lines x={0} y={64} widths={[300, 260, 180]} />
            {i === 0 ? (
              <rect x="0" y="146" width="304" height="90" rx="8" {...f(10/100)} />
            ) : (
              <rect x="0" y="146" width="304" height="40" rx="8" {...f(10/100)} />
            )}
            <g {...f(30/100)}>
              <circle cx="14" cy={i === 0 ? 262 : 212} r="7" />
              <circle cx="52" cy={i === 0 ? 262 : 212} r="7" />
              <circle cx="90" cy={i === 0 ? 262 : 212} r="7" />
            </g>
          </g>
        ))}
      </Phone>

      {/* Leaderboard + streak */}
      <Phone x={620} y={110} title="Leaderboard">
        <g transform="translate(28 96)">
          <rect width="304" height="86" rx="8" {...f(8/100)} />
          <text x="18" y="30" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 1.6 }}>
            STREAK
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((d) => (
            <circle key={d} cx={26 + d * 42} cy="56" r="10" fill={d < 5 ? "#ff5b2e" : "none"} className={d < 5 ? "" : "stroke-fg/25"} strokeWidth="1.5" />
          ))}
        </g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(28 ${216 + i * 74})`}>
            <text x="0" y="34" className={i === 0 ? "" : "fill-muted"} fill={i === 0 ? "#ff5b2e" : undefined} style={{ fontFamily: "var(--font-mono)", fontSize: 24 }}>
              {i + 1}
            </text>
            <circle cx="64" cy="26" r="18" {...f(18/100)} />
            <rect x="94" y="12" width={150 - i * 14} height="10" rx="5" {...f(40/100)} />
            <rect x="94" y="32" width={210 - i * 26} height="8" rx="4" {...f(Number(i === 0 ? "35" : "16")/100)} />
          </g>
        ))}
      </Phone>

      {/* Onboarding */}
      <Phone x={1040} y={190} title="Onboarding">
        <text x="28" y="120" className="fill-fg" style={{ fontSize: 34, fontWeight: 560, letterSpacing: -1.2 }}>
          I am a…
        </text>
        {["Student", "Alumni", "Company", "General"].map((r, i) => (
          <g key={r} transform={`translate(28 ${160 + i * 92})`}>
            <rect width="304" height="72" rx="8" className={i === 0 ? "fill-[#ff5b2e]/10" : "fill-transparent"} stroke={i === 0 ? "#ff5b2e" : undefined} strokeWidth="1.5" />
            {i !== 0 && <rect width="304" height="72" rx="8" className="fill-transparent stroke-fg/20" strokeWidth="1.5" />}
            <circle cx="36" cy="36" r="10" className={i === 0 ? "" : "fill-transparent stroke-fg/30"} fill={i === 0 ? "#ff5b2e" : undefined} strokeWidth="1.5" />
            <text x="66" y="44" className="fill-fg" style={{ fontSize: 22, letterSpacing: -0.4 }}>
              {r}
            </text>
          </g>
        ))}
        <rect x="28" y="548" width="304" height="52" rx="8" className="fill-fg" />
      </Phone>
    </>
  );
}

/** Deterministic pseudo-random QR-like matrix with correct finder patterns. */
function qrMatrix(n: number) {
  let s = 20260929;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const grid: boolean[][] = Array.from({ length: n }, () => Array.from({ length: n }, () => rnd() > 0.52));
  const finder = (ox: number, oy: number) => {
    for (let y = -1; y <= 7; y++)
      for (let x = -1; x <= 7; x++) {
        const gx = ox + x;
        const gy = oy + y;
        if (gx < 0 || gy < 0 || gx >= n || gy >= n) continue;
        const ring = Math.max(Math.abs(x - 3), Math.abs(y - 3));
        grid[gy][gx] = ring === 3 || ring <= 1;
        if (x === -1 || y === -1 || x === 7 || y === 7) grid[gy][gx] = false;
      }
  };
  finder(0, 0);
  finder(n - 7, 0);
  finder(0, n - 7);
  return grid;
}

function QRPlatform() {
  const n = 25;
  const cell = 11;
  const grid = qrMatrix(n);
  let d = "";
  grid.forEach((row, y) =>
    row.forEach((on, x) => {
      if (on) d += `M${x * cell} ${y * cell}h${cell}v${cell}h-${cell}z`;
    }),
  );
  const chart = "M0 150 C60 140 90 90 150 110 S250 40 320 70 S430 130 500 60 S600 20 660 40";
  return (
    <>
      <Backdrop id="qr" />
      <g transform="translate(150 150)">
        <rect width="1300" height="700" rx="12" className="fill-[#0f0e0b] stroke-fg/20" strokeWidth="1.5" />
        <line x1="0" y1="64" x2="1300" y2="64" className="stroke-fg/15" />
        <rect x="24" y="24" width="220" height="16" rx="8" {...f(15/100)} />
        {/* sidebar */}
        {["QR codes", "Analytics", "Billing"].map((t, i) => (
          <g key={t} transform={`translate(28 ${110 + i * 56})`}>
            <rect x="-12" y="-6" width="188" height="40" rx="6" className={i === 0 ? "fill-fg/10" : "fill-transparent"} />
            <circle cx="10" cy="14" r="5" fill={i === 0 ? "#ff5b2e" : undefined} className={i === 0 ? "" : "fill-fg/30"} />
            <text x="32" y="20" className={i === 0 ? "fill-fg" : "fill-muted"} style={{ fontSize: 19, letterSpacing: -0.3 }}>
              {t}
            </text>
          </g>
        ))}
        <line x1="216" y1="64" x2="216" y2="700" className="stroke-fg/15" />

        {/* QR card */}
        <g transform="translate(264 112)">
          <rect width="420" height="470" rx="10" className="fill-fg/5 stroke-fg/15" />
          <rect x="52" y="44" width="316" height="316" rx="8" className="fill-fg" />
          <path d={d} transform="translate(70 62)" className="fill-[#0e0d0b]" />
          <rect x="52" y="392" width="150" height="14" rx="7" {...f(40/100)} />
          <rect x="52" y="418" width="220" height="10" rx="5" {...f(18/100)} />
        </g>

        {/* customiser */}
        <g transform="translate(730 112)">
          <text className="fill-muted" y="14" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: 1.6 }}>
            CUSTOMISE
          </text>
          {["#ff5b2e", "#ece8df", "#9b968a", "#5f5b52"].map((c, i) => (
            <g key={c}>
              <circle cx={20 + i * 56} cy="62" r="20" fill={c} />
              {i === 0 && <circle cx={20} cy="62" r="26" fill="none" stroke="#ff5b2e" strokeWidth="1.5" />}
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${130 + i * 62})`}>
              <rect width="150" height="10" rx="5" {...f(30/100)} />
              <rect y="24" width="460" height="6" rx="3" {...f(12/100)} />
              <rect y="24" width={140 + i * 110} height="6" rx="3" fill="#ff5b2e" />
              <circle cx={140 + i * 110} cy="27" r="9" className="fill-fg" />
            </g>
          ))}
        </g>

        {/* analytics */}
        <g transform="translate(264 610)">
          <text className="fill-muted" y="0" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: 1.6 }}>
            SCANS
          </text>
          <g transform="translate(0 6) scale(1.55 0.7)">
            <path d={`${chart} L660 150 L0 150 Z`} fill="#ff5b2e" opacity="0.12" />
            <path d={chart} fill="none" stroke="#ff5b2e" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
          </g>
        </g>
      </g>
    </>
  );
}

function BowenEats() {
  return (
    <>
      <Backdrop id="be" />
      {/* Menu */}
      <g transform="translate(150 190)">
        <rect width="560" height="650" rx="12" className="fill-[#0f0e0b] stroke-fg/20" strokeWidth="1.5" />
        <text x="32" y="56" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: 1.8 }}>
          MENU
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(32 ${92 + i * 132})`}>
            <rect width="104" height="104" rx="8" {...f(Number(10 + i * 3)/100)} />
            <rect x="130" y="14" width={190 - i * 10} height="14" rx="7" {...f(45/100)} />
            <rect x="130" y="42" width="240" height="9" rx="4.5" {...f(18/100)} />
            <rect x="130" y="62" width="180" height="9" rx="4.5" {...f(18/100)} />
            <rect x="130" y="84" width="60" height="14" rx="7" fill="#ff5b2e" opacity="0.9" />
            <circle cx="470" cy="80" r="20" className="fill-transparent stroke-fg/30" strokeWidth="1.5" />
            <path d="M470 71v18M461 80h18" className="stroke-fg" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
      </g>
      {/* Cart */}
      <g transform="translate(770 130)">
        <rect width="420" height="590" rx="12" className="fill-[#0f0e0b] stroke-fg/20" strokeWidth="1.5" />
        <text x="32" y="56" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: 1.8 }}>
          CART
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(32 ${92 + i * 86})`}>
            <rect width="56" height="56" rx="6" {...f(14/100)} />
            <rect x="76" y="6" width={150 - i * 16} height="12" rx="6" {...f(40/100)} />
            <rect x="76" y="30" width="90" height="9" rx="4.5" {...f(18/100)} />
            <rect x="300" y="12" width="56" height="14" rx="7" {...f(30/100)} />
          </g>
        ))}
        <line x1="32" y1="372" x2="388" y2="372" className="stroke-fg/15" />
        <rect x="32" y="392" width="100" height="10" rx="5" {...f(25/100)} />
        <rect x="300" y="390" width="88" height="14" rx="7" {...f(50/100)} />
        <rect x="32" y="450" width="356" height="60" rx="8" fill="#ff5b2e" />
        <rect x="140" y="474" width="140" height="12" rx="6" fill="#0e0d0b" opacity="0.8" />
      </g>
      {/* Orders */}
      <g transform="translate(1240 250)">
        <rect width="300" height="450" rx="12" className="fill-[#0f0e0b] stroke-fg/20" strokeWidth="1.5" />
        <text x="28" y="52" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: 1.8 }}>
          ORDERS
        </text>
        <line x1="42" y1="110" x2="42" y2="360" className="stroke-fg/20" strokeWidth="1.5" />
        <line x1="42" y1="110" x2="42" y2="250" stroke="#ff5b2e" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(42 ${110 + i * 125})`}>
            <circle r="10" fill={i < 2 ? "#ff5b2e" : "none"} className={i < 2 ? "" : "stroke-fg/30"} strokeWidth="1.5" />
            <rect x="34" y="-14" width="130" height="12" rx="6" {...f(Number(i < 2 ? "40" : "20")/100)} />
            <rect x="34" y="8" width="90" height="8" rx="4" {...f(16/100)} />
          </g>
        ))}
      </g>
    </>
  );
}

function Lss() {
  // Lumbar spine, sagittal view: five vertebral bodies with discs between them.
  const bodies = [0, 1, 2, 3, 4].map((i) => ({
    x: 640 + Math.sin(i * 0.55) * 26 + i * 8,
    y: 180 + i * 138,
    w: 178 + i * 8,
    h: 106,
  }));
  return (
    <>
      <Backdrop id="lss" />
      <defs>
        <radialGradient id="heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff5b2e" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ff5b2e" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#ff5b2e" stopOpacity="0" />
        </radialGradient>
        <pattern id="scan" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="1" className="fill-fg/6" />
        </pattern>
        <clipPath id="frame">
          <rect x="480" y="140" width="640" height="740" rx="10" />
        </clipPath>
      </defs>

      {/* slice strip */}
      <g transform="translate(200 190)">
        <text y="-24" className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: 1.6 }}>
          SLICES
        </text>
        {Array.from({ length: 12 }).map((_, i) => (
          <g key={i} transform={`translate(${(i % 3) * 82} ${Math.floor(i / 3) * 82})`}>
            <rect width="66" height="66" rx="5" {...f(Number(4 + (i % 4) * 3)/100)} />
            <ellipse cx="33" cy="33" rx="10" ry="20" className="fill-none stroke-fg/25" />
            {i === 6 && <rect width="66" height="66" rx="5" fill="none" stroke="#ff5b2e" strokeWidth="2" />}
          </g>
        ))}
      </g>

      {/* scan */}
      <rect x="480" y="140" width="640" height="740" rx="10" fill="#0a0908" className="stroke-fg/20" />
      <g clipPath="url(#frame)">
        <rect x="480" y="140" width="640" height="740" fill="url(#scan)" />
        {/* canal */}
        <rect x="860" y="150" width="34" height="720" rx="17" {...f(8/100)} />
        {bodies.map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="26" {...f(Number(20 - i)/100)} />
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="26" fill="none" className="stroke-fg/35" strokeWidth="1.5" />
            <text x={b.x + 14} y={b.y + 30} className="fill-muted" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
              L{i + 1}
            </text>
            {i < 4 && (
              <ellipse cx={b.x + b.w / 2 + 6} cy={b.y + b.h + 16} rx={b.w * 0.42} ry="10" {...f(Number(i === 3 ? 30 : 14)/100)} />
            )}
          </g>
        ))}
        {/* attention over the lowest disc */}
        <ellipse cx="830" cy="760" rx="170" ry="120" fill="url(#heat)" />
      </g>
      {/* reticle */}
      <g fill="none" stroke="#ff5b2e" strokeWidth="2" strokeLinecap="square">
        <path d="M660 660v-24h24M980 660v-24h-24M660 860v24h24M980 860v24h-24" transform="translate(0 -40)" />
      </g>

      {/* readout */}
      <g transform="translate(1190 190)">
        <text className="fill-muted" y="0" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: 1.6 }}>
          ATTENTION
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} y={28 + i * 36} width={[60, 110, 90, 200, 260, 140][i]} height="12" rx="6" {...(i === 4 ? { fill: "#ff5b2e" } : f(0.2))} />
        ))}
        <text className="fill-muted" y="290" style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: 1.6 }}>
          OUTPUT
        </text>
        <rect y="312" width="200" height="44" rx="6" className="fill-transparent stroke-fg/25" />
        <rect x="14" y="328" width="90" height="12" rx="6" {...f(45/100)} />
      </g>
    </>
  );
}

export const arts: Record<ArtKind, { node: () => React.JSX.Element; label: string }> = {
  "campus-connect": {
    node: CampusConnect,
    label: "Interface sketch of Campus Connect: a campus feed, a leaderboard with a streak tracker, and a role-based onboarding screen.",
  },
  "qr-platform": {
    node: QRPlatform,
    label: "Interface sketch of QR Platform: a dashboard with a QR code, colour customisation controls and a scan analytics chart.",
  },
  boweneats: {
    node: BowenEats,
    label: "Interface sketch of BowenEats: menu, cart and order-status screens.",
  },
  lss: {
    node: Lss,
    label: "Illustration of a lumbar spine MRI slice with an attention heat map over the lowest disc.",
  },
};

export function ArtSvg({ kind, decorative }: { kind: ArtKind; decorative: boolean }) {
  const { node: Node, label } = arts[kind];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="art-inner block h-full w-full text-fg"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    >
      <Node />
    </svg>
  );
}
