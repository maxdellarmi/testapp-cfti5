// flags
var flagPQ = 0; // deve essere inizializzato a zero!
var flagLOC = 1;

// XML paths
var xmlServiceLoc = './localitySources/' + nloc + '.xml';
var xmlServicePQ = [];
var xmlServiceEE = 'EEList.xml';
var xmlServiceEQLIST = 'QuakeList.xml';

// Google MAP
var map;
var bounds;
var infowindow = new google.maps.InfoWindow();

// Google CHART
var n = [];
var d = [];
var chart;
var options;
var HLbar = 0;

// ----------------     markers
var epiBIG;
var markerLOC;
var red = '#FF0000';
// ---- epicenter
var EPIpathCALC = 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z';
// --- locality
var strokeLoc = 1.5;
var scaleLoc = 2;
//LOCApath = PINPOINT!!!!
var LOCpath = "M7.5,0C5.0676, 0,2.2297, 1.4865,2.2297, 5.2703 C2.2297,7.8378, 6.2838,13.5135, 7.5,15c1.0811-1.4865, 5.2703-7.027, 5.2703-9.7297C12.7703, 1.4865,9.9324, 0,7.5,0z";
var pinpoint = `<svg viewBox="0 -1 15 18" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M7.5,0C5.0676, 0,2.2297, 1.4865,2.2297, 5.2703 C2.2297,7.8378, 6.2838,13.5135, 7.5,15c1.0811-1.4865, 5.2703-7.027, 5.2703-9.7297C12.7703, 1.4865,9.9324, 0,7.5,0z" stroke="#000000" stroke-width="0.8" fill="#FFE51E" /></svg>`;
var pinpointLOCpath = `<svg viewBox="0 -1 15 18" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M7.5,0C5.0676, 0,2.2297, 1.4865,2.2297, 5.2703 C2.2297,7.8378, 6.2838,13.5135, 7.5,15c1.0811-1.4865, 5.2703-7.027, 5.2703-9.7297C12.7703, 1.4865,9.9324, 0,7.5,0z" stroke-width="1.25" {fill} {stroke} /></svg>`;
//<svg viewBox="0 -1 15 18" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M7.5,0C5.0676, 0,2.2297, 1.4865,2.2297, 5.2703 C2.2297,7.8378, 6.2838,13.5135, 7.5,15c1.0811-1.4865, 5.2703-7.027, 5.2703-9.7297C12.7703, 1.4865,9.9324, 0,7.5,0z" stroke="#000000" stroke-width="0.5px" fill="red" /></svg>

var PQMarkersOL = [];

// -------------      ALL quakes from quake list
var xmlServicePQ_ALLEQ = [];
var NterrALLEQ = []; var NperiodALLEQ= [];
var DateLabelALLEQ = []
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

// -------------      locality: info
var desloc;
var sLoctot;
var locLat, locLon;
var NumEqSel;
var noteLoc;

// -------------      locality: index quakes
var indexEQ = [];
var epiMarkers = [];
var Nterr1;
var DateLabel = []
var Year = [], Month = [], Day = []
var TimeLabel = []
var Hour = [], Minu = [], Sec = []
var Lat = [], Lon = [];
var fIS = [], sISrom = [];
var Imax = [], Io = [];
var iNP = [];
var Me = [];
var Location = [];
var Country = [];
var Epicenter = [];
var D1commLOC = [];
var D1commLOC_IT = [];
var D1commLOC_EN = [];
var D1commLOCAbbr = [];
var FlagFalse = [];
var FlagcommentsLOC = [];

// -----------------    PQ
var nRow;
var Nterr = [];
var PQMarkers = [];
var PQMarkersOLD = [];
var nper;
var EQ_textEN = [];
var EQ_textIT = [];
var NterrPQ;
var noteLocPQ = [];

// ----------------     EE
var EEMarkers = [];
var EEMarkersOLD = [];
var EEall = [];
// -- locality (all EE at locality)
var EE_nperiodLOC = [];
var EE_nterrLOC = [];
var EE_codeffLOC = [];
var EE_desceffLOC = [];
var EE_commLOC = [];
var E1listLOC = [];
var EE_nlocLOC = [], EE_nloc6LOC = [];
var flagEEloc = [];
// -- PQ (all EE for each quake)
var EE_nperiod = []
var EE_desceff = []
var EE_nloc = [], EE_nloc6 = [];
var EE_loc = []
var EE_locNote = []
var EE_comm = []
var EE_codeff = []
var EE_Lat = [];
var EE_Lon = [];

var symbolEE = [];
var E1listExport = [];

function InitializeLoc() {
	$('#loading').show();
	requestEQLISTData();
	placeMap();
	//openEE();
	resizeMapLoc();
	//TODO ATTUALMENTE SPIDERIFY COMMENTATO PERCHE VA IN ERRORE SENZA MAPPA GOOGLE
	//GOOGLE MAPS SOLUTION https://github.com/jawj/OverlappingMarkerSpiderfier
	//TODO OPEN LAYER SOLUTION https://github.com/alrocar/OLSpiderfy,  https://viglino.github.io/ol-ext/examples/animation/map.animatedcluster.html
	//spiderfy();
}

function resizeMapLoc() {
	resizeMap();
	document.querySelector('#feltrep').style.height = Math.round( h -350)+'px';
	// document.querySelector('#Loc_info tbody').style.height = Math.round( h -390)+'px';
	document.querySelector('#Loc_info tbody').style.height = Math.round( h -380)+'px';
	document.querySelector('#Loc_info').style.height = Math.round( h -350)+'px';
}

function deleteEpi() {
	if (epiMarkers.length>0){
		for (var i = 0; i < epiMarkers.length; i++) {
			// epiMarkers[i].setMap(null);
	    };
	}
	if (epiBIG) {
		epiBIG.setMap(null);
		infowindow.close();
	}
}

function showQuakes() {
	console.log(epiMarkers);
	//TODO setMap non presente in OL probabilmente e' necessario visualizzare il layer con i marker creati //VA CHIAMATO DENTRO IL RITORNO DI MANAJAX
	//creazioneMappaTerremotiInput(epiMarkers);

	for (var i = 0; i < epiMarkers.length; i++) {
		console.log("aggiungo epiMarkers quakes al layerglobale localityPHPmarkers");
		localityPHPmarkers.push(epiMarkers[i]);
		//region GESTIONE VECCHIA COMMENTATA
		//TODO setMap non presente in OL probabilmente e' necessario visualizzare il layer con i marker creati
		//epiMarkers[i].setMap(map);
		//todo: gestione bounds da fixare
		//bounds.extend(epiMarkers[i].getPosition());
		//TODO variabile spider commentata
		//oms.addMarker(epiMarkers[i]);
		//endregion
	}
}

