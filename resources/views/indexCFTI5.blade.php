<!DOCTYPE html>
<html>
<head>
<!--    <meta charset="UTF-8">-->
    <title> CFTI5Med </title>
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="stylesheet" href="css/css.css" />
    <link rel="stylesheet" href="css/index.css" />
    <link rel="stylesheet" href="jquery/jquery-ui.css">
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBYMJIfb4DMSGHl1681W0jLOOQSjP7MA&libraries=geometry,places"> </script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="jquery/jquery-1.12.4.js"></script>
    <script src="jquery/jquery-ui.js"></script>
    <script type="text/javascript" src="js/manajax.js"> </script>
    <script src="js/oms.min.js"></script>
    <script src="js/mapOL.js"></script>
    <script src="slider/nouislider.js"></script>
    <link rel="stylesheet" href="slider/nouislider.css" />

    <script type="text/javascript" src="js/language.js"> </script>
    <script type="text/javascript" src="js/js.js"> </script>
    <script type="text/javascript" src="js/index.js"> </script>
    <script type="text/javascript" src="js/index_EE.js"> </script>
    <script type="text/javascript" src="js/index_loc.js"> </script>

    <script type="text/javascript" src="js/jquery.tablesorter.js"></script>

<!--    JQUERY TRANSLATOR LAVORA SUGLI OGGETTI DI GOOGLE CHE NON ESISTONO PIU-->
<!--    <script src="js/jquery.translator.js"></script>-->

    <!--Script for windows-1252 encoding export  -->
    <script>
        // 'Copy' browser build in TextEncoder function to TextEncoderOrg (because it can NOT encode windows-1252, but so you can still use it as TextEncoderOrg()  )
        var TextEncoderOrg = window.TextEncoder;
        // ... and deactivate it, to make sure only the polyfill encoder script that follows will be used
        window.TextEncoder = null;

        //Funzionalità che cacha solo xml dati con commento classe Manajax e utilizzo jquery con callback .then
        //$.ajax({
        //url: '/indexQuakesXML',  //http://localhost/indexQuakesXML => Route::get('/indexQuakesXML','PhotoController@indexQuakesXML');
        //}).then ( function(XmlText) {  //ajaxUpdater.callBackFunc = this.parseQuakes;

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

<!--       ==============    WMS-WMF LINKS   - CSW METADATA   =============         -->
<div id="WMSdiv" class="URLdiv"><input type="text" value="http://services-storing.ingv.it/CFTI/wms?service=WMS&request=getCapabilities" id="WMStext"></div>
<div id="WFSdiv" class="URLdiv"><input type="text" value="http://services-storing.ingv.it/CFTI/wfs?service=WFS&request=getCapabilities" id="WFStext"></div>
<div id="METAdiv" class="URLdiv"><input type="text" value="http://services.seismofaults.eu/geonetwork/srv/eng/csw-cfti?SERVICE=CSW&VERSION=2.0.2&REQUEST=GetCapabilities" id="METAtext"></div>

<!--<body onresize="resizeMapIndex()" onload="stateChange()">-->
<body onload="stateChange()" onresize="resizeMapIndex()">

