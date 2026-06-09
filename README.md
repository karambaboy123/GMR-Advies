<div align="center">
  <img src="logo.svg" alt="GMR Groene Metropoolregio Arnhem-Nijmegen" width="220" />

  <h1>GMR Advies Dashboard</h1>
  <p><strong>Biobased en Circulaire Bouw — Groene Metropoolregio Arnhem-Nijmegen</strong></p>
  <p>
    Interactief onderzoeks- en adviesdashboard ontwikkeld in het kader van de<br>
    Minor Duurzaam Ondernemen en Circulaire Economie aan de HAN Hogeschool Arnhem en Nijmegen.
  </p>

  <img src="https://img.shields.io/badge/Vanilla%20JS-geen%20build%20stap-0E4447?style=flat-square" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/Trends-12%20analyses-2A9298?style=flat-square" alt="Trends">
  <img src="https://img.shields.io/badge/Stakeholders-50%20partijen-176064?style=flat-square" alt="Stakeholders">
  <img src="https://img.shields.io/badge/Interviews-6%20partijen-44b3ba?style=flat-square" alt="Interviews">
  <img src="https://img.shields.io/badge/Inzichten-Top%2010-E07B00?style=flat-square" alt="Inzichten">
</div>

---

## Over dit project

Dit dashboard biedt een volledig interactief overzicht van het onderzoek naar de transitie naar biobased en circulaire bouw in de Groene Metropoolregio Arnhem-Nijmegen (GMR). Het is ontwikkeld door Karam Rihmani en Berend Dirken op basis van zes diepte-interviews met marktpartijen, overheden en woningcorporaties in april 2026, aangevuld met analyse van meer dan veertig beleidsdocumenten en rapporten.

De centrale boodschap van het onderzoek:

> *Er is al veel beleid, kennis en ambitie rondom biobased en circulair bouwen. De grootste uitdaging zit nu in de **implementatie**. Het advies is om bestaand beleid — zoals HNN en biobased criteria — structureel te verankeren in aanbestedingen, gebiedsontwikkeling en woningbouwprojecten.*

---

## Tabbladen

### 🏠 Home *(startpagina)*
Overzichtspagina met projectintroductie, centrale boodschap, statistische samenvatting en klikbare navigatiekaarten naar alle secties. Geeft direct inzicht in de opzet en scope van het dashboard.

### 📄 Adviesrapport
Volledig strategisch adviesrapport op basis van het DOCX-bronbestand. Bevat negen secties: managementsamenvatting, aanleiding, onderzoeksbasis, vijf kernconclusies, trendtabel, vier knelpunten, zes strategische adviezen, implementatieroadmap 2026–2030, dashboard-aanbevelingen en conclusie. Exporteerbaar als PDF in GMR-huisstijl.

### ⭐ Top 10 Inzichten
De tien meest bepalende lessen voor de versnelling van biobased en circulaire bouw in de GMR. Elke inzichtkaart toont categorie, beschrijving, GMR-handelingsperspectief en actiepunt. Kleurgecodeerd per categorie (implementatie, beleid, financiën, regelgeving, samenwerking, innovatie, strategie).

### 📈 Trendanalyse
Twaalf onderbouwde trends voor de biobased bouwtransitie, weergegeven als uitklapbare kaarten met beschrijving, statistieken, tijdlijn en bronnen. Een interactieve impactmatrix (impact × tijdshorizon) geeft een visueel overzicht. Klik op een punt in de matrix om direct naar de bijbehorende trend te springen. Exporteerbaar als PDF.

### 👥 Stakeholders
Overzicht van vijftig relevante partijen in de GMR, onderverdeeld in zeven categorieën: gemeenten, provincie, bouwbedrijven, woningcorporaties, brancheorganisaties, kennisinstellingen en rijksoverheid. Geïnterviewde partijen zijn apart gemarkeerd. Filterbaar op categorie en interviewstatus. Exporteerbaar als PDF.

### 📋 Notulen Explorer
Interviewmatrix op basis van centrale onderzoeksvragen. Per vraag worden de standpunten van geïnterviewde partijen naast elkaar getoond, inclusief sentimentanalyse (positief, neutraal, kritisch) en bronvermelding. Exporteerbaar als PDF.

### 🎮 Beleidsscenario Simulator
Dynamische scenariosimulatie met **vijf** speelbare rollen: gemeente, provincie, aannemer, woningcorporatie en **bouwboer/agrariër**. Per rol zijn vier beleidsrondes, elk met vier keuzemogelijkheden. Keuzes beïnvloeden vier verborgen systeemvariabelen: politiek draagvlak, marktgroei, budgetruimte en samenwerking. Het eindscherm toont een radar-chart, prognoses voor 2030, het beleidspad en een eindscenario. Stakeholderreacties zijn weergegeven als rollen (niet als namen). Exporteerbaar als PDF-rapport.

