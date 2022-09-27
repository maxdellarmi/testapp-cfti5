// flags
var flagPQ = 0; // deve essere inizializzato a zero!

// EPICLICK MOD: set variables
var epicenter;
var epiZ=5000;

// var flagQuakePage = 1;  // se questo si mette, poi nella pagina del terremoto compare il link per il confronto del terremoto con HSIT

// XML paths
var xmlServicePQ = './quakeSources/' + Nterr + '.xml';
var xmlServiceEE = 'EEList.xml';
var xmlServiceEE_MED = 'EEList_MED.xml';
var xmlServiceEQLIST = 'QuakeList.xml';

// Google MAP
var map;
var bounds;
var infowindow = new google.maps.InfoWindow();

// external files
var ASMIlist = [];

// -------------      ALL quakes from quake list
var xmlServicePQ_ALLEQ = [];
var NterrALLEQ = []; var NperiodALLEQ= [];
var DateLabelALLEQ = [];
var YearALLEQ = [], MonthALLEQ = [], DayALLEQ = []
var TimeLabelALLEQ = []
var HourALLEQ = [], MinuALLEQ = [], SecALLEQ = []
var LatALLEQ = [], LonALLEQ = [];
var ImaxALLEQ = [], IoALLEQ = [];
var iNP_ALLEQ = [];
var MeALLEQ = [];
var LocationALLEQ = [];
var CountryALLEQ = [];
var EpicenterALLEQ = [];
var RelALLEQ = [];

// -----------------    Epicenter
var nper;

// -----------------    PQ
var PQMarkers = [];
var PQMarkersOLD = [];
var locPQlat = [];
var locPQlon = [];
var NlocOld;
var noteLocPQ = [];

var tableD1 = document.createElement('table');

// -----------------    EE
var EEMarkers = [];
var EE_nperiod = [];
var EE_nterr = [];
var EE_codeff = [];
var EE_desceff = [];
var EE_nloc = [];
var EE_loc = [];
var EE_locNote = [];
var EE_comm = [];
// var EE_nloc6 = [];
var EE_Lat = []; //var fEE_Lat = [];
var EE_Lon = []; //var fEE_Lon = [];
var EE_prov = [];

var tableE1 = document.createElement('table');

// ----------------- VALB DESCRIPTIONS
var valblist = [];
var valb = [];
var valb_descrIT = [];
var valb_descrEN = [];
var valb_textIT = [];
var valb_textEN = [];

var D0textIT;
var D0textEN;
var B0textIT;
var B0textEN;
var textcommTOT_IT = [];
var textcommTOT_EN = [];

//----------------- DEATH
var dead_list = []
var dead_nperiod = []
var dead_amount = []
var dead_class = []
var dead_affid = []

var dead_affidtext_IT = [" Affidabilità bassa", " Affidabilità media", " Affidabilità alta"]
var dead_moretext_IT = ["Possibile sovrastima", "Possibile sottostima"] // non usati (sarebbero i '+' o '-')
var dead_text_IT = ["NUMERO DI MORTI (SEQUENZA SISMICA): <br> "]
var dead_legend_IT = "LEGENDA: <br> "

var dead_affidtext_EN = [" Low reliability", " Medium reliability", " High reliability"]
var dead_moretext_EN = ["Possibly overestimated", "Possibly underestimated"] // non usati
var dead_text_EN = ["CASUALTIES (EARTHQUAKE SEQUENCE): <br> "]
var dead_legend_EN = "LEGEND: <br> "

var deadaff_ID = ["Aff1", "Aff2", "Aff3"]
var deadmore_ID = ["mdeadmore1", "deadmore2"]
var deadtext_ID = ["deadtext"]
var deadlegend_ID = "deadlegend"

var E1listExport = [];


// Get list of events in ASMI/CPTI
$.get('CFTI4med_ASMI_20170523.txt', function(data){
		   ASMIlist = data.split('\r');
});

// Get info on casualties
$.get('Morti_Feriti.txt', function(data){
	dead_list = data.split('\n');
	for (var i = 0; i < dead_list.length; i++) {
		var line = dead_list[i].split(/\t/)
		dead_nperiod[i] = line[1];
		dead_amount[i] = line[2];
		dead_class[i] = line[3];
		dead_affid[i] = line[4];
	}
});

// Get valb descriptions
$.get('valb_descriptions.txt', function(data){
	valb_list = data.split('\n');
	for (var i = 0; i < valb_list.length; i++) {
		var line = valb_list[i].split(/\t/)
		valb[i] = line[0];
		valb_descrIT[i] = line[1];
		valb_descrEN[i] = line[2];
		valb_textIT[i] = line[3];
		valb_textEN[i] = line[4];
	}
});

function InitializeQuake() {
	$('#loading').show();
	placeMap();
	requestEQLISTData();
	resizeMapQuake();
}

function resizeMapQuake() {
	resizeMap();
	document.querySelector('#quakePQtable').style.height = Math.round( h -395)+'px';
	document.querySelector('#PQ_info tbody').style.height = Math.round( h -435)+'px';
	document.querySelector('#PQ_info').style.height = Math.round( h -395)+'px';
}

// When clicking on table row, trigger event on Gmap marker (used to trigger popup window when clicking on table row)
function onclickList(prog){
	/*FlagScroll = 0

	//center map on selected event (when selecting from table line)
	var center = new google.maps.LatLng(locPQlat[prog], locPQlon[prog]);
    map.panTo(center);*/
	// map.fitBounds(bounds);

	console.log('evento click della singola feature..');
	console.log(quakesPQMarkers[prog]);

	google.maps.event.trigger(quakesPQMarkers[prog], 'click');
	//markersArray[1170]['Marker'].getGeometry().getExtent()
	sClick = "LIST";
	// Flag for scrolling table - set to zero when event is selected from table (and not from marker)
	FlagScroll = 0;

	//************zoom nella zona di riferimento dove e' posizionata la singola feature
	var padding = [500, 50, 500, 50]
	mapOL.getView().fit(
		quakesPQMarkers[prog].getGeometry().getExtent(),
		{
			size: mapOL.getSize(),
			padding: padding,
		}
	);
	mapOL.getView().setZoom(10);

	//gestione selezione singola feature ---->> successivamente mostra il singolo popup
	var collection = new ol.Collection();
	select = new ol.interaction.Select({
		features: collection,
		style: null,
	});

	mapOL.addInteraction(select);
	window.setTimeout(function() {
		collection.push(quakesPQMarkers[prog]);
		select.dispatchEvent({
			type: 'select',
			selected: [quakesPQMarkers[prog]],
			deselected: []
		});
	}, 500);



	//EVENTO DI SELECT DELLA MAPPA SERVONO OVERLAY DICHIARATO VAR GLOBALE su mapOL e il popup
	select.on('select', bindSelectEvent);

	/*********************************************/
	//RIMUOVE LE INTERAZIONI DOPO AVER CLICCATO OK se l'utente aveva selezionato il boundingBOX con la selezione ad area
	window.setTimeout(function() {
		console.log('removingInteractions  SELECT' + mapOL.getInteractions());
		try {
			mapOL.getInteractions().pop();
		}
		catch (e) {
			console.error('ERRORE Gestito');
			console.log(e, e.stack);
		}
	}, 1000);
}


function bindSelectEvent(evt) {
	// evento = evt;
	var element = document.getElementById('popup');
	console.log('selectSingleQuake');
	if (evt.selected != undefined && evt.selected.length >0) {
		if (evt.selected[0]) {
			$(element).popover('destroy');
			var coordinates = evt.selected[0].getGeometry().getCoordinates();
			var popupContent = "";
			console.log("FEATURE ONCLICK popup data:")
			console.log(evt.selected[0].OnClickTextIT);
			console.log('features singola da visualizzare...');
			popupContent = evt.selected[0].OnClickTextIT;
			/************************************************************/
			//////////////variabile OVERLAY della mappa GLOBALE*******/
			/************************************************************/
			popup.setPosition(coordinates);
			$(element).popover({
				'placement': 'top',
				'animation': false,
				'html': true,
				'trigger': 'manual',
				'content': buttonCloseSingle.toString() + " "+ popupContent // feature.OnClickTextIT;
			});
			//bugfix 10052022 per i popup vuoti.
			if ($(element).data('bs.popover').options.content.includes("<div") === true) {
				$(element).popover('show');
			}
		} else {
			$(element).popover('destroy');
			popup.setPosition(undefined);
		}
	}
}

// ==========================================================================================
//											PARSE QUAKE LIST OF ALL CFTI QUAKES
//  needed for EE non in PQ
// ==========================================================================================
function requestEQLISTData(){
    console.log("requestEQLISTData");

	//new LogTools().addLog('Requesting quakes<br />', 40);
	var ajaxUpdater = new Manajax(xmlServiceEQLIST);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parseQuakeList;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();
}

function parseQuakeList(XmlText){
    console.log("parseQuakeList");
	//new LogTools().addLog('Parsing all quakes<br />', 80);
	XMLQuakeList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLQuakeListArrived = true;
	var markers = XMLQuakeList.documentElement.getElementsByTagName("Quake");

	if(markers.length > 0){
		for (var i = 0; i < markers.length; i++){
			NterrALLEQ[i] = XMLQuakeList.getElementsByTagName("nterr")[i].childNodes[0].nodeValue;
			// Nterr1 = Nterr[0];

			var Zone = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;

			// CHECK NPERIOD -- QUESTO NON DOVRA' PIU' SERVIRE QUNDO I DATI SARANNO A POSTO!!!!!!!!!!!!!
			var CheckNperiod =  XMLQuakeList.getElementsByTagName("nperiod")[i];
			NperiodALLEQ[i] = CheckNperiod.childNodes.length ? CheckNperiod.childNodes[0].nodeValue : '';

			xmlServicePQ_ALLEQ[i] = './quakeSources/' + NterrALLEQ[i] + '.xml';
			DateLabelALLEQ[i] =  XMLQuakeList.getElementsByTagName("data_label")[i].childNodes[0].nodeValue;
			YearALLEQ[i] = parseInt(XMLQuakeList.getElementsByTagName("anno")[i].childNodes[0].nodeValue);

			var CheckMonth =  XMLQuakeList.getElementsByTagName("mese")[i];
			MonthALLEQ[i] = CheckMonth.childNodes.length ? CheckMonth.childNodes[0].nodeValue : '';
			if (MonthALLEQ[i]=="") MonthALLEQ[i] = "00"

			var CheckDay =  XMLQuakeList.getElementsByTagName("giorno")[i];
			DayALLEQ[i] = CheckDay.childNodes.length ? CheckDay.childNodes[0].nodeValue : '';
			if (DayALLEQ[i]=="") DayALLEQ[i] = "00"

			TimeLabelALLEQ[i] =  XMLQuakeList.getElementsByTagName("time_label")[i].childNodes[0].nodeValue;

			var CheckHour =  XMLQuakeList.getElementsByTagName("ora")[i];
			HourALLEQ[i] = CheckHour.childNodes.length ? CheckHour.childNodes[0].nodeValue : '';
			if (HourALLEQ[i]=="-9" || HourALLEQ[i]=="" ) HourALLEQ[i] = 0;

			var CheckMinu =  XMLQuakeList.getElementsByTagName("minu")[i];
			MinuALLEQ[i] = CheckMinu.childNodes.length ? CheckMinu.childNodes[0].nodeValue : '';
			if (MinuALLEQ[i]=="-9" || MinuALLEQ[i]=="" ) MinuALLEQ[i] = 0;

			var CheckSec =  XMLQuakeList.getElementsByTagName("sec")[i];
			SecALLEQ[i] = CheckSec.childNodes.length ? CheckSec.childNodes[0].nodeValue : '';
			if (SecALLEQ[i]=="-9" || SecALLEQ[i]=="" ) SecALLEQ[i] = 0;

			LatALLEQ[i] = parseFloat(XMLQuakeList.getElementsByTagName("lat")[i].childNodes[0].nodeValue).toFixed(3);
			LonALLEQ[i] = parseFloat(XMLQuakeList.getElementsByTagName("lon")[i].childNodes[0].nodeValue).toFixed(3);

			ImaxALLEQ[i] = parseFloat(XMLQuakeList.getElementsByTagName("imax")[i].childNodes[0].nodeValue);
			if (ImaxALLEQ[i] == 9.1) ImaxALLEQ[i] = 9;
			if (ImaxALLEQ[i] == 8.2) ImaxALLEQ[i] = 8;
			if (ImaxALLEQ[i] == 8.1) ImaxALLEQ[i] = 8;
			if (ImaxALLEQ[i] == 6.1) ImaxALLEQ[i] = 6;
			if (ImaxALLEQ[i] == 6.6) ImaxALLEQ[i] = 6.5;
			if (ImaxALLEQ[i] == 4.6) ImaxALLEQ[i] = 4.5;
			if (ImaxALLEQ[i] == 5.1) ImaxALLEQ[i] = 5;

			IoALLEQ[i] = parseFloat(XMLQuakeList.getElementsByTagName("io")[i].childNodes[0].nodeValue);

			var flagNP = XMLQuakeList.getElementsByTagName("npun")[i].childNodes.length;
			if (flagNP > 0) {
			iNP_ALLEQ[i] = XMLQuakeList.getElementsByTagName("npun")[i].childNodes[0].nodeValue;
			} else {
				iNP_ALLEQ[i] = 0
			};
			iNP_ALLEQ[i] = parseInt(iNP_ALLEQ[i])

			MeALLEQ[i] = parseFloat(XMLQuakeList.getElementsByTagName("mm")[i].childNodes[0].nodeValue);
			LocationALLEQ[i] = XMLQuakeList.getElementsByTagName("earthquakelocation")[i].childNodes[0].nodeValue;
			CountryALLEQ[i] = XMLQuakeList.getElementsByTagName("country")[i].childNodes[0].nodeValue;

			//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
			var flagET_ALLEQ = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes.length;
			if (flagET_ALLEQ > 0) {
				EpicenterALLEQ[i] = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes[0].nodeValue;
			} else {
				EpicenterALLEQ[i] = "Local effects"
			};

			// QUESTA E' LA RELIABILITY E C'E' SOLO QUI! IN LOCALITY NON LA LEGGO PERCHE' NON LA USO
			if (XMLQuakeList.getElementsByTagName("rel")[i].childNodes.length == 0) RelALLEQ[i] = ""
			else if  (XMLQuakeList.getElementsByTagName("rel")[i].childNodes[0].length == 0) RelALLEQ[i] = ""
			else RelALLEQ[i] = XMLQuakeList.getElementsByTagName("rel")[i].childNodes[0].nodeValue;
			if (RelALLEQ[i] == "?") {RelALLEQ[i]="S"}
		}
		showPQ();
	}
}

