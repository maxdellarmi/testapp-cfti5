
	window.addEventListener("load", function(){
	window.cookieconsent.initialise({
	  "palette": {
		"popup": {
		  "background": "#eeeeee",
		  "text": "#666666"
		},
		"button": {
		  "background": "#1f708f",
		  "text": "#ffffff"
		}
	  },
	  "showLink": false,
	  "position": "bottom",
	  "content": {
		"message": "Questo sito web utilizza i cookie, piccoli file di testo depositati sul vostro terminale (computer, tablet, smartphone, notebook), per raccogliere e analizzare in forma anonima e aggregata informazioni sui vostri comportamenti di navigazione. Questo sito web utilizza Google Analytics, un servizio di analisi web fornito da Google, Inc. (“Google”). Google Analytics utilizza i “cookies”, file di testo depositati sul vostro dispositivo, per consentire di analizzare i comportamenti di utilizzo del sito da parte degli utenti, raccogliere e analizzare in forma anonima le informazioni. Tali informazioni raccolte da Google Analytics vengono trasmesse a Google il quale le elabora allo scopo di redigere report sulle attività svolte sul sito web stesso. Questo sito non utilizza tale strumento di analisi statistica per monitorare o per raccogliere le vostre informazioni personali di identificazione, né consente ad altri di farlo. Google non associa il vostro indirizzo IP a nessun altro dato eventualmente già in possesso di Google, né cerca di collegare un indirizzo IP all’identità di un utente. Google può anche trasferire queste informazioni a terzi ove ciò sia imposto dalla legge o laddove tali terzi trattino le suddette informazioni per conto di Google. <a href='https://support.google.com/analytics/answer/6004245?hl=it&ref_topic=2919631' target='_blank'>Approfondisci</a> <br>Potete rifiutarvi di usare i cookies selezionando l’impostazione appropriata sul vostro browser, ma ciò potrebbe impedirvi di utilizzare tutte le funzionalità di questo sito web. Utilizzando questo sito web voi acconsentite all’uso dei nostri cookies.<br><br> This website uses cookies, which are small data files that it creates and stores on your computer (PC, tablet, laptop, smartphone, etc.), to anonymously gather bulk information on how our visitors navigate the site. This website uses Google Analytics, a web analytics service provided by Google Inc. (“Google”), with the IP address anonymization. Google Analytics uses “cookies”, which are text files placed on your device, to help the website analyze how users use the site. The statistical information collected by Google Analytics is sent to Google for creating a report on the activity of the website. This website does not use this tool for statistical analyses to collect your personal data, nor does it allow others to do it. Google does not associate your IP to any other information it may already own, nor does it attempt to link an IP address to the identity of a user. Google may transfer this information to third parties if there is a legal obligation to do so, or if such third parties analyze the information on behalf of Google. <a href='https://support.google.com/analytics/answer/6004245?hl=en&ref_topic=2919631' target='_blank'>Read more</a><br> You can choose to disable the use of cookies at any time by selecting the relevant options in your browser’s preferences. Users must be aware, however, that doing this they may prevent some of the site functionalities to operate properly. By using our services, you agree to our use of cookies.",
		"dismiss": "OK"
	  }
	})});



// flags
var flagPQ;
var flagEEaccess;
var flagLOCaccess;
var flagLOC; // serve per questioni righe tabelle, se indice è nloc (da locality.js o da index_loc)
var flagEQ;
var EqMapFlag = 0;
var FlagScroll = 1;

var sortEq = new Array();
var Langsel; //LANGUAGE SELECTED DEI POPUP
var iMarker;

var map;

var centerLat = 42;
var centerLon = 13.5; // ERA 16, l'HO CAMBIATO
var ss, v, d, w, h, s;
var lSpider = 0;
// var StarH;  VECCHIA STELLINA GIALLA AL CLICK SU UN TERREMOTO
var StarCLICK_O;
var StarCLICK_R;
var Marker1;
var MarkerOR=[];
var oms; //spiderfier
var sClick = "MARK";
var NterrOld = 0;  // spostato da index.js

// Export
var CarRet = String.fromCharCode(13);
var virg = String.fromCharCode(34);
var filename = '';
var ExportText = '';
var ExportKml = '';
var ExportKmlR = '';
var EpiIcon;
var IsIcon;

// abbr title for links to PDF (used for all comments' biblio and quake biblio)
var biblioEQ_pdfT_abbrIT = "Link al PDF del testo trascritto"
var biblioEQ_pdfR_abbrIT = "Link al PDF della scansione del testo"
var biblioEQ_pdfT_abbrEN = "Link to PDF of transcribed text"
var biblioEQ_pdfR_abbrEN = "Link to PDF of scanned text"

// abbr titles for link to quake (used in ACCESS EE and LOCALITY-EE-NP)
var EElinkEQabbr_IT = "Link alla pagina del terremoto"
var EElinkEQabbr_EN = "Link to earthquake page"

//----------------- LEVEL OF study
var level_abbrTitle_IT = 'Livello di approfondimento dello studio della sequenza sismica: <br> '
var level_abbr_IT = ['SPEDITIVO', 'INTERMEDIO', 'APPROFONDITO']
var level_abbrTitle_EN = 'Level of review of the earthquake sequence: <br> '
var level_abbr_EN = ['LOW', 'MEDIUM', 'HIGH']
var levelID = ['levelS', 'levelI', 'levelA']

// external files
var pdflist = [];
var pdflist2 = [];

// EEclassification
var EEclass = []
var class_titleEE_IT = [];
var class_titleEE_EN = [];
var class_codeEE = [];

// COLOR AND SCALE EPICENTER MARKERS
var color1 = '#f7e13b';
var color2 = '#ffad0a';
// var color3 = '#f95200';
var color3 = '#f93a00';
var color4 = '#910000';

var StarScale1 = 0.05;
var StarScale2 = 0.07;
var StarScale3 = 0.08;
var StarScale4 = 0.10;
var CircleScale1 = 5;
var CircleScale2 = 6;
var CircleScale3 = 7;
var CircleScale4 = 8;

// anchor PQ square markers
var PQanchor1 = 7;
var PQanchor2 = 5;

