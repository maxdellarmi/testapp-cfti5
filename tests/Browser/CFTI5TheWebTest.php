<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Log;
use Laravel\Dusk\Browser;
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
//            $browser->visit('/cfti5');
//            $browser->waitForDialog(120);
//            $browser->storeConsoleLog('CFTI5TheWeb_testExample.txt');
//
//                    //->assertSee('Laravel');
//        });
//    }

    public function testGenerateNewCacheEE_cfti5UpdateEE()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/cfti5UpdateEE');
            $browser->waitUntilDisabled("#access", 250); //LA DROPDOWN VIENE DISABILITATA ALLA FINE DELL'ESECUZIONE.
            //<div id="OutpuFileName" class="URLdiv"><input type="hidden" value="" id="OutputResultData"></div>
            //$browser->driver->findElement()
            $browser->storeConsoleLog('CFTI5TheWeb_cfti5UpdateEE.txt');
            $browser->assertDisabled("#access");
            //TODO:CERCARE UN ASSERT BUONO
            // assertTrue(str_contains($browser->inputValue( "#OutputResultData"), "COMPLETED") );
            //->assertSee('Laravel');
        });
    }
}