function showPQ(){
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;

    ///TODO: VECCHIA GESTIONE caricamento manajax x singleQUAKE
    var ajaxUpdater = new Manajax(xmlServicePQ);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parsePQData;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();


}

function parsePQData(XmlText){
	console.log("parsePQData"+ xmlServicePQ);
	//console.log("parsePQDataXml - showPQ"+ XmlText);

	XMLLocList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLLocListArrived = true;
	nper = XMLLocList.getElementsByTagName("nperiod")[0].childNodes[0].nodeValue;
	// chiama funzioen che fa il parsing dell'xml con EE - questa poi lancia parsePQdata2 che finisce il parsing dei dati PQ.. fatto così a causa dei tempi delle funzioni
	openEE();
}

/** Se Nterr.substring(0,2) == "M2" allora chiama un altro file
 */
function openEE(){
	console.log("parsePQData - openEE");
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;
	if (Nterr.substring(0,2) == "M2") {
		var ajaxUpdater = new Manajax(xmlServiceEE_MED);
	}
	else var ajaxUpdater = new Manajax(xmlServiceEE);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parseEEData;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();
}

function parseEEData(XmlText){
	console.log("parseEEData - openEE:" + xmlServiceEE + "or" + xmlServiceEE_MED);

	XMLEEList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLEEListArrived = true;

	if (Nterr.substring(0,2) == "M2") {
		var EEall = XMLEEList.documentElement.getElementsByTagName("EE_MED");
	}
	else var EEall = XMLEEList.documentElement.getElementsByTagName("EE");

	var k = 0;
	if(EEall.length > 0){
		for (var i = 0; i < EEall.length; i++){
			var sNP = XMLEEList.getElementsByTagName("NPERIOD")[i].childNodes[0].nodeValue;

			if (sNP == nper) {
				EE_nperiod[k] = nper;
				if (XMLEEList.getElementsByTagName("NTERR").length == 0) EE_nterr[k] = ""
				else if  (XMLEEList.getElementsByTagName("NTERR")[i].childNodes.length == 0) EE_nterr[k] = ""
				else EE_nterr[k] = XMLEEList.getElementsByTagName("NTERR")[i].childNodes[0].nodeValue;

				EE_nloc[k] = XMLEEList.getElementsByTagName("NLOC_CFTI")[i].childNodes[0].nodeValue;
				var EE_desloc = XMLEEList.getElementsByTagName("DESLOC_CFTI")[i].childNodes[0].nodeValue;

				if (XMLEEList.getElementsByTagName("PROVLET").length == 0) var EE_prov = ''
				else if (XMLEEList.getElementsByTagName("PROVLET")[i].childNodes.length == 0) var EE_prov = ""
				else var EE_prov = XMLEEList.getElementsByTagName("PROVLET")[i].childNodes[0].nodeValue;

				var flagCount = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes.length;
				if (flagCount > 0) {
					var EE_country = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes[0].nodeValue;
				}
				if (EE_prov != '') EE_loc[k] = EE_desloc + ' (' + EE_prov + ')'
				else EE_loc[k] = EE_desloc + ' (' + EE_country + ')'

				if (Nterr.substring(0,2) == "M2") EE_comm[k] = ""
				else EE_comm[k] = XMLEEList.getElementsByTagName("COMMENTO")[i].childNodes[0].nodeValue;

				if (XMLEEList.getElementsByTagName("NOTESITO").length != 0) {
					EE_locNote[k] = XMLEEList.getElementsByTagName("NOTESITO")[i].childNodes[0].nodeValue;
					if (EE_locNote[k] == '-') EE_locNote[k] = "";
				}

				EE_codeff[k] = XMLEEList.getElementsByTagName("CODICE_EFF")[i].childNodes[0].nodeValue;
				EE_Lat[k] = parseFloat(XMLEEList.getElementsByTagName("LAT_WGS84")[i].childNodes[0].nodeValue).toFixed(3);
				EE_Lon[k] = parseFloat(XMLEEList.getElementsByTagName("LON_WGS84")[i].childNodes[0].nodeValue).toFixed(3);

                k += 1
			} else k = k;
        }

	}
	parsePQData2();
}

