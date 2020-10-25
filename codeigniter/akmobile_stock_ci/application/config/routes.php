<?php
defined('BASEPATH') or exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
 */
$route['default_controller'] = 'login';
$route['404_override'] = '';
$route['translate_uri_dashes'] = false;

//login url
$route['akamaipos'] = "login/login";

$route['pos'] = "Login/login";
//$route['pos/quick-login/(:any)'] = "backoffice/Backoffice/quick_login/$1"; //commented by HD 11-07-16

$route['pos/quick-login/(:any)'] = "Login/quick_login/$1";

$route['pos/session-check'] = "CheckSession/check_session";

//$route['backoffice'] = "backoffice/Backoffice/login"; //commented by HD 11-07-16
$route['backoffice'] = "Login/login";
$route['backoffice/Backoffice/select/station/setting'] = "Login/station_setting";
$route['developer'] = "Login/login_developer";

//$route['backoffice/quick-login/(:any)'] = "backoffice/Backoffice/quick_login/$1"; //commented by HD 11-07-16
$route['backoffice/quick-login/(:any)'] = "Login/quick_login/$1";
//$route['backoffice/customer-screen/login/(:any)'] = "backoffice/Backoffice/customer_screen_login/$1"; //commented by HD 11-07-16
$route['backoffice/customer-screen/login/(:any)'] = "Login/customer_screen_login/$1";
$route['pos/customer-screen/login/(:any)'] = "Login/customer_screen_login/$1";

//back logon page -- cm
$route['backoffice/quick-login-back/(:any)'] = "Login/quick_login_back/$1";
$route['backoffice/dashboard_back'] = "backoffice/Backoffice/dashboard_back";

//pos login page, load station list
$route['backoffice/load_station'] = "Login/load_station";

//logout url
//$route['pos/logout'] = "backoffice/Backoffice/logout";commented by HD 11-07-16
$route['pos/logout'] = "Login/logout";
$route['backoffice/logout'] = "Login/logout";

//backoffice dashboard
$route['backoffice/dashboard'] = "backoffice/Backoffice/dashboard_main";
$route['pos/dashboard'] = "backoffice/Backoffice/dashboard_main";  //used by cashier back office button
$route['backoffice/list'] = "backoffice_list/List_current/view";
//-->Security Passcode by HD
$route['backoffice/dashboard/check-user-manager'] = "backoffice/Backoffice/check_user_manager";
$route['backoffice/dashboard/passcode'] = "backoffice/Backoffice/checkpasscode";

$route['backoffice/cache/data'] = "backoffice/Backoffice/cache_data";


//backoffice customer grid -- old
$route['backoffice/customer'] = "backoffice/Backoffice/customer"; //original by hd
$route['backoffice/load_customer'] = "backoffice/Backoffice/load_customer"; //original by hd

// backoffice customer --> new update delete -- no longer used
$route['backoffice/add_customer_info'] = "backoffice/Backoffice/add_customer_info";
$route['backoffice/update_customer_info'] = "backoffice/Backoffice/update_customer_info";
$route['backoffice/customerdelete'] = "backoffice/Backoffice/customerdelete";
$route['backoffice/customer'] = "admin/Customer"; //new by ch

//Customer Module by KC 4/18
$route['backoffice/customer/echo'] = "backoffice/Customer/customer_echo";
$route['backoffice/customer/index'] = "backoffice/Customer/customer_view";
$route['backoffice/customer/select'] = "backoffice/Customer/customer_select";
$route['backoffice/customer/purchase'] = "backoffice/Customer/purchase";

$route['backoffice/customer/store_item'] = "backoffice/Customer/store_item";

$route['backoffice/customer/update_item'] = "backoffice/Customer/update_item";
$route['backoffice/customer/delete_item'] = "backoffice/Customer/delete_row";

//backoffice supplier grid
$route['backoffice/supplier'] = "backoffice/Backoffice/supplier_list_view";
$route['backoffice/load_supplier'] = "backoffice/Backoffice/load_supplier";

//backoffice supplier --> new update delete
$route['backoffice/add_supplier_info'] = "backoffice/Backoffice/add_supplier_info";
$route['backoffice/update_supplier_info'] = "backoffice/Backoffice/update_supplier_info";
$route['backoffice/supplierdelete'] = "backoffice/Backoffice/supplierdelete";

//backoffice brand grid
$route['backoffice/brand'] = "backoffice/Backoffice/brand";
$route['backoffice/load_brand'] = "backoffice/Backoffice/load_brand";

//backoffice brand --> new update delete
$route['backoffice/add_brand'] = "backoffice/Backoffice/add_brand";
$route['backoffice/update_brand'] = "backoffice/Backoffice/update_brand";
$route['backoffice/branddelete'] = "backoffice/Backoffice/branddelete";

//back office category
$route['backoffice/category'] = "backoffice/Backoffice_category/category_page";
//$route['backoffice/category/test'] = "backoffice/Backoffice_category/category_test_page";

//back office main category -> add edit delete
$route['backoffice/category/add/form'] = "backoffice/Backoffice_category/include_add_form";
$route['backoffice/category/edit/form'] = "backoffice/Backoffice_category/include_edit_form";
$route['backoffice/category/delete/form'] = "backoffice/Backoffice_category/include_delete_form";

//back office subcategory -> add edit delete
$route['backoffice/sub/category/add/form'] = "backoffice/Backoffice_category/include_add_subcat_form";
$route['backoffice/sub/category/edit/form'] = "backoffice/Backoffice_category/include_edit_subcat_form";
$route['backoffice/sub/category/delete/form'] = "backoffice/Backoffice_category/include_delete_subcat_form";

//backoffice inventory grid --> original inventory hd
$route['backoffice/inventory'] = "backoffice/Backoffice/inventory";

//backoffice inventory dashboard --> akback2
$route['backoffice_inventory/dashboard'] = "backoffice_inventory/Backoffice_inventory/dashboard_main";
$route['backoffice_inventory/gridData'] = "backoffice_inventory/Backoffice_inventory/gridData";

//backoffice barcode --> akback2
$route['backoffice_inventory/barcode'] = "backoffice_inventory/Backoffice_inventory/print_barcode_view";
$route['backoffice/barcode'] = "backoffice_inventory/Backoffice_inventory/print_barcode_view";

//backoffice barcode -- new 20180119
$route['barcodes/print'] = "backoffice_inventory/Barcodes/print_barcode";
$route['barcodes/download'] = "backoffice_inventory/Barcodes/download";

//backoffice inventory --> akback2
$route['backoffice_inventory/inventory'] = "backoffice_inventory/Backoffice_inventory/inventory_view";
$route['backoffice_inventory/edit_supplier'] = "backoffice_inventory/Backoffice_inventory/edit_supplier";
$route['backoffice_inventory/maincat'] = "backoffice_inventory/Backoffice_inventory/maincat";
$route['backoffice_inventory/load_stores'] = "backoffice_inventory/Backoffice_inventory/load_stores";
$route['backoffice_inventory/edit_brand'] = "backoffice_inventory/Backoffice_inventory/edit_brand";
$route['backoffice_inventory/load_stores_stock'] = "backoffice_inventory/Backoffice_inventory/load_stores_stock";
$route['backoffice_inventory/load_inventory/(:any)'] = "backoffice_inventory/Backoffice_inventory/load_inventory/$1";

//backoffice invenotry --> original hd
$route['backoffice/edit_supplier'] = "backoffice/Backoffice/edit_supplier";
$route['backoffice/maincat'] = "backoffice/Backoffice/maincat";
$route['backoffice/load_stores'] = "backoffice/Backoffice/load_stores";
$route['backoffice/edit_brand'] = "backoffice/Backoffice/edit_brand";
$route['backoffice/load_stores_stock'] = "backoffice/Backoffice/load_stores_stock";
$route['backoffice/load_stores'] = "backoffice/Backoffice/load_stores";
$route['backoffice/load_inventory/(:any)'] = "backoffice/Backoffice/load_inventory/$1";

//backoffice inventory new --> akback2
$route['backoffice_inventory/save_item'] = "backoffice_inventory/Backoffice_inventory/save_item";
$route['backoffice_inventory/load_tax'] = "backoffice_inventory/Backoffice_inventory/load_tax";
$route['backoffice_inventory/subcat'] = "backoffice_inventory/Backoffice_inventory/subcat";

//backoffice inventry new --> original hd
$route['backoffice/save_item'] = "backoffice/Backoffice/save_item";
$route['backoffice/load_tax'] = "backoffice/Backoffice/load_tax";
$route['backoffice/subcat'] = "backoffice/Backoffice/subcat";

//backoffice inventory update --> akback2
$route['backoffice_inventory/update_inventory_item'] = "backoffice_inventory/Backoffice_inventory/update_inventory_item";
$route['backoffice_inventory/load_item_stock_line/(:any)/(:any)'] = "backoffice_inventory/Backoffice_inventory/load_item_stock_line/$1/$2";
$route['backoffice_inventory/load_barcode'] = "backoffice_inventory/Backoffice_inventory/load_barcode";
$route['backoffice_inventory/gettaxval'] = "backoffice_inventory/Backoffice_inventory/gettaxval";

//backoffice inventory update --> original hd
$route['backoffice/update_inventory_item'] = "backoffice/Backoffice/update_inventory_item";
$route['backoffice/load_item_stock_line/(:any)/(:any)'] = "backoffice/Backoffice/load_item_stock_line/$1/$2";
$route['backoffice/load_barcode'] = "backoffice/Backoffice/load_barcode";
$route['backoffice/gettaxval'] = "backoffice/Backoffice/gettaxval";

//backoffice inventory update --> stock adjust --> akback2
$route['backoffice_inventory/adj_select_location/(:any)/(:any)'] = "backoffice_inventory/Backoffice_inventory/adj_select_location/$1/$2";  //load stock level tab
$route['backoffice_inventory/total_adjustqty'] = "backoffice_inventory/Backoffice_inventory/total_adjustqty";   //stock adjustment button
$route['backoffice_inventory/save_new_stockqty'] = "backoffice_inventory/Backoffice_inventory/save_new_stockqty";  //save new stock adjustment

//backoffice inventory update -> stock adjustment tab --> original hd
$route['backoffice/adj_select_location/(:any)/(:any)'] = "backoffice/Backoffice/adj_select_location/$1/$2";  //load stock level tab
$route['backoffice/total_adjustqty'] = "backoffice/Backoffice/total_adjustqty";			//stock adjustment button
$route['backoffice/save_new_stockqty'] = "backoffice/Backoffice/save_new_stockqty";		//save new stock adjustment

//backoffice inventory update --> barcode tab --> akback2
$route['backoffice_inventory/addbarcode'] = "backoffice_inventory/Backoffice_inventory/addbarcode";    //add barcode button
$route['backoffice_inventory/editbarcode'] = "backoffice_inventory/Backoffice_inventory/editbarcode";    //update barcode button
$route['backoffice_inventory/deletebarcode'] = "backoffice_inventory/Backoffice_inventory/deletebarcode";   //delete barcode button

//backoffice inventory update -> barcode tab --> original hd
$route['backoffice/addbarcode'] = "backoffice/Backoffice/addbarcode";				//add barcode button
$route['backoffice/editbarcode'] = "backoffice/Backoffice/editbarcode";				//update barcode button
$route['backoffice/deletebarcode'] = "backoffice/Backoffice/deletebarcode";			//delete barcode button

//backoffice inventory delete --> akback2
$route['backoffice_inventory/itemdelete'] = "backoffice_inventory/Backoffice_inventory/itemdelete";
$route['backoffice_inventory/itemrestore'] = "backoffice_inventory/Backoffice_inventory/itemrestore";

//backoffice inventry delete --> original hd
$route['backoffice/itemdelete'] = "backoffice/Backoffice/itemdelete";
$route['backoffice/itemrestore'] = "backoffice/Backoffice/itemrestore";

//backoffice inventory item load data --> akback2
$route['backoffice_inventory/inventory/load-config-category'] = "backoffice_inventory/Backoffice_inventory/load_config_category";
$route['backoffice_inventory/inventory/load-config-station-printers'] = "backoffice_inventory/Backoffice_inventory/load_config_station_printers";
$route['backoffice_inventory/inventory/load-item-menu-list'] = "backoffice_inventory/Backoffice_inventory/load_item_menu_list";
$route['backoffice_inventory/inventory/add-item-menu-category'] = "backoffice_inventory/Backoffice_inventory/add_item_menu_category";
$route['backoffice_inventory/inventory/delete-category-item-menu'] = "backoffice_inventory/Backoffice_inventory/delete_category_item_menu";
$route['backoffice_inventory/inventory/load-item-printer'] = "backoffice_inventory/Backoffice_inventory/load_item_printer";
$route['backoffice_inventory/inventory/add-item-printer'] = "backoffice_inventory/Backoffice_inventory/add_item_printer";
$route['backoffice_inventory/inventory/delete-printer-item-menu'] = "backoffice_inventory/Backoffice_inventory/delete_printer_item_menu";
$route['backoffice_inventory/inventory/load-item-question'] = "backoffice_inventory/Backoffice_inventory/load_item_question";
$route['backoffice_inventory/inventory/add-item-option'] = "backoffice_inventory/Backoffice_inventory/add_item_option";
$route['backoffice_inventory/inventory/delete-option-item-menu'] = "backoffice_inventory/Backoffice_inventory/delete_option_item_menu";

//backoffice inventory Item load data --> original hd
$route['backoffice/inventory/load-config-category'] = "backoffice/Backoffice/load_config_category";
$route['backoffice/inventory/load-config-station-printers'] = "backoffice/Backoffice/load_config_station_printers";
$route['backoffice/process-item-category'] = "backoffice/Backoffice/process_item_category";
$route['backoffice/process-item-category-printer'] = "backoffice/Backoffice/process_item_category_printer";
$route['backoffice/inventory/load-item-menu-list'] = "backoffice/Backoffice/load_item_menu_list";
$route['backoffice/inventory/add-item-menu-category'] = "backoffice/Backoffice/add_item_menu_category";
$route['backoffice/inventory/delete-category-item-menu'] = "backoffice/Backoffice/delete_category_item_menu";
$route['backoffice/inventory/load-item-printer'] = "backoffice/Backoffice/load_item_printer";
$route['backoffice/inventory/add-item-printer'] = "backoffice/Backoffice/add_item_printer";
$route['backoffice/inventory/delete-printer-item-menu'] = "backoffice/Backoffice/delete_printer_item_menu";
$route['backoffice/inventory/load-item-question'] = "backoffice/Backoffice/load_item_question";
$route['backoffice/inventory/load-config_questions'] = "backoffice/Backoffice/load_config_questions";
$route['backoffice/inventory/add-item-option'] = "backoffice/Backoffice/add_item_option";
$route['backoffice/inventory/delete-option-item-menu'] = "backoffice/Backoffice/delete_option_item_menu";

$route['backoffice_inventory/grid/columns'] = "backoffice/Backoffice/grid_columns";

//back office receiving grid
$route['backoffice/receiving'] = "backoffice/Backoffice/receiving_page";

//back office receiving add
$route['backoffice/receiving/purchase-order/add/(:any)'] = "backoffice/Backoffice/receiving_po_add_page/$1";
//$route['backoffice/receiving/add-new'] = "backoffice/Backoffice/include_receiving_addnew";

//back office receiving edit
$route['backoffice/receiving/purchase-order/edit/(:any)'] = "backoffice/Backoffice/receiving_po_page/$1";
$route['backoffice/receiving/inventory'] = "backoffice/Backoffice/include_receiving_inventory";
$route['backoffice/receiving/poitemdel'] = "backoffice/Backoffice/include_podel_alert";
$route['backoffice/receiving/poiteminfo'] = "backoffice/Backoffice/include_po_item_info";

//back office time clock
//$route['backoffice/timeclock'] = "backoffice/Backoffice_timeclock/create_token";
//$route['backoffice/load-timeclock'] = "backoffice/Backoffice_timeclock/load_timeclock";
//$route['backoffice/timeclock/edit-time-clock'] = "backoffice/Backoffice_timeclock/include_edit_timeclock_page";
//$route['backoffice/timeclock/alert-message-info'] = "backoffice/Backoffice_timeclock/include_dialog_alert";
//$route['backoffice/timeclock/add-time-clock'] = "backoffice/Backoffice_timeclock/include_add_timeclock_page";
//$route['backoffice/timeclock/delete-time-clock'] = "backoffice/Backoffice_timeclock/include_delete_timeclock_page";
//$route['backoffice/timeclock'] = "backoffice/backoffice_timeclock/timeclock_page";
//$route['backoffice/timeclock/export'] = "backoffice/Backoffice_timeclock/excel_export";
//$route['backoffice/timeclock/download'] = "backoffice/Backoffice_timeclock/download_file";

//TimeClock --> v1 by KC
$route['backoffice/timeclock/echo'] = "backoffice/TimeClock/timeclock_echo";
$route['backoffice/timeclock/index'] = "backoffice/TimeClock/timeclock_view";
$route['backoffice/timeclock/select'] = "backoffice/TimeClock/timeclock_select";
$route['backoffice/timeclock/time_summary_select'] = "backoffice/TimeClock/time_summary_select";
$route['backoffice/timeclock/export'] = "backoffice/TimeClock/timeclock_export";
$route['backoffice/timeclock/export_summary'] = "backoffice/TimeClock/TimeClock_summary_export";
$route['backoffice/timeclock/download'] = "backoffice/TimeClock/timeclock_download";

//Backoffice --> v2 by JES
// $route['backoffice/timeclock/echo'] = "backoffice/Backoffice_timeclock/timeclock_echo";
$route['backoffice/newtimeclock/index'] 			= "backoffice/Backoffice_timeclock/timeclock_view";
$route['backoffice/newtimeclock/select'] 			= "backoffice/Backoffice_timeclock/timeclock_select";
$route['backoffice/newtimeclock/select_row'] 		= "backoffice/Backoffice_timeclock/select_row";
$route['backoffice/newtimeclock/store_item'] 		= "backoffice/Backoffice_timeclock/store_item";
$route['backoffice/newtimeclock/update_item'] 		= "backoffice/Backoffice_timeclock/update_item";
$route['backoffice/newtimeclock/export_detail'] 	= "backoffice/Backoffice_timeclock/timeclock_export";
$route['backoffice/newtimeclock/summary_select'] 	= "backoffice/Backoffice_timeclock/timeclock_summary_select";
$route['backoffice/newtimeclock/export_summary'] 	= "backoffice/Backoffice_timeclock/timeclock_export_summary";
$route['backoffice/newtimeclock/download'] 			= "backoffice/Backoffice_timeclock/timeclock_download";

//backoffice get zip codes
$route['backoffice/get_geocities_unique'] = "backoffice/Backoffice/get_geocities_unique";

/*Cron by KC*/
$route['cron'] = "backoffice_ww/crons";
$route['cron/(:any)'] = "backoffice_ww/crons/$1";

//BackOffice Reports --> Begin

//BackOffice Reports --> Dashboard
$route['backoffice/reports/reports_echo'] = "reports/Home/reports_echo";
$route['backoffice/reports/get'] = "reports/Home/reports_view";
$route['backoffice/reports/reports_select'] = "reports/Home/reports_select";
$route['backoffice/reports/reports_export'] = "reports/Home/reports_export";
$route['backoffice/reports/reports_download'] = "reports/Home/reports_download";
$route['backoffice/reports/reports_select_tabs'] = "reports/Home/reports_select_tabs";
$route['backoffice/reports/reports_select_fav'] = "reports/Home/reports_select_fav";
$route['backoffice/reports/inject-title'] = "reports/Home/inject_title";
$route['backoffice/reports/inject-info'] = "reports/Home/inject_info";

//Backoffice Reports KC --> Email Module
$route['backoffice/reports/email'] = "reports/Mail/email";
$route['backoffice/reports_get'] = "reports/Home/reports_download";

//BackOffice Reports --> Cash Count
$route['backoffice/reports/cashcount_echo'] = "reports/Cashcount/cashcount_echo";
$route['backoffice/reports/cashcount'] = "reports/Cashcount/cashcount_view";
$route['backoffice/reports/cashcount_select'] = "reports/Cashcount/cashcount_select";
$route['backoffice/reports/cashcount_export'] = "reports/Cashcount/cashcount_export";
$route['backoffice/reports/cashcount_download'] = "reports/Cashcount/cashcount_download";

//BackOffice Reports KC --> Cash Out
$route['backoffice/reports/cash_out'] = "reports/Cash_out/cash_out_view";
$route['backoffice/reports/cashout_paymentsummary'] = "reports/Cash_out/cashout_paymentsummary";
$route['backoffice/reports/cashout_count'] = "reports/Cash_out/cashout_count";
$route['backoffice/reports/cashout_discountsummary'] = "reports/Cash_out/cashout_discountsummary";
$route['backoffice/reports/cashout_discountdetail'] = "reports/Cash_out/cashout_discountdetail";
$route['backoffice/reports/cashout_returns'] = "reports/Cash_out/cashout_returns";
$route['backoffice/reports/cashout_itemsales'] = "reports/Cash_out/cashout_itemsales";
$route['backoffice/reports/cashout_select'] = "reports/Cash_out/cashout_select";
$route['backoffice/reports/set_cashout'] = "reports/Cash_out/set_cashout";
$route['backoffice/reports/cash_out_export'] = "reports/Cash_out/cash_out_export";
$route['backoffice/reports/cash_out_download'] = "reports/Cash_out/cash_out_download";

//BackOffice Reports JS --> Category Sales Report
$route['backoffice/reports/categorysales'] = "reports/Category_sales/categorysales_view";
$route['backoffice/reports/categorysales_select'] = "reports/Category_sales/categorysales_select";
$route['backoffice/reports/categorysales_export'] = "reports/Category_sales/categorysales_export";
$route['backoffice/reports/categorysales_download'] = "reports/Category_sales/categorysales_download";

// BackOffice Reports HD --> Category Sales Type Report
$route['backoffice/reports/categorysalestype'] = "reports/Category_sales_type/index";
$route['backoffice/reports/categorysales_type_select'] = "reports/Category_sales_type/categorysales_type_select";
$route['backoffice/reports/categorysales_type_export'] = "reports/Category_sales_type/categorysales_type_export";


//Reports --> Consolidated Report by JES
$route['backoffice/reports/consolidated_echo'] 						= "reports/Consolidated/consolidated_echo";
$route['backoffice/reports/consolidated'] 							= "reports/Consolidated/consolidated_view";
$route['backoffice/reports/consolidated_sales_summary_select'] 		= "reports/Consolidated/consolidated_sales_summary_select";
$route['backoffice/reports/consolidated_payment_summary_select'] 	= "reports/Consolidated/consolidated_payment_summary";
$route['backoffice/reports/consolidated_cashcount_select'] 			= "reports/Consolidated/consolidated_cashcount";
$route['backoffice/reports/consolidated_category_sales_select'] 	= "reports/Consolidated/consolidated_category_sales";
$route['backoffice/reports/consolidated_ordertype_sales_select'] 	= "reports/Consolidated/consolidated_ordertype_sales";
$route['backoffice/reports/consolidated_discount_summary_select'] 	= "reports/Consolidated/consolidated_discount_summary";
$route['backoffice/reports/consolidated_return_select'] 			= "reports/Consolidated/consolidated_return";
$route['backoffice/reports/consolidated_top_items_select'] 			= "reports/Consolidated/consolidated_top_items";
$route['backoffice/reports/consolidated_export'] 					= "reports/Consolidated/consolidated_export";
$route['backoffice/reports/consolidated_download'] 					= "reports/Consolidated/consolidated_download";
$route['backoffice/reports/consolidated_pdf'] 						= "reports/Consolidated/print_pdf";

