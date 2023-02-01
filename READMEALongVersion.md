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

***************************************************************************CONFIGURAZIONE PROGETTO ************************************************************************
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

********************************************GESTIONE AUTOMATION TEST LARAVEL DUSK E esecuzione CFTI5TheWebTest ***********************************************************************
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


*** AGGIUNGERE SAIL A UNA APPLICAZIONE GIA' ESISTENTE SU WINDOWS ***
**** OPPURE PROVARE COSI
https://laravel.com/docs/8.x/sail#installing-composer-dependencies-for-existing-projects
1) SU WINDOWS 10 ESEGUI IL COMANDO CHE CREA LA DIR VENDOR AL VOLO!!!!
al posto di pwd D:\INGV\testapp-cfti5\testapp-cfti5 ovvero la root dell'applicazione laravel scaricata
docker run --rm -v D:/INGV/testapp-cfti5/testapp-cfti5:/var/www/html  -w /var/www/html   laravelsail/php81-composer:latest  composer install --ignore-platform-reqs

2) dopo aver creato la dir vendor accedere alla distro ubunto almeno su pc wsl installarla almeno col comando wsl https://pureinfotech.com/install-wsl-windows-11/
wsl --install -d DISTRO-NAME 
3) entrare nella distro ubuntu e avvia ./vendor/bin/sail up oppure ./vendor/bin/sail up -d

4) per installare dusk e il chrome driver
./vendor/bin/sail php artisan dusk:install


My point was that I assumed the sail:install command would create the sail executable. So here you well need to use a second docker command to run artisan and install it. Using the sail tools wouldn't be possible to use directly

**************************GENERAZIONE VENDOR DIRECTORY COMPILAZIONE LARAVEL PRIMA VOLTA SU UN NUOVO SERVER ******************************
ESEGUI IN WSL UBUNTU con docker installato!!!  
Generazione vendor dir
-u "$(id -u):$(id -g)" \ admin:admin  $(pwd):/var/www/html vuole mappare dir locale dir sul server 
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs

ESECUZIONE SU WINDOWS generazione vendor dir	
docker run --rm -v C:/INGV/CFTI5:/var/www/html  -w /var/www/html   laravelsail/php81-composer:latest  composer install --ignore-platform-reqs

ESECUZIONE SU UNIX
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs
	
**************************************SOLO X DEVELOPMENT PURPOSE -VISUALIZZA I FILE IN SHARE e PERMETTE LA VISIBILITA ALLA RETE ESTERNA **************************************
QUESTA SEMPLICE MACCHINA VIRTUALE VISUALIZZA I FILE IN SHARE e PERMETTE LA VISIBILITA ALLA RETE ESTERNA
docker run -p 8000:8000 -it python:3.7-slim python3 -m http.server --bind 0.0.0.0	
*************************************** SOLO X DEVELOPMENT PURPOSE -VISUALIZZA I FILE IN SHARE e PERMETTE LA VISIBILITA ALLA RETE ESTERNA - *************************************

**********************************CERTIFICATI SELF-SIGNED in CHROME NON FANNO UTILIZZARE LA CACHE *******************************************************************************
It's a Chrome issue with certificates SSL self-signed . 
Chrome don't cache resources to self-signed certificates. Here's the bug explanation: https://bugs.chromium.org/p/chromium/issues/detail?id=103875
**********************************CERTIFICATI SELF-SIGNED in CHROME NON FANNO UTILIZZARE LA CACHE *******************************************************************************

