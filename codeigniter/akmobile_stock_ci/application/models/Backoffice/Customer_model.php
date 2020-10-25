<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Customer_model extends CI_Model
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
	
	public function getLocations() 
	{
        $this->db->select('Unique, Name, LocationName');
        $this->db->where('Status', 1);
        $this->db->order_by('LocationName', 'ASC');
        return $this->db->get('config_location')->result_array();
    }
 
	//-->Customer List Data with Note
	function customer($id)
	{
		$sql = "SELECT a.\"Unique\", a.\"FirstName\", a.\"LastName\", a.\"Company\", a.\"Address1\", a.\"Address2\", a.\"City\", a.\"State\", a.\"Zip\",
		a.\"County\", a.\"Country\", a.\"Phone1\", a.\"Phone2\", a.\"Phone3\", a.\"Fax\", a.\"Email\", a.\"Website\", a.\"Custom1\",
		a.\"Custom2\", a.\"Custom3\", a.\"Status\", b.\"Note\", 
		a.\"Created\" as \"Created\", 
		a.\"Updated\" as \"Updated\",
		CU1.\"UserName\" as \"CreatedBy\",
		CU2.\"UserName\" as \"UpdatedBy\", 
		a.\"CreatedBy\" as \"CreatedID\", 
		a.\"UpdatedBy\" as \"UpdatedID\",
		a.\"AccountStatusUnique\", a.\"TermsUnique\",a.\"Points\"		
		FROM customer a
		LEFT JOIN notes b on a.\"Unique\" = b.\"ReferenceUnique\" and b.\"Status\"=1 and b.\"Type\" = 'customer'
		left join config_user CU1 on CU1.\"Unique\" = a.\"CreatedBy\"
		left join config_user CU2 on CU2.\"Unique\" = a.\"UpdatedBy\"
		WHERE a.\"Status\"=1  AND a.\"Unique\"=".$id."  
		ORDER BY a.\"Unique\" DESC";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	//-->Purchase Tab - Receipt
	function receipt($id)
	{
		$sql = "select RH.\"Unique\" as \"ReceiptID\", RH.\"CustomerName\" as \"Customer\", RH.\"TransactionDate\", RH.\"ReceiptNumber\", round(RH.\"SubTotal\",2) as \"SubTotal\",
		round(coalesce(RH.\"Tip\",0.00),2) as \"Tip\",
		round(RH.\"Tax\",2) as \"Tax\", round(RH.\"Total\",2) as \"Total\", coalesce(RP.\"Paid\",0.00) as \"Paid\",round(RH.\"Total\" ,2) - round(coalesce(RP.\"Paid\",0.00),2) as \"Balance\", RH.\"OrderNo\" as \"Order\", RH.\"OrderType\" as \"Type\",
		case when RH.\"Status\" = 4 then 'Complete' when RH.\"Status\" = 5 then 'On Hold' else 'Other' end as \"Status\",CL.\"LocationName\" as \"Location\",
		RH.\"Created\",CU.\"UserName\" as \"CreatedBy\",RH.\"Updated\",CU1.\"UserName\" as \"UpdatedBy\"
		from receipt_header RH 
		left join config_user CU on CU.\"Unique\" = RH.\"CreatedBy\"
		left join config_user CU1 on CU1.\"Unique\" = RH.\"UpdateBy\"
		left join config_location CL on CL.\"Unique\" =  RH.\"LocationUnique\"
		left join (select receipt_header_unique, CASE WHEN SUM(paid) is null THEN 0 ELSE round(SUM(paid),2) END as \"Paid\"
		from receipt_payment where \"status\" in (12,17) group by \"receipt_header_unique\") RP on RP.receipt_header_unique = RH.\"Unique\"
		where RH.\"Status\" in (4,5) and RH.\"CustomerUnique\" = $id
		order by RH.\"Unique\" desc";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	//-->Customer Purchase Tab - Receipt Details
	function receipt_details($id)
	{
		$sql = "Select RD.\"Unique\" as \"ReceiptDetailID\",  RH.\"ReceiptNumber\", RH.\"transaction_date\" as \"TransactionDate\", RD.\"Item\",RD.\"Description\", RD.\"ListPrice\",RD.\"Discount\", RD.\"SellPrice\", RD.\"Quantity\",
		RD.\"SellPrice\" * RD.\"Quantity\" as \"ExtSell\",
		RD.\"Tax\", RD.\"Total\", RD.\"created\" as \"Created\",CU.\"UserName\" as \"CreatedBy\", RD.\"updated\" as \"Updated\",CU1.\"UserName\" as \"UpdateBy\",CL.\"LocationName\" as \"Location\"
		from receipt_header RH
		left join receipt_details RD on RH.\"Unique\" = RD.\"ReceiptHeaderUnique\" and RD.\"Status\" !=0
		left join config_user CU on CU.\"Unique\" = RD.\"created_by\"
		left join config_user CU1 on CU1.\"Unique\" = RD.\"updated_by\"
		left join config_location CL on CL.\"Unique\" = RD.location_unique
		where RD.completed in (1,2,4,5) and  RH.\"Unique\" = $id order by RD.\"LineNo\" asc";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	/*  Payment Tab -- Payments
			Status 11 = Void Payment, Status 12 = Accept Payment, Status 17 = Void Payment
	*/
		
	function receipt_payment($id)
	{
		$sql = "select RP.\"payment_name\" as \"Method\",RP.card4 as \"Card4\", round(RP.amount,2) as \"Tender\",round(RP.paid,2) as \"Paid\",
		round(RP.change,2) as \"Change\",round(coalesce(RP.\"Adjust\",0),2) as \"Adjust\", \"created\" as \"Created\",CU.\"UserName\" as \"CreatedBy\"
		from receipt_payment RP
		left join config_user CU on CU.\"Unique\" = RP.\"created_by\"
		where RP.\"status\" in (11,12,17) and RP.receipt_header_unique =  $id
		order by RP.line_no";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	
	function insert($table, $data)
	{$this->db->insert($table, $data);
		//$newid = $this->db->insert_id();
		$sql =   "SELECT currval(pg_get_serial_sequence('$table','Unique')) as newid";
		$query = $this->db->query($sql);
		return $query->row()->newid;
	}

	function check_customer_linked($customer){
		$sql='select count (coalesce("Customer")) from config_project_jobs 
		where  "Customer" ='.$customer;
		$query = $this->db->query($sql);
		$result = $query->row_array();
		return $result;
	}
	
}