// Consolidated Old by KC
$route['backoffice/reports/consolidated_echo'] 						= "reports/Consolidated_v1/consolidated_echo";
$route['backoffice/reports/consolidated_v1'] 						= "reports/Consolidated_v1/consolidated_view";
$route['backoffice/reports/consolidated_payment_summary'] 			= "reports/Consolidated_v1/consolidated_payment_summary";
$route['backoffice/reports/consolidated_cashcount'] 				= "reports/Consolidated_v1/consolidated_cashcount";
$route['backoffice/reports/consolidated_category_sales'] 			= "reports/Consolidated_v1/consolidated_category_sales";
$route['backoffice/reports/consolidated_ordertype_sales'] 			= "reports/Consolidated_v1/consolidated_ordertype_sales";
$route['backoffice/reports/consolidated_discount_summary'] 			= "reports/Consolidated_v1/consolidated_discount_summary";
$route['backoffice/reports/consolidated_return'] 					= "reports/Consolidated_v1/consolidated_return";
$route['backoffice/reports/consolidated_top_items'] 				= "reports/Consolidated_v1/consolidated_top_items";
$route['backoffice/reports/consolidated_export_v1'] 				= "reports/Consolidated_v1/consolidated_export";
$route['backoffice/reports/consolidated_download_v1'] 				= "reports/Consolidated_v1/consolidated_download";
$route['backoffice/reports/consolidated_old'] 						= "reports/Consolidated_v1/print_pdf";


//BackOffice Reports JS --> Credit Card Batch
$route['backoffice/reports/creditcardbatch_echo'] = "reports/Credit_card_batch/creditcardbatch_echo";
$route['backoffice/reports/creditcardbatch'] = "reports/Credit_card_batch/creditcardbatch_view";
$route['backoffice/reports/creditcardbatch_select'] = "reports/Credit_card_batch/creditcardbatch_select";
$route['backoffice/reports/creditcardbatch_export'] = "reports/Credit_card_batch/creditcardbatch_export";
$route['backoffice/reports/creditcardbatch_download'] = "reports/Credit_card_batch/creditcardbatch_download";

//BackOffice Reports JS --> Credit Card Detail
$route['backoffice/reports/creditcarddetail_echo'] = "reports/Credit_card_detail/creditcarddetail_echo";
$route['backoffice/reports/creditcarddetail'] = "reports/Credit_card_detail/creditcarddetail_view";
$route['backoffice/reports/creditcarddetail_select'] = "reports/Credit_card_detail/creditcarddetail_select";
$route['backoffice/reports/creditcarddetail_export'] = "reports/Credit_card_detail/creditcarddetail_export";
$route['backoffice/reports/creditcarddetail_download'] = "reports/Credit_card_detail/creditcarddetail_download";

//BackOffice Reports --> Customer Credit Summary Report by JS
$route['backoffice/reports/customer_credit_summary'] = "reports/customer_credit_summary/customer_credit_summary_view";
$route['backoffice/reports/customer_credit_summary_select'] = "reports/customer_credit_summary/customer_credit_summary_select";
$route['backoffice/reports/customer_credit_summary_export'] = "reports/customer_credit_summary/customer_credit_summary_export";
$route['backoffice/reports/customer_credit_summary_download'] = "reports/customer_credit_summary/customer_credit_summary_download";

//BackOffice Reports --> Customer Credit Detail Report by JS
$route['backoffice/reports/customer_credit_detail'] = "reports/customer_credit_detail/customer_credit_detail_view";
$route['backoffice/reports/customer_credit_detail_select'] = "reports/customer_credit_detail/customer_credit_detail_select";
$route['backoffice/reports/customer_credit_detail_select_ontable'] = "reports/customer_credit_detail/customer_credit_detail_select_ontable";
$route['backoffice/reports/customer_credit_detail_export'] = "reports/customer_credit_detail/customer_credit_detail_export";
$route['backoffice/reports/customer_credit_detail_download'] = "reports/customer_credit_detail/customer_credit_detail_download";

//Backoffice Reports KC --> Customer Item Sales Summary
$route['backoffice/reports/customer_iss_echo'] = "reports/Customer_item_sales_summary/customer_iss_echo";
$route['backoffice/reports/customer_iss'] = "reports/Customer_item_sales_summary/customer_iss_view";
$route['backoffice/reports/customer_iss_select'] = "reports/Customer_item_sales_summary/customer_iss_select";
$route['backoffice/reports/customer_iss_export'] = "reports/Customer_item_sales_summary/customer_iss_export";
$route['backoffice/reports/customer_iss_download'] = "reports/Customer_item_sales_summary/customer_iss_download";

//BackOffice Reports KC --> Customer List
$route['backoffice/reports/customerlist_echo'] = "reports/Customer_list/customerlist_echo";
$route['backoffice/reports/customerlist'] = "reports/Customer_list/customerlist_view";
$route['backoffice/reports/customerlist_select'] = "reports/Customer_list/customerlist_select";
$route['backoffice/reports/customerlist_export'] = "reports/Customer_list/customerlist_export";
$route['backoffice/reports/customerlist_download'] = "reports/Customer_list/customerlist_download";

//BackOffice Reports JS --> Customer Reward Summary
//$route['backoffice/reports/customer_sales_list_echo'] = "reports/Customer_sales_list/customersales_list_echo";
$route['backoffice/reports/customer_rewards_summary'] = "reports/Customer_reward_summary/customer_reward_summary_view";
$route['backoffice/reports/customer_rewards_summary_select'] = "reports/Customer_reward_summary/customer_reward_summary_select";
$route['backoffice/reports/customer_rewards_summary_export'] = "reports/Customer_reward_summary/customer_reward_summary_export";
$route['backoffice/reports/customer_rewards_summary_download'] = "reports/Customer_reward_summary/customer_reward_summary_download";

//BackOffice Reports JS --> Customer Reward Detail
$route['backoffice/reports/customer_rewards_detail'] = "reports/Customer_reward_detail/customer_reward_detail_view";
$route['backoffice/reports/customer_rewards_detail_select'] = "reports/Customer_reward_detail/customer_reward_detail_select";
$route['backoffice/reports/customer_rewards_detail_export'] = "reports/Customer_reward_detail/customer_reward_detail_export";
$route['backoffice/reports/customer_rewards_detail_download'] = "reports/Customer_reward_detail/customer_reward_detail_download";


//BackOffice Reports JS --> Customer Sales by City
$route['backoffice/reports/customer_sales_bycity'] = "reports/Customer_sales_bycity/customer_sales_bycity_view";
$route['backoffice/reports/customersales_bycity_list_select'] = "reports/Customer_sales_bycity/customer_sales_bycity_select";
$route['backoffice/reports/customersales_bycity_list_export'] = "reports/Customer_sales_bycity/customer_sales_bycity_export";
$route['backoffice/reports/customer_sales_bystate_list_download'] = "reports/Customer_sales_bycity/customersales_download";

//BackOffice Reports --> Customer Sales by Custom1
$route['backoffice/reports/customer_sales_echo'] = "reports/Customer_sales_bycustom1/customersales_echo";
$route['backoffice/reports/Customer_sale_by_custom1'] = "reports/Customer_sales_bycustom1/customersales_view";
$route['backoffice/reports/customer_sales_select'] = "reports/Customer_sales_bycustom1/customersales_select";
$route['backoffice/reports/customer_sales_export'] = "reports/Customer_sales_bycustom1/customersales_export";
$route['backoffice/reports/customer_sales_download'] = "reports/Customer_sales_bycustom1/customersales_download";

//BackOffice Reports JS --> Customer Sales by State
$route['backoffice/reports/customer_sales_list_echo'] = "reports/Customer_sales_bystate/customer_sales_bystate_echo";
$route['backoffice/reports/customer_sales_bystate'] = "reports/Customer_sales_bystate/customer_sales_bystate_view";
$route['backoffice/reports/customer_sales_bystate_list_select'] = "reports/Customer_sales_bystate/customer_sales_bystate_select";
$route['backoffice/reports/customer_sales_bystate_list_export'] = "reports/Customer_sales_bystate/customer_sales_bystate_export";
$route['backoffice/reports/customer_sales_bystate_list_download'] = "reports/Customer_sales_bystate/customersales_download";

//Backoffice Reports JS --> Customer Sales by Zip
$route['backoffice/reports/customer_ssale_by_zip_echo'] = "reports/Customer_sales_byzip/customersales_byzip_echo";
$route['backoffice/reports/Customer_sale_by_zip'] = "reports/Customer_sales_byzip/customersales_byzip_view";
$route['backoffice/reports/customer_sales_by_zip_select'] = "reports/Customer_sales_byzip/customersales_byzip_select";
$route['backoffice/reports/customer_sales_by_zip_export'] = "reports/Customer_sales_byzip/customersales_byzip_export";
$route['backoffice/reports/customer_sale_by_zip_download'] = "reports/Customer_sales_byzip/customersales_byzip_download";

//BackOffice Reports JS --> Customer Sales List
$route['backoffice/reports/customer_sales_list_echo'] = "reports/Customer_sales_list/customersales_list_echo";
$route['backoffice/reports/customer_sales_list'] = "reports/Customer_sales_list/customersales_list_view";
$route['backoffice/reports/customer_sales_list_select'] = "reports/Customer_sales_list/customersales_list_select";
$route['backoffice/reports/customer_sales_list_export'] = "reports/Customer_sales_list/customersales_list_export";
$route['backoffice/reports/customer_sales_list_download'] = "reports/Customer_sales_list/customersales_list_download";

//BackOffice Reports KC --> Customer Sales Receipt Summary
$route['backoffice/reports/customersalesreceiptsummary_echo'] = "reports/CustomerSalesReceiptSummary/customersalesreceiptsummary_echo";
$route['backoffice/reports/customersalesreceiptsummary'] = "reports/CustomerSalesReceiptSummary/customersalesreceiptsummary_view";
$route['backoffice/reports/customersalesreceiptsummary_select'] = "reports/CustomerSalesReceiptSummary/customersalesreceiptsummary_select";
$route['backoffice/reports/customersalesreceiptsummary_export'] = "reports/CustomerSalesReceiptSummary/customersalesreceiptsummary_export";
$route['backoffice/reports/customersalesreceiptsummary_download'] = "reports/CustomerSalesReceiptSummary/customersalesreceiptsummary_download";

//BackOffice Reports KS --> Customer Sales Summary
$route['backoffice/reports/customersales_echo'] = "reports/Customer_sales_summary/customersales_echo";
$route['backoffice/reports/customersales'] = "reports/Customer_sales_summary/customersales_view";
$route['backoffice/reports/customersales_select'] = "reports/Customer_sales_summary/customersales_select";
$route['backoffice/reports/customersales_export'] = "reports/Customer_sales_summary/customersales_export";
$route['backoffice/reports/customersales_download'] = "reports/Customer_sales_summary/customersales_download";

//BackOffice Reports KC --> Discounts ?? Mixed
$route['backoffice/reports/discount'] = "reports/Discounts/discounts_view";
$route['backoffice/reports/discount_echo'] = "reports/Discounts/discounts_echo";
$route['backoffice/reports/discount_select'] = "reports/Discounts/discounts_select";
$route['backoffice/reports/discount_detail_select'] = "reports/Discounts/discounts_detail_select";
$route['backoffice/reports/discount_summary_export'] = "reports/Discounts/discounts_summary_export";
$route['backoffice/reports/discount_detail_export'] = "reports/Discounts/discounts_detail_export";
$route['backoffice/reports/discount_download'] = "reports/Discounts/discounts_download";

//BackOffice Reports JS --> Employee Sales Summary
$route['backoffice/reports/employee_sales_summary'] = "reports/Employee_sales_summary/employee_sales_summary_view";
$route['backoffice/reports/employee_sales_summary_select'] = "reports/Employee_sales_summary/employee_sales_summary_select";
$route['backoffice/reports/employee_sales_summary_export'] = "reports/Employee_sales_summary/employee_sales_summary_export";
$route['backoffice/reports/employee_sales_summary_download'] = "reports/Employee_sales_summary/employee_sales_summary_download";

//BackOffice Reports JS --> Employee Sales Detail
$route['backoffice/reports/employee_sales_detail'] = "reports/Employee_sales_detail/employee_sales_view";
$route['backoffice/reports/employee_sales_detail_select'] = "reports/Employee_sales_detail/employee_sales_detail_select";
$route['backoffice/reports/employee_sales_detail_export'] = "reports/Employee_sales_detail/employee_sales_detail_export";
$route['backoffice/reports/employee_sales_detail_download'] = "reports/Employee_sales_detail/employee_sales_detail_download";

//Reports -->Event Function Summary by JS
$route['backoffice/reports/event_function_summary'] 					= "reports/Event_function_summary/event_function_summary_view";
$route['backoffice/reports/event_function_summary_select'] 				= "reports/Event_function_summary/event_function_summary_select";
$route['backoffice/reports/event_function_summary_export'] 				= "reports/Event_function_summary/event_function_summary_export";
$route['backoffice/reports/event_function_summary_download']			= "reports/Event_function_summary/event_function_summary_download";

//Reports -->Event Function Detail by JS
$route['backoffice/reports/event_function_detail'] 						= "reports/Event_function_detail/report_event_function_detail_view";
$route['backoffice/reports/event_function_detail_select'] 				= "reports/Event_function_detail/event_function_detail_select";
$route['backoffice/reports/event_function_detail_export'] 				= "reports/Event_function_detail/event_function_detail_export";
$route['backoffice/reports/event_function_detail_download']				= "reports/Event_function_detail/event_function_detail_download";

//Reports -->Event Function Invoice BC by JS
$route['backoffice/reports/event_function_invoice_bc'] 					= "reports/Event_function_invoice_bc/event_function_invoice_bc_view";
$route['backoffice/reports/event_function_invoice_bc_select'] 			= "reports/Event_function_invoice_bc/event_invoice_bc_select";
$route['backoffice/reports/event_function_invoice_bc_export'] 			= "reports/Event_function_invoice_bc/event_invoice_bc_export";
$route['backoffice/reports/event_function_invoice_bc_download']			= "reports/Event_function_invoice_bc/event_invoice_bc_download";

// Reports -->Event Function Invoice AC112 by HD
$route['backoffice/reports/event_function_invoice/templates/ac112']	= "reports/Event_function_invoice_ac112/print_pdf_ac112"; 
$route['backoffice/reports/event_function_ac112_customer_save'] = "reports/Event_function_invoice_ac112/customer_save";


//Reports -->Event Function Invoice AC112 by JS
$route['backoffice/reports/event_function_invoice_ac112'] 				= "reports/Event_function_invoice_ac112/event_function_invoice_ac112_view";
$route['backoffice/reports/event_function_invoice_ac112_select'] 		= "reports/Event_function_invoice_ac112/event_invoice_ac112_select";
$route['backoffice/reports/event_function_invoice_ac112_export'] 		= "reports/Event_function_invoice_ac112/event_invoice_ac_export";
$route['backoffice/reports/event_function_invoice_ac112_download']		= "reports/Event_function_invoice_ac112/event_invoice_ac_download";

// Reports --> Event Function Invoice PDF by HD
$route['backoffice/reports/event_function_invoice_hd/print-pdf/(:any)/(:any)'] = "reports/Event_function_invoice_ac112/print_pdf_ac112/$1/$2";

//BackOffice Reports --> Gift Card Detail
$route['backoffice/reports/giftcard_echo'] = "reports/Gift_card/giftcard_echo";
$route['backoffice/reports/giftcard'] = "reports/Gift_card/giftcard_view";
$route['backoffice/reports/giftcard_select'] = "reports/Gift_card/giftcard_select";
$route['backoffice/reports/giftcard_export'] = "reports/Gift_card/giftcard_export";
$route['backoffice/reports/giftcard_download'] = "reports/Gift_card/giftcard_download";

//BackOfifce Reports --> Gift Card Summary
$route['backoffice/reports/giftcardsummary_echo'] = "reports/Gift_card_summary/giftcardsummary_echo";
$route['backoffice/reports/giftcardsummary'] = "reports/Gift_card_summary/giftcardsummary_view";
$route['backoffice/reports/giftcardsummary_select'] = "reports/Gift_card_summary/giftcardsummary_select";
$route['backoffice/reports/giftcardsummary_export'] = "reports/Gift_card_summary/giftcardsummary_export";
$route['backoffice/reports/giftcardsummary_download'] = "reports/Gift_card_summary/giftcardsummary_download";

//BackOffice Reports JS 10-21-17 --> Inventory Sales Analysis
$route['backoffice/reports/inventory_sales_analysis'] = "reports/Inventory_sales_analysis/inventory_sales_analysis_view";
$route['backoffice/reports/inventory_sales_analysis_select'] = "reports/Inventory_sales_analysis/inventory_sales_analysis_select";
$route['backoffice/reports/inventory_sales_analysis_export'] = "reports/Inventory_sales_analysis/inventory_sales_analysis_export";
$route['backoffice/reports/inventory_sales_analysis_download'] = "reports/Inventory_sales_analysis/inventory_sales_analysis_download";

//BackOffice Reports --> Inventory Valuation
$route['backoffice/inventory/valuation/report'] = "reports/Inventory/inventory_valuation";
$route['backoffice/inventory/valuation/export'] = "reports/Inventory/inventory_valuation_export";
$route['backoffice/inventory/valuation/download'] = "reports/Inventory/download_file";

//BackOffice Reports --> Inventory Value
$route['backoffice/reports/inventory_value_echo'] = "reports/Inventory_value/inventory_value_echo";
$route['backoffice/reports/inventory_value'] = "reports/Inventory_value/inventory_value_view";
$route['backoffice/reports/inventory_value_select'] = "reports/Inventory_value/inventory_value_select";
$route['backoffice/reports/inventory_value_export'] = "reports/Inventory_value/inventory_value_export";
$route['backoffice/reports/inventory_value_download'] = "reports/Inventory_value/inventory_value_download";

//Reports -->Inventory Value by Category by JS
$route['backoffice/reports/inventory_value_category_echo'] = "reports/Inventory_value_bycategory/inventory_value_echo";
$route['backoffice/reports/inventory_value_category'] = "reports/Inventory_value_bycategory/inventory_value_bycategory_view";
$route['backoffice/reports/inventory_value_categoryselect'] = "reports/Inventory_value_bycategory/inventory_value_bycategory_select";
$route['backoffice/reports/inventory_value_categoryexport'] = "reports/Inventory_value_bycategory/inventory_value_bycategory_export";
$route['backoffice/reports/inventory_value_categorydownload'] = "reports/Inventory_value_bycategory/inventory_value_bycategory_download";

//Reports -->Inventory Turnover by Jes
$route['backoffice/reports/inventory_turnover'] 						= "reports/Inventory_turnover/inventory_turnover_view";
$route['backoffice/reports/inventory_turnover_select'] 					= "reports/Inventory_turnover/inventory_turnover_select";
$route['backoffice/reports/inventory_turnover_export'] 					= "reports/Inventory_turnover/inventory_turnover_export";
$route['backoffice/reports/inventory_turnover_download']				= "reports/Inventory_turnover/inventory_turnover_download";


//BackOffice Reports KC --> Item Count
$route['backoffice/reports/item_count_echo'] = "reports/Item_count/item_count_echo";
$route['backoffice/reports/item_count'] = "reports/Item_count/item_count_view";
$route['backoffice/reports/item_count_select'] = "reports/Item_count/item_count_select";
$route['backoffice/reports/subcategory_select'] = "reports/Item_count/subcategory_select";
$route['backoffice/reports/item_count_export'] = "reports/Item_count/item_count_export";
$route['backoffice/reports/item_count_download'] = "reports/Item_count/item_count_download";

//Reports -->Item List
$route['backoffice/reports/item_list'] = "reports/Item_list/item_list_view";
$route['backoffice/reports/item_list_select'] = "reports/Item_list/item_list_select";
$route['backoffice/reports/item_list_export'] = "reports/Item_list/item_list_export";
$route['backoffice/reports/item_list_download'] = "reports/Item_list/item_list_download";

//BackOffice Reports KC --> Item Returns
$route['backoffice/reports/itemreturns_echo'] = "reports/Item_returns/itemreturns_echo";
$route['backoffice/reports/itemreturns'] = "reports/Item_returns/itemreturns_view";
$route['backoffice/reports/itemreturns_select'] = "reports/Item_returns/itemreturns_select";
$route['backoffice/reports/itemreturns_export'] = "reports/Item_returns/itemreturns_export";
$route['backoffice/reports/itemreturns_download'] = "reports/Item_returns/itemreturns_download";

//BackOffice Reports KC --> Item Returns Summary
$route['backoffice/reports/itemreturns_summary'] = "reports/Item_return/itemreturn_view";
$route['backoffice/reports/itemreturn_detail_select'] = "reports/Item_return/itemreturn_detail_select";
$route['backoffice/reports/itemreturn_summary_select'] = "reports/Item_return/itemreturn_summary_select";
$route['backoffice/reports/itemreturn_summary_export'] = "reports/Item_return/itemreturn_summary_export";
$route['backoffice/reports/itemreturn_detail_export'] = "reports/Item_return/itemreturn_detail_export";
$route['backoffice/reports/itemreturn_download'] = "reports/Item_return/itemreturn_download";

//BackOffice Reports JS --> Item Sales Detail
$route['backoffice/reports/itemsales_echo'] = "reports/Item_sales/itemsales_echo";
$route['backoffice/reports/itemsales'] = "reports/Item_sales/itemsales_view";
$route['backoffice/reports/item_sales_detail_export'] = "reports/Item_sales/item_sales_detail_export";
$route['backoffice/reports/item_sales_detail_select'] = "reports/Item_sales/item_sales_detail_select";
$route['backoffice/reports/itemsales_download'] = "reports/Item_sales/itemsales_download";

//BackOffice Reports JS --> Item Sales Summary
$route['backoffice/reports/itemsales_summary_echo'] = "reports/Item_sales_summary/itemsales_summary_echo";
$route['backoffice/reports/itemsales_summary'] = "reports/Item_sales_summary/itemsales_summary_view";
$route['backoffice/reports/itemsales_summary_select'] = "reports/Item_sales_summary/itemsales_summary_select";
$route['backoffice/reports/itemsales_summary_export'] = "reports/Item_sales_summary/itemsales_summary_export";

//Reports --> Item Sales Detail
/*$route['backoffice/reports/itemsales_detail_select'] = "reports/Item_sales_summary/item_sales_detail_select";
$route['backoffice/reports/itemsales_detail_export'] = "reports/Item_sales_summary/item_sales_detail_export";
$route['backoffice/reports/itemsales_summary_download'] = "reports/Item_sales_summary/itemsales_summary_download"; */

//BackOffice Reports KC --> Menu Item
$route['backoffice/reports/menu_item'] = "reports/Menu_item/menu_item_view";
$route['backoffice/reports/menu_item_select'] = "reports/Menu_item/menu_item_select";
$route['backoffice/reports/menu_item_export'] = "reports/Menu_item/menu_item_export";
$route['backoffice/reports/menu_item_download'] = "reports/Menu_item/menu_item_download";

//BackOffice Reports KC --> Open Item
$route['backoffice/reports/openitem_echo'] = "reports/Open_item/openitem_echo";
$route['backoffice/reports/openitem'] = "reports/Open_item/openitem_view";
$route['backoffice/reports/openitem_select'] = "reports/Open_item/openitem_select";
$route['backoffice/reports/openitem_export'] = "reports/Open_item/openitem_export";
$route['backoffice/reports/openitem_download'] = "reports/Open_item/openitem_download";

//Reports KC --> Order Type Sales
$route['backoffice/reports/order_type_sales'] = "reports/Order_type_sales/order_type_sales_view";
$route['backoffice/reports/order_type_sales_echo'] = "reports/Order_type_sales/order_type_sales_echo";
$route['backoffice/reports/order_type_sales_select'] = "reports/Order_type_sales/order_type_sales_select";
$route['backoffice/reports/order_type_sales_export'] = "reports/Order_type_sales/order_type_sales_export";
$route['backoffice/reports/order_type_sales_download'] = "reports/Order_type_sales/order_type_sales_download";

//BackOffice Reports --> Payments Received
$route['backoffice/reports/payments'] = "reports/Payments/payments_view";
$route['backoffice/reports/payments_echo'] = "reports/Payments/payments_echo";
$route['backoffice/reports/payments_select'] = "reports/Payments/payments_select";
$route['backoffice/reports/payments_select_url/:any/:any'] = "reports/Payments/payments_select_url";
$route['backoffice/reports/payments_export'] = "reports/Payments/payments_export";
$route['backoffice/reports/payments_download'] = "reports/Payments/payments_download";

//BackOffice Reports --> Payments Summary
$route['backoffice/reports/payments_summary_echo'] = "reports/Payments_summary/payments_summary_echo";
$route['backoffice/reports/payments_summary'] = "reports/Payments_summary/payments_summary_view";
$route['backoffice/reports/payments_summary_select'] = "reports/Payments_summary/payments_summary_select";
$route['backoffice/reports/payments_summary_export'] = "reports/Payments_summary/payments_summary_export";
$route['backoffice/reports/payments_summary_download'] = "reports/Payments_summary/payments_summary_download";

