// flags
var flagAccessURL = 0;

var flagPQ = 0;

var param = "Io";

// Google CHART
var n = [];
var d = [];
var chart;
var options;
var HLbar = 0;
var chartArray = [];


var XMLQuakeList;
var XMLQuakeListArrived = false;
var IntervalVar = null;
var MenuPilot = null;
var LogPilot = null;
var GmapsPilot = null;
var markersArray = [];
var markersArrayEE = [];

var infowindow = new google.maps.InfoWindow();

var xmlService = 'QuakeList.xml';
var Nterr1;
var NumEqSel;

var minYearA = 9999; //***GT***
var maxYearA = -9999; //***GT***
var minYear = 9999; //***GT***
var maxYear = -9999; //***GT***
var minYearMed = 9999; //***GT***
var minYearIta = 9999; //***GT***
var maxYearMed = -9999; //***GT***
var maxYearIta = -9999; //***GT***


var maxLatA = -90;
var minLatA = 90;
var minLonA = 180;
var maxLonA = -180;
var maxLat = -90;
var minLat = 90;
var minLon = 180;
var maxLon = -180;
var maxLatMed = -90;
var minLatMed = 90;
var minLonMed = 180;
var maxLonMed = -180;
var maxLatIta = -90;
var minLatIta = 90;
var minLonIta = 180;
var maxLonIta = -180;

var bounds;

var Epicenter;

var CatZone;
var red = '#FF0000';
var NperiodEQ = [];
var NterrEQ = [];
var FlagSel = 0;

// rectangle for coordinates selection
var rectangle;

var latLngBounds;



