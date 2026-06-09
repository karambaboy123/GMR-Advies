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
        if (b) window.open(BASE_PATH + encodeURIComponent(b), '_blank');
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
  // IMPACT MATRIX (scatter)
  // ----------------------------------------------------------
  function impactMatrixHTML() {
    const dots = TRENDS.map(t => {
      const x = TIJDLIJN_X[t.tijdlijn] || 50;
      const y = IMPACT_Y[t.impact]    || 50;
      return `<div class="im-dot im-${t.impact}" data-tid="${t.id}"
                   style="left:${x}%;top:${y}%"
                   title="${t.titel}">
        <i data-lucide="${t.icon}" style="width:14px;height:14px;pointer-events:none"></i>
        <div class="im-dot-label">${t.titel.split(':')[0].trim().split(' ').slice(0,3).join(' ')}</div>
      </div>`;
    }).join('');

    return `
      <div class="trends-matrix-wrapper">
        <div class="trends-matrix-title">
          <i data-lucide="grid" style="width:14px;height:14px"></i>
          Impact × Tijdshorizon &nbsp;·&nbsp; klik op een punt om de kaart te openen
        </div>
        <div class="trends-matrix">
          <div class="im-axis-y-label">Impact ↑</div>
          <!-- Plot -->
          <div class="im-plot">
            <!-- Kwadrant-achtergronden -->
            <div class="im-zone im-zone-urgent"  title="Urgent: hoge impact, korte termijn"></div>
            <div class="im-zone im-zone-plan"    title="Plannen: hoge impact, lange termijn"></div>
            <div class="im-zone im-zone-monitor" title="Monitoren: lage impact"></div>
            <!-- Rasterlijnen -->
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
