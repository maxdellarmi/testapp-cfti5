<!DOCTYPE html>
<html>
<head>
    <!--sezione mappa OL begin-->
    <script src="/plugins/global/jquery.min.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.0.1/ol.js"></script>
    <script src="/plugins/global/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="/plugins/global/js.cookie.min.js" type="text/javascript"></script>
    <script src="/plugins/global/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
    <script src="/plugins/global/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
    <script src="/plugins/global/jquery.blockui.min.js" type="text/javascript"></script>
    <script src="/plugins/global/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script>
        var markersCoords;  //var globale con i markers che contiene le seguenti info da php json_encode($elementArray, true)
        var pippo;
        $(document).ready(function() {
            console.log("caricamento view=>indexV3LocFull.blade.php");

            var center =[12.6508, 42.5681];

            var markers = [];

            var vectorLayer;
            var map;
            console.log("carico i dati");

            //json_encode($elementiPHPArray, true)

            //DATI CHE ARRIVANO DALLA VIEW
            //markersCoords =  {!!json_encode($alldata,true); !!}; //JSON.parse( pippo); in questo caso si aspettava una stringa qui arriva diretto un array gestibile da jscript

            markersCoords = {{ Illuminate\Support\Js::from($alldata, true ) }};

            $.when(markersCoords).then(function( dummy ) {
                console.log("prima esecuzione  $.when(markersCoords) => ovvero al primo caricamento dei dati dalla view");
                //console.log("prima esecuzione markersCoords=>"+ markersCoords.length );
                //console.log(markersCoords);
                markersCoords.map(function (item, index) {
                    var marker = new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat(item.coordinates)),
                        name: item.name,
                        description: item.description,
                        url: item.url
                    });
                            //scale: 0.7})}));
                            //scale: 0.7})}));
                    //marker.setStyle(new ol.style.Style({image: new ol.style.Icon({
                    //marker.setStyle(new ol.style.Style({image: new ol.style.Icon({

                    //esempio ok //marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11.png', size: [13, 13], scale: 0.7})}));
                    if (item.EEnum===0) {
                        if (item.maxint >= 11) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 10.9 && item.maxint > 9.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 9.9 && item.maxint > 8.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 8.9 && item.maxint > 7.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 7.9 && item.maxint > 6.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 6.9 && item.maxint > 5.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 5.9 && item.maxint > 4.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 4.9 && item.maxint > 3.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 3.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3.png', size: [13, 13], scale: 0.7})}));}
                    } else if (item.EEnum >0 && item.ris>0){
                        if (item.maxint >= 11) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/11EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 10.9 && item.maxint > 9.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/10EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 9.9 && item.maxint > 8.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/9EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 8.9 && item.maxint > 7.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/8EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 7.9 && item.maxint > 6.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/7EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 6.9 && item.maxint > 5.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/6EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 5.9 && item.maxint > 4.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/5EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 4.9 && item.maxint > 3.9) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/4EE.png', size: [13, 13], scale: 0.7})}));}
                        if (item.maxint <= 3.9 ) {marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/3EE.png', size: [13, 13], scale: 0.7})}));}
                    } else {
                        marker.setStyle(new ol.style.Style({image: new ol.style.Icon({ src: 'images/IS/EE.png', size: [13, 13], scale: 0.7})}));
                    }
                    /*marker.setStyle(new ol.style.Style({
                        image: new ol.style.Icon(({
                            color: '#fffb22',
                            src: '/img/dot.png',
                            // the real size of your icon
                            size: [20, 20],
                            // the scale factor
                            scale: 0.5
                        }))
                    }));*/

                    markers.push(marker);
                }) //chiusura  markersCoords.map(function (item, index)
            }).then(  function (x) {
                console.log("seconda esecuzione creazione vectorLayer  markers=>"+ markers.length );
                //console.log(markers);
                vectorLayer = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: markers,
                    })
                });
                //console.log(vectorLayer);
            }).done ( function (x)  {
                console.log("terza esecuzione vectorlayer e OSM");
                //console.log(vectorLayer);
                map = new ol.Map({
                    controls: ol.control.defaults({
                        attributionOptions: ({
                            collapsible: false
                        })
                    }),
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        }), vectorLayer
                    ],
                    target: document.getElementById('map'),
                    view: new ol.View({
                        center: ol.proj.fromLonLat(center),
                        zoom: 6,
                    })
                });

                var element = document.getElementById('popup');
                var popup = new ol.Overlay({
                    element: element,
                    positioning: 'bottom-center',
                    stopEvent: true,
                    offset: [0, -20],
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 250
                    }
                });
                map.addOverlay(popup);

                // display popup on click
                map.on('click', function (evt) {
                    var feature = map.forEachFeatureAtPixel(evt.pixel,
                        function (feature) {
                            return feature;
                        });

                    if (feature) {
                        $(element).popover('destroy')
                        var coordinates = feature.getGeometry().getCoordinates();
                        popup.setPosition(coordinates);
                        $(element).popover({
                            'placement': 'top',
                            'animation': false,
                            'html': true,
                            'trigger': 'manual',
                            'content': '<div style="min-width:200px"><h4>' + feature.get('name') + '</h3>' + '<p>' + feature.get('description') + '</p>' + '<a href="' + feature.get('url') + '" class="details_lang" id="details">Details</a>'
                        });
                        $(element).popover('show');
                    } else {
                        $(element).popover('destroy');
                        popup.setPosition(undefined);
                    }

                });
                // change mouse cursor when over marker
                map.on('pointermove', function (e) {
                    if (e.dragging) {
                        $(element).popover('hide');
                        return;
                    }
                    var pixel = map.getEventPixel(e.originalEvent);
                    var hit = map.hasFeatureAtPixel(pixel);
                    map.getTarget().style.cursor = hit ? 'pointer' : '';
                });

                // /****solo con zoom maggiore o uguale a 7 faccio vedere i punti***/
                // map.on('moveend', function (event) {
                //     console.log(map.getView().getZoom());
                //         if (map.getView().getZoom() >= 7) {
                //             vectorLayer.setVisible(true);
                //         }
                //         else {
                //             vectorLayer.setVisible(false);
                //         }
                // });
            });
        });
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/openlayers/4.0.1/ol.css" type="text/css">


    <style>
        .margins { margin-top: 5px; }
        .margins_bottom { margin-bottom: 0px !important; }
        .fontsize {font-size: 10px; }
        .form-control {

            font-size: 12px !important;
            border: 1px solid #c2cad8 !important;
        }
        .control-label {
            margin-top: 1px;
            font-weight: 400;
            font-size: 12px !important;
        }
        .help-block
        {
            color: red;
            opacity: 100 !important;
            font-weight: 400;
            font-size: 10px !important;
        }
        .width_auto
        {
            width: auto;
        }
        .width_fixed
        {
            width: 65px;
        }
        .has-error
        {
            height: 66px;
        }
        .collapse.in {
            display: block;
            margin-top: 10px;
        }

        .button_search
        {

        }

    </style>


    <!--sezione mappa OL end-->
</head>

<div id="loading" ><br><strong>Loading....</strong></div>

<!--       ==============    WMS-WMF LINKS   - CSW METADATA   =============         -->

<body >




<!--sezione mappa OL begin-->
<div class="col-lg-12">
    <!-- portlet -->
    <div class="portlet light ">
        <div class="portlet-title">
            <div class="caption">
                <i class="fa fa-map"></i>
                <span class="caption-subject bold uppercase" id="geolocalization">Geolocalization</span>
            </div>
        </div>
        <div class="portlet-body">

            <div id="map" style="height: 713px">

            </div>
            <div id="popup"></div>
        </div>
    </div>
    <!-- /portlet -->
</div>
<!--sezione mappa OL end-->


</body>
</html>