var GmapsTools = function(){
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;
	//var XMLDoc;

	this.itemName = 'maps';
	this.callBackBlock = 'map';

	this.requestData = function(){
		//new LogTools().addLog('Requesting quakes<br />', 40);
		var ajaxUpdater = new Manajax(xmlService);
		ajaxUpdater.TxType = 'GET';
		ajaxUpdater.responseType = 'xml';
		this.callBackBlock = 'map';
		ajaxUpdater.callBackFunc = this.parseQuakes;
		ajaxUpdater.toScroll = false;
		ajaxUpdater.requestAction();
	}

	// ============== Get data from XML and create data structure 'Markersarray' containing all information, including Gmap markers
	this.parseQuakes = function(XmlText){
		//new LogTools().addLog('Parsing all quakes<br />', 80);
		XMLQuakeList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
		XMLQuakeListArrived = true;
		var markers = XMLQuakeList.documentElement.getElementsByTagName("Quake");

		if(markers.length > 0){
			for (var i = 0; i < markers.length; i++){
				// not empty values needed!!!!
				// obtain attribues of each marker
				var Nterr = markers[i].getElementsByTagName("nterr")[0].childNodes[0].nodeValue;


				var Location = XMLQuakeList.getElementsByTagName("earthquakelocation")[i].childNodes[0].nodeValue;
				var Country = XMLQuakeList.getElementsByTagName("country")[i].childNodes[0].nodeValue;
				var Zone = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;
				var Io = parseFloat(XMLQuakeList.getElementsByTagName("io")[i].childNodes[0].nodeValue);
				var Imax = parseFloat(XMLQuakeList.getElementsByTagName("imax")[i].childNodes[0].nodeValue);

				if (Imax == 9.1) Imax = 9;
				if (Imax == 8.2) Imax = 8;
				if (Imax == 8.1) Imax = 8;
				if (Imax == 6.1) Imax = 6;
				if (Imax == 6.6) Imax = 6.5;
				if (Imax == 4.6) Imax = 4.5;
				if (Imax == 5.1) Imax = 5;

				var Me = parseFloat(XMLQuakeList.getElementsByTagName("mm")[i].childNodes[0].nodeValue);

				// salva nperiod e nterr che servono per index EE
				if (Zone != "MED") {
					NperiodEQ[i] = markers[i].getElementsByTagName("nperiod")[0].childNodes[0].nodeValue;
					NterrEQ[i] = markers[i].getElementsByTagName("nterr")[0].childNodes[0].nodeValue;
				} else {
					// alert(Location)
					NperiodEQ[i] = " ";
					NterrEQ[i] = " "
				}

				//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
				var flagNP = XMLQuakeList.getElementsByTagName("npun")[i].childNodes.length;
				if (flagNP > 0) {
				var Npun = XMLQuakeList.getElementsByTagName("npun")[i].childNodes[0].nodeValue;
				} else {
					Npun = 0
				};
				Npun = parseInt(Npun)

				//verifico la lunghezza del campo, perchè se è vuoto il "nodeValue" restituisce errore
				var flagET = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes.length;
				if (flagET > 0) {
					Epicenter = XMLQuakeList.getElementsByTagName("epicenter_type")[i].childNodes[0].nodeValue;
				} else {
					Epicenter = "Local effects"
				};
				// if (Epicenter == "Not parameterized") Epicenter = "Calculated epicentre"
				//if (Epicenter == "-") Epicenter = "Local effects"

				if (XMLQuakeList.getElementsByTagName("rel")[i].length == 0) var Reliability = ""
				else if  (XMLQuakeList.getElementsByTagName("rel")[i].childNodes.length == 0) var Reliability = ""
				else var Reliability = XMLQuakeList.getElementsByTagName("rel")[i].childNodes[0].nodeValue;
				if (Reliability == "?") {Reliability="S"}

				if (XMLQuakeList.getElementsByTagName("level")[i].length == 0) var EQlevel = "A"
				else if  (XMLQuakeList.getElementsByTagName("level")[i].childNodes.length == 0) var EQlevel = "A"
				else var EQlevel = XMLQuakeList.getElementsByTagName("level")[i].childNodes[0].nodeValue;


				var Lat = parseFloat(XMLQuakeList.getElementsByTagName("lat")[i].childNodes[0].nodeValue).toFixed(3);
				var Lon = parseFloat(XMLQuakeList.getElementsByTagName("lon")[i].childNodes[0].nodeValue).toFixed(3);


				var DateLabel =  XMLQuakeList.getElementsByTagName("data_label")[i].childNodes[0].nodeValue;

				var Year = parseInt(XMLQuakeList.getElementsByTagName("anno")[i].childNodes[0].nodeValue);

				var CheckMonth = XMLQuakeList.getElementsByTagName("mese")[i];
				var Month = CheckMonth.childNodes.length ? CheckMonth.childNodes[0].nodeValue : '';
				if (Month=="") Month  = "00"

				var CheckDay = XMLQuakeList.getElementsByTagName("giorno")[i];
				var Day = CheckDay.childNodes.length ? CheckDay.childNodes[0].nodeValue : '';
				if (Day=="") Day = "00"

				var TimeLabel =  XMLQuakeList.getElementsByTagName("time_label")[i].childNodes[0].nodeValue;

				var CheckHour =  XMLQuakeList.getElementsByTagName("ora")[i];
				var Hour = CheckHour.childNodes.length ? CheckHour.childNodes[0].nodeValue : '';
				if (Hour=="-9" || Hour=="" ) Hour = 0;

				var CheckMinu = XMLQuakeList.getElementsByTagName("minu")[i];
				var Minu = CheckMinu.childNodes.length ? CheckMinu.childNodes[0].nodeValue : '';
				if (Minu=="-9" || Minu=="" ) Minu = 0;

				var CheckSec = XMLQuakeList.getElementsByTagName("sec")[i];
				var Sec = CheckSec.childNodes.length ? CheckSec.childNodes[0].nodeValue : '';
				if (Sec=="-9" || Sec=="" ) Sec = 0;


				var FlagFalse = XMLQuakeList.getElementsByTagName("flagfalseeq")[i].childNodes.length ? true : false;

				var QuakePage = createQuakePageLink(window.location.href, Nterr.trim(), 'index')

				var Star;
				var StarH;
				var Shape;
				var onMouseOverText = DateLabel;

				// Load markers image (different for ITA and MED) and define their size, based on epicentral intensity

				// ---- define marker icons
				EPIpathCALC = 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z';
				//   --------------------------------------------  Epincenter type: FALSE   ---------------------------------------------------------
				if (FlagFalse) {
					Star = { path: google.maps.SymbolPath.CIRCLE, strokeColor: "#000000", scale: 4, strokeWeight: 3 };
					EpiIcon="F";
				//   --------------------------------------------  Epincenter type: NOT PARAMETERIZED   ---------------------------------------------------------
				} else if (Epicenter == "Not parameterized"){
					var EpicenterITA = "Non parametrizzato";
					var EpicenterENG = Epicenter;
					Star = { path: google.maps.SymbolPath.CIRCLE, strokeColor: "#000000", fillColor: "#000000", fillOpacity: 1, scale: 3};
					EpiIcon="NP";
				//   --------------------------------------------  Epincenter type: CALCULATED   ---------------------------------------------------------
				} else {

					if (Epicenter == "Calculated epicentre"){
						var EpicenterITA = "Epicentro calcolato";
						var EpicenterENG = Epicenter;

					if(9.5 < Io) {Star = {path: EPIpathCALC, fillColor: color4, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale: StarScale4}; EpiIcon="C_9.5"};
						if(7.5 < Io && 9.5 >= Io) {Star = {path: EPIpathCALC, fillColor: color3, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale3}; EpiIcon="C_8"};
						if(5.9 < Io && 7.5 >= Io) {Star = {path: EPIpathCALC, fillColor: color2, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale2}; EpiIcon="C_6"};
						if(6 > Io ) {Star = {path: EPIpathCALC, fillColor: color1, fillOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 0.5, scale:StarScale1}; EpiIcon="C_4"};

					//   --------------------------------------------  Epincenter type: LOCAL EFFECTS  ---------------------------------------------------------
					} else if (Epicenter == "Local effects"){
						EpicenterITA = "Singola località";
						EpicenterENG= Epicenter;

						if(9.5 < Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale4, fillColor: color4, fillOpacity: 1, strokeWeight: 0.5 }; EpiIcon="L_9.5"};
						if(7.5 < Io && 9.5 >= Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale3, fillColor: color3, fillOpacity: 1, strokeWeight: 0.5 }; EpiIcon="L_8"};
						if(5.9 < Io && 7.5 >= Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale2, fillColor: color2, fillOpacity: 1, strokeWeight: 0.5 }; EpiIcon="L_6"};
						if(6 > Io ) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale1, fillColor: color1, fillOpacity: 1, strokeWeight: 0.5 }; EpiIcon="L_4"};

					//   --------------------------------------------  Epincenter type: AREA   ---------------------------------------------------------
					} else if (Epicenter == "Region, area"){
						EpicenterITA = "Regione, area";
						EpicenterENG= Epicenter;

						if(9.5 < Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale4, strokeColor: color4, fillOpacity: 0, strokeWeight: 3 }; EpiIcon="R_9.5"};
						if(7.5 < Io && 9.5 >= Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale3, strokeColor: color3, fillOpacity: 0, strokeWeight: 3 }; EpiIcon="R_8"};
						if(5.9 < Io && 7.5 >= Io) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale2, strokeColor: color2, fillOpacity: 0, strokeWeight: 3 }; EpiIcon="R_6"};
						if(6 > Io ) {Star = {path: google.maps.SymbolPath.CIRCLE, scale: CircleScale1, strokeColor: color1, fillOpacity: 0, strokeWeight: 3 }; EpiIcon="R_4"};

					 //--------------------------------------------  Epincenter type: Hypothetical  ---------------------------------------------------------
					} else if (Epicenter == "Hypothetical"){
						EpicenterITA = "Ipotizzata";
						EpicenterENG= Epicenter;

						if(9.5 < Io) {Star = {path: EPIpathCALC, strokeColor: color4, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale: StarScale4}; EpiIcon="H_9.5"};
						if(7.5 < Io && 9.5 >= Io) {Star = {path: EPIpathCALC, strokeColor: color3, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale3}; EpiIcon="H_8"};
						if(5.9 < Io && 7.5 >= Io) {Star = {path: EPIpathCALC, strokeColor: color2, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale2}; EpiIcon="H_6"};
						if(6 > Io ) {Star = {path: EPIpathCALC, strokeColor: color1, strokeOpacity: 1, anchor: new google.maps.Point(125,125), strokeWeight: 2, scale:StarScale1}; EpiIcon="H_4"};
					};
				};

				// Create data structure that stores all information of all earthquakes (and Gmap markers)
				markersArray[i] = new Array();
				markersArray[i]['Date'] =  parseInt(Year + Month + Day),
				markersArray[i]['DateLabel'] =  DateLabel,
				markersArray[i]['TimeLabel'] =  TimeLabel,
				markersArray[i]['Nterr'] =  Nterr,
				markersArray[i]['Lat'] =  Lat,
				markersArray[i]['Lon'] =  Lon,
				markersArray[i]['Location'] =  Location,
				markersArray[i]['Country'] =  Country,
				markersArray[i]['Io'] =  Io,
				markersArray[i]['Year'] =  Year,
				markersArray[i]['Month'] =  Month,
				markersArray[i]['Day'] =  Day,
				markersArray[i]['Hour'] =  Hour,
				markersArray[i]['Minu'] =  Minu,
				markersArray[i]['Sec'] = Sec,
				markersArray[i]['Me'] =  Me,
				markersArray[i]['Imax'] =  Imax,
				markersArray[i]['Zone'] =  Zone,
				markersArray[i]['Npun'] =  Npun,
				markersArray[i]['FlagFalse'] =  FlagFalse,
				markersArray[i]['Level'] =  EQlevel,
				markersArray[i]['Note'] =  Reliability,
				markersArray[i]['EpiType'] =  Epicenter,
				markersArray[i]['EpiIcon'] =  EpiIcon,
				markersArray[i]['Marker'] =  new google.maps.Marker({
					position: new google.maps.LatLng(Lat, Lon),
					map: null,
					icon: Star,
					title: onMouseOverText,
				})

				var OnClickTextEN = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',  // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					'<div class="iw-title quakeColor">' + 'Date: <b>' + DateLabel + '</b> Time: <b>' + TimeLabel + '</b>' + ' Epicentral Area: <b>' +  Location + '</b></div>',
					'<div class="EQinfoIW"><br /><b>' + EpicenterENG + '</b> (Lat.: <b>' + Lat + '</b> - Lon.: <b>' + Lon + '</b>)<br /><br />',
					'Epicentral Intensity: <b>' + Io + '</b><br />',
					'Maximum Intensity: <b>' + Imax + '</b><br />',
					'Equivalent Magnitude: <b>' + Me + '</b><br />',
					'Number of Macroseismic Observations: <b>' + Npun + '</b><br /><br />',
					'<a href="' + QuakePage + 'EN" target="_blank"> Earthquake page </a> <br /><br /></div>',
					'</div>'
				].join('\n');

				var OnClickTextIT = [
					// '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>',    // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API
					'<div class="iw-title quakeColor">' + 'Data: <b>' + DateLabel + '</b> Ora: <b>' + TimeLabel + '</b>' + ' Area epicentrale: <b>' +  Location + '</b></div>',
					'<div class="EQinfoIW"><br /><b>' + EpicenterITA + '</b> (Lat.: <b>' + Lat + '</b> - Lon.: <b>' + Lon + '</b>)<br /><br />',
					'Intensità Epicentrale: <b>' + Io + '</b><br />',
					'Intensità Massima: <b>' + Imax + '</b><br />',
					'Magnitudo Equivalente: <b>' + Me + '</b><br />',
					'Numero di osservazioni macrosismiche: <b>' + Npun + '</b><br /><br />',
					'<a href="' + QuakePage + 'IT" target="_blank"> Pagina del terremoto </a> <br /><br /></div>',
					'</div>'
				].join('\n');


				// Call function that opens pop up window with quake info
				openPopupSpider(markersArray[i]['Marker'], OnClickTextEN, OnClickTextIT, markersArray[i]['Nterr'], markersArray[i]['Lat'], markersArray[i]['Lon']);
			}
		}
	}

	// ====================== Show quakes on table and map, based on filters selected by user
	this.showQuakes = function(Filters){


		bounds = new google.maps.LatLngBounds();
		iMarker = 0; //index on selected markers (after filters)

		// Remove data from quake table
		document.getElementById('eq_data').innerHTML = '';

		// EXPORT
		var d = new Date();
		filename = 'CFTI5_EQList_selection_'+ d.getFullYear() + '_' + (Number(d.getMonth())+1) + '_' + d.getDate() + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() ;
		ExportText = "";
		ExportText = "Date;Time;Io (Epicentral intensity - MCS scale);Imax (Maximum intensity - MCS scale);NMO (Number of Macroseismic Observations);Me (Equivalent magnitude based on macroseismic observations);Latitude;Longitude;Epicentral Area;Notes;Review Level"

		ExportKml = '';
		ExportKmlR = '';

		// Loop through all events and select them based on filters defined by user
		chartArray = [];
		ExportKmlR = "";
		for (var i = 0; i < markersArray.length; i++) { // index on all markers
			var RecTer = markersArray[i];
			var YearFlag = false,
				IntMagFlag = false,
				ZoneFlag = false, //***GT***
				FalseFlag = (RecTer['FlagFalse']) ? true : false, //***GT***
				LatFlag = false,
				LonFlag = false;

			YearFlag = ( Filters['StartYear'] <= RecTer['Year'] && Filters['StopYear'] >= RecTer['Year']) ? true : false;
			if (param == "Io") {
				IntMagFlag = ( Filters['StartIo'] <= RecTer['Io'] && Filters['StopIo'] >= RecTer['Io']) ? true : false;
			} else {
				IntMagFlag = ( Filters['StartMM'] <= RecTer['Me'] && Filters['StopMM'] >= RecTer['Me']) ? true : false;
			}
			LatFlag = ( Filters['LatS'] <= RecTer['Lat'] && Filters['LatN'] >= RecTer['Lat']) ? true : false;
			LonFlag = ( Filters['LonW'] <= RecTer['Lon'] && Filters['LonE'] >= RecTer['Lon']) ? true : false;

			if ('BOTH' == Filters['Zone'] || Filters['Zone'] == RecTer['Zone']) ZoneFlag = true;
			if (Filters['FlagFalse']) FalseFlag = false;

			if ( YearFlag && IntMagFlag && ZoneFlag && !(FalseFlag) && LatFlag && LonFlag){

				// save ARRAY FOR CHART
				chartArray[iMarker] = new Array();
				chartArray[iMarker]['Year'] = RecTer['Year']
				chartArray[iMarker]['Month'] = RecTer['Month']
				chartArray[iMarker]['Day'] = RecTer['Day']
				chartArray[iMarker]['DateLabel'] = RecTer['DateLabel']
				chartArray[iMarker]['TimeLabel'] = RecTer['TimeLabel']
				chartArray[iMarker]['Hour'] = RecTer['Hour']
				chartArray[iMarker]['Minu'] = RecTer['Minu']
				chartArray[iMarker]['Sec'] = RecTer['Sec']
				chartArray[iMarker]['Io'] = RecTer['Io']
				chartArray[iMarker]['Location'] = RecTer['Location']


				// -------     plot epicenters and add spider
				RecTer['Marker'].setMap(map);
				oms.addMarker(RecTer['Marker']);

				bounds.extend(RecTer['Marker'].getPosition());



				// ------------------  CREATE QUAKE TABLE
				var tbody = document.getElementById('eq_data');

				var row = document.createElement("tr");
				row.setAttribute('id', RecTer['Nterr']);

				if (iMarker==0) {
					Nterr1 = RecTer['Nterr'];
				}

				var cell1 = document.createElement('td');
				cell1.setAttribute('class', 'date');
				cell1.setAttribute('data-text', RecTer['Date']);
				cell1.innerHTML = '<a onclick=onclickList('+i+') href="#">' + RecTer['DateLabel'] + '</a>' ;

				var cell2 = document.createElement("td");
				cell2.setAttribute('class', 'time');
				cell2.innerHTML = RecTer['TimeLabel'];

				var cell3 = document.createElement("td");
				cell3.setAttribute('class', 'io');
				cell3.innerHTML = RecTer['Io'];

				var cell4 = document.createElement("td");
				cell4.setAttribute('class', 'imax');
				cell4.innerHTML = RecTer['Imax'];

				var cell5 = document.createElement("td");
				cell5.setAttribute('class', 'sites');
				cell5.innerHTML = RecTer['Npun'];

				var cell6 = document.createElement("td");
				cell6.setAttribute('class', 'me');
				cell6.innerHTML = RecTer['Me'];

				var cell7 = document.createElement("td");
				cell7.setAttribute('class', 'location');
				if (RecTer['Zone']== "MED") cell7.innerHTML = RecTer['Location'] + ' ('+ RecTer['Country']+ ')';
				else cell7.innerHTML = RecTer['Location'];

				var cell8 = document.createElement("td");
				cell8.setAttribute('class', 'rel');
				var noteRel = markersArray[i]['Note'];
				if (noteRel == "?") {noteRel="S"}
				cell8.innerHTML = noteRel

				var cell9 = document.createElement("td");
				cell9.setAttribute('class', 'level');
				if (markersArray[i]['Level'] != ''){
					var levelIcon = '<img src="images/EQlevel_' + markersArray[i]['Level'] + '.png" width= "20px" vertical-align="-10px"/>';

					// abbr text for level of review
					if (markersArray[i]['Level'] == "S") {
						var levelAbrr = '<span class="' + levelID[0] + '"></span>';
						cell9.setAttribute('data-text', 3);
					}
					else if (markersArray[i]['Level'] == "I") {
						var levelAbrr = '<span class="' + levelID[1] + '"></span>';
						cell9.setAttribute('data-text', 2);
					}
					else if (markersArray[i]['Level'] == "A") {
						var levelAbrr = '<span class="' + levelID[2] + '"></span>';
						cell9.setAttribute('data-text', 1);
					}
					cell9.innerHTML = '<div class="COMMContainer">' + levelIcon +'<span class="tooltiptext_COMM">' + levelAbrr + '</span></div>' ;
				} else cell9.innerHTML = ""

				row.appendChild(cell1);
				row.appendChild(cell2);
				row.appendChild(cell3);
				row.appendChild(cell4);
				row.appendChild(cell5);
				row.appendChild(cell6);
				row.appendChild(cell7);
				row.appendChild(cell8);
				row.appendChild(cell9);

				tbody.appendChild(row);


				// ======================     KML EXPORT
				var noteRelD = "";
				switch (noteRel) {
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
				switch (RecTer['Level']) {
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

				var LocVar;
				if (RecTer['Zone']== "MED") LocVar = RecTer['Location'] + ' ('+ RecTer['Country']+ ')';
				else LocVar = RecTer['Location'];

				//Export variableTXT
				ExportText = ExportText + CarRet + RecTer['DateLabel'] + ';' + RecTer['TimeLabel'] + ';' + RecTer['Io'] + ';' + RecTer['Imax'] + ';' + RecTer['Npun'] + ';' + RecTer['Me'] + ';' + RecTer['Lat'] + ';' + RecTer['Lon'] + ';' + LocVar + ';' + noteRelD + ';' + LevelD;

				//Export variableKML
				ExportKmlR = ExportKmlR + "<Placemark> <name>" + RecTer['DateLabel'] + " - " + LocVar + "</name>" + CarRet + "<description><![CDATA["
				ExportKmlR = ExportKmlR + "Date: <b>" + RecTer['DateLabel'] + "</b> Time: <b>" + RecTer['TimeLabel']  + "</b> <br>Epicentral Area: <b>" + LocVar + "</b><br><b>" + RecTer['EpiType'] + "</b> (Lat.: <b>" + RecTer['Lat'] + "</b> - Lon.: <b>" + RecTer['Lon'] + "</b>) <br><br>Io (Epicentral intensity - MCS scale): <b>" + RecTer['Io'] + "</b> <br>Imax (Maximum intensity - MCS scale): <b>" + RecTer['Imax'] + "</b> <br>Me (Equivalent magnitude): <b>" + RecTer['Me'] + "</b> <br>NMO (Number of Macroseismic Observations): <b>" + RecTer['Npun'] + "</b><br><br>Notes: <b>" + noteRelD + "</b> <br>Review Level: <b>" + LevelD + "</b> <br><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/quake.php?" + RecTer['Nterr'] + "EN" + virg + ">Earthquake page </a></b>"
				ExportKmlR = ExportKmlR + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + RecTer['Lon'] + "</longitude>" + CarRet + "<latitude>" + RecTer['Lat'] + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#" + RecTer['EpiIcon'] + "</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ RecTer['Lon'] + ","+ RecTer['Lat'] + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>"

				iMarker ++;
			}
		}

		//Export variableKML
		ExportKml = "";
		jQuery.get('KML/i_quake_a.txt', function(data){
				ExportKml = data;
				ExportKml = ExportKml + CarRet +"<Folder>" + CarRet + "<name>CFTI5Med - " + iMarker + " events selected</name>"+ CarRet;
				ExportKml = ExportKml + "<open>1</open>"+ CarRet;
				ExportKml = ExportKml + "<description>"+ CarRet;
				ExportKml = ExportKml + "<![CDATA[<body><a href="+virg+"http://storing.ingv.it/cfti/cfti5/"+virg+"> <img src="+virg+"http://storing.ingv.it/cfti/cfti5/images/banner_CFTI_newG_thin_EN"+virg+" alt="+virg+"Logo CFTI5Med"+virg+" height="+virg+"32px"+virg+"></a></body>]]>"+ CarRet;
				ExportKml = ExportKml + "</description>"+ CarRet;
				ExportKml = ExportKml + "</Folder>" + CarRet ;
				ExportKml = ExportKml + "<Folder><name>Earthquakes</name>";

				ExportKml = ExportKml + ExportKmlR;

				jQuery.get('KML/i_quake_b.txt', function(dataB){
					ExportKml = ExportKml + dataB;
				})
		})




		// later times call again language to fill abbrs
		if (EqMapFlag != 0){
			// run language function, to fill in all divs in english or italian
			new LanguageTools().setLanguage(Langsel);
		}


		if (EqMapFlag == 0) {  // first time: complete process with XML parsing, ecc.
			zoneQuakeSetParam();
		}

		// ----- create chart
		google.charts.load('45', {packages: ['corechart']})
	    google.charts.setOnLoadCallback(function() {drawChart(Filters['StartYear'], Filters['StopYear']); });

		// Write out how many events were selected based on filters (top-left on the map)
		if (Langsel == "EN") NumEqSel.innerHTML = "<b>" + iMarker + ' </b><span id="numEq"> events selected</span>';
		else NumEqSel.innerHTML = "<b>" + iMarker + ' </b><span id="numEq"> eventi selezionati</span>';

		// Actions to be done when no results after filters
		if (iMarker == 0){
			Nterr1 = "";
			document.getElementById("Eq_info").style.display = "none";
			// document.getElementById("nosel").style.display = "inline"; // write "no results"
			bounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(29.5, -6.5),
				new google.maps.LatLng(48.5, 43.5)
				)

		// Show table when results > 0
		} else {
			document.getElementById("Eq_info").style.display = "initial";
		}

		// ----- Close infowindow (if the user opened one in previous quake selection)
		infowindow.close();

		//------- Set map bounds or zoom
		if (EqMapFlag == 0) {
			map.setZoom(6) //ZOOM FISSO INIZIALE
		}
		// else {
		// 	map.fitBounds(bounds); //ZOOM SUI DATI SELEZIONATI
		// };


		// ---- Scroll table up to first nterr selected
		if (Nterr1) {
			var row1 = document.getElementById(Nterr1);
			row1.scrollIntoView(true);
		}

		// only if first time, set italian
		if (EqMapFlag == 0){
			// run language function, to fill in all divs in english or italian
			new LanguageTools().setLanguage('IT');
		}

		// ------ Table sorting
		if (EqMapFlag == 0) {       //on load (flag defined in general js)

			// Sort table
			$(document).ready(function() {
				// call the tablesorter plugin
				$("#Eq_info").tablesorter({
					//	sort on the first, second and third (order desc) column
					sortList: [[0,0],[1,0],[2,1]]
				});
				// $("#Loc_info").tablesorter({
				// 	//	sort on the first, second and third (order desc) column
				// 	sortList: [[0,0]]
				// });
			});
			EqMapFlag = 1;
		} else 	{ //on later selections
			$('.tablesorter').trigger('updateAll');
		}





		// loading div
		$('#loading').hide();


	}

	// ============== Remove markers from map
	this.clearMap = function(){
		if (rectangle) rectangle.setMap(null);
		// cancellazione dei marker di Spiderfier
		oms.clearMarkers();

		for (var i = 0; i < markersArray.length; i++) {
			markersArray[i]['Marker'].setMap(null);
			//if (Marker1) {
			//	Marker1.setIcon(StarCLICK);
			//}
		}
	}
}  // -- end GmapTools function



