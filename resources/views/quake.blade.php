<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1"/>
	<title id = "title"> </title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="stylesheet" href="css/css.css" />
	<link rel="stylesheet" href="css/quake.css" />
	<script type="text/javascript" 	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBYMJIfb4DMSGHl1681W0jLOOQSjP7MA&libraries=geometry,places"> </script>
	<script type="text/javascript" src="jquery/jquery.min.js"> </script>
	<link rel="stylesheet" href="jquery/jquery-ui.css">

	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="jquery/jquery-1.12.4.js"></script>
    <script src="jquery/jquery-ui.js"></script>
	<script type="text/javascript" src="js/manajax.js"> </script>
	<script src="js/oms.min.js"></script>
    <script type="text/javascript" src="js/mapOL.js"> </script>


	<script type="text/javascript">
		var url = window.location.href;
		if (url.slice(-1) == '#') var nchar = url.length - 6 -2;
		else var nchar = url.length - 5 -2;
		var Nterr = url.substr(nchar,5);
		Langsel = url.substr(nchar+5, 2)
    </script>

	<script type="text/javascript" src="js/language.js"> </script>
	<script type="text/javascript" src="js/quake.js"> </script>
	<script type="text/javascript" src="js/js.js"> </script>
	<script type="text/javascript" src="js/jquery.tablesorter.js"></script>
	<script src="js/jquery.translator.js"></script>
	<!--Script for windows-1252 encoding export  -->
	<script>
		// 'Copy' browser build in TextEncoder function to TextEncoderOrg (because it can NOT encode windows-1252, but so you can still use it as TextEncoderOrg()  )
		var TextEncoderOrg = window.TextEncoder;
		// ... and deactivate it, to make sure only the polyfill encoder script that follows will be used
		window.TextEncoder = null;

        console.log("caricamento quake.blade.php...");
	</script>
	<script type="text/javascript" src="js/pdfobject.js"></script>
	<script src="lib/encoding-indexes.js"></script>
	<script src="lib/encoding.js"></script>

	<link rel="stylesheet" type="text/css" href="css/cookies.css" />
	<script src="js/cookieconsent.min.js"></script>
    <!--sezione mappa OL begin-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<!--    FINO ALLA VERSIONE 6.8.1 jsdelivr e una nuova cdn-->
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css" type="text/css">
    <link rel="stylesheet" href="https://unpkg.com/ol-popup@4.0.0/src/ol-popup.css" type="text/css">
    <script src="https://unpkg.com/ol-popup@4.0.0/dist/ol-popup.js" ></script>
    <script src="js/ol-geocoder.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/ol-geocoder@4.1.2/dist/ol-geocoder.min.css">

    <link rel="stylesheet" href="css/popover.css" />
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <!--sezione mappa OL end-->

    <!--TODO:ELENCO CHIAMATE DA CACHARE
    pagina chiamata ==>> http://localhost/quake.php?09698IT

    http://localhost/Morti_Feriti.txt

    http://localhost/valb_descriptions.txt

    http://localhost/EE_classif.txt

    http://localhost/listapdfT.txt

    http://localhost/listapdfR.txt

    http://localhost/QuakeList.xml?output=xml

    http://localhost/quakeSources/09698.xml?output=xml

    http://localhost/EEList.xml?output=xml

    http://localhost/KML/quake_a.txt

    http://localhost/html/credits_disclaimerIT.html

    http://localhost/KML/quake_b.txt -->
</head>

<div id="loading" ><br><strong>Loading....</strong></div>

