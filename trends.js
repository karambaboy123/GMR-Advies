// ============================================================
// TRENDS.JS — Tab 2: Trendanalyse
// Uitklapbare kaarten met stat-blokken + impact-matrix
// ============================================================

const TrendsTab = (() => {

  // BASE_PATH is globaal beschikbaar via data.js

  const IMPACT_LABELS   = { hoog: 'Hoge impact', midden: 'Gemiddelde impact', laag: 'Lage impact' };
  const TIJDLIJN_LABELS = { kort: 'Korte termijn', middellang: 'Middellange termijn', lang: 'Lange termijn' };
  const TIJDLIJN_X = { kort: 20, middellang: 50, lang: 80 };   // % positie op X-as
  const IMPACT_Y   = { hoog: 18, midden: 50, laag: 80 };       // % positie op Y-as

  let onRefreshIcons;

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  function render() {
    const container = document.getElementById('trends-content');

    container.innerHTML = `
      <div class="tab-export-row">
        <button class="download-btn" id="trends-download-btn">
          <i data-lucide="download"></i> Download alle trends als PDF
        </button>
      </div>
      ${impactMatrixHTML()}
      <div class="trends-grid">${TRENDS.map(t => trendCardHTML(t)).join('')}</div>`;

    // Download knop
    const dlBtn = container.querySelector('#trends-download-btn');
    if (dlBtn && window.GMRPrint) dlBtn.addEventListener('click', () => GMRPrint.printTrends());

    // Delegated bron-link clicks
    container.addEventListener('click', e => {
      const link = e.target.closest('.bron-link');
      if (link) {
        e.preventDefault();
        const b = link.dataset.bestand;
        if (b) {
          const base = location.protocol === 'file:'
            ? BASE_PATH
            : 'https://raw.githubusercontent.com/karambaboy123/GMR-Advies/master/Biobased%20en%20Circulaire%20Bouw/';
          const url = (b.startsWith('http://') || b.startsWith('https://'))
            ? b
            : base + encodeURIComponent(b);
          window.open(url, '_blank');
        }
      }
    });

    // Uitklappen kaarten
    container.querySelectorAll('.trend-header').forEach(header => {
      header.addEventListener('click', () => {
        const card = header.closest('.trend-card');
        card.classList.toggle('open');
        onRefreshIcons();
      });
    });

    // Impact-matrix hover
    container.querySelectorAll('.im-dot').forEach(dot => {
      dot.addEventListener('mouseenter', () => {
        const tid = parseInt(dot.dataset.tid);
        container.querySelectorAll(`.trend-card[data-tid="${tid}"]`)
          .forEach(c => c.classList.add('highlight'));
      });
      dot.addEventListener('mouseleave', () => {
        container.querySelectorAll('.trend-card.highlight')
          .forEach(c => c.classList.remove('highlight'));
      });
      dot.addEventListener('click', () => {
        const tid = parseInt(dot.dataset.tid);
        const card = container.querySelector(`.trend-card[data-tid="${tid}"]`);
        if (card) {
          card.classList.add('open');
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
          onRefreshIcons();
        }
      });
    });

    onRefreshIcons();
  }

  // ----------------------------------------------------------
  // IMPACT MATRIX (scatter) — met jitter voor overlappende dots
  // ----------------------------------------------------------
  function impactMatrixHTML() {
    // Groepeer per positie-bucket (impact × tijdlijn) voor jitter
    const groups = {};
    TRENDS.forEach(t => {
      const k = `${t.impact}-${t.tijdlijn}`;
      if (!groups[k]) groups[k] = [];
      groups[k].push(t.id);
    });

    // Jitter-patronen in procentpunten (dx, dy) t.o.v. centrumpositie
    const JITTER_PAT = {
      1: [[0, 0]],
      2: [[-5, 0], [5, 0]],
      3: [[0, -6], [-6, 5], [6, 5]],
      4: [[-6, -5], [6, -5], [-6, 5], [6, 5]],
      5: [[0, -7], [-7, -2], [7, -2], [-4, 7], [4, 7]],
      6: [[-7, -6], [0, -6], [7, -6], [-7, 6], [0, 6], [7, 6]],
    };
    function jitter(n, i) {
      const p = JITTER_PAT[Math.min(n, 6)] || JITTER_PAT[6];
      return p[i % p.length] || [0, 0];
    }

    const dots = TRENDS.map(t => {
      const bx  = TIJDLIJN_X[t.tijdlijn] || 50;
      const by  = IMPACT_Y[t.impact]     || 50;
      const k   = `${t.impact}-${t.tijdlijn}`;
      const grp = groups[k];
      const idx = grp.indexOf(t.id);
      const [dx, dy] = jitter(grp.length, idx);
      const x = bx + dx;
      const y = by + dy;
      // Korte label: eerste 2 woorden van titel
      const shortLabel = t.titel.replace(/^[^:]+:\s*/, '').split(' ').slice(0, 3).join(' ');
      return `<div class="im-dot im-${t.impact}" data-tid="${t.id}"
                   style="left:${x}%;top:${y}%"
                   title="${t.titel}">
        <span class="im-dot-num">${t.id}</span>
        <div class="im-dot-label">${t.titel}</div>
      </div>`;
    }).join('');

    // Legenda onder de matrix
    const legendItems = [
      { cls: 'im-hoog',   label: 'Hoge impact'    },
      { cls: 'im-midden', label: 'Gemiddelde impact' },
      { cls: 'im-laag',   label: 'Lage impact'    },
    ].map(l => `<span class="im-legend-item">
      <span class="im-legend-dot ${l.cls}"></span>${l.label}
    </span>`).join('');

    return `
      <div class="trends-matrix-wrapper">
        <div class="trends-matrix-title">
          <i data-lucide="grid" style="width:14px;height:14px"></i>
          Impact × Tijdshorizon &nbsp;·&nbsp; klik op een punt om de kaart te openen
        </div>
        <div class="trends-matrix">
          <!-- Y-as labels -->
          <div class="im-axis-y">
            <div class="im-ylabel" style="top:${IMPACT_Y.hoog}%">Hoog</div>
            <div class="im-ylabel" style="top:${IMPACT_Y.midden}%">Midden</div>
            <div class="im-ylabel" style="top:${IMPACT_Y.laag}%">Laag</div>
          </div>
          <!-- Plot -->
          <div class="im-plot">
            <div class="im-zone im-zone-urgent"></div>
            <div class="im-zone im-zone-plan"></div>
            <div class="im-zone im-zone-monitor"></div>
            <div class="im-grid-h" style="top:33.3%"></div>
            <div class="im-grid-h" style="top:66.6%"></div>
            <div class="im-grid-v" style="left:33.3%"></div>
            <div class="im-grid-v" style="left:66.6%"></div>
            ${dots}
          </div>
          <div class="im-axis-x-spacer"></div>
          <div class="im-axis-x">
            <span>Korte termijn</span>
            <span>Middellange termijn</span>
            <span>Lange termijn</span>
          </div>
        </div>
        <div class="im-legend">${legendItems}</div>
      </div>`;
  }

  // ----------------------------------------------------------
  // TREND KAART
  // ----------------------------------------------------------
  function trendCardHTML(t) {
    // Stat-blokken
    const statHTML = (t.stat && t.stat.length) ? `
      <div class="trend-stats">
        ${t.stat.map(s => `
          <div class="trend-stat-item">
            <div class="trend-stat-waarde">${s.waarde}</div>
            <div class="trend-stat-label">${s.label}</div>
          </div>`).join('')}
      </div>` : '';

    // Tijdlijn-balk
    const tijdlijnPct = TIJDLIJN_X[t.tijdlijn] || 50;
    const tijdlijnHTML = `
      <div class="trend-tijdlijn">
        <div class="trend-tijdlijn-track">
          <div class="trend-tijdlijn-fill" style="width:${tijdlijnPct}%"></div>
          <div class="trend-tijdlijn-dot"  style="left:${tijdlijnPct}%">
            <i data-lucide="clock" style="width:9px;height:9px"></i>
          </div>
        </div>
        <div class="trend-tijdlijn-labels">
          <span>Nu</span><span>Middellang</span><span>Lang</span>
        </div>
      </div>`;

    // Bronnen
    let bronnenHTML = '';
    if (t.bronnen && t.bronnen.length) {
      bronnenHTML = `
        <div class="trend-bronnen">
          <div class="trend-bronnen-label">Bronnen</div>
          ${t.bronnen.map(b => {
            const label = typeof b === 'string' ? b : b.label;
            const bestand = typeof b === 'object' && b.bestand ? b.bestand : null;
            return `<div class="bron-item">
              <i data-lucide="book-open"></i>
              ${bestand
                ? `<a class="bron-link" href="#" data-bestand="${bestand.replace(/"/g, '&quot;')}">${label}</a>`
                : `<span>${label}</span>`}
            </div>`;
          }).join('')}
        </div>`;
    }

    return `
      <div class="trend-card" id="trend-${t.id}" data-tid="${t.id}" data-impact="${t.impact}">
        <div class="trend-header">
          <div class="trend-icon"><i data-lucide="${t.icon}"></i></div>
          <div class="trend-header-info">
            <h3>${t.titel}</h3>
            <div class="trend-meta">
              <span class="impact-badge ${t.impact}">${IMPACT_LABELS[t.impact]}</span>
              <span class="tijdlijn-badge">
                <i data-lucide="clock" style="width:11px;height:11px;vertical-align:-1px;margin-right:3px"></i>
                ${TIJDLIJN_LABELS[t.tijdlijn]}
              </span>
            </div>
          </div>
          <i data-lucide="chevron-down" class="trend-chevron"></i>
        </div>
        <div class="trend-body">
          <p>${t.beschrijving}</p>
          ${statHTML}
          ${tijdlijnHTML}
          ${t.details ? `<div class="trend-details">${t.details}</div>` : ''}
          ${bronnenHTML}
        </div>
      </div>`;
  }

  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;
    render();
  }

  return { init };
})();