// When clicking on table row, trigger event on Gmap marker (used to trigger popup window when clicking on table row)
function onclickList(prog){
	sClick = "LIST";
	// Flag for scrolling table - set to zero when event is selected from table (and not from marker)
	FlagScroll = 0;

	if (Marker1) {
		Marker1.setIcon(StarCLICK_R);
	}
	google.maps.event.trigger(markersArray[prog]['Marker'], 'click');

	// center map on selected event (when selecting from table line)
	var center = new google.maps.LatLng(markersArray[prog]['Lat'], markersArray[prog]['Lon']);
    map.panTo(center);
}

// ============= Menu
var FormTools = function(){
	this.getSelectedValue = function(SelectReference){
		var index = SelectReference.selectedIndex;
		return SelectReference.options[index].value;
	}
	this.getSelectedText = function(SelectReference){
		var index = SelectReference.selectedIndex;
		return SelectReference.options[index].text;
	}
	this.resetSelect = function(SelectReference){
		SelectReference.options.length = 1;
	}
	this.toggleBlock = function(BlockReference, ToDo){
		BlockReference.style.display = (0 == ToDo) ? 'none' : 'block';
	}
	this.getSelectedRadioValue = function(RadioReference){
		var len = RadioReference.length;
		for (var i = 0; i < len; ++i){
			if (RadioReference[i].checked) return parseInt(RadioReference[i].value);
		}
	}
	this.setTextValue = function(TextReference, Value){
		TextReference.value = Value;
	}
}

