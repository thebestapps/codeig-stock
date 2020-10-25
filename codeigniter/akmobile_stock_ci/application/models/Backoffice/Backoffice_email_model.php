<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* Company: AkamaiPOS
*  Title: Backoffice Email Model
*  Created by: HD
*  Email: HD
*  Created: 07-17-2020
*/
class Backoffice_email_model extends CI_Model {
    public function __construct(){
        parent::__construct();
        $timezone = "Pacific/Honolulu";
        if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
        ini_set('max_execution_time', 1000);
        $this->load->database('akfront');
    }

    function insert($table, $data){
        $this->db->insert($table, $data);
		$sql = "SELECT currval(pg_get_serial_sequence('$table','Unique')) as newid";
		$query = $this->db->query($sql);
		return $query->row()->newid;
    }

    function update_multiple_id($table, $fields_array, $data){
        $this->db->where($fields_array);
        $this->db->update($table, $data);
        $result = $this->db->affected_rows();
        if($result > 0){
            return true;
        }else{
            return false;
        }
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
}