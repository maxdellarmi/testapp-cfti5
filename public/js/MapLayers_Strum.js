var Toggle0 = "off";
var Toggle1 = "off";
var Toggle2 = "off";
var Toggle3 = "off";
var Toggle4 = "off";
var Toggle5 = "off";
var Toggle6 = "off";
var Toggle7 = "off";
var Toggle8 = "off";
var Toggle9 = "off";
var Toggle10 = "off";
var Toggle11a = "off";
var Toggle11b = "off";
var Toggle11c = "off";
var Toggle11d = "off";
var Toggle12 = "off";

//chiamata vecchia:  http://services.seismofaults.eu/geoserver/CFTI/ows?
// SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=Com01012019_WGS84&TRANSPARENT=TRUE&FORMAT=image/gif
// &BBOX=11.25,35.979898069620134,22.5,48.922499263758255

// la chiamata NEW si autotraduce da sola cosi:
//https://services.seismofaults.eu/geoserver/CFTI/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&
// LAYERS=Com01012019_WGS84&BOX=11.25%2C35.979898069620134%2C22.5%2C48.922499263758255&TILED=true&WIDTH=230&HEIGHT=230&CRS=EPSG%3A4326
// &STYLES=&FORMAT_OPTIONS=dpi%3A81&BBOX=45%2C22.5%2C67.5%2C45

var COM =  new ol.layer.Tile({
    opacity: 0.4,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://services.seismofaults.eu/geoserver/CFTI/ows',
        params: {
            'LAYERS': 'Com01012019_WGS84',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});


// var COM = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//
//                        var urlWMS = "http://services.seismofaults.eu:80/geoserver/CFTI/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=Com01012019_WGS84&TRANSPARENT=TRUE&FORMAT=image/gif&"
//
//                        urlWMS += "BBOX=" + bbox;      // set bounding box
//
//                        console
//                        console.log(urlWMS);
//
//                         return urlWMS;                // return URL for the tile
//
//
//
//                    },
//                    tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 1,
// 					// maxZoom: 16,
// 					opacity: 0.4,
//  });

var PROV =  new ol.layer.Tile({
    opacity: 0.6,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://services.seismofaults.eu/geoserver/CFTI/ows',
        params: {
            'LAYERS': 'ProvCM01012019_WGS84',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});


//<editor-fold defaultstate="expanded" desc="LAYER PROVINCE ISTAT ProvCM01012019_WGS84 vecchia gestione gmaps">
//  var PROV = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//
//                        var urlWMS = "http://services.seismofaults.eu:80/geoserver/CFTI/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=ProvCM01012019_WGS84&TRANSPARENT=TRUE&FORMAT=image/gif&"
//
//                        urlWMS += "BBOX=" + bbox;      // set bounding box
//
//                         return urlWMS;                // return URL for the tile
//
//
//
//                    },
//                    tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 1,
// 					// maxZoom: 16,
// 					opacity: 0.6,
//  });
//</editor-fold>


var REG =  new ol.layer.Tile({
    opacity: 0.8,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://services.seismofaults.eu/geoserver/CFTI/ows',
        params: {
            'LAYERS': 'Reg01012019_WGS84',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});


//<editor-fold defaultstate="expanded" desc="LAYER REGIONI ISTAT Reg01012019_WGS84 vecchia gestione gmaps">
//  var REG = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//
//                        var urlWMS = "http://services.seismofaults.eu:80/geoserver/CFTI/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=Reg01012019_WGS84&TRANSPARENT=TRUE&FORMAT=image/gif&"
//
//                        urlWMS += "BBOX=" + bbox;      // set bounding box
//
//                         return urlWMS;                // return URL for the tile
//
//
//
//                    },
//                    tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 1,
// 					// maxZoom: 16,
// 					opacity: 0.8,
//  });
//</editor-fold>

var IGM25  = new ol.layer.Tile({
    opacity: 0.9,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_25000.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'CB.IGM25000.32,CB.IGM25000.33',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});
//<editor-fold defaultstate="expanded" desc="LAYER IMG25 vecchia gestione gmaps">
// var IGM25 = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//                         var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_25000.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=CB.IGM25000.32,CB.IGM25000.33&STYLES=default,default&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//                 });
//</editor-fold>

//http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_100000.map
var IGM100  = new ol.layer.Tile({
    opacity: 0.9,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_100000.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'MB.IGM100000.33,MB.IGM100000.32',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});
//<editor-fold defaultstate="expanded" desc="LAYER IMG100 vecchia gestione gmaps">
// var IGM100 = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//                        var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_100000.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=MB.IGM100000.33,MB.IGM100000.32&STYLES=default,default&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//                 });
//</editor-fold>


var IGM200  = new ol.layer.Tile({
    opacity: 0.9,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_250000.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'CB.IGM250000.33,CB.IGM250000.32',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});

//<editor-fold defaultstate="expanded" desc="LAYER IGM200 vecchia gestione gmaps">
// var IGM200 = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
// 						var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/IGM_250000.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=CB.IGM250000.33,CB.IGM250000.32&STYLES=default,default&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//                 });
//</editor-fold>

var DISS_ISS = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://diss.rm.ingv.it/dissGM/kml321/ISS.kml',//'http://cft5.test/KML/ISS.kml', //http://cft5.test/KML/ISS.kml
        format: new ol.format.KML(),
    }),
});
/*
non so se openlayer supporta questo
<kml xmlns="http://earth.google.com/kml/2.1">
  <NetworkLink>
    <Link>
      <href>http://diss.rm.ingv.it/dissGM/kml321/ISS.kml</href>
      <refreshMode>onInterval</refreshMode>
      <refreshInterval> 3600 </refreshInterval>
    </Link>
  </NetworkLink>
</kml>
http://diss.rm.ingv.it/dissGM/kml321/ISS.kml
 */