// ============= Set beginning parameters and launch resetmap
var MenuTools = function(){

	this.setVariable = function(){
		var Items = XMLQuakeList.getElementsByTagName('anno');
		var yearL;
		for(i = 0; i < Items.length; i++){
			yearL = parseInt(Items[i].childNodes[0].nodeValue)
			var LatL = parseFloat(XMLQuakeList.getElementsByTagName("lat")[i].childNodes[0].nodeValue);
			var LonL = parseFloat(XMLQuakeList.getElementsByTagName("lon")[i].childNodes[0].nodeValue);

			if (yearL < minYear) minYear = yearL;
			if (yearL > maxYear) maxYear = yearL;
			if (LatL < minLat) minLat = LatL;
			if (LatL > maxLat) maxLat = LatL;
			if (LonL < minLon) minLon = LonL;
			if (LonL > maxLon) maxLon = LonL;

			CatZone = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;

			if (CatZone == "ITA") {
				if (yearL < minYearIta) minYearIta = yearL;
				if (yearL > maxYearIta) maxYearIta = yearL;
				if (LatL < minLatIta) minLatIta = LatL;
				if (LatL > maxLatIta) maxLatIta = LatL;
				if (LonL < minLonIta) minLonIta = LonL;
				if (LonL > maxLonIta) maxLonIta = LonL;
			}
			if (CatZone == "MED") {
				if (yearL < minYearMed) minYearMed = yearL;
				if (yearL > maxYearMed) maxYearMed = yearL;
				if (LatL < minLatMed) minLatMed = LatL;
				if (LatL > maxLatMed) maxLatMed = LatL;
				if (LonL < minLonMed) minLonMed = LonL;
				if (LonL > maxLonMed) maxLonMed = LonL;
			}
		}
	}

	this.setCoords = function(){
		document.getElementById('LatN').value = Math.ceil(maxLatIta);
		document.getElementById('LatS').value = Math.floor(minLatIta);
		document.getElementById('LonW').value = Math.floor(minLonIta);
		document.getElementById('LonE').value = Math.ceil(maxLonIta);
	}

	this.setPeriod = function(){
		document.getElementById('StartDate').value = minYearMed;
		document.getElementById('StopDate').value = maxYearIta;
	}

	this.setIo = function(){
		var Items = XMLQuakeList.getElementsByTagName('io');
		var minIo = 6;
		var maxIo = 11;
		document.getElementById('StartIo').value = minIo;
		document.getElementById('StopIo').value = maxIo;

		istart = 1
	}

	this.setMenu = function(){
		//new LogTools().addLog('Setting menu<br />', 100);
		this.setVariable();
		this.setCoords();
		this.setPeriod();
		this.setIo();

		ResetMap();
	}
}