//----------------- EE classification from external file

//$.get('EE_classif.txt', function(data){
//http://localhost/OtherFilesService/EE_classif.txt
$.get('/OtherFilesService/EE_classif.txt', function(data){
	EEclass = data.split('\n');
	for (var i = 0; i < EEclass.length; i++) {
		line = EEclass[i].split(/\t/)
		class_codeEE[i] = line[0];
		class_titleEE_IT[i] = line[1];
		class_titleEE_EN[i] = line[2];
	}
});



// ====== READ TXT FILES WITH PDF LIST AND ASMI/CPTI LINKS
//$.get('listapdfT.txt', function(data){
//http://localhost/OtherFilesService/listapdfT.txt
$.get('/OtherFilesService/listapdfT.txt', function(data){
            pdflist = data.split(',');
            //console.log(pdflist);
});

// $.get('listapdfR.txt', function(data){
//http://localhost/OtherFilesService/listapdfR.txt
$.get('/OtherFilesService/listapdfR.txt', function(data){
           pdflist2 = data.split(',');
           //console.log(pdflist);
});



/////////// tolto per ora
// ===== MAP SETTINGS
// var mapOptions = {
// 	center: new google.maps.LatLng(centerLat,centerLon),
// 	mapTypeControlOptions: {
// 		style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,
// 		position:google.maps.ControlPosition.TOP_RIGHT,
// 		mapTypeIds: ['emmamap',google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.HYBRID ]
// 	},
// 	streetViewControl:false,
// 	clickableIcons: false,   //fa in modo che gli oggetti cliccabili sulla base google siano disattivati
// 	maxZoom : 15,
// 	minZoom : 4,
// 	zoom: 6,
// 	controlSize: 25,
// 	scaleControl: true,
// 	scrollwheel: true,
// 	overviewMapControl:true,
// 	overviewMapControlOptions : {opened: true},
// 	fullscreenControl: true,
// 	fullscreenControlOptions: {
// 		position: google.maps.ControlPosition.RIGHT_BOTTOM
// 	},
// 	zoomControlOptions: {
// 		position: google.maps.ControlPosition.RIGHT_BOTTOM
// 	},
// };




function externalLinks() {
  for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) {
    var b = c[a];
    b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank")
  }
}


// QUESTA FUNZIONE NON PARE USATA
// function isInfoWindowOpen(infoWindow){
//     var mapX = infoWindow.getMap();
//     return (mapX !== null && typeof mapX !== "undefined");
// }

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

var EMMAMapType = new google.maps.StyledMapType([
	{ stylers: [{ saturation: -100 }]},
	{ "featureType": "water", "elementType": "all", "stylers": [{ "color": "#eaf7f7" }, { "visibility": "on" }]}
	],
	{name: 'Basemap'});

