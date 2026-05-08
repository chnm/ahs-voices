// AHS Oral History — Browse, Interview, Collection, Collections, Search, About, Exhibits pages.
// All consume the global theme + shared components from prototype-shared.jsx.

const AHS_Portrait_p = window.AHS_Portrait;
const AHS_Waveform_p = window.AHS_Waveform;
const AHS_SectionHeader_p = window.AHS_SectionHeader;
const fmtTime_p = window.AHS_fmtTime;

// ---------- BROWSE ----------
function BrowsePage({ theme, onNav, density }) {
  const c = theme.color;
  const [layout, setLayout] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({ collection: null, decade: null, neighborhood: null, topic: null });
  const [sort, setSort] = useState('recent');

  const allTopics = [...new Set(AHS_DATA.interviews.flatMap(i => i.topics))].sort();
  const neighborhoods = [...new Set(AHS_DATA.interviews.map(i => i.neighborhood))].sort();
  const decades = ['2020s', '2010s', '2000s', '1990s'];

  const toggle = (cat, val) => setActiveFilters(f => ({ ...f, [cat]: f[cat] === val ? null : val }));
  const filters = AHS_DATA.interviews.filter(iv =>
    (!activeFilters.collection || iv.collection === activeFilters.collection) &&
    (!activeFilters.neighborhood || iv.neighborhood === activeFilters.neighborhood) &&
    (!activeFilters.topic || iv.topics.includes(activeFilters.topic))
  );

  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <PageHeader theme={theme} kicker="Collection" title="Browse interviews" subtitle={`${filters.length} of ${AHS_DATA.interviews.length} interviews shown`} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px 64px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
        {/* SIDEBAR */}
        <aside style={{ fontFamily: theme.fonts.body }}>
          <FacetGroup theme={theme} title="Collection" items={AHS_DATA.collections.map(co => ({ id: co.id, label: co.title, count: co.count }))} active={activeFilters.collection} onToggle={(id) => toggle('collection', id)} />
          <FacetGroup theme={theme} title="Decade recorded" items={decades.map(d => ({ id: d, label: d, count: Math.floor(Math.random() * 12) + 3 }))} active={activeFilters.decade} onToggle={(id) => toggle('decade', id)} />
          <FacetGroup theme={theme} title="Neighborhood" items={neighborhoods.map(n => ({ id: n, label: n, count: AHS_DATA.interviews.filter(i => i.neighborhood === n).length }))} active={activeFilters.neighborhood} onToggle={(id) => toggle('neighborhood', id)} />
          <FacetGroup theme={theme} title="Topic" items={allTopics.slice(0, 8).map(t => ({ id: t, label: t, count: AHS_DATA.interviews.filter(i => i.topics.includes(t)).length }))} active={activeFilters.topic} onToggle={(id) => toggle('topic', id)} />
        </aside>

        {/* RESULTS */}
        <div>
          {/* toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${c.rule}` }}>
            <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, color: c.inkSoft, letterSpacing: '0.05em' }}>
              {Object.values(activeFilters).filter(Boolean).length > 0 && (
                <span>Filtered · </span>
              )}
              Showing {filters.length} interviews
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <label style={{ fontFamily: theme.fonts.body, fontSize: 13, color: c.inkSoft }}>
                Sort:
                <select value={sort} onChange={e => setSort(e.target.value)} style={{ marginLeft: 8, fontFamily: theme.fonts.body, fontSize: 13, padding: '4px 8px', borderRadius: theme.radius, border: `1px solid ${c.rule}`, background: c.paper, color: c.ink }}>
                  <option value="recent">Recently added</option>
                  <option value="alpha">Name A–Z</option>
                  <option value="length">Length</option>
                </select>
              </label>
              <div role="radiogroup" aria-label="Layout" style={{ display: 'flex', border: `1px solid ${c.rule}`, borderRadius: theme.radius }}>
                <button onClick={() => setLayout('grid')} aria-pressed={layout === 'grid'} style={{ padding: '6px 12px', background: layout === 'grid' ? c.ink : 'transparent', color: layout === 'grid' ? c.paper : c.ink, border: 'none', cursor: 'pointer', fontFamily: theme.fonts.body, fontSize: 12 }}>Grid</button>
                <button onClick={() => setLayout('list')} aria-pressed={layout === 'list'} style={{ padding: '6px 12px', background: layout === 'list' ? c.ink : 'transparent', color: layout === 'list' ? c.paper : c.ink, border: 'none', cursor: 'pointer', fontFamily: theme.fonts.body, fontSize: 12 }}>List</button>
              </div>
            </div>
          </div>

          {/* active filters */}
          {Object.entries(activeFilters).filter(([_, v]) => v).length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '14px 0', borderBottom: `1px solid ${c.rule}` }}>
              {Object.entries(activeFilters).filter(([_, v]) => v).map(([k, v]) => (
                <button key={k} onClick={() => toggle(k, v)} style={{ fontFamily: theme.fonts.body, fontSize: 12, padding: '4px 10px', background: c.brand, color: c.brandInk, border: 'none', borderRadius: theme.radius, cursor: 'pointer' }}>
                  {v} ✕
                </button>
              ))}
              <button onClick={() => setActiveFilters({ collection: null, decade: null, neighborhood: null, topic: null })} style={{ fontFamily: theme.fonts.body, fontSize: 12, color: c.inkSoft, background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Clear all</button>
            </div>
          )}

          {/* results */}
          {layout === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 24 }}>
              {filters.map(iv => (
                <article key={iv.id} onClick={() => onNav('interview')} style={{ background: c.paper, padding: 20, borderRadius: theme.radius, boxShadow: theme.cardShadow, cursor: 'pointer', border: theme.cardShadow === 'none' ? `1px solid ${c.rule}` : 'none' }}>
                  <Portrait name={iv.name} theme={theme} size={120} />
                  <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.brand, marginTop: 16, fontWeight: 700 }}>
                    {AHS_DATA.collections.find(co => co.id === iv.collection).title}
                  </div>
                  <h3 style={{ fontFamily: theme.fonts.display, fontSize: 19, margin: '6px 0 4px', color: c.ink, fontWeight: 600 }}>{iv.name}</h3>
                  <div style={{ fontFamily: theme.fonts.body, fontSize: 12, color: c.inkSoft, marginBottom: 10 }}>{iv.years} · {iv.length}</div>
                  <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.5, color: c.inkSoft, margin: 0 }}>{iv.summary.slice(0, 130)}…</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                    {iv.topics.slice(0, 2).map(t => <Tag key={t} theme={theme} label={t} />)}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
              {filters.map(iv => (
                <li key={iv.id} onClick={() => onNav('interview')} style={{ display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 20, padding: '20px 0', borderBottom: `1px solid ${c.rule}`, cursor: 'pointer', alignItems: 'center' }}>
                  <Portrait name={iv.name} theme={theme} size={64} />
                  <div>
                    <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: c.brand, fontWeight: 700 }}>
                      {AHS_DATA.collections.find(co => co.id === iv.collection).title}
                    </div>
                    <h3 style={{ fontFamily: theme.fonts.display, fontSize: 18, margin: '4px 0 2px', color: c.ink, fontWeight: 600 }}>{iv.name} <span style={{ color: c.inkSoft, fontWeight: 400, fontSize: 14 }}>· {iv.years}</span></h3>
                    <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.5, color: c.inkSoft, margin: '4px 0 0' }}>{iv.summary}</p>
                  </div>
                  <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, color: c.inkSoft, textAlign: 'right' }}>{iv.length}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function FacetGroup({ theme, title, items, active, onToggle }) {
  const c = theme.color;
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.ink, margin: '0 0 12px', fontWeight: 700, paddingBottom: 6, borderBottom: `1.5px solid ${c.ink}` }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li key={item.id}>
            <button onClick={() => onToggle(item.id)} style={{
              display: 'flex', justifyContent: 'space-between', width: '100%', textAlign: 'left',
              padding: '6px 0', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: theme.fonts.body, fontSize: 13, color: active === item.id ? c.brand : c.ink,
              fontWeight: active === item.id ? 700 : 400
            }}>
              <span>{active === item.id ? '✓ ' : ''}{item.label}</span>
              <span style={{ color: c.inkSoft, fontVariantNumeric: 'tabular-nums' }}>{item.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Tag({ theme, label, onClick }) {
  const c = theme.color;
  return (
    <span onClick={onClick} style={{
      fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.05em', textTransform: 'uppercase',
      padding: '3px 8px', background: c.accentSoft, color: c.tag, borderRadius: theme.radius,
      cursor: onClick ? 'pointer' : 'default', fontWeight: 600
    }}>{label}</span>
  );
}

function PageHeader({ theme, kicker, title, subtitle }) {
  const c = theme.color;
  return (
    <div style={{ background: c.paperAlt, padding: '48px 48px 32px', borderBottom: `1px solid ${c.paperAltRule}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.paperAltBrand, fontWeight: 700 }}>{kicker}</div>
        <h1 style={{ fontFamily: theme.fonts.display, fontSize: 44, margin: '8px 0 12px', color: c.paperAltInk, fontWeight: 600, lineHeight: 1.1 }}>{title}</h1>
        {subtitle && <div style={{ fontFamily: theme.fonts.body, fontSize: 15, color: c.paperAltInkSoft }}>{subtitle}</div>}
      </div>
    </div>
  );
}

// ---------- INTERVIEW (the heart of the site) ----------
function InterviewPage({ theme, onNav, density }) {
  const c = theme.color;
  const iv = AHS_DATA.interviews[0];
  const collection = AHS_DATA.collections.find(co => co.id === iv.collection);
  const transcript = AHS_DATA.transcript;
  const totalLen = 6138; // 1:42:18

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSeg, setActiveSeg] = useState(0);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [showCite, setShowCite] = useState(false);
  const transcriptRef = useRef(null);

  // simulate playback
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setCurrentTime(t => Math.min(totalLen, t + 1)), 1000);
    return () => clearInterval(id);
  }, [playing]);

  // sync active segment
  useEffect(() => {
    let idx = 0;
    for (let i = 0; i < transcript.length; i++) {
      if (transcript[i].t <= currentTime) idx = i;
    }
    if (idx !== activeSeg) setActiveSeg(idx);
  }, [currentTime]);

  const seekTo = (t) => { setCurrentTime(t); };
  const seekFrac = (f) => { setCurrentTime(Math.floor(f * totalLen)); };

  const filteredSegs = transcriptSearch
    ? transcript.map((s, i) => ({ ...s, _i: i })).filter(s => s.text.toLowerCase().includes(transcriptSearch.toLowerCase()))
    : transcript.map((s, i) => ({ ...s, _i: i }));

  const related = AHS_DATA.interviews.filter(x => x.id !== iv.id && (x.collection === iv.collection || x.topics.some(t => iv.topics.includes(t)))).slice(0, 3);

  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      {/* Breadcrumb */}
      <div style={{ background: c.paperAlt, borderBottom: `1px solid ${c.paperAltRule}`, padding: '14px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', fontFamily: theme.fonts.mono, fontSize: 11, color: c.paperAltInkSoft, letterSpacing: '0.05em' }}>
          <a onClick={() => onNav('home')} style={{ color: c.paperAltInkSoft, cursor: 'pointer' }}>Home</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <a onClick={() => onNav('browse')} style={{ color: c.paperAltInkSoft, cursor: 'pointer' }}>Browse</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <a onClick={() => onNav('collection')} style={{ color: c.paperAltInkSoft, cursor: 'pointer' }}>{collection.title}</a>
          <span style={{ margin: '0 8px' }}>›</span>
          <span style={{ color: c.paperAltInk }}>{iv.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 48px 0', display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32 }}>
        <Portrait name={iv.name} theme={theme} size={180} />
        <div>
          <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.brand, fontWeight: 700 }}>
            {collection.title}
          </div>
          <h1 style={{ fontFamily: theme.fonts.display, fontSize: 48, margin: '8px 0 6px', color: c.ink, fontWeight: 600, lineHeight: 1.05 }}>{iv.name}</h1>
          <div style={{ fontFamily: theme.fonts.body, fontSize: 16, color: c.inkSoft, marginBottom: 20 }}>
            {iv.years} · {iv.neighborhood}
          </div>
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 18px', margin: 0, fontFamily: theme.fonts.body, fontSize: 14 }}>
            <dt style={{ color: c.inkSoft, fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Recorded</dt>
            <dd style={{ margin: 0, color: c.ink }}>{iv.recorded}</dd>
            <dt style={{ color: c.inkSoft, fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Length</dt>
            <dd style={{ margin: 0, color: c.ink, fontVariantNumeric: 'tabular-nums' }}>{iv.length}</dd>
            <dt style={{ color: c.inkSoft, fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Interviewer</dt>
            <dd style={{ margin: 0, color: c.ink }}>{iv.interviewer}</dd>
            <dt style={{ color: c.inkSoft, fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Topics</dt>
            <dd style={{ margin: 0 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {iv.topics.map(t => <Tag key={t} theme={theme} label={t} onClick={() => onNav('search')} />)}
              </div>
            </dd>
          </dl>
        </div>
      </div>

      {/* Audio player */}
      <div style={{ maxWidth: 1200, margin: '32px auto 0', padding: '0 48px' }}>
        <div style={{ background: c.accent, color: '#fff', padding: 24, borderRadius: theme.radius }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid #fff', background: '#fff', color: c.accent, fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {playing ? '❚❚' : '▶'}
            </button>
            <div style={{ flex: 1 }}>
              <Waveform theme={{ ...theme, color: { ...c, brand: '#fff', rule: 'rgba(255,255,255,0.3)' } }} progress={currentTime / totalLen} onSeek={seekFrac} height={48} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: theme.fonts.mono, fontSize: 12, marginTop: 6, opacity: 0.85 }}>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtTime(currentTime)}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{iv.length}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <button style={btnGhostLight(theme)} title="Download audio">↓ Audio</button>
              <button style={btnGhostLight(theme)} title="Download transcript">↓ PDF</button>
              <button onClick={() => setShowCite(s => !s)} style={btnGhostLight(theme)} title="Cite">⌗ Cite</button>
            </div>
          </div>
        </div>

        {showCite && <CitationBlock theme={theme} interview={iv} onClose={() => setShowCite(false)} />}
      </div>

      {/* Body: summary + transcript */}
      <div style={{ maxWidth: 1200, margin: '40px auto 0', padding: '0 48px 64px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48 }}>
        <div>
          {/* Summary */}
          <section>
            <h2 style={{ fontFamily: theme.fonts.display, fontSize: 24, margin: '0 0 12px', color: c.ink, fontWeight: 600 }}>Abstract</h2>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 16, lineHeight: 1.7, color: c.ink, margin: 0 }}>{iv.summary} Eleanor served as a docent at the Jason Russell House from 1962 until 2009, leading thousands of school groups through the historic site. She passed away in 2014.</p>
          </section>

          {/* Transcript */}
          <section style={{ marginTop: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${c.ink}`, paddingBottom: 10, marginBottom: 20 }}>
              <h2 style={{ fontFamily: theme.fonts.display, fontSize: 24, margin: 0, color: c.ink, fontWeight: 600 }}>Transcript</h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  type="search"
                  value={transcriptSearch}
                  onChange={e => setTranscriptSearch(e.target.value)}
                  placeholder="Search transcript…"
                  aria-label="Search transcript"
                  style={{ fontFamily: theme.fonts.body, fontSize: 13, padding: '6px 10px', border: `1px solid ${c.rule}`, borderRadius: theme.radius, background: c.paper, color: c.ink, width: 200 }}
                />
              </div>
            </div>

            <div ref={transcriptRef}>
              {filteredSegs.map((seg) => {
                const isActive = seg._i === activeSeg && !transcriptSearch;
                return (
                  <div key={seg._i} onClick={() => seekTo(seg.t)} style={{
                    display: 'grid', gridTemplateColumns: '64px 1fr', gap: 20, padding: '12px 16px',
                    cursor: 'pointer', borderRadius: theme.radius,
                    background: isActive ? c.accentSoft : 'transparent',
                    borderLeft: isActive ? `3px solid ${c.brand}` : '3px solid transparent',
                    marginLeft: isActive ? 0 : 0,
                    transition: 'background 0.2s'
                  }}>
                    <button onClick={(e) => { e.stopPropagation(); seekTo(seg.t); }} aria-label={`Jump to ${fmtTime(seg.t)}`} style={{ fontFamily: theme.fonts.mono, fontSize: 12, color: isActive ? c.brand : c.inkSoft, fontVariantNumeric: 'tabular-nums', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, alignSelf: 'start', marginTop: 2, fontWeight: isActive ? 700 : 400 }}>
                      {fmtTime(seg.t)}
                    </button>
                    <div>
                      <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: c.inkSoft, fontWeight: 700, marginBottom: 4 }}>{seg.speaker}</div>
                      <p style={{ fontFamily: theme.fonts.body, fontSize: 15, lineHeight: 1.65, color: c.ink, margin: 0 }}>
                        {transcriptSearch ? highlight(seg.text, transcriptSearch, c.brand) : seg.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: 24 }}>
            <h3 style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.ink, margin: '0 0 12px', fontWeight: 700, paddingBottom: 6, borderBottom: `1.5px solid ${c.ink}` }}>Related interviews</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {related.map(r => (
                <li key={r.id} onClick={() => onNav('interview')} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${c.rule}`, cursor: 'pointer', alignItems: 'center' }}>
                  <Portrait name={r.name} theme={theme} size={48} />
                  <div>
                    <div style={{ fontFamily: theme.fonts.display, fontSize: 14, fontWeight: 600, color: c.ink }}>{r.name}</div>
                    <div style={{ fontFamily: theme.fonts.mono, fontSize: 10, color: c.inkSoft, letterSpacing: '0.05em' }}>{r.length} · {r.years}</div>
                  </div>
                </li>
              ))}
            </ul>

            <h3 style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: c.ink, margin: '32px 0 12px', fontWeight: 700, paddingBottom: 6, borderBottom: `1.5px solid ${c.ink}` }}>Rights & access</h3>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.55, color: c.inkSoft, margin: 0 }}>
              © Arlington Historical Society. Available for non-commercial educational use under <a href="#" style={{ color: c.brand }}>CC BY-NC 4.0</a>.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function highlight(text, query, color) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <React.Fragment>
      {text.slice(0, idx)}
      <mark style={{ background: color, color: '#fff', padding: '0 2px' }}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </React.Fragment>
  );
}

function btnGhostLight(theme) {
  return {
    fontFamily: theme.fonts.body, fontSize: 12, padding: '8px 14px',
    background: 'rgba(255,255,255,0.12)', color: '#fff',
    border: '1px solid rgba(255,255,255,0.4)', borderRadius: theme.radius,
    cursor: 'pointer', fontWeight: 500
  };
}

function CitationBlock({ theme, interview, onClose }) {
  const c = theme.color;
  const [style, setStyle] = useState('chicago');
  const citations = {
    chicago: `Russell, Eleanor. Interview by Margaret Chen, June 14, 2008. Patriots' Day & the Battle Road, Arlington Historical Society Oral History Collection, Arlington, MA. https://oralhistory.arlingtonhistorical.org/items/show/${interview.id}.`,
    mla: `Russell, Eleanor. Interview by Margaret Chen. 14 June 2008. Patriots' Day & the Battle Road, Arlington Historical Society Oral History Collection, oralhistory.arlingtonhistorical.org/items/show/${interview.id}.`,
    apa: `Russell, E. (2008, June 14). Personal interview by M. Chen [Audio recording]. Arlington Historical Society Oral History Collection. https://oralhistory.arlingtonhistorical.org/items/show/${interview.id}`
  };
  return (
    <div style={{ marginTop: 16, padding: 20, background: c.paperAlt, border: `1px solid ${c.rule}`, borderRadius: theme.radius }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {['chicago', 'mla', 'apa'].map(s => (
            <button key={s} onClick={() => setStyle(s)} style={{
              fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '6px 12px', border: 'none', cursor: 'pointer', borderRadius: theme.radius,
              background: style === s ? c.ink : 'transparent', color: style === s ? c.paper : c.ink, fontWeight: 700
            }}>{s}</button>
          ))}
        </div>
        <button onClick={onClose} aria-label="Close citation" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, color: c.inkSoft }}>✕</button>
      </div>
      <p style={{ fontFamily: theme.fonts.body, fontSize: 14, lineHeight: 1.6, color: c.ink, margin: 0 }}>{citations[style]}</p>
      <button style={{ marginTop: 12, fontFamily: theme.fonts.body, fontSize: 12, padding: '6px 12px', background: c.brand, color: c.brandInk, border: 'none', borderRadius: theme.radius, cursor: 'pointer', fontWeight: 600 }}>Copy citation</button>
    </div>
  );
}

// ---------- COLLECTION ----------
function CollectionPage({ theme, onNav }) {
  const c = theme.color;
  const co = AHS_DATA.collections[0]; // Patriots' Day
  const items = AHS_DATA.interviews.filter(i => i.collection === co.id || i.topics.some(t => co.title.includes(t.split(' ')[0])));
  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <PageHeader theme={theme} kicker="Collection" title={co.title} subtitle={`${co.years} · ${co.count} interviews`} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 48px 16px' }}>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 18, lineHeight: 1.7, color: c.ink, margin: 0 }}>
          {co.blurb} This collection brings together first-person accounts passed down through Arlington families, supplemented by interviews with the docents, historians, and re-enactors who keep the events of April 19, 1775 alive in the town's civic life.
        </p>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 15, lineHeight: 1.7, color: c.inkSoft, marginTop: 16 }}>
          Curated by Margaret Chen with support from the Arlington 250 Committee. Recordings made between 2008 and 2024.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 48px 64px' }}>
        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 24, color: c.ink, fontWeight: 600, paddingBottom: 8, borderBottom: `2px solid ${c.ink}`, display: 'inline-block' }}>Interviews in this collection</h2>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 24 }}>
          {AHS_DATA.interviews.slice(0, 6).map((iv, i) => (
            <li key={iv.id} onClick={() => onNav('interview')} style={{ display: 'grid', gridTemplateColumns: '40px 80px 1fr auto', gap: 24, padding: '20px 0', borderBottom: `1px solid ${c.rule}`, cursor: 'pointer', alignItems: 'center' }}>
              <span style={{ fontFamily: theme.fonts.mono, fontSize: 13, color: c.inkSoft, fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
              <Portrait name={iv.name} theme={theme} size={80} />
              <div>
                <h3 style={{ fontFamily: theme.fonts.display, fontSize: 19, margin: '0 0 4px', color: c.ink, fontWeight: 600 }}>{iv.name}</h3>
                <p style={{ fontFamily: theme.fonts.body, fontSize: 13, lineHeight: 1.5, color: c.inkSoft, margin: 0 }}>{iv.summary}</p>
              </div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, color: c.inkSoft, textAlign: 'right' }}>{iv.length}<br /><span style={{ fontSize: 10 }}>{iv.recorded.split(',')[1]}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------- COLLECTIONS INDEX ----------
function CollectionsIndex({ theme, onNav }) {
  const c = theme.color;
  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <PageHeader theme={theme} kicker="Browse by theme" title="Collections" subtitle="Six curated groupings of interviews exploring different aspects of Arlington history." />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px 64px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {AHS_DATA.collections.map(co => (
          <article key={co.id} onClick={() => onNav('collection')} style={{ background: c.accentSoft, padding: 32, borderRadius: theme.radius, cursor: 'pointer', borderTop: `4px solid ${c.brand}` }}>
            <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', color: c.inkSoft, textTransform: 'uppercase', fontWeight: 600 }}>{co.years} · {co.count} interviews</div>
            <h2 style={{ fontFamily: theme.fonts.display, fontSize: 26, margin: '10px 0 12px', color: c.ink, fontWeight: 600, lineHeight: 1.15 }}>{co.title}</h2>
            <p style={{ fontFamily: theme.fonts.body, fontSize: 15, lineHeight: 1.6, color: c.inkSoft, margin: 0 }}>{co.blurb}</p>
            <div style={{ marginTop: 20, fontFamily: theme.fonts.body, fontSize: 13, color: c.brand, fontWeight: 600 }}>View collection →</div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ---------- SEARCH ----------
function SearchPage({ theme, onNav }) {
  const c = theme.color;
  const [q, setQ] = useState('Mass Ave');
  const results = AHS_DATA.interviews.filter(iv =>
    iv.summary.toLowerCase().includes(q.toLowerCase()) ||
    iv.topics.some(t => t.toLowerCase().includes(q.toLowerCase())) ||
    iv.neighborhood.toLowerCase().includes(q.toLowerCase()) ||
    iv.name.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <div style={{ background: c.paperAlt, padding: '48px', borderBottom: `1px solid ${c.paperAltRule}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.paperAltBrand, fontWeight: 700 }}>Search</div>
          <h1 style={{ fontFamily: theme.fonts.display, fontSize: 36, margin: '8px 0 20px', color: c.paperAltInk, fontWeight: 600 }}>Search across all interviews and transcripts</h1>
          <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search transcripts, topics, names…" style={{ flex: 1, fontFamily: theme.fonts.body, fontSize: 17, padding: '14px 18px', border: `1.5px solid ${c.paperAltInk}`, borderRight: 'none', borderRadius: `${theme.radius} 0 0 ${theme.radius}`, background: c.paper, color: c.ink }} />
            <button style={{ fontFamily: theme.fonts.body, padding: '14px 28px', background: c.brand, color: c.brandInk, border: 'none', borderRadius: `0 ${theme.radius} ${theme.radius} 0`, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Search</button>
          </div>
          <div style={{ marginTop: 14, fontFamily: theme.fonts.body, fontSize: 13, color: c.paperAltInkSoft }}>
            Suggested: {['Patriots\' Day', 'Spy Pond', 'Mass Ave', 'Italian-American', 'Town Meeting'].map((s, i) => (
              <a key={s} onClick={() => setQ(s)} style={{ color: c.paperAltBrand, cursor: 'pointer', marginRight: 12, fontWeight: 600 }}>{s}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 48px 64px' }}>
        <div style={{ fontFamily: theme.fonts.mono, fontSize: 12, color: c.inkSoft, letterSpacing: '0.05em', marginBottom: 24 }}>
          {results.length} results for <strong style={{ color: c.ink }}>"{q}"</strong>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.map(iv => (
            <li key={iv.id} onClick={() => onNav('interview')} style={{ padding: '24px 0', borderBottom: `1px solid ${c.rule}`, cursor: 'pointer' }}>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.brand, fontWeight: 700 }}>
                Interview · {AHS_DATA.collections.find(co => co.id === iv.collection).title}
              </div>
              <h3 style={{ fontFamily: theme.fonts.display, fontSize: 22, margin: '6px 0 6px', color: c.ink, fontWeight: 600 }}>{iv.name}</h3>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 15, lineHeight: 1.6, color: c.ink, margin: 0 }}>
                {highlight(iv.summary, q, c.brand)}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {iv.topics.map(t => <Tag key={t} theme={theme} label={t} />)}
              </div>
            </li>
          ))}
          {q.toLowerCase().includes('mass') && (
            <li style={{ padding: '24px 0', borderBottom: `1px solid ${c.rule}`, background: c.accentSoft, padding: 20, marginTop: 16, borderRadius: theme.radius }}>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.brand, fontWeight: 700 }}>Transcript hit · Anthony Caruso, 14:22</div>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 15, lineHeight: 1.6, color: c.ink, margin: '6px 0 0', fontStyle: 'italic' }}>
                "…my father set up the bakery on {highlight('Mass Ave', q, c.brand)} in 1962, when there were still trolley tracks in the road. We stayed open through the bicentennial, through the seventies, through everything…"
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

// ---------- ABOUT ----------
function AboutPage({ theme }) {
  const c = theme.color;
  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <PageHeader theme={theme} kicker="About the project" title="Preserving Arlington's voices" subtitle="An ongoing oral history initiative of the Arlington Historical Society." />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px' }}>
        <p style={{ fontFamily: theme.fonts.display, fontSize: 22, lineHeight: 1.45, color: c.ink, fontStyle: 'italic', borderLeft: `3px solid ${c.brand}`, paddingLeft: 20, margin: 0 }}>
          History should be hard sometimes. The house holds all of it.
        </p>
        <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, color: c.inkSoft, letterSpacing: '0.1em', marginTop: 8, paddingLeft: 23 }}>— Eleanor Russell, 2008</div>

        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 28, color: c.ink, fontWeight: 600, marginTop: 48 }}>About the collection</h2>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 17, lineHeight: 1.75, color: c.ink }}>
          The Arlington Historical Society Oral History Project began in 2008 with a single recording — Eleanor Russell on the Jason Russell House. Eighteen years later it includes more than eighty interviews spanning three centuries of life in Arlington.
        </p>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 17, lineHeight: 1.75, color: c.ink }}>
          Our interviewees include long-time residents, recent arrivals, shopkeepers, mill workers, town meeting members, librarians, descendants of Patriots' Day combatants, and members of Arlington's Italian-American, Irish-American, Armenian, Greek, and Chinese-American communities. Together they tell a fuller story of Arlington than any single archive can.
        </p>

        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 28, color: c.ink, fontWeight: 600, marginTop: 48 }}>How to use this site</h2>
        <ul style={{ fontFamily: theme.fonts.body, fontSize: 17, lineHeight: 1.7, color: c.ink, paddingLeft: 24 }}>
          <li><strong>Browse</strong> all interviews by collection, decade, neighborhood, or topic.</li>
          <li><strong>Listen</strong> alongside synced transcripts — click any paragraph to jump to that moment in the audio.</li>
          <li><strong>Search</strong> across every transcript at once.</li>
          <li><strong>Cite</strong> recordings in Chicago, MLA, or APA format with one click.</li>
          <li><strong>Download</strong> audio files and PDF transcripts for non-commercial educational use.</li>
        </ul>

        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 28, color: c.ink, fontWeight: 600, marginTop: 48 }}>Accessibility</h2>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 17, lineHeight: 1.75, color: c.ink }}>
          This site is designed to meet WCAG 2.1 Level AA standards. All audio recordings include full transcripts. Contrast ratios meet or exceed 4.5:1 for body text and 3:1 for large text and UI components. The site is fully keyboard navigable. Please <a href="#" style={{ color: c.brand }}>let us know</a> if you encounter any barriers.
        </p>

        <h2 style={{ fontFamily: theme.fonts.display, fontSize: 28, color: c.ink, fontWeight: 600, marginTop: 48 }}>Contribute</h2>
        <p style={{ fontFamily: theme.fonts.body, fontSize: 17, lineHeight: 1.75, color: c.ink }}>
          Do you have a story about Arlington you'd like to share — or know someone who does? We are always looking for new voices.
        </p>
        <button style={{ marginTop: 12, fontFamily: theme.fonts.body, padding: '14px 28px', background: c.brand, color: c.brandInk, border: 'none', borderRadius: theme.radius, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Propose an interview →</button>
      </div>
    </div>
  );
}

// ---------- EXHIBITS ----------
function ExhibitsPage({ theme, onNav }) {
  const c = theme.color;
  const exhibits = [
    { title: '250 Years on the Battle Road', curator: 'Margaret Chen', count: 11, year: 2025, blurb: 'A multimedia walk through the events of April 19, 1775 in Menotomy, told through descendants, re-enactors, and historians.' },
    { title: 'Mass Ave: A Mile in Time', curator: 'Sarah Whitford', count: 14, year: 2023, blurb: 'Twelve shopkeepers narrate the changing storefronts of Massachusetts Avenue from East Arlington to the Heights.' },
    { title: 'Coming to Arlington', curator: 'Lila Hovsepian & David Park', count: 18, year: 2024, blurb: 'Immigrant arrival stories from the early twentieth century to the present day, paired with archival photographs.' }
  ];
  return (
    <div style={{ background: c.paper, minHeight: '100%' }}>
      <PageHeader theme={theme} kicker="Curated stories" title="Exhibits" subtitle="Edited combinations of interviews, transcripts, photographs, and maps that tell a single story." />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 48px 64px' }}>
        {exhibits.map((ex, i) => (
          <article key={ex.title} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 32, padding: '32px 0', borderBottom: `1px solid ${c.rule}`, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: theme.fonts.mono, fontSize: 11, letterSpacing: '0.1em', color: c.brand, textTransform: 'uppercase', fontWeight: 700 }}>{ex.year} · {ex.count} parts · Curated by {ex.curator}</div>
              <h2 style={{ fontFamily: theme.fonts.display, fontSize: 32, color: c.ink, fontWeight: 600, margin: '8px 0 12px', lineHeight: 1.1 }}>{ex.title}</h2>
              <p style={{ fontFamily: theme.fonts.body, fontSize: 16, lineHeight: 1.65, color: c.inkSoft, margin: 0 }}>{ex.blurb}</p>
              <button style={{ marginTop: 18, fontFamily: theme.fonts.body, padding: '10px 20px', background: 'transparent', color: c.brand, border: `1.5px solid ${c.brand}`, borderRadius: theme.radius, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Open exhibit →</button>
            </div>
            <div style={{ background: c.paperAlt, height: 180, borderRadius: theme.radius, position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="100%" viewBox="0 0 280 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <pattern id={`exp-${i}-${theme.name}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={c.rule} strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="280" height="180" fill={c.paperAlt} />
                <rect width="280" height="180" fill={`url(#exp-${i}-${theme.name})`} opacity="0.5" />
                <text x="140" y="100" textAnchor="middle" fontFamily={theme.fonts.mono} fontSize="10" fill={c.inkSoft} letterSpacing="2">EXHIBIT IMAGE</text>
              </svg>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Re-export from the previous file under shorter names for use here
const Portrait = window.AHS_Portrait;
const Waveform = window.AHS_Waveform;
const fmtTime = window.AHS_fmtTime;

window.AHS_BrowsePage = BrowsePage;
window.AHS_InterviewPage = InterviewPage;
window.AHS_CollectionPage = CollectionPage;
window.AHS_CollectionsIndex = CollectionsIndex;
window.AHS_SearchPage = SearchPage;
window.AHS_AboutPage = AboutPage;
window.AHS_ExhibitsPage = ExhibitsPage;
