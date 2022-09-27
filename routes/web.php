<?php

use App\Http\Controllers\PhotoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


/*
 * https://laracasts.com/discuss/channels/laravel/routes-with-query-string
 * Route::get('owners', array('uses' => 'PownersController@ownerlist'));
And use laravels normal request methods to get the data.

Copy Code
$whatever = $request->input('thegetvarpassed');

$requestVariables = $request->input('inputData');

*/

/***https://laracasts.com/discuss/channels/laravel/response-does-not-support-the-following-options-no-cache
@jorge_dev96 you are passing wrong data. If you check ./vendor/symfony/http-foundation/Response.php you will find that scripts compares passed value with the constants.
 * You will then see that there is no-cache or max-age. It is no_cache and max_age.
 *
 * https://stackoverflow.com/questions/63759808/laravel-7-why-isnt-my-session-cookie-getting-set-in-a-browser
 */




//PAGINA TERREMOTI MODIFICATA CACHING STORAGE
Route::get('/cfti5CS', function () {
    Log::info("Caricamento Resources\\Views\\indexCFTI5CStorage.blade.php...");
    return view('indexCFTI5CStorage');
});




//Route::get('/test','PhotoController@saveJson');
Route::post('/test','PhotoController@save1Json');

/**************TODO:GESTIONE TERREMOTI BEGIN ************************/
Route::post('/saveQuakesData','PhotoController@saveQuakesData');
Route::post('/saveJSONFile', 'PhotoController@saveJSONFile'); //salva json su file  http://localhost/saveJSONFile?Filename
Route::post('/saveQuakesGeoJSONData','PhotoController@saveQuakesGeoJSONData');

Route::get('/loadQuakesDataFromCache','PhotoController@loadQuakesDataFromCache');
Route::get('/loadGeoJSONDataFromCache','PhotoController@loadGeoJSONDataFromCache');
Route::get('/indexQuakesXML','PhotoController@indexQuakesXML')->middleware('cache.headers:public;max_age=31536000;etag'); //86400 1 gg 300 5min
Route::get('/photoLoadXML','PhotoController@indexLoadXML');
Route::get('/quake.php', 'PhotoController@singleQuakeLoading' )->middleware('cache.headers:public;max_age=31536000;etag');

//Route::get('/data', [
//    'middleware' => 'gzip',
//    'as' => 'data',
//    'uses'=>'DataController@getData'
//]);
/********QUESTA CHIAMATA RESTITUISCE IL CONTENUTO GZIPPATO NEL BROWSER *->middleware('gzip') alla fine zippa il contenuto a livello 5 intermedio *********/
//Route::get('/loadJSONIndexEEdataFullCached', 'PhotoController@loadJSONIndexEEdataFullCached' )->middleware('gzip');
/*******QUESTA CHIAMATA RESTITUISCE IL CONTENUTO NON ZIPPATO TEXT PLAIN E CACHING LOCALE ********/
Route::get('/loadJSONIndexEEdataFullCached', 'PhotoController@loadJSONIndexEEdataFullCached' )->middleware('cache.headers:public;max_age=31536000;etag');

//CACHING + ZIPPED
Route::get('/loadJSONIndexEEdataFullCachedZIP', 'PhotoController@loadJSONIndexEEdataFullCachedZIP' )->middleware('cache.headers:public;max_age=31536000;etag', 'gzip');


//http://localhost/quakeSources/09698.xml => http://localhost/quakeSourcesXMLService/09698
Route::get('/quakeSourcesXMLService/{nterrId}', function ($nterrId) {
    $result = (new PhotoController())->quakeSourcesLoading($nterrId);
//    header('Content-Type: application/xml');
    return $result;
})->middleware('cache.headers:public;max_age=3600;etag'); //86400 1 gg 300 5min;

// ServiceEE = '/EEListService';   // =>'EEList.xml';
Route::get('/EEListService', 'PhotoController@serviceEEList')->middleware('cache.headers:public;max_age=31536000;etag');

// ServiceEE_MED = '/EEList_MEDService';  // =>'EEList_MED.xml';
Route::get('/EEList_MEDService', 'PhotoController@serviceEEList_MED')->middleware('cache.headers:public;max_age=31536000;etag');

//PRIMA PAGINA ORIGINALE=>BLADE
Route::get('/cfti5', function () {
    return view('indexCFTI5');
})->middleware('cache.headers:public;max_age=31536000;etag');


//RECUPERO DI TUTTI GLI ALTRI FILE RICHIESTI presenti nella directory home e attaccando semplicemente il file name ex.
//http://localhost/OtherFilesService/listapdfR.txt
//http://localhost/OtherFilesService/KML/quake_b.txt
Route::get('/OtherFilesService/{filename}', function ($filename) {
    $result = (new PhotoController())->OtherFilesServiceList($filename);
    return $result;
})->middleware('cache.headers:public;max_age=3600;etag'); //86400 1 gg 300 5min;


//TODO: effettuare il get di geoJSON ma poi passare al blade in fase di caricamento iniziare i dati
/**************TODO:GESTIONE TERREMOTI END ************************/
//PRIMA CHIAMATA DATI CACHATI DELLE LOCALITY TEST indexV3LocFull.blade
Route::get('/indexV3LocFull3', function () {
    $result = (new PhotoController())->indexLocalityLoad();
    $arrOutput = json_decode($result->content(), TRUE);  //decodifica il json della risposta
    // Log::info( $arrOutput[0]["Loc"] ); //dato presente e verificato sui LOG
    Log::info( "Route@indexV3LocFull3 TOTALE ELEMENTI RECUPERATI DAL CONTROLLER:" . count($arrOutput[0]) ); //dato presente e verificato sui LOG
    Log::info("Route@indexV3LocFull3 ELEMENT ARRAY CARICATO MAPPATURA Resources\\Views\\indexV3LocFull.blade.php...");
    return view('indexV3LocFull', ['alldata' => $arrOutput[0]]); //MAPPING sul blade variabile alldata es.  markersCoords = {{ Illuminate\Support\Js::from($alldata, true ) }};
});


