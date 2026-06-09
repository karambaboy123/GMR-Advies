// ============================================================
// DESKRESEARCH.JS — Tab 5: Bronbestanden & Downloads
// GMR Dashboard | Minor Duurzaam Ondernemen & Circulaire Economie
// ============================================================

const DeskresearchTab = (() => {

  // BASE_PATH is globaal beschikbaar via data.js

  const DOCS = [
    // ── INTERVIEWS ────────────────────────────────────────────
    {
      naam: 'Interview Tom Stolker — BAM Wonen',
      bestand: 'Interviews/Interview 1 Tom Stolker 22-4.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '22-04-2026',
      beschrijving: 'Projectmanager BAM Wonen licht het Flow-systeem toe: prefab houtbouw met 35 droge verbindingen en 80% demontabiliteit. Inzichten over industrialisatie, typegoedkeuring en schaalvergroting van biobased bouwen in de sociale huursector.',
      kernthema: 'Industrialisatie & prefab'
    },
    {
      naam: 'Interviewaantekeningen Tom Stolker — Berend',
      bestand: 'Interviews/Tom Stolker BAM interview aantekeningen Berend 22-4-2026.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '22-04-2026',
      beschrijving: 'Aanvullende aantekeningen van Berend bij het BAM Wonen interview. Technische details over het Flow-concept, demontabel ontwerp en de uitdagingen rondom brandveiligheidseisen per gemeente.',
      kernthema: 'Industrialisatie & prefab'
    },
    {
      naam: 'Interview Maarten van Ginkel — Gemeente Nijmegen',
      bestand: 'Interviews/Interview 2 4 2026 Maarten van Ginkel Gemeente Nijmegen.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '02-04-2026',
      beschrijving: 'Beleidsmedewerker Gemeente Nijmegen over grondpolitiek, stapsgewijze circulaire percentages in aanbestedingen en de spanning tussen rijksdruk op woningproductie en duurzaamheidsambities. Bevat concrete beleidsinstrumenten.',
      kernthema: 'Beleid & regelgeving'
    },
    {
      naam: 'Interview Thijs Pleijhuis — Klokgroep',
      bestand: 'Interviews/Interview 30 3 2026 T Pleijhuis Klokgroep.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '30-03-2026',
      beschrijving: 'Directeur Klokgroep over de pilot Wanrooij, CO2-reductiedoel van 50% vóór 2030 en ketensamenwerking in de koopsector. Eerlijke reflectie op de meerkosten (7–12%) en hoe draagvlak bij kopers wordt opgebouwd.',
      kernthema: 'Kosten & businesscase'
    },
    {
      naam: 'Interview Myriam van Zetten — Provincie Gelderland',
      bestand: 'Interviews/Interview Myriam van Zetten.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Provincie Gelderland-medewerker legt uit hoe Het Nieuwe Normaal (HNN) als beleidsinstrument werkt, hoe de provincie gemeenten ondersteunt en welke knelpunten optreden bij verplichte toepassing van HNN in aanbestedingen.',
      kernthema: 'HNN & beleid'
    },
    {
      naam: 'Interview Melany Thijssen — Talis',
      bestand: 'Interviews/Talis interview met Melany Thijssen Beleidsadviseur Duurzaamheid en Vastgoed.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Beleidsadviseur Duurzaamheid & Vastgoed bij Talis woningcorporatie. Bespreking van de MIA/Vamil-subsidie, het Strowijk Iewan-project in Nijmegen en de sociale missie als drijfveer voor biobased investeren ondanks hogere kosten.',
      kernthema: 'Corporaties & financiering'
    },
    {
      naam: 'Aantekeningen Van Wijnen',
      bestand: 'Interviews/Aantekeningen van Wijnen 10-4.docx',
      categorie: 'Interviews',
      type: 'docx',
      datum: '10-04-2026',
      beschrijving: 'Aantekeningen interview Van Wijnen over het HSB-concept, het "sociale aspect als kern van biobased bouw" en de visie op hybride bouwen als instapstrategie. Van Wijnen zet in op 4 biobased pilotwoningen per project.',
      kernthema: 'Aannemer & transitie'
    },

    // ── EIGEN ONDERZOEK ───────────────────────────────────────
    {
      naam: 'Huidig areaal & volume biobased bouwmaterialen',
      bestand: '1 Huidig areaal en volume biobased bouwmaterialen.docx',
      categorie: 'GMR Onderzoek',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Kwantitatief overzicht van het huidig areaal biobased bouwmaterialen in Nederland. Inclusief cijfers over hennep (2.000 ha), stro, hout en andere materialen. Vergelijkt huidige productie met NABB-doelstelling van 50.000 ha in 2030.',
      kernthema: 'Areaal & productie'
    },
    {
      naam: 'Empirie lopende biobased bouwprojecten',
      bestand: '2 Empirie lopende bbb projecten.docx',
      categorie: 'GMR Onderzoek',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Empirisch overzicht van lopende biobased bouwprojecten in de GMR-regio en Nederland. Casestudies van projecten als Strowijk Iewan (Talis), Wanrooij (Klokgroep) en BAM Flow. Kengetallen per project over kosten, CO2-reductie en materiaaltoepassing.',
      kernthema: 'Projecten & praktijk'
    },
    {
      naam: 'Samenvatting overheidsbeleid biobased bouwen',
      bestand: '3. Samenvatting van het overheidsbeleid BBB.docx',
      categorie: 'GMR Onderzoek',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Samenvatting van het relevante overheidsbeleid voor biobased bouwen: NABB (2023), Bouwbesluit, MPG-norm, Europese Construction Products Regulation (CPR 2026) en Wet kwaliteitsborging. Bevat tijdlijn van beleidswijzigingen.',
      kernthema: 'Beleid & regelgeving'
    },
    {
      naam: 'Hybride bouwen voor starters',
      bestand: '4. Hybride Bouwen for starters.docx',
      categorie: 'GMR Onderzoek',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Introductiepaper voor hybride bouwen: combinatie van biobased en conventionele materialen als laagdrempelige instapstrategie. Gericht op aannemers en corporaties die willen beginnen zonder full biobased te hoeven gaan. CLT hybride scoort 27% lager GWP.',
      kernthema: 'Hybride bouwen'
    },
    {
      naam: 'Analyse: vervallen MPG-norm',
      bestand: '5. Vervallen MPG.docx',
      categorie: 'GMR Onderzoek',
      type: 'docx',
      datum: '2026',
      beschrijving: 'Analyse van de (dreigende) afschaffing van de MPG-norm (Milieuprestatie Gebouwen) en de gevolgen voor de verduurzaming van de bouwsector. Biobased bouw verliest een van zijn sterkste marktvoordelen als de MPG wegvalt.',
      kernthema: 'MPG & regelgeving'
    },

    // ── HET NIEUWE NORMAAL (HNN) ──────────────────────────────
    {
      naam: 'HNN Leidraad Nieuwbouw v1.2',
      bestand: 'hnn-leidraad-nieuwbouw-1.2.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Kernpublicatie van Het Nieuwe Normaal: stapsgewijs raamwerk voor circulair en biobased bouwen bij nieuwe woningbouw- en utiliteitsbouwprojecten. Bevat 12 maatregelcategorieën (losmaakbaarheid, herkomst materialen, MPG, etc.). Directe referentie voor de beleidssimulatortab.',
      kernthema: 'HNN raamwerk'
    },
    {
      naam: 'HNN Leidraad Bestaande Bouw v0.6',
      bestand: 'hnn-leidraad-bestaande-bouw-0.6.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'HNN-richtlijnen voor circulaire renovatie en verduurzaming van bestaande gebouwen. Aandacht voor losmaakbaarheid bij renovatie, hergebruik van uitkomende materialen en biobased isolatietoepassingen in bestaande bouw.',
      kernthema: 'Bestaande bouw'
    },
    {
      naam: 'HNN Leidraad Infra v1.2',
      bestand: 'hnn-leidraad-infra-1.2.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Toepassing van HNN-circulaire principes op infrastructuurprojecten: wegen, viaducten, bruggen. Bevat maatregelen voor hergebruik van asfalt, beton en staal, alsmede biobased alternatieven voor traditionele infra-materialen.',
      kernthema: 'Infrastructuur'
    },
    {
      naam: 'HNN Leidraad Openbare Ruimte 2026 v4',
      bestand: 'hnn-leidraad-openbare-ruimte-2026-v4.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2026',
      beschrijving: 'Circulaire inrichting van de openbare ruimte: elementenverharding, losmaakbare straatmeubilair, biobased groenvak-elementen. Meest recente leidraad (2026) met concrete maatregelen voor gemeentelijke buitenruimte.',
      kernthema: 'Openbare ruimte'
    },
    {
      naam: 'HNN Leidraad Sloop v1.0',
      bestand: 'hnn-leidraad-sloop-1.0.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Circulair slopen en hoogwaardig hergebruik van materiaalstromen: "oogstronde" vóór sloop, inventarisatie van herbruikbare componenten, koppeling van sloopplan aan nieuwbouwontwerp. Relevant voor corporaties met sloopportefeuille.',
      kernthema: 'Circulair slopen'
    },
    {
      naam: 'HNN Onderbouwing v1.0',
      bestand: 'HNN-onderbouwing-versie 1.0.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Wetenschappelijke en empirische onderbouwing van het HNN-raamwerk. Verantwoording van de gekozen indicatoren, meetmethoden en ambitieniveaus. Essentieel voor iedereen die HNN in beleid of aanbestedingen wil onderbouwen.',
      kernthema: 'HNN raamwerk'
    },
    {
      naam: 'Handreiking aanbesteden met HNN v1.0',
      bestand: 'handreiking-aanbesteden-met-het-nieuwe-normaal-1.0.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Praktische handreiking voor het opnemen van HNN-eisen in aanbestedingsprocedures. Direct toepasbaar door gemeenten en provincies. Bevat voorbeeldteksten, gunningscriteria en beoordelingsmodellen.',
      kernthema: 'Aanbesteden'
    },
    {
      naam: 'HNN Spelregels Aanbesteden',
      bestand: 'hnn-spelregels-aanbesteden.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Concrete spelregels en contractuele bepalingen voor aanbesteden conform HNN. Onderscheid tussen minimumvereisten, ambitieniveaus en inspanningsverplichtingen. Specifiek gericht op inkopers van gemeenten en woningcorporaties.',
      kernthema: 'Aanbesteden'
    },
    {
      naam: 'HNN Starten door te doen',
      bestand: 'hnn-handreiking-starten-door-te-doen.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Laagdrempelige handleiding voor opdrachtgevers die HNN willen toepassen zonder uitgebreide expertise. Stappenplan, veelgemaakte fouten en succesfactoren uit de eerste generatie HNN-projecten.',
      kernthema: 'Implementatie'
    },
    {
      naam: 'HNN Handreiking Inkopen Infra v3',
      bestand: 'HNN-Handreiking-inkopen-Infra-v3-HR-WEB.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'HNN-inkoophandreiking specifiek voor infraprojecten. Gericht op gemeentelijke en provinciale inkopers bij aanleg en onderhoud van wegen, fietspaden en civieltechnische werken.',
      kernthema: 'Infrastructuur'
    },
    {
      naam: 'HNN voor Hoger Onderwijs',
      bestand: 'HNN voor Hoger Onderwijs.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Introductie van HNN toegespitst op het hoger onderwijs. Geschikt als studiemateriaal voor studenten duurzame bouw en als referentiedocument voor dit minor-project.',
      kernthema: 'Onderwijs'
    },
    {
      naam: 'HNN Whitepaper CSRD',
      bestand: 'HNN-Whitepaper-CSRD-web.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'HNN in relatie tot de Corporate Sustainability Reporting Directive (CSRD). Hoe bouwbedrijven en corporaties HNN-prestaties kunnen gebruiken in hun CSRD-rapportage. Relevant voor grotere marktpartijen met rapportageverplichting.',
      kernthema: 'CSRD & rapportage'
    },
    {
      naam: 'HNN Samenhang C2C Certificering',
      bestand: 'HNN-Samenhang-C2C-Cert.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Vergelijking van HNN met Cradle to Cradle (C2C) certificering. Welke eisen overlappen en waar zitten de verschillen? Helpt opdrachtgevers kiezen welk raamwerk het beste past bij hun project.',
      kernthema: 'Certificering'
    },
    {
      naam: 'HNN Vergelijking Raamwerken & Instrumenten v4',
      bestand: 'hnn-vergelijking-raamwerk-en-instrumenten-v4.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Uitgebreide vergelijking van HNN met andere circulaire raamwerken en instrumenten: BREEAM, GPR, DGBC, Level(s). Overzichtstabel met voor- en nadelen per instrument. Essentieel voor beleidsmakers die een instrumentkeuze moeten maken.',
      kernthema: 'Raamwerkvergelijking'
    },
    {
      naam: 'BREEAM-NL Nieuwbouw vs. HNN',
      bestand: 'Vergelijking-BREEAM-NL-Nieuwbouw-met-HNN.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Gedetailleerde vergelijking van BREEAM-NL Nieuwbouw met HNN op kredietgebied. Inhoudelijke analyse van overeenkomsten en verschilpunten, met advies over dubbele certificering.',
      kernthema: 'Raamwerkvergelijking'
    },
    {
      naam: 'HNN Standaardisatiebehoefte Gebouw',
      bestand: 'standaardisatiebehoefte-hnn-gebouw-1.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Analyse van de behoefte aan standaardisatie van HNN-eisen voor gebouwen. Welke indicatoren moeten worden gestandaardiseerd voor brede marktadoptie? Relevant voor producenten en ontwerpers.',
      kernthema: 'Standaardisatie'
    },
    {
      naam: 'Juridische toetsing HNN (definitief)',
      bestand: 'Juridische-toetsing-Het-Nieuwe-Normaal---definitief.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Definitief juridisch advies over de toepasbaarheid van HNN als eis in aanbestedingen. Hoe verhoudt HNN zich tot Europees aanbestedingsrecht en het proportionaliteitsbeginsel? Cruciale onderbouwing voor gemeenten die HNN willen verplichten.',
      kernthema: 'Juridisch'
    },
    {
      naam: 'HNN Kosten-perspectief',
      bestand: 'het-nieuwe-normaal-vanuit-kostenperspectief.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Analyse van meerkosten en terugverdieneffecten van HNN-maatregelen. Welke maatregelen zijn kostenneutraal en welke kosten extra? Onderbouwing van de businesscase voor biobased/circulair bouwen vanuit een financieel perspectief.',
      kernthema: 'Kosten & businesscase'
    },
    {
      naam: 'HNN Samenhang Beton- Bouw- Staalakkoord',
      bestand: 'Samenhang-Betonakkoord-Bouwakkoord-Staal-HNN.pdf',
      categorie: 'Het Nieuwe Normaal',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Overzicht van hoe HNN zich verhoudt tot sectorale akkoorden: Betonakkoord, Bouwakkoord en Staalakkoord. Helpt marktpartijen die al committment hebben aan sectorakkoorden begrijpen hoe HNN aanvullend werkt.',
      kernthema: 'Sectorakkoorden'
    },

    // ── NATIONAAL & EUROPEES BELEID ───────────────────────────
    {
      naam: 'Trendanalyse Biobased & Circulaire Bouw GMR',
      bestand: 'Trendanaylse.pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2026',
      beschrijving: 'Trendanalyse biobased en circulaire bouw in de GMR-regio. Vijf hoofdtrends met cijfermatige onderbouwing: kosten, beleid, ketenvorming, regelgeving en industrialisatie. Kernbron voor Tab 2 van het dashboard.',
      kernthema: 'Trends GMR'
    },
    {
      naam: 'Whitepaper GMR',
      bestand: 'Whitepaper GMR.pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2025',
      beschrijving: 'Strategisch witboek van de Groene Metropoolregio Arnhem-Nijmegen over de transitieagenda voor circulaire en biobased bouw. Regionale ambitiedocument met concrete doelstellingen voor 2030.',
      kernthema: 'GMR strategie'
    },
    {
      naam: 'Advies aan het Rijk — IenW 2024/2025',
      bestand: 'advies-aan-het-rijk-ienw-20242025.pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2025',
      beschrijving: 'Advies aan het Ministerie van Infrastructuur en Waterstaat (IenW) over circulaire bouw in infrastructuur. Beleidsaanbevelingen voor nationaal beleid op het gebied van MPG, CPR en aanbestedingsrecht.',
      kernthema: 'Rijksbeleid'
    },
    {
      naam: 'Advies aan het Rijk — VRO 2024/2025',
      bestand: 'advies-aan-het-rijk-vro-20242025.pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2025',
      beschrijving: 'Advies aan het Ministerie van Volkshuisvesting en Ruimtelijke Ordening (VRO) over circulaire woningbouw. Aanbevelingen voor woningbouwprogramma\'s, subsidies en bouwregelgeving.',
      kernthema: 'Rijksbeleid'
    },
    {
      naam: 'ING Strategy Paper — Biobased bouw versnellen',
      bestand: 'ING Strategy Paper - Biobased (land)bouw, samen sterk maar hoe te versnellen (1).pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'ING Strategy Paper over versnelling van de biobased transitie in landbouw en bouw. Financieringsperspectief, investeringskansen en barrières voor bancaire financiering van biobased projecten. Concrete aanbevelingen voor Rijksbeleid en financiële sector.',
      kernthema: 'Financiering'
    },
    {
      naam: 'Uitnodigingsplanologie',
      bestand: 'Uitnodigingsplanologie.pdf',
      categorie: 'Nationaal Beleid',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Uitnodigingsplanologie als planningsstrategie: hoe gemeenten via flexibele bestemmingsplannen en uitnodigend beleid ruimte bieden voor innovatieve en circulaire woningbouwinitiatieven zonder prescriptief te zijn.',
      kernthema: 'Planologie'
    },

    // ── ONDERZOEK & RAPPORTEN ─────────────────────────────────
    {
      naam: 'DRIFT Rapport — Staat van Transitie',
      bestand: 'DRIFT-Rapport-Staat-van-Transitie.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'DRIFT systeemanalyse van de biobased/circulaire transitie in Nederland vanuit transitiemanagementperspectief. Beschrijft transitiefasen, niche-innovaties en regime-barrières. Theoretische onderbouwing voor de stakeholder- en trendanalyse.',
      kernthema: 'Transitiemanagement'
    },
    {
      naam: 'Masterthesis — Adoptie biobased bouwmaterialen',
      bestand: 'Master Thesis Adoption of Biobased Building Materials Koen Wentholt s1044006 (1).pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Masterthesis Koen Wentholt over adoptie van biobased bouwmaterialen door marktpartijen. Kwalitatief onderzoek naar barrières (kosten, kennis, regelgeving) en drivers (subsidies, duurzaamheidsambities) voor marktadoptie in Nederland.',
      kernthema: 'Marktadoptie'
    },
    {
      naam: 'Circulaire Atlas Gelderland',
      bestand: 'DOC_Circulaire_Atlas_Gelderland_cf5e0685d4.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Provinciale atlas van circulaire initiatieven, bedrijven en grondstofstromen in Gelderland. Overzicht van biobased teeltgebieden, verwerkingsbedrijven en innovatieve bouwprojecten in de regio. Geografisch achtergronddocument.',
      kernthema: 'Regionale context'
    },
    {
      naam: 'Marktonderzoek Nederlandse carbon credits 2024',
      bestand: 'RR Marktonderzoek Nederlandse carbon credits (2024) DEF.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Marktonderzoek naar kansen voor Nederlandse carbon credits in biobased bouw. Biobased materialen slaan CO2 op — hoe kunnen bouwbedrijven en corporaties deze opslag verzilveren via carbon credit markt? Inclusief certificeringsroutes.',
      kernthema: 'Carbon credits'
    },
    {
      naam: 'Woningconcepten en hun prestaties',
      bestand: 'Woningconcepten-en-hun-prestaties_10.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Systematische vergelijking van Nederlandse woningbouwconcepten op energieprestatie, kosten, circulariteit en doorlooptijd. Bevat data over biobased en prefab concepten zoals HSB, CLT en houtskeletbouw.',
      kernthema: 'Woningconcepten'
    },
    {
      naam: 'Woningconcepten 2024 — Marktoverzicht',
      bestand: 'woningconcepten2024-laatste-versie-web.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Actueel marktoverzicht van beschikbare woningbouwconcepten in Nederland (2024). Overzicht van leveranciers, productspecificaties en duurzaamheidsprestaties van biobased en circulaire woningconcepten.',
      kernthema: 'Woningconcepten'
    },
    {
      naam: 'Eindscriptie ASSA',
      bestand: 'Eindscriptie ?ASSA!.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2025',
      beschrijving: 'Eindscriptie over biobased en circulaire bouw in de GMR-context. Student-onderzoek met inzichten over lokale toepassing van biobased materialen, ketensamenwerking en de rol van gemeentelijk beleid.',
      kernthema: 'Studentonderzoek'
    },
    {
      naam: 'Werken aan Veranderkracht',
      bestand: 'werken-aan-veranderkracht.pdf',
      categorie: 'Onderzoek & Rapporten',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Strategisch rapport over het versterken van verandercapaciteit bij overheden en organisaties in de circulaire transitie. Organisatieperspectief op het bouwen van draagvlak voor biobased bouw binnen gemeentelijke organisaties.',
      kernthema: 'Organisatieverandering'
    },

    // ── MATERIALEN & KETENS ───────────────────────────────────
    {
      naam: 'Building Balance — Kennisdossier',
      bestand: 'Kennisdossier Buidling Balance - proces en werkzijze dossiereigenaren.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Kennisdossier van Building Balance, de nationale ketenorganisatie voor biobased bouw. Overzicht van normering, certificering en marktpositie van biobased bouwmaterialen in Nederland. Beschrijft werkwijze voor dossiereigenaren.',
      kernthema: 'Ketenontwikkeling'
    },
    {
      naam: 'Handreiking voor producenten biobased materialen',
      bestand: 'handreiking-voor-producenten.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Praktische gids voor producenten die biobased bouwmaterialen op de markt willen brengen. Stappenplan voor certificering, LCA-berekening, NMD-opname en samenwerking met aannemers. Relevant voor regionale agrarische producenten.',
      kernthema: 'Producenten'
    },
    {
      naam: 'Factsheet Reststromen Agrarisch',
      bestand: 'Natuurverdubbelaars_factsheet-reststromen.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Factsheet over reststromen van agrarische gewassen (stro, vlas, hennep) voor biobased bouwtoepassingen. Cijfers over beschikbare volumes in de regio, verwerkingsstappen en afzetmogelijkheden. Koppeling met NABB-doelstelling teeltareaal.',
      kernthema: 'Agrarische ketens'
    },
    {
      naam: 'Notitie Kennisplatform WeGrow 2024',
      bestand: 'Notitie Kennisplatform WeGrow (2024).pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Notitie van Kennisplatform WeGrow over de biobased bouwketen vanuit agrarisch perspectief: teelt van vezelhennep en vlas, primaire verwerking en afzet aan bouwbedrijven. Aandacht voor de "missing link" in de Nederlandse biobased keten.',
      kernthema: 'Agrarische ketens'
    },
    {
      naam: 'Transitieagenda Biobased Haven Rotterdam',
      bestand: 'Transitie-agenda-Biobased-Haven-Rotterdam.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Transitieagenda voor de biobased sector in de haven van Rotterdam. Grootschalige logistieke keten als voorbeeld voor regionale aanpak. Importvolumes, verwerking en distributie van biobased grondstoffen voor de bouwsector.',
      kernthema: 'Logistiek & keten'
    },
    {
      naam: 'Climate Cleanup Certificatieprotocol Biobased Bouw v1.0',
      bestand: 'EN_Climate_Cleanup_Certification_Protocol_Biobased_Construction_v1.0.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Internationale standaard van Climate Cleanup voor CO2-opslag in biobased gebouwen. Protocol voor het meten en certificeren van biogene koolstofopslag in hout, hennep en stro. Basis voor carbon credit claims bij biobased projecten.',
      kernthema: 'CO2-certificering'
    },
    {
      naam: 'Technical Assessment — CO2-opslag in gebouwen',
      bestand: 'Technical Assessment Paper for certification methodology for carbon strorage in buildings 26-04-2024.pdf',
      categorie: 'Materialen & Ketens',
      type: 'pdf',
      datum: '2024',
      beschrijving: 'Wetenschappelijke beoordeling van certificeringsmethodologie voor koolstofopslag in gebouwen (april 2024). Onderbouwt de CO2-claims voor biobased bouwmaterialen. Technische basis voor Climate Cleanup certificaat.',
      kernthema: 'CO2-certificering'
    },

    // ── DATA & TOOLS ──────────────────────────────────────────
    {
      naam: '12-Maatregelenbox HNN — Dashboard',
      bestand: '12-maatregelenbox.xlsx',
      categorie: 'Data & Tools',
      type: 'xlsx',
      datum: '2024',
      beschrijving: 'Interactief Excel-dashboard met alle circulaire en biobased HNN-maatregelen geordend per thema: losmaakbaarheid, herkomst materialen, MPG, adaptief vermogen, gezonde materialen, CO2-opslag. Kernbron voor de beleidssimulatortab van dit dashboard.',
      kernthema: 'HNN maatregelen'
    },
    {
      naam: 'Trendanalyse Onderbouwing',
      bestand: 'Trendanalyse onderbouwing.xlsx',
      categorie: 'Data & Tools',
      type: 'xlsx',
      datum: '2026',
      beschrijving: 'Kwantitatieve onderbouwing van de vijf trendanalyse-pijlers. Brondata, berekeningen en bronvermeldingen achter de cijfers in Tab 2 van het dashboard. Inclusief kostenvergelijkingen, areaaldata en beleidsdeadlines.',
      kernthema: 'Trenddata'
    }
  ];

  const CATEGORIEEN = [
    'Alle', 'Interviews', 'GMR Onderzoek', 'Het Nieuwe Normaal',
    'Nationaal Beleid', 'Onderzoek & Rapporten', 'Materialen & Ketens', 'Data & Tools'
  ];

  const TYPE_CONFIG = {
    pdf:  { kleur: '#D94040', label: 'PDF',  icon: 'file-text' },
    docx: { kleur: '#2B6CB0', label: 'DOCX', icon: 'file-text' },
    xlsx: { kleur: '#276749', label: 'XLSX', icon: 'table'     }
  };

  let activeFilter = 'Alle';
  let zoekterm = '';
  let onRefreshIcons;

  // ── DOC URL RESOLVER ─────────────────────────────────────
  function docUrl(bestand) {
    if (!bestand) return '#';
    if (bestand.startsWith('http://') || bestand.startsWith('https://')) return bestand;
    const base = location.protocol === 'file:'
      ? BASE_PATH
      : 'https://raw.githubusercontent.com/karambaboy123/GMR-Advies/master/Biobased%20en%20Circulaire%20Bouw/';
    return base + encodeURIComponent(bestand);
  }

  // ── RENDER ────────────────────────────────────────────────
  function render() {
    const container = document.getElementById('deskresearch-content');
    const filtered = DOCS.filter(d => {
      const catOk = activeFilter === 'Alle' || d.categorie === activeFilter;
      const zoekOk = !zoekterm || d.naam.toLowerCase().includes(zoekterm) || d.beschrijving.toLowerCase().includes(zoekterm) || d.kernthema.toLowerCase().includes(zoekterm);
      return catOk && zoekOk;
    });

    const grouped = {};
    filtered.forEach(d => {
      if (!grouped[d.categorie]) grouped[d.categorie] = [];
      grouped[d.categorie].push(d);
    });

    container.innerHTML = `
      ${filterBarHTML()}
      ${Object.keys(grouped).length === 0
        ? `<div class="empty-state"><i data-lucide="search-x"></i><p>Geen documenten gevonden voor "<strong>${zoekterm}</strong>".</p></div>`
        : Object.entries(grouped).map(([cat, docs]) => categoryBlockHTML(cat, docs)).join('')
      }`;

    // Events
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.cat;
        render();
        onRefreshIcons();
      });
    });

    const searchInput = container.querySelector('#dr-search');
    if (searchInput) {
      searchInput.value = zoekterm;
      searchInput.addEventListener('input', (e) => {
        zoekterm = e.target.value.toLowerCase().trim();
        render();
        onRefreshIcons();
      });
    }

    container.querySelectorAll('.doc-open-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.open(docUrl(btn.dataset.bestand), '_blank');
      });
    });

    onRefreshIcons();
  }


  // ── FILTER BAR ────────────────────────────────────────────
  function filterBarHTML() {
    const counts = {};
    DOCS.forEach(d => { counts[d.categorie] = (counts[d.categorie] || 0) + 1; });

    return `<div class="dr-controls">
      <div class="dr-search-wrap">
        <i data-lucide="search" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:15px;height:15px;color:var(--tekst-licht);pointer-events:none"></i>
        <input id="dr-search" type="text" placeholder="Zoek in documenten, thema's…" class="dr-search-input">
      </div>
      <div class="filter-bar" style="margin:0;padding:0;background:none;border:none">
        ${CATEGORIEEN.map(cat => {
          const count = cat === 'Alle' ? DOCS.length : (counts[cat] || 0);
          return `<button class="filter-btn ${activeFilter === cat ? 'active' : ''}" data-cat="${cat}">
            ${cat} <span class="filter-count">${count}</span>
          </button>`;
        }).join('')}
      </div>
    </div>`;
  }

  // ── CATEGORY BLOCK ────────────────────────────────────────
  function categoryBlockHTML(cat, docs) {
    const iconMap = {
      'Interviews':          'mic',
      'GMR Onderzoek':       'pen-tool',
      'Het Nieuwe Normaal':  'layers',
      'Nationaal Beleid':    'landmark',
      'Onderzoek & Rapporten': 'book-open',
      'Materialen & Ketens': 'package',
      'Data & Tools':        'bar-chart-2'
    };
    return `
      <div class="dr-category-section">
        <div class="dr-category-header">
          <i data-lucide="${iconMap[cat] || 'folder'}"></i>
          <span>${cat}</span>
          <span class="dr-cat-count">${docs.length} ${docs.length === 1 ? 'document' : 'documenten'}</span>
        </div>
        <div class="doc-grid">
          ${docs.map(docCardHTML).join('')}
        </div>
      </div>`;
  }

  // ── DOC CARD ──────────────────────────────────────────────
  function docCardHTML(doc) {
    const cfg = TYPE_CONFIG[doc.type] || TYPE_CONFIG.pdf;
    return `
      <div class="doc-card">
        <div class="doc-card-top">
          <div class="doc-type-badge" style="background:${cfg.kleur}">
            <i data-lucide="${cfg.icon}" style="width:11px;height:11px"></i>
            ${cfg.label}
          </div>
          <div class="doc-kernthema-badge">${doc.kernthema}</div>
        </div>
        <div class="doc-title">${doc.naam}</div>
        <div class="doc-desc">${doc.beschrijving}</div>
        <div class="doc-card-footer">
          ${doc.datum ? `<span class="doc-datum"><i data-lucide="calendar" style="width:11px;height:11px"></i> ${doc.datum}</span>` : ''}
          <button class="doc-open-btn" data-bestand="${doc.bestand}">
            <i data-lucide="external-link" style="width:13px;height:13px"></i>
            Openen
          </button>
        </div>
      </div>`;
  }

  // ── PUBLIC API ────────────────────────────────────────────
  function init(refreshIconsFn) {
    onRefreshIcons = refreshIconsFn;
    render();
  }

  return { init };
})();