//BackOffice Reports --> Pay Out
$route['backoffice/reports/payout_echo'] = "reports/Payout/payout_echo";
$route['backoffice/reports/payout'] = "reports/Payout/payout_view";
$route['backoffice/reports/payout_select'] = "reports/Payout/payout_select";
$route['backoffice/reports/payout_export'] = "reports/Payout/payout_export";
$route['backoffice/reports/payout_download'] = "reports/Payout/payout_download";

//Reports --> Receipt Tax Summary
$route['backoffice/reports/receipt_tax_summary'] = "reports/Receipt_tax_summary/receipt_tax_summary_view";
$route['backoffice/reports/receipt_tax_summary_select'] = "reports/Receipt_tax_summary/receipt_tax_summary_select";
$route['backoffice/reports/receipt_tax_summary_export'] = "reports/Receipt_tax_summary/receipt_tax_summary_export";
$route['backoffice/reports/receipt_tax_summary_download'] = "reports/Receipt_tax_summary/receipt_tax_summary_download";

//Reports --> Receipt Tax
$route['backoffice/reports/receipttax_echo'] 				= "reports/Receipt_tax/receipttax_echo";
$route['backoffice/reports/receipt_tax'] 					= "reports/Receipt_tax/receipttax_view";
$route['backoffice/reports/receipttax_select']				= "reports/Receipt_tax/receipttax_select";
$route['backoffice/reports/receipttax_export'] 				= "reports/Receipt_tax/receipttax_export";
$route['backoffice/reports/receipttax_download'] 			= "reports/Receipt_tax/receipttax_download";
$route['backoffice/reports/receipttax_pdf'] 				= "reports/Receipt_tax/print_pdf";

//Reports --> Receipt Tax Detail By Jes
$route['backoffice/reports/receipt_tax_detail'] 						= "reports/Receipt_tax_detail/receipttax_view";
$route['backoffice/reports/receipt_tax_detail_select'] 					= "reports/Receipt_tax_detail/receipttax_select_detail_item";
$route['backoffice/reports/receipt_tax_detail_export'] 					= "reports/Receipt_tax_detail/receipttax_export_detail_export";
$route['backoffice/reports/receipt_tax_detail_download'] 				= "reports/Receipt_tax_detail/receipttax_download";

//BackOffice Reports --> ?? Wrong Route
$route['backoffice/reports/employee_sales_summary_download'] = "reports/Receipt_tax_summary/employee_sales_summary_download";

//BackOffice Reports KC --> Receipt Totals
$route['backoffice/reports/receipts'] = "reports/Receipts/receipts_view";
$route['backoffice/reports/receipts_echo'] = "reports/Receipts/receipts_echo";
$route['backoffice/reports/receipts_select_url/:any/:any/:any'] = "reports/Receipts/receipts_select_url";
$route['backoffice/reports/receipts_select'] = "reports/Receipts/receipts_select";
$route['backoffice/reports/receipt_detail_select'] = "reports/Receipts/receipt_detail_select";
$route['backoffice/reports/receipt_payment_select'] = "reports/Receipts/receipt_payment_select";
$route['backoffice/reports/receipts_export'] = "reports/Receipts/receipts_export";
$route['backoffice/reports/receipts_download'] = "reports/Receipts/receipts_download";
$route['backoffice/reports/receipts_delete'] = "reports/Receipts/receipt_delete";

//BackOffice--> Receipts Totals Report Post Void
$route['backoffice/reports/receipts_post_void'] = "reports/Receipts/receipts_view";

//Reports --> Report Designer By Jes
$route['backoffice/reports/reports_designer'] = "backoffice/Report_designer/report_designer_view";
$route['backoffice/reports/reports_designer_select'] = "backoffice/Report_designer/reports_designer_select";
$route['backoffice/reports/reports_designer_store_report'] = "backoffice/Report_designer/reports_designer_store_report";
$route['backoffice/reports/reports_designer_update_report'] = "backoffice/Report_designer/update_report";
$route['backoffice/reports/reports_designer_delete_report'] = "backoffice/Report_designer/delete_row";

//BackOffice Reports JS 10/17/17 --> Receiving Report
	// updated 11/18/17 with new path for purchasing since conflicts with Recieiving PDF
$route['backoffice/reports/purchasing'] = "reports/Purchasing/purchasing_view";
$route['backoffice/reports/purchasing_select'] = "reports/Purchasing/purchasing_select";
$route['backoffice/reports/purchasing_export'] = "reports/Purchasing/purchasing_export";
$route['backoffice/reports/purchasing_download'] = "reports/Purchasing/purchasing_download";

//BackOffice Reports --> Sales by Hour js
$route['backoffice/reports/sale_by_hour'] 								= "reports/Sales_by_hour/sales_by_hour_view";
$route['backoffice/reports/sale_by_hour_echo'] 							= "reports/Sales_by_hour/sales_by_hour_echo";
$route['backoffice/reports/sale_by_hour_select'] 						= "reports/Sales_by_hour/sales_by_hour_select";
$route['backoffice/reports/sales_by_hour_graph'] 						= "reports/Sales_by_hour/sales_by_hour_graph";
$route['backoffice/reports/sale_by_hour_summary_export'] 				= "reports/Sales_by_hour/sales_by_hour_summary_export";
$route['backoffice/reports/sale_by_hour_download'] 						= "reports/Sales_by_hour/sales_by_hour_download";
$route['backoffice/reports/sale_by_hour_item_select'] 					= "reports/Sales_by_hour/sales_by_hour_item_select";
$route['backoffice/reports/sale_by_hour_item_export'] 					= "reports/Sales_by_hour/sales_by_hour_item_export";



//BackOffice Reports --> Sales by Day by Jes
$route['backoffice/reports/sales_by_day'] 								= "reports/Sales_by_day/sales_by_day_view";
$route['backoffice/reports/sales_by_day_echo'] 							= "reports/Sales_by_day/sales_by_day_echo";
$route['backoffice/reports/sales_by_day_select'] 						= "reports/Sales_by_day/sales_by_day_select";
$route['backoffice/reports/sales_by_day_select_graph'] 					= "reports/Sales_by_day/sales_by_day_graph";
$route['backoffice/reports/sales_by_day_export'] 						= "reports/Sales_by_day/sales_by_day_summary_export";


//BackOffice Reports --> Sales by Month by Jes
$route['backoffice/reports/sales_by_month'] = "reports/Sales_by_month/sales_by_month_view";
$route['backoffice/reports/sales_by_month_echo'] = "reports/Sales_by_month/sales_by_month_echo";
$route['backoffice/reports/sales_by_month_select'] = "reports/Sales_by_month/sales_by_month_select";
$route['backoffice/reports/sales_by_month_select_graph'] = "reports/Sales_by_month/sales_by_month_graph";
$route['backoffice/reports/sales_by_month_export'] = "reports/Sales_by_month/sales_by_month_export";

//BackOffice Reports --> Sales by Year by Jes
$route['backoffice/reports/sales_by_year'] = "reports/Sales_by_year/sales_by_year_view";
$route['backoffice/reports/sales_by_year_select'] = "reports/Sales_by_year/sales_by_year_select";
$route['backoffice/reports/sales_by_year_select_graph'] = "reports/Sales_by_year/sales_by_year_graph";
$route['backoffice/reports/sales_by_year_export'] = "reports/Sales_by_year/sales_by_year_export";


//BackOffice Reports JS --> Stock History
$route['backoffice/reports/stock_history'] = "reports/Stock_history/stock_history_view";
$route['backoffice/reports/stock_history_select'] = "reports/Stock_history/stock_history_select";
$route['backoffice/reports/stock_history_export'] = "reports/Stock_history/stock_history_export";
$route['backoffice/reports/stock_history_download'] = "reports/Stock_history/stock_history_download";

//Reports--> SubCategory Sales Report By Jes
$route['backoffice/reports/subcategorysales'] = "reports/Subcategory_sales/subcategorysales_view";
$route['backoffice/reports/subcategorysales_select'] = "reports/Subcategory_sales/subcategorysales_select";
$route['backoffice/reports/subcategorysales_export'] = "reports/Subcategory_sales/subcategorysales_export";
$route['backoffice/reports/subcategorysales_download'] = "reports/Subcategory_sales/subcategorysales_download";

//--Backoffice Reports Student Obligation
$route['backoffice/reports/student_obligation'] = "reports/Student_obligation/student_obligation_view";
$route['backoffice/reports/student_obligation_select'] = "reports/Student_obligation/student_obligation_select";
$route['backoffice/reports/student_obligation_export'] = "reports/Student_obligation/student_obligation_export";
$route['backoffice/reports/student_obligation_download'] = "reports/Student_obligation/student_obligation_download";

//BackOffice Reports KC --> Supplier Item Sales
$route['backoffice/reports/supplier_item_sales'] = "reports/Supplier_item_sales/supplier_item_sales_view";
$route['backoffice/reports/supplier_item_sales_select'] = "reports/Supplier_item_sales/supplier_item_sales_select";
$route['backoffice/reports/supplier_item_sales_export'] = "reports/Supplier_item_sales/supplier_item_sales_export";
$route['backoffice/reports/supplier_item_sales_download'] = "reports/Supplier_item_sales/supplier_item_sales_download";

//BackOffice Reports KC --> Supplier List
$route['backoffice/reports/supplierlist_echo'] = "reports/supplierlist/supplierlist_echo";
$route['backoffice/reports/supplierlist'] = "reports/Supplier_List/supplierlist_view";
$route['backoffice/reports/supplierlist_select'] = "reports/Supplier_List/supplierlist_select";
$route['backoffice/reports/supplierlist_export'] = "reports/Supplier_List/supplierlist_export";
$route['backoffice/reports/supplierlist_download'] = "reports/Supplier_List/supplierlist_download";

//BackOffice Reports KC --> Time Clock Summary
$route['backoffice/reports/time_summary_echo'] = "reports/Time_summary/time_summary_echo";
$route['backoffice/reports/time_summary'] = "reports/Time_summary/time_summary_view";
$route['backoffice/reports/time_summary_select'] = "reports/Time_summary/time_summary_select";
$route['backoffice/reports/time_summary_export'] = "reports/Time_summary/time_summary_export";
$route['backoffice/reports/time_summary_download'] = "reports/Time_summary/time_summary_download";

//BackOffice Reports --> Tips
$route['backoffice/reports/tips_echo'] = "reports/Tips/tips_echo";
$route['backoffice/reports/tips'] = "reports/Tips/tips_view";
$route['backoffice/reports/tips_select'] = "reports/Tips/tips_select";
$route['backoffice/reports/tips_export'] = "reports/Tips/tips_export";
$route['backoffice/reports/tips_download'] = "reports/Tips/tips_download";

//BackOffice Reports --> Tips Summary
$route['backoffice/reports/tips_summary_echo'] = "reports/Tips_summary/tips_summary_echo";
$route['backoffice/reports/tips_summary'] = "reports/Tips_summary/tips_summary_view";
$route['backoffice/reports/tips_summary_select'] = "reports/Tips_summary/tips_summary_select";
$route['backoffice/reports/tips_summary_export'] = "reports/Tips_summary/tips_summary_export";
$route['backoffice/reports/tips_summary_download'] = "reports/Tips_summary/tips_summary_download";

//BackOffice Reports JS --> User List
$route['backoffice/reports/userlist_echo'] = "reports/User_list/userlist_echo";
$route['backoffice/reports/userlist'] = "reports/User_list/userlist_view";
$route['backoffice/reports/userlist_select'] = "reports/User_list/userlist_select";
$route['backoffice/reports/userlist_export'] = "reports/User_list/userlist_export";
$route['backoffice/reports/userlist_export_pdf'] = "reports/User_list/print_pdf";
$route['backoffice/reports/userlist_download'] = "reports/User_list/userlist_download";
$route['backoffice/reports/userlist_download_pdf'] = "reports/User_list/userlist_download_pdf";


//BackOffice Report Deposit Worksheet
$route['backoffice/reports/deposit_worksheet'] = "reports/Deposit_worksheet/index";
$route['backoffice/reports/deposit_worksheet/data'] = "reports/Deposit_worksheet/worksheet_data";
$route['backoffice/reports/deposit_worksheet/view-data'] = "reports/Deposit_worksheet/view_data";
$route['backoffice/reports/deposit_worksheet/download-excel'] = "reports/Deposit_worksheet/download_excel";

$route['backoffice/reports/timeclock_details_employee'] = "reports/Timeclockdetail/employee_list_data";
$route['backoffice/reports/timeclock_details_employee/download'] = "reports/Timeclockdetail/download_report";
$route['backoffice/reports/timeclock_details_employee/download-file'] = "reports/Timeclockdetail/download_file";


//BackOffice Reports KC --> WW Receiving
$route['receiving'] = "backoffice_ww/receiving_report/receiving";
$route['receiving/(:any)'] = "backoffice_ww/receiving_report/$1";


//BackOffice Item Kit Module
$route['backoffice/item-kit'] = "backoffice/Itemkit/index";
$route['backoffice/item-kit/items'] = "backoffice/Itemkit/items";
$route['backoffice/item-kit/menu-items'] = "backoffice/Itemkit/menu_items";
$route['backoffice/item-kit/save-menu-item'] = "backoffice/Itemkit/save_menu_item";
$route['backoffice/item-kit/remove-menu-item'] = "backoffice/Itemkit/remove_menu_item";
$route['backoffice/item-kit/update-item'] = "backoffice/Itemkit/update_item";
$route['backoffice/item-kit/supplier'] = "backoffice/Itemkit/supplier";

/*Point of Sale Part*/
$route['pos/pointofsale'] = "pos/Pos/point_of_sale_view";
$route['pos/pointofsale/payment'] = "pos/Payment/transaction_payment";
/*Point of Sale REST*/
$route['pos/pointofsale/new-sale'] = "pos/Pos/new_sale";
$route['pos/pointofsale/category'] = "pos/Pos/load_categories_data";
$route['pos/pointofsale/ordered-item-list'] = "pos/Pos/ordered_item_data_list";
$route['pos/pointofsale/ordered-item-list-split'] = "pos/Pos/ordered_item_data_list_split";
$route['pos/pointofsale/tax'] = "pos/Pos/load_receipt_tax";
$route['pos/pointofsale/sold-totals'] = "pos/Pos/sold_total_display";
$route['pos/pointofsale/item-selection-list'] = "pos/Pos/item_button_by_category";
$route['pos/pointofsale/add-item'] = "pos/Pos/add_item";
$route['pos/pointofsale/remove-item'] = "pos/Pos/remove_multiple_items";
$route['pos/pointofsale/cancel-sale'] = "pos/Pos/cancel_sale";
$route['pos/pointofsale/cancel-sale-reason'] = "pos/Pos/cancel_sale_reason";
$route['pos/pointofsale/discount-item'] = "pos/Pos/discount_item";
$route['pos/pointofsale/on-hold-sale'] = "pos/Pos/on_hold_sale";
$route['pos/pointofsale/instant-new-sale'] = "pos/Pos/instant_new_sale";
$route['pos/pointofsale/quick-sale'] = "pos/Pos/quick_sale";
$route['pos/pointofsale/check-item-quantity'] = "pos/Pos/check_item_quantity";
$route['pos/pointofsale/locations'] = "pos/Pos/location_list";
/*Second Screen*/
$route['pos/pointofsale/customer/screen'] = 'pos/Pos/pointofsale_second_screen';

$route['pos/pointofsale/reload-item-zero-auth'] = 'pos/Datacap/reload_item_zero_auth';

$route['pos/pointofsale/recall-assign-receipt-check'] = "pos/Pos/recall_assign_receipt_check";

/*User Passcode with Restriction*/
//$route['pos/cashier/user-restrict/passcode'] = "pos/Pos/passcode_restriction"; hd 10/20/2016
$route['pos/cashier/user-restrict/passcode'] = "pos/Cashier/checkpasscode";
//$route['pos/cashier/cashier-restrict/passcode'] = "pos/Pos/passcode_cashier_restriction"; hd 10/20/2016
$route['pos/cashier/cashier-restrict/passcode'] = "pos/Cashier/checkpasscode";

$route['pos/pointofsale/item-search-option'] = "pos/Pos/item_search_option";

//Store Credit
$route['pos/pointofsale/payment/store-credit/form'] = "pos/Payment/store_credit_check";
$route['pos/pointofsale/payment/store-credit/payment'] = "pos/Payment/payment_apply_store_credit";
$route['pos/pointofsale/payment/storecredit/balance/print'] = "pos/Payment/store_credit_print_balance";

//OrderNo
$route['pos/pointofsale/ordertype/update-ordertype'] = "pos/Pos/update_ordertype";

//Open Drawer Reason
$route['pos/pointofsale/open-drawer/reason'] = "pos/Pos/open_drawer_reason";
$route['pos/pointofsale/open-drawer/save-reason'] = "pos/Pos/open_drawer_save_reason";

//--> Menu Items
$route['pos/pointofsale/select-category-menu-items'] = "pos/Pos/sel_category_menu_items";

//-->Discount
$route['pos/pointofsale/discount-item-computation'] = "pos/Pos/discount_item_computation";
$route['pos/pointofsale/receipt-discount-computation'] = "pos/Pos/receipt_discount_computation";
$route['pos/pointofsale/discount-total'] = "pos/Pos/discount_total";

//-->Change Price
$route['pos/pointofsale/price-change-computation'] = "pos/Pos/price_change";
$route['pos/pointofsale/price-change-computation-allitem'] = "pos/Pos/price_change_all";
$route['pos/pointofsale/new-quantity'] = "pos/Pos/quantity_change";

//-->Information
$route['pos/pointofsale/item-information'] = "pos/Pos/item_information";
$route['pos/pointofsale/check-no-item-tax'] = "pos/Pos/check_no_item_tax";
$route['pos/pointofsale/check-item-tax'] = "pos/Pos/check_item_tax";
$route['pos/pointofsale/tax-checker'] = "pos/Pos/tax_checker";
$route['pos/pointofsale/no-receipt-tax'] = "pos/Pos/no_receipt_tax";
$route['pos/pointofsale/receipt-tax-checker'] = "pos/Pos/receipt_tax_checker";
$route['pos/pointofsale/add-receipt-tax-checker'] = "pos/Pos/add_receipt_tax_checker";
$route['pos/pointofsale/receipt-tax'] = "pos/Pos/receipt_tax";
$route['pos/pointofsale/load-customers'] = "pos/Pos/load_customers";
$route['pos/pointofsale/check-receipt-note'] = "pos/Pos/check_receipt_note";
//$route['pos/pointofsale/load-recall-sale/(:any)'] = "pos/Pos/load_onhold_sale/$1";
$route['pos/pointofsale/load-recall-sale'] = "pos/Pos/load_onhold_sale";
$route['pos/pointofsale/load-recall-completed/data'] = "pos/Pos/load_completed_sale_data";
$route['pos/pointofsale/load-recall-onhold/data'] = "pos/Pos/load_onhold_sale_data";
$route['pos/pointofsale/load-recall-voided/data'] = "pos/Pos/load_voided_sale_data";
$route['pos/pointofsale/new-sale-que'] = "pos/Pos/new_sale_que";
$route['pos/pointofsale/new-sale-logo-que'] = "pos/Pos/new_sale_logo_que";
$route['pos/pointofsale/search-inventory-item'] = "pos/Pos/search_inventory_item";
//$route['pos/pointofsale/load-inventory/(:any)'] = "pos/Pos/load_inventory/$1";
//$route['pos/pointofsale/search-load-inventory'] = "pos/Pos/search_load_inventory";
//$route['pos/pointofsale/load-all-inventory'] = "pos/Pos/load_all_inventory";
$route['pos/pointofsale/customer-selected'] = "pos/Pos/customer_selected";
$route['pos/pointofsale/view-receipt'] = "pos/Pos/view_receipt";
$route['pos/pointofsale/check-receipt-status'] = "pos/Pos/check_receipt_status";
//$route['pos/cashier/header-info'] = "pos/Auth_manager/get_header_information";
$route['pos/pointofsale/header-info'] = "pos/Pos/get_header_information";
$route['pos/pointofsale/header-info-completed'] = "pos/Pos/get_header_information_completed";
$route['backoffice/reports/header-info'] = "pos/Pos/get_header_information";  //duplicate function used by above function .. need to adjust //Note: no need to adjust same function but different controller.
$route['pos/pointofsale/printer-check'] = "pos/Pos/printer_check";
$route['pos/pointofsale/trans-check'] = "pos/Pos/trans_check";
$route['pos/pointofsale/user-settings'] = "pos/Pos/user_settings";
$route['pos/payment/printer-check-recall'] = "pos/Pos/printer_check_recall";
$route['pos/payment/printer-check-recall-void'] = "pos/Pos/printer_check_recall_void";
$route['pos/pointofsale/config-station'] = "pos/Pos/config_station";
$route['pos/pointofsale/empty-transaction'] = "pos/Pos/empty_transaction";
$route['pos/pointofsale/empty-transaction-completed'] = "pos/Pos/empty_transaction_completed";
$route['pos/pointofsale/recall-by-type'] = "pos/Pos/transaction_by_type";
$route['pos/pointofsale/recall-by-cashin'] = "pos/Pos/transaction_by_cashin";//*
//$route['pos/pointofsale/station/info'] = "pos/Pos/station_info"; //changed by HD 10/26/2016
$route['pos/pointofsale/station/info'] = "pos/Pos/location_list";
$route['pos/pointofsale/station-cashier/info'] = "pos/Pos/station_cashier_info";
$route['pos/pointofsale/customer-form'] = "pos/Pos/include_customer_form";
$route['pos/pointofsale/current-receipt'] = "pos/Pos/current_receipt_unique";
$route['pos/pointofsale/table-assignment'] = "pos/Pos/table_assign";
$route['pos/pointofsale/change-server'] = "pos/Pos/change_server";
$route['pos/pointofsale/kitchen-note'] = "pos/Pos/check_kitchen_note";
$route['pos/pointofsale/check-note'] = "pos/Pos/check_note";
$route['pos/pointofsale/recall-page-request'] = "pos/Pos/recall_location_request";
$route['pos/pointofsale/recall_request_call_page'] = "pos/Pos/recall_request_call_page";
$route['pos/pointofsale/recall-first-check'] = "pos/Pos/recall_first_check";
$route['pos/pointofsale/recall-second-check'] = "pos/Pos/recall_second_check";
$route['pos/pointofsale/config-menu-item-by-row-column'] = "pos/Pos/config_menu_item_by_row_column";
$route['pos/pointofsale/check-added-item'] = "pos/Pos/check_item_added_list";
$route['pos/pointofsale/get-onhold-sale'] = "pos/Pos/get_onhold_sale";
$route['pos/pointosale/load-all-onhold-sale'] = "pos/Pos/load_all_onhold_sale";
$route['pos/pointofsale/get-items-onhold-sale'] = "pos/Pos/get_items_onhold_sale";
$route['pos/pointofsale/quick-onhold'] = "pos/Pos/quick_onhold";
$route['pos/pointofsale/customer-list'] = "pos/Pos/customer_list";
$route['pos/pointofsale/card-history'] = "pos/Pos/card_history";
$route['pos/pointofsale/customer-profile'] = "pos/Pos/customer_profile";
$route['pos/pointofsale/slideshow-images'] = "pos/Pos/slideshow_images";
$route['pos/pointofsale/edit-receipt-security'] = "pos/Pos/edit_receipt_security";
$route['pos/pointofsale/check-user-manager'] = "pos/Pos/check_user_manager";
$route['pos/pointofsale/order-type-list'] = "pos/Pos/order_type_list";
$route['pos/pointofsale/get-order-number'] = "pos/Pos/get_order_number";
$route['pos/pointofsale/order-type-list-selection'] = "pos/Pos/order_type_list_selection";
$route['pos/pointofsale/payment/check-account-form'] = "pos/Pos/check_account_form";
$route['pos/pointofsale/item-check-completed'] = "pos/Pos/item_check_completed";
$route['pos/pointofsale/customer-add-card-info'] = "pos/Pos/customer_add_card_info";
$route['pos/pointofsale/payment/view'] = "pos/Pos/payment_view";
$route['pos/pointofsale/get-printer-default'] = "pos/Pos/get_printer_default";
$route['pos/pointofsale/check-printer-status'] = "pos/Pos/check_printer_status";
$route['pos/pointofsale/print-receipt-single'] = "pos/Pos/pos_print_check";
$route['pos/pointofsale/server-cashin-list'] = "pos/Pos/server_cashin_list";
$route['pos/pointofsale/cashier/passcode'] = "pos/Pos/check_passcode";
$route['pos/pointofsale/assign-server'] = "pos/Pos/assign_server";
$route['pos/pointofsale/assign-server-wo-cashin'] = "pos/Pos/assign_server_no_cashin";
$route['pos/pointofsale/sale-update-server'] = "pos/Pos/sale_update_server";
$route['pos/pointofsale/list-all-server'] = "pos/Pos/list_all_server";
$route['pos/pointofsale/customer/security'] = "pos/Pos/customer_position_security";
$route['pos/pointofsale/set-order-type'] = "pos/Pos/set_order_type";
$route['pos/pointofsale/sellbelowcost'] = "pos/Pos/sell_below_cost_page";
$route['pos/pointofsale/discountbelowcost'] = "pos/Pos/discount_below_cost_page";
$route['pos/pointofsale/discount-receipt-belowcost'] = "pos/Pos/discount_receipt_below_cost_page";
$route['pos/pointofsale/change-screen-page'] = "pos/Pos/pos_change_screen_page";
$route['pos/pointofsale/discountbelowcost/page2'] = "pos/Pos/discount_below_cost_page2";
$route['pos/pointofsale/item-tax-list/add-remove-tax'] = "pos/Pos/add_remove_item_tax_selected_list";
$route['pos/pointofsale/item-tax-list/get-tax'] = "pos/Pos/get_item_tax_list";
$route['pos/pointofsale/recall/get-default-tab'] = "pos/Pos/get_default_tab";
$route['pos/pointofsale/enter-age-verify'] = "pos/Pos/enter_age_verify";
$route['pos/pointofsale/set-age-verified'] = "pos/Pos/set_age_verified";
$route['pos/pointofsale/check-age-verified-code'] = "pos/Pos/check_age_verified_code";
$route['pos/pointofsale/discount-receipt-line-below-cost'] = "pos/Pos/discount_receipt_line_below_cost_page";
$route['pos/pointofsale/swipe-card-form'] = "pos/Pos/swipe_card_form";
$route['pos/pointofsale/search-receipt-number'] = "pos/Pos/search_receipt_number";
$route['pos/pointofsale/get-discount-receipt'] = "pos/Pos/get_discount_receipt";
$route['pos/pointofsale/check-user-manager-cookie'] = "pos/Pos/check_user_manager_cookie";
$route['pos/pointofsale/check-user-position-cookie'] = "pos/Pos/check_user_position_cookie";
$route['pos/pointofsale/user-security-level'] = "pos/Pos/user_security_level";
$route['pos/pointofsale/payment-refund-security'] = "pos/Pos/payment_refund_security";