// var DISS_ISS = new google.maps.KmlLayer('http://storing.ingv.it/cfti/cfti5/KML/ISS.kml', {preserveViewport:true} ) ;


//http://diss.rm.ingv.it/dissGM/kml321/CSS.kml
//var DISS_CSS = new google.maps.KmlLayer('http://storing.ingv.it/cfti/cfti5/KML/CSS.kml', {preserveViewport:true} ) ;

var DISS_CSS = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://diss.rm.ingv.it/dissGM/kml321/CSS.kml',
        format: new ol.format.KML(),
    }),
});


//http://diss.rm.ingv.it/dissGM/kml321/SUBD.kml
// var DISS_SUBD = new google.maps.KmlLayer('http://storing.ingv.it/cfti/cfti5/KML/SUBD.kml', {preserveViewport:true} ) ;

var DISS_SUBD = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'http://diss.rm.ingv.it/dissGM/kml321/SUBD.kml',
        format: new ol.format.KML(),
    }),
});



// var CUSTOM_LAYER = new google.maps.KmlLayer('http://www.cftilab.it/file_repository/EE_Cedit_fino1997.kmz', {preserveViewport:true} ) ;
// 'http://www.cftilab.it/file_repository/Surfacerupturesofthe2009LAq.kmz'


/**************CONTINUA DA QUI *************************/

var GEO50 = new google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {

                        var proj = map.getProjection();
                        var zfactor = Math.pow(2, zoom);
                        // get Long Lat coordinates
                        var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
                        var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));

                        //corrections for the slight shift of the WMS LAYER
                        var deltaX = 0.000;
                        var deltaY = 0.0000;

                        //create the Bounding box string
                        var bbox =     (top.lng() + deltaX) + "," +
    	                               (bot.lat() + deltaY) + "," +
    	                               (bot.lng() + deltaX) + "," +
    	                               (top.lat() + deltaY);

                        //base WMS URL

                        //var urlWMS = "http://sgi1.isprambiente.it/arcgis/services/servizi/geologia25k/MapServer/WMSServer?";
						var urlWMS = "http://geoservices.isprambiente.it/arcgis/services/Geologia/geologia_italia_50k/ImageServer/WMSServer?";
                        urlWMS += "&VERSION=1.1.1";  //WMS version
					    urlWMS += "&REQUEST=GetMap"; //WMS operation
						urlWMS += "&SRS=EPSG:4326";     //set WGS84
						urlWMS += "&WIDTH=512";         //tile size in google
                        urlWMS += "&HEIGHT=512";
						//urlWMS += "&LAYERS=" + "0,1,2,3,4"; //WMS layers
						urlWMS += "&LAYERS=" + "geologia_italia_50k"; //WMS layers
						urlWMS += "&STYLES=default";   //,default,default,default,default";
                        urlWMS += "&TRANSPARENT=false";
					    urlWMS += "&OPACITY=0.1";
                        urlWMS += "&FORMAT=image/png" ; //WMS format



                        urlWMS += "&BBOX=" + bbox;      // set bounding box

                         return urlWMS;                // return URL for the tile



                    },
                    tileSize: new google.maps.Size(512, 512),
					// minZoom: 14,
					// maxZoom: 16,
					opacity: 0.9,

                });


/***
 * * LISTA SERVIZI Portale del Servizio Geologico d'Italia ISPRA
 * http://portalesgi.isprambiente.it/it/lista-servizi-wms/Geological%20Maps
 * QUESTE CHIAMATE IN PRODUZIONE FALLISCONO:http://geoservices.isprambiente.it/arcgis/services/Geologia/geologia_italia_100k/ImageServer/WMSServer', //OLD le chiamate falliscono
 *
 */
var GEO100  = new ol.layer.Tile({
    opacity: 0.9,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        //url: 'http://geoservices.isprambiente.it/arcgis/services/Geologia/geologia_italia_100k/ImageServer/WMSServer', //OLD le chiamate falliscono
        //url : 'http://sgi2.isprambiente.it/arcgis/services/raster/geo_500k_italia/ImageServer/WMSServer', NEW funziona ma 500K
        url : 'http://sgi2.isprambiente.it/arcgis/services/servizi/carta_geologica_100k/MapServer/WmsServer', //NEW preso dal sito
        //projection: 'EPSG:3857',
        params: {
            //'LAYERS': 'geologia_italia_100k', OLD
            //'LAYERS': 'geo_500k_italia', // new funziona ma 500
            'LAYERS': '1',  // LAYERS 1,2,3,4,5,6 // IL LAYER 0 contiene solamente una suddivisione in riquadri
            'TILED': true
        },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});

