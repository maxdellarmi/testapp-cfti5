<!DOCTYPE html>
<html>
<head>
<!--	<meta charset="UTF-8"/>-->
	<title id = "title"> </title>
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="stylesheet" href="css/css.css" />
	<link rel="stylesheet" href="css/locality.css" />
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBYMJIfb4DMSGHl1681W0jLOOQSjP7MA&libraries=geometry,places"> </script>
	<script type="text/javascript" src="jquery/jquery.min.js"> </script>
	<link rel="stylesheet" href="jquery/jquery-ui.css">
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="jquery/jquery-1.12.4.js"></script>
    <script src="jquery/jquery-ui.js"></script>
	<script type="text/javascript" src="js/manajax.js"> </script>
	<script src="js/oms.min.js"></script>
    <script src="js/mapOL.js"></script>

	<script type="text/javascript">
		var url = window.location.href;
		if (url.slice(-1) == '#') url =  url.substr(0,url.length-1);
		var nloc = url.substr(url.indexOf('?')+1,url.length-url.indexOf('?')-3);
		Langsel = url.substr(url.length-2, 2)
        //alert("Langsel:"+Langsel); IT o EM
	</script>

	<script type="text/javascript" src="js/language.js"> </script>
	<script type="text/javascript" src="js/locality.js"> </script>
	<script type="text/javascript" src="js/js.js"> </script>
	<script type="text/javascript" src="js/jquery.tablesorter.js"></script>
	<script src="js/jquery.translator.js"></script>

	<!--Script for windows-1252 encoding export  -->
	<script>
		// 'Copy' browser build in TextEncoder function to TextEncoderOrg (because it can NOT encode windows-1252, but so you can still use it as TextEncoderOrg()  )
		var TextEncoderOrg = window.TextEncoder;
		// ... and deactivate it, to make sure only the polyfill encoder script that follows will be used
		window.TextEncoder = null;
	</script>
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
</head>

<div id="loading" ><br><strong>Loading....</strong></div>

<body onresize="resizeMapLoc()" onload="InitializeLoc()">
	<div id="content">
		<div id="tdCursor"></div>
		<div id="NumSel"></div>
		<div id="FakeGraph">
		</div>
		<div id="IntGraph"></div>
		<div id="IntGraphRed">
			<a href="#" id="ReduceGraph"></a>
		</div>
		<div id="IntGraphEnl">
			<a href="#" id="EnlargeGraph"></a>
		</div>
		<div id="SaveIcon">
		</div>

		<div id="leftside">
			<?php include("html/export.html"); ?>

			<div id="topcolor" class="localityColor">
				<div id="pagetype" class="localityFontColor"><span id="pagetypeLOC"></span></div>
				<?php include("html/topmenu.html"); ?>
			</div>

			<div id="Intro"></div>
			<div id="WikiLink"></div>



			<div id="feltrep" class="feltrep">
					<table id="Loc_info">
						<thead>
							<tr>
								<th id="int" class="int"></th>
								<th id="nat" class="nat"></th>
								<th id="date" class="date"></th>
								<th id="time" class="time"></th>
								<th id="io" class="io"></th>
								<th id="imax" class="imaxLoc"></th>
								<th id="sites" class="sites"></th>
								<th id="me" class="me"></th>
								<th id="location" class="location"></th>
								<th id="emap" class="emap"></th>
							</tr>
						</thead>
						<tbody id="loc_data" class="tbodyblock"></tbody>
					</table>
			</div>
			<!-- caso  EE non in PQ e associati a nperiod-->
			<div id="EEnperiod" class="feltrep">
				<div><span id="EEnperiod_title"></span></div>
				<br />
				<table id="Loc_info_NP">
					<thead>
						<tr>
							<!-- <th id="int" class="int"></th> -->
							<th id="natNP" class="nat"></th>
							<th id="dateNP" class="dateNP"></th>
							<th id="timeNP" class="time"></th>
							<th id="ioNP" class="io"></th>
							<!-- <th id="imax" class="imax"></th> -->
							<!-- <th id="sites" class="sites"></th> -->
							<th id="meNP" class="me"></th>
							<th id="locationNP" class="locationNP"></th>
							<th id="emapNP" class="emap"></th>
						</tr>
					</thead>
					<tbody id="Loc_info_NP_data" class="tbodyblock"</tbody>
				</table>
			</div>
		</div>
		<?php include("html/banlic.html"); ?>

		<?php include("html/legendEPI.html"); ?>
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
    <!-- <span id="status" >STATUS</span> -->

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
