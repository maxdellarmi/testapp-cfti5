// $(document).ready(function () {
var markers = [];

var localityPHPmarkers = [];

var quakesPQMarkers = [];

var popup;
//var EEmarkers = [];

var select1;

var mapOL;

var quakeVector;

var StruMMLayer;

var rasterLayer;

var localityVector;

var EEVector;

var pinpointVector;

var templateStr = 'Lat:{y}, Lon:{x}';

var mousePositionControl;

var buttonCloseSingle = `<button draggable="false" aria-label="Chiudi" title="Chiudi" type="button" class="gm-ui-hover-effect" style="background: none; display: block; border: 0px; margin: 0px; padding: 0px; text-transform: none; appearance: none; position: absolute; cursor: pointer; user-select: none; top: -6px; right: -6px; width: 30px; height: 30px;" onclick="closePopup();"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E" alt=""  style="pointer-events: none; display: block; width: 14px; height: 14px; margin: 8px;"></button>`

var buttonCloseCluster = `<button draggable="false" aria-label="Chiudi" title="Chiudi" type="button" class="gm-ui-hover-effect" style="background: none; display: block; border: 0px; margin: 1px; padding: 0px; text-transform: none; appearance: none; position: absolute; cursor: pointer; user-select: none; top: -6px; right: 10px; width: 30px; height: 30px;" onclick="closePopup();"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%3C/svg%3E" alt=""  style="pointer-events: none; display: block; width: 14px; height: 14px; margin: 8px;"></button>`

var styles = [];
var stamenlayer;
var tonerlayer;
var layers;
var copy;


function prepareControlAddressSearchGeocoding() {
    //Instantiate with some options and add the Control
    var geocoder = new Geocoder('nominatim', {
        //provider: 'osm',
        //lang: 'it',
        provider: 'mapquest',
        key:'IqnooAc16rOxA4pLbaSoMpuKyPmL61wQ',
        lang: 'it',
        placeholder: 'Ricerca (OpenStreetMap)',
        targetType: 'glass-button',
        limit: 15,
        debug: false,
        autoComplete: true,
        keepOpen: true,
        zindex: 50
    });
    if (mapOL!=null && mapOL!= undefined) {
        mapOL.addControl(geocoder);
    }
}