//<editor-fold defaultstate="expanded" desc="LAYER GEO100 vecchia gestione gmaps">
// var GEO100 = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
//                         var urlWMS = "http://geoservices.isprambiente.it/arcgis/services/Geologia/geologia_italia_100k/ImageServer/WMSServer?";
//                         urlWMS += "&VERSION=1.1.1";  //WMS version
// 					    urlWMS += "&REQUEST=GetMap"; //WMS operation
// 						urlWMS += "&SRS=EPSG:4326";     //set WGS84
// 						urlWMS += "&WIDTH=512";         //tile size in google
//                         urlWMS += "&HEIGHT=512";
// 						urlWMS += "&LAYERS=" + "geologia_italia_100k"; //WMS layers
// 						urlWMS += "&STYLES=default";   //,default,default,default,default";
//                         urlWMS += "&TRANSPARENT=false";
// 					    urlWMS += "&OPACITY=0.1";
//                         urlWMS += "&FORMAT=image/png" ; //WMS format
//
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//                 });
//</editor-fold>

var GEOSTR500 = new google.maps.ImageMapType({
                    getTileUrl: function (coord, zoom) {
                        var proj = map.getProjection();
                        var zfactor = Math.pow(2, zoom);
                        // get Long Lat coordinates
                        var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
                        var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));

                        //corrections for the slight shift of the WMS LAYER
                        var deltaX = 0.000;
                        var deltaY = 0.0000;

                        //create the Bounding box string
                        var bbox =     (top.lng() + deltaX) + "," +
    	                               (bot.lat() + deltaY) + "," +
    	                               (bot.lng() + deltaX) + "," +
    	                               (top.lat() + deltaY);

                        //base WMS URL

                        var urlWMS = "http://geoservices.isprambiente.it/arcgis/services/Geologia/strutturale_italia_500k/ImageServer/WMSServer?";
                        urlWMS += "&VERSION=1.1.1";  //WMS version
					    urlWMS += "&REQUEST=GetMap"; //WMS operation
						urlWMS += "&SRS=EPSG:4326";     //set WGS84
						urlWMS += "&WIDTH=512";         //tile size in google
                        urlWMS += "&HEIGHT=512";
						urlWMS += "&LAYERS=" + "strutturale_italia_500k"; //WMS layers
						urlWMS += "&STYLES=default";   //,default,default,default,default";
                        urlWMS += "&TRANSPARENT=false";
					    urlWMS += "&OPACITY=0.1";
                        urlWMS += "&FORMAT=image/png" ; //WMS format



                        urlWMS += "&BBOX=" + bbox;      // set bounding box

                         return urlWMS;                // return URL for the tile



                    },
                    tileSize: new google.maps.Size(512, 512),
					// minZoom: 14,
					// maxZoom: 16,
					opacity: 0.9,

                });



var FL  = new ol.layer.Tile({
    opacity: 0.4,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'RN.CATALOGO_FRANE.LINEARI',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});
//<editor-fold defaultstate="expanded" desc="LAYER FL vecchia gestione gmaps">
//  var FL = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
// 						var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RN.CATALOGO_FRANE.LINEARI&GN:Predefinito&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//
//  });
//</editor-fold>


var FP  = new ol.layer.Tile({
    opacity: 0.4,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'RN.CATALOGO_FRANE.POLIGONALI',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});
//<editor-fold defaultstate="expanded" desc="LAYER FP vecchia gestione gmaps">
//   var FP = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
// 						var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RN.CATALOGO_FRANE.POLIGONALI&GN:Predefinito&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//
//  });
//</editor-fold>


var FD  = new ol.layer.Tile({
    opacity: 0.4,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'RN.CATALOGO_FRANE.AREE.FRANE.DIFFUSE',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});

//<editor-fold defaultstate="expanded" desc="LAYER FD vecchia gestione gmaps">
//    var FD = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
// 						var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RN.CATALOGO_FRANE.AREE.FRANE.DIFFUSE&GN:Predefinito&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//
//  });
//</editor-fold>


