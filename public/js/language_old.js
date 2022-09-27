//---------------- COMMENT TYPES - frasi varie
var flag1descr = [];
var flag2descr = [];
var flag3descr = [];
var flagMED1descr = [];
var flagMED2descr = [];
flag1descr['IT'] = "Per questa sequenza sismica non sono stati elaborati i commenti storico-critici e le descrizioni degli effetti nelle varie località. Tuttavia esiste un'analisi approfondita pubblicata in E. Guidoboni e A. Comastri, \"Catalogue of Earthquakes and Tsunamis in the Mediterranean Area from the 11th to the 15th century\", INGV-SGA, Roma-Bologna 2005, 1037 pp., di cui viene fornito l'estratto in formato digitale (pulsante 'Comm.', pagina del singolo terremoto)."
flag1descr['EN'] = "For this earthquake sequence we do not provide the usual historical comments and the descriptions of its effects in the different localities. Nevertheless, the reader may refer to the detailed account supplied by E. Guidoboni and A. Comastri, \"Catalogue of Earthquakes and Tsunamis in the Mediterranean Area from the 11th to the 15th century\", INGV-SGA (publ.), Roma-Bologna 2005, 1037 pp., which we provide in digital form ('Comm.' button, page of individual earthquake)."
flag2descr['IT'] = "I commenti storico-critici su questa sequenza sismica e le descrizioni degli effetti nelle varie località non sono disponibili. Le stime d'intensità relative alle quattro scosse più importanti di questa lunga sequenza sismica sono riprese dal \"Bollettino macrosismico\" dell'Istituto Nazionale di Geofisica (terzo quadrimestre 1997), curato da C.Gasparini e M.Vecchi (2001). Tali stime derivano dall'elaborazione delle risposte ai questionari macrosismici distribuiti dall'ING a un'estesa rete di corrispondenti, costituita principalmente dai comuni e dalle stazioni dei carabinieri e delle Guardie Forestali. Per tale ragione gli effetti si riferiscono quasi tutti a capoluoghi comunali. Tale questionario riguarda effetti compresi fra i gradi II e X della scala MCS ed è costituito da 79 domande: di queste, 40 si riferiscono agli effetti sulle persone e sulle cose, 19 agli effetti sulle costruzioni (divise in tre categorie: scadenti, mediocri, ottime), 20 agli effetti sull'ambiente naturale."
flag2descr['EN'] = "The historical-critical comments for this earthquake sequence and the descriptions of its effects in the different localities are not available. The intensity estimates for the four largest shocks of this long earthquake sequence were taken from the \"Bollettino macrosismico\" of the Istituto Nazionale di Geofisica (third quarter 1997), edited by C. Gasparini and M. Vecchi (2001). These estimates were obtained from the elaboration of macroseismic questionnaires distributed by ING to a large number of reliable correspondents, including personnel of the army corps of Carabinieri and of Guardie Forestali in addition to employees of the affected municipalities. For this reason most of the reported effects refer to the main settlement of each municipality. The questionnaire was used to assess all intensities in the range II to X of the MCS scale and was composed of 79 questions: 40 of them referred to the earthquake effects on people, 19 on the effects on buildings and 20 on the effects on the natural environment."
flag3descr['IT'] = "I commenti storico-critici su questa sequenza sismica e le descrizioni degli effetti nelle varie località non sono attualmente disponibili."
flag3descr['EN'] = "The historical-critical comments and the descriptions of the effects in the affected localities are currently unavailable for this earthquake sequence."
flagMED1descr['IT'] = "I commenti storico-critici e le descrizioni degli effetti nelle varie località non sono stati elaborati per i terremoti di area mediterranea, ovvero per terremoti avvenuti al di fuori dell'area italiana e che non hanno dato effetti in Italia. Per i terremoti fino al X secolo non sono disponibili gli effetti nelle località. Viene fornito (pulsante 'Comm.', pagina del singolo terremoto) l'estratto in formato digitale della pubblicazione di riferimento E. Guidoboni, A. Comastri e G. Traina, \"Catalogue of ancient earthquakes in the Mediterranean area up to the 10th century\", ING-SGA, Bologna 1994, 504 pp."
flagMED1descr['EN'] = "We do not provide the usual historical-critical comments and the descriptions of earthquake effects in the different localities for all the events of the broader Mediterranean area, i.e. for non-Italian events that did not have effects in Italy. Similarly, for all the earthquakes the occurred up to the 10th century we do not provide the effects reported for the different affected localities. Nevertheless, for each of these latter earthquakes section we provide ('Comm.' button, page of individual earthquake) in digital form the detailed account supplied by E. Guidoboni, A. Comastri and G. Traina \"Catalogue of ancient earthquakes in the Mediterranean area up to the 10th century\", ING-SGA (publ.), Roma-Bologna 1994, 504 pp."
flagMED2descr['IT'] = "I commenti storico-critici e le descrizioni degli effetti nelle varie località non sono stati elaborati per i terremoti di area mediterranea, ovvero per terremoti avvenuti al di fuori dell'area italiana  e che non hanno dato effetti in Italia. Viene fornito (pulsante 'Comm.', pagina del singolo terremoto) l'estratto in formato digitale della pubblicazione di riferimento E. Guidoboni e A. Comastri, \"Catalogue of Earthquakes and Tsunamis in the Mediterranean Area from the 11th to the 15th century\", INGV-SGA, Roma-Bologna 2005, 1037 pp."
flagMED2descr['EN'] = "We do not provide the usual historical-critical comments and the descriptions of earthquake effects in the different affected localities for all the events of the broader Mediterranean area, i.e. for non-Italian events that did not have effects in Italy. Nevertheless, for each of these earthquakes section we provide ('Comm.' button, page of individual earthquake) in digital form the detailed account supplied by E. Guidoboni and A. Comastri, \"Catalogue of Earthquakes and Tsunamis in the Mediterranean Area from the 11th to the 15th century\", INGV-SGA (publ.), Roma-Bologna 2005, 1037 pp."