function prepareBASEMAPLayers() {
    // $(document).ready(function() {
    //     try {
            console.log('prepareBASEMAPLayers....');
            styles = [
                'Road',
                'Topo2',
                'Topo1',
                'Black'
            ];

            stamenlayer = new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'terrain'
                }),
                projection: 'EPSG:3857',
                title: 'BASEMAP',
            });

            tonerlayer = new ol.layer.Tile({
                source: new ol.source.Stamen({
                    //layer: 'toner' //ALTO contrasto biancoNero
                    layer: 'toner-lite' // scala di grigi
                }),
                projection: 'EPSG:3857',
                title: 'BASEMAP',
            });

            layers = [
                /***layer 0 openStreet ***/
                new ol.layer.Tile({
                    source: new ol.source.OSM(
                    ),
                    projection: 'EPSG:3857',
                    title: 'BASEMAP',
                }),
                /***layer 1 openTopo ***/
                new ol.layer.Tile({
                    //title: 'OSM',
                    type: 'base',
                    projection: 'EPSG:3857',
                    title: 'BASEMAP',
                    visible: true,
                    source: new ol.source.XYZ({
                        url: '//{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    })
                }),
                /***layer 2 terrain ***/
                stamenlayer,
                /***layer 3 blackWhite ***/
                tonerlayer
            ];

            copy = [];
            copy[0] = '<b>© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</b>';
            copy[2] = '<b>Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a></b>'
            copy[1] = '<b>Map Data: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> Contributor, SRTM | Map View: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a></b>)'
            copy[3] = '<b>© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.</b>';

            var selectLayers = document.getElementById('layer-select');
            //console.log("1:" + selectLayers);
            function onChangeLayerS() {
                console.log('fixing bug popup stayed open... ');
                try {
                var element = document.getElementById('popup');
                $(element).popover('destroy');
                popup.setPosition(undefined);
                } catch (e) {
                    console.error(e, e.stack);
                }

                console.log("onChangeLayerS()");
                var k;
                var style =  document.getElementById('layer-select').value;
                //console.log("2:" + style);
                for (var i = 0, ii = layers.length; i < ii; ++i) {
                    if ( mapOL !== undefined  && mapOL.getLayers() !== undefined && mapOL.getLayers().getArray() !== undefined && mapOL.getLayers().getArray().length > 0) {
                        console.log("styles[i]:"+styles[i]+ "||style:" +style);
                        console.log(styles[i] === style);
                        if ( mapOL.getLayers().getArray()[i]  !== null)
                        {
                            mapOL.getLayers().getArray()[i].setVisible(styles[i] === style);
                        }
                    }
                    //layers[i].setVisible(styles[i] === style);
                    if (styles[i] === style) {k=i}
                }
                // document.getElementById('copyright').innerHTML = copy[k];
            }
            selectLayers.addEventListener('change', onChangeLayerS);
            onChangeLayerS(); //fa sempre 2 click quindi
    //     } catch (e) {
    //         console.error('ERRORE Gestito');
    //         console.log(e, e.stack);
    //     }
    // });
}




function closePopup() {
    $(document.getElementById('popup')).popover('destroy');
    //gestione ogggetto overlay
    if ( popup !== undefined ) {
        popup.setPosition(undefined);
    }
}

function template(string, obj){
    var s = string;
    for(var prop in obj) {
        if (obj[prop] === undefined) {  //se la properties e' vuota toglie il tag
            s = s.replace(new RegExp('{'+ prop +'}','g'), '');
        } else {
            s = s.replace(new RegExp('{'+ prop +'}','g'), obj[prop]);
        }
    }
    return s;
}

/**
 * Crea un rettangolo di selezione sulla mappa
 * EXTENT PROIETTATO WGS84[LONminx, LATminy, LONmaxx, LATmaxy]:6.1249210937499985,43.44379506457301,10.805096875,45.743423637682156

 * @param lat1element SELZIONE TERREMOTI document.getElementById("LatS"); SELEZIONE STRUM document.getElementById("StartLatSTRUM")
 * @param lat2element SELZIONE TERREMOTI document.getElementById("LatN"); SELEZIONE STRUM document.getElementById("StopLatSTRUM")
 * @param lon1element SELZIONE TERREMOTI document.getElementById("LonW"); SELEZIONE STRUM document.getElementById("StartLonSTRUM")
 * @param lon2element SELZIONE TERREMOTI document.getElementById("LonE"); SELEZIONE STRUM document.getElementById("StopLonSTRUM")
 */
function mapOLCreateRectangleSelectionArea(lat1element, lat2element, lon1element, lon2element) {
    try
    {
    // a normal select interaction to handle click
    const select = new ol.interaction.Select();
    mapOL.addInteraction(select);

    const selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
    const dragBox = new ol.interaction.DragBox({
        condition: ol.events.condition.primaryAction, //click tasto sinistro
    });

    mapOL.addInteraction(dragBox);
//removeInteraction rimuove l'oggetto di interazione

    dragBox.on('boxend', function () {
        // features that intersect the box geometry are added to the
        // collection of selected features

        // if the view is not obliquely rotated the box geometry and
        // its extent are equalivalent so intersecting features can
        // be added directly to the collection
        const rotation = mapOL.getView().getRotation();
        const oblique = rotation % (Math.PI / 2) !== 0;
        const candidateFeatures = oblique ? [] : selectedFeatures;
        const extent = dragBox.getGeometry().getExtent();

        var extentWGS84 = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
        console.log("EXTENT AS IS[LONminx, LATminy, LONmaxx, LATmaxy]:" + extent);
        console.log("EXTENT PROIETTATO WGS84[LONminx, LATminy, LONmaxx, LATmaxy]:" + extentWGS84);

        if (extentWGS84!== undefined) {
            //arrotondo a 2 decimali
            var lat1 = Math.round(extentWGS84[1]*100)/100; //43
            var lat2 = Math.round(extentWGS84[3]*100)/100; //46
            var lon1 = Math.round(extentWGS84[0] *100)/100; //6
            var lon2 = Math.round(extentWGS84[2]*100)/100; //11

            console.log('lat1' + lat1)
            console.log('lat2' + lat2)
            console.log('lon1' + lon1)
            console.log('lon2' + lon2)
            //EXTENT PROIETTATO WGS84[LONminx, LATminy, LONmaxx, LATmaxy]:6.1249210937499985,43.44379506457301,10.805096875,45.743423637682156
            //Aggiornamento dei campi del form
            var elem_lat1 = document.getElementById(lat1element);//document.getElementById("LatS");
            elem_lat1.value = lat1;

            var elem_lat2 = document.getElementById(lat2element);//document.getElementById("LatN");
            elem_lat2.value = lat2;

            var elem_lon1 = document.getElementById(lon1element); //document.getElementById("LonW");
            elem_lon1.value = lon1;

            var elem_lon2 = document.getElementById(lon2element);//document.getElementById("LonE");
            elem_lon2.value = lon2;
        }
        //region Gestione selezione LIVE delle feature sul source layer [NON USATA QUI]
        // vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
        //     candidateFeatures.push(feature);
        // });
        // // when the view is obliquely rotated the box extent will
        // // exceed its geometry so both the box and the candidate
        // // feature geometries are rotated around a common anchor
        // // to confirm that, with the box geometry aligned with its
        // // extent, the geometries intersect
        // if (oblique) {
        //     const anchor = [0, 0];
        //     const geometry = dragBox.getGeometry().clone();
        //     geometry.rotate(-rotation, anchor);
        //     const extent = geometry.getExtent();
        //     candidateFeatures.forEach(function (feature) {
        //         const geometry = feature.getGeometry().clone();
        //         geometry.rotate(-rotation, anchor);
        //         if (geometry.intersectsExtent(extent)) {
        //             selectedFeatures.push(feature);
        //         }
        //     });
        // }
        //endregion
    });

// clear selection when drawing a new box and when clicking on the map
    dragBox.on('boxstart', function () {
        selectedFeatures.clear();
    });


/*    const infoBox = document.getElementById('info');
    selectedFeatures.on(['add', 'remove'], function () {
        const names = selectedFeatures.getArray().map(function (feature) {
            return feature.get('name');
        });
        if (names.length > 0) {
            infoBox.innerHTML = names.join(', ');
        } else {
            infoBox.innerHTML = 'No countries selected';
        }
    });*/

} catch (e) {
    console.error(e, e.stack);
}



}

function calculateMousePosition() {
   return  new ol.control.MousePosition({
        coordinateFormat: function(coord) {
            //console.log(coord);
            //console.log(ol.coordinate.format(coord, templateStr, 3).toString());
            return ol.coordinate.format(coord, templateStr, 3);},
       projection: 'EPSG:4326', //projection: 'EPSG:3857', //EPSG:3857 WebMercator mentre la mappa e' cosi il mouseover e' in WGS84 4326
        className: 'custom-mouse-position',
        target: document.getElementById('tdCursor'),
        undefinedHTML: '&nbsp;',
    });
}

/**
 * adattamnento del vecchio 	// ------------------------         LISTENER PER MAP OVERLAYS
 map.addListener('zoom_changed', function() {
 */
function zoomHandlingWMSLAYERSStrum() {
    mapOL.on('moveend', function(e) {
        try {
            console.log("ZOOM CHANGED MOVEEND" + mapOL.getView().getZoom());
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            if (mapOL.getView().getZoom() > 11) {
                document.getElementById('IGM100').disabled = false;
                document.getElementById('TopoIGM100').style.color = "black";
                document.getElementById('FL').disabled = false;
                document.getElementById('FraneLin').style.color = "black";
                document.getElementById('FP').disabled = false;
                document.getElementById('FranePol').style.color = "black";
                document.getElementById('FD').disabled = false;
                document.getElementById('FraneDiff').style.color = "black";
                document.getElementById('DGPV').disabled = false;
                document.getElementById('FraneDGPV').style.color = "black";
                document.getElementById('GEO100').disabled = false;       //aggiunta gestione zoom GEOLOGICA100k
                document.getElementById('Geomap').style.color = "black";  //aggiunta gestione zoom GEOLOGICA100k
            }

            if (mapOL.getView().getZoom() < 12) {
                document.getElementById('IGM100').disabled = true;
                document.getElementById('TopoIGM100').style.color = "#909090";
                document.getElementById('IGM100').checked = false;
                Toggle4 = "on";
                ToggleLayer4();

                document.getElementById('GEO100').disabled = true;  //aggiunta gestione zoom GEOLOGICA100k
                document.getElementById('Geomap').style.color = "#909090"; //aggiunta gestione zoom GEOLOGICA100k
                document.getElementById('GEO100').checked = false; //aggiunta gestione zoom GEOLOGICA100k
                Toggle9 = "on";                                             //aggiunta gestione zoom GEOLOGICA100k
                ToggleLayer9();                                             //aggiunta gestione zoom GEOLOGICA100k

                document.getElementById('FL').disabled = true;
                document.getElementById('FraneLin').style.color = "#909090";
                document.getElementById('FL').checked = false;
                Toggle11a = "on";
                ToggleLayer11a();
                document.getElementById('FP').disabled = true;
                document.getElementById('FranePol').style.color = "#909090";
                document.getElementById('FP').checked = false;
                Toggle11b = "on";
                ToggleLayer11b();
                document.getElementById('FD').disabled = true;
                document.getElementById('FraneDiff').style.color = "#909090";
                document.getElementById('FD').checked = false;
                Toggle11c = "on";
                ToggleLayer11c();
                document.getElementById('DGPV').disabled = true;
                document.getElementById('FraneDGPV').style.color = "#909090";
                document.getElementById('DGPV').checked = false;
                Toggle11d = "on";
                ToggleLayer11d();
            }

            if (mapOL.getView().getZoom() > 13) {
                document.getElementById('IGM25').disabled = false;
                document.getElementById('TopoIGM25').style.color = "black";
            }
            if (mapOL.getView().getZoom() < 14) {
                document.getElementById('IGM25').disabled = true;
                document.getElementById('TopoIGM25').style.color = "#909090";
                document.getElementById('IGM25').checked = false;
                Toggle3 = "on";
                ToggleLayer3()
            }
        }
        catch (e) { console.log(e);}
    });
}

//
// function clusteringObjectWithFirstElementStyle (feature) {
//     console.log("clusteringObjectWithFirstElementStyle");
//     var size = feature.get('features').length;
//     if (size === 1) {
//         return feature.get('features')[0].getStyle();
//     } else if (feature.get('features') !== undefined) {
//         return feature.get('features')[0].getStyle();
//     }
// }

//************************************TODO:GESTIONE DESERIALIZZAZIONE+ GEOJSON***********************************************************//
function clusteringObjectWithFirstElementStyle (feature) {
    console.log("clusteringObjectWithFirstElementStyle");
    var size = feature.get('features').length;
    if (size === 1) {
        // console.log(feature.get('features')[0]);
        // console.log(feature.get('features')[0].values_OnClickTextIT);
        // console.log(feature.get('features')[0].values_.Style);
        return feature.get('features')[0].values_.Style;
    } else if (feature.get('features') !== undefined) {
        // console.log(feature.get('features')[0]);
        // console.log(feature.get('features')[0].values_OnClickTextIT);
        // console.log(feature.get('features')[0].values_.Style);
        feature.get('features')[0].values_.Style;
    }
}
//************************************TODO:GESTIONE DESERIALIZZAZIONE+ GEOJSON***********************************************************//


function visualizzaStruMMSuMappa() {
    $(document).ready(function() {
        try {
            prepareBASEMAPLayers();

            var center = new ol.proj.fromLonLat([12.6508, 42.5681]);
            rasterLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                projection: 'EPSG:3857',
                title: 'BASEMAP'
            });
            console.log('caricati markersSTRUMOLD...');
            console.log(markersSTRUMOLD);

            var source = new ol.source.Vector ({
                features: markersSTRUMOLD,
                projection: 'EPSG:3857'
            });

            /*il criterio di raggruppamento cluster */
            var clusterSource = new ol.source.Cluster({
                distance: 1,
                minDistance: 1,
                source: source,
            });
            StruMMLayer = new ol.layer.Vector({
                source: clusterSource,
                style: clusteringObjectWithFirstElementStyle,
                title: "STRUMM",
            });
            StruMMLayer.setVisible(true);

            if (mapOL === undefined) {
                console.log('mapOL undefined...visualizzaStruMMSuMappa');
                mapOL = new ol.Map({
                    loadTilesWhileInteracting: true,
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                    // layers: [rasterLayer, StruMMLayer],
                    layers: layers, StruMMLayer,
                    target: document.getElementById('mapOL'),
                    view: new ol.View({
                        projection: 'EPSG:3857',
                        center: center,
                        zoom: 6,
                        minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                        maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                    })
                });
            }
            else {
                console.log("ADDING NEW LAYERS");
                //mapOL.addLayer(rasterLayer);
                mapOL.addLayer(StruMMLayer);
            }

            /*
            https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
            setLayers(layers) inherited
            Clear any existing layers and add layers to the map.
            */

            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });

                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    var popupContent = "";
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature);
                    console.log(feature.OnClickTextIT);
                    if ( feature.get('features') !== undefined) {
                        var allpopupContent="";
                        feature.get('features').forEach(function(feature) {
                            if (feature.OnClickTextIT != undefined) {
                                allpopupContent += (feature.OnClickTextIT + '<br>');
                            }
                        });
                        //console.log("TODO4 FEATURE SAME COORDINATES trying to merge all POPOP content:"+ allpopupContent);
                        popupContent = allpopupContent;
                        if (feature.get('features').length ===1) {
                            popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                        }
                        else popupContent = buttonCloseCluster.toString() + " "+ popupContent;
                    }
                    else {
                        console.log(feature);
                        popupContent = feature.OnClickTextIT;
                        //gestione pulsante chiusura X del popup
                        popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    }
                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent// feature.OnClickTextIT;
                    });

                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }
            },);
            // change mouse cursor when over marker
            mapOL.on('pointermove', function (e) {
                if (e.dragging) {
                    // $(element).popover('hide'); element popover non trovato andava in errore
                    return;
                }
                var pixel = mapOL.getEventPixel(e.originalEvent);
                var hit = mapOL.hasFeatureAtPixel(pixel);
                mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
            });

            // change mouse cursor when over marker
            console.log('popover su mapOL.js gestione terremoti commentato perche andava in errore ');
            resizeMapIndex();
            console.log('inizio gestione zoom');

            zoomHandlingWMSLAYERSStrum();

        } catch (e) {
            console.error('ERRORE Gestito');
            console.log(e, e.stack);
        }
    });
}