// When clicking on table row, trigger event on Gmap marker (used to trigger popup window when clicking on table row)
function onclickListLocality(prog){
	console.log('onclicklistLocality');
	if (prog.length == 5){
		console.log('onlySelectZoomPopup');
		// turn off previously selected table row when clicking on new marker
		if (NterrOld) {
			var rowsOld = document.getElementById(NterrOld);
			rowsOld.style.backgroundColor = "#ffffff";
		}
		var rows = document.getElementById(prog);

		// highlight new table row
		rows.style.backgroundColor = "#ffffaa";
		NterrOld = prog;


	} else {
		console.log('new selection epiBig and selectZoom');
		if (flagPQ == 1) {
			for (var ii = 0; ii < PQMarkersOLD.length; ii++) {
				PQMarkersOLD[ii].setMap(null);
			};
			for (var ii = 0; ii < EEMarkersOLD.length; ii++) {
				if (EEMarkersOLD[ii]) EEMarkersOLD[ii].setMap(null);
			};

			//eval(nt_old).setMap(null);

			//SetMap non piu utilizzabile
			/*epiMarkers[prog].setMap(null);
			epiBIG.setMap(null);
			markerLOC.setMap(map);*/

			showQuakes();
			flagPQ = 0;
	    };

		console.log('onclicklistLocality zoom and selection');

		/****start selezione elemento a sinistra con posizionamento ****/
		// ---- parameters necessary for functions in js.js
		sClick = "LIST";
		//Flag for scrolling table - set to zero when event is selected from table (and not from marker)
		FlagScroll = 0;
		google.maps.event.trigger(epiMarkers[prog], 'click');
		/******vecchia gestione google maps
		 * google.maps.event.trigger(epiMarkers[prog], 'click');
		//TODO: gestione bounds da fixare con extent del pinpoint
		// bounds.extend(markerLOC.getPosition());
		//map.fitBounds(bounds);

		// center map on selected event (when selecting from table line)
		var center = new google.maps.LatLng(Lat[prog], Lon[prog]);
	    map.panTo(center);*****/

		console.log('evento click della singola feature..');
		console.log(epiMarkers[prog]);
		sClick = "LIST";
		// Flag for scrolling table - set to zero when event is selected from table (and not from marker)
		FlagScroll = 0;

		//************zoom nella zona di riferimento dove e' posizionata la singola feature
		var padding = [500, 50, 500, 50]
		mapOL.getView().fit(
			epiMarkers[prog].getGeometry().getExtent(),
			{
				size: mapOL.getSize(),
				padding: padding,
			}
		);
		mapOL.getView().setZoom(8);

		//gestione selezione singola feature ---->> successivamente mostra il singolo popup
		var collection = new ol.Collection();
		select = new ol.interaction.Select({
			features: collection,
			style: null,
		});

		mapOL.addInteraction(select);
		window.setTimeout(function() {
			collection.push(epiMarkers[prog]);
			select.dispatchEvent({
				type: 'select',
				selected: [epiMarkers[prog]],
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
	document.getElementById("legend").style.display = "none";
    document.getElementById("legendmin").style.display = "initial";
	document.getElementById("legendPQ").style.display = "none";
}


function onclickListLocalityOnlyZoom(prog){
	console.log('onclickListLocalityOnlyZoom');
	if (prog.length == 5){
		// turn off previously selected table row when clicking on new marker
		if (NterrOld) {
			var rowsOld = document.getElementById(NterrOld);
			rowsOld.style.backgroundColor = "#ffffff";
		}
		var rows = document.getElementById(prog);

		// highlight new table row
		rows.style.backgroundColor = "#ffffaa";
		NterrOld = prog;
	} else
	{
		if (flagPQ == 1) {
			for (var ii = 0; ii < PQMarkersOLD.length; ii++) {
				PQMarkersOLD[ii].setMap(null);
			};
			for (var ii = 0; ii < EEMarkersOLD.length; ii++) {
				if (EEMarkersOLD[ii]) EEMarkersOLD[ii].setMap(null);
			};
			showQuakes();
			flagPQ = 0;
		};

		console.log('onclickListLocalityOnlyZoom zoom');

		// ---- parameters necessary for functions in js.js
		sClick = "LIST";
		//Flag for scrolling table - set to zero when event is selected from table (and not from marker)
		FlagScroll = 0;

		console.log('evento click della singola feature..');
		console.log(epiMarkers[prog]);
		google.maps.event.trigger(epiMarkers[prog], 'click');
		//markersArray[1170]['Marker'].getGeometry().getExtent()
		sClick = "LIST";
		// Flag for scrolling table - set to zero when event is selected from table (and not from marker)
		FlagScroll = 0;

		//************zoom nella zona di riferimento dove e' posizionata la singola feature
		var padding = [500, 50, 500, 50]
		mapOL.getView().fit(
			epiMarkers[prog].getGeometry().getExtent(),
			{
				size: mapOL.getSize(),
				padding: padding,
			}
		);
		mapOL.getView().setZoom(8);

	}

	document.getElementById("legend").style.display = "none";
	document.getElementById("legendmin").style.display = "initial";
	document.getElementById("legendPQ").style.display = "none";

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


function selnum(){
	console.log("selnum.... event");
	var selection = chart.getSelection();
	console.log(selection[0].row);
	onclickListLocality(selection[0].row)
	var rows = document.getElementById(Nterr[selection[0].row]);
	console.log(rows);
	rows.scrollIntoView(false);
	FlagScroll = 1
}

function highlightBar(index){
	if (HLbar == 1){
		turnoffBar()
	}
	var textH = d[index] + " - Is: " + sISrom[index];
	dataChart.addRow ([n[index], fIS[index], red, textH]);
	chart.draw(dataChart, options);
	HLbar = 1;
}

function turnoffBar(){
	dataChart.removeRow(DateLabel.length+2) // +2 perchè c'è la bar fittizia e la bar rossa
	chart.draw(dataChart, options);
	HLbar = 0;
}

function onClickMarker(index, marker) {
	if (HLbar == 1){
		turnoffBar()
	}
	google.maps.event.addListener(marker, 'click', function() {
		highlightBar(index)
	})
}


// ==========================================================================================
//											PARSE QUAKE LIST OF ALL CFTI QUAKES
//  needed for EE non in PQ
// ==========================================================================================
function requestEQLISTData(){
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
	//console.log(XmlText);
	XMLQuakeList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLQuakeListArrived = true;
	var markers = XMLQuakeList.documentElement.getElementsByTagName("Quake");

	if(markers.length > 0){
		for (var i = 0; i < markers.length; i++){
			NterrALLEQ[i] = XMLQuakeList.getElementsByTagName("nterr")[i].childNodes[0].nodeValue;
			var Zone = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;

			// CHECK NPERIOD -- QUESTO NON DOVRA' PIU' SERVIRE QUNDO I DATI SARANNO A POSTO!!!!!!!!!!!!!
			var CheckNperiod =  XMLQuakeList.getElementsByTagName("nperiod")[i];
			NperiodALLEQ[i] = CheckNperiod.childNodes.length ? CheckNperiod.childNodes[0].nodeValue : '';
						//NperiodALLEQ[i] = XMLQuakeList.getElementsByTagName("nperiod")[i].childNodes[0].nodeValue;


			xmlServicePQ_ALLEQ[i] = './quakeSources/' + NterrALLEQ[i] + '.xml';
			//console.log("xmlServicePQ_ALLEQ");
			//console.log(xmlServicePQ_ALLEQ[i]);
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
		}
		openEE();
	}
}

// ==========================================================================================
//											LOCALITY
// ==========================================================================================

function openEE(){
	console.log("openEE");
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;

	var ajaxUpdater = new Manajax(xmlServiceEE);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parseEEData;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();
}


//  This function parses EE data only for the locality (nloc). When reading PQ, the parsing is done again, for nterr
function parseEEData(XmlText){
	console.log("parseEEData");
	XMLEEList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLEEListArrived = true;
	EEall = XMLEEList.documentElement.getElementsByTagName("EE");

	// GET ALL EE AT THE LOCALITY
	var k = 0;
	if(EEall.length > 0){
		for (var i = 0; i < EEall.length; i++){
			EE_nlocLOC[k] = XMLEEList.getElementsByTagName("NLOC_CFTI")[i].childNodes[0].nodeValue;


			if (EE_nlocLOC[k] == nloc) {
				if (XMLEEList.getElementsByTagName("NTERR").length == 0) EE_nterrLOC[k] = ""
				else if (XMLEEList.getElementsByTagName("NTERR")[i].childNodes.length == 0) EE_nterrLOC[k] = ""
				else EE_nterrLOC[k] = XMLEEList.getElementsByTagName("NTERR")[i].childNodes[0].nodeValue;
				EE_nperiodLOC[k] = XMLEEList.getElementsByTagName("NPERIOD")[i].childNodes[0].nodeValue;

				EE_commLOC[k] = XMLEEList.getElementsByTagName("COMMENTO")[i].childNodes[0].nodeValue;
				EE_codeffLOC[k] = XMLEEList.getElementsByTagName("CODICE_EFF")[i].childNodes[0].nodeValue;
				k = k+1
			}
		}
		// call function to parse LOC data
		requestLocData();
	}
}

function requestLocData(){
	var mySelf = this;
	var callBackBlock;

	var ajaxUpdater = new Manajax(xmlServiceLoc);
		ajaxUpdater.TxType = 'GET';
		ajaxUpdater.responseType = 'xml';
		this.callBackBlock = 'map';
		ajaxUpdater.callBackFunc = this.parseLocData;
		ajaxUpdater.toScroll = false;
		ajaxUpdater.requestAction();
}

function parseLocData(XmlText){
	console.log("parseLocData");
	console.log(XmlText.trim());
	XMLQuakeList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLQuakeListArrived = true;
	var quakes = XMLQuakeList.documentElement.getElementsByTagName("Quake");

	// -----------------------------------------     LOCALITY PARAMETERS AND MARKER

	locLat = parseFloat(XMLQuakeList.getElementsByTagName("lat_wgs84")[0].childNodes[0].nodeValue).toFixed(3);
	locLon = parseFloat(XMLQuakeList.getElementsByTagName("lon_wgs84")[0].childNodes[0].nodeValue).toFixed(3);

	desloc = XMLQuakeList.getElementsByTagName("desloc_cfti")[0].childNodes[0].nodeValue;
	var flagProv = XMLQuakeList.getElementsByTagName("provlet")[0].childNodes.length;
	if (flagProv > 0) {
		var prov = XMLQuakeList.getElementsByTagName("provlet")[0].childNodes[0].nodeValue;
	} else {
		var prov = ""
	};
	var flagCount = XMLQuakeList.getElementsByTagName("nazione")[0].childNodes.length;
	if (flagCount > 0) {
		var country = XMLQuakeList.getElementsByTagName("nazione")[0].childNodes[0].nodeValue;
	} else {
		var country = ""
	};
	if (prov!='') sLoctot = desloc + ' (' + prov + ')';
	else sLoctot = desloc + ' (' + country + ')';

	var flagNote = XMLQuakeList.getElementsByTagName("notesito")[0].childNodes.length;
	if (flagNote > 0) {
		 noteLoc =  '<span id="noteloc">' + XMLQuakeList.getElementsByTagName("notesito")[0].childNodes[0].nodeValue + '</span>';
		 var noteexp = XMLQuakeList.getElementsByTagName("notesito")[0].childNodes[0].nodeValue;
	} else {
		 noteLoc = ""
		 var noteexp = "-";
	};

	filename = 'CFTI5_LOC_' + nloc + '_' + desloc;
	ExportText =  'Name;Prov/Country;Lat.;Lon.;Note'+ CarRet
	ExportText = ExportText + desloc + ";" + prov + ";" + locLat  + ";" + locLon  + ";" + noteexp + CarRet + CarRet;
	ExportText = ExportText + 'Is (MCS intensity of the given earthquake at the locality);Is R. (MCS intensity of the given earthquake at the locality - Roman Numerals);Effects on natural environment;Date;Time;Io (Epicentral intensity - MCS scale);Imax (Maximum intensity - MCS scale);NMO (Number of Macroseismic Observations);Me (Equivalent magnitude based on macroseismic observations);Latitude;Longitude;Epicentral Area;'+ CarRet;



	/******TODO SOSTITUIRE GLI OGGETTI GOOGLE CON OL inzia con marker finti poi metti quelli richiesti*****/
	// --- add marker of locality
	/*var iconLOC = {
		path: LOCpath,
		fillColor: '#FFE51E',
		fillOpacity: 1,
		anchor: new google.maps.Point(7 , 15),
		strokeWeight: strokeLoc,  //1.5
		scale: scaleLoc //2
	}*/

	//TODO: gestione bounds da fixare
	// bounds = new google.maps.LatLngBounds();
	/*markerLOC = new google.maps.Marker({
		position: new google.maps.LatLng(locLat, locLon),
		map: map,
		icon: iconLOC,
		zIndex: google.maps.Marker.MAX_ZINDEX + 1,  // doesn't work
		title: sLoctot+'\n'+'lat: ' + locLat + ', lon: ' + locLon
	});*/

	var stilePinPoint = new ol.style.Style({
			image: new ol.style.Icon({
				opacity: 1,
				src: 'data:image/svg+xml;utf8,' + escape(pinpoint),
				scale: scaleLoc //2
			})
		});

	var markerLOC = new ol.Feature({
		geometry: new ol.geom.Point(new ol.proj.fromLonLat([locLon, locLat])), //new ol.geom.Point([locLon, locLat]),
		type: "pinpoint",
		title : sLoctot+'\n'+'lat: ' + locLat + ', lon: ' + locLon,
		OnClickTextIT : ""
	});
	/******TODO GESTIONE VISUALIZZAZIONE PINPOINT CON OL*****/
	markerLOC.setStyle(stilePinPoint);
	/******TODO variabile di appoggio per tutto quello che bisogna visualizzare sul layer*****/
	console.log('aggiungo markerLOC al layer globale localityPHPmarkers di tipo pinpoint');
	localityPHPmarkers.push(markerLOC);
	/******TODO SOSTITUIRE GLI OGGETTI GOOGLE CON OL *****/
	// -----------------------------------------     LOCALITY BIBLIOGRAPHY

	var biblioList = readBiblio(XMLQuakeList, "Bibliography");
	var codbib = biblioList[0]
	var titolobib = biblioList[1]
	var annobib = biblioList[2]
	var placebib = biblioList[3]
	var authorbib = biblioList[4]

	// -----------------------------------------     ALL QUAKES AT LOCALITY
	var Nperiod = [];
	var E1commLOC = [];
	var E1commLOC_IT = [];
	var E1commLOC_EN = [];

	ExportKml = '';
	ExportKmlR = '';

	var flagtableNT = 0;
	var flagtableNP = 0;

	if(quakes.length > 0){
		flagtableNT = 1;
		for (var i = 0; i < quakes.length; i++){

			Nterr[i] = XMLQuakeList.getElementsByTagName("nterr")[i].childNodes[0].nodeValue;
			Nterr1 = Nterr[0];
			Nperiod[i] =  XMLQuakeList.getElementsByTagName("nperiod")[i].childNodes[0].nodeValue;

			xmlServicePQ[i] = './quakeSources/' + Nterr[i] + '.xml';

			DateLabel[i] =  XMLQuakeList.getElementsByTagName("data_label")[i].childNodes[0].nodeValue;
			Year[i] = parseInt(XMLQuakeList.getElementsByTagName("anno")[i].childNodes[0].nodeValue);

			var CheckMonth = XMLQuakeList.getElementsByTagName("mese")[i];
			Month[i] = CheckMonth.childNodes.length ? CheckMonth.childNodes[0].nodeValue : '';
			if (Month[i]=="") Month [i] = "00"

			var CheckDay = XMLQuakeList.getElementsByTagName("giorno")[i];
			Day[i] = CheckDay.childNodes.length ? CheckDay.childNodes[0].nodeValue : '';
			if (Day[i]=="") Day [i] = "00"

			TimeLabel[i] =  XMLQuakeList.getElementsByTagName("time_label")[i].childNodes[0].nodeValue;

			var CheckHour =  XMLQuakeList.getElementsByTagName("ora")[i];
			Hour[i] = CheckHour.childNodes.length ? CheckHour.childNodes[0].nodeValue : '';
			if (Hour[i]=="-9" || Hour[i]=="" ) Hour[i] = 0;

			var CheckMinu = XMLQuakeList.getElementsByTagName("minu")[i];
			Minu[i] = CheckMinu.childNodes.length ? CheckMinu.childNodes[0].nodeValue : '';
			if (Minu[i]=="-9" || Minu[i]=="" ) Minu [i] = 0;

			var CheckSec = XMLQuakeList.getElementsByTagName("sec")[i];
			Sec[i] = CheckSec.childNodes.length ? CheckSec.childNodes[0].nodeValue : '';
			if (Sec[i]=="-9" || Sec[i]=="" ) Sec[i] = 0;

			Lat[i] = parseFloat(XMLQuakeList.getElementsByTagName("lat")[i].childNodes[0].nodeValue).toFixed(3);
			Lon[i] = parseFloat(XMLQuakeList.getElementsByTagName("lon")[i].childNodes[0].nodeValue).toFixed(3);
			fIS[i] = parseFloat(XMLQuakeList.getElementsByTagName("intpqnum")[i].childNodes[0].nodeValue);
			sISrom[i] = XMLQuakeList.getElementsByTagName("intpq")[i].childNodes[0].nodeValue;
			// da decidere questo:
			//if (sISrom[i] == 'F') fIS[i] = 1;

			if (fIS[i] == 9.1) fIS[i] = 9;
			if (fIS[i] == 8.2) fIS[i] = 8;
			if (fIS[i] == 8.1) fIS[i] = 8;
			if (fIS[i] == 6.1) fIS[i] = 6;
			if (fIS[i] == 6.6) fIS[i] = 6.5;
			if (fIS[i] == 4.6) fIS[i] = 4.5;
			if (fIS[i] == 5.1) fIS[i] = 5;

			if (sISrom[i] == 'G') fIS[i] = 0.9;
			if (sISrom[i] == 'NF') fIS[i] = 0.8;
			if (sISrom[i] == 'NC') fIS[i] = 0.7;
			if (sISrom[i] == 'N') fIS[i] = 0.6;
			if (sISrom[i] == 'A') sISrom[i] = 'A(IX)';
			if (sISrom[i] == 'B') sISrom[i] = 'B(VIII)';
			if (sISrom[i] == 'C') sISrom[i] = 'C(VIII)';
			if (sISrom[i] == 'E') sISrom[i] = 'E(VI-VII)';
			if (sISrom[i] == 'D') sISrom[i] = 'D(VI)';
			if (sISrom[i] == 'S') sISrom[i] = 'S(V)';
			if (sISrom[i] == 'F') sISrom[i] = 'F(IV-V)';

			Imax[i] = parseFloat(XMLQuakeList.getElementsByTagName("imax")[i].childNodes[0].nodeValue);
			if (Imax[i] == 9.1) Imax[i] = 9;
			if (Imax[i] == 8.2) Imax[i] = 8;
			if (Imax[i] == 8.1) Imax[i] = 8;
			if (Imax[i] == 6.1) Imax[i] = 6;
			if (Imax[i] == 6.6) Imax[i] = 6.5;
			if (Imax[i] == 4.6) Imax[i] = 4.5;
			if (Imax[i] == 5.1) Imax[i] = 5;
			Io[i] = parseFloat(XMLQuakeList.getElementsByTagName("io")[i].childNodes[0].nodeValue);

			iNP[i] = XMLQuakeList.getElementsByTagName("npun")[i].childNodes[0].nodeValue;
			Me[i] = parseFloat(XMLQuakeList.getElementsByTagName("mm")[i].childNodes[0].nodeValue);
			Location[i] = XMLQuakeList.getElementsByTagName("earthquakelocation")[i].childNodes[0].nodeValue;
			Country[i] = XMLQuakeList.getElementsByTagName("country")[i].childNodes[0].nodeValue;

			FlagcommentsLOC[i] = XMLQuakeList.getElementsByTagName("flagcomments")[i].childNodes[0].nodeValue;
			FlagFalse[i] = XMLQuakeList.getElementsByTagName("flagfalseeq")[i].childNodes.length ? true : false;

			//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
			var flagET = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes.length;
			if (flagET > 0) {
				Epicenter[i] = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes[0].nodeValue;
			} else {
				Epicenter[i] = "Local effects"
			};

			if (FlagcommentsLOC[i] == 4) {
				D1commLOC[i] = XMLQuakeList.getElementsByTagName("D1")[i].childNodes[0].nodeValue;
				D1commLOCAbbr[i] = D1commLOC[i];

			} else if (FlagcommentsLOC[i] == 2) {
				D1commLOC[i] = '<span class="flag2descr">' + flag2descr[Langsel] + '</span>'
				D1commLOCAbbr[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
			}
			else if (FlagcommentsLOC[i] == 3) {
				D1commLOC[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
				D1commLOCAbbr[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
			}
			else if (FlagcommentsLOC[i] == 1 || FlagcommentsLOC[i] == 5) {
				D1commLOC[i] = '<span class="flag1descr">' + flag1descr[Langsel] + '</span>'
				D1commLOCAbbr[i] = '<span class="flag1descr">' + flag1descr[Langsel] + '</span>'
			}
			else {
				D1commLOC[i] = ''
				D1commLOCAbbr[i] = "";
			}

			// ------- EE EFFECTS
			E1commLOC[i] = '';
			E1listLOC[i] = '';
			flagEEloc[i] = 0;
			E1listExport[i]='';
			var EEflagExport = '-';

			// create all EE comments at locality (for all events) when locality already in PQ
			for(var k = 0; k < EE_nperiodLOC.length; k++){
				var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeffLOC[k])]
				if (EE_nperiodLOC[k] == Nperiod[i]){
					if (E1listExport[i]==''){
						E1listExport[i] = class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[k])];
					} else {
						E1listExport[i] = E1listExport[i] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[k])];
					}
					E1listLOC[i] = E1listLOC[i] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeffLOC[k] + '.png" width= "18" /></td><td><span class="' + EE_codeffLOC[k] + '_IW">' +  abbrEEtype  + "</span></td></tr>"

					// check if EE associated to NTERR or NPERIOD - set full dots or circles and remove effect of other nterrs
					if (EE_nterrLOC[k].length==5) {
						if (EE_nterrLOC[k] == Nterr[i]) {
							symbolEE[i] = '<img src="images/EE/00_NT.png" width="15px">'
							EEflagExport = E1listExport[i] + ' [Effect(s) associated with single earthquake]';

							// flag used later for green color at locality
							flagEEloc[i] = 1;
							E1commLOC[i] = EE_commLOC[k];
						} else {
							E1listLOC[i] = '';

						}
					} else {
						symbolEE[i] = '<img src="images/EE/00_NP.png" width="15px">'
						EEflagExport = E1listExport[i] + ' [Effect(s) associated with entire earthquake sequence]';
						flagEEloc[i] = 1; // flag used later for green color at locality
						E1commLOC[i] = EE_commLOC[k];
					}
				}
			}

			var intN;
			if (fIS[i] < 1) {
				intN = 0;
			} else {
				intN = fIS[i];
			}

			var intR;
			switch (sISrom[i]) {
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
					intR = sISrom[i];
			}

			//Export variableTXT
			ExportText = ExportText + intN + ';' + intR + ';' + EEflagExport + ';' + DateLabel[i] + ';' + TimeLabel[i] + ';' + Io[i] + ';' + Imax[i] + ';' + iNP[i] + ';' + Me[i] + ';' + Lat[i] + ';' + Lon[i] + ';' + Location[i] + CarRet;

			//Export variableKML
			ExportKmlR = ExportKmlR + "<Placemark> <name>" + DateLabel[i] + " - " + Location[i] + " (" + intR + ")</name>" + CarRet + "<description><![CDATA["
			ExportKmlR = ExportKmlR + "MCS intensity at " + sLoctot + ": <b>" + intR + "</b><br><br>Effects on natural environment at " + sLoctot + ": <b>" + EEflagExport + "</b><br><hr><br>Date: <b>" + DateLabel[i] + "</b> Time: <b>" + TimeLabel[i]  + "</b> <br>Epicentral Area: <b>" + Location[i] + "</b><br><b>" + Epicenter[i] + "</b> (Lat.: <b>" + Lat[i] + "</b> - Lon.: <b>" + Lon[i] + "</b>) <br><br>Io (Epicentral intensity - MCS scale): <b>" + Io[i] + "</b> <br>Imax (Maximum intensity - MCS scale): <b>" + Imax[i] + "</b> <br>Me (Equivalent magnitude): <b>" + Me[i] + "</b> <br>NMO (Number of Macroseismic Observations): <b>" + iNP[i] + "</b><br><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/quake.php?" + Nterr[i] + "EN" + virg + ">Earthquake page </a></b>"
			ExportKmlR = ExportKmlR + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + Lon[i] + "</longitude>" + CarRet + "<latitude>" + Lat[i] + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#" + Nterr[i] + "</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ Lon[i] + ","+ Lat[i] + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>"

		}
	} else Nperiod = '' // if locality has no quakes (not present in any PQ). Then in the next loop, EE are found




	//  ======   EE WHEN LOCALITY NOT IN PQ (events not in the list contained in xml, read in the loop before)

	// create EE comments for EE when locality NOT in PQ: add line to table if EE associated to nterr,
	// or create new table if EE associated to nperiod

	// NUOVO LOOP, indipendente dalla presenza o meno di terremoti nell'xml della località (serve a trovare terremoti con effetti ambientali non in XML)
	// new loop needed, otherwise I don't have the complete list of events at locality, to look for EE for events not in that list (EE for which the locality is has no PQ intensity)

	var tbodyNP = document.getElementById('Loc_info_NP_data');
	var tableNPline = '';
	var EmoreIn = Nterr.length;
	var NperiodMoreDone = [];
	var NterrMoreDone = [];
	var s = 0;



	for(var k = 0; k < EE_nperiodLOC.length; k++){
		// entra qui solo se è un nperiod nuovo
		if (Nperiod.indexOf(EE_nperiodLOC[k]) == -1 && NperiodMoreDone.indexOf(EE_nperiodLOC[k])== -1 && NterrMoreDone.indexOf(EE_nterrLOC[k]) == -1) { // if EEnperiod not among quakes of locality (XML) and if it's a new nperiod (cioè se son già passata quyi dentro con lo stesso nperiod, perchè ci sono più EE per lo stesso NP)

			// ----------------     GET ALL INFORMATION ABOUT EARTHQUAKE FROM EQ LIST PREVIOUSLY PARSED
			// EE associato a NTERR
			if (EE_nterrLOC[k].length == 5){

				var newNpIn = NterrALLEQ.indexOf(EE_nterrLOC[k])

				Nterr[EmoreIn] = NterrALLEQ[newNpIn]
				Nperiod[EmoreIn] = NperiodALLEQ[newNpIn]
				xmlServicePQ[EmoreIn] = xmlServicePQ_ALLEQ[newNpIn]
				Epicenter[EmoreIn] = EpicenterALLEQ[newNpIn]
				Year[EmoreIn] = YearALLEQ[newNpIn]
				DateLabel[EmoreIn] = DateLabelALLEQ[newNpIn]
				Day[EmoreIn] = DayALLEQ[newNpIn]
				Month[EmoreIn] = MonthALLEQ[newNpIn]
				TimeLabel[EmoreIn] = TimeLabelALLEQ[newNpIn]
				Hour[EmoreIn] = HourALLEQ[newNpIn]
				Minu[EmoreIn] = MinuALLEQ[newNpIn]
				Sec[EmoreIn] = SecALLEQ[newNpIn]
				Location[EmoreIn] = LocationALLEQ[newNpIn];
				Country[EmoreIn] = CountryALLEQ[newNpIn]
				Lat[EmoreIn] = LatALLEQ[newNpIn]
				Lon[EmoreIn] = LonALLEQ[newNpIn]
				Io[EmoreIn] = IoALLEQ[newNpIn]
				Imax[EmoreIn] = ImaxALLEQ[newNpIn]
				Me[EmoreIn] = MeALLEQ[newNpIn]
				iNP[EmoreIn] = iNP_ALLEQ[newNpIn]

				// get all EE for each earthquake
				var indexes = getAllIndexes(EE_nterrLOC, EE_nterrLOC[k]);
				E1listLOC[EmoreIn] = '';
				E1listExport[EmoreIn] = '';
				for (var ind = 0; ind < indexes.length; ind++) {

					var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];
					if (E1listExport[EmoreIn]==''){
						E1listExport[EmoreIn] = class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];

					} else {
						E1listExport[EmoreIn] = E1listExport[EmoreIn] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];
					}

                    E1listLOC[EmoreIn] = E1listLOC[EmoreIn] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeffLOC[indexes[ind]] + '.png" width= "18" vertical-align="middle"/></td><td><span class="' + EE_codeffLOC[indexes[ind]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
                };

				E1listExport[EmoreIn] = E1listExport[EmoreIn] + ' [Effect(s) associated with single earthquake]';

				// full dot for EE related to nterr
				symbolEE[EmoreIn] = '<img src="images/EE/00_NT.png" width="15px">'
				//
				E1commLOC[EmoreIn] = EE_commLOC[k];
				D1commLOC[EmoreIn] = '';
				sISrom[EmoreIn] = '';
				fIS[EmoreIn] = 1;

				//Export variableTXT
				ExportText = ExportText + '0' + ';' + '-' + ';' + E1listExport[EmoreIn] + ';' + DateLabel[EmoreIn] + ';' + TimeLabel[EmoreIn] + ';' + Io[EmoreIn] + ';' + Imax[EmoreIn] + ';' + iNP[EmoreIn] + ';' + Me[EmoreIn] + ';' + Lat[EmoreIn] + ';' + Lon[EmoreIn] + ';' + Location[EmoreIn] + CarRet;

				//Export variableKML
				ExportKmlR = ExportKmlR + "<Placemark> <name>" + DateLabel[EmoreIn] + " - " + Location[EmoreIn] + "</name>" + CarRet + "<description><![CDATA["
				ExportKmlR = ExportKmlR + "MCS intensity at " + sLoctot + ": <b> - </b><br><br>Effects on natural environment at " + sLoctot + ": <b>" + E1listExport[EmoreIn] + "</b><br><hr><br>Date: <b>" + DateLabel[EmoreIn] + "</b> Time: <b>" + TimeLabel[EmoreIn]  + "</b> <br>Epicentral Area: <b>" + Location[EmoreIn] + "</b><br><b>" + Epicenter[EmoreIn] + "</b> (Lat.: <b>" + Lat[EmoreIn] + "</b> - Lon.: <b>" + Lon[EmoreIn] + "</b>) <br><br>Io (Epicentral intensity - MCS scale): <b>" + Io[EmoreIn] + "</b> <br>Imax (Maximum intensity - MCS scale): <b>" + Imax[EmoreIn] + "</b> <br>Me (Equivalent magnitude): <b>" + Me[EmoreIn] + "</b> <br>NMO (Number of Macroseismic Observations): <b>" + iNP[EmoreIn] + "</b><br><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/quake.php?" + Nterr[EmoreIn] + "EN" + virg + ">Earthquake page </a></b>"
				ExportKmlR = ExportKmlR + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + Lon[EmoreIn] + "</longitude>" + CarRet + "<latitude>" + Lat[EmoreIn] + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#" + Nterr[EmoreIn] + "</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ Lon[EmoreIn] + ","+ Lat[EmoreIn] + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>"

				// incrementa indice solo se cambia nperiod! 1 riga per ogni terremoto (ma con molteplici EE)
				EmoreIn = EmoreIn + 1;



			// ----- EE associato a NPERIOD
			} else {


				if (Nperiod == ''){
					// flag per accendere solo tabella NPERIOD
					flagtableNT = 0;
					flagtableNP = 1;

				} else {
					// flag per accendere sia tabella NPERIOD sia NTERR
					// flagtableNT = 1;
					flagtableNP = 1;

				}

				var indNP = NperiodALLEQ.indexOf(EE_nperiodLOC[k])
				var EEdateEx = '';
				var EEdate = '';
				var EEtime = '';
				var EEIo = '';
				var EEMe = '';
				var EENterrButt = '';
				var EQlink = '';
				var EEepArea = '';
				var E1listNP ='';
				var EEImax = '';
				var EELat = '';
				var EELon = '';
				var EEiNP = '';
				while (indNP != -1){
					var NterrNP = NterrALLEQ[indNP];
					var QuakePage = createQuakePageLink(window.location.href, NterrALLEQ[indNP], 'locality')
					EEdateEx = EEdateEx + DateLabelALLEQ[indNP] + '<br />'
					EEdate = EEdate + DateLabelALLEQ[indNP] + ' &nbsp &nbsp<span class="linkIW"><abbr class= "quakePageLink" title= ""> <a href="' + QuakePage + '" target="_blank" onclick="window.open(this.href + Langsel)"><img src="images/link2.png" width= "10" vertical-align="middle"/></a></abbr></span><br />'
					EEtime = EEtime + TimeLabelALLEQ[indNP] + '<br />'
					EEIo = EEIo + IoALLEQ[indNP]+ '<br />'
					EEMe = EEMe + MeALLEQ[indNP]+ '<br />'
					EEImax = EEImax + ImaxALLEQ[indNP]+ '<br />'
					EELat = EELat + LonALLEQ[indNP]+ '<br />'
                    EELon = EELon + LatALLEQ[indNP]+ '<br />'
					EEiNP = EEiNP + iNP_ALLEQ[indNP]+ '<br />'
					EENterrButt = EENterrButt + '<div id ="' +NterrNP + '" class = "NPtableBackgrounDiv"><a type = "button" class="more"><img src="images/gm.png" width="11px" onclick="showPQ(NterrALLEQ['+indNP+'])"></a></div>'
					 EEepArea = EEepArea + LocationALLEQ[indNP] + '<br />'

					indNP = NperiodALLEQ.indexOf(EE_nperiodLOC[k], indNP+1)
				}

				// get all EE for each nperiod
				var EEListExport = '';
				var indexes = getAllIndexes(EE_nperiodLOC, EE_nperiodLOC[k]);
				for (var ind = 0; ind < indexes.length; ind++) {
					var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];

					if (EEListExport==''){
						EEListExport = class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];

					} else {
						EEListExport = EEListExport + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeffLOC[indexes[ind]])];
					}

                    E1listLOC[EmoreIn] = E1listLOC[EmoreIn] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeffLOC[indexes[ind]] + '.png" width= "18" vertical-align="middle"/></td><td><span class="' + EE_codeffLOC[indexes[ind]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";

					E1listNP = E1listNP + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeffLOC[indexes[ind]] + '.png" width= "18" vertical-align="middle"/></td><td><span class="' + EE_codeffLOC[indexes[ind]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
				};

				EEListExport = EEListExport + ' [Effect(s) associated with entire earthquake sequence]';

				tableNPline = tableNPline + '<tr><td class="nat">' + '<div class="EEContainer">' + '<img src="images/EE/00_NP.png" width="15px">' + '<span class="tooltiptext_EE"><table>' + E1listNP + '</table></span></div>' + '</td><td class="dateNP">' + EEdate + '</td><td class="time">' + EEtime + '</td><td class="me">' + EEMe + '</td><td class="io">' + EEIo +'</td><td class="locationNP">' + EEepArea +'</td>'
				+ '</td><td class="mapbut">' + EENterrButt + '</td></tr>'

				//Export variableTXT
				ExportText = ExportText + '0' + ';' + '-' + ';' + EEListExport + ';' + String.fromCharCode(34) + EEdateEx + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEtime + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEIo + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEImax + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEiNP + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEMe + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EELat + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EELon + String.fromCharCode(34) + ';' + String.fromCharCode(34) + EEepArea + String.fromCharCode(34) + CarRet;

				//Export variableKML
				//Impossibile esportare gli NPERIOD come punti e quindi non si vedono in mappa KML xome in Google Maps sul sito, da segnalare nell'HELP!

			}
			NperiodMoreDone[s] = EE_nperiodLOC[k];
			NterrMoreDone[s] = EE_nterrLOC[k];
			console.log(NperiodMoreDone[s]);
			console.log(NterrMoreDone[s]);
			s++

		}
	}

	resizeTable(flagtableNT, flagtableNP)

	//replace <br /> with "line feed"
	var regBR = new RegExp("<br " + String.fromCharCode(47) + ">", "g");
	ExportText = ExportText.replace(regBR,String.fromCharCode(10));

	tbodyNP.innerHTML = tableNPline;
	// }

	if(DateLabel.length > 0){
		for (var i = 0; i < DateLabel.length; i++){  // new loop because the amount of EQ may have changed if more event have been found in the EE table (for events that have EE but no PQ intensity at the locality - so they do not appear in the locality XML, that is based on PQs)

			//   --------------------------------------------  Epincenter type: FALSE   ---------------------------------------------------------
			if (FlagFalse[i]) {
				Star = { path: google.maps.SymbolPath.CIRCLE, strokeColor: "#000000", scale: 4, strokeWeight: 3 };
				EpiIcon="F";
				//   --------------------------------------------  Epincenter type: NOT PARAMETERIZED   ---------------------------------------------------------
			} else if (Epicenter[i] == "Not parameterized"){
					var EpicenterITA = "Non parametrizzato";
					var EpicenterENG = Epicenter[i];
					Star = { path: google.maps.SymbolPath.CIRCLE, strokeColor: "#000000", fillColor: "#000000", fillOpacity: 1, scale: 3};
					EpiIcon="NP";
				//   --------------------------------------------  Epincenter type: CALCULATED   ---------------------------------------------------------
				} else {

				if (Epicenter[i] == "Calculated epicentre"){
					var EpicenterITA = "Epicentro calcolato";
					var EpicenterENG = Epicenter[i];

					if(9.5 < Io[i]) {Star = {path: EPIpathCALC, fillColor: color4, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale: StarScale4}; EpiIcon="C_9.5"};
			        if(7.5 < Io[i] && 9.5 >= Io[i]) {Star = {path: EPIpathCALC, fillColor: color3, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale3}; EpiIcon="C_8"};
			        if(5.9 < Io[i] && 7.5 >= Io[i]) {Star = {path: EPIpathCALC, fillColor: color2, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale2}; EpiIcon="C_6"};
			        if(6 > Io[i] ) {Star = {path: EPIpathCALC, fillColor: color1, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale1}; EpiIcon="C_6"};

				//   --------------------------------------------  Epincenter type: LOCAL EFFECTS  ---------------------------------------------------------
				} else if (Epicenter[i] == "Local effects"){
					EpicenterITA = "Singola località";
					EpicenterENG= Epicenter[i];

					if(9.5 < Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale4, fillColor: color4, fillOpacity: 1, strokeWeight: 5 , strokeColor: "#000000"}; EpiIcon="L_9.5"};
			        if(7.5 < Io[i] && 9.5 >= Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale3, fillColor: color3, fillOpacity: 1, strokeWeight: 5 , strokeColor: "#000000"}; EpiIcon="L_8"};
			        if(5.9 < Io[i] && 7.5 >= Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale2, fillColor: color2, fillOpacity: 1, strokeWeight: 5 , strokeColor: "#000000"}; EpiIcon="L_6"};
			        if(6 > Io[i] ) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale1, fillColor: color1, fillOpacity: 1, strokeWeight: 5, strokeColor: "#000000" }; EpiIcon="L_4"};

				//   --------------------------------------------  Epincenter type: AREA   ---------------------------------------------------------
			} else if (Epicenter[i] == "Region, area"){
					EpicenterITA = "Regione, area";
					EpicenterENG= Epicenter[i];

					if(9.5 < Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale4, strokeColor: color4, fillOpacity: 0, strokeWeight: 5 }; EpiIcon="R_9.5"};
			        if(7.5 < Io[i] && 9.5 >= Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale3, strokeColor: color3, fillOpacity: 0, strokeWeight: 5 }; EpiIcon="R_8"};
			        if(5.9 < Io[i] && 7.5 >= Io[i]) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale2, strokeColor: color2, fillOpacity: 0, strokeWeight: 5 }; EpiIcon="R_6"};
			        if(6 > Io[i] ) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale1, strokeColor: color1, fillOpacity: 0, strokeWeight: 5 }; EpiIcon="R_4"};

				 //--------------------------------------------  Epincenter type: Hypothetical  ---------------------------------------------------------
				} else if (Epicenter[i] == "Hypothetical"){
					EpicenterITA = "Ipotizzata";
					EpicenterENG= Epicenter[i];

					if(9.5 < Io[i]) {Star = {path: EPIpathCALC, strokeColor: color4, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale: StarScale4}; EpiIcon="H_9.5"};
			        if(7.5 < Io[i] && 9.5 >= Io[i]) {Star = {path: EPIpathCALC, strokeColor: color3, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale3}; EpiIcon="H_8"};
			        if(5.9 < Io[i] && 7.5 >= Io[i]) {Star = {path: EPIpathCALC, strokeColor: color2, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale2}; EpiIcon="H_6"};
			        if(6 > Io[i] ) {Star = {path: EPIpathCALC, strokeColor: color1, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale1}; EpiIcon="H_4"};
				};
			};

			//Star = {path: EPIpathCALC,
			// 		  strokeColor: color1,
			// 		  strokeOpacity: 1, anchor: new google.maps.Point(125,125),
			// 		  strokeWeight: 2,
			// 		  scale:StarScale1}
			
			//var cerchio = `<svg viewBox="0 0 250 250"   {height} {width} xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="50" cy="50" r="40" {stroke} {widthS} {fill} /></svg>`;
			var cerchio = `<svg viewBox="0 0 100 100"  {height} {width}  xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="40" cy="50" r="40"  {stroke} {widthS} {fill}  /></svg>`;
			var stella = `<svg viewBox="0 0 250 250" {height} {width} xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z" {fill} {stroke} {widthS} /></svg>`;
			var compiled;

			var singleFeature = new ol.Feature({
				id: i,
				geometry:new ol.geom.Point(new ol.proj.fromLonLat([Lon[i], Lat[i]])), //new ol.geom.Point([ Lon[i], Lat[i]]),
				type: "quakes",
				title: DateLabel[i],
				OnClickTextIT : ""
			});
			var strokeString = new String();
			var strokeWidthString = new String();
			var fillString = new String()

			//template replace dei parametri nella stringa svg
			if  ( Star.path === google.maps.SymbolPath.CIRCLE ) {
				px =8 * Star.scale / 8;
				compiled = template(cerchio, {
					stroke:  (Star.strokeColor!== undefined) ? String().concat("stroke=\"",Star.strokeColor,'\"'): undefined ,
					widthS: (Star.strokeWeight!== undefined) ? String().concat("stroke-width=\"",Star.strokeWeight,'\"'): undefined,
					fill:	(Star.fillColor!== undefined) ? String().concat("fill=\"",Star.fillColor,'\"'): undefined,
					height: String().concat("height=\"",'2.5px','\"'),
					width: String().concat("width=\"",'2.5px','\"')
				});
				singleFeature.values_.type = "areaOrRegion";
				console.log("singleFeature.values_.type = \"areaOrRegion\";");
				//console.log(singleFeature);
			}
			else  if ( Star.path === EPIpathCALC)
			{
				//console.log("Star.path" + Star.path);
				//px =8 * Star.scale / 8;
				compiled = template(stella, {
					stroke:  (Star.strokeColor!== undefined) ? String().concat("stroke=\"",Star.strokeColor,'\"'): String().concat("stroke=\"","#000000",'\"') ,
					//widthS: (Star.strokeWeight!== undefined) ? String().concat("stroke-width=\"",Star.strokeWeight,'\"'): String().concat("stroke-width=\"","5",'\"'),
					widthS: (Star.strokeWeight!== undefined) ? String().concat("stroke-width=\"","5",'\"'): String().concat("stroke-width=\"","5",'\"'),
					fill:	(Star.fillColor!== undefined) ? String().concat("fill=\"",Star.fillColor,'\"'): undefined,
					height: String().concat("height=\"",'200px','\"'),
					width: String().concat("width=\"",'200px','\"')
				});
			}
			////VARIABILE DI LOG PER LEGGERE SVG DATA
			//console.log(compiled);
			//assegno la stringa svg parametrizzata
			var workingSvg = compiled;
			// console.log("STRINGA SVG PARAMETRIZZATA"+workingSvg);
			var stileIcone = new ol.style.Style({
				image: new ol.style.Icon({
					opacity: Star.strokeOpacity, //parametro opacity
					src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
					scale: Star.scale*1.15 //parametro scale moltiplicato per ingrandire le stelle
				})
			});
			singleFeature.setStyle(stileIcone);


			//replace in KML file after definition of icon
			ExportKmlR = ExportKmlR.replace('#' + Nterr[i],'#' + EpiIcon);

			var QuakePage = createQuakePageLink(window.location.href, Nterr[i], 'locality')

			// =================   INFOWINDOWS FOR ALL EPICENTERS  =========================
			// Information box that pops up on click (on marker or line of quakes table)

			// FIX COMMENT REFERENCES
  		  if (E1commLOC[i]!= ''){
  			  E1commLOC_IT[i] = createREF(E1commLOC[i], Nperiod[i], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
  			  E1commLOC_EN[i] = createREF_EN(E1commLOC[i], Nperiod[i], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
  		  }
  		  if (D1commLOC[i]!= ''){
  			  D1commLOC_IT[i] = createREF(D1commLOC[i], Nperiod[i], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
  			  D1commLOC_EN[i] = createREF_EN(D1commLOC[i], Nperiod[i], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
  		  }

			var titleLocEN = ['<div class="iw-title localityColor"><b>' + sLoctot + '</b> - MCS Intensity: '+ '<b>' + sISrom[i] +' </b></div>'];

			var quakeDetailsEN = ['<div class="iw-title quakeColor">' + 'Date: <b>' + DateLabel[i] + '</b> Time: <b>' + TimeLabel[i] + '</b>' + ' Epicentral Area: <b>' +  Location[i] + '</b></div>',
								'<div class= "EQinfoIW"><br /> Lat.: <b>' + Lat[i] + '</b> - ', 'Lon.: <b>' + Lon[i] + '</b><br />',
								'Epicentral Intensity: <b>' + Io[i] + '</b><br />',
								'Maximum Intensity: <b>' + Imax[i] + '</b><br />',
								'Equivalent Magnitude: <b>' + Me[i] + '</b><br />',
								'Number of Macroseismic Observations: <b>' + iNP[i] + '</b><br /><br />',
								'<a href="' + QuakePage  + 'EN" target="_blank"> Earthquake page </a> <br /><br /></div>'].join('\n');
			var CommAntrEN = ['<br /><span style="text-transform: uppercase;">Effects on the built environment: </span><br />',
							'<div class="LocComm">' + D1commLOC_EN[i] + '<br /><br />',
							'</div>'].join('\n')
			var CommEnvEN = ['<span style="text-transform: uppercase;">Effects on the natural environment: </span><br />',
							'<div class="LocComm"><p align="left"><table>'+ E1listLOC[i] + '</table></p><hr class="EEline">' + E1commLOC_EN[i] + '<br /></div>'].join('\n')

			var titleLocIT = ['<div class="iw-title localityColor"><b>' + sLoctot + '</b> - Intensità MCS: '+ '<b>' + sISrom[i] +' </b></div>'];

			var quakeDetailsIT = ['<div class="iw-title quakeColor">' + 'Data: <b>' + DateLabel[i] + '</b> Ora: <b>' + TimeLabel[i] + '</b>' + ' Area epicentrale: <b>' +  Location[i] + '</b></div>',
							'<div class= "EQinfoIW"><br /> Lat.: <b>' + Lat[i] + '</b> - ',	'Lon.: <b>' + Lon[i] + '</b><br />',
							'Intensità Epicentrale: <b>' + Io[i] + '</b><br />',
							'Intensità Massima: <b>' + Imax[i] + '</b><br />',
							'Magnitudo Equivalente: <b>' + Me[i] + '</b><br />',
							'Numero di osservazioni macrosismiche: <b>' + iNP[i] + '</b><br /><br />',
							'<a href="' + QuakePage + 'IT" target="_blank"> Pagina del terremoto </a> <br /><br /></div>'].join('\n');

			var CommAntrIT = ['<br /><span style="text-transform: uppercase;">Effetti sul contesto antropico: </span><br />',
							'<div class="LocComm">' + D1commLOC_IT[i] + '<br /><br />',
							'</div>'].join('\n')
			var CommEnvIT = ['<span style="text-transform: uppercase;">Effetti sull\'ambiente naturale: </span><br />',
							'<div class="LocComm"><table>'+ E1listLOC[i] + '</table><hr class="EEline">' + E1commLOC_IT[i] + '<br /></div>'].join('\n')

			// -- different types of infow. based on type of comments available for each quake
			//if (Flagcomments[i] == 4) {
			if (E1commLOC[i]!= '' && D1commLOC[i] != '') {
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsEN, titleLocEN, '<div class="commentsIW">', CommAntrEN, '<hr>', CommEnvEN,
					'</div></div>' ].join('\n');

				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsIT, titleLocIT, '<div class="commentsIW">', CommAntrIT, '<hr>', CommEnvIT,
					'</div></div>' ].join('\n');

			} else if (E1commLOC[i]== '' && D1commLOC[i] != '') {
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsEN, titleLocEN, '<div class="commentsIW">', CommAntrEN,
					'</div></div>' ].join('\n');

				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsIT, titleLocIT, '<div class="commentsIW">', CommAntrIT,
					'</div></div>' ].join('\n');

			} else if (E1commLOC[i]!= '' && D1commLOC[i] == '') {
				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsEN, '<div class="iw-title localityColor"><b>' + sLoctot + '</b></div>', '<br />', '<div class="commentsIW">', CommEnvEN,
					'</div></div>' ].join('\n');

				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					quakeDetailsIT, '<div class="iw-title localityColor"><b>' + sLoctot + '</b></div>', '<br />', '<div class="commentsIW">', CommEnvIT,
					'</div></div>' ].join('\n');
			}



			//-------    TEXT FOR EPICENTER POPUP WINDOW TO SHOW WHEN PQ IS ON
			//           (without description of effects at locality) !!!!!!!!! NOT USED IN FACT   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			EQ_textEN[i] = [
				// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
				quakeDetailsEN,
				'</div>' ].join('\n');

			EQ_textIT[i] = [
				// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
				quakeDetailsIT,
				'</div>' ].join('\n');

			indexEQ[i] = i;

			/******TODO GESTIONE VISUALIZZAZIONE STELLE TERREMOTI CON OL*****/
			singleFeature.OnClickTextIT = OnClickTextIT;

			// l'ordine di openPopup e oms.addmarker (ora in showquakes) decide chi parte prima tra openpopup e spiderfy!!

			/////TODO GESTIONE POPUP PASSA INFORMAZIONI OnClickTextEN e OnClickTextIT poi aggiunge delle info e infine il text assegnato e' nella variabile textIT
			/////TODO infowindow.setContent(textIT);
			openPopupSpider(singleFeature, OnClickTextEN, OnClickTextIT, Nterr[i], Lat[i], Lon[i]);
			//onClickMarker(indexEQ[i], marker)
			//TODO NEW Evento onclick con aggiunta di highlightBar sulla barra del grafico
			onClickMarker(indexEQ[i], singleFeature);
			epiMarkers.push(singleFeature);

		}
	}

	// -----------------    Export variableKML
	ExportKml = "";
		jQuery.get('KML/locality_a.txt', function(data){
			ExportKml = data;
			ExportKml = ExportKml + "<Folder>"+ CarRet + "<name>CFTI5Med - Locality - " + sLoctot + "</name>"+ CarRet ;
			ExportKml = ExportKml + "<open>1</open>"+ CarRet;
			ExportKml = ExportKml + "<description>"+ CarRet;
			ExportKml = ExportKml + "<![CDATA[<body><a href="+virg+"http://storing.ingv.it/cfti/cfti5/"+virg+"> <img src="+virg+"http://storing.ingv.it/cfti/cfti5/images/banner_CFTI_newG_thin_EN"+virg+" alt="+virg+"Logo CFTI5Med"+virg+" height="+virg+"32px"+virg+"></a></body>]]>"+ CarRet;
			ExportKml = ExportKml + "</description>"+ CarRet;
			ExportKml = ExportKml + "</Folder>" + CarRet;
			ExportKml = ExportKml + "<Folder><name>Locality</name>" + CarRet;
			ExportKml = ExportKml + "<Placemark> <name>" + sLoctot + "</name>" + CarRet + "<description><![CDATA["
			ExportKml = ExportKml + "<b>" + sLoctot + "</b><br><i>" + noteexp + "</i><br><br>Latitude: <b>" + locLat + "</b> <br>Longitude: <b>" + locLon + "</b> <br><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/locality.php?" + nloc + "EN" + virg + ">Locality page </a></b>"+ CarRet;
			ExportKml = ExportKml + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + locLon + "</longitude>" + CarRet + "<latitude>" + locLat + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#LOC</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ locLon + ","+ locLat + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>" + CarRet + "</Folder>"  + CarRet

			ExportKml = ExportKml + "<Folder><name>Earthquakes</name>";

			ExportKml = ExportKml + ExportKmlR;

			jQuery.get('KML/locality_b.txt', function(dataB){
				ExportKml = ExportKml + dataB;
		})
	})


	showQuakes();
	createTable();

	// set page title
	document.getElementById('title').innerHTML = 'CFTI5Med ' + sLoctot;

	// set location title - max number of characters (without province) is 55
	if (sLoctot.length > 48) document.getElementById('Intro').innerHTML = '<center><font size="2em">' + sLoctot + '</a></font></center><p style="font-weight:normal;"><i>' + noteLoc + '</i></p>';
	else if (sLoctot.length > 46 && sLoctot.length < 49) document.getElementById('Intro').innerHTML = '<center><font size="3em">' + sLoctot + '</a></font></center><p style="font-weight:normal;"><i>' + noteLoc + '</i></p>';
	else document.getElementById('Intro').innerHTML = '<center><font size="4em">' + sLoctot + '</a></font></center><p style="font-weight:normal;"><i>' + noteLoc + '</i></p>';

	document.getElementById('WikiLink').innerHTML = '<abbr title= "Link alla pagina Wikipedia"><a href="https://it.wikipedia.org/wiki/' + desloc + '" target="_blank"> <img src="images/wiki.jpg" width= "25" vertical-align="-35px"/></a></abbr>';
}