//================ Reset map
function ResetMap(){
	document.getElementById('selArea').style.display = "block";
	document.getElementById('NoselArea').style.display = "none";
	clearMap();
	GmapsPilot.showQuakes({
		StartYear: parseInt(document.getElementById('StartDate').value),
		StopYear: parseInt(document.getElementById('StopDate').value),
		StartIo: parseFloat(document.getElementById('StartIo').value),
		StopIo: parseFloat(document.getElementById('StopIo').value),
		StartMM:  parseFloat(document.getElementById('StartMM').value),
		StopMM: parseFloat(document.getElementById('StopMM').value),
		Zone: new FormTools().getSelectedValue(document.getElementById('zoneQuake')),
		FlagFalse: document.getElementById('flagfalseeq').checked,
		LatN: parseFloat(document.getElementById('LatN').value),
		LatS: parseFloat(document.getElementById('LatS').value),
		LonW: parseFloat(document.getElementById('LonW').value),
		LonE: parseFloat(document.getElementById('LonE').value),
	});
	// resizeMapIndex() ;
	// spiderfy();

}

// funzione che ripulisce la mappa dai markers, per tutte le pagine index
function clearMap(){
	GmapsPilot.clearMap();

	if (LOCMarkers) {
		for (var i = 0; i < LOCMarkers.length; i++) {
			LOCMarkers[i].setMap(null);
			//if (Marker1) {
			//	Marker1.setIcon(StarCLICK);
			//}
		}
	}

	if (EEmarkersArray){
		for (var i = 0; i < EEmarkersArray.length; i++) {
			EEmarkersArray[i]['Marker'].setMap(null);
		}
	}

}