/***
 * NOTA. Il primo caricamento va sempre a vuoto perche' non sono ancora stati caricati i filtri viene caricato correttamente dopo la funzione showQuakes.
 */
function creazioneMappa () {
    $(document).ready(function() {
        try {
            prepareBASEMAPLayers();
            var center = new ol.proj.fromLonLat([12.6508, 42.5681]);

            rasterLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                projection: 'EPSG:3857',
                title: 'BASEMAP'
            });
            console.log('caricati i terremoti test')
            console.log("carico i markers");
            /***
             * NOTA. Il primo caricamento va sempre a vuoto perche' non sono ancora stati caricati i filtri viene caricato correttamente dopo la funzione showQuakes.
             */
            /**********************oggetti feature contenenti le coordinate****************/

//************************************TODO:GESTIONE DESERIALIZZAZIONE+ GEOJSON***********************************************************//
            var source = new ol.source.Vector ({
                features: new ol.format.GeoJSON().readFeatures(geoJSONArray),
                projection: 'EPSG:3857'
            });
//************************************TODO:GESTIONE DESERIALIZZAZIONE+ GEOJSON***********************************************************//


            /*il criterio di raggruppamento cluster */
            var clusterSource = new ol.source.Cluster({
                distance: 1,
                minDistance: 1,
                source: source,
            });
            quakeVector = new ol.layer.Vector({
                source: clusterSource,
                style: clusteringObjectWithFirstElementStyle, //GLI DA FASTIDIO LA FUNZIONE QUANDO CLICCHI SUL CLUSTER
                //title: 'QUAKES',
            });
            quakeVector.setVisible(true);

           if (mapOL === undefined) {
               console.log('creazioneMappa: mapOL undefined....creazioneMappa')
               mapOL = new ol.Map({
                   loadTilesWhileInteracting: true,
                   //interactions: ol.interaction.defaults().extend([select1]),
                   controls: ol.control.defaults({
                       attributionOptions: ({
                           collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                   //NEL CASO IN CUI NON SI VEDA IL LAYER fare un mapOL.addLayer(quakeVector) successivo e lasciare solo l'assegnazione ai layers di base.
                   layers: layers, quakeVector,
                   target: document.getElementById('mapOL'),
                   view: new ol.View({
                       projection: 'EPSG:3857',
                       center: center,
                       zoom: 6,
                       minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                       maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                   })
               });
           }
           else {
               //TODO: CLEANUP degli altri layers dalle variabili globali
               console.log("CLEANUP DEI LAYERS VARIABILI GLOBALI DICHIARATE");
               //nascondo gli altri layer che non interessano anche se lo fa da solo e' piu veloce
               console.log("CLEANUP inizio pulizia di tutti gli altri layer presenti (tranne raster)");
               console.log("CLEANUP pulizia del layer quakes");
               // quakeVector.setVisible(false);
               (quakeVector!== undefined)? mapOL.removeLayer(quakeVector): null; //meglio rimuovere a mano i layers se rimane reference non li toglie
               console.log("CLEANUP pulizia del layer Localita");
               (localityVector!== undefined)? mapOL.removeLayer(localityVector): null;// console.log("CLEANUP pulizia del layer Raster")
               console.log("CLEANUP pulizia del layer Eventi ambientali");
               (EEVector!== undefined)? mapOL.removeLayer(EEVector): null;    // console.log("CLEANUP pulizia del layer Raster")
               (pinpointVector!== undefined)? mapOL.removeLayer(pinpointVector): null;    // console.log("CLEANUP pulizia del layer pinpointVector")


                   // mapOL.removeLayer(rasterLayer);
               //////////////////////////////////////////
               /***forza la pulizia dei layer vecchi ***/
               //https://stackoverflow.com/questions/40862706/unable-to-remove-all-layers-from-a-map
                //////////////////////////////////////////
               puliziaClearAllMapsLayers();

               console.log("ADDING NEW LAYERS");
               //mapOL.addLayer(rasterLayer);
               mapOL.addLayer(quakeVector);
               (StruMMLayer!== undefined)? mapOL.addLayer(StruMMLayer): null;
           }

            //Instantiate with some options and add the Control
            prepareControlAddressSearchGeocoding();

            /*
            https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
            setLayers(layers) inherited
            Clear any existing layers and add layers to the map.
            */

            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                var featureId;
                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    var popupContent = "";
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature.OnClickTextIT);
                    if ( feature.get('features') !== undefined) {
                        console.log('features cluster trovate...'+feature.get('features').length);
                        //GeoJSON
                        //console.log(feature.get('features')[0].values_.OnClickTextIT);
                        //GeoJSON
                        //console.log(feature.get('features')[0].values_);
                        var allpopupContent="";
                        feature.get('features').forEach(function(feature) {
                            if (feature.OnClickTextIT != undefined) {
                                allpopupContent += (feature.OnClickTextIT + '<br>');
                            }
                            //GeoJSON
                            if (feature.values_.OnClickTextIT != undefined) {
                                allpopupContent += (feature.values_.OnClickTextIT + '<br>');
                            }
                            featureId = feature.getProperties().id;
                        });
                        //console.log("TODO4 FEATURE SAME COORDINATES trying to merge all POPOP content:"+ allpopupContent);
                        popupContent = allpopupContent;
                        //gestione pulsante chiusura X del popup
                        if (feature.get('features').length ===1) {
                            popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                            //geoJSON
                            if ( feature.get('features')[0].values_ != undefined ) {
                                //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                                //console.log(feature.get('features')[0].values_);
                                google.maps.event.trigger(geoJSONArray.features[feature.get('features')[0].values_.id] , 'click');
                            }
                        }
                        else popupContent = buttonCloseCluster.toString() + " "+ popupContent;
                    }
                    else {
                        featureId = feature.getProperties().id;
                        console.log('features singola trovata... '+featureId);
                        popupContent = feature.OnClickTextIT;
                        //GeoJSON
                        if (feature.values_.OnClickTextIT != undefined) {
                            popupContent = feature.values_.OnClickTextIT;
                        }
                        //gestione pulsante chiusura X del popup
                        popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    }
                    console.log(featureId);
                    //console.log(markersArray[featureId]["Marker"]);
                    if ( featureId != undefined && markersArray[featureId] != undefined ) {
                        //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                        google.maps.event.trigger(markersArray[featureId]["Marker"], 'click');
                    }
                    //geoJSON
                    if ( featureId != undefined && geoJSONArray[featureId]!=undefined) {
                        //console.log(feature.get('features')[0].values_);
                        google.maps.event.trigger(geoJSONArray.features[featureId] , 'click');
                    }

                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent // feature.OnClickTextIT;
                    });
                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }
              },);
            // change mouse cursor when over marker
            mapOL.on('pointermove', function (e) {
                if (e.dragging) {
                    // $(element).popover('hide'); element popover non trovato andava in errore
                    return;
                }
                var pixel = mapOL.getEventPixel(e.originalEvent);
                var hit = mapOL.hasFeatureAtPixel(pixel);
                mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
            });

            // change mouse cursor when over marker
            console.log('popover su mapOL.js gestione terremoti commentato perche andava in errore ');
            resizeMapIndex();
            console.log('inizio gestione zoom');
            /***********************************************************/
            zoomHandlingWMSLAYERSStrum();
            /**********************************************************/
        } catch (e) {
            console.error('ERRORE Gestito');
            console.log(e, e.stack);
        }
    });
}