function resizeTable(NT, NP){
	if (NT==1 && NP ==0){
		document.querySelector('#feltrep').style.height = Math.round( h -350)+'px';
		// document.querySelector('#Loc_info tbody').style.height = Math.round( h -390)+'px';
		document.querySelector('#Loc_info tbody').style.height = Math.round( h -380)+'px';
		document.querySelector('#Loc_info').style.height = Math.round( h -350)+'px';
	} else if (NT==0 && NP ==1){
		document.getElementById("EEnperiod").style.display = "block";
		document.getElementById("Loc_info_NP").style.display = "initial";

		document.getElementById("Loc_info").innerHTML = "<br /><span id='NoNterrLOC'></span><br /><br /><br />";
		document.querySelector('#EEnperiod').style.marginTop = '340px';
		document.querySelector('#EEnperiod').style.height = Math.round( h -330)+'px';
		document.querySelector('#Loc_info_NP tbody').style.height = Math.round( h -390)+'px';
		document.querySelector('#Loc_info_NP').style.height = Math.round( h -340)+'px';
	} else{
		document.getElementById("EEnperiod").style.display = "block";
		document.getElementById("Loc_info_NP").style.display = "initial";

		document.querySelector('#Loc_info tbody').style.height = Math.round( h -285 -180 -60 -40)+'px';
		document.querySelector('#Loc_info').style.height = Math.round( h -285 -180 -60)+'px';
		document.querySelector('#Loc_info_NP tbody').style.height = '130px';
		document.querySelector('#Loc_info_NP').style.height = '140px';
		// document.querySelector('#Loc_info_NP').style.bottom = '0px';
		document.querySelector('#EEnperiod').style.bottom = '0px';
		document.querySelector('#EEnperiod').style.height = '180px';
	}
}