***********************************AGGIORNAMENTO NGINX APPLICATION SERVER 01/2023 ***********************************************************************************************
Adattamento versione local a versione con NGIX -> operazioni effettuate:
******https://sam-ngu.medium.com/setting-up-nginx-and-php-fpm-in-laravel-sail-f7b3c85187ed****** (full article)
*****https://github.com/acadea/laravel-sail-nginx-php-fpm (docker files)********
1)sail artisan sail:publish per poter effettuare customizzazioni sulle macchine virtuali lui pubblicherà tutte le info alle macchine docker in una dir "docker" -> vedi foto
2.1) modifica docker-compose.yml e modifica .env
https://github.com/acadea/laravel-sail-nginx-php-fpm/blob/main/docker-compose.yml
https://github.com/acadea/laravel-sail-nginx-php-fpm/blob/main/.env.example
2.2) copy and paste the files from this repo e quindi la directory docker da aggiungere dentro quella che ci serve:
https://github.com/acadea/laravel-sail-nginx-php-fpm
2.3) Edit docker/nginx/sites/laravel.conf e controllare
#IMPORTANTE MAPPARE CON LA DIRECTORY ROOT PUBLIC DELL APP LARAVEL
#IMPORTANTE MAPPARE CON 0.0.0.0 laravel.dev.local o qualsiasi altro nome dominio sul file hosts
server_name laravel.dev.local;
#root /var/www/laravel/current/public;
#IMPORTANTE MAPPARE CON LA DIRECTORY ROOT PUBLIC DELL APP LARAVEL
root /var/www/html/public;
index index.php index.html index.htm;
#commentato per lasciare libera l'applicazione e non forzare conversioni
#charset utf-8;
2.4) NGIX: We should put our SSL certificates in the ssl folder. I wrote a helper bash script generate-keys.sh to generate a self-signed SSL certificate for you.
max@DESKTOP-PBV1AKQ:/mnt/f/WORK/APPTEST-CFTI5Copia/laravel-dev/docker/nginx/ssl$ ./generate-keys.sh
Generating RSA private key, 2048 bit long modulus
...........................................................................+++++
..........+++++
e is 65537 (0x010001)
Signature ok
subject=CN = default, O = default, C = UK
Getting Private key
2.5) mappare laravel.dev.local sul file host della macchina con 0.0.0.0
2.6)
env
# Point to where the `APP_CODE_PATH_HOST` should be in the container
#APP_CODE_PATH_CONTAINER=/var/www/laravel/current
#IMPORTANTE PER MANTENERE la legacy col progetto PHP base senza NGIX solo con PHPartisan
APP_CODE_PATH_CONTAINER=/var/www/html
3) alla fine lanciare ./vendor/bin/sail up -d ed effettuerà il build di tutto!
*********OPERAZIONI EFFETTUATE DOPO L'AGGIUNTA NGIX**********