<body onresize="resizeMapQuake()" onload="InitializeQuake()">
	<div id="content">

		<div id="tdCursor"></div>

		<script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>


		<div id="leftside">

			<div id="topcolor" class="quakeColor">
				<div id="pagetype" class="quakeFontColor"><span id="pagetypeEQ"></span></div>
				<?php include("html/topmenu.html"); ?>
			</div>
			<div id = "locationString"></div>

			<div id="Intro" >
				<div id='nperiodExplanation'></div>
				<table id="quake_info">
					<thead>
						<tr>
							<th id="date" class="dateEQ"></th>
							<th id="time" class="timeEQ"></th>
							<th id="io" class="ioEQ"></th>
							<th id="imax" class="imaxEQ"></th>
							<th id="sites" class="sitesEQ"></th>
							<th id="me" class="meEQ"></th>
							<th id="lat" class="latEQ"></th>
							<th id="lon" class="lonEQ"></th>
							<th id="locationEQ" class="areaEQ"></th>
							<th id="etype" class="etypeEQ"></th>
							<th id="relEQ" class="relEQ"></th>
						</tr>
					</thead>
					<tbody id="quake_data" class="tbodyblock"></tbody>
				</table>
			</div>

			<div id="D0"></div>

			<div id="divLineTopTable">
				<abbr id="abbropenCOMM" title=""><div id="openCOMM">
					<a href="#" id = "commentsICON"><img src="images/comment_icon.png" height= "24px"><span id="readCOMM">Comm.</span></a>
				</div></abbr>

				<div id="level"> </div>
				<div id="morti"> </div>

				<?php include("html/export.html"); ?>
				<div id="ASMIlink"> </div>
				<div id="CPTIlink"> </div>
				<div id="NEW"> </div>


			</div>

			<div id="quakePQtable" class="quakePQtable">
					<table id="PQ_info">
						<thead>
							<tr>
								<th id="int" class="int"></th>
								<th id="nat" class="natEQ"></th>
								<th id="locality" class="locality"></th>
								<th id="latLOC" class="lat"></th>
								<th id="lonLOC" class="lon"></th>
								<th id="dist" class="dist"></th>

							</tr>
						</thead>
						<tbody id="PQ_data" class="tbodyblock"></tbody>
					</table>
			</div>
		</div>

		<div id="commentsWindow" class="ui-widget-content">
			<a href="#" id="closeCW">Close</a>
			<div id="dragpart" onmouseover="$( '#commentsWindow' ).draggable('enable');" onmouseout="$( '#commentsWindow' ).draggable('disable');"><div id="titleCommWin"></div>
			</div>

			<div id="commentsText" onmouseover="$( '#commentsWindow' ).draggable('disable');">
				<!-- <a href="#translate">Translate</a> -->
				<div id='tabs' class="tab"></div>
				<div id="embed" class="tabcontent Gtranslate"></div>
				<!-- <iframe id="embed" src="M1031.pdf" width="100%" height="" border="0" class="tabcontent"></iframe> -->
				<div id="EQparam" class="tabcontent Gtranslate"></div>
				<div id="EQsequence" class="tabcontent Gtranslate"></div>
				<div id="EQreview" class="tabcontent Gtranslate"></div>
				<div id="EQresilience" class="tabcontent Gtranslate"></div>
				<div id="EQscience" class="tabcontent Gtranslate"></div>
				<div id="EQeffectsAnt" class="tabcontent Gtranslate"></div>
				<div id="EQeffectsEnv" class="tabcontent Gtranslate"></div>
				<div id="EQbiblio" class="tabcontent">
					<br>
					<table id="biblio">
						<thead id='biblio_head'>
							<tr>
								<th id="Bauth" class="Bauth"></th>
								<th id="Btitle" class="Btitle"></th>
								<th id="Btype" class="Btype"></th>
								<th id="Byear" class="Byear"></th>
								<th id="Bplace" class="Bplace"></th>
								<th class="Bpdf"><abbr class="biblioEQ_pdfT" id="pdfT" title ="">PDF_T<img src="images/sort.png" width= "8" /></th>
									<!-- <img src="images/pdf_T_icon.png"/></abbr><img src="images/sort.png" width= "8" /> -->
								<th class="Bpdf2"><abbr class="biblioEQ_pdfR" id="pdfR" title ="">PDF_R<img src="images/sort.png" width= "8" /></th>
									<!-- <img src="images/pdf_R_icon.png"/></abbr> -->
							</tr>
						</thead>
						<tbody id="biblio_data"></tbody>
					</table>
				</div>

			</div>
		</div>

		<?php include("html/banlic.html"); ?>
		<?php include("html/legendPQ.html"); ?>

		<div id = "legendmin">
			<a href="#" id="bigger"></a>
			<div id = "legendmintext"><b>Legenda</b></div>
		</div>

    <div id="LaySel">
        <select id="layer-select">
            <option value="Topo1">Stamen Terrain</option>
            <option value="Topo2">OpenTopoMap</option>
            <option value="Road" selected>OpenStreetMap</option>
            <option value="Black">Stamen Toner blackwhite</option>
        </select>
    </div>
    <div id="mapOL" >
	</div>
    <div id="popup"></div>
  <!--  <span id="status" >STATUS</span> -->

		<div id="legend"></div>
	</div>
	<?php include("html/MapLayers_Gsearch_Strum.html"); ?>
	<?php include("html/dh.html"); ?>
<!--sezione mappa OL begin-->
<style>
    #info {
        position: absolute;
        height: auto;
        width: auto;
        z-index: 100;
    }
    .info {
        position: absolute;
        height: auto;
        width: auto;
        z-index: 100;
    }
    .tooltip.in {
        opacity: 1;
    }
    .tooltip.top .tooltip-arrow {
        border-top-color: white;
    }
    .tooltip-inner {
        max-width: 400px;
        padding: 3px 8px;
        color: #645959;
        text-align: center;
        background-color: #f8f5f5;
        border-radius: 4px;
        font-size: 12px;
    }
    .tooltip {
        top: 100px !important;
    }
    .popover-content
    {
        padding: 0px !important;
    }
    input[type=range] {
        -webkit-appearance: none;
        margin: 10px 0;
        width: 100%;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #337AB7;
        border-radius: 1px;
        border: 0px solid #000000;
    }
    input[type=range]::-webkit-slider-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #337AB7;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #337AB7;
    }
    input[type=range]::-moz-range-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        box-shadow: 0px 0px 0px #000000;
        background: #337AB7;
        border-radius: 1px;
        border: 0px solid #000000;
    }
    input[type=range]::-moz-range-thumb {
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #337AB7;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
    }
    input[type=range]::-ms-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #337AB7;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-fill-upper {
        background: #337AB7;
        border: 0px solid #000000;
        border-radius: 2px;
        box-shadow: 0px 0px 0px #000000;
    }
    input[type=range]::-ms-thumb {
        margin-top: 1px;
        box-shadow: 0px 0px 0px #000000;
        border: 1px solid #337AB7;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #A1D0FF;
        cursor: pointer;
    }
    input[type=range]:focus::-ms-fill-lower {
        background: #337AB7;
    }
    input[type=range]:focus::-ms-fill-upper {
        background: #337AB7;
    }
    .classBlue{
        background: #dbe8fc !important;
    }
    .classBlue:nth-of-type(odd){
        background: #c2d9fd !important;
    }
</style>
<!--sezione mappa OL end-->
</body>
</html>
