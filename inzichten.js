// ============================================================
// INZICHTEN.JS — Tab 7: Top 10 Inzichten
// De tien kernlessen uit het GMR-onderzoek
// ============================================================

const InzichtenTab = (() => {

  let onRefreshIcons;
  let activeCategory = null;  // null = alle categorieën tonen

  // ----------------------------------------------------------
  // DATA
  // ----------------------------------------------------------
  const INZICHTEN = [
    {
      num: 1,
      icon: 'check-circle-2',
      kleur: '#2A9298',
      titel: 'De kennisfase is voorbij',
      beschrijving: 'Biobased en circulaire bouw zijn technisch bewezen. Materialen, woningconcepten en tools zijn beschikbaar. De discussie gaat niet meer over haalbaarheid.',
      gmr_actie: 'Richt beleid op implementatie, niet op verdere kennisontwikkeling.',
      categorie: 'Implementatie'
    },
    {
      num: 2,
      icon: 'alert-triangle',
      kleur: '#C0392B',
      titel: 'Implementatie is het grootste probleem',
      beschrijving: 'Er is een structurele kloof tussen beleidsambitie en feitelijke uitvoering. Goede instrumenten — HNN, NABB, materialenpaspoorten — worden onvoldoende consequent toegepast in projecten.',
      gmr_actie: 'Verander de vraag van "willen we dit?" naar "waarom doen we het nog niet?"',
      categorie: 'Implementatie'
    },
    {
      num: 3,
      icon: 'landmark',
      kleur: '#0E4447',
      titel: 'HNN wordt onvoldoende benut',
      beschrijving: 'Het Nieuwe Normaal is een breed gedragen kader voor circulaire nieuwbouw met 12 maatregelcategorieën. Toch wordt het zelden structureel opgenomen in aanbestedingen of gebiedsontwikkelingen.',
      gmr_actie: 'Neem HNN-indicatoren op als randvoorwaarde in alle regionale uitvragen.',
      categorie: 'Beleid'
    },
    {
      num: 4,
      icon: 'eye-off',
      kleur: '#E07B00',
      titel: 'Kosten zijn zichtbaar, waarde is onzichtbaar',
      beschrijving: 'Meerkosten van biobased materialen zijn direct zichtbaar. Maar levensduurwaarde, CO₂-opslag, demontabiliteit en restwaarde worden systematisch buiten beschouwing gelaten in bouwbeslissingen.',
      gmr_actie: 'Ontwikkel een businesscase-model dat langetermijnwaarde meetbaar maakt.',
      categorie: 'Financiën'
    },
    {
      num: 5,
      icon: 'scale',
      kleur: '#8E44AD',
      titel: 'Regelgeving remt opschaling',
      beschrijving: 'Brandveiligheidsinterpretaties, MPG-berekeningsregels en wisselende gemeentelijke interpretaties zorgen voor vertraging en onzekerheid bij marktpartijen. Toepassen is technisch mogelijk, maar toelaten duurt te lang.',
      gmr_actie: 'Ontwikkel regionale modelbestekken en gedeelde toetsingskaders.',
      categorie: 'Regelgeving'
    },
    {
      num: 6,
      icon: 'building-2',
      kleur: '#176064',
      titel: 'Corporaties zijn de sleutel tot schaal',
      beschrijving: 'Woningcorporaties sturen op levensduur, maatschappelijke waarde en portfolio. Ze kunnen via collectieve inkoopkracht de vraag naar biobased materialen structureel opschalen en prijzen verlagen.',
      gmr_actie: 'Start een GMR-corporatiecoalitie voor gezamenlijke biobased inkoopafspraken.',
      categorie: 'Samenwerking'
    },
    {
      num: 7,
      icon: 'layers',
      kleur: '#2A9298',
      titel: 'Prefab en biobased versterken elkaar',
      beschrijving: 'Industrialisatie van de bouw via prefab-concepten en houtbouw (CLT, HSB) maakt biobased standaardisering mogelijk. Schaal, kwaliteit, snelheid en biobased materiaalgebruik zijn gecombineerd haalbaar.',
      gmr_actie: 'Koppel biobased ambities aan lopende woningconcepttrajecten in de regio.',
      categorie: 'Innovatie'
    },
    {
      num: 8,
      icon: 'git-branch',
      kleur: '#C0392B',
      titel: 'Regionale ketens zijn onvoldoende verbonden',
      beschrijving: 'Agrariërs, vezelverwerkers, producenten en bouwbedrijven werken langs elkaar heen. Er zijn geen duurzame afspraken over volumes, specificaties of leveringszekerheid. De keten bestaat, maar functioneert nog niet.',
      gmr_actie: 'Organiseer een regionaal ketenevent met agrariërs, verwerkers en bouwers.',
      categorie: 'Samenwerking'
    },
    {
      num: 9,
      icon: 'leaf',
      kleur: '#E07B00',
      titel: 'CO₂-opslag kan economische waarde worden',
      beschrijving: 'Een biobased woning slaat gemiddeld 8 ton CO₂ op — potentieel €3.500–€6.000 aan carbon credits. Pilotmethodieken bestaan. De markt is nog onvolwassen, maar 2026 is het moment om positie te kiezen.',
      gmr_actie: 'Start een CO₂-label/carbon-creditpilot met GMR-corporaties en Rijksoverheid.',
      categorie: 'Financiën'
    },
    {
      num: 10,
      icon: 'star',
      kleur: '#176064',
      titel: 'GMR kan voorbeeldregio worden',
      beschrijving: 'De combinatie van regionale schaalbaarheid, bestuurlijk draagvlak, actieve woningmarkt en aanwezige kennisbasis maakt de GMR bij uitstek geschikt om landelijk te laten zien hoe biobased bouwen normalisering bereikt.',
      gmr_actie: 'Positioneer GMR expliciet als landelijke koplopregio in communicatie en beleid.',
      categorie: 'Strategie'
    },
  ];

  const CATEGORIE_KLEUR = {
    'Implementatie': '#2A9298',
    'Beleid':        '#0E4447',
    'Financiën':     '#E07B00',
    'Regelgeving':   '#8E44AD',
    'Samenwerking':  '#176064',
    'Innovatie':     '#1A7A7F',
    'Strategie':     '#C0392B',
  };

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  function render() {
    const container = document.getElementById('inzichten-content');
    container.innerHTML = buildHTML();
    onRefreshIcons(container);
  }

  // ----------------------------------------------------------
  // HTML BUILDER
  // ----------------------------------------------------------
  function buildHTML() {
    const categorieTags = [...new Set(INZICHTEN.map(i => i.categorie))];

    return `
      <!-- ── HEADER BAND ──────────────────────────────────── -->
      <div class="inz-hero">
        <div class="inz-hero-eyebrow">
          <i data-lucide="zap" style="width:13px;height:13px"></i>
          Kernlessen uit het onderzoek &nbsp;·&nbsp; Juni 2026
        </div>
        <h2 class="inz-hero-title">Top 10 Inzichten</h2>
        <p class="inz-hero-sub">De tien meest bepalende lessen voor de versnelling van biobased en circulaire bouw in de Groene Metropoolregio</p>
      </div>

      <!-- ── CENTRALE BOODSCHAP ───────────────────────────── -->
      <div class="inz-central-message">
        <div class="inz-cm-icon"><i data-lucide="target"></i></div>
        <div class="inz-cm-body">
          <div class="inz-cm-label">Rode draad</div>
          <div class="inz-cm-text">Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen.
          De grootste uitdaging zit nu in de <strong>implementatie</strong>. Verankering van bestaand beleid
          — HNN, biobased criteria — in aanbestedingen en projecten is de prioriteit.</div>
        </div>
      </div>

      <!-- ── CATEGORIE-TAGS ────────────────────────────────── -->
      <div class="inz-cats">
        <button class="inz-cat-tag inz-cat-all ${!activeCategory ? 'is-active' : ''}"
          data-cat="" style="border-color:#666;color:#444">
          Alle <span class="inz-cat-count" style="background:#555">${INZICHTEN.length}</span>
        </button>
        ${categorieTags.map(cat => {
          const kleur = CATEGORIE_KLEUR[cat] || '#2A9298';
          const count = INZICHTEN.filter(i => i.categorie === cat).length;
          const isActive = activeCategory === cat;
          return `<button class="inz-cat-tag ${isActive ? 'is-active' : ''}"
            data-cat="${cat}"
            style="border-color:${kleur};color:${kleur}${isActive ? `;background:${kleur}20` : ''}">
            ${cat} <span class="inz-cat-count" style="background:${kleur}">${count}</span>
          </button>`;
        }).join('')}
      </div>

      <!-- ── INZICHTEN KAARTEN ─────────────────────────────── -->
      <div class="inz-grid">
        ${INZICHTEN.filter(inz => !activeCategory || inz.categorie === activeCategory).map(inz => inzichtCardHTML(inz)).join('')}
      </div>

      <!-- ── SLOTBOODSCHAP ─────────────────────────────────── -->
      <div class="inz-conclusion">
        <div class="inz-conclusion-inner">
          <i data-lucide="arrow-right-circle" style="width:20px;height:20px;flex-shrink:0;color:#2A9298"></i>
          <div>
            <strong>Van inzicht naar actie</strong>
            <p>Deze tien inzichten zijn geen conclusies op papier — ze zijn aanknopingspunten voor directe actie.
            De GMR heeft de positie, het netwerk en de schaalbaarheid om van deze inzichten concrete beleidsverankering te maken.
            <br>Het advies: <strong>start in 2026 met de verankering van HNN, corporatiepilots en ketenafspraken</strong></p>
          </div>
        </div>
      </div>
    `;
  }

  function inzichtCardHTML(inz) {
    const kleur = inz.kleur;
    const catKleur = CATEGORIE_KLEUR[inz.categorie] || kleur;
    return `
      <div class="inz-card" style="--inz-accent:${kleur}">
        <div class="inz-card-top">
          <div class="inz-card-num" style="background:${kleur}18;color:${kleur}">${inz.num}</div>
          <div class="inz-card-icon" style="color:${kleur}"><i data-lucide="${inz.icon}"></i></div>
          <span class="inz-card-cat" style="background:${catKleur}18;color:${catKleur}">${inz.categorie}</span>
        </div>
        <div class="inz-card-titel">${inz.titel}</div>
        <p class="inz-card-beschrijving">${inz.beschrijving}</p>
        <div class="inz-card-actie">
          <div class="inz-card-actie-label">
            <i data-lucide="arrow-right" style="width:10px;height:10px;flex-shrink:0"></i>
            GMR-actie
          </div>
          <div class="inz-card-actie-text">${inz.gmr_actie}</div>
        </div>
      </div>`;
  }

  // ----------------------------------------------------------
  // PUBLIC API
  // ----------------------------------------------------------
  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;

    // Eenmalige delegated listener voor categorie-filter (overleeft re-renders)
    const container = document.getElementById('inzichten-content');
    container.addEventListener('click', e => {
      const tag = e.target.closest('.inz-cat-tag[data-cat]');
      if (!tag) return;
      e.preventDefault();
      const cat = tag.dataset.cat; // '' = alle categorieën
      activeCategory = (cat === '' || activeCategory === cat) ? null : cat; // toggle
      render();
    });

    render();
  }

  return { init };
})();
