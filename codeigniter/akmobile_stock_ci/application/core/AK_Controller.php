<?php

class AK_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        // It can be auto-loaded
        $this->load->helper(array('form', 'url'));
        $this->load->library('session');
        $this->load->model('Backoffice/Backoffice_location_model');
        $this->load->model('Backoffice/Customer_model', 'customer');
		$this->load->model('Backoffice/backoffice_model');
		$this->load->model('Cashier/Cashier_model', 'Cashier');

		// $this->_is_logged_in(); commented by HD 08/20/2020
		// Note: This controller extends in the Login controller
		// It causing loops due to the session is not set up yet.

		/* AuthBatchManual 
			Controller: CashInServer
			0 = Keep Batch Open in Auth Manager
			1 = Batch close in Auth Manager when CashOut, Must be setup with Processor to work 
		*/
		$AuthBatchManual = $this->session->userdata("AuthBatchManual");
		$AuthBatchManual = (isset($AuthBatchManual) && trim($AuthBatchManual) != null 
			//&& filter_var($AuthBatchManual, FILTER_VALIDATE_INT) == true 
			&& is_numeric($AuthBatchManual)
			&& ($AuthBatchManual == 0 || $AuthBatchManual == 1)
			? trim($AuthBatchManual)
			: 1 ); // Batch Close if Fail
		$this->cls_AuthBatchManual = $AuthBatchManual;
		
		/* AuthBatchMinutes 
			Controller: CashInServer
			Minutes before Credit Cards must be Batched
			Checks on Cashin Cashout - Does Not Check if Value = 0
		*/
        $AuthBatchMinutes = $this->session->userdata("AuthBatchMinutes");
		$AuthBatchMinutes = (isset($AuthBatchMinutes) && trim($AuthBatchMinutes) != null 
			//&& filter_var($AuthBatchMinutes, FILTER_VALIDATE_INT) == true 
			&& is_numeric($AuthBatchMinutes)
			? trim($AuthBatchMinutes)
			: 1440 );	// 24 Hours if Fail
		$this->cls_AuthBatchMinutes = $AuthBatchMinutes;
		
		/* CashDrawerOpen
			Controller: CashInServer, Cashier
			1 = Open Drawer Before Printing 2 = Open After 3 = Before and After
			0 = No Drawer -- Only Implemented in CashInServer for now
		*/
		$CashDrawerOpen = $this->session->userdata("CashDrawerOpen");
		$CashDrawerOpen = (isset($CashDrawerOpen) && trim($CashDrawerOpen) != null 
			//&& filter_var($CashDrawerOpen, FILTER_VALIDATE_INT) == true 
			&& is_numeric($CashDrawerOpen)
			&& ($CashDrawerOpen == 0 || $CashDrawerOpen == 1 || $CashDrawerOpen == 2 || $CashDrawerOpen == 3)
			? trim($CashDrawerOpen)
			: 1 ); // Open if Fail
		$this->cls_CashDrawerOpen = $CashDrawerOpen;
		
		/* CashDrawerOpenMethod
			1 = Open Cash Drawer based on Assign User Drawer for Receipt, 
			2 = Open Drawer by Logged In User  Note: 
			CashDrawerMultiple must be enabled
		*/
		
		/* CashDrawerMultiple 
			Controller: CashInServer, Cashier
		*/
		
		$CashDrawerMultiple = trim($this->session->userdata("CashDrawerMultiple"));
		$this->cls_CashDrawerMultiple = $CashDrawerMultiple;
				
		/* CashDrawerReason 
			Controller: 
			1 = Ask reason on Open Drawer Function  0 = No reason 
		*/
		
		/* CashInDenomination  
			Controller: CashInServer
			0 = Numpad 
			1 = Denomination Count 
			2 = Auto Cash In
			This Variable must be above CashInAmount Variable otherwise error on CashIn	
		*/
		
		$CashInDenomination = trim($this->session->userdata("CashInDenomination"));
		$this->cls_CashInDenomination = $CashInDenomination;
		
		/*	CashInAmount
			Controller: CashInServer
			Default Cash In Amount when CashInDenomination = 2		
		*/
			
		$CashInAmount = trim($this->session->userdata("CashInAmount"));
		$CashInAmount = (isset($CashInAmount) && $CashInAmount != null 
			//&& filter_var($CashInAmount, FILTER_VALIDATE_INT) == true 
			&& is_numeric($CashInAmount)
			&& $CashInDenomination == 2
			? $CashInAmount
			: null);
		$this->cls_CashInAmount = $CashInAmount;
		
		
		/* CashInMethod 
			Controller: CashInServer, Cashier
			1 = By Station(Original), 
			2 = By Server(New), 
			3 = By Station(New)
		*/
			
		$CashInMethod = $this->session->userdata("CashInMethod");
		$this->cls_CashInMethod = $CashInMethod;
		
		/* CashInPrint
			Controller: CashInServer
			1 = Print CashIn Report, 
			0 = Don't print
		*/
		
		$CashInPrint = $this->session->userdata("CashInPrint");
		$this->cls_CashInPrint = $CashInPrint;
		
		/* CashOutAutoCount
			1 = Auto Fill Cash Out Counted for everything except Cash (type 1), 
			0 = Default Do Not Fill
		*/
			
		/* CashOutBlind
			Controller: Cashier
			1 = Do not display Sales on Cash Out Screen and Printout 
			0 = Display
		*/
		
		$CashOutBlind = $this->session->userdata("CashOutBlind");
		$this->cls_CashOutBlind = $CashOutBlind;
		
		/* CashOutCashOutButtonLabel
			Cash Out Screen -- Label for Cash Out Button to Finalize Cash Out
			Value: Cash<br/>Out
		*/
		
		/* CashOutCheckOnHold
			0 = Allow Cashout  
			1 = Cannot Cashout if Receipts on Hold Assigned to CashOut User
		*/
		
		/* CashOutCheckTipsEmpty
			0 = Allow Cashout  
			1 = Cannot Cashout if Tips have not been added in Auth Manager for Cash Out User
		*/
		
		/* CashOutEmail
			1 = Email Cash Out Report automatically after cash out.  Sent to Users with Report = 1 Setting  
			0 = No Email
		*/
		
		/* CashOutPrint
			1 = Print Cash Out Report after Cash Out Completed, 
			0 = Don't print
		*/
		
		/* CashOutPrintHide 
			1 = Hide Print Button on Cash Out Screen  
			0 = Show
		*/
		
		
		/* POSCustomerDefault 
			Controller: CashInServer
			Default Null if doesn't exist

			*/
		
		$CustomerUnique = $this->session->userdata("POSCustomerDefault");
		$CustomerUnique = (isset($CustomerUnique) && trim($CustomerUnique) != null 
			//&& filter_var($CustomerUnique, FILTER_VALIDATE_INT) == true 
			&& is_numeric($CashInAmount)
			? trim($CustomerUnique)
			: null);			
		$this->cls_CustomerUnique = $CustomerUnique;
		
		
		/*POSReceiptNumber 
			Controller: CashInServer
		*/
		$POSReceiptNumber = trim($this->session->userdata("POSReceiptNumber"));
		$this->cls_POSReceiptNumber = $POSReceiptNumber;

		/** CashOutCheckCashIn
		 * Must CashOut based on minutes from CashIn
		 *  0 = Don't Check  otherwise put internval in minutes
		 * If setting doesn exist, default to 1440 minutes
		 * Cashier CashOut / CashIn check in Cashier page
		 */
		$CashOutCheckCashIn = $this->session->userdata("CashOutCheckCashIn");
		$CashOutCheckCashIn = (isset($CashOutCheckCashIn) && trim($CashOutCheckCashIn) != null 
			&& is_numeric($CashOutCheckCashIn)
			? trim($CashOutCheckCashIn)
			: 1440 ); 
		$this->cls_CashOutCheckCashIn = $CashOutCheckCashIn;

		/** KitchenPrinterChinese
		 * 0 = Default not using chinese printer -> text() / 1 = use Chinese printer -> textChinese()
		 */
		$KitchenPrinterChinese = $this->session->userdata("KitchenPrinterChinese");
		$KitchenPrinterChinese = (isset($KitchenPrinterChinese) && trim($KitchenPrinterChinese) != null 
			&& is_numeric($KitchenPrinterChinese)
			? trim($KitchenPrinterChinese)
			: 0 ); 
		$this->cls_KitchenPrinterChinese = $KitchenPrinterChinese;

		$BackOfficeItemStyleMatrixStockAdjust = $this->session->userdata("BackOfficeItemStyleMatrixStockAdjust");
		$BackOfficeItemStyleMatrixStockAdjust = (isset($BackOfficeItemStyleMatrixStockAdjust) && trim($BackOfficeItemStyleMatrixStockAdjust) != null
		&& is_numeric($BackOfficeItemStyleMatrixStockAdjust)
			? trim($BackOfficeItemStyleMatrixStockAdjust)
			: 1 );
		$this->cls_BackOfficeItemStyleMatrixStockAdjust = $BackOfficeItemStyleMatrixStockAdjust;


		$CacheDatabase = $this->session->userdata("CacheDatabase");
		$CacheDatabase = (isset($CacheDatabase) && trim($CacheDatabase) != null
		&& is_numeric($CacheDatabase)
			? trim($CacheDatabase)
			: 1 );
		$this->cls_CacheDatabase = $CacheDatabase;
	}
	
    /**
     * Helpers..
     */
	
	//CashOutCashCheck Query from Cashier_model
	function CashOut_CashIn_Check($StationServerUnique, $CashInMethod){
		if($StationServerUnique == null) return; 
		$result = $this->Cashier->CashOut_CashIn_Check($StationServerUnique, $CashInMethod);
		return $result;
	}

    function displaystore()
    {
        $storeid = $this->session->userdata("storeunique");
        $storename = $this->backoffice_model->stores($storeid);
        return $storename;
    }

    private function _is_logged_in()
    {
        if (!$this->session->userdata('logged_in')) {
            redirect('backoffice/dashboard');
        }
    }

    public function getLocations() {
        return $this->customer->getLocations();
    }