/**
 * C'E UN BUG SULLA PULIZIA DEI LAYER E VA FATTO 2 VOLTE
 * https://stackoverflow.com/questions/40862706/unable-to-remove-all-layers-from-a-map
 */
function puliziaClearAllMapsLayers() {
    //mapOL.getLayers().getArray()[0].getProperties()["title"]
    //create a copy and workin on that
    console.log("CLEANUP DEI LAYERS DAL CLICLO DELLA MAPPA");
    mapOL.getLayers().forEach(function (layer) {
        if (layer !== undefined) {
            console.log(layer.get("title"));
            if ( layer.get("title")!='BASEMAP') { mapOL.removeLayer(layer);}
        }

    });
//for some crazy reason I need to do it twice.
    mapOL.getLayers().forEach(function (layer) {
        if (layer !== undefined) {
            console.log(layer.get("title"));
            if ( layer.get("title")!='BASEMAP') { mapOL.removeLayer(layer);}
        }
    });
}




/**
 * Terremoti quakes di dettaglio caricati: localityPHPmarkers.push(epiMarkers[i]);
 * Pinpoint della location: localityPHPmarkers.push(markerLOC);
 * vengono quindi inseriti tutti quanti su un unico array e visualizzati su mappa.
 * Alla fine la mappa zomma e si posiziona in automatico nel range delle coordinate recuperando l'extent dal source del vectorLayer
 *
 * all'interno delle feature ci sono oggetti con tipo
 * type: "pinpoint", oppure type: "quakes" per rendere piu facile la ricerca successiva
 *
 * mapOL.getView().fit(  quakeVector.getSource().getExtent(), mapOL.getSize());
 * mapOL.getView().setZoom(9);
 *
 * @param quakes
 */
    function creazioneMappaLocalityPHP (quakes) {
    $(document).ready(function() {
        try {
            prepareBASEMAPLayers();
            // do some crazy stuff
            var center = new ol.proj.fromLonLat([12.6508, 42.5681]);

            rasterLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                projection: 'EPSG:3857',
                title: 'BASEMAP'
            });
            console.log('caricamento dei terremoti in input quakes:');
            console.log(quakes);

            /*****ricerca il pinpoint per aggiungerlo separatamente tra i layers *****/
            var pinpoint= [];
            var result = localityPHPmarkers.filter(obj => {
                //if (obj.values_.type== "pinpoint" || obj.values_.type== "area" ) { pinpoint.push(obj); }
                if (obj.values_.type== "pinpoint" ) { pinpoint.push(obj); }
              })

            pinpointVector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: pinpoint,
                    projection: 'EPSG:3857'
                }),
                title: 'PINPOINT'
            });
            pinpointVector.setVisible(true);


            var source = new ol.source.Vector ({
                features: quakes,
                projection: 'EPSG:3857'
            });

            /*il criterio di raggruppamento cluster */
            var clusterSource = new ol.source.Cluster({
                distance: 1,
                minDistance: 1,
                source: source,
            });

            quakeVector = new ol.layer.Vector({
                source: clusterSource,
                style: clusteringObjectWithFirstElementStyle,
                title: 'QUAKES'
            });

            if (mapOL === undefined) {
                console.log('creazioneMappa: mapOL undefined....creazioneMappaLocalityPHP');
                mapOL = new ol.Map({
                    loadTilesWhileInteracting: true,
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                    // layers: [rasterLayer, pinpoint, quakeVector  ],
                    layers: layers, pinpoint, quakeVector,
                    target: document.getElementById('mapOL'),
                    view: new ol.View({
                        projection: 'EPSG:3857',
                        center: center,
                        zoom: 6,
                        minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                        maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                    })
                });
            }
            else {
                //TODO: CLEANUP degli altri layers dalle variabili globali
                console.log("CLEANUP DEI LAYERS VARIABILI GLOBALI DICHIARATE");
                //nascondo gli altri layer che non interessano anche se lo fa da solo e' piu veloce
                console.log("CLEANUP inizio pulizia di tutti gli altri layer presenti (tranne raster)");
                console.log("CLEANUP pulizia del layer Quakes");
                // quakeVector.setVisible(false);
                (quakeVector!== undefined)? mapOL.removeLayer(quakeVector): null; //meglio rimuovere a mano i layers se rimane reference non li toglie
                console.log("CLEANUP pulizia del layer Localita");
                (localityVector!== undefined)? mapOL.removeLayer(localityVector): null;// console.log("CLEANUP pulizia del layer Raster")
                console.log("CLEANUP pulizia del layer Eventi ambientali");
                (EEVector!== undefined)? mapOL.removeLayer(EEVector): null;    // console.log("CLEANUP pulizia del layer Raster")
                // mapOL.removeLayer(rasterLayer);
                //////////////////////////////////////////
                /***forza la pulizia dei layer vecchi ***/
                //////////////////////////////////////////
                puliziaClearAllMapsLayers();
                console.log("ADDING NEW LAYERS");
                //mapOL.addLayer(rasterLayer);
                mapOL.addLayer(pinpointVector);
                mapOL.addLayer(quakeVector);
                (StruMMLayer!== undefined)? mapOL.addLayer(StruMMLayer): null;


                // mapOL.addLayer(clusters); /***************test*****/
            }

            /*
            https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
            setLayers(layers) inherited
            Clear any existing layers and add layers to the map.
            */

            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                var featureId;
                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    var popupContent = "";
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature.OnClickTextIT);
                    if ( feature.get('features') !== undefined) {
                        var allpopupContent="";
                        feature.get('features').forEach(function(feature) {
                            if (feature.OnClickTextIT != undefined) {
                                allpopupContent += (feature.OnClickTextIT + '<br>');
                            }
                            featureId = feature.getProperties().id;
                        });
                        //console.log("TODO4 FEATURE SAME COORDINATES trying to merge all POPOP content:"+ allpopupContent);
                        popupContent = allpopupContent;
                        if (feature.get('features').length ===1) {
                            popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                        }
                        else popupContent = buttonCloseCluster.toString() + " "+ popupContent;
                    }
                    else {
                        featureId = feature.getProperties().id;
                        popupContent = feature.OnClickTextIT;
                        //gestione pulsante chiusura X del popup
                        popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    }
                    if ( featureId != undefined && localityPHPmarkers[featureId] != undefined ) {
                        //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                        google.maps.event.trigger(localityPHPmarkers[featureId], 'click');
                    }

                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent // feature.OnClickTextIT;
                    });
                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }
              },);
            // change mouse cursor when over marker
            mapOL.on('pointermove', function (e) {
                if (e.dragging) {
                    // $(element).popover('hide'); element popover non trovato andava in errore
                    return;
                }
                var pixel = mapOL.getEventPixel(e.originalEvent);
                var hit = mapOL.hasFeatureAtPixel(pixel);
                mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
            });

            ///TODO AUTOPOSIZIONAMENTO AL CARICAMENTO DEL LAYER
            // mapOL.getView().fit(  quakeVector.getSource().getExtent(), mapOL.getSize()); //versione senza padding
            window.setTimeout(function() {
                console.log('mapOL.getView().fit e zooming');
                try {
                    var padding = [500, 50, 500, 50]
                    mapOL.getView().fit(
                        pinpointVector.getSource().getExtent(),
                        {
                            size: mapOL.getSize(),
                            padding: padding,
                        }
                    );
                    mapOL.getView().setZoom(8);
                }
                catch (e) {
                    console.error('ERRORE Gestito');
                    console.log(e, e.stack);
                }
            }, 500);
             //si aggiunge zoom per essere sicuro di visualizzare la porzione necessaria di mappa
        } catch (e) {
            console.log("ERR gestito");
            console.log(e, e.stack);
        }
        //Instantiate with some options and add the Control
        prepareControlAddressSearchGeocoding();
    });
}

