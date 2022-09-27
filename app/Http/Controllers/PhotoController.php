<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use phpDocumentor\Reflection\Types\Integer;
use phpDocumentor\Reflection\Types\Void_;
use stdClass;
//use GuzzleHttp\Middleware;
//use Psr\Http\Message\RequestInterface;
//use Psr\Http\Message\ResponseInterface;




class PhotoController extends Controller
{

    //url mapped /test
    function saveJson(Request $request)
    {
        Log::info("saveJson called START");
        $data = json_decode($request->getContent());  //object stdClass dopo averlo convertito dal json in input
        Log::info("DATA");
        Log::info($request->getContent()); //logga il json secco a stringa
        //Log::info($data); //logga l'array decodificato
        Log::info("saveJson called END");
        //echo "saved";
        echo json_encode(array('success'=>'true'));
    }
/**************TODO:GESTIONE TERREMOTI BEGIN ************************/

    /** caricamento singola url http://localhost/quake.php?02062IT
     *  ULR querystring recuperata per verificare ID -> chiamare altro controller che recupera il file XML cachato
     * @param Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    function singleQuakeLoading(Request $request)
    {
        /// caricamento singola url http://localhost/quake.php?02062IT
    //      $request->query->keys()[0]
    //      dump($request->query->all()); dump($request->query->keys()[0]); dump(substr($request->query->keys()[0], 0, -2));
        // $nterrCodeQuake =substr($request->query->keys()[0], 0, -2); //rimuove gli ultimi due caratteri della lingua
    //        Log::info($request->query->all());
        return view('quake');
    }

    /** caricamento singola url http://localhost/quake.php?02062IT
     *  ULR querystring recuperata per verificare ID -> chiamare altro controller che recupera il file XML cachato
     * @return
     */
    function quakeSourcesLoading($nterrId)
    {
        Log::info("PhotoController@quakeSourcesLoading called START");
        Log::info($nterrId);
        //Chiamata esterna ad un altro modulo presente nel controller
        $resultQuakeSourcesXML = (new PhotoController())->loadQuakeSources($nterrId);;
        Log::info("PhotoController@quakeSourcesLoading called END... calling the View('quake')");
        Log::info($resultQuakeSourcesXML);
        return $resultQuakeSourcesXML;
    }

