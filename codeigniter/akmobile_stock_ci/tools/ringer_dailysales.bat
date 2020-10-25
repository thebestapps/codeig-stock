@echo off
REM Customer Daily Sales Report for Ringer
REM @param 1 Date range any, value 1 Today 2 yesterday. 
REM @param 2 UserUnique referenced in config_user_email table, field UserUnique.
REM @param 3 ConfigReportUnique referenced in config_report table, field Unique.
REM Only Tested for Ringer Daily Sales Report

cd C:\akamaipos\htdocs\app

php index.php reports/Daily_sales_cron ringer_hut_cron_job/2/1/82


pause;