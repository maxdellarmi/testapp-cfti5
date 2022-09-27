// XML paths
var xmlServiceEE = 'EEList.xml';
var xmlServiceEEbiblio = 'BiblioEE.xml'

// flags
var flagEEaccess = 1;
flagLOCaccess = 0;
var flagFilterEE = 0; // questo serve per distinguere la prima volta da quelle in cui si fa un filtro col menu (click su ok)

var ServiceEE = '/EEListService';   // =>'EEList.xml';
var ServiceEE_MED = '/EEList_MEDService';  // =>'EEList_MED.xml';
// var MquakesEELOC = [];
// var MquakesTitleLOC = [];
// var MquakesEEcommLOC = [];
// var ME1commIT = [];
// var ME1commEN = [];

// MquakesTitleLOC.push([i, quakesTitleLOC]);
// MquakesEELOC.push([i, quakesEELOC]);
// MquakesEEcommLOC.push([i, quakesEEcommLOC]);
// ME1commIT.push([i, E1commIT]);
// ME1commEN.push([i, E1commEN]); */
/**
 *
 * @type {{MquakesEEcommLOC: *[], ME1commIT: *[], ME1commEN: *[], MquakesTitleLOC: *[], MquakesEELOC: *[]}}
 */
var saveJSONIndexEE={
    "MquakesTitleLOC":  [ ],
    "MquakesEELOC": [ ],
    "MquakesEEcommLOC":  [ ],
    "ME1commIT": [ ],
    "ME1commEN": [ ]
};


var NumEESel;

var EEmarkersArray = [];
var GmapsPilotEE = null;


var NlocOld;
var infowindow = new google.maps.InfoWindow();


// -----------------    EE BIBLIO
var codbib = [];
var titolobib = [];
var annobib = [];
var valbib = [];
var valbibcode = [];
var placebib = [];
var authorbib = [];

// -----------------    EE
var EEmarkers = [];
var line = []

// -------------- ABBR titles
var abbrEENP_IT = "Effetto associato all\'intera sequenza sismica";
var abbrEENP_EN = "Effect associated with entire earthquake sequence";
var abbrEENT_IT = "Effetto associato al singolo terremoto";
var abbrEENT_EN = "Effect associated with single earthquake";
var EElinkLOCabbr_IT = "Link alla pagina della località";
var EElinkLOCabbr_EN = "Link to locality page";
var EEdescrIT = "Descrizione"
var EEdescrEN = "Description"



// ----------------- TogglesALL

var nameEEpaes = ["Paes", "Fess", "Sprof", "Sollev", "Grotte", "Frane", "Slavina"]
var codeEEpaes = ["L0", "L1", "L2", "L3", "L4", "L5", "L6"]
var orderEEpaes = [1,2,3,4,5,6,7]

var nameEEacsup = ["Fiumi", "PorFiumi", "EsondFiumi", "DeviazFiumi", "IntorFiumi", "Laghi", "LivLaghi", "CompLaghi",  "EsondLaghi", "IntorLaghi" ]
var codeEEacsup = ["W0", "W1", "W2", "W3", "W4", "B0", "B3", "B1", "B4", "B2"]
var orderEEacsup = [8,9,10,11,12,13,14,15,16,17]

var nameEEacsot = ["AcSott", "PorSorg", "CompSorg", "IntorSorg", "VariazPozzi", "Liquef", "Temp", "Chimism"]
var codeEEacsot = ["U0", "U1", "U2", "U3", "U4", "U5", "U6", "U7"]
var orderEEacsot = [18,19,20,21,22,23,24,25]

var nameEEcoste = ["VarCosta", "Marem"]
var codeEEcoste = ["C1", "C2"]
var orderEEcoste = [31,32]

var nameEEgas = ["Gas", "GasSulf", "Elettr", "Lumin", "Pesci"]
var codeEEgas = ["P2", "P3", "P4", "P5", "P1"]
var orderEEgas = [26,27,28,29,30]


var nameEE = nameEEpaes.concat(nameEEacsup, nameEEacsot, nameEEcoste, nameEEgas)
var codeEE = codeEEpaes.concat(codeEEacsup, codeEEacsot, codeEEcoste, codeEEgas)
var orderEE = orderEEpaes.concat(orderEEacsup, orderEEacsot, orderEEcoste, orderEEgas)

var TogglePaes = [];
var ToggleAcsup = [];
var ToggleAcsot = [];
var ToggleCoste = [];
var ToggleGas = [];

// ----------------- TogglesMACROCAT
var ToggleCosteALL = "on"
var TogglePaesALL = "on"
var ToggleAcqueSupALL = "on"
var ToggleAcqueSotALL = "on"
var ToggleGasALL = "on"




function createEEmenu(){

	var iconsize = 24;
	var div = document.getElementById('paesaggio')
	div.innerHTML= "";
	for (var i = 0; i < nameEEpaes.length; i++){
		TogglePaes[i] = "on"
		var elem = document.createElement(nameEEpaes[i])
		elem.setAttribute('id', codeEEpaes[i])
		var abbr = ''//class_titleEE_IT[class_codeEE.indexOf(codeEEpaes[i])];
		elem.innerHTML = '<abbr class= "' + codeEEpaes[i] + '" title = "'+ abbr + '"><input type="image" id="Toggle' + nameEEpaes[i] + '" name="Toggle' + nameEEpaes[i] + '" value="Toggle' + nameEEpaes[i] + '" onclick="ShowPaes(' + i + '); " img src="images/EE/color/_B/' + codeEEpaes[i] + '.png" width= "'+ iconsize +'" vertical-align="-30px"/></abbr>&nbsp&nbsp&nbsp'
		div.appendChild(elem)
	}

	var div = document.getElementById('acquesot')
	div.innerHTML= "";
	for (var i = 0; i < nameEEacsot.length; i++){
		ToggleAcsot[i] = "on"
		var elem = document.createElement(nameEEacsot[i])
		elem.setAttribute('id', codeEEacsot[i])
		var abbr = ''//class_titleEE_IT[class_codeEE.indexOf(codeEEacsot[i])];
		elem.innerHTML = '<abbr class= "' + codeEEacsot[i] + '" title = "'+ abbr + '"><input type="image" id="Toggle' + nameEEacsot[i] + '" name="Toggle' + nameEEacsot[i] + '" value="Toggle' + nameEEacsot[i] + '" onclick="ShowAcsot(' + i + '); " img src="images/EE/color/_B/' + codeEEacsot[i] + '.png" width= "'+ iconsize +'" vertical-align="-30px"/></abbr>&nbsp&nbsp&nbsp'
		div.appendChild(elem)
	}

	var div = document.getElementById('acquesup')
	div.innerHTML= "";
	for (var i = 0; i < nameEEacsup.length; i++){
		ToggleAcsup[i] = "on"

		if (i == 4) var addbr = "<style=\"font-size:10px\"><span id=\"fiumiMenuEE\"></span></font> <br />"
		else if (i == 9) var addbr = "<style=\"font-size:10px\"><span id=\"laghiMenuEE\"></span></font>"
		else addbr = "";
		var elem = document.createElement(nameEEacsup[i])
		elem.setAttribute('id', codeEEacsup[i])
		var abbr = ''//class_titleEE_IT[class_codeEE.indexOf(codeEEacsup[i])];
		elem.innerHTML = '<abbr class= "' + codeEEacsup[i] + '" title = "'+ abbr + '"><input type="image" id="Toggle' + nameEEacsup[i] + '" name="Toggle' + nameEEacsup[i] + '" value="Toggle' + nameEEacsup[i] + '" onclick="ShowAcsup(' + i + '); " img src="images/EE/color/_B/' + codeEEacsup[i] + '.png" width= "'+ iconsize +'" vertical-align="-30px" style="vertical-align:middle;"/></abbr>&nbsp&nbsp&nbsp'+ addbr
		div.appendChild(elem)
	}

	var div = document.getElementById('coste')
	div.innerHTML= "";
	for (var i = 0; i < nameEEcoste.length; i++){
		ToggleCoste[i] = "on"
		var elem = document.createElement(nameEEcoste[i])
		elem.setAttribute('id', codeEEcoste[i])
		var abbr = ''//class_titleEE_IT[class_codeEE.indexOf(codeEEcoste[i])];
		elem.innerHTML = '<abbr class= "' + codeEEcoste[i] + '" title = "'+ abbr + '"><input type="image" id="Toggle' + nameEEcoste[i] + '" name="Toggle' + nameEEcoste[i] + '" value="Toggle' + nameEEcoste[i] + '" onclick="ShowCoste(' + i + '); " img src="images/EE/color/_B/' + codeEEcoste[i] + '.png" width= "'+ iconsize +'" vertical-align="-30px"/></abbr>&nbsp&nbsp&nbsp'
		div.appendChild(elem)
	}

	var div = document.getElementById('gas')
	div.innerHTML= "";
	for (var i = 0; i < nameEEgas.length; i++){
		ToggleGas[i] = "on"
		var elem = document.createElement(nameEEgas[i])
		elem.setAttribute('id', codeEEgas[i])
		var abbr = ''//class_titleEE_IT[class_codeEE.indexOf(codeEEgas[i])];
		elem.innerHTML = '<abbr class= "' + codeEEgas[i] + '"  title = "'+ abbr + '"><input type="image" id="Toggle' + nameEEgas[i] + '" name="Toggle' + nameEEgas[i] + '" value="Toggle' + nameEEgas[i] + '" onclick="ShowGas(' + i + '); " img src="images/EE/color/_B/' + codeEEgas[i] + '.png" width= "'+ iconsize +'" vertical-align="-30px"/></abbr>&nbsp&nbsp&nbsp'
		div.appendChild(elem)
	}
}