//////// svuotata funzione placemap
function placeMap() {

	// $("body").css("cursor", "wait");
	// map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// map.mapTypes.set('emmamap', EMMAMapType);
	// map.setMapTypeId('emmamap');
  //
	// google.maps.event.addListener(map, 'mousemove', function (event) {
	// 	displayCoordinates(event.latLng);
	// });
	// resizeMap();
  //
	// google.maps.event.addListener(map,'tilesloaded',function(){
	// 	$("body").css("cursor", "default");
	// });
  //
	// //--------- questo non serviva prima che google cambiasse le api ad agosto 2018. ora serve perchè non usiamo più la crocetta di chiusura IW creata
	// //------ da noi, ma quella automatica di google
	// google.maps.event.addListener(infowindow,'closeclick',function(){
	// 	turnoffRow();
	// });
  //
	// //----------------------------     TUTTA LA ROBA COMMENTATA QUA SOTTO ERA PER LA GESTIONE DELLO STILE DELLE INFOWINDOW PRIMA CHE GOOGLE CAMBIASSE LE API AD AGOSTO 2019     --------------------------------
	// // google.maps.event.addListener(infowindow, 'domready', function() {
	// //
	// //    // Reference to the DIV which receives the contents of the infowindow using jQuery
	// //    var iwOuter = $('.gm-style-iw');
	// //    iwOuter.css({
	// // 	   'box-shadow': '0px 1px 6px rgba(178, 178, 178, 0.6)',
	// // 	   'border': '1px solid rgba(178, 178, 178, 0.8)'
	// //    });
	// //
	// //    // Moves the infowindow 10px to the right.
	// // //    iwOuter.parent().parent().css({left: '15px'});
	// //
	// //    /* The DIV we want to change is above the .gm-style-iw DIV.
	// //     * So, we use jQuery and create a iwBackground variable,
	// //     * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
	// //     */
	// //    var iwBackground = iwOuter.prev();
	// //
	// //    // Remove the background shadow DIV
	// //    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
	// // // iwBackground.children(':nth-child(2)').hide()
	// //
	// //    // Remove the white background DIV
	// //     iwBackground.children(':nth-child(4)').css({'backgroundColor' : 'rgbs(255,255,255,0)'});
	// //     iwBackground.children(':nth-child(4)').css({'display' : 'none'});
	// //
	// //
	// //    // Moves the shadow of the arrow 76px to the left margin
	// // 	// iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 205px !important;'});
	// //
	// // 	// Moves the arrow 76px to the left margin
	// // 	// iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 205px !important;'});
	// //
	// //    // Changes the desired color for the tail outline.
	// // 	// The outline of the tail is composed of two descendants of div which contains the tail.
	// // 	// The .find('div').children() method refers to all the div which are direct descendants of the previous div.
	// // 	iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(178, 178, 178, 0.8) 0px 1px 6px', 'z-index' : '2'});
	// //
	// // 	// Taking advantage of the already established reference to
	// // 	// div .gm-style-iw with iwOuter variable.
	// // 	// You must set a new variable iwCloseBtn.
	// // 	// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
	// // 	// Is this div that groups the close button elements.
	// // 	var iwCloseBtn = iwOuter.next();
	// //
	// // 	// Apply the desired effect to the close button
	// // 	iwCloseBtn.css({
	// // 	  opacity: '1', // by default the close button has an opacity of 0.7
	// // 	  right: '40px', top: '20px', // button repositioning
	// // 	  'border-radius': '13px'
	// // 	});
	// // 	iwCloseBtn.hide() // nascondi closebutton perchè ci abbiamo messo una crocetta, per problemi di area clickabile sbagliata con il bottone di google
	// //
	// // });
	// //
	// // google.maps.event.addListener(infowindow2, 'domready', function() {
	// //
	// //    // Reference to the DIV which receives the contents of the infowindow using jQuery
	// //    var iwOuter = $('.gm-style-iw');
	// //    iwOuter.css({
	// // 	   'box-shadow': '0px 1px 6px rgba(178, 178, 178, 0.6)',
	// // 	   'border': '1px solid rgba(178, 178, 178, 0.8)'
	// //    });
	// //
	// //    // Moves the infowindow 10px to the right.
	// // //    iwOuter.parent().parent().css({left: '15px'});
	// //
	// //    /* The DIV we want to change is above the .gm-style-iw DIV.
	// //     * So, we use jQuery and create a iwBackground variable,
	// //     * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
	// //     */
	// //    var iwBackground = iwOuter.prev();
	// //
	// //    // Remove the background shadow DIV
	// //    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
	// // // iwBackground.children(':nth-child(2)').hide()
	// //
	// //    // Remove the white background DIV
	// //     iwBackground.children(':nth-child(4)').css({'backgroundColor' : 'rgbs(255,255,255,0)'});
	// //     iwBackground.children(':nth-child(4)').css({'display' : 'none'});
	// //
	// //
	// //    // Moves the shadow of the arrow 76px to the left margin
	// // 	// iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 205px !important;'});
	// //
	// // 	// Moves the arrow 76px to the left margin
	// // 	// iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 205px !important;'});
	// //
	// //    // Changes the desired color for the tail outline.
	// // 	// The outline of the tail is composed of two descendants of div which contains the tail.
	// // 	// The .find('div').children() method refers to all the div which are direct descendants of the previous div.
	// // 	iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(178, 178, 178, 0.8) 0px 1px 6px', 'z-index' : '2'});
	// //
	// // 	// Taking advantage of the already established reference to
	// // 	// div .gm-style-iw with iwOuter variable.
	// // 	// You must set a new variable iwCloseBtn.
	// // 	// Using the .next() method of JQuery you reference the following div to .gm-style-iw.
	// // 	// Is this div that groups the close button elements.
	// // 	var iwCloseBtn = iwOuter.next();
	// //
	// // 	// Apply the desired effect to the close button
	// // 	iwCloseBtn.css({
	// // 	  opacity: '1', // by default the close button has an opacity of 0.7
	// // 	  right: '40px', top: '20px', // button repositioning
	// // 	  'border-radius': '13px'
	// // 	});
	// // 	iwCloseBtn.hide() // nascondi closebutton perchè ci abbiamo messo una crocetta, per problemi di area clickabile sbagliata con il bottone di google
	// //
	// // });
	// //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //
  //
	// // ------------------------         LISTENER PER MAP OVERLAYS
  // map.addListener('zoom_changed', function() {
  //   // 3 seconds after the center of the map has changed, pan back to the
  //   // marker.
  //   if (map.getZoom() > 11) {
	// 	document.getElementById('IGM100').disabled = false; document.getElementById('TopoIGM100').style.color = "black";
	// 	document.getElementById('FL').disabled = false; document.getElementById('FraneLin').style.color = "black";
	// 	document.getElementById('FP').disabled = false; document.getElementById('FranePol').style.color = "black";
	// 	document.getElementById('FD').disabled = false; document.getElementById('FraneDiff').style.color = "black";
	// 	document.getElementById('DGPV').disabled = false; document.getElementById('FraneDGPV').style.color = "black";
	// }
  //
	// if (map.getZoom() < 12) {
	// 	document.getElementById('IGM100').disabled = true; document.getElementById('TopoIGM100').style.color = "#909090"; document.getElementById('IGM100').checked = false; Toggle4 = "on"; ToggleLayer4();
	// 	document.getElementById('FL').disabled = true; document.getElementById('FraneLin').style.color = "#909090"; document.getElementById('FL').checked = false; Toggle11a = "on"; ToggleLayer11a();
	// 	document.getElementById('FP').disabled = true; document.getElementById('FranePol').style.color = "#909090"; document.getElementById('FP').checked = false; Toggle11b = "on"; ToggleLayer11b();
	// 	document.getElementById('FD').disabled = true; document.getElementById('FraneDiff').style.color = "#909090"; document.getElementById('FD').checked = false; Toggle11c = "on"; ToggleLayer11c();
	// 	document.getElementById('DGPV').disabled = true; document.getElementById('FraneDGPV').style.color = "#909090"; document.getElementById('DGPV').checked = false; Toggle11d = "on"; ToggleLayer11d();
	// }
  //
	// if (map.getZoom() > 13) { document.getElementById('IGM25').disabled = false; document.getElementById('TopoIGM25').style.color = "black";}
	// if (map.getZoom() < 14) { document.getElementById('IGM25').disabled = true; document.getElementById('TopoIGM25').style.color = "#909090"; document.getElementById('IGM25').checked = false; Toggle3 = "on"; ToggleLayer3()}
  // });






};

function turnoffRow() {
// When closing popup info window:

	// set table row background back to white
	// if LOC access
	if (flagLOCaccess == 1 || flagEQ == 1) {
		var rowsOld = document.getElementById(NlocOld);
		rowsOld.style.backgroundColor = "#ffffff";
	// if EE access
	} else if (flagEEaccess == 1) {
		var rowsOld = [];
		rowsOld = document.getElementsByClassName(NlocOld);
		for (var i = 0; i < rowsOld.length; i++) {
			rowsOld[i].style.backgroundColor = "#ffffff";
		}
	// if EQaccess, EQpage, LOCpage(when listEQ, not PQ)
	} else {
		var rowsOld = document.getElementById(NterrOld);
		if (flagPQ == 0) {
			rowsOld.style.backgroundColor = "#ffffff";
			// set marker to previous
			if (lSpider == 0){
				Marker1.setIcon(StarCLICK_R)
			} else {
				Marker1.setIcon(StarCLICK_O)
			};
			turnoffBar(); // for locality page
		};
	};
}