    /**
     * @return mixed Restituisce XML del singolo terremoto e cacha il file sempre
     * (possibilità di creare un futuro uno script di warmUp della cache che precarica tutta la dir)
     *  FILE di esempio: parsePQData./quakeSources/09698.xml 09698 è il parametro nterrCode passato cosi -
     * $nterrCodeQuake =substr($request->query->keys()[0], 0, -2); //rimuove gli ultimi due caratteri della lingua
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function loadQuakeSources($nterrCode){
        $keyNterrSingleQuake= "loadQuakeSources_" . $nterrCode;
        Log::info('loadQuakeSources@@Attempt display data From REDIS server START key:' . $keyNterrSingleQuake);
        $listXML = Cache::rememberForever($keyNterrSingleQuake, function () use($keyNterrSingleQuake, $nterrCode)  { //NB. PASSAGGIO PARAMETRI ALLA FUNZIONE DI CALLBACK
            Log::info('loadQuakeSources@@LOADING XMLFile FROM DISK STARTED...........key:' . $keyNterrSingleQuake);
            //$_SERVER["DOCUMENT_ROOT"] ROOT recupera path completo fino alla directory public
            $fullPath =$_SERVER["DOCUMENT_ROOT"] . '/quakeSources/' . $nterrCode . '.xml';  //parsePQData./quakeSources/09698.xml
            Log::info('loadQuakeSources@@LOADING XMLFile FROM DISK ' . $fullPath . '...........key:' . $keyNterrSingleQuake);
//            $xmlFileData = file_get_contents("xml->{$fullPath}");
            $objXmlDocument = simplexml_load_file($fullPath, "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            header('Content-Type: application/xml'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al
            return $objXmlDocument->asXML();
        });
        Log::info('loadQuakeSources@@Attempt display data From REDIS server END returning data key:' . $keyNterrSingleQuake);

        ///TODO: SOLUZIONE CHARSET DA APPLICARE OVUNQUE***/
        /***RITORNA UNA RISPOSTA STRINGA NO JSON senza applicare ulteriori forzature nel charset UTF8 e cosi rimane FEDELE a quanto richiesto!!!! ****/
        /*return response($content)
            ->withHeaders([
                'Content-Type' => $type,
                'X-Header-One' => 'Header Value',
                'X-Header-Two' => 'Header Value',
            ]); */
        return response()->make($listXML)->header("Content-Type", "application/xml"); //->header( "cache-control","public")->header( "max-age","84600");
        //( "cache-control","public"):
        //( "max-age","84600");
    }

    /*
   * 1) ritorna xml puro
   * 2) cachare xml su rediis
   * 3) ritorna oggetto cachato
   * 4)   IN GENERALE PRIMO STEP TUTTO QUELLO CHE ERA LEGGI DA JS e prendi XML diventa prendi da un controller CACHE
   * 4.1) OTTIMIZZAZIONE ULTERIORE tutte le trasformazioni fatte sul JS dopo la lettura XML vengono quindi effettuate da PHP
   * 5) Si potrebbe prevedere un save in cache di un array preelaborato e fare un check su rediis se già preesistente non serve rifare l'elaborazione dell'array ma basta utilizzare
   * quanto gia' presente e cachato.
   */
    public function indexQuakesXML(){

        //TODO: chiamata esterna di esempio e trasforma in output il risultato START //

//        $response = Http::withMiddleware(
//            Middleware::mapResponse(function (ResponseInterface $response) {
//                $header = $response->getHeader('Content-Type: application/xml');
//
//                // ...
//
//                return $response;
//            })
//        )->get('https://api.namecheap.com/xml.response?ApiUser=(username)&ApiKey=(apikey)&UserName(username)&ClientIp=(ip)');
//        Log::info($response->status());
//        Log::info($response->body());
//        //TODO:sostituisci il body con il file richiesto
//        $xml = simplexml_load_string($response->body(),'SimpleXMLElement',LIBXML_NOCDATA);
//        header('Content-Type: application/xml'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al file
//        Log::info($xml->asXML());
//        echo $xml->asXML();

        //TODO: chiamata esterna di esempio  e trasforma in output il risultato END //

        Log::info('indexQuakesXML@@Attempt display data From REDIS server START');
        $listXML = Cache::rememberForever('QuakesXMLForever', function () {
            Log::info('indexQuakesXML@@LOADING XMLFile FROM DISK STARTED...........');
            $objXmlDocument = simplexml_load_file("QuakeList.xml", "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            header('Content-Type: application/xml'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al file
            //Log::info($objXmlDocument->asXML()); logging
            return $objXmlDocument->asXML();
        });
        Log::info('indexQuakesXML@@Attempt display data From REDIS server END returning data');
//        header('Content-Type: application/xml');
//        return $listXML;
        ///TODO: SOLUZIONE CHARSET DA APPLICARE OVUNQUE***/
        /***RITORNA UNA RISPOSTA STRINGA NO JSON senza applicare ulteriori forzature nel charset UTF8 e cosi rimane FEDELE a quanto richiesto!!!! ****/
        return response()->make($listXML)->header("Content-Type", "application/xml"); //->header( "cache-control","public")->header( "max-age","84600");
    }




    /** ServiceEE_MED = '/EEList_MEDService';  // =>'EEList_MED.xml';
     * @return \Illuminate\Http\Response|mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function serviceEEList_MED(){
        Log::info('serviceEEList_MED@@Attempt display data From REDIS server START');
        $listXML = Cache::rememberForever('EEList_MEDServiceForever', function () {
            Log::info('serviceEEList_MED@@LOADING XMLFile FROM DISK STARTED...........');
            $objXmlDocument = simplexml_load_file("EEList_MED.xml", "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            header('Content-Type: application/xml'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al file
            //Log::info($objXmlDocument->asXML()); logging
            return $objXmlDocument->asXML();
        });
        Log::info('serviceEEList_MED@@Attempt display data From REDIS server END returning data');
        /***RITORNA UNA RISPOSTA STRINGA NO JSON senza applicare ulteriori forzature nel charset UTF8 e cosi rimane FEDELE a quanto richiesto!!!! ****/
        return response()->make($listXML)->header("Content-Type", "application/xml"); //->header( "cache-control","public")->header( "max-age","84600");
    }

    /**     ServiceEE = '/EEListService';   // =>'EEList.xml';
     * @return \Illuminate\Http\Response|mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function serviceEEList(){
        Log::info('serviceEEList@@Attempt display data From REDIS server START');
        $listXML = Cache::rememberForever('EEListServiceForever', function () {
            Log::info('serviceEEList@@LOADING XMLFile FROM DISK STARTED...........');
            $objXmlDocument = simplexml_load_file("EEList.xml", "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            header('Content-Type: application/xml'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al file
            //Log::info($objXmlDocument->asXML()); logging
            return $objXmlDocument->asXML();
        });
        Log::info('serviceEEList@@Attempt display data From REDIS server END returning data');
        /***RITORNA UNA RISPOSTA STRINGA NO JSON senza applicare ulteriori forzature nel charset UTF8 e cosi rimane FEDELE a quanto richiesto!!!! ****/
        return response()->make($listXML)->header("Content-Type", "application/xml");
    }


    /**
     * @param $fileNameInput Tutti gli altri file presenti nella stessa dir home;
     * @return \Illuminate\Http\Response|mixed
     * @throws \Illuminate\Contracts\Container\BindingResolutionException
     */
    public function OtherFilesServiceList($fileNameInput){
        $keySingleFile= "OtherFilesServiceList_" . $fileNameInput;
        Log::info('OtherFilesServiceList@@Attempt display data From REDIS server START key:' . $keySingleFile);
        $listXML = Cache::rememberForever($keySingleFile, function () use($keySingleFile, $fileNameInput)  { //NB. PASSAGGIO PARAMETRI ALLA FUNZIONE DI CALLBACK
            Log::info('OtherFilesServiceList@@LOADING XMLFile FROM DISK STARTED...........key:' . $keySingleFile);
            //$_SERVER["DOCUMENT_ROOT"] ROOT recupera path completo fino alla directory public
            $fullPath =$_SERVER["DOCUMENT_ROOT"] . '/' . str_replace("@", "/", $fileNameInput); //. '.xml';
            Log::info('OtherFilesServiceList@@LOADING XMLFile FROM DISK ' . $fullPath . '...........key:' . $keySingleFile);
            //DOWNLOAD FILE $objXmlDocument = File::get($fullPath);
            //echo nl2br(file_get_contents($fullPath));
            $objXmlDocument= file_get_contents($fullPath);
            echo $objXmlDocument;
            //header('Content-Type: application/text'); //dichiarata anche nel mapResponse qui serve se accedi direttamente al
            return $objXmlDocument;
        });
        Log::info('OtherFilesServiceList@@Attempt display data From REDIS server END returning data key:' . $keySingleFile);
        return response()->make($listXML); // ->header("Content-Type", "application/text");
    }

    /**Salvataggio dei dati di base dei terremoti che dall'XML sono stati elaborati in JS nell'oggetto markersArray e vengono salvati [la classe MARKER viene gestita separatamente]
     * L'informazione viene anche cachata.
     * {"Date":10000100,"DateLabel":"1000 01 -","TimeLabel":"-","Nterr":"00001","Lat":"46.000","Lon":"14.500","Location":"Yugoslavia","Country":"Slovenia","Io":0,"Year":1000,"Month":"01","Day":"00","Hour":0,"Minu":0,"Sec":0,"Me":0,"Imax":0,"Zone":"ITA","Npun":0,"FlagFalse":true,"Level":"S","Note":"F","EpiType":"-","EpiIcon":"F"}
     * @param Request $request
     * @return void
     */
    function saveQuakesData(Request $request): void
    {
        Log::info("saveQuakesData called START");
        $data = json_decode($request->getContent());  //object stdClass dopo averlo convertito dal json in input
        Log::info("DATA saveQuakesData:" . $request->getContent() ); //logga il json in input
        Log::info("saveQuakesData called END");
        $saveQuakesData = Cache::get('saveQuakesData');
        if (!isset($saveQuakesData)) {
            Cache::forever('saveQuakesData', json_encode($data));
        }
        echo json_encode(array('success'=>'true'));
    }


    ///

    /**salvataggio JSON singolo file esempio chiamata URL http://localhost/saveJSONFile?Filename
     * {message: "CSRF token mismatch.", exception: "Symfony\Component\HttpKernel\Exception\HttpException",…}
        "CSRF token mismatch." Necessario configurare su classe VerifyCsrfToken.php
     * @param Request $request
     * @return void
     */
    function saveJSONFile(Request $request): void
    {
        //      $request->query->keys()[0]
        //      dump($request->query->all()); dump($request->query->keys()[0]); dump(substr($request->query->keys()[0], 0, -2));
        Log::info("saveJSONFile called START");
        $data = json_decode($request->getContent());  //object stdClass dopo averlo convertito dal json in input
        //Log::info("DATA saveJSONFile:" . $request->getContent() ); //logga il json in input
        $fileNameToSave = $request->query->keys()[0] . ".json";
        Log::info("saveJSONFile called:". $fileNameToSave);
        //( $_SERVER["DOCUMENT_ROOT"]
        //save in public folder  example-app/storage/app/public F:\WORK\sail-1.14.9\sail-1.14.9\example-app\storage\app\public
        Storage::disk('public')->put( $fileNameToSave, json_encode($data));
        //SALVATAGGIO IN CACHE per la prima volta che si salva i dati
        $saveJSONData = Cache::get('JSONFile'.$fileNameToSave);  //JSONFileIndexEEdataFullCached
        if (!isset($saveJSONData)) { //saveJSONFileIndexEEdataFullCached
            Cache::forever('JSONFile'.$fileNameToSave, json_encode($data));
        }

        echo json_encode(array('success'=>'true'));
    }

    /*** Restituisce la collezione markersArray solo se questa è stata già cachata
     * @return \Illuminate\Http\JsonResponse
     */
    function loadJSONIndexEEdataFullCached() //(Request $request)
    {   //JSONFileIndexEEdataFullCached
        //$fileNameToSave = $request->query->keys()[0] . ".json"; //passando queryString parametro
        $JSONFileIndexEEdataFullCached = Cache::get('JSONFileIndexEEdataFullCached');
        if (isset($JSONFileIndexEEdataFullCached)) {
            Log::info("DATA loadJSONIndexEEdataFullCached: CONTENT IS CACHED" );
            return response()->json( json_decode($JSONFileIndexEEdataFullCached));
        }
        else
        {
            Log::info("DATA loadJSONIndexEEdataFullCached: LOADING FROM DISK" );
            $jsonData = Storage::disk('public')->get('IndexEEdataFullCached.json');
            $jsonData = json_decode($jsonData, true);
            //Caching first
            Log::info("DATA loadJSONIndexEEdataFullCached: CACHING NOW" );
            Cache::forever('JSONFileIndexEEdataFullCached', json_encode($jsonData));
            return response()->json($jsonData);
        }
    }


    /*** Restituisce la collezione markersArray solo se questa è stata già cachata
     * @return \Illuminate\Http\JsonResponse
     */
    function loadJSONIndexEEdataFullCachedZIP() //(Request $request)
    {
        $JSONFileIndexEEdataFullCached = Cache::get('JSONFileIndexEEdataFullCached');
        if (isset($JSONFileIndexEEdataFullCached)) {
            Log::info("DATA loadJSONIndexEEdataFullCached: CONTENT IS CACHED" );
            //header('Content-Encoding: gzip'); //nn serve sembra lo applica il middleware
            return response()->json( json_decode($JSONFileIndexEEdataFullCached));
        }
        else
        {
            Log::info("DATA loadJSONIndexEEdataFullCached: LOADING FROM DISK" );
            $jsonData = Storage::disk('public')->get('IndexEEdataFullCached.json');
            $jsonData = json_decode($jsonData, true);
            //Caching first
            Log::info("DATA loadJSONIndexEEdataFullCached: CACHING NOW" );
            Cache::forever('JSONFileIndexEEdataFullCached', json_encode($jsonData));
            //header('Content-Encoding: gzip'); //nn serve sembra lo applica il middleware
            return response()->json($jsonData);
        }
    }

    /**
     * @param Request $request
     * @return void
     */
    function saveQuakesGeoJSONData(Request $request): void
    {
        Log::info("saveQuakesGeoJSONData called START");
        $data = json_decode($request->getContent());  //object stdClass dopo averlo convertito dal json in input
        Log::info("DATA saveQuakesGeoJSONData:" . $request->getContent() ); //logga il json in input
        Log::info("saveQuakesGeoJSONData called END");
        $saveQuakesGeoJSONData = Cache::get('saveQuakesGeoJSONData');
        if (!isset($saveQuakesGeoJSONData)) {
            Cache::forever('saveQuakesGeoJSONData', json_encode($data));
        }
        echo json_encode(array('success'=>'true'));
    }

    /*** Restituisce la collezione markersArray solo se questa è stata già cachata
     * @return \Illuminate\Http\JsonResponse
     */
    function loadQuakesDataFromCache()
    {
        $saveQuakesData = Cache::get('saveQuakesData');
        if (isset($saveQuakesData)) {
             return response()->json( json_decode($saveQuakesData));
        }
        echo json_encode(array('failed'=>'true'));
    }

    /**
     * Restituisce la collezione markersArray solo se questa è stata già cachata
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    function loadGeoJSONDataFromCache()
    {
        $saveQuakesGeoJSONData = Cache::get('saveQuakesGeoJSONData');
        if (isset($saveQuakesGeoJSONData)) {
            return response()->json( json_decode($saveQuakesGeoJSONData));
        }
        echo json_encode(array('failed'=>'true'));
    }







/**************TODO:GESTIONE TERREMOTI  END************************/

