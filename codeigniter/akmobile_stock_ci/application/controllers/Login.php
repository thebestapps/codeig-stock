<?php defined('BASEPATH') OR exit('No direct script access allowed');
/* Company: AkamaiPOS
*  Title: Login Controller
*  Created: by HD
*  Email: HD
*  Created: 11-18-2016
*/
class Login extends AK_Controller {
    function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library( 
            array('session', 'form_validation')
		);

        $this->load->model(
            array('Login/Login_model', 'Config_location_model')
        );
    }

    //default app to login page 4/23/16 cm
	public function index(){
        $this->load->helper('url');
        redirect('akamaipos');
	}

    /*Login Page*/
	function login(){
		//Redirect
		if($this->_is_logged_in()){
			redirect('pos/cashier');
		}
		if($_POST){
			//$this->db->cache_delete_all();
			//-->Data
			$username 				= $this->input->post('username', true);
			$password 				= $this->input->post('password', true);
			$StationNumber 			= $this->input->post("station");
			$StationInfo 			= $this->Login_model->config_station_by_unique($StationNumber);
			$data["screensize"] 	= $StationInfo["screensize"];
			$data["PaymentMenu"] 	= $StationInfo["PaymentMenu"];
			$data["POSMenu"] 		= $StationInfo["POSMenu"];
			$data["CashierMenu"]	= $StationInfo["CashierMenu"];
			$data["POSDisable"] 	= $StationInfo["POSDisable"];
			$data["StationTheme"] 	= $StationInfo["StationTheme"];
			$data["AggregatesItemSearch"] = $this->Login_model->config_attribute('ItemSearch'); 
			$data["AggregatesItemBarcode"] = $this->Login_model->config_attribute('ItemBarcode');

			$Interface 				= $StationInfo["Interface"];  
			$StationName 			= $this->Login_model->find_station_name($StationNumber);
			$storeid 				= $this->Login_model->find_location_unique($StationNumber);
			$userdata 				= $this->Login_model->validate($username, md5($password));
		
			$data["TimeClockManager"] = $userdata["TimeClockManager"];
			
			$location_setting 		= $this->Login_model->location_setting($StationNumber);
			$config_menu_functions 	= $this->Login_model->config_menu_functions();
			$config_datacap 		= $this->Login_model->config_merchant_datacap_by_station($StationNumber);
			$config_menu 			= $this->Login_model->config_menu_by_unique($StationInfo["POSMenu"]);
			
			//$data["Inventory"]		= $this->Login_model->item_barcode();
			$data["pos_menu"] 		= $config_menu;
			$data["config_points"] 	= $this->Login_model->config_points();

			foreach($config_datacap as $row){
  				$data[$row["Setting"]] = $row["Value"];
  			}

			foreach($config_menu_functions as $row){
				$functions[] = array(
					"Unique"		=> $row["Unique"],
					"StationUnique" => $row["StationUnique"],
					"Function"		=> $row["Function"],
					"Label"			=> $row["Label"],
					"Status"		=> $row["Status"],
					"Sort1"			=> $row["Sort1"],
					"Sort2"			=> $row["Sort2"],
					"HTMLString"	=> $row["HTMLString"]
				);
			}
			$data['Functions'] = $functions;

			//-->Validation
			if($userdata){
				$Position 	= $this->Login_model->config_user_position($userdata["Unique"]);
				$data["UserPosition"] = $Position["ConfigPositionUnique"];

				foreach($location_setting as $row){
					$data[$row["Setting"]] = $row["Value"];
				}
				$data['userid'] 		= $userdata["Unique"];
				$data['tempuserid'] 	= $userdata["Unique"];
				$data['storeunique'] 	= $storeid;
				$data['SalesPerson'] 	= $userdata["Unique"];
				$storename 				= $this->Login_model->stores($storeid);
				$data['store_name'] 	= $storename;
				$data['currentuser'] 	= $userdata["UserName"];
				$data['station_number'] = $StationNumber;
				$data['page_title'] 	= "Cashier";
				$data['station_name'] 	= $StationName;
				$data['logged_in'] 		= true;

				$this->session->set_userdata($data);

				$this->call_create_cache_data();

                if($Interface == 'Cashier'){
				    redirect('pos/cashier');
                }else if($Interface == 'BackOffice'){
                    redirect('pos/dashboard');
				}else {redirect('http://akback');
                }
			}else{
				$data['error'] 			= "Invalid username or password!";
				$data['page_title'] 	= "Login";
				$data['main_content'] 	= "login/Login";
				$this->load->view('templates/login_template', $data);
			}
			return;
		 }
		$error = $this->session->userdata("error");
		if($error){
			$data["error"] = $error;
		}
		$data['main_content'] = 'login/Login';
		$this->load->view('templates/login_template', $data);
	}

    function quick_login($StationNumber){
		//$this->db->cache_delete_all();
		$DefaultUserUnique 		= $this->Login_model->getDefaultUserUnique();
		$userRow 				= $this->Login_model->config_user_by_unique($DefaultUserUnique);
		$username 				= $userRow["UserName"];
		$password 				= $userRow["Password"];
		$StationInfo 			= $this->Login_model->config_station_by_unique($StationNumber);
		$data["screensize"] 	= $StationInfo["screensize"];
		$data["PaymentMenu"] 	= $StationInfo["PaymentMenu"];
		$data["POSMenu"] 		= $StationInfo["POSMenu"];
		$data["CashierMenu"]	= $StationInfo["CashierMenu"];
		$data["POSDisable"] 	= $StationInfo["POSDisable"];
		$data["StationTheme"] 	= $StationInfo["StationTheme"];
		$data["AggregatesItemSearch"] = $this->Login_model->config_attribute('ItemSearch'); 
		$data["AggregatesItemBarcode"] = $this->Login_model->config_attribute('ItemBarcode');
        $Interface 				= $StationInfo["Interface"];
		$StationName 			= $this->Login_model->find_station_name($StationNumber);
		$storeid 				= $this->Login_model->find_location_unique($StationNumber);
		$userdata 				= $this->Login_model->validate($username, $password);
		$location_setting 		= $this->Login_model->location_setting($StationNumber);
		$config_menu_functions 	= $this->Login_model->config_menu_functions();
		$config_datacap 		= $this->Login_model->config_merchant_datacap_by_station($StationNumber);
		$config_menu 			= $this->Login_model->config_menu_by_unique($StationInfo["POSMenu"]);
		//$data["Inventory"]		= $this->Login_model->item_barcode();
		$data["pos_menu"] 		= $config_menu;
		$data["config_points"] 	= $this->Login_model->config_points();
		// $datacap 				= $this->Login_model->config_merchant_datacap_by_station($StationNumber);

		// foreach($datacap as $row){
		// 	$data[$row["Setting"]] = $row["Value"];
		// }

		foreach($config_menu_functions as $row){
			$functions[] = array(
				"Unique"		=> $row["Unique"],
				"StationUnique" => $row["StationUnique"],
				"Function"		=> $row["Function"],
				"Label"			=> $row["Label"],
				"Status"		=> $row["Status"],
				"Sort1"			=> $row["Sort1"],
				"Sort2"			=> $row["Sort2"],
				"HTMLString"	=> $row["HTMLString"]
			);
		}
		$data['Functions'] = $functions;

		if($userdata){

			$Position 	= $this->Login_model->config_user_position($userdata["Unique"]);
			$data["UserPosition"] = $Position["ConfigPositionUnique"];

			foreach($location_setting as $row){
				$data[$row["Setting"]] = $row["Value"];
			}
			$data['userid'] 	 	= $userdata["Unique"];
			$data['tempuserid']  	= $userdata["Unique"];
			$data['storeunique'] 	= $storeid;
			$data['SalesPerson'] 	= $userdata["Unique"];
			$storename 				= $this->Login_model->stores($storeid);
			$data['store_name'] 	= $storename;
			$data['currentuser'] 	= $userdata["UserName"];
			$data['station_number'] = $StationNumber;
			$data['page_title'] 	= "Cashier";
			$data['station_name'] 	= $StationName;
			$data['logged_in'] 		= true;

			$this->session->set_userdata($data);

			$this->call_create_cache_data();

			if($Interface == 'Cashier'){
                redirect('pos/cashier');
            }else if($Interface == 'BackOffice'){
                redirect('pos/dashboard');
            }
		}else{
			$data['error'] = "Invalid username or password!";
			$data['page_title'] = "Login";
			$data['main_content'] = "login/Login";
			$this->load->view('templates/login_template', $data);
		}
	}

	function login_developer(){
		//Redirect
		if($this->_is_logged_in()){
			redirect('pos/cashier');
		}
		if($_POST){
			//$this->db->cache_delete_all();
			//-->Data
			$username 				= $this->input->post('username', true);
			$password 				= $this->input->post('password', true);
			$StationNumber 			= $this->input->post("station");
			$setdatabase 			= $this->input->post("database");
			$StationInfo 			= $this->Login_model->config_station_by_unique($StationNumber);
			$data["screensize"] 	= $StationInfo["screensize"];
			$data["PaymentMenu"] 	= $StationInfo["PaymentMenu"];
			$data["POSMenu"] 		= $StationInfo["POSMenu"];
            $Interface 				= $StationInfo["Interface"];
			$StationName 			= $this->Login_model->find_station_name($StationNumber);
			$storeid 				= $this->Login_model->find_location_unique($StationNumber);
			$userdata 				= $this->Login_model->validate($username, md5($password));
			$location_setting 		= $this->Login_model->location_setting($StationNumber);
			$config_menu_functions 	= $this->Login_model->config_menu_functions();
			$config_datacap 		= $this->Login_model->config_merchant_datacap_by_station($StationNumber);
			$config_menu 			= $this->Login_model->config_menu_by_unique($StationInfo["POSMenu"]);
			$data["pos_menu"] 		= $config_menu;

			foreach($config_datacap as $row){
  				$data[$row["Setting"]] = $row["Value"];
  			}

			foreach($config_menu_functions as $row){
				$functions[] = array(
					"Unique"		=> $row["Unique"],
					"StationUnique" => $row["StationUnique"],
					"Function"		=> $row["Function"],
					"Label"			=> $row["Label"],
					"Status"		=> $row["Status"],
					"Sort1"			=> $row["Sort1"],
					"Sort2"			=> $row["Sort2"],
					"HTMLString"	=> $row["HTMLString"]
				);
			}
			$data['Functions'] = $functions;

			//-->Validation
			if($userdata){
				foreach($location_setting as $row){
					$data[$row["Setting"]] = $row["Value"];
				}
				$data['db'] 			= $setdatabase;
				$data['userid'] 		= $userdata["Unique"];
				$data['storeunique'] 	= $storeid;
				$data['SalesPerson'] 	= $userdata["Unique"];
				$storename 				= $this->Login_model->stores($storeid);
				$data['store_name'] 	= $storename;
				$data['currentuser'] 	= $userdata["UserName"];
				$data['station_number'] = $StationNumber;
				$data['page_title'] 	= "Cashier";
				$data['station_name'] 	= $StationName;
				$data['logged_in'] 		= true;
				$this->session->set_userdata($data);
                if($Interface == 'Cashier'){
				    redirect('pos/cashier');
                }else if($Interface == 'BackOffice'){
                    redirect('pos/dashboard');
                }
			}else{
				$data['error'] 			= "Invalid username or password!";
				$data['page_title'] 	= "Login";
				$data['main_content'] 	= "login/Login";
				$this->load->view('templates/login_template', $data);
			}
			return;
		 }
		$error = $this->session->userdata("error");
		if($error){
			$data["error"] = $error;
		}
		$data['main_content'] = 'login/login_developer';
		$this->load->view('templates/login_template', $data);
	}

    function customer_screen_login($StationNumber){
		$DefaultUserUnique = $this->Login_model->getDefaultUserUnique();
		$userRow = $this->Login_model->config_user_by_unique($DefaultUserUnique);
		$username = $userRow["UserName"];
		$password = $userRow["Password"];

		$StationInfo = $this->Login_model->config_station_by_unique($StationNumber);
		$data["screensize"] = $StationInfo["screensize"];
		$data["PaymentMenu"] = $StationInfo["PaymentMenu"];
		$data["POSMenu"] = $StationInfo["POSMenu"];
		$StationName = $this->Login_model->find_station_name($StationNumber);
		$storeid = $this->Login_model->find_location_unique($StationNumber);
		$userdata = $this->Login_model->validate($username, $password);

		$location_setting = $this->Login_model->location_setting($StationNumber);
		$config_menu_functions = $this->Login_model->config_menu_functions();
		$config_datacap = $this->Login_model->config_merchant_datacap_by_station($StationInfo["PaymentMenu"]);
		foreach($config_datacap as $row){
			$data[$row["Setting"]] = $row["Value"];
		}

		foreach($config_menu_functions as $row){
			$functions[] = array(
				"Unique"		=> $row["Unique"],
				"StationUnique" => $row["StationUnique"],
				"Function"		=> $row["Function"],
				"Label"			=> $row["Label"],
				"Status"		=> $row["Status"],
				"Sort1"			=> $row["Sort1"],
				"Sort2"			=> $row["Sort2"],
				"HTMLString"	=> $row["HTMLString"]
			);
		}
		$data['Functions'] = $functions;

		if($userdata){
			foreach($location_setting as $row){
				$data[$row["Setting"]] = $row["Value"];
			}
			$data['userid'] = $userdata["Unique"];
			$data['storeunique'] = $storeid;
			$storename = $this->Login_model->stores($storeid);
			$data['store_name'] = $storename;
			$data['currentuser'] = $userdata["FirstName"];
			$data['station_number'] = $StationNumber;
			$data['page_title'] = "Cashier";
			$data['station_name'] = $StationName;
			$data['logged_in'] = true;
			$this->session->set_userdata($data);
			redirect('pos/pointofsale/customer/screen');
		}else{
			$data['error'] = "Invalid username or password!";
			$data['page_title'] = "Login";
			$data['main_content'] = "login/Login";
			$this->load->view('templates/login_template', $data);
		}
	}

    /*Checking whether is logged or not*/
	function _is_logged_in(){
		if($this->session->userdata('logged_in')){
			return true;
		}else{
			return false;
		}
	}
	/*Logout*/
	function logout(){
		//$this->db->cache_delete_all();
		$this->session->sess_destroy();
		redirect('backoffice');
		//exec('c:\WINDOWS\system32\cmd.exe /c START C:\akamaipos\htdocs\app\ClearCache.bat');
	}

	/*Load Stores from station table*/
	function load_station(){
		$json = array();
		$result = $this->Login_model->config_station();
		if($result){
			foreach($result as $row){
				$number = $row["Number"];
				$name = $row["Name"];
				$LocationUnique = $row["LocationUnique"];
				$json[$number]["description"] = $name;
			}
		}
		echo json_encode($json);
	}

	function station_setting(){
		$json = array();
		$station = $this->input->post("StationUnique");
		$VirtualKeyboard = $this->Config_location_model->getConfigSetting("POSVirtualKeyboard", $station, $field = 'stationunique');
		$KeyboardInputLimit = $this->Config_location_model->getConfigSetting("KeyboardPopupCharacterLimit", $station, $field = 'stationunique');
		$json["VirtualKeyboard"] = $VirtualKeyboard;
		$json["KeyboardInputLimit"] = $KeyboardInputLimit;
 		echo json_encode($json);
	}

}
