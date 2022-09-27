var stringa_ricerca = [];
var nterr = [];
var iYear = [];
var iMonth = [];
var iDay = [];
var iDate = [];
var sLocation = [];
var fIntensity = [];
var map;
var map2;
var TabellaTerr = new Array();
var iX = "F";
var iY = "F";
var levelKMZ ;
var levelKMZ2;

var xmlService = 'QuakeList.xml';


function sortNumber(a,b) {
      var avalue = a[0],
        bvalue = b[0];
    if (avalue < bvalue) {
        return -1;
    }
    if (avalue > bvalue) {
        return 1;
    }
    return 0;


}


var GmapsTools = function(){
	var mySelf = this;
	var itemName;
	var callBackBlock;
	var FormReference;
	var XMLData;
	var XMLDoc;

	this.itemName = 'maps';
	this.callBackBlock = 'map';

	var infowindow = new google.maps.InfoWindow();
	//Map connection vars
	var mapDiv = 'CFTI';
	var map;
	

	
	this.requestData = function(){

		var ajaxUpdater = new Manajax(xmlService);

		ajaxUpdater.TxType = 'GET';
		ajaxUpdater.responseType = 'xml';

		this.callBackBlock = 'map';
		ajaxUpdater.callBackFunc = this.parseQuakes;

		ajaxUpdater.toScroll = false;

		ajaxUpdater.requestAction();
	}

	this.parseQuakes = function(XmlText){

		//type DOMParserSupportedType = "application/xhtml+xml" | "application/xml" | "image/svg+xml" | "text/html" | "text/xml";

		XMLQuakeList = new DOMParser().parseFromString(XmlText.trim(), 'text/xml');
		XMLQuakeListArrived = true;

		var markers = XMLQuakeList.documentElement.getElementsByTagName("Quake");
		//alert(markers.length);
		
		var k = 0;

		if(0 < markers.length){
			for (var i = 0; i < markers.length; i++) {
			//for (var i = 0; i < 10; i++) {
				// obtain the attribues of each marker
				
				var ID = XMLQuakeList.getElementsByTagName("nterr")[i].childNodes[0].nodeValue;
				var Lat = XMLQuakeList.getElementsByTagName("lat")[i].childNodes[0].nodeValue;
				var Lng = XMLQuakeList.getElementsByTagName("lon")[i].childNodes[0].nodeValue;
				var Location = XMLQuakeList.getElementsByTagName("earthquakelocation")[i].childNodes[0].nodeValue;
				var Country = XMLQuakeList.getElementsByTagName("country")[i].childNodes[0].nodeValue;
				var Zone = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;
				var Intensity = parseFloat(XMLQuakeList.getElementsByTagName("io")[i].childNodes[0].nodeValue);

				//var CheckYear = XMLQuakeList.getElementsByTagName("anno")[i].childNodes[0].nodeValue;
				//alert(CheckYear);
				var sYear =     XMLQuakeList.getElementsByTagName("anno")[i].childNodes[0].nodeValue;
				//var Year = CheckYear.childNodes.length ? parseInt(CheckYear.childNodes[0].nodeValue) : '';
				//alert(sYear);
				//var CheckMonth //= XMLQuakeList.getElementsByTagName("mese")[i].childNodes[0].nodeValue;
				var sMonth =    XMLQuakeList.getElementsByTagName("mese")[i].innerHTML;
				//var Month = CheckMonth.childNodes.length ? parseInt(CheckMonth.childNodes[0].nodeValue) : '';
				//alert(CheckMonth);
				//var CheckDay =  XMLQuakeList.getElementsByTagName("giorno")[i];
				var sDay =      XMLQuakeList.getElementsByTagName("giorno")[i].innerHTML;
				//var Day = CheckDay.childNodes.length ? parseInt(CheckDay.childNodes[0].nodeValue) : '';
				
				var FlagFalse = XMLQuakeList.getElementsByTagName("flagfalseeq")[i].childNodes.length ? true : false;
				var FlagUnknown = XMLQuakeList.getElementsByTagName("flagunkneq")[i].childNodes.length ? true : false;
				var FlagStrong = XMLQuakeList.getElementsByTagName("flagstrongeq")[i].childNodes.length ? true : false;
				var FlagRevisioned = XMLQuakeList.getElementsByTagName("flagreveq")[i].childNodes.length ? true : false;
				var Cat = XMLQuakeList.getElementsByTagName("cat")[i].childNodes[0].nodeValue;
								
				if(Cat == "ITA" && Intensity > 6){
				
				stringa_ricerca[k] = sYear + " " + sMonth + " " + sDay + " - " + Location + ", Io:" + Intensity ;
				nterr[k] = ID ;
				iYear[k] = parseInt(sYear);
				iMonth[k] = parseInt(sMonth);
				iDay[k] = parseInt(sDay);
				iDate[k] = parseInt(sYear + sMonth + sDay)
				sLocation[k] = Location;
				fIntensity[k] = Intensity;
				//alert(k);
				TabellaTerr[k] = new Array();
				TabellaTerr[k][0] = parseInt(sYear + sMonth + sDay)
				TabellaTerr[k][1] = parseInt(sYear)
				TabellaTerr[k][2] = parseInt(sMonth)
				TabellaTerr[k][3] = parseInt(sDay)
				TabellaTerr[k][4] = ID
				TabellaTerr[k][5] = sYear + " " + sMonth + " " + sDay + " - " + Location + ", Io:" + Intensity
				TabellaTerr[k][6] = Location
				TabellaTerr[k][7] = Intensity
				
				
				k = k + 1
				};
				
				
	
			
				
				

			}
		}
		
		
		//TabellaTerr = new Array(iDate, iYear, iMonth, iDay, nterr, stringa_ricerca, sLocation, fIntesity);
		//alert(TabellaTerr[0][2]);
		//alert(stringa_ricerca[2]);
			var sel = document.getElementById('selEq_a1');
			var sel2 = document.getElementById('selEq_a2');
	//alert(stringa_ricerca.length);
	
	var ordinamento = new Array();
	var ordinamento = TabellaTerr.sort(sortNumber);
	//alert(ordinamento[0][0]);
	//alert(ordinamento[1][0]);
	//alert(ordinamento[2][0]);
	//alert(ordinamento[3][0]);
	//alert(ordinamento[4][0]);
	//alert(ordinamento[5][0]);
	//alert(ordinamento[6][0]);
	//alert(ordinamento[7][0]);
	
		for (var i = 0; i < stringa_ricerca.length; i++) {
			
  var opt = document.createElement('option');
    var opt2 = document.createElement('option');
	
    opt.innerHTML = ordinamento[i][5];
    opt.value = ordinamento[i][4];
	
	opt2.innerHTML = ordinamento[i][5];
    opt2.value = ordinamento[i][4];
	
	
	
    sel.appendChild(opt);
	sel2.appendChild(opt2);
	
}
//alert (ordinamento[0][1]);

	}
				

	}

