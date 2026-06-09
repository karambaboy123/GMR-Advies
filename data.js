// ============================================================
// DATA.JS — GMR Dashboard: Circulaire & Biobased Bouw
// Minor Duurzaam Ondernemen en Circulaire Economie
// Karam & Berend | Groene Metropoolregio Arnhem-Nijmegen
// ============================================================
// Gebaseerd op:
//   - 7 interviews (april 2026) met marktpartijen en overheden
//   - Nationale Aanpak Biobased Bouwen (NABB, nov. 2023)
//   - Het Nieuwe Normaal (HNN) framework
//   - Eigen onderzoeksrapporten Karam & Berend
// ============================================================

// ============================================================
// GEDEELD PAD NAAR DOCUMENTENMAP
// ============================================================
const BASE_PATH = 'file:///C:/Users/karam/Desktop/GMR%20Advies/Biobased%20en%20Circulaire%20Bouw/';

// ============================================================
// STAKEHOLDERS
// 6 geinterviewd, aangevuld met relevante GMR-partijen
// ============================================================

const STAKEHOLDERS = [

  // === GEMEENTEN (17) ===
  {
    id: 1, naam: "Gemeente Nijmegen", categorie: "Gemeente", interviewed: true,
    beschrijving: "Op één na grootste gemeente in de GMR-regio (~185.000 inwoners). Actief duurzaamheidsbeleid via grondpolitiek en aanbestedingseisen. Werkt samen met woningcorporatie Talis aan biobased projecten.",
    standpunt: "Nijmegen zet stapsgewijs circulaire percentages in aanbestedingen. Erkent spanning met Rijksdruk op snelle woningbouwproductie. Grondpolitiek stelt de gemeente in staat om duurzame eisen te koppelen aan bouwprojecten.",
    citaten: [
      "\"Gemeente Nijmegen neemt biobased bouwen op in eisen als 'dit project moet x% circulair gebouwd zijn'. Bouwbedrijven willen meewerken via ingroeimogelijkheden.\"",
      "\"Een groot knelpunt is de druk vanuit de Rijksoverheid die zo snel mogelijk nieuwe woningen wil via optimalisatie van traditionele bouw — dat snijdt onze circulaire ambities.\""
    ],
    notulenRefs: [0, 1, 3]
  },
  {
    id: 2, naam: "Gemeente Arnhem", categorie: "Gemeente", interviewed: false,
    beschrijving: "Grootste gemeente in de regio (~165.000 inwoners). Actief in gebiedsontwikkeling Rijnboog en stadsvernieuwing. Heeft eigen duurzaamheidsambities maar beperkte capaciteit voor biobased beleid.",
    standpunt: "Volgt GMR-agenda op het gebied van circulair bouwen. Toepassing biobased bouw kansrijk bij grote projecten."
  },
  {
    id: 3, naam: "Gemeente Berg en Dal", categorie: "Gemeente", interviewed: false,
    beschrijving: "Groene gemeente in het Rijk van Nijmegen. Ruraal karakter met beperkte woningbouwopgave.",
    standpunt: "Biobased bouwen past bij het landschappelijke karakter van de gemeente."
  },
  {
    id: 4, naam: "Gemeente Beuningen", categorie: "Gemeente", interviewed: false,
    beschrijving: "Gemeente langs de Waal met groeiende woningbehoefte. Relatief kleine ambtelijke organisatie.",
    standpunt: "Volgt regionaal beleid. Beperkte eigen capaciteit voor innovatief aanbestedingsbeleid."
  },
  {
    id: 5, naam: "Gemeente Doesburg", categorie: "Gemeente", interviewed: false,
    beschrijving: "Historische Hanzestad aan de IJssel (~11.000 inwoners). Kleinste gemeente in de regio.",
    standpunt: "Afhankelijk van provinciale en rijksondersteuning voor duurzaamheidsbeleid."
  },
  {
    id: 6, naam: "Gemeente Druten", categorie: "Gemeente", interviewed: false,
    beschrijving: "Gemeente in het rivierengebied met sterke agrarische sector. Potentieel voor lokale biobased ketens via vezelhennep en stro.",
    standpunt: "Agrarische achtergrond biedt kansen voor biobased materiaalketens."
  },
  {
    id: 7, naam: "Gemeente Duiven", categorie: "Gemeente", interviewed: false,
    beschrijving: "Logistieke gemeente aan de A12. Groeiende woningbouwopgave nabij Arnhem.",
    standpunt: "Pragmatische houding: volgt marktstandaard en wacht op bewezen concepten."
  },
  {
    id: 8, naam: "Gemeente Heumen", categorie: "Gemeente", interviewed: false,
    beschrijving: "Kleinere gemeente ten zuiden van Nijmegen. Sterke link met natuur en recreatie.",
    standpunt: "Positief over circulaire bouw als het bijdraagt aan groene leefomgeving."
  },
  {
    id: 9, naam: "Gemeente Lingewaard", categorie: "Gemeente", interviewed: false,
    beschrijving: "Gemeente in de Betuwe met aanzienlijke woningbouwplannen. Fruitteelt en landbouw dominant.",
    standpunt: "Interesse in biobased maar weinig eigen expertise beschikbaar."
  },
  {
    id: 10, naam: "Gemeente Mook en Middelaar", categorie: "Gemeente", interviewed: false,
    beschrijving: "Kleine grensplaats bij Nijmegen. Wonen in de natuur als kernkwaliteit.",
    standpunt: "Te kleine schaal voor zelfstandig biobased beleid."
  },
  {
    id: 11, naam: "Gemeente Overbetuwe", categorie: "Gemeente", interviewed: false,
    beschrijving: "Groeiende gemeente met veel agrarisch gebied en toenemende woningbehoefte.",
    standpunt: "Volgt GMR-agenda en investeert in kennisopbouw bij ambtenaren."
  },
  {
    id: 12, naam: "Gemeente Renkum", categorie: "Gemeente", interviewed: false,
    beschrijving: "Bosrijke gemeente langs de Rijn. Weinig grootschalige woningbouwplannen.",
    standpunt: "Circulaire bouw past bij identiteit van de gemeente, maar budget is een knelpunt."
  },
  {
    id: 13, naam: "Gemeente Rheden", categorie: "Gemeente", interviewed: false,
    beschrijving: "Gemeente aan de oostkant van Arnhem, Veluwezoom. Beperkte bouwopgave.",
    standpunt: "Afwachtend, kijkt naar grotere buurgemeenten voor initiatief."
  },
  {
    id: 14, naam: "Gemeente Rozendaal", categorie: "Gemeente", interviewed: false,
    beschrijving: "Kleinste gemeente van Nederland. Nauwelijks eigen bouwproductie.",
    standpunt: "Volgt provinciaal en regionaal beleid volledig."
  },
  {
    id: 15, naam: "Gemeente Westervoort", categorie: "Gemeente", interviewed: false,
    beschrijving: "Kleine gemeente ingeklemd tussen Arnhem en Duiven.",
    standpunt: "Afhankelijk van regionale afspraken voor duurzame bouwambities."
  },
  {
    id: 16, naam: "Gemeente Wijchen", categorie: "Gemeente", interviewed: false,
    beschrijving: "Groeikern van Nijmegen met aanzienlijke nieuwbouwplannen.",
    standpunt: "Positief over pilots maar wil kostenclariteit voordat normen worden opgelegd."
  },
  {
    id: 17, naam: "Gemeente Zevenaar", categorie: "Gemeente", interviewed: false,
    beschrijving: "Gemeente in de Liemers, grenzend aan Duitsland. Logistieke en industriële functie.",
    standpunt: "Pragmatisch: kijkt naar wat haalbaar is binnen bestaande budgetten."
  },

  // === PROVINCIE GELDERLAND (1) ===
  {
    id: 18, naam: "Provincie Gelderland", categorie: "Provincie", interviewed: true,
    beschrijving: "Regisserende overheid voor ruimtelijke ordening, economie en natuur in Gelderland. Heeft 'Het Nieuwe Normaal' (HNN) opgesteld als adviesraamwerk voor circulair bouwen in gemeenten. Loopt tenderregeling met subsidies voor duurzame bouwprojecten.",
    standpunt: "Provincie heeft HNN ontwikkeld om gemeenten dezelfde circulaire taal te laten spreken. Stimuleert kennisdeling via subsidies zodat innovaties niet binnen interne bedrijfskringen blijven.",
    citaten: [
      "\"Het nieuwe normaal bevat uitgebreide circulaire definities, keurmerken en standaarden die bedrijven, projectontwikkelaars en gemeenten houvast geven — 'dezelfde taal spreken'.\"",
      "\"Gemeenten maken keuzes voor duurzame bouw zonder grensoverstijgende overwegingen. Teeltmogelijkheden uit Duitsland worden bijvoorbeeld niet meegenomen.\""
    ],
    notulenRefs: [1, 2, 4]
  },

  // === BOUWBEDRIJVEN (10) ===
  {
    id: 19, naam: "BAM Wonen", categorie: "Bouwbedrijf", interviewed: true,
    beschrijving: "Onderdeel van Royal BAM Group. Ontwikkelaar van het Flow-systeem: prefab houtbouwconcept met HSB-modules, CLT-kernen en betonnen fundering. Werkt met hout uit Oostenrijk en gerecyclede cellulose-isolatie.",
    standpunt: "BAM kiest bewust voor houtbouw: 'go big or go home'. Gelooft sterk in demontabel bouwen (80% van een Flow-woning is herbruikbaar, 35 droge verbindingen). Ervaart uitdagingen rondom sentiment (gehorig, brandgevaar) en tenders die ondanks houtbouweisen alsnog naar beton gaan.",
    citaten: [
      "\"De markt vraagt houtbouw maar kiest bij aanbesteding toch op laagste prijs. Binnen ~5 jaar verwachten we dat regelgeving en tenders echt meebewegen.\"",
      "\"Onze Flow-woning bestaat uit 35 elementen, 80% demontabel, droge verbindingen — zodat wat we nu bouwen in 40 jaar hergebruikt kan worden. Ontwikkelaars kijken daar helaas nog niet naar.\""
    ],
    notulenRefs: [0, 1, 3]
  },
  {
    id: 20, naam: "Klokgroep", categorie: "Bouwbedrijf", interviewed: true,
    beschrijving: "Regionale bouwgroep actief in woningbouw. CO2-doelstelling van 50% reductie vóór 2030. Houtbouw en biobased isolatie vormen 0-10% van huidige productie. Heeft een pilotproject in Wanrooij met biobased woningen.",
    standpunt: "Directe bouwkosten zijn doorslaggevend (biobased is 0-20% duurder). Wacht op opschaling voor lagere kosten. Gelooft dat vervuiler-betaalt principe biobased vanzelf goedkoper maakt.",
    citaten: [
      "\"Bouwkosten staan haaks op betaalbaar wonen. Biobased opschaling mist een fabriekingestelde aanpak — dat is de bottleneck.\"",
      "\"Weerstand tegen biobased is puur financieel. Zodra subsidies naar woningcorporaties gaan en de prijs daalt, verandert dat.\""
    ],
    notulenRefs: [0, 3]
  },
  {
    id: 21, naam: "Van Wijnen", categorie: "Bouwbedrijf", interviewed: true,
    beschrijving: "Landelijke bouwer (ook actief in regio Arnhem-Nijmegen) met 10 duurzaamheidsspecialisten fulltime. Experimenteert in renovatie met biobased dakelementen. Eerste 4 volledig biobased HSB-nieuwbouwwoningen afgerond. Gelooft in combinatie biobased én beton.",
    standpunt: "Biobased is onderdeel van de oplossing, geen vervanging van alles. Sociale aspect is het belangrijkste knelpunt: bouwteams moeten biobased willen. Certificering ziet men als pluspunt, niet als drempel.",
    citaten: [
      "\"Ik vind het sociale aspect het belangrijkste — daar zit de meeste tijd in. Als de bouwmannen de impact van nieuwe materialen echt voelen, dan volgt de rest.\"",
      "\"Begin met serieus kijken hoe je minder kán bouwen: meer renovatie, rijwoningen omzetten naar twee appartementen. Daarmee bespaar je al enorm veel materialen.\""
    ],
    notulenRefs: [0, 2, 4]
  },
  {
    id: 22, naam: "VolkerWessels", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Gedecentraliseerde bouwgroep met meerdere werkmaatschappijen. Actief in woningbouw, infra en vastgoed.",
    standpunt: "Heeft duurzaamheidsambitie maar laat initiatief bij werkmaatschappijen."
  },
  {
    id: 23, naam: "Dura Vermeer", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Bouw- en vastgoedonderneming, deelnemer aan Building Balance ketenproject Biobased Binnenplaat.",
    standpunt: "Positief over biobased, heeft eigen projecten maar zoekt opschaling."
  },
  {
    id: 24, naam: "Heijmans", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Geïntegreerde bouw- en ontwikkelingsonderneming. Deelnemer aan Building Balance ketenproject Biobased Binnenplaat. Heeft eigen CLT-ervaring.",
    standpunt: "Loopt voorop met CLT. Interesse in regionale biobased supply chains."
  },
  {
    id: 25, naam: "Hurks Bouwgroep", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Regionale aannemer, ook actief in Gelderland.",
    standpunt: "Volgt ontwikkelingen maar geen actieve biobased strategie."
  },
  {
    id: 26, naam: "Kondor Wessels", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Bouwbedrijf met focus op renovatie en transformatie van bestaand vastgoed.",
    standpunt: "Circulaire renovatie relevanter dan nieuwbouw voor dit bedrijf."
  },
  {
    id: 27, naam: "Ballast Nedam", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Grote aannemer met focus op integrale gebiedsontwikkeling.",
    standpunt: "Volgt marktstandaard, beperkte eigen biobased strategie."
  },
  {
    id: 28, naam: "TBI Holdings", categorie: "Bouwbedrijf", interviewed: false,
    beschrijving: "Groep van bouw- en techniekbedrijven, waaronder ERA Contour en Synchroon.",
    standpunt: "Duurzaamheidsambities aanwezig, biobased nog geen kernstrategie."
  },

  // === WONINGCORPORATIES (8) ===
  {
    id: 29, naam: "Talis", categorie: "Woningcorporatie", interviewed: true,
    beschrijving: "Woningcorporatie in Nijmegen met ca. 10.000 woningen. Focust op hoogbouw om grond maximaal te benutten. Heeft ervaring met de Strowijk Iewan (biobased). Sociale missie dwingt tot budgetmatig bouwen.",
    standpunt: "Biobased is haalbaar maar vereist bijzondere omstandigheden: grote woongroepen met eigen budget. Bij normale sociale huur houdt Talis zich aan het bouwbesluitminimum vanwege budgettaire druk. Milieu Investering Aftrek (MIA) biedt financieel voordeel.",
    citaten: [
      "\"We zijn budget-gebonden vanuit onze sociale missie. Talis doet weinig riskante innovaties en is afhankelijk van de status quo — tenzij woongroepen zelf budget meebrengen.\"",
      "\"Een ervaren voordeel van prefab bouwen is dat het aanzienlijk minder ruimte nodig heeft op de bouwplaats. Dát is praktisch relevant voor onze hoogbouw in Nijmegen.\""
    ],
    notulenRefs: [0, 3]
  },
  {
    id: 30, naam: "Portaal", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Een van de grootste woningcorporaties in Nederland, actief in Arnhem, Nijmegen en Utrecht. Groot renovatieprogramma.",
    standpunt: "Wil circulaire renovatie opnemen in meerjarenonderhoudsprogramma maar botst op financierbaarheid."
  },
  {
    id: 31, naam: "Vivare", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Woningcorporatie in Arnhem en omgeving met ruim 20.000 huurwoningen.",
    standpunt: "Heeft duurzaamheidsdoelen maar beperkte ervaring met biobased materialen."
  },
  {
    id: 32, naam: "Volkshuisvesting Arnhem", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Lokale corporatie gefocust op betaalbaar wonen in Arnhem.",
    standpunt: "Prioriteit ligt bij betaalbaarheid. Biobased interessant als prijs daalt."
  },
  {
    id: 33, naam: "Standvast Wonen", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Actief in Nijmegen en omgeving, relatief klein maar innovatiegericht.",
    standpunt: "Open voor pilots, wacht op bewezen aanpak vanuit grotere corporaties."
  },
  {
    id: 34, naam: "Woonstichting Gendt", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Kleine lokale woonstichting in de Betuwe.",
    standpunt: "Te kleine schaal voor eigen biobased beleid."
  },
  {
    id: 35, naam: "De Gemeenschap", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Woningcorporatie in het Gelderse rivierengebied.",
    standpunt: "Volgt sectorbreed beleid van Aedes rondom duurzaamheid."
  },
  {
    id: 36, naam: "Woonwaarts", categorie: "Woningcorporatie", interviewed: false,
    beschrijving: "Actief in de Gelderse Poort regio.",
    standpunt: "Geïnteresseerd maar beperkte capaciteit voor innovatietrajecten."
  },

  // === BRANCHEORGANISATIES (6) ===
  {
    id: 37, naam: "Building Balance", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Nationale ketenorganisatie die biobased bouwketens opzet tussen boeren, verwerkers en bouwers. Uitvoerder van meerdere NABB-projecten, ook in Gelderland ('Boeren voor Biobased Bouwen' en 'Samen Biobased Bouwen').",
    standpunt: "Aanjager van regionale ketenprojecten. Verbindt agrarische sector aan de bouwkolom."
  },
  {
    id: 38, naam: "Bouwend Nederland", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Grootste brancheorganisatie voor bouw- en infrabedrijven. Lobbyist richting overheid, kennisdeler.",
    standpunt: "Steunt biobased transitie maar benadrukt dat regelgeving en normering eerst op orde moeten."
  },
  {
    id: 39, naam: "Aedes", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Koepelvereniging van woningcorporaties. Stelt sectorbreed duurzaamheidsbeleid op.",
    standpunt: "Heeft biobased opgenomen in routekaart naar nul-emissie woningen in 2050."
  },
  {
    id: 40, naam: "Dutch Green Building Council (DGBC)", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Platform voor duurzame gebouwde omgeving, beheert BREEAM-NL certificering.",
    standpunt: "BREEAM-NL biedt kader voor circulair bouwen. Onderzoekt samenhang met Het Nieuwe Normaal."
  },
  {
    id: 41, naam: "Bond van Nederlandse Architecten (BNA)", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Beroepsorganisatie voor architecten. Aandacht voor circulair ontwerp en biobased materialen.",
    standpunt: "Architecten zijn koploper in biobased ontwerp, maar botsen op conservatieve opdrachtgevers."
  },
  {
    id: 42, naam: "NEPROM", categorie: "Brancheorganisatie", interviewed: false,
    beschrijving: "Vereniging van projectontwikkelaars. Behartigt belangen bij gebiedsontwikkeling.",
    standpunt: "Wil duidelijkheid over biobased normen voordat structureel geïnvesteerd wordt."
  },

  // === KENNISINSTELLINGEN (5) ===
  {
    id: 43, naam: "HAN Hogeschool Arnhem en Nijmegen", categorie: "Kennisinstelling", interviewed: false,
    beschrijving: "Grootste regionale hogeschool met lectoraten rondom duurzame gebouwde omgeving en circulaire economie. Leidt toekomstige bouwprofessionals op.",
    standpunt: "Wil kennisplatform worden voor biobased in de regio. Vraag vanuit de sector loopt achter op kennis die opgeleid wordt."
  },
  {
    id: 44, naam: "Radboud Universiteit", categorie: "Kennisinstelling", interviewed: false,
    beschrijving: "Gerenommeerde universiteit in Nijmegen met expertise in beleidsanalyse, bestuurskunde en omgevingsrecht.",
    standpunt: "Analyseert institutionele barrières voor biobased bouwen. Transitie faalt op institutionele lock-in, niet op technische haalbaarheid."
  },
  {
    id: 45, naam: "TNO", categorie: "Kennisinstelling", interviewed: false,
    beschrijving: "Nationale kennisorganisatie voor toegepast-wetenschappelijk onderzoek, inclusief bouw en materialen.",
    standpunt: "Heeft biobased materialen technisch gevalideerd. Opschaling is nu de focus."
  },
  {
    id: 46, naam: "Wageningen University & Research", categorie: "Kennisinstelling", interviewed: false,
    beschrijving: "Internationaal toonaangevend op biobased grondstoffen, vezelgewassen en circulaire economie.",
    standpunt: "Heeft kennis over agrarische biobased grondstoffen maar link met bouwketen is nog zwak."
  },
  {
    id: 47, naam: "Cirkelstad", categorie: "Kennisinstelling", interviewed: false,
    beschrijving: "Nationaal platform voor circulair bouwen. Stelt biobased bouwen 5-10% duurder dan conventioneel. Wordt door Provincie Gelderland aangehaald als goed voorbeeld.",
    standpunt: "Biobased bouwen is nu 'net uit de pilots' fase. Opschaling vereist een andere businesscase."
  },

  // === RIJKSOVERHEID (3) ===
  {
    id: 48, naam: "Ministerie van BZK", categorie: "Rijksoverheid", interviewed: false,
    beschrijving: "Verantwoordelijk voor Volkshuisvesting en de coördinatie van de Nationale Aanpak Biobased Bouwen (NABB). Coördineert doelen: 30% nieuwbouwwoningen met ≥30% biobased materialen in 2030.",
    standpunt: "Erkent dat MPG-eis niet ideaal is voor korte termijn klimaatdoelen. Heeft 25 mln euro fase 1 (2023-2025) toegewezen en beoogde 175 mln voor fase 2 (2025-2030)."
  },
  {
    id: 49, naam: "Rijksdienst voor Ondernemend Nederland (RVO)", categorie: "Rijksoverheid", interviewed: false,
    beschrijving: "Uitvoeringsorganisatie die NABB-subsidies en monitoring uitvoert. Opzet monitoringsprogramma voor alle biobased bouwprojecten in NL.",
    standpunt: "Biedt subsidies voor biobased innovatie. Monitoringsprogramma biobased projecten in ontwikkeling."
  },
  {
    id: 50, naam: "Rijkswaterstaat", categorie: "Rijksoverheid", interviewed: false,
    beschrijving: "Beheert rijkswegen en -wateren. Relevant voor biobased in grond-, weg- en waterbouw.",
    standpunt: "Experimenteert met biobased in infra-toepassingen. Beperkt relevant voor woningbouw."
  }
];