a) Rimozioni e disabilitazione SESSION COOKIE e laravel_session per permettere il caching di ngix e rimozione csfr_token
https://www.nginx.com/blog/nginx-caching-guide/ ->
[...]It also doesn’t cache responses with the Set-Cookie header [...]
b) SESSION_DRIVER array
c) parametri env aggiunti per NGIX
d) servizio artisan laravel commentato aggiunte macchine virtuali NGINX e PHP-FPM. Aggiunto laravel-horizon [non usato attualmente]
e) fix delle locality,js sezione click incona a sinistra e icona a destra della tabella
f) CHROME in https con i certificati locali NON gestisce la cache - Soluzione: usare FIREFOX per testing. [Chrome don't cache resources to self-signed certificates. Here's the bug explanation: https://bugs.chromium.org/p/chromium/issues/detail?id=103875]


NB. Gestione selenium e rigenerazione processo caching da RITESTARE
******************************************************************************************************
https://stillat.com/blog/2016/12/07/laravel-artisan-route-command-the-routelist-command


php artisan route:list
It will generate a table similar to the following output (the exact table entries will depend on the registered routes).

The registered routes

GET|HEAD   / .............................................................................................................................................................................................................................
GET|HEAD   BiblioEEList_Service ...................................................................................................................................................................... PhotoController@serviceBiblioEEList
GET|HEAD   EEListService ................................................................................................................................................................................... PhotoController@serviceEEList
GET|HEAD   EEList_MEDService ........................................................................................................................................................................... PhotoController@serviceEEList_MED
GET|HEAD   OtherFilesService/{filename} ..................................................................................................................................................................................................
POST       _ignition/execute-solution ...................................................................................................................... ignition.executeSolution › Spatie\LaravelIgnition › ExecuteSolutionController
GET|HEAD   _ignition/health-check .................................................................................................................................. ignition.healthCheck › Spatie\LaravelIgnition › HealthCheckController
POST       _ignition/update-config ............................................................................................................................... ignition.updateConfig › Spatie\LaravelIgnition › UpdateConfigController
GET|HEAD   api/user ......................................................................................................................................................................................................................
GET|HEAD   cfti5 .........................................................................................................................................................................................................................
GET|HEAD   cfti5CS .......................................................................................................................................................................................................................
GET|HEAD   cfti5UpdateCacheDestroyAll ....................................................................................................................................................................................................
GET|HEAD   cfti5UpdateEE .................................................................................................................................................................................................................
GET|HEAD   dss/css ............................................................................................................................................................................................ PhotoController@loadDssCSS
GET|HEAD   dss/iss ............................................................................................................................................................................................ PhotoController@loadDssISS
GET|HEAD   dss/subd .......................................................................................................................................................................................... PhotoController@loadDssSUBD
GET|HEAD   indexQuakesXML ................................................................................................................................................................................. PhotoController@indexQuakesXML
GET|HEAD   indexV3LocFull2 ...............................................................................................................................................................................................................
GET|HEAD   indexV3LocFull3 ...............................................................................................................................................................................................................
GET|HEAD   loadGeoJSONDataFromCache ............................................................................................................................................................. PhotoController@loadGeoJSONDataFromCache
GET|HEAD   loadJSONIndexEEdataFullCached ................................................................................................................................................... PhotoController@loadJSONIndexEEdataFullCached
GET|HEAD   loadJSONIndexEEdataFullCachedZIP ............................................................................................................................................. PhotoController@loadJSONIndexEEdataFullCachedZIP
GET|HEAD   loadQuakesDataFromCache ............................................................................................................................................................... PhotoController@loadQuakesDataFromCache
GET|HEAD   locality.php ............................................................................................................................................................................ PhotoController@singleLocalityLoading
GET|HEAD   localitySourcesXMLService/{nterrId} ...........................................................................................................................................................................................
GET|HEAD   localityXML .................................................................................................................................................................................. PhotoController@indexLocalityXML
GET|HEAD   photo ................................................................................................................................................................................................... PhotoController@index
GET|HEAD   photoLoadXML ..................................................................................................................................................................................... PhotoController@indexLoadXML
GET|HEAD   photoLoadXML2 ............................................................................................................................................................................ PhotoController@indexLocalityLoadXML
GET|HEAD   quake.php .................................................................................................................................................................................. PhotoController@singleQuakeLoading
GET|HEAD   quakeSourcesXMLService/{nterrId} ..............................................................................................................................................................................................
GET|HEAD   sanctum/csrf-cookie ......................................................................................................................................... sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show
POST       saveJSONFile ..................................................................................................................................................................................... PhotoController@saveJSONFile
POST       saveQuakesData ................................................................................................................................................................................. PhotoController@saveQuakesData
POST       saveQuakesGeoJSONData ................................................................................................................................................................... PhotoController@saveQuakesGeoJSONData
POST       test ................................................................................................................................................................................................. PhotoController@saveJson

php artisan clear-compiled PULISCE il CONTROLLER FORZANDO LAST VERSION

php artisan route:clear PULISCE la cache route

php artisan route:cache  (la ricrea)

https://stackoverflow.com/questions/47904156/is-there-some-sort-of-laravel-controller-cache
.......................
Se non fosse sufficiente
composer dump-autoload
and
php artisan route:cache 



ErrorException: copy(/var/www/html/storage/app/public/IndexEEdataFullCached.json): Failed to open stream: Permission denied

controllare con che diritti è stato creato il file in caso contrario ricrearlo con la cache con i diritti corretti.