function initialize()
{

	
	GmapsPilot = new GmapsTools();
	GmapsPilot.requestData();
	
			var EMMAMapType = new google.maps.StyledMapType([
 
  	    {
      stylers: [

        { saturation: -100 }
      ]
    },{
	      "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#dde6e8"
            },
            {
                "visibility": "on"
            }
        ]
    }
    ], {name: 'Basemap'}); 
	
	
    var latlng = new google.maps.LatLng(42,13);

    var myOptions =
    {
        zoom: 6,
        center: latlng,
		      mapTypeControlOptions: {
	style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,
    position:google.maps.ControlPosition.TOP_RIGHT,
      mapTypeIds: ['emmamap',google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.TERRAIN, google.maps.MapTypeId.HYBRID  ]
    },

		streetViewControl:false,
		maxZoom : 13,
		minZoom : 6,
		zoomControlOptions: {
						    position: google.maps.ControlPosition.TOP_RIGHT,     style:google.maps.ZoomControlStyle.LARGE
				    },

		        scaleControl: true,
		        overviewMapControl:true,
		        overviewMapControlOptions : {opened: true},
		panControl: true,
		rotateControl:true,
		panControlOptions: {
				  position: google.maps.ControlPosition.TOP_RIGHT

		    }
			        };
		map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			map.mapTypes.set('emmamap', EMMAMapType);
			map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
		map2 = new google.maps.Map(document.getElementById("map_canvas_2"), myOptions);
			map2.mapTypes.set('emmamap', EMMAMapType);
			map2.setMapTypeId(google.maps.MapTypeId.TERRAIN);

	
	map.addListener('bounds_changed', function() {
    var oZ = map.getZoom();
	var oC = map.getCenter();
	
	map2.setCenter(oC)
	
	map2.setZoom(oZ)
	

  });

	
		map2.addListener('bounds_changed', function() {
   
 var oZ = map2.getZoom();
	var oC = map2.getCenter();
	
	map.setCenter(oC)
	
	map.setZoom(oZ)
	
  });



	resizeMap()
}



  function resizeMap() {
//alert('qui');
    var v=window,d=document;
    

        var w = v.innerWidth ? v.innerWidth :
                d.documentElement.clientWidth,
            h = v.innerHeight ? v.innerHeight : 
                d.documentElement.clientHeight,
            s = d.getElementById('WSzPlgIn'),
            ss;
			//alert(w);
			//alert(h);
    //$("div.map").css('width', Math.round( w -600)+'px');
	//$("div.map").width(Math.round( w -600)+'px');
	
	document.getElementById('map_canvas').style.width = Math.round( w/2 -25)+'px';
    document.getElementById('map_canvas_2').style.width = Math.round( w/2 -25)+'px';  
	
	document.getElementById('map_canvas').style.height = Math.round( h -120)+'px';
    document.getElementById('map_canvas_2').style.height = Math.round( h -120)+'px';  
	
    document.getElementById('selEq_2').style.left = Math.round( w/2 +25)+'px';
	 
	//document.querySelector('#feltrep').style.height = Math.round( h -340)+'px';  
}


var LogTools = function(){
	var logBlock = document.getElementById('log');
	var progressMeterBlock = document.getElementById('progressmeter');

	
}


  function kmlplot1(){
if (iX == "T"){
  levelKMZ.setMap(null);
  }
var nterr = document.getElementById('selEq_a1').value;
 
levelKMZ = new google.maps.KmlLayer('http://shine.rm.ingv.it/progetti/CFTI/GM/' + nterr + '.kmz' ) ;

levelKMZ.setMap(map);
iX = "T"
}

 function kmlplot2(){
if (iY == "T"){
 levelKMZ2.setMap(null); 
 }
	 var nterr = document.getElementById('selEq_a2').value;
	 var sUrl = 'http://shine.rm.ingv.it/progetti/CFTI/GM/' + nterr + '.kmz'
levelKMZ2 = new google.maps.KmlLayer(sUrl) ;
//alert (sUrl);
levelKMZ2.setMap(map2);
iY = "T"
}