$route["pos/pointofsale/server/all-cashed-in/list"] = "pos/Pos/cashier_list_all_cashed_in";
$route['pos/pointofsale/server/all/list'] = "pos/Pos/all_server_list";
$route['pos/pointofsale/current-assign-user'] = "pos/Pos/get_curent_assigned_user";

$route['pos/pointofsale/assign-list'] = "pos/Pos/assign_list";

$route['pos/pointofsale/table/receipt-status-reset'] = "pos/Pos/receipt_status_reset";

$route['pos/pointofsale/check-receipt-completed'] = "pos/Pos/check_receipt_completed";

/*Quick Recall*/
$route['pos/pointofsale/quick-recall/onhold-sale-column'] = "pos/Pos/onhold_sale_column";
$route['pos/pointofsale/quick-recall/printer-check'] = "pos/Pos/printer_check_onhold";
$route['pos/pointofsale/recall/reprint-receipt/(:any)'] = "pos/Pos/print_receipt/$1";
$route['pos/pointofsale/recall/reprint-receipt/print/(:any)'] = "pos/Pos/reprint_receipt/$1";
$route['pos/pointofsale/recall/filter'] = "pos/Pos/filter_layout";
$route['pos/pointofsale/recall/filter/search'] = "pos/Pos/filter_search";
$route['pos/pointofsale/recall/location'] = "pos/Pos/location_list";
$route['pos/pointofsale/quick-recall/re-order'] = "pos/Pos/quick_recall_reorder";
$route['pos/pointofsale/quick-recall/remove'] = "pos/Pos/quick_recall_remove";
$route['pos/pointofsale/quick-recall/remove-item-check'] = "pos/Pos/quick_recall_remove_item_check";
$route['pos/pointofsale/quick-recall/reason-list'] = "pos/Pos/quick_recall_reason_list";
$route['pos/pointofsale/quick-recall/remove-item-reason'] = "pos/Pos/quick_recall_remove_reason";
$route['pos/pointofsale/quick-recall/discount-list'] = "pos/Pos/quick_recall_discount";
$route['pos/pointofsale/quick-recall/apply-discount'] = "pos/Pos/quick_recall_apply_discount";
$route['pos/pointofsale/quick-recall/server-cashin-list'] = "pos/Pos/server_cashin_list";
$route['pos/pointofsale/quick-recall/update-server'] = "pos/Pos/quick_recall_update_receipt_server";
$route['pos/pointofsale/quick-recall/assign-user'] = "pos/Pos/check_passcode";
$route['pos/pointofsale/quick-recall/delete_receipt_passcode'] = "pos/Pos/check_passcode_cashier";
$route['pos/pointofsale/quick-recall/check-item-completed'] = "pos/Pos/check_item_completed";

$route['pos/pointofsale/check-receipt-open'] = "pos/Pos/check_receipt_open";
$route['pos/pointofsale/quick-recall/delete_receipt_confirmed'] = "pos/Pos/delete_receipt";


/*Recall by Location*/
$route['pos/pointofsale/recall-completed/bylocation/data'] = "pos/Pos/recall_completed_by_location";
$route['pos/pointofsale/recall-onhold/bylocation/data'] = "pos/Pos/recall_onhold_by_location";
$route['pos/pointofsale/recall-by-type-location'] = "pos/Pos/transaction_by_type_location";
$route['pos/pointofsale/recall-by-cashin-location'] = "pos/Pos/recall_cashin_by_location";
$route['pos/pointofsale/check/previous-receipt-status'] = "pos/Pos/check_previous_receipt_status";

// POS Customers
$route['pos/pointofsale/save-new-customer'] = "pos/Customer/save_new_customer";
$route['pos/pointofsale/add-customer'] = "pos/Customer/add_customer";
$route['pos/pointofsale/edit-customer-save'] = "pos/Customer/edit_customer_save";
$route['pos/pointofsale/delete-customer'] = "pos/Customer/delete_customer";
$route['pos/pointofsale/get-customer-profile'] = "pos/Customer/get_customer_profile";
$route['pos/pointofsale/remove-customer'] = "pos/Customer/remove_selected_customer";
$route['pos/pointofsale/customer/purchases'] = "pos/Customer/customer_purchases";  //hd 4-29-2016  pos edit customer --> purchases tab
$route['pos/pointofsale/customer/list'] = "pos/Customer/customer_list";
$route['pos/pointofsale/header-info/customer'] = "pos/Customer/get_header_information";
$route['pos/pointofsale/instant-new-sale/customer'] = "pos/Customer/instant_new_sale";
$route['pos/pointofsale/trans-customer'] = "pos/Customer/trans_customer";
$route['pos/pointofsale/customer/search'] = "pos/Customer/customer_search";
$route['pos/pointofsale/customer/grid-cols'] = "pos/Customer/customer_column";
$route['pos/pointofsale/customer/reload/changes'] = "pos/Customer/customer_reload_changes";
$route['pos/pointofsale/customer/get-new-customer'] = "pos/Customer/get_new_customer";
$route['pos/pointofsale/customer/form-search'] = "pos/Pos/create_form_window";
$route['pos/pointofsale/customer/add-new'] = "pos/Pos/customer_add_new_form";
$route['pos/pointofsale/customer/edit'] = "pos/Pos/customer_edit_form";
$route['pos/pointofsale/customer/purchases/print'] = "pos/Pos/purchases_print";
$route['pos/pointofsale/customer/select'] = "pos/Pos/select_customer_by_Id";
$route['pos/pointofsale/customer/purchase-grid'] = "pos/Customer/customer_purchase_column";
$route['pos/pointofsale/customer/points-grid'] = "pos/Customer/customer_points_column";
$route['pos/pointofsale/customer/print-reward'] = "pos/Customer/print_rewards";
$route['pos/pointofsale/customer/print/card'] = "pos/Customer/print_card";


/*
|-------------------------------------------------------------------------------------
| POS Weight Scale
|-------------------------------------------------------------------------------------
 */
$route['pos/pointofsale/weightscale/view'] = "pos/WeightScale/index";
$route['pos/pointofsale/weightscale/commands'] = "pos/WeightScale/commands";
$route['pos/pointofsale/weightscale/get-weight'] = "pos/Pos/get_weight";


/*
|-------------------------------------------------------------------------------------
| POS Coin Dispenser
|-------------------------------------------------------------------------------------
 */
$route['pos/pointofsale/coindispenser/command'] = "pos/Pos/coin_dispenser";
$route['pos/pointofsale/coindispenser/command2'] = "pos/Pos/command_testing";

//POS
$route['pos/pointofsale/save-new-receipt-note'] = "pos/Pos/save_new_receipt_note";
$route['pos/pointofsale/update-receipt-note'] = "pos/Pos/update_receipt_note";
$route['pos/pointofsale/delete-receipt-note'] = "pos/Pos/delete_receipt_note";
$route['pos/pointofsale/check-item-note'] = "pos/Pos/check_item_note";
$route['pos/pointofsale/item-note-save'] = "pos/Pos/item_note_save";
$route['pos/pointofsale/edit-item-note'] = "pos/Pos/edit_item_note";
$route['pos/pointofsale/delete-item-note'] = "pos/Pos/delete_item_note";
$route['pos/pointofsale/open-receipt'] = "pos/Pos/open_receipt";
$route['pos/pointofsale/open-receipt-table'] = "pos/Pos/open_receipt_table";
$route['pos/pointofsale/return-item'] = "pos/Pos/return_item";
$route['pos/pointofsale/cancel-receipt'] = "pos/Pos/cancel_receipt";
$route['pos/pointofsale/put-on-hold'] = "pos/Pos/put_on_hold";
$route['pos/pointofsale/put-on-hold-logo'] = "pos/Pos/put_on_hold_logo";
$route['pos/pointofsale/edit-receipt'] = "pos/Pos/edit_receipt";
$route['pos/pointofsale/background-receipt-check'] = 'pos/Pos/background_receipt_check';
$route['pos/pointofsale/add-new-sale'] = "pos/Pos/split_check_quick_sale";
$route['pos/pointofsale/check-return-reason'] = "pos/Pos/check_return_reason";
$route['pos/pointofsale/remove-check-item-reason'] = "pos/Pos/remove_check_item_reason";
$route['pos/pointofsale/load-reason-list'] = "pos/Pos/load_reason_list";
$route['pos/pointofsale/load-reason-list-cancel-sale'] = "pos/Pos/load_reason_list_cancel_sale";
$route['pos/pointofsale/reason-update'] = "pos/Pos/reason_update";
$route['pos/pointofsale/remove-item-reason'] = "pos/Pos/remove_item_reason";
$route['pos/pointofsale/update-receipt-details-unique'] = "pos/Pos/update_receipt_details_unique";
$route['pos/pointofsale/add-item-gift-card'] = "pos/Pos/add_item_gift_card";
$route['pos/pointofsale/get-discount-list'] = "pos/Pos/get_discount_list";
$route['pos/pointofsale/save-item-discount'] = "pos/Pos/save_item_discount";
$route['pos/pointofsale/save_receipt_discount'] = 'pos/Pos/save_receipt_discount';
$route['pos/pointofsale/check-required-label'] = "pos/Pos/check_required_label";
$route['pos/pointofsale/delete-card-on-file'] = "pos/Pos/delete_card_on_file";
$route['pos/pointofsale/get-points'] = "pos/Pos/get_points";
$route['pos/pointofsale/rewards'] = "pos/Pos/points_rewards";
$route['pos/pointofsale/save-reward'] = "pos/Pos/save_reward";
$route['pos/pointofsale/load-everything'] = "pos/Pos/load_everything";
$route['pos/pointofsale/giftreceipt/print'] = "pos/Pos/print_gift_receipt";
$route['pos/pointofsale/receipt-gift-item-status'] = "pos/Pos/receipt_header_status";
$route['pos/pointofsale/price-change-reason'] = "pos/Pos/price_change_reason";
$route['pos/pointofsale/customer/quantity'] = "pos/Pos/customer_quantity";
$route['pos/pointofsale/load-reason-list-remove-multiple-items'] = "pos/Pos/load_reason_list_remove_multiple_items";

$route['pos/pointofsale/item/search'] = "pos/Pos/item_search";
$route['pos/pointofsale/quick-recall/check-receipt-status'] = "pos/Pos/quick_recall_check_receipt_status";

$route['pos/pointofsale/scan-promo-barcode'] = "pos/Pos/scan_promo_barcode";
$route['pos/pointofsale/save-promo-discount'] = "pos/Pos/save_promo_discount";
$route['pos/pointofsale/discount-promo-belowcost'] = "pos/Pos/discount_promo_below_cost_page";
$route['pos/pointofsale/promo'] = "pos/Pos/get_promo_list";

//-->Split Check
$route['pos/pointofsale/split-check'] = "pos/Pos/split_check_page";
$route['pos/pointofsale/split-check/add-new-receipt'] = "pos/Pos/split_check_add_receipt";
$route['pos/pointofsale/split-open-receipt'] = "pos/Pos/split_open_receipt";
$route['pos/pointofsale/split/reload-receipt'] = "pos/Pos/reload_split_receipt";
$route['pos/pointofsale/split/load-new-receipt'] = "pos/Pos/load_new_receipt";
$route['pos/pointofsale/split/update-info'] = "pos/Pos/split_update_info";
$route['pos/pointofsale/split/count-check'] = "pos/Pos/split_count_check";
$route['pos/pointofsale/split/print-receipt'] = "pos/Pos/split_receipt_print";
$route['pos/pointofsale/split/get-all-receipts'] = "pos/Pos/split_get_all_receips";
$route['pos/pointofsale/split/check-printer-status'] = "pos/Pos/split_check_printer_status";
$route['pos/pointofsale/split/add-item'] = "pos/Pos/split_add_item";


//-->POS Menu
$route['pos/pointofsale/pos-menu/menu-list'] = "pos/Pos/pos_menu_list";
$route['pos/pointofsale/pos-menu/update-menu'] = "pos/Pos/pos_menu_update";


//-->POS Tax List
$route['pos/pointofsale/tax-list'] = "pos/Pos/tax_list";
$route['pos/pointofsale/tax/remove-tax-selected'] = "pos/Pos/remove_tax_selected_list";

//-->Module
$route['pos/pointofsale/module1'] = "pos/Modules/keynumpad";
$route['pos/module/numpad'] = "pos/Modules/num_pad";
$route['pos/module/numpad-pwd'] = "pos/Modules/num_pad_pwd";

//-->Include Page
$route['pos/pointofsale/new-sale-view'] = "pos/Pos/include_new_sale";
$route['pos/pointofsale/item-discount'] = "pos/Pos/include_item_discount";
$route['pos/pointofsale/receipt-discount'] = "pos/Pos/include_receipt_discount";
$route['pos/pointofsale/price-change'] = "pos/Pos/include_price_change";
$route['pos/pointofsale/quantity-change'] = "pos/Pos/include_quantity_change";
//$route['pos/pointofsale/recall-sale'] = "pos/Pos/include_recall_sale";
$route['pos/pointofsale/recall-sale'] = "pos/Pos/recall_page";
$route['pos/pointofsale/recall-sale-dev'] = 'pos/Pos/recall_page'; //Development
//$route['pos/pointofsale/customer'] = "pos/Pos/customer_page"; //HD 11-17-16
$route['pos/pointofsale/customer'] = "pos/Customer/customer_page";
$route['pos/pointofsale/new-customer'] = "pos/Pos/include_create_customer";
$route['pos/pointofsale/edit-customer'] = "pos/Pos/include_edit_customer";
$route['pos/pointofsale/receipt-note'] = "pos/Pos/include_receipt_note";
$route['pos/pointofsale/item-note'] = "pos/Pos/include_item_note";
$route['pos/pointofsale/new-sale-que-page'] = "pos/Pos/include_new_sale_que";
$route['pos/pointofsale/search-inventory-page'] = "pos/Pos/include_search_inventory";
$route['pos/pointofsale/add-new-item-page'] = "pos/Pos/include_add_new_item_page";
$route['pos/pointofsale/recall-que'] = "pos/Pos/incluede_recall_que";
$route['pos/pointofsale/dialog-alert'] = "pos/Pos/include_dialog_alert";
$route['pos/pointofsale/passcode'] = "pos/Pos/include_passcode_popup";
$route['pos/pointofsale/credit-card-entry'] = "payment/credit_card_entry";
$route['pos/pointofsale/price-level'] = "pos/Pos/include_price_level";
$route['pos/pointofsale/all-price-level'] = "pos/Pos/include_all_price_level";
$route['pos/pointofsale/price-change-form'] = "pos/Pos/include_price_change_form";
$route['pos/pointofsale/quantity-change-form'] = "pos/Pos/include_quantity_change_form";
$route['pos/pointofsale/discount-item-form'] = "pos/Pos/include_discount_item_form";
$route['pos/pointofsale/discount-receipt-form'] = "pos/Pos/include_discount_receipt_form";
$route['pos/pointofsale/item-print-status'] = "pos/Pos/item_print_status";

$route['pos/pointofsale/printer/check'] = "pos/Pos/printer_check_setting";
$route['pos/pointofsale/check-item-question'] = "pos/Pos/check_item_question";
$route['pos/pointofsale/load-questions'] = "pos/Pos/load_questions";
$route['pos/pointofsale/load-questions-by-item'] = "pos/Pos/load_question_by_item";
$route['pos/pointofsale/load-question-items'] = "pos/Pos/load_question_items";
$route['pos/pointofsale/save-selected-items'] = "pos/Pos/save_selected_items";
$route['pos/pointofsale/save-selected-items-list'] = "pos/Pos/save_selected_item_list";
$route['pos/pointofsale/remove-multiple-item'] = "pos/Pos/remove_multiple_items";
$route['pos/pointofsale/geocity/zipcodes'] = "pos/Pos/load_zipcodes";
$route['pos/pointofsale/geocity/nested-by-zipcode'] = "pos/Pos/nested_by_zipcode";
$route['pos/pointofsale/prompt'] = "pos/Pos/check_prompt";
$route['pos/pointofsale/kitchen-comments'] = "pos/Pos/kitchen_comments";
$route['pos/module/kitchen-numpad'] = "pos/Pos/include_kitchen_numpad";
$route['pos/pointofsale/add-open-item'] = "pos/Pos/add_open_item";
$route['pos/pointofsale/details'] = "pos/Pos/details_from_rd";
$route['pos/pointofsale/ebt-total'] = "pos/Pos/ebt_total";
$route['pos/pointofsale/item-cashier'] = "pos/Pos/item_cashier";
$route['pos/pointofsale/get-current-sales-person'] = "pos/Pos/get_current_sales_person";
$route['pos/pointofsale/item-price-level'] = "pos/Pos/item_price_level";
$route['pos/pointofsale/save-edit-selected-items'] = "pos/Pos/save_edit_selected_items";
$route['pos/pointofsale/save-customer-profile'] = "pos/Pos/save_customer_profile";
$route['pos/pointofsale/email/customer-edit-profile'] = "pos/Pos/edit_customer_profile";
$route['pos/pointofsale/reward/print-reward'] = "pos/Pos/print_rewards";
$route['pos/pointofsale/reward/print-promo'] = "pos/Pos/print_promo";
$route['pos/pointofsale/inventory-search/get-inventory-columns'] = "pos/Pos/get_inventory_columns";
$route['pos/pointofsale/item-check-list'] = "pos/Pos/item_check_list";
$route['pos/pointofsale/change-screen/update-receipt-status'] = "pos/Pos/change_screen_update_status";
$route['pos/pointofsale/cashin-check-by-userid'] = "pos/Pos/cashin_check_by_userid";
$route['pos/pointofsale/accept-return-columns'] = "pos/Pos/get_accept_return_columns";
$route['pos/pointofsale/accept-return-selected-columns'] = "pos/Pos/get_accept_return_selected_columns";
$route['pos/pointofsale/accept-return-item-selected'] = "pos/Pos/accept_return_item_selected";
$route['pos/pointofsale/accept-return-item-save'] = "pos/Pos/accept_return_items_save";
$route['pos/pointofsale/users/list'] = "pos/Pos/users_list";
$route['pos/pointofsale/sales-person-columns'] = "pos/Pos/sales_person_columns";
$route['pos/pointofsale/credit-card/info'] = "pos/Pos/credit_card_info";
$route['pos/pointofsale/card-on-file/save'] = "pos/Pos/card_on_file_save";


//-->Remove Multiple Item
$route['pos/pointofsale/remove-multiple-item/page'] = "pos/Pos/remove_multiple_item_page";
$route['pos/pointofsale/remove-multiple-item/check'] = "pos/Pos/remove_multiple_item_check";
$route['pos/pointofsale/remove-multiple-item/remove'] = "pos/Pos/remove_multiple_item_process";
$route['pos/pointofsale/remove-multiple-item/load'] = "pos/Pos/load_after_remove_multiple_item";
$route['pos/pointofsale/remove-multiple-item/reduce'] = "pos/Pos/reduce_multiple_item";
$route['pos/pointofsale/remove-multiple-item/remove-multiple-item-function'] = "pos/Pos/remove_multiple_item_function";
$route['pos/pointofsale/remove-multiple-item/remove-multiple-item-reason'] = "pos/Pos/remove_multiple_item_reason";

//--> POS Get Gift Card Balance
$route['pos/pointofsale/get-gift-card-balance'] = "pos/Pos/inquire_gift_card_balance"; //for POS main

//--> POS Main assigning table **Note: same function name on cashier but different controller.
$route['pos/pointofsale/table-no'] = "pos/Pos/tableno_inject";

//-->Injected Lists
$route['pos/pointofsale/zip-codes'] = "pos/Pos/get_geocities_unique";

//-->New Payment Controller
$route['pos/pointofsale/pos-total'] = "pos/Payment/pos_totals";
$route['pos/pointofsale/load-payment-types'] = "pos/Payment/load_payment_types";
$route['pos/pointofsale/set-button-payment'] = "pos/Payment/set_button_payment";
$route['pos/pointofsale/payment-apply'] = "pos/Payment/payment_apply";
$route['pos/pointofsale/pos-payments'] = "pos/Payment/pos_payments";
$route['pos/pointofsale/pos-change'] = "pos/Payment/pos_change";
$route['pos/pointofsale/list-payments'] = "pos/Payment/include_list_payments";
$route['pos/pointofsale/display-payments'] = "pos/Payment/display_payments";
$route['pos/pointofsale/void-payment'] = "pos/Payment/void_payment";
$route['pos/pointofsale/void-card-payment'] = "pos/Datacap/void_card_payment";
$route['pos/pointofsale/ed-button-payment'] = "pos/Payment/ed_button_payment";
$route['pos/pointofsale/check-balance'] = "pos/Payment/check_balance";
$route['pos/payment/printer-check'] = "pos/Payment/printer_check";
$route['pos/pointofsale/payment-check-status'] = "pos/Payment/payment_status_check";
$route['pos/pointofsale/when-totals'] = "pos/Pos/when_totals";
$route['pos/pointofsale/card-process'] = "pos/Payment/card_process";
$route['pos/pointofsale/card-payment-approved'] = "pos/Payment/card_payment_approved";
$route['pos/pointofsale/get-row-payment'] = "pos/Payment/row_payment";
$route['pos/pointofsale/credit-card-process'] = "pos/Payment/include_credit_card_process_form";
$route['pos/pointofsale/check-voided'] = "pos/Payment/check_if_voided";
$route['pos/pointofsale/no-device/adjust/tip'] = "pos/Payment/AdjustTip";
$route['pos/pointofsale/kitchen/print'] = "pos/Payment/kitchen_print_receipt";
$route['pos/pointofsale/calculate-ebt-payment'] = "pos/Payment/calculate_ebt_payment";
$route['pos/pointofsale/ebt-tax-calculate'] = "pos/Payment/ebt_recalculate_tax";
$route['pos/pointofsale/check-ebt'] = "pos/Payment/check_ebt";