var DGPV  = new ol.layer.Tile({
    opacity: 0.4,
    visible: true,
    //extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileWMS({
        url: 'http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map',
        //projection: 'EPSG:3857',
        params: {
            'LAYERS': 'RN.CATALOGO_FRANE.DGPV',
            'TILED': true},
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0,
    }),
});
//<editor-fold defaultstate="expanded" desc="LAYER DGPV vecchia gestione gmaps">
//    var DGPV = new google.maps.ImageMapType({
//                     getTileUrl: function (coord, zoom) {
//                         var proj = map.getProjection();
//                         var zfactor = Math.pow(2, zoom);
//                         // get Long Lat coordinates
//                         var top = proj.fromPointToLatLng(new google.maps.Point(coord.x * 512 / zfactor, coord.y * 512 / zfactor));
//                         var bot = proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * 512 / zfactor, (coord.y + 1) * 512 / zfactor));
//
//                         //corrections for the slight shift of the WMS LAYER
//                         var deltaX = 0.000;
//                         var deltaY = 0.0000;
//
//                         //create the Bounding box string
//                         var bbox =     (top.lng() + deltaX) + "," +
//     	                               (bot.lat() + deltaY) + "," +
//     	                               (bot.lng() + deltaX) + "," +
//     	                               (top.lat() + deltaY);
//
//                         //base WMS URL
//
// 						var urlWMS = "http://wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/Vettoriali/Catalogo_Frane.map&VERSION=1.1.1&REQUEST=GetMap&SRS=EPSG:4326&WIDTH=512&HEIGHT=512&LAYERS=RN.CATALOGO_FRANE.DGPV&GN:Predefinito&TRANSPARENT=TRUE&FORMAT=image/gif";
//
//
//                         urlWMS += "&BBOX=" + bbox;      // set bounding box
//
//                          return urlWMS;                // return URL for the tile
//
//
//
//                     },
//                     tileSize: new google.maps.Size(512, 512),
// 					// minZoom: 14,
// 					// maxZoom: 16,
// 					opacity: 0.9,
//
//
//  });
//</editor-fold>

 $(function() {
     $('#WMSlayersIcon').click(function(event) {
         $('#WMSclose').show();
         $('#WMS').show();
         $('#warningWMS').show();
     });
     $('#WMSclose').click(function(event) {
         $('#WMSlayersIcon').show();
         $('#WMS').hide();
         $('#warningWMS').hide();
         $('#refDISS').hide();
     });
     $('#closeWMSwarning').click(function(event) {
         $('#warningWMS').hide();
         event.preventDefault();
     });
     $('#closeDISSref').click(function(event) {
         $('#refDISS').hide();
         event.preventDefault();
     });
     $('#open_FraneLegend').click(function(event) {
         $('#WindowlegendaFrane').show();
         event.preventDefault();
     });
     $('#LEGWMSclose').click(function(event) {
         $('#WindowlegendaFrane').hide();
         event.preventDefault();
     });



      resizeMap()

 })














//==================================================    SISMICITA' STRUMENTALE    ==================================================

var infowindow2 = new google.maps.InfoWindow();

function getSTRUMeq(date1, date2, lat1, lat2, lon1, lon2, M1, M2, depth1, depth2){

    // cambia il valore della data minima se è prima del 1985 (settala al 1° gennaio 1985 che è il minimo possibile da dati CNT)
    if (date1.substring(0,4)<1985){
        document.getElementById('StartDateSTRUM').value = '1985-01-01';
    }

    if (rectangleSTRUM){
        rectangleSTRUM.setMap(null);
        document.getElementById('selAreaSTRUM').style.display = "block";
        document.getElementById('NoselAreaSTRUM').style.display = "none";
    }


  // read text from URL location
  var request = new XMLHttpRequest();
  request.open('GET', 'http://webservices.ingv.it/fdsnws/event/1/query?starttime=' + date1+ 'T00%3A00%3A00&endtime=' + date2 + 'T23%3A59%3A59&minmag=' + M1 + '&maxmag=' + M2 + '&mindepth=' + depth1 + '&maxdepth=' + depth2 + '&minlat=' + lat1 + '&maxlat=' + lat2 + '&minlon=' + lon1 + '&maxlon=' + lon2 + '&minversion=100&orderby=time-asc&format=text&limit=10000', true);
  request.send(null);
  request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
          var type = request.getResponseHeader('Content-Type');
          if (type.indexOf("text") !== 1) {
                console.log('XMLHttpRequest webservices.ingv.it/fdsnws/event/1/query response:' + request.responseText);
				parseQuakeFile(request.responseText)
              return request.responseText;
          }
      } else{
          if (Langsel == 'IT') document.getElementById('numSTRUM').innerHTML = "0 TERREMOTI";
          else document.getElementById('numSTRUM').innerHTML = "0 EARTHQUAKES";
           $('#loading').hide()
      }
  }
}

var markersSTRUMOLD = [];