var QuakePage = createQuakePageLink(window.location.href, '', 'indexEE')
var LocalityPage = createLocalityPageLink(window.location.href, '', 'indexEE')

function requestEEbiblio(){
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;

	var ajaxUpdater = new Manajax(xmlServiceEEbiblio);
	ajaxUpdater.TxType = 'GET';
	ajaxUpdater.responseType = 'xml';
	this.callBackBlock = 'map';
	ajaxUpdater.callBackFunc = this.parseEEbiblio;
	ajaxUpdater.toScroll = false;
	ajaxUpdater.requestAction();

}

function parseEEbiblio(XmlText){
	XMLEEbiblioList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
	XMLEEbiblioListArrived = true;

	var biblioList = readBiblio(XMLEEbiblioList, "BIBLIO_EE");
	codbib = biblioList[0]
	titolobib = biblioList[1]
	annobib = biblioList[2]
	placebib = biblioList[3]
	authorbib = biblioList[4]

	requestEEdata();
}

function requestEEdata(){
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;

	// var ajaxUpdater = new Manajax(xmlServiceEE);
	// ajaxUpdater.TxType = 'GET';
	// ajaxUpdater.responseType = 'xml';
	// this.callBackBlock = 'map';
	// ajaxUpdater.callBackFunc = this.parseEEData;
	// ajaxUpdater.toScroll = false;
	// ajaxUpdater.requestAction();

    $.ajax({
        url: ServiceEE,
        type: 'GET',
        dataType: 'text', //text/xml
        contentType: 'application/xml',
        success: function(data){
            if(data !== undefined){
                console.log("success loaded "+ServiceEE+" => EEList.xml file from server...");
                //console.log(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus);
            console.error(errorThrown);
        }

    }).then ( function(XmlText) {  //function parseEEData(XmlText){    // ajaxUpdater.callBackFunc = this.parseEEData;
        $.ajax({
            url:  '/loadJSONIndexEEdataFullCachedZIP', //Route::get('/loadJSONIndexEEdataFullCachedZIP', 'PhotoController@loadJSONIndexEEdataFullCachedZIP' )->middleware('cache.headers:public;max_age=31536000;etag', 'gzip');
            type: 'GET',
            encoding: null,
            success: function(data){
                if(data !== undefined){
                    console.log("success loaded loadJSONIndexEEdataFullCachedZIP from server...");
                    //console.log(data);
                    saveJSONIndexEE=data;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus);
                console.error(errorThrown);
            }
        }).then( function( dummy ) {

            XMLEEList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
            XMLEEListArrived = true;
            var EEall = XMLEEList.documentElement.getElementsByTagName("EE");

            // Export
            var d = new Date();
            filename = 'CFTI5_EEList_selection_' + d.getFullYear() + '_' + d.getMonth() + '_' + d.getDate() + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() ;
            ExportText = "Type;;Locality;Latitude;Longitude;Date;Time;Io (Epicentral intensity - MCS scale);Me (Equivalent magnitude based on macroseismic observations);Epicentral Area"

            NumEESel = document.getElementById("NumSel");

            // Check if toggles are on or off
            var codeffSHOW = [];
            var ToggleALL = TogglePaes.concat(ToggleAcsup, ToggleAcsot, ToggleCoste, ToggleGas)
            for (var i = 0; i < ToggleALL.length; i++){
                if (ToggleALL[i] == "on") codeffSHOW[i] = codeEE[i]
                else codeffSHOW[i] = ""
            }


            EEmarkers = []; //reinizializza l'array degli effetti ambiente
            var marker;
            // --------------------------------    PARSE XML WITH ALL EE    ----------------------------------------------
            var nlocXarray = [];

            console.log("CHECKPOINT 0 ciclo foreach EEALL:" + EEall.length );

            if(EEall.length > 0) {

                // index for selected EE (based on toggles)
                var seli = 0;

                for (var i = 0; i < EEall.length; i++){ //EEall.length
                    marker = null;

                    var sNP = XMLEEList.getElementsByTagName("EE")[i].childNodes[0].nodeValue;
                    var EE_nterr = XMLEEList.getElementsByTagName("NTERR")[i].childNodes[0].nodeValue;
                    var EE_nperiod = XMLEEList.getElementsByTagName("NPERIOD")[i].childNodes[0].nodeValue;;
                    // var EE_desceff = XMLEEList.getElementsByTagName("DESCRIZIONE_EFFETTO_NUOVO")[i].childNodes[0].nodeValue;  ///////   NB: QUESTO NON LO USO PIU', LE DESC LE LEGGO DAL FILE DI CLASSIF
                    var EE_nloc = XMLEEList.getElementsByTagName("NLOC_CFTI")[i].childNodes[0].nodeValue;
                    // var EE_nloc6 = EE_nloc.slice(0, 6);

                    var EE_desloc = XMLEEList.getElementsByTagName("DESLOC_CFTI")[i].childNodes[0].nodeValue;
                    var flagProv = XMLEEList.getElementsByTagName("PROVLET")[i].childNodes.length;
                    if (flagProv > 0) {
                        EE_prov = XMLEEList.getElementsByTagName("PROVLET")[i].childNodes[0].nodeValue;
                    } else {
                        EE_prov = "";
                    }
                    var flagCount = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes.length;
                    if (flagCount > 0) {
                        EE_country = XMLEEList.getElementsByTagName("NAZIONE")[i].childNodes[0].nodeValue;
                    } else {
                        EE_country = "";
                    }
                    if (EE_prov != '-') EE_loc = EE_desloc + ' (' + EE_prov + ')'
                    else EE_loc = EE_desloc + ' (' + EE_country + ')'

                    var EE_comm = XMLEEList.getElementsByTagName("COMMENTO")[i].childNodes[0].nodeValue;
                    var EE_locNote = XMLEEList.getElementsByTagName("NOTESITO")[i].childNodes[0].nodeValue;
                    if (EE_locNote == '-') EE_locNote = "";
                    var EE_codeff = XMLEEList.getElementsByTagName("CODICE_EFF")[i].childNodes[0].nodeValue;
                    var EE_Lat = XMLEEList.getElementsByTagName("LAT_WGS84")[i].childNodes[0].nodeValue;
                    var fEE_Lat = parseFloat(EE_Lat).toFixed(3);
                    var EE_Lon = XMLEEList.getElementsByTagName("LON_WGS84")[i].childNodes[0].nodeValue;
                    var fEE_Lon = parseFloat(EE_Lon).toFixed(3);


                    // take effect only if in list of "on" toggles
                    if (codeffSHOW.indexOf(EE_codeff) != -1){


                        // --------------    Take all quakes(nterr) for each nperiod: NperiodEQ viene dal parsing fatto da index.js!!!!!
                        var ind = NperiodEQ.indexOf(EE_nperiod);
                        // var n2 = 0;
                        var s = 0;
                        var EEdate = '';
                        var EEtime = '';
                        var EEIo = '';
                        var EEIoIW = '';
                        var EEMe = '';
                        var EEMeIW = '';
                        var EQlink = '';
                        // var EEepArea = ''
                        var EEepArea = '' //markersArray[ind]['Location'] //+ ' (' + markersArray[ind]['Country'] + ')'+ '<br />'
                        var EEepAreaExp = '';
                        var EEtypeExp;

                        if (NperiodEQ.indexOf(EE_nperiod)!=-1){
                            while (ind != -1){
                                if (EE_nterr.length == 5){ // take only nterr if EE related to nterr
                                    var indNT = NterrEQ.indexOf(EE_nterr)

                                    EEdatenum = markersArray[indNT]['Date']; // get parseint date for table sorting
                                    EEdate = markersArray[indNT]['DateLabel']
                                    EEtime = markersArray[indNT]['TimeLabel']
                                    EEIo = markersArray[indNT]['Io']
                                    EEMe = markersArray[indNT]['Me']
                                    EEIoIW = 'Io: ' + markersArray[indNT]['Io']
                                    EEMeIW = 'Me: ' + markersArray[indNT]['Me']

                                    EEnterrFLAG = EE_nterr; // used later to build quake titles for infowindow

                                    EQlink = '<abbr class= "quakePageLink" title= "'+ EElinkEQabbr_IT +'"> <a href="' + QuakePage + markersArray[indNT]['Nterr'] + 'IT" target="_blank"><img src="images/link2.png" width= "10" vertical-align="-30px"/></a></abbr>'


                                    // full dot for EE related to nterr - and corresponding ABBR
                                    symbolEE = '<img src="images/EE/00_NT.png" width="15px">'
                                    EEtypeExp = abbrEENT_EN;
                                    abbrsymbolEE = '<abbr class= "abbrEENT" title= "' + abbrEENT_IT + '">'

                                    // cut location area to maximum amount of characters, if needed (and in this case add abbr)
                                    if (markersArray[indNT]['Location'].length  > 13){
                                        EEepArea = '<abbr title= "'+ markersArray[indNT]['Location'] + '">' + markersArray[indNT]['Location'].substring(0, 13) + '...' + '</abbr>'
                                    } else EEepArea = markersArray[indNT]['Location']
                                    EEepAreaExp = markersArray[ind]['Location']

                                } else { // get all info about each nperiod (all nterrs) if EE related to whole period

                                    EEdatenum = markersArray[ind]['Date']; // get parseint date for table sorting - take just one nterr of nperiod

                                    EEdate = EEdate + markersArray[ind]['DateLabel'] + '<br />'
                                    EEtime = EEtime + markersArray[ind]['TimeLabel'] + '<br />'
                                    EEIo = EEIo + markersArray[ind]['Io']+ '<br />'
                                    EEMe = EEMe + markersArray[ind]['Me']+ '<br />'
                                    EEIoIW = EEIoIW + 'Io: ' + markersArray[ind]['Io']+ '<br />'
                                    EEMeIW = EEMeIW + 'Me: ' + markersArray[ind]['Me']+ '<br />'

                                    EEnterrFLAG = '0'; // used later to build quake titles for infowindow

                                    EQlink = EQlink + '<abbr class= "quakePageLink" title= "'+ EElinkEQabbr_IT +'"> <a href="' + QuakePage + markersArray[ind]['Nterr'] + 'IT" target="_blank"><img src="images/link2.png" width= "10" vertical-align="-30px"/></a></abbr>'+ '<br />'

                                    // circle for EE related to n period - and corresponding ABBR
                                    symbolEE = '<img src="images/EE/00_NP.png" width="15px">'
                                    EEtypeExp = abbrEENP_EN;
                                    abbrsymbolEE = '<abbr class= "abbrEENP" title= "' + abbrEENP_IT + '">'

                                    // cut location area to maximum amount of characters, if needed (and in this case add abbr)
                                    if (markersArray[ind]['Location'].length  > 13){
                                        var EQlocat = '<abbr title= "'+ markersArray[ind]['Location'] + '">' + markersArray[ind]['Location'].substring(0, 13) + '...' + '</abbr>'
                                        EEepArea = EEepArea + EQlocat + '<br />'
                                    } else EEepArea = EEepArea + markersArray[ind]['Location'] + '<br />'
                                    EEepAreaExp = EEepAreaExp + markersArray[ind]['Location'] + '<br />'
                                }
                                ind = NperiodEQ.indexOf(EE_nperiod, ind+1);
                            }
                        }

                        // --- set marker icon
                        //OLD GOOGLE STYLE ICON
                        /*var icon = {
                            url: 'images/EE/color/'+ EE_codeff + '.png',
                            scaledSize: new google.maps.Size(20, 20)
                        }*/

                        marker = new ol.Feature({
                            id: seli, //dopo viene effettuato il sort e va rielaborato
                            geometry: new ol.geom.Point(new ol.proj.fromLonLat([fEE_Lon, fEE_Lat])),//new ol.geom.Point([fEE_Lon, fEE_Lat]),
                            ExportKmlR: "",
                            OnClickTextIT: "",
                            ContentPopupText: ""
                        });

                        //var iconstring = new String().concat("images/EE/color/", EE_codeff.toString(), ".png").toString();

                        marker.setStyle(new ol.style.Style({
                            image: new ol.style.Icon(({
                                src:  'images/EE/color/'+ EE_codeff+ ".png",
                                // the real size of your icon
                                size: [34, 34], //era 20,20 su google
                                // the scale factor
                                scale: 0.7 // 34 * 0.59 = 20
                            }))
                        }));





                        //delete the final <br />
                        if (EEdate.endsWith("<br />")) EEdate = EEdate.slice(0,EEdate.length-6);
                        if (EEtime.endsWith("<br />")) EEtime = EEtime.slice(0,EEtime.length-6);
                        if (EQlink.endsWith("<br />")) EQlink = EQlink.slice(0,EQlink.length-6);
                        if (EEMe.length > 4){
                            if (EEMe.endsWith("<br />")) EEMe = EEMe.slice(0,EEMe.length-6);
                        }
                        if (EEIo.length > 4){
                            if (EEIo.endsWith("<br />")) EEIo = EEIo.slice(0,EEIo.length-6);
                        }
                        if (EEMeIW.endsWith("<br />")) EEMeIW = EEMeIW.slice(0,EEMeIW.length-6);
                        if (EEIoIW.endsWith("<br />")) EEIoIW = EEIoIW.slice(0,EEIoIW.length-6);
                        if (EEepArea.endsWith("<br />")) EEepArea = EEepArea.slice(0,EEepArea.length-6);
                        if (EEepAreaExp.endsWith("<br />")) EEepAreaExp = EEepAreaExp.slice(0,EEepAreaExp.length-6);

                        // Create data structure that stores all information of all earthquakes (and Gmap markers)
                        EEmarkersArray[seli] = new Array();
                        EEmarkersArray[seli]['EE_nperiod'] =  EE_nperiod,
                            EEmarkersArray[seli]['EE_nterrFLAG'] =  EEnterrFLAG,
                            EEmarkersArray[seli]['EE_nloc'] =  EE_nloc,
                            EEmarkersArray[seli]['EE_loc'] =  EE_loc,
                            EEmarkersArray[seli]['EE_locNote'] =  EE_locNote,
                            EEmarkersArray[seli]['EE_comm'] =  EE_comm,
                            EEmarkersArray[seli]['EE_codeff'] =  EE_codeff,
                            EEmarkersArray[seli]['EE_Lat'] =  EE_Lat,
                            EEmarkersArray[seli]['EE_Lon'] =  EE_Lon,
                            EEmarkersArray[seli]['EQdate'] =  EEdate,
                            EEmarkersArray[seli]['EQtime'] =  EEtime,
                            EEmarkersArray[seli]['EQlink'] =  EQlink,
                            EEmarkersArray[seli]['EQMe'] =  EEMe,
                            EEmarkersArray[seli]['EQIo'] =  EEIo,
                            EEmarkersArray[seli]['EQMeIW'] =  EEMeIW,
                            EEmarkersArray[seli]['EQIoIW'] =  EEIoIW,
                            EEmarkersArray[seli]['EQarea'] =  EEepArea,

                            EEmarkersArray[seli]['symbol'] =  symbolEE,
                            EEmarkersArray[seli]['abbrsymbol'] =  abbrsymbolEE,
                            EEmarkersArray[seli]['EE_ordernum'] =  orderEE[codeEE.indexOf(EE_codeff)],
                            EEmarkersArray[seli]['EE_orderdate'] = EEdatenum,
                            EEmarkersArray[seli]['Marker'] = marker, //nuovo marker openlayer
                            EEmarkersArray[seli]['EEepAreaExp'] = EEepAreaExp,
                            EEmarkersArray[seli]['EEtypeExp'] = EEtypeExp
                        /*EEmarkersArray[seli]['Marker'] =  new google.maps.Marker({
                            position: new google.maps.LatLng(EE_Lat, EE_Lon),
                            map: map,
                            icon: icon,
                            // title: onMouseOverText,
                        }),*/


                        seli += 1
                    }

                    // }
                } //END FOREACH EEAll
                console.log("CHECKPOINT 1 prima di sort");

                //QUI AVVIENE UN ORDINAMENTO PER DATA
                EEmarkersArray.sort(function(a, b){
                    return a.EE_orderdate - b.EE_orderdate
                });

                console.log("CHECKPOINT 2 after sort");

                for (var i = 0; i < EEmarkersArray.length; i++) {
                    /**NB.IMPORTANTE*E' stato necessario reimpostare tutti quanti gli ID degli elementi per poter riselezionarli e scatenare il proprio evento Click successivamente ****/
                    //console.log('oldId:' +EEmarkersArray[i]['Marker'].values_.id);
                    EEmarkersArray[i]['Marker'].values_.id = i;
                    //console.log("newId:"+i);

                    nlocXarray[i] = EEmarkersArray[i]['EE_nloc'];
                }

                console.log("CHECKPOINT 3 after setting all the new IDS");
            }
            ExportKml = '';
            ExportKmlR = '';

            // BUILD INFOWINDOWS: for each nloc need to store all events (nterr or nperiod) and for each event all EE types + E1 comment
            // the loop is through each EE of the array built before because it is easier to build 1 infowindow for each marker, although INFOWINDOWS
            // store information on all EE at each locality... meaning the are multiple identical infowindows...
            // To make it faster this may be changed in the future
            console.log("CHECKPOINT 4 START - building info Windows..FOR + WHILE INDX OF...EEmarkersArray:" + EEmarkersArray.length);
            for (var i = 0; i < EEmarkersArray.length; i++) {  // loop thorough each selected EE

                // E1all = E1all + EEmarkersArray[i]['EE_comm'];

                // plot marker
                // EEmarkersArray[i]['Marker'].setMap(map);

                var npin = -1; // index nperiod
                var quakesEELOC = [];
                var quakesTitleLOC = [];
                var quakesEEcommLOC = [];
                var E1commIT = [];
                var E1commEN = [];
                var ind = nlocXarray.indexOf(EEmarkersArray[i]['EE_nloc'], 0);  // get first NLOC
                var firstind = ind;
                var newind = ind;
                var nper = ''
                var tbody = '';
                var row = '';

                // CONTENT OUTPUT SAVED ON A CACHED FILE - FUNZIONA SOLAMENTE PER IL PRIMO CARICAMENTO DELLA PAGINA (VERIFICARE CON I SUCCESSIVI FILTRI)
                // loop through all EE for the current NLOC (by getting indexes of current nloc in the nloc array built before - when reading all EE)
                // while (ind != -1){
                // 	if (EEmarkersArray[i]['EE_nloc'] == EEmarkersArray[ind]['EE_nloc'] && EEmarkersArray[ind]['EE_nperiod'] == nper){ // deal with all EE for current NPERIOD
                //
                // 		npind++;
                // 		NterrflagDone[npind] = EEmarkersArray[ind]['EE_nterrFLAG']; // store all nterr flags for current nperiod
                // 		index[npind] = ind;
                //
                // 		// add all EE for current quake to the first one added below and manage cases when EE related to nterr or nperiod
                // 		if (EEmarkersArray[ind]['EE_nterrFLAG'] != ''){ // related to nterr: check if current EE has the same nterr of previous one. If not, add epicenter info and
                // 			if (NterrDone.indexOf(EEmarkersArray[ind]['EE_nterrFLAG']) == -1 && NterrflagDone.indexOf("0") == -1){
                //
                // 				// add nterr date to list of EE
                // 				quakesTitleLOC[npin] = quakesTitleLOC[npin] + '<tr><td class="dateIW">' + EEmarkersArray[ind]['EQdate'] + '</td><td class="timeIW">' + EEmarkersArray[ind]['EQtime'] + '</td><td class="meIW">' + EEmarkersArray[ind]['EQMeIW'] + '</td><td class="IoIW">' + EEmarkersArray[ind]['EQIoIW'] +'</td><td class="locationIW">' + EEmarkersArray[ind]['EQarea'] + '</td><td class="linkIW">' + EEmarkersArray[ind]['EQlink'] + '</td></tr>';
                // 				ntind++
                // 				NterrDone[ntind] = EEmarkersArray[ind]['EE_nterrFLAG']
                //
                // 				// build title of quake when some EE related to nterr and some to nperiod (take nperiod)
                // 			} else if (NterrflagDone.indexOf("0") != -1){
                // 				var indnper = index[NterrflagDone.indexOf("0")]
                // 				quakesTitleLOC[npin] = '<tr><td class="dateIW">' + EEmarkersArray[indnper]['EQdate'] + '</td><td class="timeIW">' + EEmarkersArray[indnper]['EQtime'] + '</td><td class="meIW">' + EEmarkersArray[indnper]['EQMeIW'] + '</td><td class="IoIW">' + EEmarkersArray[indnper]['EQIoIW'] +'</td><td class="locationIW">' + EEmarkersArray[indnper]['EQarea'] + '</td><td class="linkIW">' + EEmarkersArray[indnper]['EQlink'] + '</td></tr>';
                // 			}
                // 		}
                // 		// related to nperiod
                // 		quakesEELOC[npin] = quakesEELOC[npin] + '<img src="images/EE/color/'+ EEmarkersArray[ind]['EE_codeff'] + '.png" width= "18" vertical-align="-30px"/>' + '&nbsp &nbsp' + '<span class="' + EEmarkersArray[ind]['EE_codeff'] + '_IW">' +  class_titleEE_IT[class_codeEE.indexOf(EEmarkersArray[ind]['EE_codeff'])]  + "</span><br>"
                // 	}
                //     else if (EEmarkersArray[i]['EE_nloc'] == EEmarkersArray[ind]['EE_nloc'] && EEmarkersArray[ind]['EE_nperiod'] != nper){ //when new quake (nperiod) found
                //
                // 		// SAVE ARRAYS FOR EACH NPERIOD, USED to build titles of quake when some EE related to nterr
                // 		var NterrDone = [];
                // 		var index = [];
                // 		var NterrflagDone = [];
                // 		// when EE associated to nterr:
                // 		var ntind = 0;
                // 		if (EEmarkersArray[ind]['EE_nterrFLAG'] != '') NterrDone[ntind] = EEmarkersArray[ind]['EE_nterrFLAG']; // store nterr done when EE-nterr
                // 		// all nterr flags for each nperiod:
                // 		var npind = 0;
                // 		NterrflagDone[npind] = EEmarkersArray[ind]['EE_nterrFLAG']; // store all nterr flags for current nperiod
                // 		index[npind] = ind;
                //
                // 		npin = npin + 1 // go to next nperiod
                // 		nper = EEmarkersArray[ind]['EE_nperiod']
                //
                // 		// create table with info for each event/nperiod
                // 		quakesTitleLOC[npin] = '<tr><td class="dateIW">' + EEmarkersArray[ind]['EQdate'] + '</td><td class="timeIW">' + EEmarkersArray[ind]['EQtime'] + '</td><td class="meIW">' + EEmarkersArray[ind]['EQMeIW'] + '</td><td class="IoIW">' + EEmarkersArray[ind]['EQIoIW'] +'</td><td class="locationIW">' + EEmarkersArray[ind]['EQarea'] + '</td><td class="linkIW">' + EEmarkersArray[ind]['EQlink'] + '</td></tr>';
                //
                // 		// } else {
                // 		// 	quakesTitleLOC[npin] = '<tr><td class="dateIW">' + EEmarkersArray[ind]['EQdate'] + '</td><td class="timeIW">' + EEmarkersArray[ind]['EQtime'] + '</td><td class="meIW">' + EEmarkersArray[ind]['EQMeIW'] + '</td><td class="IoIW">' + EEmarkersArray[ind]['EQIoIW'] +'</td><td class="locationIW">' + EEmarkersArray[ind]['EQarea'] + '</td><td class="linkIW">' + EEmarkersArray[ind]['EQlink'] + '</td></tr>';
                // 		// }
                //
                // 		// ----get E1comm and build bibliography
                // 		// alert(authorbib)
                // 		E1commIT[npin] = createREF(EEmarkersArray[ind]['EE_comm'], EEmarkersArray[ind]['EE_nperiod'], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT)
                // 		E1commEN[npin] = createREF_EN(EEmarkersArray[ind]['EE_comm'], EEmarkersArray[ind]['EE_nperiod'], codbib, authorbib, titolobib, annobib, placebib, biblioEQ_pdfT_abbrIT, biblioEQ_pdfR_abbrIT)
                //
                // 		// Create div for hidden E1 comment, to show on click
                // 		quakesEEcommLOC[npin] = '<div><a onclick=showE1(' + npin + ') href="#" id="showE1_EE'+npin+'" class="showE1_EE"><span class= "EEaccess_descr">' + EEdescrIT + '</span> &nbsp <img src="images/expand.png" width= "7"/></a></div><div><a onclick=hideE1(' + npin + ') href="#" id="hideE1_EE'+npin+'" class="hideE1_EE"><span class= "EEaccess_descr">' + EEdescrIT + '</span> &nbsp <img src="images/reduce.png" width= "7"/></a></div><br><div id='+ npin +' class = "E1commLOC_EE">' + E1commIT + '</div><hr>';
                //
                // 		// get first EE
                // 		quakesEELOC[npin] = '';
                // 		quakesEELOC[npin] = '<img src="images/EE/color/'+ EEmarkersArray[ind]['EE_codeff'] + '.png" width= "18" vertical-align="-30px"/>' + '&nbsp &nbsp' + '<span class="' + EEmarkersArray[ind]['EE_codeff'] + '_IW">' +  class_titleEE_IT[class_codeEE.indexOf(EEmarkersArray[ind]['EE_codeff'])]  + "</span> <br>"
                // 	}
                // 	ind = nlocXarray.indexOf(EEmarkersArray[i]['EE_nloc'], ind+1) // find next index (in nloc array with all EE) of current nloc, starting from position ind+1
                // }

                // CREAZIONE ARRAY GLOBAL x sostituire l'elaborazione del ciclo while con valori costanti utilizzato solo per la prima volta  - FUNZIONA SOLO PER CARICAMENTO INIZIALE
                // saveJSONIndexEE.MquakesTitleLOC.push([i, quakesTitleLOC]);
                // saveJSONIndexEE.MquakesEELOC.push([i, quakesEELOC]);
                // saveJSONIndexEE.MquakesEEcommLOC.push([i, quakesEEcommLOC]);
                // saveJSONIndexEE.ME1commIT.push([i, E1commIT]);
                // saveJSONIndexEE.ME1commEN.push([i, E1commEN]);


                // link to locality page
                var LOClink = '<abbr id="EEpage_loclink" title= "' + EElinkLOCabbr_IT + '"><a href="' + LocalityPage + EEmarkersArray[i]['EE_nloc'] + 'IT" target="_blank"><img src="images/link2.png" width= "15" ></a></abbr>'

                // set title line of infowindow (locality name and link to locality page)
                var OnClickText = '<div class="iw-title localityColor"><b>' + EEmarkersArray[i]['EE_loc'] + '</b>&nbsp&nbsp' + LOClink + '<br /><i>' + EEmarkersArray[i]['EE_locNote'] + '</i></div><br /><div class = "EEinfow">';

                // OLD VERSION WITHOUT CACHED CONTENT OUTPUT SAVED
                // add following content of infowindow, by looping through all events at the current locality
                //for(var k = 0; k < quakesEELOC.length; k++){
                //  OnClickText = OnClickText + '<table class="EEinfowTable"><tbody>' + quakesTitleLOC[k] + '</tbody></table>' + quakesEELOC[k] + '<br />' + quakesEEcommLOC[k] + '<br />';
                //}
                //NEW VERSION  WITH CACHED CONTENT OUTPUT SAVED quakesEELOC => saveJSONIndexEE.MquakesEELOC[i][1].length
                for(var k = 0; k < saveJSONIndexEE.MquakesEELOC[i][1].length; k++){
                    //TODO: aggiungi saveJSONIndexEE.M + [i][1][k] per accedere al singolo elemento dell'array
                    OnClickText = OnClickText + '<table class="EEinfowTable"><tbody>' + saveJSONIndexEE.MquakesTitleLOC[i][1][k] + '</tbody></table>' + saveJSONIndexEE.MquakesEELOC[i][1][k] + '<br />' + saveJSONIndexEE.MquakesEEcommLOC[i][1][k] + '<br />';
                }
                // close infowindow div when infowindow text is complete
                // OnClickText = '<div class="IW"><div id = "IWclose"><a onclick="infowindow.close(); turnoffRow()" href="#"><img src="images/close.png" height="10px"></a></div>' + OnClickText + '</div></div>'   // VERSIONE PRECEDENTE DELLE IW!! PRIMA CHE GOOGLE CAMBIASSE API

                //assegna un elemento della matrice ad una variabile RecEE
                // -------------- TABLE
                var RecEE = EEmarkersArray[i];

                tbody = document.getElementById('EE_data');
                row = document.createElement("tr");
                row.setAttribute('class', RecEE['EE_nloc']);

                var cell1 = document.createElement('td');
                cell1.setAttribute('class', 'eetype');
                cell1.setAttribute('data-text', RecEE['EE_ordernum']);
                cell1.innerHTML = '<abbr class="' + RecEE['EE_codeff'] + '" title="" ><img src="images/EE/color/'+ RecEE['EE_codeff'] + '.png" width= "18" vertical-align="-30px"/></abbr>' //////////

                var cell2 = document.createElement('td');
                cell2.setAttribute('class', 'natEE');
                cell2.innerHTML = RecEE['abbrsymbol'] + RecEE['symbol'] + '</abbr>'
                // cell2.innerHTML = RecEE['symbol']

                var cell3 = document.createElement("td");
                cell3.setAttribute('class', 'locEE');
                // cell1.innerHTML =  '<a onclick=onclickListLOC('+i+') href="EEmarkersArray">' + descloc[i] + '</a>';
                cell3.innerHTML = '<a onclick=onclickListEE('+i+') href="#">' + RecEE['EE_loc'] + '</a>';
                // EE_loc[k] + '(' + EE_prov[k] + ')';

                var cell4 = document.createElement('td');
                cell4.setAttribute('class', 'dateEE');
                cell4.setAttribute('data-text', RecEE['EE_orderdate']);
                cell4.innerHTML = RecEE['EQdate'];

                var cell5 = document.createElement("td");
                cell5.setAttribute('class', 'timeEE');
                cell5.innerHTML = RecEE['EQtime'];

                var cell6 = document.createElement("td");
                cell6.setAttribute('class', 'io');
                cell6.innerHTML = RecEE['EQIo'];

                var cell7 = document.createElement("td");
                cell7.setAttribute('class', 'meEE');
                cell7.innerHTML = RecEE['EQMe'];

                var cell8 = document.createElement("td");
                cell8.setAttribute('class', 'locationEE');
                cell8.innerHTML = RecEE['EQarea'];

                // alert(markersArray[NperiodEQ.indexOf(EE_nperiod[k])]['Nperiod'])
                // alert(EE_nperiod[k])

                row.appendChild(cell1);
                row.appendChild(cell2);
                row.appendChild(cell3);
                row.appendChild(cell4);
                row.appendChild(cell5);
                row.appendChild(cell6);
                row.appendChild(cell7);
                row.appendChild(cell8);
                tbody.appendChild(row);

                //TODO: riaggiungere la gestione dei popup alla fine TEMPO TOT 10sec massimo

                //OLD VERSION openPopupEE  WITHOUT CACHED CONTENT OUTPUT SAVED
                //openPopupEE(RecEE['Marker'], OnClickText, RecEE['EE_nloc'], E1commIT, E1commEN);

                //NEW VERSION openPopupEE WITH CACHED CONTENT OUTPUT SAVED
                //TODO: aggiungi saveJSONIndexEE.M + [i][1] in questo caso passa direttamente tutto l'array iesimo (altrimenti per accedere al singolo elemento dell'array [i][1][k] come sopra
                openPopupEE(RecEE['Marker'], OnClickText, RecEE['EE_nloc'], saveJSONIndexEE.ME1commIT[i][1], saveJSONIndexEE.ME1commEN[i][1]);

                // console.log("DUMP marker con info popup valorizate....");
                // console.log(RecEE['Marker']);
                // console.log(RecEE['Marker'].ContentPopupText);

                //TODO: Export variable TXT ADATTARE ALLA NUOVA GESTIONE
                ExportText = ExportText + CarRet + class_titleEE_EN[class_codeEE.indexOf(RecEE['EE_codeff'])] + ';' + RecEE['EEtypeExp'] + ';' + RecEE['EE_loc'] + ';' + RecEE['EE_Lat'] + ';' + RecEE['EE_Lon'] + ';' + String.fromCharCode(34) + RecEE['EQdate'] + String.fromCharCode(34) + ';' + String.fromCharCode(34) + RecEE['EQtime'] + String.fromCharCode(34) + ';' + String.fromCharCode(34) + RecEE['EQIo'] + String.fromCharCode(34) + ';' + String.fromCharCode(34) + RecEE['EQMe'] + String.fromCharCode(34) + ';' + String.fromCharCode(34) + RecEE['EEepAreaExp'] + String.fromCharCode(34)

                //TODO: Export variableKML  ADATTARE ALLA NUOVA GESTIONE
                ExportKmlR = ExportKmlR + "<Placemark> <name>" + class_titleEE_EN[class_codeEE.indexOf(RecEE['EE_codeff'])]  + " - " + RecEE['EE_loc'] + "</name>" + CarRet + "<description><![CDATA["
                ExportKmlR = ExportKmlR + "<b>" +  class_titleEE_EN[class_codeEE.indexOf(RecEE['EE_codeff'])] + "</b> <br> (" + RecEE['EEtypeExp'] + ")<br><br>Locality: <b>" + RecEE['EE_loc'] + "</b><br>Latitude: <b>" + RecEE['EE_Lat'] + "</b> <br>Longitude: <b>" + RecEE['EE_Lon'] + "</b><br><b><a href=" + virg + "http://storing.ingv.it/cfti/cfti5/locality.php?" + RecEE['EE_nloc'] + "EN" + virg + ">Locality page </a></b><br> <br><br>" + CarRet + "<table>" + CarRet + "<tr> <td><b>Date </b></td><td><b>Time </b></td> <td><b>Io</b></td> <td><b>Me</b></td><td><b>Epicentral Area</b></td> </tr>" + CarRet + "<tr><td>"+ RecEE['EQdate'] + "</td> <td>" + RecEE['EQtime'] + "</td> <td>" + RecEE['EQIo'] + "</td> <td>" + RecEE['EQMe'] + "</td> <td>" + RecEE['EEepAreaExp'] + "</td></tr>" + CarRet + "</table>" + CarRet
                ExportKmlR = ExportKmlR + "]]></description>" + CarRet + "<LookAt>" + CarRet + "<longitude>" + RecEE['EE_Lon'] + "</longitude>" + CarRet + "<latitude>" + RecEE['EE_Lat'] + "</latitude>" + CarRet + "<range></range>" + CarRet + "</LookAt>" + CarRet + "<styleUrl>#" + RecEE['EE_codeff'] + "</styleUrl>" + CarRet + "<Point>" + CarRet + "<coordinates>"+ RecEE['EE_Lon'] + ","+ RecEE['EE_Lat'] + "</coordinates>" + CarRet + "</Point>" + CarRet + "</Placemark>"


                //replace <br /> with "line feed"
                var regBR = new RegExp("<br " + String.fromCharCode(47) + ">", "g");
                ExportText = ExportText.replace(regBR,String.fromCharCode(10));
            }

            console.log("CHECKPOINT 5 END - building info Windows..FOR + WHILE INDX OF...EEmarkersArray:" + EEmarkersArray.length);


            ///TODO: EXPORT KML e EXPORTTEXT sono da verificare/gestire
            //Export variableKML
            ExportKml = "";
            jQuery.get('/OtherFilesService/KML@EE_a.txt', function(data){
                console.log("CHECKPOINT 6 END - readingn KML/EE_a.txt ==} ExportKml ");

                ExportKml = data;
                ExportKml = ExportKml + CarRet +"<Folder>" + CarRet + "<name>CFTI5Med - " + EEmarkersArray.length + " Environmental Effects selected</name>";
                ExportKml = ExportKml + "<open>1</open>";
                ExportKml = ExportKml + "<description>";
                ExportKml = ExportKml + "<![CDATA[<body><a href="+virg+"http://storing.ingv.it/cfti/cfti5/"+virg+"> <img src="+virg+"http://storing.ingv.it/cfti/cfti5/images/banner_CFTI_newG_thin_EN"+virg+" alt="+virg+"Logo CFTI5Med"+virg+" height="+virg+"32px"+virg+"></a></body>]]>";
                ExportKml = ExportKml + "</description>";
                ExportKml = ExportKml + "</Folder>" + CarRet ;
                ExportKml = ExportKml + "<Folder><name>Environmental Effects</name>";

                ExportKml = ExportKml + ExportKmlR;

                jQuery.get('/OtherFilesService/KML@EE_b.txt', function(dataB){
                    console.log("CHECKPOINT 7 END - readingn KML/EE_b.txt ==} ExportKml ");
                    ExportKml = ExportKml + dataB;
                })
            })

            // TODO: SALVATAGGIO DELLE VARIABILI CREAZIONE ARRAY GLOBAL x sostituire l'elaborazione del ciclo while con valori costanti.
            //TODO: FUNZIONA SOLO PER CARICAMENTO INIZIALE
            //    $.ajax({
            //        url: '/saveJSONFile?IndexEEdataFullCached',  //http://localhost/saveJSONFile?Filename => Route::post('/saveJSONFile', 'PhotoController@saveJSONFile');
            //        type: 'POST',
            //        dataType: 'json',
            //        contentType: 'json',
            //        data:  JSON.stringify(saveJSONIndexEE),  //STRUTTURA SALVATA SOPRA DENTRO IL CICLO for (var i = 0; i < EEmarkersArray.length; i++) {  // loop thorough each selected EE
            //        contentType: 'application/json; charset=utf-8',
            //        success: function(data){
            //            if(data.success == true){
            //                console.log("success saved quakesDataArray<=markersArray.");
            //            }
            //        },
            //        error: function (jqXHR, textStatus, errorThrown) {
            //            console.error(textStatus);
            //            console.error(errorThrown);
            //        }
            //
            //    })


            // Table sorting
            if (flagFilterEE == 0){ // FIRST TIME
                $(document).ready(function() {
                    // call the tablesorter plugin
                    $("#EE_info").tablesorter({
                        //	sort on the first, second and third (order desc) column
                        sortList: [[1,0],[2,0],[3,0]]
                    });
                    console.log("CHECKPOINT 8 END - $(\"#EE_info\").tablesorter ");
                });
                flagFilterEE = 1
            } else { // LATER TIMES
                $('.tablesorter').trigger('updateAll');
            }
            // ResetMapEE()

            if (Langsel == "EN") { NumEESel.innerHTML = "<b>" + EEmarkersArray.length + ' </b><span id="numEE"> effects selected </span>';
            } else { NumEESel.innerHTML = "<b>" + EEmarkersArray.length + ' </b><span id="numEE"> effetti selezionati</span>'};

            new LanguageTools().setLanguage(Langsel);
            $('#loading').hide();

        }).then( function( dummy ) {
            //TODO: ULTIMA CHIAMATA CHE PRIMA ERA PRESENTE SUL MANAJAX -> server per mostrare i dati su mappa!
            /**if (document.getElementById("access")!== undefined && document.getElementById("access")!==  null ) {
            console.log("DROPDOWN access VALUE:");
            console.log(document.getElementById("access").value);
            // <select id="access" name="access" onChange="stateChange()">
            // 	<option value="EQ" id="EQ" name="EQ" selected="">Terremoti</option>
            // 	<option value="LOC" id="LOC" name="LOC">Località</option>
            // 	<option value="EE" id="EE" name="EE">Effetti sull'ambiente naturale</option>
            // </select>
            var dropdownElementSelected = document.getElementById("access").value;
            ......................................
            else if (dropdownElementSelected == "EE") {
                console.log("CREAZIONE MAPPA EFFETTI SULL'AMBIENTE:");
                indexEEAmbiente();
            }
        }
             *
             */
            indexEEAmbiente();
        });
    });
}



function initializeEE(){
	clearMap();
	// sbianca tabella
	document.getElementById('EE_data').innerHTML= "";
	EEmarkersArray = [];
	if (flagFilterEE == 0){ // FIRST TIME
		createEEmenu();
		requestEEbiblio();
	} else { // LATER TIMES
		requestEEdata();
	}
}


function showE1(idname){
	document.getElementById(idname).style.display = "block";
	var id1 = "showE1_EE" + idname;
	var id2 = "hideE1_EE" + idname;
	document.getElementById(id1).style.display = "none";
	document.getElementById(id2).style.display = "inline";

	$('section').translatable({
	  contentNodeSelector     : 'span.gtranslate'
	, translateButtonSelector : 'a[href="#translate"]'
	//        , autoChangeButtonText    : false
	//        , language                : 'en'
	//        , debug                   : true
	});

}

function hideE1(idname){
	document.getElementById(idname).style.display = "none";
	var id1 = "showE1_EE" + idname;
	var id2 = "hideE1_EE" + idname;
	document.getElementById(id1).style.display = "inline";
	document.getElementById(id2).style.display = "none";
}


function openPopupEE(marker, text, Nloc, E1textIT, E1textEN){

	//Vecchia gestione google map non piu presente

	   marker.OnClickTextIT = text;   //Testo popup iniziale
	// specify language of popup window
		if (Langsel == "EN") {
			for (var i=0; i<class_codeEE.length; i++){
				text = text.split(class_titleEE_IT[i]).join(class_titleEE_EN[i])
			}
			for (var i=0; i<E1textIT.length; i++){
				text = text.split(E1textIT[i]).join(E1textEN[i])
			}
			text = text.split(EElinkLOCabbr_IT).join(EElinkLOCabbr_EN)
			text = text.split(EEdescrIT).join(EEdescrEN)
			text = text.split(EElinkEQabbr_IT).join(EElinkEQabbr_EN)

			text = text.split('IT').join('EN')
		} else {
			for (var i=0; i<class_codeEE.length; i++){
				text = text.split(class_titleEE_EN[i]).join(class_titleEE_IT[i])
			}
			for (var i=0; i<E1textIT.length; i++){
				text = text.split(E1textEN[i]).join(E1textIT[i])
			}
			text = text.split(EElinkLOCabbr_EN).join(EElinkLOCabbr_IT)
			text = text.split(EEdescrEN).join(EEdescrIT)
			text = text.split(EElinkEQabbr_EN).join(EElinkEQabbr_IT)
			text = text.split('EN').join('IT')
		}

		//assegna all'array gigante le info per il popup

		marker.ContentPopupText = text; //Testo popup con logica applicata da visualizzare nella mappa

		/***GESTIONE POPUP GOOGLE MAPS commentata ***/
		//infowindow.setContent(text);

/*     GESTIONE GOOGLE MAPS COMMENTATA
		// open popup window
		infowindow.open(map, marker);*/

		google.maps.event.addListener(marker, 'click', function() {
		var rows = [];
		rows = document.getElementsByClassName(Nloc);
		// scroll to selected table row
		if (FlagScroll == 1){ // do it only if selection from map marker
			rows[rows.length-1].scrollIntoView(false);
		}
		FlagScroll = 1;

		// turn off previously selected table rows when clicking on new marker
		if (NlocOld) {
			var rowsOld = [];
			rowsOld = document.getElementsByClassName(NlocOld);
			for (var i = 0; i < rowsOld.length; i++) {
				rowsOld[i].style.backgroundColor = "#ffffff";
			}
		}

		// highlight new table rows
		for (var i = 0; i < rows.length; i++) {
			rows[i].style.backgroundColor = "#ffffaa";
		}
		NlocOld = Nloc;
	})
}


// When clicking on table row, trigger event on Gmap marker (used to trigger popup window when clicking on table row)
function onclickListEE(prog){
	// Flag for scrolling table - set to zero when event is selected from table (and not from marker)
	FlagScroll = 0;

	google.maps.event.trigger(EEmarkersArray[prog]['Marker'], 'click');

	// center map on selected event (when selecting from table line)
	var center = new google.maps.LatLng(EEmarkersArray[prog]['EE_Lat'], EEmarkersArray[prog]['EE_Lon']);
	/*map.setZoom(10);
    map.panTo(center);*/

	//************zoom nella zona di riferimento dove e' posizionata la singola feature
	var padding = [500, 50, 500, 50]
	mapOL.getView().fit(
		EEmarkersArray[prog]['Marker'].getGeometry().getExtent(),
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
		collection.push(EEmarkersArray[prog]['Marker']);
		select.dispatchEvent({
			type: 'select',
			selected: [EEmarkersArray[prog]['Marker']],
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



//   MENU SELECTION EE

function ShowPaes(index){
	if (TogglePaes[index] == "on") {
		TogglePaes[index] = "off";
		document.getElementById("Toggle" + nameEEpaes[index]).src = "images/EE/color/_G/" + codeEEpaes[index] + ".png"
		}
	else {
		TogglePaes[index] = "on";
		document.getElementById("Toggle" + nameEEpaes[index]).src = "images/EE/color/_B/" + codeEEpaes[index] + ".png"
	}
}
function ShowAcsup(index){
	if (ToggleAcsup[index] == "on") {
		ToggleAcsup[index] = "off";
		document.getElementById("Toggle" + nameEEacsup[index]).src = "images/EE/color/_G/" + codeEEacsup[index] + ".png"
		}
	else {
		ToggleAcsup[index] = "on";
		document.getElementById("Toggle" + nameEEacsup[index]).src = "images/EE/color/_B/" + codeEEacsup[index] + ".png"
	}
}
function ShowAcsot(index){
	if (ToggleAcsot[index] == "on") {
		ToggleAcsot[index] = "off";
		document.getElementById("Toggle" + nameEEacsot[index]).src = "images/EE/color/_G/" + codeEEacsot[index] + ".png"
		}
	else {
		ToggleAcsot[index] = "on";
		document.getElementById("Toggle" + nameEEacsot[index]).src = "images/EE/color/_B/" + codeEEacsot[index] + ".png"
	}
}
function ShowCoste(index){
	if (ToggleCoste[index] == "on") {
		ToggleCoste[index] = "off";
		document.getElementById("Toggle" + nameEEcoste[index]).src = "images/EE/color/_G/" + codeEEcoste[index] + ".png"
		}
	else {
		ToggleCoste[index] = "on";
		document.getElementById("Toggle" + nameEEcoste[index]).src = "images/EE/color/_B/" + codeEEcoste[index] + ".png"
	}
}
function ShowGas(index){
	if (ToggleGas[index] == "on") {
		ToggleGas[index] = "off";
		document.getElementById("Toggle" + nameEEgas[index]).src = "images/EE/color/_G/" + codeEEgas[index] + ".png"
		}
	else {
		ToggleGas[index] = "on";
		document.getElementById("Toggle" + nameEEgas[index]).src = "images/EE/color/_B/" + codeEEgas[index] + ".png"
	}
}


function ShowPaesaggioALL(){
	if (TogglePaesALL == "on"){
		TogglePaesALL = "off"
		for (var i = 0; i < nameEEpaes.length; i++){
			TogglePaes[i] = "off"
			document.getElementById("Toggle" + nameEEpaes[i]).src = "images/EE/color/_G/" + codeEEpaes[i] + ".png"
		}
	} else {
		TogglePaesALL = "on"
		for (var i = 0; i < nameEEpaes.length; i++){
			TogglePaes[i]  = "on"
			document.getElementById("Toggle" + nameEEpaes[i]).src = "images/EE/color/_B/" + codeEEpaes[i] + ".png"
		}
	}
}
function ShowAcqueSupALL(){
	if (ToggleAcqueSupALL == "on"){
		ToggleAcqueSupALL = "off"
		for (var i = 0; i < nameEEacsup.length; i++){
			ToggleAcsup[i] = "off"
			document.getElementById("Toggle" + nameEEacsup[i]).src = "images/EE/color/_G/" + codeEEacsup[i] + ".png"
		}
	} else {
		ToggleAcqueSupALL = "on"
		for (var i = 0; i < nameEEacsup.length; i++){
			ToggleAcsup[i] = "on"
			document.getElementById("Toggle" + nameEEacsup[i]).src = "images/EE/color/_B/" + codeEEacsup[i] + ".png"
		}
	}
}

function ShowAcqueSotALL(){
	if (ToggleAcqueSotALL == "on"){
		ToggleAcqueSotALL = "off"
		for (var i = 0; i < nameEEacsot.length; i++){
			ToggleAcsot[i] = "off"
			document.getElementById("Toggle" + nameEEacsot[i]).src = "images/EE/color/_G/" + codeEEacsot[i] + ".png"
		}
	} else {
		ToggleAcqueSotALL = "on"
		for (var i = 0; i < nameEEacsot.length; i++){
			ToggleAcsot[i] = "on"
			document.getElementById("Toggle" + nameEEacsot[i]).src = "images/EE/color/_B/" + codeEEacsot[i] + ".png"
		}
	}
}

function ShowCosteALL(){
	if (ToggleCosteALL == "on"){
		ToggleCosteALL = "off"
		for (var i = 0; i < nameEEcoste.length; i++){
			ToggleCoste[i] = "off"
			document.getElementById("Toggle" + nameEEcoste[i]).src = "images/EE/color/_G/" + codeEEcoste[i] + ".png"
		}
	} else {
		ToggleCosteALL = "on"
		for (var i = 0; i < nameEEcoste.length; i++){
			ToggleCoste[i] = "on"
			document.getElementById("Toggle" + nameEEcoste[i]).src = "images/EE/color/_B/" + codeEEcoste[i] + ".png"
		}

	}
}

function ShowGasALL(){
	if (ToggleGasALL == "on"){
		ToggleGasALL = "off"
		for (var i = 0; i < nameEEgas.length; i++){
			ToggleGas[i] = "off"
			document.getElementById("Toggle" + nameEEgas[i]).src = "images/EE/color/_G/" + codeEEgas[i] + ".png"
		}
	} else {
		ToggleGasALL = "on"
		for (var i = 0; i < nameEEgas.length; i++){
			ToggleGas[i] = "on"
			document.getElementById("Toggle" + nameEEgas[i]).src = "images/EE/color/_B/" + codeEEgas[i] + ".png"
		}
	}
}