// ==========================================================================================
//											PQ
// ==========================================================================================

//   FUNCTIONS TO READ PQ AND CORRESPONDING EE: sono tutte annidate tra loro perchè avevamo problemi con l'ordine di esecuzione. Non elegante, ma funziona

function showPQ(num){
	console.log('showPQ.....');
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;
	// n può essere l'indice della riga oppure un nterr, nel caso che la funzione sia lanckata dalla tabella degli EE per nperiod
	if (typeof num.length != 'undefined'){
		xmlService = './quakeSources/' + num + '.xml';
		nRow = num;
	}
	else {
		nRow = num - 1;
		NterrPQ = Nterr[nRow];
		xmlService = xmlServicePQ[nRow]
	}
	var ajaxUpdater = new Manajax(xmlService);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parsePQData;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();
}

function parsePQData(XmlText){
	console.log('parsePQData.....');
	XMLLocList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLLocListArrived = true;
	nper = XMLLocList.getElementsByTagName("nperiod")[0].childNodes[0].nodeValue;
	checkEE();
}

function checkEE(){
	console.log('checkEE.....');

	var k = 0;
	if(EEall.length > 0){
		// svuotare le variabili rispetto precedente PQ
		EE_nperiod = []
		EE_nterr = []
		EE_nloc = []
		EE_loc = []
		EE_locNote = []
		EE_comm = []
		EE_codeff = []
		EE_Lat = []
		EE_Lon = []
		for (var i = 0; i < EEall.length; i++){
			var sNP = XMLEEList.getElementsByTagName("NPERIOD")[i].childNodes[0].nodeValue;

			if (sNP == nper) {
				EE_nperiod[k] = nper;
				if (XMLEEList.getElementsByTagName("NTERR").length == 0) EE_nterr[k] = ""
				else if  (XMLEEList.getElementsByTagName("NTERR")[i].childNodes.length == 0) EE_nterr[k] = ""
				else EE_nterr[k] = XMLEEList.getElementsByTagName("NTERR")[i].childNodes[0].nodeValue;

				EE_nloc[k] = XMLEEList.getElementsByTagName("NLOC_CFTI")[i].childNodes[0].nodeValue;
				var EE_desloc = XMLEEList.getElementsByTagName("DESLOC_CFTI")[i].childNodes[0].nodeValue;
				var flagProv = XMLEEList.getElementsByTagName("PROVLET")[i].childNodes.length;
				if (flagProv > 0) {
					var EE_prov = XMLEEList.getElementsByTagName("PROVLET")[i].childNodes[0].nodeValue;
				}
				var flagCount = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes.length;
				if (flagCount > 0) {
					var EE_country = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes[0].nodeValue;
				}
				if (EE_prov != '-') EE_loc[k] = EE_desloc + ' (' + EE_prov + ')'
				else EE_loc[k] = EE_desloc + ' (' + EE_country + ')'

				EE_comm[k] = XMLEEList.getElementsByTagName("COMMENTO")[i].childNodes[0].nodeValue;

				EE_locNote[k] = XMLEEList.getElementsByTagName("NOTESITO")[i].childNodes[0].nodeValue;
				if (EE_locNote[k] == '-') EE_locNote[k] = "";

				EE_codeff[k] = XMLEEList.getElementsByTagName("CODICE_EFF")[i].childNodes[0].nodeValue;
				EE_Lat[k] = parseFloat(XMLEEList.getElementsByTagName("LAT_WGS84")[i].childNodes[0].nodeValue).toFixed(3);;
				EE_Lon[k] = parseFloat(XMLEEList.getElementsByTagName("LON_WGS84")[i].childNodes[0].nodeValue).toFixed(3);
				k = k+1
			}
		}
	}
	// call function to parse PQ data
	parsePQData2();
}