function showTEXT(idname){
	document.getElementById(idname).style.display = "block";
	var id1 = "showTEXT" + idname;
	var id2 = "hideTEXT" + idname;
	document.getElementById(id1).style.display = "none";
	document.getElementById(id2).style.display = "inline";
	// document.getElementById(idname).scrollIntoView(false);
}

function hideTEXT(idname){
	document.getElementById(idname).style.display = "none";
	var id1 = "showTEXT" + idname;
	var id2 = "hideTEXT" + idname;
	document.getElementById(id1).style.display = "inline";
	document.getElementById(id2).style.display = "none";
}

function sortNumber(a,b) {
    var avalue = a['date'],
        bvalue = b['date'];
    if (avalue < bvalue) return -1;
    if (avalue > bvalue) return 1;
    return 0;
}

function displayCoordinates(pnt) {
	var coordsLabel = document.getElementById("tdCursor");
	var lat = pnt.lat();
	lat = lat.toFixed(3);
	var lng = pnt.lng();
	lng = lng.toFixed(3);
	coordsLabel.innerHTML = "Lat.:&nbsp&nbsp" + lat + "  Lon.: " + lng;
}

function resizeMap() {


	v=window;
	d=document;
	w = v.innerWidth ? v.innerWidth : d.documentElement.clientWidth;
	h = v.innerHeight ? v.innerHeight : d.documentElement.clientHeight;
    s = d.getElementById('WSzPlgIn');

    if (document.querySelector('#mapOL') !== null ) {
		document.querySelector('#mapOL').style.width = Math.round(w - 480) + 'px';
		document.querySelector('#mapOL').style.height = Math.round(h - 10) + 'px';
	}
	//////// document.querySelector('#map').style.width = Math.round( w -480)+'px';
    //////// document.querySelector('#map').style.height = Math.round( h -10)+'px';
	document.querySelector('#leftside').style.height = Math.round( h -55)+'px';




}

// ============= Pop up window for quake info
	// Function that opens pop up window with quake info and highlights marker and table row,
	// when clicking on marker
function openPopupSpider (marker, textEN, textIT, NterrI, lat, lon){
	//console.log('openPopupSpider ... qui viene mantenuta solo la dichiarazione del click sull elemento per la tabella.')
	google.maps.event.addListener(marker, 'click', function() {
		//console.log('openPopupSpider GMAPS EVENT CLICK element called');
		//region GESTIONE VECCHIA COMMENTATA
		// gmstyleclose();
		//
		// if (map.getZoom()<7) {
		// 	var center = new google.maps.LatLng(lat, lon);
		//     map.panTo(center);
		// 	map.setZoom(7);
		// }

		// turn off previously selected marker, when directly clicking on a new marker
		// The 'if' defines the case when selection comes from spiderfier the first time (in this case don't set Marker1 to Star1, otherwise one of the spiderfied markers turns red on click!). The beginning value is lSpider = 0. When entering here from spiderfier the first time (Marker1 turns red), this becomes 1 (after Marker1 turnsorange).

		// if (lSpider == 0 ){
		// 	if (Marker1) {
		// 		Marker1.setIcon(StarCLICK_R);
		// 	}
		// }
		// else {
		// 	if (Marker1) {
		// 		Marker1.setIcon(StarCLICK_O);
		// 	}
		// };

		//POPUP GESTITO DIVERSAMENTE specify language of popup window
	  //  if (Langsel == "EN") {
		// 	textEN = textEN.split(biblioEQ_pdfT_abbrIT).join(biblioEQ_pdfT_abbrEN)
		//    textEN = textEN.split(biblioEQ_pdfR_abbrIT).join(biblioEQ_pdfR_abbrEN)
		//    textEN = textEN.split(flag1descr['IT']).join(flag1descr['EN'])
		//    textEN = textEN.split(flag2descr['IT']).join(flag2descr['EN'])
		//    textEN = textEN.split(flag3descr['IT']).join(flag3descr['EN'])
		//    textEN = textEN.split(flagMED1descr['IT']).join(flagMED1descr['EN'])
		//    textEN = textEN.split(flagMED2descr['IT']).join(flagMED2descr['EN'])
		//    for (var i=0; i<class_codeEE.length; i++){
		// 	   textEN = textEN.split(class_titleEE_IT[i]).join(class_titleEE_EN[i])
		//    }
		//    infowindow.setContent(textEN);
	  //
	  //  } else {
		// 	textIT = textIT.split(biblioEQ_pdfT_abbrEN).join(biblioEQ_pdfT_abbrIT)
		//    textIT = textIT.split(biblioEQ_pdfR_abbrEN).join(biblioEQ_pdfR_abbrIT)
		//    textIT = textIT.split(flag1descr['EN']).join(flag1descr['IT'])
		//    textIT = textIT.split(flag2descr['EN']).join(flag2descr['IT'])
		//    textIT = textIT.split(flag3descr['EN']).join(flag3descr['IT'])
		//    textIT = textIT.split(flagMED1descr['EN']).join(flagMED1descr['IT'])
		//    textIT = textIT.split(flagMED2descr['EN']).join(flagMED2descr['IT'])
		//    for (var i=0; i<class_codeEE.length; i++){
		// 	   textIT = textIT.split(class_titleEE_EN[i]).join(class_titleEE_IT[i])
		//    }
		//    infowindow.setContent(textIT);
	  //  }
	  //
		// // open popup window
		// infowindow.open(map, marker);
	  //
		// $('section').translatable({
		//   contentNodeSelector     : 'span.gtranslate'
		// , translateButtonSelector : 'a[href="#translate"]'
	  // //        , autoChangeButtonText    : false
	  // //        , language                : 'en'
	  // //        , debug                   : true
		// });
		//endregion

		// scroll to selected table row EVENTO DICHIARAZIONE PER CLICK sulla TABELLA A SINISTRA
		var rows = document.getElementById(NterrI);
		if (FlagScroll == 1){ // do it only if selection from map marker
			try {
				rows.scrollIntoView(false);
			}
			catch (e) { console.log ('ERR gestito |'); console.log(e); console.log("ERR DESCRIPTION: se ha trovato un elemento null vuol dire che non presente nella tabella a sinsitra")}
		}
		FlagScroll = 1;

		// turn off previously selected table row when clicking on new marker
		if (NterrOld) {
			var rowsOld = document.getElementById(NterrOld);
			if (rowsOld!=null && rowsOld!= undefined) {
				rowsOld.style.backgroundColor = "#ffffff";
			}
		}

		// highlight new table row
		if (rows!=null && rows!= undefined) rows.style.backgroundColor = "#ffffaa";
		NterrOld = NterrI;

		//region GESTIONE VECCHIA COMMENTATA
		// // Clicked icons: yellow color for highlighted marker
		// var iconCL = marker.icon;
		// var pathCL = iconCL.path;
		// if (pathCL == 0) {
		// 	var anchorCL = new google.maps.Point(0,0);
		// } else {
		// 	anchorCL = new google.maps.Point(125,125)
		// };
		//
		// var scaleCL = iconCL.scale;
		// // SET COLOR BACK TO INITIAL; BY CHECKING ICON SCALE - needed for marker1
		// if (scaleCL == StarScale1 || scaleCL == CircleScale1) var fillColor = color1
		// else if (scaleCL == StarScale2 || scaleCL == CircleScale2) var fillColor = color2
		// else if (scaleCL == StarScale3 || scaleCL == CircleScale3) var fillColor = color3
		// else if (scaleCL == StarScale4 || scaleCL == CircleScale4) var fillColor = color4
		//
		// // var fillColorCL = iconCL.fillColor;
		// var fillOpacityCL = iconCL.fillOpacity;
		// var strokeColorCL = iconCL.strokeColor;
		// var strokeOpacityCL = iconCL.strokeOpacity;
		// var strokeWeightCL = iconCL.strokeWeight;
		// var scaleCL = iconCL.scale;
		// if (strokeColorCL) {
		// 	// StarH = {path: pathCL, strokeColor: '#FFE51E' , fillColor: '#FFE51E', fillOpacity: fillOpacityCL, strokeOpacity: strokeOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// 	StarCLICK_O = {path: pathCL, strokeColor: '#1f708f' , fillColor: '#1f708f', fillOpacity: fillOpacityCL, strokeOpacity: strokeOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// 	StarCLICK_R = {path: pathCL, strokeColor: fillColor , fillColor: fillColor, fillOpacity: fillOpacityCL, strokeOpacity: strokeOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// }
		// else {
		// 	// StarH = {path: pathCL, fillColor: '#FFE51E', fillOpacity: fillOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// 	StarCLICK_O = {path: pathCL, fillColor: '#1f708f', fillOpacity: fillOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// 	StarCLICK_R = {path: pathCL, fillColor: fillColor, fillOpacity: fillOpacityCL, anchor: anchorCL, strokeWeight: strokeWeightCL, scale: scaleCL};
		// }
		// Marker1 = marker;
		//endregion
	});
}