$route['pos/pointofsale/kitchen-print-cron/(:any)'] = "pos/Pos/kitchen_print_cronjob/$1";

$route["pos/pointofsale/get-receipt-payment-form"] = "pos/Payment/payment_list_form";

$route['pos/pointofsale/receipt/ordertype'] = "pos/Pos/receipt_set_order_type";

//--> POS Gift Card Validation
$route['pos/pointofsale/giftcard-validate'] = "pos/Payment/giftcard_validation";
//--> POS Get Gift Card Balance
$route['pos/pointofsale/payment/get-gift-card-balance'] = "pos/Payment/inquire_gift_card_balance"; //for POS Payment
//--> POS Payment Gift Card
$route['pos/pointofsale/gift-card-payment'] = "pos/Payment/gift_card_payment";
//--> POS Validate Amount and Balance
$route['pos/pointofsale/giftcard-validate-amount-balance'] = "pos/Payment/giftcard_validate_amount_balance";
//--> POS Void Gift Card Payment
$route['pos/pointofsale/void-giftcard-payment'] = "pos/Payment/void_giftcard_payment";
//--> POS Reload Gift Card
$route['pos/pointofsale/reload-gift-card'] = "pos/Pos/reload_gift_card";
//--> POS Gift Card Check Total if Refund or Sale
$route['pos/pointofsale/gift-card-check-total'] = "pos/Payment/gift_card_check_total";
//--> POS Gift Card Refund Payment
$route['pos/pointofsale/gift-card-refund-payment'] = "pos/Payment/gift_card_refund_payment";
//--> POS Quick Sale Totals
$route['pos/pointofsale/quicksale-total'] = "pos/Pos/quicksale_totals";
//--> POS Check Account Payment
$route['pos/pointofsale/payment/check-account-proceed'] = "pos/Payment/check_account_proceed";
//--> POS Check Account Routing Validation
$route['pos/pointofsale/payment/check-account-validation'] = "pos/Payment/check_account_routing_validation";

$route['pos/pointofsale/payment-method-security'] = "pos/Payment/payment_method_security";


/*
|-------------------------------------------------------------------------
| POS Table
|-------------------------------------------------------------------------
 */
$route['pos/pointofsale/tables/get-tables'] = "pos/Pos/tables_form";
$route['pos/pointofsale/tables/get-tables-section'] = "pos/Pos/section_list";
$route['pos/pointofsale/tables/select-section-table'] = "pos/Pos/select_tables_by_section";
$route['pos/pointofsale/tables/select-table-without-no-of-customer'] = "pos/Pos/select_table_without_customer";
$route['pos/pointofsale/tables/select-table-with-no-of-customer'] = "pos/Pos/select_table_with_customer";
$route['pos/pointofsale/tables/transfer-table-without-no-of-customer'] = "pos/Pos/transfer_table_without_customer";
$route['pos/pointofsale/tables/check-receipt-table-exist'] = "pos/Pos/check_receipt_table_exist";
$route['pos/pointofsale/tables/receipt_for_table_check'] = "pos/Pos/receipt_for_table_check";
$route['pos/pointofsale/tables/receipt_for_item_check'] = "pos/Pos/receipt_for_item_check";
$route['pos/pointofsale/tables/sessionexpire'] = "pos/Pos/remove_userid_session";
$route['pos/pointofsale/tables/logout'] = "pos/Pos/server_logout";
$route['pos/pointofsale/tables/login'] = "pos/Pos/server_login";
$route['pos/pointofsale/tables/get-current-user'] = "pos/Pos/get_current_user";
$route['pos/pointofsale/tables/table-question-form'] = "pos/Pos/table_question_form";
$route['pos/pointofsale/tables/get-receipt-current-status'] = "pos/Pos/get_receipt_current_status";
$route['pos/pointofsale/tables/check-table-editing'] = "pos/Pos/check_table_editing";
$route['pos/pointofsale/combine-or-open-receipt'] = "pos/Pos/combine_or_open_receipt";
$route['pos/pointofsale/combine-receipt'] = "pos/Pos/combine_receipt";
$route['pos/pointofsale/tables/clear'] = "pos/Pos/clear_receipt";
$route['pos/pointofsale/tables/split'] = "Table/Tables/split_table_page";
$route['pos/pointofsale/tables/back-to-table-view'] = "Table/Tables/back_table_view";
$route['pos/pointofsale/tables/close-split-page'] = "Table/Tables/close_split_page";
$route['pos/pointofsale/table/quick-onhold'] = "pos/Pos/table_quick_onhold";
$route['pos/pointofsale/table-cancel-sale'] = "pos/Pos/table_cancel_sale";
$route['pos/pointofsale/check-table-login'] = "pos/Pos/check_table_login";
$route['pos/pointofsale/split/delete-empty-checks'] = "pos/Pos/delete_empty_checks";

$route['pos/pointofsale/tables/assign-new-receipt-to-table'] = "pos/Pos/assign_new_receipt_to_table";

/*
|------------------------------------------------------------------------
| POS Pay Out
|------------------------------------------------------------------------
 */
$route['pos/pointofsale/payout-selection-list'] = "Pos/Payout/reason_list";
$route['pos/pointofsale/passcode/payout'] = "Pos/Payout/checkpasscode";
$route['pos/pointofsale/check/cash-drawer-setting/payout'] = "Pos/Payout/cash_drawer_setting";
$route['pos/pointofsale/payout'] = "Pos/Payout/pay_out_data";
$route['pos/pointofsale/payout/print-receipt'] = "Pos/Payout/print_pay_out";
$route['pos/pointofsale/cash-drawer-option/payout'] = "Pos/Payout/cashier_drawer_option";
$route['pos/pointofsale/selected-cash-drawer/payout'] = "Pos/Payout/selected_cash_drawer";

/*
|-------------------------------------------------------------------------
| Cashier Table
|-------------------------------------------------------------------------
 */
$route['pos/cashier/tables/menu-header-info'] = "Table/Tables/get_header_information";
$route['pos/cashier/tables/get-tables'] = "Table/Tables/tables_form";
$route['pos/cashier/tables/get-tables-section'] = "Table/Tables/section_list";
$route['pos/cashier/tables/select-section-table'] = "Table/Tables/select_tables_by_section";
$route['pos/cashier/tables/receipt_for_table_check'] = "Table/Tables/receipt_for_table_check";
$route['pos/cashier/tables/logout'] = "Table/Tables/server_logout";
$route['pos/cashier/tables/login'] = "Table/Tables/server_login";
$route['pos/cashier/tables/get-current-user'] = "Table/Tables/get_current_user";
$route['pos/cashier/tables/select-table-without-no-of-customer'] = "Table/Tables/select_table_without_customer";
$route['pos/cashier/tables/select-table-with-no-of-customer'] = "Table/Tables/select_table_with_customer";
$route['pos/cashier/tables/open-receipt'] = "Table/Tables/open_receipt";
$route['pos/cashier/tables/clear'] = "Table/Tables/clear_receipt";
$route['pos/cashier/tables/check-popup'] = "Table/Tables/check_popup";
$route['pos/cashier/tables/check-user-security'] = "Table/Tables/check_user_security";
$route['pos/pointofsale/cashier/tables/check-table-editing'] = "Table/Tables/check_table_editing";
$route['pos/cashier/get-user-info'] = "Table/Tables/get_user_info";

$route['backoffice/timeclock/menu-header-info'] = "Cashier/Cashier/get_header_information";

// Cashier Table Manual Key-in
$route['pos/cashier/all-tables'] = "Cashier/Cashier/all_tables";
$route['pos/cashier/tables/select/no-customer'] = "Table/Tables/select_table_manual_no_customer";
$route['pos/cashier/tables/select/customer-no'] = "Table/Tables/select_table_with_customer";
$route['pos/pointofsale/table-manual-header'] = "pos/Pos/table_manual_header_information";
$route['pos/pointofsale/table-no-manual-check'] = "pos/Pos/table_no_manual_check";
$route['pos/pointofsale/get-table-inuse'] = "pos/Pos/get_table_inuse";
$route['pos/pointofsale/table-manual/update-table'] = "pos/Pos/table_manual_update";
$route['pos/pointofsale/table-manual/onhold'] = "pos/Pos/table_manual_on_hold";
$route['pos/pointofsale/table-manual/receipt-set-status'] = "pos/Pos/receipt_set_status";
$route['pos/pointofsale/table-manual/open-receipt'] = "pos/Pos/table_manual_open_receipt";
$route['pos/pointofsale/table-manual/on-hold'] = "pos/Pos/table_manual_on_hold_previous_receipt";
$route['pos/pointofsale/table-manual/check-receipt-status'] = "pos/Pos/table_manual_check_receipt_status";
$route['pos/pointofsale/table-manual/receipt-complete'] = "pos/Pos/table_manual_receipt_complete";
$route['pos/pointofsale/table-manual/combine-tables'] = "pos/Pos/table_manual_combine_tables";

/* New Cashier Menu Routes */
$route['pos/cashier/checkpasscode'] = "Cashier/Cashier/checkpasscode"; //Cashier -> Cashier Controller
$route['pos/cashier'] = "Cashier/Cashier/main_page"; //Cashier -> Cashier Controller
$route['pos/cashier/check-user/cashier'] = "Cashier/Cashier/checkpasscode"; //Cashier -> Cashier Controller
$route['pos/cashier/get/user'] = "Cashier/Cashier/get_user"; //Cashier -> Cashier Controller
$route['pos/cashier/menu-header-info'] = "Cashier/Cashier/get_header_information"; //Cashier -> Cashier Controller
$route['pos/cashier/printer-check/cashier'] = "Cashier/Cashier/printer_check"; //Cashier -> Cashier Controller
$route['pos/cashier/cash-in-check/cashier'] = "Cashier/Cashier/cash_in_check"; //Cashier -> Cashier Controller
$route['pos/cashier/new-sale'] = "Cashier/Cashier/new_sale"; //Cashier -> Cashier Controller
$route['pos/cashier/logged-info/cashier'] = "Cashier/Cashier/logged_info"; //Cashier -> Cashier Controller
$route['pos/cashier/user-restrict/passcode/cashier'] = "Cashier/Cashier/checkpasscode"; //Cashier -> Cashier Controller
$route['pos/cashier/print-receipt'] = "Cashier/Cashier/print_receipt";
$route['pos/cashier/open-drawer'] = "Cashier/Cashier/open_drawer_onclick";
$route['pos/cashier/network-check'] = "Cashier/Cashier/network_check";
$route['pos/cashier/printer-check-timeclock'] = "Cashier/Cashier/printer_check_timeclock";
$route['pos/cashier/cash-count-form'] = "Cashier/Cashier/include_cash_count_form";
$route['pos/cashier/cash-out-prompt'] = "Cashier/Cashier/include_cash_out_prompt";
$route['pos/cashier/table-no'] = "Cashier/Cashier/tableno_inject";
$route['pos/cashier/column-count'] = "Cashier/Cashier/column_count";
$route['pos/cashier/tables'] = "Cashier/Cashier/get_tables";
$route['pos/cashier/clear-db-cache'] = "Cashier/Cashier/scan_db_cache";
$route['pos/cash-count/totals'] = "Cashier/Cashier/cash_count_totals";
$route['pos/receipt-payment/count'] = "Cashier/Cashier/receipt_payment_count";
$route['pos/cashier/cash-drawer-option'] = "Cashier/Cashier/cashier_drawer_option";
$route['pos/cashier/check/cash-drawer-setting'] = "Cashier/Cashier/cash_drawer_setting";
$route['pos/cashier/unset-cash-drawer-setting'] = "Cashier/Cashier/unset_cash_drawer_setting";
$route['pos/cashier/cash-count/update'] = "Cashier/Cashier/cash_count_update";
$route['pos/cashier/cash-count/display'] = "Cashier/Cashier/cash_count_display";
//-->Check Cache
$route['pos/cashier/timeclock/check-cache'] = "Cashier/Cashier/check_cache";
//-->Load Payout reason
$route['pos/cashier/payout-selection-list'] = "Cashier/Payout/reason_list";

$route['pos/cashier/theme/update'] = "Cashier/Cashier/theme_update";

$route['pos/cashier/theme/list'] = "Cashier/Cashier/theme_list";

//-->Update Bank Deposit
$route['pos/cashier/cashout/update/bank-deposit'] = "Cashier/Cashier/bank_deposit";

$route['pos/cashier/item-transfer-set-point'] = "Cashier/Cashier/item_transfer_set_point";

$route['pos/cashier/cash-out/clearcache'] = "Cashier/Cashier/cash_out_clear_cache";

//-->On Hold Receipts Info
$route['pos/cashier/onhold-receipts'] = "Cashier/Cashier/onhold_receipts";

$route['pos/cashier/menu-setting-save'] = "Cashier/Cashier/save_menu_settings";
$route['pos/cashier/socket_error_message_show'] = "Cashier/Cashier/socket_error_message_show";

$route['pos/cashier/update-settings'] = "Cashier/Cashier/update_settings";

$route['pos/cashier/setup-cashed-in-id'] = "Cashier/Cashier/setup_cashed_in_id";

$route['pos/cashier/cashed-in-info'] = "Cashier/Cashier/cashed_in_info";

$route['pos/cashier/check-multiple-cashin'] = "Cashier/Cashier/check_multiple_cashin";

/*
|-------------------------------------------------------------------------
| Cash In (Original)
|-------------------------------------------------------------------------
 */
$route['pos/cashier/logged-info/cashin'] = "Cashier/Cashin/logged_info"; //Cashier -> Cashin Controller
$route['pos/cashier/check-user/cashin'] = "Cashier/Cashin/checkpasscode"; //Cashier -> Cashin Controller
$route['pos/cashier/cashin-check'] = "Cashier/Cashin/cashin_check"; //Cashier -> Cashin Controller
$route['pos/cashier/get/user/cashin'] = "Cashier/Cashin/get_user"; //Cashier -> Cashin Controller
$route['pos/cashier/check/cash-drawer-setting/cashin'] = "Cashier/Cashin/cash_drawer_setting"; //Cashier -> Cashin Controller
$route['pos/cashier/cash-drawer-option/cashin'] = "Cashier/Cashin/cashier_drawer_option"; //Cashier -> Cashin Controller
$route['pos/cashier/cash-in-check/cashin'] = "Cashier/Cashin/cash_in_check"; //Cashier -> Cashin Controller
$route['pos/cashier/amount/cashin'] = "Cashier/Cashin/save_cashin_amount"; //Cashier -> Cashin Controller
$route['pos/cashier/selected-cash-drawer/cashin'] = "Cashier/Cashin/selected_cash_drawer"; //Cashier -> Cashin Controller

/*
|--------------------------------------------------------------------------
| Cash Out (Original)
|--------------------------------------------------------------------------
 */
$route["pos/cashier/logged-info/cashout"] = "Cashier/Cashout/logged_info"; //Cashier -> Cashout Controller
$route['pos/cashier/cashier-restrict/passcode/cashout'] = "Cashier/Cashout/checkpasscode"; //Cashier -> Cashout Controller
$route['pos/load/settings/cashin'] = 'Cashier/Cashout/load_settings'; //Cashier -> Cashout Controller
$route['pos/cashier/checkpasscode/cashout'] = "Cashier/Cashout/checkpasscode"; //Cashier -> Cashier Controller
$route['pos/receipt-payment/count/cashout'] = "Cashier/Cashout/receipt_payment_count"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/cash-count'] = "Cashier/Cashout/cash_count"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/update/cash-count'] = "Cashier/Cashout/update_cash_count"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/insert-station-cashout'] = "Cashier/Cashout/process_station_cashout"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/cash-count/display'] = "Cashier/Cashout/cash_count_display"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/cash-count/totals'] = "Cashier/Cashout/cash_count_totals"; //Cashier -> Cashout Controller
$route['pos/cashier/amount/cashout'] = "Cashier/Cashout/save_cashout_amount"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/unset-cash-drawer-setting'] = "Cashier/Cashout/unset_cash_drawer_setting"; //Cashier -> Cashout Controller
$route['pos/cashier/cashout/unset-cash-darwer-setting-station'] = "Cashier/Cashout/unset_cash_drawer_setting_by_station";
//-->DenominationDenomination
$route['pos/cashier/cashout/denomination'] = "Cashier/Cashout/denomination_station_cashier_unique";
$route['pos/cashier/cashout/denomination/update'] = "Cashier/Cashout/denomination_update";
$route['pos/cashier/cashout/denomination/print'] = "Cashier/Cashier/denomination_print";

/*
|----------------------------------------------------------------------------
| Cash In Server
|----------------------------------------------------------------------------
 */
$route['pos/cashier/cashin-server/passcode'] = "Cashier/Cashinserver/user_passcode";
$route['pos/cashier/cashin-server/cashin-server-check'] = "Cashier/Cashinserver/cashin_server_check";
$route['pos/cashier/cashin-server/save-cashin-amount'] = "Cashier/Cashinserver/save_cashin_amount";
$route['pos/cashier/cashin-server/printer-check'] = "Cashier/Cashinserver/printer_check";
$route['pos/cashier/cashin-server/menu-header-info'] = "Cashier/Cashinserver/get_header_information";
$route['pos/cashier/cashin-server/new-sale'] = "Cashier/Cashinserver/new_sale";
$route['pos/cashier/cashin-server/cash-drawer-option'] = "Cashier/Cashinserver/cashier_drawer_option";
$route['pos/cashier/cashin-server/cash-drawer-setting'] = "Cashier/Cashinserver/cash_drawer_setting";
$route['pos/cashier/cashin-server/check-cashin-server-by-userid'] = "Cashier/Cashinserver/check_cashin_by_userid";
//-->Cash In Denomination
$route['pos/cashier/cashin/denomination'] = "Cashier/Cashier/cashin_denomination";
$route['pos/cashier/cashin/denomination/save'] = "Cashier/Cashier/cashin_denomination_save";
$route['pos/cashier/cashin/denomination/print'] = "Cashier/Cashier/cashin_denomination_print";

$route['pos/cashier/drawer-manager-denomination'] = "Cashier/Cashier/cashier_manager_denomination";
$route['pos/cashier/drawer-manager-denomination/save'] = "Cashier/Cashier/drawer_manager_denomination_save";
$route['pos/cashier/drawer-manager/cashout/server-cashin-list'] = "Cashier/Cashier/cashout_server_cashin_list";
$route['pos/cashier/drawer-manager-cashin/denomination/print'] = "Cashier/Cashier/drawer_manager_denomination_print";
$route['pos/cashier/drawer-manager/save-count'] = "Cashier/Cashier/drawer_manager_save_count";
$route['pos/cashier/drawer-manager/cashout-denomination'] = "Cashier/Cashier/drawer_manager_station_cashout_denomination";
$route['pos/cashier/drawer-manager/count-denomination-print'] = "Cashier/Cashier/drawer_manager_denomination_count_print";
$route['pos/cashier/drawer-manager/cashin'] = "Cashier/Cashier/drawer_manager_cashin"; 
$route['pos/cashier/drawer-manager/cashin-print'] = "Cashier/Cashier/drawer_manager_cashin_print";

/*
|-----------------------------------------------------------------------------
| Cash Out Server
|-----------------------------------------------------------------------------
 */
$route['pos/cashier/cashout-server/cashin-server-check'] = "Cashier/Cashoutserver/cashin_server_check";
$route['pos/cashier/cashout-server/passcode'] = "Cashier/Cashoutserver/user_passcode";
$route['pos/cashier/cashout-server/amount/cashout'] = "Cashier/Cashoutserver/save_cashout_amount";
$route['pos/cashier/cashout-server/printer-check'] = "Cashier/Cashoutserver/printer_check";
$route['pos/cashier/cashout-server/cash-count/totals'] = "Cashier/Cashoutserver/cash_count_totals";
$route['pos/cashier/cashout-server/server-cashin-list'] = "Cashier/Cashoutserver/server_cashin_list";
$route['pos/cashier/cashout-server/check-user-security'] = "Cashier/Cashoutserver/check_user_security";

$route['pos/cashier/cashout-server/cash-count/totals-history'] = "Cashier/Cashoutserver/cash_count_totals_history";


//-->Test
$route['pos/cashier/cashout-server/test-print'] = "Cashier/Cashier/test_print";

$route['pos/pointofsale/test-function'] = "pos/Pos/test_function";

/*
|------------------------------------------------------------------------------
| Cash In Station (New)
|------------------------------------------------------------------------------
 */
$route['pos/cashier/cashin-station/check-user-passcode'] = 'Cashier/Cashinstation/user_passcode';
$route['pos/cashier/cashin-station/cashin-check'] = "Cashier/Cashinstation/cashin_station_check";
$route['pos/cashier/cashin-station/save-amount'] = "Cashier/Cashinstation/save_cashin_amount";
$route['pos/cashier/cashin-station/printer-check'] = "Cashier/Cashinstation/printer_check";
$route['pos/cashier/cashin-station/cash-drawer-setting'] = "Cashier/Cashinstation/cash_drawer_setting";
$route['pos/cashier/cashin-station/cash-drawer-option'] = "Cashier/Cashinstation/cashier_drawer_option";
$route['pos/cashier/get-cashin-amount'] = "Cashier/CashInStation/get_cashier_amount";
$route['pos/cashier/cashin-station/check-cashin-server-by-userid'] = "Cashier/Cashinstation/check_cashin_by_userid";

/*
|------------------------------------------------------------------------------
| Cash Out Station (New)
|------------------------------------------------------------------------------
 */
$route['pos/cashier/cashout-station/passcode'] = "Cashier/Cashoutstation/user_passcode";
$route['pos/cashier/cashout-station/cashin-check'] = "Cashier/Cashoutstation/cashin_station_check";
$route['pos/cashier/cashout-station/cashin-check2'] = "Cashier/Cashoutstation/cashin_station_check2";
$route['pos/cashier/cashout-station/cashin-check2-history'] = "Cashier/Cashoutstation/cashin_station_check2_history";
$route['pos/cashier/cashout-station/cashout'] = "Cashier/Cashoutstation/save_cashout_amount";
$route['pos/cashier/cashout-station/printer-check'] = "Cashier/Cashoutstation/printer_check";
$route['pos/cashier/cashout-station/server-cashin-list'] = "Cashier/Cashoutstation/server_cashin_list";
$route['pos/cashier/cashout-station/check-user-security'] = "Cashier/Cashoutstation/check_user_security";

$route['pos/cashier/cashout/test/(:any)'] = "Cashier/Cashier/print_receipt/$1";

$route['pos/cashier/drawer-manager/cashout-station/cashout'] = "Cashier/Cashoutstation/drawer_manager_save_cashout_amount";

/*
|------------------------------------------------------------------------------|
| Receipt Report Tips By Server
|------------------------------------------------------------------------------|
 */
$route['pos/cashier/receipt/report/passcode'] = "Cashier/Receiptreport/user_passcode";
$route['pos/cashier/receipt/report/list'] = "Cashier/Receiptreport/receipt_report_list";
$route['pos/cashier/receipt/report/tip-by-server'] = "Cashier/Receiptreport/tip_by_server";
$route['pos/cashier/receipt/report/print-tip-by-sever'] = "Cashier/Receiptreport/printer_check";
$route['pos/cashier/receipt/report/print_info_test'] = "Cashier/Receiptreport/print_information_test";
/*
|------------------------------------------------------------------------------|
| Receipt Report Closing Report
|------------------------------------------------------------------------------|
 */
$route['pos/cashier/receipt/report/print-closing-report'] = "Cashier/Receiptreport/printer_check";
$route['pos/cashier/receipt/report/end-of-day'] = "Cashier/Receiptreport/update_station_closing";
$route['pos/cashier/cash-out/print'] = "Cashier/Cashier/print_cashout";
$route['pos/cashier/receipt/test-print'] = "Cashier/Receiptreport/test_print";
$route['pos/cashier/load-location'] = "Cashier/Receiptreport/load_all_location";
$route['pos/cashier/receiptreport/cashout-search'] = "Cashier/Receiptreport/cashout_search";
$route['pos/cashier/receiptreport/cashout-reprint'] = "Cashier/Receiptreport/printer_check";