function parseQuakeFile(INGVquakes){
    // $('#warningSTRUM').hide()

    ClearMapSTRUM();

	var scaleSTRUM5 = 30;
	var scaleSTRUM4 = 23;
	var scaleSTRUM3 = 17;
	var scaleSTRUM2 = 13;
	var scaleSTRUM1 = 8;
	var urlIcon1 = "images/strum_quake_icon_blue1.png"
	var urlIcon2 = "images/strum_quake_icon_blue2.png"
	var urlIcon3 = "images/strum_quake_icon_blue3.png"
	var urlIcon4 = "images/strum_quake_icon_blue4.png"
	var urlIcon5 = "images/strum_quake_icon_blue5.png"

	var lines=[];
	var Star;
	var EPIpathCALC = 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z';
	var colorSTRUM = '#0c6b2f'



	lines = INGVquakes.split(/\n/)

    console.log("INGVquakes caricamento lines splitta le righe");
    console.log(lines);

    if (lines.length>1){
        // toglie la prima riga di intestazione e l'ultima riga vuota
        for (var i=1; i<lines.length-1; i++){
    		var line = lines[i].split('|')
    		var StrumQuakeCode = line[0];
    		var StrumQuakeTime = line[1];
    		var StrumQuakeLat = line[2];
    		var StrumQuakeLon = line[3];
    		var StrumQuakeDepth = line[4];
    		var StrumQuakeCatal = line[5];
    		var StrumQuakeMagType = line[9];
    		var StrumQuakeMagValue = line[10];
    		var StrumQuakeLocation = line[12];

            //region vecchia gestione google maps
            // if (StrumQuakeMagValue>=6) var markerIcon = {url: urlIcon5, scaledSize: new google.maps.Size(scaleSTRUM5, scaleSTRUM5)}
    		// if (StrumQuakeMagValue<6 && StrumQuakeMagValue>=5) var markerIcon = {url: urlIcon4, scaledSize: new google.maps.Size(scaleSTRUM4, scaleSTRUM4)}
    		// if (StrumQuakeMagValue<5 && StrumQuakeMagValue>=4) var markerIcon = {url: urlIcon3, scaledSize: new google.maps.Size(scaleSTRUM3, scaleSTRUM3)}
    		// if (StrumQuakeMagValue<4 && StrumQuakeMagValue>=3) var markerIcon = {url: urlIcon2, scaledSize: new google.maps.Size(scaleSTRUM2, scaleSTRUM2)}
    		// if (StrumQuakeMagValue<3) var markerIcon = {url: urlIcon1, scaledSize: new google.maps.Size(scaleSTRUM1, scaleSTRUM1)}
    		//
    		// var STRUMMarker = new google.maps.Marker({
    		// 	position: new google.maps.LatLng(StrumQuakeLat, StrumQuakeLon),
    		// 	map: map,
    		// 	icon: markerIcon,
    		// 	title: StrumQuakeMagType + ': ' + StrumQuakeMagValue,
    		// })
            // markersSTRUMOLD.push(STRUMMarker)
            //endregion

            if (StrumQuakeMagValue>=6) var markerIcon =new ol.style.Style({image: new ol.style.Icon({ src: urlIcon5, size: [512, 512], scale: 0.060/1.2})});
            if (StrumQuakeMagValue<6 && StrumQuakeMagValue>=5) var markerIcon = new ol.style.Style({image: new ol.style.Icon({ src: urlIcon4, size: [512,512], scale: 0.053/1.6})});
            if (StrumQuakeMagValue<5 && StrumQuakeMagValue>=4) var markerIcon = new ol.style.Style({image: new ol.style.Icon({ src: urlIcon3, size: [512,512], scale: 0.047/1.6})});
            if (StrumQuakeMagValue<4 && StrumQuakeMagValue>=3) var markerIcon = new ol.style.Style({image: new ol.style.Icon({ src: urlIcon2, size: [512,512], scale: 0.043/1.6})});
            if (StrumQuakeMagValue<3)var markerIcon = new ol.style.Style({image: new ol.style.Icon({ src: urlIcon1, size: [512,512], scale: 0.030/1.6})});

////////////////////TODO: STRUM LAYER ATTIVARE ////////////////////////////////////*
            var STRUMMarker =new ol.Feature({
                geometry: new ol.geom.Point(new ol.proj.fromLonLat([StrumQuakeLon, StrumQuakeLat])), //new ol.geom.Point([locLon, locLat]),
                type: "StruMM",
                title :  StrumQuakeMagType + ': ' + StrumQuakeMagValue,
                OnClickTextIT : ""
            });
            STRUMMarker.setStyle(markerIcon);


            var time = StrumQuakeTime.split('T')[1]
            var date = StrumQuakeTime.split('T')[0]


            var titleEN = '<b>' + StrumQuakeMagType + ': ' + StrumQuakeMagValue + ' - ' + StrumQuakeLocation +  '</b><br><br>Time (UTC): '  + date + '  ' + time.substring(0,8) + '<br>Depth: ' + StrumQuakeDepth + ' km'

            var titleIT = '<b>' + StrumQuakeMagType + ': ' + StrumQuakeMagValue + ' - ' + StrumQuakeLocation +  '</b><br><br>Ora (UTC): '  + date + '  ' + time.substring(0,8) + '<br>Prof.: ' + StrumQuakeDepth + ' km'

            var OnClickTextEN = '<div class="IWSTRUM"><div id="IWcloseSTRUM"><a onclick="infowindow2.close()" href="#"><img src="images/close.png" width="10px"></a></div>' + titleEN + '<br>' + '<br><a href="http://cnt.rm.ingv.it/en/event/' + StrumQuakeCode + '" target="_blank"> INGV-ONT page </a><br></div>'

            var OnClickTextIT = '<div class="IWSTRUM"><div id="IWcloseSTRUM"><a onclick="infowindow2.close()" href="#"><img src="images/close.png" width="10px"></a></div>' + titleIT + '<br>' + '<br><a href="http://cnt.rm.ingv.it/event/' + StrumQuakeCode + '" target="_blank"> Pagina INGV-ONT </a><br></div>'

            // controlla se terremoto ha punti in HSIT NOTA>22042022 aggiunta anche la
            HSITrequest(StrumQuakeCode, i, STRUMMarker, OnClickTextEN, OnClickTextIT, StrumQuakeCode);


            /**********TODO TRADURRE IL LAYER STRUM gestione popup *********************/
            //la chiamata  openPopupSTRUM(STRUMMarker, OnClickTextEN, OnClickTextIT, i, StrumQuakeCode); e' stata importata dentro la funzione  **HSITrequest** per HSIT
            //a seguito della risposta dalla prima chiamata a 200 o diverso da 200 chiama poi la funzionalita' di popup con il flagHSIT sicuramente aggiornato.
            //Altrimenti funzionava certe volte SI e certe volte NO.
            //openPopupSTRUM(STRUMMarker, OnClickTextEN, OnClickTextIT, i, StrumQuakeCode);

            console.log('aggiungo STRUMMarker al layer globale markersSTRUMOLD');
            markersSTRUMOLD.push(STRUMMarker);
        }
    }

    if (Langsel == 'IT') {
        var abbr = 'Rimuovi sismicità strumentale dalla mappa'
        var quakeword = ' TERREMOTI'
    }
    else {
        var abbr = "Remove instrumental seismicity from map";
        var quakeword = ' EARTHQUAKES'
    }
    document.getElementById('numSTRUM').innerHTML = '<div id="ClearMapSTRUM" onclick="ClearMapSTRUM();"><abbr id="ClearMapSTRUMabbr" title="' + abbr + '"><img src="./images/clearMap.png" width = "25px" ></abbr></div> '+  markersSTRUMOLD.length + quakeword ;
    $('#numSTRUM').show();
    // $('#ClearMapSTRUM').show();

    if (markersSTRUMOLD.length == 10000) {
        $('#warningSTRUM').show()
    }
	$('#loading').hide()


    ///show everything on THEMAP
    visualizzaStruMMSuMappa();
}