// ======= Initialize EQindex page
function initializeEq(){
	NumEqSel = document.getElementById("NumSel");
	MenuPilot = new MenuTools();
	GmapsPilot = new GmapsTools();
	placeMap();
	GmapsPilot.requestData();

	var FilterButton = document.getElementById('FilterByKindEvent');
	IntervalVar = setInterval(function(){
		if(true == XMLQuakeListArrived){
			clearInterval(IntervalVar);
			MenuPilot.setMenu();
		}
	},10);

	if (window.attachEvent) FilterButton.attachEvent('onclick', xResetMap);
	else{
		if (window.addEventListener) FilterButton.addEventListener('click', xResetMap, false);
		else FilterButton.addEventListener('click', xResetMap, false);
	}
	resizeMapIndex();
	spiderfy();
	createSliders();


	// =================         WMS - WFS  - Metadata    ======================
	var copylinkWMS = document.querySelector('.WMSbutton');
	copylinkWMS.addEventListener('click', showWMSlink)

	function showWMSlink(e) {
		e.stopImmediatePropagation()

		/* Get the text field */
	  var copyText = document.getElementById("WMStext");

	  $('#WMSdiv').show();
	  /* Select the text field */
	  copyText.select();
	  /* Copy the text inside the text field */
	  document.execCommand("Copy");
	  document.onclick = hideURLS;
	};

	var copylinkWFS = document.querySelector('.WFSbutton');
	copylinkWFS.addEventListener('click', showWFSlink)

	function showWFSlink(e) {
		e.stopImmediatePropagation()

		/* Get the text field */
	  var copyText = document.getElementById("WFStext");

	  $('#WFSdiv').show();
	  /* Select the text field */
	  copyText.select();
	  /* Copy the text inside the text field */
	  document.execCommand("Copy");
	  document.onclick = hideURLS;
	};

	var copylinkMETA = document.querySelector('.METAbutton');
	copylinkMETA.addEventListener('click', showMETAlink)

	function showMETAlink(e) {
		e.stopImmediatePropagation()

		/* Get the text field */
	  var copyText = document.getElementById("METAtext");

	  $('#METAdiv').show();
	  /* Select the text field */
	  copyText.select();
	  /* Copy the text inside the text field */
	  document.execCommand("Copy");
	  document.onclick = hideURLS;
	};
}

function hideURLS(){
	$('#WMSdiv').hide();
	$('#WFSdiv').hide();
	$('#METAdiv').hide();
}





function xResetMap(){
	document.getElementById('loading').style.display = "block";
	 setTimeout(function () {
        	ResetMap();
    }, 10);
	$('#clickOK').hide();
}

function resizeMapIndex() {
	resizeMap();
	document.querySelector('#resultsEQ').style.height = Math.round( h -405)+'px';
	document.querySelector('#resultsLOC').style.height = Math.round( h -205)+'px';
	document.querySelector('#resultsEE').style.height = Math.round( h -395)+'px';
	document.querySelector('#Eq_info tbody').style.height = Math.round( h -430)+'px';
	document.querySelector('#Eq_info').style.height = Math.round( h -410)+'px';
	document.querySelector('#Loc_info tbody').style.height = Math.round( h -235)+'px';
	document.querySelector('#Loc_info').style.height = Math.round( h -205)+'px';
	document.querySelector('#EE_info tbody').style.height = Math.round( h -420)+'px';
	document.querySelector('#EE_info').style.height = Math.round( h -400)+'px';
}


function stateChange() {
	$('#loading').show();
	var url = window.location.href;
	var AcTy = url.substr(-2,2);

    setTimeout(function () {
            InitializeIndex();
    }, 10);

	if (AcTy == "EE" && flagAccessURL == 0) {
		flagAccessURL = 1;
		setTimeout(function () {
			document.getElementsByName("access")[0].value = "EE";
			var event = new Event('change');
			document.getElementsByName("access")[0].dispatchEvent(event);
		}, 500);	
	};
	if (AcTy == "LO" && flagAccessURL == 0) {
		flagAccessURL = 1;
		setTimeout(function () {
			document.getElementsByName("access")[0].value = "LOC";
			var event = new Event('change');
			document.getElementsByName("access")[0].dispatchEvent(event);
		}, 500);	
	};
}



function InitializeIndex() {

	// $("body").css("cursor", "wait");

	document.getElementById("zoneQuake").addEventListener("change", zoneQuakeSetParam);

	var html = document.getElementsByTagName('html')[0];

	if (document.getElementById("access").value == "EQ"){
		flagLOCaccess = 0;
		flagEEaccess = 0;
		document.getElementById("menuLOC").style.display = "none";
		document.getElementById("menuEE").style.display = "none";
		document.getElementById("resultsLOC").style.display = "none";
		document.getElementById("resultsEE").style.display = "none";
		document.getElementById("menuEQ").style.display = "inline";
		document.getElementById("resultsEQ").style.display = "initial";
		document.getElementById("NumSel").style.marginTop = "315px";
		document.getElementById("export").style.marginTop = "316px";
		document.getElementById("WMSWFS").style.marginTop = "314px";
		document.getElementById("legend").style.display = "inline";
		document.getElementById("legendPQ").style.display = "none";

		document.getElementById("IntGraphINDEX").style.display = "inline";
		document.getElementById("IntGraphRed").style.display = "inline";
		document.getElementById("IntGraphEnl").style.display = "inline";
		document.getElementById("SaveIcon").style.display = "inline";
		document.getElementById("selArea").style.display = "inline";

		document.getElementById("topcolor").className= "quakeColor";

	    if (EqMapFlag == 1) {  // only clearmap, selection and plot
			ResetMap();
		}
		if (EqMapFlag == 0) {  // first time: complete process with XML parsing, ecc.
			initializeEq();
		}
	}

	if (document.getElementById("access").value == "LOC"){
		clearMap();
		flagLOCaccess = 1;
		flagEEaccess = 0;
		document.getElementById("menuEQ").style.display = "none";
		document.getElementById("menuEE").style.display = "none";
		document.getElementById("resultsEQ").style.display = "none";
		document.getElementById("resultsEE").style.display = "none";

		document.getElementById("menuLOC").style.display = "initial";
		document.getElementById("resultsLOC").style.display = "initial";
		document.getElementById("NumSel").style.marginTop = "120px";
		document.getElementById("export").style.marginTop = "120px";
		document.getElementById("WMSWFS").style.display = "none";
		document.getElementById("legend").style.display = "none";
		document.getElementById("legendmin").style.display = "none";
		document.getElementById("legendPQ").style.display = "inline";
		document.getElementById("NumSel").innerHTML = "";

		document.getElementById("IntGraphINDEX").style.display = "none";
		document.getElementById("IntGraphRed").style.display = "none";
		document.getElementById("IntGraphEnl").style.display = "none";
		document.getElementById("SaveIcon").style.display = "none";
		document.getElementById("selArea").style.display = "none";

		document.getElementById("topcolor").className= "localityColor";

		if (flagFilterLOC == 0){
			clearMap();
			// ---------- INTENSITY SLIDER

			var minImax = 0;
			var maxImax = 11;

			document.getElementById('StartImax').value = minImax;
			document.getElementById('StopIo').value = maxImax;

			var sliderImax = document.getElementById('sliderI_loc');
			var StartImax = document.getElementById('StartImax');
			var StopImax = document.getElementById('StopImax');

			noUiSlider.create(sliderImax, {
				start: [minImax, maxImax],
				step: 1,
				behaviour: 'drag',
				connect: true,
				range: {
					'min': 0,
					'max': 11
				}
			});

			sliderImax.noUiSlider.on('update', function( values, handle ) {
				var value = values[handle];
				if ( handle ) {
					StopImax.value = Math.round(value);
				} else {
					StartImax.value = Math.round(value);
				}
			});

			StartImax.addEventListener('change', function(){
				sliderImax.noUiSlider.set([this.value, null]);
				// if (StartImax.value != 0) {
				// 		falseCheck.checked = false;
				// }
			});

			StopImax.addEventListener('change', function(){
				sliderImax.noUiSlider.set([null, this.value]);
			});
		}



		// ResetMapLOC();
		requestLocData();

	}
	if (document.getElementById("access").value == "EE"){
		flagLOCaccess = 0;
		flagEEaccess = 1;
		document.getElementById("menuEQ").style.display = "none";
		document.getElementById("menuLOC").style.display = "none";
		document.getElementById("resultsEQ").style.display = "none";
		document.getElementById("resultsLOC").style.display = "none";


		document.getElementById("NumSel").style.marginTop = "305px";
		document.getElementById("export").style.marginTop = "305px";
		document.getElementById("WMSWFS").style.display = "none";
		document.getElementById("legend").style.display = "none";
		document.getElementById("legendmin").style.display = "none";
		document.getElementById("legendPQ").style.display = "none";
		document.getElementById("menuEE").style.display = "initial";

		document.getElementById("NumSel").innerHTML = "";

		document.getElementById("IntGraphINDEX").style.display = "none";
		document.getElementById("IntGraphRed").style.display = "none";
		document.getElementById("IntGraphEnl").style.display = "none";
		document.getElementById("SaveIcon").style.display = "none";
		document.getElementById("selArea").style.display = "none";

		document.getElementById("resultsEE").style.display = "initial";

		document.getElementById("topcolor").className= "EEColor";

		initializeEE();

	}


}