/**
 * Funzione invocata al click delle singole locality nella tabella di sinistra.
 * @param XmlText
 */
function parsePQData2(XmlText){
	console.log("parsePQData2 called .... xmlText" + XmlText);
	PQMarkersOL = []; //reinizializza variabile
	flagPQ = 0
	var boundsPQ = new google.maps.LatLngBounds();

	// -------------   CLEAR MAP AND TURNOFF BAR
	//FUNZIONE SETMAP non piu utilizzabile con OPENLAYER
	/*if (PQMarkersOLD.length > 0){
		for (var ii = 0; ii < PQMarkersOLD.length; ii++) {
			PQMarkersOLD[ii].setMap(null);
		};
	}

	if (EEMarkersOLD.length > 0){
		for (var ii = 0; ii < EEMarkersOLD.length; ii++) {
			// questo if serve perchè gli EE non ci sono per tutti gli indici del vettore (questi sono gli EE per cui c'è anche un punto di PQ, ma non ci sono EE per tutti i punti di PQ...)
			if (EEMarkersOLD[ii]) {
				EEMarkersOLD[ii].setMap(null);
			}
		};
	}*/

	if (HLbar == 1){
		turnoffBar()
	}

	deleteEpi();
	//funzionalita' di googleMap non piu utilizzata
	//markerLOC.setMap(null);
	//ripulisce i 2 layer uno di QUAKES e uno di PINPOINT
	puliziaClearAllMapsLayers();

	// ----------   clear array before filling it up again
	PQMarkers = [];
	EEMarkers = [];
	EEMarkersOLD = [];

	// -----------   READ EPICENTER COORD FROM XML AND CREATE EPICENTER marker
	var latEpiPQ = parseFloat(XMLLocList.getElementsByTagName("lat")[0].childNodes[0].nodeValue).toFixed(3);
	var lonEpiPQ = parseFloat(XMLLocList.getElementsByTagName("lon")[0].childNodes[0].nodeValue).toFixed(3);
	//vecchio Gmaps - oggetto
	//var StarBIG = {path: EPIpathCALC, fillColor: '#ffffff', fillOpacity: 0.6, anchor: new google.maps.Point(125,125), strokeWeight: 2, strokeColor:red, scale: 0.15};


	var epiBIG = new ol.Feature({
		geometry: new ol.geom.Point(new ol.proj.fromLonLat([lonEpiPQ, latEpiPQ])),
		title : "",
		type: "bigStar",
		OnClickTextIT : "",
	});

	var strokeString = new String();
	var strokeWidthString = new String();
	var fillString = new String()

	var stella = `<svg viewBox="0 0 250 250" {height} {width} xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z" {fill} {stroke} {widthS} /></svg>`;

	var compiled = template(stella, {
		stroke:  String().concat("stroke=\"","red",'\"'),
		widthS: String().concat("stroke-width=\"","16",'\"'), // inizialmente era 4 aumentato a 3 volte tanto
		fill:	String().concat("fill=\"","#FFFFFF",'\"'),
		height: String().concat("height=\"",'200px','\"'),
		width: String().concat("width=\"",'200px','\"')
	});

	//assegno la stringa svg parametrizzata
	var workingSvg = compiled;
	var stileIcone = new ol.style.Style({
	image: new ol.style.Icon({
		opacity: 0.8, //parametro opacity
		src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
		scale:  0.15//parametro scale moltiplicato per ingrandire le stelle
	}),
		zIndex: 1000
	});

	epiBIG.setStyle(stileIcone);

	/******TODO: EpiBIG SOSTITUIRE GLI OGGETTI GOOGLE CON OL *****/
	/*epiBIG = new google.maps.Marker({
		position: new google.maps.LatLng(latEpiPQ, lonEpiPQ),
		map: map,
		// title: DateLabel[i],
		clickable: false,
		icon: StarBIG,
		zIndex: 1000
	});*/


	// ------------------------    PARSE PQ DATA FROM XML   --------------------------------
	var locPQ = XMLLocList.documentElement.getElementsByTagName("Locality");
	var sISromPQ = [];
	var fISPQ = [];
	var locPQlat = [];
	var locPQlon = [];
	var locPQname = [];
	var locPQprov = [];
	var nlocPQ = [];
	var D1comm = [];
	var E1comm = [];

	var D1commIT = [];
	var E1commIT = [];
	var D1commEN = [];
	var E1commEN = [];

    // --- variables for markers
	var scalePQ = 0.9;
	var strokePQ = 0.8;
	var EEcolor = '#30a559';

	if (flagEEloc[nRow] == 0) var strokeColLOC = 'black'
	else var strokeColLOC = EEcolor;

	var pathPQ = "M13,14H2c-0.5523,0-1-0.4477-1-1V2c0-0.5523,0.4477-1,1-1h11c0.5523,0,1,0.4477,1,1v11C14,13.5523,13.5523,14,13,14z";
	var stileIcone ;
	if(locPQ.length > 0){
		for (var i = 0; i < locPQ.length; i++){

			sISromPQ[i] = XMLLocList.getElementsByTagName("intpq")[i].childNodes[0].nodeValue;
			fISPQ[i] = parseFloat(XMLLocList.getElementsByTagName("intpqnum")[i].childNodes[0].nodeValue);

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

			var lenComm = XMLLocList.getElementsByTagName("COMM")[i].childNodes.length;

			var FlagcommentsPQ = XMLLocList.getElementsByTagName("flagcomments")[0].childNodes.length ? XMLLocList.getElementsByTagName("flagcomments")[0].childNodes[0].nodeValue : ''

			if (FlagcommentsPQ == 4) {
				if (lenComm > 0) {
					D1comm[i] = XMLLocList.getElementsByTagName("COMM")[i].childNodes[0].nodeValue;
				} else {
					D1comm[i] = "";
				}
			} else if (FlagcommentsPQ == 2) D1comm[i] = '<span class="flag2descr">' + flag2descr[Langsel] + '</span>'
			else if (FlagcommentsPQ == 3) D1comm[i] = '<span class="flag3descr">' + flag3descr[Langsel] + '</span>'
			else if (FlagcommentsPQ == 1 || FlagcommentsPQ == 5) D1comm[i] = '<span class="flag1descr">' + flag1descr[Langsel] + '</span>'
			else D1comm[i] = ''

			E1comm[i] = '';

			// -----------------    PQ MARKERS FOR LOCALITIES  - SVG   ----------------------------

			// if (fISPQ[i] >= 11) var fillCol = '#3c0a63';
			// if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) var fillCol = '#7413c1';
			// if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) var fillCol = '#a00801';
			// if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) var fillCol = '#d62a17';
			// if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) var fillCol = '#ff6614';
			// if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) var fillCol = '#ffad0a';
			// if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) var fillCol = '#f7e13b';
			// if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) var fillCol = '#f7e69b';
			// if (fISPQ[i] <= 3.9 ) var fillCol = '#ffffff';
			//
			// if (nlocPQ[i] == nloc) {
			// 	var icon = {
			// 		path: LOCpath,
			// 		fillColor: fillCol,
			// 		fillOpacity: 1,
			// 		anchor: new google.maps.Point(7 , 15),
			// 		strokeWeight: strokeLoc + 1,
			// 		strokeColor: strokeColLOC,
			// 		scale: scaleLoc,
			// 		zIndex: 10000
			// 	}
			// } else {
			// 	var icon = {
			// 		path: pathPQ,
			// 		fillColor: fillCol,
			// 		fillOpacity: 1,
			// 		anchor: new google.maps.Point(PQanchor1 , PQanchor2),
			// 		strokeWeight: strokePQ,
			// 		scale: scalePQ
			// 	}
			// }

			// -----------------    PQ MARKERS FOR LOCALITIES  - PNG (per località sempre svg per goccia)   ----------------------------
////////////////////////////TODO GESTIONE LOCALITA DOPO AVER CLICCATO SULLA TABELLA /////////////////////

			/****preparazione markerPq ----- plot PQ ****/
			var markerPQ = new ol.Feature({
				id: i,
				geometry: new ol.geom.Point(new ol.proj.fromLonLat([locPQlon[i], locPQlat[i]])),
				title : "",
				type: "localityPQ",
				OnClickTextIT : "",
			});

			/*****MARKER PQ o in un modo o in un altro ******/
			if (nlocPQ[i] == nloc) {
				/**************GESTIONE COLORI MARKER PINPOINT ******/
				if (fISPQ[i] >= 11) var fillCol = '#3c0a63';
				if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) var fillCol = '#7413c1';
				if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) var fillCol = '#a00801';
				if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) var fillCol = '#d62a17';
				if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) var fillCol = '#ff6614';
				if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) var fillCol = '#ffad0a';
				if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) var fillCol = '#f7e13b';
				if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) var fillCol = '#f7e69b';
				if (fISPQ[i] <= 3.9 ) var fillCol = '#ffffff';

				//fill: fillCol,
				//stroke: strokeColLOC,
				//scale 2
				var strokeString = new String();
				var strokeWidthString = new String();
				var fillString = new String()

				compiled = template(pinpointLOCpath, {
					stroke:  String().concat("stroke=\"",strokeColLOC,'\"'),
					fill:	String().concat("fill=\"",fillCol,'\"'),
				});
				//assegno la stringa svg parametrizzata
				var workingSvg = compiled;
				stileIcone = new ol.style.Style({
					image: new ol.style.Icon({
						opacity: 1, //parametro opacity
						src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
						scale:  2//parametro scale moltiplicato per ingrandire le stelle
					}),
					zIndex: 10000
				});
				markerPQ.values_.type = "pinpoint";
				markerPQ.setStyle(stileIcone);
				/*
				var icon = {
					path: LOCpath,
					fillColor: fillCol,
					fillOpacity: 1,
					anchor: new google.maps.Point(7 , 15),
					strokeWeight: strokeLoc + 1,
					strokeColor: strokeColLOC,
					scale: scaleLoc,
					zIndex: 10000
				}*/
			} else {

			/**************GESTIONE COLORI MARKER LOCALITY ******/
				/*if (fISPQ[i] >= 11) {var icon = {url: "images/IS/11.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) {var icon = {url: "images/IS/10.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) {var icon = {url: "images/IS/9.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) {var icon = {url: "images/IS/8.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) {var icon = {url: "images/IS/7.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) {var icon = {url: "images/IS/6.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) {var icon = {url: "images/IS/5.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) {var icon = {url: "images/IS/4.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
				if (fISPQ[i] <= 3.9 ) {var icon = {url: "images/IS/3.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}*/
				if (fISPQ[i] >= 11) { markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 10.9 && fISPQ[i] > 9.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 9.9 && fISPQ[i] > 8.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 8.9 && fISPQ[i] > 7.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 7.9 && fISPQ[i] > 6.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 6.9 && fISPQ[i] > 5.9 ) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 5.9 && fISPQ[i] > 4.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 4.9 && fISPQ[i] > 3.9) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4.png', size: [13, 13], scale: 0.85})}));}
				if (fISPQ[i] <= 3.9 ) {markerPQ.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3.png', size: [13, 13], scale: 0.85})}));}
				markerPQ.type = "localityPQ";
			}

			/******TODO SOSTITUIRE GLI OGGETTI GOOGLE CON OL  FATTO SOPRA *****/
			// ----- plot PQ
			/*var markerPQ = new google.maps.Marker({
				position: new google.maps.LatLng(locPQlat[i], locPQlon[i]),
				map: map,
				//title: Year[i] + ' ' + Month[i] + ' ' + Day[i],
				icon: icon
			});/*/
			/* gestione extent google maps vecchia gestione
			boundsPQ.extend(markerPQ.getPosition());
			boundsPQ.extend(epiBIG.getPosition());*/
			PQMarkers.push(markerPQ);

		}

		// ===========================     READ BIBLIOGRAPHY    ===================================================
		var biblioListPQ = readBiblio(XMLLocList, "Bibliography");
		var codbibPQ = biblioListPQ[0]
		var titolobibPQ = biblioListPQ[1]
		var annobibPQ = biblioListPQ[2]
		var placebibPQ = biblioListPQ[3]
		var authorbibPQ = biblioListPQ[4]

		// -------------------------- EE EFFECTS --------------------------------------------

		// ------ marker EE only ovvero quadrato Bianco NON SERVE PIU DICHIARATO CONTESTUALMENTE
		/*var iconEEonly = {
            path: pathPQ,
            strokeColor: EEcolor,
            fillOpacity: 0,
            anchor: new google.maps.Point(PQanchor1 , PQanchor2),
            strokeWeight: 2.5,
            scale: scalePQ
        }*/
        //// inizio gestione PINPOINT
		var strokeString = new String();
		var strokeWidthString = new String();
		var fillString = new String()

		var compiled = template(pinpointLOCpath, {
			stroke:  String().concat("stroke=\"",fillCol,'\"'),
			fill:	String().concat("fill=\"",strokeColLOC,'\"'),
		});
		//assegno la stringa svg parametrizzata
		var workingSvg = compiled;
		iconEE_LOC = new ol.style.Style({
			image: new ol.style.Icon({
				opacity: 1, //parametro opacity
				src: 'data:image/svg+xml;utf8,' + escape(workingSvg),
				scale:  2//parametro scale moltiplicato per ingrandire le stelle
			}),
			zIndex: 10000
		});
		//Tradotto sopra
		/*var iconEE_LOC = {
			path: LOCpath,
			fillOpacity: 0,
			anchor: new google.maps.Point(PQanchor1 , PQanchor2),
			strokeWeight: strokeLoc + 1,
			strokeColor: EEcolor,
			scale: scaleLoc
		}*/

		// ----- check if EE for each locality, based on nloc
		var E1list = [];
		var EmoreIn = locPQ.length;
        var nlocEEold;
        var EEdone = [];

        for (var k = 0; k < EE_nloc.length; k++){
            var indEEmore = EEdone.indexOf(EE_nloc[k]);//check if nloc already done
            if (indEEmore == -1) {

				if (EE_nterr[k].length == 5 && EE_nterr[k] == NterrPQ || EE_nterr[k].length != 5){
					var indEE = nlocPQ.indexOf(EE_nloc[k]);

	                E1comm[indEE] = '';
	                E1list[indEE] = '';
					E1listExport[indEE] = '';
	                if (indEE != -1) {
	        			E1comm[indEE] = EE_comm[k];

	                    var indexesPQ = getAllIndexes(EE_nloc, EE_nloc[k]);

	                    for (var indPQ = 0; indPQ < indexesPQ.length; indPQ++) {
							var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeff[indexesPQ[indPQ]])];

							E1listExport[indEE] = E1listExport[indEE] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexesPQ[indPQ]])];

                            E1list[indEE] = E1list[indEE] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeff[indexesPQ[indPQ]] + '.png" width= "18" vertical-align="middle"/></td><td><span class="' + EE_codeff[indexesPQ[indPQ]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
	                    }

						// --------------------------   MARKERS   - .PNG GMAPS convertita sotto
						// if (fISPQ[indEE] >= 11) {var iconEE = {url: "images/IS/11EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 10.9 && fISPQ[indEE] > 9.9) {var iconEE = {url: "images/IS/10EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 9.9 && fISPQ[indEE] > 8.9) {var iconEE = {url: "images/IS/9EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 8.9 && fISPQ[indEE] > 7.9) {var iconEE = {url: "images/IS/8EE.png", sanchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 7.9 && fISPQ[indEE] > 6.9) {var iconEE = {url: "images/IS/7EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 6.9 && fISPQ[indEE] > 5.9 ) {var iconEE = {url: "images/IS/6EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 5.9 && fISPQ[indEE] > 4.9) {var iconEE = {url: "images/IS/5EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 4.9 && fISPQ[indEE] > 3.9) {var iconEE = {url: "images/IS/4EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
            			// if (fISPQ[indEE] <= 3.9 ) {var iconEE = {url: "images/IS/3EE.png", anchor: new google.maps.Point(PQanchor1 , PQanchor2)}}
						if (fISPQ[indEE] >= 11) {var iconEE= new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 10.9 && fISPQ[indEE] > 9.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 9.9 && fISPQ[indEE] > 8.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 8.9 && fISPQ[indEE] > 7.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 7.9 && fISPQ[indEE] > 6.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 6.9 && fISPQ[indEE] > 5.9 ) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 5.9 && fISPQ[indEE] > 4.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 4.9 && fISPQ[indEE] > 3.9) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4EE.png', size: [13, 13], scale: 0.7})});}
						if (fISPQ[indEE] <= 3.9 ) {var iconEE=new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3EE.png', size: [13, 13], scale: 0.7})});}

						if (EE_nloc[k] != nloc) {
							// togli marker precedente (solo int, no EE) e plotta quello nuovo con EE
							// TODO: rimosso perche' esiste solo su GMAPS
							// PQMarkers[indEE].setMap(null)
							var markerEE = new ol.Feature({
								id: k,
								geometry: new ol.geom.Point(new ol.proj.fromLonLat([  locPQlon[indEE], locPQlat[indEE]  ])),//new ol.geom.Point([ EE_Lon[k], EE_Lat[k]] ),
								type:"iconEE",
								style: iconEE,
								ExportKmlR: "",
								OnClickTextIT: "",
							});
							/*  GOOGLE MAPS OBJECT converted
							var markerEE = new google.maps.Marker({
								position: new google.maps.LatLng(locPQlat[indEE], locPQlon[indEE]),
								map: map,
								icon: iconEE,
							});*/
							PQMarkers[indEE] = markerEE;
						}
	                } else {
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
	                    if (EE_nloc[k] != nloc) {
							var eeloconly= `<svg viewBox="0 0 15 15" height="33px" width="33px" xmlns="http://www.w3.org/2000/svg" version="1.1"><path d="M13,14H2c-0.5523,0-1-0.4477-1-1V2c0-0.5523,0.4477-1,1-1h11c0.5523,0,1,0.4477,1,1v11C14,13.5523,13.5523,14,13,14z"  stroke="#30a559" stroke-width="1.8" fill="#ffffff"  /></svg>`;
							var markerEE = new ol.Feature({
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
							markerEE.setStyle(stileIcone);
							/* markerEE only sostituta sopra
							var markerEE = new google.maps.Marker({
		        				position: new google.maps.LatLng(EE_Lat[k], EE_Lon[k]),
		        				map: map,
		        				//title: Year[i] + ' ' + Month[i] + ' ' + Day[i],
		        				icon: iconEEonly,
		        			});*/
		        			PQMarkers[EmoreIn] = markerEE;
						} else {
							var markerEE = new ol.Feature({
								id: k,
								geometry: new ol.geom.Point(new ol.proj.fromLonLat([  locLon,locLat  ])),//new ol.geom.Point([ EE_Lon[k], EE_Lat[k]] ),
								type:"iconEE",
								style: iconEE_LOC,
								ExportKmlR: "",
								OnClickTextIT: "",
							});
	                    	/////TODO GESTIONE MARKERS DA SOSTITUIRE V GOOGLE MAPS  iconaEE LOC effetti ambientali//////
							/*var markerEE = new google.maps.Marker({
		        				position: new google.maps.LatLng(locLat, locLon),
		        				icon: iconEE_LOC,
								zIndex: 10000
		        			});*/
		        			PQMarkers[EmoreIn] = markerEE;
						}

	                    //vecchia gestione gmaps
						//boundsPQ.extend(markerEE.getPosition());

						// loop through all EE at that locality
	                    var indexes = getAllIndexes(EE_nloc, EE_nloc[k]);
	                    for (var ind = 0; ind < indexes.length; ind++) {
							var abbrEEtype = class_titleEE_IT[class_codeEE.indexOf(EE_codeff[indexes[ind]])];
							E1listExport[EmoreIn] = E1listExport[EmoreIn] + " - " + class_titleEE_EN[class_codeEE.indexOf(EE_codeff[indexes[ind]])];

                            E1list[EmoreIn] = E1list[EmoreIn] + '<tr><td width="25px"><img src="images/EE/color/'+ EE_codeff[indexes[ind]] + '.png" width= "18" vertical-align="middle"/></td><td><span class="' + EE_codeff[indexes[ind]] + '_IW">' +  abbrEEtype  + "</span></td></tr>";
	                    }
	                    EmoreIn = EmoreIn + 1;
	                }
	                console.log('verificare la variabile EEDone..... ');
	                EEdone.push(EE_nloc[k]);
	                console.log(EEdone);
				}
            }
        }


		// --------------------    INFOWINDOWS GESTIONE POPUP FOR PQ LOCALITIES ----------------------------
        for (var i = 0; i < locPQname.length; i++){

			// FIX COMMENTS REFERENCES
	        if (E1comm[i]!= ''){
	            E1commIT[i] = createREF(E1comm[i], nper, codbibPQ, authorbibPQ, titolobibPQ, annobibPQ, placebibPQ, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
				E1commEN[i] = createREF_EN(E1comm[i], nper, codbibPQ, authorbibPQ, titolobibPQ, annobibPQ, placebibPQ, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
	        }
			if (D1comm[i]!= ''){
	            D1commIT[i] = createREF(D1comm[i], nper, codbibPQ, authorbibPQ, titolobibPQ, annobibPQ, placebibPQ, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
				D1commEN[i] = createREF_EN(D1comm[i], nper, codbibPQ, authorbibPQ, titolobibPQ, annobibPQ, placebibPQ, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT);
	        }

			// -- define url to locality page
			var LocalityPage = createLocalityPageLink(window.location.href, nlocPQ[i], 'locality')

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
			//console.log('inizio gestione popupPQ per PQMarkers EEMarkers epiBIG');
			openPopupPQ(PQMarkers[i], OnClickTextEN, OnClickTextIT)
			if (EEMarkers[i]) openPopupPQ(EEMarkers[i], OnClickTextEN, OnClickTextIT);

		}// chiusura ciclo for per gli elementi feature
		openPopupPQ(epiBIG, EQ_textEN[nRow], EQ_textIT[nRow])
		PQMarkersOL.push(epiBIG);  //aggiunge stella grande
		//layer da renderizzare su MapOL
		for (var i = 0; i < PQMarkers.length; i++) {
			PQMarkersOL.push(PQMarkers[i]);
		}
		for (var i = 0; i < EEMarkers.length; i++) {
			PQMarkersOL.push(EEMarkers[i]);
		}
	}
	// -------  save PQ markers for later
	console.log('save PQ markers for later1');
	for (var ii = 0; ii < PQMarkers.length; ii++) {
		PQMarkersOLD[ii] = PQMarkers[ii]
	};
	console.log('save PQ markers for later2');
	for (var ii = 0; ii < EEMarkers.length; ii++) {
		EEMarkersOLD[ii] = EEMarkers[ii]
	};

	// ------- additional map and table settings
	console.log("dati passati a onclickListLocalityOnlyZoom");
	console.log(nRow);
	//in questa funzione ONCLICK se non dovesse funzionare l'evidenza in giallo sulla tabella a SX sara in futuro oggetto di ulteriore indagine.
	onclickListLocalityOnlyZoom(nRow);

	//funzionalita di google maps non piu utilizzata
	//map.fitBounds(boundsPQ);

	// if (PQMarkers.length < 2 	) {
	// 	mapOL.setZoom(8);
	// }
	//infowindow.close();
	flagPQ = 1;

	// ------- turn on PQ legend
	document.getElementById("legend").style.display = "none";
	document.getElementById("legendmin").style.display = "none";
	document.getElementById("legendPQ").style.display = "inline";

	/******TODO CHIAMARE UNA FUNZIONALITA CHE MOSTRA SU MAPPA IL LAYER E RIMUOVE GLI ALTRI******/
	creazioneMappaLocalityPHP(PQMarkersOL);
}


// ==================   OPEN POPUP WINDOW FOR PQ
function openPopupPQ(marker, textEN, textIT){
	//Vecchia gestione google map non piu presente
	//google.maps.event.addListener(marker, 'click', function() {
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
			marker.OnClickTextIT = textEN;   //Testo popup iniziale
			marker.ContentPopupText = textEN;
		} else {
            textIT = textIT.split(biblioEQ_pdfT_abbrEN).join(biblioEQ_pdfT_abbrIT)
			textIT = textIT.split(biblioEQ_pdfR_abbrEN).join(biblioEQ_pdfR_abbrIT)
			textIT = textIT.split(flag1descr['EN']).join(flag1descr['IT'])
 		    textIT = textIT.split(flag2descr['EN']).join(flag2descr['IT'])
 		    textIT = textIT.split(flag3descr['EN']).join(flag3descr['IT'])
 		    textIT = textIT.split(flagMED1descr['EN']).join(flagMED1descr['IT'])
 		    textIT = textIT.split(flagMED2descr['EN']).join(flagMED2descr['IT'])
			for (var i=0; i<class_codeEE.length; i++){
				textIT = textIT.split(class_titleEE_EN[i]).join(class_titleEE_IT[i])
			}
			marker.OnClickTextIT = textIT;   //Testo popup iniziale
			marker.ContentPopupText = textIT;
		}

		// open popup window GOOGLE MAPS
		//
		// infowindow.open(map, marker);

		// $('section').translatable({
		//   contentNodeSelector     : 'span.gtranslate'
		// , translateButtonSelector : 'a[href="#translate"]'
	  	//        , autoChangeButtonText    : false
	  	//        , language                : 'en'
	  	//        , debug                   : true
		// });
		// })
}


