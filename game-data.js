// ============================================================
// GAME-DATA.JS - Simulator data (afgesplitst van data.js)
// Bevat: GAME_ROUND_ENRICHMENTS, GAME_ROUNDS_DATA, GAME_SCENARIOS
// ============================================================


// ============================================================
// GAME_ROUND_ENRICHMENTS — per-optie systeemeffecten + stakeholderreactie
// Gekoppeld aan GAME_ROUNDS_DATA via optie-id (g1a, p2b, etc.)
// Effecten: delta op {politiek, markt, budget, samenwerking} (0-100 schaal)
// Reactie: één stakeholder reageert direct na de keuze
// triggerEvent: id uit GAME_SCRIPTED_EVENTS, of null
// ============================================================

const GAME_ROUND_ENRICHMENTS = {
  // ---- GEMEENTE ----
  g1a: {
    effecten: { politiek: +15, markt: +10, budget: -5, samenwerking: +5 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Grondpolitiek als hefboom is een slimme zet. Wij bouwen liever op gemeentegrond mét biobased eis dan op privaat terrein zonder. Het geeft ons projectzekerheid.", sentiment: "positief" },
    triggerEvent: null
  },
  g1b: {
    effecten: { politiek: +20, markt: +5, budget: -10, samenwerking: -5 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "HNN verplicht in aanbestedingen — dat is een stevige keuze. Wij kunnen het aan, maar kleine aannemers haken mogelijk af. De markt is er nog niet helemaal klaar voor.", sentiment: "kritisch" },
    triggerEvent: null
  },
  g1c: {
    effecten: { politiek: +5, markt: +20, budget: -20, samenwerking: +15 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Deze subsidieregeling brengt biobased echt binnen bereik voor ons. Wij hebben al 3 projecten klaar staan. Eindelijk een gemeente die de meerkosten serieus neemt.", sentiment: "positief" },
    triggerEvent: null
  },
  g2a: {
    effecten: { politiek: +10, markt: +15, budget: -5, samenwerking: +20 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Samen met de gemeente als tandem — dat is hoe het moet werken. Talis committeert 200 biobased huurwoningen. We weten nu dat er vraag is én dat er grond beschikbaar is.", sentiment: "positief" },
    triggerEvent: null
  },
  g2b: {
    effecten: { politiek: +5, markt: +20, budget: -10, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Het faciliteren van typegoedkeuringen is precies wat we nodig hadden. Elk volgend Flow-project gaat nu drie maanden sneller. Dit is een gamechanger.", sentiment: "positief" },
    triggerEvent: null
  },
  g2c: {
    effecten: { politiek: +15, markt: +5, budget: 0, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Goed dat u dit bij de provincie agendeert. Als HNN in de omgevingsverordening komt, hoeft niet elke gemeente het wiel opnieuw uit te vinden. Verwacht wel enige weerstand van collegagemeenten.", sentiment: "neutraal" },
    triggerEvent: null
  },
  g3a: {
    effecten: { politiek: -5, markt: +10, budget: -15, samenwerking: +5 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "De grondprijskorting lost het probleem op voor dit project, maar u heeft nu een precedent geschapen. Andere ontwikkelaars zullen ook korting vragen. Dat drukt uw positie.", sentiment: "kritisch" },
    triggerEvent: null
  },
  g3b: {
    effecten: { politiek: +10, markt: -10, budget: 0, samenwerking: -10 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Wij nemen het project over. U houdt de lijn — dat is principieel sterk. Korte vertraging, maar op de lange termijn versterkt u uw onderhandelingspositie enorm.", sentiment: "positief" },
    triggerEvent: "juridisch_bezwaar"
  },
  g3c: {
    effecten: { politiek: +5, markt: +5, budget: -5, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Pragmatisch. Het leerdocument dat u vraagt is waardevol voor de hele GMR. Maar wees eerlijk: 50% biobased is niet de norm die we nastreven. Volgende project terug naar 100%.", sentiment: "neutraal" },
    triggerEvent: null
  },
  g4a: {
    effecten: { politiek: +20, markt: +10, budget: -5, samenwerking: +5 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Dit raadsvoorstel is het signaal dat de markt nodig had. Als HNN raadsbeleid is, weten aannemers dat biobased niet meer optioneel is. De GMR loopt nu voor op het Rijk.", sentiment: "positief" },
    triggerEvent: null
  },
  g4b: {
    effecten: { politiek: +15, markt: +15, budget: 0, samenwerking: +10 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "MPG als gunningscriterium is subtiel maar dodelijk effectief. Wij scoren structureel beter dan concurrenten op dit criterium. Biobased bouwen wordt zo de rationele keuze.", sentiment: "positief" },
    triggerEvent: null
  },
  g4c: {
    effecten: { politiek: +10, markt: +20, budget: -10, samenwerking: +25 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "Met vijf gemeenten die gezamenlijk inkopen worden biobased materialen ineens 15–20% goedkoper. Dat haalt de laatste drempel weg. Klokgroep gaat alle GMR-projecten van 2027 biobased offreren.", sentiment: "positief" },
    triggerEvent: "coalitie_versnelling"
  },

  // ---- PROVINCIE ----
  p1a: {
    effecten: { politiek: +25, markt: +5, budget: -5, samenwerking: -10 },
    reactie: { naam: "Wethouder (fictief)", org: "Gemeente Zevenaar", icon: "building-2",
      tekst: "Dit gaat ons te snel. De omgevingsverordening als dwanginstrument — gemeenten zijn niet klaar voor deze meerkosten. Wij overwegen bezwaar.", sentiment: "kritisch" },
    triggerEvent: null
  },
  p1b: {
    effecten: { politiek: +10, markt: +20, budget: -25, samenwerking: +20 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "De subsidieregeling met de kennisdeling-eis is precies de juiste combinatie. Wij dienen direct een aanvraag in voor onze Flow-woningen. De kennisbank gaat de sector versnellen.", sentiment: "positief" },
    triggerEvent: "RVO_subsidie"
  },
  p1c: {
    effecten: { politiek: +10, markt: +25, budget: -15, samenwerking: +25 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Dit ketenmodel is exact wat ontbrak. Als boeren, verwerkers en bouwers contractueel verbonden zijn, is leveringszekerheid geen probleem meer. Talis stapt in als eerste afnemer.", sentiment: "positief" },
    triggerEvent: null
  },
  p2a: {
    effecten: { politiek: +5, markt: +10, budget: -10, samenwerking: +20 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "De training voor ambtenaren maakt echt verschil. Onze mensen merken dat vergunninggesprekken nu anders verlopen — meer begrip voor wat biobased inhoudt, minder onnodige discussies.", sentiment: "positief" },
    triggerEvent: null
  },
  p2b: {
    effecten: { politiek: +10, markt: +5, budget: -10, samenwerking: +15 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "De juridische helpdesk is een opluchting. Gemeenten durfden eerder geen biobased eisen te stellen uit angst voor bezwaren. Nu kunnen ze het — en ons ook. Bezwaarprocedures zijn met 60% gedaald.", sentiment: "positief" },
    triggerEvent: null
  },
  p2c: {
    effecten: { politiek: +10, markt: +10, budget: -10, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Materialenpaspoorten als voorwaarde voor cofinanciering is een slimme zet: we bouwen nu al de data-infrastructuur op die over 30 jaar nodig is. BZK heeft hier extra interesse in getoond.", sentiment: "positief" },
    triggerEvent: null
  },
  p3a: {
    effecten: { politiek: +5, markt: +15, budget: -25, samenwerking: +15 },
    reactie: { naam: "Wethouder (fictief)", org: "Gemeente Montferland", icon: "building-2",
      tekst: "Met de aanvullende subsidie kunnen we het toch aan. De eerste drie projecten worden biobased. Daarna moeten we zien of de businesscase op eigen kracht werkt.", sentiment: "neutraal" },
    triggerEvent: null
  },
  p3b: {
    effecten: { politiek: +15, markt: -5, budget: -5, samenwerking: -15 },
    reactie: { naam: "Wethouder (fictief)", org: "Gemeente Renkum", icon: "building-2",
      tekst: "U dwingt ons. Wij gaan mee omdat we geen keus hebben, maar dit voelt niet als partnerschap. Als de samenwerking zo begint, is het moeilijk om later gezamenlijk voortgang te boeken.", sentiment: "kritisch" },
    triggerEvent: "juridisch_bezwaar"
  },
  p3c: {
    effecten: { politiek: +10, markt: +10, budget: -5, samenwerking: +25 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Het leernetwerk was verrassend effectief. Zodra gemeenten zagen wat buurgemeenten bereikten, wilden ze ook meedoen. Peer pressure werkt beter dan provinciale dwang.", sentiment: "positief" },
    triggerEvent: null
  },
  p4a: {
    effecten: { politiek: +25, markt: +10, budget: -5, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Als de GWPa-eis terugkomt in het Bouwbesluit, wordt de biobased businesscase automatisch beter. Wij hoeven dan niet meer uit te leggen waarom biobased het waard is — het staat gewoon in de wet.", sentiment: "positief" },
    triggerEvent: null
  },
  p4b: {
    effecten: { politiek: +15, markt: +25, budget: -20, samenwerking: +20 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "Het nationale showcase-project trekt kopers en bouwers van over het hele land. Klokgroep heeft al drie delegaties ontvangen. Dit is precies de zichtbaarheid die biobased bouw nodig had.", sentiment: "positief" },
    triggerEvent: "landelijke_media"
  },
  p4c: {
    effecten: { politiek: +20, markt: +15, budget: -5, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "De GMR-norm van 40% geeft marktpartijen de zekerheid die ze nodig hebben om te investeren. BZK heeft ons al gebeld — ze willen dit als blauwdruk gebruiken voor de nationale norm.", sentiment: "positief" },
    triggerEvent: null
  },

  // ---- AANNEMER ----
  a1a: {
    effecten: { politiek: +5, markt: +20, budget: -20, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Een nationaal goedgekeurd typegoedkeuring is precies wat gemeenten nodig hebben om snel te kunnen handelen. Gelderland geeft voorrang bij vergunningen voor uw gecertificeerde concept.", sentiment: "positief" },
    triggerEvent: null
  },
  a1b: {
    effecten: { politiek: +5, markt: +15, budget: -15, samenwerking: +15 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Vier pilotwoningen — dat is hoe wij ook begonnen. Klein beginnen, fouten maken op kleine schaal, dan opschalen. Uw team zal dingen leren die geen training kan bijbrengen.", sentiment: "positief" },
    triggerEvent: null
  },
  a1c: {
    effecten: { politiek: +5, markt: +10, budget: -10, samenwerking: +20 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Het sociale aspect is het belangrijkste. Als uw bouwteam enthousiast is, ziet u dat terug in de kwaliteit van het werk. Wij trainen ook intern — dit is de investering die telt.", sentiment: "positief" },
    triggerEvent: null
  },
  a2a: {
    effecten: { politiek: +5, markt: +15, budget: +10, samenwerking: +20 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Eindelijk een aannemer die begrijpt dat wij als corporatie lange-termijndenken nodig hebben. Dit pilotcomplex van 24 woningen geeft ons de data om biobased structureel in ons MJOP op te nemen.", sentiment: "positief" },
    triggerEvent: null
  },
  a2b: {
    effecten: { politiek: +15, markt: +10, budget: +5, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "De biobased sporthal in Nijmegen is een perfecte showcase voor HNN in de praktijk. De gemeente maakt uw kosten transparant — dat leert de hele sector wat biobased écht kost.", sentiment: "positief" },
    triggerEvent: null
  },
  a2c: {
    effecten: { politiek: 0, markt: +20, budget: +20, samenwerking: +5 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "De koopsector heeft bewuste kopers die biobased waarderen. Wij doen hetzelfde met Klokgroep Wanrooij. De marge is beter dan sociale huur, maar de klant moet het verhaal snappen.", sentiment: "neutraal" },
    triggerEvent: null
  },
  a3a: {
    effecten: { politiek: +10, markt: +15, budget: -20, samenwerking: +20 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Wij doen graag mee aan het nationaal testrapport. Als dit sectorbreed gedeeld wordt, verdienen we de investering 10x terug in bespaarde vergunningdiscussies. Neem contact op.", sentiment: "positief" },
    triggerEvent: null
  },
  a3b: {
    effecten: { politiek: 0, markt: +5, budget: -5, samenwerking: +5 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Elke keer opnieuw onderhandelen met de brandweer kost u tijd die u niet heeft. Dit lost het probleem op voor dit project — maar het volgend jaar heeft u hetzelfde probleem.", sentiment: "kritisch" },
    triggerEvent: null
  },
  a3c: {
    effecten: { politiek: 0, markt: +10, budget: +5, samenwerking: +10 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Hybride is soms de enige optie. Wij hebben het ook gedaan op moeilijke locaties. Zorg dat u de lessen documenteert — zodat de volgende aannemer dit niet ook hoeft te doen.", sentiment: "neutraal" },
    triggerEvent: null
  },
  a4a: {
    effecten: { politiek: +5, markt: +30, budget: +15, samenwerking: +10 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "Seriebouw is het antwoord. Als u 100 biobased woningen per jaar bouwt, dalen de kosten radicaal en raakt de hele sector gewend aan uw systemen. Klokgroep wil uw eerste klant zijn.", sentiment: "positief" },
    triggerEvent: "vakmanschapstekort"
  },
  a4b: {
    effecten: { politiek: +10, markt: +20, budget: -15, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Uw MPG-voordeel via LCA maakt een enorm verschil bij provinciale aanbestedingen. Als biobased concepten 40% beter scoren, winnen ze automatisch. Dit is een structurele marktvoordeel.", sentiment: "positief" },
    triggerEvent: null
  },
  a4c: {
    effecten: { politiek: +5, markt: +20, budget: +25, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Carbon credits als inkomstenstroom — dát is de doorbraak in de businesscase. Als €3.500–6.000 per woning structureel terugvloeit, zijn de meerkosten van biobased volledig gedekt.", sentiment: "positief" },
    triggerEvent: null
  },

  // ---- CORPORATIE ----
  c1a: {
    effecten: { politiek: +10, markt: +10, budget: -10, samenwerking: +15 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Biobased verankeren in het MJOP is de sleutelstap. Zodra het in de planningscyclus zit, stopt het 'extra-inspanning'-gevoel. Het wordt dan gewoon hoe u bouwt.", sentiment: "positief" },
    triggerEvent: null
  },
  c1b: {
    effecten: { politiek: +5, markt: +15, budget: +20, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "MIA/Vamil optimaal benutten is slim. Dat 36% investeringsaftrek maakt biobased direct financieel haalbaar voor corporaties. Wij adviseren ook de andere GMR-corporaties dit te doen.", sentiment: "positief" },
    triggerEvent: null
  },
  c1c: {
    effecten: { politiek: +15, markt: +20, budget: -20, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Uw pilotcomplex haalt nationale media. Wij krijgen al vragen van drie gemeenten die een vergelijkbaar project willen. U heeft de sector een dienst bewezen.", sentiment: "positief" },
    triggerEvent: "landelijke_media"
  },
  c2a: {
    effecten: { politiek: +15, markt: +10, budget: +10, samenwerking: +20 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "Gemeente en corporatie als tandem — grond + vergunningsprioriteit gecombineerd met langjarig afname-commitment. Dit is het model dat de markt beweegt.", sentiment: "positief" },
    triggerEvent: null
  },
  c2b: {
    effecten: { politiek: +5, markt: +15, budget: +20, samenwerking: +25 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Een inkoopcoalitie van vier corporaties — dat is het volume dat wij als bouwer nodig hebben om te investeren in biobased productiecapaciteit. Dat 22% prijsdaling is nog conservatief.", sentiment: "positief" },
    triggerEvent: "corporatie_coalitie"
  },
  c2c: {
    effecten: { politiek: +5, markt: +20, budget: -10, samenwerking: +25 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Ketenregie is complex maar krachtig. Als u als corporatie de schakel vormt tussen boer en bouwer, heeft u unieke controle over kwaliteit én prijs. Talis doet dit ook bij Strowijk.", sentiment: "positief" },
    triggerEvent: null
  },
  c3a: {
    effecten: { politiek: +5, markt: +10, budget: -5, samenwerking: +10 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "De communicatiecampagne heeft de ergste druk weggenomen. Maar 30% van de bewoners is nog sceptisch. Onderbouw uw verhaal met harde cijfers bij de volgende gelegenheid.", sentiment: "neutraal" },
    triggerEvent: null
  },
  c3b: {
    effecten: { politiek: +10, markt: +15, budget: -10, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Uw onafhankelijke terugverdientermijn-rapport wordt nationaal geciteerd. BZK gebruikt het als bewijs dat biobased ook voor sociale huur financieel haalbaar is. Uitstekend werk.", sentiment: "positief" },
    triggerEvent: "kennisdeling_effect"
  },
  c3c: {
    effecten: { politiek: +10, markt: +10, budget: -15, samenwerking: +15 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Een prestatiegarantie aan bewoners — dat is echt commitment. Het dwingt u en ons als bouwer om biobased goed te laten werken. We accepteren de uitdaging.", sentiment: "neutraal" },
    triggerEvent: null
  },
  c4a: {
    effecten: { politiek: +15, markt: +10, budget: -5, samenwerking: +20 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "Biobased in de prestatieafspraken verankerd — dat is publiek en afdwingbaar. Als corporaties dit breed uitrollen, is er structurele vraag voor biobased bouwers. Klokgroep gaat ook lobbyen bij de gemeenten.", sentiment: "positief" },
    triggerEvent: null
  },
  c4b: {
    effecten: { politiek: +10, markt: +10, budget: -10, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Materialenpaspoorten zijn de toekomst. Als uw portefeuille straks goed gedocumenteerd is, zijn de materialen bij renovatie of sloop rechtstreeks herbruikbaar. Dit is echte circulariteit.", sentiment: "positief" },
    triggerEvent: null
  },
  c4c: {
    effecten: { politiek: +10, markt: +15, budget: -5, samenwerking: +10 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Een openbare CO₂-analyse is CSRD-klaar én een krachtig communicatiemiddel. Als iedereen ziet wat biobased oplevert in CO₂-reductie, versterkt dat het draagvlak enorm.", sentiment: "positief" },
    triggerEvent: null
  },

  // ---- GEMEENTE extra (4e opties) ----
  g1d: {
    effecten: { politiek: +10, markt: +15, budget: -10, samenwerking: +10 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Eindelijk een gemeente die begrijpt dat snelheid geld is. Wij hebben drie projecten klaarstaan die we wilden indienen maar de doorlooptijd hield ons tegen. Met dit loket gaan we direct van start.", sentiment: "positief" },
    triggerEvent: null
  },
  g2d: {
    effecten: { politiek: +15, markt: +20, budget: -5, samenwerking: +10 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "MPG als gunningscriterium is eerlijker dan directe biobased-eisen. We investeren nu in LCA-optimalisatie voor onze concepten. Biobased wint de aanbestedingen vanzelf — dat is de markt.", sentiment: "positief" },
    triggerEvent: null
  },
  g3d: {
    effecten: { politiek: +5, markt: +5, budget: -15, samenwerking: +15 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Een kostenonderzoek door HAN en TNO is een verstandige keuze. De data die dit oplevert is waardevol — niet alleen voor dit project, maar voor de hele regio. We ondersteunen dit vanuit HNN.", sentiment: "positief" },
    triggerEvent: null
  },
  g4d: {
    effecten: { politiek: +10, markt: +25, budget: -20, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Dit is de meest transparante biobased prikkel die ik ooit heb gezien van een gemeente. We kunnen dit direct inprijzen in onze offertes. Klanten snappen het, wij snappen het — werkt.", sentiment: "positief" },
    triggerEvent: "coalitie_versnelling"
  },

  // ---- PROVINCIE extra (4e opties) ----
  p1d: {
    effecten: { politiek: +5, markt: +20, budget: -15, samenwerking: +20 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Duits aanbod van hout en vlas sloot precies het gat in onze inkoopketen. Dit is slim regionaal denken: de grens is geen belemmering als de keten het vraagt.", sentiment: "positief" },
    triggerEvent: null
  },
  p2d: {
    effecten: { politiek: +15, markt: +15, budget: -25, samenwerking: +20 },
    reactie: { naam: "Maarten van Ginkel", org: "Gemeente Nijmegen", icon: "building-2",
      tekst: "Als de provincie extra cofinanciering geeft bij HNN-adoptie, worden de gesprekken in de raad veel gemakkelijker. De kosten-batenanalyse is dan helder. Nijmegen was al in, maar dit helpt de kleinere gemeenten.", sentiment: "positief" },
    triggerEvent: null
  },
  p3d: {
    effecten: { politiek: +15, markt: +5, budget: -10, samenwerking: +25 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Mediation klinkt soft maar het werkt. De weigeraars hadden concrete vragen die de provincie niet had beantwoord. Nu ze zijn gehoord, staan ze open. Draagvlak bouw je niet met verordeningen.", sentiment: "positief" },
    triggerEvent: null
  },
  p4d: {
    effecten: { politiek: +20, markt: +15, budget: -5, samenwerking: +15 },
    reactie: { naam: "Thijs Pleijhuis", org: "Klokgroep", icon: "building-2",
      tekst: "De Omgevingsvisie geeft ons 10 jaar zekerheid. Wij kunnen nu langjarig investeren in biobased productiecapaciteit, wetend dat de vraag in de GMR structureel blijft. Dit is wat de markt nodig heeft.", sentiment: "positief" },
    triggerEvent: "coalitie_versnelling"
  },

  // ---- AANNEMER extra (4e opties) ----
  a1d: {
    effecten: { politiek: +5, markt: +10, budget: -15, samenwerking: +20 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "De samenwerking met HAN en TNO levert publieke kennis op die de hele sector ten goede komt. Provincie Gelderland wil dit meefinancieren via het HNN-tenderbudget.", sentiment: "positief" },
    triggerEvent: null
  },
  a2d: {
    effecten: { politiek: +15, markt: +15, budget: -10, samenwerking: +20 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Dit is precies wat HNN bedoeld heeft te bereiken: aannemers en provincie als partners in een pilotgebied. Drie projecten tegelijk — dat is de schaal die leren versnelt.", sentiment: "positief" },
    triggerEvent: null
  },
  a3d: {
    effecten: { politiek: +10, markt: +5, budget: -5, samenwerking: +20 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "Een sector-brede lobbybrief heeft meer impact dan individuele gesprekken. BZK reageert op collectieve signalen. Als BAM, Van Wijnen en Klokgroep samen vragen, kan het Rijk niet om ons heen.", sentiment: "positief" },
    triggerEvent: "media_doorbraak"
  },
  a4d: {
    effecten: { politiek: +5, markt: +20, budget: -15, samenwerking: +15 },
    reactie: { naam: "Tom Stolker", org: "BAM Wonen", icon: "hard-hat",
      tekst: "Finse prefabfabrieken zijn 15 jaar verder dan wij. De studiereis bespaarde ons minimaal 2 jaar ontwikkelingstijd. Kennis importeren is sneller dan alles zelf uitvinden.", sentiment: "positief" },
    triggerEvent: null
  },

  // ---- CORPORATIE extra (4e opties) ----
  c1d: {
    effecten: { politiek: +5, markt: +10, budget: +25, samenwerking: +10 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Carbon credits als onderdeel van de businesscase — dit is de doorbraak die corporaties nodig hebben. Als u dit toepast, laat u zien dat biobased ook financieel verstandig is. Provincie wil dit als pilot ondersteunen.", sentiment: "positief" },
    triggerEvent: null
  },
  c2d: {
    effecten: { politiek: +5, markt: +5, budget: -10, samenwerking: +20 },
    reactie: { naam: "Bart Triep", org: "Van Wijnen", icon: "hard-hat",
      tekst: "HAN-studenten die woonervaring documenteren — dat is goud. Wij kregen terugkoppeling over detailleringsfouten die we in het volgend project direct konden verbeteren. Meer bouwbedrijven zouden dit moeten willen.", sentiment: "positief" },
    triggerEvent: null
  },
  c3d: {
    effecten: { politiek: +15, markt: +15, budget: -5, samenwerking: +20 },
    reactie: { naam: "Melany Thijssen", org: "Talis Woningcorporatie", icon: "home",
      tekst: "Bewoners die zelf het verhaal vertellen zijn onbetaalbaar als communicatiemiddel. De open dag was beter dan elke marketingcampagne die we ooit gedaan hebben. Talis doet dit bij elk volgend project.", sentiment: "positief" },
    triggerEvent: "landelijke_media"
  },
  c4d: {
    effecten: { politiek: +15, markt: +10, budget: -10, samenwerking: +20 },
    reactie: { naam: "Myriam van Zetten", org: "Provincie Gelderland", icon: "landmark",
      tekst: "Uw publicatie via Aedes en Cirkelstad is de beste investering die u als corporatie kunt doen. Kennis delen versnelt de hele transitie. Provincie gebruikt het als standaardreferentie bij tenderregelingen.", sentiment: "positief" },
    triggerEvent: "kennisdeling_effect"
  }
};

// ============================================================
// GAME_ROUNDS_DATA — 4-ronden beleidssimulatorgame
// Nieuw: effecten op systeemvariabelen + stakeholderreacties per keuze
// Keuze-dilemma's zijn niet zwart-wit — elke route heeft trade-offs
// ============================================================

const GAME_ROUNDS_DATA = {
  gemeente: [
    {
      ronde: 1, fase: "Ronde 1 — Eerste beleidsstap",
      context: "Najaar 2026. Het college heeft u gevraagd een biobased bouwstrategie op te stellen. U heeft drie maanden, beperkt budget en politiek mandaat.",
      vraag: "Wat is uw eerste concrete beleidsstap?",
      opties: [
        { id:"g1a", label:"Grondpolitiek als hefboom", icon:"map-pin",
          beschrijving:"Biobased/circulaire percentages koppelen aan gronduitgifte. Bij nieuwe kavels eis je minimaal 30% biobased. Stapsgewijs verhogen per jaar — de aanpak van Gemeente Nijmegen.",
          gevolg:"U koos grondpolitiek: ontwikkelaars op gemeentegrond moeten biobased bouwen, of de kavel gaat naar een andere partij.",
          scores:{adoptionScore:70,costScore:40,regulationScore:80} },
        { id:"g1b", label:"HNN in aanbestedingen verankeren", icon:"file-check",
          beschrijving:"Het Nieuwe Normaal opnemen als verplicht toetsingskader bij alle gemeentelijke bouwprojecten en vastgoedaanbestedingen boven €250k.",
          gevolg:"U koos HNN als aanbestedingskader: elk gemeentelijk bouwproject wordt beoordeeld op circulariteit, losmaakbaarheid en biobased materiaalgebruik.",
          scores:{adoptionScore:60,costScore:30,regulationScore:92} },
        { id:"g1c", label:"Subsidieregeling voor pilotprojecten", icon:"coins",
          beschrijving:"Een gemeentelijke subsidieregeling van €2 mln voor biobased pilots, gericht op woningcorporaties en kleine bouwers die financieel risico mijden.",
          gevolg:"U koos subsidie: de financiële drempel is weggenomen voor early adopters. Meteen 8 aanvragen binnen.",
          scores:{adoptionScore:80,costScore:88,regulationScore:25} },
        { id:"g1d", label:"Vergunnings-sneltraject biobased", icon:"zap",
          beschrijving:"Een intern fast-track loket opzetten: biobased bouwplannen worden binnen 6 weken beoordeeld in plaats van de gebruikelijke 26 weken. De capaciteitsdrempel wordt zo weggenomen.",
          gevolg:"U koos vergunningsversnelling: bouwers zien direct voordeel. De eerste aanvragen kwamen binnen een maand. Snelheid is geld voor aannemers.",
          scores:{adoptionScore:72,costScore:35,regulationScore:68} }
      ]
    },
    {
      ronde: 2, fase: "Ronde 2 — Coalitie bouwen",
      context: "De eerste stap heeft politiek draagvlak. Maar u merkt dat u bondgenoten nodig heeft om dit structureel te verankeren.",
      vraag: "Wie maakt u als eerste strategische partner?",
      opties: [
        { id:"g2a", label:"Corporaties als launching customer", icon:"home",
          beschrijving:"Talis en Portaal uitnodigen voor een samenwerkingsovereenkomst: zij committeren zich aan biobased nieuwbouw, u faciliteert met grondpositie en vergunningsprioriteit.",
          gevolg:"U bouwde een coalitie met corporaties: Talis en Portaal committeren 200 biobased huurwoningen. Druk op aannemers neemt toe.",
          scores:{adoptionScore:75,costScore:65,regulationScore:40} },
        { id:"g2b", label:"Aannemers + typegoedkeuring faciliteren", icon:"hard-hat",
          beschrijving:"BAM en Van Wijnen uitnodigen: u faciliteert het typegoedkeuringstraject en geeft voorrang bij vergunningen voor gecertificeerde biobased concepten.",
          gevolg:"U bouwde een coalitie met aannemers: typegoedkeuringen worden gefaciliteerd. BAM en Van Wijnen kunnen sneller schalen.",
          scores:{adoptionScore:82,costScore:50,regulationScore:45} },
        { id:"g2c", label:"Provincie Gelderland: HNN regionaal verplichten", icon:"landmark",
          beschrijving:"Formeel verzoek aan Provincie Gelderland om HNN op te nemen in de omgevingsverordening — zodat het niet per gemeente verschilt.",
          gevolg:"U escaleerde naar provinciaal niveau: als Provincie HNN verankert, is de drempel voor alle GMR-gemeenten tegelijk weg.",
          scores:{adoptionScore:55,costScore:28,regulationScore:92} },
        { id:"g2d", label:"MPG-eis als gunningscriterium invoeren", icon:"bar-chart",
          beschrijving:"Bij alle gemeentelijke aanbestedingen de MPG-score verplicht opnemen als selectiecriterium. Biobased bouw wint systematisch — geen extra subsidie nodig.",
          gevolg:"U koos de stille marktprikkel: aannemers leerden dat MPG-optimalisatie direct leidt tot meer opdrachten. De markt paste zich aan zonder dwang.",
          scores:{adoptionScore:68,costScore:22,regulationScore:82} }
      ]
    },
    {
      ronde: 3, fase: "Ronde 3 — Tegenslag",
      context: "Een grote projectontwikkelaar dreigt uit een bouwproject te stappen. Zijn argument: de biobased eis drijft kosten met 9% op. De raad kijkt nerveus — woningproductie staat onder druk.",
      vraag: "Hoe reageert u op de dreiging van de projectontwikkelaar?",
      opties: [
        { id:"g3a", label:"Grondprijskorting als compensatie", icon:"percent",
          beschrijving:"Een eenmalige grondprijskorting van 5% aanbieden. De biobased eis blijft intact, bouwer wordt financieel over de drempel geholpen.",
          gevolg:"U gaf een tegemoetkoming: project gaat door, maar u heeft een precedent geschapen dat 'biobased altijd extra kost'.",
          scores:{adoptionScore:55,costScore:90,regulationScore:28} },
        { id:"g3b", label:"Eis handhaven, andere partij zoeken", icon:"shield",
          beschrijving:"Geen concessies. U zoekt actief een andere partij — BAM of Van Wijnen tonen interesse. Korte vertraging, maar principieel sterk.",
          gevolg:"U hield de lijn: de ontwikkelaar trok zich terug, maar BAM toonde interesse. Korte vertraging — structureel sterker standpunt.",
          scores:{adoptionScore:50,costScore:18,regulationScore:88} },
        { id:"g3c", label:"Hybride: 50% biobased voor dit project", icon:"layers",
          beschrijving:"Tijdelijke verlaging naar 50% biobased, met als voorwaarde dat de lessen worden gedocumenteerd in een openbaar leerdocument voor de GMR.",
          gevolg:"U koos pragmatisme: eis verlaagd maar kennisdeling als resultaat. Politiek tevreden, puristen kritisch.",
          scores:{adoptionScore:68,costScore:62,regulationScore:52} },
        { id:"g3d", label:"Tijdelijk uitstel: pilot evalueren", icon:"clock",
          beschrijving:"De biobased eis voor dit specifieke project tijdelijk opschorten terwijl een onafhankelijke kostenanalyse door HAN/TNO wordt uitgevoerd. Resultaat binnen 3 maanden.",
          gevolg:"U koos onderzoek boven haast: kostenstudie gaf heldere data. De eis werd daarna juridisch steviger onderbouwd — en de ontwikkelaar stapt terug in.",
          scores:{adoptionScore:45,costScore:55,regulationScore:40} }
      ]
    },
    {
      ronde: 4, fase: "Ronde 4 — Structurele verankering",
      context: "Het eerste pilotproject is succesvol opgeleverd. Er is positieve media-aandacht. Nu borgen voor de lange termijn.",
      vraag: "Welke maatregel verankert uw biobased beleid structureel?",
      opties: [
        { id:"g4a", label:"Raadsvoorstel: HNN verplicht vanaf 2027", icon:"gavel",
          beschrijving:"Raadsvoorstel indienen dat HNN verplicht stelt voor alle projecten boven 50 woningen. Stapsgewijs oplopende biobased%-eisen tot 2030.",
          gevolg:"U koos politieke verankering: HNN is nu raadsbeleid. Sterk signaal aan de markt — maar juridisch kwetsbaar voor bezwaren van marktpartijen.",
          scores:{adoptionScore:65,costScore:25,regulationScore:96} },
        { id:"g4b", label:"MPG als verplicht gunningscriterium", icon:"bar-chart",
          beschrijving:"Bij alle gemeentelijke aanbestedingen wordt MPG-score verplicht gunningscriterium. Biobased bouw wint systematisch door betere milieuprestatie.",
          gevolg:"U koos MPG als marktmechanisme: biobased bouw wint automatisch aanbestedingen. Subtiel maar structureel effectief.",
          scores:{adoptionScore:76,costScore:45,regulationScore:90} },
        { id:"g4c", label:"GMR-coalitie: 5 gemeenten samen", icon:"network",
          beschrijving:"Successen van Nijmegen delen met 4 andere GMR-gemeenten en een gezamenlijk biobased inkoopplatform oprichten. Volume bundelen.",
          gevolg:"U koos regionale samenwerking: 5 GMR-gemeenten bundelen hun inkoopvolume. Biobased materialen worden 15–20% goedkoper.",
          scores:{adoptionScore:86,costScore:60,regulationScore:65} },
        { id:"g4d", label:"Permanente grondprijskorting bij biobased%", icon:"percent",
          beschrijving:"Een structureel grondprijskortingtarief instellen: per 10% extra biobased-inhoud krijgt een ontwikkelaar 2% grondprijskorting. Zichtbaar, simpel en marktgestuurd.",
          gevolg:"U koos de marktprikkel: ontwikkelaars gingen rekenen en ontdekten dat 60% biobased rendabel is. Geen politieke weerstand — het systeem stuurt vanzelf.",
          scores:{adoptionScore:78,costScore:70,regulationScore:55} }
      ]
    }
  ],
  provincie: [
    {
      ronde: 1, fase: "Ronde 1 — HNN instrument inzetten",
      context: "Provincie Gelderland heeft HNN ontwikkeld maar toepassing is vrijwillig. U wilt de transitie versnellen met uw beschikbare instrumenten.",
      vraag: "Hoe zet u HNN het meest effectief in?",
      opties: [
        { id:"p1a", label:"HNN verplicht via omgevingsverordening", icon:"shield-check",
          beschrijving:"HNN juridisch verankeren in de provinciale omgevingsverordening. Gemeenten zijn dan verplicht HNN toe te passen bij projecten met provinciale cofinanciering.",
          gevolg:"U koos juridische verankering: HNN is nu verplicht bij alle provinciaal gefinancierde projecten. Hoogste impact, maar gemeenten protesteren over keuzevrijheid.",
          scores:{adoptionScore:85,costScore:25,regulationScore:98} },
        { id:"p1b", label:"Tenderregeling: subsidie + kennisdeling", icon:"coins",
          beschrijving:"Provinciale subsidieregeling voor biobased projecten, met als voorwaarde dat innovaties publiek worden gedeeld via een regionale kennisbank.",
          gevolg:"U koos subsidie als katalysator: 12 projecten dienden een aanvraag in. Kennis stroomt in een gedeelde database — breed voordeel voor de regio.",
          scores:{adoptionScore:76,costScore:86,regulationScore:30} },
        { id:"p1c", label:"Regionale keten GMR opzetten", icon:"network",
          beschrijving:"Building Balance-model naar de GMR brengen: boeren, verwerkers en bouwers contractueel verbinden via 'Boeren voor Biobased Bouwen Gelderland'.",
          gevolg:"U koos ketenopbouw: 8 boeren in Druten-Lingewaard committeren 200 ha vezelhennep. Verwerkingslocatie in aanbouw.",
          scores:{adoptionScore:82,costScore:66,regulationScore:45} },
        { id:"p1d", label:"Grensoverschrijdend keten: aanbod uit Duitsland", icon:"globe",
          beschrijving:"Met de deelstaat Nordrhein-Westfalen samenwerken: biobased grondstoffen (hout, vlas) en producenten uit de grensregio meenemen in de GMR-ketenstrategie.",
          gevolg:"U koos grensoverschrijdende samenwerking: beschikbaarheid van biobased materialen verdubbelde. Duits aanbod vulde gat in regionale productiecapaciteit.",
          scores:{adoptionScore:60,costScore:58,regulationScore:35} }
      ]
    },
    {
      ronde: 2, fase: "Ronde 2 — Gemeenten ondersteunen",
      context: "Gemeenten in de GMR willen biobased bouwen maar weten niet hoe HNN toe te passen bij aanbestedingen. Hoe ondersteunt u hen?",
      vraag: "Hoe helpt u gemeenten bij de implementatie van HNN?",
      opties: [
        { id:"p2a", label:"HNN-trainingen voor ambtenaren", icon:"graduation-cap",
          beschrijving:"Verplichte HNN-trainingen voor gemeentelijke beleidsambtenaren en inkopers. U betaalt de opleidingskosten via DGBC.",
          gevolg:"U koos kennisoverdracht: 45 ambtenaren in 8 gemeenten gevolgd. Vergunningverlening gaat soepeler, fouten nemen af.",
          scores:{adoptionScore:50,costScore:22,regulationScore:70} },
        { id:"p2b", label:"Juridische helpdesk aanbestedingen", icon:"help-circle",
          beschrijving:"Een provinciale juridische helpdesk oprichten die gemeenten adviseert over HNN-eisen in aanbestedingen — conform Europees aanbestedingsrecht.",
          gevolg:"U koos juridische zekerheid: gemeenten durfden nu HNN-eisen te stellen zonder angst voor bezwaren. Bezwaarprocedures daalden met 60%.",
          scores:{adoptionScore:55,costScore:28,regulationScore:84} },
        { id:"p2c", label:"Materialenpaspoort verplichten bij subsidies", icon:"clipboard-list",
          beschrijving:"Alle provinciale cofinancieringsprojecten moeten een digitaal materialenpaspoort (Madaster) bijhouden. U betaalt de licentie voor de eerste 3 jaar.",
          gevolg:"U koos materiaalregistratie: 23 projecten registreren nu hun biobased materialen. Waardevolle data voor toekomstig hergebruik.",
          scores:{adoptionScore:60,costScore:45,regulationScore:72} },
        { id:"p2d", label:"Extra cofinanciering bij HNN-adoptie", icon:"badge-euro",
          beschrijving:"Gemeenten die HNN actief toepassen bij aanbestedingen krijgen 20% extra provinciale cofinanciering op hun bouwprojecten. Positieve prikkel in plaats van verplichting.",
          gevolg:"U koos beloning in plaats van dwang: 7 van 8 GMR-gemeenten meldden zich binnen 2 maanden. HNN-adoptie versnelde aanzienlijk zonder juridische friction.",
          scores:{adoptionScore:75,costScore:70,regulationScore:45} }
      ]
    },
    {
      ronde: 3, fase: "Ronde 3 — Tegenslag",
      context: "Drie gemeenten weigeren HNN toe te passen: te hoge kosten. Eén wethouder heeft publiekelijk verklaard 'geen zin te hebben in Haagse groene regels'. Landelijke media pikken het op.",
      vraag: "Hoe reageert u op de weigerende gemeenten?",
      opties: [
        { id:"p3a", label:"Financiële incentive: extra subsidie", icon:"badge-euro",
          beschrijving:"De drie gemeenten een aanvullende subsidie aanbieden die de verwachte HNN-meerkosten volledig dekt voor de eerste 3 projecten.",
          gevolg:"U koos de financiële weg: twee gemeenten deden mee. De derde bleef weigeren maar is nu politiek geïsoleerd.",
          scores:{adoptionScore:65,costScore:82,regulationScore:35} },
        { id:"p3b", label:"Juridisch afdwingen via verordening", icon:"gavel",
          beschrijving:"Omgevingsverordening aanscherpen: gemeenten die provinciaal geld ontvangen moeten HNN toepassen. Sanctie: uitsluiting van cofinanciering.",
          gevolg:"U koos juridische druk: alle drie gemeenten gingen mee, maar de politieke relatie is gespannen. Eén overweegt bezwaar.",
          scores:{adoptionScore:50,costScore:22,regulationScore:94} },
        { id:"p3c", label:"Bestuurlijk ambassadeur + leernetwerk", icon:"users",
          beschrijving:"Een welwillende wethouder als peer-to-peer ambassadeur inzetten. Leernetwerk oprichten zodat gemeenten van elkaar leren.",
          gevolg:"U koos de zachte aanpak: het leernetwerk werkte. Twee van de drie gemeenten stapten binnen 6 maanden in.",
          scores:{adoptionScore:72,costScore:32,regulationScore:58} },
        { id:"p3d", label:"Mediation: gezamenlijke werkgroep oprichten", icon:"handshake",
          beschrijving:"Een onafhankelijke mediator inschakelen om met de drie weigeraars om tafel te gaan. Doel: begrijpen welke drempels specifiek zijn en oplossingen op maat te ontwerpen.",
          gevolg:"U koos maatwerk via dialoog: de werkgroep onthulde dat twee gemeenten concrete kostenvragen hadden, geen principiële bezwaren. Alle drie deden uiteindelijk mee.",
          scores:{adoptionScore:68,costScore:40,regulationScore:62} }
      ]
    },
    {
      ronde: 4, fase: "Ronde 4 — Nationale invloed",
      context: "Uw inspanningen in de GMR trekken nationale aandacht. Het Ministerie van BZK vraagt input voor NABB fase 2 (€175 mln). Hoe positioneert Gelderland zich?",
      vraag: "Hoe benut u de nationale spotlight?",
      opties: [
        { id:"p4a", label:"Lobby voor verplichte GWPa-eis", icon:"megaphone",
          beschrijving:"Actieve lobby bij BZK om de GWPa-eis opnieuw op te nemen in het Bouwbesluit. Samen met 4 provincies en Building Balance.",
          gevolg:"U lobbyde bij het Rijk: gezamenlijk position paper. Nationale media-aandacht. BZK neemt de eis op in het conceptvoorstel.",
          scores:{adoptionScore:70,costScore:35,regulationScore:96} },
        { id:"p4b", label:"GMR als nationaal showcase-project", icon:"star",
          beschrijving:"Eén volledig biobased GMR-wijk (100+ woningen) als nationaal showcase-project positioneren en NABB fase 2 financiering aanvragen.",
          gevolg:"U koos de showcase: de GMR-wijk trekt bezoekers van over het land. BZK gebruikt het als best practice in het NABB-rapport.",
          scores:{adoptionScore:90,costScore:62,regulationScore:52} },
        { id:"p4c", label:"Regionale GMR-norm: 40% biobased", icon:"award",
          beschrijving:"Een GMR-brede biobased norm ontwikkelen die verder gaat dan HNN: minimaal 40% biobased voor alle nieuwbouw. Blauwdruk voor nationale norm.",
          gevolg:"U ontwikkelde de GMR-norm: een ambitieuze regionale standaard die de markt zekerheid geeft en nationaal als voorbeeld dient.",
          scores:{adoptionScore:78,costScore:50,regulationScore:86} },
        { id:"p4d", label:"GMR-norm verankeren in Omgevingsvisie", icon:"map-pin",
          beschrijving:"De biobased ambities van de GMR formeel opnemen in de provinciale Omgevingsvisie als strategisch beleidsdoel tot 2035. Geeft langjarige zekerheid, onafhankelijk van coalitiewisselingen.",
          gevolg:"U koos institutionele verankering: de Omgevingsvisie gaf bedrijven en gemeenten een beleidszekerheid die 10 jaar meegaat. Investeringen in biobased stegen direct.",
          scores:{adoptionScore:72,costScore:28,regulationScore:90} }
      ]
    }
  ],
  aannemer: [
    {
      ronde: 1, fase: "Ronde 1 — Eerste stap zetten",
      context: "U heeft kennis van biobased bouw maar uw bedrijf bouwt overwegend conventioneel. U wil serieus beginnen zonder de bestaande werkstroom te verstoren.",
      vraag: "Wat is uw eerste concrete stap richting biobased bouw?",
      opties: [
        { id:"a1a", label:"Typegoedkeuring aanvragen voor concept", icon:"award",
          beschrijving:"Uw biobased woningconcept door het Bouwbesluit laten toetsen voor nationale typegoedkeuring. 8 maanden werk, maar elk volgend project gaat sneller.",
          gevolg:"U koos typegoedkeuring: na 8 maanden heeft uw concept landelijke goedkeuring. Vergunningstraject gehalveerd bij elk volgend project.",
          scores:{adoptionScore:86,costScore:45,regulationScore:82} },
        { id:"a1b", label:"Vier biobased pilotwoningen bouwen", icon:"home",
          beschrijving:"Vier woningen als pilot: intern leren, fouten maken op kleine schaal, bouwteam vormen. BAM/Klokgroep-model.",
          gevolg:"U koos het pilotpad: 4 biobased woningen succesvol opgeleverd. Leercurve steil maar team is nu ervaren.",
          scores:{adoptionScore:80,costScore:42,regulationScore:35} },
        { id:"a1c", label:"Bouwteam trainen in biobased materialen", icon:"graduation-cap",
          beschrijving:"Intensief trainingsprogramma over biobased materialen, droge verbindingen en demontabel bouwen. Intern draagvlak opbouwen.",
          gevolg:"U koos draagvlak: 'het sociale aspect is het belangrijkst' (Van Wijnen). Uw team is enthousiast maar u heeft nog geen orders.",
          scores:{adoptionScore:50,costScore:28,regulationScore:22} },
        { id:"a1d", label:"Kennispartnerschap HAN/TNO aangaan", icon:"flask-conical",
          beschrijving:"Een formeel R&D-partnerschap aangaan met de HAN en TNO voor technisch onderzoek naar brandveiligheid, LCA en biobased detaillering. Subsidie via NWO/RAAK.",
          gevolg:"U koos kennis als fundament: de samenwerking met HAN leverde directe antwoorden op brandveiligheidsvragen én een subsidie van €300k voor het eerste project.",
          scores:{adoptionScore:62,costScore:42,regulationScore:78} }
      ]
    },
    {
      ronde: 2, fase: "Ronde 2 — Opdrachtgever kiezen",
      context: "U bent klaar voor een serieus biobased project. De keuze van uw eerste klant bepaalt welke route u neemt.",
      vraag: "Welke opdrachtgever kiest u als eerste biobased klant?",
      opties: [
        { id:"a2a", label:"Woningcorporatie als launching customer", icon:"home",
          beschrijving:"Talis of Portaal benaderen. Corporaties denken op lange termijn en zijn bereid te investeren als het de sociale missie dient.",
          gevolg:"U koos de corporatieroute: Talis bestelt een pilotcomplex van 24 sociale huurwoningen. Minder marge, maar stabiele partner.",
          scores:{adoptionScore:75,costScore:72,regulationScore:45} },
        { id:"a2b", label:"Gemeente als launching customer", icon:"building-2",
          beschrijving:"Gemeente Nijmegen benaderen voor biobased gemeentelijk vastgoed. Gemeenten hebben politiek mandaat en kunnen afwijken van de marktprijs.",
          gevolg:"U koos de gemeenteroute: een biobased sporthal in Nijmegen. Gemeente maakt uw kosten transparant en gebruikt het als HNN-showcase.",
          scores:{adoptionScore:80,costScore:50,regulationScore:78} },
        { id:"a2c", label:"Koopsector: bewuste kopers", icon:"users",
          beschrijving:"Proactief marketing op bewuste kopers die extra willen betalen voor biobased wonen. Klokgroep Wanrooij-model.",
          gevolg:"U koos de koopsector: hogere marge maar langere verkooptijd. Klokgroep bewijst dat er kopers zijn — maar niet massaal.",
          scores:{adoptionScore:60,costScore:82,regulationScore:30} },
        { id:"a2d", label:"Provincie: pilot in HNN-voorloopgebied", icon:"landmark",
          beschrijving:"Met Provincie Gelderland samenwerken aan een officieel HNN-pilotgebied. Provincie faciliteert: grond, vergunningsprioriteit en kennisdeling.",
          gevolg:"U koos de institutionele route: het pilotgebied leverde drie gecombineerde bouwprojecten op met provinciale backing. Typegoedkeuring werd daarna sneller opgepakt.",
          scores:{adoptionScore:78,costScore:50,regulationScore:72} }
      ]
    },
    {
      ronde: 3, fase: "Ronde 3 — Tegenslag",
      context: "Uw eerste biobased project is aanbesteed. Maar de gemeentelijke brandweer weigert goedkeuring: een identiek ontwerp werd in de buurgemeente wél goedgekeurd. €40.000 extra kosten, 3 weken vertraging.",
      vraag: "Hoe pakt u het brandveiligheidsprobleem aan?",
      opties: [
        { id:"a3a", label:"Nationaal testrapport laten opstellen", icon:"file-check",
          beschrijving:"Met BAM en Van Wijnen een nationaal testrapport laten opstellen door TNO. Kost 3 maanden maar lost het structureel op voor alle volgende projecten.",
          gevolg:"U investeerde in een nationaal rapport: korte vertraging, structurele winst. Brandweerkorpsen accepteren het rapport voortaan landelijk.",
          scores:{adoptionScore:72,costScore:35,regulationScore:90} },
        { id:"a3b", label:"Per gemeente onderhandelen", icon:"handshake",
          beschrijving:"Gemeentelijke brandweer uitnodigen voor een technische sessie. Extra documentatie aanleveren per gemeente.",
          gevolg:"Dit project gaat door maar volgende projecten hebben hetzelfde probleem. U besteedt 15% van uw projectmanagementtijd aan dit soort discussies.",
          scores:{adoptionScore:55,costScore:50,regulationScore:55} },
        { id:"a3c", label:"Hybride ontwerp: deels beton, deels hout", icon:"layers",
          beschrijving:"Ontwerp aanpassen: bovenste 2 verdiepingen in hout, begane grond in beton. Brandveiligheid niet meer in twijfel maar minder biobased.",
          gevolg:"U koos hybride: project goedgekeurd maar biobased percentage daalde van 75% naar 45%. Marketingverhaal verzwakt.",
          scores:{adoptionScore:65,costScore:62,regulationScore:45} },
        { id:"a3d", label:"Minister aanschrijven: eis nationale richtlijn", icon:"mail",
          beschrijving:"Gezamenlijk met BAM, Van Wijnen en Klokgroep een formele brief aan de minister sturen: eis één nationale brandveiligheidsrichtlijn voor biobased bouw.",
          gevolg:"U koos collectieve lobby: de brief haalde nationale media. BZK reageerde positief en vroeg TNO om een nationaal advies op te stellen.",
          scores:{adoptionScore:55,costScore:15,regulationScore:85} }
      ]
    },
    {
      ronde: 4, fase: "Ronde 4 — Schaalvergroting",
      context: "Uw reputatie als biobased bouwer is gevestigd. De vraag neemt toe. Hoe schaalt u op?",
      vraag: "Hoe vergroot u uw structurele impact?",
      opties: [
        { id:"a4a", label:"Seriebouw: 100 biobased woningen/jaar", icon:"layers",
          beschrijving:"Investeren in gestandaardiseerde productie: één biobased woningconcept in seriebouw. Meerkosten dalen van 8% naar 3%.",
          gevolg:"U koos volume: seriebouw reduceert uw biobased meerkosten tot 3%. U kunt competitiever offreren dan ooit tevoren.",
          scores:{adoptionScore:90,costScore:80,regulationScore:45} },
        { id:"a4b", label:"LCA + NMD opname voor alle concepten", icon:"file-text",
          beschrijving:"Alle biobased materialen via LCA doorrekenen en in de Nationale Milieudatabase opnemen. Uw MPG-score wordt marktonderscheidend.",
          gevolg:"U koos kwaliteitsdiepte: uw concepten scoren 40% beter op MPG. Uniek voordeel bij alle circulaire aanbestedingen.",
          scores:{adoptionScore:60,costScore:35,regulationScore:94} },
        { id:"a4c", label:"CO2-opslag certificeren via Climate Cleanup", icon:"leaf",
          beschrijving:"Biogene CO2-opslag in hout en hennepprojecten certificeren via Climate Cleanup Protocol v1.0. Carbon credits als additionele inkomstenstroom.",
          gevolg:"U koos CO2-certificering: €3.500–6.000 carbon credits per woning. Biobased meerkosten zijn nu volledig gedekt.",
          scores:{adoptionScore:72,costScore:86,regulationScore:58} },
        { id:"a4d", label:"Internationaal leren: Scandinavisch model toepassen", icon:"globe",
          beschrijving:"Studiereis naar Finland en Zweden: hoe bouwbedrijven daar biobased bouw al op grote schaal realiseren. Inkoop- en productiemodellen vertalen naar GMR-context.",
          gevolg:"U koos internationale kennisimport: Fins prefab-model bleek direct toepasbaar. U reduceerde uw biobased detailleringstijd met 40% door bestaande oplossingen te adopteren.",
          scores:{adoptionScore:68,costScore:50,regulationScore:40} }
      ]
    }
  ],
  corporatie: [
    {
      ronde: 1, fase: "Ronde 1 — Strategie bepalen",
      context: "U beheert 8.000 sociale huurwoningen. Uw bestuur heeft besloten dat nieuwe nieuwbouw waar mogelijk biobased moet zijn. Het hoe is nog open.",
      vraag: "Welke strategie kiest u voor biobased nieuwbouw?",
      opties: [
        { id:"c1a", label:"Biobased% in MJOP verankeren", icon:"calendar",
          beschrijving:"Het meerjarenonderhoudsprogramma herzien: bij elke renovatie en nieuwbouw worden biobased materialen standaard overwogen en zo mogelijk verplicht.",
          gevolg:"U koos structurele integratie: biobased is nu onderdeel van uw planningscyclus. Elke renovatie wordt automatisch beoordeeld.",
          scores:{adoptionScore:80,costScore:52,regulationScore:40} },
        { id:"c1b", label:"MIA/Vamil-subsidie optimaal inzetten", icon:"badge-euro",
          beschrijving:"De Milieu-Investeringsaftrek (MIA) en Vamil optimaal benutten. 36% investeringsaftrek maakt biobased direct financieel haalbaar.",
          gevolg:"U koos het fiscale pad: MIA levert 36% investeringsaftrek op. Uw eerste biobased complex is direct financieel haalbaar.",
          scores:{adoptionScore:70,costScore:90,regulationScore:25} },
        { id:"c1c", label:"Pilotcomplex als showcase realiseren", icon:"star",
          beschrijving:"Één volledig biobased pilotcomplex bouwen als showcase: bewoners, media en sector uitnodigen. Talis Strowijk Iewan als model.",
          gevolg:"U koos showcase: uw pilotcomplex haalt nationale media. Woonlijst van 300 mensen voor 24 woningen.",
          scores:{adoptionScore:86,costScore:48,regulationScore:38} },
        { id:"c1d", label:"Carbon credits in businesscase integreren", icon:"leaf",
          beschrijving:"CO₂-opslagpotentie van biobased woningen laten doorrekenen via Climate Cleanup Protocol. Carbon credits als aanvullende inkomstenstroom opnemen in de investeringsbegroting.",
          gevolg:"U koos de financiële innovatie: de carbon credit-berekening sloot de businesscase. RvC accordeerde biobased als standaard — de meerkosten zijn nu gedekt.",
          scores:{adoptionScore:68,costScore:88,regulationScore:30} }
      ]
    },
    {
      ronde: 2, fase: "Ronde 2 — Partner kiezen",
      context: "U realiseert dat u de biobased transitie niet alleen kunt trekken. Een strategische partner is essentieel.",
      vraag: "Welke strategische partner betrekt u als eerste?",
      opties: [
        { id:"c2a", label:"Gemeente via grondpolitiek", icon:"building-2",
          beschrijving:"Met de gemeente afspreken dat u biobased bouwt op gemeentegrond, in ruil voor grondprijskorting en vergunningsprioriteit.",
          gevolg:"U koos de gemeenteroute: gemeente en corporatie zijn nu een tandem. Grondkosten 5% lager, vergunning in 3 maanden.",
          scores:{adoptionScore:78,costScore:58,regulationScore:82} },
        { id:"c2b", label:"Inkoopcoalitie met andere corporaties", icon:"package",
          beschrijving:"Met Portaal, Vivare en Standvast Wonen een inkoopcoalitie vormen. Gezamenlijk volume maakt biobased materialen 20–25% goedkoper.",
          gevolg:"U koos inkoopbundeling: 4 corporaties (32.000 woningen) contracteren biobased leveranciers langjarig. Prijsdaling van 22%.",
          scores:{adoptionScore:65,costScore:86,regulationScore:30} },
        { id:"c2c", label:"Ketenregie: boer–verwerker–bouwer verbinden", icon:"network",
          beschrijving:"Rechtstreeks contracten sluiten met een vezelteler en verwerker in de regio. U vormt de keten mede.",
          gevolg:"U koos ketenregie: uw corporatie wordt ook inkoper van agrarische grondstoffen. Complexer maar uniek — versterkt de regionale economie.",
          scores:{adoptionScore:75,costScore:68,regulationScore:38} },
        { id:"c2d", label:"Kennispartnerschap HAN: scholing en onderzoek", icon:"graduation-cap",
          beschrijving:"Een formele samenwerking met de HAN opgzetten: onderzoekers monitoren uw biobased projecten, studenten lopen stage, en bewoners volgen voorlichtingssessies.",
          gevolg:"U koos kennis als fundament: HAN-studenten documenteerden de woonervaring na 1 jaar. De data werd gebruikt om het concept te verbeteren en breed te delen.",
          scores:{adoptionScore:58,costScore:35,regulationScore:28} }
      ]
    },
    {
      ronde: 3, fase: "Ronde 3 — Tegenslag",
      context: "Uw eerste biobased complex is opgeleverd. Probleem: bewoners klagen over €25/mnd hogere servicekosten. Een bewonerscommissie dreigt naar de Huurcommissie te stappen.",
      vraag: "Hoe lost u de klacht van de bewoners op?",
      opties: [
        { id:"c3a", label:"Communicatiecampagne over voordelen", icon:"message-circle",
          beschrijving:"Bewonersavond organiseren: uitleggen wat de hogere servicekosten dekken — lagere energierekening, betere luchtkwaliteit, hogere gezondheidswaarde.",
          gevolg:"U koos communicatie: 70% van bewoners overtuigd. 30% blijft klagen maar de Huurcommissie-dreiging is weg.",
          scores:{adoptionScore:65,costScore:52,regulationScore:30} },
        { id:"c3b", label:"Terugverdientermijn onafhankelijk aantonen", icon:"calculator",
          beschrijving:"Een onafhankelijke berekening laten maken: hogere servicekosten worden gecompenseerd door 40% lagere energierekening binnen 3 jaar.",
          gevolg:"U koos transparantie: berekening overtuigt de Huurcommissie. U publiceert het rapport — wordt later nationaal geciteerd als bewijs voor de businesscase.",
          scores:{adoptionScore:72,costScore:76,regulationScore:32} },
        { id:"c3c", label:"Prestatiegarantie aan bewoners geven", icon:"shield-check",
          beschrijving:"Contractuele garantie: als bewoners méér betalen dan bij conventionele bouw na 3 jaar, compenseert u het verschil.",
          gevolg:"U gaf een garantie: geen klachten meer. U heeft nu ook een sterke prikkel om biobased goed te laten presteren. Win-win.",
          scores:{adoptionScore:80,costScore:58,regulationScore:42} },
        { id:"c3d", label:"Bewoners als ambassadeurs mobiliseren", icon:"users",
          beschrijving:"Bewoners actief betrekken: woonexperiences laten documenteren, video's laten maken, open dag organiseren. Bewoners worden het gezicht van biobased wonen.",
          gevolg:"U koos bewoners als communicatiestrategie: de open dag trok 400 bezoekers. Lokale media brachten huurder-interviews die veel overtuigender waren dan uw pr.",
          scores:{adoptionScore:72,costScore:38,regulationScore:20} }
      ]
    },
    {
      ronde: 4, fase: "Ronde 4 — Lange-termijn verankering",
      context: "Twee succesvolle biobased projecten op uw naam. Het bestuur vraagt: hoe borgen we dit structureel voor de komende 10 jaar?",
      vraag: "Hoe verankert u biobased bouwen in uw organisatie?",
      opties: [
        { id:"c4a", label:"Biobased in prestatieafspraken gemeente", icon:"handshake",
          beschrijving:"In de vierjaarlijkse prestatieafspraken met de gemeente vastleggen dat u een minimum biobased percentage bouwt. Wettelijke basis, externe verantwoording.",
          gevolg:"U verankerde biobased in prestatieafspraken: uw ambitie is publiek en afdwingbaar. Gemeente en corporatie zijn samen verantwoordelijk.",
          scores:{adoptionScore:82,costScore:48,regulationScore:70} },
        { id:"c4b", label:"Materialenpaspoort voor alle woningen", icon:"clipboard-list",
          beschrijving:"Voor alle biobased nieuwbouw een digitaal materialenpaspoort (Madaster) bijhouden. Bij sloop weet u exact welke materialen herbruikbaar zijn.",
          gevolg:"U koos materiaalregistratie: uw portefeuille wordt een grondstoffenbank. Bij sloop in 2040 zijn de materialen €2 mln waard.",
          scores:{adoptionScore:68,costScore:45,regulationScore:72} },
        { id:"c4c", label:"CO2-portefeuille analyse publiceren", icon:"bar-chart-2",
          beschrijving:"Een openbare CO2-analyse van uw portefeuille publiceren: exact zichtbaar wat biobased projecten bijdragen aan CO2-reductie. CSRD-ready.",
          gevolg:"U publiceerde uw CO2-analyse: voor het eerst weet de buitenwereld wat uw biobased investeringen opleveren. Sterk voor CSRD-rapportage.",
          scores:{adoptionScore:72,costScore:40,regulationScore:62} },
        { id:"c4d", label:"Nationaal kennisplatform: lessen publiceren", icon:"book-open",
          beschrijving:"Een publicatie opstellen met alle lessen uit uw biobased projecten — kosten, woonbeleving, technische details — en dit via Aedes en Cirkelstad landelijk verspreiden.",
          gevolg:"U koos open kennis delen: de publicatie werd door 14 corporaties gebruikt. Uw aanpak werd nationaal geciteerd als referentiemodel voor biobased sociale huur.",
          scores:{adoptionScore:65,costScore:30,regulationScore:45} }
      ]
    }
  ]
};

// ============================================================
// GAME_SCENARIOS — eindscenario's op basis van systeemvariabelen
// Elk pad heeft een eigen succesvorm; geen dominant route
// Volgorde bepaalt matching: eerste true wint
// ============================================================
const GAME_SCENARIOS = [
  {
    id: "volledige_systeemleider",
    naam: "Systeemtransitie voltooid",
    icoon: "trophy",
    conditie: (v) => v.politiek >= 80 && v.markt >= 75 && v.samenwerking >= 75 && v.budget >= 45,
    conclusie: "U heeft alle pijlers van de transitie in beweging gebracht: politiek draagvlak, marktopbouw, brede coalitie én financiële haalbaarheid. Dit is het HNN-model in de praktijk. De GMR-regio kan nu als nationaal voorloopgebied functioneren. BAM, Klokgroep en Van Wijnen zijn klaar voor opschaling. BZK gebruikt uw aanpak als blauwdruk voor nationale normering.",
    klasse: "positief",
    profiel: "Balanced leader"
  },
  {
    id: "regelgeving_leider",
    naam: "Regelgevingsleider",
    icoon: "gavel",
    conditie: (v) => v.politiek >= 85 && v.markt < 70,
    conclusie: "U heeft de sterkste regelgevingsbasis gelegd die de GMR ooit heeft gezien: HNN verankerd, MPG als gunningscriterium, nationale lobby. De marktpartijen kijken toe maar aarzelen nog. Uw uitdaging: zorg dat de regelgeving ook gedragen wordt door aannemers en corporaties — anders leidt harde normering tot marktontwijking. Combineer met financiële prikkels in de volgende beleidsperiode.",
    klasse: "positief",
    profiel: "Regulatory leader"
  },
  {
    id: "marktbouwer",
    naam: "Marktbouwer",
    icoon: "trending-up",
    conditie: (v) => v.markt >= 85 && v.politiek < 65,
    conclusie: "De markt voor biobased bouw in de GMR is sterker dan ooit: seriebouw, carbon credits, typegoedkeuringen en een actieve koopsector. Uw zwakke punt: politiek draagvlak is fragiel. Als het kabinet wisselt of een wethouder de prioriteiten verandert, verdwijnen de randvoorwaarden snel. Verankering via regelgeving en prestatieafspraken is uw volgende stap.",
    klasse: "positief",
    profiel: "Market builder"
  },
  {
    id: "coalitiebuilder",
    naam: "Coalitiebuilder",
    icoon: "users",
    conditie: (v) => v.samenwerking >= 85 && v.markt >= 65,
    conclusie: "U heeft de sterkste coalitie van de GMR opgebouwd: corporaties, gemeenten, aannemers en boeren werken samen in een model dat zelfs Building Balance als beste-praktijk citeert. Het netwerk is uw kracht. Marktgroei volgt vanzelf. Verankering in regelgeving is de ontbrekende schakel — zonder formele verankering is de coalitie kwetsbaar bij bestuurswisselingen.",
    klasse: "positief",
    profiel: "Coalition builder"
  },
  {
    id: "financieel_fragiel",
    naam: "Financieel gedreven — kwetsbaar",
    icoon: "alert-circle",
    conditie: (v) => v.budget < 35 && v.markt >= 65,
    conclusie: "Uw biobased aanpak heeft markt en samenwerking gestimuleerd, maar het budget is uitgeput. Subsidies en grondprijskortingen kosten meer dan ze opleveren op korte termijn. Als het Rijk de NABB-middelen herverdeelt, valt uw aanpak stil. Investeer in structurele instrumenten — regelgeving en ketensamenwerking — die niet afhangen van jaarlijks budget.",
    klasse: "waarschuwing",
    profiel: "Financially strained"
  },
  {
    id: "isolatie_risico",
    naam: "Politiek geïsoleerd",
    icoon: "alert-triangle",
    conditie: (v) => v.samenwerking < 40,
    conclusie: "Uw beleid heeft politiek draagvlak gecreëerd maar de samenwerking met marktpartijen beschadigd. Gemeenten of aannemers voelen zich overruled. Zonder draagvlak van uitvoerende partijen blijft biobased beleid papier. Herstelmogelijkheid: investeer in een breed leernetwerk en peer-to-peer uitwisseling — zodat partijen zelf de voordelen van biobased ontdekken.",
    klasse: "waarschuwing",
    profiel: "Isolated"
  },
  {
    id: "transitie_stagnatie",
    naam: "Transitie stagneert",
    icoon: "pause-circle",
    conditie: (v) => v.politiek < 55 && v.markt < 55,
    conclusie: "De transitie heeft niet de momentum bereikt die nodig is. Politiek draagvlak en marktgroei bleven achter. Alle geïnterviewde partijen zijn het erover eens: zonder aanpassing van aanbestedingseisen, het Bouwbesluit of HNN-toepassing verandert de marktstructuur niet. Dit vraagt om een bolder aanpak in de volgende ronde — begin bij de regelgeving.",
    klasse: "kritisch",
    profiel: "Stagnation"
  },
  {
    id: "gebalanceerd",
    naam: "Solide basis",
    icoon: "check-circle",
    conditie: () => true,
    conclusie: "Een solide aanpak met brede effecten op meerdere systeemvariabelen. U heeft beweging gecreëerd in de markt en politiek draagvlak opgebouwd. Verdiep uw aanpak: regelgeving en coalitievorming zijn de hefbomen die de transitie van pilots naar standaard brengen. De GMR kan — met gerichte vervolgstappen — binnen twee jaar als nationaal voorloopgebied functioneren.",
    klasse: "neutraal",
    profiel: "Balanced"
  }
];