var LanguageTools = function(){



	var Lang = [];

	Lang['IT'] = [];

	// ========================      GENERAL    =============================

	// Lang['IT']['banner'] = '<a href="http://storing.ingv.it/cfti" target = "_blank"><img src="images/logo_ITA.png" alt="Header CFTI" height="39px" /></a>'
	// Lang['IT']['banner'] = '<a href="http://storing.ingv.it/cfti" target = "_blank"><img src="images/banner_CFTI_banner_newG_IT.png" alt="Header CFTI" height="45px" /></a>'
	Lang['IT']['banner'] = '<a href="http://storing.ingv.it/cfti/cfti5/" target = "_blank"><img src="images/banner_CFTI_newG_thin_IT.png" alt="Header CFTI" height="32px" /></a>'

	// Lang['IT']['legendtext'] = '<img src="images/legend_ITA.png" alt="Legenda CFTI" width= "310" />';
	Lang['IT']['legendmintext'] = '<b>Legenda</b>';
	// Lang['IT']['legendPQ'] = '<img src="images/legend_IS_ita.png" alt="Legenda CFTI" width= "250" />';
	Lang['IT']['legendFrane'] = '<img src="./images/catalogoFrane_legenda_IT.png" height="250"/>';

	Lang['IT']['cctext'] = 'Eccetto dove diversamente specificato, quest’opera è rilasciata nei termini della licenza <a href="https://creativecommons.org/licenses/by/4.0/deed.it" target="_blank">Creative Commons Attribuzione 4.0 Internazionale (CC BY 4.0)</a>.';
	Lang['IT']['open_disc'] = 'DISCLAIMER'
	Lang['IT']['open_credits'] = 'CREDITS'


	Lang['IT']['helplink'] = '<a href="html/help_IT.html"' + 'target="_blank" style="vertical-align:middle;" class="topwords">HELP</a>'
	Lang['IT']['infolink'] = '<a href="html/info_IT.html" target="_blank" style="vertical-align:middle;" class="topwords">INFO</a>'


	// ======================= LEGEND EPICENTERS
	Lang['IT']['legendTitleMCS'] = 'INTENSITÀ EPICENTRALE (MCS):';
	Lang['IT']['legendTitleEType'] = 'TIPO DI EPICENTRO:';
	Lang['IT']['calcEPI'] = '<abbr title="localizzazione epicentrale calcolata a partire da un numero sufficiente di siti con intensità macrosismica">Calcolato</abbr>';
	Lang['IT']['hypEPI'] = '<abbr title="localizzazione ipotizzata, poichè la sola distribuzione di siti con intensità macrosismica non consente un calcolo">Ipotetico</abbr>';
	Lang['IT']['regEPI'] = '<abbr title="localizzazione nel baricentro di una regione o area indicata dalle fonti storiche come la porzione di territorio in cui si sono verificati gli effetti maggiori senza riferimenti a singole località">Regione, area</abbr>';
	Lang['IT']['locEPI'] = '<abbr title="localizzazione in corrispondenza di un’unica località/sito per cui è disponibile un grado di intensità">Singola località</abbr>';
	Lang['IT']['nonparEPI'] = '<abbr title="evento per il quale, per la scarsità o eccessiva genericità delle informazioni, non è possibile una stima dei parametri">Epicentro non parametrizzato</abbr>';
	Lang['IT']['falseEPI'] = '<abbr title="terremoto oggi ritenuto falso">Evento falso</abbr>';


	// ======================= LEGEND PQ
	Lang['IT']['EE_LOClegend'] = 'Eff. ambiente naturale';
	Lang['IT']['linkMCS'] = '<abbr title= ""> <a href="html/scalaMCS_IT.html" target="_blank" style="vertical-align:middle;">SCALA MCS <img src="images/link2.png" width= "10" vertical-align="-30px"/></a></abbr>'


	// =======================   LAYERS MAP
	Lang['IT']['titlelayer'] = '<b>LIVELLI INFORMATIVI (RISORSE ESTERNE)</b>'

	Lang['IT']['confCom'] = 'Confini Comunali 2016';
	Lang['IT']['confProv'] = 'Confini Provinciali 2016';
	Lang['IT']['confReg'] = 'Confini Regionali 2016';
	Lang['IT']['TopoIGM25'] = 'Carta Topografica IGM alla scala 1:25.000';
	Lang['IT']['TopoIGM100'] = 'Carta Topografica IGM alla scala 1:100.000';
	Lang['IT']['Geomap'] = 'Carta Geologica in scala 1:100.000';
	Lang['IT']['FranelayerTitle'] = 'Catalogo frane';
	Lang['IT']['FranelayerLegTitle'] = 'Legenda';
	Lang['IT']['FraneLin'] = 'Frane lineari';
	Lang['IT']['FranePol'] = 'Frane poligonali';
	Lang['IT']['FraneDiff'] = 'Aree soggette a franosità diffuse';
	Lang['IT']['FraneDGPV'] = 'Deformazioni Gravitative Profonde di Versante (DGPV)';
	Lang['IT']['AbbrIGM25'] = 'Deformazioni Gravitative Profonde di Versante (DGPV)';

	Lang['IT']['warningWMSsentence'] = 'WARNING: <br> servizi web esterni che potrebbero non essere sempre disponibili';
	Lang['IT']['refDISSsentence'] = '<b>CITARE COME: </b><br> DISS Working Group (2018). Database of Individual Seismogenic Sources (DISS), Version 3.2.1: A compilation of potential sources for earthquakes larger than M 5.5 in Italy and surrounding areas. http://diss.rm.ingv.it/diss/, Istituto Nazionale di Geofisica e Vulcanologia; DOI:10.6092/INGV.IT-DISS3.2.1';

	// =======================   SISMICITA' STRUMENTALE
	Lang['IT']['titleSTRUM'] = '<b>SISMICIT&Agrave STRUMENTALE (da <a href="http://cnt.rm.ingv.it" target="_blank"> INGV-CNT</a>)</b>'
	Lang['IT']['periodSTRUM'] = 'Intervallo temporale';
	Lang['IT']['magSTRUM'] = 'Intervallo magnitudo';
	Lang['IT']['depSTRUM'] = 'Intervallo profondità (km)';
	Lang['IT']['warningSTRUM'] = 'Superato numero massimo di terremoti visualizzabili';
	Lang['IT']['legSTRUM'] = 'LEGENDA MAPPA';
	Lang['IT']['fromDateSTRUM'] = 'Dal ';
	Lang['IT']['toDateSTRUM'] = ' al ';



	// ========================      INDEX MENU    =============================
	Lang['IT']['EQ'] = 'Terremoti';
	Lang['IT']['LOC'] = 'Località';
	Lang['IT']['EE'] = 'Effetti sull\'ambiente naturale';
	//Lang['IT']['access'] = '<abbr title="Accesso per"><select id="access" name="access"></abbr>';
	Lang['IT']['period'] = 'Periodo';
	Lang['IT']['fromDate'] = 'Dal';
	Lang['IT']['toDate'] = 'Al';
	Lang['IT']['fromIo'] = 'Da';
	Lang['IT']['toIo'] = 'A';
	Lang['IT']['fromMM'] = 'Da';
	Lang['IT']['toMM'] = 'A'
	Lang['IT']['fromImax'] = 'Da';
	Lang['IT']['toImax'] = 'A';
	Lang['IT']['Io'] = 'Intensità epicentrale';
	Lang['IT']['MM'] = 'Magnitudo Equivalente';
	Lang['IT']['Coord'] = 'Area';
	Lang['IT']['eventType'] = 'Tipo evento';
	Lang['IT']['false'] = 'Falsi';
	//Lang['IT']['unknown'] = 'Sconosciuti';
	Lang['IT']['strong'] = 'Forti';
	Lang['IT']['zone'] = 'Zona Eventi';
	Lang['IT']['both'] = 'Tutti i terremoti';
	Lang['IT']['italian'] = 'Terremoti italiani';
	Lang['IT']['mediterranean'] = 'Terremoti mediterranei';
	//Lang['IT']['reviewed'] = 'Revisionati';
	Lang['IT']['numEq'] = 'terremoti selezionati';
	Lang['IT']['numEqLOC'] = 'terremoti';
	Lang['IT']['numLoc'] = 'località';
	Lang['IT']['numEE'] = 'effetti selezionati';
	Lang['IT']['clickOKsentence'] = 'per applicare la selezione areale, fare click su OK';

	//--------- LOC ACCESS MENU
	Lang['IT']['LocnameSearch'] = 'Ricerca (database)';
	// Lang['IT']['LocnameGOOSearch'] = 'Cerca luogo';
	Lang['IT']['Imax'] = 'Intensità massima al sito';

	//--------- EE ACCESS MENU
	Lang['IT']['TitleMenuEE_paes'] = 'Paesaggio  &nbsp'
	Lang['IT']['TitleMenuEE_acsup'] = 'Acque superficiali  &nbsp'
	Lang['IT']['TitleMenuEE_acsot'] = 'Acque sotterranee  &nbsp'
	Lang['IT']['TitleMenuEE_coste'] = 'Coste  &nbsp'
	Lang['IT']['TitleMenuEE_gas'] = 'Esalazioni / altro  &nbsp'
	Lang['IT']['fiumiMenuEE'] = '&nbsp (FIUMI)'
	Lang['IT']['laghiMenuEE'] = '&nbsp (LAGHI)'


	// ========================      ALL TABLES    ================================

	Lang['IT']['locname'] = '<abbr title="Nome della località">Nome</abbr>';
	Lang['IT']['ismax'] = '<abbr title="Intensità massima al sito (scala MCS) &#013;&#013; NF terremoto non avvertito (Ismax=0)&#013; N riscontro negativo nelle fonti coeve (Ismax=0)&#013; NC non classificato (Ismax=0)&#013; - nessuna osservazione macrosismica (Ismax=0)">Ismax</abbr>';

	Lang['IT']['provLOC'] = '<abbr title="Provincia italiana o nazione">Prov / Naz</abbr>';

	Lang['IT']['int'] = '<abbr title="Intensità MCS al sito, per il dato terremoto &#013;&#013; S(V) forte risentimento senza elementi per attribuire o escludere danni &#013; F(IV-V) terremoto avvertito &#013; NF terremoto non avvertito &#013; G indicazione generica di danni in uno specifico sito &#013; N riscontro negativo nelle fonti coeve &#013; NC non classificato, si rimanda ai commenti analitici &#013; &#013;Effetti su un singolo edificio: &#013; A(IX) crolli o lesioni estese nei muri portanti  &#013; B(VIII) crolli nella sola parte alta dell\'edificio (lanterna, cupola, frontone ecc.) &#013; C(VIII) crolli parziali del tetto &#013; D(VI) cadute di cornicioni, fessurazioni nei muri esterni &#013; E(VI-VII) indicazione generica di danno all\'edificio  ">Is</abbr>';
	Lang['IT']['nat'] = '<abbr title=" o  Effetti sull\'ambiente naturale associati all\'intera sequenza sismica &#013;&#9679;  Effetti sull\'ambiente naturale associati al singolo terremoto">Nat</abbr>';
	Lang['IT']['natNP'] = '<abbr title=" o  Effetti sull\'ambiente naturale associati all\'intera sequenza sismica &#013;&#9679;  Effetti sull\'ambiente naturale associati al singolo terremoto">Nat</abbr>';
	// Lang['IT']['nat'] = '<abbr title=" o  Effetti sull\'ambiente naturale associati all\'intera sequenza sismica &#013; &#8226;  Effetti sull\'ambiente naturale associati al singolo terremoto">Nat</abbr>'

	Lang['IT']['eeType'] = '<abbr title="Tipologia di effetto">Tipo</abbr>';
	Lang['IT']['dotEE'] = '&nbsp &nbsp &nbsp';
	Lang['IT']['date'] = '<abbr title="Data del terremoto (AAAA MM GG)">Data</abbr>';
	Lang['IT']['time'] = '<abbr title="Ora del terremoto in Greenwich Mean Time (OO:MM:SS)">Ora</abbr>';
	Lang['IT']['dateNP'] = '<abbr title="Data del terremoto (AAAA MM GG)">Data</abbr>';
	Lang['IT']['timeNP'] = '<abbr title="Ora del terremoto in Greenwich Mean Time (OO:MM:SS)">Ora</abbr>';
	Lang['IT']['dateEE'] = '<abbr title="Data del terremoto (AAAA MM GG)">Data</abbr>';
	Lang['IT']['timeEE'] = '<abbr title="Ora del terremoto in Greenwich Mean Time (OO:MM:SS)">Ora</abbr>';
	Lang['IT']['io'] = '<abbr title="Intensità epicentrale (scala MCS)">Io</abbr>';
	Lang['IT']['ioNP'] = '<abbr title="Intensità epicentrale (scala MCS)">Io</abbr>';
	Lang['IT']['ioEE'] = '<abbr title="Intensità epicentrale (scala MCS)">Io</abbr>';
	Lang['IT']['imax'] = '<abbr title="Intensità massima (scala MCS)">Imax</abbr>';
	Lang['IT']['sitesLOC'] = '<abbr title="Numero di Osservazioni Macrosismiche al sito">NOM</abbr>';
	Lang['IT']['sites'] = '<abbr title="Numero di Osservazioni Macrosismiche">NOM</abbr>';
	Lang['IT']['EEnumLOC'] = '<abbr title="Numero di Effetti sismo-indotti sull\'ambiente naturale al sito">NNat</abbr>';
	Lang['IT']['me'] = '<abbr title="Magnitudo equivalente calcolata sulla base delle osservazioni macrosismiche">Me</abbr>';
	Lang['IT']['meNP'] = '<abbr title="Magnitudo equivalente calcolata sulla base delle osservazioni macrosismiche">Me</abbr>';
	Lang['IT']['meEE'] = '<abbr title="Magnitudo equivalente calcolata sulla base delle osservazioni macrosismiche">Me</abbr>';
	Lang['IT']['location'] = '<abbr title="Area epicentrale">Area Epicentrale</abbr>';
	Lang['IT']['locationNP'] = '<abbr title="Area epicentrale">Area Epicentrale</abbr>';
	Lang['IT']['locationEQ'] = '<abbr title="Area epicentrale">Area</abbr>';
	Lang['IT']['locationEE'] = '<abbr title="Area epicentrale">Area Epic.</abbr>';
	Lang['IT']['locality'] = '<abbr title="Nome della località">Località</abbr>';
	Lang['IT']['locnameEE'] = '<abbr title="Nome della località">Località</abbr>';
	Lang['IT']['emap'] = '<abbr title="Mappa del terremoto">Mappa</abbr>';
	Lang['IT']['emapNP'] = '<abbr title="Mappa del terremoto">Mappa</abbr>';
	Lang['IT']['latLOC'] = '<abbr title="Latitudine della località">Lat.</abbr>';
	Lang['IT']['lonLOC'] = '<abbr title="Longitudine della località">Lon.</abbr>';
	Lang['IT']['lat'] = '<abbr title="Latitudine dell\'epicentro basata sulle osservazioni macrosismiche">Lat.</abbr>';
	Lang['IT']['lon'] = '<abbr title="Longitudine dell\'epicentro basata sulle osservazioni macrosismiche">Lon.</abbr>';
	Lang['IT']['etype'] = '<abbr title="Tipo di epicentro: &#013; C: Calcolato &#013; L: Singola località &#013; R: Regione, area &#013; H: Ipotizzato &#013; NP: Non parametrizzato">Tipo</abbr>';
	Lang['IT']['dist'] = '<abbr title="Distanza dall\'epicentro (km)">Distanza (km)</abbr>';
	Lang['IT']['relEQ'] = '<abbr title="F: falso &#013D: dubbio &#013S: parametri epicentrali calcolati su un solo dato di intensità &#013E: localizzazione epicentrale da catalogo estero &#013N: attualmente senza osservazioni macrosismiche">Note</abbr>'
	// Lang['IT']['level'] = '<abbr title="' + level_abbrTitle_IT + '">R</abbr>';
	Lang['IT']['levelIndex'] = '<abbr title="Livello di approfondimento dello studio">Liv</abbr>';



	// ========================      LOCALITY    ================================
	Lang['IT']['pagetypeLOC'] = 'LOCALIT&Agrave'
	Lang['IT']['NoNterrLOC'] = 'Nessun singolo terremoto con effetti sul contesto antropico o sull\'ambiente naturale presso questa località'
	Lang['IT']['EEnperiod_title'] = 'Sequenze sismiche cui sono associati solo effetti sismo-indotti sull\'ambiente naturale presso questa località:'

	// ========================      QUAKE    ================================
	Lang['IT']['pagetypeEQ'] = 'TERREMOTO'
	Lang['IT']['nperiodExplanation'] = '<abbr title= "Lista dei singoli terremoti attribuiti alla stessa sequenza sismica e presenti nel catalogo. Evidenziato in giallo il terremoto mostrato in mappa">?</abbr>'

	Lang['IT']['Bauth'] = 'Autore <img src="images/sort.png" width= "8" />'
	Lang['IT']['Btitle'] = 'Titolo <img src="images/sort.png" width= "8" />'
	Lang['IT']['Btype'] = 'Tipo di fonte <img src="images/sort.png" width= "8" />'
	Lang['IT']['Byear'] = 'Anno <img src="images/sort.png" width= "8" />'
	Lang['IT']['Bplace'] = 'Luogo <img src="images/sort.png" width= "8" />'

	if (typeof D0textIT != 'undefined'){
		Lang['IT']['D0text'] = D0textIT;
		Lang['IT']['EQparam'] = textcommTOT_IT[0]
		Lang['IT']['EQsequence'] = textcommTOT_IT[1]
		Lang['IT']['EQreview'] = textcommTOT_IT[2]
		Lang['IT']['EQresilience'] = textcommTOT_IT[3]
		Lang['IT']['EQscience'] = textcommTOT_IT[4]
		Lang['IT']['EQeffectsAnt'] = textcommTOT_IT[5]
		Lang['IT']['EQeffectsEnv'] = textcommTOT_IT[6]
	}

	// Lang['IT']['COMM_EQparams1'] = 'Parametri spazio-temporali'
	// Lang['IT']['COMM_EQparams2'] = 'Parametri dei cataloghi a confronto'
	// Lang['IT']['COMM_EQseq1'] = 'Sequenza delle maggiori scosse'
	// Lang['IT']['COMM_EQseq2'] = 'Cronologia completa della sequenza sismica'
	// Lang['IT']['COMM_EQrev1'] = 'Stato delle conoscenze '
	// Lang['IT']['COMM_EQrev2'] = 'Stato delle conoscenze analitico'
	// Lang['IT']['COMM_EQresil1'] = 'Effetti nel contesto antropico'
	// Lang['IT']['COMM_EQresil2'] = 'Elementi di demografia'
	// Lang['IT']['COMM_EQresil3'] = 'Elementi dell\'edilizia storica locale'
	// Lang['IT']['COMM_EQresil4'] = 'Confini e afferenze amministrative'
	// Lang['IT']['COMM_EQresil5'] = 'Effetti sociali ed economici indotti'
	// Lang['IT']['COMM_EQresil6'] = 'Risposte istituzionali/amministrative'
	// Lang['IT']['COMM_EQresil7'] = 'Ricostruzioni, spostamenti di sito'
	// Lang['IT']['COMM_EQscience1'] = 'Documentazione tecnico-scientifica'
	// Lang['IT']['COMM_EQscience2'] = 'Teorie e interpretazioni'
	// Lang['IT']['COMM_EQeffant1'] = 'Maggiori effetti'
	// Lang['IT']['COMM_EQeffant2'] = 'Eventi distruttivi naturali o umani contestuali'
	// Lang['IT']['COMM_EQeffnat1'] = 'Effetti sull\'ambiente naturale'
	// Lang['IT']['COMM_EQeffnat2'] = 'Fenomeni naturali correlati'

   // D1 table
	Lang['IT']['D1table_title'] = 'Effetti sul contesto antropico per le singole località'
	Lang['IT']['loc_D1table'] = 'Località <img src="images/sort.png" width= "8" />'
	Lang['IT']['int_D1table'] = 'Intensità (MCS) <img src="images/sort.png" width= "8" />'
	Lang['IT']['D1_D1table'] = 'Effetti antropici singola località'

	// E1 table
 	Lang['IT']['E1table_title'] = 'Effetti sull\'ambiente naturale per le singole località'
 	Lang['IT']['loc_E1table'] = 'Località <img src="images/sort.png" width= "8" />'
 	Lang['IT']['dot_E1table'] = '<abbr title=" o  Effects on natural environment associated with earthquake sequence &#013; &#9679;  Effects on natural environment associated with individual earthquake">Nat</abbr>'
 	Lang['IT']['E1_E1table'] = 'Effetti sull\'ambiente naturale'

	Lang['IT']['EQparamT'] = 'Parametri'
	Lang['IT']['EQsequenceT'] = 'Sequenza'
	Lang['IT']['EQreviewT'] = 'Stato delle <br \>conoscenze'
	Lang['IT']['EQresilienceT'] = 'Risposta sociale e <br \>istituzionale'
	Lang['IT']['EQscienceT'] = 'Osservazioni e <br \>teorie scientifiche'
	Lang['IT']['EQeffectsTAnt'] = 'Effetti sul <br \>contesto antropico'
	Lang['IT']['EQeffectsTEnv'] = 'Effetti sull\'ambiente <br \>naturale'
	Lang['IT']['EQbiblioT'] = 'Bibliografia'
	// Lang['IT']['embedT'] = 'Guidoboni & Mariotti'  // now set in quake.js

	Lang['IT']['titleCommWin'] = 'Commenti storico-critici per l\'intera sequenza sismica'

	Lang['IT']['falseSentenceEQ'] = '<b><br />Terremoto falso</b>';

	// ----- level per quake page
	if (typeof levelID != 'undefined'){
		Lang['IT'][levelID[0]] = '<b><font color="#1f708f">' + level_abbrTitle_IT  + '</font></b>'+ '<br />' + level_abbr_IT[0];
		Lang['IT'][levelID[1]] = '<b><font color="#1f708f">' + level_abbrTitle_IT  + '</font></b>'+ '<br />' + level_abbr_IT[1]
		Lang['IT'][levelID[2]] = '<b><font color="#1f708f">' + level_abbrTitle_IT  + '</font></b>'+ '<br />' + level_abbr_IT[2]
	}

	// ----- morti
	if (typeof deadaff_ID != 'undefined'){
		for (var i=0; i<dead_affidtext_IT.length; i++) Lang['IT'][deadaff_ID[i]] = dead_affidtext_IT[i]
		for (var i=0; i<dead_moretext_IT.length; i++) Lang['IT'][deadmore_ID[i]] = dead_moretext_IT[i]
		for (var i=0; i<dead_text_IT.length; i++) Lang['IT'][deadtext_ID[i]] = dead_text_IT[i]
		Lang['IT'][deadlegend_ID] = dead_legend_IT
	}

	// ----- new2018
	Lang['IT']['var2018'] = ' Terremoto con variazioni e/o correzioni rispetto alla versione 4 del CFTI'
	Lang['IT']['rev2018'] = 'Terremoto ristudiato rispetto alla versione 4 del CFTI'
	Lang['IT']['new2018'] = 'Terremoto non presente nella versione 4 del CFTI'



//=============================================================================
//								ENGLISH
//=============================================================================

	Lang['EN'] = [];

	// ========================      GENERAL    =============================
	// Lang['EN']['banner'] = '<a href="http://storing.ingv.it/cfti" target = "_blank"><img src="images/logo_ENG.png" alt="Header CFTI" height="39px" /></a>'
	// Lang['EN']['banner'] = '<a href="http://storing.ingv.it/cfti" target = "_blank"><img src="images/banner_CFTI_banner_newG_EN.png" alt="Header CFTI" height="45px" /></a>'
	Lang['EN']['banner'] = '<a href="http://storing.ingv.it/cfti/cfti5/" target = "_blank"><img src="images/banner_CFTI_newG_thin_EN.png" alt="Header CFTI" height="32px" /></a>'


	// Lang['EN']['legendtext'] = '<img src="images/legend_ENG.png" alt="Legend CFTI" width= "310" />';
	Lang['EN']['legendmintext'] = '<b>Legend</b>';
	// Lang['EN']['legendPQ'] = '<img src="images/legend_IS_eng.png" alt="Legenda CFTI" width= "250" />';
	Lang['EN']['legendFrane'] = '<img src="./images/catalogoFrane_legenda_EN.png" height="250"/>'

	Lang['EN']['cctext'] = 'Except where otherwise noted, content on this site is licensed under a <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Attribution 4.0 International (CC BY 4.0)</a> licence.';
	Lang['EN']['open_disc'] = 'DISCLAIMER'
	Lang['EN']['open_credits'] = 'CREDITS'


	Lang['EN']['helplink'] = '<a href="html/help_EN.html"' + 'target="_blank" style="vertical-align:middle;" class="topwords">HELP</a>'
	Lang['EN']['infolink'] = '<a href="html/info_EN.html" target="_blank" style="vertical-align:middle;" class="topwords">INFO</a>'

	// ======================= LEGEND EPICENTERS
	Lang['EN']['legendTitleMCS'] = 'EPICENTRAL INTENSITY (MCS):';
	Lang['EN']['legendTitleEType'] = 'EPICENTER TYPE:';

	Lang['EN']['calcEPI'] = '<abbr title="earthquake location calculated from a sufficient number of sites for which a microseismic intensity was assigned">Calculated</abbr>';
	Lang['EN']['hypEPI'] = '<abbr title="hypothesized location, when the distribution of intensity observations does not allow a full calculation">Hypothetical</abbr>';
	Lang['EN']['regEPI'] = '<abbr title="location lying in the middle of a region identified by the historical sources as the area that suffered the largest effects, without specifying the names of individual localities">Region, area</abbr>';
	Lang['EN']['locEPI'] = '<abbr title="coincident with the location of a single site for which there exists an intensity assignment">Local effects</abbr>';
	Lang['EN']['nonparEPI'] = '<abbr title="earthquake for which the available information is insufficient or too generic for deriving analytical parameters">Epicenter not parameterized</abbr>';
	Lang['EN']['falseEPI'] = '<abbr title="event which is currently considered false">False event</abbr>';


	// ======================= LEGEND PQ
	Lang['EN']['EE_LOClegend'] = 'Eff. on natural environ.';
	Lang['EN']['linkMCS'] = '<abbr title= ""> <a href="html/scalaMCS_EN.html" target="_blank" style="vertical-align:middle;">MCS SCALE <img src="images/link2.png" width= "10" vertical-align="-30px"/></a></abbr>'



	// =======================   LAYERS MAP
	Lang['EN']['titlelayer'] = '<b>INFORMATIVE OVERLAYS (EXTERNAL RESOURCES)</b>'

	Lang['EN']['confCom'] = 'Borders of Italian Comuni 2016';
	Lang['EN']['confProv'] = 'Borders of Italian Province 2016';
	Lang['EN']['confReg'] = 'Borders of Italian Regioni 2016';
	Lang['EN']['TopoIGM25'] = 'IGM topographic map (scale 1:25,000)';
	Lang['EN']['TopoIGM100'] = 'IGM topographic map (scale 1:100,000)';
	Lang['EN']['Geomap'] = 'Geologic Map (scale 1:100,000)';
	Lang['EN']['FranelayerTitle'] = 'Landslide catalogue';
	Lang['EN']['FranelayerLegTitle'] = 'Legend';
	Lang['EN']['FraneLin'] = 'Linear landslides';
	Lang['EN']['FranePol'] = 'Poligonal landslides';
	Lang['EN']['FraneDiff'] = 'Areas with diffuse landslides';
	Lang['EN']['FraneDGPV'] = 'Deep-seated Gravitational Slope Deformations (DGSD)';

	Lang['EN']['warningWMSsentence'] = 'WARNING: <br> these external resources may not be always available';
	Lang['EN']['refDISSsentence'] = '<b>CITE AS: </b><br> DISS Working Group (2018). Database of Individual Seismogenic Sources (DISS), Version 3.2.1: A compilation of potential sources for earthquakes larger than M 5.5 in Italy and surrounding areas. http://diss.rm.ingv.it/diss/, Istituto Nazionale di Geofisica e Vulcanologia; DOI:10.6092/INGV.IT-DISS3.2.1';

	// =======================   SISMICITA' STRUMENTALE
	Lang['EN']['titleSTRUM'] = '<b>INSTRUMENTAL SEISMICITY (from <a href="http://cnt.rm.ingv.it/en" target="_blank"> CNT - INGV</a>)</b>'
	Lang['EN']['periodSTRUM'] = 'Time interval';
	Lang['EN']['magSTRUM'] = 'Magnitude interval';
	Lang['EN']['depSTRUM'] = 'Depth interval (km)';
	Lang['EN']['warningSTRUM'] = 'Exceeded maximum number of earthquakes allowed';
	Lang['EN']['legSTRUM'] = 'MAP LEGEND';
	Lang['EN']['fromDateSTRUM'] = 'From ';
	Lang['EN']['toDateSTRUM'] = ' To ';

	// ========================      INDEX MENU    =============================
	Lang['EN']['EQ'] = 'Earthquakes';
	Lang['EN']['LOC'] = 'Localities';
	Lang['EN']['EE'] = 'Effects on the natural environment';
	//Lang['EN']['access'] = '<abbr title="Access by"><select id="access" name="access"></abbr>';
	Lang['EN']['period'] = 'Period';
	Lang['EN']['fromDate'] = 'From';
	Lang['EN']['toDate'] = 'To';
	Lang['EN']['fromMM'] = 'From';
	Lang['EN']['toMM'] = 'To';
	Lang['EN']['fromIo'] = 'From';
	Lang['EN']['toIo'] = 'To';
	Lang['EN']['fromImax'] = 'From';
	Lang['EN']['toImax'] = 'To';
	Lang['EN']['Io'] = 'Epicentral intensity';
	Lang['EN']['MM'] = 'Equivalent Magnitude';
	Lang['EN']['Coord'] = 'Area';
	Lang['EN']['eventType'] = 'Earthquake type';
	Lang['EN']['false'] = 'False';
	//Lang['EN']['unknown'] = 'Unknown';
	Lang['EN']['strong'] = 'Strong';
	Lang['EN']['zone'] = 'Events Zone';
	Lang['EN']['both'] = 'All earthquakes';
	Lang['EN']['italian'] = 'Italian earthquakes';
	Lang['EN']['mediterranean'] = 'Mediterranean earthquakes';
	//Lang['EN']['reviewed'] = 'Reviewed';
	Lang['EN']['numEq'] = 'earthquakes selected';
	Lang['EN']['numEqLOC'] = 'earthquakes';
	Lang['EN']['numLoc'] = 'localities';
	Lang['EN']['numEE'] = 'effects selected';
	Lang['EN']['clickOKsentence'] = 'click OK to apply the selection';

	//--------- LOC ACCESS MENU
	Lang['EN']['LocnameSearch'] = 'Search (database)';
	Lang['EN']['Imax'] = 'Maximum intensity at site';


	//--------- EE ACCESS MENU
	Lang['EN']['TitleMenuEE_paes'] = 'Landscape  &nbsp'
	Lang['EN']['TitleMenuEE_acsup'] = 'Watercourses  &nbsp'
	Lang['EN']['TitleMenuEE_acsot'] = 'Groundwater  &nbsp'
	Lang['EN']['TitleMenuEE_coste'] = 'Coastline  &nbsp'
	Lang['EN']['TitleMenuEE_gas'] = 'Gas emission / other  &nbsp'
	Lang['EN']['fiumiMenuEE'] = '&nbsp (RIVERS)'
	Lang['EN']['laghiMenuEE'] = '&nbsp (LAKES)'


	// ========================      ALL TABLES    ================================

	Lang['EN']['locname'] = '<abbr title="Name of locality">Name</abbr>';
	Lang['EN']['ismax'] = '<abbr title="Maximum MCS Intensity reported at site &#013;&#013; NF not felt (Ismax=0)&#013; N no evidence found in contemporary sources (Ismax=0)&#013; NC unrated (Ismax=0)&#013; - no macroseismic observations available (Ismax=0)">Ismax</abbr>';
	Lang['EN']['provLOC'] = '<abbr title="Italian Province / foreign Country">Prov / Coun</abbr>';

	Lang['EN']['int'] = '<abbr title="MCS intensity of the given earthquake at the locality &#013;&#013; S(V) strongly felt, but lacking evidence to support or deny the occurrence of damage &#013; F(IV-V) felt &#013; NF not felt &#013; G generic indication of damage at a specific site &#013; N no evidence found in contemporary sources &#013; NC unrated: please refer to the analytical comments for further info &#013; &#013; Effects on a single building: &#013; A(IX) collapse or extensive damage to the load bearing walls  &#013; B(VIII) collapse of the top portion of the building (lantern, dome, gable, etc.). &#013; C(VIII) partial collapse of the roof, vaults, apsidal vault, etc. &#013; D(VI) falling eaves, cracking of the external walls &#013; E(VI-VII) report of generic damage to the building &#013; ">Is</abbr>';
	Lang['EN']['nat'] = '<abbr title=" o  Effects on natural environment associated with earthquake sequence &#013; &#9679;  Effects on natural environment associated with individual earthquake">Nat</abbr>'
	Lang['EN']['natNP'] = '<abbr title=" o  Effects on natural environment associated with earthquake sequence &#013; &#9679;  Effects on natural environment associated with individual earthquake">Nat</abbr>'
	Lang['EN']['eeType'] = '<abbr title="Type of effect">Type</abbr>';
	Lang['EN']['dotEE'] = '&nbsp &nbsp &nbsp';
	Lang['EN']['date'] = '<abbr title="Earthquake origin date (YYYY MM DD)">Date</abbr>';
	Lang['EN']['time'] = '<abbr title="Earthquake origin time expressed as Greenwich Mean Time (HH:MM:SS)">Time</abbr>';
	Lang['EN']['dateEE'] = '<abbr title="Earthquake origin date (YYYY MM DD)">Date</abbr>';
	Lang['EN']['timeEE'] = '<abbr title="Earthquake origin time expressed as Greenwich Mean Time (HH:MM:SS)">Time</abbr>';
	Lang['EN']['dateNP'] = '<abbr title="Earthquake origin date (YYYY MM DD)">Date</abbr>';
	Lang['EN']['timeNP'] = '<abbr title="Earthquake origin time expressed as Greenwich Mean Time (HH:MM:SS)">Time</abbr>';
	Lang['EN']['io'] = '<abbr title="Epicentral intensity (MCS scale)">Io</abbr>';
	Lang['EN']['ioNP'] = '<abbr title="Epicentral intensity (MCS scale)">Io</abbr>';
	Lang['EN']['ioEE'] = '<abbr title="Epicentral intensity (MCS scale)">Io</abbr>';
	Lang['EN']['imax'] = '<abbr title="Maximum intensity (MCS scale)">Imax</abbr>';
	Lang['EN']['sitesLOC'] = '<abbr title="Number of Macroseismic Observations at site">NMO</abbr>';
	Lang['EN']['sites'] = '<abbr title="Number of Macroseismic Observations">NMO</abbr>';
	Lang['EN']['EEnumLOC'] = '<abbr title="Number of effects on the Natural environment at site">NNat</abbr>';
	Lang['EN']['me'] = '<abbr title="Equivalent magnitude based on macroseismic observations">Me</abbr>';
	Lang['EN']['meNP'] = '<abbr title="Equivalent magnitude based on macroseismic observations">Me</abbr>';
	Lang['EN']['meEE'] = '<abbr title="Equivalent magnitude based on macroseismic observations">Me</abbr>';
	Lang['EN']['location'] = '<abbr title="Epicentral area">Epicentral Area</abbr>';
	Lang['EN']['locationNP'] = '<abbr title="Epicentral area">Epicentral Area</abbr>';
	Lang['EN']['locationEQ'] = '<abbr title="Epicentral area">Area</abbr>';
	Lang['EN']['locationEE'] = '<abbr title="Epicentral area">Epic. Area</abbr>';
	Lang['EN']['locality'] = '<abbr title="Name of locality">Locality</abbr>';
	Lang['EN']['locnameEE'] = '<abbr title="Name of locality">Locality</abbr>';
	Lang['EN']['emap'] = '<abbr title="Earthquake map">Map</abbr>';
	Lang['EN']['emapNP'] = '<abbr title="Earthquake map">Map</abbr>';
	Lang['EN']['latLOC'] = '<abbr title="Latitude of locality">Lat.</abbr>';
	Lang['EN']['lonLOC'] = '<abbr title="Longitude of locality">Lon.</abbr>';
	Lang['EN']['lat'] = '<abbr title="Epicenter latitude based on macroseismic observations">Lat.</abbr>';
	Lang['EN']['lon'] = '<abbr title="Epicenter longitude based on macroseismic observations">Lon.</abbr>';
	Lang['EN']['etype'] = '<abbr title="Epicenter type: &#013; C: Calculated &#013; L: Local effects &#013; R: Region, area &#013; H: Hypothetical &#013; NP: Not parameterized">Type</abbr>';
	Lang['EN']['dist'] = '<abbr title="Distance from epicenter (km)">Distance (km)</abbr>';
	Lang['EN']['relEQ'] = '<abbr title="F: false &#013D: doubtful &#013S: epicentral parameters based on a single intensity datapoint &#013E: epicentral location from foreign catalogue &#013N: no macroseismic observations available">Notes</abbr>'
	Lang['EN']['levelIndex'] = '<abbr title="Review level">RL</abbr>';

	// ========================      LOCALITY    ================================
	Lang['EN']['pagetypeLOC'] = 'LOCALITY'
	Lang['EN']['NoNterrLOC'] = 'No individual earthquake causing effects on the built and natural environment reported for this site'
	Lang['EN']['EEnperiod_title'] = 'Earthquake sequences associated with effects on the natural environment only at this site:'

	// ========================      QUAKE    ================================
	Lang['EN']['pagetypeEQ'] = 'EARTHQUAKE'
	Lang['EN']['nperiodExplanation'] = '<abbr title= "List of individual events belonging to the same earthquake sequence reported in the catalogue. The earthquake shown in the map is highlighted in yellow">?</abbr>'

	Lang['EN']['Bauth'] = 'Author <img src="images/sort.png" width= "8" />'
	Lang['EN']['Btitle'] = 'Title <img src="images/sort.png" width= "8" />'
	Lang['EN']['Btype'] = 'Type of source <img src="images/sort.png" width= "8" />'
	Lang['EN']['Byear'] = 'Year <img src="images/sort.png" width= "8" />'
	Lang['EN']['Bplace'] = 'Place <img src="images/sort.png" width= "8" />'

	if (typeof D0textIT != 'undefined'){
		Lang['EN']['D0text'] = D0textEN;
		Lang['EN']['EQparam'] = textcommTOT_EN[0]
		Lang['EN']['EQsequence'] = textcommTOT_EN[1]
		Lang['EN']['EQreview'] = textcommTOT_EN[2]
		Lang['EN']['EQresilience'] = textcommTOT_EN[3]
		Lang['EN']['EQscience'] = textcommTOT_EN[4]
		Lang['EN']['EQeffectsAnt'] = textcommTOT_EN[5]
		Lang['EN']['EQeffectsEnv'] = textcommTOT_EN[6]
	// Lang['EN']['EQbiblio'] = textcommTOT_IT[6]
	// Lang['EN']['embed'] = 'Excerpt from Mediterranean Catalogue'
	}

	// Lang['EN']['COMM_EQparams1'] = 'Space-time parameters'
	// Lang['EN']['COMM_EQparams2'] = 'Previous catalogues and reasons of the corrections'
	// Lang['EN']['COMM_EQseq1'] = 'Main events of the earthquake sequence'
	// Lang['EN']['COMM_EQseq2'] = 'Full chronology of the earthquake sequence'
	// Lang['EN']['COMM_EQrev1'] = 'State of earthquake review'
	// Lang['EN']['COMM_EQrev2'] = 'Development of earthquakes review'
	// Lang['EN']['COMM_EQresil1'] = 'Effects in the social context'
	// Lang['EN']['COMM_EQresil2'] = 'Demography elements'
	// Lang['EN']['COMM_EQresil3'] = 'Elements of the local buildings'
	// Lang['EN']['COMM_EQresil4'] = 'Administrative historical affiliations'
	// Lang['EN']['COMM_EQresil5'] = 'Social and economic effects'
	// Lang['EN']['COMM_EQresil6'] = 'Institutional and administrative response'
	// Lang['EN']['COMM_EQresil7'] = 'Reconstructions and relocations'
	// Lang['EN']['COMM_EQscience1'] = 'Technical/scientific surveys'
	// Lang['EN']['COMM_EQscience2'] = 'Theories and observations'
	// Lang['EN']['COMM_EQeffant1'] = 'Major effects'
	// Lang['EN']['COMM_EQeffnat2'] = 'Associated natural phenomena'
	// Lang['EN']['COMM_EQeffant2'] = 'Concurrent natural and man-induced destructive events'
	// Lang['EN']['COMM_EQeffnat1'] = 'Effects on the natural environment'

	// D1 table -----TABLE REMOVED FROM ENGLISH VERSION - TOO COMPLICATED WITH GOOGLE TRANSLATION
 // 	Lang['EN']['D1table_title'] = 'Effects on the built environment by individual locality'
 // 	Lang['EN']['loc_D1table'] = 'Locality <img src="images/sort.png" width= "8" />'
 // 	Lang['EN']['int_D1table'] = 'Intensity (MCS) <img src="images/sort.png" width= "8" />'
 // 	Lang['EN']['D1_D1table'] = 'Effects on built environment'

	// E1 table -----TABLE REMOVED FROM ENGLISH VERSION - TOO COMPLICATED WITH GOOGLE TRANSLATION
 // 	Lang['EN']['E1table_title'] = 'Effects on the natural environment by individual locality'
 // 	Lang['EN']['loc_E1table'] = 'Locality <img src="images/sort.png" width= "8" />'
 // 	Lang['EN']['dot_E1table'] = '<abbr title=" o  Effects on natural environment associated with earthquake sequence &#013; &#9679;  Effects on natural environment associated with individual earthquake">Nat</abbr>'
 // 	Lang['EN']['E1_E1table'] = 'Effects on natural environment'

	Lang['EN']['EQparamT'] = 'Parameters'
	Lang['EN']['EQsequenceT'] = 'Sequence'
	Lang['EN']['EQreviewT'] = 'State of review'
	Lang['EN']['EQresilienceT'] = 'Social and <br \>institutional response'
	Lang['EN']['EQscienceT'] = 'Theories and <br \>observations'
	Lang['EN']['EQeffectsTAnt'] = 'Effects on <br \>built environment'
	Lang['EN']['EQeffectsTEnv'] = 'Effects on <br \>natural environment'
	Lang['EN']['EQbiblioT'] = 'Bibliography'
	// Lang['EN']['embedT'] = 'Excerpt from Mediterranean Catalogue' // now set in quake.js

	Lang['EN']['titleCommWin'] = 'Historical-critical comments on entire earthquake sequence'

	Lang['EN']['falseSentenceEQ'] = '<b><br />False earthquake</b>';

	// ----- level per quake page
	if (typeof levelID != 'undefined'){
		Lang['EN'][levelID[0]] = '<b><font color="#1f708f">' + level_abbrTitle_EN  + '</font></b>'+ '<br />' + level_abbr_EN[0];
		Lang['EN'][levelID[1]] = '<b><font color="#1f708f">' + level_abbrTitle_EN  + '</font></b>'+ '<br />' + level_abbr_EN[1]
		Lang['EN'][levelID[2]] = '<b><font color="#1f708f">' + level_abbrTitle_EN  + '</font></b>'+ '<br />' + level_abbr_EN[2]
	}

	// ----- morti
	if (typeof deadaff_ID != 'undefined'){
		for (var i=0; i<dead_affidtext_EN.length; i++) Lang['EN'][deadaff_ID[i]] = dead_affidtext_EN[i]
		for (var i=0; i<dead_moretext_EN.length; i++) Lang['EN'][deadmore_ID[i]] = dead_moretext_EN[i]
		for (var i=0; i<dead_text_EN.length; i++) Lang['EN'][deadtext_ID[i]] = dead_text_EN[i]
		Lang['EN'][deadlegend_ID] = dead_legend_EN
	}

	// ----- new2018
	Lang['EN']['var2018'] = 'Earthquake with changes and/or corrections compared to version 4 of CFTI'
	Lang['EN']['rev2018'] = 'Earthquake re-investigated with respect to version 4 of CFTI'
	Lang['EN']['new2018'] = 'Earthquake not included in version 4 of CFTI'




	this.setLanguage = function(Language){
		var LangArray = Lang[Language];
		for (var key in LangArray)
			if (document.getElementById(key))

			document.getElementById(key).innerHTML = LangArray[key];

		Langsel = Language;

		//---- ALL PAGES - LAYERS ABBR

		var abbr = document.getElementById('abbrWMSlayers');
		if (Language == 'IT') {
			abbr.title="Aggiungi layer informativi alla mappa"
			abbr.style.cursor="help"
		} else {
			abbr.title="Add informative overlays to the map"
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('TopoIGM25');
		if (Language == 'IT') {
			abbr.title="Carta topografica d\'Italia alla scala 1:25.000. Risoluzione 1:25.000. Il servizio è visualizzabile solo a scale superiori a 1:100.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('TopoIGM100');
		if (Language == 'IT') {
			abbr.title="Carta topografica d'Italia alla scala 1:100.000. Risoluzione 1:100.000. Il servizio è visualizzabile solo a scale superiori a 1:300.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('Geomap');
		if (Language == 'IT') {
			abbr.title = "Mosaico carta geologica d'italia alla scala 1:100000 edita dal Servizio Geologico d'Italia"
			// DESCRIZIONE DELLA CARTA NUOVA ISPRA CHE PER ORA NON è FUNZIONANTE - SE TORNA A FUNZIONARE, SOSTITUIRE L'ABBR SOPRA
			// Il servizio permette la visualizzazione della carta geologica d'Italia alla scala 1:100.000, informatizzata. la geologia è stata accorpata in base all'eta' inferiore delle unita' geologiche, il servizio permette di visualizzare inoltre i seguenti layer: tettonica (layer di riferimento a grande scala), tracce dei profili geologici, elementi puntuali (stratimetria, sorgenti, cave, miniere, pozzi per acque e idrocarburi, localia' d'interesse geologico e sondaggi.""
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('FranelayerTitle');
		if (Language == 'IT') {
			abbr.title="Nel 2008, nell'ambito del Piano Straordinario di Telerilevamento (PST), la Direzione generale per la tutela del territorio e delle risorse idriche ha avviato, in collaborazione con le Regioni, un'attività di raccolta dei dati appartenenti all'inventario IFFI che le Regioni stesse, con proprie risorse, continuano ad aggiornare. Pertanto, al fine di fornire un quadro completo ed aggiornato (2009) sulla distribuzione dei fenomeni franosi sono stati predisposti strati informativi organizzati secondo le geometrie e alcune tipologie di movimento a partire dai database regionali, opportunamente omogeneizzati. Risoluzione 1:25.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('FraneLin');
		if (Language == 'IT') {
			abbr.title="Lo strato informativo Frane lineari rappresenta i fenomeni franosi la cui lunghezza è molto maggiore della larghezza e quest'ultima è così piccola da non essere cartografabile a scala 1:25.000. Sono comunque esclusi tutti quei fenomeni classificati come aree soggette a crolli/ribaltamenti diffusi, aree soggette a sprofondamenti diffusi, aree soggette a frane superficiali diffuse, DGPV. La tabella associata contiene la seguente informazione principale: IDFRANA, codice identificativo della frana. Lo strato informativo è visualizzabile per scale superiori a 1:250.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('FranePol');
		if (Language == 'IT') {
			abbr.title="Lo strato informativo Frane poligonali rappresenta frane di dimensioni inferiori all'ettaro: in funzione della scala della base topografica utilizzata per il rilevamento si è introdotto un valore minimo dell'area cartografabile (scala=1:5.000 area minima=400 m2, scala=1:10.000 area minima=1600 m2; scala=1:25.000 area minima=10.000 m2 ). La tabella associata contiene le seguenti informazioni principali: IDFRANA, codice identificativo della frana; TIPO, indica se il fenomeno è una frana, un'area di espansione o un poligono isolato non contenente il PIFF (1 = frana, 2= area di espansione, 3 = poligono isolato). Lo strato informativo è visualizzabile per scale superiori a 1:250.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('FraneDiff');
		if (Language == 'IT') {
			abbr.title="Lo strato informativo Aree rappresenta tutte le frane poligonali classificate come: aree soggette a crolli/ribaltamenti diffusi; aree soggette a sprofondamenti diffusi; aree soggette a frane superficiali diffuse. Lo strato informativo riporta quei fenomeni franosi con superficie significativa e cartografabile alla scala 1:25.000 (dimensione minima= 1ha). La tabella associata contiene le seguenti informazioni principali: IDFRANA, codice identificativo della frana; TIPO, indica la tipologia di area franosa (9 = Aree soggette a crolli/ ribaltamenti diffusi; 10 = Aree soggette a sprofondamenti diffusi; 11 = Aree soggette a frane superficiali diffuse). Lo strato informativo è visualizzabile per scale superiori a 1:250.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}
		var abbr = document.getElementById('FraneDGPV');
		if (Language == 'IT') {
			abbr.title="Lo strato informativo Deformazioni Gravitative Profonde di Versante (DGPV) rappresenta tutte le frane poligonali classificate come aree soggette a deformazione gravitativa profonda di versante. Lo strato informativo riporta quei fenomeni franosi con superficie significativa e cartografabile alla scala 1:25.000 (dimensione minima= 1ha). La tabella associata contiene le seguenti informazioni principali: IDFRANA, codice identificativo della frana; TIPO, indica la tipologia di area franosa (8 = DGVP). Lo strato informativo è visualizzabile per scale superiori a 1:250.000"
			abbr.style.cursor="help"
		} else {
			abbr.title=""
			abbr.style.cursor="default"
		}

		// ---- SISMICITA' STRUMENTALE
		var abbr = document.getElementById('STRUMeqtitle');
		if (Language == 'IT') {
			abbr.title="Aggiungi sismicità strumentale alla mappa"
		} else {
			abbr.title="Add instrumental seismicity to the map"
		}

		var abbr = document.getElementById('selAreaAbbrSTRUM');
		if (Language == 'IT') {
			abbr.title="Selezione areale"
		} else {
			abbr.title="Select area"
		}






		//--- all pages- INCLUDE DISCLAIMER/CREDITS
		if (Langsel == 'IT') {
			jQuery.get('html/credits_disclaimerIT.html', function(data){
				document.getElementById("disctext").innerHTML = data;
			})
		} else {
			jQuery.get('html/credits_disclaimerEN.html', function(data){
				document.getElementById("disctext").innerHTML = data;
			})
		}




    	// ---- only for index page

		if (document.getElementsByClassName("OKbutton")){
			var abbr = document.getElementsByClassName("OKbutton");
			for(var i=0; i< abbr.length; i++){
				if (Langsel == 'EN') abbr[i].title = 'apply selection';
				else abbr[i].title = 'applica la selezione';
			}
		};
		if (document.getElementById("abbrWMSlink")){
			var abbr = document.getElementById("abbrWMSlink");
			if (Langsel == 'EN') abbr.title = 'copy url for OGC Web Service WMS (entire catalogue)';
			else abbr.title = 'copia link al servizio web OGC WMS (intero catalogo)';
		};
		if (document.getElementById("abbrWFSlink")){
			var abbr = document.getElementById("abbrWFSlink");
			if (Langsel == 'EN') abbr.title = 'copy url for OGC Web Service WFS (entire catalogue)';
			else abbr.title = 'copia link al servizio web OGC WFS (intero catalogo)';
		};



		if (document.getElementById("abbracc")){
			var abbr = document.getElementById("abbracc");
			if (Langsel == 'EN') abbr.title = 'Access by'; //procedura separata per cambiare l' "abbr" della lista selezione inizale
			else abbr.title = 'Accesso per'; //procedura separata per cambiare l' "abbr" della lista selezione inizale
		};
		if (document.getElementById("selAreaAbbr")){
			var abbr = document.getElementById("selAreaAbbr");
			if (Langsel == 'EN') abbr.title = 'Select area';
			else abbr.title = 'Seleziona area';
		};
		// ----- level for index page
		if (typeof levelID != 'undefined'){

			var levellist = document.getElementsByClassName(levelID[0])
			for(var i=0; i< levellist.length; i++) {
				if (Langsel == "EN") {
					levellist[i].innerHTML = level_abbr_EN[0];
				} else {
					levellist[i].innerHTML = level_abbr_IT[0];
				}
			}
			var levellist1 = document.getElementsByClassName(levelID[1])
			for(var i=0; i< levellist1.length; i++) {
				if (Langsel == "EN") {
					levellist1[i].innerHTML = level_abbr_EN[1];
				} else {
					levellist1[i].innerHTML = level_abbr_IT[1];
				}
			}
			var levellist2 = document.getElementsByClassName(levelID[2])

			for(var i=0; i< levellist2.length; i++) {

				if (Langsel == "EN") {
					levellist2[i].innerHTML = level_abbr_EN[2];
				} else {
					levellist2[i].innerHTML = level_abbr_IT[2];
				}
			}

		}

		//  ----  EQ page
		if (document.getElementById("openCOMM")){
			var abbr = document.getElementById("abbropenCOMM");
			if (Language == 'EN') abbr.title = 'Historical-critical comments on entire earthquake sequence';
			else abbr.title = 'Commenti storico-critici per l\'intera sequenza sismica';
		};

		if (document.getElementById("cpti")){
			var abbr = document.getElementById("cpti");
			if (Language == 'EN') abbr.title = 'Used as reference by CPTI-DBMI';
			else abbr.title = 'Usato come studio di riferimento da CPTI-DBMI';
		};
		if (document.getElementById("cpti15earlier")){
			var abbr = document.getElementById("cpti15earlier");
			if (Language == 'EN') abbr.title = 'CPTI15 released earlier than this study';
			else abbr.title = 'Release 15 di CPTI antecedente all\'uscita di questo studio';
		};
		if (document.getElementById("notrif_cpti")){
			var abbr = document.getElementById("notrif_cpti");
			if (Language == 'EN') abbr.title = 'Not used as reference by CPTI-DBMI';
			else abbr.title = 'Non usato come studio di riferimento da CPTI-DBMI';
		};
		if (document.getElementById("notpresent_cpti")){
			var abbr = document.getElementById("notpresent_cpti");
			if (Language == 'EN') abbr.title = 'Not included in CPTI15';
			else abbr.title = 'Non presente in CPTI15';
		};
		if (document.getElementById("not_cpti_ante1000")){
			var abbr = document.getElementById("not_cpti_ante1000");
			if (Language == 'EN') abbr.title = 'Outside CPTI-DBMI time range';
			else abbr.title = 'Fuori dall\'intervallo temporale di CPTI-DBMI';
		};

		if (document.getElementById("asmi")){
			var abbr = document.getElementById("asmi");
			if (Language == 'EN') abbr.title = 'Link to corresponding ASMI page';
			else abbr.title = 'Link alla pagina corrispondente in ASMI';
		};
		if (document.getElementById("not_asmi")){
			var abbr = document.getElementById("not_asmi");
			if (Language == 'EN') abbr.title = 'Not in ASMI';
			else abbr.title = 'Non presente in ASMI';
		};
		if (document.getElementsByClassName("biblioEQ_pdfT")){
			var abbr = document.getElementsByClassName("biblioEQ_pdfT");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].title = biblioEQ_pdfT_abbrEN;
				else abbr[i].title = biblioEQ_pdfT_abbrIT;
			}
		}
		if (document.getElementsByClassName("biblioEQ_pdfR")){
			var abbr = document.getElementsByClassName("biblioEQ_pdfR");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].title = biblioEQ_pdfR_abbrEN;
				else abbr[i].title = biblioEQ_pdfR_abbrIT;
			}
		}
		if (document.getElementById("D0abbr")){
			var abbr = document.getElementById("D0abbr");
			if (Language == 'EN') abbr.title = 'Description of major effects on the built environment, related to the entire earthquake sequence';
			else abbr.title = 'Descrizione dei maggiori effetti sul contesto antropico relativi all\'intera sequenza sismica';
		};
		if (document.getElementById("B0abbr")){
			var abbr = document.getElementById("B0abbr");
			if (Language == 'EN') abbr.title = 'State of review for the entire earthquake sequence';
			else abbr.title = 'Stato delle conoscenze sull\'intera sequenza sismica';
		};

		// link ai terremoti dell'nperiod (tabella in alto a sx in quake)
		if (document.getElementsByClassName("dateEQ")){
			var datelink = document.getElementsByClassName("dateEQ")
			for(var i=0; i< datelink.length; i++) {
				if (Langsel == "EN") {
					datelink[i].innerHTML = datelink[i].innerHTML.split('IT').join('EN')
				} else {
					datelink[i].innerHTML = datelink[i].innerHTML.split('EN').join('IT')
				}
			}
		}

		// add table of D1 and E1 inside tabs of 'COMM' (only in italian version)
		if (typeof tableD1 != 'undefined' && tableD1.innerHTML != ''){
			var div = document.getElementById("EQeffectsAnt")
			if (Langsel == "IT") {
				div.innerHTML = textcommTOT_IT[5] + '<br><br><br><b><span id="D1table_title">Effetti sul contesto antropico per le singole località</span></b><hr><br>'
				div.appendChild(tableD1);
			}
		}
		if (typeof tableE1 != 'undefined' && tableE1.innerHTML != ''){
			var div = document.getElementById("EQeffectsEnv")
			if (Langsel == "IT") {
				div.innerHTML = textcommTOT_IT[6] + '<br><br><br><b><span id="E1table_title">Effetti sull\'ambiente naturale per le singole località</span></b><hr><br>'
				div.appendChild(tableE1);
			}
		}

		// biblio valb texts
		if (typeof valb != 'undefined'){
			for (var i=0; i<valb.length; i++){
				// valb description
				// if(document.getElementsByClassName(valb[i]+"descr"){
				var text = document.getElementsByClassName(valb[i]+"descr");
				var abbr = document.getElementsByClassName(valb[i]+"text");
				for(var k=0; k<text.length; k++) {
					if (Language == 'EN') {
						text[k].innerHTML = valb_descrEN[i];
						abbr[k].title = valb_textEN[i];
					}
					else {
						text[k].innerHTML = valb_descrIT[i];
						abbr[k].title = valb_textIT[i];
					}
				}
				// }
			}
		}




		//  ----  EE access
		// These work only for 'dinamic' language change in infowindows. But still the text of the infow window has to be given in both languages to the listener.
		if (document.getElementById("EEpage_loclink")){
			var abbr = document.getElementById("EEpage_loclink");
			if (Language == 'EN') abbr.title = EElinkLOCabbr_EN;
			else abbr.title = EElinkLOCabbr_IT;
		};
		if (document.getElementsByClassName("quakePageLink")){
			var abbr = document.getElementsByClassName("quakePageLink");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].title = EElinkEQabbr_EN;
				else abbr[i].title = EElinkEQabbr_IT;
			}
		}
		if (document.getElementsByClassName("EEaccess_descr")){
			var abbr = document.getElementsByClassName("EEaccess_descr");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].innerHTML = EEdescrEN;
				else abbr[i].innerHTML = EEdescrIT;
			}
		}

		// all EE effects
		if (typeof class_codeEE != 'undefined'){
			for (var i=0; i<class_codeEE.length; i++){
				// all abbr titles for EEdescrition
				if(document.getElementsByClassName(class_codeEE[i])){
					var abbr = document.getElementsByClassName(class_codeEE[i]);

					for(var k=0; k<abbr.length; k++) {
						if (Language == 'EN') abbr[k].title = class_titleEE_EN[i];
						else abbr[k].title = class_titleEE_IT[i];
					}
				}
				// all infowindows EEdescritions
				if(document.getElementsByClassName(class_codeEE[i]+"_IW")){
					var typeEE = document.getElementsByClassName(class_codeEE[i]+"_IW");
					for(var k=0; k<typeEE.length; k++) {
						if (Language == 'EN') typeEE[k].innerHTML = class_titleEE_EN[i];
						else typeEE[k].innerHTML = class_titleEE_IT[i];
					}
				}
			}
		}

		if (document.getElementsByClassName("abbrEENP")){
			var abbr = document.getElementsByClassName("abbrEENP");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].title = abbrEENP_EN;
				else abbr[i].title = abbrEENP_IT;
			}
		}
		if (document.getElementsByClassName("abbrEENT")){
			var abbr = document.getElementsByClassName("abbrEENT");
			for(var i=0; i<abbr.length; i++) {
				if (Language == 'EN') abbr[i].title = abbrEENT_EN;
				else abbr[i].title = abbrEENT_IT;
			}
		}


		// --- GENERAL: types of sentence depending on comment flags and ITA/MED
		if (document.getElementsByClassName("flag1descr")){
			var text = document.getElementsByClassName("flag1descr");
			for (var i=0; i<text.length; i++) {
				if (Language == 'EN') text[i].innerHTML = flag1descr['EN'];
				else text[i].innerHTML = flag1descr['IT'];
			}
		}
		if (document.getElementsByClassName("flag2descr")){
			var text = document.getElementsByClassName("flag2descr");
			for (var i=0; i<text.length; i++) {
				if (Language == 'EN') text[i].innerHTML = flag2descr['EN'];
				else text[i].innerHTML = flag2descr['IT'];
			}
		}if (document.getElementsByClassName("flag3descr")){
			var text = document.getElementsByClassName("flag3descr");
			for (var i=0; i<text.length; i++) {
				if (Language == 'EN') text[i].innerHTML = flag3descr['EN'];
				else text[i].innerHTML = flag3descr['IT'];
			}
		}
		if (document.getElementsByClassName("flagMED1descr")){
			var text = document.getElementsByClassName("flagMED1descr");
			for (var i=0; i<text.length; i++) {
				if (Language == 'EN') text[i].innerHTML = flagMED1descr['EN'];
				else text[i].innerHTML = flagMED1descr['IT'];
			}
		}
		if (document.getElementsByClassName("flagMED2descr")){
			var text = document.getElementsByClassName("flagMED2descr");
			for (var i=0; i<text.length; i++) {
				if (Language == 'EN') text[i].innerHTML = flagMED2descr['EN'];
				else text[i].innerHTML = flagMED2descr['IT'];
			}
		}




		// ---- language icons
		if (Language == 'EN'){
			document.getElementById("en").src = 'images/uk_grey.png';
			document.getElementById("it").src = 'images/it.png';
			document.getElementById("it").style.cursor = 'pointer';
			document.getElementById("en").style.cursor = 'default';

		}	else {
			document.getElementById("en").src = 'images/uk.png';
			document.getElementById("it").src = 'images/it_grey.png';
			document.getElementById("it").style.cursor = 'default';
			document.getElementById("en").style.cursor = 'pointer';


		}

		$('section').translatable({
		  contentNodeSelector     : 'span.gtranslate'
		, translateButtonSelector : 'a[href="#translate"]'
		//        , autoChangeButtonText    : false
		//        , language                : 'en'
		//        , debug                   : true
		});
	}




}