var textcomm = [];

// ==================   CREATE TABLE
function createTable() {

	// Write out how many events are shown
	NumEqSel = document.getElementById("NumSel");
	document.getElementById("NumSel").style.marginTop = "257px";
	if (Langsel == "EN") NumEqSel.innerHTML = "<b>" + DateLabel.length + ' </b><span id="numEqLOC"> events</span>';
	else  NumEqSel.innerHTML = "<b>" + DateLabel.length + ' </b><span id="numEqLOC"> eventi</span>';
	iMarker = DateLabel.length;

	// --------    table body
	for (var i = 0; i < DateLabel.length; i++) {
		//var parameters;
		var tbody = document.getElementById('loc_data');
		var row = document.createElement("tr");
		row.setAttribute('id', Nterr[i]);

		var cell1 = document.createElement("td");
		cell1.setAttribute('class', 'int');
		cell1.setAttribute('data-text', fIS[i]);

		if (sISrom[i] == '') cell1.innerHTML = ''
		else {
			if (FlagcommentsLOC[i]==4) textcomm[i] = removeDollars(D1commLOCAbbr[i]);
			else textcomm[i] = D1commLOCAbbr[i];

			if (textcomm[i].length > 1200) {
				textcomm[i] = textcomm[i].slice(0,1200) + " [...]";
			}
			//parameters=String().concat(i.toString(),",","\"",Nterr[i],'\"');
			cell1.innerHTML =  '<div class="IntContainer"><a onclick=onclickListLocality('+i+') href="#">' + sISrom[i] + '</a><span class="tooltiptext">' + textcomm[i] + '</span></div>';
		 }

		var cell2 = document.createElement('td');
		cell2.setAttribute('class', 'nat');
		if (E1listLOC[i] != '') {
			cell2.innerHTML = '<div class="EEContainer"><a onclick=onclickListLocality('+i+') href="#">' + symbolEE[i] + '</a><span class="tooltiptext_EE"><table>' + E1listLOC[i] + '</table></span></div>'
		} else { cell2.innerHTML = '';
		};

		date = 	parseInt(Year[i] + Month[i] + Day[i])	//////////////////////////////////////////////////////////////
		var cell3 = document.createElement('td');
		cell3.setAttribute('class', 'date');
		cell3.setAttribute('data-text', date);
		cell3.innerHTML = '<a onclick=onclickListLocality('+i+') href="#">' + DateLabel[i] + '</a>' ;

		var cell4 = document.createElement("td");
		cell4.setAttribute('class', 'time');
		cell4.innerHTML = TimeLabel[i];

		var cell5 = document.createElement("td");
		cell5.setAttribute('class', 'io');
		cell5.innerHTML = Io[i];

		var cell6 = document.createElement("td");
		cell6.setAttribute('class', 'imaxLoc');
		cell6.innerHTML = Imax[i];

		var cell7 = document.createElement("td");
		cell7.setAttribute('class', 'sites');
		cell7.innerHTML = iNP[i];

		var cell8 = document.createElement("td");
		cell8.setAttribute('class', 'me');
		cell8.innerHTML = Me[i];

		var cell9 = document.createElement("td");
		cell9.setAttribute('class', 'location');
		cell9.innerHTML = Location[i];

		var cell10 = document.createElement("td");
		cell10.setAttribute('class', 'mapbut');
		cell10.innerHTML = '<a type = "button" class="more"><img src="images/gm.png" width="17px" onclick="showPQ('+(i+1)+ ')"></a>'

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		row.appendChild(cell6);
		row.appendChild(cell7);
		row.appendChild(cell8);
		row.appendChild(cell9);
		row.appendChild(cell10);
		tbody.appendChild(row);
		document.getElementById("Loc_info").style.display = "initial";
	};

	// Table sorting
	$(document).ready(function() {
		// call the tablesorter plugin
		$("#Loc_info").tablesorter({
			//	sort on the first, second and third (order desc) column
			sortList: [[0,1],[2,0],[3,0]]
		});
	});

 	// NOW SET LANGUAGE TO FILL IN ALL DIVS/ABBRS/SPANS....
	new LanguageTools().setLanguage(Langsel);
	
	google.charts.load('45', {packages: ['corechart']})
	google.charts.setOnLoadCallback(drawChart);

};


