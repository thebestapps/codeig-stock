@echo off
REM @param 1 LocationUnique reference in config_location table, field Unique.
REM Note: multiple location use - ex. 1-2 (Location 1 and 2).
REM @param 2 Date range any value Yesterday, value 1 Today . 
REM @param 3 UserUnique referenced in config_user_email table, field UserUnique.
REM @param 4 ConfigReportUnique referenced in config_report table, field Unique.
REM @param 5 Include when value 1 Category Sales Type and Payment Card Types.
cd C:\akamaipos\htdocs\app
php index.php reports/Daily_sales_cron cron_job_process/1-2-3-5/1/1/81/1

pause