$route['pos/cashier/receipt/report/timeclock'] = "Cashier/Receiptreport/time_clock_search";
$route['pos/cashier/receipt/report/timeclock/print'] = "Cashier/Receiptreport/printer_check";

$route['pos/cashier/receiptreports/tipbyserver-search'] = "Cashier/Receiptreport/tip_by_server_search"; 

$route['pos/cashier/receiptreports/timeclock/print-by-group'] = "Cashier/Receiptreport/print_timeclock_by_group";

//-->Cashier Report Employee Sales
$route['pos/cashier/report/employee-sales/search'] = "Cashier/Receiptreport/employee_sales_search";
$route['pos/cashier/report/employee-sales/print'] = "Cashier/Receiptreport/employee_sales_print";

$route['pos/cashier/dynamic/grid/type-columns'] = "Cashier/Receiptreport/dynamic_type_columns";
$route['pos/cashier/receipt-report/daily-sales'] = "Cashier/Receiptreport/daily_sales";
$route['pos/cashier/receipt-report/daily-sales/print'] = "Cashier/Receiptreport/daily_sales_report_print";
$route['pos/cashier/receipt-report/employee/sales-summary'] = "Cashier/Receiptreport/employee_sales_summary";
$route['pos/cashier/receipt-report/employee/sales-summary/print'] = "Cashier/Receiptreport/employee_sales_summary_print";

//-->Cash Out Convert Receipt to PDF file
$route['pos/cashier/cashout/convert-pdf'] = "Cashier/Email/cashout_pdf_convert";
//-->Cash Out Other Receipt to PDF file
$route['pos/cashier/cashout/convert-pdf2/(:any)'] = "Cashier/Email/cash_out_other_pdf_convert/$1";
//-->Cash Out Send PDF to Email
$route['pos/cashier/cashout/send-email'] = "Cashier/Email/cash_out_send_email";
//-->Print Other Cash Out
$route['pos/cashier/cashout/other'] = "Cashier/CashOutServer/cash_out_others";
//-->Time Clock Convert to PDF
$route['pos/cashier/cashout/convert-time-clock-pdf'] = "Cashier/Email/cashout_time_clock_convert";

$route['pos/cashier/cash-out/test-service'] = "Cashier/CashOutStation/test_service";



//-->Open Cash Drawer
$route['pos/cashier/cashdrawer/open_cash_drawer'] = "Cashier/Cashier/open_cash_drawer";

//-->Auth Manager
$route['pos/cashier/logged-info/authman'] = "Cashier/Auth_manager/logged_info"; //Cashier -> Auth_manager Controller
$route['pos/cashier/user-restrict/passcode/authman'] = "Cashier/Auth_manager/checkpasscode"; //Cashier -> Auth_manager Controller
$route['pos/batch/location/list'] = "Cashier/Auth_manager/location_list"; //Cashier -> Auth_manager Controller
$route['pos/pointofsale/auth-manager'] = "Cashier/Auth_manager/index"; //Cashier -> Auth_manager Controller
$route['pos/batch/check-id'] = "Cashier/Auth_manager/check_id"; //Cashier -> Auth_manager Controller
$route['pos/batch/sales'] = "Cashier/Auth_manager/batch_sales"; //Cashier -> Auth_manager Controller
$route['pos/batch/sales/batchtype'] = "Cashier/Auth_manager/sales_by_batchtype"; //Cashier -> Auth_manager Controller
$route['pos/batch/sales/daterange/batchtype'] = "Cashier/Auth_manager/sales_daterange_by_batchtype"; //Cashier -> Auth_manager Controller
$route['pos/allbatch/sales/daterange'] = "Cashier/Auth_manager/allbatch_sales_by_daterange"; //Cashier -> Auth_manager Controller
$route['pos/batch/list'] = "Cashier/Auth_manager/batch_list"; //Cashier -> Auth_manager Controller
$route['pos/batch/batchno'] = "Cashier/Auth_manager/batch_by_batchno"; //Cashier -> Auth_manager Controller
$route['pos/batch/allsales/batchno'] = "Cashier/Auth_manager/allsales_batchno"; //Cashier -> Auth_manager Controller
$route['pos/batch/location/list'] = "Cashier/Auth_manager/location_list"; //Cashier -> Auth_manager Controller
$route['pos/batch/secure-device'] = "Cashier/Auth_manager/secure_device"; //Cashier -> Auth_manager Controller
$route['pos/batchsales/by/location'] = "Cashier/Auth_manager/batchsales_by_location"; //Cashier -> Auth_manager Controller
$route['pos/batch/batchsales/daterange'] = "Cashier/Auth_manager/batchcharges_sales"; //Cashier -> Auth_manager Controller
$route['pos/auth-manager/view'] = "Cashier/Auth_manager/view_receipt"; //Cashier -> Auth_manager Controller
$route['pos/auth-manager/void-payment'] = "Cashier/Auth_manager/void_payment"; //Cashier -> Auth_manager Controller
$route['pos/auth-manager/void-card-payment'] = "pos/Datacap/auth_void_card_payment"; //Cashier -> Auth_manager Controller
$route['pos/cashier/header-info/authman'] = "Cashier/Auth_manager/get_header_information";  //Cashier -> Auth_manager Controller
$route['pos/batch/sales/batchtype/pre-auth'] = "Cashier/Auth_manager/pre_auth";
$route['pos/batch/sales/batchtype/zero-auth'] = "Cashier/Auth_manager/zero_auth";
$route['pos/auth-manager/adjust/view'] = "Cashier/Auth_manager/adjust_view";
$route['pos/authmanager/adjust/view'] = "Cashier/Auth_manager/adjust_view";
$route['pos/authmanager/checkusermanager'] = "Cashier/Auth_manager/check_user_manager";
$route['pos/authmanager/checkuserpasscode'] = 'Cashier/Auth_manager/user_passcode';


$route['pos/authmanager/batch/print'] = "pos/Datacap/print_batch_result";

$route['pos/authmanager/auth_update_receipt_server'] = "Cashier/Auth_manager/auth_update_receipt_server";

//-->Pay Out
$route['pos/cashier/user-restrict/passcode/payout'] = "Cashier/Payout/checkpasscode"; //Cashier -> Payout Controller
$route['pos/cashier/check/cash-drawer-setting/payout'] = "Cashier/Payout/cash_drawer_setting"; //Cashier -> Payout Controller
$route['pos/cashier/cash-drawer-option/payout'] = "Cashier/Payout/cashier_drawer_option"; //Cashier -> Payout Controller
$route['pos/cashier/selected-cash-drawer/payout'] = "Cashier/Payout/selected_cash_drawer"; //Cashier -> Payout Controller
$route['pos/cashier/payout'] = "Cashier/Payout/pay_out_data"; //Cashier -> Payout Controller

//-->Cash Drawer
$route['pos/cashier/user-restrict/passcode/cashdrawer'] = "Cashier/Cashdrawer/checkpasscode"; //Cashier -> Cashdarwer Controller
$route['pos/cashier/cash-drawer-option/cashdrawer'] = "Cashier/Cashdrawer/cashier_drawer_option"; //Cashier -> Cashdrawer Controller
$route['pos/cashier/selected-cash-drawer'] = "Cashier/Cashdrawer/selected_cash_drawer"; //Cashier -> Cashdrawer Controller

//-->Time Clock
$route['pos/cashier/logged-info/timeclock'] = "Cashier/Timeclock/logged_info"; //Cashier -> Timeclock Controller
$route['pos/cashier/user-restrict/passcode/timeclock'] = "Cashier/Timeclock/checkpasscode"; //Cashier -> Timeclock Controller
$route['pos/cashier/timeclock/punch/check'] = "Cashier/Timeclock/timeclock_punch_check";
$route['pos/cashier/timeclock/punch/save'] = "Cashier/Timeclock/timeclock_punch_save";
$route['pos/cashier/timeclock/punch/update'] = "Cashier/Timeclock/timeclock_punch_update";
$route['pos/cashier/timeclock/comment/save'] = "Cashier/Timeclock/timeclock_comment_save";
$route['pos/cashier/timeclock/test'] = "Cashier/Timeclock/timeclock_test";

//-->Recall
$route['pos/cashier/user-restrict/passcode/recall'] = "Cashier/Recall/checkpasscode"; //Cashier -> Recall Controller
$route['pos/cashier/recall/load_payments'] = "Cashier/Recall/load_payment_list";
$route['pos/cashier/recall/cashier_sale'] = "Cashier/Recall/get_cashier_sale";
$route['pos/cashier/recall/get-items-onhold-sale'] = "Cashier/Recall/get_items_onhold_sale";
$route['pos/cashier/recall/quicksale-total'] = "Cashier/Recall/quicksale_totals";
$route['pos/cashier/recall/reprint-receipt'] = "Cashier/Recall/print_receipt";
$route['pos/cashier/recall/load-all-onhold-sale'] = "Cashier/Recall/load_all_onhold_sale";
$route['pos/cashier/recall/location'] = "Cashier/Recall/location_list";
$route['pos/cashier/recall/filter'] = "Cashier/Recall/filter_layout";
$route['pos/cashier/recall/filter/search'] = "Cashier/Recall/filter_search";
$route['pos/cashier/recall/open_receipt'] = "Cashier/Recall/open_receipt";
$route['pos/cashier/recall/new_sale'] = "Cashier/Recall/new_sale";
$route['pos/cashier/recall/onhold-sale-column'] = "Cashier/Recall/onhold_sale_column";
$route['pos/cashier/recall/completed-sale-column'] = "Cashier/Recall/completed_sale_column";
$route['pos/cashier/recall/cash-sale-column'] = "Cashier/Recall/cash_sale_column";
$route['pos/cashier/recall/creditcard-sale-column'] = "Cashier/Recall/creditcard_sale_column";
$route['pos/cashier/recall/giftcard-sale-column'] = "Cashier/Recall/giftcard_sale_column";
$route['pos/cashier/recall/check-sale-column'] = "Cashier/Recall/check_sale_column";
$route['pos/cashier/recall/void-sale-column'] = "Cashier/Recall/voided_sale_column";
$route['pos/cashier/recall/payment'] = "Cashier/Recall/open_receipt_payment";
$route['pos/Cashier/recall/completed_sale'] = "Cashier/Recall/load_completed_sale_data";
$route['pos/cashier/recall/load-sale-by-tab'] = "Cashier/Recall/load_sale_by_tab";
$route['pos/cashier/recall/view-receipt'] = "Cashier/Recall/view_receipt";
$route['pos/cashier/recall/edit-receipt'] = "Cashier/Recall/edit_receipt";
$route['pos/cashier/recall/printer-check'] = "Cashier/Recall/printer_check_recall";
$route['pos/cashier/user-restrict/passcode/reports'] = "Cashier/Cashier/checkpasscode";
$route['pos/cashier/check-user-manager'] = "Cashier/Cashier/check_user_manager";

/* End */

/* POS Re-Order Item */
$route['pos/pointofsale/re-order'] = "pos/Pos/reorder_item";

/* Open Cash Drawer in POS Main Menu **/
$route["pos/pointofsale/check-passcode"] = "pos/Pos/check_passcode";

/* Alerts */
$route['pos/alerts/process'] = "pos/Alert_process/include_process_page";
$route['pos/alert/q-yes-no'] = "pos/Alert_process/include_q_yes_no";
$route['pos/alerts/card-process'] = "pos/Alert_process/include_card_process";

/*
|------------------------------------------------------------------------------------
| Datacap Controller
|------------------------------------------------------------------------------------
 */
$route['pos/pointofsale/device/deviceversion'] = "pos/Datacap/server_version";
$route['pos/pointofsale/device/deviceinitreader'] = "pos/Datacap/device_init_reader";
$route['pos/pointofsale/device/devicecreditsale'] = "pos/Datacap/device_credit_sale";
$route['pos/pointofsale/device/swipe/devicecreditsale'] = "pos/Datacap/device_credit_swipe_sale";
$route['pos/pointofsale/device/test'] = "pos/Datacap/test";
$route['pos/pointofsale/device/reset'] = "pos/Datacap/device_reset";
$route['pos/pointofsale/device/function/test'] = "pos/Datacap/test_function";
$route['pos/pointofsale/device/batch/summary'] = "pos/Datacap/batch_summary";
$route['pos/pointofsale/device/batch/close'] = "pos/Datacap/batch_close";
$route['pos/pointofsale/device/adjust-tip'] = "pos/Datacap/AdjustTip";
$route['pos/pointofsale/device/param-download'] = "pos/Datacap/param_download";
$route['pos/pointofsale/tips'] = "pos/Pos/tip_dollar_percent";
$route['pos/pointofsale/creditcardpayment'] = "pos/Payment/credit_card_payment_apply";
$route['pos/pointofsale/creditcard/process/save'] = "pos/Payment/credit_card_payment_apply";
$route['pos/pointofsale/customer/credit-card/check'] = "pos/Datacap/customer_credit_card_check";
$route['pos/pointofsale/datacap/check-print-receipt'] = "pos/Datacap/print_receipt_check";
$route['pos/pointofsale/credit-card/authorization/api'] = "pos/Datacap/card_auth_api";
$route['pos/pointofsale/credit-card/card-on-file/sale/api'] = "pos/Datacap/card_payment_on_the_go_api";

$route['pos/pointofsale/return_by_record_number'] = "pos/Datacap/return_by_record_number";

$route['pos/pointofsale/credit-card/reprint-receipt'] = "pos/Datacap/reprint_receipt";

$route['pos/pointofsale/credit-card-authorized-signature'] = "pos/Datacap/credit_card_auth_sign";
/*
|-------------------------------------------------------------------------------------
| POS Swipe Create Customer
|-------------------------------------------------------------------------------------
 */
$route['pos/pointofsale/swipe/create-customer'] = "pos/Pos/swipe_create_customer";

//--> Signature
$route['pos/pointofsale/credit-card-signature'] = "pos/Datacap/payment_signature";
//--> Clear Signature
$route['pos/pointofsale/clear-signature'] = "pos/Datacap/clear_signature";
//--> BackOffice Cash Out
$route['backoffice/cashier/insert-station-cashout'] = "pos/Cashier/process_station_cashout";  //hd 4-30-2016
//--> Check Device Connection
$route['pos/batch-device-connection'] = "pos/Datacap/device_connection";
//--> EBT Balance Inquiry
$route['pos/pointofsale/ebt-balance'] = "pos/Datacap/ebt_balance_inquiry";
//--> Sale On the Go
$route['pos/pointofsale/card-payment-on-the-go'] = "pos/Datacap/card_payment_on_the_go";
//-->Zero Auth
$route['pos/pointofsale/zero-auth'] = "pos/Datacap/zero_auth";

//-->Gift Card Issue Test
$route['pos/pointofsale/giftcard/issue-test'] = "pos/Datacap/gift_card_void_issue_test";
//-->Gift Card Issue
$route['pos/pointofsale/giftcard/issue'] = "pos/Datacap/gift_card_issue";
//-->Gift Card Balance
$route['pos/pointofsale/giftcard/balance'] = "pos/Datacap/gift_card_balance";
//-->Gift Card Sale
$route['pos/pointofsale/giftcard/sale'] = "pos/Datacap/gift_card_sale";
//-->Gift Card Sale Void
$route['pos/pointofsale/giftcard/void-sale'] = "pos/Datacap/gift_card_void_sale";
//-->Gift Card Return
$route['pos/pointofsale/giftcard/return'] = "pos/Datacap/gift_card_return";
//-->Gift Card Refund Item
$route['pos/pointofsale/giftcard/return-item'] = "pos/Datacap/gift_card_return_item";
//-->Gift Card Return Void
$route['pos/pointofsale/giftcard/void-return'] = "pos/Datacap/gift_card_return_void";
//-->Gift Card NSF Sale
$route['pos/pointofsale/giftcard/nsf-sale'] = "pos/Datacap/gift_card_nsf_sale";
//-->Gift Card Cash Out
$route['pos/pointofsale/giftcard/cash-out'] = "pos/Datacap/gift_card_cash_out";
//-->Gift Card Get Prepaid Stripe
$route['pos/pointofsale/giftcard/get-prepaid-stripe'] = "pos/Datacap/gift_card_get_prepaid_stripe";
//-->Gift Card Reload
$route['pos/pointofsale/giftcard/reload'] = "pos/Datacap/gift_card_reload";
//-->Gift Card Void Issue
$route['pos/pointofsale/giftcard/void-issue'] = "pos/Datacap/gift_card_void_issue";
//-->Gift Card Void Reload
$route['pos/pointofsale/giftcard/void-reload'] = "pos/Datacap/gift_card_void_reload";
//-->Gift Card Return Approved
$route['pos/pointofsale/giftcard/return-approved'] = "pos/Pos/return_item_approved";
//-->Gift Card Return Sale
$route['pos/pointofsale/giftcard/return-sale'] = "pos/Datacap/gift_card_return_sale";
//-->Gift Card Refund
$route['pos/pointofsale/giftcard/refund'] = "pos/Datacap/gift_card_refund";
//-->Gift Card Void Return Non-Payment
$route['pos/pointofsale/giftcard/void-return-non-payment'] = "pos/Datacap/gift_card_void_return_non_payment";
//-->Gift Card Option
$route['pos/pointofsale/giftcard/options'] = "pos/Pos/giftcard_account_option";
//-->Gift Card Test Issue
$route['pos/pointofsale/giftcard/void-issue-test'] = "pos/Datacap/gift_card_void_issue_test";
//-->Gift Card Account Default
$route['pos/pointofsale/giftcard/account-default'] = "pos/Pos/gift_card_account_default";
//-->Gift Card Print Balance
$route['pos/pointofsale/giftcard/print-balance'] = "pos/Pos/gift_card_print_balance";
//-->Reprint Receipt Return Exchange
$route['pos/pointofsale/reprint-receipt'] = "pos/Pos/reprint_receipt_return_exchange";


//POS Pole Display  HD 4/30/16
$route['pos/pointofsale/poledisplay'] = "pos/Poledisplay/commands";
$route['pos/pointofsale/poledisplay/reset'] = "pos/Poledisplay/command_reset";
$route['pos/pointofsale/poledisplay/total'] = "pos/Poledisplay/command_payment_total";
$route['pos/pointofsale/poledisplay/payment'] = "pos/Poledisplay/command_payment_apply";

$route['pos/poledisplay'] = "pos/Poledisplay_chris/display";   //chris pole display test


$route['pos/pointofsale/poledisplay/serial'] = "pos/Poledisplay/serial_pole_display";
/*
|----------------------------------------------------------
| Print Receipt
|----------------------------------------------------------
 */
$route['pos/print/test'] = "pos/Payment/kitchen_print_receipt";//"pos/PrintReceipt/test";

$route['pos/print/test-me'] = "pos/PrintReceipt/test";

$route['pos/cashier/print/timeclock/report'] = "Cashier/CashOutServer/print_time_clock_report";

//POS--> Tests
$route['pos/pointofsale/customers'] = "pos/Pos/customers";
$route['pos/pointofsale/just-test'] = "pos/Pos/justtest";
$route['pos/pointofsale/pos-computation'] = "pos/Pos/POSComputation";
$route['pos/pointofsale/print'] = "pos/Payment/testprint";
$route['pos/pointofsale/sampleprint'] = "pos/Payment/samplereceipt";
$route['pos/pointofsale/samplereceipt'] = "pos/Payment/samplereceipt";
$route['pos/pointofsale/credit-card-form'] = "pos/Pos/credit_card_form";
$route['pos/cashier/open-drawer'] = "pos/Cashier/open_drawer_onclick";
$route['pos/load-timeclock-test'] = "pos/Timeclock/load_data_test";
$route['pos/pointofsale/arraytest'] = "pos/Pos/array_test";
$route['pos/pointofsale/stop-process'] = 'pos/Pos/stop_sleep'; 
$route['pos/cashier/giftcard-total'] = "Cashier/Cashier/test_giftcard";
$route['pos/pointofsale/testpage'] = "pos/Pos/pointofsale_test_view";
$route['pos/pointofsale/testcookie'] = "pos/Pos/test_cookie_page";
$route['pos/pointofsale/test/session'] = "pos/Pos/test_getdata_session";
$route['pos/pointofsale/test/save_data'] = "pos/Pos/array_test_save";

$route['pos/cashout/pdf/test'] = "Cashier/Email/cashout_pdf_convert";


//Back Office --> Tests
$route['pos/test'] = "backoffice/Backoffice/include_testone";

//Other --> email blaster
$route['sendblaster'] = "other/Sendblaster/sendblaster_windwarddb";
$route['sendblaster/(:any)'] = "other/Sendblaster/$1";
$route['emailblaster'] = "other/Sendblaster_email/login";
$route['emailblaster/(:any)'] = "other/Sendblaster_email/$1";

//Other --> windward sync
$route['windwardsync'] = "other/Windward_sync/version";
$route['windwardsync/(:any)'] = "other/Windward_sync/$1";

//BackOffice Administration -- Dashboard by CH
$route['backoffice/administration'] = "backoffice/admin_side";
$route['dashboard/admin'] = 'admin/Dashboardcontroller';

//BackOffice Menu v1 by CH
$route['dashboard/admin/menu'] = 'admin/Menucategory';

//BackOffice Menu v2 by Axhon
$route['dashboard/admin/menuV2'] = 'admin/Menucategorynew';
$route['dashboard/admin/menu_react'] = "admin/Menucategoryreact";
$route['api/backoffice/menu']['GET'] = "admin/Menucategoryreact/get_menu_all";
$route['api/backoffice/menu']['POST'] = "admin/Menucategoryreact/post_menu";
$route['api/backoffice/menu']['PUT'] = "admin/Menucategoryreact/put_menu";
$route['api/backoffice/menu']['DELETE'] = "admin/Menucategoryreact/delete_menu";
$route['api/backoffice/menu/items']['GET'] = "admin/Menucategoryreact/get_items";
$route['api/backoffice/menu/categories/(:num)']['GET'] = "admin/Menucategoryreact/get_category/$1";

// Backoffice Menu extend function
$route['backoffice/menu-item/update-info'] = "admin/Menuitem/menu_item_update_info";
$route['backoffice/menu-item/categorytab'] = "admin/Menuitem/category_tab_content";
$route['backoffice/menu-item/menu/data'] = "admin/Menuitem/menu_data";


$route['dashboard/admin/menu/data'] = "admin/Menucategory/get_menu_data";

// BackOffice Departments by Axhon -- This is a test API where Views can fetch data w/o PHP
$route['api/backoffice/departments']['GET'] = "backoffice/Departments/api_get_departments";
$route['api/backoffice/departments']['POST'] = "backoffice/Departments/api_post_department";
$route['api/backoffice/departments']['PUT'] = "backoffice/Departments/api_put_department";
$route['api/backoffice/departments']['DELETE'] = "backoffice/Departments/api_delete_department";

//BackOffice Administration -- Users v1 by CH
$route['dashboard/admin/users'] = 'admin/User';

//Backoffice Administration -- V2 by KC & JS
$route['backoffice/user/echo']   = "backoffice/Users/user_echo";
$route['backoffice/user/index']  = "backoffice/Users/user_view";
$route['backoffice/user/select'] = "backoffice/Users/users_select";
$route['backoffice/user/purchase'] = "backoffice/Users/purchase"; 
$route['backoffice/user/store_item'] = "backoffice/Users/store_item"; 
$route['backoffice/user/update_item'] = "backoffice/Users/update_item";
$route['backoffice/user/delete_item'] = "backoffice/Users/delete_row";
$route['backoffice/user/store_position'] = "backoffice/Users/store_position"; 
$route['backoffice/user/update_position'] = "backoffice/Users/update_position";

$route['backoffice/get_positions_row'] = "backoffice/Users/get_positions_row";

$route['backoffice/user/default_position'] = "backoffice/Users/default_position";
$route['backoffice/user/default_iposition'] = "backoffice/Users/default_iposition";

$route['backoffice/user/store_email'] = "backoffice/Users/store_email"; 
$route['backoffice/user/update_email'] = "backoffice/Users/update_email"; 


