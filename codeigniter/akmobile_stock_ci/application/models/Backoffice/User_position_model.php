<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_position_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$timezone = "Pacific/Honolulu";
		if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
		ini_set('max_execution_time', 1000);
    $this->load->database('akback');	
	}

	function get_user_position()
	{
		$sql = "select * from config_position where \"Status\" = 1 AND (\"Suppress\" is NULL OR \"Suppress\" = 0) order by \"Unique\" desc";

		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}

	function get_user_position_date()
	{
		$sql = "select CP.\"Unique\", CP.\"PositionName\", CP.\"Sort\", coalesce(CP.\"Department\",null) as \"DepartmentUnique\",
		case when CP.\"Default\" = 1 then 'Yes' else 'No' end as \"DefaultVal\",
		CPS.\"Department\", CP.\"Created\", CP.\"Updated\",CP.\"CreatedBy\" as \"CreatedByUnique\",CU1.\"UserName\" as \"CreatedBy\",
		CP.\"UpdatedBy\" as \"UpdatedByUnique\", CU2.\"UserName\" as \"UpdatedBy\", CP.\"ProjectJobsCostDefault\", cpjc.\"CostCode\" as \"ProjectJobsCostDefaultVal\"
		from config_position CP
		left join config_position_department CPS on CPS.\"Unique\" = CP.\"Department\"
		left join config_project_jobs_cost cpjc on cpjc.\"Unique\" = CP.\"ProjectJobsCostDefault\"
		left join config_user CU1 on CU1.\"Unique\" = CP.\"CreatedBy\"
		left join config_user CU2 on CU2.\"Unique\" = CP.\"UpdatedBy\"
		where CP.\"Status\" = 1
		order by CP.\"Unique\" desc";

		$query = $this->db->query($sql);

		$result = $query->result_array();
		return $result;
	}
	
	function get_user_position_unique($id)
	{
		$sql = "select *
		from config_position 
		where \"Status\" = 1 and  \"Unique\" =  ".$id." ";

		$query = $this->db->query($sql);

		$result = $query->result_array();
		return $result;
	}
	function get_user_position_record($project_id)
	{
		$sql = "select CP.\"Unique\", CP.\"PositionName\", CP.\"Sort\", coalesce(CP.\"Department\",null) as \"DepartmentUnique\",
		case when CP.\"Default\" = 1 then 'Yes' else 'No' end as \"DefaultVal\",
		CPS.\"Department\", CP.\"Created\", CP.\"Updated\",CP.\"CreatedBy\" as \"CreatedByUnique\",CU1.\"UserName\" as \"CreatedBy\",
		CP.\"UpdatedBy\" as \"UpdatedByUnique\", CU2.\"UserName\" as \"UpdatedBy\", CP.\"ProjectJobsCostDefault\"
		from config_position CP
		left join config_position_department CPS on CPS.\"Unique\" = CP.\"Department\"
		left join config_user CU1 on CU1.\"Unique\" = CP.\"CreatedBy\"
		left join config_user CU2 on CU2.\"Unique\" = CP.\"UpdatedBy\"
		where CP.\"Status\" = 1 and CP.\"Unique\" = ".$project_id."
		order by CP.\"Sort\" desc";

		$query = $this->db->query($sql);

		$result = $query->result_array();
		return $result;
	}
	function get_user_security_date($ssid)
	{
		//$sql = "select * from config_position_security where \"Status\" = 1 AND \"Position\" = ".$ssid." order by \"Unique\" desc";

		$sql = "select CP.\"Unique\" as \"PositionID\",  CPSL.\"Unique\" as \"FunctionUnique\", CPS.\"Unique\", CPS.\"Function\", CPS.\"Created\", CPS.\"CreatedBy\", CPS.\"Updated\", CPS.\"UpdatedBy\", CPSL.\"Description\" AS \"Comment\", CPS.\"Prompt\", CP.\"PositionName\", CPS.\"Module\", CPS.\"System\"
		from config_position CP
		join config_position_security CPS on CP.\"Unique\" = CPS.\"Position\"
		join config_position_security_list CPSL on CPS.\"Function\" = CPSL.\"Function\"
		where CPS.\"Status\" = 1 and CP.\"Status\" = 1 AND (CP.\"Suppress\" is NULL OR CP.\"Suppress\" = 0) order by CPS.\"Unique\" desc";

		/* $sql = "select config_position.\"Unique\", config_position.\"PositionName\", config_position_security.\"Module\", config_position_security.\"Function\", config_position_security.\"Prompt\", config_position_security.\"System\"
		from config_position
		join config_position_security
		on config_position.\"Unique\" = config_position_security.\"Position\"
		where config_position_security.\"Status\" = 1"; */

		$query = $this->db->query($sql);

		$result = $query->result_array();
		return $result;
	}
function get_Department_list(){
		$sql = "select \"Unique\", \"Department\" as \"Name\", \"Sort\" from config_position_department where \"Status\" = 1 order by \"Sort\" asc";

		$query = $this->db->query($sql);

		$result = $query->result_array();
		return $result;
		
	}

function position_search($position){
		$sql='select * from config_position where LOWER("PositionName")=LOWER(\''.$position.'\') and "Status" = 1';
		$query = $this->db->query($sql);
		$result = $query->num_rows();
		return $result;
	}

function product_search($category){
		$sql='select * from config_position_department where LOWER("Department")=LOWER(\''.$category.'\') and "Status" = 1';
		$query = $this->db->query($sql);
		$result = $query->num_rows();
		return $result;
	}

	function insert($table, $data){
		$this->db->insert($table, $data);
		$newid = $this->db->insert_id();
		return $newid;
	}

	function update($table, $fields_array, $data){
		$this->db->where($fields_array);
		$this->db->update($table, $data);
		$result = $this->db->affected_rows();
		if($result > 0){
			return true;
		}else{
			return false;
		}
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
	

}
