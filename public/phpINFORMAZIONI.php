<?php

//GETTING PHP.INI LOCATION --

phpinfo();
/*Configuration File (php.ini) Path	/etc/php/8.1/cli
Loaded Configuration File	/etc/php/8.1/cli/php.ini*/

/*Create an user-defined php.ini to overrule default_charset directive
PHP supports user-defined php.ini files, in which you can overrule some php.ini settings. Neat!

Upload your user-defined php.ini to your webroot containing the following line:

default_charset = ""
*/
//Or simply run php artisan tinker in the terminal where the laravel project is and then run phpinfo() in same terminal.

//Then, look for Configuration File (php.ini) Path in the output of phpinfo().