function creazioneMappaQuakesPHP (quakes) {
    console.log("creazioneMappaQuakesPHP - quakesPQMarkers");
    //console.log(quakes);
    $(document).ready(function() {
        try {
            prepareBASEMAPLayers();

            //default center
            var center = new ol.proj.fromLonLat([12.6508, 42.5681]);

            console.log('caricamento dei terremoti in input quakes:');
            console.log(quakes);

            quakeVector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: quakes,
                    projection: 'EPSG:3857'
                })
            });
            quakeVector.setVisible(true);

            if (mapOL === undefined) {
                console.log('creazioneMappa: mapOL undefined....creazioneMappaQuakesPHP');
                mapOL = new ol.Map({
                    loadTilesWhileInteracting: true,
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                    // layers: [rasterLayer, quakeVector],
                    layers: layers,
                    target: document.getElementById('mapOL'),
                    view: new ol.View({
                        projection: 'EPSG:3857',
                        center: center,
                        zoom: 6,
                        minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                        maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                    })
                });
                console.log('quake vector aggiunto in fase di inizializzazione');
                mapOL.addLayer(quakeVector);
            }
            else {
                //TODO: CLEANUP degli altri layers dalle variabili globali
                console.log("CLEANUP DEI LAYERS VARIABILI GLOBALI DICHIARATE");
                //nascondo gli altri layer che non interessano anche se lo fa da solo e' piu veloce
                console.log("CLEANUP inizio pulizia di tutti gli altri layer presenti (tranne raster)");
                console.log("CLEANUP pulizia del layer Quakes");
                // quakeVector.setVisible(false);
                (quakeVector!== undefined)? mapOL.removeLayer(quakeVector): null; //meglio rimuovere a mano i layers se rimane reference non li toglie
                console.log("CLEANUP pulizia del layer Localita");
                (localityVector!== undefined)? mapOL.removeLayer(localityVector): null;// console.log("CLEANUP pulizia del layer Raster")
                console.log("CLEANUP pulizia del layer Eventi ambientali");
                (EEVector!== undefined)? mapOL.removeLayer(EEVector): null;    // console.log("CLEANUP pulizia del layer Raster")
                (pinpointVector!== undefined)? mapOL.removeLayer(pinpointVector): null;    // console.log("CLEANUP pulizia del layer pinpointVector")
                // mapOL.removeLayer(rasterLayer);
                //////////////////////////////////////////
                /***forza la pulizia dei layer vecchi ***/
                //////////////////////////////////////////
                puliziaClearAllMapsLayers();
                console.log("ADDING NEW LAYERS");
                //mapOL.addLayer(rasterLayer);
                console.log('quake vector aggiunto in fase di reload');
                mapOL.addLayer(quakeVector);
                (StruMMLayer!== undefined)? mapOL.addLayer(StruMMLayer): null;
            }
            //Instantiate with some options and add the Control
            prepareControlAddressSearchGeocoding();

            /*
            https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
            setLayers(layers) inherited
            Clear any existing layers and add layers to the map.
            */

            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                var featureId;
                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature.OnClickTextIT);
                    var popupContent = feature.OnClickTextIT;
                    featureId = feature.getProperties().id;
                    if ( featureId != undefined && quakesPQMarkers[featureId] != undefined ) {
                        //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                        google.maps.event.trigger(quakesPQMarkers[featureId], 'click');
                    }
                    //gestione pulsante chiusura X del popup
                    popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent // feature.OnClickTextIT;
                    });
                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }

            });
            // change mouse cursor when over marker
            mapOL.on('pointermove', function (e) {
                if (e.dragging) {
                    // $(element).popover('hide'); element popover non trovato andava in errore
                    return;
                }
                var pixel = mapOL.getEventPixel(e.originalEvent);
                var hit = mapOL.hasFeatureAtPixel(pixel);
                mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
            });

            ///TODO AUTOPOSIZIONAMENTO AL CARICAMENTO DEL LAYER
            // mapOL.getView().fit(  quakeVector.getSource().getExtent(), mapOL.getSize()); //versione senza padding
            var padding = [500, 50, 500, 50]
            mapOL.getView().fit(
                quakeVector.getSource().getExtent(),
                {
                    size: mapOL.getSize(),
                    padding: padding,
                }
            );
        } catch (e) {
            console.error(e, e.stack);
        }

    });
}


