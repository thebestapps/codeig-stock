To run batch scripts, must Enable postgres extensions in PHP COMMAND Line Version, 
otherwise get Driver Not Found Message

1. From command run php - v to check command line version
2. Go to PHP Directory for above version such as C:\wamp64\bin\php\php7.1.22 or C:\wamp64\bin\php\5.6
3. Edit php.ini and uncomment these extensions: php_pdo_pgsql.dll and extension=php_pgsql.dll
4. Restart Web Server
