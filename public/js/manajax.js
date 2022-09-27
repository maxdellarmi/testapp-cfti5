const DELETE_ALERT = "Sei sicuro di voler eliminare l'elemento?";
const UNLINK_ALERT = "Scollegare l'elemento?";
const SELECT_INTERVAL = "Devi selezionare un intervallo temporale";
const EMPTY_PWD = "La password non puo' essere vuota";
const PWD_MISMATCH = "La nuova password e la password di conferma non coincidono";
const WRONG_DATE = 'Immetti una data valida nel formato GG-MM-AAAA';
const SHORT_SPONSOR_RESEARCH = 'Per ricercare lo sponsor occorrono almeno 3 caratteri';

var Manajax = function(xmlService){
//alert(xmlService)

	var mySelf = this;


	var ajaxObj;

	var URL = new Array();
	var URLString = '';
	var responseType = '';
	var callBackFunc;
	var FormToSend;
	var TxType;


	this.setURL = function(key, value){
		URL[key] = value;
	}

	this.assemblyURL = function(){
		var values = new Array();
		var j = 0;

		for (var i in URL)
		  values[j++] =  i + '=' + URL[i];

		if('' != this.responseType)
			values[j++] = 'output=' + this.responseType;

		this.URLString = xmlService + '?' + values.join('&');
	}

	this.getURL = function(){
		return this.URLString;
	}

	this.createXMLHttpRequest = function(){
		try{ return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
		try{ return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
		try{ return new XMLHttpRequest(); } catch(e) {}
	}

	this.MakeRequest = function(){

		var dataToSend = null;
		var ajaxObj = this.createXMLHttpRequest();

		ajaxObj.onreadystatechange = function(){
			if(4 == ajaxObj.readyState){
				if(200 == ajaxObj.status){
                    console.log("200 from "+mySelf.URLString);
					mySelf.callBackFunc(
						('text' == mySelf.responseType || 'html' == mySelf.responseType)
							? ajaxObj.responseText
							: ajaxObj.responseText);
                    console.log("end callback:" +  mySelf.callBackFunc.toString() ); //EEList.xml?output=xml e EEList_MED.xml?output=xml

					//potrebbe non essere presente.
					if (document.getElementById("access")!== undefined && document.getElementById("access")!==  null ) {
						console.log("DROPDOWN access VALUE:");
						console.log(document.getElementById("access").value);
						// <select id="access" name="access" onChange="stateChange()">
						// 	<option value="EQ" id="EQ" name="EQ" selected="">Terremoti</option>
						// 	<option value="LOC" id="LOC" name="LOC">Località</option>
						// 	<option value="EE" id="EE" name="EE">Effetti sull'ambiente naturale</option>
						// </select>
						var dropdownElementSelected = document.getElementById("access").value;
						if (dropdownElementSelected == "EQ") {  //caricamento stellette terremoti
							console.log("CREAZIONE MAPPA TERREMOTI:");
							creazioneMappa(); //NB. CHIAMATA X 2 VOLTE ANCHE DALLA FUNZIONE SHOWQUAKES PER l'APPLICAZIONE DEI FILTRI!
						}else if (dropdownElementSelected == "LOC") {
							console.log("CREAZIONE MAPPA LOCALITA:");
							indexLocalita();
						} else if (dropdownElementSelected == "EE") {
							console.log("CREAZIONE MAPPA EFFETTI SULL'AMBIENTE:");
							indexEEAmbiente();
						}
					} 	//CONTROLLA SE E' STATO CHIAMATO UN LAYER DIRETTO LOCALITY.php o l'altro col dettaglio
					else if (mySelf.URLString.indexOf("localitySources") >0 ) {
						console.log("mySelf.URLString - localitySources");
						//creazioneMappaLocalityPHP(epiMarkers);
						creazioneMappaLocalityPHP(localityPHPmarkers);

					}
					//CONTROLLA SE E' STATO CHIAMATO UN LAYER DIRETTO QUAKES.php o l'altro col dettaglio
					else if (mySelf.URLString.indexOf("quakeSources") >0 ) {
						console.log("mySelf.URLString - quakeSources");
					}
					else if (mySelf.URLString == ("EEList.xml?output=xml") || mySelf.URLString == ("EEList_MED.xml?output=xml")  )  {
						//alert("ciao");
						console.log("mySelf.URLString - EEList chiamata effettuata per ultimo dopo [quakeSources] TODO visualizzare la mappa");
						quakesPQMarkers=[];
						for (var i = 0; i < PQMarkers.length; i++) {
							quakesPQMarkers.push(PQMarkers[i]);
						}
						///TODO:DETAILQUAKES dopo aver valorizzato l'array con tutti le feature mostrarle sulla mappa simile a creazioneMappaLocalityPHP
						creazioneMappaQuakesPHP(quakesPQMarkers);
						prepareBASEMAPLayers();
					}
					console.log(mySelf);
				}
				else{
					alert("Aggiornamento informazioni fallito: " + ajaxObj.responseText);
				}
			}
		}

		ajaxObj.open(this.TxType, this.URLString, true);
		if('POST' == this.TxType){
			ajaxObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			dataToSend = this.MakePostRequest();
		}
		ajaxObj.send(dataToSend);
	}

	this.MakePostRequest = function() {
		var form = document.forms[this.FormToSend];
		var qstr = "";

		function GetElemValue(name, value) {
			qstr += (qstr.length > 0 ? "&" : "")
				+ escape(name).replace(/\+/g, "%2B") + "="
				+ encodeURIComponent(value);
		}

		var elemArray = form.elements;
		for (var i = 0; i < elemArray.length; i++) {
			var element = elemArray[i];
			if(undefined != element.type){
				var elemType = element.type.toUpperCase();
				var elemName = element.name;
				if (elemName) {
					if (elemType == "TEXT"
							|| elemType == "SEARCH"
							|| elemType == "TEXTAREA"
							|| elemType == "PASSWORD"
							|| elemType == "BUTTON"
							|| elemType == "RESET"
							|| elemType == "SUBMIT"
							|| elemType == "FILE"
							|| elemType == "IMAGE"
							|| elemType == "HIDDEN")
						GetElemValue(elemName, element.value);
					else if (elemType == "CHECKBOX" && element.checked)
						GetElemValue(elemName,
								element.value ? element.value : "On");
					else if (elemType == "RADIO" && element.checked)
						GetElemValue(elemName, element.value);
					else if (elemType.indexOf("SELECT") != -1)
						for (var j = 0; j < element.options.length; j++) {
							var option = element.options[j];
							if (option.selected)
								GetElemValue(elemName,
										option.value ? option.value : option.text);
						}
				}
			}
		}
		return qstr;
	}

	this.requestAction = function(){

		if(true == this.toScroll)
			scroll(0,0);

		this.assemblyURL();
		this.MakeRequest();
	}
}

