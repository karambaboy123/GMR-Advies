// ============================================================
// APP.JS — Hoofdlogica: tab routing en initialisatie
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Tab routing
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabs = document.querySelectorAll('.tab-content');
  let currentTab = 'stakeholders';

  function switchTab(tabName) {
    currentTab = tabName;
    navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabName));
    tabs.forEach(tab => tab.classList.toggle('active', tab.id === `tab-${tabName}`));
  }

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Lucide icon initialisation — optioneel scope-element voor betere performance
  function refreshIcons(scope) {
    if (!window.lucide) return;
    if (scope) lucide.createIcons({ scope });
    else lucide.createIcons();
  }

  // Initialise all tab modules
  StakeholdersTab.init(refreshIcons);
  TrendsTab.init(refreshIcons);
  NotulenTab.init(refreshIcons);
  GameTab.init(refreshIcons);
  DeskresearchTab.init(refreshIcons);

  // Initial icon render
  refreshIcons();
});