// ---------------------- GRAFICO
function drawChart() {

	chart = new google.visualization.ColumnChart(
		document.getElementById('IntGraph'));
		dataChart = new google.visualization.DataTable();
		dataChart.addColumn( 'datetime', 'timevent');
		dataChart.addColumn( 'number', 'intensty');
		dataChart.addColumn({type: 'string', role: 'style'});
		dataChart.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});

	var minY = 2050;
	var maxY = 0;
	for(i = 0; i < DateLabel.length; i++){
		// find minimum and maximum year - for axis limit
		if (Year[i]<minY) minY = Year[i];
		if (Year[i]>maxY) maxY = Year[i];

		n[i] = new Date();
		n[i].setUTCFullYear(Year[i], Month[i]-1, Day[i], Hour[i], Minu[i], Sec[i]) //in realtà l'ora non la considera!!!!!!!!!!!!!!
		d[i] = DateLabel[i] + ' ' +TimeLabel[i]

		if (Langsel=='EN'){
			for (var k = 0; k < class_titleEE_IT.length; k++) {
				E1listLOC[i] = E1listLOC[i].split(class_titleEE_IT[k]).join(class_titleEE_EN[k])
			}
		}

		if (textcomm != ''){
			text = 	 '<div style = "padding:7px 7px 7px 7px; max-width:300px;"><b>' + d[i] + "</b> - Is: " + sISrom[i] + '<br><br>' + textcomm[i] + '<br><hr><table>' + E1listLOC[i] + '</table></div>';
		} else text = 	 '<div style = "padding:7px 7px 7px 7px; max-width:300px;"><b>' + d[i] + ' - EE</b><br><table>' + E1listLOC[i] + '</table></div>';

		dataChart.addRow ([n[i], fIS[i], '#1f708f', text]);
	}

	// fake bars for xlimits (causa date negative, non si riesce altrimenti)
	nmin = new Date(minY-(maxY-minY)/40, 1, 1, 0, 0, 0)
	nmax = new Date(maxY+(maxY-minY)/40, 1, 1, 0, 0, 0)
	if (DateLabel.length == 1){
		nmin = new Date(Year[0]-100, 1, 1, 0, 0, 0)
		nmax = new Date(Year[0]+100, 1, 1, 0, 0, 0)
	}
	texthid = '';
	dataChart.addRow ([nmin, 0, 'transparent', texthid]);
	dataChart.addRow ([nmax, 0, 'transparent', texthid]);


	options = {
		width: 450,
		height: 165,
		chartArea:{left:45,top:10,bottom:20,width: "100%", height: "100%"},
		legend: {position: 'none'},
		backgroundColor: 'transparent',
		bar: {groupWidth: "1"},
		tooltip: {isHtml: true},

		hAxis: {
			title: '',
			textStyle : {
				fontSize: 11,
			},
			viewWindow: {
				// --- min non funziona con date neg, quindi workaround con fake bars - vedi sopra
				//min: new Date(minY-50, 01, 01),
				// max: new Date(maxY+50, 01, 01),
				}
		},
		vAxis: {
			title: 'MCS Intensity',
			textStyle : {
				fontSize: 11,
			},
			titleTextStyle : {
				fontSize: 11,
			},
			viewWindow: {min: 0, max: 12},
			gridlines: {count: 10},
			ticks: [{v:2, f:'II'},{v:3, f:'III'},{v:4, f:'IV'},{v:5, f:'V'},{v:6, f:'VI'},{v:7, f:'VII'},{v:8, f:'VIII'},{v:9, f:'IX'},{v:10, f:'X'},{v:11, f:'XI'}]
		}
	};

    // PER IL GRAFICO DA SALVARE IN PNG
	var options2 = {
		width: 1100,
		height: 300,
		chartArea:{left:80,top:10,bottom:20,width: "100%", height: "100%"},
		legend: {position: 'none'},
		backgroundColor: 'white',
		bar: {groupWidth: "1"},

		hAxis: {
			title: '',
			textStyle : {
				fontSize: 13,
			},
			viewWindow: {
				// --- min non funziona con date neg, quindi workaround con fake bars - vedi sopra
				//min: new Date(minY-50, 01, 01),
				// max: new Date(maxY+50, 01, 01),
				},
			minorGridlines: {count: 9}
		},
		vAxis: {
			title: 'MCS Intensity',
			textStyle : {
				fontSize: 12,
			},
			titleTextStyle : {
				fontSize: 13,
			},
			viewWindow: {min: 0, max: 12},
			gridlines: {count: 10},
			ticks: [{v:2, f:'II'},{v:3, f:'III'},{v:4, f:'IV'},{v:5, f:'V'},{v:6, f:'VI'},{v:7, f:'VII'},{v:8, f:'VIII'},{v:9, f:'IX'},{v:10, f:'X'},{v:11, f:'XI'}]
		}
	};

	var chart2 = new google.visualization.ColumnChart(
		document.getElementById('FakeGraph'));

	var saveIconDiv = document.getElementById('SaveIcon')

	// Wait for the chart to finish drawing before calling the getImageURI() method.
	google.visualization.events.addListener(chart, 'ready', function () {
		saveIconDiv.innerHTML = '<a href="' + chart2.getImageURI() + '" download="chart_' + desloc + '.png"><img src="./images/saveicon.jpg" width = "12px"></a>';
	});
	chart2.draw(dataChart, options2);
	chart.draw(dataChart, options);
	google.visualization.events.addListener(chart, 'select', selnum)

// When closing popup info window:
	// QUESTO ORA é LANCIATO DIRETTAMENTE DALLA INFOWINDOW - CAUSA CROCETTA FATTA DA NOI INVECE CHE DEFAULT GOOGLE
	// google.maps.event.addListener(infowindow,'closeclick',function(){
	// 	// set table row background back to white
	// 	if (flagPQ == 0) turnoffBar();
	// });

	$(function() {
		$('#EnlargeGraph').click(function(event) {
			$('#IntGraphEnl').hide();
			$('#IntGraphRed').show();
			document.querySelector('#IntGraph').style.width = Math.round(w - 30)+'px';
			document.querySelector('#IntGraph').style.backgroundColor='rgba(255,255,255,0.8)';
			options.width = w-40;
			options.backgroundColor='transparent';
			chart.draw(dataChart, options);
		});
		$('#ReduceGraph').click(function(event) {
			$('#IntGraphEnl').show();
			$('#IntGraphRed').hide();
			document.querySelector('#IntGraph').style.width = '450px';
			options.width = 450;
			options.backgroundColor='transparent';
			document.querySelector('#IntGraph').style.backgroundColor='rgba(255,255,255,0.0)';
			chart.draw(dataChart, options);
		});
	});
	$('#loading').hide();
};