function indexLocalita () {
    $(document).ready(function() {
        try {
           var center = new ol.proj.fromLonLat([12.6508, 42.5681]);
            console.log(center);
            prepareBASEMAPLayers();
            console.log("carico i dati");
            console.log("LOC Markers" + LOCMarkers.length); //inizializzato nel js index_loc.js
            //console.log(LOCMarkers);

            localityVector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: LOCMarkers,
                    projection: 'EPSG:3857'
                })
            });
            localityVector.setVisible(true);

            console.log("localityVector");
            console.log(localityVector);

            rasterLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                projection: 'EPSG:3857',
                title: 'BASEMAP'
            });


            if (mapOL === undefined) {
                console.log('creazioneMappa: mapOL undefined....indexLocalita');
                mapOL = new ol.Map({
                    loadTilesWhileInteracting: true,
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                    // layers: [rasterLayer, localityVector],
                    layers: layers, localityVector,
                    target: document.getElementById('mapOL'),
                    view: new ol.View({
                        projection: 'EPSG:3857',
                        center: center,
                        zoom: 6,
                        minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                        maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                    })
                });
            }
            else {
                //TODO: CLEANUP degli altri layers dalle variabili globali
                console.log("CLEANUP DEI LAYERS VARIABILI GLOBALI DICHIARATE");
                //nascondo gli altri layer che non interessano anche se lo fa da solo e' piu veloce
                console.log("CLEANUP inizio pulizia di tutti gli altri layer presenti (tranne raster)");
                console.log("CLEANUP pulizia del layer Quakes");
                    // quakeVector.setVisible(false);
                (quakeVector!== undefined)? mapOL.removeLayer(quakeVector): null; //meglio rimuovere a mano i layers se rimane reference non li toglie
                console.log("CLEANUP pulizia del layer Eventi ambientali");
                (EEVector!== undefined)? mapOL.removeLayer(EEVector): null;    // console.log("CLEANUP pulizia del layer Raster")
                (pinpointVector!== undefined)? mapOL.removeLayer(pinpointVector): null;    // console.log("CLEANUP pulizia del layer pinpointVector")
                    // mapOL.removeLayer(rasterLayer);
                ////////////////////////////////////////////////////////////////////////
                /***forza la pulizia dei layer vecchi anche se stesso vecchia versione***/
                ////////////////////////////////////////////////////////////////////////
                puliziaClearAllMapsLayers();
                console.log("ADDING NEW LAYERS");
                //mapOL.addLayer(rasterLayer);
                mapOL.addLayer(localityVector);
                (StruMMLayer!== undefined)? mapOL.addLayer(StruMMLayer): null;
            }



            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                var featureId;
                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature.OnClickTextIT);
                    var popupContent = feature.OnClickTextIT;
                    featureId = feature.getProperties().id;
                    if ( featureId != undefined && LOCMarkers[featureId] != undefined ) {
                        //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                        google.maps.event.trigger(LOCMarkers[featureId], 'click');
                    }
                    //gestione pulsante chiusura X del popup
                    popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent // feature.OnClickTextIT;
                    });
                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }

            });
                // change mouse cursor when over marker
                mapOL.on('pointermove', function (e) {
                    if (e.dragging) {
                       // $(element).popover('hide'); element popover non trovato andava in errore
                        return;
                    }
                    var pixel = mapOL.getEventPixel(e.originalEvent);
                    var hit = mapOL.hasFeatureAtPixel(pixel);
                    mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
                });

                /****solo con zoom maggiore o uguale a 8 faccio vedere i punti***/
                /*
                 Attualmente commentato
                 mapOL.on('moveend', function (event) {
                     console.log(mapOL.getView().getZoom());
                         if (mapOL.getView().getZoom() >= 7) {
                             localityVector.setVisible(true);
                         }
                         else {
                             localityVector.setVisible(false);
                         }
                 });*/
        } catch (e) {
            console.error(e, e.stack);
        }
        //Instantiate with some options and add the Control
        prepareControlAddressSearchGeocoding();
    });

}

