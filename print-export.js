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

  // Resolve logo.svg path (werkt op file:// én GitHub Pages)
  function logoSrc() {
    try {
      // Als script zelf een src heeft, gebruik die als basis
      const scripts = document.querySelectorAll('script[src*="print-export"]');
      if (scripts.length) {
        const base = scripts[0].src.replace(/print-export\.js.*$/, '');
        return base + 'logo.svg';
      }
    } catch (_) {}
    return 'logo.svg';
  }

  function gmrHeader(subtitle) {
    return `
      <div class="prt-header">
        <div class="prt-logo">
          <img src="${logoSrc()}" alt="GMR" class="prt-logo-img" />
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
      .prt-logo { display: flex; align-items: center; gap: 12px; }
      .prt-logo-img {
        height: 44px; width: auto;
        filter: brightness(0) invert(1);
      }
      .prt-logo-text { display: flex; flex-direction: column; }
      .prt-logo-title { font-size: 13px; font-weight: 700; color: #fff; }
      .prt-logo-sub   { font-size: 10.5px; color: #86c9cc; }
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
  // PRINT: ADVIESRAPPORT
  // ----------------------------------------------------------
  function printAdviesrapport() {

    const FINDINGS = [
      { num:'3.1', kleur:'#2A9298', titel:'De kennisfase is grotendeels voorbij',
        tekst:'Partijen kennen MPG, HNN, CO₂-opslag en materialenpaspoorten. Woningconcepten tonen aan dat biobased technisch haalbaar is. De hoofdvraag is niet meer óf het kan, maar waarom het nog niet standaard gebeurt.' },
      { num:'3.2', kleur:'#C0392B', titel:'Implementatie blijft achter bij beleid',
        tekst:'HNN, NABB, materialenpaspoorten en CO₂-sturing bestaan, maar worden in projecten niet consequent gebruikt. Er is een structurele kloof tussen ambitie en uitvoering.' },
      { num:'3.3', kleur:'#E07B00', titel:'Kosten: drempel, maar niet de hele verklaring',
        tekst:'Biobased materialen kunnen duurder zijn bij initiële aanschaf. Maar levensduurkosten, restwaarde en CO₂-opslag veranderen dit beeld fundamenteel. Zolang alleen aanschafprijs telt, blijft de langetermijnwaarde onzichtbaar.' },
      { num:'3.4', kleur:'#8E44AD', titel:'Regelgeving werkt nog niet eenduidig',
        tekst:'Brandveiligheidsinterpretaties, MPG-berekeningsregels en wisselende gemeentelijke interpretaties zorgen voor vertraging. Regionale afstemming verlaagt de onzekerheid significant.' },
      { num:'3.5', kleur:'#176064', titel:'Woningcorporaties zijn cruciaal voor opschaling',
        tekst:'Corporaties sturen op levensduur, onderhoud en maatschappelijke waarde. Gezamenlijk optrekken geeft schaal, versnelt prijsdalingen en biedt zekerheid aan producenten.' },
    ];

    const KNELPUNTEN = [
      { num:'01', titel:'Vrijblijvendheid',
        tekst:'Duurzaamheidsinstrumenten als HNN worden gepresenteerd als handreiking, niet als randvoorwaarde. Zolang circulair bouwen een pluspunt is, wint prijsdruk bijna altijd.' },
      { num:'02', titel:'Versnippering van kennis',
        tekst:'Kennis is verspreid over rapporten en adviseurs. Voor projectleiders is het lastig snel te bepalen welke materialen geschikt zijn en hoe biobased prestaties uitgevraagd worden.' },
      { num:'03', titel:'Onzichtbare businesscase',
        tekst:'CO₂-opslag, restwaarde en demontabiliteit ontbreken in de businesscase. Biobased lijkt alleen duurder, terwijl de langetermijnwaarde structureel onderschat wordt.' },
      { num:'04', titel:'Gebrek aan regionale uitvoeringsafspraken',
        tekst:'Gemeenten hanteren verschillende interpretaties, eisen wisselen per project. Regionale afstemming biedt de voorspelbaarheid die investeringen in de bouwketen mogelijk maakt.' },
    ];

    const ADVIEZEN = [
      { num:1, titel:'Maak HNN het regionale basisniveau',
        tekst:'Gebruik Het Nieuwe Normaal als standaardtaal voor alle relevante woningbouwprojecten.',
        actie:'HNN-indicatoren in elk projectdocument' },
      { num:2, titel:'Vertaal beleid naar aanbesteding',
        tekst:'Verankering van circulaire en biobased ambities moet vroeg in het proces — vóór ontwerp, budget en planning vastliggen.',
        actie:'Circulaire criteria verplicht in de uitvraagfase' },
      { num:3, titel:'Ontwikkel een materialen- en kennisatlas',
        tekst:'Bundel informatie over materialen, leveranciers, toepassingen en CO₂-opslag in één praktische omgeving.',
        actie:'Dashboard uitbreiden naar regionale atlas' },
      { num:4, titel:'Vorm een GMR-biobased coalitie',
        tekst:'Breng gemeenten, corporaties, bouwbedrijven, agrariërs, verwerkers en onderwijs samen. De transitie vraagt ketensamenwerking.',
        actie:'Coalitievorming starten in 2026' },
      { num:5, titel:'Gebruik corporaties als launching customer',
        tekst:'Start met een corporatiecoalitie die gezamenlijk biobased pilots en inkoopafspraken ontwikkelt.',
        actie:'Gezamenlijk inkoopakkoord GMR-corporaties' },
      { num:6, titel:'Koppel bouwen aan leren',
        tekst:'Investeer in vakmanschap via MBO/HBO-onderwijs, praktijktrainingen en kennisdeling.',
        actie:'Biobased bouwprofiel in MBO-curriculum' },
    ];

    const ROADMAP = [
      { jaar:'2026', cls:'arm-now',  titel:'Van analyse naar afspraken',
        punten:['Bestuurlijk besluit: HNN als regionaal uitgangspunt','Start materialen- en kennisatlas','Selectie corporatiepilots biobased'] },
      { jaar:'2027', cls:'',         titel:'Verankering in projecten',
        punten:['HNN opnemen in aanbestedingen','Regionale modelteksten en beoordelingsformats','Eerste CO₂- en materialenpaspoorten'] },
      { jaar:'2028', cls:'',         titel:'Opschaling van ketens',
        punten:['Regionale inkoopcoalitie operationeel','Afspraken met agrariërs en verwerkers'] },
      { jaar:'2029', cls:'',         titel:'Financiële instrumenten',
        punten:['Pilot carbon credits of CO₂-labels','Koppeling met groene financiering'] },
      { jaar:'2030', cls:'arm-goal', titel:'Normalisering',
        punten:['Biobased = standaard in regionale woningbouw','GMR positioneren als landelijke voorbeeldregio'] },
    ];

    const findingsHTML = `
      <div class="prt-findings-grid">
        ${FINDINGS.map(f => `
          <div class="prt-finding-card" style="border-top:3px solid ${f.kleur}">
            <div class="prt-finding-num">${f.num}</div>
            <div class="prt-finding-titel">${f.titel}</div>
            <div class="prt-finding-tekst">${f.tekst}</div>
          </div>`).join('')}
      </div>`;

    const problemenHTML = `
      <div class="prt-problems-grid">
        ${KNELPUNTEN.map(k => `
          <div class="prt-problem-card">
            <div class="prt-problem-num">${k.num}</div>
            <div>
              <div class="prt-problem-titel">${k.titel}</div>
              <div class="prt-problem-tekst">${k.tekst}</div>
            </div>
          </div>`).join('')}
      </div>`;

    const adviezenHTML = `
      <div class="prt-advies-grid">
        ${ADVIEZEN.map(a => `
          <div class="prt-advies-card">
            <div class="prt-advies-num">Advies ${a.num}</div>
            <div class="prt-advies-titel">${a.titel}</div>
            <div class="prt-advies-tekst">${a.tekst}</div>
            <span class="prt-advies-actie">→ ${a.actie}</span>
          </div>`).join('')}
      </div>`;

    const roadmapHTML = `
      <div class="prt-roadmap">
        ${ROADMAP.map(item => `
          <div class="prt-roadmap-item">
            <div class="prt-roadmap-jaar ${item.cls}">${item.jaar}</div>
            <div>
              <div class="prt-roadmap-titel">${item.titel}</div>
              <div class="prt-roadmap-punten">${item.punten.map(p=>`→ ${p}`).join('<br>')}</div>
            </div>
          </div>`).join('')}
      </div>`;

    triggerPrint(`
      <div class="prt-body">
        ${gmrHeader('Strategisch Adviesrapport — Biobased &amp; Circulaire Bouw')}

        <div class="prt-advies-hero" style="margin-top:16px">
          <h1>Versnelling van biobased en circulaire bouw in de GMR</h1>
          <p>Karam Rihmani &amp; Berend Dirken &nbsp;·&nbsp; Minor Duurzaam Ondernemen &amp; Circulaire Economie &nbsp;·&nbsp; HAN &nbsp;·&nbsp; Juni 2026</p>
        </div>

        <div class="prt-central-boodschap">
          <div class="prt-central-boodschap-label">Centrale boodschap</div>
          <div class="prt-central-boodschap-text">
            Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen.
            De grootste uitdaging zit nu in de <strong>implementatie</strong>. Het advies is om bestaand beleid —
            zoals HNN en biobased criteria — structureel te verankeren in aanbestedingen,
            gebiedsontwikkeling en woningbouwprojecten.
          </div>
        </div>

        <div class="prt-advies-section">
          <div class="prt-advies-section-title">Managementsamenvatting</div>
          <p style="font-size:12px;line-height:1.65;color:#155558;margin:0 0 8px 0">
            De GMR staat voor een dubbele opgave: woningbouw versnellen én de milieu-impact verlagen.
            De regio beschikt al over kennis, beleidsinstrumenten en praktijkvoorbeelden.
            Toch blijft toepassing achter bij ambities. <strong>Het probleem ligt niet bij gebrek aan kennis of techniek,
            maar bij onvoldoende implementatie van bestaand beleid.</strong>
          </p>
          <p style="font-size:12px;line-height:1.65;color:#155558;margin:0">
            Het advies: richt de volgende fase op verankering — maak HNN het standaardkader,
            werk met een regionale implementatieroadmap, gebruik corporaties als launching customer
            en bouw een regionale coalitie.
          </p>
        </div>

        <div class="prt-advies-section">
          <div class="prt-advies-section-title">Kernconclusies uit het onderzoek</div>
          ${findingsHTML}
        </div>

        <div class="prt-advies-section">
          <div class="prt-advies-section-title">Vier kernknelpunten</div>
          ${problemenHTML}
        </div>

        <div class="prt-advies-section">
          <div class="prt-advies-section-title">Zes strategische adviezen aan de GMR</div>
          ${adviezenHTML}
        </div>

        <div class="prt-advies-section">
          <div class="prt-advies-section-title">Implementatieroadmap 2026–2030</div>
          ${roadmapHTML}
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