//altri test
Route::get('/photoLoadXML2','PhotoController@indexLocalityLoadXML');
Route::get('/photo','PhotoController@index');


Route::get('/indexV3LocFull2', function () {
    $result = (new PhotoController())->indexLocalityLoadXML();
    //RECUPERA IL CONTENT DEL JSON DI RISPOSTA e deve essere ASSOCIATIVO per prendere il LOC
    $arrOutput = json_decode($result->content(), TRUE);  //decodifica il json della risposta
    // Log::info( $arrOutput[0]["Loc"] ); //dato presente e verificato sui LOG
    function filter($item): bool
    {
        return ($item['maxint'] >= 0 );
    }

    //essendo una risposta JSON la risposta e composta cosi quindi 0 per entrare dentro l'oggetto Loc per referenziare l'array con tutti i risultati
    //  array (
    //  0 =>
    //  (object) array(
    //     'Loc' =>
    $filteredLocality = array_filter($arrOutput[0]["Loc"], 'filter');
    $elementArray = array();
    //LOOP ATTRAVERSO LA CHIAVE PER INDICE DI ARRAY ASSOCIATIVO
    foreach ($filteredLocality as $key => $value) {
        $convertCoordinates = [];
        //crea una classe std di output che rappresenterebbe il model
        $element = new stdClass();
        $element->ris = $value["risentimenti"];
        $element->EEnum = (int)$value["ee"];
        $element->maxint = (float)$value["maxint"];
        $element->name = $value["nazione"];
        $element->description = $value["desloc_cfti"];
        array_push($convertCoordinates, (float)$value["lon_wgs84"], (float)$value["lat_wgs84"]); //aggiunge 2 elementi all'array
        $element->coordinates = $convertCoordinates;//$coordinates;
        $element->url = "http://www.google.it";
        //gestione del campo maxintROM e
        if ($element->maxint == 11) {
            $element->maxintROM = "XI";
        } else if ($element->maxint == 10.5) {
            $element->maxintROM = "XI-X";
        } else if ($element->maxint == 10) {
            $element->maxintROM = "X";
        } else if ($element->maxint == 9.5) {
            $element->maxintROM = "IX-X";
        } else if ($element->maxint == 9.1) {
            $element->maxint = 9;
            $element->maxintROM = "IX";
        } else if ($element->maxint == 9) {
            $element->maxintROM = "IX";
        } else if ($element->maxint == 8.5) {
            $element->maxintROM = "VIII-IX";
        } else if ($element->maxint == 8.2) {
            $element->maxint = 8;
            $element->maxintROM = "VIII";
        } else if ($element->maxint == 8.1) {
            $element->maxint = 8;
            $element->maxintROM = "VIII";
        } else if ($element->maxint == 8) {
            $element->maxintROM = "VIII";
        } else if ($element->maxint == 7.5) {
            $element->maxintROM = "VII-VIII";
        } else if ($element->maxint == 7) {
            $element->maxintROM = "VII";
        } else if ($element->maxint == 6.5) {
            $element->maxintROM = "VI-VII";
        } else if ($element->maxint == 6.1) {
            $element->maxint = 6;
            $element->maxintROM = "VI";
        } else if ($element->maxint == 6.6) {
            $element->maxint = 6.5;
            $element->maxintROM = "VI-VII";
        } else if ($element->maxint == 6) {
            $element->maxintROM = "VI";
        } else if ($element->maxint == 5.5) {
            $element->maxintROM = "V-VI";
        } else if ($element->maxint == 5.1) {
            $element->maxint = 5;
            $element->maxintROM = "V";
        } else if ($element->maxint == 5) {
            $element->maxintROM = "V";
        } else if ($element->maxint == 4.6) {
            $element->maxint = 4.5;
            $element->maxintROM = "IV-V";
        } else if ($element->maxint == 4.5) {
            $element->maxintROM = "IV-V";
        } else if ($element->maxint == 4) {
            $element->maxintROM = "IV";
        } else if ($element->maxint == 3.5) {
            $element->maxintROM = "III-IV";
        } else if ($element->maxint == 3) {
            $element->maxintROM = "III";
        } else if ($element->maxint == 2.5) {
            $element->maxintROM = "II-III";
        } else if ($element->maxint == 2) {
            $element->maxintROM = "II";
        } else if ($element->maxint == 1) {
            $element->maxintROM = "I";
        } else if ($element->maxint == 0.2) {
            $element->maxintROM = "G";
        } else if ($element->maxint == 0) {
            $element->maxintROM = "NF";
        } else if ($element->maxint == 0.1) {
            $element->maxintROM = "N";
        } else if ($element->maxint == -1) {
            $element->maxintROM = "NC";
        } else if ($element->maxint == -2) {
            $element->maxintROM = "-";
        }
        //$element->key = $key; //SE SI VUOLE AGGIUNGERE LA CHIAVE
        //aggiungo elemento nell'array
        $elementArray[] = $element;
    }
    //['varibileNellaPagina' => variabileQuiLocale]
    //CHIAMA LA PAGINA indexV3LocFull.blade.php passando nella varibile alldata il contenuto di $elementArray sopra valorizzato. Ovviamente per il PHP variabile letta con $alldata
    //Log::info($elementArray); valorizzazione dei log su disco
    Log::info("ELEMENT ARRAY CARICATO MAPPATURA VIEW LOADING...");
    return view('indexV3LocFull', ['alldata' => $elementArray]);
});