function parsePQData2(XmlText){
	console.log("parsePQData2 : " + XmlText);
	//var boundsPQ = new google.maps.LatLngBounds();

	// =========================    READ EPICENTER DATA    ==============================================
	var Location = XMLLocList.getElementsByTagName("earthquakelocation")[0].childNodes[0].nodeValue;
	var Country = XMLLocList.getElementsByTagName("country")[0].childNodes[0].nodeValue;
	var Zone = XMLLocList.getElementsByTagName("cat")[0].childNodes[0].nodeValue;
	var Io = parseFloat(XMLLocList.getElementsByTagName("io")[0].childNodes[0].nodeValue);
	var Imax = parseFloat(XMLLocList.getElementsByTagName("imax")[0].childNodes[0].nodeValue);
	if (Imax == 9.1) Imax = 9;
	if (Imax == 8.2) Imax = 8;
	if (Imax == 8.1) Imax = 8;
	if (Imax == 6.1) Imax = 6;
	if (Imax == 6.6) Imax = 6.5;
	if (Imax == 4.6) Imax = 4.5;
	if (Imax == 5.1) Imax = 5;
	var Me = parseFloat(XMLLocList.getElementsByTagName("mm")[0].childNodes[0].nodeValue);

	//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
	var flagNP = XMLLocList.getElementsByTagName("npun")[0].childNodes.length;
	if (flagNP > 0) {
	var Npun = XMLLocList.getElementsByTagName("npun")[0].childNodes[0].nodeValue;
	} else {
		Npun = 0
	};
	Npun = parseInt(Npun)

	//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
	var flagET = XMLLocList.getElementsByTagName("epicenter_type")[0].childNodes.length;
	if (flagET > 0) {
		var EpicenterT = XMLLocList.getElementsByTagName("epicenter_type")[0].childNodes[0].nodeValue;
	} else {
		var EpicenterT = "Local effects"
	};

	if (XMLLocList.getElementsByTagName("rel")[0].length == 0) var Reliability = ""
	else if  (XMLLocList.getElementsByTagName("rel")[0].childNodes.length == 0) var Reliability = ""
	else var Reliability = XMLLocList.getElementsByTagName("rel")[0].childNodes[0].nodeValue;
	if (Reliability == "?") {Reliability="S"}

	if (XMLLocList.getElementsByTagName("level").length == 0) var EQlevel = ""
	else if  (XMLLocList.getElementsByTagName("level")[0].childNodes.length == 0) var EQlevel = ""
	else var EQlevel = XMLLocList.getElementsByTagName("level")[0].childNodes[0].nodeValue;

	if (XMLLocList.getElementsByTagName("new2018").length == 0) var new2018 = ""
	else if  (XMLLocList.getElementsByTagName("new2018")[0].childNodes.length == 0) var new2018 = ""
	else var new2018 = XMLLocList.getElementsByTagName("new2018")[0].childNodes[0].nodeValue;

	var Lat = parseFloat(XMLLocList.getElementsByTagName("lat")[0].childNodes[0].nodeValue).toFixed(3);;
	var Lon = parseFloat(XMLLocList.getElementsByTagName("lon")[0].childNodes[0].nodeValue).toFixed(3);;

	var DateLabel =  XMLLocList.getElementsByTagName("data_label")[0].childNodes[0].nodeValue;
	var TimeLabel =  XMLLocList.getElementsByTagName("time_label")[0].childNodes[0].nodeValue;
	var Year = parseInt(XMLLocList.getElementsByTagName("anno")[0].childNodes[0].nodeValue);

	var FlagFalse = XMLLocList.getElementsByTagName("flagfalseeq")[0].childNodes.length ? true : false;
	// var checkFlagComm = XMLLocList.getElementsByTagName("flagcomments")[0];
	var Flagcomments = XMLLocList.getElementsByTagName("flagcomments")[0].childNodes.length ? XMLLocList.getElementsByTagName("flagcomments")[0].childNodes[0].nodeValue : ''


	// ======================   set page title and NPERIOD table	====================================
	document.getElementById('title').innerHTML = 'CFTI5Med ' + DateLabel;

	// set epicenter date-location title (different size depending on length)
	var titlestring = DateLabel + ', ' + TimeLabel + ' ' +  Location + ' (' + Country + ')'
	if (titlestring.length > 48) document.getElementById('locationString').innerHTML = '<center><font size="2em">' + titlestring + '</a></font1></center>';
	else if (titlestring.length > 46 && titlestring.length < 49) document.getElementById('locationString').innerHTML = '<center><font size="3em">' + titlestring + '</a></font1></center>';
	else document.getElementById('locationString').innerHTML = '<center><font size="4em">' + titlestring + '</a></font1></center>';

	// ---- NPERIOD table -------------------------------------------------------
	// FIND ALL EQ OF SAME NPERIOD
	var ind = NperiodALLEQ.indexOf(nper);
	// var n2 = 0;
	var s = 0;
	var nterrPER = [];
	var datePER = [];
	var datelabelPER = [];
	var timePER = [];
	var latPER = [];
	var lonPER = [];
	var npunPER = [];
	var IoPER = [];
	var ImaxPER = [];
	var MePER = [];
	var EQlinkPER = [];
	var EtypePER = [];
	var RelPER = [];
	var QuakePagePER = [];
	// var EEepArea = ''
	var epAreaPER = [] //markersArray[ind]['Location'] //+ ' (' + markersArray[ind]['Country'] + ')'+ '<br

	if (NperiodALLEQ.indexOf(nper)!=-1){
		while (ind != -1){
			nterrPER[s] = NterrALLEQ[ind]
			latPER[s] = LatALLEQ[ind]
			lonPER[s] = LonALLEQ[ind]
			datePER[s] = parseInt(YearALLEQ[ind] + MonthALLEQ[ind] + DayALLEQ[ind])
			datelabelPER[s] = DateLabelALLEQ[ind]
			timePER[s] = TimeLabelALLEQ[ind]
			IoPER[s] = IoALLEQ[ind]
			ImaxPER[s] = ImaxALLEQ[ind]
			npunPER[s] = iNP_ALLEQ[ind]
			//QuakePagePER[s] = createQuakePageLink(window.location.href, NterrALLEQ[ind], 'quake')
			QuakePagePER[s] = createQuakePageLink(window.location.href, NterrALLEQ[ind], 'index')
			MePER[s] = MeALLEQ[ind]
			EtypePER[s] = EpicenterALLEQ[ind]

			if (EtypePER[s] == "Calculated epicentre") EtypePER[s] = "C"
			else if (EtypePER[s] == "Local effects") EtypePER[s] = "L"
			else if (EtypePER[s] == "Region, area") EtypePER[s] = "R"
			else if (EtypePER[s] == "Not parameterized") EtypePER[s] = "NP"
			else if (EtypePER[s] == "Hypothetical") EtypePER[s] = "H"
			epAreaPER[s] = LocationALLEQ[ind]
			RelPER[s] = RelALLEQ[ind]
			s++
			ind = NperiodALLEQ.indexOf(nper, ind+1)
		}

	}
	var tbodyEQINFO = document.getElementById('quake_data')

	for (var i=0; i<datePER.length; i++){
		var rowEQINFO = document.createElement("tr");
		rowEQINFO.setAttribute('id', 'EQinfo'+nterrPER[i])

		var cell1 = document.createElement("td");
		cell1.setAttribute('class', 'dateEQ');
		cell1.setAttribute('data-text', datePER[i]);
		if (nterrPER[i] != Nterr) cell1.innerHTML = '<a href="' + QuakePagePER[i]  + 'IT" target="_blank">' + datelabelPER[i] + '</a>';
		else cell1.innerHTML = datelabelPER[i] ;

		var cell2 = document.createElement("td");
		cell2.setAttribute('class', 'timeEQ');
		cell2.innerHTML = timePER[i];

		var cell3 = document.createElement("td");
		cell3.setAttribute('class', 'ioEQ');
		cell3.innerHTML = IoPER[i];

		var cell4 = document.createElement("td");
		cell4.setAttribute('class', 'imaxEQ');
		cell4.innerHTML = ImaxPER[i];

		var cell5 = document.createElement("td");
		cell5.setAttribute('class', 'sitesEQ');
		cell5.innerHTML = npunPER[i];

		var cell6 = document.createElement("td");
		cell6.setAttribute('class', 'meEQ');
		cell6.innerHTML = MePER[i];

		var cell7 = document.createElement("td");
		cell7.setAttribute('class', 'latEQ');
		cell7.innerHTML = latPER[i];

		var cell8 = document.createElement("td");
		cell8.setAttribute('class', 'lonEQ');
		cell8.innerHTML = lonPER[i];

		if (epAreaPER[i].length  > 14){
			var epAreaCut = '<abbr title= "'+ epAreaPER[i] + '">' + epAreaPER[i].substring(0, 14) + '...' + '</abbr>'
		} else epAreaCut = epAreaPER[i]
		var cell9 = document.createElement("td");
		cell9.setAttribute('class', 'areaEQ');
		cell9.innerHTML = epAreaCut;


		var cell10 = document.createElement("td");
		cell10.setAttribute('class', 'etypeEQ');
		cell10.innerHTML = EtypePER[i];

		var cell11 = document.createElement("td");
		cell11.setAttribute('class', 'relEQ');
		cell11.innerHTML = RelPER[i];

		rowEQINFO.appendChild(cell1);
		rowEQINFO.appendChild(cell2);
		rowEQINFO.appendChild(cell3);
		rowEQINFO.appendChild(cell4);
		rowEQINFO.appendChild(cell5);
		rowEQINFO.appendChild(cell6);
		rowEQINFO.appendChild(cell7);
		rowEQINFO.appendChild(cell8);
		rowEQINFO.appendChild(cell9);
		rowEQINFO.appendChild(cell10);
		rowEQINFO.appendChild(cell11);
		tbodyEQINFO.appendChild(rowEQINFO);
	}
	document.getElementById("quake_info").style.display = "initial";
	// Table sorting
    $(document).ready(function() {
        // call the tablesorter plugin
        $("#quake_info").tablesorter({
            //	sort on the first, second and third (order desc) column
            sortList: [[0,0],[0,1]]
        });
    });


	// set position and size of D0 div, depending on how big is the nperiod list table
	if (datePER.length>=3) {
		document.querySelector('#D0').style.marginTop = '192px';
		document.querySelector('#D0').style.height = '105px';
	} else if (datePER.length == 2) {
		document.querySelector('#D0').style.marginTop = '176px';
		document.querySelector('#D0').style.height = '126px';
	} else {
		document.querySelector('#D0').style.marginTop = '147px';
		document.querySelector('#D0').style.height = '140px';
	}
	var rowsEQINFO = document.getElementById('EQinfo'+Nterr);
	rowsEQINFO.style.backgroundColor = '#ffffaa';
	rowsEQINFO.style.color = 'initial';
	rowsEQINFO.scrollIntoView(false);


	// ------------------------    PARSE PQ DATA FROM XML   --------------------------------
	var locPQ = XMLLocList.documentElement.getElementsByTagName("Locality");

	var sISromPQ = [];
	var fISPQ = [];
	var locPQname = [];
	var D1comm = [];
	var D1commIT = [];
	var D1commEN = [];
	var D1commAbbr = [];
	var locPQprov = [];
	var nlocPQ = [];
	// var nlocPQ6 = [];
	var distance = [];
	var E1comm = [];
    var E1commIT = [];
	var E1commEN = [];
	var symbolEE = [];
	var symbolEEExport = [];

    // --- variables for markers (solo EE, se per intensità si usano i png)
    var scalePQ = 0.9;
	var strokePQ = 0.8;
	var EEcolor = '#30a559';
    var pathPQ = "M13,14H2c-0.5523,0-1-0.4477-1-1V2c0-0.5523,0.4477-1,1-1h11c0.5523,0,1,0.4477,1,1v11C14,13.5523,13.5523,14,13,14z";

	if(locPQ.length > 0){
		for (var i = 0; i < locPQ.length; i++){

			sISromPQ[i] = XMLLocList.getElementsByTagName("intpq")[i].childNodes[0].nodeValue;
            fISPQ[i] = parseFloat(XMLLocList.getElementsByTagName("intpqnum")[i].childNodes[0].nodeValue);
			if (sISromPQ[i] == 'EE') {
				fISPQ[i] = 1;
				sISromPQ[i] = ''
			}
			if (fISPQ[i] == 9.1) fISPQ[i] = 9;
			if (fISPQ[i] == 8.2) fISPQ[i] = 8;
			if (fISPQ[i] == 8.1) fISPQ[i] = 8;
			if (fISPQ[i] == 6.1) fISPQ[i] = 6;
			if (fISPQ[i] == 6.6) fISPQ[i] = 6.5;
			if (fISPQ[i] == 4.6) fISPQ[i] = 4.5;
			if (fISPQ[i] == 5.1) fISPQ[i] = 5;

			if (sISromPQ[i] == 'G') fISPQ[i] = 0.9;
			if (sISromPQ[i] == 'N') fISPQ[i] = 0.8;
			if (sISromPQ[i] == 'NF') fISPQ[i] = 0.7;
			if (sISromPQ[i] == 'NC') fISPQ[i] = 0.6;
			if (sISromPQ[i] == 'A') sISromPQ[i] = 'A(IX)';
            if (sISromPQ[i] == 'B') sISromPQ[i] = 'B(VIII)';
            if (sISromPQ[i] == 'C') sISromPQ[i] = 'C(VIII)';
            if (sISromPQ[i] == 'E') sISromPQ[i] = 'E(VI-VII)';
            if (sISromPQ[i] == 'D') sISromPQ[i] = 'D(VI)';
            if (sISromPQ[i] == 'S') sISromPQ[i] = 'S(V)';
            if (sISromPQ[i] == 'F') sISromPQ[i] = 'F(IV-V)';

			var locPQdesloc = XMLLocList.getElementsByTagName("desloc")[i].childNodes[0].nodeValue;

			// nome località originale (quello che aveva al momento del terremoto)
			nlocPQ[i] = XMLLocList.getElementsByTagName("nloc_cfti")[i].childNodes[0].nodeValue;
			var flagNote = XMLLocList.getElementsByTagName("notesito")[i].childNodes.length;
			if (flagNote > 0) {
				// var fullname = XMLLocList.getElementsByTagName("descloc_cfti")[i].childNodes[0].nodeValue;
				 noteLocPQ[i] =  XMLLocList.getElementsByTagName("notesito")[i].childNodes[0].nodeValue;
				 var noteexp = XMLLocList.getElementsByTagName("notesito")[i].childNodes[0].nodeValue;
			} else {
				 noteLocPQ[i] = ""
				 var noteexp = "-";
			};
			var flagProv = XMLLocList.getElementsByTagName("provlet")[i].childNodes.length;
			if (flagProv > 0) {
				var locPQprov = XMLLocList.getElementsByTagName("provlet")[i].childNodes[0].nodeValue;
			} else {
				var locPQprov = "";
			}
			var flagCountry = XMLLocList.getElementsByTagName("nazione")[i].childNodes.length;
			if (flagCountry > 0) {
				var locPQcountry = XMLLocList.getElementsByTagName("nazione")[i].childNodes[0].nodeValue;
			} else {
				var locPQcountry = "";
			}
			if (locPQprov != '') locPQname[i] =  locPQdesloc + " (" + locPQprov + ')'
			else locPQname[i] =  locPQdesloc + " (" + locPQcountry + ')'


			locPQlat[i] = parseFloat(XMLLocList.getElementsByTagName("lat_wgs84")[i].childNodes[0].nodeValue).toFixed(3);
			locPQlon[i] = parseFloat(XMLLocList.getElementsByTagName("lon_wgs84")[i].childNodes[0].nodeValue).toFixed(3);

			//D1comm[i] = XMLLocList.getElementsByTagName("COMM")[i].childNodes[0].nodeValue;
			 distance[i] = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(locPQlat[i], locPQlon[i]), new google.maps.LatLng(Lat, Lon)) / 1000).toFixed(1);


			if (Flagcomments == 4) {
				D1comm[i] = XMLLocList.getElementsByTagName("COMM")[i].childNodes[0].nodeValue;
				D1commAbbr[i] = D1comm[i];

			} else if (Flagcomments == 2) {
				D1comm[i] = '<span class="flag2descr">' + flag2descr[Langsel] + '</span>'
				D1commAbbr[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
			}
			else if (Flagcomments == 3) {
				D1comm[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
				D1commAbbr[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
			}
			else if (Flagcomments == 1 || Flagcomments == 5) {
				D1comm[i] = '<span class="flag1descr">' + flag1descr[Langsel] + '</span>'
				D1commAbbr[i] = '<span class="flag1descr">' + flag1descr[Langsel] + '</span>'
			}
			else {
				D1comm[i] = ''
				D1commAbbr[i] = "";
			}

            E1comm[i] = '';

			///TODO:DETAILQUAKES gestione locality nella pagina dettaglio singolo terremoto PQMarkers conterra tutte le variabili
			// // --------------------------   MARKERS   - .PNG
			// if (fISPQ[i] >= 11) {var icon = {url: "images/IS/11.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) {var icon = {url: "images/IS/10.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) {var icon = {url: "images/IS/9.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) {var icon = {url: "images/IS/8.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) {var icon = {url: "images/IS/7.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) {var icon = {url: "images/IS/6.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) {var icon = {url: "images/IS/5.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) {var icon = {url: "images/IS/4.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			// if (fISPQ[i] <= 3.9 ) {var icon = {url: "images/IS/3.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
			//
			// // plot PQ
			// var markerPQ = new google.maps.Marker({
			//     position: new google.maps.LatLng(locPQlat[i], locPQlon[i]),
			//     map: map,
			//     //title: Year[i] + ' ' + Month[i] + ' ' + Day[i],
			//     icon: icon
			// });

			var marker = new ol.Feature({
				id: i,
				geometry: new ol.geom.Point(new ol.proj.fromLonLat([locPQlon[i], locPQlat[i]])),//new ol.geom.Point(  [ locPQlon[i], locPQlat[i]  ] ),
				type: "locality",
				ExportKmlR: "",
				OnClickTextIT: "",
				url: ""
			});

			if (fISPQ[i] >= 11) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4.png', size: [13, 13], scale: 0.85})}));}
			if (fISPQ[i] <= 3.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3.png', size: [13, 13], scale: 0.85})}));}

            //boundsPQ.extend(markerPQ.getPosition());
            //PQMarkers.push(markerPQ);
			PQMarkers.push(marker);
        }
	}

	///TODO: VERIFICARE LE ALTRE CHIAMATE QUI:
	// ------- EE EFFECTS ----------------------------------------------
	if (Reliability != 'F'){
		///TODO: VERIFICARE ALTRE -- iconEEonly
		var iconEEonly = {
	        path: pathPQ,
	        strokeColor: '#30a559', //'#72b260',
	        fillOpacity: 0,
	        anchor: new google.maps.Point(PQanchor1 , PQanchor2),
	        strokeWeight: 2.5,
	        scale: scalePQ
	    }

		// check if EE for each locality, and add to arrays if not found among PQ localities
		var E1list = [];
		var EmoreIn = locPQ.length;
	    var nlocEEold;
	    var EEdone = [];

	    for (var k = 0; k < EE_nloc.length; k++){
	        var indEEmore = EEdone.indexOf(EE_nloc[k]); //check if nloc already done
	        if (indEEmore == -1) {

				if (EE_nterr[k].length == 5 && EE_nterr[k] == Nterr || EE_nterr[k].length != 5){
					var indEE = nlocPQ.indexOf(EE_nloc[k]);
					E1comm[indEE] = '';
					E1list[indEE] = '';
					E1listExport[indEE] = '';
					if (indEE != -1) {
						E1comm[indEE] = EE_comm[k];
						var indexesPQ = getAllIndexes(EE_nloc, EE_nloc[k]);

						// loop through all EE at that locality
						for (var indPQ = 0; indPQ < indexesPQ.length; indPQ++) {
							var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeff[indexesPQ[indPQ]])];
							if (E1listExport[indEE]==""){
							E1listExport[indEE] = class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexesPQ[indPQ]])];
							} else {
								E1listExport[indEE] = E1listExport[indEE] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexesPQ[indPQ]])];
							};
							E1list[indEE] = E1list[indEE] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeff[indexesPQ[indPQ]] + '.png" width= "18" vertical-align="30px"/></td><td><span class="' + EE_codeff[indexesPQ[indPQ]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
						}

						if (EE_nterr[k].length == 5) {
							symbolEE[indEE] = '<img src="images/EE/00_NT.png" width="15px">'
							symbolEEExport[indEE] = 'NT'
						} else {
							symbolEE[indEE] = '<img src="images/EE/00_NP.png" width="15px">'
							symbolEEExport[indEE] = 'NP'
						}

						///TODO:DETAILQUAKES aggiornamento punti per PQMarkers2
						// --------------------------   MARKERS   - .PNG
						// if (fISPQ[indEE] >= 11) {var iconEE = {url: "images/IS/11EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 10.9 && fISPQ[indEE] > 9.9) {var iconEE = {url: "images/IS/10EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 9.9 && fISPQ[indEE] > 8.9) {var iconEE = {url: "images/IS/9EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 8.9 && fISPQ[indEE] > 7.9) {var iconEE = {url: "images/IS/8EE.png", sanchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 7.9 && fISPQ[indEE] > 6.9) {var iconEE = {url: "images/IS/7EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 6.9 && fISPQ[indEE] > 5.9 ) {var iconEE = {url: "images/IS/6EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 5.9 && fISPQ[indEE] > 4.9) {var iconEE = {url: "images/IS/5EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 4.9 && fISPQ[indEE] > 3.9) {var iconEE = {url: "images/IS/4EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						// if (fISPQ[indEE] <= 3.9 ) {var iconEE = {url: "images/IS/3EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						//
						// // togli marker precedente (solo int, no EE) e plotta quello nuovo con EE
						// PQMarkers[indEE].setMap(null)
						// var markerEE = new google.maps.Marker({
						// 	position: new google.maps.LatLng(locPQlat[indEE], locPQlon[indEE]),
						// 	map: map,
						// 	icon: iconEE,
						// });
						// PQMarkers[indEE] = markerEE;
						var marker = new ol.Feature({
							id: indEE, //k,
							geometry: new ol.geom.Point(new ol.proj.fromLonLat([locPQlon[indEE], locPQlat[indEE]])), //new ol.geom.Point(  [locPQlon[indEE], locPQlat[indEE] ] ),
							type:"localityEE",
							ExportKmlR: "",
							OnClickTextIT: "",
							url: ""
						});

						if (fISPQ[indEE] >= 11) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 10.9 && fISPQ[indEE] > 9.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 9.9 && fISPQ[indEE] > 8.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 8.9 && fISPQ[indEE] > 7.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 7.9 && fISPQ[indEE] > 6.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 6.9 && fISPQ[indEE] > 5.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 5.9 && fISPQ[indEE] > 4.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 4.9 && fISPQ[indEE] > 3.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4EE.png', size: [13, 13], scale: 0.7})}));}
						if (fISPQ[indEE] <= 3.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3EE.png', size: [13, 13], scale: 0.7})}));}

						PQMarkers[indEE] = marker;

					}   //if (indEE != -1) {
					else {
					///TODO:DETAILQUAKES verificare questa sezione nel caso in cui si verifichi l'ELSE
						E1list[EmoreIn] = '';
						// ------- effetti ambientali non in PQ
						E1comm[EmoreIn] = EE_comm[k];
						locPQname[EmoreIn] = EE_loc[k];
						noteLocPQ[EmoreIn] = EE_locNote[k];
						sISromPQ[EmoreIn] = '';
						fISPQ[EmoreIn] = 1;
						D1comm[EmoreIn] = '';
						nlocPQ[EmoreIn] = EE_nloc[k];
						locPQlat[EmoreIn] = EE_Lat[k];
						locPQlon[EmoreIn] = EE_Lon[k];
						distance[EmoreIn] = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(EE_Lat[k], EE_Lon[k]), new google.maps.LatLng(Lat, Lon)) / 1000).toFixed(1);

						//Vecchia
						/*var markerEE = new google.maps.Marker({
							position: new google.maps.LatLng(EE_Lat[k], EE_Lon[k]),
							map: map,
							icon: iconEEonly,
						});*/

						//console.log("eeonly");

						//var eeloconly = `<svg viewBox="-10 -10 200 200" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M13,14H2c-0.5523,0-1-0.4477-1-1V2c0-0.5523,0.4477-1,1-1h11c0.5523,0,1,0.4477,1,1v11C14,13.5523,13.5523,14,13,14z"  stroke="#30a559" stroke-width="1.8" fill="#ffffff"  /></svg>`;
						var eeloconly= `<svg viewBox="0 0 15 15" height="33px" width="33px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M13,14H2c-0.5523,0-1-0.4477-1-1V2c0-0.5523,0.4477-1,1-1h11c0.5523,0,1,0.4477,1,1v11C14,13.5523,13.5523,14,13,14z"  stroke="#30a559" stroke-width="1.8" fill="#ffffff"  /></svg>`;
						var singleFeature = new ol.Feature({
							id: k,
							geometry: new ol.geom.Point(new ol.proj.fromLonLat([EE_Lon[k], EE_Lat[k]])),//new ol.geom.Point([ EE_Lon[k], EE_Lat[k]] ),
							type:"EEonly",
							ExportKmlR: "",
							OnClickTextIT: "",
							url: ""
						});

						var workingSvg = eeloconly;
						var stileIcone = new ol.style.Style({
							image: new ol.style.Icon({
								//opacity: 0.15, //parametro opacity
								src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
								scale: 0.35
							})
						});
						singleFeature.setStyle(stileIcone);
						PQMarkers[EmoreIn] = singleFeature;
						//PQMarkers[EmoreIn] = markerEE;
						//boundsPQ.extend(markerEE.getPosition());

						if (EE_nterr[k].length == 5) symbolEE[EmoreIn] = '<img src="images/EE/00_NT.png" width="15px">'
						else symbolEE[EmoreIn] = '<img src="images/EE/00_NP.png" width="15px">'

						// loop through all EE at that locality
						var indexes = getAllIndexes(EE_nloc, EE_nloc[k]);
						for (var ind = 0; ind < indexes.length; ind++) {
							var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeff[indexes[ind]])];
								if (E1listExport[EmoreIn]) {
									E1listExport[EmoreIn] = E1listExport[EmoreIn] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexes[ind]])];
								} else {
									E1listExport[EmoreIn] = class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexes[ind]])];
								};

								E1list[EmoreIn] = E1list[EmoreIn] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeff[indexes[ind]] + '.png" width= "18" vertical-align="-30px"/></td><td><span class="' + EE_codeff[indexes[ind]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
						}
						EmoreIn = EmoreIn + 1;
					}
					///TODO:DETAILQUAKES verificare come gestire questa variabile EEdone
					EEdone.push(EE_nloc[k]);
				}
	        }
	    }
	} //fine cliclo for


	//==================== 	deal with level of review
	if (EQlevel != ''){
		var levelIcon = '<img src="images/EQlevel_' + EQlevel + '.png" width= "30px" vertical-align="-10px"/>';

		// abbr text for level of review
		if (EQlevel == "S") var levelAbrr = '<span id="' + levelID[0] + '"></span>';
		else if (EQlevel == "I") var levelAbrr = '<span id="' + levelID[1] + '"></span>';
		else if (EQlevel == "A") var levelAbrr = '<span id="' + levelID[2] + '"></span>';

		document.getElementById("level").innerHTML = '<div class="COMMContainer">' + levelIcon +'<span class="tooltiptext_COMM">' + levelAbrr + '</span></div>' ;
	}


	//==================== 	deal with deaths
	var affstring = dead_affid[dead_nperiod.indexOf(nper)]

	if (dead_nperiod.indexOf(nper) != -1){

		// icons
		var deadIcon = '<img src="images/morti_' + dead_class[dead_nperiod.indexOf(nper)] + '.png" width= "50px" vertical-align="-30px"/>'
		var affidIcon = '<img src="images/morti_affid_' + affstring[0] + '.png" width= "15px" vertical-align="-30px"/>'

		// abbr text for deaths
		var legendDeath = '<br> <span id="' + deadlegend_ID +'">' + dead_legend_IT + '</span><img src="images/morti_1.png" width= "30px" vertical-align="-30px"/>' + '&nbsp<= 10 <br>' + '<img src="images/morti_2.png" width= "30px" vertical-align="-30px"/>' + '&nbsp11 - 100 <br>' + '<img src="images/morti_3.png" width= "30px" vertical-align="-30px"/>' + '&nbsp101-1000 <br>' + '<img src="images/morti_4.png" width= "30px" vertical-align="-30px"/>' + '&nbsp1001-10000 <br>' + '<img src="images/morti_5.png" width= "30px" vertical-align="-30px"/>' + '&nbsp> 10000' + '<br>' +
		'<img src="images/morti_affid_A.png" width= "10px" vertical-align="-30px"/>' + '<span id="' + deadaff_ID[0] + '"> &nbsp' + dead_affidtext_IT[0] +
		'</span><br><img src="images/morti_affid_B.png" width= "10px" vertical-align="-30px"/>' + '<span id="' + deadaff_ID[1] + '"> &nbsp' + dead_affidtext_IT[1] +
		'</span><br><img src="images/morti_affid_C.png" width= "10px" vertical-align="-30px"/>' + '<span id="' + deadaff_ID[2] + '"> &nbsp' + dead_affidtext_IT[2] + '</span>'

		// additional text for
		if(affstring.length == 1){
			var addstring = ""
		} else if(affstring.length > 1){
			if (affstring[1] == "D") var addstring = ""//"Somma morti e feriti."
			else if (affstring[1] == "E") var addstring = ""//"Numero massimo attestato."
			else if (affstring[1] == "F") var addstring = ""//"Tutti o in parte morti per concause (es: straripamento di fiume)."
			else if (affstring[1] == "+") {
				var addstring = '<span id="' + deadmore_ID[0] + '">' +dead_moretext_IT[0] + '</span>'
			}
			else if (affstring[1] == "-") var addstring = '<span id="' + deadmore_ID[1] + '">' +dead_moretext_IT[1] + '</span>'
		}

		var Abbr = '<b><font color="#1f708f"><span id="' + deadtext_ID +'">' + dead_text_IT + '</span></font></b>'  + dead_amount[dead_nperiod.indexOf(nper)] + '<br>' + legendDeath
		document.getElementById("morti").innerHTML = '<div class="COMMContainer">' + deadIcon + '&nbsp' + affidIcon +'<span class="tooltiptext_COMM">' + Abbr + '</span></div>'

	}

	//==================== 	deal with NEW2018
	if (new2018 != ''){
		if (new2018=="ristudiato") 	document.getElementById("NEW").innerHTML = 	'<div class="COMMContainer"><img src="images/REVicon.png" width= "35px" vertical-align="-10px"/><span class="tooltiptext_COMM"><span id="rev2018"></span></span></div>';
		else if (new2018=="variato") 	document.getElementById("NEW").innerHTML = 	'<div class="COMMContainer"><img src="images/VARicon.png" width= "35px" vertical-align="-10px"/><span class="tooltiptext_COMM"><span id="var2018"></span></span></div>';
		else if (new2018=="nuovo") 	document.getElementById("NEW").innerHTML = 	'<div class="COMMContainer"><img src="images/NEWicon.png" width= "35px" vertical-align="-10px"/><span class="tooltiptext_COMM"><span id="new2018"></span></span></div>';
		else document.getElementById("NEW").innerHTML = "";

	}



	// =================== CREATE LINKS TO ASMI AND DBMI: i starts from 1 because first line contains titles
	var flagCPTI = [];
	var flagCPTIrif = [];
	var flagASMI = [];
	var asmicode = [];
	var asmilist = [];

	for (var i = 1; i < ASMIlist.length; i++) {
		var line = ASMIlist[i].split(/\t/)
		flagASMI[i] = line[0];
		flagCPTI[i] = line[1]; // se è in CPTI15
		flagCPTIrif[i] = line[2]; // se è usato come riferimento da CPTI15
		asmicode[i] = line[3];
		asmilist[i] = line[4];

	}
    var flaglist = asmilist.indexOf(Nterr);
	if (flaglist > -1) {
		var ASMIlink = 'http://emidius.mi.ingv.it/ASMI/event/' + asmicode[flaglist];
		if (flagASMI[flaglist] == '@'){
			document.getElementById("ASMIlink").innerHTML = '<abbr id="asmi" title=""><a href="' + ASMIlink + '" target="_blank"><img src="images/ASMI.png" height="24px"></a></abbr>'
		} else document.getElementById("ASMIlink").innerHTML = '<abbr id="not_asmi" title=""><img src="images/ASMIgray.png" height="24px"></abbr>';
		// usato come riferimento da CPTI
		if (flagCPTIrif[flaglist] == '@' && new2018==""){
			var CPTIlink = 'http://emidius.mi.ingv.it/CPTI15-DBMI15/eq/' + asmicode[flaglist];
			document.getElementById("CPTIlink").innerHTML = '<abbr id="cpti" title=""><a href="' + CPTIlink + '" target="_blank"><img src="images/CPTI-DBMI.png" height="24px"></a></abbr>'
		} else if (new2018!=""){
			document.getElementById("CPTIlink").innerHTML = '<abbr id="cpti15earlier" title=""><img src="images/CPTI-DBMI_gray.png" height="24px"></abbr>'
		} else {
			if (Year >= 1000) {
				//  presente in CPTI ma CFTI non usato come riferimento
				if (flagCPTI[flaglist] == '@') document.getElementById("CPTIlink").innerHTML = '<abbr id="notrif_cpti" title=""><img src="images/CPTI-DBMI_gray.png" height="24px"></abbr>'
				// non presente in CPTI
				else document.getElementById("CPTIlink").innerHTML = '<abbr id="notpresent_cpti" title=""><img src="images/CPTI-DBMI_gray_line.png" height="24px"></abbr>'
			}
			// ante 1000
			else document.getElementById("CPTIlink").innerHTML = '<abbr id="not_cpti_ante1000" title=""><img src="images/CPTI-DBMI_gray_line.png" height="24px"></abbr>'
		}
	}


	// ================ PLOT EPICENTER


	///TODO:DETAILQUAKES trasformare in svg1
	/*var StarBIG = {path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z', fillColor: '#ffffff', fillOpacity: 0.6, anchor: new google.maps.Point(125,125), strokeWeight: 2, strokeColor:'#FF0000', scale: 0.15};
	epicenter = new google.maps.Marker({ //EPICLICK MOD: epicenter now is global variable
		position: new google.maps.LatLng(Lat, Lon),
		map: map,
		icon: StarBIG,
		clickable: true,  //EPICLICK MOD: clickable
		zIndex: google.maps.Marker.MAX_ZINDEX + 1,  // doesn't work
		title: 'lat: ' + Lat + ', lon: ' +Lon
	});
	// EPICLICK MOD: on click epicenter on bottom
	google.maps.event.addListener(epicenter, 'click', function() {
		epiZ = epicenter.zIndex;
		epicenter.setMap(null);
	    epicenter.zIndex = -100
		epicenter.setMap(map);
		// alert(epicenter.zIndex)
	});*/

	var stella = `<svg viewBox="0 0 250 250" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z" stroke="#FF0000" stroke-width="15" fill="#ffffff" /></svg>`;
	var compiled;

	var singleFeature = new ol.Feature({
		id: -1,
		geometry: new ol.geom.Point(new ol.proj.fromLonLat([Lon, Lat])),//new ol.geom.Point([ Lon, Lat ] ),
		type: "singleQuake",
		title: 'lat: ' + Lat + ', lon: ' +Lon,
		OnClickTextIT : ""
	});

	var workingSvg = stella;
	var stileIcone = new ol.style.Style({
		image: new ol.style.Icon({
			opacity: 0.75, //parametro opacity
			src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
			scale: 0.18 //parametro scale moltiplicato per ingrandire le stelle
		})
	});
	singleFeature.setStyle(stileIcone);
	/******TODO GESTIONE VISUALIZZAZIONE STELLE TERREMOTI CON OL*****/
	PQMarkers.push(singleFeature);

	///TODO:DETAILQUAKES dopo la gestione mappa serve fare lo zoom
