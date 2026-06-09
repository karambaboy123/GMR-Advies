// ============================================================
// NOTULEN.JS — Tab 3: Notulen Explorer / Interviewmatrix
// Toont zowel geïnterviewde partijen (citaten) als
// niet-geïnterviewde stakeholders (standpunten uit bronnen)
// ============================================================

const NotulenTab = (() => {

  // BASE_PATH is globaal beschikbaar via data.js

  let activeQuestion = null;
  let sentimentFilter = null;   // null = alles tonen
  let onRefreshIcons;

  const SENTIMENT_ICONS = {
    positief: 'thumbs-up',
    neutraal: 'minus-circle',
    kritisch: 'alert-triangle',
  };
  const SENTIMENT_LABELS = {
    positief: 'Positief',
    neutraal: 'Neutraal',
    kritisch: 'Kritisch',
  };

  // --------------------------------------------------------
  // RENDER (alleen HTML update + vraag-klikkers; bron-listener in init)
  // --------------------------------------------------------
  function render() {
    const container = document.getElementById('notulen-content');

    container.innerHTML = `
      <div class="notulen-disclaimer-banner">
        <i data-lucide="info"></i>
        <span>De weergegeven citaten zijn samenvattingen van gesprekken en niet altijd letterlijk woord-voor-woord weergegeven.</span>
      </div>
      <div class="notulen-layout">
        <div class="notulen-questions-panel">
          <div class="panel-header">
            <i data-lucide="help-circle"></i> Interviewvragen
          </div>
          ${NOTULEN_QUESTIONS.map((q, i) => `
            <div class="question-item ${activeQuestion === i ? 'active' : ''}"
                 data-qidx="${i}" role="button" tabindex="0">
              <div class="question-num">${i + 1}</div>
              <div class="question-text">${q.vraag}</div>
            </div>`).join('')}
        </div>
        <div class="notulen-matrix-panel" id="notulen-matrix">
          ${activeQuestion === null ? emptyStateHTML() : matrixHTML(activeQuestion)}
        </div>
      </div>`;

    container.querySelectorAll('.question-item').forEach(item => {
      item.addEventListener('click', () => selectQuestion(parseInt(item.dataset.qidx)));
    });

    onRefreshIcons(container);
  }

  function emptyStateHTML() {
    return `<div class="matrix-empty">
      <i data-lucide="mouse-pointer-click" style="display:block;margin:0 auto 12px;opacity:0.4;width:36px;height:36px"></i>
      <p>Selecteer een interviewvraag<br>om de antwoorden te bekijken.</p>
    </div>`;
  }

  function matrixHTML(qIdx) {
    const q = NOTULEN_QUESTIONS[qIdx];
    if (!q) return emptyStateHTML();

    // Separate interviewed (type:quote) and non-interviewed (type:standpunt)
    const interviewedRows = INTERVIEWED_IDS.map(id => {
      const s = STAKEHOLDERS.find(x => x.id === id);
      if (!s) return '';
      const ans = q.antwoorden[id];
      if (!ans) return '';
      const sentiment = ans.sentiment;
      if (sentimentFilter && sentiment !== sentimentFilter) return '';
      return `<div class="matrix-row">
        <div>
          <div class="matrix-stakeholder-name">${s.naam}</div>
          <div class="matrix-stakeholder-cat">${s.categorie}</div>
        </div>
        <div class="matrix-citaat">${ans.citaat || ans.standpunt || ''}</div>
        <div>
          <span class="sentiment-badge ${sentiment}">
            <i data-lucide="${SENTIMENT_ICONS[sentiment]}" style="width:11px;height:11px"></i>
            ${SENTIMENT_LABELS[sentiment]}
          </span>
        </div>
      </div>`;
    }).join('');

    // Non-interviewed standpunten
    const standpuntEntries = Object.entries(q.antwoorden)
      .filter(([_, ans]) => ans.type === 'standpunt' && (!sentimentFilter || ans.sentiment === sentimentFilter))
      .map(([idStr, ans]) => {
        const id = parseInt(idStr);
        const s = STAKEHOLDERS.find(x => x.id === id);
        const naam = s ? s.naam : `Stakeholder ${id}`;
        const cat = s ? s.categorie : 'Onbekend';
        const sentiment = ans.sentiment;
        return `<div class="matrix-row standpunt-row">
          <div>
            <div class="matrix-stakeholder-name">${naam}</div>
            <div class="matrix-stakeholder-cat standpunt-cat">
              <i data-lucide="book-open" style="width:10px;height:10px;vertical-align:-1px;margin-right:3px"></i>${cat}
            </div>
          </div>
          <div class="matrix-citaat">
            <div class="standpunt-text">${ans.standpunt}</div>
            ${ans.bron ? (() => {
                const isUrl = ans.bron.startsWith('http');
                const icon = isUrl ? 'external-link' : 'file-text';
                const label = ans.bronLabel || (isUrl ? ans.bron.replace('https://','').replace('http://','') : ans.bron);
                return `<a class="bron-link standpunt-bron-link" href="#"
                  data-bestand="${ans.bron.replace(/"/g, '&quot;')}">
                  <i data-lucide="${icon}" style="width:11px;height:11px;margin-right:3px"></i>${label}
                </a>`;
              })() : ''}
          </div>
          <div>
            <span class="sentiment-badge ${sentiment}">
              <i data-lucide="${SENTIMENT_ICONS[sentiment]}" style="width:11px;height:11px"></i>
              ${SENTIMENT_LABELS[sentiment]}
            </span>
          </div>
        </div>`;
      }).join('');

    // Sentiment summary (all answers combined)
    const allAnswers = Object.values(q.antwoorden);
    const counts = { positief: 0, neutraal: 0, kritisch: 0 };
    allAnswers.forEach(a => { if (counts[a.sentiment] !== undefined) counts[a.sentiment]++; });

    const interviewedCount = INTERVIEWED_IDS.filter(id => q.antwoorden[id]).length;
    const standpuntCount = allAnswers.filter(a => a.type === 'standpunt').length;

    return `
      <div class="matrix-question-display">
        <div class="matrix-question-icon"><i data-lucide="help-circle"></i></div>
        <div class="matrix-question-text">${q.vraag}</div>
      </div>

      ${q.toelichting ? `
        <div class="notulen-toelichting">
          <i data-lucide="info" style="width:14px;height:14px;flex-shrink:0;margin-top:1px"></i>
          <span>${q.toelichting}</span>
        </div>` : ''}

      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;align-items:center">
        <button class="sentiment-badge positief sentiment-filter-btn ${sentimentFilter==='positief'?'is-active':''}"
          data-filter="positief" style="font-size:12px" title="Filter op positief">
          <i data-lucide="thumbs-up" style="width:12px;height:12px"></i>
          ${counts.positief} positief
        </button>
        <button class="sentiment-badge neutraal sentiment-filter-btn ${sentimentFilter==='neutraal'?'is-active':''}"
          data-filter="neutraal" style="font-size:12px" title="Filter op neutraal">
          <i data-lucide="minus-circle" style="width:12px;height:12px"></i>
          ${counts.neutraal} neutraal
        </button>
        <button class="sentiment-badge kritisch sentiment-filter-btn ${sentimentFilter==='kritisch'?'is-active':''}"
          data-filter="kritisch" style="font-size:12px" title="Filter op kritisch">
          <i data-lucide="alert-triangle" style="width:12px;height:12px"></i>
          ${counts.kritisch} kritisch
        </button>
        <span style="font-size:11px;color:var(--tekst-licht)">
          ${interviewedCount} interviews + ${standpuntCount} bronstandpunten
        </span>
        <button class="download-btn" style="margin-left:auto"
          onclick="if(window.GMRPrint) GMRPrint.printNotulen(${qIdx})">
          <i data-lucide="download"></i> Download PDF
        </button>
      </div>

      <!-- Geïnterviewde partijen -->
      <div class="notulen-section-header">
        <i data-lucide="mic" style="width:14px;height:14px"></i>
        Geïnterviewde partijen (${interviewedCount})
      </div>
      <div class="matrix-grid">${interviewedRows || '<div style="padding:12px;font-size:13px;color:var(--tekst-licht)">Geen interviews gevonden voor deze vraag.</div>'}</div>

      ${standpuntCount > 0 ? `
        <!-- Niet-geïnterviewde stakeholders -->
        <div class="notulen-section-header notulen-section-standpunt">
          <i data-lucide="book-open" style="width:14px;height:14px"></i>
          Standpunten uit bronnen, niet geïnterviewd (${standpuntCount})
          <span class="notulen-section-sub">Op basis van gepubliceerde rapporten en beleidsdocumenten</span>
        </div>
        <div class="matrix-grid standpunt-grid">${standpuntEntries}</div>
      ` : ''}`;
  }

  // --------------------------------------------------------
  // PUBLIC: selecteer vraag
  // --------------------------------------------------------
  function selectQuestion(idx) {
    activeQuestion = idx;
    sentimentFilter = null; // reset filter bij nieuwe vraag
    render();
    const matrix = document.getElementById('notulen-matrix');
    if (matrix) matrix.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;

    // Eenmalige delegated click listener (overleeft re-renders)
    const container = document.getElementById('notulen-content');
    container.addEventListener('click', e => {
      // Sentiment filter knoppen
      const filterBtn = e.target.closest('.sentiment-filter-btn');
      if (filterBtn) {
        e.preventDefault();
        const f = filterBtn.dataset.filter;
        sentimentFilter = (sentimentFilter === f) ? null : f; // toggle
        render();
        return;
      }
      // Bron-links
      const link = e.target.closest('.bron-link');
      if (link) {
        e.preventDefault();
        const bestand = link.dataset.bestand;
        if (bestand) {
          const base = location.protocol === 'file:'
            ? BASE_PATH
            : 'https://raw.githubusercontent.com/karambaboy123/GMR-Advies/master/Biobased%20en%20Circulaire%20Bouw/';
          const url = (bestand.startsWith('http://') || bestand.startsWith('https://'))
            ? bestand
            : base + encodeURIComponent(bestand);
          window.open(url, '_blank');
        }
      }
    });

    render();
  }

  return { init, selectQuestion };
})();