<div id="content" style="height: 50%; width:50%">
    <div id="tdCursor"></div>
    <div id="NumSel"></div>
    <div id="FakeGraph">
    </div>
    <div id="IntGraphINDEX">
    </div>
    <div id="SaveIcon">
    </div>

    <div id="IntGraphRed">
        <a href="#" id="ReduceGraph"></a>
    </div>
    <div id="IntGraphEnl">
        <a href="#" id="EnlargeGraph"></a>
    </div>

    <div id="clickOK">
        <a href="#" id="closeOKwarning"></a>
        <span id="clickOKsentence"></span>
    </div>

    <div id="leftside" >
        <div id="topcolor">
            <div id="accessDIV" >
                <abbr title="Accesso per" id ="abbracc"><select id="access" name="access" onchange="stateChange()"></abbr>
                <option value="EQ" id="EQ" name="EQ" selected>Terremoti</option>
                <option value="LOC" id="LOC" name="LOC">Località</option>
                <option value="EE" id="EE" name="EE">Effetti ambientali</option>
                </select>
            </div>
            <?php include("html/topmenu.html"); ?>
        </div>
        <?php include("html/export.html"); ?>

        <div id="WMSWFS">
            <abbr title="metadata info"><a href="http://services.seismofaults.eu/geonetwork/srv/eng/catalog.search#/metadata/65aeb520-c4a2-430c-bac9-8098580d721e" target = "_blank"><img src="images/metadata.png" height="24px" /></a></abbr>&nbsp&nbsp
            <abbr title="metadata CSW"><input class="METAbutton" type="image" src="images/metadata_CSW.png" border="0" height="24px"/></abbr>&nbsp&nbsp&nbsp&nbsp
            <abbr title="" id ="abbrWMSlink"><input class="WMSbutton" type="image" src="images/WMS.png" border="0" height="28px"/></abbr>
            <abbr title="" id ="abbrWFSlink"><input class="WFSbutton" type="image" src="images/WFS.png" border="0" height="28px"/></abbr>
        </div>


        <nav id="menuEQ" class="menu">
            <div class="MenuBlockPeriod">
                <div class="TitleMenu" id="period" name="period">Periodo</div>
                <br><div class="OptionMenu"> <label for="StartDate" id="fromDate" name="fromDate"> Dal&nbsp </label> <input type=	"text" id="StartDate" name="StartDate" size="4" maxlength="4"/>
                    <label for="StopDate" id="toDate" name="toDate">Al</label> <input type="text" id="StopDate" name="StopDate" size="4" maxlength="4"/> </div>
                <br><br><div id="sliderT"></div>
            </div>


            <div class="MenuBlockCoord">
                <div class="TitleMenu" id="Coord" name="Io">Area</div>
                <br><div class="OptionMenu"> <label id="Lat" name="lat">Lat</label> <input type="text" id="LatS" name="LatS" size="5" maxlength="5" onchange="resizeRect()"> <label>-</label> <input type="text" id="LatN" name="LatN" size="5" maxlength="5" onchange="resizeRect()"> </div>
                <div class="OptionMenu"> <label id="Lon" name="Lon">/ Lon</label> <input type="text" id="LonW" name="LonW" size="5" maxlength="5" onchange="resizeRect()"> <label>-</label> <input type="text" id="LonE" name="LonE" size="5" maxlength="5" onchange="resizeRect()"> </div>

                <br><select id="zoneQuake" name="zoneQuake" class="textBoxes">
                    <option value="BOTH" id="both" name="both">Tutti</option>
                    <option value="ITA" id="italian" name="italian" selected>Terremoti Italiani</option>
                    <option value="MED" id="mediterranean" name="mediterranean">Terremoti Mediterranei</option>
                </select>

                <div id="selArea" onclick="CreateRect();"><abbr id="selAreaAbbr" title="Seleziona area"><img src="./images/area_selection.png" width = "25px" ></abbr></div>

                <div id="NoselArea"><img src="./images/area_selection_gray.png" width = "25px" ></div>
            </div>


            <div class="MenuBlockInt">
                <div class="TitleMenuA" id="Io" name="Io" onclick="SwitchIoMM('Io');"></div>
                <div class="TitleMenuB" id="MM" name="MM" onclick="SwitchIoMM('MM');"></div>
                <br><br><div class="OptionMenu">
                    <div id="IoDIV">
                        <label for="StartIo" id="fromIo" name="fromIo">Da</label> <input type="text" id="StartIo" name="StartIo" size="2" maxlength="4"/>
                        <label for="StopIo" id="toIo" name="toIo">a</label>
                        <input type="text" id="StopIo" name="StopIo" size="2" maxlength="4"/>
                        <div id="sliderI"></div>
                    </div>

                    <div id="MMDIV">
                        <label for="StartMM" id="fromMM" name="fromMM">Da</label> <input type="text" id="StartMM" name="StartMM" size="2" maxlength="4"/>
                        <label for="StopMM" id="toMM" name="toMM">a</label>
                        <input type="text" id="StopMM" name="StopMM" size="2" maxlength="4"/>
                        <div id="sliderM"></div>
                    </div>
                </div>
                <div id="Fa">
                    <input type="checkbox" id="flagfalseeq" name="flagfalseeq" /><span id="false" name="false"></span>
                </div>
            </div>

            <abbr class="OKbutton" title=""><input type="button" id="FilterByKindEvent" name="FilterByKindEvent" size="20" value="OK"/></abbr>
        </nav>

        <nav id="menuLOC" class="menu">
            <div class="MenuBlockLoc">
                <div class="TitleMenu" id="LocnameSearch" name="LocnameSearch"></div><br>
                <label for="tags"> </label>
                <input id="tags" type="text" placeholder="Search Locality" class="SearchBox">
            </div>
            <div class="MenuBlockint_loc">
                <div class="TitleMenuIsmax" id="Imax" name="Imax"></div><br>
                <div class= "OptionMenu"><label for="StartImax" id="fromImax" name="fromImax">Da</label> <input type="text" id="StartImax" name="StartImax" size="2" maxlength="4"/>
                    <label for="StopImax" id="toImax" name="toImax">a</label>
                    <input type="text" id="StopImax" name="StopImax" size="2" maxlength="4"/></div>
                <div id="sliderI_loc"></div>
            </div>
            <abbr class="OKbutton" title=""><input type="button" id="FilterByLOC" name="FilterLocality" size="20" value="OK" onclick="$('#loading').show(); setTimeout(function() {createTableandPlot({StartImax: parseFloat(document.getElementById('StartImax').value), StopImax: parseFloat(document.getElementById('StopImax').value),}); indexLocalita(); }, 10)"/></abbr>
            <!-- <div class="MenuBlockLocG">
                <div class="TitleMenu" id="LocnameGOOSearch" name="LocnameGOOSearch">Ricerca (google)</div><br>
                <input id="pac-input" type="text" placeholder="Search Box" class="SearchBox">
            </div> -->
        </nav>

        <nav id="menuEE" class="menu">
            <!-- <table id="EEmenuTable"> -->
            <div id='paesaggioEEmenu' class="MenuBlockEE">
                <div class="TitleMenu"><span id="TitleMenuEE_paes">Paesaggio &nbsp </span><input type="checkbox" id="TogglePaesALL" name="TogglePaesALL" value="TogglePaesALL" onclick="ShowPaesaggioALL(); " checked class="boxes"></div><br />
                <div id='paesaggio'></div>
                <br />
            </div>
            <div id='acquesupEEmenu' class="MenuBlockEE" >
                <div class="TitleMenu"><span id="TitleMenuEE_acsup">Acque superficiali &nbsp </span><input type="checkbox" id="ToggleAcqueSupALL" name="ToggleAcqueSupALL" value="ToggleAcqueSupALL" onclick="ShowAcqueSupALL(); " checked class="boxes"></div><br />
                <div id='acquesup' style="line-height:27px;"></div>
                <br />
            </div>
            <div id='acquesotEEmenu' class="MenuBlockEE">
                <div class="TitleMenu"><span id="TitleMenuEE_acsot">Acque sotterranee &nbsp </span><input type="checkbox" id="ToggleAcqueSotALL" name="ToggleAcqueSotALL" value="ToggleAcqueSotALL" onclick="ShowAcqueSotALL(); " checked class="boxes"></div><br />
                <div id='acquesot'></div>
                <br />
            </div>
            <div id='costeEEmenu' class="MenuBlockEE">
                <div class="TitleMenu"><span id="TitleMenuEE_coste">Coste &nbsp </span><input type="checkbox" id="ToggleCosteALL" name="ToggleCosteALL" value="ToggleCosteALL" onclick="ShowCosteALL(); " checked class="boxes"></div><br />
                <div id='coste'></div>
                <br />
            </div>
            <div id='gasEEmenu' class="MenuBlockEE">
                <div class="TitleMenu"><span id="TitleMenuEE_gas">Esalazioni / altro &nbsp </span><input type="checkbox" id="ToggleGasALL" name="ToggleGasALL" value="ToggleGasALL" onclick="ShowGasALL(); " checked class="boxes"></div><br />
                <div id='gas'></div>
                <br />
            </div>
            <!-- <input id="search">
            <button type="button" id="FilterByEE" name="FilterByEE" size="20" onclick="initializeEE()"> OK </button> -->
            <abbr class="OKbutton" title=""><input type="button" id="FilterByEE" name="FilterByEE" size="20" value="OK" onclick="$('#loading').show(); setTimeout(function() {initializeEE()}, 10)"/></abbr>
        </nav>

        <div id="resultsEQ" class="results">
            <table id="Eq_info">
                <thead>
                <tr>
                    <th class="date" id="date"></th>
                    <th class="time" id="time"></th>
                    <th class="io" id="io"></th>
                    <th class="imax" id="imax"></th>
                    <th class="sites" id="sites"></th>
                    <th class="me" id="me"></th>
                    <th class="location" id="location"></th>
                    <th class="rel" id="relEQ"></th>
                    <th class="level" id="levelIndex"></th>
                </tr>
                </thead>
                <tbody id="eq_data" class = "tbodyblock">
                </tbody>
            </table>
        </div>

        <div id="resultsLOC" class="results">
            <table id="Loc_info">
                <thead>
                <tr>
                    <th class="nameLOC" id="locname"></th>
                    <th class="provLOC" id="provLOC"></th>
                    <th class="sites" id="sitesLOC"></th>
                    <th class="EEnum" id="EEnumLOC"></th>
                    <th class="imax" id="ismax"></th>
                    <th class="latLOC" id="latLOC"></th>
                    <th class="lonLOC" id="lonLOC"></th>
                </tr>
                </thead>
                <tbody id="Loc_data" class = "tbodyblock">
                </tbody>
            </table>
        </div>

        <div id="resultsEE" class="results">
            <table id="EE_info">
                <thead>
                <tr>

                    <!-- <th class="prov" id="prov"><abbr title="Provincia">Prov</abbr></th> -->
                    <th class="eetype" id="eeType"></th>
                    <th class="natEE" id="dotEE"></th>
                    <th class="locEE" id="locnameEE"></th>
                    <th class="dateEE" id="dateEE"></th>
                    <th class="timeEE" id="timeEE"></th>
                    <th class="io" id="ioEE"></th>
                    <th class="meEE" id="meEE"></th>
                    <th class="locationEE" id="locationEE"></th>
                </tr>
                </thead>
                <tbody id="EE_data" class = "tbodyblock">
                </tbody>
            </table>
        </div>

    </div>
    <?php include("html/banlic.html"); ?>

    <?php include("html/legendEPI.html"); ?>


    <div id = "legendmin">
        <a href="#" id="bigger"></a>
        <div id = "legendmintext"><b>Legenda</b></div>
    </div>
    <?php include("html/legendPQ.html"); ?>


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
<!--    <div id="mouse-position" class="custom-mouse-position" style="color: red;"></div>-->
 <!--   <span id="status" >STATUS</span> -->

<!--    <div id="map" >   </div>-->
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