//BackOffice Customers V1 -- No Longer In Use -- by CH
$route['dashboard/admin/customers'] = 'admin/Customer';

//BackOffice Items V1 -- No Longer In Use -- By CH
$route['dashboard/items'] = 'admin/ItemController';

//BackOffice Items -- Count Module -- By CH
// $route['dashboard/items/count'] = 'admin/ItemController/countPage';
$route['dashboard/items/count'] = 'admin/ItemCountDev/item_count';
$route['dashboard/items/count/import'] = 'admin/ItemController/countImportPage';

// BackOffice Item Count Module by HD
$route['dashboard/item/count/version2'] = "admin/Itemcountdev/item_count";
$route['dashboard/item/count/data'] = "admin/Itemcountdev/item_count_data";
$route['dashboard/item/count/location'] = "admin/Itemcountdev/item_count_location";
$route['dashboard/item/count/category'] = "admin/Itemcountdev/category";
$route['dashboard/item/count/supplier'] = "admin/Itemcountdev/supplier";
$route['dashboard/item/count/build-count-list'] = "admin/Itemcountdev/build_count_list";
$route['dashboard/item/count/get-item-list'] = "admin/Itemcountdev/get_item_list";
$route['dashboard/item/count/save'] = "admin/Itemcountdev/item_count_save";
$route['dashboard/item/count/finish-count'] = "admin/Itemcountdev/finish_count";
$route['dashboard/item/count/zero-not-counted'] = "admin/Itemcountdev/zero_not_counted";
$route['dashboard/item/count/delete-items'] = "admin/Itemcountdev/DeleteCheckedItems";
$route['dashboard/item/count/delete-count'] = "admin/Itemcountdev/delete_count";
$route['dashboard/item/count/save-changes'] = "admin/Itemcountdev/complete_save_changes";
$route['dashboard/item/count/select-category'] = "admin/Itemcountdev/select_category";

//BackOffice Items -- Brand Module -- by CH
$route['dashboard/items/brands'] = 'admin/ItemController/brandsPage';

//BackOffice Item Module by KC
$route['backoffice/item/echo'] = "backoffice/Item/item_echo";
$route['backoffice/item/index'] = "backoffice/Item/item_view";
$route['backoffice/item/select'] = "backoffice/Item/item_select";
$route['backoffice/item/purchase'] = "backoffice/Item/purchase";
$route['backoffice/item/integration_select'] = "backoffice/Item/integration_select";
$route['backoffice/item/store_item'] = "backoffice/Item/store_item";
$route['backoffice/item/update_item'] = "backoffice/Item/update_item";
$route['backoffice/item/delete_item'] = "backoffice/Item/delete_row";

$route['backoffice/item/search-item'] = "backoffice/Item/search_item";

$route['backoffice/item/select/data'] = "backoffice/Item/item_load";

//-->Test
$route['pos/pointofsale/print-check-test'] = "pos/Pos/network_check_test";

//-->Load Settings
$route['pos/load/settings'] = 'pos/Pos/load_settings';

//BackOffice --> WW Stars Item by KC
$route['dashboard/stars/item'] = 'backoffice_ww/Stars';
$route['dashboard/stars/item/load_items'] = 'backoffice_ww/Stars/load_items';

//Star Distribution Report for Cycle City by KC
$route['star_distribution'] = "backoffice_ww/Star_distribution/view";
$route['star_distribution/import'] = "backoffice_ww/Star_distribution/import";
$route['star_distribution/report'] = "backoffice_ww/Star_distribution/report";
$route['star_distribution/select'] = "backoffice_ww/Star_distribution/report_select";
$route['star_distribution/export'] = "backoffice_ww/Star_distribution/excel_export";

//BackOffice --> Station Pictures List by KC
$route['dashboard/station_pictures/index'] = 'backoffice/Station_pictures/index';

//POS --> Get Item informations by parentunique
$route['pos/pointofsale/edit-group-item'] = "pos/Pos/edit_group_item";

//BackOffice --> TimeClock Edit by KC
$route['backoffice/timeclock/echo'] = "backoffice/TimeClock/timeclock_echo";
$route['backoffice/timeclock/index'] = "backoffice/TimeClock/timeclock_view";
$route['backoffice/timeclock/select'] = "backoffice/TimeClock/timeclock_select";
$route['backoffice/timeclock/export'] = "backoffice/TimeClock/timeclock_export";
$route['backoffice/timeclock/download'] = "backoffice/TimeClock/timeclock_download";

//Backoffice --> TimeSheet
// $route['backoffice/timeclock/echo'] = "backoffice/Backoffice_timeclock/timeclock_echo";
$route['backoffice/timesheet/index'] 			= "backoffice/Timesheet/timeclock_view";
$route['backoffice/timesheet/select'] 			= "backoffice/Timesheet/timeclock_select";
$route['backoffice/timesheet/select_row'] 		= "backoffice/Timesheet/select_row";
$route['backoffice/timesheet/store_item'] 		= "backoffice/Timesheet/store_item";
$route['backoffice/timesheet/delete'] 			= "backoffice/Timesheet/delete_row";
$route['backoffice/timesheet/update_item'] 		= "backoffice/Timesheet/update_item";
$route['backoffice/timesheet/update_approve'] 	= "backoffice/TimeSseet/update_approve";
$route['backoffice/timesheet/update_edit'] 		= "backoffice/TimeSseet/update_edit";
$route['backoffice/timesheet/export_detail'] 	= "backoffice/Timesheet/timeclock_export";
$route['backoffice/timesheet/export_detail_by_employee'] = "backoffice/Timesheet/timeclock_export_by_employee"; 
$route['backoffice/timesheet/summary_select'] 	= "backoffice/Timesheet/timeclock_summary_select";
$route['backoffice/timesheet/export_summary'] 	= "backoffice/Timesheet/timeclock_export_summary";
$route['backoffice/timesheet/download'] 		= "backoffice/Timesheet/timeclock_download";

$route['backoffice/timesheet/export_detail_pdf'] ="backoffice/Timesheet/timeclock_export_pdf";
$route['backoffice/timesheet/export_summary_pdf'] ="backoffice/Timesheet/timeclock_export_summary_pdf";

$route['backoffice/timesheet/test_pdf'] ="backoffice/Timesheet/test_pdf";

$route['backoffice/cookie'] = "backoffice/Backoffice/cookie_reference";

$route['backoffice/timesheet/update-timeclock'] = "backoffice/Timesheet/timeclock_update_data";

$route['backoffice/timesheet/new-timeclock'] = "backoffice/Timesheet/timeclock_new_data";

$route['backoffice/timesheet/delete-timeclock'] = "backoffice/Timesheet/timeclock_delete_data";

$route['backoffice/timesheet/pay-period'] = "backoffice/Timesheet/pay_period";

$route['backoffice/timesheet/project_jobs_status'] = "backoffice/Timesheet/get_project_jobs_status";

$route['backoffice/timesheet/getcostcode'] = "backoffice/Timesheet/get_cost_code";

$route['backoffice/time_sheet/search/ot'] = "backoffice/Timesheet/search_ot";

$route['backoffice/timesheet/get-user-position/(:any)/(:any)'] = "backoffice/Timesheet/get_user_position/$1/$2";


// Backoffice Paycode dropdown
$route['backoffice/timesheet/PayCode_list'] 	= "backoffice/Timesheet/select_paycode";
$route['backoffice/timesheet/PayCode_list1'] 	= "backoffice/Timesheet/select_paycode1";
$route['backoffice/timesheet/PayCode_add'] 	= "backoffice/Timesheet/add_paycode";
$route['backoffice/timesheet/PayCode_update'] 	= "backoffice/Timesheet/delete_paycode";
$route['backoffice/timesheet_select_dropdown'] 	= "backoffice/Timesheet/select_dropdown";

//BackOffice --> Item Category by KC
$route['backoffice/itemcategory/echo'] = "backoffice/Itemcategory/itemcategory_echo";
$route['backoffice/itemcategory/index'] = "backoffice/Itemcategory/itemcategory_view";
$route['backoffice/itemcategory/select'] = "backoffice/Itemcategory/itemcategory_select";
$route['backoffice/itemcategory/subcategory_select'] = "backoffice/Itemcategory/item_subcategory_select";
$route['backoffice/itemcategory/export'] = "backoffice/Itemcategory/itemcategory_export";
$route['backoffice/itemcategory/download'] = "backoffice/Itemcategory/itemcategory_download";

//BackOffice Admin --> User Position by KC
$route['backoffice/userposition/echo'] = "backoffice/Userposition/user_position_echo";
$route['backoffice/userposition/index'] = "backoffice/Userposition/user_position_view";
$route['backoffice/userposition/select'] = "backoffice/Userposition/user_position_select";
$route['backoffice/userposition/security_select'] = "backoffice/Userposition/user_security_select";
$route['backoffice/userposition/department-list'] = "backoffice/Userposition/Department_list";
$route['backoffice/userposition/create-department'] = "backoffice/Userposition/add_department";
$route['backoffice/userposition/jobcost'] = "backoffice/Userposition/get_default_job_cost";


$route['backoffice/userposition/reload/attribute'] = "backoffice/Userposition/reload_attribute";

//POS --> Email Receipt Form with Receipt View by HD
$route['pos/pointofsale/email/form'] = "pos/Email/email_receipt_form_view";
$route['pos/pointofsale/email/receipt-pdf'] = "pos/Email/pdf_convert";
$route['pos/pointofsale/email/send-email'] = "pos/Email/send_email";
$route['pos/pointofsale/email/download-receipt'] = "pos/Email/download_receipt";
$route['pos/pointofsale/customer/email-options'] = "pos/Email/customer_email_options";

//BackOffice --> WW CustomerDemo by KC
$route['customerdemo'] = "backoffice_ww/customerdemo/demographics";
$route['customerdemo/(:any)'] = "backoffice_ww/customerdemo/$1";

//BackOffice Admin Discounts by KC
$route['backoffice/discounts/echo'] = "backoffice/Discounts/discounts_echo";
$route['backoffice/discounts/index'] = "backoffice/Discounts/discounts_view";
$route['backoffice/discounts/select'] = "backoffice/Discounts/discounts_select";
$route['backoffice/discounts/get_items'] = "backoffice/Discounts/get_items";
$route['backoffice/discounts/store_item'] = "backoffice/Discounts/store_item";
$route['backoffice/discounts/update_item'] = "backoffice/Discounts/update_item";
$route['backoffice/discounts/delete_item'] = "backoffice/Discounts/delete_row";
$route['backoffice/discounts/get_discounts_details'] = "backoffice/Discounts/get_discounts_details";
$route['backoffice/discounts/export'] = "backoffice/Discounts/discounts_export";
$route['backoffice/discounts/download'] = "backoffice/Discounts/discounts_download";

// BackOffice --> Customer Points By Chris && JES
$route['backoffice/customer_points/index']			 = "backoffice/CustomerPoints/customer_points_view";
$route['backoffice/customer_points/select'] 		 = "backoffice/CustomerPoints/customer_points_select";
$route['backoffice/customer_points/row_select'] 	 = "backoffice/CustomerPoints/customer_points_row_select";
$route['backoffice/customer_points/store_item'] 	 = "backoffice/CustomerPoints/store_item";
$route['backoffice/customer_points/update_item'] 	 = "backoffice/CustomerPoints/update_item";
$route['backoffice/customer_points/delete_item'] 	 = "backoffice/CustomerPoints/delete_item";

//BackOffice -- Receipt Design module by KC
$route['backoffice/receipt_design/echo'] = "backoffice/Receipt_design/receipt_design_echo";
$route['backoffice/receipt_design/index'] = "backoffice/Receipt_design/receipt_design_view";
$route['backoffice/receipt_design/select'] = "backoffice/Receipt_design/receipt_design_select";
$route['backoffice/receipt_design/get_items'] = "backoffice/Receipt_design/get_items";
$route['backoffice/receipt_design/store_item'] = "backoffice/Receipt_design/store_item";
$route['backoffice/receipt_design/update_item'] = "backoffice/Receipt_design/update_item";
$route['backoffice/receipt_design/delete_item'] = "backoffice/Receipt_design/delete_row";

//BackOffice Admin Returns by KC
$route['backoffice/returns/echo'] = "backoffice/Returns/returns_echo";
$route['backoffice/returns/index'] = "backoffice/Returns/returns_view";
$route['backoffice/returns/select'] = "backoffice/Returns/returns_select";
$route['backoffice/returns/get_items'] = "backoffice/Returns/get_items";
$route['backoffice/returns/store_item'] = "backoffice/Returns/store_item";
$route['backoffice/returns/update_item'] = "backoffice/Returns/update_item";
$route['backoffice/returns/delete_item'] = "backoffice/Returns/delete_row";
$route['backoffice/returns/get_returns_details'] = "backoffice/Returns/get_returns_details";
$route['backoffice/returns/export'] = "backoffice/Returns/returns_export";
$route['backoffice/returns/download'] = "backoffice/Returns/returns_download";

//BackOffice Admin Order Type by KC
$route['backoffice/order_type/echo'] = "backoffice/Order_type/order_type_echo";
$route['backoffice/order_type/index'] = "backoffice/Order_type/order_type_view";
$route['backoffice/order_type/select'] = "backoffice/Order_type/order_type_select";
$route['backoffice/order_type/get_items'] = "backoffice/Order_type/get_items";
$route['backoffice/order_type/store_item'] = "backoffice/Order_type/store_item";
$route['backoffice/order_type/update_item'] = "backoffice/Order_type/update_item";
$route['backoffice/order_type/delete_item'] = "backoffice/Order_type/delete_row";

//BackOffice Admin Payout by KC
$route['backoffice/payout/echo'] = "backoffice/Payout/payout_echo";
$route['backoffice/payout/index'] = "backoffice/Payout/payout_view";
$route['backoffice/payout/select'] = "backoffice/Payout/payout_select";
$route['backoffice/payout/get_items'] = "backoffice/Payout/get_items";
$route['backoffice/payout/store_item'] = "backoffice/Payout/store_item";
$route['backoffice/payout/update_item'] = "backoffice/Payout/update_item";
$route['backoffice/payout/delete_item'] = "backoffice/Payout/delete_row";

//BackOffice Admin Tax module by KC
$route['backoffice/tax/echo'] = "backoffice/Tax/tax_echo";
$route['backoffice/tax/index'] = "backoffice/Tax/tax_view";
$route['backoffice/tax/select'] = "backoffice/Tax/tax_select";
$route['backoffice/tax/get_items'] = "backoffice/Tax/get_items";
$route['backoffice/tax/store_item'] = "backoffice/Tax/store_item";
$route['backoffice/tax/update_item'] = "backoffice/Tax/update_item";
$route['backoffice/tax/delete_item'] = "backoffice/Tax/delete_row";

//BackOffice Admin Payments by KC
$route['backoffice/payments/echo'] = "backoffice/Payments/payment_echo";
$route['backoffice/payments/index'] = "backoffice/Payments/payment_view";
$route['backoffice/payments/select'] = "backoffice/Payments/payment_select";
$route['backoffice/payments/integration_select'] = "backoffice/Payments/integration_select";
$route['backoffice/payments/export'] = "backoffice/Payments/itemcategory_export";
$route['backoffice/payments/download'] = "backoffice/Payments/itemcategory_download";

//BackOffice Item Transfer
$route['backoffice/item_transfer/echo'] = "backoffice/Itemtransfer/item_transfer_echo";
$route['backoffice/item_transfer/index'] = "backoffice/Itemtransfer/item_transfer_view";
//$route['backoffice/item_transfer/select'] = "backoffice/ItemTransfer/item_transfer_select"; old
$route['backoffice/item_transfer/select/(:any)'] = "backoffice/Itemtransfer/item_transfer_select/$1";
$route['backoffice/item_transfer/get_items'] = "backoffice/Itemtransfer/get_items";
$route['backoffice/item_transfer/store_item'] = "backoffice/Itemtransfer/store_item";
$route['backoffice/item_transfer/update_item'] = "backoffice/Itemtransfer/update_item";
$route['backoffice/item_transfer/complete_transfer'] = "backoffice/Itemtransfer/complete_transfer";
$route['backoffice/item_transfer/delete_item'] = "backoffice/Itemtransfer/delete_row";
$route['backoffice/item_transfer/get_item_transfer_details'] = "backoffice/Itemtransfer/get_item_transfer_details";
$route['backoffice/item_transfer/export'] = "backoffice/Itemtransfer/item_transfer_export";
$route['backoffice/item_transfer/download'] = "backoffice/Itemtransfer/download";
$route['backoffice/item_transfer/print_pdf'] = "backoffice/Itemtransfer/print_pdf";
//-->Print Receipt
$route['backoffice/item_transfer/print-receipt'] = "backoffice/ItemTransfer/printer_status_check";
$route['backoffice/transfer/print_reference'] = "backoffice/ItemTransfer/print_reference";


//BackOffice Purchase Receive by KC
$route['backoffice/purchase/echo'] = "backoffice/Purchase/Purchase_echo";
$route['backoffice/purchase/index'] = "backoffice/Purchase/Purchase_view";
$route['backoffice/purchase/select/(:any)'] = "backoffice/Purchase/Purchase_select/$1";
$route['backoffice/purchase/get_items'] = "backoffice/Purchase/get_items";
$route['backoffice/purchase/get_supplier'] = "backoffice/Purchase/get_supplier";
$route['backoffice/purchase/get_location'] = "backoffice/Purchase/get_location";
$route['backoffice/purchase/store_item'] = "backoffice/Purchase/store_item";
$route['backoffice/purchase/update_item'] = "backoffice/Purchase/update_item";
$route['backoffice/purchase/complete_transfer'] = "backoffice/Purchase/complete_purchase";
$route['backoffice/purchase/delete_item'] = "backoffice/Purchase/delete_row";
$route['backoffice/purchase/get_item_transfer_details'] = "backoffice/Purchase/get_item_transfer_details";
$route['backoffice/purchase/download'] = "backoffice/Purchase/download";
$route['backoffice/purchase/print_pdf'] = "backoffice/Purchase/print_pdf";
$route['backoffice/purchase/print_recieve/(:any)'] = "backoffice/Purchase/print_recieve/$1";
$route['backoffice/purchase/store_purchase_supplier'] = "backoffice/Purchase/store_purchase_supplier";
$route['backoffice/purchase/update_purchase_supplier'] = "backoffice/Purchase/update_purchase_supplier";
$route['backoffice/purchase/store_purchase_location'] = "backoffice/Purchase/store_purchase_location";
$route['backoffice/purchase/get_supplier_location'] = "backoffice/Purchase/get_supplier_location";
$route['backoffice/purchase/update_purchase_location'] = "backoffice/Purchase/update_purchase_location";
$route['backoffice/purchase/add_supplier'] = "backoffice/Purchase/add_supplier";
$route['backoffice/purchase/send-po'] = "backoffice/Purchase/send_po";
$route['backoffice/purchase/receive_po'] = "backoffice/Purchase/receive_po";
$route['backoffice/purchase/get_purchase_receive'] = "backoffice/Purchase/receive_po_count";
$route['ackoffice/purchase/update_receiving'] = "backoffice/Purchase/update_receiving";
$route['backoffice/purchase/get_purchase_receive/new'] = "backoffice/Purchase/get_purchase_receive_new";
$route['backoffice/purchase/add_po_item'] = "backoffice/Purchase/add_po_item";
$route['backoffice/purchase/get_purchase_receive_by_id'] = "backoffice/Purchase/get_purchase_receive";
$route['backoffice/purchase/get_purchase_details_by_id'] = "backoffice/Purchase/get_purchase_details_by_id";

$route['backoffice/purchase/print_po_reference'] = "backoffice/Purchase/print_po";
$route['backoffice/purchase/print_receive_reference'] = "backoffice/Purchase/print_receive_process";
$route['backoffice/purchase/download_purchase_receive'] = "backoffice/Purchase/download_purchase_receive"; 
$route['backoffice/purchase/get_po_items'] = "backoffice/Purchase/cached_items";
$route['backoffice/purchase/set_purchase_default'] = "backoffice/Purchase/set_purchase_default";

$route['backoffice/purchase/delete_receiving'] = "backoffice/Purchase/delete_receiving";

//BackOffice Supplier by KC
$route['backoffice/suppliers/echo'] = "backoffice/Supplier/supplier_echo";
$route['backoffice/suppliers/index'] = "backoffice/Supplier/supplier_view";
$route['backoffice/suppliers/select'] = "backoffice/Supplier/supplier_select";
$route['backoffice/suppliers/purchase'] = "backoffice/Supplier/purchase";
$route['backoffice/suppliers/integration_select'] = "backoffice/Supplier/integration_select";
$route['backoffice/suppliers/store_item'] = "backoffice/Supplier/store_item";
$route['backoffice/suppliers/update_item'] = "backoffice/Supplier/update_item";
$route['backoffice/suppliers/delete_item'] = "backoffice/Supplier/delete_row";

//BackOffice Reports --> Price Schedule Report by KC
$route['backoffice/price_schedule/echo'] = "backoffice/PriceSchedule/price_schedulet_echo";
$route['backoffice/price_schedule/index'] = "backoffice/PriceSchedule/price_schedule_view";
$route['backoffice/price_schedule/select'] = "backoffice/PriceSchedule/price_schedule_select";
$route['backoffice/price_schedule/integration_select'] = "backoffice/PriceSchedule/integration_select";
$route['backoffice/price_schedule/export'] = "backoffice/PriceSchedule/price_schedule_export";
$route['backoffice/price_schedule/download'] = "backoffice/PriceSchedule/price_schedule_download";

//BackOffice --> Price Schedule by KC
$route['backoffice/price_schedule/echo'] = "backoffice/PriceSchedule/price_schedulet_echo";
$route['backoffice/price_schedule/index'] = "backoffice/PriceSchedule/price_schedule_view";
$route['backoffice/price_schedule/select'] = "backoffice/PriceSchedule/price_schedule_select";
$route['backoffice/price_schedule/integration_select'] = "backoffice/PriceSchedule/integration_select";
$route['backoffice/price_schedule/export'] = "backoffice/PriceSchedule/price_schedule_export";
$route['backoffice/price_schedule/download'] = "backoffice/PriceSchedule/price_schedule_download";

//BackOffice Config Stock Adjust by KC
$route['backoffice/stock_adjust/echo'] = "backoffice/StockAdjust/stock_adjust_echo";
$route['backoffice/stock_adjust/index'] = "backoffice/StockAdjust/stock_adjust_view";
$route['backoffice/stock_adjust/select'] = "backoffice/StockAdjust/stock_adjust_select";
$route['backoffice/stock_adjust/store_item'] = "backoffice/StockAdjust/store_item";
$route['backoffice/stock_adjust/update_item'] = "backoffice/StockAdjust/update_item";
$route['backoffice/stock_adjust/delete_item'] = "backoffice/StockAdjust/delete_row";

//BackOffice Item Stock Adjust by KC
$route['backoffice/item_stock_adjust/echo'] = "backoffice/Item_stock_adjust/item_stock_adjust_echo";
$route['backoffice/item_stock_adjust/index'] = "backoffice/Item_stock_adjust/item_stock_adjust_view";
$route['backoffice/item_stock_adjust/select'] = "backoffice/Item_stock_adjust/item_stock_adjust_select";
$route['backoffice/item_stock_adjust/get_items'] = "backoffice/Item_stock_adjust/get_items";
$route['backoffice/item_stock_adjust/get_supplier'] = "backoffice/Item_stock_adjust/get_supplier";
$route['backoffice/item_stock_adjust/get_location'] = "backoffice/Item_stock_adjust/get_location";
$route['backoffice/item_stock_adjust/store_item'] = "backoffice/Item_stock_adjust/store_item";
$route['backoffice/item_stock_adjust/update_item'] = "backoffice/Item_stock_adjust/update_item";
$route['backoffice/item_stock_adjust/complete_transfer'] = "backoffice/Item_stock_adjust/complete_transfer";
$route['backoffice/item_stock_adjust/delete_item'] = "backoffice/Item_stock_adjust/delete_row";
$route['backoffice/item_stock_adjust/get_item_transfer_details'] = "backoffice/Item_stock_adjust/get_item_transfer_details";
$route['backoffice/item_stock_adjust/download'] = "backoffice/Item_stock_adjust/download";
$route['backoffice/item_stock_adjust/print_pdf'] = "backoffice/Item_stock_adjust/print_pdf";
$route['backoffice/item_stock_adjust/print_recieve/(:any)'] = "backoffice/Item_stock_adjust/print_recieve/$1";