### 📚 Deskresearch
Bronnenanalyse, beleidsdocumenten en literatuuroverzicht waarop de trendanalyse en adviezen zijn gebaseerd.

---

## Functies

| Functie | Beschrijving |
|---|---|
| PDF-export | Alle tabbladen exporteerbaar als gestructureerd PDF-document in GMR-huisstijl met officieel logo |
| Adviesrapport PDF | Volledig rapport met alle 9 secties, tabellen en bronnenlijst |
| Radar-chart | Visuele eindstand van de vier systeemvariabelen na de beleidsimulator |
| Impactmatrix | Scatter-plot van trends op impact × tijdshorizon met click-to-scroll |
| Beleidsimulator | 5 rollen, 4 rondes, verborgen effecten, netwerk-visualisatie, eindscenario |
| Sentimentbadges | Kleurgecodeerde weergave van positief, neutraal en kritisch sentiment |
| Lokale bestanden | Werkt volledig offline via het `file://` protocol, geen server vereist |
| GitHub Pages | Direct bruikbaar als statische site zonder build-stap |

---

## Geïnterviewde partijen

| Organisatie | Sector | Rol |
|---|---|---|
| Gemeente Nijmegen | Overheid | Beleidsadviseur Duurzaamheid |
| Provincie Gelderland | Overheid | Beleidsadviseur Ruimte en Wonen |
| BAM Wonen | Bouwbedrijf | Projectleider Biobased Bouwen |
| Van Wijnen | Bouwbedrijf | Directeur Duurzaamheid |
| Klokgroep | Projectontwikkeling | Directeur Vastgoed |
| Talis Woningcorporatie | Woningcorporatie | Beleidsadviseur Duurzaamheid |

Alle interviews zijn afgenomen in april 2026 in het kader van de Minor Duurzaam Ondernemen en Circulaire Economie aan de HAN.

---

## Bestandsstructuur

```
GMR Advies/
├── index.html          # Hoofd HTML — navigatie en tab-containers
├── app.js              # Tab routing en module-initialisatie
├── styles.css          # Alle CSS — GMR-huisstijl en componenten
├── data.js             # Centrale data: trends, stakeholders, game-rollen
├── game-data.js        # Beleidsimulator data: rondes, enrichments, scenario's
│
├── home.js             # Tab: Startpagina / overzichtsdashboard
├── adviesrapport.js    # Tab: Strategisch adviesrapport
├── inzichten.js        # Tab: Top 10 inzichten
├── trends.js           # Tab: Trendanalyse
├── stakeholders.js     # Tab: Stakeholderoverzicht
├── notulen.js          # Tab: Notulen Explorer
├── game.js             # Tab: Beleidsscenario Simulator
├── deskresearch.js     # Tab: Deskresearch
│
├── print-export.js     # PDF-export voor alle tabbladen
├── logo.svg            # GMR-logo (teal) — gebruikt in sidebar
└── logobestanden.svg   # GMR-logo (wit, horizontaal) — gebruikt in PDFs
```

---

## Technologie

| Component | Keuze | Reden |
|---|---|---|
| JavaScript | Vanilla JS (geen framework) | Werkt direct via `file://`, geen build-stap |
| Iconen | Lucide Icons via CDN | Lichtgewicht, consistent, SVG-gebaseerd |
| PDF-export | `window.print()` + print CSS | Geen externe afhankelijkheden, werkt offline |
| Grafieken | Inline SVG (handgeschreven) | Volledige controle, geen library vereist |
| Stijl | CSS custom properties | GMR-huisstijl consequent door hele codebase |
| Modules | IIFE-patroon per tab | Encapsulatie zonder build-tooling |

---

## Bronnen en documentatie

De map `Biobased en Circulaire Bouw/` bevat de volledige documentatiebasis van het onderzoek, waaronder:

- Het Nieuwe Normaal (HNN) — leidraden nieuwbouw, bestaande bouw, infra en juridische toetsing
- Nationale Aanpak Biobased Bouwen (NABB, 2023)
- Rapportages van ING, TNO, Wageningen UR, Building Balance en Cirkelstad
- Circulaire Atlas Gelderland
- DRIFT Rapport Staat van Transitie
- EPBD en CSRD whitepapers
- Woningconcepten en hun prestaties 2023/2024
- Marktonderzoek Nederlandse carbon credits en Climate Cleanup Protocol
- Trendanalyse onderbouwing (eigen onderzoek, april 2026)

---

## Auteurs

**Karam Rihmani** en **Berend Dirken**  
Minor Duurzaam Ondernemen en Circulaire Economie  
HAN Hogeschool Arnhem en Nijmegen, 2026

Onderzoek uitgevoerd in opdracht van de Groene Metropoolregio Arnhem-Nijmegen.

---

<div align="center">
  <sub>Groene Metropoolregio Arnhem-Nijmegen &nbsp;·&nbsp; Biobased en Circulaire Bouw &nbsp;·&nbsp; 2026</sub>
</div>
