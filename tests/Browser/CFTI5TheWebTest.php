<?php

namespace Tests\Browser;

use DateTime;
use DateTimeZone;
use Facebook\WebDriver\WebDriverBy;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Laravel\Dusk\Browser;
use SebastianBergmann\Timer\Duration;
use SebastianBergmann\Timer\Timer;
use Tests\DuskTestCase;
use function MongoDB\BSON\toJSON;
use function PHPUnit\Framework\assertContains;
use function PHPUnit\Framework\assertStringContainsString;
use function PHPUnit\Framework\assertTrue;

class CFTI5TheWebTest extends DuskTestCase
{
//    /**
//     * A Dusk test example.
//     *
//     * @return void
//     */
//    public function testExample()
//    {
//        $this->browse(function (Browser $browser) {
//            $browser->visit('/'); //welcome page laravel
//            dump($browser->driver->findElement(WebDriverBy::id("OutputResultData"))->getAttribute("value"));
//            $browser->storeConsoleLog('CFTI5TheWeb_testExample.txt'  .date('m-d-Y_hia'));
//            $browser->screenshot("testing" .date('m-d-Y_hia'));
//        });
//    }

    /**
     * @return void
     * @throws \Throwable
     */
    public function testGenerateNewCacheEE_cfti5UpdateEE()
    {
        $theResult =new OutputData();
        $dateExecution= new DateTime("now", new DateTimeZone('Europe/Rome'));
        $dateExecution = $dateExecution->format("Y-m-d\TH_i_s");
        $theResult->dateExecution =$dateExecution;
        //Forzare un aggiornamento della cache lato rediis prima di chiamare la pagina per il file EEList.xml
        //Cache::flush() è l'equivalente della cancellazione delle chiavi singole
        var_dump("Fase inizio preparazione ambiente con caching server azzerato....START");
        Cache::forget('EEListServiceForever'); //'es. REDIS lancia il comando "DEL" "laravel_database_laravel_cache_:EEListServiceForever"
        Cache::forget('QuakesXMLForever');
        Cache::forget('OtherFilesServiceList_KML@i_quake_b.txt');
        Cache::forget('OtherFilesServiceList_EE_classif.txt');
        Cache::forget('OtherFilesServiceList_KML@i_quake_a.txt');
        Cache::forget('OtherFilesServiceList_KML@locality_a.txt');
        Cache::forget('BiblioEEListServiceForever');
        Cache::forget('OtherFilesServiceList_listapdfT.txt');
        Cache::forget('LocListForever');
        Cache::forget('OtherFilesServiceList_KML@locality_b.txt');
        Cache::forget('JSONFileIndexEEdataFullCached');
        Cache::forget('OtherFilesServiceList_listapdfR.txt');


        var_dump("Fase inizio preparazione ambiente con caching server azzerato....END");
        var_dump("Inizio chiamata /cfti5UpdateEE per creazione cache....START");
        //NB. volendo si possono far dimenticare tutte le chiavi e forzare un refresh lato server
        $this->browse(function (Browser $browser)  use ($theResult) {
            $browser->visit('/cfti5UpdateEE'); //http://localhost/cfti5UpdateEE
            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
            $browser->click("a#closeD");
            $browser->assertDisabled("#access");
            //NB. Attende prima che il campo sia disabilitato (vuol dire che l'elaborazione è finita) poi recupera il valore
            //del nome file appena creato e lo visualizza in output.
            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE' . $theResult->dateExecution);
            $browser->waitUntilDisabled("#OutputResultData", 250);
            //dd($browser->value("#OutputResultData"));
            $outputFileNameValue= $browser->value("#OutputResultData");
            $theResult->jsonCacheFileName = $outputFileNameValue;
            //$this->setResult($outputFileNameValue);
            $this->setResult($theResult);
            $browser->assertDisabled("#OutputResultData");
            $browser->screenshot("CFTI5TheWeb_cfti5UpdateEElastExecution" .  $theResult->jsonCacheFileName);
            $browser->driver->wait(20); //Attesa finale della scrittura del processo dalla console.
        }).$this->getActualOutput();
        //OUTPUT FILENAME GENERATO DAL JAVASCRIPT CHE E' POSSIBILE SPOSTARE E RINOMINARE
        var_dump($this->getResult());
        var_dump("Inizio chiamata /cfti5UpdateEE per creazione cache....END");
        //OutputData classe di output
        //var_dump($theResult);
        //simulazione spostamento/copia file directory public html (ad esempio)
        //copy("/var/www/html/storage/app/public/" . $this->getResult()->jsonCacheFileName .".json", "/var/www/html/storage/app/public/"  . $this->getResult()->jsonCacheFileName . "backuptest.json");

        //1) Sovrascrittura vecchio file di caching
        $theCacheFileToBeOverWritten = "IndexEEdataFullCached.json";
        /**If the destination file already exists, it will be overwritten. NB. Utilizzata una mv per rinominare nel nuovo */
        var_dump("Aggiornamento file di cache effettuata correttamente....START");
        //copy(storage_path('app/public').'/'. $this->getResult()->jsonCacheFileName .".json", storage_path('app/public').'/'. $theCacheFileToBeOverWritten);
        copy(storage_path('app/public').'/'. $this->getResult()->jsonCacheFileName .".json", storage_path('app/public').'/'. $theCacheFileToBeOverWritten);

        var_dump("Aggiornamento file di cache effettuata correttamente....END");

        var_dump("Fase finale forza riaggiornamento cache - START");
        Cache::forget('EEListServiceForever'); //'es. REDIS lancia il comando "DEL" "laravel_database_laravel_cache_:EEListServiceForever"
        Cache::forget('QuakesXMLForever');
        Cache::forget('OtherFilesServiceList_KML@i_quake_b.txt');
        Cache::forget('OtherFilesServiceList_EE_classif.txt');
        Cache::forget('OtherFilesServiceList_KML@i_quake_a.txt');
        Cache::forget('OtherFilesServiceList_KML@locality_a.txt');
        Cache::forget('BiblioEEListServiceForever');
        Cache::forget('OtherFilesServiceList_listapdfT.txt');
        Cache::forget('LocListForever');
        Cache::forget('OtherFilesServiceList_KML@locality_b.txt');
        //Cache::forget('JSONFileIndexEEdataFullCached'); //questa chiave è stata appena ricreata dal processo di generazione cache è inutile cancellarla.
        Cache::forget('OtherFilesServiceList_listapdfR.txt');
        var_dump("Fase finale forza riaggiornamento cache - END");

//        //2) Avvio pulizia cache server completa
//        $theResultCache =new OutputData();
//        $dateExecution= new DateTime("now", new DateTimeZone('Europe/Rome'));
//        $dateExecution = $dateExecution->format("Y-m-d\TH_i_s");
//        $theResultCache->dateExecution =$dateExecution;
//        $this->browse(function (Browser $browser)  use ($theResultCache) {
//            $content = $this->get('/cfti5UpdateCacheDestroyAll')->baseResponse->getContent();//http://localhost/cfti5UpdateCacheDestroyAll
////            $browser->visit('/cfti5UpdateCacheDestroyAll');
////            $browser->storeConsoleLog('cfti5UpdateCacheDestroyAll_cfti5UpdateEElastExecution' . $theResultCache->dateExecution);
////            $browser->screenshot("cfti5UpdateCacheDestroyAll_cfti5UpdateEElastExecution" .  $theResultCache->dateExecution);
//            $this->setResult($content);
//            $browser->driver->wait(5); //Attesa finale della scrittura del processo dalla console.
//        }).$this->getActualOutput();
//        var_dump($this->getResult());  //"'CLEARED CACHE SUCCESS'=>'true'"
//        var_dump($theResultCache);


        /**
         * Per automatizzare completamente il processo
         * 1) Copia e sovrascrivi il json di cache con questo nome: IndexEEdataFullCached.json
         * 2) Chiamare il cache cleaning alla fine della copia "/cfti5UpdateCacheDestroyAll"
         * 3) In merito al caching lato client:> nel file /laravel-dev/routes/web.php
         *    Impostare opportunamente ogni quanto far scadere cache lato client 1 gg 1 settimana 1 mese
         *    middleware('cache.headers:public;max_age=31536000;etag;last_modified=22-Nov-2022');
         *    NB. Poichè il software usa la cache lato client estensivamente cercando di eviare le chiamate quando già i dati
         *    per vedere gli aggiornamenti è necessario aggiornare tutto lato server pulire cache e attendere che
         *     a) il client cancelli manualmente la cache
         *     b) passi un periodo di tempo max_age per cui il client chiede nuovamente al server di verificare i cambiamenti.
         * */
    }

//    /**
//     * A basic browser test example.
//     *
//     * @return void
//     */
//    public function testBasicExample()
//    {
//        $this->browse(function (Browser $browser) {
//            $browser->visit('/');
//            $valore = $browser->value("#OutputResultData");
//            $browser->assertSee('Laravel');
//            $this->setResult($valore);
//        });
//
//        var_dump($this->getResult());
//    }
}