// Backoffice Item Stock Adjust version2
$route['backoffice/item_stock_adjust_v2'] = "backoffice/Item_stock_adjust_v2/index";
$route['backoffice/item_stock_adjust_v2/list'] = "backoffice/Item_stock_adjust_v2/item_stock_adjust_select";
$route['backoffice/item_stock_adjust_v2/search-item'] = "backoffice/Item_stock_adjust_v2/item_search";
$route['backoffice/item_stock_adjust_v2/new'] = "backoffice/Item_stock_adjust_v2/new_adjust_stock";
$route['backoffice/item_stock_adjust_v2/update'] = "backoffice/Item_stock_adjust_v2/update_adjust_stock";
$route['backoffice/item_stock_adjust_v2/delete'] = "backoffice/Item_stock_adjust_v2/delete_adjust_stock";
$route['backoffice/item_stock_adjust_v2/details'] = "backoffice/Item_stock_adjust_v2/stock_adjust_details";
$route['backoffice/item_stock_adjust_v2/complete'] = "backoffice/Item_stock_adjust_v2/stock_adjust_complete";
$route['backoffice/item_stock_adjust_v2/download'] = "backoffice/Item_stock_adjust_v2/stock_adjust_download";
$route['backoffice/item_stock_adjust_v2/reload-items'] = "backoffice/Item_stock_adjust_v2/get_all_items";
$route['backoffice/item_stock_adjust_v2/email'] = "backoffice/Item_stock_adjust_v2/download_email_stock";

//BackOffice Item KC 9/1/17
$route['backoffice/item/echo'] = "backoffice/Item/item_echo";
$route['backoffice/item/index'] = "backoffice/Item/item_view";
$route['backoffice/item/select'] = "backoffice/Item/item_select";
$route['backoffice/item/purchase'] = "backoffice/Item/purchase";
$route['backoffice/item/integration_select'] = "backoffice/Item/integration_select";
$route['backoffice/item/store_item'] = "backoffice/Item/store_item";
$route['backoffice/item/update_item'] = "backoffice/Item/update_item";
$route['backoffice/item/delete_item'] = "backoffice/Item/delete_row";
//Added by HD 01/09/2020
$route['backoffice/item/store_serial'] = "backoffice/Item/store_serial";
$route['backoffice/Item/update_serial'] = "backoffice/Item/update_serial";
$route['backoffice/Item/delete_serial'] = "backoffice/Item/delete_serial";
$route['backoffice/Item/add_serial'] = "backoffice/Item/add_serial";
$route['backoffice/Item/add_barcode'] = "backoffice/Item/add_barcode";
$route['backoffice/Item/edit_barcode'] = "backoffice/Item/edit_barcode";
$route['backoffice/Item/delete_barcode'] = "backoffice/Item/delete_barcode";
//-->Add Category
$route['backoffice/item/category/add'] = "backoffice/Item/add_category";
$route['backoffice/item/category/list'] = "backoffice/Item/category_list";
$route['backoffice/item/category/update'] = "backoffice/Item/delete_category";

/* POS NUMPAD PLUGIN DEVELOPMENT */
$route['pos/development/plugin/numpad'] = "pos/DevelopmentController/pos_numpad_numeric";
$route['pos/development/plugin/numpad/design'] = "pos/DevelopmentController/pos_numpad_plugin";

$route['pos/pointofsale/swipe/credit'] = "pos/Datacap/test_credit_swipe";

//akback3 item barcodes old
//$route['barcode/print'] = "backoffice/Barcodes/print_barcode";
//$route['barcode/download'] = "backoffice/Barcodes/download";

//akback3 item barcodes new 2/1/18
$route['barcode/print'] = "backoffice/Item_barcode/print_barcode";
$route['barcode/download'] = "backoffice/Item_barcode/download";
$route['backoffice/barcode/print'] = "backoffice/Item_barcode/barcode_view";
$route['backoffice/barcode/print-label'] = "backoffice/Item_barcode/print_barcode2";
$route['backoffice/barcode/test'] = "backoffice/Item_barcode/create_label";
$route['backoffice/barcode/print_label_test'] = "backoffice/Item_barcode/print_label";
$route['backoffice/barcode/actual_print_label'] = "backoffice/Item_barcode/actual_print_label2";


//IBackoffice Item Style
$route['backoffice/item/style'] = "backoffice/ItemStyle/index";
$route['backoffice/item/style/option'] = "backoffice/ItemStyle/style_options";
$route['backoffice/item/style/load/column/types'] = "backoffice/ItemStyle/style_load_column_types";
$route['backoffice/item/style/load/column/types/edit'] = "backoffice/ItemStyle/style_load_column_types_edit";
$route['backoffice/item/style/save/data'] = "backoffice/ItemStyle/save_data";
$route['backoffice/item/style/update/data'] = "backoffice/ItemStyle/update_data";
$route['backoffice/item/style/select/category'] = "backoffice/ItemStyle/category_select";
$route['backoffice/item/style/template/details'] = "backoffice/Itemstyle/get_item_styles_template_details";
$route['backoffice/item/style/all'] = "backoffice/Itemstyle/get_item_styles_templates";
$route['backoffice/item/style/template/id'] = "backoffice/Itemstyle/item_style_unique";
$route['backoffice/item-matrix/load/category'] = "backoffice/Itemstyle/load_category";
$route['backoffice/item-matrix/load/subcategory'] = "backoffice/Itemstyle/load_subcategory";
$route['backoffice/item-matrix/load/supplier'] = "backoffice/Itemstyle/load_supplier";
$route['backoffice/item-matrix/load/template'] = "backoffice/Itemstyle/load_template";
$route['backoffice/item-matrix/load/location'] = "backoffice/Itemstyle/load_location";
$route['backoffice/item-matrix/compare'] = "backoffice/Itemstyle/compare_object";
$route['backoffice/item-matrix/process-new'] = "backoffice/Itemstyle/get_object_difference";
$route['backoffice/item-matrix/matrix-fields'] = "backoffice/Itemstyle/matrix_fields";
$route['backoffice/item/style/clone/data'] = "backoffice/Itemstyle/matrix_clone_data";
$route['backoffice/item/style/delete'] = "backoffice/Itemstyle/delete_matrix_item";

// Matrix Plugin for all
$route['backoffice/itemstyle/save-data'] = "backoffice/ItemStyle/matrix_save_data";
$route['backoffice/itemstyle/delete-item'] = "backoffice/ItemStyle/matrix_delete_item";
$route['backoffice/itemstyle/update-data'] = "backoffice/ItemStyle/matrix_update_data";
$route['backoffice/itemstyle/item_tax'] = "backoffice/ItemStyle/matrix_item_tax";


// Plugin Item matrix
$route['backoffice/itemstyle/generate_form'] = 'backoffice/Itemstyle/generate_form';


//-->Test
$route['backoffice/item/style/test'] = "backoffice/Itemstyle/item_matrix_display";
$route['backoffice/item/view/layout'] = "backoffice/Itemstyle/item_matrix_view";

$route['backoffice/item/style/edit'] = "backoffice/Itemstyle/edit_style";

// backoffice departments
$route['backoffice/departments/index'] = "backoffice/Departments/index";

//Print Setup
$route['pos/cashier/cashin/print'] = "Cashier/CashInServer/print_receipt_new";
$route['pos/cashier/cashout/print'] = "Cashier/CashOutServer/print_receipt_new";

//Print Barcode LPT
$route['pos/pointofsale/print/barcode/lpt'] = "pos/Customer/print_barcode_lpt";

//Test Print Store Credit (remove after test)
$route['pos/pointofsale/print/storecredit/print/balance/test'] = "pos/Payment/store_credit_print_balance";

//Test Email convert to pdf
$route['pos/cashier/cashout/create/pdf'] = "Cashier/Email/cashout_out";

$route['pos/cashier/cashout/employee/sales'] = "Cashier/Cashier/employee_sales";

$route['pos/cashier/cashout/employee/sales/pdf'] = "Cashier/Email/employee_sales_pdf";

$route['pos/cashier/cashout/customer/sales/print'] = "Cashier/Cashier/customer_sales";

$route['pos/cashier/cashout/customer/sales/pdf'] = "Cashier/Email/customer_sales_pdf";

$route['pos/cashier/cashout/email/credit-details/pdf'] = "Cashier/Email/credit_sales_pdf";

$route['pos/cashier/test/print/pdf'] = "Cashier/Email/auto_print";

$route['pos/pointofsale/pdf/receipt'] = "pos/Email/pdf_receipt";

//$route['pos/pointofsale/pdf/receipt'] = "pos/Payment/print_pdf_receipt";


$route['pos/progress/test'] = "pos/Pos/test_progress";

$route['pos/progress/status'] = "pos/Pos/show_status";

$route['pos/payment/coindispenser/test'] = "pos/Payment/temp_test_coindispenser";

$route['pos/open/drawer'] = "pos/Datacap/open_drawer_onclick";


/**
 * Backoffice Clock In and Out by HD
 */
$route['backoffice/timeclock-quick/user/passcode'] = "backoffice/Timeclock_quick/checkpasscode";
$route['backoffice/timeclock-quick/user/save'] = "backoffice/Timeclock_quick/timeclock_punch_save";
$route['backoffice/timeclock-quick/user/check'] = "backoffice/Timeclock_quick/timeclock_punch_check";
$route['backoffice/timeclock-quick/user/update'] = "backoffice/Timeclock_quick/timeclock_punch_update";
$route['backoffice/timeclock-quick/user/comment-save'] = "backoffice/Timeclock_quick/timeclock_comment_save";
$route['backoffice/timeclock-quick/user/print'] = "backoffice/Timeclock_quick/printer_check_timeclock";

$route['backoffice/timeclock-quick/user/server-update'] = "backoffice/Timeclock_quick/timeclock_punch_update_server";

$route['backoffice/timeclock/getpositions/(:any)/(:any)'] = "backoffice/Timeclock_quick/timeclock_get_positions/$1/$2";

/**
 * Backoffice Plugin Development by HD
 * Column chooser
 */
$route["backoffice/plugin/development"] = "backoffice/Backoffice/plugin_development";

/**
 * Back Office column selector by HD
 */
$route['backoffice/column-selector'] = "backoffice/Backoffice/backoffice_column_selector";
$route['plugin/attribute/update-data'] = "backoffice/Backoffice/plugin_update_data";
$route['backoffice/config_attribute/forms'] = "backoffice/Backoffice/config_attribute_grid";

/**
 * Back Office Customer Card Import by HD
 */
$route['backoffice/customer-card/import'] = "backoffice/CustomerCardImport/customer_card_view";
$route['backoffice/customer-card/status'] = "backoffice/CustomerCardImport/customer_card_status";
$route['backoffice/customer-card/auth'] = "backoffice/CustomerCardImport/process_card_auth_api";
$route['backoffice/customer-card/update'] = "backoffice/CustomerCardImport/customer_card_update";
$route['backoffice/import-data/table-list'] = "backoffice/CustomerCardImport/list_all_tables";
$route['backoffice/import-data/process'] = "backoffice/CustomerCardImport/import_process_data";
$route['backoffice/customer-card/renew-pending'] = "backoffice/CustomerCardImport/renew_pending";
$route['backoffice/customer-card/renew-status'] = "backoffice/CustomerCardImport/customer_card_renew_status";

$route['backoffice/customer-card/renew-token'] = "backoffice/CustomerCardImport/process_pre_auth_by_recordno_api";


/**
 * Back Office Import Data by HD
 */
$route['backoffice/import-data'] = "backoffice/ImportData/index";
$route['backoffice/import-data/process-progress'] = "backoffice/ImportData/import_process_data_progress";
$route['backoffice/import-data/process-batch'] = "backoffice/ImportData/import_process_data_batch";
$route['backoffice/import-data/truncate-table'] = "backoffice/ImportData/truncate_table";
$route['backoffice/import-data/result'] = "backoffice/ImportData/result_data";

/**
 * Back Office Scheduler by HD
 */
$route['backoffice/scheduler'] = "backoffice/Backoffice_scheduler/index";
$route['backoffice/scheduler/timeclock-data'] = "backoffice/Backoffice_scheduler/timeclock_data";
$route['backoffice/scheduler/timeclock-save'] = "backoffice/Backoffice_scheduler/timeclock_save";
$route['backoffice/scheduler/timeclock-delete'] = "backoffice/Backoffice_scheduler/timeclock_delete";
$route['backoffice/scheduler/test'] = "backoffice/Backoffice_scheduler/test";

/**
 * Back Office Report Daily Sales
 */
$route['backoffice/reports/dailysales_v1'] = "reports/Daily_sales/index";
$route['backoffice/reports/dailysales-data'] = "reports/Daily_sales/get_data";
$route['backoffice/reports/dailysales/export-excel'] = "reports/Daily_sales/export_excel";
$route['backoffice/reports/dailysales/export-pdf'] = "reports/Daily_sales/export_pdf";
$route['backoffice/reports/dailysales/download-report'] = "reports/Daily_sales/download_file";

$route['backoffice/reports/dailysales_ringerhut'] = "reports/Daily_sales/ringer_hut_daily_sales";
$route['backoffice/reports/dailysales_ringerhut/data'] = "reports/Daily_sales/ringer_hut_daily_sales_items_summary";
$route['backoffice/reports/dailysales_ringerhut/download-csv'] = "reports/Daily_sales/ringer_hut_daily_sales_download_csv";
$route['backoffice/reports/dailysales_ringerhut/email-csv'] = "reports/Daily_sales/ringer_hut_daily_sales_email_csv";

/**
 * Back office Items version 2 API
 */
$route['api/backoffice/items/attribute'] = 'backoffice/Item/item_attribute';
$route['api/backoffice/items/data'] = 'backoffice/Item/item_data';


//BackOffice --> Project Jobs By CHRIS/Jes
$route['backoffice/project_jobs/index'] 								= "backoffice/Project_jobs/project_jobs_view";
$route['backoffice/project_jobs_select'] 								= "backoffice/Project_jobs/project_jobs_select";
$route['backoffice/project_jobs_select_row'] 							= "backoffice/Project_jobs/project_jobs_select_row";
$route['backoffice/project_jobs_store'] 								= "backoffice/Project_jobs/project_jobs_store";
$route['backoffice/project_jobs_update'] 								= "backoffice/Project_jobs/project_jobs_update";
$route['backoffice/project_jobs_delete'] 								= "backoffice/Project_jobs/delete_row";
$route['backoffice/project_jobs_select_dropdown'] 						= "backoffice/Project_jobs/select_dropdown";

//BackOffice -->ProductClass_Project_Jobs
$route['backoffice/project_jobs/ProductClass_add'] 						= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/ProductClass_list'] 					= "backoffice/Project_jobs/ProductClass_list";
$route['backoffice/project_jobs/ProductClass_update'] 					= "backoffice/Project_jobs/delete";

//BackOffice -->ProductClass_Project_Jobs
$route['backoffice/project_jobs/SpSingleVariable_add'] 						= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/SpSingleVariable_list'] 					= "backoffice/Project_jobs/SpSingleVariable_list";
$route['backoffice/project_jobs/SpSingleVariable_update'] 					= "backoffice/Project_jobs/delete";

//BackOffice -->IntComplexVariable_Project_Jobs
$route['backoffice/project_jobs/IntComplexVariable_add'] 				= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/IntComplexVariable_list'] 				= "backoffice/Project_jobs/IntComplexVariable_list";
$route['backoffice/project_jobs/IntComplexVariable_update'] 			= "backoffice/Project_jobs/delete";

//BackOffice -->DeliveryArea_Project_Jobs
$route['backoffice/project_jobs/DeliveryArea_add'] 						= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/DeliveryArea_list'] 					= "backoffice/Project_jobs/DeliveryArea_list";
$route['backoffice/project_jobs/DeliveryArea_update'] 					= "backoffice/Project_jobs/delete";

//BackOffice -->ExtComplexVariable_Project_Jobs
$route['backoffice/project_jobs/ExtComplexVariable_add'] 				= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/ExtComplexVariable_list'] 				= "backoffice/Project_jobs/ExtComplexVariable_list";
$route['backoffice/project_jobs/ExtComplexVariable_update'] 			= "backoffice/Project_jobs/delete";

//BackOffice -->Variable_Project_Jobs
$route['backoffice/project_jobs/Variable_add'] 							= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/Variable_list'] 						= "backoffice/Project_jobs/Variable_list";
$route['backoffice/project_jobs/Variable_update'] 						= "backoffice/Project_jobs/delete";

//BackOffice -->Status_Project_Jobs
$route['backoffice/project_jobs/Status_add'] 							= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/Status_list'] 							= "backoffice/Project_jobs/Status_list";
$route['backoffice/project_jobs/Status_update'] 						= "backoffice/Project_jobs/delete";

//BackOffice -->Status_Project_Jobs
$route['backoffice/project_jobs/Sort_add'] 								= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/Sort_list'] 							= "backoffice/Project_jobs/Sort_list";
$route['backoffice/project_jobs/Sort_update'] 							= "backoffice/Project_jobs/delete";

//BackOffice -->Customer_Project_Jobs
$route['backoffice/project_jobs/Customer_add'] 								= "backoffice/Project_jobs/store_customer";
$route['backoffice/project_jobs/Customer_list'] 							= "backoffice/Project_jobs/Customer_list";
$route['backoffice/project_jobs/Customer_update'] 							= "backoffice/Project_jobs/delete_customer";
$route['backoffice/project_jobs/Customer_list_new'] 						= "backoffice/Project_jobs/Customer_list_new";


//BackOffice -->ManagementCategory_Project_Jobs
$route['backoffice/project_jobs/ManagementCategory_add'] 				= "backoffice/Project_jobs/store";
$route['backoffice/project_jobs/ManagementCategory_list'] 				= "backoffice/Project_jobs/Management_category";
$route['backoffice/project_jobs/ManagementCategory_update'] 			= "backoffice/Project_jobs/delete";


//BackOffice --> Project Jobs Cost By CHRIS/Jes
$route['backoffice/project_jobs_cost/index'] 								= "backoffice/Project_jobs_cost/project_jobs_cost_view";
$route['backoffice/project_jobs_cost_select'] 								= "backoffice/Project_jobs_cost/project_jobs_cost_select";
$route['backoffice/project_jobs_cost_select_row'] 							= "backoffice/Project_jobs_cost/project_jobs_cost_select_row";
$route['backoffice/project_jobs_cost_store'] 								= "backoffice/Project_jobs_cost/project_jobs_cost_store";
$route['backoffice/project_jobs_cost_update'] 								= "backoffice/Project_jobs_cost/project_jobs_cost_update";
$route['backoffice/project_jobs_cost_delete'] 								= "backoffice/Project_jobs_cost/delete_row";
$route['backoffice/project_jobs_cost_select_dropdown'] 						= "backoffice/Project_jobs_cost/select_dropdown";

//BackOffice -->Category_Project_Jobs_cost
$route['backoffice/project_jobs_cost/Category_add'] 					= "backoffice/Project_jobs_cost/store";
$route['backoffice/project_jobs_cost/Category_list'] 					= "backoffice/Project_jobs_cost/Category";
$route['backoffice/project_jobs_cost/Category_update'] 					= "backoffice/Project_jobs_cost/delete_category";


//BackOffice -->Department_Project_Jobs_cost
$route['backoffice/project_jobs_cost/Department_add'] 					= "backoffice/Project_jobs_cost/store";
$route['backoffice/project_jobs_cost/Department_list'] 					= "backoffice/Project_jobs_cost/Department";
$route['backoffice/project_jobs_cost/Department_update'] 				= "backoffice/Project_jobs_cost/delete";

//BackOffice -->Status_Project_Jobs_cost
$route['backoffice/project_jobs_cost/Status_add'] 					= "backoffice/Project_jobs_cost/store";
$route['backoffice/project_jobs_cost/Status_list'] 					= "backoffice/Project_jobs_cost/Status";
$route['backoffice/project_jobs_cost/Status_update'] 				= "backoffice/Project_jobs_cost/delete";

// Cron Job Daily Sales Report
$route['backoffice/cronjob/daily-sales'] = "reports/Daily_sales/cron_job_daily_sales";
$route['backoffice/cronjob/test'] = "reports/Daily_sales/test_cron";

// Cron Job Ringer Hut Daily Sales Report
$route['backoffice/reports/cronjob/dailysales_ringerhut/(:any)/(:any)/(:any)'] = "reports/Daily_sales_cron/ringer_hut_cron_job/$1/$2/$3";


//Mobile development api
$route['api/cashier/menu'] = "Cashier/Cashier/get_cashier_menu_functions";

$route['pos/pointofsale/check-signature'] = "pos/Pos/check_signature";

// Inventory App Development
$route['api/authentication/item/(:num)(\.)([a-zA-Z0-9_-]+)(.*)'] = 'api/authentication/item/id/$1/format/$3$4';

$route['api/authentication/get-item/(:num)'] = 'api/Item_Controller/item_data/$1';

// Time clock detail by employee report
$route['backoffice/reports/time_clock_detail_by_employee'] = "reports/Timeclockdetail/index";
$route['backoffice/reports/time_clock_detail_by_employee/cron_job/(:any)/(:any)'] = "reports/Timeclockdetail/cron_job/$1/$2";

// Auto Batch
$route['pos/pointofsale/credit-card/auto-batch/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)'] = "pos/Datacap/auto_batch_merchant/$1/$2/$3/$4/$5/$6";

// Test print chinese language function
$route['pos/pointofsale/print/chinese'] = "pos/Pos/print_chinese";

// Print Receipt Controller HD
$route['pos/pointofsale/print_receipt/kitchen_type/(:any)/(:any)/(:any)'] = "pos/Printreceipt/receipt_kitchen_type/$1/$2/$3";


// Ledger Account Back office Admin
$route['backoffice/ledger_account'] = "admin/Ledgeraccount/index";
$route['backoffice/ledger_account/get'] = "admin/Ledgeraccount/get_list";
$route['backoffice/ledger_account/new'] = "admin/Ledgeraccount/new_item";
$route['backoffice/ledger_account/update'] = "admin/Ledgeraccount/update_item";
$route['backoffice/ledger_account/delete'] = "admin/Ledgeraccount/delete_item";
$route['backoffice/ledger_account/logout'] = "admin/Ledgeraccount/logout";

// New config position security
$route['pos/cashier/position-security'] = "Cashier/Cashier/position_security_check";
$route['pos/cashier/user-passcode'] = "Cashier/Cashier/enter_user_passcode";

// Drawer Manager
$route['pos/cashier/drawer-manager-location-list'] = "Cashier/Cashier/drawer_manager_location_list";
$route['pos/cashier/drawer-manager-history-list'] = "Cashier/Cashier/drawer_manager_history_list";
$route['pos/cashier/edit-drawer-manager-history'] = "Cashier/Cashier/edit_drawer_manager_history";
$route['pos/cashier/drawer-manager-print'] = "Cashier/Cashier/drawer_manager_print";

$route['backoffice/email'] = "backoffice/Backoffice_email";
$route['backoffice/email/send'] = "backoffice/Backoffice_email/send_email";

// Stock Adjust - Mobile version REST
$route['backoffice/mobile/stock-adjust/list'] = "backoffice/Mobile/Stock_adjust/get_list";
$route['backoffice/mobile/stock-adjust/search'] = "backoffice/Mobile/Stock_adjust/search_item";
$route['backoffice/mobile/stock-adjust/details-save'] = "backoffice/Mobile/Stock_adjust/save_stock_adjust_details";
$route['backoffice/mobile/stock-adjust/delete'] = "backoffice/Mobile/Stock_adjust/delete_stock_adjust";
$route['backoffice/mobile/stock-adjust/details-update'] = "backoffice/Mobile/Stock_adjust/update_stock_adjust_details";
$route['backoffice/mobile/stock-adjust/get-item-details'] = "backoffice/Mobile/Stock_adjust/get_item_details";
$route['backoffice/mobile/stock-adjust/complete-details'] = "backoffice/Mobile/Stock_adjust/complete_details";
$route['backoffice/mobile/stock-adjust'] = "backoffice/Mobile/Stock_adjust/index"; 
// test
$route['pos/pointofsale/test/clear-signature'] = "pos/Datacap/clear_signature";