/********************************************TODO: GESTIONE ALTRI XML FILES TESTING****************************************************************************/


    /**
     * @return \Illuminate\Http\JsonResponse Ritorna una rappresentazione JSON convertita come array associativo partendo dal file xml.
     */
    public function indexLocalityLoadXML()
    {
        Log::info('@@Attempt display data From REDIS server START');
        $listXML = Cache::rememberForever('LocListForever', function () {
            Log::info('@@Display XMLFile  STARTED...........');
            $objXmlDocument = simplexml_load_file("LocList.xml", "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            //Convert the SimpleXMLElement Object Into Its JSON Representation
            $objJsonDocument = json_encode($objXmlDocument);
            //Decode the JSON String Into an Array
            $arrOutput = json_decode($objJsonDocument, TRUE);

            Log::info("@@Display XMLFile  FILE count N:" . count($arrOutput["Loc"]) );

            //Cache::forever('LocList', $objJsonDocument);
            Log::info('@@Display XMLFile ENDED...........');
            return $arrOutput;
        });
        Log::info('@@Attempt display data From REDIS server END ');
        Log::info("@@Data readed from XMLFILE/cache count N:" . count($listXML["Loc"]));
        return response()->json([$listXML]);
    }


    public function indexLocalityLoad()
    {
        Log::info('Controller@@IndexLocalityLoad Attempt display data From REDIS server START');
        $listXML = Cache::rememberForever('IndexLocalityLoad', function () {
            Log::info('@@IndexLocalityLoad Display XMLFile  STARTED...........');
            $objXmlDocument = simplexml_load_file("LocList.xml", "SimpleXMLElement", LIBXML_NOCDATA);
            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }
            //Convert the SimpleXMLElement Object Into Its JSON Representation
            $objJsonDocument = json_encode($objXmlDocument);
            //Decode the JSON String Into an Array
            $arrOutput = json_decode($objJsonDocument, TRUE);

            Log::info("Controller@@IndexLocalityLoad Loading XMLFile  FILE count N:" . count($arrOutput["Loc"]) );
            Log::info('Controller@@IndexLocalityLoad Loading XMLFile ENDED...........');
            Log::info("Controller@@IndexLocalityLoad START business method on IndexLocalityLoad");

            $filteredLocality = array_filter($arrOutput["Loc"],  function($item) { return $item['maxint'] >= 0; });
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
            Log::info("Controller@@IndexLocalityLoad END business method on IndexLocalityLoad");
            Log::info("Controller@@IndexLocalityLoad ELEMENT ARRAY CARICATO .......");
            return $elementArray;
        });  //end  $listXML = Cache::rememberForever('IndexLocalityLoad', function () {
        Log::info('Controller@@IndexLocalityLoad Attempt display data From REDIS server END ');
        //Log::info("@@IndexLocalityLoad Data readed from XMLFILE/cache count N:" . count($listXML["Loc"]));
        Log::info("Controller@@IndexLocalityLoad Data readed from XMLFILE/cache count N:" . count($listXML));
        return response()->json([$listXML]);
    }

