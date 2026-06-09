// ============================================================
// STAKEHOLDERS.JS — Tab 1: Stakeholder overzicht en modal
// ============================================================

const StakeholdersTab = (() => {

  // Categorie iconen (Lucide icon names)
  const CATEGORY_ICONS = {
    'Gemeente':           'building-2',
    'Provincie':          'landmark',
    'Bouwbedrijf':        'hard-hat',
    'Woningcorporatie':   'home',
    'Brancheorganisatie': 'briefcase',
    'Kennisinstelling':   'graduation-cap',
    'Rijksoverheid':      'shield',
  };

  const CATEGORY_ORDER = [
    'Gemeente', 'Provincie', 'Bouwbedrijf',
    'Woningcorporatie', 'Brancheorganisatie', 'Kennisinstelling', 'Rijksoverheid'
  ];

  const CATEGORY_PLURAL = {
    'Gemeente':           'Gemeenten',
    'Provincie':          'Provincie Gelderland',
    'Bouwbedrijf':        'Bouwbedrijven',
    'Woningcorporatie':   'Woningcorporaties',
    'Brancheorganisatie': 'Brancheorganisaties',
    'Kennisinstelling':   'Kennisinstellingen',
    'Rijksoverheid':      'Rijksoverheid',
  };

  let activeCategory = 'alle';
  let activeFilter = 'alle'; // alle | geinterviewd | niet-geinterviewd
  let onRefreshIcons;

  // --------------------------------------------------------
  // RENDER FILTER BAR
  // --------------------------------------------------------
  function renderFilterBar() {
    const bar = document.getElementById('stakeholders-filter-bar');

    const categoryBtns = ['alle', ...CATEGORY_ORDER].map(cat => {
      const count = cat === 'alle'
        ? STAKEHOLDERS.length
        : STAKEHOLDERS.filter(s => s.categorie === cat).length;
      return `<button class="filter-btn ${activeCategory === cat ? 'active' : ''}"
                data-cat="${cat}">
                ${cat === 'alle' ? 'Alle categorieën' : cat}
                <span style="opacity:0.65;font-size:11px;margin-left:3px">(${count})</span>
              </button>`;
    }).join('');

    const interviewBtns = [
      { val: 'alle', label: 'Alle' },
      { val: 'geinterviewd', label: 'Geïnterviewd' },
      { val: 'niet-geinterviewd', label: 'Niet geïnterviewd' },
    ].map(f => `<button class="filter-btn ${activeFilter === f.val ? 'active' : ''}"
                  data-filter="${f.val}">${f.label}</button>`).join('');

    bar.innerHTML = `
      <span class="filter-label">Categorie:</span>
      ${categoryBtns}
      <div class="filter-sep"></div>
      <span class="filter-label">Status:</span>
      ${interviewBtns}
      <div class="filter-sep"></div>
      <button class="download-btn" id="stakeholders-download-btn">
        <i data-lucide="download"></i> Download PDF
      </button>
    `;

    bar.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderAll();
      });
    });

    bar.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        renderAll();
      });
    });

    // Download knop
    const dlBtn = bar.querySelector('#stakeholders-download-btn');
    if (dlBtn && window.GMRPrint) dlBtn.addEventListener('click', () => GMRPrint.printStakeholders());
    if (onRefreshIcons) onRefreshIcons(bar);
  }

  // --------------------------------------------------------
  // FILTER STAKEHOLDERS
  // --------------------------------------------------------
  function getFiltered() {
    return STAKEHOLDERS.filter(s => {
      const catOk = activeCategory === 'alle' || s.categorie === activeCategory;
      const filterOk =
        activeFilter === 'alle' ||
        (activeFilter === 'geinterviewd' && s.interviewed) ||
        (activeFilter === 'niet-geinterviewd' && !s.interviewed);
      return catOk && filterOk;
    });
  }

  // --------------------------------------------------------
  // RENDER CARDS
  // --------------------------------------------------------
  function renderCards() {
    const container = document.getElementById('stakeholders-content');
    const filtered = getFiltered();

    if (filtered.length === 0) {
      container.innerHTML = `<div class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3>Geen stakeholders gevonden</h3>
        <p>Pas de filters aan om resultaten te zien.</p>
      </div>`;
      return;
    }

    // Group by category, maintaining order
    const categoriesToShow = activeCategory === 'alle'
      ? CATEGORY_ORDER
      : [activeCategory];

    container.innerHTML = categoriesToShow.map(cat => {
      const items = filtered.filter(s => s.categorie === cat);
      if (items.length === 0) return '';

      const icon = CATEGORY_ICONS[cat] || 'circle';

      return `<div class="category-section">
        <div class="category-header">
          <i data-lucide="${icon}"></i>
          <h2>${CATEGORY_PLURAL[cat] || cat}</h2>
          <span class="category-count">${items.length}</span>
        </div>
        <div class="cards-grid">
          ${items.map(s => cardHTML(s)).join('')}
        </div>
      </div>`;
    }).join('');

    // Attach click handlers
    container.querySelectorAll('.stakeholder-card').forEach(card => {
      card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
    });

    onRefreshIcons();
  }

  function cardHTML(s) {
    const icon = CATEGORY_ICONS[s.categorie] || 'circle';
    const interviewedBadge = s.interviewed
      ? `<div class="card-badge-interviewed">
           <i data-lucide="check-circle"></i> Geïnterviewd
         </div>`
      : '';
    return `<div class="stakeholder-card ${s.interviewed ? 'interviewed' : 'card-not-interviewed'}"
                 data-id="${s.id}" role="button" tabindex="0"
                 aria-label="${s.naam} openen">
      ${interviewedBadge}
      <div class="card-category-icon"><i data-lucide="${icon}"></i></div>
      <h3>${s.naam}</h3>
      <div class="card-category-tag">${s.categorie}</div>
    </div>`;
  }

  // --------------------------------------------------------
  // MODAL
  // --------------------------------------------------------
  function openModal(id) {
    const s = STAKEHOLDERS.find(x => x.id === id);
    if (!s) return;

    const modal = document.getElementById('stakeholder-modal');
    const inner = document.getElementById('stakeholder-modal-inner');
    const icon = CATEGORY_ICONS[s.categorie] || 'circle';

    // Build notulen refs section
    let notulenSection = '';
    if (s.interviewed && s.notulenRefs && s.notulenRefs.length > 0) {
      const refs = s.notulenRefs.map(qIdx => {
        const q = NOTULEN_QUESTIONS[qIdx];
        if (!q) return '';
        const short = q.vraag.length > 55 ? q.vraag.slice(0, 55) + '…' : q.vraag;
        return `<span class="notulen-ref-tag" data-qidx="${qIdx}">
                  <i data-lucide="file-text"></i> ${short}
                </span>`;
      }).join('');
      notulenSection = `
        <div class="modal-section">
          <div class="modal-section-title">
            <i data-lucide="file-text"></i> Genoemd in interviewvragen
          </div>
          <div class="notulen-refs">${refs}</div>
        </div>`;
    }

    // Build citaten section
    let citatSection = '';
    if (s.interviewed && s.citaten) {
      const blokken = s.citaten.map(c =>
        `<div class="citaat-block">${c}</div>`
      ).join('');
      citatSection = `
        <div class="modal-section">
          <div class="modal-section-title">
            <i data-lucide="message-square"></i> Citaten uit interview
          </div>
          ${blokken}
        </div>`;
    }

    // Not-interviewed notice
    let noticeSection = '';
    if (!s.interviewed) {
      noticeSection = `
        <div class="modal-section">
          <div class="niet-geinterviewd-notice">
            <i data-lucide="info"></i>
            Niet geïnterviewd voor dit onderzoek. Standpunt gebaseerd op publiek beschikbare informatie.
          </div>
        </div>`;
    }

    inner.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon"><i data-lucide="${icon}"></i></div>
        <div class="modal-header-info">
          <h2>${s.naam}</h2>
          <div class="modal-meta">
            <span class="modal-tag">${s.categorie}</span>
            ${s.interviewed
              ? '<span class="modal-tag interviewed-tag">Geïnterviewd</span>'
              : '<span class="modal-tag">Niet geïnterviewd</span>'}
          </div>
        </div>
        <button class="modal-close" id="modal-close-btn" aria-label="Sluiten">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-section">
          <div class="modal-section-title"><i data-lucide="info"></i> Over deze organisatie</div>
          <p>${s.beschrijving}</p>
        </div>
        <div class="modal-section">
          <div class="modal-section-title"><i data-lucide="message-circle"></i> Standpunt circulaire/biobased bouw</div>
          <p>${s.standpunt}</p>
        </div>
        ${noticeSection}
        ${citatSection}
        ${notulenSection}
      </div>`;

    modal.classList.add('open');
    onRefreshIcons();

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);

    // Navigate to notulen tab on ref click
    inner.querySelectorAll('[data-qidx]').forEach(el => {
      el.addEventListener('click', () => {
        closeModal();
        document.querySelector('[data-tab="notulen"]').click();
        setTimeout(() => NotulenTab.selectQuestion(parseInt(el.dataset.qidx)), 100);
      });
    });
  }

  function closeModal() {
    document.getElementById('stakeholder-modal').classList.remove('open');
  }

  // Close on overlay click
  document.getElementById('stakeholder-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // --------------------------------------------------------
  // RENDER ALL
  // --------------------------------------------------------
  function renderAll() {
    renderFilterBar();
    renderCards();
  }

  // --------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------
  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;
    renderAll();
  }

  return { init };
})();
