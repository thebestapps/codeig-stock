<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Users_model extends CI_Model
{
	public function __construct()
	{
		// Call the CI_Model constructor
		parent::__construct();
		$timezone = "Pacific/Honolulu";
		if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
		ini_set('max_execution_time', 1000);
		$this->load->database('akback');
	}
 
	//-->Position Data with Note
	function get_users($id)
	{
		$sql = "SELECT * from backoffice_user_search WHERE \"Status\"=1 AND \"Unique\" = ".$id." ORDER BY \"Unique\" DESC";
 
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	function get_all_users()
	{
		$sql = "SELECT * from backoffice_user_search WHERE \"Status\"=1 ORDER BY \"Unique\" DESC";
 
		$query = $this->db->query($sql);
		return $query->result_array();
	}


	//-->Position Data with Note
	function get_positions($id)
	{
		$sql = 'SELECT 
		a."Unique" as "PositionID",  a."ConfigPositionUnique", a."ConfigUserUnique", c."PositionName" as "Name", a."PayBasis", a."PayRate",
		a."Created" as "Created", 
		a."Updated" as "Updated",
		CU1."UserName" as "CreatedBy",
		CU2."UserName" as "UpdatedBy", 
		a."CreatedBy" as "CreatedID", 
		a."UpdatedBy" as "UpdatedID",a."PrimaryPosition",
		(CASE a."PrimaryPosition" WHEN 1 THEN \'Yes\' ELSE \'No\' END) AS "Primary",	
		a."Department", DE."Department" as "DepartmentName", a."StartDate", a."EndDate", a."Comment"
		FROM config_user_position a
		LEFT JOIN config_position b on a."PrimaryPosition" = b."Unique" and b."Status"=1
		LEFT JOIN config_position c on a."ConfigPositionUnique" = c."Unique" and c."Status" in (1,0) 
		left join config_user CU1 on CU1."Unique" = a."CreatedBy"
		left join config_user CU2 on CU2."Unique" = a."UpdatedBy"
		left join config_position_department DE on DE."Unique" = a."Department"
		WHERE a."Status"=1 AND a."ConfigUserUnique" = '.$id.' ORDER BY a."PrimaryPosition" DESC';
 
		$query = $this->db->query($sql);
		return $query->result_array();
	}

function get_positions_row($id)
	{
		$sql = "SELECT 
		a.\"Unique\" as \"PostionID\",  a.\"ConfigPositionUnique\", a.\"ConfigUserUnique\", c.\"PositionName\" as \"Name\", a.\"PayBasis\", a.\"PayRate\",
		a.\"Created\" as \"Created\", 
		a.\"Updated\" as \"Updated\",
		CU1.\"UserName\" as \"CreatedBy\",
		CU2.\"UserName\" as \"UpdatedBy\", 
		a.\"CreatedBy\" as \"CreatedID\", 
		a.\"UpdatedBy\" as \"UpdatedID\",a.\"PrimaryPosition\",
		(CASE a.\"PrimaryPosition\" WHEN 1 THEN 'Yes' ELSE 'No' END) AS \"Primary\",	
		a.\"Department\", DE.\"Department\" as \"DepartmentName\", a.\"StartDate\", a.\"EndDate\", a.\"Comment\"
		FROM config_user_position a
		LEFT JOIN config_position b on a.\"PrimaryPosition\" = b.\"Unique\" and b.\"Status\"=1
		LEFT JOIN config_position c on a.\"ConfigPositionUnique\" = c.\"Unique\" and c.\"Status\" in (1,0) 
		left join config_user CU1 on CU1.\"Unique\" = a.\"CreatedBy\"
		left join config_user CU2 on CU2.\"Unique\" = a.\"UpdatedBy\"
		left join config_position_department DE on DE.\"Unique\" = a.\"Department\"
		WHERE a.\"Status\"=1 AND a.\"Unique\"= ".$id." ORDER BY a.\"PrimaryPosition\" DESC";
 
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	//-->Purchase Data
	function get_emails($id)
	{
		$sql = "select * from config_user_email where \"Status\" in (1) AND \"UserUnique\" = $id order by \"Unique\" desc";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	//-->Purchase Details Data
	function reciept_details($id)
	{
		$sql = "Select RD.\"Unique\" as \"ReceiptDetailID\",  RH.\"ReceiptNumber\", RH.\"transaction_date\" as \"TransactionDate\", RD.\"Item\",RD.\"Description\", RD.\"ListPrice\",
		RD.\"Discount\", RD.\"SellPrice\", RD.\"Quantity\",RD.\"Tax\", RD.\"Total\", RD.\"created\" as \"Created\",CU.\"UserName\" as \"CreatedBy\", RD.\"updated\" as \"Updated\",CU1.\"UserName\" as \"UpdateBy\",CL.\"LocationName\" as \"Location\"
		from receipt_header RH
		left join receipt_details RD on RH.\"Unique\" = RD.\"ReceiptHeaderUnique\" and RD.\"Status\" !=0
		left join config_user CU on CU.\"Unique\" = RD.\"created_by\"
		left join config_user CU1 on CU1.\"Unique\" = RD.\"updated_by\"
		left join config_location CL on CL.\"Unique\" = RD.location_unique
		where RD.completed in (4,5) and  RH.\"Unique\" = $id order by RD.\"LineNo\" asc";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	//-->Payment Details Data
	function reciept_payment($id)
	{
		$sql = "select RP.\"payment_name\" as \"Method\",RP.card4 as \"Card4\", round(RP.amount,2) as \"Tender\",round(RP.paid,2) as \"Paid\",
		round(RP.change,2) as \"Change\",round(coalesce(RP.\"Adjust\",0),2) as \"Adjust\", \"created\" as \"Created\",CU.\"UserName\" as \"CreatedBy\"
		from receipt_payment RP
		left join config_user CU on CU.\"Unique\" = RP.\"created_by\"
		where RP.\"status\" in (12,17) and RP.receipt_header_unique =  $id
		order by RP.line_no";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	function username_search($uname){
		$sql='select * from config_user where LOWER("UserName")=LOWER(\''.$uname.'\') and "Status" = 1';
		$query = $this->db->query($sql);
		$result = $query->num_rows();
		return $result;
	}
}
