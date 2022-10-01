DEVI ESSERE IN WSL PER ESEGUIRE I COMANDI
https://dev.to/sourcegraph/creating-a-new-laravel-application-with-sail-and-docker-no-php-required-4c2n
CREATE NEW APPLICATION WITH LARAVEL
1. Create a new Laravel application with the official builder script
The demo application is a blog-like application that pulls content from a user's profile at DEV. We'll call it laravel-dev.

https://laravel.build/[NOMEAPPLICAZIONE] | bash
The next command will download the builder script from an official Laravel site and run it using bash.
curl -s https://laravel.build/laravel-dev | bash
This operation may take a few minutes the first time you run the installer, since it will download a suitable PHP image to execute Composer and install the application dependencies using Docker.

**********************************************NB LA PRIMA VOLTA MI AVEVA SALTATO IL PASSAGGIO **************************************************
PASSW SU ROOT WSL WINDOWS NECESSARIA



Before finishing, the installation script will ask you to confirm your sudo password in order to set the correct permissions on the application directories:
Application ready! Build something amazing.
Sail scaffolding installed successfully.

Please provide your password so we can make some final adjustments to your application's permissions.

[sudo] password for erika: 

Thank you! We hope you build something incredible. Dive in with: cd laravel-dev-blog && ./vendor/bin/sail up
You can now explore the files in your freshly installed Laravel application.
cd laravel-dev-blog/
ls
The artisan script, located at the root of the application folder, is an important tool that you can use to generate boilerplate code, manipulate the database, run jobs and queues, among other things.

Following, a list with the relevant directories within a freshly installed Laravel application:
.
├── app/ # models, controllers, and app-specific logic
├── bootstrap/
├── config/ # configuration files
├── database/ # database-related classes and scripts
├── public/ # the document root for the application
├── resources/ # front end resources that aren't public: views, base CSS and JS 
├── routes/ # where the application routes are defined
├── storage/ # file uploads, cache, and logs are stored here
├── tests/ #application tests

2. Running sail up
With the files in place, you can now bring your development environment up with the following command:
sail up
This will run your development environment in foreground mode, which allows you to see container logs in real time, but it will block your terminal. To stop the execution and save the state of containers, you can hit CTRL+C.

To run the environment in background mode (detached), include -d as an argument to the previous command:
sail up -d
Whether you choose to run your environment in foreground or background mode, your new Laravel application should now be available at http://localhost. Open this URL on your browser and you'll see a page like this:

ESEMPIO:
UTILIZZARE IL CMDLINER
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/sail-1.14.9/sail-1.14.9$ cd example-app/
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/sail-1.14.9/sail-1.14.9/example-app$ dir
app      artisandebug    bootstrap      composer.lock  database  docker-compose.yml  logdiTest.txt  phpunit.xml  README.md  routes   tests   vendor.7z
artisan  BK24092022.env  composer.json  config         docker    lang                package.json   public       resources  storage  vendor  webpack.mix.js
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/sail-1.14.9/sail-1.14.9/example-app$ ./vendor/bin/sail build --no-cache
example-app-laravel.test-1   "start-container"   laravel.test        exited (0)
Shutting down old Sail processes...

ALLA FINE

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/sail-1.14.9/sail-1.14.9/example-app$ dir
app      artisandebug    bootstrap      composer.lock  database  docker-compose.yml  logdiTest.txt  phpunit.xml  README.md  routes   tests   vendor.7z
artisan  BK24092022.env  composer.json  config         docker    lang                package.json   public       resources  storage  vendor  webpack.mix.js
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/sail-1.14.9/sail-1.14.9/example-app$ ./vendor/bin/sail up

PER AGGIUNGERE DIPENDENZE
./vendor/bin/sail composer require ext-simplexml
./vendor/bin/sail composer require ext-simplexml

Executing Composer Commands
Composer commands may be executed using the composer command. Laravel Sail's application container includes a Composer 2.x installation:

sail composer require laravel/sanctum

Sail quick reference
The following list contains a short reference on the main Sail commands:

Command	Description
sail up	Brings the Docker environment up.
sail down	Brings the Docker environment down and remove associated containers, storage, and network.
sail start	Starts an environment that was previously stopped with sail stop.
sail stop	Stops an environment that is currently running, saving the state of containers and services.
sail artisan	Runs the artisan tool on the application container.
sail php	Runs a PHP script on the application container.


1)NEL COMPOSER CI SONO 3 LIBRERIE IN PIU POI COMPOSER AGGIUNGERE LE DIPENDENZE COL COMANDO SOTTO
"ext-simplexml": "*",
"ext-libxml": "*"
"laravel/dusk": "^7.1",

