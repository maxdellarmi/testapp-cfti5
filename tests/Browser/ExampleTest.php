<?php

namespace Tests\Browser;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ExampleTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/');
            $valore = $browser->value("#OutputResultData");
            $browser->assertSee('Laravel');
            $this->setResult($valore);
        });
        var_dump($this->getResult());
    }
}
