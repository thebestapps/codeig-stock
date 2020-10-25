<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
//keep
class Backoffice_model extends CI_Model {


	  public function __construct(){
	    // Call the CI_Model constructor
	    parent::__construct();
	    $timezone = "Pacific/Honolulu";
	    if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
	    ini_set('max_execution_time', 1000);
	    $this->load->database('akback');
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

	function Delete($table, $array){
		$result = $this->db->delete($table, $array);
		return $result;
	}

	/*Login Form Query Validation*/
	function validate($username, $password){
		$this->db->select("Unique, UserName, FirstName, LastName, Status");
		$this->db->where("UserName", $username);
		$this->db->where("Password", $password);
		$result = $this->db->get("config_user");
		$data = $result->row_array();
		return $data;
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

	function location_setting($unique){
		$this->db->select("*");
		$this->db->from("config_location_settings");
		//$this->db->where("LocationUnique", $unique);
		$this->db->where_in("stationunique", array($unique,0));
		$result = $this->db->get();
		return $result->result_array();
	}

	function config_station(){
		$this->db->select("*");
		$this->db->from("config_station");
		$this->db->where("Status", 1);
		$this->db->order_by("Name");
		$result = $this->db->get();
		return $result->result_array();
	}

	function config_station_by_unique($unique){
		$this->db->select("*");
		$this->db->where("Unique", $unique);
		$this->db->where("Status", 1);
		$query = $this->db->get("config_station");
		$result = $query->row_array();
		return $result;
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

	function find_station_name($StationNumber){
		$this->db->select("Name");
		$this->db->from("config_station");
		$this->db->where("Number", $StationNumber);
		$this->db->where("Status", 1);
		$result = $this->db->get();
		$row = $result->row_array();
		return $row["Name"];
	}


	function inventory($storeunique){
		$sql="SELECT item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\" AS \"SupplierId\", supplier.\"Company\" AS \"Supplier\", item.\"SupplierPart\", item.\"BrandUnique\" AS \"BrandId\", brand.\"Name\" AS \"Brand\",
			item.\"ListPrice\", item.price1, item.price2, item.price3, item.price4, item.price5,
			category_main.\"Unique\" AS \"CatMainId\", category_sub.\"Name\" AS \"Category\", category_sub.\"Unique\" AS \"SubCategory\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 1 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Size\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 2 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Color\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute where item_attribute.\"AttributeUnique\" = 3 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Other\",
			item.\"Cost\" + item.\"Cost_Extra\" + item.\"Cost_Freight\" + item.\"Cost_Duty\" AS \"CostLanded\",
			item.\"Cost\", item.\"Cost_Extra\", item.\"Cost_Freight\", item.\"Cost_Duty\",

			SUM(isl.\"Quantity\") AS \"Quantity\"
			FROM item
			LEFT JOIN supplier ON item.\"SupplierUnique\" = supplier.\"Unique\"
			LEFT JOIN brand ON item.\"BrandUnique\" = brand.\"Unique\"
			LEFT JOIN category_sub ON item.\"CategoryUnique\" = category_sub.\"Unique\"
			LEFT JOIN category_main on category_main.\"Unique\"=category_sub.\"CategoryMainUnique\"
			LEFT JOIN item_stock_line isl ON isl.\"ItemUnique\"=item.\"Unique\"
			WHERE item.\"Status\"=1
			GROUP BY item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\", supplier.\"Company\", item.\"SupplierPart\", item.\"BrandUnique\", brand.\"Name\",
category_main.\"Unique\", category_sub.\"Name\", category_sub.\"Unique\", \"Size\", \"Color\", \"Other\", \"CostLanded\", item.\"Cost_Duty\"
			ORDER BY item.\"Unique\" DESC ";
		//WHERE isl.\"LocationUnique\"=".$storeunique." //-->Removed 06/18/2015
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;

		/*
		#Note: Just skip item_attribute and item_price tables for now. 05/06/2015
		if($search){
			$search = str_replace(" "," & ",$search);
		}else{
			$search = "!defined";
		}

		WHERE isl.\"LocationUnique\"=".$storeunique." AND tsvector(item.\"Unique\"||' '||item.\"Item\"||' '||item.\"Part\"||' '||item.\"Description\"||'  '||supplier.\"Company\"||' '||item.\"SupplierPart\"||' '||brand.\"Name\"||' '||category_sub.\"Name\"||' '||item.\"Cost\") @@ tsquery('".$search."')
			ORDER BY item.\"Unique\" DESC ";
		*/
	}


	/*
	function inventory($storeunique){
		$sql="SELECT item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\" AS \"SupplierId\", supplier.\"Company\" AS \"Supplier\", item.\"SupplierPart\", item.\"BrandUnique\" AS \"BrandId\", brand.\"Name\" AS \"Brand\",
			category_main.\"Unique\" AS \"CatMainId\", category_sub.\"Name\" AS \"Category\", category_sub.\"Unique\" AS \"SubCategory\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 1 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Size\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 2 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Color\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute where item_attribute.\"AttributeUnique\" = 3 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Other\",
			item.\"Cost\" + item.\"Cost_Extra\" + item.\"Cost_Freight\" + item.\"Cost_Duty\" AS \"CostLanded\",
			item.\"Cost\", item.\"Cost_Extra\", item.\"Cost_Freight\", item.\"Cost_Duty\",

			(SELECT \"RegularPrice\"
			FROM item_price a WHERE a.\"StartDate\" = (SELECT MAX(b.\"StartDate\")
			FROM item_price b WHERE b.\"ItemUnique\" = a.\"ItemUnique\"
			AND b.\"ScheduleLevel\" = a.\"ScheduleLevel\"
			AND a.\"ScheduleLevel\" = 0)
			AND a.\"StartTime\" = (SELECT MAX(b.\"StartTime\")
			FROM item_price b WHERE b.\"ItemUnique\" = a.\"ItemUnique\"
			AND b.\"ScheduleLevel\" = a.\"ScheduleLevel\"
			AND a.\"ScheduleLevel\" = 0)
			AND a.\"ItemUnique\" = item.\"Unique\") AS \"Price\",

			(SELECT \"SalePrice\"
			FROM item_price a WHERE a.\"StartDate\" = (SELECT MAX(b.\"StartDate\")
			FROM item_price b WHERE b.\"ItemUnique\" = a.\"ItemUnique\"
			AND b.\"ScheduleLevel\" = a.\"ScheduleLevel\"
			AND a.\"ScheduleLevel\" = 0)
			AND a.\"StartTime\" = (SELECT MAX(b.\"StartTime\")
			FROM item_price b WHERE b.\"ItemUnique\" = a.\"ItemUnique\"
			AND b.\"ScheduleLevel\" = a.\"ScheduleLevel\"
			AND a.\"ScheduleLevel\" = 0)
			AND a.\"ItemUnique\" = item.\"Unique\") AS \"SalePrice\",

			SUM(isl.\"Quantity\") AS \"Quantity\"
			FROM item
			LEFT JOIN supplier ON item.\"SupplierUnique\" = supplier.\"Unique\"
			LEFT JOIN brand ON item.\"BrandUnique\" = brand.\"Unique\"
			LEFT JOIN category_sub ON item.\"CategoryUnique\" = category_sub.\"Unique\"
			LEFT JOIN category_main on category_main.\"Unique\"=category_sub.\"CategoryMainUnique\"
			LEFT JOIN item_stock_line isl ON isl.\"ItemUnique\"=item.\"Unique\"
			WHERE item.\"Status\"=1
			GROUP BY item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\", supplier.\"Company\", item.\"SupplierPart\", item.\"BrandUnique\", brand.\"Name\",
category_main.\"Unique\", category_sub.\"Name\", category_sub.\"Unique\", \"Size\", \"Color\", \"Other\", \"CostLanded\", item.\"Cost_Duty\", \"Price\"
			ORDER BY item.\"Unique\" DESC ";
			//WHERE isl.\"LocationUnique\"=".$storeunique." //-->Removed 06/18/2015
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;


		#Note: Just skip item_attribute and item_price tables for now. 05/06/2015
		#When you use this function again this codes here at the bottom should comment out.
		if($search){
			$search = str_replace(" "," & ",$search);
		}else{
			$search = "!defined";
		}

		WHERE isl.\"LocationUnique\"=".$storeunique." AND tsvector(item.\"Unique\"||' '||item.\"Item\"||' '||item.\"Part\"||' '||item.\"Description\"||'  '||supplier.\"Company\"||' '||item.\"SupplierPart\"||' '||brand.\"Name\"||' '||category_sub.\"Name\"||' '||item.\"Cost\") @@ tsquery('".$search."')
			ORDER BY item.\"Unique\" DESC ";
	}
*/
	function supplier_listdata(){
		$this->db->select("Unique, Company");
		$this->db->from("supplier");
		$this->db->where("Company != ''");
		$this->db->order_by("Company", "asc");
		$result = $this->db->get();
		$data = $result->result_array();
		return $data;
	}

	function brand(){
		$this->db->select("Unique, Name");
		$this->db->order_by("Name", "asc");
		$result = $this->db->get("brand");
		$data = $result->result_array();
		return $data;
	}

	function maincat(){
		$this->db->select("Unique, MainName");
		$this->db->order_by("MainName", "asc");
		$result = $this->db->get("category_main");
		$data = $result->result_array();
		return $data;
	}

	function maincat_search($maincatid){
		/*
		$this->db->select("*");
		$this->db->where("Unique", $maincatid);
		$maincat_result =$this->db->get("category_main");
		$maincat_row = $maincat_result->row_array();
		$catstart = $maincat_row["CatStart"];
		$catsend = $maincat_row["CatEnd"];

		$this->db->select("*");
		$this->db->where("WWUnique >=", $catstart);
		$this->db->where("WWUnique <=", $catsend);
		$result = $this->db->get("category_sub");
		return $result->result_array();
		*/
		$this->db->select("Unique, Name");
		$this->db->where("CategoryMainUnique", $maincatid);
		$result = $this->db->get("category_sub");
		return $result->result_array();
	}


	function new_item($data){
		$result = $this->db->insert("item", $data);
		$itemunique = $this->db->insert_id();
		return $itemunique;
	}

	function new_item_price($data){
		$result = $this->db->insert("item_price", $data);
		$last_id = $this->db->insert_id();
		return $last_id;
	}

	function new_item_stock_line($data){
		$result = $this->db->insert("item_stock_line", $data);
		return $result;
	}


	/*Temp*/
	function syncitemstock(){
		$this->db->select("ItemUnique, Store, Quantity");
		$result = $this->db->get("item_stock");
		return $result->result_array();
	}

	function save_sync_item_stock($data){
		$result = $this->db->insert_batch("item_stock_line", $data);
		return $result;
	}

	function wwmaincat(){
		$result = $this->db->get("wwmaincat");
		return $result->result_array();
	}

	function save_category_main($data){
		$result = $this->db->insert_batch("category_main", $data);
		return $result;
	}

	function iteminfo($itemid, $storeunique){
		$sql = "SELECT item.\"Unique\", item.\"Item\", item.\"Part\", item.\"Description\", item.\"SupplierPart\", supplier.\"Unique\" AS \"Supplier\", brand.\"Unique\" AS \"Brand\", category_sub.\"CategoryMainUnique\" AS \"Category\", category_sub.\"Unique\" AS \"SubCategory\", item.\"Cost\",
		item_stock_line.\"Quantity\",
		(SELECT \"RegularPrice\"
		FROM item_price a WHERE a.\"StartDate\" = (SELECT MAX(b.\"StartDate\")
		FROM item_price b WHERE b.\"ItemUnique\" = a.\"ItemUnique\"
		AND b.\"ScheduleLevel\" = a.\"ScheduleLevel\"
		AND a.\"ScheduleLevel\" = 0) AND a.\"ItemUnique\" = item.\"Unique\") AS \"Price\"
		FROM item
		LEFT JOIN supplier on supplier.\"Unique\"=item.\"SupplierUnique\"
		LEFT JOIN brand on brand.\"Unique\"=item.\"BrandUnique\"
		LEFT JOIN category_sub on category_sub.\"Unique\"=item.\"CategoryUnique\"
		LEFT JOIN category_main on category_main.\"Unique\"=category_sub.\"CategoryMainUnique\"
		LEFT JOIN item_stock_line on item_stock_line.\"ItemUnique\"=item.\"Unique\" AND item_stock_line.\"StoreUnique\"=".$storeunique."
		WHERE item.\"Unique\"=".$itemid;
		$result = $this->db->query($sql);
		return $result->row_array();
	}


	function update_inventory($table, $itemunique, $data, $userid, $tablefield){
		if($data){
			$final_data = array();
			foreach($data as $row){
				$final_data = $row;
			}
			$this->db->where($tablefield, $itemunique);
			$result = $this->db->update($table, $final_data);
			if($result){
				$update_date_by = array(
					"Updated" => $this->DateTime(),
					"UpdatedBy" => $userid
				);
				$this->db->where($tablefield, $itemunique);
				$this->db->update($table, $update_date_by);
			}
			$results = true;
		}else{
			$results = false;
		}
		return $results;
	}


	function check_item_price($unique){
		$sql="Select \"ItemUnique\", \"RegularPrice\" FROM item_price AS a
			  WHERE a.\"StartDate\" =
			 (Select MAX(b.\"StartDate\")
		 	  FROM item_price as b
			  WHERE b.\"ItemUnique\" = a.\"ItemUnique\" and b.\"ScheduleLevel\" = a.\"ScheduleLevel\")
			  AND \"ScheduleLevel\" = 0
			  AND \"ItemUnique\" = ".$unique."
			  ORDER BY \"ItemUnique\"";
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}

	function DateTime(){
		$date_time = date("Y-m-d h:i:s");
		return $date_time;
	}


	function get_item_data($unique){
		$this->db->select("Unique, Item, Part, Description, SupplierUnique, SupplierPart, BrandUnique, CategoryUnique, Cost, Cost_Extra, Cost_Freight, Cost_Duty");
		$this->db->where("Unique", $unique);
		$this->db->from("item");
		$result = $this->db->get();
		return $result->result_array();
	}


	function save_data($table, $data){
		$result = $this->db->insert($table, $data);
		return $result;
	}

	function delete_item($table, $data, $id, $field){
		$this->db->where($field, $id);
		$result = $this->db->update($table, $data);
		return $result;
	}

	function restore_item($table, $data, $id, $field){
		$this->db->where($field, $id);
		$result = $this->db->update($table, $data);
		return $result;
	}
	/*
	function item_stock_line_by_itemunique($unique, $locationid){
		$this->db->select("a.Unique, a.ItemUnique, a.LocationUnique,  a.Quantity, a.TransactionDate, a.Comment, b.LocationName, c.Description,
						  SUM(Quantity) OVER (PARTITION BY a.LocationUnique ORDER BY a.TransactionDate,a.Unique) as Total");
		$this->db->from("item_stock_line a, location b, types c");
		$this->db->where("a.LocationUnique=b.Unique");
		$this->db->where("a.Type=c.Unique");
		$this->db->where("a.ItemUnique", $unique);
		$this->db->where("a.LocationUnique", $locationid);
		$this->db->order_by("a.TransactionDate", "desc");
		$result = $this->db->get();
		return $result->result_array();
	}
	*/

	function item_stock_line_by_itemunique($unique, $locationid){
		$sql="SELECT  a.\"Unique\", a.\"ItemUnique\", a.\"LocationUnique\",  a.\"Quantity\", a.\"TransactionDate\", a.\"Comment\", b.\"LocationName\", c.\"Description\",
			SUM(a.\"Quantity\") OVER (PARTITION BY a.\"LocationUnique\" ORDER BY a.\"TransactionDate\",a.\"Unique\") as \"Total\"
			FROM item_stock_line a, config_location b, config_item_types c
			WHERE a.\"LocationUnique\"=b.\"Unique\"
			AND a.\"Type\"=c.\"Unique\"
			AND a.\"ItemUnique\" = ".$unique."
			AND a.\"LocationUnique\"=".$locationid."
			ORDER BY a.\"TransactionDate\" DESC, a.\"Unique\" DESC";
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}


	function total_adjqty($unique, $store){
		$sql="SELECT SUM(\"Quantity\") as \"Quantity\"
			  FROM item_stock_line
			  WHERE \"ItemUnique\" = ".$unique."
			  AND \"LocationUnique\" = ".$store."
			  GROUP BY \"ItemUnique\"";
		$query = $this->db->query($sql);
		$result = $query->row_array();
		return $result;
	}

	function alltax(){
		$this->db->select("*");
		$this->db->from("config_tax");
		$this->db->where("Status", "1");
		$result = $this->db->get();
		return $result->result_array();
	}

	function get_tax_value($itemunique){
		$this->db->select("*");
		$this->db->from("item_tax");
		$this->db->where("ItemUnique=".$itemunique."");
		$result = $this->db->get();
		return $result->result_array();
	}

	function check_tax_exists($itemunique, $taxid){
		$this->db->select("Unique");
		$this->db->where("ItemUnique=".$itemunique." AND TaxUnique=".$taxid."");
		$query = $this->db->get('item_tax');
		$result = $query->row_array();
		return $result["Unique"];
	}

	function update_tax_status($unique, $data){
		$this->db->where("Unique", $unique);
		$result = $this->db->update("item_tax", $data);
		return $result;
	}

	function check_tax_exists_status_zero($itemunique, $taxid){
		$this->db->select("Unique");
		$this->db->where("ItemUnique=".$itemunique." AND TaxUnique=".$taxid." AND Status=0");
		$query = $this->db->get('item_tax');
		$result = $query->row_array();
		return $result["Unique"];
	}


	function save_new_tax($data){
		$result = $this->db->insert("item_tax", $data);
		return $result;
	}

	function new_item_tax($data){
		$result = $this->db->insert_batch("item_tax", $data);
		return $result;
	}


	function get_barcode_list($itemUnique){
		$this->db->select("*");
		$this->db->where("ItemUnique", $itemUnique);
		$this->db->where("Status", 1);
		$query = $this->db->get("item_barcode");
		$result = $query->result_array();
		return $result;
	}

	function adj_qty_by_location($itemunique, $locationid){

		if($locationid != 0){
			$sql="SELECT  a.\"Unique\", a.\"ItemUnique\", a.\"LocationUnique\",  a.\"Quantity\", a.\"TransactionDate\", a.\"Comment\", b.\"LocationName\", c.\"Description\",
				SUM(a.\"Quantity\") OVER (PARTITION BY a.\"LocationUnique\" ORDER BY a.\"TransactionDate\",a.\"Unique\") as \"Total\"
				FROM item_stock_line a, config_location b, conifg_item_types c
				WHERE a.\"LocationUnique\"=b.\"Unique\"
				AND a.\"Type\"=c.\"Unique\"
				AND a.\"ItemUnique\" = ".$itemunique."
				AND a.\"LocationUnique\"=".$locationid."
				ORDER BY a.\"TransactionDate\" DESC, a.\"Unique\" DESC";
		}else{
			$sql="SELECT  a.\"Unique\", a.\"ItemUnique\", a.\"LocationUnique\",  a.\"Quantity\", a.\"TransactionDate\", a.\"Comment\", b.\"LocationName\", c.\"Description\",
				SUM(a.\"Quantity\") OVER (PARTITION BY a.\"LocationUnique\" ORDER BY a.\"TransactionDate\",a.\"Unique\") as \"Total\"
				FROM item_stock_line a, config_location b, config_item_types c
				WHERE a.\"LocationUnique\"=b.\"Unique\"
				AND a.\"Type\"=c.\"Unique\"
				AND a.\"ItemUnique\" = ".$itemunique."
				ORDER BY a.\"TransactionDate\" DESC, a.\"Unique\" DESC";
		}
			$query = $this->db->query($sql);
			$result = $query->result_array();
			return $result;

	}

	function inventory_by_location($locationid){
		$valarray = array();
		$this->db->select("Unique");
		$this->db->from("config_location");
		$RsCount = $this->db->get();
		$res = $RsCount->result_array();
		foreach($res as $row){
			array_push($valarray, $row["Unique"]);
		}

		$finalval = implode(',',$valarray);
		//var_dump($finalval);
		//die();
		if($locationid == 0){
			$locationid = " IN (".$finalval.")";
		}else{
			$locationid = " =".$locationid;
		}

		$sql="SELECT item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\" AS \"SupplierId\", supplier.\"Company\" AS \"Supplier\", item.\"SupplierPart\", item.\"BrandUnique\" AS \"BrandId\", brand.\"Name\" AS \"Brand\",
			item.\"ListPrice\", item.price1, item.price2, item.price3, item.price4, item.price5,
			category_main.\"Unique\" AS \"CatMainId\", category_sub.\"Name\" AS \"Category\", category_sub.\"Unique\" AS \"SubCategory\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 1 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Size\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute WHERE item_attribute.\"AttributeUnique\" = 2 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Color\",
			(SELECT item_attribute.\"Description\"
			FROM item_attribute where item_attribute.\"AttributeUnique\" = 3 and item_attribute.\"ItemUnique\" = item.\"Unique\") AS \"Other\",
			item.\"Cost\" + item.\"Cost_Extra\" + item.\"Cost_Freight\" + item.\"Cost_Duty\" AS \"CostLanded\",
			item.\"Cost\", item.\"Cost_Extra\", item.\"Cost_Freight\", item.\"Cost_Duty\",
			SUM(isl.\"Quantity\") AS \"Quantity\"
			FROM item
			LEFT JOIN supplier ON item.\"SupplierUnique\" = supplier.\"Unique\"
			LEFT JOIN brand ON item.\"BrandUnique\" = brand.\"Unique\"
			LEFT JOIN category_sub ON item.\"CategoryUnique\" = category_sub.\"Unique\"
			LEFT JOIN category_main on category_main.\"Unique\"=category_sub.\"CategoryMainUnique\"
			LEFT JOIN item_stock_line isl ON isl.\"ItemUnique\"=item.\"Unique\"
			WHERE isl.\"LocationUnique\"".$locationid."
			AND item.\"Status\"=1
			GROUP BY item.\"Unique\", item.\"Description\", item.\"Item\", item.\"Part\", item.\"SupplierUnique\", supplier.\"Company\", item.\"SupplierPart\", item.\"BrandUnique\", brand.\"Name\",
category_main.\"Unique\", category_sub.\"Name\", category_sub.\"Unique\", \"Size\", \"Color\", \"Other\", \"CostLanded\", item.\"Cost_Duty\"
			ORDER BY item.\"Unique\" DESC ";

		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}

	function location_test_load($locationid){
		$this->db->select("Unique, LocationName");
		$this->db->where("Unique", $locationid);
		$this->db->order_by("LocationName", "asc");
		$this->db->from("config_location");
		$result = $this->db->get();
		return $result->row_array();
	}

	function add_save_new_item($data){
		$this->db->insert("item", $data);
		$result = $this->db->insert_id();
		return $result;
	}

	function add_save_new_item_price($data){
		$result = $this->db->insert("item_price", $data);
		return $result;
	}

	function add_save_new_item_stock($data){
		$result = $this->db->insert("item_stock_line", $data);
		return $result;
	}

	function add_save_new_tax($data){
		$result = $this->db->insert("item_tax");
		return $result;
	}

	/*
	function customer(){
		$this->db->select("a.*,b.*");
		$this->db->from("customer a, notes b");
		$this->db->where("a.Status", 1);
		$this->db->where("a.Unique=b.ReferenceUnique");
		$this->db->where("b.Status", 1);
		$this->db->where("b.Type", "customer");
		$this->db->order_by("a.Unique", "desc");
		$result = $this->db->get();
		return $result->result_array();
	}
	*/

	//-->Customer List Data with Note
	function customer(){
		$sql = "SELECT a.*, b.\"Note\"
				FROM customer a
				LEFT JOIN notes b on a.\"Unique\"=b.\"ReferenceUnique\" and b.\"Status\"=1 and b.\"Type\" = 'customer'
				WHERE a.\"Status\"=1
				ORDER BY a.\"Unique\" DESC";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	//-->Supplier List Data with Note
	function supplier(){
		$sql = "SELECT a.*, b.\"Note\"
				FROM supplier a
				LEFT JOIN notes b on a.\"Unique\"=b.\"ReferenceUnique\" and b.\"Status\"=1 and b.\"Type\" = 'supplier'
				WHERE a.\"Status\"=1
				ORDER BY a.\"Company\" ASC";
		$query = $this->db->query($sql);
		return $query->result_array();
	}
	//-->Customer Update Information
	function update_customer_information($data, $unique){
		$this->db->where("Unique", $unique);
		$result = $this->db->update("customer", $data);
		return $result;
	}
	//-->Supplier Update Information
	function update_supplier_information($data, $unique){
		$this->db->where("Unique", $unique);
		$result = $this->db->update("supplier", $data);
		return $result;
	}
	//-->Customer Delete Information
	function customer_delete_info($data, $customerid){
		$this->db->where("Unique", $customerid);
		$result = $this->db->update("customer", $data);
		return $result;
	}
	//-->Supplier Delete Information
	function supplier_delete_info($data, $supplierid){
		$this->db->where("Unique", $supplierid);
		$result = $this->db->update("supplier", $data);
		return $result;
	}
	//-->Supplier Delete Information
	function brand_delete_info($data, $brandid){
		$this->db->where("Unique", $brandid);
		$result = $this->db->update("brand", $data);
		return $result;
	}
	//-->Customer Restore Information
	function customer_restore_info($data, $customerid){
		$this->db->where("Unique", $customerid);
		$result = $this->db->update("customer", $data);
		return $result;
	}
	//-->Supplier Restore Information
	function supplier_restore_info($data, $supplierid){
		$this->db->where("Unique", $supplierid);
		$result = $this->db->update("supplier", $data);
		return $result;
	}
	//-->Supplier Restore Information
	function brand_restore_info($data, $brandid){
		$this->db->where("Unique", $brandid);
		$result = $this->db->update("brand", $data);
		return $result;
	}
	//-->New Customer
	function new_customer($data){
		$this->db->insert("customer", $data);
		$result = $this->db->insert_id();
		return $result;
	}
	//-->New Supplier
	function new_supplier($data){
		$this->db->insert("supplier", $data);
		$result = $this->db->insert_id();
		return $result;
	}
	//-->Check Note if it's already exists
	function check_note_exist($array){
		$this->db->select("Unique");
		$this->db->where($array);
		$this->db->from("notes");
		$result = $this->db->get();
		$id = $result->row_array();
		return $id["Unique"];
	}
	//-->New Note
	function new_note($data){
		$result = $this->db->insert("notes", $data);
		return $result;
	}
	//-->Note Update
	function update_note($customerid, $data, $type){
		$this->db->where("ReferenceUnique", $customerid);
		$this->db->where("Type", $type);
		$result = $this->db->update("notes", $data);
		return $result;
	}

	function load_zipcode(){
		$this->db->distinct();
		$this->db->select("Unique, Zip, CountyLabel");
		$this->db->where("Status", 1);
		$this->db->from("config_geography");
		$this->db->order_by("Zip");
		$result = $this->db->get();
		return $result->result_array();
	}

	function find_zipcode($zipcodeid){
		$this->db->select("Zip");
		$this->db->where("Unique", $zipcodeid);
		$this->db->from("config_geography");
		$result = $this->db->get();
		return $result->row_array();
	}

	function get_citystatecountry($geocitiesid){
		$this->db->select("Unique, Zip, City, State, StateName, County, Country, CountryName, Area_Codes");
		$this->db->where("Unique", $geocitiesid);
		$this->db->from("config_geography");
		$result = $this->db->get();
		return $result->result_array();
	}

	function edit_get_citystatecountry($zipcode){
		$this->db->select("Unique, Zip, City, State, StateName, County, Country, CountryName, Area_Codes");
		$this->db->where("Zip", $zipcode);
		$this->db->from("config_geography");
		$result = $this->db->get();
		return $result->result_array();
	}

	function load_city(){
		$this->db->distinct();
		$this->db->select("City");
		$this->db->where("Status", 1);
		$this->db->from("config_geography");
		$this->db->order_by("City");
		$result = $this->db->get();
		return $result->result_array();
	}

	function load_city_by_zipcode($zipcode){
		$this->db->select("*");
		$this->db->where("Zip", $zipcode);
		$query = $this->db->get("config_geography");
		$result = $query->row_array();
		return $result;
	}

	function load_island(){
		$this->db->distinct();
		$this->db->select("County");
		$this->db->where("Status", 1);
		$this->db->from("config_geography");
		$this->db->order_by("County");
		$result = $this->db->get();
		return $result->result_array();
	}

	function load_state(){
		$this->db->distinct();
		$this->db->select("State, StateName");
		$this->db->from("config_geography");
		$this->db->where("Status", 1);
		$this->db->order_by("State");
		$result = $this->db->get();
		return $result->result_array();
	}

	function load_country(){
		$this->db->distinct();
		$this->db->select("Country, CountryName");
		$this->db->from("config_geography");
		$this->db->where("Status", 1);
		$this->db->order_by("Country");
		$result = $this->db->get();
		return $result->result_array();
	}

	function get_geocities_unique($unique){
		$this->db->select("*");
		$this->db->from("config_geography");
		$this->db->where("Zip", $unique);
		$result = $this->db->get();
		return $result->row_array();
	}

	function find_zipcode_selected($zipcodeid){
		$this->db->select("Unique, Area_Codes");
		$this->db->where("Zip", $zipcodeid);
		$this->db->from("config_geography");
		$result = $this->db->get();
		return $result->row_array();
	}

	function load_brand(){
		$sql = "SELECT a.*, b.\"Note\"
				FROM brand a
				LEFT JOIN notes b on a.\"Unique\"=b.\"ReferenceUnique\" and b.\"Status\"=1 and b.\"Type\" = 'brand'
				WHERE a.\"Status\"=1
				ORDER BY a.\"Name\" ASC";
		$query = $this->db->query($sql);
		return $query->result_array();
	}

	function update_brand($brandid, $data){
		$this->db->where("Unique", $brandid);
		$result = $this->db->update("brand", $data);
		return $result;
	}

	function new_brand($data){
		$result = $this->db->insert("brand", $data);
		$result = $this->db->insert_id();
		return $result;
	}

	function load_customers(){
		$this->db->select("*");
		$this->db->where("FirstName !=", '');
		$this->db->order_by("FirstName", "asc");
		$result = $this->db->get("customer");
		return $result->result_array();
	}

	function config_menu_functions(){
		$this->db->select("*");
		$this->db->where_in("Status", array(1,2,3,4));
		$this->db->order_by("Sort1", "Sort2", "ASC");
		$result = $this->db->get("config_menu_functions");
		return $result->result_array();
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

	function config_menu_category(){
		$this->db->select("*");
		$this->db->where("Status", 1);
		$this->db->where("CategoryName!=''");
		$this->db->order_by("CategoryName", "asc");
		$query = $this->db->get("config_menu_category");
		$result = $query->result_array();
		return $result;
	}

	function config_station_printers(){
		$this->db->select("*");
		$this->db->where("status", 1);
		$this->db->order_by("description");
		$query = $this->db->get("config_station_printers");
		$result = $query->result_array();
		return $result;
	}

	function config_menu_items_category($unique){
		$this->db->select("cmi.Unique, cmc.CategoryName, cmi.Label, cmi.Sort");
		$this->db->join("config_menu_category cmc", "cmc.Unique=cmi.MenuCategoryUnique", "left");
		$this->db->where("cmi.ItemUnique", $unique);
		$this->db->order_by("cmc.CategoryName, cmi.Sort", "asc");
		$query = $this->db->get("config_menu_items cmi");
		$result = $query->result_array();
		return $result;
	}

	function item_printer_by_item_unique($unique){
		$this->db->select('ip.Unique, i.Description, csp.description');
		$this->db->join("item i", "i.Unique=ip.ItemUnique", "left");
		$this->db->join("config_station_printers csp", "csp.unique=ip.PrinterUnique", "left");
		$this->db->where("ip.ItemUnique", $unique);
		$this->db->order_by("ip.Unique", "desc");
		$query = $this->db->get("item_printer ip");
		$result = $query->result_array();
		return $result;
	}

	function config_questions_item_by_item_unique($unique){
		$this->db->select("iq.Unique, cq.QuestionName, iq.Sort");
		$this->db->join("config_questions cq", "cq.Unique=iq.QuestionUnique");
		$this->db->join("item i", "i.Unique=iq.ItemUnique");
		$this->db->where("iq.ItemUnique", $unique);
		$this->db->order_by("Sort","asc");
		$query = $this->db->get("item_questions iq");
		$result = $query->result_array();
		return $result;
	}

	function config_questions(){
		$this->db->select("*");
		$this->db->where("Status", 1);
		$query = $this->db->get("config_questions");
		$result = $query->result_array();
		return $result;
	}

	function config_merchant_datacap_by_station($station_unique){
		$this->db->select("*");
		$this->db->where_in("StationUnique", $station_unique);
		$query = $this->db->get("config_merchant_datacap");
		$result = $query->result_array();
		return $result;
	}

	//-->Added by HD 02/23/2017
	function check_passcode_restriction($passcode){
		$sql = "SELECT \"cu\".\"Unique\", \"cu\".\"UserName\", \"cup\".\"ConfigPositionUnique\", \"cu\".\"ReportGroup\",
				case when cps.\"Function\" = 'TimeClockManager' then 'Yes' else 'No' end as \"TimeClockManager\"
				FROM \"config_user\" \"cu\"
				LEFT JOIN \"config_user_position\" cup ON cup.\"ConfigUserUnique\" = cu.\"Unique\" 
				left join (select \"Position\",\"Module\",\"Function\" from config_position_security where \"Module\" = 'BackOffice' and \"Function\" = 'TimeClockManager'
				and \"Status\" = 1) cps on cps.\"Position\" = cup.\"ConfigPositionUnique\"
				WHERE \"cup\".\"Status\" = 1
				and cup.\"PrimaryPosition\" = 1
				and cu.\"Status\" = 1
				and \"cu\".\"Code\" = '".$passcode."'";

		$query = $this->db->query($sql);
		return $query->row_array();

		// $this->db->select("cu.Unique, cu.UserName, cup.ConfigPositionUnique, cu.ReportGroup");
		// $this->db->join("config_user_position cup", "cup.ConfigUserUnique=cu.Unique AND cup.PrimaryPosition = 1", "left");
		// $this->db->where("cu.Code", $passcode);
		// $query = $this->db->get("config_user cu");
		// $result = $query->row_array();
		// return $result;
	}

	function config_position_security_by_function($position, $function){
        $this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
        $this->db->where("cps.Position", $position);
        $this->db->where("cps.Function", $function);
		$this->db->where("cps.Status", 1);
        $query = $this->db->get("config_position_security cps");
        $result = $query->result_array();
        return $result;
	}
	//-->11/13/17
	/* Old 01/23/18
	function config_position_security_by_function_row($position, $function){
		$this->db->select("cps.*");
		$this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
		$this->db->where("cps.Position", $position);
		$this->db->where("cps.Module", 'BackOffice');
		$this->db->where("cps.Status", 1);
		$this->db->where("cps.Function = 'Reports' OR cps.Function='ReportsGroup1' ");
		$query = $this->db->get("config_position_security cps");
		$result = $query->row_array();
		return $result;
	}
	*/

	function config_position_security_by_function_row($position, $function){
        $this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
		$this->db->where("cps.Position", $position);
		$this->db->where("cps.Module", 'BackOffice');
		$this->db->where("cps.Status", 1);
        $this->db->where("cps.Function = '".$function."'");
        $query = $this->db->get("config_position_security cps");
        $result = $query->row_array();
        return $result;
	}

	function config_position_security_by_function2($user, $position, $module, $function){
        $sql='select cps.* from config_position_security cps
			  join config_user_position cup on cup."ConfigPositionUnique"=cps."Position" AND cup."PrimaryPosition" = 1
			  where cup."ConfigUserUnique" = '.$user.'
			  and cps."Position" = '.$position.'
			  and cps."Module" = \''.$module.'\'
			  and cps."Function" = \''.$function.'\'
			  and cps."Status" = 1';
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
    }

	

	function config_user_position_by_unique($unique){
		$this->db->select("*");
		$this->db->where("ConfigUserUnique", $unique);
		$this->db->where("PrimaryPosition", 1);
		$this->db->where("Status", 1);
		$query = $this->db->get("config_user_position");
		$result = $query->row_array();
		return $result;
	}

	/* 01/23/18
	function config_position_security($position, $function, $module, $user){
		$this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
        $this->db->where("cps.Position", $position);
        $this->db->where("cps.Function", $function);
		$this->db->where("cps.Module", $module);
		$this->db->where("cup.ConfigUserUnique", $user);
        $query = $this->db->get("config_position_security cps");
        $result = $query->row_array();
        return $result;
	}
	*/

	function config_position_security($position, $function, $module, $user){
		$this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
        $this->db->where("cps.Position", $position);
        $this->db->where("cps.Function", $function);
		$this->db->where("cps.Module", $module);
		$this->db->where("cps.Status", 1);
		$this->db->where("cup.ConfigUserUnique", $user);
        $query = $this->db->get("config_position_security cps");
        $result = $query->row_array();
        return $result;
	}

	function config_attribute($attribute){
		$sql='select * from config_attribute where "Form" = \''.$attribute.'\' order by "Sort" asc';
		$query = $this->db->query($sql);
		$result = $query->result_array();
		return $result;
	}

	function update_by_batch($table, $data, $field){
		$result = $this->db->update_batch($table, $data, $field);
		return $result;
	}
}
