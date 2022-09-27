function displayWMSerror(){
	alert('errore')
}

function ToggleLayer0() {
if (Toggle0 == "off") {
	console.log("richiesta di Toggle0 == 'ON'");
	//console.log(COM_NEW);
	//COM_NEW.setZIndex(0); //zindex del layer
	//inserisce alla posizione iesima il layer
	mapOL.addLayer(COM);
	//map.overlayMapTypes.setAt(27, COM);
	Toggle0 = "on";
} else {
	console.log("richiesta di Toggle0 == 'OFF'");
	(COM!== undefined)? mapOL.removeLayer(COM): null;
	//map.overlayMapTypes.setAt(27, null);
	Toggle0 = "off";
}
}


function ToggleLayer1() {
if (Toggle1 == "off") {
	console.log("richiesta di Toggle1 == 'ON'");
	mapOL.addLayer(PROV);
	Toggle1 = "on";
} else {
	console.log("richiesta di Toggle1 == 'OFF'");
	(PROV!== undefined)? mapOL.removeLayer(PROV): null;
	Toggle1 = "off";
}
}


function ToggleLayer2() {
if (Toggle2 == "off") {
	console.log("richiesta di Toggle2 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
	mapOL.addLayer(REG);
	Toggle2 = "on";
} else {
	console.log("richiesta di Toggle2 == 'OFF'");
	(REG!== undefined)? mapOL.removeLayer(REG): null;
	//map.overlayMapTypes.setAt(25, null);
	Toggle2 = "off";
}
}

function ToggleLayer3() {
	if (Toggle3 == "off") {
		console.log("richiesta di Toggle3 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(IGM25);
		Toggle3 = "on";
	} else {
		console.log("richiesta di Toggle3 == 'OFF'");
		(IGM25!== undefined)? mapOL.removeLayer(IGM25): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle3 = "off";
	}
}

// function ToggleLayer3() {
// 	if (Toggle3 == "off") {
// 		map.overlayMapTypes.setAt(8, IGM25);
// 		Toggle3 = "on";
// 	} else {
// 		map.overlayMapTypes.setAt(8, null);
// 		Toggle3 = "off";
// 	}
// }

// function ToggleLayer4() {
// 	if (Toggle4 == "off") {
// 		map.overlayMapTypes.setAt(7, IGM100);
// 		Toggle4 = "on";
// 	} else {
// 		map.overlayMapTypes.setAt(7, null);
// 		Toggle4 = "off";
// 	}
// }

function ToggleLayer4() {
	if (Toggle4 == "off") {
		console.log("richiesta di Toggle4 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(IGM100);
		Toggle4 = "on";
	} else {
		console.log("richiesta di Toggle4 == 'OFF'");
		(IGM100!== undefined)? mapOL.removeLayer(IGM100): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle4 = "off";
	}
}

// function ToggleLayer5() {
//
// 	if (Toggle5 == "off") {
// 		map.overlayMapTypes.setAt(6, IGM200);
// 		Toggle5 = "on";
// 	} else {
// 		map.overlayMapTypes.setAt(6, null);
// 		Toggle5 = "off";
// 	}
// }

function ToggleLayer5() {
	if (Toggle5 == "off") {
		console.log("richiesta di Toggle5 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(IGM200);
		Toggle5 = "on";
	} else {
		console.log("richiesta di Toggle5 == 'OFF'");
		(IGM200!== undefined)? mapOL.removeLayer(IGM200): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle5 = "off";
	}
}

// function ToggleLayer6() {
// 	if (Toggle6 == "off") {
// 		$('#refDISS').show();
// 		DISS_ISS.setMap(map);
// 		Toggle6 = "on";
// 	} else {
// 		$('#refDISS').hide();
// 		DISS_ISS.setMap(null);
// 		Toggle6 = "off";
// 	}
// }


function ToggleLayer6() {
	if (Toggle6 == "off") {
		$('#refDISS').show();
		console.log("richiesta di Toggle6 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(DISS_ISS);
		Toggle6 = "on";
	} else {
		$('#refDISS').hide();
		console.log("richiesta di Toggle6 == 'OFF'");
		(DISS_ISS !== undefined)? mapOL.removeLayer(DISS_ISS): null;
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

// function ToggleLayer7() {
// 	if (Toggle7 == "off") {
// 		$('#refDISS').show();
// 		DISS_CSS.setMap(map);
// 		Toggle7 = "on";
// 	} else {
// 		$('#refDISS').hide();
// 		DISS_CSS.setMap(null);
// 		Toggle7 = "off";
// 	}
// }

function ToggleLayer7() {
	if (Toggle7 == "off") {
		$('#refDISS').show();
		console.log("richiesta di Toggle7 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(DISS_CSS);
		Toggle7 = "on";
	} else {
		$('#refDISS').hide();
		console.log("richiesta di Toggle7 == 'OFF'");
		(DISS_CSS !== undefined)? mapOL.removeLayer(DISS_CSS): null;
		Toggle7 = "off";
	}
}

//
// function ToggleLayer8() {
// 	if (Toggle8 == "off") {
// 		$('#refDISS').show();
// 		DISS_SUBD.setMap(map);
// 		//map.overlayMapTypes.setAt(3, GEO50);
// 		Toggle8 = "on";
// 	} else {
// 		$('#refDISS').hide();
// 		DISS_SUBD.setMap(null);
// 		//map.overlayMapTypes.setAt(3, null);
// 		Toggle8 = "off";
// 	}
// }

function ToggleLayer8() {
	if (Toggle8 == "off") {
		$('#refDISS').show();
		console.log("richiesta di Toggle8 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(DISS_SUBD);
		Toggle8 = "on";
	} else {
		$('#refDISS').hide();
		console.log("richiesta di Toggle8 == 'OFF'");
		(DISS_SUBD !== undefined)? mapOL.removeLayer(DISS_SUBD): null;
		Toggle8 = "off";
	}
}


// function ToggleLayer9() {
// 	if (Toggle9 == "off") {
// 		map.overlayMapTypes.setAt(2, GEO100);
// 		Toggle9 = "on";
// 	} else {
// 		map.overlayMapTypes.setAt(2, null);
// 		Toggle9 = "off";
// 	}
// }

function ToggleLayer9() {
	if (Toggle9 == "off") {
		console.log("richiesta di Toggle9 == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(GEO100);
		Toggle9 = "on";
	} else {
		console.log("richiesta di Toggle9 == 'OFF'");
		(GEO100!== undefined)? mapOL.removeLayer(GEO100): null;
		//map.overlayMapTypes.setAt(25, null);
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

// function ToggleLayer11a() {
//     if (Toggle11a == "off") {
//         map.overlayMapTypes.setAt(20, FL);
//         FL.setOpacity(.4) ;
//         Toggle11a= "on";
//
//     } else {
//         map.overlayMapTypes.setAt(20, null);
//         Toggle11a = "off";
//     }
// }

function ToggleLayer11a() {
	if (Toggle11a == "off") {
		console.log("richiesta di Toggle11a == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(FL);
		Toggle11a = "on";
	} else {
		console.log("richiesta di Toggle11a == 'OFF'");
		(FL!== undefined)? mapOL.removeLayer(FL): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle11a = "off";
	}
}

// function ToggleLayer11b() {
//     if (Toggle11b == "off") {
//         map.overlayMapTypes.setAt(21, FP);
//         FP.setOpacity(.4) ;
//         Toggle11b= "on";
//     } else {
//         map.overlayMapTypes.setAt(21, null);
//         Toggle11b = "off";
//     }
// }

function ToggleLayer11b() {
	if (Toggle11b == "off") {
		console.log("richiesta di Toggle11b == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(FP);
		Toggle11b = "on";
	} else {
		console.log("richiesta di Toggle11b == 'OFF'");
		(FP!== undefined)? mapOL.removeLayer(FP): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle11b = "off";
	}
}

// function ToggleLayer11c() {
//     if (Toggle11c == "off") {
//         map.overlayMapTypes.setAt(22, FD);
//         FD.setOpacity(.4) ;
//         Toggle11c= "on";
//     } else {
//         map.overlayMapTypes.setAt(22, null);
//         Toggle11c = "off";
//     }
// }

function ToggleLayer11c() {
	if (Toggle11c == "off") {
		console.log("richiesta di Toggle11c == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(FD);
		Toggle11c = "on";
	} else {
		console.log("richiesta di Toggle11c == 'OFF'");
		(FD!== undefined)? mapOL.removeLayer(FD): null;
		//map.overlayMapTypes.setAt(25, null);
		Toggle11c = "off";
	}
}


// function ToggleLayer11d() {
//     if (Toggle11d == "off") {
//         map.overlayMapTypes.setAt(23, DGPV);
//         DGPV.setOpacity(.4) ;
//         Toggle11d= "on";
//     } else {
//         map.overlayMapTypes.setAt(23, null);
//         Toggle11d = "off";
//     }
// }

function ToggleLayer11d() {
	if (Toggle11d == "off") {
		console.log("richiesta di Toggle11d == 'ON'");
//	map.overlayMapTypes.setAt(25, REG);
		mapOL.addLayer(DGPV);
		Toggle11d = "on";
	} else {
		console.log("richiesta di Toggle11d == 'OFF'");
		(DGPV!== undefined)? mapOL.removeLayer(DGPV): null;
		//map.overlayMapTypes.setAt(25, null);
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
