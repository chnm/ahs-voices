// AHS shell: global header, footer, nav, skip link.
// Wraps any page in `children`.

const { useState: useStateShell, useEffect: useEffectShell } = React;

function AHSShell({ theme, page, onNav, density, children }) {
  const c = theme.color;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse' },
    { id: 'collections', label: 'Collections' },
    { id: 'exhibits', label: 'Exhibits' },
    { id: 'about', label: 'About' }
  ];

  return (
    <div style={{ background: c.paper, color: c.ink, minHeight: '100%', fontFamily: theme.fonts.body }}>
      {/* Skip link */}
      <a href="#main" style={{
        position: 'absolute', left: 0, top: -40, padding: '8px 16px',
        background: c.ink, color: c.paper, zIndex: 100,
        fontFamily: theme.fonts.body, fontSize: 13, fontWeight: 600
      }} onFocus={e => e.target.style.top = '0'} onBlur={e => e.target.style.top = '-40px'}>
        Skip to main content
      </a>

      {/* Pre-header strip */}
      <div style={{ background: c.paperAlt, borderBottom: `1px solid ${c.paperAltRule}`, fontSize: 12, fontFamily: theme.fonts.mono, color: c.paperAltInkSoft }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '8px 48px', display: 'flex', justifyContent: 'space-between' }}>
          <span>An ongoing project of the <a href="#" style={{ color: c.paperAltInk, textDecoration: 'underline' }}>Arlington Historical Society</a></span>
          <span>
            <a href="#" style={{ color: c.paperAltInkSoft, marginRight: 16, textDecoration: 'none' }}>Visit AHS</a>
            <a href="#" style={{ color: c.paperAltInkSoft, marginRight: 16, textDecoration: 'none' }}>Donate</a>
            <a href="#" style={{ color: c.paperAltInkSoft, textDecoration: 'none' }}>Contribute a story</a>
          </span>
        </div>
      </div>

      {/* HEADER */}
      <header style={
        theme.headerStyle === 'block' ? {
          background: c.accent, color: c.brandInk
        } : theme.headerStyle === 'serif' ? {
          background: c.paper, borderBottom: `1px solid ${c.rule}`
        } : {
          background: c.paper, borderBottom: `1px solid ${c.ink}`,
          boxShadow: `0 4px 0 ${c.paper}, 0 5px 0 ${c.ink}` // double rule
        }
      }>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a onClick={() => onNav('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Logomark */}
            <Logomark theme={theme} />
            <div>
              <div style={{ fontFamily: theme.fonts.display, fontSize: 22, lineHeight: 1, fontWeight: theme.name === 'Field Notes' ? 400 : 600, color: theme.headerStyle === 'block' ? c.brandInk : c.ink, fontStyle: theme.name === 'Field Notes' ? 'italic' : 'normal' }}>
                Arlington Historical Society
              </div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4, color: theme.headerStyle === 'block' ? c.brandInk : c.brand, fontWeight: 700, opacity: theme.headerStyle === 'block' ? 0.85 : 1 }}>
                Oral History Project
              </div>
            </div>
          </a>

          <nav aria-label="Main">
            <ul style={{ display: 'flex', gap: 4, listStyle: 'none', padding: 0, margin: 0, fontFamily: theme.fonts.body }}>
              {navItems.map(item => {
                const active = page === item.id || (item.id === 'browse' && page === 'interview') || (item.id === 'collections' && page === 'collection');
                const isBlock = theme.headerStyle === 'block';
                return (
                  <li key={item.id}>
                    <a onClick={() => onNav(item.id)} style={{
                      cursor: 'pointer', padding: '8px 14px', display: 'inline-block',
                      fontSize: 14, fontWeight: 500,
                      color: isBlock
                        ? (active ? c.brandInk : 'rgba(245,233,208,0.85)')
                        : (active ? c.brand : c.ink),
                      borderBottom: active && !isBlock ? `2px solid ${c.brand}` : '2px solid transparent',
                      borderTop: active && isBlock ? `2px solid ${c.brandInk}` : '2px solid transparent'
                    }} aria-current={active ? 'page' : undefined}>
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a onClick={() => onNav('search')} aria-label="Search" style={{
                  cursor: 'pointer', padding: '8px 14px', display: 'inline-block',
                  color: theme.headerStyle === 'block' ? c.brandInk : c.ink, fontSize: 14
                }}>
                  ⌕ Search
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>

      {/* FOOTER */}
      <footer style={{ background: c.paperAlt === c.paper ? c.accentSoft : c.paperAlt, borderTop: `4px solid ${c.paperAltBrand}`, padding: '48px 48px 24px', marginTop: 0 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Logomark theme={theme} onPaperAlt={true} />
              <div style={{ fontFamily: theme.fonts.display, fontSize: 18, fontWeight: 600, color: c.paperAltInk }}>Arlington Historical Society</div>
            </div>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.6, color: c.paperAltInkSoft, marginTop: 16 }}>
              7 Jason Street, Arlington, MA 02476<br />
              Established 1897 · A 501(c)(3) nonprofit
            </p>
            <p style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: c.paperAltInkSoft, marginTop: 16, letterSpacing: '0.05em' }}>
              Powered by Omeka Classic · Theme: AHS Voices
            </p>
          </div>
          <FooterCol theme={theme} title="Explore" links={['Browse interviews', 'Collections', 'Exhibits', 'Search transcripts', 'Map of stories']} />
          <FooterCol theme={theme} title="The Society" links={['Visit AHS', 'Jason Russell House', 'Membership', 'Donate', 'Volunteer']} />
          <FooterCol theme={theme} title="Project" links={['About', 'Contribute a story', 'Rights & permissions', 'Accessibility', 'Contact']} />
        </div>
        <div style={{ maxWidth: 1200, margin: '32px auto 0', paddingTop: 16, borderTop: `1px solid ${c.paperAltRule}`, display: 'flex', justifyContent: 'space-between', fontFamily: theme.fonts.mono, fontSize: 11, color: c.paperAltInkSoft, letterSpacing: '0.05em' }}>
          <span>© 1897–2026 Arlington Historical Society. Recordings shared under CC BY-NC 4.0.</span>
          <span>WCAG 2.1 AA · This site is keyboard navigable</span>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ theme, title, links }) {
  const c = theme.color;
  return (
    <div>
      <h3 style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.paperAltInk, fontWeight: 700, margin: '0 0 14px' }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: theme.fonts.body, fontSize: 13 }}>
        {links.map(l => <li key={l}><a href="#" style={{ color: c.paperAltInkSoft, textDecoration: 'none' }}>{l}</a></li>)}
      </ul>
    </div>
  );
}