//    public function filter($item): bool
//    {
//        return ($item['maxint'] >= 0 );
//    }



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $photosValues = Cache::get('globals');
        if (isset($photosValues)) {
            echo "Display data From REDIS server<br>";
            $photos = json_decode($photosValues);
            //dump($photos);
            Log::info('Display data From REDIS server');
            Log::info($photos);
            echo "PHOTOS N:". count($photos);
        }
        else {
            echo "Display data From REST API server<br>"; //https://jsonplaceholder.typicode.com/photos
            $response = Http::withOptions(["verify" => false])->get('https://jsonplaceholder.typicode.com/photos');
            //$response = Http::withOptions(["verify" => false])->withHeaders(["Cache-Control: no-cache",])->get('https://jsonplaceholder.typicode.com/photos');

            Log::info('Display data From REST API server');
            Log::info($response);
            Log::info($response->body());
            //var_dump($response->body());



            $photos = json_decode($response->body());

            //mostra a video l'output dei 5000 elementi
            //dump($photos);

            Cache::forever('globals', json_encode($photos));


            //Http::post($url,$fields)::withHeaders(["Authorization: Bearer $paystack_key","Cache-Control: no-cache",])::withOptions(["verify"=>false]);

            /*Cache::forever('key', 'value');
            Given that, I would change your code to something like the following:
            cache()->forever('globals', json_encode(['foo' => 'bar']));*/

            echo "STATUS:" . strval($response->status()) . "<br>";
            echo "OK:" . strval($response->ok()) . "<br>";
            echo "SUCCESSFUL:" . strval($response->successful()) . "<br>";
            echo "PHOTOS N:". count($photos);
        }
    }

    public function indexLoadXML()
    {
        $locListValues = Cache::get('LocList');
        if (isset($locListValues)) {
            echo "Display data From REDIS server<br>";
            $locListArr =  json_decode($locListValues,true);
            //dump($photos);
            Log::info('Display data From REDIS server');
            //Log::info(print_r($locListArr));
            echo "LOCLIST N:" . count($locListArr["Loc"]); // $locListArr["Loc"]
            dump($locListArr["Loc"][0]);
            dump($locListArr["Loc"][1]);
        } else {
            echo "Display data reading xml file<br>";

            //$objXmlDocument = simplexml_load_file("LocList.xml");
            $objXmlDocument = simplexml_load_file("LocList.xml", "SimpleXMLElement", LIBXML_NOCDATA);

            if ($objXmlDocument === FALSE) {
                echo "There were errors parsing the XML file.\n";
                foreach (libxml_get_errors() as $error) {
                    echo $error->message;
                }
                exit;
            }

            //Convert the SimpleXMLElement Object Into Its JSON Representation
            $objJsonDocument = json_encode($objXmlDocument);
            //Decode the JSON String Into an Array
            $arrOutput = json_decode($objJsonDocument, TRUE);

            echo "XMLdata count N:" . count($arrOutput["Loc"]);

            dump($arrOutput["Loc"][0]);
            dump($arrOutput["Loc"][1]);
            //dump($arrOutput["Loc"]);// ci mette un po'

            Cache::forever('LocList', $objJsonDocument);
            echo "STATUS:CACHED";

//        $filteredLocality = array_filter($arrOutput["Loc"], 'filter');
//        $elementArray = array();
//
//        //LOOP ATTRAVERSO LA CHIAVE PER INDICE DI ARRAY ASSOCIATIVO
//        foreach ($filteredLocality as $key => $value) {
//            //echo $key;
//            $convertCoordinates = [];
//            array_push($convertCoordinates, (float)$value["lon_wgs84"], (float)$value["lat_wgs84"]); //aggiunge 2 elementi all'array
//            //$coordinates = json_encode($convertCoordinates); //questa istruzione converte in stringa non andava bene.
//
//
//            $element = new stdClass();
//            $element->name = $value["nazione"];
//            $element->description = $value["desloc_cfti"];
//            $element->coordinates = $convertCoordinates;//$coordinates;
//            $element->url = "http://www.google.it";
//            //$element->key = $key; //SE SI VUOLE AGGIUNGERE LA CHIAVE
//            //aggiungo elemento nell'array
//            $elementArray[] = $element;
//            //DEBUG INFORMAZIONI
//            //print_r($elementArray);
//        }
        }
    }










    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