// ------------------- SPIDERFIER (for nearby markers)
function spiderfy() {

	oms = new OverlappingMarkerSpiderfier(map,
	{markersWontMove: true, markersWontHide: true});

	// Activate spiderfy: change color to orange (Spiderfied markers)
	oms.addListener('spiderfy', function(markersSP) {
		lSpider = 1;

		if (sClick == "MARK") {
			// operazioni da fare perchè parte prima l'open popup
			var rowsOld = document.getElementById(NterrOld);
			rowsOld.style.backgroundColor = "#ffffff";
			infowindow.close();
			Marker1.setIcon(StarCLICK_O);
			// Se vieni da pagina località, spegni bar del grafico
			if (flagLOC == 1){
				turnoffBar()
			}

			// Riporta in alto la prima riga della tabella (toglie scroll) - DA SISTEMARE, non tiene conto del sorter
			// var rows = document.getElementById('Loc_info').getElementsByTagName('tr');
			// row1 = rows[0];
			var row1 = document.getElementById(Nterr1);
			row1.parentNode.scrollTop = row1.offsetTop; //scrollIntoView(true);


		};
		for(i = 0; i < markersSP.length; i++){
			var iconSP = markersSP[i].icon;
			var pathSP = iconSP.path;
			if (pathSP == 0) {
				var anchorSP = new google.maps.Point(0,0);
			} else {
			anchorSP = new google.maps.Point(125,125)
			};
			var fillColorSP = iconSP.fillColor;
			var fillOpacitySP = iconSP.fillOpacity;
			var strokeColorSP = iconSP.strokeColor;
			var strokeOpacitySP = iconSP.strokeOpacity;
			var strokeWeightSP = iconSP.strokeWeight;
			var scaleSP = iconSP.scale;
			if (strokeColorSP) {
				var StarSP = {path: pathSP, strokeColor: '#1f708f' , fillColor: '#1f708f', fillOpacity: fillOpacitySP, strokeOpacity: strokeOpacitySP, anchor: anchorSP, strokeWeight: strokeWeightSP, scale: scaleSP};
				// Star1 = StarSP
			}
			else {
				var StarSP = {path: pathSP, fillColor: '#1f708f', fillOpacity: fillOpacitySP, anchor: anchorSP, strokeWeight: strokeWeightSP, scale: scaleSP};
				// Star1 = StarSP
			}
			//MarkerOR[i] = markersSP[i];
			markersSP[i].setIcon(StarSP);
			markersSP[i].setZIndex(5000);
		}
		if (sClick == "LIST") {
			//Marker1.setIcon(StarH);
			sClick = "MARK";
		};
	});


	// Close spiderfy: set color back to red (unselected marker)
	// Star1 here needs to the same as StarUN (so that later, when closing popup window after closing spiderfied, the highlitghted star goes back to red and not orange!)
	oms.addListener('unspiderfy', function(markersUN) {
		lSpider = 0;
		for(i = 0; i < markersUN.length; i++){
			var iconUN = markersUN[i].icon;
			var pathUN = iconUN.path;
			if (pathUN == 0) {
				var anchorUN = new google.maps.Point(0,0);
			} else {
				anchorUN = new google.maps.Point(125,125)
			};
			var strokeColorUN = iconUN.strokeColor;
			var scaleUN = iconUN.scale;
			// SET COLOR BACK TO INITIAL; BY CHECKING ICON SCALE
			if (scaleUN == StarScale1 || scaleUN == CircleScale1) var fillColorUN = color1
			else if (scaleUN == StarScale2 || scaleUN == CircleScale2) var fillColorUN = color2
			else if (scaleUN == StarScale3 || scaleUN == CircleScale3) var fillColorUN = color3
			else if (scaleUN == StarScale4 || scaleUN == CircleScale4) var fillColorUN = color4

			var fillOpacityUN = iconUN.fillOpacity;

			var strokeOpacityUN = iconUN.strokeOpacity;
			var strokeWeightUN = iconUN.strokeWeight;
			var scaleUN = iconUN.scale;
			if (strokeColorUN) {
				var StarUN = {path: pathUN, strokeColor: fillColorUN , fillColor: fillColorUN, fillOpacity: fillOpacityUN, strokeOpacity: strokeOpacityUN, anchor: anchorUN, strokeWeight: strokeWeightUN, scale: scaleUN};
				}
			else {
				var StarUN = {path: pathUN, fillColor: fillColorUN, fillOpacity: fillOpacityUN, anchor: anchorUN, strokeWeight: strokeWeightUN, scale: scaleUN};
				}
			markersUN[i].setIcon(StarUN);
		}
	});
}


