TODO->FUTURE->>PUOI DECIDERE QUALE KEY RINNOVARE IN FUTURO
redis-cli keys "*"
REDIS-CLI MONITOR
REDIS-CLI FLUSHALL
https://chartio.com/resources/tutorials/how-to-get-all-keys-in-redis/#retrieving-all-existing-keys

https://stackoverflow.com/questions/5252099/redis-command-to-get-all-available-keys
https://github.com/sripathikrishnan/redis-rdb-tools
Redis Cheat Sheet
http://lzone.de/cheat-sheet/Redis

TODO>futuro POSSIBILE IMPLEMENTARE UN selettore di chiave da far scadere
127.0.0.1:6379> SELECT 1
OK
127.0.0.1:6379[1]> KEYS *
 1) "laravel_database_laravel_cache_:OtherFilesServiceList_KML@i_quake_b.txt"
 2) "laravel_database_laravel_cache_:OtherFilesServiceList_KML@locality_b.txt"
 3) "laravel_database_laravel_cache_:BiblioEEListServiceForever"
 4) "laravel_database_laravel_cache_:EEListServiceForever"
 5) "laravel_database_laravel_cache_:OtherFilesServiceList_listapdfT.txt"
 6) "laravel_database_laravel_cache_:OtherFilesServiceList_KML@locality_a.txt"
 7) "laravel_database_laravel_cache_:JSONFileIndexEEdataFullCached"
 8) "laravel_database_laravel_cache_:QuakesXMLForever"
 9) "laravel_database_laravel_cache_:OtherFilesServiceList_EE_classif.txt"
10) "laravel_database_laravel_cache_:OtherFilesServiceList_KML@i_quake_a.txt"
11) "laravel_database_laravel_cache_:LocListForever"
12) "laravel_database_laravel_cache_:OtherFilesServiceList_listapdfR.txt"
127.0.0.1:6379[1]> DEL "laravel_database_laravel_cache_:OtherFilesServiceList_KML@locality_a.txt"
(integer) 1
127.0.0.1:6379[1]> DEL "laravel_database_laravel_cache_:OtherFilesServiceList_KML@locality_b.txt"
(integer) 1
127.0.0.1:6379[1]> get laravel_database_laravel_cache_:LocListForever
"s:4019500:\"<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n<Locs>\n  <Loc>\n    <nloc_cfti>080299.00</nloc_cfti>\n    
<desloc_cfti>Aarau</desloc_cfti>\n    <provlet/>\n    <nazione>Switzerland</nazione>\n    <risentimenti>2</risentimenti>\n    <ee>0</ee>\n    
<maxint>4</maxint>\n    <lat_wgs84>47.3913</lat_wgs84>\n    <lon_wgs84>8.0359</lon_wgs84>\n    <notesito/>\n  </Loc>\n  <Loc>\n    <nloc_cfti>028492.00</nloc_cfti>\n   
 <desloc_cfti>Abano Terme</desloc_cfti>\n    <provlet>PD</provlet>\n    <nazione>Italy</nazione>\n    <risentimenti>8</risentimenti>\n    <ee>0</ee>\n  
 <maxint>4.5</maxint>\n    <lat_wgs84>45.3603</lat_wgs84>\n    <lon_wgs84>11.7895</lon_wgs84>\n    <notesito/>\n  </Loc>\n  <Loc>\n    <nloc_cfti>072559.00</nloc_cfti>\n   
 <desloc_cfti>Abbadia Alpina</desloc_cfti>\n    <provlet>TO</provlet>\n    <nazione>Italy</nazione>\n    <risentimenti>2</risentimenti>\n    <ee>1</ee>\n    <maxint>7</maxint>\n    
 <lat_wgs84>44.8886</lat_wgs84>\n    <lon_wgs84>7.3068</lon_wgs84>\n    <notesito/>\n  </Loc>\n  <Loc>\n    <nloc_cfti>047520.00</nloc_cfti>\n    <desloc_cfti>Abbadia San Salvatore.............
 
 
SVUOTARE CACHE CLIENT E CHIAMARE PAGINA:
127.0.0.1:6379[1]> KEYS *
1) "laravel_database_laravel_cache_:OtherFilesServiceList_KML@i_quake_a.txt"
2) "laravel_database_laravel_cache_:LocListForever"
3) "laravel_database_laravel_cache_:OtherFilesServiceList_listapdfT.txt"
4) "laravel_database_laravel_cache_:JSONFileIndexEEdataFullCached"
5) "laravel_database_laravel_cache_:QuakesXMLForever"
6) "laravel_database_laravel_cache_:OtherFilesServiceList_listapdfR.txt"
7) "laravel_database_laravel_cache_:OtherFilesServiceList_EE_classif.txt"

CHIAMARE http://localhost/cfti5UpdateCacheDestroyAll  PER PULIRE LA CACHE SERVER:
VERIFICA:
127.0.0.1:6379[1]> KEYS *
(empty array)