function zoneQuakeSetParam() {
	if (document.getElementById("zoneQuake").value == "MED"){
		maxLatA =  Math.ceil(maxLatMed);
		minLatA =  Math.floor(minLatMed);
		minLonA =  Math.floor(minLonMed);
		maxLonA =  Math.ceil(maxLonMed);
		maxYearA = maxYearMed;
	}

	if (document.getElementById("zoneQuake").value == "ITA"){
		maxLatA =  Math.ceil(maxLatIta);
		minLatA =  Math.floor(minLatIta);
		minLonA =  Math.floor(minLonIta);
		maxLonA =  Math.ceil(maxLonIta);
		minYearA = minYearIta;
		maxYearA = maxYearIta;

	}
	if (document.getElementById("zoneQuake").value == "BOTH"){
		maxLatA =  Math.ceil(maxLat);
		minLatA =  Math.floor(minLat);
		minLonA =  Math.floor(minLon);
		maxLonA =  Math.ceil(maxLon);
		minYearA = minYear;
		maxYearA = maxYear;
	}

	maxLatA = maxLatA+0.5
	minLatA = minLatA-0.5
	minLonA = minLonA-0.5
	maxLonA = maxLonA+0.5

	latLngBounds = new google.maps.LatLngBounds(
				   new google.maps.LatLng(minLatA, minLonA),new google.maps.LatLng(maxLatA, maxLonA)
	)

	if (EqMapFlag != 0) {  // if not first time: resize rectangle and set input lat/lon!


			var elem_lat1 = document.getElementById("LatS");
			elem_lat1.value = minLatA;

			var elem_lat2 = document.getElementById("LatN");
			elem_lat2.value = maxLatA;

			var elem_lon1 = document.getElementById("LonW");
			elem_lon1.value = minLonA;

			var elem_lon2 = document.getElementById("LonE");
			elem_lon2.value = maxLonA;
	}
}

function CreateRect() {

	document.getElementById('selArea').style.display = "none";
	$('#clickOK').show();

	document.getElementById('NoselArea').style.display = "block";

	rectangle = new google.maps.Rectangle({
		strokeColor: '#1f708f',
		strokeOpacity: 0.8,
		strokeWeight: 3,
		fillColor: '#FF0000',
		fillOpacity: 0.01,
		map: map,
		bounds: latLngBounds,
		editable: true,
		draggable: true,
	});

	//   rectangle.setMap(null)
	map.fitBounds(latLngBounds);


	// Listener che monitora il cambiamento dei bounds del rettangolo in mappa e aggiorna i campi di testo del form
	google.maps.event.addListener(rectangle, 'bounds_changed', function() {

		//acquisisco i vertici del rettangolo
		bounds = rectangle.getBounds();
		var lat1 = bounds.getSouthWest().lat();
		var lat2 = bounds.getNorthEast().lat();
		var lon1 = bounds.getSouthWest().lng();
		var lon2 = bounds.getNorthEast().lng();

		//arrotondo a 2 decimali
		lat1 = Math.round(lat1*100)/100;
		lat2 = Math.round(lat2*100)/100;
		lon1 = Math.round(lon1*100)/100;
		lon2 = Math.round(lon2*100)/100;

		if (lat1 > lat2) {
		   var lat2a = lat1
		   lat1 = lat2
		   lat2 = lat2a
		}

		// aggiorno i campi del form
		var elem_lat1 = document.getElementById("LatS");
		elem_lat1.value = lat1;

		var elem_lat2 = document.getElementById("LatN");
		elem_lat2.value = lat2;

		var elem_lon1 = document.getElementById("LonW");
		elem_lon1.value = lon1;

		var elem_lon2 = document.getElementById("LonE");
		elem_lon2.value = lon2;

		latLngBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(lat1, lon1),
			new google.maps.LatLng(lat2, lon2)
		);
	});
}

function resizeRect() {

	var lat1 = Number((parseFloat(document.getElementById("LatS").value)).toFixed(2));
	var lat2 = Number((parseFloat(document.getElementById("LatN").value)).toFixed(2));
	var lon1 = Number((parseFloat(document.getElementById("LonW").value)).toFixed(2));
	var lon2 = Number((parseFloat(document.getElementById("LonE").value)).toFixed(2));

	latLngBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat1, lon1),
      new google.maps.LatLng(lat2, lon2)
	  );

	rectangle.setBounds(latLngBounds);
};

function SwitchIoMM(passed) {

	param=passed;

	if (param == 'MM')  {
		$("#Io").css({"background-color": "white", "color": "#1f708f", "border": "1px solid #1f708f","opacity": "0.3", "cursor": "pointer"});
		$("#MM").css({"background-color": "#1f708f", "color": "white", "border": "0px","opacity": "1.0", "cursor": "auto"});
		$("#MMDIV").css({"display": "block"});
		$("#IoDIV").css({"display": "none"});
		$("#sliderM").css({"display": "block"});
		$("#sliderI").css({"display": "none"});
	} else {
		$("#MM").css({"background-color": "white", "color": "#1f708f", "border": "1px solid #1f708f","opacity": "0.3", "cursor": "pointer"});
		$("#Io").css({"background-color": "#1f708f", "color": "white", "border": "0px","opacity": "1.0","cursor": "auto"});
		$("#IoDIV").css({"display": "block"});
		$("#MMDIV").css({"display": "none"});
		$("#sliderM").css({"display": "none"});
		$("#sliderI").css({"display": "block"});
		}
};