// check if quake exists in HSIT and return flag in array (used in open popup)
var flagHSIT = []
function HSITrequest(HSITcode, s, STRUMMarker, OnClickTextEN, OnClickTextIT, StrumQuakeCode){
    // alert('entroqui')
    var flagresponse;
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://e.hsit.it/' + HSITcode + '/' + HSITcode + '_mcs.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState == 4){
               if(request.status == 200) {
                   var type = request.getResponseHeader('Content-Type');
                   if (type.indexOf("text") !== 1) {
                       flagHSIT[s]= 1;
                       //chiamata successiva dopo aver aggiornato il flag.
                       openPopupSTRUM(STRUMMarker, OnClickTextEN, OnClickTextIT, s, StrumQuakeCode);
                  }
              } else{
                  flagHSIT[s]= 0;
                   //chiamata successiva dopo aver aggiornato il flag.
                  openPopupSTRUM(STRUMMarker, OnClickTextEN, OnClickTextIT, s, StrumQuakeCode);
              }
        }
    }
}


function openPopupSTRUM(marker, textEN, textIT, s, StrumQuakeCode){

    if (flagHSIT[s] == 1){
                // var urlTOT = window.location.href

               if (typeof(flagQuakePage)!='undefined'){
                    var link = '../cftilab/cfr/index.php?'
                   confrontoPQlinkIT =  '<br><br><abbr title="Accedi al tool di confronto delle mappe dei terremoti per visualizzare gli effetti del terremoto corrente insieme a quello di \'Hai sentito il Terremoto?\'"><a href="' + link + 'prj1=CFTI&ev1=' + Nterr +'&prj2=HSIT&ev2=' + StrumQuakeCode + '" target="_blank">Confronta gli effetti dei terremoti</a></abbr>'
                   confrontoPQlinkEN =  '<br><br><abbr title="External page to compare the effects of the current earthquake and those of \'Hai sentito il terremoto?\'"><a href="' + link + 'prj1=CFTI&ev1=' + Nterr +'&prj2=HSIT&ev2=' + StrumQuakeCode + '" target="_blank">Compare earhtquake effects</a></abbr>'
               } else {
                   confrontoPQlinkIT = '';
                   confrontoPQlinkEN = '';
               }

               HSITlinkEN = '<br><abbr title=""><a href="https://e.hsit.it/' + StrumQuakeCode + '/index.html " target="_blank"> HSIT page </a></abbr>'
               HSITlinkIT = '<br><abbr title=""><a href="https://e.hsit.it/' + StrumQuakeCode + '/index.html " target="_blank"> Pagina HSIT </a></abbr>'
    }

    if (flagHSIT[s] == 1){
        console.log('CONTIENE HSIT true:' + HSITlinkIT + confrontoPQlinkIT );
        textIT = textIT + '<div class="IWSTRUM"' + HSITlinkIT + confrontoPQlinkIT + '</div>'
        flagHSIT[s] = 0
    }
    marker.OnClickTextIT= textIT;

    //region vecchia gestione Googlemaps
    // google.maps.event.addListener(marker, 'click', function() {
    //
    //
    //
    //     if (flagHSIT[s] == 1){
    //         // var urlTOT = window.location.href
    //
    //        if (typeof(flagQuakePage)!='undefined'){
    //             var link = '../cftilab/cfr/index.php?'
    //            confrontoPQlinkIT =  '<br><br><abbr title="Accedi al tool di confronto delle mappe dei terremoti per visualizzare gli effetti del terremoto corrente insieme a quello di \'Hai sentito il Terremoto?\'"><a href="' + link + 'prj1=CFTI&ev1=' + Nterr +'&prj2=HSIT&ev2=' + StrumQuakeCode + '" target="_blank">Confronta gli effetti dei terremoti</a></abbr>'
    //            confrontoPQlinkEN =  '<br><br><abbr title="External page to compare the effects of the current earthquake and those of \'Hai sentito il terremoto?\'"><a href="' + link + 'prj1=CFTI&ev1=' + Nterr +'&prj2=HSIT&ev2=' + StrumQuakeCode + '" target="_blank">Compare earhtquake effects</a></abbr>'
    //        } else {
    //            confrontoPQlinkIT = '';
    //            confrontoPQlinkEN = '';
    //        }
    //
    //        HSITlinkEN = '<br><abbr title=""><a href="https://e.hsit.it/' + StrumQuakeCode + '/index.html " target="_blank"> HSIT page </a></abbr>'
    //        HSITlinkIT = '<br><abbr title=""><a href="https://e.hsit.it/' + StrumQuakeCode + '/index.html " target="_blank"> Pagina HSIT </a></abbr>'
    //     }
    //
    //
	// 	// specify language of popup window
	// 	if (Langsel == "EN") {
    //         if (flagHSIT[s] == 1){
    //             textEN = textEN + '<div class="IWSTRUM"' + HSITlinkEN + confrontoPQlinkEN + '</div>'
    //             flagHSIT[s] = 0
    //         }
    //
	// 		infowindow2.setContent(textEN);
	// 	} else {
    //
    //         if (flagHSIT[s] == 1){
    //             textIT = textIT + '<div class="IWSTRUM"' + HSITlinkIT + confrontoPQlinkIT + '</div>'
    //             flagHSIT[s] = 0
    //         }
	// 		infowindow2.setContent(textIT);
	// 	}
    //
	// 	// open popup window
	// 	infowindow2.open(map, marker);
    //
	// })
    //endregion
}


