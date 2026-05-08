// AHS Oral History — single shared prototype, three themes.
// Renders a complete mini-site (8 pages) inside a fixed-size frame.
// Theme is passed as a prop so the same code drives all three directions.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- THEMES ----------
const AHS_THEMES = {
  menotomy: {
    name: 'Menotomy',
    tagline: 'Town history monograph',
    fonts: {
      display: '"Roboto Slab", Georgia, serif',
      body: '"Source Sans 3", "Helvetica Neue", sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace'
    },
    color: {
      paper: '#F6F1E7',
      paperAlt: '#EFE7D6',
      ink: '#1F1A14',
      inkSoft: '#4A4137',
      paperAltInk: '#1F1A14',
      paperAltInkSoft: '#4A4137',
      paperAltBrand: '#8C2A2A',
      paperAltRule: '#C8BBA0',
      rule: '#C8BBA0',
      brand: '#8C2A2A',      // colonial red
      brandInk: '#FFFFFF',
      accent: '#1F3554',     // navy
      accentSoft: '#E5DFCF',
      tag: '#3A2E22'
    },
    radius: '2px',
    cardShadow: '0 1px 0 #C8BBA0',
    headerStyle: 'rule', // double rule under header
    portrait: 'tinted'   // sepia tint on portraits
  },
  patriots: {
    name: "Patriots' Path",
    tagline: 'Modern civic-editorial',
    fonts: {
      display: '"Bitter", "Roboto Slab", serif',
      body: '"Inter", system-ui, sans-serif',
      mono: '"JetBrains Mono", ui-monospace, monospace'
    },
    color: {
      paper: '#FBFAF7',
      paperAlt: '#0E1B2C',
      ink: '#0E1B2C',
      inkSoft: '#3A4A5E',
      // paperAlt is navy here — text on it must be parchment, not navy.
      paperAltInk: '#F5E9D0',         // parchment headings/body
      paperAltInkSoft: '#C9B98E',     // dimmer parchment for meta
      paperAltBrand: '#E8A57A',       // warm peach kicker (crimson is unreadable on navy)
      paperAltRule: '#1E3148',
      rule: '#D7DCE3',
      brand: '#A12C2C',      // crimson — primary action color, kickers, links
      brandInk: '#F5E9D0',
      accent: '#0E1B2C',     // navy — used for header bar background and dark surfaces
      accentSoft: '#EAF0F7',
      tag: '#0E1B2C'
    },
    radius: '6px',
    cardShadow: '0 8px 24px -16px rgba(14,27,44,0.35), 0 1px 0 rgba(14,27,44,0.06)',
    headerStyle: 'block',  // solid navy bar
    portrait: 'duotone'    // navy/cream duotone
  },
  fieldnotes: {
    name: 'Field Notes',
    tagline: 'Archival & textural',
    fonts: {
      display: '"DM Serif Display", "Playfair Display", serif',
      body: '"Lora", Georgia, serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace'
    },
    color: {
      paper: '#EDE5D3',
      paperAlt: '#E2D8C0',
      ink: '#2A1F14',
      inkSoft: '#5A4A38',
      paperAltInk: '#2A1F14',
      paperAltInkSoft: '#5A4A38',
      paperAltBrand: '#6B1E1E',
      paperAltRule: '#B6A684',
      rule: '#B6A684',
      brand: '#6B1E1E',      // oxblood
      brandInk: '#F2EAD2',
      accent: '#2C3A2E',     // deep moss
      accentSoft: '#D8CDB0',
      tag: '#2A1F14'
    },
    radius: '0px',
    cardShadow: 'none',
    headerStyle: 'serif', // big serif wordmark, no rule
    portrait: 'mono'      // black-and-white halftone-ish
  }
};

// ---------- HELPERS ----------
function fmtTime(s) {
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
}

// SVG placeholder portrait — stripes + initials. Tinted by theme.
function Portrait({ name, theme, size = 80, kind }) {
  const c = theme.color;
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const palettes = {
    tinted: { bg: '#D9C9A8', fg: c.tag, stripe: '#C8B58D' },
    duotone: { bg: c.accentSoft, fg: c.brand, stripe: '#D7DCE3' },
    mono: { bg: '#C9BC9E', fg: c.ink, stripe: '#B6A684' }
  };
  const p = palettes[kind || theme.portrait];
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" style={{ display: 'block', borderRadius: theme.radius }}>
      <rect width="80" height="80" fill={p.bg} />
      <g opacity="0.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x="0" y={i * 5} width="80" height="2" fill={p.stripe} />
        ))}
      </g>
      <text x="40" y="48" textAnchor="middle" fontFamily={theme.fonts.display} fontSize="26" fill={p.fg} fontWeight="600">{initials}</text>
    </svg>
  );
}