function downloadCSV(){
	var ExportTextC = "File downloaded from CFTI5Med" + CarRet + "E. Guidoboni, G. Ferrari, D. Mariotti, A. Comastri, G. Tarabusi, G. Sgattoni, G. Valensise (2018) - CFTI5Med, Catalogo dei Forti Terremoti in Italia (461 a.C.-1997) e nell’area Mediterranea (760 a.C.-1500). Istituto Nazionale di Geofisica e Vulcanologia (INGV). http://storing.ingv.it/cfti/cfti5/" + CarRet + CarRet + ExportText;
	var link = window.document.createElement("a");
	link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(ExportTextC));
	link.setAttribute("download", filename + ".csv");
	document.body.appendChild(link);
	link.click();
}

function downloadKML(){
	var blobdata = new Blob([ExportKml],{type : 'text/csv'});
	var link = window.document.createElement("a");
	link.setAttribute("href", window.URL.createObjectURL(blobdata));
	link.setAttribute("download", filename + ".kml");
	document.body.appendChild(link)
	link.click();
}



function readBiblio(XMLlist, xmltagname){
    var codbib = [];
    var titolo = [];
    var anno = [];
    var valb = [];
    var valbibcode = [];
    var place = [];
    var author = [];

    var biblio = XMLlist.documentElement.getElementsByTagName(xmltagname);

	if(biblio.length > 0){
		for (var i = 0; i < biblio.length; i++){

			codbib[i] = biblio[i].getElementsByTagName("codbib")[0].childNodes[0].nodeValue;
            titolo[i] = biblio[i].getElementsByTagName("titolo1")[0].childNodes[0].nodeValue;

            if (biblio[i].getElementsByTagName("datacompl").length != 0){
                var flaganno = biblio[i].getElementsByTagName("datacompl")[0].childNodes.length;
    			if (flaganno > 0) {
    				anno[i] = biblio[i].getElementsByTagName("datacompl")[0].childNodes[0].nodeValue;
    			} else {
    				anno[i] = " ";
    			}
            } else anno[i] = " ";

            if (biblio[i].getElementsByTagName("luogoed").length != 0){
                var flagloca = biblio[i].getElementsByTagName("luogoed")[0].childNodes.length;
    			if (flagloca > 0) {
    				place[i] = biblio[i].getElementsByTagName("luogoed")[0].childNodes[0].nodeValue;
    			} else {
    				place[i] = "";
    			}
            } else place[i] = "";

			author[i] = biblio[i].getElementsByTagName("autore1")[0].childNodes[0].nodeValue;

		}
	}
    return [codbib, titolo, anno, place, author]
}

	/***
	 * La pagina per la creazione del link dei terremoti (Pagina del terremoto) DEVE chiamarsi index obbligatoriamente - altrimenti questo pezzo di codice non funziona.
	 * @param urlTOT
	 * @param nterr
	 * @param pagetype
	 * @returns {*}
	 */
	function createQuakePageLink(urlTOT, nterr, pagetype){
     //console.log("createQuakePageLink:" + pagetype );
     //console.log("createQuakePageLink:" + urlTOT );
     //console.log("createQuakePageLink:" + nterr );
	if ( urlTOT.split('/').length >2 ) {
    	var basePath = urlTOT.substring(0, urlTOT.lastIndexOf('/'));
    	urlTOT = basePath + "/";
    	//console.log("basePath:"+ urlTOT);
	}
    if (pagetype == 'index') {
        if (urlTOT.slice(-1) == '#') var QuakeLink = urlTOT.substring(0, urlTOT.length - 1) + 'quake.php?' + nterr;
        else var QuakeLink = urlTOT + 'quake.php?' + nterr;
    } else if (pagetype == 'indexEE'){
        if (urlTOT.slice(-1) == '#'){
        	var QuakeLink = urlTOT.substring(0, urlTOT.length - 1) + 'quake.php?'
        } else {
        	var QuakeLink = urlTOT + 'quake.php?'
        }

    } else if (pagetype == 'locality'){
        if (urlTOT.slice(-1) == '#') urlTOT =  urlTOT.substr(0,urlTOT.length-1);
        var url = urlTOT.substr(0,urlTOT.indexOf('?')-13);
        var QuakeLink = url + '/quake.php?' + nterr;
    } else if (pagetype == 'quake'){
    	//ATTENZIONE QUESTO PEZZO DI CODICE E' NON VERRA PIU CHIAMATO PERCHE' NON FUNZIONAVA BENE LA CHIAMATA CON pagetype == 'quake' VIENE SOSTITUITO CON pagetype == 'index'
		if (urlTOT.slice(-1) == '#') var nchar = urlTOT.length - 19;
        else var nchar = urlTOT.length - 18;
        var url = urlTOT.substr(0,nchar);
        var QuakeLink = url + '/quake.php?' +  nterr;
    }
    return QuakeLink;
}

