<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
// admin menu 

class Login_model extends CI_Model {

	public function __construct(){
			// Call the CI_Model constructor
			parent::__construct();
			$timezone = "Pacific/Honolulu";
			if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
			ini_set('max_execution_time', 1000);
			$this->load->database('akfront');
	}

	function insert($table, $data){
			$this->db->insert($table, $data);
			$newid = $this->db->insert_id();
			return $newid;
	}

	function update($table, $fieldname, $data, $unique){
			$this->db->where($fieldname, $unique);
			$this->db->update($table, $data);
			$result = $this->db->affected_rows();
			if($result > 0){
					return true;
			}else{
					return false;
			}
	}

	function delete($table, $array){
			$result = $this->db->delete($table, $array);
			return $result;
	}

	/*Login Form Query Validation*/
	function validate($username, $password){
			$sql = 'SELECT "Unique", "UserName", "FirstName", "LastName", "Status" ';
			$sql.= 'FROM config_user ';
			$sql.= 'WHERE "UserName" ~* \''.$username.'\'';
			$sql.= 'AND "Password" = \''.$password.'\' ';
			$sql.= 'AND "Status" = 1';
			$query = $this->db->query($sql);
			$data = $query->row_array();
			return $data;
	}

	function config_user_position($unique){
		$sql='select * from config_user_position where "ConfigUserUnique"='.$unique.' and "PrimaryPosition" = 1';
		$result = $this->db->query($sql)->row_array();
		return $result;
	}

    function config_station_by_unique($unique){
				$this->db->select("*");
				$this->db->where("Unique", $unique);
				$this->db->where("Status", 1);
				$query = $this->db->get("config_station");
				$result = $query->row_array();
				return $result;
		}

    function find_station_name($StationNumber){
				$this->db->select("Name");
				$this->db->from("config_station");
				$this->db->where("Number", $StationNumber);
				$this->db->where("Status", 1);
				$result = $this->db->get();
				$row = $result->row_array();
				return $row["Name"];
		}

    function find_location_unique($StationNumber){
				$this->db->select("LocationUnique");
				$this->db->from("config_station");
				$this->db->where("Number", $StationNumber);
				$this->db->where("Status", 1);
				$result = $this->db->get();
				$row = $result->row_array();
				return $row["LocationUnique"];
		}

    function location_setting($unique){
				$this->db->select("*");
				$this->db->from("config_location_settings");
				$this->db->where_in("stationunique", array($unique,0));
				$result = $this->db->get();
				return $result->result_array();
		}

    function config_menu_functions(){
				$this->db->select("*");
				$this->db->where_in("Status", array(1,2,3,4));
				$this->db->order_by("Sort1", "Sort2", "ASC");
				$result = $this->db->get("config_menu_functions");
				return $result->result_array();
		}

    function config_merchant_datacap_by_station($station_unique){
				$this->db->select("*");
				$this->db->where_in("StationUnique", $station_unique);
				$query = $this->db->get("config_merchant_datacap");
				$result = $query->result_array();
				return $result;
		}

    function stores($storeid = true){
				if($storeid){
						$this->db->where("Unique", $storeid);
						$result = $this->db->get("config_location");
						$storename = $result->row_array();
						return $storename["LocationName"];
				}else{
						$this->db->select("Unique, LocationName");
						$this->db->order_by("LocationName", "asc");
						$result = $this->db->get("config_location");
						return $result->result_array();
				}
		}

    function getDefaultUserUnique(){
				$this->db->select("*");
				$this->db->where("Setting", 'LogonDefaultUserUnique');
				$query = $this->db->get('config_location_settings');
				$result = $query->row_array();
				return $result["Value"];
		}

    function config_user_by_unique($unique){
				$this->db->select("*");
				$this->db->where("Unique", $unique);
				$query = $this->db->get("config_user");
				$result = $query->row_array();
				return $result;
		}

		function config_attribute($form){
				$sql='select "Aggregate" from config_attribute where "Form" ='.$form.' and "Status"=1 and "Aggregate" = 1';
				$query = $this->db->query($sql);
				$result = $query->num_rows();
				return $result;
		}

}