/*	boundsPQ.extend(epicenter.getPosition());
	map.fitBounds(boundsPQ);*/
/*	if (PQMarkers.length < 2) {
		map.setZoom(8);
	}*/

	//===========================     VARIABLES FOR EXPORT

	var noteRelD = "";
	switch (Reliability) {
		case "F":
			noteRelD ="F (false earthquake)";
			break;
		case "D":
			noteRelD ="D (doubtful earthquake)";
			break;
		case "S":
			noteRelD ="S (epicentral parameters based on a single intensity datapoint)";
			break;
		case "E":
			noteRelD ="E (epicentral location from foreign catalogue)";
			break;
		case "N":
			noteRelD ="N (no macroseismic observations available)";
			break;
		default:
			noteRelD ="";
	}

	var LevelD = "";
	switch (EQlevel) {
		case "A":
			LevelD ="HIGH";
			break;
		case "I":
			LevelD ="MEDIUM";
			break;
		case "S":
			LevelD ="LOW";
			break;
	}

	filename = 'CFTI5_EQ_' + Nterr + '_' + DateLabel + '_' + TimeLabel + '_' +  Location + '_' + Country;
	ExportText =  'Date;Time;Io (Epicentral intensity - MCS scale);Imax (Maximum intensity - MCS scale);NMO (Number of Macroseismic Observations);Me (Equivalent magnitude based on macroseismic observations);Latitude;Longitude;Epicentral Area;Epicenter Type;Notes;Review Level'+ CarRet
	ExportText = ExportText + DateLabel + ';' + TimeLabel
	if (EpicenterT = "Calculated epicentre") EpicenterT = "Calculated" //va cambiato il valore per essere coerenti con la legenda online
	ExportText = ExportText + ';' + Io + ';' + Imax + ';' + Npun + ';' + Me + ';' + Lat + ';' + Lon + ';' +  Location + ' (' + Country + ')' + ';' + EpicenterT + ';' + noteRelD + ";" + LevelD + CarRet + CarRet;


	// ===========================     READ BIBLIOGRAPHY    ===================================================

	var valbib = [];
    var valbibcode = [];

	var biblio = XMLLocList.documentElement.getElementsByTagName("Bibliography");

	if(biblio.length > 0){
		for (var i = 0; i < biblio.length; i++){
			valbib[i] = biblio[i].getElementsByTagName("desvalingl")[0].childNodes[0].nodeValue;
            valbibcode[i] = biblio[i].getElementsByTagName("valb")[0].childNodes[0].nodeValue;
		}
	}

	var biblioList = readBiblio(XMLLocList, "Bibliography");
	var codbib = biblioList[0]
	var titolobib = biblioList[1]
	var annobib = biblioList[2]
	var placebib = biblioList[3]
	var authorbib = biblioList[4]

	var flagE1 = 0;

	// =========================      CREATE PQ TABLE  AND D1 - E1 TABLES   =========================
	// Le D1 e E1 tables, messe dentro tab della finestra con tutti i commenti, sono solo per la versione italiana. Troppo complicato farlo in doppia lingua!!!! dovrei creare due tabelle diverse...
	// La tabella viene aggiunta con appenChild dentro language.js, solo per la versione italiana.

	if (Nterr.substring(0,2) == "M1"){
		document.getElementById('quakePQtable').innerHTML = '';
	} else if (Reliability == 'F') {
		document.getElementById('quakePQtable').innerHTML = '<p id="falseSentenceEQ"></p>';
	} else{
		ExportText = ExportText + 'Is (MCS intensity of the given earthquake at the locality);Is R. (MCS intensity of the given earthquake at the locality - Roman Numerals);Effects on natural Environment;Locality;Latitude;Longitude;Distance from epicenter (km)';
		ExportKml = '';
		ExportKmlR = '';

		// --------    if flagcomments = 4, create table D1
		if (Flagcomments == 4) {

			tableD1.setAttribute('id', 'D1table');
	    	tableD1.style.width = '100%';
	    	var tbodyD1 = document.createElement('tbody');
			tbodyD1.style.verticalAlign = "top";
			var theadD1 = document.createElement('thead');
			var rowHeadD1 = document.createElement("tr");
			var head1 = document.createElement("th");
			head1.setAttribute('id', 'loc_D1table');
			var head2 = document.createElement("th");
			head2.setAttribute('id', 'int_D1table');
			var head3 = document.createElement("th");
			head3.setAttribute('id', 'D1_D1table');
			rowHeadD1.appendChild(head1)
			rowHeadD1.appendChild(head2)
			rowHeadD1.appendChild(head3)
			theadD1.appendChild(rowHeadD1)
			tableD1.appendChild(theadD1)
		}
		// --------    if flagcomments = 4 or 5, create table E1
		if (E1comm.join('')!='' && (Flagcomments == 4 || Flagcomments == 5) ) {
			tableE1.setAttribute('id', 'E1table');
	    	tableE1.style.width = '100%';
	    	var tbodyE1 = document.createElement('tbody');
			tbodyE1.style.verticalAlign = "top";
			var theadE1 = document.createElement('thead');
			var rowHeadE1 = document.createElement("tr");
			var head1 = document.createElement("th");
			head1.setAttribute('id', 'loc_E1table');
			var head2 = document.createElement("th");
			head2.setAttribute('id', 'dot_E1table');
			var head3 = document.createElement("th");
			head3.setAttribute('id', 'E1_E1table');
			rowHeadE1.appendChild(head1)
			rowHeadE1.appendChild(head2)
			rowHeadE1.appendChild(head3)
			theadE1.appendChild(rowHeadE1)
			tableE1.appendChild(theadE1)
		}


		// --------    table body
		for (var i = 0; i < locPQname.length; i++) {
			var LocalityPage = createLocalityPageLink(window.location.href, nlocPQ[i], 'quake')

			// -----------  FIX COMMENTS REFERENCES and fill tables with D1 and E1 for 'Comm.' window
	        if (E1comm[i]!= ''){
				flagE1 = 1;
				// -----------  fix comment references
				E1commIT[i] = createREF(E1comm[i], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
				E1commEN[i] = createREF_EN(E1comm[i], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);

				// ----- fill tables with D1 and E1 for 'Comm.' window
				if (Flagcomments == 4 || Flagcomments == 5) {
					var rowE1 = document.createElement("tr");
					var cell1 = document.createElement("td");
					cell1.setAttribute('class', 'locNameE1table');

					cell1.innerHTML = '<br><b><a href="' + LocalityPage + Langsel + '" target="_blank">' +  locPQname[i] + '<b>';

					var cell2 = document.createElement('td');
					cell2.setAttribute('class', 'E1dotE1table');
					cell2.innerHTML = '<br>' + symbolEE[i];

					var cell3 = document.createElement("td");
					cell3.setAttribute('class', 'E1textE1table');
					cell3.innerHTML = '<br><table>' + E1list[i] + '</table><br><br>' + E1commIT[i] + '<br><br>';

					rowE1.appendChild(cell1)
					rowE1.appendChild(cell2)
					rowE1.appendChild(cell3)
					tbodyE1.appendChild(rowE1);
					tableE1.appendChild(tbodyE1)
					// document.getElementById("E1_data").style.display = "initial";
				}
	        }
			if (D1comm[i]!= ''){
				D1commIT[i] = createREF(D1comm[i], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
				D1commEN[i] = createREF_EN(D1comm[i], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);

				if (Flagcomments == 4) {
					var rowD1 = document.createElement("tr");
					var cell1 = document.createElement("td");
					cell1.setAttribute('class', 'locNameD1table');

					cell1.innerHTML = '<br><b><a href="' + LocalityPage + Langsel + '" target="_blank">' +  locPQname[i] + '<b>';

					var cell2 = document.createElement('td');
					cell2.setAttribute('class', 'locIntD1table');
					cell2.innerHTML = '<br>' + sISromPQ[i];

					var cell3 = document.createElement("td");
					cell3.setAttribute('class', 'D1textD1table');
					cell3.innerHTML = '<br>' + D1commIT[i] + '<br>';

					rowD1.appendChild(cell1)
					rowD1.appendChild(cell2)
					rowD1.appendChild(cell3)
					tbodyD1.appendChild(rowD1);
					tableD1.appendChild(tbodyD1)
				}
	        }


			var tbody2 = document.getElementById('PQ_data');
			var row2 = document.createElement("tr");
			row2.setAttribute('id', nlocPQ[i]);

			var cell1 = document.createElement("td");
			cell1.setAttribute('class', 'int');
			cell1.setAttribute('data-text', fISPQ[i]);

			if (sISromPQ[i] == '') cell1.innerHTML = ''
			else if (D1comm[i]!='' && Flagcomments == 4){
				var textcomm = removeDollars(D1commAbbr[i]);
				if (textcomm.length > 1200) {
					textcomm = textcomm.slice(0,1200) + " [...]";
				}
				 cell1.innerHTML =  '<div class="IntContainer"><a onclick=onclickList('+i+') href="#">' + sISromPQ[i] + '</a><span class="tooltiptext">' + textcomm + '</span></div>';

			} else cell1.innerHTML =  '<a onclick=onclickList('+i+') href="#">' + sISromPQ[i] + '</a>';


			var cell2 = document.createElement('td');
			cell2.setAttribute('class', 'natEQ');
			if (E1list[i]) {
				cell2.innerHTML = '<div class="EEContainer"><a onclick=onclickList('+i+') href="#"> ' + symbolEE[i] + '</a><span class="tooltiptext_EE"><table>' + E1list[i] + '</table></span></div>'

				if (symbolEEExport[i]=='NT') {
					var EEflagExport = E1listExport[i] + ' [Effect(s) associated with single earthquake]';
				} else{
					var EEflagExport = E1listExport[i] + ' [Effect(s) associated with entire earthquake sequence]';
				}
			} else { cell2.innerHTML = '';
				var EEflagExport = '-';
			};

			var cell3 = document.createElement("td");
			cell3.setAttribute('class', 'locality');
			cell3.innerHTML = locPQname[i]

			var cell4 = document.createElement("td");
			cell4.setAttribute('class', 'lat');
			cell4.innerHTML = locPQlat[i];

			var cell5 = document.createElement("td");
			cell5.setAttribute('class', 'lon');
			cell5.innerHTML = locPQlon[i];

			var cell6 = document.createElement("td");
			cell6.setAttribute('class', 'dist');
			cell6.innerHTML = distance[i];

			row2.appendChild(cell1);
			row2.appendChild(cell2);
			row2.appendChild(cell3);
			row2.appendChild(cell4);
			row2.appendChild(cell5);
			row2.appendChild(cell6);
			tbody2.appendChild(row2);


			// EXPORT

			var intN;
			if (fISPQ[i] < 1.5) {
				intN = 0;
			} else {
				intN = fISPQ[i];
			}

			var intR;
			switch (sISromPQ[i]) {
				case "S(V)":
					intR ="S(V) (strongly felt, but lacking evidence to support or deny the occurrence of damage)";
					break;
				case "F(IV-V)":
					intR ="F(IV-V) (felt)";
					break;
				case "NF":
					intR ="NF (not felt)";
					break;
				case "N":
					intR ="N (no evidence found in contemporary sources)";
					break;
				case "NC":
					intR ="NC (unrated)";
					break;
				case "G":
					intR ="G (generic indication of damage at a specific site)";
					break;
				case "A(IX)":
					intR ="A(IX) (collapse or extensive damage to the load bearing walls on a single building)";
					break;
				case "B(VIII)":
					intR ="B(VIII) (collapse of the top portion - lantern, dome, gable, etc. - on a single building)";
					break;
				case "C(VIII)":
					intR ="C(VIII) (partial collapse of the roof, vaults, apsidal vault, etc. on a single building)";
					break;
				case "D(VI)":
					intR ="D(VI) (falling eaves, cracking of the external walls on a single building)";
					break;
				case "E(VI-VII)":
					intR ="E(VI-VII) (report of generic damage on a single building)";
					break;
				default:
					intR = sISromPQ[i];
			}

			// --------------------------   MARKERS KML
			if (EEflagExport=='-') {
				if (intN >= 11) {IsIcon = "I_11"}
				if (intN <= 10.9 && intN > 9.9) {IsIcon = "I_10"}
				if (intN <= 9.9 && intN > 8.9) {IsIcon = "I_9"}
				if (intN <= 8.9 && intN > 7.9) {IsIcon = "I_8"}
				if (intN <= 7.9 && intN > 6.9) {IsIcon = "I_7"}
				if (intN <= 6.9 && intN > 5.9 ) {IsIcon = "I_6"}
				if (intN <= 5.9 && intN > 4.9) {IsIcon = "I_5"}
				if (intN <= 4.9 && intN > 3.9) {IsIcon = "I_4"}
				if (intN <= 3.9 ) {IsIcon = "I_3"}
			} else if (EEflagExport != '-' && intN>0) {
				if (intN >= 11) {IsIcon = "I_11EE"}
				if (intN <= 10.9 && intN > 9.9) {IsIcon = "I_10EE"}
				if (intN <= 9.9 && intN > 8.9) {IsIcon = "I_9EE"}
				if (intN <= 8.9 && intN > 7.9) {IsIcon = "I_8EE"}
				if (intN <= 7.9 && intN > 6.9) {IsIcon = "I_7EE"}
				if (intN <= 6.9 && intN > 5.9 ) {IsIcon = "I_6EE"}
				if (intN <= 5.9 && intN > 4.9) {IsIcon = "I_5EE"}
				if (intN <= 4.9 && intN > 3.9) {IsIcon = "I_4EE"}
				if (intN <= 3.9 ) {IsIcon = "I_3EE"}
			} else {
				IsIcon = "I_EE"
			}

			//Export variableTXT
			ExportText = ExportText + CarRet + intN + ';' + intR + ';' + EEflagExport + ';' + locPQname[i] + ';' + locPQlat[i] + ';' + locPQlon[i] + ';' + distance[i];

			//Export variableKML
			ExportKmlR = ExportKmlR + "<Placemark> <name>" + locPQname[i] + " - " + intR +  " </name>" + CarRet + "<description><![CDATA["
			ExportKmlR = ExportKmlR + "<b>" +  locPQname[i] + "</b><br><br>Latitude: <b>" + locPQlat[i] + "</b> <br>Longitude: <b>" + locPQlon[i] + "</b> <br><br>MCS Intensity reported: <b>" + intR + "</b> <br>Effects on natural Environment: <b>" + EEflagExport + "</b><br>Distance from epicenter (km): <b>" + distance[i] + "</b><br><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/locality.php?" + nlocPQ[i] + "EN" + virg + ">Locality page </a></b>"
			ExportKmlR = ExportKmlR + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + locPQlon[i] + "</longitude>" + CarRet + "<latitude>" + locPQlat[i] + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#" + IsIcon + "</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ locPQlon[i] + ","+ locPQlat[i] + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>"

		};

		document.getElementById("PQ_info").style.display = "initial";
		// PQ Table sorting
		$(document).ready(function() {
			// call the tablesorter plugin
			$("#PQ_info").tablesorter({
				//	sort on the first, second and third (order desc) column
				sortList: [[0,1],[2,0],[3,0]]
			});
		});

		// D1 Table sorting
		$(document).ready(function() {
			// call the tablesorter plugin
			$("#D1table").tablesorter({
				//	sort on the first, second and third (order desc) column
				sortList: [[0,0]]
			});
		});

		// E1 Table sorting
		$(document).ready(function() {
			// call the tablesorter plugin
			$("#E1table").tablesorter({
				//	sort on the first, second and third (order desc) column
				sortList: [[0,0]]
			});
		});
	}


	//Export variableKML
	ExportKml = "";
		jQuery.get('KML/quake_a.txt', function(data){
			ExportKml = data;
			ExportKml = ExportKml + "<Folder>"+ CarRet + "<name>CFTI5Med - EQ " + DateLabel + '_' + TimeLabel + '_' +  Location + '_' + Country + "</name>"+ CarRet ;
			ExportKml = ExportKml + "<open>1</open>"+ CarRet;
			ExportKml = ExportKml + "<description>"+ CarRet;
			ExportKml = ExportKml + "<![CDATA[<body><a href="+virg+"http://storing.ingv.it/cfti/cfti5/"+virg+"> <img src="+virg+"http://storing.ingv.it/cfti/cfti5/images/banner_CFTI_newG_thin_EN"+virg+" alt="+virg+"Logo CFTI5Med"+virg+" height="+virg+"32px"+virg+"></a></body>]]>"+ CarRet;
			ExportKml = ExportKml + "</description>"+ CarRet;
			ExportKml = ExportKml + "</Folder>" + CarRet;
			ExportKml = ExportKml + "<Folder><name>Epicenter</name>" + CarRet;
			ExportKml = ExportKml + "<Placemark> <name>" + DateLabel + '_' + TimeLabel + '_' +  Location + ' (' + Country +  ") </name>" + CarRet + "<description><![CDATA["
			ExportKml = ExportKml + "<br><br> Date: <b>" + DateLabel + "</b><br> Time: <b>" + TimeLabel + "</b><br>Io (Epicentral intensity - MCS scale): <b>" + Io + "</b><br>Imax (Maximum intensity - MCS scale): <b>" + Imax + "</b><br>NMO (Number of Macroseismic Observations): <b>" + Npun + "</b><br>Me (Equivalent magnitude): <b>" + Me + "</b><br>Latitude: <b>" + Lat + "</b><br>Longitude: <b>" + Lon + "</b><br>Epicentral Area: <b>" + Location + '_' + Country + "</b><br>Epicenter Type: <b>" +  EpicenterT  + "</b><br>Notes: <b>" + noteRelD + "</b><br>Review Level: <b>" + LevelD + "</b></a>"+ CarRet;
			ExportKml = ExportKml + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + Lon + "</longitude>" + CarRet + "<latitude>" + Lat + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#EPI</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ Lon + ","+ Lat + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>" + CarRet + "</Folder>"  + CarRet

			ExportKml = ExportKml + "<Folder><name>Macroseismic Observations</name>";

			ExportKml = ExportKml + ExportKmlR;

			jQuery.get('KML/quake_b.txt', function(dataB){
				ExportKml = ExportKml + dataB;
		})
	})

	$('#loading').hide();


	// ===========================     READ COMMENTS    ===================================================
	var A0text = '';
	var A1text = '';
	var B0text = '';
	var B1text = '';
	var C0text = '';
	var C1text = '';
	var CAtext = '';
	var C2text = '';
	var C3text = '';
	var C4text = '';
	var C5text = '';
	var C6text = '';
	var C7text = '';
	var C8text = '';
	var C9text = '';
	var D0text = '';
	var E0text = '';
	var F0text = '';
	var F1text = '';

    // define idnames for css
    var idname = ['EQparam', 'EQsequence', 'EQreview', 'EQresilience', 'EQscience', 'EQeffectsAnt', 'EQeffectsEnv', 'embed' ];
    var idnameT = ['EQparamT', 'EQsequenceT', 'EQreviewT', 'EQresilienceT', 'EQscienceT', 'EQeffectsTAnt', 'EQeffectsTEnv', 'embedT'];

    var comm = XMLLocList.documentElement.getElementsByTagName("Comment");

	if(comm.length > 0){
		for (var i = 0; i < comm.length; i++){
			var codComm = comm[i].getElementsByTagName("codtab")[0].childNodes[0].nodeValue;
			if (codComm == 'A0') var A0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'A1') A1text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'B0') B0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'B1') B1text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C0') C0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'CA') CAtext = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C1') C1text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C2') C2text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C3') C3text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C4') C4text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C5') C5text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C6') C6text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C7') C7text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C8') C8text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'C9') C9text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'D0') D0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			//else if (codComm == 'D1') D1comm = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'E0') E0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			//else if (codComm == 'E1') E1list = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'F0') F0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
			else if (codComm == 'F1') F1text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
		}
	}

	// il TAB PARAMETRI non voglio sia visualizzato, lo faccio artificiosamente vuoto così non viene visualizzato
	if (A0text != '') {
		var A0title = ''//'<span id="COMM_EQparams1">Parametri spazio-temporali</span>'
		A0textall = ''//'<br /><b>' + A0title +'</b><hr>' + A0text+ '<br />';
	} else {
		A0textall = '';
		var A0title = '';
	}
	if (A1text != '') {
		var A1title = ''//'<span id="COMM_EQparams2"> Parametri dei cataloghi a confronto </span>'
		A1textall = ''//'<br /><b>' + A1title + '</b><hr>' + A1text+ '<br />';
	} else {
		A1textall = '';
		var A1title = '';
	}


	if (F0text != ''){
		var F0title = '<span id="COMM_EQseq1">Sequenza delle maggiori scosse</span>'
		F0textall = '<br /><b>' + F0title + '</b><hr>' + F0text+ '<br />';
	} else {
		F0textall = '';
		var F0title = '';
	}

	if (F1text != '') {
		var F1title = '<span id="COMM_EQseq2">Cronologia completa della sequenza sismica</span>'
		F1textall = '<br /><b>' + F1title + '</b><hr>' + F1text+ '<br />';
	} else {
		F1textall = '';
		var F1title = '';
	}

	if (B0text != '') {
		var B0title = '<span id="COMM_EQrev1">Stato delle conoscenze</span>'
		B0textall = '<br /><b>' + B0title + '</b><hr>' + B0text+ '<br />';
	} else {
		B0textall = '';
		var B0title = '';
	}
	if (B1text != '') {
		var B1title = '<span id="COMM_EQrev2">Stato delle conoscenze analitico</span>'
		B1textall = '<br /><b>' + B1title + '</b><hr>' + B1text+ '<br />';
	} else {
		B1textall = '';
		var B1title = '';
	}

	if (C0text != '') {
		var C0title = '<span id="COMM_EQresil1">Effetti nel contesto antropico</span>'
		C0textall = '<br /><b>' + C0title + '</b><hr>' + C0text+ '<br />';
	} else {
		C0textall = '';
		var C0title = '';
	}
	if (C1text != '') {
		var C1title = '<span id="COMM_EQresil2">Elementi di demografia</span>'
		C1textall = '<br /><b>' + C1title + '</b><hr>' + C1text+ '<br />';
	} else {
		C1textall = '';
		var C1title = '';
	}
	if (C3text != '') {
		var C3title = '<span id="COMM_EQresil3">Elementi dell\'edilizia storica locale</span>'
		C3textall = '<br /><b>' + C3title + '</b><hr>' + C3text+ '<br />';
	} else {
		C3textall = '';
		var C3title = '';
	}
	if (C4text != '') {
		C4title = '<span id="COMM_EQresil4">Confini e afferenze amministrative</span>'
		C4textall = '<br /><b>' + C4title + '</b><hr>' + C4text + '<br />';
	} else {
		C4textall = '';
		var C4title = '';
	}
	if (C5text != '') {
		var C5title = '<span id="COMM_EQresil5">Effetti sociali ed economici indotti</span>'
		C5textall = '<br /><b>' + C5title + '</b><hr>' + C5text+ '<br />';
	} else {
		C5textall = '';
		var C5title = '';
	}
	if (C6text != '') {
		var C6title = '<span id="COMM_EQresil6">Risposte istituzionali/amministrative</span>'
		C6textall = '<br /><b>' + C6title + '</b><hr>' + C6text+ '<br />';
	} else {
		C6textall = '';
		var C6title = '';
	}
	if (C7text != '') {
		var C7title = '<span id="COMM_EQresil7">Ricostruzioni, spostamenti di sito</span>'
		C7textall = '<br /><b>' + C7title + '</b><hr>' + C7text+ '<br />';
	} else {
		C7textall = '';
		var C7title = '';
	}

	if (C8text != '') {
		var C8title = '<span id="COMM_EQscience1">Documentazione tecnico-scientifica</span>'
		C8textall = '<br /><b>' + C8title + '</b><hr>' + C8text+ '<br />';
	} else {
		C8textall = '';
		var C8title = '';
	}
	if (C9text != '') {
		var C9title = '<span id="COMM_EQscience2">Teorie e interpretazioni</span>'
		C9textall = '<br /><b>' + C9title + '</b><hr>' + C9text+ '<br />';
	} else {
		C9textall = '';
		var C9title = '';
	}

	if (D0text != '') {
		var D0title = '<span id="COMM_EQeffant1">Maggiori effetti</span>'
		D0textall = '<br /><b>' + D0title + '</b><hr>' + D0text+ '<br />';
	} else {
		D0textall = '';
		var D0title = '';
	}
	if (C2text != '') {
		var C2title = '<span id="COMM_EQeffant2">Eventi distruttivi naturali o umani contestuali</span>'
		C2textall = '<br /><b>' + C2title + '</b><hr>' + C2text+ '<br />';
	} else {
		C2textall = '';
		var C2title = '';
	}

	if (E0text != '') {
		var E0title = '<span id="COMM_EQeffnat1">Effetti sull\'ambiente naturale</span>'
		E0textall = '<br /><b>' + E0title + '</b><hr>' + E0text+ '<br />';
	} else {
		E0textall = '';
		var E0title = '';
	}
	if (CAtext != '') {
		var CAtitle = '<span id="COMM_EQeffnat2">Fenomeni naturali correlati</span>'
		CAtextall = '<br /><b>' + CAtitle + '</b><hr>' + CAtext+ '<br />';
	} else {
		CAtextall = '';
		var CAtitle = '';
	}

	// organize comments in different tabs and store in array
	var textcommTOT = [];
	textcommTOT[0] = A0textall + A1textall;
	textcommTOT[1] = F0textall + F1textall;
	textcommTOT[2] = B0textall + B1textall;
	textcommTOT[3] = C1textall + C3textall + C4textall + C5textall + C6textall + C7textall;
	textcommTOT[4] = C9textall + C8textall;
	textcommTOT[5] = D0textall + C2textall;
	textcommTOT[6] = E0textall + CAtextall;

	var titlecommTOT = [];
	titlecommTOT[0] = A0title + '<br />' + A1title;
	titlecommTOT[1] = F0title + '<br />' + F1title;
	titlecommTOT[2] = B0title + '<br />' + B1title;
	titlecommTOT[3] = C1title + '<br />' + C3title + '<br />' + C4title + '<br />' + C5title + '<br />' + C6title + '<br />' + C7title;
	titlecommTOT[4] = C9title + '<br />' + C8title;
	titlecommTOT[5] = D0title + '<br />' + C2title;
	titlecommTOT[6] = E0title + '<br />' + CAtitle;

	//=======================   CASE 1: commenti visibili   =========================================
	if (Flagcomments == 4) {

		// no TAB per PDFEMBED
		textcommTOT[7] = ''
		titlecommTOT[7] = ''

		D0textIT = createREF(D0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
		D0textEN = createREF_EN(D0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
		B0textIT = createREF(B0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
		B0textEN = createREF_EN(B0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);

		if (Reliability!='F') {
			document.getElementById('D0').innerHTML = '<abbr id="D0abbr" title=""><span id="D0text"></span></abbr>';
		}
		// per terremoti falsi usa B0
		else {
			document.getElementById('D0').innerHTML = '<abbr id="B0abbr" title=""><span id="D0text"></span></abbr>';
		}



	//=======================   CASE 2: flag comm. 1 o 5: italiani nei MED, senza (flag 1) o con (flag 5) D0 visibile ======================================
	// Viene mostrata BILIOGRAFIA E PDF MED EMBED (frase flag1 nei D0flag1, commentoD0 nei D0flag5, D1 con frasi flag1 e flag5)
	// Teoricamente il flag 1 non esiste più (ovvero tutti hanno D0)
     } else if (Flagcomments == 1 || Flagcomments == 5) {

		 // sì TAB per PDFEMBED
		 textcommTOT[7] = ' '
 		titlecommTOT[7] = ' '

		if (Flagcomments == 1) document.getElementById('D0').innerHTML = '<span class="flag1descr">' + flag1descr[Langsel] + ' (Comm.)</span>';
		else {
			for (var i = 0; i < comm.length; i++){
			   var codComm = comm[i].getElementsByTagName("codtab")[0].childNodes[0].nodeValue;
			   if (codComm == 'D0') var D0text = comm[i].getElementsByTagName("testocomm")[0].childNodes[0].nodeValue;
		   }
		   D0textIT = createREF(D0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
		   D0textEN = createREF_EN(D0text, nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
		   document.getElementById('D0').innerHTML = '<abbr id="D0abbr" title=""><span id="D0text"></span><br><br><span class="flag1descr">' + flag1descr[Langsel] + ' (Comm.)</span></abbr>';
		}


	 //=======================   CASE 3: flag comm. 2 o 3: italiani senza commenti visibili ======================================
	 // Viene mostrata solo BILIOGRAFIA (frasi nei D0 e D1 per flag2 e flag3)
     } else if (Flagcomments == 2 || Flagcomments == 3) {

		 // no TAB per PDFEMBED
		 textcommTOT[7] = ''
 		titlecommTOT[7] = ''

		// remove title of comments window, since there are no comments
		document.getElementById("titleCommWin").innerHTML = "";

		if (Flagcomments == 2) document.getElementById('D0').innerHTML = '<span class="flag2descr">' + flag2descr[Langsel] + '</span>';
		else document.getElementById('D0').innerHTML = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>';
		// document.getElementById("openCOMM").style.display = "none";


	//=======================   CASE 4: terremoti MEDITERRANEI ======================================
	// Viene mostrato solo PDF MED EMBED (frasi nei D0 per flagMED1 e flagMed2)
	} else if (Nterr.substring(0,2) == "M1" || Nterr.substring(0,2) == "M2"){
		if (Nterr.substring(0,2) == "M1") document.getElementById('D0').innerHTML = '<span class="flagMED1descr">' + flagMED1descr[Langsel] + ' (Comm.)</span>';
		else if (Nterr.substring(0,2) == "M2") document.getElementById('D0').innerHTML = '<span class="flagMED2descr">' + flagMED2descr[Langsel]  + ' (Comm.)</span>';

		// sì TAB per PDFEMBED
		textcommTOT[7] = ' '
		titlecommTOT[7] = ' '

	   // TOGLI DIV LAYER e SISM.STRUM. DALLA MAPPA (PER I MEDITERRANEI NON DEVE VEDERSI)
	   document.getElementById("WMSlayersIcon").style.display = "none";
	   document.getElementById("STRUMeqIcon").style.display = "none";
	}


	// CREATE TABS and FILL COMMENT DIVS
	var tab = [];
	var tabdiv = document.getElementById("tabs");
	for (var nt = 0; nt < textcommTOT.length; nt++) {
		if (textcommTOT[nt] != '') {
			// add references
			textcommTOT_IT[nt] = createREF(textcommTOT[nt], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
			textcommTOT_EN[nt] = createREF_EN(textcommTOT[nt], nper, codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);

			// create tabs
			var tab = document.createElement("button");
			tab.setAttribute('class', 'tablinks');
			tab.setAttribute('id', idnameT[nt]);
			tabdiv.appendChild(tab);
			// add content to tabcontent
			document.getElementById(idname[nt]).innerHTML = textcommTOT[nt];
			createListener(idname[nt], idnameT[nt]);
		}
	}

	// ------   ADD D1 AND E1 TABLES created before (with PQ table) --- SPOSTATO DENTRO KANGUAGE PER POTER FARE TRADUIONE GOOGLE, ANCHE SE QUESTE TABELLE VENGONO MESSE SOLO NELLA VERSIONE ITALIANA
	// if (Flagcomments==4 && Reliability != 'F') {
	// 	document.getElementById("EQeffectsAnt").innerHTML = textcommTOT[5] + '<br><br><br><b><span id="D1table_title"></span></b><hr><br>';
	// 	document.getElementById("EQeffectsAnt").appendChild(tableD1);
	// }
	// if (flagE1 == 1){
	// 	document.getElementById("EQeffectsEnv").innerHTML = textcommTOT[6] + '<br><br><br><b><span id="E1table_title"></span></b><hr><br>';
	// 	document.getElementById("EQeffectsEnv").appendChild(tableE1);
	// }

	// PDF MED EMBED
	if (Flagcomments != 2 && Flagcomments != 3 && Flagcomments != 4) {
		if (Year >= 1000) {
 		   var namePDFmedembed = "./pdf_med/" + nper + "-" + "091411_EMB.pdf"
 		   document.getElementById("embedT").innerHTML = "Guidoboni & Comastri, 2005"
 	   } else {
 		   var namePDFmedembed = "./pdf_med/" + nper + "-" + "093201_EMB.pdf"
 		   document.getElementById("embedT").innerHTML = "Guidoboni et al., 1994"
 	   }
 	   PDFObject.embed(namePDFmedembed, "#embed", {width: "100%"})
   }



	// ADD BIBLIOGRAPHY TAB (NON PER I MED)
	if (Nterr.substring(0,2) != "M1" && Nterr.substring(0,2) != "M2"){
		var tabB = document.createElement("button");
	   	 tabB.setAttribute('class', 'tablinks');
	   	 tabB.setAttribute('id', 'EQbiblioT');
	   	 tabB.innerHTML = 'Bibliografia';
	   	 tabdiv.appendChild(tabB)

	   	 createListener('EQbiblio', 'EQbiblioT');
	}



	//======================= BIBLIO TABLE

    // set abbr title for last 2 columns (link to pdfs) of biblio table:
    var abbr1 = document.getElementById("pdfT")
    abbr1.title = biblioEQ_pdfT_abbrIT;
    var abbr2 = document.getElementById("pdfR")
    abbr2.title = biblioEQ_pdfR_abbrIT;

	// --------    table body bibliography
	var tbodyB = document.getElementById("biblio_data");
	for (var i = 0; i < codbib.length; i++) {

		var rowB = document.createElement("tr");

		var cell1 = document.createElement("td");
		cell1.setAttribute('class', 'Bauth');
		cell1.innerHTML = authorbib[i];

		var cell2 = document.createElement('td');
		cell2.setAttribute('class', 'Btitle');
		cell2.innerHTML = titolobib[i];

		var cell3 = document.createElement("td");
        if (valbibcode[i] == 'F') sortBib = 1;
        if (valbibcode[i] == 'Fc') sortBib = 2;
        if (valbibcode[i] == 'Fi') sortBib = 3;
        if (valbibcode[i] == 'Fn') sortBib = 4;
        if (valbibcode[i] == 'Fa') sortBib = 5;
        if (valbibcode[i] == 'R') sortBib = 6;
        if (valbibcode[i] == 'Rf') sortBib = 7;
        if (valbibcode[i] == 'C') sortBib = 8;
        if (valbibcode[i] == 'Cf') sortBib = 9;
        if (valbibcode[i] == 'B') sortBib = 10;
        if (valbibcode[i] == 'St') sortBib = 11;
        if (valbibcode[i] == 'Bs') sortBib = 12;
        if (valbibcode[i] == 'Ig') sortBib = 13;
        cell3.setAttribute('data-text', sortBib);
		cell3.setAttribute('class', 'Btype');
		var classnameDescr = valbibcode[i] + "descr"
		var classnameText = valbibcode[i] + "text"
		cell3.innerHTML = '<abbr class="' + classnameText + '" title="" >' + '<span class="' + classnameDescr + '"></span></abbr>'

		var cell4 = document.createElement("td");
		cell4.setAttribute('class', 'Byear');
		cell4.innerHTML = annobib[i];

		var cell5 = document.createElement("td");
		cell5.setAttribute('class', 'Bplace');
		cell5.innerHTML = placebib[i];

		rowB.appendChild(cell1);
		rowB.appendChild(cell2);
		rowB.appendChild(cell3);
		rowB.appendChild(cell4);
		rowB.appendChild(cell5);

        var cell6 = document.createElement("td");
		var flagpdf = pdflist.indexOf(nper + '-' + codbib[i] + '_T.pdf');
        var valPDF;
		if (flagpdf > 0){
            valPDF = 1;
			cell6 = document.createElement("td");
			cell6.setAttribute('class', 'Bpdf');
			cell6.innerHTML = '<a href="pdf_T/' + nper + '-' + codbib[i] + '_T.pdf" target="_new2"><img src="images/pdf.png" width="25px"></a>';
		}
		else {
            cell6.innerHTML = ' ';
            valPDF = 0;
        }
        cell6.setAttribute('data-text', valPDF);
        rowB.appendChild(cell6);

        var cell7 = document.createElement("td");
        var flagpdf2 = pdflist2.indexOf(nper + '-' + codbib[i] + '_R.pdf');
        var valPDF;
		if (flagpdf2 > 0){
            valPDF = 1;
			cell7 = document.createElement("td");
			cell7.setAttribute('class', 'Bpdf2');
			cell7.innerHTML = '<a href="pdf_R/' + nper + '-' + codbib[i] + '_R.pdf" target="_new2"><img src="images/pdf.png" width="25px"></a>';
		}
		else {
            cell7.innerHTML = ' ';
            valPDF = 0;
        }
        cell7.setAttribute('data-text', valPDF);
        rowB.appendChild(cell7);

		tbodyB.appendChild(rowB);
		document.getElementById("biblio").style.display = "initial";

	};
    // Table sorting
    $(document).ready(function() {
        // call the tablesorter plugin
        $("#biblio").tablesorter({
            //	sort on the first, second and third (order desc) column
            sortList: [[0,0],[1,0]]
        });
    });


    // CREATE INFOWINDOWS
    for (var i = 0; i < locPQname.length; i++){
		var LocalityPage = createLocalityPageLink(window.location.href, nlocPQ[i], 'quake')

        // Information box that pops up on click (on marker or line of quakes table)
        var titlePQwinEN = '<div class="iw-title localityColor"><b>' + locPQname[i] + '</b>' + ' - MCS Intensity: '+ '<b>' + sISromPQ[i] +'</b><br /><i>' + noteLocPQ[i] + '</i></div>';

        var CommAntrEN = ['<br /><span style="text-transform: uppercase;">Effects on the built environment: </span><br />',
                        '<div class="LocComm">' + D1commEN[i],
                        '</div><br /><hr>'].join('\n')
        var CommEnvEN = ['<span style="text-transform: uppercase;">Effects on the natural environment: </span><br />',
                        '<div class="LocComm"><p align="left"><table>'+ E1list[i] + '</table></p><hr class="EEline">' + E1commEN[i] + '</div>',
                        '<br /><hr>'].join('\n')
        var LocLinkEN = '<a href="' + LocalityPage + 'EN" target="_blank"> Locality page </a> <br />';



		var titlePQwinIT = ['<div class="iw-title localityColor"><b>' + locPQname[i] + '</b>' + ' - Intensità MCS: '+ '<b>' + sISromPQ[i] +'</b><br /><i>' + noteLocPQ[i] + '</i></div>'];

        var CommAntrIT = ['<br /><span style="text-transform: uppercase;">Effetti sul contesto antropico: </span><br />',
                        '<div class="LocComm">' + D1commIT[i],
                        '</div><br /><hr>'].join('\n')
        var CommEnvIT = ['<span style="text-transform: uppercase;">Effetti sull\'ambiente naturale: </span><br />',
                        '<div class="LocComm"><p align="left"><table>' + E1list[i] + '</table></p><hr class="EEline">' + E1commIT[i] + '</div>',
                        '<br /><hr>'].join('\n')
        var LocLinkIT = '<a href="' + LocalityPage + 'IT" target="_blank"> Pagina della località </a> <br />';


		// Per EE mediterranei
		var ListEnvMedEN = ['<span style="text-transform: uppercase;">Effects on the natural environment: </span><br />',
		'<div class="LocComm"><p align="left"><table>' + E1list[i] + '</table></p>'].join('\n')

		var ListEnvMedIT = ['<span style="text-transform: uppercase;">Effetti sull\'ambiente naturale: </span><br />',
		'<div class="LocComm"><p align="left"><table>' + E1list[i] + '</table></p>'].join('\n')

		if (Nterr.substring(0,2) == "M2"){
			if (E1list[i] && sISromPQ[i]!=''){
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					titlePQwinEN, '</b></div>', '<br />', '<div class="commentsIW">', ListEnvMedEN,
					'</div></div>'].join('\n');
				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					titlePQwinIT, '</b></div>', '<br />', '<div class="commentsIW">', ListEnvMedIT, '</div></div>'].join('\n');
			} else if (E1list[i] && sISromPQ[i]==''){
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					'<div class="iw-title localityColor"><b>' + locPQname[i] + '</b>', '</b></div>', '<br />', '<div class="commentsIW">', ListEnvMedEN,
					'</div></div>'].join('\n');
				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					'<div class="iw-title localityColor"><b>' + locPQname[i] + '</b>', '</b></div>', '<br />', '<div class="commentsIW">', ListEnvMedIT, '</div></div>'].join('\n');
			} else {
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					titlePQwinEN,
					'</div>' ].join('\n');
				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					titlePQwinIT,
					'</div>'].join('\n');
			}

		} else {
			if (E1comm[i]!= '' && D1comm[i] != '') {
	            var OnClickTextEN = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                titlePQwinEN, '<div class="commentsIW">', CommAntrEN, CommEnvEN, LocLinkEN,
	                '</div></div>' ].join('\n');
	            var OnClickTextIT = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                titlePQwinIT, '<div class="commentsIW">', CommAntrIT, CommEnvIT, LocLinkIT,
	                '</div></div>'].join('\n');

	        } else if (D1comm[i]!= '' && E1comm[i]== '' ) {
	            var OnClickTextEN = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                titlePQwinEN, '<div class="commentsIW">', CommAntrEN, LocLinkEN,
	                '</div></div>'].join('\n');

	            var OnClickTextIT = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                titlePQwinIT, '<div class="commentsIW">', CommAntrIT, LocLinkIT,
	                '</div></div>'].join('\n');

	        } else if (D1comm[i]== '' && E1comm != '')  {
	            var OnClickTextEN = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                '<div class="iw-title localityColor"><b>' + locPQname[i] + '</b><br /><i>' + noteLocPQ[i] + '</i></div>', '<br />', '<div class="commentsIW">', CommEnvEN, LocLinkEN,
	                '</div></div>'
	            ].join('\n');

	            var OnClickTextIT = [
	                // '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
	                '<div class="iw-title localityColor"><b>' + locPQname[i] + '</b><br /><i>' + noteLocPQ[i] + '</i></div>', '<br />', '<div class="commentsIW">', CommEnvIT, LocLinkIT,
	                '</div></div>'
	            ].join('\n');
	        }
		}
	    openPopupPQ(PQMarkers[i], OnClickTextEN, OnClickTextIT, nlocPQ[i])
	    if (EEMarkers[i]) openPopupPQ(EEMarkers[i], OnClickTextEN, OnClickTextIT, nlocPQ[i])

    }
	// SELEZIONE LINGUA --> FATTA QUI; UNA VOLTA RIEMPITI TUTTI I DIV
	new LanguageTools().setLanguage(Langsel);
    console.log("ESECUZIONE parsePQData2 finita");
}