//    public function isCustomerCheckedInEnabled($setting, $value, $field) {
    public function getSettingLocation($setting, $value, $field = 'stationunique') {
        $this->Backoffice_location_model->getConfigSetting($setting, $value, $field);
    }

    public function getPicturePath() {
        $this->getSettingLocation('ItemPictureLocation', $this->session->userdata("station_number"));
        $picturesPath = base_url() . $this->session->userdata('admin_ItemPictureLocation');
        $sep = DIRECTORY_SEPARATOR;
        return str_replace(['/', "\\"], [$sep, $sep], $picturesPath);
    }

    public function dbErrorMsg($type = null)
    {
        if(is_null($type))
            $msg = 'Database error';
        elseif ($type == 0)
            $msg = 'Invalid request';
        else
            $msg = 'Unexpected error.';

        return $response = [
            'status' => 'error',
            'message' => $msg
        ];
	}
	
	public function call_create_cache_data(){
		$this->load->driver('cache', array('adapter' => 'file'));

		$data = array();
		// Matrix Tab count
		$item_matrix_tab_count = $this->db->query('select * from config_matrix where "Form" = \'ItemStyleFormTab\' and "Status" = 1 order by "Sort" asc')->result_array();
		$this->cache->save('item_matrix_tab_count', $item_matrix_tab_count, 0);

		// Matrix Column count and Size
		$item_matrix_column_count = $this->db->query('select distinct "Column", "ColumnSize", "Tab" from config_matrix where "Form" = \'ItemStyleForm\' and "Status" = 1 order by "Column" asc')->result_array();
		$this->cache->save('item_matrix_column_count', $item_matrix_column_count, 0);

		// Matrix Templates
		$item_matrix_templates = $this->db->query('select * from config_matrix where "ColumnUnique"  = \'Custom1\' and "Status" = 1 order by "Form" asc')->result_array();
		$this->cache->save('item_matrix_templates', $item_matrix_templates, 0);

		// Matrix Form
		$item_matrix_form = $this->db->query('select * from config_matrix where "Form" = \'ItemStyleForm\' and "Status" = 1 order by "Tab", "Column", "Row" asc')->result_array();
		$this->cache->save('item_matrix_form_attribute', $item_matrix_form, 0);

		// Matrix Category
		$item_matrix_category = $this->db->query('select * from category_main where "Status"=1 order by "MainName" asc')->result_array();
		$this->cache->save('item_matrix_category', $item_matrix_category, 0);

		// Matrix SubCategory
		$item_matrix_subcategory = $this->db->query('select * from category_sub where "Status"=1 order by "Name" asc')->result_array();
		$this->cache->save('item_matrix_subcategory', $item_matrix_subcategory, 0);

		// Matrix Supplier
		$item_matrix_supplier = $this->db->query('select * from supplier where "Status"=1 order by "Company" asc ')->result_array();
		$this->cache->save('item_matrix_supplier', $item_matrix_supplier, 0);

		// Barcode Label
		$item_matrix_barcode_label = $this->db->query('select * from config_barcode_label where "Status"=1 order by "Sort" asc')->result_array();
		$this->cache->save('item_matrix_barcode_label', $item_matrix_barcode_label, 0);

		// Account Code
		$item_matrix_account_code = $this->db->query('select * from config_account_code where "Status" = 1')->result_array();
		$this->cache->save('item_matrix_account_code', $item_matrix_account_code, 0);

		// Mix Match Code
		$item_matrix_mix_match_code = $this->db->query('select * from config_mix_match_code where "Status" = 1')->result_array();
		$this->cache->save('item_matrix_mix_match_code', $item_matrix_mix_match_code, 0);

		// Location
		$item_matrix_location = $this->db->query('select * from config_location where "Status" = 1 order by "LocationName" asc')->result_array();
		$this->cache->save('item_matrix_location', $item_matrix_location, 0);
		
		// Tax list
		$item_matrix_tax = $this->db->query('select * from "config_tax" where "Status" = 1 order by "Sort"')->result_array();
		$this->cache->save('item_matrix_tax', $item_matrix_tax, 0);

		// Barcode Label list
		$item_matrix_barcode_label = $this->db->query('select * from config_barcode_label where "Status" = 1')->result_array();
		$this->cache->save('item_matrix_barcode_label', $item_matrix_barcode_label, 0);

		// Label Printer
		$item_matrix_label_printer = $this->db->query('select * from config_barcode_label where "Status" = 1')->result_array();
		$this->cache->save('item_matrix_label_printer', $item_matrix_label_printer, 0);
	}

	public function cashier_menu_restriction_create_cache(){
		$this->load->driver('cache', array('adapter' => 'file'));

		$CacheDatabaseExpiration = $this->session->userdata("CacheDatabase");
		$CacheDatabaseExpiration = (isset($CacheDatabaseExpiration) ? $CacheDatabaseExpiration : 0);

		// Config Security Position
		$ConfigPositionSecurity = $this->db->query('select * from config_position_security where "Status" = 1')->result_array();
		$this->cache->save("config_position_security", $ConfigPositionSecurity, $CacheDatabaseExpiration);

		// Config User
		$ConfigUser = $this->db->query('select * from config_user where "Status" = 1')->result_array();
		$this->cache->save("config_user", $ConfigUser, $CacheDatabaseExpiration);

		// Config User Position
		$ConfigUserPosition = $this->db->query('select * from config_user_position where "Status" = 1')->result_array();
		$this->cache->save("config_user_position", $ConfigUserPosition, $CacheDatabaseExpiration);
	}

	public function delete_cache(){
		$this->load->driver('cache', array('adapter' => 'file'));
		
		$this->cache->delete('item_matrix_tab_count');
		$this->cache->delete('item_matrix_column_count');
		$this->cache->delete('item_matrix_templates');
		$this->cache->delete('item_matrix_form_attribute');
		$this->cache->delete('item_matrix_category');
		$this->cache->delete('item_matrix_subcategory');
		$this->cache->delete('item_matrix_supplier');
		$this->cache->delete('item_matrix_barcode_label');
		$this->cache->delete('item_matrix_account_code');
		$this->cache->delete('item_matrix_mix_match_code');
		$this->cache->delete('item_matrix_location');
		$this->cache->delete('item_matrix_tax');
		$this->cache->delete('item_matrix_barcode_label');
		$this->cache->delete('item_matrix_label_printer');
		$this->cache->delete('config_position_security');
		$this->cache->delete('config_user');
		$this->cache->delete('config_user_position');
		$this->cache->delete('items');
	}

}