function ClearMapSTRUM(){
    if (markersSTRUMOLD.length>0){
        //vecchia GESTIONE GOOGLE MAPS NON PIU PRESENTE
        // for (var i = 0; i < markersSTRUMOLD.length; i++) {
        //     markersSTRUMOLD[i].setMap(null);
        // }
        markersSTRUMOLD = [];
    }
    console.log('reset selezione area strumm...');
    document.getElementById('selAreaSTRUM').style.display = "block";
    document.getElementById('NoselAreaSTRUM').style.display = "none";

    console.log('reset LAYER visualizzato strum');
    (StruMMLayer!== undefined)? mapOL.removeLayer(StruMMLayer): null;

    $('#numSTRUM').hide();
    $('#warningSTRUM').hide()

    /*********************************************/
    //RIMUOVE LE INTERAZIONI DOPO AVER CLICCATO OK se l'utente aveva selezionato il boundingBOX con la selezione ad area
    console.log('removingInteractions  ClearMapSTRUM' + mapOL.getInteractions());
    try {
        mapOL.getInteractions().pop();
        //mapOL.removeInteraction()
    }
    catch (e) {
        console.error('ERRORE Gestito');
        console.log(e, e.stack);
    }


    /*********************************************/
}





$(function() {
	$('#STRUMeqIcon').click(function(event) {
		$('#STRUMclose').show();
		$('#STRUMeqMenu').show();
		// $('#warningWMS').show();
	});
	$('#STRUMclose').click(function(event) {
		$('#STRUMeqIcon').show();
		$('#STRUMeqMenu').hide();
		// $('#warningWMS').hide();
		// $('#refDISS').hide();
	});

	fillSTRUMdiv()

})


function fillSTRUMdiv(){

    // set initial date range (last 7 days)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd = '0'+dd
    }
    if(mm<10) {
        mm = '0'+mm
    }

    var last = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    var day7 = last.getDate();
    var month7 = last.getMonth()+1;
    var year7 = last.getFullYear();
    if(day7<10) {
        day7 = '0'+ day7
    }
    if(month7<10) {
        month7 = '0'+ month7
    }

    document.getElementById('StartDateSTRUM').value = year7 + '-' + month7 + '-' + day7;
    document.getElementById('StopDateSTRUM').value = yyyy + '-' + mm + '-' + dd;





    // -----------  MAGNITUDE SLIDER
	var sliderM = document.getElementById('sliderMSTRUM');
	var StartMM = document.getElementById('StartMagSTRUM');
	var StopMM = document.getElementById('StopMagSTRUM');

	noUiSlider.create(sliderM, {
		start: [2, 10],
		step: 0.1,
		behaviour: 'drag',
		connect: true,
		range: {
			'min': -1,
			'max': 10
		}
	});

	sliderM.noUiSlider.on('update', function( values, handle ) {
		var value = values[handle];
		if ( handle ) {
			StopMM.value = Math.round(value*10)/10;
		} else {
			StartMM.value = Math.round(value*10)/10;
		}
	});

	StartMM.addEventListener('change', function(){
		sliderM.noUiSlider.set([this.value, null]);
	});

	StopMM.addEventListener('change', function(){
		sliderM.noUiSlider.set([null, this.value]);
	});



    // -----------  DEPTH SLIDER
    var sliderD = document.getElementById('sliderDSTRUM');
    var StartDD = document.getElementById('StartDepSTRUM');
    var StopDD = document.getElementById('StopDepSTRUM');

    noUiSlider.create(sliderD, {
      start: [0, 1000],
      step: 5,
      behaviour: 'drag',
      connect: true,
      range: {
          'min': -10,
          'max': 1000
      }
    });

    sliderD.noUiSlider.on('update', function( values, handle ) {
      var value = values[handle];
      if ( handle ) {
          StopDD.value = Math.round(value*10)/10;
      } else {
          StartDD.value = Math.round(value*10)/10;
      }
    });

    StartDD.addEventListener('change', function(){
      sliderD.noUiSlider.set([this.value, null]);
    });

    StopDD.addEventListener('change', function(){
      sliderD.noUiSlider.set([null, this.value]);
    });


    document.getElementById('StartLatSTRUM').value = lat1STRUM;
    document.getElementById('StopLatSTRUM').value = lat2STRUM;
    document.getElementById('StartLonSTRUM').value = lon1STRUM;
    document.getElementById('StopLonSTRUM').value = lon2STRUM;



}