function createListener(name, idname){
	document.getElementById(idname).addEventListener('click', function(event){
		showComm(event, name);
	});
};



// ======================   SHOW COMMENTS IN DIFFERENT TABS
function showComm(evt, idname){

	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace("active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(idname).style.display = "block";
	evt.currentTarget.className += " active";

};

function openPopupPQ(marker, textEN, textIT, NlocI){

	marker.OnClickTextIT = "";

	// specify language of popup window
	if (Langsel == "EN") {
		textEN = textEN.split(biblioEQ_pdfT_abbrIT).join(biblioEQ_pdfT_abbrEN)
		textEN = textEN.split(biblioEQ_pdfR_abbrIT).join(biblioEQ_pdfR_abbrEN)
		textEN = textEN.split(flag1descr['IT']).join(flag1descr['EN'])
		textEN = textEN.split(flag2descr['IT']).join(flag2descr['EN'])
		textEN = textEN.split(flag3descr['IT']).join(flag3descr['EN'])
		textEN = textEN.split(flagMED1descr['IT']).join(flagMED1descr['EN'])
		textEN = textEN.split(flagMED2descr['IT']).join(flagMED2descr['EN'])
		for (var i=0; i<class_codeEE.length; i++){
			textEN = textEN.split(class_titleEE_IT[i]).join(class_titleEE_EN[i])
		}
		//Vecchia gestione google map non piu presente
		// infowindow.setContent(textEN);
		marker.OnClickTextIT = textEN;
	} else {
		textIT = textIT.split(biblioEQ_pdfT_abbrEN).join(biblioEQ_pdfT_abbrIT)
		textIT = textIT.split(biblioEQ_pdfR_abbrEN).join(biblioEQ_pdfR_abbrIT)
		textIT = textIT.split(flag1descr['EN']).join(flag1descr['IT'])
		textIT = textIT.split(flag2descr['EN']).join(flag2descr['IT'])
		textIT = textIT.split(flag3descr['EN']).join(flag3descr['IT'])
		textIT = textIT.split(flagMED1descr['EN']).join(flagMED1descr['IT'])
		textIT = textIT.split(flagMED2descr['EN']).join(flagMED2descr['IT'])
		//Vecchia gestione google map non piu presente
		// infowindow.setContent(textIT);
		marker.OnClickTextIT = textIT;
	}

	//Vecchia gestione google map non piu presente
	google.maps.event.addListener(marker, 'click', function() {
		// EPICLICK MOD: restore epicenter on top
		// epicenter.setMap(null);
		// epicenter.zIndex = epiZ;
		// epicenter.setMap(map);
		// open popup window
		// infowindow.open(map, marker);

		// $('section').translatable({
		//   contentNodeSelector     : 'span.gtranslate'
		// , translateButtonSelector : 'a[href="#translate"]'
	  // //        , autoChangeButtonText    : false
	  // //        , language                : 'en'
	  // //        , debug                   : true
		// });

		var rows = document.getElementById(NlocI);
		// scroll to selected table row
		if (FlagScroll == 1){ // do it only if selection from map marker
			try {
				rows.scrollIntoView(false);
			}
			catch (e) {console.log("ERR Gestito scrollIntoView"); }
		}
		FlagScroll = 1;

        flagEQ = 1; // don't change this flag. Needed for js.js. Defines that row index depends on nloc and not nterr
		// turn off previously selected table row when clicking on new marker
		if (NlocOld) {
			var rowsOld = document.getElementById(NlocOld);
			rowsOld.style.backgroundColor = "#ffffff";
		}

		// highlight new table row
		rows.style.backgroundColor = "#ffffaa";
		NlocOld = NlocI;
	})
}




// ==========================   JQUERY FUNCTIONS TO OPEN DIVS  =================
$(function() {

	var divComm = document.getElementById("openCOMM");
	$('#commentsICON').click(function(event) {
	    $('#commentsWindow').show();
		event.preventDefault();
		divComm.setAttribute('class','active');

        // ===============    set first active tab
		if (document.getElementById("EQbiblioT")) document.getElementById("EQbiblioT").click()
		else document.getElementById("embedT").click()

	});

	$('#closeCW').click(function(event) {
		$('#commentsWindow').hide();
		event.preventDefault();
		divComm.setAttribute('class','');

	});

	var v=window, d=document;
	var w = v.innerWidth ? v.innerWidth : d.documentElement.clientWidth,
		h = v.innerHeight ? v.innerHeight : d.documentElement.clientHeight,
		s = d.getElementById('WSzPlgIn'),
		ss;

	document.querySelector('#commentsWindow').style.width = Math.round( w - 515)+'px';
	document.querySelector('#commentsWindow').style.height = Math.round( h -110)+'px';
	document.querySelector('#commentsWindow').style.left = '475px';
	document.querySelector('#commentsWindow').style.top = '60px';
	document.querySelector('.tabcontent').style.maxwidth = Math.round( w - 560)+'px';
	document.querySelector('.tabcontent').style.maxheight = Math.round( h -235)+'px';

	$('#commentsWindow').resizable();
	$('#commentsWindow').draggable();

});