function createLocalityPageLink(urlTOT, nloc, pagetype){
    if (pagetype == 'indexEE'){
        if (urlTOT.slice(-1) == '#'){
        	var LocalityPage = urlTOT.substring(0, urlTOT.length - 1) + 'locality.php?'
        } else {
        	var LocalityPage = urlTOT + 'locality.php?'
        }
    } else if (pagetype == 'locality'){
        if (urlTOT.slice(-1) == '#') urlTOT =  urlTOT.substr(0,urlTOT.length-1);
        var url = urlTOT.substr(0,urlTOT.indexOf('?')-12);
        var LocalityPage = url + 'locality.php?' +  nloc;
    } else if (pagetype == 'quake'){
		if (urlTOT.slice(-1) == '#') var nchar = urlTOT.length - 19;
        else var nchar = urlTOT.length - 18;
        var url = urlTOT.substr(0,nchar);
        var LocalityPage = url + '/locality.php?' +  nloc;
    }
    return LocalityPage;
}

// //
// function gmstyleclose(){
// 	var iw = document.getElementsByClassName("gm-style-iw");
// 	for(var i=0; i< iw.length; i++){
//
// 		iw[i].style.display = "none";
// 	}
//
// }

// create references based on codbibs in comments. abbrTextT and abbrTextR are the roll-over texts that appear on links to pdfs
function createREF(text, nperiod, codbib, author, title, year, place, abbrTextT, abbrTextR){

    var codbibCIT;
    var codbib_array = [];
    var ref;
    var biblio = '';
    var n2 = 0;
    var n1 = 0;
    var s = 0;
    var nref = 0;

    if (text.indexOf("$")!=-1){
        while (n2 != -1 && n2 < text.length-2){
            // last $ can be 2 characters before end of text, maximum
            n1 = text.indexOf("$", n2 - 5*nref);
            n2 = text.indexOf("$", n1+1);

            if (n1 != -1 && n2 != -1){
                nref = Math.floor((n2 - n1 - 2)/7);
                for (var i = 0; i < nref; i++){ // ciclo tra tutti i codbib trovati
                    codbibCIT = text.substring(n1+2+i*6+i, n1+2+6+i*6+i) // take codbib from comment
                    if (codbib_array.indexOf(codbibCIT) == -1){ // check that current codbib has not been found already
                        codbib_array[s] = codbibCIT; // store codbib in array, for later check (see above)
                        s += 1
                        var refNum = codbib_array.indexOf(codbibCIT) + 1; // reference number
						var textBiblio = author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + " " + place[codbib.indexOf(codbibCIT)] + " " //+ year[codbib.indexOf(codbibCIT)];
						textBiblio = textBiblio.split('"').join('&quot;')
                        // name of external files, for links
                        var T_name = 'pdf_T/' + nperiod + '-' + codbibCIT + '_T.pdf'
                        var R_name = 'pdf_R/' + nperiod + '-' + codbibCIT + '_R.pdf'

                        // now check if pdf exixts in pdflist and pdflist2 or both or none
                        if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') > 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') < 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfT" title = "' + abbrTextT + '"><a href="' + T_name + '" target="_new2"><b>PDF_T</b></a></abbr>';
                        } else if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') > 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') > 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfT" title = "' + abbrTextT + '"><a href="' + T_name + '" target="_new2"><b>PDF_T</b></a></abbr>' + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfR" title = "' + abbrTextR + '"><a href="' + R_name + '" target="_new2"><b>PDF_R</b></a></abbr>';
                        } else if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') < 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') > 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfR" title = "' + abbrTextR + '"><a href="' + R_name + '" target="_new2"><b>PDF_R</b></a></abbr>';
                        } else {
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio;
                        }
                    } else {
                        var refNum = codbib_array.indexOf(codbibCIT) + 1; // reference number
						var textBiblio = author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + " " + place[codbib.indexOf(codbibCIT)] + " " //+ year[codbib.indexOf(codbibCIT)];
						textBiblio = textBiblio.split('"').join('&quot;')
                        biblio = biblio;
                    }
                    if (i == 0) ref = '(<b><abbr title="' + textBiblio + '">' + refNum.toString() + '</abbr>'; // string containing reference number to put inside text
                    else ref = ref + ', <abbr title="' + textBiblio + '">' + refNum.toString() + '</abbr>';

                }
                text = text.replace(text.substring(n1, n2+1), ref + '</b>)'); // substitute codbib with reference number inside text
            }

        }

        return '<span class="comments">' + text + "<br \>" + '<font size="1.8em"><i>' + biblio + '</i></font></span>';
    } else {
        return '<span class="comments">' + text + '</span>'; // if no biblio in the text
    }
}