var lat1STRUM = 35 - 0.5;
var lat2STRUM = 48 + 0.5;
var lon1STRUM = 6 - 0.5;
var lon2STRUM = 25 + 0.5;

var rectangleSTRUM;
var latLngBoundsSTRUM = new google.maps.LatLngBounds(
               new google.maps.LatLng(lat1STRUM, lon1STRUM),new google.maps.LatLng(lat2STRUM, lon2STRUM)
)

function CreateRectSTRUM() {

	document.getElementById('selAreaSTRUM').style.display = "none";
	// $('#clickOK').show();

	document.getElementById('NoselAreaSTRUM').style.display = "block";

    mapOLCreateRectangleSelectionArea("StartLatSTRUM", "StopLatSTRUM", "StartLonSTRUM", "StopLonSTRUM"  );

    //region Oggetti google maps non piu usati vecchia gestione
    // rectangleSTRUM = new google.maps.Rectangle({
    //     strokeColor: '#1f708f',
    //     strokeOpacity: 0.8,
    //     strokeWeight: 3,
    //     fillColor: '#FF0000',
    //     fillOpacity: 0.01,
    //     map: map,
    //     bounds: latLngBoundsSTRUM,
    //     editable: true,
    //     draggable: true,
    // });
    //
    // //   rectangle.setMap(null)
    // map.fitBounds(latLngBoundsSTRUM);
    //
    //
    // // Listener che monitora il cambiamento dei bounds del rettangolo in mappa e aggiorna i campi di testo del form
    // google.maps.event.addListener(rectangleSTRUM, 'bounds_changed', function() {
    //
    //     //acquisisco i vertici del rettangolo
    //     bounds = rectangleSTRUM.getBounds();
    //     var lat1 = bounds.getSouthWest().lat();
    //     var lat2 = bounds.getNorthEast().lat();
    //     var lon1 = bounds.getSouthWest().lng();
    //     var lon2 = bounds.getNorthEast().lng();
    //
    //     //arrotondo a 2 decimali
    //     lat1 = Math.round(lat1*100)/100;
    //     lat2 = Math.round(lat2*100)/100;
    //     lon1 = Math.round(lon1*100)/100;
    //     lon2 = Math.round(lon2*100)/100;
    //
    //     if (lat1 > lat2) {
    //        var lat2a = lat1
    //        lat1 = lat2
    //        lat2 = lat2a
    //     }
    //
    //     // aggiorno i campi del form
    //     var elem_lat1 = document.getElementById("StartLatSTRUM");
    //     elem_lat1.value = lat1;
    //
    //     var elem_lat2 = document.getElementById("StopLatSTRUM");
    //     elem_lat2.value = lat2;
    //
    //     var elem_lon1 = document.getElementById("StartLonSTRUM");
    //     elem_lon1.value = lon1;
    //
    //     var elem_lon2 = document.getElementById("StopLonSTRUM");
    //     elem_lon2.value = lon2;
    //
    //     latLngBoundsSTRUM = new google.maps.LatLngBounds(
    //         new google.maps.LatLng(lat1, lon1),
    //         new google.maps.LatLng(lat2, lon2)
    //     );
    // });
    //endregion
}

function resizeRectSTRUM() {

	var lat1 = Number((parseFloat(document.getElementById("StartLatSTRUM").value)).toFixed(2));
	var lat2 = Number((parseFloat(document.getElementById("StopLatSTRUM").value)).toFixed(2));
	var lon1 = Number((parseFloat(document.getElementById("StartLonSTRUM").value)).toFixed(2));
	var lon2 = Number((parseFloat(document.getElementById("StopLonSTRUM").value)).toFixed(2));

	latLngBoundsSTRUM = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat1, lon1),
      new google.maps.LatLng(lat2, lon2)
	  );

	/*****oggetti Google map non piu utilizzati *************/
	//rectangleSTRUM.setBounds(latLngBoundsSTRUM);
};
