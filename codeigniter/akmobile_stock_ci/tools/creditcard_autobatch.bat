@echo off

REM Step 1: Requires PHP Command Line Configuration to work, see readme.txt in app/tools folder
REM Step 2: Copy this file into directory C:\akamaipos\CreditCardAutoBatch
REM Step 3: Make sure config_location_settings AutoBatchMinutes = 1440 (24 Hours) --> Safeguard to require user to batch in case Auto Batch not working
REM Step 4: Modify Below Parameters Accordingly
REM Step 5: Use Task Scheduler to run batch file in new location

REM NOTE: Do NOT use/modify batch file in default app/tools folder or use with Task Scheduler, otherwise changes can be lost in future update and batching will no longer work

set logfile=C:\akamaipos\CreditCardAutoBatch\credit_card_auto_batch_log.txt
echo. >>%logfile%
echo Credit Card Auto Batch at %date% %time% >>%logfile%

REM Make sure valid directory, default app	
	cd C:\akamaipos\htdocs\app

REM Batch Fle Parameters starting after autobatch/
	REM Param 1 UserUnique -->  Valid user in config_user and config_user_email, needs valid email settings, default UserUnique 0 or 1, 
	REM Param 2 Credit Card PaymentUnique -- from config_payments on credit card device such as VX805 - default 2
	REM Param 3 StationNumber - default 1
	REM Param 4 Email to send if 0 then no Email sent
	REM Param 5 EmailCC if 0 no CC email sent
	REM Param 6 Company name that will show in Email Subject Line --> Change  from *** akamaipos *** to Company Name
	REM IF PHP Error, please check for valid php command line configuration, valid UserUnique, valid user email settings and valid PaymentUnique

	php index.php pos/pointofsale/credit-card/auto-batch/0/2/1/support@akamaipos.com/0/akamaipos >>%logfile%

echo. >>%logfile%

timeout /t 30