./vendor/bin/sail composer require ext-simplexml
./vendor/bin/sail composer require ext-libxml
./vendor/bin/sail composer require --dev laravel/dusk
per installare dusk e il chrome driver
./vendor/bin/sail php artisan dusk:install

2)FILE .ENV a mano
SAIL_XDEBUG_MODE=develop,debug
SAIL_XDEBUG_CONFIG=

APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:zzXLmMVFQNnQrGvgwl8F0hjNktCLkn6I8D+8743q4rg=
APP_DEBUG=true

DUSK_DRIVER_URL='http://selenium:4444'
APP_URL="http://laravel.test:80"

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=example_app
DB_USERNAME=sail
DB_PASSWORD=password

MEMCACHED_HOST=memcached

REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

SCOUT_DRIVER=meilisearch
MEILISEARCH_HOST=http://meilisearch:7700

FORWARD_DB_PORT=
FORWARD_REDIS_PORT=
FORWARD_MEILISEARCH_PORT=
FORWARD_MAILHOG_PORT=
FORWARD_MAILHOG_DASHBOARD_PORT=

3)COPIA TT LA DIRECTORY EXAMPLE-APP SENZA VENDOR E I FILE INTERNI

4) il file  Config/app.php ha questa differenza mentre prima bastava solamente creare le prime 3 righe e vanno ripristinate
   TODO RIPRISTINA E ELIMINA SOTTO
    'aliases' => Facade::defaultAliases()->merge([
        // 'ExampleClass' => App\Example\ExampleClass::class,
    ])->toArray(),
# testapp-cfti5

Altri documentazione all'interno del file:
https://docs.google.com/document/d/1c3haZ5jVguTPTm__dZIVGgwjZIZTZAKQx8SB_UPVjW0/edit

5) Gestione middleware caching e Gzip dell'output controller / Getting response output with callback to an url with guzzleHttp
https://link.medium.com/W7rZUCYHFtb
https://link.medium.com/IARdzvjIFtb
https://www.itsolutionstuff.com/post/laravel-9-guzzle-http-request-exampleexample.html

6) GESTIONE AUTOMATION TEST LARAVEL DUSK 
https://stackoverflow.com/questions/65569147/laravel-sail-dusk-selenium-connection-refused

TODO ESPONI LA PORTA 4444 di SELENIUM
selenium:
	image: 'selenium/standalone-chrome'
	volumes:
		- '/dev/shm:/dev/shm'
	ports:
		- '4444:4444'
	networks:
		- sail

I switched to http://selenium:4444 and the tests worked perfectly!

Here are my new code:

<?php

namespace Tests;

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Laravel\Dusk\TestCase as BaseTestCase;

abstract class DuskTestCase extends BaseTestCase {
    use CreatesApplication;

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     * @return void
     */
    public static function prepare() {
        if (!static::runningInSail()) {
            static::startChromeDriver();
        }
    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver() {
        $options = (new ChromeOptions)->addArguments([
            '--disable-gpu',
            '--headless',
            '--no-sandbox',
            '--window-size=1920,1080',
        ]);

        return RemoteWebDriver::create(
            'http://selenium:4444/wd/hub', DesiredCapabilities::chrome()->setCapability(
            ChromeOptions::CAPABILITY, $options
        )->setCapability('acceptInsecureCerts', TRUE)
        );
    }
}
I hope I can help someone with the same problem!

2

The WebDriver used by Dusk is looking for the selenium docker image on port 4444.

be sure to add to the .env file:

DUSK_DRIVER_URL='http://selenium:4444'
and an APP_URL that targets a local host on port 80:

APP_URL="http://laravel.test:80"

./vendor/bin/sail php artisan dusk --filter testSomeFeature (LANCIA TEST SPECIFICO) 
*****************************************************************************************************************************
./vendor/bin/sail php artisan dusk --filter CFTI5TheWebTest
PHPUnit 9.5.25 #StandWithUkraine

.                                                                   1 / 1 (100%)

Time: 01:16.015, Memory: 31.27 MB

OK (1 test, 2 assertions)
*****************************************************************************************************************************
./vendor/bin/sail php artisan dusk --filter ExampleTest
PHPUnit 9.5.25 #StandWithUkraine

.                                                                   1 / 1 (100%)

Time: 00:14.876, Memory: 22.00 MB
https://www.oulub.com/docs/laravel/it-it/dusk

./vendor/bin/sail php artisan dusk --filter CFTI5TheWebTest --log-junit outputProcess.log
