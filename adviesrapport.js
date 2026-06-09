// ============================================================
// ADVIESRAPPORT.JS — Tab 6: Strategisch Adviesrapport GMR
// Versnelling biobased & circulaire bouw | Juni 2026
// Karam Rihmani & Berend Dirken
// ============================================================

const AdviesrapportTab = (() => {

  let onRefreshIcons;

  // ----------------------------------------------------------
  // DATA
  // ----------------------------------------------------------
  const FINDINGS = [
    {
      num: '3.1', icon: 'graduation-cap', kleur: '#2A9298',
      titel: 'De kennisfase is grotendeels voorbij',
      tekst: 'Partijen kennen MPG, HNN, CO₂-opslag, losmaakbaarheid en materialenpaspoorten. Woningconcepten tonen aan dat biobased technisch haalbaar is. De hoofdvraag is niet meer <em>óf</em> het kan, maar waarom het nog niet standaard gebeurt.'
    },
    {
      num: '3.2', icon: 'alert-triangle', kleur: '#C0392B',
      titel: 'Implementatie blijft achter bij beleid',
      tekst: 'HNN, NABB, materialenpaspoorten en CO₂-sturing bestaan, maar worden in projecten niet consequent gebruikt. Investeringskosten en risicovermijding wegen zwaarder dan circulariteit — er is een structurele kloof tussen ambitie en uitvoering.'
    },
    {
      num: '3.3', icon: 'euro', kleur: '#E07B00',
      titel: 'Kosten: drempel, maar niet de hele verklaring',
      tekst: 'Biobased materialen kunnen duurder zijn bij initiële aanschaf. Maar levensduurkosten, restwaarde, demontabiliteit en CO₂-opslag veranderen dit beeld fundamenteel. Zolang alleen aanschafprijs telt, blijft de langetermijnwaarde van circulair bouwen onzichtbaar.'
    },
    {
      num: '3.4', icon: 'scale', kleur: '#8E44AD',
      titel: 'Regelgeving werkt nog niet eenduidig',
      tekst: 'Brandveiligheid, interpretaties per gemeente en onzekerheid rond MPG en CPR zorgen voor vertraging. Biobased is technisch mogelijk, maar toetsing en toelating vertragen toepassing. Regionale afstemming kan de onzekerheid voor marktpartijen significant verlagen.'
    },
    {
      num: '3.5', icon: 'home', kleur: '#176064',
      titel: 'Woningcorporaties zijn cruciaal voor opschaling',
      tekst: 'Corporaties sturen op levensduur, onderhoud, kwaliteit en maatschappelijke waarde. Gezamenlijk optrekken geeft schaal in de vraag, versnelt prijsdalingen en biedt zekerheid aan producenten. GMR kan hierin een cruciale faciliterende rol pakken.'
    },
  ];

  const KNELPUNTEN = [
    {
      num: '01', icon: 'hand',
      titel: 'Vrijblijvendheid',
      tekst: 'Duurzaamheidsinstrumenten als HNN worden gepresenteerd als handreiking of ambitie, niet als randvoorwaarde. Zolang circulair bouwen een pluspunt is in plaats van een eis, wint prijsdruk bijna altijd.'
    },
    {
      num: '02', icon: 'scatter-chart',
      titel: 'Versnippering van kennis',
      tekst: 'Kennis is verspreid over rapporten, websites en adviseurs. Voor projectleiders is het lastig snel te bepalen welke materialen geschikt zijn, welke leveranciers bestaan en hoe biobased prestaties uitgevraagd worden.'
    },
    {
      num: '03', icon: 'eye-off',
      titel: 'Onzichtbare businesscase',
      tekst: 'CO₂-opslag, restwaarde en demontabiliteit ontbreken in de businesscase. Hierdoor lijkt biobased alleen duurder, terwijl de langetermijnwaarde van circulair bouwen structureel onderschat wordt.'
    },
    {
      num: '04', icon: 'shuffle',
      titel: 'Gebrek aan regionale uitvoeringsafspraken',
      tekst: 'Gemeenten hanteren verschillende interpretaties, eisen per project wisselen en leveranciers krijgen geen stabiele vraag. Regionale afstemming biedt de voorspelbaarheid die investeringen in de bouwketen mogelijk maakt.'
    },
  ];

  const ADVIEZEN = [
    {
      num: 1, icon: 'landmark',
      titel: 'Maak HNN het regionale basisniveau',
      tekst: 'Gebruik Het Nieuwe Normaal als standaardtaal voor alle relevante woningbouwprojecten. Neem HNN-indicatoren op in uitvragen, beoordelingscriteria en monitoring — niet als inspiratie, maar als kader.',
      actie: 'HNN-indicatoren in elk projectdocument'
    },
    {
      num: 2, icon: 'clipboard-check',
      titel: 'Vertaal beleid naar aanbesteding',
      tekst: 'Verankering van circulaire en biobased ambities moet vroeg in het proces gebeuren. Wanneer ontwerp, budget en planning al vaststaan, is het te laat om circulariteit nog te borgen.',
      actie: 'Circulaire criteria verplicht in de uitvraagfase'
    },
    {
      num: 3, icon: 'database',
      titel: 'Ontwikkel een materialen- en kennisatlas',
      tekst: 'Bundel informatie over materialen, leveranciers, toepassingen, CO₂-opslag en voorbeeldprojecten in één praktische omgeving. Het bestaande dashboard is hiervoor de uitstekende basis.',
      actie: 'Dashboard uitbreiden naar regionale atlas'
    },
    {
      num: 4, icon: 'users',
      titel: 'Vorm een GMR-biobased coalitie',
      tekst: 'Breng gemeenten, corporaties, bouwbedrijven, agrariërs, verwerkers, onderwijs en financiers samen. De transitie vraagt ketensamenwerking — geen enkele partij lost dit zelfstandig op.',
      actie: 'Coalitievorming starten in 2026'
    },
    {
      num: 5, icon: 'building-2',
      titel: 'Gebruik corporaties als launching customer',
      tekst: 'Start met een corporatiecoalitie die gezamenlijk biobased pilots en inkoopafspraken ontwikkelt. Corporaties hebben schaal, maatschappelijke legitimiteit en een inherent langetermijnbelang.',
      actie: 'Gezamenlijk inkoopakkoord GMR-corporaties'
    },
    {
      num: 6, icon: 'book-open',
      titel: 'Koppel bouwen aan leren',
      tekst: 'Investeer in vakmanschap via MBO/HBO-onderwijs, praktijktrainingen en kennisdeling over dampopen bouwen, houtbouw, droge verbindingen en circulaire detaillering.',
      actie: 'Biobased bouwprofiel in MBO-curriculum'
    },
  ];

  const ROADMAP = [
    {
      jaar: '2026', klasse: 'arm-now',
      titel: 'Van analyse naar afspraken',
      punten: [
        'Bestuurlijk besluit: HNN als regionaal uitgangspunt',
        'Start materialen- en kennisatlas',
        'Selectie corporatiepilots biobased',
        'Dashboard uitbreiden met top 10 en roadmap',
      ]
    },
    {
      jaar: '2027', klasse: '',
      titel: 'Verankering in projecten',
      punten: [
        'HNN opnemen in aanbestedingen',
        'Regionale modelteksten en beoordelingsformats',
        'Eerste CO₂- en materialenpaspoorten',
        'Kennisdagen voor gemeenten en marktpartijen',
      ]
    },
    {
      jaar: '2028', klasse: '',
      titel: 'Opschaling van ketens',
      punten: [
        'Regionale inkoopcoalitie operationeel',
        'Afspraken met agrariërs en verwerkers',
        'Standaardisatie biobased toepassingen per woningtype',
      ]
    },
    {
      jaar: '2029', klasse: '',
      titel: 'Financiële instrumenten',
      punten: [
        'Pilot carbon credits of CO₂-labels',
        'Koppeling met groene financiering',
        'Structurele monitoring CO₂-opslag en materiaalgebruik',
      ]
    },
    {
      jaar: '2030', klasse: 'arm-goal',
      titel: 'Normalisering',
      punten: [
        'Biobased = standaard in regionale woningbouw',
        'GMR positioneren als landelijke voorbeeldregio',
        'Bijdrage aan nationaal Bouwbesluit',
      ]
    },
  ];

  const TRENDTABEL = [
    { trend: 'HNN als beleidskader',            betekenis: 'HNN wordt gemeenschappelijke taal voor circulair bouwen.',     implicatie: 'Niet alleen noemen — opnemen in uitvragen en monitoring.' },
    { trend: 'Industrialisatie & prefab',        betekenis: 'Prefab maakt biobased bouwen sneller, constanter, schaalbaarder.', implicatie: 'Koppel biobased ambities aan woningconcepten en seriebouw.' },
    { trend: 'CO₂ als economische waarde',       betekenis: 'CO₂-opslag kan financiële waarde krijgen via credits en labels.', implicatie: 'Bouw databasis en rekenmethodiek op via pilots.' },
    { trend: 'Regionale ketens',                 betekenis: 'Vezelteelt, verwerking en bouwvraag zijn nog onvoldoende verbonden.', implicatie: 'Organiseer ketenafspraken landbouw–producenten–bouwers.' },
    { trend: 'Van vrijwillig naar verplicht',    betekenis: 'Duurzaamheid verschuift van ambitie naar normering.',           implicatie: 'Bereid gemeenten en markt voor op strengere eisen.' },
  ];

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------
  function render() {
    const container = document.getElementById('adviesrapport-content');
    container.innerHTML = buildHTML();

    // PDF download knoppen — via GMRPrint net zoals andere tabs
    container.querySelectorAll('.js-advies-download').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.GMRPrint) {
          GMRPrint.printAdviesrapport();
        } else {
          console.warn('GMRPrint niet beschikbaar');
        }
      });
    });

    onRefreshIcons(container);
  }

  // ----------------------------------------------------------
  // HTML BUILDER
  // ----------------------------------------------------------
  function buildHTML() {
    return `
      <!-- ── HERO ─────────────────────────────────────────── -->
      <div class="advies-hero">
        <div class="advies-hero-eyebrow">
          <i data-lucide="file-text" style="width:13px;height:13px"></i>
          Adviesrapport &nbsp;·&nbsp; Juni 2026
        </div>
        <h2 class="advies-hero-title">Versnelling van biobased en circulaire bouw in de Groene Metropoolregio</h2>
        <p class="advies-hero-sub">Karam Rihmani &amp; Berend Dirken &nbsp;·&nbsp; Minor Duurzaam Ondernemen &amp; Circulaire Economie &nbsp;·&nbsp; HAN</p>
        <div class="advies-hero-btns">
          <button class="download-btn js-advies-download" style="background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.4);color:#fff">
            <i data-lucide="download"></i> Download adviesrapport (PDF)
          </button>
        </div>
      </div>

      <!-- ── CENTRALE BOODSCHAP ────────────────────────────── -->
      <div class="advies-central-message">
        <div class="acm-icon"><i data-lucide="target"></i></div>
        <div class="acm-body">
          <div class="acm-label">Centrale boodschap</div>
          <div class="acm-text">
            Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen.
            De grootste uitdaging zit nu in de <strong>implementatie</strong>. Het advies is om bestaand beleid —
            zoals HNN en biobased criteria — structureel te verankeren in aanbestedingen,
            gebiedsontwikkeling en woningbouwprojecten.
          </div>
        </div>
      </div>

      <!-- ── MANAGEMENTSAMENVATTING ─────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="layers"></i> Managementsamenvatting
        </div>
        <div class="advies-summary-block">
          <p>De GMR staat voor een <strong>dubbele opgave</strong>: woningbouw versnellen én de milieu-impact verlagen.
          De regio beschikt al over kennis, beleidsinstrumenten en praktijkvoorbeelden — woningconcepten zijn beschikbaar,
          marktpartijen experimenteren met biobased materialen, en instrumenten als HNN, NABB, materialenpaspoorten
          en carbon-creditmethodieken geven richting aan de transitie.</p>
          <p>Toch blijft toepassing achter bij ambities. <strong>Het probleem ligt niet bij gebrek aan kennis of techniek,
          maar bij onvoldoende implementatie van bestaand beleid.</strong> Beleidskaders zijn aanwezig, maar worden nog niet
          consequent vertaald naar aanbestedingen, gebiedsontwikkelingen, vergunningprocessen en projectbesluiten.
          Daardoor blijft duurzaam bouwen te vaak afhankelijk van losse pilots, intrinsiek gemotiveerde koplopers
          of tijdelijke subsidies.</p>
          <div class="advies-summary-advieslijn">
            <i data-lucide="arrow-right" style="width:14px;height:14px;flex-shrink:0;color:var(--groen-licht)"></i>
            <span><strong>Het advies:</strong> Richt de volgende fase op verankering — maak HNN het standaardkader,
            werk met een regionale implementatieroadmap, gebruik corporaties als launching customer,
            ontwikkel een materialen- en kennisatlas en bouw een regionale coalitie.</span>
          </div>
        </div>
      </div>

      <!-- ── KERNCONCLUSIES ─────────────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="zoom-in"></i> Kernconclusies uit het onderzoek
        </div>
        <div class="advies-findings-grid">
          ${FINDINGS.map(f => `
            <div class="advies-finding-card" style="border-top:3px solid ${f.kleur}">
              <div class="afc-top">
                <div class="afc-icon" style="background:${f.kleur}18;color:${f.kleur}">
                  <i data-lucide="${f.icon}"></i>
                </div>
                <span class="afc-num">${f.num}</span>
              </div>
              <div class="afc-titel">${f.titel}</div>
              <p class="afc-tekst">${f.tekst}</p>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── TREND TABEL ────────────────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="trending-up"></i> Trendanalyse: vijf overkoepelende bewegingen richting 2030
        </div>
        <div class="advies-trend-tabel">
          <div class="att-header">
            <span>Trend</span><span>Betekenis</span><span>Implicatie voor GMR</span>
          </div>
          ${TRENDTABEL.map((r, i) => `
            <div class="att-row ${i % 2 === 0 ? 'att-even' : ''}">
              <span class="att-trend">${r.trend}</span>
              <span class="att-betekenis">${r.betekenis}</span>
              <span class="att-implicatie">${r.implicatie}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── PROBLEEMANALYSE ────────────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="alert-octagon"></i> Vier kernknelpunten
        </div>
        <div class="advies-problems-grid">
          ${KNELPUNTEN.map(k => `
            <div class="advies-problem-card">
              <div class="apc-num">${k.num}</div>
              <div class="apc-body">
                <div class="apc-icon-row">
                  <i data-lucide="${k.icon}" style="width:15px;height:15px;color:var(--groen-licht);flex-shrink:0"></i>
                  <strong class="apc-titel">${k.titel}</strong>
                </div>
                <p class="apc-tekst">${k.tekst}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── STRATEGISCHE ADVIEZEN ─────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="lightbulb"></i> Zes strategische adviezen aan de GMR
        </div>
        <div class="advies-advice-grid">
          ${ADVIEZEN.map(a => `
            <div class="advies-advice-card">
              <div class="aac-num">${a.num}</div>
              <div class="aac-body">
                <div class="aac-icon"><i data-lucide="${a.icon}"></i></div>
                <div class="aac-titel">${a.titel}</div>
                <p class="aac-tekst">${a.tekst}</p>
                <div class="aac-actie">
                  <i data-lucide="arrow-right" style="width:11px;height:11px;flex-shrink:0"></i>
                  <span>${a.actie}</span>
                </div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── IMPLEMENTATIEROADMAP ───────────────────────────── -->
      <div class="advies-section">
        <div class="advies-section-header">
          <i data-lucide="map"></i> Implementatieroadmap 2026–2030
        </div>
        <div class="advies-roadmap">
          ${ROADMAP.map((item, i) => `
            <div class="arm-item ${item.klasse}">
              <div class="arm-left">
                <div class="arm-year-badge">${item.jaar}</div>
                ${i < ROADMAP.length - 1 ? '<div class="arm-connector-line"></div>' : ''}
              </div>
              <div class="arm-content">
                <div class="arm-titel">${item.titel}</div>
                <ul class="arm-punten">
                  ${item.punten.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- ── CONCLUSIE ─────────────────────────────────────── -->
      <div class="advies-conclusion-block">
        <div class="advies-conclusion-inner">
          <i data-lucide="check-circle" style="width:22px;height:22px;flex-shrink:0;color:#2A9298"></i>
          <div>
            <strong>Conclusie</strong>
            <p>De GMR heeft een sterke uitgangspositie om koploper te worden in biobased en circulaire bouw.
            De belangrijkste barrière is niet het ontbreken van beleid, maar het ontbreken van
            <strong>consequente implementatie</strong>. De volgende stap is normalisering: van ambitie naar eis,
            van losse projecten naar regionale afspraken, van kennis naar uitvoering. Het centrale advies:
            verankering van HNN, gebruik van corporaties als launching customer, ontwikkeling van een
            materialenatlas en opbouw van een regionale coalitie die de bouwketen verbindt.</p>
          </div>
        </div>
      </div>

      <!-- ── FOOTER ─────────────────────────────────────────── -->
      <div class="advies-footer">
        <div class="advies-footer-inner">
          <span>Karam Rihmani &amp; Berend Dirken &nbsp;·&nbsp; HAN Minor Duurzaam Ondernemen &amp; Circulaire Economie &nbsp;·&nbsp; Juni 2026</span>
          <button class="download-btn js-advies-download">
            <i data-lucide="download"></i> Download adviesrapport (PDF)
          </button>
        </div>
      </div>
    `;
  }

  // ----------------------------------------------------------
  // PUBLIC API
  // ----------------------------------------------------------
  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;
    render();
  }

  return { init };
})();