// create references based on codbibs in comments. abbrTextT and abbrTextR are the roll-over texts that appear on links to pdfs
function createREF_EN(text, nperiod, codbib, author, title, year, place, abbrTextT, abbrTextR){

    var codbibCIT;
    var codbib_array = [];
    var ref;
    var biblio = '';
    var n2 = 0;
    var n1 = 0;
    var s = 0;
    var nref = 0;

    if (text.indexOf("$")!=-1){
        while (n2 != -1 && n2 < text.length-2){
            // last $ can be 2 characters before end of text, maximum
            n1 = text.indexOf("$", n2 - 5*nref);
            n2 = text.indexOf("$", n1+1);

            if (n1 != -1 && n2 != -1){
                nref = Math.floor((n2 - n1 - 2)/7);
                for (var i = 0; i < nref; i++){ // ciclo tra tutti i codbib trovati
                    codbibCIT = text.substring(n1+2+i*6+i, n1+2+6+i*6+i) // take codbib from comment
                    if (codbib_array.indexOf(codbibCIT) == -1){ // check that current codbib has not been found already
                        codbib_array[s] = codbibCIT; // store codbib in array, for later check (see above)
                        s += 1
                        var refNum = codbib_array.indexOf(codbibCIT) + 1; // reference number
						var textBiblio = author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + " " + place[codbib.indexOf(codbibCIT)] + " " //+ year[codbib.indexOf(codbibCIT)];
						textBiblio = textBiblio.split('"').join('&quot;')
                        // name of external files, for links
                        var T_name = 'pdf_T/' + nperiod + '-' + codbibCIT + '_T.pdf'
                        var R_name = 'pdf_R/' + nperiod + '-' + codbibCIT + '_R.pdf'

                        // now check if pdf exixts in pdflist and pdflist2 or both or none
                        if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') > 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') < 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfT" title = "' + abbrTextT + '"><a href="' + T_name + '" target="_new2"><b>PDF_T</b></a></abbr>';
                        } else if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') > 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') > 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfT" title = "' + abbrTextT + '"><a href="' + T_name + '" target="_new2"><b>PDF_T</b></a></abbr>' + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfR" title = "' + abbrTextR + '"><a href="' + R_name + '" target="_new2"><b>PDF_R</b></a></abbr>';
                        } else if (pdflist.indexOf(nperiod + '-' + codbibCIT + '_T.pdf') < 0 && pdflist2.indexOf(nperiod + '-' + codbibCIT + '_R.pdf') > 0){
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio + '&nbsp&nbsp' + '<abbr class="biblioEQ_pdfR" title = "' + abbrTextR + '"><a href="' + R_name + '" target="_new2"><b>PDF_R</b></a></abbr>';
                        } else {
                            biblio = biblio + "<br \><b>" + refNum.toString() + ")</b> " + textBiblio;
                        }
                    } else {
                        var refNum = codbib_array.indexOf(codbibCIT) + 1; // reference number
						var textBiblio = author[codbib.indexOf(codbibCIT)] + ", " + title[codbib.indexOf(codbibCIT)] + " " + place[codbib.indexOf(codbibCIT)] + " " //+ year[codbib.indexOf(codbibCIT)];
						textBiblio = textBiblio.split('"').join('&quot;')
                        biblio = biblio;
                    }
                    if (i == 0) ref = '(<b><abbr title="' + textBiblio + '">' + refNum.toString() + '</abbr>'; // string containing reference number to put inside text
                    else ref = ref + ', <abbr title="' + textBiblio + '">' + refNum.toString() + '</abbr>';

                }
                text = text.replace(text.substring(n1, n2+1), ref + '</b>)'); // substitute codbib with reference number inside text
            }

        }

        // return '<span class="comments">' + text + "<br \>" + '<font size="1.8em"><i>' + biblio + '</i></font></span>';

		return '<section class="comments"><abbr title="click to apply/remove Google translation to English"><a href="#translate"><img src="./images/uk_grey.png" height="13" align="right"/> <img src="./images/Ggoogle.png" height="14" align="right"/></a></abbr><br \><span class="gtranslate">' + text + "</span></section>" + '<font size="1.8em"><i>' + biblio + '</i></font>';




		// return '<span class="comments"><a href="#translate">GoogleTranslate</a><div class="gtranslate">' + text + "</div><br \>" + '<font size="1.8em"><i>' + biblio + '</i></font></span>';
    } else {
        return '<section class="comments"><abbr title="click to apply/remove Google translation to English"><a href="#translate"><img src="./images/uk_grey.png" height="13" align="right"/> <img src="./images/Ggoogle.png" height="14" align="right"/></a><br \></abbr><span class="gtranslate">' + text + '</span></section>'; // if no biblio in the text
    }
}



// remove dollars and codbibs from comments (for tooltip text in the tables)
function removeDollars(text){

    var n2 = 0;
    var n1 = 0;
    var s = 0;
    if (text.indexOf("$")!=-1){
        while (text.indexOf("$")!=-1 && n2 != -1 && n2 < text.length-2){
            // last $ can be 2 characters before end of text, maximum
            n1 = text.indexOf("$", 0);
            n2 = text.indexOf("$", n1+1);
			text = text.replace(text.substring(n1-1, n2+1), '');
            }
        }
        return '<span class="comments">' + text + '</span>';
}


$(function() {

	$('#open_disc').click(function(event) {
	    $('#disclaimer').show();
		document.getElementById('titledisclaimer').scrollIntoView(true);
		event.preventDefault();
	});
	$('#open_credits').click(function(event) {
		showTEXT('creditsweb')
		showTEXT('creditscat')
	    $('#disclaimer').show();
		document.getElementById('titlecredits').scrollIntoView(true);
		event.preventDefault();
	});
	$('#open_help').click(function(event) {
	    $('#help').show();
		event.preventDefault();
	});
	$('#closeD').click(function(event) {
		$('#disclaimer').hide();
		event.preventDefault();
	});
	$('#closeH').click(function(event) {
		$('#help').hide();
		event.preventDefault();
	});

	$('#smaller').click(function(event) {
		$('#legend').hide();
		$('#legendmin').show();
		event.preventDefault();
	});
	$('#bigger').click(function(event) {
		$('#legendmin').hide();
		$('#legend').show();
		event.preventDefault();
	});


	var v=window, d=document;
	var w = v.innerWidth ? v.innerWidth : d.documentElement.clientWidth,
		h = v.innerHeight ? v.innerHeight : d.documentElement.clientHeight,
		s = d.getElementById('WSzPlgIn'),
		ss;

	document.querySelector('#disclaimer').style.marginLeft = Math.round(575) + 'px';
	document.querySelector('#disclaimer').style.marginTop = Math.round(100) + 'px';
	document.querySelector('#disclaimer').style.width = Math.round( w - 775 ) + 'px';
	document.querySelector('#disclaimer').style.height = Math.round( h - 300 ) + 'px';
    document.querySelector('#loading').style.top = Math.round( h/2 -30)+'px'
    document.querySelector('#loading').style.left = Math.round( w/2 - 100)+'px'

	$('#disclaimer').resizable();
	$('#disclaimer').draggable();
	$('#help').resizable();
	$('#help').draggable();
	$('#WindowlegendaFrane').resizable();
	$('#WindowlegendaFrane').draggable();
});
