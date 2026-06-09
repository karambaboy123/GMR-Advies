// ============================================================
// GAME.JS — Tab 4: Beleidsscenario Simulator
// Systeemdinamisca-simulatie met verborgen variabelen
// Stappen: 0=intro 1=rol 2=R1 3=trans1 4=R2 5=trans2
//           6=R3 7=trans3 8=R4 9=resultaat
// ============================================================

const GameTab = (() => {

  // ----------------------------------------------------------
  // STATE (minimaal — effecten worden ALTIJD herberekend)
  // ----------------------------------------------------------
  let step = 0;
  let selectedRole       = null;
  let selectedChoices    = {};      // { 1: optId, … 4: optId }
  let sessionRandomEvent = null;    // één event gekozen bij rol-selectie
  let onRefreshIcons;

  // stap → ronde-nr voor keuzeschermen
  const ROUND_STEPS      = { 2: 1, 4: 2, 6: 3, 8: 4 };
  // stap → welke ronde is net voltooid voor transitieschermen
  const TRANSITION_STEPS = { 3: 1, 5: 2, 7: 3 };

  function isRoundStep(s)      { return s in ROUND_STEPS; }
  function isTransitionStep(s) { return s in TRANSITION_STEPS; }

  // ----------------------------------------------------------
  // META-DEFINITIE SYSTEEMVARIABELEN
  // ----------------------------------------------------------
  const VAR_META = {
    politiek:     { label: 'Politiek draagvlak', icon: 'shield',      desc: 'Steun in bestuur, coalitie en Rijk',        bg: '#0E4447' },
    markt:        { label: 'Marktgroei',          icon: 'trending-up', desc: 'Adoptie door aannemers en ontwikkelaars',   bg: '#176064' },
    budget:       { label: 'Budgetruimte',        icon: 'euro',        desc: 'Financiële slagkracht voor investeringen',  bg: '#2A9298' },
    samenwerking: { label: 'Samenwerking',         icon: 'users',       desc: 'Kwaliteit van coalitie en netwerken',       bg: '#44b3ba' },
  };

  // ----------------------------------------------------------
  // HELPERS
  // ----------------------------------------------------------
  function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

  function barColor(v) {
    if (v >= 70) return '#2A9298';
    if (v >= 45) return '#176064';
    return '#c07030';
  }

  function getEnrichedOpt(optId) {
    if (!optId || !selectedRole) return null;
    for (const round of (GAME_ROUNDS_DATA[selectedRole] || [])) {
      const base = round.opties.find(o => o.id === optId);
      if (base) return { ...base, ...((GAME_ROUND_ENRICHMENTS || {})[optId] || {}) };
    }
    return null;
  }

  function getRound(roundNum) {
    return (GAME_ROUNDS_DATA[selectedRole] || [])[roundNum - 1] || null;
  }

  function initState(roleId) {
    selectedChoices = {};
    const pool = GAME_RANDOM_EVENTS || [];
    sessionRandomEvent = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  }

  // ----------------------------------------------------------
  // HERBEREKENING — puur vanuit selectedChoices (geen cumulatieve state)
  // ----------------------------------------------------------
  function calcFinalVars() {
    const init = (GAME_ROLE_INIT || {})[selectedRole] || { politiek: 40, markt: 40, budget: 40, samenwerking: 40 };
    const vars = { ...init };
    const triggeredEvents = [];

    for (let rn = 1; rn <= 4; rn++) {
      const optId = selectedChoices[rn];
      if (!optId) continue;
      const opt = getEnrichedOpt(optId);
      if (!opt) continue;

      // Keuze-effecten
      const e = opt.effecten || {};
      vars.politiek     = clamp(vars.politiek     + (e.politiek     || 0));
      vars.markt        = clamp(vars.markt        + (e.markt        || 0));
      vars.budget       = clamp(vars.budget       + (e.budget       || 0));
      vars.samenwerking = clamp(vars.samenwerking + (e.samenwerking || 0));

      // Scripted event (éénmalig per id)
      if (opt.triggerEvent) {
        const ev = (GAME_SCRIPTED_EVENTS || {})[opt.triggerEvent];
        if (ev && !triggeredEvents.find(x => x.id === ev.id)) {
          const ee = ev.effecten || {};
          vars.politiek     = clamp(vars.politiek     + (ee.politiek     || 0));
          vars.markt        = clamp(vars.markt        + (ee.markt        || 0));
          vars.budget       = clamp(vars.budget       + (ee.budget       || 0));
          vars.samenwerking = clamp(vars.samenwerking + (ee.samenwerking || 0));
          triggeredEvents.push({ ...ev, roundTriggered: rn });
        }
      }
    }

    // Random event (altijd toegepast, onafhankelijk van keuzes)
    if (sessionRandomEvent) {
      const ee = sessionRandomEvent.effecten || {};
      vars.politiek     = clamp(vars.politiek     + (ee.politiek     || 0));
      vars.markt        = clamp(vars.markt        + (ee.markt        || 0));
      vars.budget       = clamp(vars.budget       + (ee.budget       || 0));
      vars.samenwerking = clamp(vars.samenwerking + (ee.samenwerking || 0));
    }

    return { vars, triggeredEvents };
  }

  function calcOutcomes(vars) {
    const { politiek, markt, budget, samenwerking } = vars;
    const woningen       = Math.max(0, Math.round(50 + (markt - 30) * 2.2 + (samenwerking - 30) * 1.6));
    const co2_ton        = Math.round(woningen * 8);
    const marktgroei     = Math.max(0, Math.round((markt - 40) * 0.55));
    const investering    = Math.max(0, Math.round(budget * 0.14));
    const politiekeSteun = Math.min(5, Math.round(politiek / 20));
    return { woningen, co2_ton, marktgroei, investering, politiekeSteun };
  }

  function formatEffecten(eff) {
    if (!eff) return '';
    return Object.entries(eff).map(([k, v]) => {
      const meta = VAR_META[k];
      if (!meta) return '';
      const cls = v > 0 ? 'pos' : v < 0 ? 'neg' : 'neu';
      return `<span class="eff-badge ${cls}">
        <i data-lucide="${meta.icon}" style="width:10px;height:10px"></i>
        ${meta.label} ${v > 0 ? '+' : ''}${v}
      </span>`;
    }).join('');
  }

  // ----------------------------------------------------------
  // RENDER MAIN
  // ----------------------------------------------------------
  function render() {
    const container = document.getElementById('game-content');
    let html = '';
    if (step === 0)                  html = introHTML();
    else if (step === 1)             html = roleHTML();
    else if (isRoundStep(step))      html = roundHTML(ROUND_STEPS[step]);
    else if (isTransitionStep(step)) html = transitionHTML(TRANSITION_STEPS[step]);
    else if (step === 9)             html = resultsHTML();

    container.innerHTML = `<div class="game-container">
      ${step > 0 ? progressHTML() : ''}
      ${html}
    </div>`;
    attachEvents();
    onRefreshIcons(container);
  }

  // ----------------------------------------------------------
  // PROGRESS BAR
  // ----------------------------------------------------------
  function progressHTML() {
    const phases = [
      { label: 'Rol',    min: 1, max: 1  },
      { label: 'R 1',   min: 2, max: 3  },
      { label: 'R 2',   min: 4, max: 5  },
      { label: 'R 3',   min: 6, max: 7  },
      { label: 'R 4',   min: 8, max: 8  },
      { label: 'Uitslag', min: 9, max: 9 },
    ];
    return `<div class="game-progress">
      ${phases.map((p, i) => {
        const done   = step > p.max;
        const active = step >= p.min && step <= p.max;
        return `
          ${i > 0 ? `<div class="gp-line ${done ? 'done' : active ? 'active' : ''}"></div>` : ''}
          <div class="gp-item ${done ? 'done' : active ? 'active' : ''}">
            <div class="gp-dot">${done ? '✓' : p.label === 'Uitslag' ? '★' : i}</div>
            <span class="gp-label">${p.label}</span>
          </div>`;
      }).join('')}
    </div>`;
  }

  // ----------------------------------------------------------
  // STAP 0: INTRO
  // ----------------------------------------------------------
  function introHTML() {
    return `
      <div class="game-intro">
        <div class="game-intro-badge">
          <i data-lucide="map"></i> Beleidsscenario Simulator
        </div>
        <h2 class="game-intro-title">Navigeer de biobased bouwtransitie</h2>
        <p class="game-intro-desc">
          Je staat voor <strong>4 cruciale beslismomenten</strong>. Elke keuze beïnvloedt verborgen
          systeemvariabelen: politiek draagvlak, marktgroei, budget en samenwerking.
          Pas aan het einde zie je wat jouw beleidspad heeft opgeleverd. Er is geen enkel goed antwoord.
        </p>
        <div class="game-intro-features">
          <div class="gif-item">
            <div class="gif-icon"><i data-lucide="users"></i></div>
            <span>Kies uw rol: gemeente, provincie, aannemer of corporatie</span>
          </div>
          <div class="gif-item">
            <div class="gif-icon"><i data-lucide="git-branch"></i></div>
            <span>4 rondes met meerdere keuzes per ronde, geen dominant pad</span>
          </div>
          <div class="gif-item">
            <div class="gif-icon"><i data-lucide="zap"></i></div>
            <span>Onverwachte gebeurtenissen verstoren (of versterken) uw koers</span>
          </div>
          <div class="gif-item">
            <div class="gif-icon"><i data-lucide="network"></i></div>
            <span>Netwerk-visualisatie toont hoe uw coalitie is geëvolueerd</span>
          </div>
        </div>
        <div class="game-intro-context">
          <i data-lucide="info" style="width:14px;height:14px;flex-shrink:0;margin-top:1px"></i>
          <span>Gebaseerd op <strong>6 diepte-interviews</strong> (april 2026), het HNN-raamwerk van
          Provincie Gelderland en de NABB (2023).</span>
        </div>
        <button class="btn btn-primary game-intro-btn" id="intro-start">
          Begin de simulatie <i data-lucide="arrow-right"></i>
        </button>
      </div>`;
  }

  // ----------------------------------------------------------
  // STAP 1: ROL KIEZEN
  // ----------------------------------------------------------
  function roleHTML() {
    return `
      <div class="game-panel">
        <div class="game-panel-title"><i data-lucide="user"></i> Stap 1: Kies uw rol</div>
        <div class="game-panel-sub">
          Elke rol start met andere startwaarden voor de systeemvariabelen en beschikt over eigen beleidsruimte.
        </div>
        <div class="roles-grid">
          ${GAME_ROLES.map(r => {
            const init = (GAME_ROLE_INIT || {})[r.id] || {};
            return `
            <div class="role-card ${selectedRole === r.id ? 'selected' : ''}" data-role="${r.id}">
              <div class="role-icon"><i data-lucide="${r.icon}"></i></div>
              <div class="role-info">
                <h3>${r.naam}</h3>
                <p>${r.beschrijving}</p>
                ${Object.keys(init).length ? `
                <div class="role-init-vars">
                  ${Object.entries(init).map(([k, v]) => `
                    <div class="riv-item">
                      <span class="riv-label">${(VAR_META[k] || {}).label || k}</span>
                      <div class="riv-bar-track">
                        <div class="riv-bar-fill" style="width:${v}%;background:${barColor(v)}"></div>
                      </div>
                    </div>`).join('')}
                </div>` : ''}
              </div>
              ${selectedRole === r.id ? `<div class="role-selected-mark"><i data-lucide="check-circle"></i></div>` : ''}
            </div>`;
          }).join('')}
        </div>
        <div class="btn-row">
          <button class="btn btn-secondary" id="step1-back">
            <i data-lucide="arrow-left"></i> Terug
          </button>
          <button class="btn btn-primary" id="step1-next" ${!selectedRole ? 'disabled' : ''}>
            Start rondes <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>`;
  }

  // ----------------------------------------------------------
  // STAPPEN 2, 4, 6, 8: RONDE-KEUZES
  // ----------------------------------------------------------
  function roundHTML(roundNum) {
    const round = getRound(roundNum);
    if (!round) return '<div class="game-panel"><p>Ronde niet gevonden.</p></div>';
    const role          = GAME_ROLES.find(r => r.id === selectedRole);
    const selectedOptId = selectedChoices[roundNum];
    const selectedOpt   = selectedOptId ? getEnrichedOpt(selectedOptId) : null;

    const optionsHTML = round.opties.map(opt => {
      const isSel    = selectedOptId === opt.id;
      const isDimmed = selectedOptId && !isSel;
      return `
        <div class="game-option ${isSel ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''}"
             data-opt="${opt.id}" data-round="${roundNum}">
          <div class="game-option-icon"><i data-lucide="${opt.icon}"></i></div>
          <div class="game-option-body">
            <div class="game-option-label">${opt.label}</div>
            <div class="game-option-desc">${opt.beschrijving}</div>
          </div>
          ${isSel ? `<div class="game-option-check"><i data-lucide="check-circle"></i></div>` : ''}
        </div>`;
    }).join('');

    const gevolgHTML = selectedOpt ? `
      <div class="game-gevolg">
        <div class="game-gevolg-icon"><i data-lucide="corner-down-right"></i></div>
        <div class="game-gevolg-body">
          <div class="game-gevolg-label">Directe gevolg</div>
          <div class="game-gevolg-text">${selectedOpt.gevolg}</div>
        </div>
      </div>` : '';

    return `
      <div class="game-panel">
        <div class="game-round-meta">
          <span class="game-round-badge">${round.fase}</span>
          <span class="game-round-role-badge">
            <i data-lucide="${role.icon}" style="width:12px;height:12px"></i> ${role.naam}
          </span>
        </div>
        <div class="game-round-context">${round.context}</div>
        <div class="game-round-vraag">${round.vraag}</div>
        <div class="game-options-grid">${optionsHTML}</div>
        ${gevolgHTML}
        <div class="btn-row">
          <button class="btn btn-secondary" id="round-back">
            <i data-lucide="arrow-left"></i> Terug
          </button>
          <button class="btn btn-primary" id="round-next" ${!selectedOptId ? 'disabled' : ''}>
            ${roundNum === 4
              ? `Bekijk uitslag <i data-lucide="bar-chart-2"></i>`
              : `Volgende <i data-lucide="arrow-right"></i>`}
          </button>
        </div>
      </div>`;
  }

  // ----------------------------------------------------------
  // STAPPEN 3, 5, 7: TRANSITIESCHERMEN
  // ----------------------------------------------------------
  function transitionHTML(completedRound) {
    const optId = selectedChoices[completedRound];
    const opt   = getEnrichedOpt(optId);

    // Stakeholder reactie uit enrichment
    const reactie = opt && opt.reactie ? opt.reactie : null;

    // Scripted event getriggerd door deze keuze
    const scriptedEv = (opt && opt.triggerEvent)
      ? (GAME_SCRIPTED_EVENTS || {})[opt.triggerEvent] || null
      : null;

    // Random event: tonen na ronde 2 (stap 5)
    const showRandom = completedRound === 2 && sessionRandomEvent;

    const reactieHTML = reactie ? `
      <div class="trans-reaction-card ${reactie.sentiment}">
        <div class="trans-reaction-header">
          <div class="trans-reaction-avatar ${reactie.sentiment}">
            <i data-lucide="${reactie.icon}"></i>
          </div>
          <div style="flex:1">
            <div class="trans-reaction-naam">${reactie.naam}</div>
            <div class="trans-reaction-org">${reactie.org}</div>
          </div>
          <div class="trans-sentiment-badge ${reactie.sentiment}">
            <i data-lucide="${reactie.sentiment === 'positief' ? 'thumbs-up' : reactie.sentiment === 'kritisch' ? 'alert-triangle' : 'minus-circle'}"
               style="width:10px;height:10px"></i>
            ${reactie.sentiment}
          </div>
        </div>
        <div class="trans-reaction-text">"${reactie.tekst}"</div>
      </div>` : '';

    const scriptedHTML = scriptedEv ? `
      <div class="trans-section-label">
        <i data-lucide="zap" style="width:13px;height:13px"></i> Gevolg van uw keuze
      </div>
      <div class="trans-event ${scriptedEv.type}">
        <div class="trans-event-header">
          <i data-lucide="${scriptedEv.icon}" style="width:18px;height:18px;flex-shrink:0"></i>
          <div>
            <div class="trans-event-titel">${scriptedEv.titel}</div>
            <div class="trans-event-type-badge ${scriptedEv.type}">
              ${scriptedEv.type === 'positief' ? 'Positieve ontwikkeling' : scriptedEv.type === 'negatief' ? 'Tegenslag' : 'Onzekerheid'}
            </div>
          </div>
        </div>
        <div class="trans-event-scenario">${scriptedEv.scenario}</div>
        <div class="trans-event-effecten">${formatEffecten(scriptedEv.effecten)}</div>
      </div>` : '';

    const randomHTML = showRandom ? `
      <div class="trans-random-event-wrapper">
        <div class="trans-random-label">
          <i data-lucide="shuffle" style="width:13px;height:13px"></i>
          Onverwachte ontwikkeling, uniek voor deze sessie
        </div>
        <div class="trans-event ${sessionRandomEvent.type}">
          <div class="trans-event-header">
            <i data-lucide="${sessionRandomEvent.icon}" style="width:18px;height:18px;flex-shrink:0"></i>
            <div>
              <div class="trans-event-titel">${sessionRandomEvent.titel}</div>
              <div class="trans-event-type-badge ${sessionRandomEvent.type}">
                ${sessionRandomEvent.type === 'positief' ? 'Kans' : sessionRandomEvent.type === 'negatief' ? 'Tegenwind' : 'Onzekerheid'}
              </div>
            </div>
          </div>
          <div class="trans-event-scenario">${sessionRandomEvent.scenario}</div>
          <div class="trans-event-effecten">${formatEffecten(sessionRandomEvent.effecten)}</div>
        </div>
      </div>` : '';

    return `
      <div class="game-panel game-transition-panel">
        <div class="trans-header">
          <div class="trans-ronde-badge">
            <i data-lucide="check-circle" style="width:13px;height:13px"></i>
            Ronde ${completedRound} afgerond
          </div>
          <div class="trans-keuze-summary">
            <i data-lucide="${opt ? opt.icon : 'help-circle'}" style="width:14px;height:14px;flex-shrink:0"></i>
            <strong>Uw keuze:</strong>&nbsp;${opt ? opt.label : 'nog niet gekozen'}
          </div>
        </div>

        ${reactieHTML ? `
        <div class="trans-section-label">
          <i data-lucide="message-square" style="width:13px;height:13px"></i> Stakeholder reageert
        </div>
        ${reactieHTML}` : ''}

        ${scriptedHTML}
        ${randomHTML}

        <div class="btn-row" style="margin-top:24px">
          <button class="btn btn-secondary" id="trans-back">
            <i data-lucide="arrow-left"></i> Terug
          </button>
          <button class="btn btn-primary" id="trans-next">
            ${completedRound < 3 ? `Ronde ${completedRound + 1}` : `Laatste ronde`}
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>`;
  }

  // ----------------------------------------------------------
  // STAP 9: RESULTATEN
  // ----------------------------------------------------------
  function resultsHTML() {
    const role = GAME_ROLES.find(r => r.id === selectedRole);
    const { vars, triggeredEvents } = calcFinalVars();
    const outcomes  = calcOutcomes(vars);
    const scenario  = GAME_SCENARIOS.find(s => s.conditie(vars)) || GAME_SCENARIOS[GAME_SCENARIOS.length - 1];

    // Beleidspad journey
    const journeyHTML = [1, 2, 3, 4].map(rn => {
      const round = getRound(rn);
      const optId = selectedChoices[rn];
      if (!round || !optId) return '';
      const opt = getEnrichedOpt(optId);
      if (!opt) return '';
      return `
        <div class="journey-item">
          <div class="journey-num">R${rn}</div>
          <div class="journey-body">
            <div class="journey-fase">${round.fase.split(' — ')[1] || round.fase}</div>
            <div class="journey-choice">
              <i data-lucide="${opt.icon}" style="width:13px;height:13px;flex-shrink:0"></i>
              ${opt.label}
            </div>
            <div class="journey-gevolg">${opt.gevolg}</div>
          </div>
        </div>`;
    }).join('');

    // Alle events die speelden (scripted + random)
    const allEvents = [...triggeredEvents, ...(sessionRandomEvent ? [sessionRandomEvent] : [])];
    const eventsHTML = allEvents.length > 0 ? `
      <div class="res-section-title">
        <i data-lucide="zap" style="width:15px;height:15px"></i> Gebeurtenissen in uw sessie
      </div>
      <div class="results-events-summary">
        ${allEvents.map(ev => `
          <div class="res-event-item ${ev.type}">
            <i data-lucide="${ev.icon}" style="width:14px;height:14px;flex-shrink:0;margin-top:2px"></i>
            <div>
              <div class="res-event-titel">${ev.titel}</div>
              <div class="res-event-type">${ev.type === 'positief' ? 'Positief' : ev.type === 'negatief' ? 'Tegenslag' : 'Onzeker'}${ev.roundTriggered ? ` · ronde ${ev.roundTriggered}` : ' · random'}</div>
            </div>
          </div>`).join('')}
      </div>` : '';

    return `
      <div class="game-panel game-results-panel">
        <div class="game-panel-title">
          <i data-lucide="${scenario.icoon || 'bar-chart-2'}"></i>
          Uw beleidsresultaat als ${role.naam}
        </div>

        <!-- Scenario conclusie -->
        <div class="result-scenario-block ${scenario.klasse}">
          <div class="result-scenario-naam">
            <i data-lucide="${scenario.icoon || 'flag'}" style="width:16px;height:16px"></i>
            ${scenario.naam}
          </div>
          <div class="result-scenario-conclusie">${scenario.conclusie}</div>
        </div>

        <!-- Radar chart + systeemvariabelen -->
        <div class="res-section-title">
          <i data-lucide="sliders" style="width:15px;height:15px"></i> Eindstand systeemvariabelen
        </div>
        <div class="results-radar-wrapper">
          <div class="results-radar-svg">
            ${(window.GMRPrint ? GMRPrint.radarChartSVG(vars, 230) : '')}
          </div>
          <div class="results-radar-legend">
            ${Object.entries(vars).map(([k, v]) => {
              const meta = VAR_META[k] || { label: k, icon: 'circle', bg: '#176064' };
              return `<div class="radar-legend-item">
                <div class="radar-legend-dot" style="background:${barColor(v)}"></div>
                <span>${meta.label}</span>
                <span class="radar-legend-score" style="color:${barColor(v)}">${v}</span>
              </div>`;
            }).join('')}
          </div>
        </div>
        <div class="results-vars-grid">
          ${Object.entries(vars).map(([k, v]) => {
            const meta = VAR_META[k] || { label: k, icon: 'circle', desc: '', bg: '#176064' };
            return `
              <div class="resvar-item">
                <div class="resvar-header">
                  <div class="resvar-icon" style="background:${meta.bg}">
                    <i data-lucide="${meta.icon}"></i>
                  </div>
                  <div style="flex:1">
                    <div class="resvar-label">${meta.label}</div>
                    <div class="resvar-desc">${meta.desc}</div>
                  </div>
                  <div class="resvar-value" style="color:${barColor(v)}">${v}</div>
                </div>
                <div class="resvar-bar-track">
                  <div class="resvar-bar-fill" style="width:${v}%;background:${barColor(v)}"></div>
                </div>
              </div>`;
          }).join('')}
        </div>

        <!-- Concrete uitkomsten -->
        <div class="res-section-title" style="margin-top:24px">
          <i data-lucide="package" style="width:15px;height:15px"></i> Concrete uitkomsten (prognose 2030)
        </div>
        <div class="results-outcomes-grid">
          <div class="outcome-card">
            <div class="outcome-icon"><i data-lucide="home"></i></div>
            <div class="outcome-value">${outcomes.woningen}</div>
            <div class="outcome-label">biobased woningen / jaar</div>
          </div>
          <div class="outcome-card">
            <div class="outcome-icon"><i data-lucide="leaf"></i></div>
            <div class="outcome-value">${outcomes.co2_ton.toLocaleString('nl-NL')}</div>
            <div class="outcome-label">ton CO₂-opslag / jaar</div>
          </div>
          <div class="outcome-card">
            <div class="outcome-icon"><i data-lucide="trending-up"></i></div>
            <div class="outcome-value">${outcomes.marktgroei}%</div>
            <div class="outcome-label">marktaandeel biobased</div>
          </div>
          <div class="outcome-card">
            <div class="outcome-icon"><i data-lucide="euro"></i></div>
            <div class="outcome-value">€${outcomes.investering} mln</div>
            <div class="outcome-label">private investering</div>
          </div>
          <div class="outcome-card">
            <div class="outcome-icon"><i data-lucide="star"></i></div>
            <div class="outcome-value">${'★'.repeat(outcomes.politiekeSteun)}${'☆'.repeat(5 - outcomes.politiekeSteun)}</div>
            <div class="outcome-label">politieke steun (5 sterren)</div>
          </div>
        </div>

        <!-- Netwerk visualisatie -->
        <div class="res-section-title" style="margin-top:24px">
          <i data-lucide="network" style="width:15px;height:15px"></i> Samenwerkingsnetwerk GMR
        </div>
        <div class="results-network-wrapper">
          ${networkSVG(vars.samenwerking, vars.politiek, vars.markt)}
          <div class="network-legend">
            <span class="nl-item strong">Sterke verbinding (≥ 70)</span>
            <span class="nl-item medium">Matige verbinding (40–69)</span>
            <span class="nl-item weak">Zwakke verbinding (&lt; 40)</span>
          </div>
        </div>

        <!-- Beleidspad -->
        <div class="res-section-title" style="margin-top:24px">
          <i data-lucide="map" style="width:15px;height:15px"></i> Uw beleidspad
        </div>
        <div class="journey-section">${journeyHTML}</div>

        ${eventsHTML}

        <!-- Research insight -->
        <div class="research-insight">
          <i data-lucide="lightbulb"></i>
          <span>Uit onze interviews (BAM, Klokgroep, Van Wijnen, Nijmegen, Provincie, Talis) blijkt:
          <strong>regelgeving is de grootste bottleneck, niet beschikbaarheid of kosten</strong>.
          Tenders schrijven houtbouw voor maar kiezen beton op prijs. HNN van Provincie Gelderland
          is het meest effectieve instrument, mits verplicht gesteld.</span>
        </div>

        <div class="btn-row">
          <button class="btn btn-secondary" id="step9-restart">
            <i data-lucide="refresh-cw"></i> Opnieuw spelen
          </button>
          <button class="download-btn" id="step9-download">
            <i data-lucide="download"></i> Download PDF
          </button>
        </div>
      </div>`;
  }

  // ----------------------------------------------------------
  // NETWERK SVG
  // ----------------------------------------------------------
  function networkSVG(samenwerking, politiek, markt) {
    const W = 420, H = 270, cx = W / 2, cy = H / 2 + 10, R = 95;

    const roleIndex = { gemeente: 0, provincie: 1, aannemer: 2, corporatie: 3 };
    const myIdx = roleIndex[selectedRole] ?? -1;

    const nodes = [
      { label: 'Gemeente',   angle: -90 },
      { label: 'Provincie',  angle: -18 },
      { label: 'Aannemer',   angle:  54 },
      { label: 'Corporatie', angle: 126 },
      { label: 'Boer/Keten', angle: 198 },
    ].map((n, i) => ({
      ...n, i,
      x: cx + R * Math.cos(n.angle * Math.PI / 180),
      y: cy + R * Math.sin(n.angle * Math.PI / 180),
    }));

    function edgeStroke(v) {
      if (v >= 70) return { color: '#2A9298', width: (v / 25).toFixed(1), opacity: '0.85' };
      if (v >= 40) return { color: '#176064', width: (v / 30).toFixed(1), opacity: '0.60' };
      return { color: '#a0b8ba', width: '1.0', opacity: '0.35' };
    }

    const edges = [
      [0, 1, politiek],
      [0, 2, markt],
      [0, 3, samenwerking],
      [1, 2, markt],
      [1, 4, samenwerking],
      [2, 3, samenwerking],
      [2, 4, Math.round((markt + samenwerking) / 2)],
      [3, 4, Math.round((samenwerking + markt) / 2)],
    ];

    const edgesHTML = edges.map(([ai, bi, v]) => {
      const a = nodes[ai], b = nodes[bi];
      const s = edgeStroke(v);
      return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}"
                    x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"
                    stroke="${s.color}" stroke-width="${s.width}" stroke-opacity="${s.opacity}"/>`;
    }).join('');

    const nodesHTML = nodes.map(n => {
      const isMe = n.i === myIdx;
      const nr = 22;
      return `
        <circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${nr}"
                fill="${isMe ? '#0E4447' : '#f5f7f5'}"
                stroke="${isMe ? '#2A9298' : '#c0d4d6'}"
                stroke-width="${isMe ? 2.5 : 1.5}"/>
        <text x="${n.x.toFixed(1)}" y="${(n.y + nr + 14).toFixed(1)}"
              text-anchor="middle" font-size="10" fill="#2d5558"
              font-family="'Segoe UI',sans-serif" font-weight="${isMe ? 700 : 400}">${n.label}</text>`;
    }).join('');

    return `<svg viewBox="0 0 ${W} ${H}" width="100%" class="network-svg"
                 xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#f8faf8"/>
      ${edgesHTML}
      ${nodesHTML}
      <text x="12" y="20" font-size="10" fill="#888" font-family="'Segoe UI',sans-serif">
        Samenwerking ${samenwerking} · Markt ${markt} · Politiek ${politiek}
      </text>
    </svg>`;
  }

  // ----------------------------------------------------------
  // EVENT HANDLERS
  // ----------------------------------------------------------
  function attachEvents() {
    const $  = id => document.getElementById(id);

    // Intro → rol
    const introBtn = $('intro-start');
    if (introBtn) introBtn.addEventListener('click', () => { step = 1; render(); });

    // Rol-kaarten
    document.querySelectorAll('.role-card').forEach(card => {
      card.addEventListener('click', () => { selectedRole = card.dataset.role; render(); });
    });
    const s1back = $('step1-back');
    if (s1back) s1back.addEventListener('click', () => { step = 0; selectedRole = null; render(); });

    const s1next = $('step1-next');
    if (s1next) s1next.addEventListener('click', () => {
      if (!selectedRole) return;
      initState(selectedRole);
      step = 2;
      render();
    });

    // Optie-keuze (ronde-schermen)
    document.querySelectorAll('.game-option').forEach(card => {
      card.addEventListener('click', () => {
        selectedChoices[parseInt(card.dataset.round)] = card.dataset.opt;
        render();
      });
    });

    const roundBack = $('round-back');
    if (roundBack) roundBack.addEventListener('click', () => { step--; render(); });

    const roundNext = $('round-next');
    if (roundNext) roundNext.addEventListener('click', () => {
      const roundNum = ROUND_STEPS[step];
      if (!selectedChoices[roundNum]) return;
      step++;   // ronde → transitie (of 8 → 9 voor ronde 4)
      render();
    });

    // Transitie-schermen
    const transBack = $('trans-back');
    if (transBack) transBack.addEventListener('click', () => { step--; render(); });

    const transNext = $('trans-next');
    if (transNext) transNext.addEventListener('click', () => { step++; render(); });

    // Resultaten → opnieuw
    const restart = $('step9-restart');
    if (restart) restart.addEventListener('click', () => {
      step = 0;
      selectedRole = null;
      selectedChoices = {};
      sessionRandomEvent = null;
      render();
    });

    // Resultaten → download PDF
    const dlBtn = $('step9-download');
    if (dlBtn && window.GMRPrint) dlBtn.addEventListener('click', () => {
      const { vars } = calcFinalVars();
      const outcomes  = calcOutcomes(vars);
      const scenario  = GAME_SCENARIOS.find(s => s.conditie(vars)) || GAME_SCENARIOS[GAME_SCENARIOS.length - 1];
      GMRPrint.printGameResult(vars, selectedChoices, selectedRole, scenario, outcomes);
    });
  }

  // ----------------------------------------------------------
  // PUBLIC
  // ----------------------------------------------------------
  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;
    render();
  }

  return { init };
})();
