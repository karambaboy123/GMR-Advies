// ============================================================
// PRINT-EXPORT.JS — PDF-export voor alle tabbladen
// Gebruikt window.print() + @media print CSS
// GMR Groene Metropoolregio Arnhem-Nijmegen
// ============================================================

window.GMRPrint = (() => {

  function today() {
    return new Date().toLocaleDateString('nl-NL', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function gmrHeader(subtitle) {
    return `
      <div class="prt-header">
        <div class="prt-logo">
          <span class="prt-logo-abbr">GMR</span>
          <div class="prt-logo-text">
            <span class="prt-logo-title">Groene Metropoolregio</span>
            <span class="prt-logo-sub">Arnhem-Nijmegen</span>
          </div>
        </div>
        <div class="prt-header-right">
          <div class="prt-subtitle">${subtitle}</div>
          <div class="prt-date">${today()}</div>
        </div>
      </div>
      <div class="prt-rule"></div>`;
  }

  // Inline styles die worden meegenomen in het print-area
  function printStyles() {
    return `<style>
      * { box-sizing: border-box; }
      body { font-family: system-ui, -apple-system, sans-serif; }

      .prt-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 18px 24px; background: #0E4447; color: white;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-logo { display: flex; align-items: center; gap: 12px; }
      .prt-logo-abbr {
        font-size: 28px; font-weight: 900; letter-spacing: -1px;
        color: #44b3ba;
      }
      .prt-logo-text { display: flex; flex-direction: column; }
      .prt-logo-title { font-size: 14px; font-weight: 700; color: white; }
      .prt-logo-sub   { font-size: 11px; color: #86c9cc; }
      .prt-header-right { text-align: right; }
      .prt-subtitle { font-size: 13px; font-weight: 600; color: #86c9cc; }
      .prt-date     { font-size: 11px; color: #86c9cc; margin-top: 2px; }
      .prt-rule { border: none; border-top: 3px solid #2A9298; margin: 0; }

      .prt-body { padding: 24px; }

      .prt-section-title {
        font-size: 18px; font-weight: 700; color: #0E4447;
        margin: 0 0 6px 0;
      }
      .prt-intro {
        font-size: 13px; color: #555; margin: 0 0 20px 0; line-height: 1.5;
      }
      .prt-subsection {
        font-size: 14px; font-weight: 700; color: #176064;
        margin: 20px 0 10px 0; padding-bottom: 5px;
        border-bottom: 1.5px solid #e0eeee;
      }

      /* ---- TREND CARDS ---- */
      .prt-trend-card {
        border: 1px solid #e0eeee; border-radius: 6px;
        margin-bottom: 14px; page-break-inside: avoid;
        overflow: hidden;
      }
      .prt-trend-header {
        padding: 12px 14px 10px; background: #f8fbfb;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-trend-title { font-size: 14px; font-weight: 700; color: #0E4447; }
      .prt-trend-meta  { margin-top: 5px; display: flex; gap: 8px; flex-wrap: wrap; }
      .prt-badge {
        display: inline-block; padding: 2px 8px; border-radius: 10px;
        font-size: 10px; font-weight: 700; color: white;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-badge-outline {
        display: inline-block; padding: 2px 8px; border-radius: 10px;
        font-size: 10px; font-weight: 600; color: #176064;
        border: 1px solid #2A9298;
      }
      .prt-trend-desc {
        padding: 10px 14px; font-size: 12.5px; color: #333; line-height: 1.55;
      }
      .prt-stats-row {
        display: flex; gap: 0; border-top: 1px solid #e0eeee;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-stat {
        flex: 1; padding: 10px 14px; font-size: 12px; color: #333;
        border-right: 1px solid #e0eeee;
        background: #f0f8f8;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-stat:last-child { border-right: none; }
      .prt-stat strong { font-size: 16px; color: #0E4447; display: block; }
      .prt-bronnen {
        padding: 7px 14px; font-size: 11px; color: #777;
        border-top: 1px solid #eee; background: #fafafa;
      }

      /* ---- TABLES ---- */
      .prt-table {
        width: 100%; border-collapse: collapse; font-size: 12.5px;
        margin: 0;
      }
      .prt-table thead th {
        background: #0E4447; color: white; padding: 8px 10px;
        text-align: left; font-weight: 600; font-size: 11px;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-table tbody tr:nth-child(even) td {
        background: #f8fbfb;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-table tbody td {
        padding: 8px 10px; border-bottom: 1px solid #e8f0f0;
        vertical-align: top; line-height: 1.45;
      }

      /* ---- NOTULEN ---- */
      .prt-question-num { font-size: 12px; color: #2A9298; font-weight: 600; margin: 0 0 6px 0; }
      .prt-question-box {
        font-size: 15px; font-weight: 700; color: #0E4447;
        padding: 12px 16px; background: #f0f7f7; border-left: 4px solid #2A9298;
        margin-bottom: 10px; border-radius: 0 4px 4px 0; line-height: 1.4;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-toelichting {
        font-size: 12px; color: #555; font-style: italic;
        padding: 8px 12px; background: #fffbf0; border-left: 3px solid #e07b00;
        margin-bottom: 14px; border-radius: 0 4px 4px 0;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-sentiment-row {
        display: flex; gap: 20px; font-size: 12px; font-weight: 600;
        margin-bottom: 14px;
      }

      /* ---- STAKEHOLDERS ---- */
      .prt-sh-cat-title {
        font-size: 13px; font-weight: 800; text-transform: uppercase;
        letter-spacing: 0.5px; color: white; background: #176064;
        padding: 6px 12px; margin: 16px 0 0 0; border-radius: 4px;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-sh-card {
        padding: 10px 12px; border-bottom: 1px solid #edf4f4;
        display: flex; flex-direction: column; gap: 3px;
      }
      .prt-sh-card.prt-sh-interviewed {
        border-left: 3px solid #2A9298;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-sh-name  { font-size: 13px; font-weight: 700; color: #0E4447; }
      .prt-sh-badge {
        font-size: 10px; color: #2A9298; font-weight: 600; margin-left: 8px;
      }
      .prt-sh-rol       { font-size: 11.5px; color: #555; }
      .prt-sh-standpunt { font-size: 11.5px; color: #333; line-height: 1.45; margin-top: 2px; }

      /* ---- GAME RESULTAAT ---- */
      .prt-game-hero {
        display: flex; gap: 16px; margin-bottom: 20px;
        align-items: flex-start; flex-wrap: wrap;
      }
      .prt-game-role {
        flex: 0 0 auto; background: #0E4447; color: white;
        padding: 14px 18px; border-radius: 6px; min-width: 180px;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-game-role-label { font-size: 10px; color: #86c9cc; text-transform: uppercase; }
      .prt-game-role-name  { font-size: 16px; font-weight: 800; margin: 4px 0 2px; }
      .prt-game-role-org   { font-size: 11px; color: #86c9cc; }
      .prt-scenario-block {
        flex: 1; padding: 14px 18px; border: 2px solid #2A9298;
        border-radius: 6px; background: #f0f8f8;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-scenario-naam { font-size: 15px; font-weight: 700; color: #0E4447; }
      .prt-scenario-conclusie { font-size: 12.5px; color: #333; margin-top: 5px; line-height: 1.5; }

      .prt-radar-row {
        display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
      }
      .prt-radar-chart { flex: 0 0 auto; }
      .prt-radar-table  { flex: 1; min-width: 200px; }

      .prt-outcomes-grid {
        display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px;
      }
      .prt-outcome-card {
        flex: 1; min-width: 100px; text-align: center;
        padding: 12px 8px; background: #f0f8f8; border-radius: 6px;
        border: 1px solid #cde8e8;
        -webkit-print-color-adjust: exact; print-color-adjust: exact;
      }
      .prt-outcome-value {
        font-size: 20px; font-weight: 800; color: #0E4447;
        display: block; margin-bottom: 4px;
      }
      .prt-outcome-card div { font-size: 11px; color: #555; }

      .prt-footer {
        margin-top: 32px; padding-top: 12px;
        border-top: 1px solid #ddd; font-size: 10.5px; color: #999;
        text-align: center;
      }
    </style>`;
  }

  function triggerPrint(htmlContent) {
    const area = document.getElementById('print-area');
    if (!area) { console.warn('GMRPrint: #print-area niet gevonden'); return; }
    area.innerHTML = printStyles() + htmlContent;
    setTimeout(() => {
      window.print();
      setTimeout(() => { area.innerHTML = ''; }, 800);
    }, 120);
  }

  // ----------------------------------------------------------
  // RADAR CHART SVG  (ook gebruikt in game.js resultatenScherm)
  // ----------------------------------------------------------
  function radarChartSVG(vars, size) {
    size = size || 240;
    const cx = size / 2;
    const cy = size / 2;
    const r  = (size / 2) - 44;

    const axes = [
      { key: 'politiek',     label: 'Politiek draagvlak' },
      { key: 'markt',        label: 'Marktgroei'          },
      { key: 'budget',       label: 'Budgetruimte'        },
      { key: 'samenwerking', label: 'Samenwerking'        },
    ];
    const N = axes.length;

    function angle(i) { return (i * 2 * Math.PI / N) - Math.PI / 2; }

    function pt(i, score) {
      const a = angle(i);
      const ratio = Math.max(0, Math.min(100, score || 0)) / 100;
      return { x: cx + r * ratio * Math.cos(a), y: cy + r * ratio * Math.sin(a) };
    }

    function axisEnd(i) {
      const a = angle(i);
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }

    // Concentric rings at 25/50/75/100
    const rings = [25, 50, 75, 100].map(pct => {
      const pts = axes.map((_, i) => {
        const a = angle(i);
        return `${(cx + r * (pct/100) * Math.cos(a)).toFixed(1)},${(cy + r * (pct/100) * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      const sw = pct === 100 ? 1.2 : 0.7;
      const op = pct === 100 ? 0.35 : 0.18;
      return `<polygon points="${pts}" fill="none" stroke="#2A9298" stroke-width="${sw}" stroke-opacity="${op}"/>`;
    }).join('');

    // Percent labels on 25/50/75 rings (on the right axis for readability)
    const ringLabels = [25, 50, 75].map(pct => {
      const a = angle(1); // right axis
      const lx = cx + r * (pct/100) * Math.cos(a) + 3;
      const ly = cy + r * (pct/100) * Math.sin(a) - 3;
      return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="8" fill="#aaa" text-anchor="start">${pct}</text>`;
    }).join('');

    // Axis lines
    const axisLines = axes.map((_, i) => {
      const e = axisEnd(i);
      return `<line x1="${cx}" y1="${cy}" x2="${e.x.toFixed(1)}" y2="${e.y.toFixed(1)}" stroke="#2A9298" stroke-width="0.8" stroke-opacity="0.35"/>`;
    }).join('');

    // Score polygon
    const polyPts = axes.map((ax, i) => {
      const p = pt(i, vars[ax.key]);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');

    // Dots + score labels
    const dots = axes.map((ax, i) => {
      const p  = pt(i, vars[ax.key]);
      const score = Math.round(vars[ax.key] || 0);
      const a = angle(i);
      const ldist = r * (score/100) + 16;
      const lx = cx + ldist * Math.cos(a);
      const ly = cy + ldist * Math.sin(a);
      const dotColor = score >= 70 ? '#2A9298' : score >= 45 ? '#176064' : '#c07030';
      return `
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="${dotColor}" stroke="white" stroke-width="1.5"/>
        <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="10.5" fill="${dotColor}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${score}</text>`;
    }).join('');

    // Axis labels (positioned outside the ring)
    const axisLabels = axes.map((ax, i) => {
      const a = angle(i);
      const dist = r + 28;
      const lx = cx + dist * Math.cos(a);
      const ly = cy + dist * Math.sin(a);
      const anchor = (i === 1) ? 'start' : (i === 3) ? 'end' : 'middle';
      const baseline = (i === 2) ? 'text-before-edge' : (i === 0) ? 'text-after-edge' : 'middle';
      const score = vars[ax.key] || 0;
      const col = score >= 70 ? '#0E4447' : '#444';
      // Short labels to fit
      const shortLabel = ax.label.split(' ')[0];
      return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="10.5" fill="${col}" font-weight="700" text-anchor="${anchor}" dominant-baseline="middle">${shortLabel}</text>`;
    }).join('');

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
      ${rings}
      ${ringLabels}
      ${axisLines}
      <polygon points="${polyPts}" fill="#2A9298" fill-opacity="0.16" stroke="#2A9298" stroke-width="2"/>
      ${dots}
      ${axisLabels}
    </svg>`;
  }

  // ----------------------------------------------------------
  // PRINT: TRENDANALYSE
  // ----------------------------------------------------------
  function printTrends() {
    const IMPACT_LABELS = { hoog: 'Hoge impact', midden: 'Gemiddelde impact', laag: 'Lage impact' };
    const TIJDLIJN_LABELS = { kort: 'Korte termijn', middellang: 'Middellange termijn', lang: 'Lange termijn' };
    const IMPACT_COLORS  = { hoog: '#C0392B', midden: '#E07B00', laag: '#2A9298' };

    const trendsHTML = (TRENDS || []).map(t => `
      <div class="prt-trend-card">
        <div class="prt-trend-header" style="border-left:4px solid ${IMPACT_COLORS[t.impact] || '#2A9298'}">
          <div class="prt-trend-title">${t.titel}</div>
          <div class="prt-trend-meta">
            <span class="prt-badge" style="background:${IMPACT_COLORS[t.impact] || '#2A9298'}">${IMPACT_LABELS[t.impact] || t.impact}</span>
            <span class="prt-badge-outline">${TIJDLIJN_LABELS[t.tijdlijn] || t.tijdlijn}</span>
          </div>
        </div>
        <div class="prt-trend-desc">${t.beschrijving}</div>
        ${t.stat && t.stat.length ? `
          <div class="prt-stats-row">
            ${t.stat.map(s => `<div class="prt-stat"><strong>${s.waarde}</strong>${s.label}</div>`).join('')}
          </div>` : ''}
        ${t.bronnen && t.bronnen.length ? `
          <div class="prt-bronnen">Bronnen: ${t.bronnen.map(b => typeof b === 'string' ? b : b.label).join(' · ')}</div>
        ` : ''}
      </div>`).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Trendanalyse — Biobased &amp; Circulaire Bouw')}
        <h2 class="prt-section-title" style="margin-top:18px">Trendoverzicht</h2>
        <p class="prt-intro">${(TRENDS || []).length} trends voor de transitie naar biobased en circulaire bouw in de Groene Metropoolregio Arnhem-Nijmegen. Gebaseerd op interviews (april 2026), NABB 2023 en eigen onderzoek.</p>
        ${trendsHTML}
        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Karam &amp; Berend · Minor Duurzaam Ondernemen</div>
      </div>`);
  }

  // ----------------------------------------------------------
  // PRINT: NOTULEN (één vraag)
  // ----------------------------------------------------------
  function printNotulen(qIdx) {
    if (!NOTULEN_QUESTIONS || qIdx == null || qIdx < 0) return;
    const q = NOTULEN_QUESTIONS[qIdx];
    if (!q) return;

    const SL = { positief: 'Positief', neutraal: 'Neutraal', kritisch: 'Kritisch' };
    const SC = { positief: '#27ae60', neutraal: '#e07b00', kritisch: '#c0392b' };

    const counts = { positief: 0, neutraal: 0, kritisch: 0 };
    Object.values(q.antwoorden).forEach(a => { if (counts[a.sentiment] !== undefined) counts[a.sentiment]++; });

    const interviewRows = (INTERVIEWED_IDS || []).map(id => {
      const s = (STAKEHOLDERS || []).find(x => x.id === id);
      const ans = q.antwoorden[id];
      if (!s || !ans) return '';
      return `<tr>
        <td><strong>${s.naam}</strong><br><span style="font-size:10.5px;color:#666">${s.categorie}</span></td>
        <td>${ans.citaat || ans.standpunt || ''}</td>
        <td><strong style="color:${SC[ans.sentiment]}">${SL[ans.sentiment]}</strong></td>
      </tr>`;
    }).join('');

    const standpuntRows = Object.entries(q.antwoorden)
      .filter(([, a]) => a.type === 'standpunt')
      .map(([idStr, ans]) => {
        const s = (STAKEHOLDERS || []).find(x => x.id === parseInt(idStr));
        return `<tr>
          <td><strong>${s ? s.naam : 'Stakeholder ' + idStr}</strong><br><span style="font-size:10.5px;color:#666">${s ? s.categorie : ''}</span></td>
          <td>${ans.standpunt}${ans.bronLabel ? `<br><span style="font-size:10.5px;color:#2A9298">Bron: ${ans.bronLabel}</span>` : ''}</td>
          <td><strong style="color:${SC[ans.sentiment]}">${SL[ans.sentiment]}</strong></td>
        </tr>`;
      }).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Notulen Explorer — Interviewmatrix')}
        <p class="prt-question-num" style="margin-top:16px">Vraag ${qIdx + 1} van ${NOTULEN_QUESTIONS.length}</p>
        <div class="prt-question-box">${q.vraag}</div>
        ${q.toelichting ? `<div class="prt-toelichting">${q.toelichting}</div>` : ''}
        <div class="prt-sentiment-row">
          <span style="color:#27ae60">✓ ${counts.positief} positief</span>
          <span style="color:#e07b00">– ${counts.neutraal} neutraal</span>
          <span style="color:#c0392b">⚠ ${counts.kritisch} kritisch</span>
        </div>

        <h3 class="prt-subsection">Geïnterviewde partijen</h3>
        <table class="prt-table">
          <thead><tr><th style="width:160px">Partij</th><th>Reactie</th><th style="width:80px">Sentiment</th></tr></thead>
          <tbody>${interviewRows || '<tr><td colspan="3" style="color:#999;font-style:italic">Geen interviews beschikbaar voor deze vraag.</td></tr>'}</tbody>
        </table>

        ${standpuntRows ? `
          <h3 class="prt-subsection" style="margin-top:22px">Standpunten uit bronnen</h3>
          <table class="prt-table">
            <thead><tr><th style="width:160px">Partij</th><th>Standpunt</th><th style="width:80px">Sentiment</th></tr></thead>
            <tbody>${standpuntRows}</tbody>
          </table>` : ''}

        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Notulen Explorer</div>
      </div>`);
  }

  // ----------------------------------------------------------
  // PRINT: STAKEHOLDERS
  // ----------------------------------------------------------
  function printStakeholders() {
    const CAT_ORDER = [
      'Gemeente', 'Provincie', 'Bouwbedrijf',
      'Woningcorporatie', 'Brancheorganisatie', 'Kennisinstelling', 'Rijksoverheid'
    ];
    const total       = (STAKEHOLDERS || []).length;
    const interviewed = (STAKEHOLDERS || []).filter(s => s.interviewed).length;

    const sectionsHTML = CAT_ORDER.map(cat => {
      const items = (STAKEHOLDERS || []).filter(s => s.categorie === cat);
      if (!items.length) return '';
      return `
        <div class="prt-sh-cat-title">${cat}</div>
        ${items.map(s => `
          <div class="prt-sh-card ${s.interviewed ? 'prt-sh-interviewed' : ''}">
            <div class="prt-sh-name">
              ${s.naam}
              ${s.interviewed ? `<span class="prt-sh-badge">● Geïnterviewd</span>` : ''}
            </div>
            ${s.rol ? `<div class="prt-sh-rol">${s.rol}</div>` : ''}
            ${s.standpunt ? `<div class="prt-sh-standpunt">${s.standpunt}</div>` : ''}
          </div>`).join('')}`;
    }).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Stakeholderoverzicht — GMR Biobased &amp; Circulaire Bouw')}
        <h2 class="prt-section-title" style="margin-top:18px">Alle stakeholders (${total})</h2>
        <p class="prt-intro">
          <strong>${interviewed} partijen geïnterviewd</strong> in april 2026 ·
          ${total - interviewed} aanvullende stakeholders op basis van gepubliceerde bronnen en beleidsdocumenten.
        </p>
        ${sectionsHTML}
        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Stakeholderoverzicht</div>
      </div>`);
  }

  // ----------------------------------------------------------
  // PRINT: BELEIDSIMULATOR EINDRESULTAAT
  // ----------------------------------------------------------
  function printGameResult(vars, choices, roleId, scenario, outcomes) {
    if (!vars || !roleId) return;
    const role = (GAME_ROLES || []).find(r => r.id === roleId);
    if (!role) return;

    const varLabels = {
      politiek: 'Politiek draagvlak', markt: 'Marktgroei',
      budget: 'Budgetruimte', samenwerking: 'Samenwerking'
    };

    const varsRows = Object.entries(vars).map(([k, v]) => {
      const label = varLabels[k] || k;
      const color = v >= 70 ? '#2A9298' : v >= 45 ? '#176064' : '#c07030';
      return `<tr>
        <td><strong>${label}</strong></td>
        <td>
          <div style="background:#ddd;border-radius:3px;height:9px;width:160px;display:inline-block;vertical-align:middle">
            <div style="background:${color};border-radius:3px;height:9px;width:${v}%;display:block"></div>
          </div>
        </td>
        <td style="font-weight:700;color:${color};text-align:right;white-space:nowrap">${v} / 100</td>
      </tr>`;
    }).join('');

    const choicesRows = [1, 2, 3, 4].map(rn => {
      const optId = choices[rn];
      if (!optId) return '';
      const roundData = (GAME_ROUNDS_DATA[roleId] || [])[rn - 1];
      const base = roundData ? roundData.opties.find(o => o.id === optId) : null;
      const enriched = (GAME_ROUND_ENRICHMENTS || {})[optId] || {};
      const merged = base ? { ...base, ...enriched } : null;
      if (!merged) return '';
      const fase = roundData ? (roundData.fase || '').replace(' — ', ': ') : '';
      return `<tr>
        <td style="white-space:nowrap;font-weight:700">Ronde ${rn}</td>
        <td style="font-size:11px;color:#2A9298">${fase}</td>
        <td>${merged.label || optId}</td>
        <td style="color:#555;font-size:11.5px">${merged.gevolg || ''}</td>
      </tr>`;
    }).join('');

    const outcomesHTML = outcomes ? `
      <h3 class="prt-subsection" style="margin-top:22px">Concrete uitkomsten (prognose 2030)</h3>
      <div class="prt-outcomes-grid">
        <div class="prt-outcome-card"><span class="prt-outcome-value">${outcomes.woningen}</span>biobased woningen / jaar</div>
        <div class="prt-outcome-card"><span class="prt-outcome-value">${outcomes.co2_ton.toLocaleString('nl-NL')}</span>ton CO₂-opslag / jaar</div>
        <div class="prt-outcome-card"><span class="prt-outcome-value">${outcomes.marktgroei}%</span>marktaandeel biobased</div>
        <div class="prt-outcome-card"><span class="prt-outcome-value">€${outcomes.investering} mln</span>private investering</div>
      </div>
      <p style="font-size:10px;color:#999;margin-top:6px">
        Prognoses zijn gebaseerd op simulatiemodel. Referentiecijfers: CBS Bouwstatistieken &amp; NABB 2023.
      </p>` : '';

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Beleidsimulator — Eindrapport')}

        <div class="prt-game-hero" style="margin-top:18px">
          <div class="prt-game-role">
            <div class="prt-game-role-label">Gespeeld als</div>
            <div class="prt-game-role-name">${role.naam}</div>
            <div class="prt-game-role-org">${role.organisatie || ''}</div>
          </div>
          ${scenario ? `
          <div class="prt-scenario-block">
            <div class="prt-scenario-naam">${scenario.naam}</div>
            <div class="prt-scenario-conclusie">${scenario.conclusie}</div>
          </div>` : ''}
        </div>

        <h3 class="prt-subsection">Eindstand systeemvariabelen</h3>
        <div class="prt-radar-row">
          <div class="prt-radar-chart">${radarChartSVG(vars, 200)}</div>
          <div class="prt-radar-table">
            <table class="prt-table">
              <thead><tr><th>Variabele</th><th>Voortgang</th><th>Score</th></tr></thead>
              <tbody>${varsRows}</tbody>
            </table>
          </div>
        </div>

        <h3 class="prt-subsection" style="margin-top:22px">Keuzes per ronde</h3>
        <table class="prt-table">
          <thead><tr><th>Ronde</th><th>Fase</th><th>Keuze</th><th>Gevolg</th></tr></thead>
          <tbody>${choicesRows}</tbody>
        </table>

        ${outcomesHTML}

        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Beleidsimulator Eindrapport · ${today()}</div>
      </div>`);
  }

  return { printTrends, printNotulen, printStakeholders, printGameResult, radarChartSVG };

})();
