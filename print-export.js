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

  // Resolve logobestanden.svg path (werkt op file:// én GitHub Pages)
  function logoSrc() {
    try {
      const scripts = document.querySelectorAll('script[src*="print-export"]');
      if (scripts.length) {
        const base = scripts[0].src.replace(/print-export\.js.*$/, '');
        return base + 'logobestanden.svg';
      }
    } catch (_) {}
    return 'logobestanden.svg';
  }

  function gmrHeader(subtitle) {
    return `
      <div class="prt-header">
        <div class="prt-logo">
          <img src="${logoSrc()}" alt="Groene Metropoolregio Arnhem-Nijmegen" class="prt-logo-img" />
        </div>
        <div class="prt-header-right">
          <div class="prt-subtitle">${subtitle}</div>
          <div class="prt-date">${today()}</div>
        </div>
      </div>
      <div class="prt-rule"></div>`;
  }

  // ----------------------------------------------------------
  // INLINE PRINT-STIJLEN
  // print-color-adjust: exact zorgt dat browsers achtergrond-
  // kleuren niet weggooien — dit is de kern van het kleurprobleem
  // ----------------------------------------------------------
  function printStyles() {
    return `<style>
      /* ── GLOBAAL: forceer kleurenafdruk ─────────────────── */
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
        box-sizing: border-box;
      }
      body {
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        font-size: 13px;
        color: #0A3234;
        background: #fff;
        margin: 0; padding: 0;
      }

      /* ── HEADER ─────────────────────────────────────────── */
      .prt-header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 16px 24px;
        background: #0E4447;
        color: white;
      }
      .prt-logo { display: flex; align-items: center; }
      .prt-logo-img {
        height: 54px; width: auto; display: block;
      }
      .prt-header-right { text-align: right; }
      .prt-subtitle { font-size: 12px; font-weight: 600; color: #86c9cc; }
      .prt-date     { font-size: 10.5px; color: #86c9cc; margin-top: 2px; }
      .prt-rule { border: none; border-top: 3px solid #2A9298; margin: 0; }

      /* ── BODY LAYOUT ────────────────────────────────────── */
      .prt-body { padding: 24px; }

      .prt-section-title {
        font-size: 18px; font-weight: 700; color: #0E4447; margin: 0 0 6px 0;
      }
      .prt-intro {
        font-size: 12.5px; color: #555; margin: 0 0 20px 0; line-height: 1.5;
      }
      .prt-subsection {
        font-size: 13.5px; font-weight: 700; color: #176064;
        margin: 20px 0 10px 0; padding-bottom: 5px;
        border-bottom: 1.5px solid #e0eeee;
      }

      /* ── CENTRALE BOODSCHAP ─────────────────────────────── */
      .prt-central-msg {
        background: #EEF5F6;
        border-left: 4px solid #2A9298;
        border-radius: 0 6px 6px 0;
        padding: 14px 18px;
        margin-bottom: 20px;
      }
      .prt-central-msg-label {
        font-size: 9.5px; font-weight: 700; letter-spacing: .08em;
        text-transform: uppercase; color: #2A9298; margin-bottom: 4px;
      }
      .prt-central-msg-text {
        font-size: 13px; line-height: 1.6; color: #0E4447;
      }

      /* ── TREND CARDS ────────────────────────────────────── */
      .prt-trend-card {
        border: 1px solid #e0eeee; border-radius: 6px;
        margin-bottom: 14px; page-break-inside: avoid; overflow: hidden;
      }
      .prt-trend-header {
        padding: 12px 14px 10px; background: #f8fbfb;
      }
      .prt-trend-title { font-size: 13.5px; font-weight: 700; color: #0E4447; }
      .prt-trend-meta  { margin-top: 5px; display: flex; gap: 8px; flex-wrap: wrap; }
      .prt-badge {
        display: inline-block; padding: 2px 8px; border-radius: 10px;
        font-size: 10px; font-weight: 700; color: white;
      }
      .prt-badge-outline {
        display: inline-block; padding: 2px 8px; border-radius: 10px;
        font-size: 10px; font-weight: 600; color: #176064;
        border: 1px solid #2A9298;
      }
      .prt-trend-desc {
        padding: 10px 14px; font-size: 12px; color: #333; line-height: 1.55;
      }
      .prt-stats-row {
        display: flex; gap: 0; border-top: 1px solid #e0eeee;
      }
      .prt-stat {
        flex: 1; padding: 10px 14px; font-size: 11.5px; color: #333;
        border-right: 1px solid #e0eeee; background: #f0f8f8;
      }
      .prt-stat:last-child { border-right: none; }
      .prt-stat strong { font-size: 15px; color: #0E4447; display: block; }
      .prt-bronnen {
        padding: 7px 14px; font-size: 10.5px; color: #777;
        border-top: 1px solid #eee; background: #fafafa;
      }

      /* ── TABELLEN ───────────────────────────────────────── */
      .prt-table {
        width: 100%; border-collapse: collapse; font-size: 12px; margin: 0;
      }
      .prt-table thead th {
        background: #0E4447; color: white; padding: 8px 10px;
        text-align: left; font-weight: 600; font-size: 11px;
      }
      .prt-table tbody tr:nth-child(even) td { background: #f8fbfb; }
      .prt-table tbody td {
        padding: 8px 10px; border-bottom: 1px solid #e8f0f0;
        vertical-align: top; line-height: 1.45;
      }

      /* ── NOTULEN ────────────────────────────────────────── */
      .prt-question-num { font-size: 11.5px; color: #2A9298; font-weight: 600; margin: 0 0 6px 0; }
      .prt-question-box {
        font-size: 14px; font-weight: 700; color: #0E4447;
        padding: 12px 16px; background: #f0f7f7; border-left: 4px solid #2A9298;
        margin-bottom: 10px; border-radius: 0 4px 4px 0; line-height: 1.4;
      }
      .prt-toelichting {
        font-size: 11.5px; color: #555; font-style: italic;
        padding: 8px 12px; background: #fffbf0; border-left: 3px solid #e07b00;
        margin-bottom: 14px; border-radius: 0 4px 4px 0;
      }
      .prt-sentiment-row {
        display: flex; gap: 20px; font-size: 12px; font-weight: 600; margin-bottom: 14px;
      }

      /* ── STAKEHOLDERS ───────────────────────────────────── */
      .prt-sh-cat-title {
        font-size: 12px; font-weight: 800; text-transform: uppercase;
        letter-spacing: 0.5px; color: white; background: #176064;
        padding: 6px 12px; margin: 16px 0 0 0; border-radius: 4px;
      }
      .prt-sh-card {
        padding: 10px 12px; border-bottom: 1px solid #edf4f4;
        display: flex; flex-direction: column; gap: 3px;
      }
      .prt-sh-card.prt-sh-interviewed { border-left: 3px solid #2A9298; }
      .prt-sh-name  { font-size: 12.5px; font-weight: 700; color: #0E4447; }
      .prt-sh-badge { font-size: 10px; color: #2A9298; font-weight: 600; margin-left: 8px; }
      .prt-sh-rol       { font-size: 11px; color: #555; }
      .prt-sh-standpunt { font-size: 11px; color: #333; line-height: 1.45; margin-top: 2px; }

      /* ── BELEIDSIMULATOR ────────────────────────────────── */
      .prt-game-hero {
        display: flex; gap: 16px; margin-bottom: 20px;
        align-items: flex-start; flex-wrap: wrap;
      }
      .prt-game-role {
        flex: 0 0 auto; background: #0E4447; color: white;
        padding: 14px 18px; border-radius: 6px; min-width: 180px;
      }
      .prt-game-role-label { font-size: 10px; color: #86c9cc; text-transform: uppercase; }
      .prt-game-role-name  { font-size: 15px; font-weight: 800; margin: 4px 0 2px; }
      .prt-game-role-org   { font-size: 11px; color: #86c9cc; }
      .prt-scenario-block {
        flex: 1; padding: 14px 18px; border: 2px solid #2A9298;
        border-radius: 6px; background: #f0f8f8;
      }
      .prt-scenario-naam { font-size: 14px; font-weight: 700; color: #0E4447; }
      .prt-scenario-conclusie { font-size: 12px; color: #333; margin-top: 5px; line-height: 1.5; }
      .prt-radar-row { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
      .prt-radar-chart { flex: 0 0 auto; }
      .prt-radar-table  { flex: 1; min-width: 200px; }
      .prt-outcomes-grid { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
      .prt-outcome-card {
        flex: 1; min-width: 100px; text-align: center;
        padding: 12px 8px; background: #f0f8f8; border-radius: 6px;
        border: 1px solid #cde8e8;
      }
      .prt-outcome-value {
        font-size: 19px; font-weight: 800; color: #0E4447;
        display: block; margin-bottom: 4px;
      }
      .prt-outcome-card div { font-size: 11px; color: #555; }

      /* ── ADVIESRAPPORT ──────────────────────────────────── */
      .prt-advies-hero {
        background: linear-gradient(135deg, #0E4447 0%, #176064 60%, #2A9298 100%);
        padding: 22px 24px; border-radius: 6px;
        color: white; margin-bottom: 20px;
      }
      .prt-advies-hero h1 {
        font-size: 17px; font-weight: 800; color: #fff; margin: 0 0 5px 0;
      }
      .prt-advies-hero p  { font-size: 11px; color: rgba(255,255,255,.8); margin: 0; }

      .prt-central-boodschap {
        background: #EEF5F6; border-left: 4px solid #2A9298;
        border-radius: 0 6px 6px 0; padding: 14px 18px; margin-bottom: 18px;
      }
      .prt-central-boodschap-label {
        font-size: 9px; font-weight: 700; letter-spacing: .1em;
        text-transform: uppercase; color: #2A9298; margin-bottom: 5px;
      }
      .prt-central-boodschap-text {
        font-size: 12.5px; line-height: 1.6; color: #0E4447;
      }

      .prt-advies-section {
        margin-bottom: 20px; page-break-inside: avoid;
      }
      .prt-advies-section-title {
        font-size: 13px; font-weight: 700; color: #fff;
        background: #176064; padding: 7px 12px; border-radius: 4px;
        margin-bottom: 10px;
      }

      .prt-findings-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
      }
      .prt-finding-card {
        border: 1px solid #e0eeee; border-radius: 5px;
        padding: 10px 12px; page-break-inside: avoid;
      }
      .prt-finding-num  { font-size: 10px; color: #999; font-weight: 700; margin-bottom: 3px; }
      .prt-finding-titel { font-size: 12px; font-weight: 700; color: #0E4447; margin-bottom: 5px; }
      .prt-finding-tekst { font-size: 11px; line-height: 1.55; color: #3D8288; }

      .prt-problems-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
      }
      .prt-problem-card {
        display: flex; gap: 8px; align-items: flex-start;
        border: 1px solid #e0eeee; border-radius: 5px;
        padding: 10px 12px; page-break-inside: avoid;
      }
      .prt-problem-num {
        font-size: 22px; font-weight: 800; color: #EEF5F6;
        line-height: 1; flex-shrink: 0; min-width: 22px;
      }
      .prt-problem-titel { font-size: 12px; font-weight: 700; color: #0E4447; margin-bottom: 4px; }
      .prt-problem-tekst { font-size: 11px; line-height: 1.5; color: #3D8288; }

      .prt-advies-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
      }
      .prt-advies-card {
        border: 1px solid #e0eeee; border-left: 3px solid #2A9298;
        border-radius: 0 5px 5px 0; padding: 10px 12px;
        page-break-inside: avoid;
      }
      .prt-advies-num   { font-size: 10px; color: #2A9298; font-weight: 700; margin-bottom: 3px; }
      .prt-advies-titel { font-size: 12px; font-weight: 700; color: #0E4447; margin-bottom: 5px; }
      .prt-advies-tekst { font-size: 11px; line-height: 1.5; color: #3D8288; margin-bottom: 6px; }
      .prt-advies-actie {
        font-size: 10.5px; font-weight: 600; color: #2A9298;
        background: rgba(42,146,152,.08);
        padding: 3px 7px; border-radius: 4px; display: inline-block;
      }

      .prt-roadmap { display: flex; flex-direction: column; gap: 0; }
      .prt-roadmap-item {
        display: flex; gap: 14px; align-items: flex-start;
        padding-bottom: 14px; page-break-inside: avoid;
      }
      .prt-roadmap-jaar {
        background: #0E4447; color: #fff; font-size: 11.5px; font-weight: 700;
        border-radius: 14px; padding: 4px 10px; flex-shrink: 0; white-space: nowrap;
      }
      .prt-roadmap-jaar.arm-now  { background: #2A9298; }
      .prt-roadmap-jaar.arm-goal { background: #176064; }
      .prt-roadmap-titel { font-size: 12px; font-weight: 700; color: #0E4447; margin-bottom: 4px; }
      .prt-roadmap-punten { font-size: 11px; color: #3D8288; line-height: 1.6; padding-left: 12px; }

      /* ── ADVIESRAPPORT BODY TEXT ────────────────────────── */
      .prt-advies-body { padding: 2px 0 4px 0; }
      .prt-p {
        font-size: 11.5px; line-height: 1.65; color: #1a4a4e;
        margin: 0 0 9px 0;
      }
      .prt-p:last-child { margin-bottom: 0; }
      .prt-h3 {
        font-size: 12px; font-weight: 700; color: #0E4447;
        margin: 14px 0 5px 0;
      }
      .prt-ul {
        margin: 6px 0 8px 1em; padding: 0; list-style: none;
      }
      .prt-ul li {
        font-size: 11.5px; line-height: 1.6; color: #1a4a4e;
        padding: 2px 0 2px 0;
        border-bottom: 1px solid #edf4f4;
      }
      .prt-ul li::before {
        content: "→ "; color: #2A9298; font-weight: 700;
      }
      .prt-trend-table thead th:nth-child(3) { color: #b6ecef; }

      /* ── FOOTER ─────────────────────────────────────────── */
      .prt-footer {
        margin-top: 28px; padding-top: 10px;
        border-top: 1px solid #ddd;
        font-size: 10px; color: #999; text-align: center;
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
  // RADAR CHART SVG
  // ----------------------------------------------------------
  function radarChartSVG(vars, size) {
    size = size || 240;
    const cx = size / 2, cy = size / 2, r = (size / 2) - 44;
    const axes = [
      { key: 'politiek',     label: 'Politiek draagvlak' },
      { key: 'markt',        label: 'Marktgroei'          },
      { key: 'budget',       label: 'Budgetruimte'        },
      { key: 'samenwerking', label: 'Samenwerking'        },
    ];
    const N = axes.length;
    function angle(i) { return (i * 2 * Math.PI / N) - Math.PI / 2; }
    function pt(i, score) {
      const a = angle(i), ratio = Math.max(0, Math.min(100, score || 0)) / 100;
      return { x: cx + r * ratio * Math.cos(a), y: cy + r * ratio * Math.sin(a) };
    }
    function axisEnd(i) {
      const a = angle(i);
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }
    const rings = [25, 50, 75, 100].map(pct => {
      const pts = axes.map((_, i) => {
        const a = angle(i);
        return `${(cx + r*(pct/100)*Math.cos(a)).toFixed(1)},${(cy + r*(pct/100)*Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      return `<polygon points="${pts}" fill="none" stroke="#2A9298" stroke-width="${pct===100?1.2:0.7}" stroke-opacity="${pct===100?0.35:0.18}"/>`;
    }).join('');
    const ringLabels = [25,50,75].map(pct => {
      const a = angle(1), lx = cx + r*(pct/100)*Math.cos(a)+3, ly = cy + r*(pct/100)*Math.sin(a)-3;
      return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="8" fill="#aaa" text-anchor="start">${pct}</text>`;
    }).join('');
    const axisLines = axes.map((_, i) => {
      const e = axisEnd(i);
      return `<line x1="${cx}" y1="${cy}" x2="${e.x.toFixed(1)}" y2="${e.y.toFixed(1)}" stroke="#2A9298" stroke-width="0.8" stroke-opacity="0.35"/>`;
    }).join('');
    const polyPts = axes.map((ax, i) => {
      const p = pt(i, vars[ax.key]); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');
    const dots = axes.map((ax, i) => {
      const p = pt(i, vars[ax.key]), score = Math.round(vars[ax.key] || 0);
      const a = angle(i), ldist = r*(score/100)+16;
      const lx = cx+ldist*Math.cos(a), ly = cy+ldist*Math.sin(a);
      const dotColor = score>=70 ? '#2A9298' : score>=45 ? '#176064' : '#c07030';
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="${dotColor}" stroke="white" stroke-width="1.5"/>
        <text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="10.5" fill="${dotColor}" font-weight="700" text-anchor="middle" dominant-baseline="middle">${score}</text>`;
    }).join('');
    const axisLabels = axes.map((ax, i) => {
      const a = angle(i), dist = r+28, lx = cx+dist*Math.cos(a), ly = cy+dist*Math.sin(a);
      const anchor = (i===1)?'start':(i===3)?'end':'middle';
      const score = vars[ax.key] || 0, col = score>=70 ? '#0E4447' : '#444';
      return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="10.5" fill="${col}" font-weight="700" text-anchor="${anchor}" dominant-baseline="middle">${ax.label.split(' ')[0]}</text>`;
    }).join('');
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
      ${rings}${ringLabels}${axisLines}
      <polygon points="${polyPts}" fill="#2A9298" fill-opacity="0.16" stroke="#2A9298" stroke-width="2"/>
      ${dots}${axisLabels}
    </svg>`;
  }

  // ----------------------------------------------------------
  // PRINT: TRENDANALYSE
  // ----------------------------------------------------------
  function printTrends() {
    const IMPACT_LABELS  = { hoog: 'Hoge impact', midden: 'Gemiddelde impact', laag: 'Lage impact' };
    const TIJDLIJN_LABELS = { kort: 'Korte termijn', middellang: 'Middellange termijn', lang: 'Lange termijn' };
    const IMPACT_COLORS  = { hoog: '#C0392B', midden: '#E07B00', laag: '#2A9298' };

    const trendsHTML = (TRENDS || []).map(t => `
      <div class="prt-trend-card">
        <div class="prt-trend-header" style="border-left:4px solid ${IMPACT_COLORS[t.impact]||'#2A9298'}">
          <div class="prt-trend-title">${t.titel}</div>
          <div class="prt-trend-meta">
            <span class="prt-badge" style="background:${IMPACT_COLORS[t.impact]||'#2A9298'}">${IMPACT_LABELS[t.impact]||t.impact}</span>
            <span class="prt-badge-outline">${TIJDLIJN_LABELS[t.tijdlijn]||t.tijdlijn}</span>
          </div>
        </div>
        <div class="prt-trend-desc">${t.beschrijving}</div>
        ${t.stat && t.stat.length ? `
          <div class="prt-stats-row">
            ${t.stat.map(s=>`<div class="prt-stat"><strong>${s.waarde}</strong>${s.label}</div>`).join('')}
          </div>` : ''}
        ${t.bronnen && t.bronnen.length ? `
          <div class="prt-bronnen">Bronnen: ${t.bronnen.map(b=>typeof b==='string'?b:b.label).join(' · ')}</div>
        ` : ''}
      </div>`).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Trendanalyse — Biobased &amp; Circulaire Bouw')}
        <h2 class="prt-section-title" style="margin-top:18px">Trendoverzicht</h2>
        <p class="prt-intro">${(TRENDS||[]).length} trends voor de transitie naar biobased en circulaire bouw in de Groene Metropoolregio Arnhem-Nijmegen. Gebaseerd op interviews (april 2026), NABB 2023 en eigen onderzoek.</p>
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

    const interviewRows = (INTERVIEWED_IDS||[]).map(id => {
      const s = (STAKEHOLDERS||[]).find(x => x.id === id);
      const ans = q.antwoorden[id];
      if (!s || !ans) return '';
      return `<tr>
        <td><strong>${s.naam}</strong><br><span style="font-size:10px;color:#666">${s.categorie}</span></td>
        <td>${ans.citaat || ans.standpunt || ''}</td>
        <td><strong style="color:${SC[ans.sentiment]}">${SL[ans.sentiment]}</strong></td>
      </tr>`;
    }).join('');

    const standpuntRows = Object.entries(q.antwoorden)
      .filter(([,a]) => a.type === 'standpunt')
      .map(([idStr, ans]) => {
        const s = (STAKEHOLDERS||[]).find(x => x.id === parseInt(idStr));
        return `<tr>
          <td><strong>${s?s.naam:'Stakeholder '+idStr}</strong><br><span style="font-size:10px;color:#666">${s?s.categorie:''}</span></td>
          <td>${ans.standpunt}${ans.bronLabel?`<br><span style="font-size:10px;color:#2A9298">Bron: ${ans.bronLabel}</span>`:''}
          </td>
          <td><strong style="color:${SC[ans.sentiment]}">${SL[ans.sentiment]}</strong></td>
        </tr>`;
      }).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Notulen Explorer — Interviewmatrix')}
        <p class="prt-question-num" style="margin-top:16px">Vraag ${qIdx+1} van ${NOTULEN_QUESTIONS.length}</p>
        <div class="prt-question-box">${q.vraag}</div>
        ${q.toelichting ? `<div class="prt-toelichting">${q.toelichting}</div>` : ''}
        <div class="prt-sentiment-row">
          <span style="color:#27ae60">✓ ${counts.positief} positief</span>
          <span style="color:#e07b00">– ${counts.neutraal} neutraal</span>
          <span style="color:#c0392b">⚠ ${counts.kritisch} kritisch</span>
        </div>
        <h3 class="prt-subsection">Geïnterviewde partijen</h3>
        <table class="prt-table">
          <thead><tr><th style="width:155px">Partij</th><th>Reactie</th><th style="width:75px">Sentiment</th></tr></thead>
          <tbody>${interviewRows||'<tr><td colspan="3" style="color:#999;font-style:italic">Geen interviews beschikbaar.</td></tr>'}</tbody>
        </table>
        ${standpuntRows ? `
          <h3 class="prt-subsection" style="margin-top:22px">Standpunten uit bronnen</h3>
          <table class="prt-table">
            <thead><tr><th style="width:155px">Partij</th><th>Standpunt</th><th style="width:75px">Sentiment</th></tr></thead>
            <tbody>${standpuntRows}</tbody>
          </table>` : ''}
        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Notulen Explorer</div>
      </div>`);
  }

  // ----------------------------------------------------------
  // PRINT: STAKEHOLDERS
  // ----------------------------------------------------------
  function printStakeholders() {
    const CAT_ORDER = ['Gemeente','Provincie','Bouwbedrijf','Woningcorporatie','Brancheorganisatie','Kennisinstelling','Rijksoverheid'];
    const total = (STAKEHOLDERS||[]).length;
    const interviewed = (STAKEHOLDERS||[]).filter(s => s.interviewed).length;
    const sectionsHTML = CAT_ORDER.map(cat => {
      const items = (STAKEHOLDERS||[]).filter(s => s.categorie === cat);
      if (!items.length) return '';
      return `
        <div class="prt-sh-cat-title">${cat}</div>
        ${items.map(s => `
          <div class="prt-sh-card ${s.interviewed?'prt-sh-interviewed':''}">
            <div class="prt-sh-name">${s.naam}${s.interviewed?'<span class="prt-sh-badge">● Geïnterviewd</span>':''}</div>
            ${s.rol ? `<div class="prt-sh-rol">${s.rol}</div>` : ''}
            ${s.standpunt ? `<div class="prt-sh-standpunt">${s.standpunt}</div>` : ''}
          </div>`).join('')}`;
    }).join('');

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Stakeholderoverzicht — GMR Biobased &amp; Circulaire Bouw')}
        <h2 class="prt-section-title" style="margin-top:18px">Alle stakeholders (${total})</h2>
        <p class="prt-intro"><strong>${interviewed} partijen geïnterviewd</strong> in april 2026 · ${total-interviewed} aanvullende stakeholders op basis van gepubliceerde bronnen.</p>
        ${sectionsHTML}
        <div class="prt-footer">GMR Biobased &amp; Circulaire Bouw Dashboard · Stakeholderoverzicht</div>
      </div>`);
  }

  // ----------------------------------------------------------
  // PRINT: BELEIDSIMULATOR EINDRESULTAAT
  // ----------------------------------------------------------
  function printGameResult(vars, choices, roleId, scenario, outcomes) {
    if (!vars || !roleId) return;
    const role = (GAME_ROLES||[]).find(r => r.id === roleId);
    if (!role) return;
    const varLabels = { politiek:'Politiek draagvlak', markt:'Marktgroei', budget:'Budgetruimte', samenwerking:'Samenwerking' };
    const varsRows = Object.entries(vars).map(([k,v]) => {
      const label = varLabels[k]||k;
      const color = v>=70 ? '#2A9298' : v>=45 ? '#176064' : '#c07030';
      return `<tr>
        <td><strong>${label}</strong></td>
        <td><div style="background:#ddd;border-radius:3px;height:9px;width:160px;display:inline-block;vertical-align:middle"><div style="background:${color};border-radius:3px;height:9px;width:${v}%;display:block"></div></div></td>
        <td style="font-weight:700;color:${color};text-align:right;white-space:nowrap">${v} / 100</td>
      </tr>`;
    }).join('');
    const choicesRows = [1,2,3,4].map(rn => {
      const optId = choices[rn]; if (!optId) return '';
      const roundData = (GAME_ROUNDS_DATA[roleId]||[])[rn-1];
      const base = roundData ? roundData.opties.find(o => o.id === optId) : null;
      const enriched = (GAME_ROUND_ENRICHMENTS||{})[optId]||{};
      const merged = base ? {...base,...enriched} : null; if (!merged) return '';
      const fase = roundData ? (roundData.fase||'').replace(' — ',': ') : '';
      return `<tr>
        <td style="white-space:nowrap;font-weight:700">Ronde ${rn}</td>
        <td style="font-size:11px;color:#2A9298">${fase}</td>
        <td>${merged.label||optId}</td>
        <td style="color:#555;font-size:11px">${merged.gevolg||''}</td>
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
            <div class="prt-game-role-org">${role.organisatie||''}</div>
          </div>
          ${scenario ? `<div class="prt-scenario-block">
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

  // ----------------------------------------------------------
  // PRINT: ADVIESRAPPORT — volledige inhoud conform DOCX
  // ----------------------------------------------------------
  function printAdviesrapport() {

    // ── helpers ─────────────────────────────────────────────
    function sectionTitle(t) {
      return `<div class="prt-advies-section-title">${t}</div>`;
    }
    function body(html) {
      return `<div class="prt-advies-body">${html}</div>`;
    }
    function p(t) { return `<p class="prt-p">${t}</p>`; }
    function h3(t) { return `<h3 class="prt-h3">${t}</h3>`; }
    function li(t) { return `<li>${t}</li>`; }
    function ul(items) { return `<ul class="prt-ul">${items.map(li).join('')}</ul>`; }

    // ── FINDINGS GRID ────────────────────────────────────────
    const FINDINGS_DATA = [
      { num:'3.1', kleur:'#2A9298', titel:'De kennisfase is grotendeels voorbij',
        tekst:'Uit documentanalyse en interviews blijkt dat basiskennis over biobased bouwen sterk is gegroeid. Partijen kennen begrippen als MPG, MKI, HNN, CO₂-opslag, losmaakbaarheid en materiaalpaspoorten. Ook bestaan er meerdere woningconcepten die laten zien dat prefab, houtbouw, hybride bouw en circulaire ontwerpprincipes technisch haalbaar zijn. De vraag is niet meer <em>óf</em> biobased bouwen kan, maar waarom het nog niet standaard gebeurt. GMR hoeft dan ook niet primair nieuw beleid te ontwikkelen, maar bestaande kennis beter te organiseren en toe te passen.' },
      { num:'3.2', kleur:'#C0392B', titel:'Implementatie blijft achter bij beleid',
        tekst:'HNN biedt een duidelijke taal voor circulair bouwen. De NABB geeft richting aan opschaling van vezelteelt en biobased bouwketens. Toch worden deze instrumenten in projecten nog niet consequent gebruikt. In de praktijk blijven investeringskosten, planning en risicovermijding vaak zwaarder wegen dan circulariteit en CO₂-reductie. Dit leidt tot een kloof tussen ambitie en uitvoering. Overheden en marktpartijen onderschrijven de doelstellingen, maar vertalen deze onvoldoende naar harde projectcriteria. Producenten en agrariërs investeren pas wanneer zij zekerheid hebben over afname; bouwers en ontwikkelaars wachten op prijsdalingen en heldere regels.' },
      { num:'3.3', kleur:'#E07B00', titel:'Kosten: drempel, maar niet de hele verklaring',
        tekst:'Biobased materialen kunnen gemiddeld duurder zijn dan conventionele alternatieven. Toch is kosten niet de enige verklaring. HNN-documenten en woningconceptanalyses laten zien dat levensduurkosten, restwaarde, demontabiliteit en CO₂-opslag het beeld kunnen veranderen wanneer breder wordt gekeken dan alleen initiële investering. Het probleem: deze bredere waarde wordt nog niet altijd meegenomen in aanbestedingen of projectbesluiten. Zolang biobased bouwen alleen wordt beoordeeld op aanschafprijs, blijft het kwetsbaar.' },
      { num:'3.4', kleur:'#8E44AD', titel:'Regelgeving en vergunningen werken niet eenduidig',
        tekst:'Brandveiligheidsinterpretaties per gemeente, vergunningprocedures en onzekerheid rond MPG en EU-productregelgeving zorgen voor vertraging. Marktpartijen geven aan dat biobased oplossingen soms technisch mogelijk zijn, maar dat onzekerheid in toetsing en toelating de toepassing vertraagt. GMR moet niet alleen sturen op ambities, maar ook op uitvoerbaarheid. Regionale afstemming over toetsing en standaardcriteria kan veel onzekerheid wegnemen.' },
      { num:'3.5', kleur:'#176064', titel:'Woningcorporaties zijn cruciaal voor opschaling',
        tekst:'Woningcorporaties bouwen en beheren voor de lange termijn en hebben een maatschappelijke opdracht. Daardoor kunnen zij sturen op onderhoud, levensduur, woonkwaliteit én maatschappelijke waarde — niet alleen op initiële bouwkosten. Als corporaties binnen de regio gezamenlijk optrekken, ontstaat schaal in de vraag, wat leveranciers en bouwers zekerheid geeft en prijsdalingen versnelt. GMR kan hierin een faciliterende rol spelen door corporaties te verbinden, pilots te bundelen en kennisuitwisseling te organiseren.' },
    ];
    const findingsHTML = `<div class="prt-findings-grid">${FINDINGS_DATA.map(f=>`
      <div class="prt-finding-card" style="border-top:3px solid ${f.kleur}">
        <div class="prt-finding-num">${f.num}</div>
        <div class="prt-finding-titel">${f.titel}</div>
        <div class="prt-finding-tekst">${f.tekst}</div>
      </div>`).join('')}</div>`;

    // ── TREND TABEL ──────────────────────────────────────────
    const TRENDS_TABLE = [
      ['HNN als beleidskader','HNN ontwikkelt zich tot gemeenschappelijke taal voor circulair bouwen.','Niet alleen noemen, maar opnemen in projectuitvragen en monitoring.'],
      ['Industrialisatie en prefab','Prefab maakt biobased bouwen sneller, constanter en schaalbaarder.','Koppel biobased ambities aan woningconcepten en seriebouw.'],
      ['Carbon credits en CO₂-opslag','CO₂-opslag kan financiële waarde krijgen via certificaten of labels.','Start klein met pilots, maar bouw alvast databasis en rekenmethodiek op.'],
      ['Regionale ketens','Vezelteelt, verwerking en bouwvraag zijn nog onvoldoende verbonden.','Organiseer ketenafspraken tussen landbouw, producenten en bouwers.'],
      ['Van vrijwillig naar verplicht','Duurzaamheid verschuift van ambitie naar normering.','Bereid gemeenten en markt voor op strengere eisen en maak voorlopers sterker.'],
    ];
    const trendTableHTML = `
      <table class="prt-table prt-trend-table">
        <thead><tr><th style="width:22%">Trend</th><th style="width:39%">Betekenis</th><th style="width:39%">Implicatie voor GMR</th></tr></thead>
        <tbody>${TRENDS_TABLE.map((r,i)=>`<tr>
          <td style="font-weight:700;color:#0E4447">${r[0]}</td>
          <td>${r[1]}</td>
          <td style="color:#2A9298;font-style:italic">${r[2]}</td>
        </tr>`).join('')}</tbody>
      </table>`;

    // ── KNELPUNTEN ───────────────────────────────────────────
    const KNELPUNTEN_DATA = [
      { num:'5.1', kleur:'#C0392B', titel:'Vrijblijvendheid',
        tekst:'Veel duurzaamheidsinstrumenten worden gepresenteerd als handreiking of ambitie. Daardoor kunnen partijen er wel naar verwijzen, maar ontstaat geen verplichting om prestaties daadwerkelijk te halen. Zolang circulair bouwen een pluspunt blijft in plaats van een randvoorwaarde, zal prijsdruk vaak winnen.' },
      { num:'5.2', kleur:'#E07B00', titel:'Versnippering',
        tekst:'Kennis is verspreid over rapporten, websites, dashboards, adviseurs en marktpartijen. Dit maakt het voor projectleiders lastig om snel te bepalen welke biobased materialen geschikt zijn, welke leveranciers bestaan, welke prestaties bewezen zijn en hoe deze moeten worden uitgevraagd.' },
      { num:'5.3', kleur:'#8E44AD', titel:'Onzekerheid in de businesscase',
        tekst:'De voordelen van biobased bouwen worden onvoldoende financieel gewaardeerd. CO₂-opslag, restwaarde en demontabiliteit zijn belangrijk, maar verschijnen niet altijd in de businesscase. Hierdoor ontstaat het beeld dat biobased vooral duurder is, terwijl de langetermijnwaarde onvoldoende zichtbaar wordt.' },
      { num:'5.4', kleur:'#176064', titel:'Gebrek aan regionale uitvoeringsafspraken',
        tekst:'Gemeenten kunnen verschillende interpretaties hanteren, ontwikkelaars ervaren verschillende eisen per project en leveranciers krijgen geen stabiele vraag. Een regionale aanpak kan zorgen voor voorspelbaarheid — dat is nodig om de markt te laten investeren.' },
    ];
    const knelpuntenHTML = `<div class="prt-findings-grid">${KNELPUNTEN_DATA.map(k=>`
      <div class="prt-finding-card" style="border-top:3px solid ${k.kleur}">
        <div class="prt-finding-num">${k.num}</div>
        <div class="prt-finding-titel">${k.titel}</div>
        <div class="prt-finding-tekst">${k.tekst}</div>
      </div>`).join('')}</div>`;

    // ── ADVIEZEN ─────────────────────────────────────────────
    const ADVIEZEN_DATA = [
      { num:1, kleur:'#0E4447', titel:'Maak HNN het regionale basisniveau',
        tekst:'Gebruik Het Nieuwe Normaal als standaardtaal voor alle relevante woningbouwprojecten. Dit betekent dat HNN niet alleen als inspiratiebron wordt genoemd, maar dat de indicatoren worden opgenomen in uitvragen, beoordelingscriteria en monitoring.',
        actie:'HNN-indicatoren verplicht in elk projectdocument' },
      { num:2, kleur:'#176064', titel:'Vertaal beleid naar aanbesteding en gebiedsontwikkeling',
        tekst:'Zorg dat circulaire en biobased ambities vroeg in het proces worden vastgelegd. Wanneer dit pas laat in het project gebeurt, zijn ontwerp, budget en planning vaak al bepaald. De aanbestedingsfase is het meest effectieve moment voor verankering.',
        actie:'Circulaire criteria verplicht in de uitvraagfase' },
      { num:3, kleur:'#2A9298', titel:'Ontwikkel een regionale materialen- en kennisatlas',
        tekst:'Bundel informatie over materialen, leveranciers, toepassingen, prestaties, CO₂-opslag, brandveiligheid en voorbeeldprojecten in één praktische omgeving. Het bestaande dashboard kan hiervoor de basis vormen en uitgebreid worden tot een regionale atlas.',
        actie:'Dashboard uitbreiden naar volledige regionale atlas' },
      { num:4, kleur:'#C0392B', titel:'Vorm een GMR-biobased coalitie',
        tekst:'Breng gemeenten, corporaties, bouwbedrijven, ontwikkelaars, agrariërs, verwerkers, onderwijs en financiers samen. De transitie vraagt ketensamenwerking; geen enkele partij kan dit zelfstandig oplossen. De coalitie organiseert vraag, aanbod en kennisdeling.',
        actie:'Coalitievorming starten in 2026' },
      { num:5, kleur:'#E07B00', titel:'Gebruik corporaties als launching customer',
        tekst:'Start met een corporatiecoalitie die gezamenlijk biobased pilots en inkoopafspraken ontwikkelt. Corporaties hebben schaal, maatschappelijke legitimiteit en langetermijnbelang. Door bundeling van vraag dalen materiaalprijzen en ontstaat leveringszekerheid voor de keten.',
        actie:'Gezamenlijk inkoopakkoord GMR-corporaties' },
      { num:6, kleur:'#8E44AD', titel:'Koppel bouwen aan leren',
        tekst:'Investeer in vakmanschap via MBO/HBO-onderwijs, praktijktrainingen en kennisdeling over dampopen bouwen, houtbouw, droge verbindingen en circulaire detaillering. Zolang biobased kennis sectorbreed schaars is, blijft de markt structureel krap.',
        actie:'Biobased bouwprofiel in MBO-kwalificatiestructuur' },
    ];
    const adviezenHTML = `<div class="prt-advies-grid">${ADVIEZEN_DATA.map(a=>`
      <div class="prt-advies-card" style="border-left-color:${a.kleur}">
        <div class="prt-advies-num" style="color:${a.kleur}">Advies ${a.num}</div>
        <div class="prt-advies-titel">${a.titel}</div>
        <div class="prt-advies-tekst">${a.tekst}</div>
        <span class="prt-advies-actie" style="color:${a.kleur};background:${a.kleur}12">→ ${a.actie}</span>
      </div>`).join('')}</div>`;

    // ── ROADMAP TABEL ────────────────────────────────────────
    const roadmapTableHTML = `
      <table class="prt-table">
        <thead><tr>
          <th style="width:12%">Jaar</th>
          <th style="width:25%">Doel</th>
          <th>Concrete acties</th>
        </tr></thead>
        <tbody>
          <tr style="background:#f0f8f8">
            <td style="font-weight:800;color:#2A9298">2026</td>
            <td style="font-weight:700">Van analyse naar afspraken</td>
            <td>Bestuurlijk besluit over HNN als uitgangspunt; start materialenatlas; selectie corporatiepilots; dashboard uitbreiden met top 10 inzichten en prioriteitenmatrix.</td>
          </tr>
          <tr>
            <td style="font-weight:700;color:#176064">2027</td>
            <td style="font-weight:700">Verankering in projecten</td>
            <td>HNN opnemen in aanbestedingen; regionale modelteksten ontwikkelen; eerste CO₂- en materiaalpaspoorten toepassen; kennisdagen met gemeenten en markt.</td>
          </tr>
          <tr style="background:#f0f8f8">
            <td style="font-weight:700;color:#176064">2028</td>
            <td style="font-weight:700">Opschaling van ketens</td>
            <td>Regionale inkoopcoalitie opzetten; afspraken met agrariërs en verwerkers; standaardisatie van biobased toepassingen per woningtype.</td>
          </tr>
          <tr>
            <td style="font-weight:700;color:#176064">2029</td>
            <td style="font-weight:700">Financiële instrumenten</td>
            <td>Pilot met carbon credits of CO₂-labels; koppeling met financiering; structurele monitoring van CO₂-opslag en materiaalgebruik.</td>
          </tr>
          <tr style="background:#f0f8f8">
            <td style="font-weight:800;color:#0E4447">2030</td>
            <td style="font-weight:700">Normalisering</td>
            <td>Biobased en circulair bouwen als standaardoptie in regionale woningbouw; GMR positioneren als landelijke voorbeeldregio.</td>
          </tr>
        </tbody>
      </table>`;

    // ── BRONNENLIJST ─────────────────────────────────────────
    const BRONNEN = [
      'Whitepaper GMR / projectpaper: projectdefinitie biobased bouwen GMR, inclusief doel, scope en stakeholders.',
      'GMR Trendanalyse — Biobased &amp; Circulaire Bouw, 9 juni 2026: dashboard met trends en indicatoren.',
      'Interviews 2026: BAM Wonen (Tom Stolker), Van Wijnen, Klokgroep, Talis, Gemeente Nijmegen en Provincie Gelderland.',
      'Het Nieuwe Normaal: Leidraad Nieuwbouw 1.2, Onderbouwing HNN 1.0, Handreiking aanbesteden met HNN, Juridische toetsing HNN.',
      'Nationale Aanpak Biobased Bouwen en GMR-onderzoeken over areaal, volume, beleid, hybride bouwen en MPG.',
      'Woningconcepten en hun prestaties 2023/2024: vergelijking van prefab, biobased en circulaire woningconcepten.',
      'ING Strategy Paper Biobased (land)bouw, Building Balance kennisdossier en WeGrow-notitie over ketenvorming.',
      'Marktonderzoek Nederlandse carbon credits, Climate Cleanup Protocol en EU technical assessment over biogene koolstofopslag.',
      'SER-advies Werken aan veranderkracht en overige documenten over arbeidsmarkt, regelgeving en standaardisatie.',
    ];

    // ── OUTPUT ───────────────────────────────────────────────
    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Strategisch Adviesrapport — Biobased &amp; Circulaire Bouw')}

        <!-- TITELBLAD -->
        <div class="prt-advies-hero" style="margin-top:16px">
          <h1>Versnelling van biobased en circulaire bouw<br>in de Groene Metropoolregio Arnhem-Nijmegen</h1>
          <p>Karam Rihmani &amp; Berend Dirken &nbsp;·&nbsp; Minor Duurzaam Ondernemen &amp; Circulaire Economie &nbsp;·&nbsp; HAN &nbsp;·&nbsp; Juni 2026</p>
        </div>

        <!-- CENTRALE BOODSCHAP -->
        <div class="prt-central-boodschap">
          <div class="prt-central-boodschap-label">Centrale boodschap</div>
          <div class="prt-central-boodschap-text">
            Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen.
            De grootste uitdaging zit nu in de <strong>implementatie</strong>. Het advies is om bestaand beleid —
            zoals HNN en biobased criteria — structureel te verankeren in aanbestedingen,
            gebiedsontwikkeling en woningbouwprojecten.
          </div>
        </div>

        <!-- MANAGEMENTSAMENVATTING -->
        <div class="prt-advies-section">
          ${sectionTitle('Managementsamenvatting')}
          ${body(`
            ${p('De Groene Metropoolregio Arnhem-Nijmegen staat voor een dubbele opgave: de regio moet de woningbouw versnellen en tegelijkertijd de milieu-impact verlagen. Uit het onderzoek van Karam Rihmani en Berend Dirken blijkt dat de regio al beschikt over veel kennis, beleidsinstrumenten en praktijkvoorbeelden. Er zijn woningconcepten beschikbaar, marktpartijen experimenteren met biobased materialen en instrumenten zoals Het Nieuwe Normaal (HNN), de Nationale Aanpak Biobased Bouwen (NABB), materialenpaspoorten en carbon-creditmethodieken geven richting aan de transitie. Toch blijft de toepassing van biobased en circulaire bouwmaterialen achter bij de ambities.')}
            ${p('<strong>De centrale conclusie is dat het probleem niet langer primair ligt bij gebrek aan kennis of techniek, maar bij onvoldoende implementatie van bestaand beleid.</strong> Beleidskaders zijn aanwezig, maar worden nog niet consequent vertaald naar aanbestedingen, gebiedsontwikkelingen, vergunningprocessen, inkoopafspraken en projectbesluiten. Daardoor blijft duurzaam bouwen te vaak afhankelijk van losse pilots, intrinsiek gemotiveerde koplopers of tijdelijke subsidies.')}
            ${p('Het advies aan GMR is om de volgende fase van de transitie te richten op <strong>verankering</strong>: maak HNN het standaardkader voor regionale woningbouwprojecten, werk met een regionale implementatieroadmap, gebruik woningcorporaties als launching customer, ontwikkel een praktische materialen- en kennisomgeving en organiseer een regionale coalitie van gemeenten, corporaties, bouwers, ontwikkelaars, agrariërs, onderwijs en leveranciers.')}
          `)}
        </div>

        <!-- 1. AANLEIDING -->
        <div class="prt-advies-section">
          ${sectionTitle('1. Aanleiding en opdracht')}
          ${body(`
            ${p('Dit adviesrapport is opgesteld door Karam Rihmani en Berend Dirken, studenten gekoppeld aan de Groene Metropoolregio Arnhem-Nijmegen in het kader van de Minor Duurzaam Ondernemen &amp; Circulaire Economie (HAN). Het rapport bouwt voort op een dashboard, trendanalyse, beleidsanalyse, interviews en documentonderzoek.')}
            ${p('De bouwsector heeft een grote invloed op grondstoffengebruik, CO₂-uitstoot en afvalstromen. Tegelijkertijd is de woningbouwopgave urgent. Biobased materialen — zoals hout, hennep, vlas, stro, cellulose en miscanthus — bieden kansen doordat zij fossiele of minerale materialen kunnen vervangen en biogene koolstof langdurig kunnen opslaan in gebouwen.')}
            ${p('De versnelling vraagt om samenhang tussen beleid, markt, financiering, regelgeving, kennis, industrialisatie en regionale ketens. Dit adviesrapport brengt deze samenhang terug tot een uitvoerbare strategische lijn voor GMR.')}
          `)}
        </div>

        <!-- 2. ONDERZOEKSBASIS -->
        <div class="prt-advies-section">
          ${sectionTitle('2. Onderzoeksbasis en gebruikte bronnen')}
          ${body(`
            ${p('Het advies is gebaseerd op triangulatie van bronnen: eigen trendanalyse, interviews, beleidsdocumenten, HNN-documenten, woningconceptvergelijkingen, onderzoeken naar carbon credits en rapporten over regionale ketenontwikkeling.')}
            ${ul([
              'Whitepaper GMR &amp; projectpaper: projectdefinitie biobased bouwen GMR.',
              'GMR Trendanalyse 2026: dashboard met trends en indicatoren.',
              '<strong>Interviews 2026:</strong> BAM Wonen (Tom Stolker), Van Wijnen (Bart Triep), Klokgroep (Thijs Pleijhuis), Talis (Melany Thijssen), Gemeente Nijmegen (Maarten van Ginkel), Provincie Gelderland (Myriam van Zetten).',
              'Het Nieuwe Normaal: Leidraad Nieuwbouw 1.2, Onderbouwing HNN 1.0, Handreiking aanbesteden met HNN, Juridische toetsing HNN.',
              'Nationale Aanpak Biobased Bouwen (NABB 2023) en GMR-onderzoeken.',
              'Woningconcepten en hun prestaties 2023/2024, ING Strategy Paper, Building Balance kennisdossier.',
              'Marktonderzoek Nederlandse carbon credits en Climate Cleanup Protocol.',
            ])}
          `)}
        </div>

        <!-- 3. KERNBEVINDINGEN -->
        <div class="prt-advies-section">
          ${sectionTitle('3. Kernbevindingen uit het onderzoek')}
          ${body(`${p('Op basis van documentanalyse en interviews zijn vijf kernbevindingen geïdentificeerd die het strategisch advies onderbouwen.')}
          ${findingsHTML}`)}
        </div>

        <!-- 4. TRENDANALYSE -->
        <div class="prt-advies-section">
          ${sectionTitle('4. Trendanalyse: vijf overkoepelende bewegingen richting 2030')}
          ${body(`
            ${p('De uitgevoerde trendanalyse onderscheidt twaalf trends. Voor dit adviesrapport zijn vijf overkoepelende bewegingen strategisch het meest relevant. De belangrijkste ontwikkeling is de beweging van vrijwilligheid naar normalisering: HNN, materialenpaspoorten, CO₂-sturing en circulaire aanbesteding zijn nu vaak vrijwillig, maar ontwikkelen zich richting standaardpraktijk.')}
            ${trendTableHTML}
          `)}
        </div>

        <!-- 5. PROBLEEMANALYSE -->
        <div class="prt-advies-section">
          ${sectionTitle('5. Probleemanalyse — vier kernknelpunten')}
          ${body(`
            ${p('De kern van het probleem is niet dat er geen beleid bestaat, maar dat het beleid onvoldoende landt in de dagelijkse praktijk van woningbouwprojecten. De huidige situatie kan worden samengevat in vier knelpunten.')}
            ${knelpuntenHTML}
          `)}
        </div>

        <!-- 6. STRATEGISCH ADVIES -->
        <div class="prt-advies-section">
          ${sectionTitle('6. Strategisch advies — zes hoofdadviezen')}
          ${body(`
            ${p('Karam Rihmani en Berend Dirken adviseren GMR om de komende jaren niet te kiezen voor nog meer losse onderzoeken, maar voor een <strong>praktische implementatieagenda</strong>. Hieronder staan de zes hoofdadviezen.')}
            ${adviezenHTML}
          `)}
        </div>

        <!-- 7. ROADMAP -->
        <div class="prt-advies-section">
          ${sectionTitle('7. Implementatieroadmap 2026–2030')}
          ${body(roadmapTableHTML)}
        </div>

        <!-- 8. DASHBOARD AANBEVELINGEN -->
        <div class="prt-advies-section">
          ${sectionTitle('8. Aanbevelingen voor het dashboard')}
          ${body(`
            ${p('Het dashboard is al sterk omdat het trends, bronnen en cijfers visueel samenbrengt. Voor de presentatie aan de opdrachtgever adviseren wij drie aanvullingen die het advies uitvoerbaarder maken:')}
            ${ul([
              'Een tab <strong>Top 10 inzichten</strong> met korte conclusies en handelingsperspectief per inzicht.',
              'Een <strong>prioriteitenmatrix</strong> met impact, uitvoerbaarheid en urgentie per maatregel.',
              'Een <strong>implementatieroadmap 2026–2030</strong> waarin zichtbaar wordt wat GMR per jaar kan doen.',
            ])}
            ${p('Deze aanvullingen voorkomen dat het dashboard alleen informatief is. Het wordt dan ook een beslisinstrument voor GMR.')}
          `)}
        </div>

        <!-- 9. CONCLUSIE -->
        <div class="prt-advies-section">
          ${sectionTitle('9. Conclusie')}
          ${body(`
            ${p('De Groene Metropoolregio Arnhem-Nijmegen heeft een sterke uitgangspositie om koploper te worden in biobased en circulair bouwen. De regio beschikt over relevante beleidsambities, een urgente woningbouwopgave, betrokken gemeenten, corporaties, kennisinstellingen en marktpartijen.')}
            ${p('<strong>De belangrijkste barrière is niet het ontbreken van beleid, maar het ontbreken van consequente implementatie.</strong> Zolang HNN, biobased criteria, materialenpaspoorten en CO₂-sturing vrijwillig blijven, blijft opschaling afhankelijk van koplopers en pilots.')}
            ${p('De volgende stap is normalisering: van ambitie naar eis, van losse projecten naar regionale afspraken en van kennis naar uitvoering. Het centrale advies aan GMR is om de implementatie van bestaand beleid te versnellen door HNN regionaal te verankeren, corporaties te gebruiken als launching customer, een materialen- en kennisatlas te ontwikkelen en een regionale coalitie te vormen die de bouwketen verbindt. Daarmee kan GMR niet alleen bijdragen aan de eigen Woondeal- en duurzaamheidsdoelen, maar ook uitgroeien tot <strong>voorbeeldregio voor biobased en circulaire woningbouw in Nederland</strong>.')}
          `)}
        </div>

        <!-- BRONNENLIJST -->
        <div class="prt-advies-section">
          ${sectionTitle('Bronnenlijst')}
          ${body(ul(BRONNEN))}
        </div>

        <div class="prt-footer">
          GMR Biobased &amp; Circulaire Bouw Dashboard &nbsp;·&nbsp;
          Adviesrapport Karam Rihmani &amp; Berend Dirken &nbsp;·&nbsp;
          Minor Duurzaam Ondernemen &amp; Circulaire Economie, HAN &nbsp;·&nbsp;
          ${today()}
        </div>
      </div>`);
  }

  return { printTrends, printNotulen, printStakeholders, printGameResult, printAdviesrapport, radarChartSVG };

})();
