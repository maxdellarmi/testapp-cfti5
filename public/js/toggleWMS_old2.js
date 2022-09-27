function displayWMSerror(){
	alert('errore')
}

function ToggleLayer0() {

	if (Toggle0 == "off") {
		COM.setMap(map);
		Toggle0 = "on";
	} else {
		COM.setMap(null);
		Toggle0 = "off";
	}
}


function ToggleLayer1() {
	if (Toggle1 == "off") {
		PROV.setMap(map);
		Toggle1 = "on";
	} else {
		PROV.setMap(null);
		Toggle1 = "off";
	}
}


function ToggleLayer2() {
	if (Toggle2 == "off") {
		REG.setMap(map);
		Toggle2 = "on";
	} else {
		REG.setMap(null);
		Toggle2 = "off";
	}
}

function ToggleLayer3() {
	if (Toggle3 == "off") {
		map.overlayMapTypes.setAt(8, IGM25);
		Toggle3 = "on";
	} else {
		map.overlayMapTypes.setAt(8, null);
		Toggle3 = "off";
	}
}

function ToggleLayer4() {
	if (Toggle4 == "off") {
		map.overlayMapTypes.setAt(7, IGM100);
		Toggle4 = "on";
	} else {
		map.overlayMapTypes.setAt(7, null);
		Toggle4 = "off";
	}
}

function ToggleLayer5() {

	if (Toggle5 == "off") {
		map.overlayMapTypes.setAt(6, IGM200);
		Toggle5 = "on";
	} else {
		map.overlayMapTypes.setAt(6, null);
		Toggle5 = "off";
	}
}

function ToggleLayer6() {
	if (Toggle6 == "off") {
		$('#refDISS').show();
		DISS_ISS.setMap(map);
		Toggle6 = "on";
	} else {
		$('#refDISS').hide();
		DISS_ISS.setMap(null);
		Toggle6 = "off";
	}
}
// 		var iwOuter = $('.gm-style-iw');
//
// 	  // Moves the infowindow 10px to the right.
//    //    iwOuter.parent().parent().css({left: '15px'});
//
// 	  /* The DIV we want to change is above the .gm-style-iw DIV.
// 	   * So, we use jQuery and create a iwBackground variable,
// 	   * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
// 	   */
// 	  var iwBackground = iwOuter.prev();
//
// 	  // Remove the background shadow DIV
// 	  iwBackground.children(':nth-child(1)').css({'display' : 'none'});
// 		}

function ToggleLayer7() {
	if (Toggle7 == "off") {
		$('#refDISS').show();
		DISS_CSS.setMap(map);
		Toggle7 = "on";
	} else {
		$('#refDISS').hide();
		DISS_CSS.setMap(null);
		Toggle7 = "off";
	}
}

function ToggleLayer8() {
	if (Toggle8 == "off") {
		$('#refDISS').show();
		DISS_SUBD.setMap(map);
		//map.overlayMapTypes.setAt(3, GEO50);
		Toggle8 = "on";
	} else {
		$('#refDISS').hide();
		DISS_SUBD.setMap(null);
		//map.overlayMapTypes.setAt(3, null);
		Toggle8 = "off";
	}
}

function ToggleLayer9() {
	if (Toggle9 == "off") {
		map.overlayMapTypes.setAt(2, GEO100);
		Toggle9 = "on";
	} else {
		map.overlayMapTypes.setAt(2, null);
		Toggle9 = "off";
	}
}

	// function ToggleLayer10() {
	// if (Toggle10 == "off") {
	// 	mapinput.overlayMapTypes.setAt(1, GEOSTR500);
	// 	Toggle10 = "on";
	// } else {
	// 	mapinput.overlayMapTypes.setAt(1, null);
	// 	Toggle10 = "off";
	// }
	// }

function ToggleLayer11a() {
    if (Toggle11a == "off") {
        map.overlayMapTypes.setAt(20, FL);
        FL.setOpacity(.4) ;
        Toggle11a= "on";

    } else {
        map.overlayMapTypes.setAt(20, null);
        Toggle11a = "off";
    }
}

function ToggleLayer11b() {
    if (Toggle11b == "off") {
        map.overlayMapTypes.setAt(21, FP);
        FP.setOpacity(.4) ;
        Toggle11b= "on";
    } else {
        map.overlayMapTypes.setAt(21, null);
        Toggle11b = "off";
    }
}

function ToggleLayer11c() {
    if (Toggle11c == "off") {
        map.overlayMapTypes.setAt(22, FD);
        FD.setOpacity(.4) ;
        Toggle11c= "on";
    } else {
        map.overlayMapTypes.setAt(22, null);
        Toggle11c = "off";
    }
}

function ToggleLayer11d() {
    if (Toggle11d == "off") {
        map.overlayMapTypes.setAt(23, DGPV);
        DGPV.setOpacity(.4) ;
        Toggle11d= "on";
    } else {
        map.overlayMapTypes.setAt(23, null);
        Toggle11d = "off";
    }
}

var CUSTOM_LAYER;
function ToggleLayer12() {
	if (Toggle12 == "off") {
		CUSTOM_LAYER = new google.maps.KmlLayer(document.getElementById('customXMLlink').value, {preserveViewport:true} ) ;
		CUSTOM_LAYER.setMap(map);
		Toggle12 = "on";
	} else {
		CUSTOM_LAYER.setMap(null);
		// document.getElementById('customXMLlink').value = ""
		Toggle12 = "off";
	}
}
