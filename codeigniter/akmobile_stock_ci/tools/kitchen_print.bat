@echo off
REM @param 1 ReceiptHeaderUnique


cd C:\akamaipos\htdocs\app
REM NOT WORKING -- php index.php pos/Kitchen_print_cron kitchen_print_cronjob_process
curl http://akpos/app/pos/Kitchen_print_cron

pause