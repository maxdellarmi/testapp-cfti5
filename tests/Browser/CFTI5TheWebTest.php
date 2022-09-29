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
//            $browser->visit('/'); //welcome page laravel
//            dump($browser->driver->findElement(WebDriverBy::id("OutputResultData"))->getAttribute("value"));
//            $browser->storeConsoleLog('CFTI5TheWeb_testExample.txt'  .date('m-d-Y_hia'));
//            $browser->screenshot("testing" .date('m-d-Y_hia'));
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
//        OK FUNZIONA
        $this->browse(function (Browser $browser) {
            $browser->visit('/cfti5UpdateEE');
            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
            $browser->click("a#closeD");
            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE' .date('m-d-Y_hia'));
            $browser->assertDisabled("#access");
            $browser->waitUntilDisabled("#OutputResultData", 250);
            $browser->assertDisabled("#OutputResultData");
            $browser->screenshot("CFTI5TheWeb_cfti5UpdateEElastExecution" .date('m-d-Y_hia'));
        });

//        $this->browse(function (Browser $browser) {
//            $browser->visit('/cfti5UpdateEE');
//            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
//            $browser->click("a#closeD");
//            $browser->screenshot("CFTI5TheWeb_cfti5UpdateEElastExecution" .date('m-d-Y_hia'));
//            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE' .date('m-d-Y_hia'));
//            $browser->assertDisabled("#access");
//        });
    }
}
