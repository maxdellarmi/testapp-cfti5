<?php

namespace Tests\Browser;

use Facebook\WebDriver\WebDriverBy;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Log;
use Laravel\Dusk\Browser;
use SebastianBergmann\Timer\Timer;
use Tests\DuskTestCase;
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
//            //$browser->visit('/cfti5');
//            $browser->visit('/'); //welcome page laravel
//            //input[id=OutputResultData]
//            dump($browser->driver->findElement(WebDriverBy::id("OutputResultData"))->getAttribute("value"));
//            $browser->storeConsoleLog('CFTI5TheWeb_testExample.txt');
//            $browser->screenshot("test");
//                    //->assertSee('Laravel');
//        });
//    }

    /**
     * Per gestire gli alert presenti nella pagina:
     * $browser->driver->switchTo()->alert()->accept();
     *            $browser->driver->switchTo()->alert()->dismiss();
     *            $browser->driver->switchTo()->alert()->getText();
     * @return void
     * @throws \Throwable
     */
    public function testGenerateNewCacheEE_cfti5UpdateEE()
    {

//        //OK FUNZIONA
//        $this->browse(function (Browser $browser) {
//            $browser->visit('/cfti5UpdateEE');
//            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
//            $browser->click("a#closeD");
//            $browser->screenshot("CFTI5TheWeb_cfti5UpdateEElastExecution" .date('m-d-Y_hia'));
//            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE' .date('m-d-Y_hia'));
//            $browser->assertDisabled("#access");
//        });

        $this->browse(function (Browser $browser) {
            $browser->visit('/cfti5UpdateEE');
            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
            $browser->click("a#closeD");
            $browser->screenshot("CFTI5TheWeb_cfti5UpdateEElastExecution" .date('m-d-Y_hia'));
            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE' .date('m-d-Y_hia'));
            //dump($browser->waitFor("#OutputResultData", 250)->value("#OutputResultData")); //se il dato è inizializzato lo prende
            //1) Tests\Browser\CFTI5TheWebTest::testGenerateNewCacheEE_cfti5UpdateEE
            //Facebook\WebDriver\Exception\TimeoutException: Waited 250 seconds for selector [#OutputResultData].

            //* Wait until the given script returns true. * GLI FAI CONTROLLARE CHE  document.getElementById("OutputResultData").innerText o .value != empty
            // $browser->waitUntil()
            $browser->assertDisabled("#access");

        });
    }
}