// ---------------------- GRAFICO
function drawChart(yearmin, yearmax) {

	chart = new google.visualization.ColumnChart(
		document.getElementById('IntGraphINDEX'));
		dataChart = new google.visualization.DataTable();
		dataChart.addColumn( 'datetime', 'timevent');
		dataChart.addColumn( 'number', 'intensty');
		dataChart.addColumn({type: 'string', role: 'style'});
		dataChart.addColumn({type: 'string', role: 'tooltip'});

		var Year = []
		var Month = []
		var Day = []
		var Hour = []
		var Minu = []
		var Sec = []
		var fIS = []
		var locat = []

		var minY = 2050;
		var maxY = 0;

	for(var i = 0; i < chartArray.length; i++){
			// if more parameters needed, go up and save them in chartArray
			var RecTer = chartArray[i];

			Year[i] = RecTer['Year']
			Month[i] = RecTer['Month']
			Day[i] = RecTer['Day']
			Hour[i] = RecTer['Hour']
			Minu[i] = RecTer['Minu']
			Sec[i] = RecTer['Sec']
			fIS[i] = RecTer['Io']
			locat[i] = RecTer['Location']

		// find minimum and maximum year - for axis limit
		if (Year[i]<minY) minY = Year[i];
		if (Year[i]>maxY) maxY = Year[i];

		n[i] = new Date();
		n[i].setUTCFullYear(Year[i], Month[i]-1, Day[i], Hour[i], Minu[i], Sec[i]) // in realtà l'ora non la considera!!!!!
		d[i] = RecTer['DateLabel'] + ' ' + RecTer['TimeLabel']
		text = 	 d[i] + " - Io: " + fIS[i] + ' - ' + locat[i];//CORREGGERE
		if (fIS[i]==0) fIS[i] = 1

		dataChart.addRow ([n[i], fIS[i], '#1f708f', text]);
	}


	// fake bars for xlimits (causa date negative, non si riesce altrimenti)
	// time limits depend on filters! (bounds chosen by user)
	nmin = new Date(yearmin, 1, 1, 00, 00, 00)
	nmax = new Date(yearmax +3, 1, 1, 00, 00, 00)

	texthid = '';
	dataChart.addRow ([nmin, 0, '#1f708f', texthid]);
	dataChart.addRow ([nmax, 0, '#1f708f', texthid]);

	options = {
		width: 450,
		height: 110,
		chartArea:{left:45,right:15,top:10,bottom:20,width: "100%", height: "100%"},
		legend: {position: 'none'},
		backgroundColor: 'transparent',
		bar: {groupWidth: "1"},

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
			title: 'Io MCS',
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

	var options2 = {
		width: 1100,
		height: 300,
		chartArea:{left:80,right:15,top:10,bottom:20,width: "100%", height: "100%"},
		legend: {position: 'none'},
		backgroundColor: 'transparent',
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

		    minorGridlines: {
				count: -1,
				interval: [1,2,5],
				units: {
					years: {format: 'yyyy'
						
				    }
				}
			}
		},
		vAxis: {
			title: 'Io - MCS Int.',
			textStyle : {
				fontSize: 13,
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
		saveIconDiv.innerHTML = '<a href="' + chart2.getImageURI() + '" download="chart.png"><img src="./images/saveicon.jpg" width = "12px"></a>';
	});
	chart2.draw(dataChart, options2);
	chart.draw(dataChart, options);

	$(function() {
		$('#EnlargeGraph').click(function(event) {
			$('#IntGraphEnl').hide();
			$('#IntGraphRed').show();
			document.querySelector('#IntGraphINDEX').style.width = Math.round(w - 30)+'px';
			options.width = w-40;
			chart.draw(dataChart, options);
		});
		$('#ReduceGraph').click(function(event) {
			$('#IntGraphEnl').show();
			$('#IntGraphRed').hide();
			document.querySelector('#IntGraphINDEX').style.width = '450px';
			options.width = 450;
			chart.draw(dataChart, options);
		});
		$('#closeOKwarning').click(function(event) {
			$('#clickOK').hide();
		});
	});

};


// -------- FUNCTION TO CREATE SLIDERS IN THE MENU (for magnitude, intensity and time)
function createSliders(){

	// ------------ PERIOD SLIDER
	var sliderT = document.getElementById('sliderT');
	var StartDate = document.getElementById('StartDate');
	var StopDate = document.getElementById('StopDate');

	noUiSlider.create(sliderT, {
		start: [-760, 1997],
		step: 1,
		connect: true,
		range: {
			'min': -760,
			'max': 1997
		}
	});

	sliderT.noUiSlider.on('update', function( values, handle ) {
		var value = values[handle];
		if ( handle ) {
			StopDate.value = Math.round(value);
		} else {
			StartDate.value = Math.round(value);
		}
	});

	StartDate.addEventListener('change', function(){
		sliderT.noUiSlider.set([this.value, null]);
	});

	StopDate.addEventListener('change', function(){
		sliderT.noUiSlider.set([null, this.value]);
	});


	// ---------- INTENSITY SLIDER
	var sliderI = document.getElementById('sliderI');
	var StartIo = document.getElementById('StartIo');
	var StopIo = document.getElementById('StopIo');
	var falseCheck = document.getElementById('flagfalseeq');

	noUiSlider.create(sliderI, {
		start: [6, 11],
		step: 1,
		behaviour: 'drag',
		connect: true,
		range: {
			'min': 0,
			'max': 11
		}
	});

	sliderI.noUiSlider.on('update', function( values, handle ) {
		var value = values[handle];
		if ( handle ) {
			StopIo.value = Math.round(value);
		} else {
			StartIo.value = Math.round(value);
			if (value != 0) {
				falseCheck.checked = false;
			}
		}
	});

	StartIo.addEventListener('change', function(){
		sliderI.noUiSlider.set([this.value, null]);
		if (StartIo.value != 0) {
				falseCheck.checked = false;
		}
	});

	StopIo.addEventListener('change', function(){
		sliderI.noUiSlider.set([null, this.value]);
	});

	//listener False
	falseCheck.addEventListener('change', function(){
		if (falseCheck.checked) {
			sliderI.noUiSlider.set([0, null]);
			StartIo.value = 0;
		}
	});


	// -----------  MAGNITUDE SLIDER
	var sliderM = document.getElementById('sliderM');
	var StartMM = document.getElementById('StartMM');
	var StopMM = document.getElementById('StopMM');
	var falseCheck = document.getElementById('flagfalseeq');

	noUiSlider.create(sliderM, {
		start: [5, 7.4],
		step: 0.1,
		behaviour: 'drag',
		connect: true,
		range: {
			'min': 0,
			'max': 7.4
		}
	});

	sliderM.noUiSlider.on('update', function( values, handle ) {
		var value = values[handle];
		if ( handle ) {
			StopMM.value = Math.round(value*10)/10;
		} else {
			StartMM.value = Math.round(value*10)/10;
			if (value != 0) {
				falseCheck.checked = false;
			}
		}
	});

	StartMM.addEventListener('change', function(){
		sliderM.noUiSlider.set([this.value, null]);
		if (StartMM.value != 0) {
				falseCheck.checked = false;
		}
	});

	StopMM.addEventListener('change', function(){
		sliderM.noUiSlider.set([null, this.value]);
	});

	falseCheck.addEventListener('change', function(){
		if (falseCheck.checked) {
			sliderM.noUiSlider.set([0, null]);
			StartMM.value = 0;
		}
	});
}