// Logomark — varies by theme
function Logomark({ theme }) {
  const c = theme.color;
  const fg = theme.headerStyle === 'block' ? c.brandInk : c.brand;
  if (theme.name === 'Field Notes') {
    // Minimalist serif "A" inside a square outline
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
        <rect x="1" y="1" width="40" height="40" fill="none" stroke={fg} strokeWidth="1.5" />
        <text x="21" y="29" textAnchor="middle" fontFamily={theme.fonts.display} fontSize="22" fill={fg} fontWeight="400" fontStyle="italic">A</text>
      </svg>
    );
  }
  if (theme.name === "Patriots' Path") {
    // Star + horizontal lines
    return (
      <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
        <rect width="42" height="42" fill={c.accent} rx={theme.radius} />
        <polygon points="21,9 24,16 32,17 26,22 28,30 21,26 14,30 16,22 10,17 18,16" fill={c.brandInk} />
      </svg>
    );
  }
  // Menotomy: house silhouette (Jason Russell)
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" aria-hidden="true">
      <rect width="42" height="42" fill="none" />
      <g fill={fg}>
        <polygon points="21,6 35,18 35,36 7,36 7,18" />
      </g>
      <rect x="18" y="24" width="6" height="12" fill={c.paper} />
      <rect x="11" y="22" width="5" height="5" fill={c.paper} />
      <rect x="26" y="22" width="5" height="5" fill={c.paper} />
    </svg>
  );
}

window.AHSShell = AHSShell;
