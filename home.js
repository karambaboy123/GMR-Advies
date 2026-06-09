// ============================================================
// HOME.JS — Startpagina / Overzichtsdashboard
// ============================================================

const HomeTab = (() => {

  function init(refreshIcons) {
    const container = document.getElementById('home-content');
    if (!container) return;
    container.innerHTML = render();
    attachEvents(container, refreshIcons);
    refreshIcons(container);
  }

  function render() {
    return `
      <!-- HERO -->
      <div class="home-hero">
        <div class="home-hero-badge">
          <i data-lucide="leaf"></i>
          GMR — Minor Duurzaam Ondernemen &amp; Circulaire Economie
        </div>
        <h1>Biobased &amp; Circulaire Bouw<br>in de Groene Metropoolregio</h1>
        <p class="home-hero-sub">
          Een interactief kennisdashboard over de versnelling van biobased en circulaire
          woningbouw in de regio Arnhem-Nijmegen. Gebaseerd op trendanalyse,
          stakeholderinterviews en beleidsonderzoek.
        </p>
        <div class="home-hero-meta">
          <div class="home-hero-meta-item">
            <i data-lucide="user"></i>
            Karam Rihmani &amp; Berend Dirken
          </div>
          <div class="home-hero-meta-item">
            <i data-lucide="building"></i>
            HAN University of Applied Sciences
          </div>
          <div class="home-hero-meta-item">
            <i data-lucide="calendar"></i>
            Juni 2026
          </div>
          <div class="home-hero-meta-item">
            <i data-lucide="map-pin"></i>
            Arnhem-Nijmegen
          </div>
        </div>
      </div>

      <!-- CENTRALE BOODSCHAP -->
      <div class="home-central">
        <div class="home-central-icon">
          <i data-lucide="target"></i>
        </div>
        <div class="home-central-body">
          <div class="home-central-label">Centrale boodschap</div>
          <div class="home-central-text">
            Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen.
            De grootste uitdaging zit nu in de <strong>implementatie</strong>.
            Het advies is om bestaand beleid — zoals HNN en biobased criteria —
            structureel te verankeren in aanbestedingen, gebiedsontwikkeling
            en woningbouwprojecten.
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="home-stats">
        <div class="home-stat-card">
          <div class="home-stat-icon" style="background:linear-gradient(135deg,#0E4447,#176064)">
            <i data-lucide="trending-up"></i>
          </div>
          <div>
            <div class="home-stat-value">12</div>
            <div class="home-stat-label">Trends geanalyseerd</div>
          </div>
        </div>
        <div class="home-stat-card">
          <div class="home-stat-icon" style="background:linear-gradient(135deg,#176064,#2A9298)">
            <i data-lucide="users"></i>
          </div>
          <div>
            <div class="home-stat-value">50</div>
            <div class="home-stat-label">Stakeholders in kaart</div>
          </div>
        </div>
        <div class="home-stat-card">
          <div class="home-stat-icon" style="background:linear-gradient(135deg,#2A9298,#44b3ba)">
            <i data-lucide="mic"></i>
          </div>
          <div>
            <div class="home-stat-value">6</div>
            <div class="home-stat-label">Diepte-interviews</div>
          </div>
        </div>
        <div class="home-stat-card">
          <div class="home-stat-icon" style="background:linear-gradient(135deg,#E07B00,#f0983a)">
            <i data-lucide="lightbulb"></i>
          </div>
          <div>
            <div class="home-stat-value">10</div>
            <div class="home-stat-label">Strategische inzichten</div>
          </div>
        </div>
      </div>

      <!-- HOOFDSECTIES — Advies & Inzichten bovenaan -->
      <div class="home-sections-title">Conclusies &amp; Advies</div>
      <div class="home-sections-grid" style="margin-bottom:28px">
        <div class="home-section-card highlight" style="--card-accent:#176064" data-nav="adviesrapport">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#0E4447,#176064)">
              <i data-lucide="file-text"></i>
            </div>
            <div class="home-sc-title">Adviesrapport</div>
            <span class="home-sc-badge">Nieuw</span>
          </div>
          <div class="home-sc-desc">
            Volledig strategisch adviesrapport met kernbevindingen, knelpunten,
            zes adviezen en een implementatieroadmap 2026–2030. Inclusief PDF-download.
          </div>
          <div class="home-sc-arrow">Lees rapport <i data-lucide="arrow-right"></i></div>
        </div>

        <div class="home-section-card highlight" style="--card-accent:#2A9298" data-nav="inzichten">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#176064,#2A9298)">
              <i data-lucide="star"></i>
            </div>
            <div class="home-sc-title">Top 10 Inzichten</div>
            <span class="home-sc-badge">Nieuw</span>
          </div>
          <div class="home-sc-desc">
            De tien meest bepalende lessen voor de versnelling van biobased bouw
            in de GMR. Per inzicht: categorie, actie en GMR-handelingsperspectief.
          </div>
          <div class="home-sc-arrow">Bekijk inzichten <i data-lucide="arrow-right"></i></div>
        </div>
      </div>

      <!-- ONDERZOEKSSECTIES -->
      <div class="home-sections-title">Onderzoek &amp; Analyse</div>
      <div class="home-sections-grid-3">
        <div class="home-section-card" style="--card-accent:#0E4447" data-nav="trends">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#0E4447,#176064)">
              <i data-lucide="trending-up"></i>
            </div>
            <div class="home-sc-title">Trendanalyse</div>
          </div>
          <div class="home-sc-desc">
            12 ontwikkelingen met impact-matrix, tijdlijn en statblokken.
            Van HNN tot carbon credits en industrialisatie.
          </div>
          <div class="home-sc-arrow">Verkennen <i data-lucide="arrow-right"></i></div>
        </div>

        <div class="home-section-card" style="--card-accent:#176064" data-nav="stakeholders">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#176064,#2A9298)">
              <i data-lucide="users"></i>
            </div>
            <div class="home-sc-title">Stakeholders</div>
          </div>
          <div class="home-sc-desc">
            50 relevante actoren in de GMR — gemeenten, aannemers, corporaties,
            provincies en kennisinstellingen.
          </div>
          <div class="home-sc-arrow">Verkennen <i data-lucide="arrow-right"></i></div>
        </div>

        <div class="home-section-card" style="--card-accent:#2A9298" data-nav="notulen">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#2A9298,#44b3ba)">
              <i data-lucide="message-square"></i>
            </div>
            <div class="home-sc-title">Notulen Explorer</div>
          </div>
          <div class="home-sc-desc">
            Interactieve matrix van 6 diepte-interviews. Zoek op thema,
            standpunt en sentiment per geïnterviewde partij.
          </div>
          <div class="home-sc-arrow">Verkennen <i data-lucide="arrow-right"></i></div>
        </div>

        <div class="home-section-card" style="--card-accent:#E07B00" data-nav="game">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#b06000,#E07B00)">
              <i data-lucide="zap"></i>
            </div>
            <div class="home-sc-title">Beleidsscenario</div>
          </div>
          <div class="home-sc-desc">
            Simuleer biobased bouwbeleid als gemeente, provincie, aannemer,
            corporatie of bouwboer. 4 rondes, verborgen effecten.
          </div>
          <div class="home-sc-arrow">Spelen <i data-lucide="arrow-right"></i></div>
        </div>

        <div class="home-section-card" style="--card-accent:#44b3ba" data-nav="deskresearch">
          <div class="home-sc-header">
            <div class="home-sc-icon" style="background:linear-gradient(135deg,#176064,#44b3ba)">
              <i data-lucide="book-open"></i>
            </div>
            <div class="home-sc-title">Deskresearch</div>
          </div>
          <div class="home-sc-desc">
            Bronnenanalyse, beleidsdocumenten en literatuuroverzicht
            waarop de trendanalyse en adviezen zijn gebaseerd.
          </div>
          <div class="home-sc-arrow">Verkennen <i data-lucide="arrow-right"></i></div>
        </div>
      </div>

      <!-- PROJECT INFO -->
      <div class="home-project-info">
        <div class="home-pi-item">
          <span class="home-pi-label">Studenten</span>
          <span class="home-pi-value">Karam Rihmani &amp; Berend Dirken</span>
        </div>
        <div class="home-pi-item">
          <span class="home-pi-label">Opleiding</span>
          <span class="home-pi-value">Minor Duurzaam Ondernemen &amp; Circulaire Economie</span>
        </div>
        <div class="home-pi-item">
          <span class="home-pi-label">Instelling</span>
          <span class="home-pi-value">HAN University of Applied Sciences</span>
        </div>
        <div class="home-pi-item">
          <span class="home-pi-label">Opdrachtgever</span>
          <span class="home-pi-value">Groene Metropoolregio Arnhem-Nijmegen</span>
        </div>
        <div class="home-pi-item">
          <span class="home-pi-label">Jaar</span>
          <span class="home-pi-value">2026</span>
        </div>
      </div>
    `;
  }

  function attachEvents(container, refreshIcons) {
    container.querySelectorAll('.home-section-card[data-nav]').forEach(card => {
      card.addEventListener('click', () => {
        const tabName = card.dataset.nav;
        // Trigger nav button click
        const navBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
        if (navBtn) navBtn.click();
      });
    });
  }

  return { init };
})();
