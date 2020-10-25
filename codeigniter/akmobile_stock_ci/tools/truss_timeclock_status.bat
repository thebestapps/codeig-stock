@echo off
REM Param 1 UserUnique from config_user_email 
REM Param 2 from config_reports Unique
REM Note: This only works on the time clock details by employee report
cd C:\akamaipos\htdocs\app
php index.php backoffice/reports/time_clock_detail_by_employee/cron_job/0/77

pause