// Audio waveform placeholder
function Waveform({ theme, progress = 0, onSeek, height = 56 }) {
  const bars = 120;
  const heights = useMemo(() => Array.from({ length: bars }, (_, i) => {
    // deterministic pseudo-random
    const v = Math.sin(i * 0.7) * 0.35 + Math.sin(i * 1.9) * 0.3 + Math.cos(i * 0.3) * 0.2;
    return Math.max(0.18, Math.min(1, 0.55 + v));
  }), []);
  return (
    <div
      role="slider"
      aria-label="Audio scrubber"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={Math.round(progress * 100)}
      tabIndex="0"
      style={{ display: 'flex', alignItems: 'center', gap: 2, height, cursor: 'pointer', padding: '0 2px' }}
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onSeek && onSeek((e.clientX - r.left) / r.width);
      }}
    >
      {heights.map((h, i) => {
        const filled = i / bars <= progress;
        return (
          <div key={i} style={{
            flex: 1,
            height: `${h * 100}%`,
            background: filled ? theme.color.brand : theme.color.rule,
            borderRadius: 1,
            transition: 'background 0.15s'
          }} />
        );
      })}
    </div>
  );
}

// ---------- PAGE: HOME ----------
function HomePage({ theme, onNav, density }) {
  const c = theme.color;
  const [heroIdx, setHeroIdx] = useState(0);
  const heroes = [
    { caption: 'Spy Pond, c. 1948', credit: 'AHS Photograph Collection' },
    { caption: 'Mass Ave at Medford St., 1962', credit: 'AHS Photograph Collection' },
    { caption: 'Jason Russell House, 1925', credit: 'AHS Photograph Collection' }
  ];
  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % heroes.length), 5000);
    return () => clearInterval(id);
  }, []);

  const featured = AHS_DATA.interviews.find(i => i.featured);
  const recents = AHS_DATA.interviews.slice(1, 5);

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', height: 480, background: c.paperAlt, overflow: 'hidden' }}>
        {/* Striped placeholder photo */}
        <svg width="100%" height="100%" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <defs>
            <pattern id={`hp-${theme.name}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke={c.rule} strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="1200" height="480" fill={c.paperAlt} />
          <rect width="1200" height="480" fill={`url(#hp-${theme.name})`} opacity="0.4" />
          {/* sketchy skyline */}
          <g opacity="0.35" fill={c.inkSoft}>
            <rect x="80" y="280" width="120" height="200" />
            <polygon points="80,280 140,220 200,280" />
            <rect x="240" y="320" width="160" height="160" />
            <rect x="440" y="260" width="100" height="220" />
            <polygon points="440,260 490,200 540,260" />
            <rect x="580" y="300" width="180" height="180" />
            <rect x="800" y="280" width="120" height="200" />
            <polygon points="800,280 860,210 920,280" />
            <rect x="960" y="320" width="160" height="160" />
          </g>
        </svg>
        <div style={{ position: 'absolute', inset: 0, background: theme.headerStyle === 'block' ? 'linear-gradient(180deg, rgba(14,27,44,0.55) 0%, rgba(14,27,44,0.85) 100%)' : 'linear-gradient(180deg, rgba(31,26,20,0.15) 0%, rgba(31,26,20,0.55) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', padding: '80px 48px', color: theme.headerStyle === 'block' ? c.brandInk : '#fff' }}>
          <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 16 }}>
            Arlington Historical Society · Oral History Project
          </div>
          <h1 style={{ fontFamily: theme.fonts.display, fontSize: density === 'compact' ? 52 : 64, lineHeight: 1.05, margin: 0, fontWeight: theme.name === 'Field Notes' ? 400 : 600, maxWidth: 820, textWrap: 'balance' }}>
            The voices that built Arlington — preserved in their own words.
          </h1>
          <p style={{ fontFamily: theme.fonts.body, fontSize: 18, lineHeight: 1.5, marginTop: 20, maxWidth: 640, opacity: 0.95 }}>
            Eighty-one recorded interviews. Six collections. Three centuries of life along the Mystic — from minutemen to mill-workers to Mass Ave shopkeepers.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button onClick={() => onNav('browse')} style={{ fontFamily: theme.fonts.body, padding: '14px 28px', background: c.brand, color: c.brandInk, border: 'none', borderRadius: theme.radius, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Start listening →
            </button>
            <button onClick={() => onNav('about')} style={{ fontFamily: theme.fonts.body, padding: '14px 28px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.7)', borderRadius: theme.radius, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
              About the project
            </button>
          </div>
        </div>
        {/* Hero caption */}
        <div style={{ position: 'absolute', bottom: 16, right: 24, fontFamily: theme.fonts.mono, fontSize: 11, color: '#fff', opacity: 0.85, letterSpacing: '0.05em' }}>
          {heroes[heroIdx].caption} · {heroes[heroIdx].credit}
        </div>
        {/* Hero dots */}
        <div style={{ position: 'absolute', bottom: 16, left: 24, display: 'flex', gap: 8 }}>
          {heroes.map((_, i) => (
            <button key={i} aria-label={`Hero image ${i + 1}`} onClick={() => setHeroIdx(i)} style={{ width: 24, height: 3, border: 'none', padding: 0, cursor: 'pointer', background: i === heroIdx ? '#fff' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </section>

      {/* FEATURED INTERVIEW */}
      <section style={{ background: c.paper, padding: '64px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader theme={theme} kicker="Featured interview" title="Eleanor Russell on the Jason Russell House" />
          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, marginTop: 32, alignItems: 'start' }}>
            <Portrait name={featured.name} theme={theme} size={320} />
            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkSoft, marginBottom: 12 }}>
                {featured.years} · Recorded {featured.recorded} · {featured.length}
              </div>
              <p style={{ fontFamily: theme.fonts.display, fontSize: 22, lineHeight: 1.4, color: c.ink, margin: 0, fontWeight: 400, fontStyle: 'italic' }}>
                "I gave my first tour in a yellow dress. I was so nervous I forgot the date of the battle. A boy of about ten corrected me — April nineteenth, ma'am, he said, very serious. I never forgot it again."
              </p>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 16, lineHeight: 1.6, color: c.inkSoft, marginTop: 20 }}>
                {featured.summary}
              </p>
              <button onClick={() => onNav('interview')} style={{ marginTop: 20, fontFamily: theme.fonts.body, padding: '12px 24px', background: c.accent, color: '#fff', border: 'none', borderRadius: theme.radius, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Listen to the full interview →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT */}
      <section style={{ background: c.paperAlt, padding: '64px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <SectionHeader theme={theme} kicker="Recently added" title="New to the collection" />
            <a onClick={() => onNav('browse')} style={{ fontFamily: theme.fonts.body, fontSize: 14, color: c.brand, cursor: 'pointer', fontWeight: 600 }}>Browse all 81 →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 32 }}>
            {recents.map(iv => (
              <article key={iv.id} onClick={() => onNav('interview')} style={{ background: c.paper, padding: 20, borderRadius: theme.radius, boxShadow: theme.cardShadow, cursor: 'pointer', border: theme.cardShadow === 'none' ? `1px solid ${c.rule}` : 'none' }}>
                <Portrait name={iv.name} theme={theme} size={80} />
                <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkSoft, marginTop: 16 }}>
                  {AHS_DATA.collections.find(co => co.id === iv.collection).title}
                </div>
                <h3 style={{ fontFamily: theme.fonts.display, fontSize: 18, margin: '6px 0 8px', color: c.ink, fontWeight: 600 }}>{iv.name}</h3>
                <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.5, color: c.inkSoft, margin: 0 }}>{iv.summary.slice(0, 110)}…</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS STRIP */}
      <section style={{ background: c.paper, padding: '64px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionHeader theme={theme} kicker="Explore by theme" title="Six curated collections" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
            {AHS_DATA.collections.slice(0, 6).map(co => (
              <a key={co.id} onClick={() => onNav('collection')} style={{
                display: 'block', padding: 24, borderRadius: theme.radius, cursor: 'pointer',
                borderTop: `3px solid ${c.brand}`, background: c.accentSoft
              }}>
                <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: c.inkSoft, letterSpacing: '0.08em' }}>{co.years} · {co.count} interviews</div>
                <h3 style={{ fontFamily: theme.fonts.display, fontSize: 20, margin: '8px 0 10px', color: c.ink, fontWeight: 600 }}>{co.title}</h3>
                <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.5, color: c.inkSoft, margin: 0 }}>{co.blurb}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable section header — varies by theme
function SectionHeader({ theme, kicker, title }) {
  const c = theme.color;
  if (theme.headerStyle === 'block') {
    return (
      <div>
        <div style={{ display: 'inline-block', background: c.accent, color: '#fff', padding: '4px 10px', fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>{kicker}</div>
        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 32, margin: '12px 0 0', color: c.ink, fontWeight: 600 }}>{title}</h2>
      </div>
    );
  }
  if (theme.headerStyle === 'serif') {
    return (
      <div>
        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 36, margin: 0, color: c.ink, fontWeight: 400, fontStyle: 'italic' }}>{title}</h2>
        <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: c.inkSoft, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 6 }}>— {kicker}</div>
      </div>
    );
  }
  return (
    <div>
      <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: c.brand, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>{kicker}</div>
      <h2 style={{ fontFamily: theme.fonts.display, fontSize: 32, margin: '8px 0 0', color: c.ink, fontWeight: 600, paddingBottom: 8, borderBottom: `2px solid ${c.ink}`, display: 'inline-block' }}>{title}</h2>
    </div>
  );
}

// Export
window.AHS_THEMES = AHS_THEMES;
window.AHS_HomePage = HomePage;
window.AHS_SectionHeader = SectionHeader;
window.AHS_Portrait = Portrait;
window.AHS_Waveform = Waveform;
window.AHS_fmtTime = fmtTime;