function indexEEAmbiente() {
    $(document).ready(function() {
        try {
           var center = new ol.proj.fromLonLat([12.6508, 42.5681]);
            prepareBASEMAPLayers();
            console.log(center);

            console.log("carico i dati");
            console.log("EE ambiente:" + EEmarkersArray.length);

            for (var i = 0; i < EEmarkersArray.length; i++) { //inizializzato nel js index_EE.js
                EEmarkers.push(EEmarkersArray[i]['Marker']);  //inizializzato nel js index_EE.js
            }
            console.log("carico i markers EE ambiente");
            console.log(EEmarkers);

            EEVector = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: EEmarkers,
                    projection: 'EPSG:3857'
                })
            });
            EEVector.setVisible(true);

            console.log("EEVector");
            console.log(EEVector);

            rasterLayer = new ol.layer.Tile({
                source: new ol.source.OSM(),
                projection: 'EPSG:3857',
                title: 'BASEMAP'
            });


            if (mapOL === undefined) {
                console.log('creazioneMappa: mapOL undefined.... indexEEAmbiente');
                mapOL = new ol.Map({
                    loadTilesWhileInteracting: true,
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false})}).extend([calculateMousePosition()]).extend([new ol.control.FullScreen()]),
                    // layers: [rasterLayer, EEVector],
                    layers: layers, EEVector,
                    target: document.getElementById('mapOL'),
                    view: new ol.View({
                        projection: 'EPSG:3857',
                        center: center,
                        zoom: 6,
                        minZoom: 3.777,  //introduzione limiti zoom come da produzione bug fixed 08052022
                        maxZoom: 14.807  //introduzione limiti zoom come da produzione bug fixed 08052022
                    })
                });
            }
            else {
                //TODO: CLEANUP degli altri layers dalle variabili globali
                console.log("CLEANUP DEI LAYERS VARIABILI GLOBALI DICHIARATE");
                //nascondo gli altri layer che non interessano anche se lo fa da solo e' piu veloce
                // if (quakeVector!== undefined) {
                console.log("CLEANUP inizio pulizia di tutti gli altri layer presenti (tranne raster)");
                console.log("CLEANUP pulizia del layer Quakes");
                // quakeVector.setVisible(false);
                (quakeVector!== undefined)? mapOL.removeLayer(quakeVector): null; //meglio rimuovere a mano i layers se rimane reference non li toglie
                console.log("CLEANUP pulizia del layer Locality");
                (localityVector!== undefined)? mapOL.removeLayer(localityVector): null;
                (pinpointVector!== undefined)? mapOL.removeLayer(pinpointVector): null;    // console.log("CLEANUP pulizia del layer pinpointVector")
                // console.log("CLEANUP pulizia del layer Raster")
                // mapOL.removeLayer(rasterLayer);
                // }
                ////////////////////////////////////////////////////////////////////////
                /***forza la pulizia dei layer vecchi anche se stesso vecchia versione***/
                ////////////////////////////////////////////////////////////////////////
                puliziaClearAllMapsLayers();
                console.log("ADDING NEW LAYERS");
                // mapOL.addLayer(rasterLayer);
                mapOL.addLayer(EEVector);
                (StruMMLayer!== undefined)? mapOL.addLayer(StruMMLayer): null;
            }


            var element = document.getElementById('popup');
            /************************************************/
            ///////OVERLAY DICHIARATA COME VARIABILE GLOBALE/////
            /***************************************************/
            popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: true,
                offset: [0, -20],
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            mapOL.addOverlay(popup);

            // display popup on click
            mapOL.on('click', function (evt) {
                console.log('mapOL click');
                var feature = mapOL.forEachFeatureAtPixel(evt.pixel,
                    function (feature) {
                        return feature;
                    });
                var featureId;
                if (feature) {
                    $(element).popover('destroy')
                    var coordinates = feature.getGeometry().getCoordinates();
                    console.log("FEATURE ONCLICK popup data:")
                    console.log(feature.ContentPopupText);
                    var popupContent = feature.ContentPopupText;
                    featureId = feature.getProperties().id;
                    //gestione pulsante chiusura X del popup

                    if ( featureId != undefined && EEmarkersArray[featureId] != undefined ) {
                        //evento click sull'elemento selezionato per evidenziare sulla tabella di sinistra
                        google.maps.event.trigger(EEmarkersArray[featureId]['Marker'], 'click');
                    }

                    popupContent = buttonCloseSingle.toString() + " "+ popupContent;
                    popup.setPosition(coordinates);
                    $(element).popover({
                        'placement': 'top',
                        'animation': false,
                        'html': true,
                        'trigger': 'manual',
                        'content': popupContent // feature.OnClickTextIT;
                    });
                    //bugfix 10052022 per i popup vuoti.
                    if ($(element).data('bs.popover').options.content.includes("<div") === true) {
                        $(element).popover('show');
                    }
                } else {
                    $(element).popover('destroy');
                    popup.setPosition(undefined);
                }

            });
            // change mouse cursor when over marker
            mapOL.on('pointermove', function (e) {
                if (e.dragging) {
                    // $(element).popover('hide'); element popover non trovato andava in errore
                    return;
                }
                var pixel = mapOL.getEventPixel(e.originalEvent);
                var hit = mapOL.hasFeatureAtPixel(pixel);
                mapOL.getTarget().style.cursor = hit ? 'pointer' : '';
            });

        } catch (e) {
            console.error(e, e.stack);
        }
        //Instantiate with some options and add the Control
        prepareControlAddressSearchGeocoding();
    });


}
