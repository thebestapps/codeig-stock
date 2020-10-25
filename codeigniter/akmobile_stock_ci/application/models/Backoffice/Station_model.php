<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Station_model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$timezone = "Pacific/Honolulu";
		if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
		ini_set('max_execution_time', 1000);
    $this->load->database('akback');		
	}

	function load_item()
	{
		//$sql 	= "select \"Unique\", \"Station\", \"Description\", \"Path\", \"File\" AS file_name, \"File\", \"Sort\", \"Created\", \"CreatedBy\" from \"config_station_picture\" where \"Status\" = '1' order by \"Unique\" desc";

		$sql 	= "select CSP.\"Unique\", CSP.\"Station\", CSP.\"Description\", CSP.\"Path\", CSP.\"File\" AS file_name, CSP.\"File\", CSP.\"Sort\", CSP.\"Created\", CU1.\"UserName\" as \"CreatedBy\",CSP.\"Updated\",CU2.\"UserName\" as \"UpdatedBy\", CSP.\"CreatedBy\" as \"CB\", CSP.\"UpdatedBy\" as \"UB\"
		from config_station_picture CSP
		left join config_user CU1 on CSP.\"CreatedBy\" = CU1.\"Unique\"
		left join config_user CU2 on CSP.\"UpdatedBy\" = CU2.\"Unique\"
		where CSP.\"Status\" = '1' order by CSP.\"Unique\" desc";
		$query 	= $this->db->query($sql);
		return $query->result_array();
	}

	function get_item($id)
	{
		$sql 	= "select \"Path\", \"File\" as fname from \"config_station_picture\" where \"Status\" = '1' AND \"Unique\" = $id order by \"Unique\" desc";
		$query 	= $this->db->query($sql);
		return $query->row();
	}

	function load_config_stations()
	{
		$sql 		= "select \"Unique\", \"Name\" from \"config_station\" where \"Status\" = '1' order by \"Name\" asc";
		$query 		= $this->db->query($sql);
		return $query->result_array();
	}


	function store($data)
	{
		$data['Status'] = 1;
		$newid 			= $this->db->insert("config_station_picture", $data);
		return true;
	}

	function update_stars($data,$id)
	{
		$this->db->where(array("\"Unique\"" => $id));
		$this->db->update("config_station_picture",$data);
		//echo json_encode($this->db->queries);
		return true;
	}


	public function softDelete($id)
	{
        $values 	= array(
            "Status" 	=> 0
        );
        $this->db->where("\"Unique\"", $id);
        $query 		= $this->db->update("config_station_picture", $values);
        return "deleted";
    }

}