// ============================================================
// TRENDS
// Gebaseerd op: Trendanaylse.pdf, NABB (2023), interviews,
// en DOC 1-5 uit eigen onderzoek
// ============================================================

const TRENDS = [
  {
    id: 1,
    titel: "Kosten: biobased vs. conventioneel",
    icon: "trending-up",
    beschrijving: "Biobased bouwmaterialen zijn gemiddeld 5–10% duurder dan conventionele alternatieven (Cirkelstad, 2020). Voor specifieke isolatietoepassingen loopt het verschil op tot 40% (GMR-onderzoek DOC 1). Directe bouwkosten zijn voor alle geïnterviewde marktpartijen de doorslaggevende drempel — maar levensduurkosten en demonteerwaarde draaien dit beeld om.",
    impact: "hoog",
    tijdlijn: "kort",
    stat: [
      { waarde: "5–10%", label: "Gemiddelde meerkosten biobased" },
      { waarde: "3 jr", label: "Terugverdientermijn via energie" },
      { waarde: "–30%", label: "Kostendaling bij seriebouw" },
      { waarde: "7–12%", label: "Max. betalingsbereidheid kopers" }
    ],
    details: "<strong>Materialenprijzen (GMR-onderzoek):</strong> Vlasisolatie €21/m² vs glaswol €8–23/m² (vergelijkbare Rd-waarde). Hennepbetonblokken: €47/m². Stro-isolatie: €12–18/m². Opschaling en seriebouw kunnen het prijsverschil terugdringen naar 3–5% (BAM-schatting).<br><br><strong>Wat zeggen de geïnterviewden:</strong> Klokgroep (Thijs Pleijhuis): <em>'Weerstand is puur financieel — onze kopers zijn bereid 7–12% meer te betalen als het verhaal klopt.'</em> BAM (Tom Stolker): <em>'Hogere restwaarde van demontabele houtbouw compenseert de meerkosten op termijn.'</em> Van Wijnen: <em>'Zodra certificering standaard wordt en volumes stijgen, verdwijnt de meerprijs.'</em><br><br><strong>HNN-perspectief:</strong> Het Nieuwe Normaal-kostenperspectief toont aan dat specifieke maatregelen (losmaakbaarheid, herkomst materialen) kostenneutraal of zelfs kostenverlagend zijn op levensduur. De businesscase verschuift als opdrachtgevers Total Cost of Ownership hanteren.",
    bronnen: [
      { label: "GMR Onderzoek DOC 1: Huidig areaal & volume biobased materialen", bestand: "1 Huidig areaal en volume biobased bouwmaterialen.docx" },
      { label: "HNN Kostenperspectief — analyse meerkosten en terugverdieneffecten", bestand: "het-nieuwe-normaal-vanuit-kostenperspectief.pdf" },
      { label: "Interview Thijs Pleijhuis — Klokgroep (30 maart 2026)", bestand: "Interviews/Interview 30 3 2026 T Pleijhuis Klokgroep.docx" },
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" },
      { label: "ING Strategy Paper: Biobased bouw versnellen", bestand: "ING Strategy Paper - Biobased (land)bouw, samen sterk maar hoe te versnellen (1).pdf" },
      { label: "Woningconcepten en hun prestaties — kostenvergelijking prefab", bestand: "Woningconcepten-en-hun-prestaties_10.pdf" }
    ]
  },
  {
    id: 2,
    titel: "Het Nieuwe Normaal als beleidskader",
    icon: "landmark",
    beschrijving: "Provincie Gelderland heeft 'Het Nieuwe Normaal' (HNN) ontwikkeld als circulair bouwraamwerk met 12 maatregelcategorieën. HNN biedt definitielijsten, keurmerken en aanbestedingsstandaarden zodat alle partijen 'dezelfde taal spreken'. Het is het centrale beleidsinstrument in onze GMR-aanbevelingen.",
    impact: "hoog",
    tijdlijn: "middellang",
    stat: [
      { waarde: "12", label: "Maatregelcategorieën HNN" },
      { waarde: "8", label: "GMR-gemeenten in scope" },
      { waarde: "€200M+", label: "NABB-budget fase 1 + 2" },
      { waarde: "2024", label: "Juridische toetsing gereed" }
    ],
    details: "<strong>Wat is HNN:</strong> Een raamwerk van Provincie Gelderland met leidraden voor nieuwbouw, bestaande bouw, sloop, openbare ruimte en infra. De 12 maatregelcategorieën omvatten o.a. losmaakbaarheid, herkomst materialen, MPG, adaptief vermogen en CO2-opslag.<br><br><strong>Juridische positie:</strong> Een juridische toetsing (2024) bevestigt dat HNN-eisen rechtmatig zijn op te nemen in aanbestedingen — mits proportioneel toegepast. Dit neemt een grote barrière weg voor gemeenten.<br><br><strong>Wat zeggen de geïnterviewden:</strong> Myriam van Zetten (Provincie Gelderland): <em>'HNN is ons instrument voor gemeenten om dezelfde taal te spreken. Het bevat uitgebreide definities en keurmerken.'</em> Gemeente Nijmegen: <em>'HNN als grond voor circulaire eisen geeft ons houvast bij aanbestedingen.'</em><br><br><strong>Samenhang met andere kaders:</strong> HNN is vergeleken met BREEAM-NL, C2C, Betonakkoord en Bouwakkoord — dubbele certificering is efficiënt mogelijk. DGBC onderzoekt verdere integratie.",
    bronnen: [
      { label: "HNN Leidraad Nieuwbouw v1.2 — kernreferentie", bestand: "hnn-leidraad-nieuwbouw-1.2.pdf" },
      { label: "HNN Onderbouwing v1.0 — wetenschappelijke verantwoording", bestand: "HNN-onderbouwing-versie 1.0.pdf" },
      { label: "Juridische toetsing HNN (definitief) — aanbestedingsrecht", bestand: "Juridische-toetsing-Het-Nieuwe-Normaal---definitief.pdf" },
      { label: "Interview Myriam van Zetten — Provincie Gelderland", bestand: "Interviews/Interview Myriam van Zetten.docx" },
      { label: "Interview Maarten van Ginkel — Gemeente Nijmegen (2 april 2026)", bestand: "Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx" },
      { label: "HNN Vergelijking raamwerken en instrumenten v4", bestand: "hnn-vergelijking-raamwerk-en-instrumenten-v4.pdf" },
      { label: "Vergelijking BREEAM-NL Nieuwbouw met HNN", bestand: "Vergelijking-BREEAM-NL-Nieuwbouw-met-HNN.pdf" },
      { label: "Handreiking aanbesteden met HNN v1.0", bestand: "handreiking-aanbesteden-met-het-nieuwe-normaal-1.0.pdf" }
    ]
  },
  {
    id: 3,
    titel: "Vezelgewassenteelt en regionale ketens",
    icon: "package",
    beschrijving: "De Nationale Aanpak Biobased Bouwen (NABB, 2023) streeft naar 50.000 ha vezelteelt in 2030. Nu is slechts ~2.000 ha gerealiseerd (4% van het doel). In de GMR-regio loopt 'Boeren voor Biobased Bouwen Gelderland' via Building Balance, maar de agrarische sector en bouwketen zijn nog onvoldoende verbonden.",
    impact: "hoog",
    tijdlijn: "lang",
    stat: [
      { waarde: "2.000 ha", label: "Vezelteelt gerealiseerd (2023)" },
      { waarde: "50.000 ha", label: "NABB-doel 2030" },
      { waarde: "25×", label: "Benodigde verwerkingsgroei" },
      { waarde: "2,1%", label: "Biobased aandeel bouw 2019" }
    ],
    details: "<strong>Cijfers areaal (GMR-onderzoek DOC 1):</strong> Vezelhennep Gelderland: 120 ha (2023). Tarwe Gelderland: 6.955 ha (potentieel stro-restproduct). Nationale productie biobased bouwmaterialen in 2019: 2,1% van het totaal. NABB-doel 2030: 50.000 ha vezelgewassen, 30% van nieuwbouwwoningen biobased.<br><br><strong>Knelpunten keten:</strong> Lage teeltprijzen voor boeren (onzekere vraag). Onvoldoende verwerkingscapaciteit (moet 25× groter worden). Seizoensgebonden aanbod vs. jaarbehoefte bouwers. 'Missing link' in de keten is verwerking: van stro naar isolatieplaat. WeGrow kennisplatform werkt hieraan.<br><br><strong>Kansen GMR-regio:</strong> Druten/Lingewaard/Overbetuwe hebben agrarisch potentieel. Building Balance's ketenmodel 'Samen Biobased Bouwen' is schaalbaar naar de GMR. Carbon credits voor vezeltelers (€200–400/ton CO2) kunnen de teeltprijs economisch maken.",
    bronnen: [
      { label: "GMR Onderzoek DOC 1: Areaal en volume biobased materialen", bestand: "1 Huidig areaal en volume biobased bouwmaterialen.docx" },
      { label: "Kennisdossier Building Balance — ketenopbouw", bestand: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf" },
      { label: "Notitie Kennisplatform WeGrow 2024 — agrarische ketens", bestand: "Notitie Kennisplatform WeGrow (2024).pdf" },
      { label: "Factsheet Reststromen Agrarisch — stro & hennep", bestand: "Natuurverdubbelaars_factsheet-reststromen.pdf" },
      { label: "Interview Maarten van Ginkel — Gemeente Nijmegen", bestand: "Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx" },
      { label: "Transitieagenda Biobased Haven Rotterdam — logistiek model", bestand: "Transitie-agenda-Biobased-Haven-Rotterdam.pdf" }
    ]
  },
  {
    id: 4,
    titel: "Regelgeving: MPG, CPR en brandveiligheid",
    icon: "scale",
    beschrijving: "Regelgeving is de grootste bottleneck — niet kosten, niet technologie. Het Bouwbesluit en de MPG-norm zijn niet ingericht op biobased. De herziene EU Construction Products Regulation (CPR, 2026) kan dit versneld veranderen. Brandveiligheidsregels worden per gemeente anders geïnterpreteerd, wat biobased houtbouw structureel vertraagt.",
    impact: "hoog",
    tijdlijn: "middellang",
    stat: [
      { waarde: "€40.000", label: "Extra kosten brandveilig. per project" },
      { waarde: "3 wkn", label: "Vertragingsrisico per project" },
      { waarde: "2026", label: "EU CPR van kracht" },
      { waarde: "–20%", label: "Beoogde MPG-aanscherping BZK" }
    ],
    details: "<strong>MPG-problematiek:</strong> De Milieuprestatie Gebouwen (MPG) compenseert hoge uitstoot in de bouwfase met winst in latere fases — dit benadeelt biobased bouw die juist in de bouwfase scoort. Minister De Jonge wees de GWPa-eis (actueel klimaatimpact) af in 2023. GMR-onderzoek DOC 5 analyseert de gevolgen van (dreigende) afschaffing van de MPG-norm.<br><br><strong>CPR 2026:</strong> De herziene EU Construction Products Regulation schrijft EPD-gebaseerde milieuprestaties verplicht voor. Dit opent structureel deuren voor biobased materialen in de Nationale Milieudatabase (NMD).<br><br><strong>Brandveiligheid:</strong> BAM (Tom Stolker): <em>'Hetzelfde houtbouw-ontwerp wordt per gemeente anders beoordeeld — dit kost €40.000 en 3 weken per project.'</em> Van Wijnen wijst op hogere verzekeringspremies bij houtbouw. Myriam van Zetten: <em>'Vergunningsproces loopt significant achter op de daadwerkelijke bouw.'</em><br><br><strong>Aanbeveling:</strong> Nationaal brandveiligheidstestrapport (TNO/Building Balance) om per-gemeente-interpretatie te voorkomen.",
    bronnen: [
      { label: "GMR Onderzoek DOC 5: Vervallen MPG — gevolgenanalyse", bestand: "5. Vervallen MPG.docx" },
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" },
      { label: "Interview Myriam van Zetten — Provincie Gelderland", bestand: "Interviews/Interview Myriam van Zetten.docx" },
      { label: "Advies aan het Rijk IenW 2024/2025 — CPR & Bouwbesluit", bestand: "advies-aan-het-rijk-ienw-20242025.pdf" },
      { label: "Advies aan het Rijk VRO 2024/2025 — MPG & biobased", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "GMR Onderzoek DOC 3: Samenvatting overheidsbeleid BBB", bestand: "3. Samenvatting van het overheidsbeleid BBB.docx" }
    ]
  },
  {
    id: 5,
    titel: "Industrialisatie en prefab bouwconcepten",
    icon: "cpu",
    beschrijving: "De bouwsector vergrijst en krimpt in arbeidsaanbod. Prefab en fabrieksmatig bouwen nemen internationaal toe. BAM's Flow-systeem (35 droge verbindingen, 80% demontabel), Van Wijnen's HSB-concept en Klokgroep's pilot Wanrooij tonen dat industriële biobased bouw technisch haalbaar is — maar opschaling vraagt cultuurverandering.",
    impact: "midden",
    tijdlijn: "middellang",
    stat: [
      { waarde: "80%", label: "Demontabiliteit BAM Flow-systeem" },
      { waarde: "27%", label: "Lager GWP hybride CLT vs. beton" },
      { waarde: "50%", label: "CO₂-reductiedoel Klokgroep 2030" },
      { waarde: "½", label: "Vergunningstraject na typegoedkeuring" }
    ],
    details: "<strong>Flow-systeem (BAM Wonen):</strong> 35 droge verbindingen, 80% demontabel, prefab elementen in fabriek gemonteerd. BAM (Tom Stolker): <em>'Betonbouw is zwaar werk op de bouwplaats. Houtfabriekbouw is licht werk met machines.'</em> Typegoedkeuring lopende — kan vergunningstraject halveren.<br><br><strong>HSB-concept (Van Wijnen):</strong> Houtskeletbouw in combinatie met biobased isolatie. Bart Triep: <em>'Het sociale aspect is het belangrijkst — bouwmannen moeten de impact van nieuwe materialen voelen. Dat vergt meer tijd dan technische drempels.'</em><br><br><strong>Pilot Wanrooij (Klokgroep):</strong> CO2-reductiedoel 50% vóór 2030. Hybride CLT heeft 27% lager GWP dan conventioneel beton (Pierobon 2019).<br><br><strong>Structurele kans:</strong> Masterscriptie Wentholt (2024) bevestigt dat typegoedkeuringen en prefab-concepten de adoptiedrempel het meest effectief verlagen. Woningconcepten 2024 biedt een marktoverzicht van beschikbare prefab biobased concepten.",
    bronnen: [
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" },
      { label: "Aantekeningen Van Wijnen (10 april 2026)", bestand: "Aantekeningen van Wijnen 10-4.docx" },
      { label: "Interview Thijs Pleijhuis — Klokgroep (30 maart 2026)", bestand: "Interviews/Interview 30 3 2026 T Pleijhuis Klokgroep.docx" },
      { label: "Woningconcepten 2024 — marktoverzicht prefab biobased", bestand: "woningconcepten2024-laatste-versie-web.pdf" },
      { label: "Masterthesis adoptie biobased materialen — Koen Wentholt", bestand: "Master Thesis Adoption of Biobased Building Materials Koen Wentholt s1044006 (1).pdf" },
      { label: "GMR Onderzoek DOC 4: Hybride bouwen voor starters", bestand: "4. Hybride Bouwen for starters.docx" }
    ]
  },
  {
    id: 6,
    titel: "Carbon credits en CO₂-opslagvergoedingen",
    icon: "leaf",
    beschrijving: "Biobased materialen slaan CO₂ op voor de levensduur van een gebouw. Het Climate Cleanup Protocol v1.0 biedt €3.500–6.000 per woning als vergoeding voor biogene CO₂-opslag. De markt is nog onvolwassen — verificatie, standaardisering en beleidsverankering ontbreken — maar het potentieel om de biobased businesscase volledig sluitend te maken is enorm.",
    impact: "hoog",
    tijdlijn: "middellang",
    stat: [
      { waarde: "€3.500–6.000", label: "Carbon credits per woning" },
      { waarde: "8 ton", label: "CO₂-opslag per biobased woning" },
      { waarde: "2026", label: "BZK herziening MPG-rekenmethode" },
      { waarde: "18 mnd", label: "Gem. doorlooptijd materiaaltoelating" }
    ],
    details: "<strong>Biogene koolstofopslag:</strong> Biobased bouwmaterialen (hout, hennep, stro) binden CO₂ tijdens de groei en slaan dit op gedurende de levensduur van het gebouw. Per biobased woning gaat het om circa 8 ton CO₂ die decennialang gebonden blijft — een waarde die in de MPG-berekening nog onvoldoende wordt erkend.<br><br><strong>Climate Cleanup Protocol:</strong> Climate Cleanup v1.0 biedt €3.500–6.000 per woning als vergoeding voor biogene CO₂-opslag. Verificatiekosten en het ontbreken van een erkende standaard maken het nu nog niet bankable. BAM (Tom Stolker): <em>'Over drie tot vijf jaar wordt dit een serieuze bijdrage — wij houden dit nauwgezet in de gaten.'</em><br><br><strong>Beleidsmatige ontwikkeling:</strong> BZK heeft toegezegd de MPG-rekenmethodiek voor biobased CO₂-opslag vóór 2026 te herzien. Een verlaging van de MPG-eis met 20% maakt biobased materialen automatisch concurrerend — zonder directe subsidie. Samen met EZK wordt verkend of het ETS-regime uitgebreid kan worden naar biogene koolstofopslag in gebouwen.<br><br><strong>Ketenvraag:</strong> Onduidelijk is wie de credits incasseert — materiaalproducent, bouwer of gebouweigenaar. Building Balance werkt aan een sectorstandaard om dit te normeren. Als dit lukt, zijn de meerkosten van biobased bouw volledig gedekt.",
    bronnen: [
      { label: "Advies aan het Rijk VRO 2024/2025 — MPG & biobased", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Advies aan het Rijk IenW 2024/2025 — CPR & carbon", bestand: "advies-aan-het-rijk-ienw-20242025.pdf" },
      { label: "Kennisdossier Building Balance — CO₂-opslag en paspoorten", bestand: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf" },
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" }
    ]
  },
  {
    id: 7,
    titel: "Arbeidsmarkt en biobased vakmanschap",
    icon: "hard-hat",
    beschrijving: "Biobased bouw vereist andere vaardigheden dan conventioneel bouwen: droge verbindingen, vochtmanagement van organische materialen, dampopen constructies en nieuwe detailleringstechnieken. De huidige MBO-curricula sluiten hier onvoldoende op aan. De bouwsector kampt al met een structureel tekort aan vakmensen — de transitie naar biobased maakt dit acuter.",
    impact: "hoog",
    tijdlijn: "kort",
    stat: [
      { waarde: "10", label: "Doel erkende leerbedrijven 2026" },
      { waarde: "5 jr", label: "Benodigde opleidingstijd nieuw MBO-profiel" },
      { waarde: "15%", label: "Projectmanagementtijd aan vergunningdiscussies" },
      { waarde: "2026", label: "NABB-middelen voor leermateriaal beschikbaar" }
    ],
    details: "<strong>Andere competenties:</strong> Biobased bouw vraagt om kennis van droge verbindingen, demontabel bouwen, vochtgedrag van organische materialen en nieuwe brandveiligheidsdetails. BAM heeft intern een biobased bouwteam opgebouwd. Van Wijnen (Bart Triep): <em>'Het sociale aspect is het belangrijkst — bouwmannen moeten de impact van nieuwe materialen voelen. Dat vergt meer tijd dan technische drempels.'</em><br><br><strong>Opleidingsachterstand:</strong> Het MBO-curriculum verandert traag. Bouwend Nederland pleit voor een 'biobased bouwprofiel' in de kwalificatiestructuur van SBB. De Provincie Gelderland financiert via HNN praktijkleertrajecten, maar dit zijn druppels op een gloeiende plaat.<br><br><strong>NABB-aanpak:</strong> De NABB reserveert binnen fase 1 middelen voor leermateriaal en praktijkprogramma's met SBB en MBO Raad. Doel: minimaal tien erkende leerbedrijven voor biobased bouw in 2026. Bouwend Nederland stelt dat dit onvoldoende is voor de gewenste transitiesnelheid.<br><br><strong>Schaalprobleem:</strong> Kleinere aannemers kunnen niet investeren in interne opleiding. Corporaties kunnen leerbedrijf-stageplaatsen aanbieden. Zolang biobased kennis sectorbreed schaars is, blijft de markt structureel krap.",
    bronnen: [
      { label: "Whitepaper GMR — vakmanschap en arbeidsmarkt", bestand: "Whitepaper GMR.pdf" },
      { label: "Advies aan het Rijk VRO 2024/2025 — arbeidsmarkt", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Aantekeningen Van Wijnen (10 april 2026)", bestand: "Aantekeningen van Wijnen 10-4.docx" },
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" }
    ]
  },
  {
    id: 8,
    titel: "Materialenpaspoorten en circulaire datastandaarden",
    icon: "clipboard-list",
    beschrijving: "Materialenpaspoorten leggen de samenstelling van een gebouw digitaal vast zodat materialen aan het einde van de levensduur teruggewonnen en hergebruikt kunnen worden. Gemeente Nijmegen en Provincie Gelderland stellen Madaster-registratie als eis voor gesubsidieerde projecten. De koppeling tussen BIM-model en materialenpaspoort is technisch nog niet naadloos.",
    impact: "midden",
    tijdlijn: "middellang",
    stat: [
      { waarde: "23", label: "Projecten Madaster-registratie via HNN" },
      { waarde: "€2 mln", label: "Materiaalrestwaarde per sloop 2040" },
      { waarde: "2025", label: "CSRD-rapportage verplicht groot mkb" },
      { waarde: "6 mnd", label: "Doel doorlooptijd materiaaltoelatingsatlas" }
    ],
    details: "<strong>Wat zijn materialenpaspoorten:</strong> Een digitaledocumentatie van alle materialen in een gebouw, vastgelegd in platforms als Madaster. Bij sloop of renovatie weet de eigenaar exact welke materialen herbruikbaar zijn. Gemeente Nijmegen verplicht Madaster-registratie bij gronduitgifte voor grotere projecten.<br><br><strong>Huidige stand:</strong> 23 HNN-projecten registreren al hun biobased materialen via Madaster. BAM (Tom Stolker): <em>'Als je kunt bewijzen dat biobased materialen over vijftig jaar nog waarde hebben, verandert de financieringslogica fundamenteel.'</em><br><br><strong>Koppeling BIM:</strong> BIM-gebruik is bij grote aannemers standaard, maar de koppeling naar een volledig gevuld materialenpaspoort kost extra tijd en discipline op de bouwplaats. Building Balance werkt aan een gestandaardiseerde template voor biobased materialen in de Madaster-database.<br><br><strong>CSRD-kans:</strong> De Corporate Sustainability Reporting Directive (CSRD) verplicht grotere bedrijven tot transparante CO₂-rapportage. Materialenpaspoorten zijn direct CSRD-klaar en geven marktpartijen een financieel argument om biobased te kiezen.",
    bronnen: [
      { label: "Kennisdossier Building Balance — materialenpaspoorten", bestand: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf" },
      { label: "Vergelijking BREEAM-NL Nieuwbouw met HNN — paspoortcriteria", bestand: "Vergelijking-BREEAM-NL-Nieuwbouw-met-HNN.pdf" },
      { label: "Interview Maarten van Ginkel — Gemeente Nijmegen", bestand: "Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx" },
      { label: "Interview Tom Stolker — BAM Wonen (22 april 2026)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" }
    ]
  },
  {
    id: 9,
    titel: "Woningcorporaties als launching customer",
    icon: "home",
    beschrijving: "Woningcorporaties beschikken over de schaal, langetermijnvisie en sociale missie die biobased bouw rechtvaardigt. Als launching customer kunnen ze de markt normaliseren — als biobased in de sociale huursector standaard wordt, dalen materiaalprijzen voor iedereen. Hun financiële speelruimte is echter krap door de Woningwet en huurprijsplafonds.",
    impact: "hoog",
    tijdlijn: "kort",
    stat: [
      { waarde: "32.000", label: "Woningen in GMR-inkoopcoalitie (potentieel)" },
      { waarde: "22%", label: "Kostendaling bij gezamenlijk inkopen" },
      { waarde: "36%", label: "MIA-investeringsaftrek biobased" },
      { waarde: "€175M", label: "NABB fase 2 incl. corporatieregeling" }
    ],
    details: "<strong>De corporatiekans:</strong> Corporaties bouwen op schaal, denken op lange termijn en kunnen de meerkosten van biobased (5–15%) over de exploitatieduur terugverdienen via lagere onderhoudskosten en hogere gezondheidswaarde. Talis (Melany Thijssen): <em>'Structurele financiering — zoals een revolverend fonds voor biobased corporatieprojecten — zou echt helpen.'</em><br><br><strong>Strowijk Iewan (Talis):</strong> Het eerste volledig biobased sociale huurcomplex in de GMR-regio. Gefinancierd via een combinatie van subsidies en innovatief aanbestedingsmodel. Woonlijst van 300 mensen voor 24 woningen bij oplevering.<br><br><strong>Inkoopcoalitie:</strong> Met Portaal, Vivare en andere GMR-corporaties bundelen is 32.000+ woningen volume bereikbaar. Gezamenlijk inkopen verlaagt de transactiekosten met 20–25% en maakt langjarige contracten met biobased leveranciers mogelijk.<br><br><strong>Beleidscontext:</strong> Aedes pleit bij BZK voor een specifieke subsidieregeling. NABB fase 2 reserveert middelen voor corporaties die biobased als structureel onderdeel van hun meerjarenplan opnemen. MIA/Vamil biedt 36% investeringsaftrek voor biobased nieuwbouw.",
    bronnen: [
      { label: "Interview Melany Thijssen — Talis Woningcorporatie", bestand: "Interviews/Talis interview met Melany Thijssen Beleidsadviseur Duurzaamheid en Vastgoed.docx" },
      { label: "Advies aan het Rijk VRO 2024/2025 — corporatiebeleid", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Interview Maarten van Ginkel — Gemeente Nijmegen", bestand: "Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx" },
      { label: "Whitepaper GMR — corporaties en launching customers", bestand: "Whitepaper GMR.pdf" }
    ]
  },
  {
    id: 10,
    titel: "Regionale voortrekkersstrategie en nationaal beleid",
    icon: "map-pin",
    beschrijving: "Als de GMR-regio strenge biobased eisen stelt terwijl andere regio's dat niet doen, kan dit leiden tot marktontwijking: ontwikkelaars bouwen elders. Tegelijk kan voortrekkerschap — als het juist gepositioneerd wordt als proeftuin voor nationaal beleid — innovatie aantrekken en de GMR versterken. De balans tussen ambitie en level playing field is kritisch.",
    impact: "hoog",
    tijdlijn: "kort",
    stat: [
      { waarde: "5", label: "Biobased voorloopgebieden NABB (potentieel)" },
      { waarde: "7–12%", label: "Meerkosten-grens marktontwijking koopsector" },
      { waarde: "2030", label: "Doel landelijke biobased bouwnorm" },
      { waarde: "3 jr", label: "Ambitie: GMR-aanpak → nationale standaard" }
    ],
    details: "<strong>Risico marktontwijking:</strong> NEPROM waarschuwt dat regionaal gedifferentieerde duurzaamheidseisen investeringszekerheid ondermijnen. Als de meerkosten in de GMR structureel 7–12% hoger liggen dan in andere regio's, verplaatsen projecten zich. Klokgroep (Thijs Pleijhuis): <em>'Er is een grens — die ligt ergens tussen zeven en twaalf procent meerkosten.'</em><br><br><strong>Kans als proeftuin:</strong> Het Ministerie van BZK ziet de GMR expliciet als proeftuin voor nationale normering. Een succesvolle GMR-aanpak kan direct vertaald worden naar een nationale eis in het Bouwbesluit (NABB actielijn 6). Building Balance positioneert de GMR als één van vijf potentiële 'biobased voorloopgebieden'.<br><br><strong>HNN als vehikel:</strong> Provincie Gelderland positioneert HNN bewust als stimuleringsprogramma, niet als verplichtend stelsel — juist om marktontwijking te voorkomen. De strategie: koplopers zo snel mogelijk laten bewijzen dat biobased werkt, zodat andere regio's vanzelf aanhaken.<br><br><strong>Nationalisering essentieel:</strong> Gemeente Nijmegen: <em>'Wat wij nu als regio doen, moet over drie jaar landelijke standaard zijn.'</em> Bouwend Nederland stelt dat lessen uit de GMR snel nationaal verankerd moeten worden in het Bouwbesluit.",
    bronnen: [
      { label: "Whitepaper GMR — voortrekkersstrategie", bestand: "Whitepaper GMR.pdf" },
      { label: "Advies aan het Rijk VRO 2024/2025 — regionale aanpak", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Kennisdossier Building Balance — voorloopgebieden", bestand: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf" },
      { label: "Interview Maarten van Ginkel — Gemeente Nijmegen", bestand: "Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx" },
      { label: "Interview Thijs Pleijhuis — Klokgroep (30 maart 2026)", bestand: "Interviews/Interview 30 3 2026 T Pleijhuis Klokgroep.docx" }
    ]
  },
  {
    id: 11,
    titel: "Van vrijwillig naar verplicht — normalisering circulair bouwen",
    icon: "gavel",
    beschrijving: "De transitie naar circulair bouwen beweegt zich van vrijwilligheid naar normering. HNN is nu nog een adviesraamwerk, maar de richting is duidelijk: circulaire eisen worden verplicht onderdeel van aanbestedingen, gebiedsontwikkeling en het Bouwbesluit. Wie nu inzet op verankering loopt voor op wat over 3–5 jaar standaard is.",
    impact: "hoog",
    tijdlijn: "middellang",
    stat: [
      { waarde: "12", label: "HNN-maatregelcategorieën beschikbaar" },
      { waarde: "2024", label: "Juridische toetsing HNN gereed" },
      { waarde: "Vrijwillig", label: "Huidige status HNN" },
      { waarde: "2030", label: "Doeljaar landelijke biobased bouwnorm" }
    ],
    details: "<strong>Van advies naar norm:</strong> HNN biedt nu 12 maatregelcategorieën als vrijwillig raamwerk. De juridische toetsing (2024) bevestigt dat HNN-eisen rechtmatig kunnen worden opgenomen in aanbestedingen. Elke gemeente of corporatie die nu HNN structureel inbedt, positioneert zich vooruit op wat over 3–5 jaar landelijk verplicht wordt.<br><br><strong>Nationaal traject:</strong> De NABB-actielijn 6 richt zich op normering: biobased bouweisen opnemen in het Bouwbesluit vóór 2030. BZK beoogt dat 30% van de nieuwbouwwoningen in 2030 ≥30% biobased materiaalgebruik heeft. Dit traject verloopt via pilots in 'biobased voorloopgebieden' — de GMR heeft de positie en kennis om hierin koploper te worden.<br><br><strong>Risico: marktontwijking bij te snelle eisen:</strong> Klokgroep (Thijs Pleijhuis): <em>'Er is een grens — die ligt tussen zeven en twaalf procent meerkosten. Als je boven die grens uitkomt, bouwen partijen elders.'</em> Verankering moet dus samengaan met ondersteuning, subsidieregelingen en voldoende aanloopperiode voor marktpartijen.<br><br><strong>Aanbeveling:</strong> Maak HNN het standaardkader in alle regionale uitvragen. Start met de aanbestedingsfase — daar is de impact het grootst. Gebruik de Handreiking Aanbesteden met HNN als basisinstrument voor alle GMR-gemeenten.",
    bronnen: [
      { label: "HNN Leidraad Nieuwbouw v1.2 — kernreferentie", bestand: "hnn-leidraad-nieuwbouw-1.2.pdf" },
      { label: "Juridische toetsing HNN (definitief) — aanbestedingsrecht", bestand: "Juridische-toetsing-Het-Nieuwe-Normaal---definitief.pdf" },
      { label: "Handreiking aanbesteden met HNN v1.0", bestand: "handreiking-aanbesteden-met-het-nieuwe-normaal-1.0.pdf" },
      { label: "Advies aan het Rijk VRO 2024/2025 — normering biobased", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Interview Myriam van Zetten — Provincie Gelderland (HNN)", bestand: "Interviews/Interview Myriam van Zetten.docx" },
      { label: "Interview Thijs Pleijhuis — Klokgroep (marktontwijking)", bestand: "Interviews/Interview 30 3 2026 T Pleijhuis Klokgroep.docx" }
    ]
  },
  {
    id: 12,
    titel: "CO₂ als economische waarde — van milieubelasting naar financieel sturingsinstrument",
    icon: "leaf",
    beschrijving: "CO₂-opslag in biobased bouwmaterialen krijgt economische waarde via carbon credits, CO₂-labels en groene financiering. Een biobased woning slaat gemiddeld 8 ton CO₂ op — potentieel €3.500–6.000 per woning. De markt is onvolwassen maar 2026 is een kantelmoment: BZK herziet de MPG-methode en het climate credit-systeem maturiseert.",
    impact: "hoog",
    tijdlijn: "middellang",
    stat: [
      { waarde: "€3.500–6.000", label: "Carbon credits per biobased woning" },
      { waarde: "8 ton", label: "CO₂-opslag per biobased woning" },
      { waarde: "Onvolwassen", label: "Huidige status carbonmarkt gebouwen" },
      { waarde: "2026", label: "BZK-herziening MPG-rekenmethode" }
    ],
    details: "<strong>Biogene koolstofopslag:</strong> Biobased bouwmaterialen (hout, hennep, stro) binden CO₂ tijdens de groei en slaan dit op gedurende de levensduur van het gebouw. Per biobased woning gaat het om circa 8 ton CO₂ die decennialang gebonden blijft — een waarde die in de MPG-berekening nog onvoldoende wordt erkend. Climate Cleanup Protocol v1.0 biedt nu al €3.500–6.000 per woning als vergoeding voor biogene CO₂-opslag.<br><br><strong>Marktrijpheid en beleid:</strong> De carbon credits-markt voor gebouwen is nog onvolwassen. Verificatiekosten en het ontbreken van een erkende standaard maken het nu nog niet bankable. BAM (Tom Stolker): <em>'Over drie tot vijf jaar wordt dit een serieuze bijdrage — wij houden dit nauwgezet in de gaten.'</em> BZK heeft toegezegd de MPG-rekenmethodiek voor biobased CO₂-opslag vóór 2026 te herzien; een verlaging van de MPG-eis met 20% maakt biobased materialen automatisch concurrerend zonder directe subsidie.<br><br><strong>Risico: onvolwassen markt en discussie over betrouwbaarheid:</strong> Wie incasseert de credits — materiaalproducent, bouwer of gebouweigenaar? Building Balance werkt aan een sectorstandaard. Zolang deze vraag niet beantwoord is, blijft het moeilijk dit in aanbiedingen te verwerken. TNO berekende dat de Nederlandse nieuwbouwopgave tot 2030 bij volledig biobased uitvoering 10–15 megaton CO₂-equivalenten zou kunnen opslaan.<br><br><strong>Aanbeveling:</strong> Start een CO₂-label/carbon-creditpilot met GMR-corporaties en Rijksoverheid. Bouw databasis en rekenmethodiek op. Positioneer de GMR als testbedding voor de nationale bouwkoolstof-systematiek die BZK en EZK verkennen.",
    bronnen: [
      { label: "Advies aan het Rijk VRO 2024/2025 — MPG & biobased CO₂", bestand: "advies-aan-het-rijk-vro-20242025.pdf" },
      { label: "Advies aan het Rijk IenW 2024/2025 — carbon credits gebouwen", bestand: "advies-aan-het-rijk-ienw-20242025.pdf" },
      { label: "Kennisdossier Building Balance — CO₂-opslag en paspoorten", bestand: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf" },
      { label: "Interview Tom Stolker — BAM Wonen (carbon credits)", bestand: "Interviews/Interview 1 Tom Stolker 22-4.docx" },
      { label: "GMR Onderzoek DOC 5: Vervallen MPG — gevolgenanalyse", bestand: "5. Vervallen MPG.docx" }
    ]
  }
];

// ============================================================
// NOTULEN / INTERVIEW MATRIX
// Gebaseerd op de 6 afgenomen interviews (april 2026)
// Geïnterviewden: BAM (Tom Stolker), Gemeente Nijmegen
// (Maarten van Ginkel), Provincie Gelderland (Myriam van Zetten),
// Talis (Melany Thijssen), Klokgroep (Thijs Pleijhuis),
// Van Wijnen (Bart Triep)
// ============================================================

const INTERVIEWED_IDS = [1, 18, 19, 20, 21, 29];

// Geïnterviewde stakeholder IDs:
// 1=Gemeente Nijmegen, 18=Provincie Gelderland, 19=BAM Wonen,
// 20=Van Wijnen, 21=Klokgroep, 29=Talis
// Niet-geïnterviewd (standpunt o.b.v. bronnen):
// 37=Building Balance, 38=Bouwend NL, 39=Aedes, 40=DGBC, 42=NEPROM, 48=Ministerie BZK

const NOTULEN_QUESTIONS = [
  {
    id: 0,
    vraag: "Welke structurele belemmeringen staan de transitie naar biobased bouwen in de GMR-regio in de weg — en bij wie ligt de verantwoordelijkheid om ze weg te nemen?",
    toelichting: "Kern van ons onderzoek: alle geïnterviewde partijen zijn het erover eens dat regelgeving de grootste rem is, niet beschikbaarheid van materialen of technologie.",
    antwoorden: {
      1:  { type: "quote", citaat: "Bouwbedrijven willen biobased opnemen maar zeggen: er is binnen het projectbudget geen ruimte. De druk van de Rijksoverheid op snelle woningproductie snijdt onze circulaire ambities direct af.", sentiment: "kritisch" },
      18: { type: "quote", citaat: "Het vergunningsproces is significant trager dan de daadwerkelijke bouw. Schoonheidscommissies vinden biobased materialen soms 'minder mooi'. En per gemeente worden brandveiligheidseisen anders geïnterpreteerd.", sentiment: "kritisch" },
      19: { type: "quote", citaat: "Tenders schrijven houtbouw voor, maar bij de definitieve aanbesteding winnen betonbouwers gewoon op prijs. Dat is een structurele tegenstrijdigheid in het systeem.", sentiment: "kritisch" },
      20: { type: "quote", citaat: "Het sociale aspect is het allerbelangrijkste en wordt onderschat. Bouwteams moeten nieuwe materialen zélf willen. Dat culturele aspect kost meer tijd dan alle technische of financiële drempels samen.", sentiment: "neutraal" },
      21: { type: "quote", citaat: "Biobased is 0–20% duurder in directe bouwkosten. En die directe bouwkosten zijn voor elke bouwer de doorslaggevende factor. Pas als de prijs daalt door opschaling, of als 'vervuiler betaalt' echt wordt gehandhaafd, kantelt het.", sentiment: "kritisch" },
      29: { type: "quote", citaat: "We zijn budget-gebonden vanuit onze sociale missie. Biobased bouw kan alleen als er bijzondere omstandigheden zijn — zoals een woongroep die zelf bereid is meer te betalen.", sentiment: "kritisch" },
      38: { type: "standpunt", standpunt: "Bouwend Nederland stelt in het advies aan het Rijk (IenW, 2025) dat inconsistente brandveiligheidseisen per gemeente de grootste technische belemmering zijn voor opschaling van houtbouw. Nationaal uniformering via het Bouwbesluit is urgent.", sentiment: "kritisch", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk IenW 2024/2025" },
      48: { type: "standpunt", standpunt: "Het Ministerie van BZK erkent via de NABB (2023) dat de spanning tussen rijksdruk op woningproductie en kwaliteitseisen voor biobased bouw een bestuurlijk dilemma is. Snelheid en duurzaamheid gaan nu ten koste van elkaar — NABB fase 2 moet dit oplossen.", sentiment: "neutraal", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk VRO 2024/2025" },
      39: { type: "standpunt", standpunt: "Aedes signaleert in haar routekaart nul-emissie corporatiewoningen dat financierbaarheid de kernbelemmering is voor woningcorporaties. De hogere initiële investering van biobased bouw verdient zich terug op levensduur, maar corporaties financieren op jaarlijkse kasstroom, niet op levensduur.", sentiment: "kritisch", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk VRO 2024/2025" },
      45: { type: "standpunt", standpunt: "TNO-onderzoek toont aan dat biobased materialen gemiddeld 10–20% duurder zijn in aanschaf, maar dat de totale levenscycluskosten (LCA) gunstiger uitvallen zodra CO₂-beprijzing en onderhoudsvoordelen worden meegenomen. De ontbrekende internalisering van externe kosten is de kern van het probleem: fossiele materialen dragen hun klimaatschade niet in de marktprijs. TNO pleit voor een gecombineerde aanpak van subsidies en heffingen om dit marktfalen te corrigeren.", sentiment: "kritisch", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      47: { type: "standpunt", standpunt: "Cirkelstad signaleert dat de financieringsdrempel voor biobased bouw niet zozeer een kostenvraagstuk is, maar een waarderingsvraagstuk: banken en taxateurs kennen biobased panden geen hogere marktwaarde toe, waardoor de businesscase voor opdrachtgevers niet sluit. Cirkelstad werkt met haar netwerk van frontrunners aan het documenteren van gerealiseerde projecten om aantoonbaar residuele waarde te creëren en zo de financieringslogica te doorbreken.", sentiment: "kritisch", bron: "https://www.cirkelstad.nl", bronLabel: "Cirkelstad.nl" },
      49: { type: "standpunt", standpunt: "RVO beheert meerdere subsidieregelingen (waaronder de ISDE en de Versnellingsagenda Biobased Bouwen) die biobased toepassingen deels ondersteunen, maar constateert dat de aanvraagprocedures te complex zijn voor kleinere bouwpartijen. RVO zet in op vereenvoudiging van het instrumentarium en betere toegankelijkheid voor mkb-aannemers, en ondersteunt via de Versnellingsagenda Biobased Bouwen concrete proefprojecten in regio's als de GMR.", sentiment: "neutraal", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" }
    }
  },
  {
    id: 1,
    vraag: "Welke rol speelt Het Nieuwe Normaal (HNN) in aanbestedingen en beleid bij uw organisatie — en wat is er nodig om HNN van vrijwillig naar verplicht te brengen?",
    toelichting: "HNN is het meest genoemde instrument in ons onderzoek. De centrale vraag: werkt het als vrijwillig raamwerk, of heeft het een wettelijke basis nodig?",
    antwoorden: {
      1:  { type: "quote", citaat: "We kennen HNN, maar onze aanbestedingen volgen vooralsnog de Bouwbesluit-minimumnormen. HNN als verplichte grond voor circulaire aanbestedingseisen zou ons wél houvast geven tegenover marktpartijen.", sentiment: "neutraal" },
      18: { type: "quote", citaat: "HNN is ons instrument voor gemeenten om dezelfde taal te spreken. Het bevat uitgebreide definities, keurmerken en standaarden. Maar zolang het vrijwillig is, lopen gemeenten uiteen in ambitie.", sentiment: "positief" },
      19: { type: "quote", citaat: "HNN biedt een raamwerk, maar vraagt om typegoedkeuringen die vergunningstrajecten kunnen halveren. We werken aan zo'n traject. Als dit slaagt, wordt elke volgende woning sneller vergund.", sentiment: "positief" },
      20: { type: "quote", citaat: "HNN is een stap vooruit. De echte verandering zit in gedrag van bouwteams. Certificering an sich is voor ons geen probleem — we kiezen altijd gecertificeerde producten.", sentiment: "positief" },
      21: { type: "quote", citaat: "HNN helpt om circulaire ambities te concretiseren in taal die bouwers begrijpen. Maar zolang de Rijksoverheid op snelheid stuurt en niet op kwaliteit, blijft het een regionaal instrument zonder landelijk draagvlak.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "We hanteren qua duurzaamheid het Bouwbesluit-minimum. Als gemeente of provincie HNN verplicht zou stellen, worden wij gedwongen tot hogere ambities — met directe gevolgen voor onze huurprijzen.", sentiment: "kritisch" },
      40: { type: "standpunt", standpunt: "De Dutch Green Building Council (DGBC) heeft vastgesteld dat HNN en BREEAM-NL op 78% van de credits vergelijkbaar zijn. Dubbele certificering is efficiënt mogelijk. DGBC ondersteunt integratie van HNN-eisen in BREEAM-NL projecten in de GMR-regio.", sentiment: "positief", bron: "Vergelijking-BREEAM-NL-Nieuwbouw-met-HNN.pdf", bronLabel: "Vergelijking BREEAM-NL met HNN" },
      37: { type: "standpunt", standpunt: "Building Balance verzorgt de dossiereigenaren voor biobased materialen binnen het HNN-raamwerk. Zij stellen vast dat voor biobased materialen certificering via HNN de marktadoptie significant versnelt — maar dat de ontbrekende schakel de juridische zekerheid bij aanbesteding is.", sentiment: "neutraal", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Kennisdossier Building Balance" },
      41: { type: "standpunt", standpunt: "De BNA onderschrijft de ambities van Het Nieuwe Normaal als richtinggevend kader voor duurzame nieuwbouw, maar wijst erop dat het huidige Bouwbesluit en de bijbehorende NEN-normering nog onvoldoende zijn afgestemd op biobased materialen. Architecten lopen in de praktijk aan tegen ontbrekende prestatie-eisen voor eigenschappen zoals vochtregulatie en koolstofopslag, wat de integratie van HNN in bestekken bemoeilijkt. De BNA pleit voor geharmoniseerde productstandaarden als randvoorwaarde voor brede toepassing.", sentiment: "neutraal", bron: "hnn-leidraad-nieuwbouw-1.2.pdf", bronLabel: "HNN Leidraad Nieuwbouw v1.2" },
      47: { type: "standpunt", standpunt: "Cirkelstad ziet Het Nieuwe Normaal als een waardevol marktprikkelend instrument, maar benadrukt dat vrijwillige keurmerken alleen onvoldoende zijn om de markt te kantelen. Zonder verplichte toepassing in gemeentelijke gronduitgifte- en aanbestedingsbeleid blijft HNN een opt-in voor koplopers. Cirkelstad roept gemeenten in de GMR op om HNN als minimumeisen op te nemen in erfpacht- en gronduitgiftecontracten, zoals al gebeurt in Amsterdam en Haarlem.", sentiment: "kritisch", bron: "https://www.cirkelstad.nl", bronLabel: "Cirkelstad.nl" },
      49: { type: "standpunt", standpunt: "RVO ziet HNN als een nuttige aanvulling op het Bouwbesluit en ondersteunt pilots via het programma Biobased Bouwen. Tegelijkertijd wijst RVO erop dat de juridische borging van HNN-eisen in bestemmingsplannen en vergunningverlening nog niet is uitgekristalliseerd: de Juridische toetsing van HNN (2023) laat zien dat gemeenten wel ruimte hebben maar ook risico's lopen bij niet-uniforme toepassing. RVO adviseert een gestandaardiseerd uitvoeringsprotocol voor gemeenten.", sentiment: "neutraal", bron: "Juridische-toetsing-Het-Nieuwe-Normaal---definitief.pdf", bronLabel: "Juridische toetsing HNN" }
    }
  },
  {
    id: 2,
    vraag: "Hoe realistisch is de businesscase van biobased bouwen vandaag — welke voorwaarden zijn nodig om het financieel aantrekkelijk te maken voor uw organisatie?",
    toelichting: "De businesscase-vraag is essentieel: is biobased bouwen nu al financieel aantrekkelijk, of is het nog een principeproject? Antwoorden lopen sterk uiteen per type organisatie.",
    antwoorden: {
      1:  { type: "quote", citaat: "Circulair bouwen leidt op termijn tot lagere grondstoffenkosten door stijgende delfstoffen-prijzen. En het is innovatiever voor de arbeidsmarkt — houtfabriekbouw trekt een andere generatie bouwers.", sentiment: "neutraal" },
      18: { type: "quote", citaat: "Circulair bouwen is 'net uit de pilots' fase. Er is nog geen sluitende businesscase voor biobased teelten onder de huidige marktomstandigheden — maar carbon credits als additionele stroom gaan dat structureel veranderen.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "Beton heeft een restwaarde die significant lager is dan een demonteerbare houtbouwwoning. Maar ontwikkelaars en corporaties kijken naar aankoopprijs, niet naar levensduurkosten. Dat moet veranderen.", sentiment: "kritisch" },
      20: { type: "quote", citaat: "Bij grondgebonden laagbouw werkt de businesscase al goed. Bij hogere bouw is brandverzekering een probleem: hogere premie door vochtrisico. Dat maakt de vergelijking met beton lastiger.", sentiment: "neutraal" },
      21: { type: "quote", citaat: "0–20% hogere directe kosten. Subsidies moeten naar woningcorporaties gaan, niet naar particuliere koopwoningen. Corporaties hebben de schaal en de maatschappelijke missie om de transitie te trekken.", sentiment: "kritisch" },
      29: { type: "quote", citaat: "De MIA (Milieu Investeringsaftrek) biedt ons directe financiële steun. Maar we hebben budget per woning op basis van sociale huurprijzen. De businesscase werkt structureel niet op sociale huur-schaal zonder aanvullende subsidie.", sentiment: "kritisch" },
      48: { type: "standpunt", standpunt: "Het Ministerie van BZK heeft voor NABB fase 1 (2023–2025) €25 mln beschikbaar gesteld en beoogt €175 mln voor fase 2 (2025–2030). Doel: de businesscase voor corporaties en gemeenten sluitend maken via directe subsidie en verlenging van de levensduurrekening. Carbon credits worden expliciet als aanvullend instrument benoemd.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk VRO 2024/2025" },
      37: { type: "standpunt", standpunt: "Building Balance stelt op basis van hun ketenprojecten dat de businesscase al werkt voor specifieke toepassingen (HSB-constructie, biobased isolatie). Ketenopbouw en volume-zekerheid zijn de twee ontbrekende ingrediënten voor een bredere businesscase.", sentiment: "neutraal", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Kennisdossier Building Balance" },
      46: { type: "standpunt", standpunt: "Wageningen University & Research heeft in kaart gebracht dat de Gelderse regio een aanzienlijk potentieel heeft voor regionale biobased grondstoffen: reststromen uit de fruitteelt (Betuwe), hout uit landschapsbeheer en riet uit uiterwaarden zijn onderbenut. WUR benadrukt dat ketenregie en verwerkingscapaciteit de zwakke schakels zijn: een regionale hub die vraag en aanbod structureel koppelt ontbreekt nog. Opschaling vraagt om publiek-private investeringen in verwerkingsinfrastructuur op regionale schaal.", sentiment: "neutraal", bron: "Master Thesis Adoption of Biobased Building Materials Koen Wentholt s1044006 (1).pdf", bronLabel: "Masterthesis Wentholt 2024" },
      23: { type: "standpunt", standpunt: "Dura Vermeer heeft als grote aannemer ervaring met de inzet van biobased materialen in grootschalige woningbouwprojecten en constateert dat regionale ketens nog niet de leveringszekerheid en kwaliteitsconsistentie bieden die vereist zijn voor seriematige bouw. Het bedrijf investeert zelf in ketenintegratie via vaste partnerships met leveranciers van houtskeletwanden en hennepbeton, maar geeft aan dat dit hoge voorinvesteringen vraagt die alleen rendabel zijn bij projectvolumes van minimaal 200 woningen.", sentiment: "kritisch", bron: "https://www.duravermeer.nl", bronLabel: "Dura Vermeer – duravermeer.nl" }
    }
  },
  {
    id: 3,
    vraag: "Wat zijn de kansen voor regionale ketensamenwerking in de GMR-regio — hoe verbindt u boeren, verwerkers en bouwers tot een werkende biobased keten?",
    toelichting: "De agrarische sector in de GMR-regio heeft potentieel (Druten, Lingewaard, Overbetuwe) maar is nog niet verbonden aan de bouwketen. Dit is een van de centrale kansen in ons onderzoek.",
    antwoorden: {
      1:  { type: "quote", citaat: "De processingsstap van landbouwproduct naar bouwmateriaal is de grootste bottleneck. Nijmegen heeft weinig landbouwgrond zelf, maar we kunnen als gemeente wel vraagzijde organiseren voor regionale boeren.", sentiment: "positief" },
      18: { type: "quote", citaat: "Building Balance-ketenmodel naar de GMR: boeren, verwerkers en bouwers contractueel verbinden. Gelderland heeft al 120 ha vezelhennep — dat is een begin. De overheid moet de eerste 3 jaar het risico dragen.", sentiment: "positief" },
      19: { type: "quote", citaat: "Ketenzekerheid is alles. Als wij als aannemer weten dat er over 5 jaar 10.000 ton biobased isolatie beschikbaar is, investeren we in de fabriek. Zonder die zekerheid nemen we het risico niet.", sentiment: "neutraal" },
      20: { type: "quote", citaat: "Begin met 4 woningen per project en schaal op als het werkt. Niet te vroeg de markt in met onrijpe ketens — zie wat er mis kan gaan als een grondstof seizoensgebonden is.", sentiment: "neutraal" },
      21: { type: "quote", citaat: "In de koopsector moeten we kopers meenemen in het verhaal: biobased wonen is een bewuste keuze. Dat is een marketingvraagstuk. Als dat lukt, creëert het stabiele vraag voor regionale ketens.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "Als corporatie kunnen wij ketenregie voeren: directe contracten met vezeltelers en een regionale verwerker. Talis wil dat via het Strowijk Iewan-model ook in Nijmegen uitrollen.", sentiment: "positief" },
      37: { type: "standpunt", standpunt: "Building Balance heeft in Gelderland het project 'Boeren voor Biobased Bouwen' opgezet: 8 boeren, 200 ha vezelhennep, één verwerker en 3 aannemers als afnemers. Dit model is direct schaalbaar naar de GMR-regio. De kritische massa voor een verwerkingsfaciliteit is 500 ton droge stof per jaar.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Kennisdossier Building Balance" },
      42: { type: "standpunt", standpunt: "NEPROM stelt dat projectontwikkelaars alleen structureel in biobased ketens investeren als er zekerheid is over normen en afzetmarkt. Een regionale GMR-norm (minimum biobased%) zou de benodigde marktvraag creëren voor een regionale verwerkingsfaciliteit.", sentiment: "neutraal", bron: "https://www.neprom.nl", bronLabel: "NEPROM – neprom.nl" }
    }
  },
  {
    id: 4,
    vraag: "Hoe kan de GMR-regio een voortrekkersrol spelen in de nationale biobased bouwtransitie — wat zijn de unieke kansen en wat zijn de risico's van vooruitlopen op nationaal beleid?",
    toelichting: "Dit is de kernvraag van ons beleidsadvies: hoe gebruikt de GMR haar regionale positie als katalysator, zonder dat gemeenten worden benadeeld door hogere kosten ten opzichte van andere regio's?",
    antwoorden: {
      1:  { type: "quote", citaat: "Via grondpolitiek: grond opkopen en stapsgewijs hogere circulaire percentages eisen per jaar. Dat nudgt bouwers zonder hen te overvragen. En het beschermt ons juridisch — marktpartijen accepteren dit als fair.", sentiment: "positief" },
      18: { type: "quote", citaat: "Regionale samenwerking via HNN als gemeenschappelijk taal. Subsidies via tenderregelingen zodat innovaties niet binnen bedrijven blijven maar breed worden gedeeld. De GMR als living lab voor nationaal beleid.", sentiment: "positief" },
      19: { type: "quote", citaat: "Typegoedkeuringen zijn de sleutel voor de GMR. Als Provincie en gemeenten typegoedkeuringstrajecten faciliteren voor biobased concepten, kan de regio significant sneller schalen dan de rest van Nederland.", sentiment: "positief" },
      20: { type: "quote", citaat: "Cultuurverandering aanpakken: bouwteams moeten de impact voelen van nieuwe materialen. Begin met pilots, vier de successen. Bouw een reputatie als 'biobased regio'. Dan komen de bouwers vanzelf.", sentiment: "positief" },
      21: { type: "quote", citaat: "Focus op opschaling vanuit wat werkt: klein beginnen, leren, dan schalen. Klokgroep doet dit per project 4 woningen meer biobased. Dat is de realistische weg, niet een volledig biobased stad in één keer.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "Gezamenlijk inkopen met Portaal, Vivare en andere GMR-corporaties verlaagt de transactiekosten met 20–25%. Bundeling creëert de vraagzijde die regionale ketens nodig hebben.", sentiment: "positief" },
      37: { type: "standpunt", standpunt: "Building Balance positioneert de GMR-regio als één van de vijf potentiële 'biobased voorloopgebieden' in Nederland. Voorwaarden: een gezamenlijke inkoopcommitment van minimaal 3 corporaties + 2 gemeenten, een regionale verwerkingsfaciliteit en HNN als verplicht aanbestedingskader.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Kennisdossier Building Balance" },
      48: { type: "standpunt", standpunt: "NABB actielijn 6 financiert regionale ketenprojecten expliciet. Het Ministerie van BZK ziet regio's als de GMR als proeftuin voor nationale normering. Een succesvolle GMR-aanpak kan direct worden vertaald naar een nationale eis in het Bouwbesluit.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk VRO 2024/2025" },
      44: { type: "standpunt", standpunt: "De Radboud Universiteit benadrukt vanuit beleidsanalytisch perspectief dat de effectiviteit van de GMR als voortrekker afhangt van institutionele inbedding en mandaat. Regionale samenwerking in Nederland kent een structureel probleem van vrijblijvendheid: zonder wettelijke grondslag of financiële prikkels verwateren ambities na verkiezingscycli. Radboud-onderzoekers adviseren de GMR om voortrekkersambities te koppelen aan concrete, meetbare mijlpalen en die te verankeren in de Omgevingsvisie.", sentiment: "neutraal", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      43: { type: "standpunt", standpunt: "De HAN Hogeschool beschouwt de GMR als een uitgelezen leeromgeving voor haar studenten en onderzoekers in bouw, duurzaamheid en ruimtelijke ordening. Als regionale hogeschool ziet de HAN een directe rol in het opleiden van vakmensen die de biobased ambities van de GMR kunnen uitvoeren. Tegelijkertijd waarschuwt de HAN dat voortrekkersstrategie zonder investeringen in regionaal onderwijs en omscholing een structureel personeelstekort in de biobased bouwsector zal opleveren.", sentiment: "positief", bron: "https://www.han.nl", bronLabel: "HAN Hogeschool – han.nl" }
    }
  },
  {
    id: 5,
    vraag: "Welke ervaringen hebben marktpartijen met brandveiligheidsregulering bij biobased bouw — en welke concrete harmonisering is nodig?",
    toelichting: "Brandveiligheid is de meest genoemde technische barrière: hetzelfde ontwerp met hennep- of stro-isolatie wordt in de ene gemeente goedgekeurd en in de andere afgekeurd. Gebrek aan geharmoniseerde toelatingsroutes vertraagt projecten en verhoogt kosten.",
    antwoorden: {
      1:  { type: "quote", citaat: "Wij merken dat bouwers soms maandenlang wachten op een brandveiligheidsoordeel, terwijl een vergelijkbaar project in een buurgemeente al is vergund. Dat is niet houdbaar. Nijmegen werkt aan een interne leidraad, maar wat we echt nodig hebben is een landelijke toelatingssystematiek voor biobased materialen zodat het wiel niet bij elke gemeente opnieuw uitgevonden hoeft te worden.", sentiment: "kritisch" },
      18: { type: "quote", citaat: "HNN adresseert dit expliciet: één van de twaalf maatregelen richt zich op het wegnemen van belemmeringen in het vergunningenproces. Gelderland ondersteunt gemeenten met technische kennis en probeert als provincie te zorgen dat interpretaties van het Bouwbesluit meer uniform worden toegepast. We zijn in gesprek met de Omgevingsdiensten om dat te stroomlijnen.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "Bij onze Flow-woningen hebben we inmiddels een routekaart door het brandveiligheidsproces ontwikkeld die we bij elk nieuw project inzetten. Maar het heeft ons twee projecten en veel tijd gekost om die kennis op te bouwen. Kleinere bouwers hebben die capaciteit niet. Certificering op materiaalniveau — zoals al bestaat voor traditionele bouwmaterialen — zou dit probleem grotendeels oplossen.", sentiment: "kritisch" },
      20: { type: "quote", citaat: "Onze mensen op de bouwplaats moeten weten wat ze doen als inspecteurs vragen stellen over brandgedrag van biobased isolatie. Dat vraagt om training, maar ook om duidelijke landelijke richtlijnen. Zolang elke inspecteur zijn eigen interpretatie hanteert, blijft biobased bouw voor veel bedrijven een te groot risico.", sentiment: "kritisch" },
      21: { type: "quote", citaat: "In de koopsector dragen kopers een deel van het risico zelf — maar als een brandverzekering hogere premies vraagt voor biobased woningen, is dat direct een verkoopargument dat wegvalt. We hebben bij twee projecten intensief overleg gehad met verzekeraars en brandweer voordat we groen licht kregen. Dat overleg zou eigenlijk al voorafgaand aan het ontwerp gestandaardiseerd moeten zijn.", sentiment: "kritisch" },
      29: { type: "quote", citaat: "Voor Strowijk Iewan hebben we in nauwe samenwerking met de brandweer een apart brandveiligheidsplan opgesteld. Dat kostte extra tijd en budget, maar gaf ons ook vertrouwen in het eindresultaat. Ik zou willen dat corporaties standaard kunnen terugvallen op een sectorbreed goedgekeurd protocol — dan hoef je dit wiel niet bij elk strowproject opnieuw uit te vinden.", sentiment: "neutraal" },
      37: { type: "standpunt", standpunt: "Building Balance signaleert in haar kennisdossier dat gebrek aan geharmoniseerde brandveiligheidseisen een van de grootste procesbelemmeringen is voor dossiereigenaren van biobased materialen. De organisatie pleit voor een nationaal erkend toetsingskader waarbinnen materiaalcertificaten direct als bewijs voor Bouwbesluit-conformiteit kunnen dienen.", sentiment: "kritisch", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier dossiereigenaren" },
      48: { type: "standpunt", standpunt: "De NABB (2023) erkent brandveiligheidsregulering als knelpunt en kondigt aan dat het Ministerie van BZK samen met RVO een 'toelatingsatlas' voor biobased materialen zal ontwikkelen. Fase 1 (€25M) reserveert middelen voor kennisontwikkeling en het opstellen van prestatie-eisen die aansluiten op het Bouwbesluit, zodat gemeenten en Omgevingsdiensten eenduidig kunnen toetsen.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      45: { type: "standpunt", standpunt: "TNO heeft uitgebreid onderzoek gedaan naar de brandprestaties van biobased materialen en concludeert dat de huidige Euroclass-normering (EN 13501) onvoldoende differentieert tussen behandelde en onbehandelde biobased materialen. Gemodificeerd hout en samengestelde bio-composieten presteren aanzienlijk beter dan de basisclassificatie suggereert. TNO pleit voor een aanvullend testprotocol dat de reële branddynamiek van biobased constructies beter weergeeft en zo een eerlijker speelveld creëert.", sentiment: "kritisch", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      41: { type: "standpunt", standpunt: "De BNA signaleert dat architecten in de ontwerpfase regelmatig stuiten op conservatieve interpretaties van brandveiligheidseisen door gemeentelijke brandweerkorpsen, wat leidt tot onnodige aanpassingen in biobased ontwerpen. Er is geen landelijk uniforme uitleg van de brandveiligheidstoets voor biobased materialen, wat tot willekeur tussen gemeenten leidt. De BNA pleit voor een nationaal kennisprogramma voor brandweer en bouw- en woningtoezicht om de beoordelingscapaciteit te harmoniseren.", sentiment: "kritisch", bron: "hnn-leidraad-nieuwbouw-1.2.pdf", bronLabel: "HNN Leidraad Nieuwbouw v1.2" },
      49: { type: "standpunt", standpunt: "RVO faciliteert via het programma Biobased Bouwen experimenteerruimte voor projecten die niet volledig voldoen aan bestaande brandveiligheidsregels, via de experimenteerbepaling in het Besluit bouwwerken leefomgeving (Bbl). RVO roept marktpartijen op om van deze ruimte gebruik te maken en de resultaten te documenteren, zodat de kennisbasis voor aanpassing van regelgeving kan worden opgebouwd. Het huidige gebruik van de experimenteerbepaling blijft echter ver achter bij het potentieel.", sentiment: "neutraal", bron: "Juridische-toetsing-Het-Nieuwe-Normaal---definitief.pdf", bronLabel: "Juridische toetsing HNN" }
    }
  },
  {
    id: 6,
    vraag: "Welke rol kunnen woningcorporaties spelen als 'launching customer' in de biobased bouwtransitie — en wat weerhoudt hen nu?",
    toelichting: "Corporaties beschikken over schaal en een sociale missie die biobased bouw rechtvaardigt, maar hun investeringscapaciteit is gekoppeld aan de sociale huurgrens. De meerkosten van biobased bouw (5–15%) verdienen zich via lagere onderhoudskosten en CO₂-reductie terug, maar dat vergt een lange tijdshorizon die op gespannen voet staat met jaarlijkse begrotingscycli.",
    antwoorden: {
      1:  { type: "quote", citaat: "Wij zien corporaties als een cruciale partner. Ze bouwen op schaal, ze hebben langetermijnbezit en ze kunnen de meerkosten van biobased over de exploitatieduur terugverdienen. Nijmegen probeert via de prestatieafspraken corporaties te stimuleren biobased als standaard te adopteren, maar de financiering vanuit het Rijk moet daarvoor wel structureel op orde zijn.", sentiment: "positief" },
      18: { type: "quote", citaat: "HNN heeft launching customers nodig en corporaties zijn de meest logische kandidaat. Gelderland praat actief met Aedes-leden in de regio om de businesscase door te rekenen. Het probleem is dat de investeringsruimte van corporaties sterk afhankelijk is van huurinkomsten die begrensd zijn door beleid — zolang die meerkosten niet gecompenseerd worden, blijft het voor veel corporaties een afweging die ze niet kunnen maken.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "BAM werkt graag met corporaties samen aan biobased projecten, juist omdat ze meerdere woningen tegelijk realiseren. Schaalgrootte is voor ons essentieel om de leercurve te doorlopen en de prijs te drukken. We hebben corporaties als launching customer hard nodig om onze Flow-woningen van pilot naar standaard te brengen.", sentiment: "positief" },
      20: { type: "quote", citaat: "Corporaties kunnen het verschil maken, maar dan moeten ze intern de beslissing durven nemen dat biobased onderdeel is van hun missie — niet een extraatje als er toevallig budget over is. Wij merken dat de bereidheid er is bij bestuurders, maar dat de interne businesscase-systematiek het afhoudt. Dat is een cultuurprobleem, geen technisch probleem.", sentiment: "kritisch" },
      21: { type: "quote", citaat: "Wij opereren in de koopsector dus de corporatiedynamiek is voor ons indirect, maar ik zie wel dat corporaties met hun schaal de markt kunnen normaliseren. Als biobased in de sociale huursector standaard wordt, worden materialen goedkoper en beschikbaarder voor iedereen. Het jammer is dat hun financiële speelruimte nu zo krap is dat zelfs gemotiveerde corporaties moeilijk kunnen bijspringen.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "Als corporatie voelen we de druk van twee kanten: onze huurders verdienen goede, duurzame woningen, maar we moeten ook binnen de financiële kaders van de Woningwet blijven. Strowijk Iewan was mogelijk dankzij een combinatie van subsidies, een innovatief aanbestedingsmodel en de bereidheid van onze RvC om iets meer risico te accepteren. Dat lukt niet overal. Structurele financiering — zoals een revolverend fonds voor biobased corporatieprojecten — zou echt helpen.", sentiment: "kritisch" },
      39: { type: "standpunt", standpunt: "Aedes stelt in haar sectorpositie dat corporaties in principe de aangewezen partij zijn voor grootschalige verduurzaming via biobased bouw, maar dat de huidige investeringssystematiek — gebaseerd op maximale huurprijzen en verhuurderheffing-nalatenschap — onvoldoende ruimte biedt voor de initiële meerkosten. Aedes pleit bij BZK voor een specifieke subsidieregeling die de businesscase voor biobased nieuwbouw voor corporaties sluitend maakt.", sentiment: "kritisch", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      48: { type: "standpunt", standpunt: "Het Ministerie van BZK erkent in de NABB dat corporaties een sleutelrol hebben als launching customer en kondigt aan dat binnen fase 2 (€175M totaalbudget) een stimuleringsregeling wordt uitgewerkt specifiek gericht op corporaties die biobased bouwen als onderdeel van hun meerjarenplan opnemen. Concrete uitwerking volgt na evaluatie van fase 1-pilots.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      30: { type: "standpunt", standpunt: "Portaal onderschrijft de rol van woningcorporaties als launching customer voor biobased bouw en heeft in haar portefeuille-aanpak duurzaamheid als kernprioriteit opgenomen. Tegelijkertijd wijst Portaal op de spanning met de betaalbaarheidsopgave: hogere stichtingskosten van biobased woningen drukken direct op de huurprijs of de investeringsruimte voor andere woningverbetering. Portaal zoekt naar constructies waarbij gemeenten of provincie de meerkosten van biobased bouw voor hun rekening nemen als maatschappelijke investering.", sentiment: "neutraal", bron: "https://www.portaal.nl", bronLabel: "Portaal – portaal.nl" },
      31: { type: "standpunt", standpunt: "Vivare heeft ervaring opgedaan met biobased renovatie in de regio Arnhem en ziet kansen in het combineren van biobased isolatie met de lopende verduurzamingsopgave in de bestaande woningvoorraad. Vivare benadrukt dat de launching customer-rol alleen houdbaar is als er voldoende schaal wordt gemaakt: één of twee pilots leveren geen ketenverdichting op. Vivare wil samen met andere Gelderse corporaties een gezamenlijk inkoopprogramma voor biobased bouwdelen ontwikkelen om inkoopvolume te bundelen.", sentiment: "positief", bron: "https://www.vivare.nl", bronLabel: "Vivare – vivare.nl" },
      43: { type: "standpunt", standpunt: "De HAN heeft in haar onderzoeksprogramma 'Duurzame Gebiedsontwikkeling' samengewerkt met regionale corporaties en constateert dat de beleids- en uitvoeringskennis over biobased bouwen bij corporaties sterk verschilt per organisatie. Een launching customer-strategie vereist dat corporaties niet alleen bereid zijn meer te betalen, maar ook intern capaciteit opbouwen om biobased projecten te sturen en te monitoren. De HAN biedt praktijkgericht onderzoek en post-hbo-scholing aan om deze kennisbehoefte te adresseren.", sentiment: "positief", bron: "Master Thesis Adoption of Biobased Building Materials Koen Wentholt s1044006 (1).pdf", bronLabel: "Masterthesis Wentholt 2024" }
    }
  },
  {
    id: 7,
    vraag: "Hoe reëel is de kans dat carbon credits en CO₂-opslagvergoedingen op korte termijn onderdeel worden van de businesscase voor biobased bouw?",
    toelichting: "Biobased materialen slaan CO₂ op gedurende de levensduur van een gebouw. Het Climate Cleanup Protocol v1.0 biedt €3.500–6.000 per woning als vergoeding voor CO₂-opslag, maar verificatie, standaardisering en beleidsverankering zijn nog niet op orde. Marktpartijen volgen de ontwikkeling maar rekenen er vooralsnog niet structureel op.",
    antwoorden: {
      1:  { type: "quote", citaat: "Vanuit de gemeente volgen we de carbon credit-discussie met interesse, maar we kunnen er als lokale overheid niet op sturen. Als het Rijk hiervoor een kader schept, zou dat de businesscase voor biobased bouw structureel verbeteren — dat scheelt gemeenten ook de druk om zelf alle meerkosten via grondprijsbeleid te compenseren. Voorlopig rekenen we er in onze beleidsstukken niet mee.", sentiment: "neutraal" },
      18: { type: "quote", citaat: "Gelderland heeft in HNN bewust geen carbon credits opgenomen als financieringsmechanisme, simpelweg omdat het systeem nog niet robuust genoeg is voor beleidsdoeleinden. Wel stimuleren we partijen om pilot-projecten op te zetten waarbij CO₂-opslag wordt gemeten en geverifieerd — dat bouwt de kennisbasis op die straks nodig is als het systeem volwassener wordt.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "Wij hebben intern de carbon credit-potentie van onze Flow-woningen laten doorrekenen. De bedragen zijn aanzienlijk als je kijkt naar de hoeveelheid biobased materiaal per woning, maar de verificatiekosten en het ontbreken van een erkende standaard maken het nu nog niet bankable. Over drie tot vijf jaar zou dit een serieuze bijdrage kunnen leveren — wij houden dit nauwgezet in de gaten.", sentiment: "positief" },
      20: { type: "quote", citaat: "Carbon credits zijn interessant, maar voor ons als aannemer is het ook een kwestie van wie de waarde incasseert — de opdrachtgever, de aannemer of de materiaalproducent? Zolang die vraag niet beantwoord is, is het voor ons moeilijk om het in een aanbieding te verwerken. De markt is er nog niet rijp voor, al snap ik de logica volledig.", sentiment: "kritisch" },
      21: { type: "quote", citaat: "In de koopsector zou je kunnen zeggen dat de koper profiteert van carbon credits via een lagere aankoopprijs of een groener keurmerk. Maar op dit moment is het voor ons als ontwikkelaar juridisch en administratief te complex om dit te vermarkten. Als er een gestandaardiseerd protocol komt dat door banken erkend wordt, verandert dat — dan wordt het een echte USP voor biobased woningen.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "Wij hebben bij Strowijk Iewan wél nagedacht over CO₂-opslag als potentiële inkomstenbron, maar het vergt een aparte meetinfrastructuur en een koper voor de credits. Als corporatie hebben we geen capaciteit om die markt zelf te organiseren. Dit is iets wat op sectorniveau geregeld zou moeten worden — Aedes of BZK zou een standaardaanpak kunnen ontwikkelen die corporaties direct kunnen toepassen.", sentiment: "neutraal" },
      37: { type: "standpunt", standpunt: "Building Balance wijst in haar dossierwerk op het potentieel van CO₂-opslagvergoedingen als aanvullende financieringsbron voor biobased projecten, maar constateert dat de keten — van materiaalproducent tot bouwer tot gebouweigenaar — nog geen gedeeld model heeft voor het verdelen van de credits. Building Balance werkt aan een sectorstandaard voor CO₂-meting in biobased gebouwen als onderdeel van de materiaalpaspoort-infrastructuur.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier dossiereigenaren" },
      48: { type: "standpunt", standpunt: "Het Ministerie van BZK erkent in beleidsadvies aan het Rijk dat CO₂-opslag in biobased bouwmaterialen meegenomen dient te worden in toekomstige berekeningen van de milieuprestatie (MPG). Een formeel carbon credit-regime voor de gebouwde omgeving valt buiten de huidige NABB-scope, maar BZK verkent samen met EZK of bestaande ETS-systematiek uitgebreid kan worden naar biogene koolstofopslag in gebouwen.", sentiment: "neutraal", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      46: { type: "standpunt", standpunt: "Wageningen University & Research heeft de potentie van biobased bouw als koolstofopslagstrategie wetenschappelijk onderbouwd: een woning van hout en hennep kan 20–40 ton CO₂-equivalenten langdurig opslaan. WUR werkt aan methodologieën voor de berekening en certificering van biogene koolstofopslag in gebouwen, maar wijst erop dat de addionaliteits- en permanentievereisten van Europese carbon credit-standaarden voor gebouwen nog niet zijn geoperationaliseerd.", sentiment: "neutraal", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier" },
      49: { type: "standpunt", standpunt: "RVO beheert de SDE++-regeling die biomassatoepassing voor energie subsidieert, maar een vergelijkbaar instrument voor materiaalgebonden koolstofopslag in de bouw ontbreekt. RVO verkent in opdracht van het ministerie van VRO de mogelijkheden voor een 'bouwkoolstof'-subsidieinstrument, maar waarschuwt dat carbon credits voor gebouwen complexe monitoring-, rapportage- en verificatievereisten (MRV) meebrengen die de uitvoerbaarheid kunnen beperken. RVO adviseert eerst met enkele regionale pilots de MRV-systematiek te testen.", sentiment: "neutraal", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      45: { type: "standpunt", standpunt: "TNO heeft berekend dat de koolstofopslagpotentie van de Nederlandse nieuwbouwopgave (900.000 woningen tot 2030) bij volledig biobased uitvoering zou optellen tot 10–15 megaton CO₂-equivalenten. Om dit te verzilveren als carbon credit is een betrouwbaar certificeringssysteem nodig dat is gekoppeld aan materialenpaspoorten en LCA-data. TNO pleit voor een nationaal register van biogene koolstofopslag in gebouwen als onderdeel van het bredere klimaatmonitoringsbeleid.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier" }
    }
  },
  {
    id: 8,
    vraag: "Is er voldoende vakmanschap beschikbaar voor biobased bouw — en wat is er nodig om de arbeidsmarkt mee te laten groeien met de transitie?",
    toelichting: "Biobased bouw vereist andere vaardigheden dan conventioneel bouwen: droge verbindingen, vochtmanagement van organische materialen, nieuwe detailleringstechnieken. De huidige beroepsopleidingen (MBO bouw) sluiten hier nog onvoldoende op aan, terwijl de transitiesnelheid vraag naar gekwalificeerd personeel snel doet toenemen.",
    antwoorden: {
      1:  { type: "quote", citaat: "Als gemeente kunnen we het opleidingsvraagstuk niet alleen oplossen, maar we proberen het wel te agenderen bij ROC's en via onze prestatieafspraken met corporaties. Als Nijmegen meer biobased gaat bouwen, moeten er ook vakmensen zijn die dat kunnen uitvoeren. Dit vraagt om samenwerking tussen gemeenten, provincies en het onderwijsveld — iets waar we nu te weinig aan doen.", sentiment: "kritisch" },
      18: { type: "quote", citaat: "Gelderland financiert via HNN een aantal praktijkleertrajecten waarbij bouwvakkers hands-on ervaring opdoen met biobased materialen. Maar dat zijn druppels op een gloeiende plaat. Het MBO-curriculum verandert traag — we hebben minimaal vijf jaar nodig om een nieuwe generatie vakmensen op te leiden. Ondertussen moeten we mensen om- en bijscholen, en dat kost geld dat marktpartijen niet altijd willen of kunnen investeren.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "BAM heeft intern een eigen biobased bouwteam opgebouwd — mensen die de specifieke technieken beheersen voor onze Flow-woningen. Die kennis zit nu in de hoofden van een klein team. We werken aan interne kennisoverdracht en hebben contacten met SBB om te kijken hoe leerbedrijf-erkenning voor biobased bouw georganiseerd kan worden. De markt groeit sneller dan het aanbod van vakmensen.", sentiment: "kritisch" },
      20: { type: "quote", citaat: "Vakmanschap is voor ons de kern van de transitie. Je kunt de mooiste biobased plannen maken, maar als de timmerman op de bouwplaats niet weet hoe hij hennepblokken detailleert of een dampopen constructie afwerkt, gaat het mis. Wij investeren zwaar in interne training en cultuurverandering — biobased bouwen is een andere mindset, niet alleen een ander materiaal. Het onderwijs loopt minstens vijf jaar achter.", sentiment: "kritisch" },
      21: { type: "quote", citaat: "Wij merken dat de beschikbaarheid van gespecialiseerde aannemers onze groeisnelheid begrenst. We werken nu met een vast team van partners die de technieken kennen, maar als we willen opschalen moeten er meer bedrijven zijn die biobased kunnen bouwen. Dat is ook een reden waarom kennisdeling in de sector zo belangrijk is — concurrentievoordeel zit niet in geheimhouding maar in snelheid.", sentiment: "neutraal" },
      29: { type: "quote", citaat: "Bij Strowijk Iewan hebben we bewust gekozen voor een aannemer met aantoonbare ervaring in strobouw. Dat versmalt de markt enorm. Ik hoop dat toekomstige projecten kunnen profiteren van een bredere pool aan vakmensen, maar dat vraagt nu al investeringen in opleiding. Corporaties kunnen daar een rol in spelen door stageplaatsen aan te bieden en in samenwerking met ROC's praktijkleerplekken op de bouwplaats te organiseren.", sentiment: "neutraal" },
      38: { type: "standpunt", standpunt: "Bouwend Nederland signaleert in haar arbeidsmarktrapportages dat de bouwsector al kampt met een structureel tekort aan vakmensen, en dat de transitie naar biobased en circulair bouwen dit probleem verergert doordat nieuwe competenties gevraagd worden die niet in de huidige MBO-curricula zitten. De brancheorganisatie pleit voor een 'biobased bouwprofiel' in de kwalificatiestructuur van SBB en voor extra subsidie voor bij- en omscholing.", sentiment: "kritisch", bron: "https://www.bouwendnederland.nl", bronLabel: "Bouwend Nederland – bouwendnederland.nl" },
      48: { type: "standpunt", standpunt: "De NABB (2023) benoemt arbeidsmarkt en vakmanschap als randvoorwaarde voor de transitie en reserveert binnen fase 1 middelen voor de ontwikkeling van leermateriaal en praktijkprogramma's in samenwerking met SBB en MBO Raad. Het streven is dat in 2026 minimaal tien erkende leerbedrijven voor biobased bouw actief zijn in Nederland.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      43: { type: "standpunt", standpunt: "De HAN constateert dat het bouw-onderwijs in de regio Arnhem-Nijmegen nauwelijks biobased materialen en technieken integreert in de reguliere curricula van mbo en hbo. Structurele verankering ontbreekt. De HAN heeft een lectoraat Biobased & Circulair Bouwen opgericht om praktijkgericht onderzoek te verbinden met curriculumontwikkeling, maar vraagt om co-financiering van de regio en het bedrijfsleven om dit te kunnen opschalen naar structureel aanbod.", sentiment: "kritisch", bron: "https://www.han.nl", bronLabel: "HAN Hogeschool – han.nl" },
      45: { type: "standpunt", standpunt: "TNO-onderzoek naar de arbeidsmarkt voor de energietransitie laat zien dat vergelijkbare transitieopgaven structureel te weinig instroom van geschoold personeel kennen. Voor biobased bouw geldt dat specifieke vaardigheden zoals het verwerken van houtskelet-, stro- en hennepconstructies worden vrijwel niet aangeboden in het reguliere beroepsonderwijs. TNO adviseert de GMR om samen met ROC's en het bedrijfsleven een regionaal 'Biobased Vakmanschapsprogramma' op te zetten met een looptijd van minimaal vijf jaar.", sentiment: "kritisch", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      41: { type: "standpunt", standpunt: "De BNA signaleert dat ook in het architectuuronderwijs en bij jonge architecten de kennis over biobased materialen en biobased detaillering achterblijft. Biobased bouwen vraagt om andere ontwerpprincipes dan de dominante betonbouw: naaldverwerking, dampopenheid en hygroscopisch gedrag vereisen specifieke vakkennis. De BNA pleit voor een verplicht onderdeel biobased en circulair ontwerpen in de architectuuropleidingen en organiseert via haar kennisplatform bijscholing voor de praktijk.", sentiment: "neutraal", bron: "hnn-leidraad-nieuwbouw-1.2.pdf", bronLabel: "HNN Leidraad Nieuwbouw v1.2" }
    }
  },
  {
    id: 9,
    vraag: "In hoeverre maakt uw organisatie gebruik van digitale tools zoals materialenpaspoorten (Madaster), BIM of LCA — en welk potentieel ziet u?",
    toelichting: "Materialenpaspoorten leggen de samenstelling van een gebouw digitaal vast zodat materialen aan het einde van de levensduur teruggewonnen en hergebruikt kunnen worden. LCA-berekeningen zijn verplicht voor de MPG-score. De adoptie van deze tools verschilt sterk tussen organisaties.",
    antwoorden: {
      1:  { type: "quote", citaat: "Nijmegen stelt Madaster-registratie als eis in haar gronduitgifte voor grotere projecten. We zien dit als een essentieel instrument voor de circulaire stad op lange termijn — over dertig jaar wil je weten wat er in een gebouw zit zodat het als grondstof kan dienen. De uitdaging is dat veel kleinere bouwers nog niet gewend zijn met Madaster te werken en dat de kwaliteit van de invoer sterk varieert.", sentiment: "positief" },
      18: { type: "quote", citaat: "HNN vraagt van projecten die meedoen aan de aanpak dat ze een materialenpaspoort opstellen. Gelderland heeft samengewerkt met Madaster om een provinciale sjabloon te ontwikkelen die aansluit op onze rapportagebehoefte. BIM-gebruik is bij de grote aannemers inmiddels standaard, maar de koppeling tussen BIM-model en materialenpaspoort is technisch nog niet naadloos — daar liggen kansen.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "Wij werken bij al onze Flow-woningen met BIM en koppelen dat aan een LCA-berekening voor de MPG. Madaster-registratie doen we standaard voor opdrachtgevers die dat vragen. Het echte potentieel zit voor ons in de koppeling van het materialenpaspoort aan restwaarde-garanties — als je kunt bewijzen dat biobased materialen over vijftig jaar nog waarde hebben, verandert de financieringslogica fundamenteel.", sentiment: "positief" },
      20: { type: "quote", citaat: "Wij gebruiken BIM intensief in de ontwerpfase, maar de stap naar een volledig gevuld materialenpaspoort kost extra tijd en discipline op de bouwplaats. De cultuuromslag die daarvoor nodig is, is eigenlijk dezelfde als bij biobased bouwen zelf — het vraagt om mensen die trots zijn op wat ze vastleggen, niet alleen op wat ze bouwen. Wij trainen daar nu actief op.", sentiment: "neutraal" },
      21: { type: "quote", citaat: "Als projectontwikkelaar zien wij het materialenpaspoort steeds meer als een verkoopargument. Kopers in het hogere segment waarderen transparantie over wat er in hun woning zit. We werken samen met Madaster om kopers bij oplevering een digitale 'gebouwkaart' te kunnen geven. Dat onderscheidt ons en geeft ons ook waardevolle data voor toekomstige projecten.", sentiment: "positief" },
      29: { type: "quote", citaat: "Bij Strowijk Iewan hebben we een materialenpaspoort opgesteld als onderdeel van de subsidieaanvraag. Het is nuttig, maar eerlijk gezegd ook arbeidsintensief voor een corporatie zonder grote technische staf. Ik zie het potentieel voor de lange termijn — bij renovatie of sloop over vijftig jaar wil je weten wat er in de wanden zit. Maar de tools moeten toegankelijker en de invoer geautomatiseerder worden voordat het breed toepasbaar is.", sentiment: "neutraal" },
      40: { type: "standpunt", standpunt: "DGBC integreert materialenpaspoort-eisen in BREEAM-NL Nieuwbouw en geeft extra credits voor Madaster-registratie en LCA-verificatie die boven de MPG-basiseis uitkomt. De vergelijking tussen BREEAM-NL en HNN toont dat op het gebied van circulaire materialendocumentatie HNN aansluit bij BREEAM level 'Good', maar dat voor level 'Excellent' aanvullende eisen aan paspoortcompleteness nodig zijn.", sentiment: "positief", bron: "Vergelijking-BREEAM-NL-Nieuwbouw-met-HNN.pdf", bronLabel: "Vergelijking BREEAM-NL Nieuwbouw met HNN" },
      37: { type: "standpunt", standpunt: "Building Balance werkt aan een gestandaardiseerde materialenpaspoort-template voor biobased bouwmaterialen die direct koppelt aan de Madaster-database en de MPG-rekenmethodiek. Doel is dat biobased materialen net zo eenvoudig registreerbaar zijn als conventionele bouwmaterialen, zodat de administratieve drempel voor kleine aannemers verdwijnt.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier dossiereigenaren" },
      49: { type: "standpunt", standpunt: "RVO coördineert de Nederlandse implementatie van de Europese Construction Products Regulation (CPR) en de aankomende Digital Product Passport (DPP)-vereisten. RVO ziet materialenpaspoorten als een kans om biobased materialen beter te positioneren, mits de datavereisten proportioneel zijn voor mkb-leveranciers. RVO financiert via de Topsector Energie pilots voor digitale materialenpaspoorten in de bouw en roept de GMR op actief aan deze pilots deel te nemen.", sentiment: "positief", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      47: { type: "standpunt", standpunt: "Cirkelstad heeft via haar Materialenpaspoort-werkgroep praktijkervaring opgebouwd met de implementatie van digitale paspoorten in renovatie- en nieuwbouwprojecten. Een sleutelbevinding is dat de waarde van een paspoort staat of valt met het gebruik erna: zonder een markt voor hergebruik of een verplichting tot overdracht bij eigendomswisseling verwordt het paspoort tot administratieve last. Cirkelstad pleit voor een koppeling tussen het materialenpaspoort en de WOZ-taxatie als prikkel voor eigenaren om data actueel te houden.", sentiment: "kritisch", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier" },
      45: { type: "standpunt", standpunt: "TNO ontwikkelt digitale toepassingen voor de bouw en ziet materialenpaspoorten als een essentieel onderdeel van een bredere digitale bouwinfrastructuur. TNO benadrukt dat de datakwaliteit van LCA-berekeningen voor biobased materialen momenteel nog onvoldoende is: er zijn grote bandbreedtes in de milieuprestatieverklaring (EPD) van biobased producten doordat grondstoffenherkomst en verwerkingsmethoden sterk variëren. TNO investeert in het opzetten van een nationale biobased EPD-database als fundament voor betrouwbare materialenpaspoorten.", sentiment: "neutraal", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier" }
    }
  },
  {
    id: 10,
    vraag: "Welke risico's kleven er aan de GMR-regio als voortrekker — wat zijn scenario's waarbij strenger regionaal beleid averechts werkt?",
    toelichting: "Als alleen de GMR extra eisen stelt aan biobased bouw kunnen projectontwikkelaars uitwijken naar regio's met minder strenge normen. Dit competitieve nadeel kan de woningbouw in de regio afremmen, juist nu de druk om snel te bouwen hoog is. Tegelijk kan voortrekkerschap innovatie aantrekken.",
    antwoorden: {
      1:  { type: "quote", citaat: "Het risico van regionaal voortrekkerschap is reëel maar beheersbaar. Nijmegen monitort of projecten afhaken vanwege onze biobased eisen in grondbeleid — tot nu toe zien we dat niet. Maar als de meerkosten verder stijgen of de subsidies wegvallen, kan dat omslaan. Daarom pleiten wij bij de provincie en het Rijk voor nationalisering van de normen: wat wij nu als regio doen, moet over drie jaar landelijke standaard zijn.", sentiment: "neutraal" },
      18: { type: "quote", citaat: "Gelderland is zich bewust van dit risico. HNN is bewust als stimuleringsprogramma opgezet en niet als verplichtend stelsel — we willen niet dat partijen wegtrekken. De strategie is om de koplopers zo snel mogelijk te laten bewijzen dat biobased werkt, zodat de norm vanzelf omhoog gaat en andere regio's aanhaken. Als wij te snel te dwingend worden voordat de markt klaar is, schiet het zijn doel voorbij.", sentiment: "neutraal" },
      19: { type: "quote", citaat: "Wij als BAM zien de GMR juist als een regio die ons helpt onze biobased concepten te verfijnen. We kiezen bewust voor de regio omdat het commitment hier groter is dan elders. Maar ik begrijp het risico voor kleinere ontwikkelaars die minder marge hebben — als de meerkosten niet gecompenseerd worden via subsidie of grondprijs, zoeken ze een andere regio. Dat moet de beleidsmakers scherp houden.", sentiment: "neutraal" },
      20: { type: "quote", citaat: "Averechts beleid is een reëel gevaar. Als de regeldruk te hoog wordt terwijl de rest van Nederland gewoon doorbouwt, haken partijen af — niet omdat ze tegen biobased zijn, maar omdat ze een project moeten realiseren. De transitie vraagt om een level playing field: landelijke normen, landelijke subsidies. De GMR kan als voorbeeld dienen, maar niet als enige regio de last dragen.", sentiment: "kritisch" },
      21: { type: "quote", citaat: "In de koopsector kijken kopers naar totaalprijs en locatie, niet naar of een gemeente biobased verplicht stelt. Als onze woningen in de GMR structureel duurder zijn dan vergelijkbare woningen net over de grens in Noord-Brabant, hebben we een probleem. Tot nu toe lukt het ons om de premium te verkopen als kwaliteitsverschil, maar er is een grens. Die grens ligt ergens tussen de zeven en twaalf procent meerkosten.", sentiment: "kritisch" },
      29: { type: "quote", citaat: "Voor corporaties is het risico van regionaal voortrekkerschap minder groot dan voor commerciële partijen — wij gaan niet naar een andere regio. Maar als de GMR-ambities leiden tot hogere grondkosten of langere doorlooptijden, raakt dat direct onze productiecapaciteit. Elke biobased woning die vertraging oploopt, is een sociale huurwoning die later beschikbaar komt. Dat is ook een risico dat meegewogen moet worden.", sentiment: "kritisch" },
      42: { type: "standpunt", standpunt: "NEPROM waarschuwt in haar adviespositie dat regionaal gedifferentieerde duurzaamheidseisen de investeringszekerheid voor projectontwikkelaars ondermijnen. Wanneer één regio substantieel hogere kosten oplegt zonder compenserend voordeel (snellere vergunningverlening, lagere grondprijs, subsidie), verplaatsen investeringsstromen zich naar regio's met minder strenge eisen. NEPROM pleit voor nationale harmonisering van biobased bouweisen als randvoorwaarde voor regionaal ambitieus beleid.", sentiment: "kritisch", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      38: { type: "standpunt", standpunt: "Bouwend Nederland onderschrijft het belang van de GMR als proeftuin maar stelt dat de lessen uit de regio snel nationaal verspreid en verankerd moeten worden in het Bouwbesluit. Zolang biobased bouwen regionaal verplicht is maar nationaal vrijblijvend, ontstaat een ongelijk speelveld dat de bouwsector als geheel belast en innovatie paradoxaal genoeg kan afremmen doordat risico's geconcentreerd blijven bij een kleine groep koplopers.", sentiment: "kritisch", bron: "https://www.bouwendnederland.nl", bronLabel: "Bouwend Nederland – bouwendnederland.nl" },
      44: { type: "standpunt", standpunt: "Radboud-onderzoekers op het gebied van institutionele economie wijzen op het 'pioneer penalty': vroege regio's die ambitieus biobased beleid voeren dragen de leercurvekosten, terwijl latere volgers profiteren van de opgedane kennis zonder de initiële faalkosten. Dit mechanisme kan leiden tot politieke terughoudendheid en free rider-gedrag bij andere regio's. De Radboud Universiteit adviseert dat het Rijk de GMR compenseert voor haar voortrekkersrol via een specifieke uitkering of een voorrangspositie bij nationale fondsenallocatie.", sentiment: "kritisch", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      43: { type: "standpunt", standpunt: "De HAN waarschuwt op basis van evaluaties van eerdere regionale duurzaamheidsinitiatieven dat ambitie en uitvoeringskapaciteit vaak niet in balans zijn. De GMR heeft een relatief kleine ambtelijke organisatie; als de biobased ambities worden opgeschaald zonder evenredige capaciteitsuitbreiding, dreigt overbelasting en oppervlakkige uitvoering. De HAN biedt ondersteuning via praktijkonderzoek en stagetrajecten, maar benadrukt dat structurele capaciteitsopbouw bij de GMR zelf noodzakelijk is.", sentiment: "kritisch", bron: "https://www.han.nl", bronLabel: "HAN Hogeschool – han.nl" },
      47: { type: "standpunt", standpunt: "Cirkelstad erkent de risico's van de voortrekkersstrategie maar plaatst die in perspectief: de kosten van niets doen zijn groter dan de risico's van vroeg handelen; bij inactiviteit dreigen blijvende afhankelijkheid van fossiele materialen en gemiste klimaatdoelstellingen. Cirkelstad adviseert de GMR om de risicospreiding te organiseren via consortia met marktpartijen die meebetalen aan de innovatiekosten, en om successen snel te communiceren om politiek draagvlak te onderhouden.", sentiment: "positief", bron: "https://www.cirkelstad.nl", bronLabel: "Cirkelstad.nl" }
    }
  },
  {
    id: 11,
    vraag: "Als u één concrete maatregel aan beleidsmakers zou adviseren om de biobased bouwtransitie nu meteen te versnellen — welke zou dat zijn?",
    toelichting: "Deze synthesevraag peilt welke interventie door marktpartijen als hoogste hefboom wordt gezien. De antwoorden laten zien dat er consensus is over de richting maar verschil van mening over het meest effectieve aangrijpingspunt: normering, financiering of kennisdeling.",
    antwoorden: {
      1:  { type: "quote", citaat: "Verlaag de MPG-eis voor nieuwbouw nu al naar het niveau van 2030 en geef biobased materialen hun terechte CO₂-opslagcredit in de berekening. Dat is één besluit dat morgen genomen kan worden en dat de businesscase voor biobased bouw in één keer kantelt. Alles wat wij lokaal doen met grondprijsbeleid is compensatie voor dit ene gemis in de nationale regelgeving.", sentiment: "positief" },
      18: { type: "quote", citaat: "Maak HNN of een vergelijkbaar raamwerk landelijk verplicht als minimumstandaard voor nieuwbouw. Niet als bureaucratische checklist, maar als prestatiecontract: als een project aantoonbaar circulair en biobased is, krijgt het een versneld vergunningsproces. Snelheid is geld, en als biobased bouw sneller vergund wordt, los je het grootste deel van het rendementsprobleem op.", sentiment: "positief" },
      19: { type: "quote", citaat: "Richt een nationaal revolverend fonds op van minimaal honderd miljoen euro specifiek voor biobased nieuwbouw, met gunstige leningen voor opdrachtgevers die aantoonbaar meer dan vijftig procent biobased materialen toepassen. Dat overbrugt de financieringskloof in de eerste jaren terwijl de markt opschaalt en de kostprijs daalt. Zonder kapitaal blijft alles steken in pilots.", sentiment: "positief" },
      20: { type: "quote", citaat: "Investeer in mensen, niet in regels. Verplicht elke bouwvakkersopleiding om een biobased bouwmodule op te nemen en subsidieer bedrijven die eigen mensen omscholen. De techniek is beschikbaar, de materialen zijn beschikbaar — de bottleneck zijn vakmensen die weten hoe je ze toepast. Alles wat we bouwen staat of valt met de mensen op de bouwplaats.", sentiment: "positief" },
      21: { type: "quote", citaat: "Eén maatregel: verplicht materialenpaspoorten voor alle nieuwbouw boven vijftig woningen, en koppel daar een CO₂-opslagwaarde aan die in de grondwaardeberekening meetelt. Dat geeft marktpartijen een financiële prikkel die ze nu missen en bouwt tegelijk de data-infrastructuur op die de sector over twintig jaar nodig heeft voor echte circulariteit. Twee vliegen in één klap.", sentiment: "positief" },
      29: { type: "quote", citaat: "Creëer een specifieke subsidieregeling voor woningcorporaties die biobased bouwen als standaard in hun meerjarenplan opnemen — niet projectgebonden maar structureel, zodat het in de bedrijfsvoering verankerd kan worden. Corporaties kunnen de markt normaliseren als ze de financiële ruimte krijgen. Die ruimte is er nu niet, en geen enkele corporatiebestuurder kan dat eenzijdig oplossen.", sentiment: "positief" },
      48: { type: "standpunt", standpunt: "Het Ministerie van BZK identificeert in de NABB aanscherping van de MPG-eis als de meest effectieve enkelvoudige beleidsmaatregel: verlaging van de maximale milieuprestatie-score met twintig procent ten opzichte van de huidige norm maakt biobased materialen automatisch concurrerend zonder directe subsidie. BZK koppelt dit aan de toezegging dat de rekenmethodiek voor biobased CO₂-opslag vóór 2026 wordt herzien.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      37: { type: "standpunt", standpunt: "Building Balance adviseert beleidsmakers om de erkenningsprocedure voor nieuwe biobased materialen te vereenvoudigen en te verkorten van de huidige gemiddelde doorlooptijd van achttien maanden naar maximaal zes maanden. Dit ontsluit het volledige scala aan beschikbare biobased materialen voor de markt en geeft materiaalproducenten de zekerheid die ze nodig hebben om te investeren in opschaling van productiecapaciteit.", sentiment: "positief", bron: "Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf", bronLabel: "Building Balance – Kennisdossier dossiereigenaren" },
      45: { type: "standpunt", standpunt: "TNO adviseert beleidsmakers om de MPG-grenswaarde (MilieuPrestatie Gebouwen) versneld aan te scherpen tot 0,5 €/m²/jaar voor nieuwbouwwoningen. Deze maatregel creëert directe marktprikkel voor biobased materialen zonder sectorspecifieke subsidies: elk project moet zijn milieuprestatie aantonen, en biobased bouw scoort structureel beter op de MPG dan conventionele beton- en staalconstructies. De maatregel is juridisch uitvoerbaar via het Bouwbesluit.", sentiment: "positief", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" },
      49: { type: "standpunt", standpunt: "RVO bepleit als meest impactvolle maatregel een nationaal 'Biobased Bouw'-keurmerk gekoppeld aan een structureel subsidieprogramma, naar analogie van de BENG-systematiek voor energieprestatie. Door een eenduidige definitie vast te stellen van wat 'biobased' inhoudt (minimumpercentage biogene materialen per bouwdeel), gecombineerd met een financieel voordeel bij gronduitgifte of hypotheekverstrekking, ontstaat een marktstructuur die schaalvergroting mogelijk maakt.", sentiment: "positief", bron: "advies-aan-het-rijk-vro-20242025.pdf", bronLabel: "Advies aan het Rijk – VRO 2024/2025" },
      46: { type: "standpunt", standpunt: "Wageningen University & Research adviseert beleidsmakers om de Nationale Eiwitstrategie en het Deltaplan Biodiversiteitsherstel te koppelen aan het biobased bouwbeleid: teelt van vezelgewassen zoals vlas, hennep en miscanthus op landbouwgrond in transitie biedt boeren een economisch alternatief én levert biobased bouwgrondstoffen voor de regio. Een 'Biobased Bouw'-toeslag voor Nederlandse boeren die vezelgewassen telen voor de bouw, zou de regionale ketens op gang brengen die nu ontbreken.", sentiment: "positief", bron: "advies-aan-het-rijk-ienw-20242025.pdf", bronLabel: "Advies aan het Rijk – IenW 2024/2025" }
    }
  }
];

// ============================================================
// BELEIDSSCENARIO SIMULATOR
// Gebaseerd op HNN-raamwerk, NABB actielijnen en interviewbevindingen
// Kernbevinding: regelgeving is de grootste bottleneck, niet kosten
// ============================================================

const GAME_ROLES = [
  {
    id: "gemeente",
    naam: "Gemeente",
    icon: "building-2",
    beschrijving: "Als gemeente bepaal je bestemmingsplannen, koppel je circulaire eisen aan gronduitgifte en stuur je via aanbestedingen op HNN-toepassing.",
    kleur: "#0E4447"
  },
  {
    id: "provincie",
    naam: "Provincie",
    icon: "landmark",
    beschrijving: "Als provincie beheer je het HNN-raamwerk, stuur je subsidies aan via tenderregelingen en pas je de omgevingsverordening aan.",
    kleur: "#176064"
  },
  {
    id: "aannemer",
    naam: "Aannemer / Bouwer",
    icon: "hard-hat",
    beschrijving: "Als aannemer investeer je in biobased expertise, bouw je pilots en werk je aan typegoedkeuringen voor je concepten.",
    kleur: "#2A9298"
  },
  {
    id: "corporatie",
    naam: "Woningcorporatie",
    icon: "home",
    beschrijving: "Als woningcorporatie stuur je via het MJOP, aanbestedingseisen en samenwerking met gemeenten op circulaire nieuwbouw en renovatie.",
    kleur: "#0E4447"
  },
  {
    id: "bouwboer",
    naam: "Bouwboer / Agrariër",
    icon: "wheat",
    beschrijving: "Als bouwboer verbouw je biobased gewassen — hennep, vlas, miscanthus of stro — voor de bouwketen. Jij bent de basis van de biobased transitie: zonder regionaal grondstoffen­aanbod geen biobased bouw.",
    kleur: "#5A8A2A"
  }
];

const GAME_MEASURES = {
  gemeente: [
    {
      id: "g1",
      naam: "Circulaire % eis koppelen aan gronduitgifte",
      impact: "hoog", haalbaarheid: 70,
      adoptionScore: 88, costScore: 45, regulationScore: 92,
      toelichting: "Stapsgewijs hogere biobased/circulaire percentages eisen bij bouwprojecten op gemeentelijke grond — de 'nudge'-aanpak van Nijmegen."
    },
    {
      id: "g2",
      naam: "HNN als verplicht toetsingskader in omgevingsplan",
      impact: "hoog", haalbaarheid: 55,
      adoptionScore: 82, costScore: 30, regulationScore: 95,
      toelichting: "Het Nieuwe Normaal formeel opnemen in het gemeentelijk omgevingsplan als toetsingskader voor bouwvergunningen."
    },
    {
      id: "g3",
      naam: "Subsidieregeling voor biobased pilotprojecten",
      impact: "hoog", haalbaarheid: 72,
      adoptionScore: 74, costScore: 85, regulationScore: 28,
      toelichting: "Gemeentelijke subsidie voor eerste biobased bouwprojecten, gericht op corporaties en kleine bouwers."
    },
    {
      id: "g4",
      naam: "Aanbestedingseis circulair bij gemeentelijk vastgoed",
      impact: "hoog", haalbaarheid: 65,
      adoptionScore: 80, costScore: 42, regulationScore: 78,
      toelichting: "Alle gemeentelijke bouwprojecten boven €500k krijgen verplicht een biobased/circulaire eis conform HNN."
    },
    {
      id: "g5",
      naam: "Informatiebijeenkomsten voor bouwers over HNN",
      impact: "laag", haalbaarheid: 92,
      adoptionScore: 28, costScore: 12, regulationScore: 18,
      toelichting: "Kennisoverdracht over HNN-keurmerken en circulaire definities — laagdrempelig maar beperkt structureel effect."
    },
    {
      id: "g6",
      naam: "Grondprijskorting bij aantoonbaar biobased concept",
      impact: "hoog", haalbaarheid: 58,
      adoptionScore: 76, costScore: 88, regulationScore: 22,
      toelichting: "Financieel voordeel voor ontwikkelaars die een gecertificeerd biobased bouwconcept inbrengen bij grondaankoop."
    },
    {
      id: "g7",
      naam: "Vergunningsverlening versnellen voor biobased",
      impact: "midden", haalbaarheid: 62,
      adoptionScore: 65, costScore: 55, regulationScore: 70,
      toelichting: "Voorrangsloket of vereenvoudigd traject voor biobased bouwplannen — adresseert de klacht dat vergunning achterblijft op bouw."
    },
    {
      id: "g8",
      naam: "Regionale inkoopcombinatie met corporaties",
      impact: "midden", haalbaarheid: 68,
      adoptionScore: 60, costScore: 72, regulationScore: 35,
      toelichting: "Bundeling van gemeentelijke en corporatie-inkoopvolumes zodat biobased materialen goedkoper inkopen mogelijk wordt."
    },
    {
      id: "g9",
      naam: "MPG-score als verplicht gunningscriterium",
      impact: "hoog", haalbaarheid: 62,
      adoptionScore: 84, costScore: 50, regulationScore: 86,
      toelichting: "Milieuprestatie Gebouwen (MPG) opnemen als selectiecriterium bij aanbestedingen — biobased bouw scoort structureel beter, waardoor markt vanzelf die kant op beweegt. Conform HNN-indicator 'MPG'."
    },
    {
      id: "g10",
      naam: "Losmaakbaarheidseis koppelen aan omgevingsvergunning",
      impact: "midden", haalbaarheid: 52,
      adoptionScore: 66, costScore: 38, regulationScore: 80,
      toelichting: "Bij vergunningverlening voor nieuwbouw eisen dat droge verbindingen worden toegepast — conform HNN Leidraad Nieuwbouw categorie 'Losmaakbaarheid'. Schept langetermijn hergebruikpotentie in de gebouwde omgeving."
    }
  ],
  provincie: [
    {
      id: "p1",
      naam: "HNN verplicht stellen via omgevingsverordening",
      impact: "hoog", haalbaarheid: 48,
      adoptionScore: 90, costScore: 32, regulationScore: 98,
      toelichting: "Het Nieuwe Normaal juridisch verankeren in de provinciale omgevingsverordening — hoogste impact, maar politiek complex."
    },
    {
      id: "p2",
      naam: "Tenderregeling biobased: subsidies met kennisdeling",
      impact: "hoog", haalbaarheid: 78,
      adoptionScore: 72, costScore: 84, regulationScore: 30,
      toelichting: "Provinciale subsidies voor biobased projecten, met als voorwaarde dat innovaties publiek gedeeld worden — zoals nu al gebeurt."
    },
    {
      id: "p3",
      naam: "Regionaal ketenproject GMR (Building Balance-model)",
      impact: "hoog", haalbaarheid: 72,
      adoptionScore: 85, costScore: 60, regulationScore: 45,
      toelichting: "Opzetten van een GMR-keten boeren-verwerkers-bouwers naar het model van 'Boeren voor Biobased Bouwen' Gelderland."
    },
    {
      id: "p4",
      naam: "Carbon credits voor Gelderse vezeltelers",
      impact: "hoog", haalbaarheid: 50,
      adoptionScore: 68, costScore: 76, regulationScore: 55,
      toelichting: "Vergoeding voor boeren die vezelgewassen telen via carbon credits — stimuleert de 120 ha hennep uit te breiden naar 600-1000 ha doel."
    },
    {
      id: "p5",
      naam: "Opleidingsprogramma gemeenteambtenaren HNN",
      impact: "midden", haalbaarheid: 88,
      adoptionScore: 42, costScore: 15, regulationScore: 62,
      toelichting: "Trainen van gemeentelijke ambtenaren in het toepassen en toetsen van HNN bij vergunningverlening."
    },
    {
      id: "p6",
      naam: "Grensoverschrijdend afstemmen met Duits aanbod",
      impact: "midden", haalbaarheid: 55,
      adoptionScore: 58, costScore: 65, regulationScore: 38,
      toelichting: "Teeltmogelijkheden uit Duitsland meenemen in regionale ketenstrategie — nu een blinde vlek (gesignaleerd in interview Provincie)."
    },
    {
      id: "p7",
      naam: "Materialenpaspoort verplichten in Gelderse projecten",
      impact: "midden", haalbaarheid: 60,
      adoptionScore: 62, costScore: 48, regulationScore: 68,
      toelichting: "Digitaal registreren van biobased materialen (Madaster) als voorwaarde bij provinciale cofinanciering."
    },
    {
      id: "p8",
      naam: "Lobby bij Rijk: GWPa-eis en CPR-implementatie",
      impact: "hoog", haalbaarheid: 52,
      adoptionScore: 78, costScore: 42, regulationScore: 92,
      toelichting: "Actieve lobby richting BZK voor herinvoering GWPa-eis en snelle implementatie herziene CPR (2026) in Nederlands Bouwbesluit."
    },
    {
      id: "p9",
      naam: "Gezonde materialen-eis (ZZS-vrij) in provinciaal aanbesteden",
      impact: "midden", haalbaarheid: 65,
      adoptionScore: 55, costScore: 40, regulationScore: 74,
      toelichting: "Verbod op Zeer Zorgwekkende Stoffen (ZZS) opnemen als minimumeis bij provinciale bouwprojecten — conform HNN-indicator 'Gezonde materialen'. Bevordert biobased alternatieven voor kit, pur en toxische lijmen."
    },
    {
      id: "p10",
      naam: "Sloopprotocol met oogstronde verplichten bij subsidies",
      impact: "midden", haalbaarheid: 70,
      adoptionScore: 64, costScore: 55, regulationScore: 62,
      toelichting: "Alle provinciale cofinancieringsprojecten waarbij gesloopt wordt, moeten een 'oogstronde' uitvoeren vóór sloop — inventarisatie en hergebruik van vrijkomende materialen. Conform HNN Leidraad Sloop v1.0."
    }
  ],
  aannemer: [
    {
      id: "a1",
      naam: "Typegoedkeuring voor biobased concept aanvragen",
      impact: "hoog", haalbaarheid: 62,
      adoptionScore: 86, costScore: 58, regulationScore: 80,
      toelichting: "Zoals BAM en Van Wijnen doen: woningconcepten laten toetsen voor typegoedkeuring zodat vergunning deels wordt overgeslagen."
    },
    {
      id: "a2",
      naam: "Pilotproject volledig biobased HSB-woning realiseren",
      impact: "hoog", haalbaarheid: 70,
      adoptionScore: 82, costScore: 46, regulationScore: 38,
      toelichting: "Eerste 4 woningen Van Wijnen-model: volledig biobased HSB, herbruikbare materialen, zo min mogelijk primaire grondstoffen."
    },
    {
      id: "a3",
      naam: "Bouwteams trainen in biobased materiaalgebruik",
      impact: "midden", haalbaarheid: 84,
      adoptionScore: 52, costScore: 28, regulationScore: 22,
      toelichting: "Van Wijnen: 'sociale aspect is het belangrijkst — bouwmannen moeten de impact van nieuwe materialen voelen'."
    },
    {
      id: "a4",
      naam: "Droge verbindingen en demontabel ontwerp standaardiseren",
      impact: "hoog", haalbaarheid: 65,
      adoptionScore: 78, costScore: 70, regulationScore: 42,
      toelichting: "BAM Flow-aanpak: 80% demontabel, 35 droge verbindingen. Dit verhoogt restwaarde en maakt materialenpaspoort zinvol."
    },
    {
      id: "a5",
      naam: "Samenwerking met lokale biobased leveranciers",
      impact: "midden", haalbaarheid: 72,
      adoptionScore: 62, costScore: 64, regulationScore: 28,
      toelichting: "Regionale inkoop van vezelhennep-isolatie (Hempflax) en stro-elementen vermindert transportkosten en versterkt keten."
    },
    {
      id: "a6",
      naam: "Hybride bouwstrategie (biobased + beton combineren)",
      impact: "midden", haalbaarheid: 80,
      adoptionScore: 68, costScore: 62, regulationScore: 35,
      toelichting: "Van Wijnen: 'niet alles eruit, maar de perfecte mix'. Hybride CLT heeft 27% lager GWP dan conventioneel (Pierobon 2019)."
    },
    {
      id: "a7",
      naam: "Brandveiligheid proactief aantonen met testrapport",
      impact: "midden", haalbaarheid: 68,
      adoptionScore: 60, costScore: 38, regulationScore: 72,
      toelichting: "BAM probleem: zelfde houtbouw-ontwerp wordt per gemeente anders beoordeeld. Nationaal testrapport doorbreekt dit."
    },
    {
      id: "a8",
      naam: "LCA uitvoeren en opnemen in NMD",
      impact: "midden", haalbaarheid: 58,
      adoptionScore: 55, costScore: 35, regulationScore: 78,
      toelichting: "Levenscyclusanalyse per biobased materiaal in Nationale Milieudatabase — vereist voor MPG-berekening. Tijdrovend maar noodzakelijk."
    },
    {
      id: "a9",
      naam: "Standaardiseren van modulaire maatvoering (IFD)",
      impact: "midden", haalbaarheid: 72,
      adoptionScore: 68, costScore: 60, regulationScore: 32,
      toelichting: "Industrieel Flexibel Demontabel (IFD) ontwerpen met standaard afmetingen — conform HNN-indicator 'Losmaakbaarheid'. Droge verbindingen en standaard modules vergroten hergebruikpotentie én verlagen bouwplaatsafval met 30-40%."
    },
    {
      id: "a10",
      naam: "CO2-opslag in biobased materialen certificeren",
      impact: "hoog", haalbaarheid: 45,
      adoptionScore: 72, costScore: 80, regulationScore: 55,
      toelichting: "Biogene CO2-opslag in hout, hennep en stro registreren via Climate Cleanup Protocol v1.0. Levert verkoopbare carbon credits op — additionele inkomstenstroom die de meerkosten van biobased deels compenseert."
    }
  ],
  corporatie: [
    {
      id: "c1",
      naam: "Biobased renovatieplan opnemen in MJOP",
      impact: "hoog", haalbaarheid: 65,
      adoptionScore: 82, costScore: 52, regulationScore: 38,
      toelichting: "Meerjarenonderhoudsprogramma herzien met biobased materiaalkeuzes — stapsgewijs implementeren bij geplande renovaties."
    },
    {
      id: "c2",
      naam: "MIA/Vamil-subsidie benutten voor biobased investeringen",
      impact: "hoog", haalbaarheid: 78,
      adoptionScore: 70, costScore: 88, regulationScore: 25,
      toelichting: "De Milieu Investerings Aftrek biedt directe financieel voordeel bij duurzame investeringen — Talis benoemt dit als relevante regeling."
    },
    {
      id: "c3",
      naam: "Biobased aanbestedingseis bij nieuwbouwprojecten",
      impact: "hoog", haalbaarheid: 58,
      adoptionScore: 86, costScore: 42, regulationScore: 72,
      toelichting: "Minimaal 30% biobased materialen opnemen als gunningscriterium — conform HNN en NABB-doelstelling voor 2030."
    },
    {
      id: "c4",
      naam: "Pilot prefab biobased complex realiseren",
      impact: "hoog", haalbaarheid: 68,
      adoptionScore: 84, costScore: 48, regulationScore: 40,
      toelichting: "Eerste volledig prefab biobased huurcomplex als showcase — Talis Strowijk Iewan als voorbeeld. Kleiner bouwplaatsoppervlak als extra voordeel."
    },
    {
      id: "c5",
      naam: "Gezamenlijk inkopen met andere corporaties",
      impact: "midden", haalbaarheid: 72,
      adoptionScore: 62, costScore: 78, regulationScore: 28,
      toelichting: "Bundeling van inkoop verlaagt materiaalprijs en transactiekosten. Talis en Portaal samen vertegenwoordigen >30.000 woningen."
    },
    {
      id: "c6",
      naam: "Circulair sloopprotocol invoeren",
      impact: "midden", haalbaarheid: 70,
      adoptionScore: 58, costScore: 56, regulationScore: 32,
      toelichting: "Talis sloopt en bouwt veel nieuw — een sloopprotocol dat materialen catalogiseert en hergebruik bevordert sluit hierop aan."
    },
    {
      id: "c7",
      naam: "Woongroepen faciliteren als biobased pioniers",
      impact: "midden", haalbaarheid: 75,
      adoptionScore: 55, costScore: 60, regulationScore: 22,
      toelichting: "Talis: 'als woongroepen grote eisen en budget hebben, kan Talis zeker biobased bouwen'. Dat kanaal benutten als eerste stap."
    },
    {
      id: "c8",
      naam: "CO2-rapportage koppelen aan biobased materialenkeuze",
      impact: "midden", haalbaarheid: 64,
      adoptionScore: 66, costScore: 38, regulationScore: 62,
      toelichting: "Biobased materialen verlagen de MPG-score en CO2-voetafdruk van de corporatieportefeuille — dit zichtbaar maken in jaarrapportage."
    },
    {
      id: "c9",
      naam: "Adaptief ontwerp: gebouwen toekomstbestendig herbestemmen",
      impact: "hoog", haalbaarheid: 58,
      adoptionScore: 76, costScore: 44, regulationScore: 58,
      toelichting: "Nieuwe corporatiewoningen ontwerpen met vrije kolommenstructuur, niet-dragende tussenwanden en oversized kabelschachten — conform HNN 'Adaptief vermogen'. Gebouwen blijven 50+ jaar bruikbaar ook als de woningvraag verandert."
    },
    {
      id: "c10",
      naam: "Ketenregierol: boer–verwerker–bouwer verbinden",
      impact: "midden", haalbaarheid: 50,
      adoptionScore: 70, costScore: 65, regulationScore: 35,
      toelichting: "Corporaties zijn als grote opdrachtgever bij uitstek in staat om lokale agrarische vezeltelers (hennep, vlas) te verbinden met verwerkers en aannemers — zoals Talis wil via Strowijk Iewan-model. Versterkt regionale biobased keten structureel."
    }
  ]
};

// ============================================================
// GAME SYSTEEMDYNAMIEK — startvariabelen per rol
// Verborgen tijdens het spel, onthuld aan het einde
// politiek = politiekDraagvlak, markt = marktCapaciteit
// budget = financiële ruimte, samenwerking = ketensterkte
// ============================================================

const GAME_ROLE_INIT = {
  gemeente:  { politiek: 50, markt: 30, budget: 60, samenwerking: 40 },
  provincie: { politiek: 65, markt: 35, budget: 75, samenwerking: 50 },
  aannemer:  { politiek: 25, markt: 65, budget: 50, samenwerking: 38 },
  corporatie:{ politiek: 40, markt: 35, budget: 38, samenwerking: 48 },
  bouwboer:  { politiek: 15, markt: 50, budget: 42, samenwerking: 28 }
};

// ============================================================
// GAME_SCRIPTED_EVENTS — triggered door specifieke keuzes
// ============================================================

const GAME_SCRIPTED_EVENTS = {
  juridisch_bezwaar: {
    id: "juridisch_bezwaar", type: "negatief", icon: "alert-triangle",
    titel: "Juridisch bezwaar — Bouwend Nederland",
    scenario: "Twee grote aannemers hebben juridisch bezwaar ingediend bij de aanbestedingsrechter. Ze stellen dat de HNN-eis discriminatoir is in Europese aanbestedingen en vragen om opschorting. Uw juridische afdeling heeft 3 weken nodig.",
    effecten: { politiek: -5, markt: -10, budget: -5, samenwerking: -15 }
  },
  typegoedkeuring_vertraging: {
    id: "typegoedkeuring_vertraging", type: "negatief", icon: "clock",
    titel: "Typegoedkeuring — 3 maanden vertraging",
    scenario: "Het typegoedkeuringstraject loopt vertraging op: aanvullende brandveiligheidstests vereist. De vertraging is vervelend, maar het leereffect is groot — elk volgend project gaat aanzienlijk sneller.",
    effecten: { politiek: -5, markt: +8, budget: -10, samenwerking: 0 }
  },
  politiek_momentum: {
    id: "politiek_momentum", type: "positief", icon: "trending-up",
    titel: "Politiek momentum — 3 GMR-gemeenten sluiten aan",
    scenario: "Drie andere GMR-gemeenten melden zich na uw aanpak. Ze willen aansluiten. Media-aandacht (De Stentor, BNR) versterkt het politieke draagvlak regionaal.",
    effecten: { politiek: +20, markt: +10, budget: 0, samenwerking: +15 }
  },
  gemeenten_protest: {
    id: "gemeenten_protest", type: "negatief", icon: "alert-circle",
    titel: "Gemeenten protesteren — brief aan GS",
    scenario: "Vier GMR-gemeenten sturen een gezamenlijke brief aan Gedeputeerde Staten: de provinciale verordening is 'te dirigistisch en ondermijnt de gemeentelijke autonomie'. Politiek overleg nodig vóór invoering.",
    effecten: { politiek: -15, markt: 0, budget: 0, samenwerking: -20 }
  },
  bouwer_afhaakt: {
    id: "bouwer_afhaakt", type: "negatief", icon: "user-x",
    titel: "Aannemer trekt zich terug",
    scenario: "De beoogde aannemer trekt zich terug. Er volgt 4 maanden tijdverlies in het project. Maar Van Wijnen toont actief interesse — zij zijn bereid op het gevraagde biobased-niveau te bouwen.",
    effecten: { politiek: -10, markt: -5, budget: -5, samenwerking: -10 }
  },
  raadsdebat: {
    id: "raadsdebat", type: "onzeker", icon: "users",
    titel: "Raadsdebat — nipte meerderheid",
    scenario: "Het raadsvoorstel leidt tot een scherp politiek debat. Drie fracties steunen het, twee zijn kritisch, één onthoudt zich. Aangenomen — maar de marge is klein en de oppositie zal kritisch blijven.",
    effecten: { politiek: +10, markt: +5, budget: 0, samenwerking: -5 }
  },
  technische_doorbraak: {
    id: "technische_doorbraak", type: "positief", icon: "zap",
    titel: "TNO-rapport: nationale brandveiligheidsnorm",
    scenario: "Het TNO-brandveiligheidsdossier voor houtbouw is nationaal gepubliceerd en geaccepteerd door alle brandweerkorpsen. Vergunningstrajecten voor biobased bouw worden hierdoor structureel betrouwbaarder.",
    effecten: { politiek: +5, markt: +20, budget: 0, samenwerking: +10 }
  },
  marktvolume_boost: {
    id: "marktvolume_boost", type: "positief", icon: "bar-chart-2",
    titel: "Inkoopcoalitie geeft markt zekerheid",
    scenario: "Vier corporaties bundelen hun inkoopvolume. Biobased leveranciers bieden nu langjarige contracten aan tegen 20-22% lagere prijzen. De markt kantelt: meerdere aannemers kondigen biobased investeringen aan.",
    effecten: { politiek: +5, markt: +25, budget: +10, samenwerking: +15 }
  },
  media_aandacht: {
    id: "media_aandacht", type: "positief", icon: "star",
    titel: "Nationale media-aandacht",
    scenario: "RTL Nieuws en De Stentor brengen een reportage over uw biobased aanpak. Het complex trekt bezoekers van over het land. Politici uit Tweede Kamer bezoeken het project.",
    effecten: { politiek: +15, markt: +10, budget: 0, samenwerking: +10 }
  },
  politieke_spanning: {
    id: "politieke_spanning", type: "negatief", icon: "alert-triangle",
    titel: "Motie van wantrouwen dreigt",
    scenario: "Drie raadsleden dreigen met een motie van wantrouwen. Ze stellen dat de provincie 'te ver gaat in gemeentelijke autonomie'. Gevoelig politiek moment — beleidsmatig vertragen is tijdelijk noodzakelijk.",
    effecten: { politiek: -20, markt: 0, budget: 0, samenwerking: -10 }
  },
  data_opbouw: {
    id: "data_opbouw", type: "positief", icon: "database",
    titel: "Materialenregistratie — waardevolle dataset",
    scenario: "23 biobased projecten registreren nu hun materialen in Madaster. Het ministerie van BZK vraagt of de GMR-data als nationale pilotdataset beschikbaar gesteld kan worden.",
    effecten: { politiek: +5, markt: +10, budget: 0, samenwerking: +8 }
  },
  nationale_aandacht: {
    id: "nationale_aandacht", type: "positief", icon: "megaphone",
    titel: "BZK vraagt inbreng GMR voor NABB fase 2",
    scenario: "Het Ministerie van BZK nodigt de GMR uit voor de klankbordgroep NABB fase 2 (€175 mln). Uw aanpak wordt als best practice aangedragen. Directe invloed op nationale beleidskeuzes.",
    effecten: { politiek: +15, markt: +10, budget: +5, samenwerking: +12 }
  },
  markt_zekerheid: {
    id: "markt_zekerheid", type: "positief", icon: "shield-check",
    titel: "Projectontwikkelaars committeren zich aan GMR-norm",
    scenario: "NEPROM leden (Klokgroep, BPD, Rotij) geven aan de GMR-norm te gaan hanteren als standaard voor hun GMR-projecten. De normering creëert de marktzekerheid die bouwers nodig hebben.",
    effecten: { politiek: +10, markt: +20, budget: 0, samenwerking: +15 }
  }
};

// ============================================================
// GAME_RANDOM_EVENTS — pool, één per sessie gekozen
// Vuren altijd tussen ronde 2 en 3 (transitiescherm stap 5)
// ============================================================

const GAME_RANDOM_EVENTS = [
  {
    id: "epbd_eu", type: "positief", icon: "globe",
    titel: "🇪🇺 EU EPBD verplicht lifecycle-emissies",
    scenario: "De herziene Energy Performance of Buildings Directive (EPBD) wordt gepubliceerd. Alle nieuwbouw moet vanaf 2030 lifecycle CO₂ meten. Biobased bouw krijgt structureel voordeel t.o.v. beton in alle Europese aanbestedingen.",
    effecten: { politiek: +15, markt: +20, budget: 0, samenwerking: +10 }
  },
  {
    id: "klimaat_record", type: "positief", icon: "sun",
    titel: "☀️ Heetste zomer in 130 jaar",
    scenario: "Klimaatrecords worden gebroken. Het onderwerp klimaatverandering domineert de politieke agenda. Publieke steun voor biobased bouw als klimaatoplossing stijgt sterk in peilingen.",
    effecten: { politiek: +20, markt: +10, budget: 0, samenwerking: +15 }
  },
  {
    id: "bouwrecessie", type: "negatief", icon: "trending-down",
    titel: "📉 Bouwrecessie — stijgende rente",
    scenario: "De woningmarkt koelt sterk af. Stijgende hypotheekrente stopt nieuwbouwprojecten. Bouwbedrijven kiezen voor bewezen conventionele methoden om financieel risico te mijden.",
    effecten: { politiek: -5, markt: -20, budget: -15, samenwerking: -10 }
  },
  {
    id: "materiaalschaarste", type: "negatief", icon: "package",
    titel: "📦 Biobased materialen schaars",
    scenario: "Door plotseling groeiende vraag zijn biobased isolatiematerialen 6-8 weken vertraagd. Leveranciers kunnen de orderinstroom niet bijhouden. Bouwers beginnen te twijfelen aan leveringszekerheid.",
    effecten: { politiek: -5, markt: -15, budget: -10, samenwerking: -5 }
  },
  {
    id: "woningnood_crisis", type: "negatief", icon: "home",
    titel: "🏠 Kabinet: 100.000 woningen erbij in 2 jaar",
    scenario: "Nieuw kabinet kondigt noodplan aan voor woningbouw. Minister dringt bij gemeenten aan op snelheid. Biobased eisen worden in de pers regelmatig aangeduid als 'onnodige vertraging'.",
    effecten: { politiek: -20, markt: -5, budget: -5, samenwerking: -10 }
  },
  {
    id: "innovatiedoorbraak", type: "positief", icon: "zap",
    titel: "🔬 Wageningen UR: biobased isolatie 30% goedkoper",
    scenario: "Nieuw productieproces van Wageningen UR maakt biobased isolatieplaten 30% goedkoper dan glaswol. Het nieuws verspreidt zich razendsnel. Aannemers melden interesse.",
    effecten: { politiek: +5, markt: +25, budget: +10, samenwerking: +15 }
  },
  {
    id: "verkiezingen", type: "onzeker", icon: "vote",
    titel: "🗳️ Gemeenteraadsverkiezingen — nieuw college",
    scenario: "Gemeenteraadsverkiezingen leveren een nieuwe coalitie op. Duurzaamheid was een thema maar het nieuwe college heeft andere prioriteiten dan verwacht. Biobased beleid moet opnieuw worden uitgelegd en verdedigd.",
    effecten: { politiek: -15, markt: 0, budget: 0, samenwerking: -5 }
  }
];
