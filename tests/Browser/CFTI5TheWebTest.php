<?php

namespace Tests\Browser;

use DateTime;
use DateTimeZone;
use Facebook\WebDriver\WebDriverBy;
use Illuminate\Foundation\Testing\DatabaseMigrations;
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

        //OutputData classe di output
        //var_dump($theResult);
        //simulazione spostamento/copia file directory public html (ad esempio)
        //copy("/var/www/html/storage/app/public/" . $this->getResult() .".json", "/var/www/html/storage/app/public/"  . $this->getResult() . "backuptest.jsom");
        copy("/var/www/html/storage/app/public/" . $this->getResult()->jsonCacheFileName .".json", "/var/www/html/storage/app/public/"  . $this->getResult()->jsonCacheFileName . "backuptest.jsom");
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


