<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Stock_adjust extends CI_Controller {
    public function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library('session');
        $this->load->library('form_validation');
		$this->load->library('Curl');
        $this->load->helper('download');
        ini_set('max_execution_time', 1000);
        $this->load->database('akback');

		$timezone = $this->session->userdata("StationTimezone");
		if($timezone == '' || $timezone == NULL){
			$timezone = "Pacific/Honolulu";
			}
        if (function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
    }

    function index(){
        $this->load->view('backoffice/stock_adjust');
    }

    function get_list() {
        $json = array();
        $Status = $this->input->post("Status");
        $result = $this->db->query(
            'select * from item_stock_adjust_mobile where "Status" = '.$Status . ' order by "Unique" desc'
        )->result_array();
       
        $json["result"] = $result;
            
        echo json_encode($json);
    }

    function search_item(){
        $json = array();
        $search = $this->input->post("Search");
        $result = $this->db->query(
            ' SELECT its."ID", its."Unique", its."Item", its."Part", its."PartNumber", its."Description", its."Cost", its."CostExtra", its."CostFreight", its."CostDuty", its."CostLanded",
				its."Custom1", its."Custom2", its."Custom3", its."Custom4", its."Custom5", its."SupplierUnique", its."Supplier", its."SupplierPart",
				its."CreateLocation", its."ItemType", its."Status", its."Created", its."CreatedByUnique", its."CreatedBy", its."Updated", its."UpdatedByUnique", its."UpdatedBy", cast(null as integer) as "SerialUnique", 
                null as "BarCodeAltUnique", its."Part" as "BarCodeAlt", 0 as "ItemSerialUnique", null as "Serial", 
                "Stock0", "Stock1", "Stock2", "Stock3", "Stock4", "Stock5", "Stock6", "Stock7", "Stock8", "Stock9", "Stock10", its."MatrixRow", its."BarCodeArray"
                from backoffice_item_search its
                where
				("Part" 
                
                ~* \''.$search.'\' or \''.$search.'\' = any("BarCodeArray") or "Description"  ~* \''.$search.'\' ) and "Status" = 1 
				'
        )->result_array();
        $json["result"] = $result;
        echo json_encode($json);
    }

    function save_stock_adjust_details(){
        $json = array();
        $Invoice = $this->input->post("Invoice");
        $Notes = $this->input->post("Notes");
        $grid = $this->input->post("grid");
        $gridata = json_decode($grid, true);
        $Status = 1;

        $data = array(
            "AdjustDate" => date("Y-m-d H:i:s"),
            "Invoice"   => $Invoice,
            "Notes"     => $Notes,
            "Location"  => 1,
            "Station"   => 1,
            "Status"    => 1,
            "Created"   => date("Y-m-d H:i:s"),
            "CreatedBy" => 1
        );

        $this->db->insert('item_stock_adjust_mobile', $data);
		$StockAdjustUnique = $this->db->query(
            "SELECT currval(pg_get_serial_sequence('item_stock_adjust_mobile', 'Unique')) as newid"
        )->row()->newid;

        $data = array();
        foreach($gridata as $row){
            $data[] = array(
                "AdjustUnique"  => $StockAdjustUnique,
                "ItemUnique"    => $row["Unique"],
                "Location"      => 1,
                "Item"          => $row["Item"],
                "Part"          => $row["Part"],
                "Description"   => $row["Description"],
                "Quantity"      => $row["Quantity"],
                "Status"        => 1,
                "Created"       => date("Y-m-d H:i:s"),
                "CreatedBy"     => 1 
            );
        }
        
        if($data){
            $this->db->insert_batch("item_stock_adjust_mobile_details", $data);
        }
        
        $result = $this->db->query(
            'select isa.*, isa."ItemUnique" as "ID", isa."Unique" as "StockAdjustDetailUnique", isl."Unique" as "StockLineUnique" 
            from item_stock_adjust_mobile_details isa
            left join item_stock_line isl on isl."StockAdjustDetailMobile"=isa."Unique"
            where isa."AdjustUnique" = '.$StockAdjustUnique.' and isa."Status" = 1 order by isa."Unique" desc'
        )->result_array();
        $json["details"] = $result;

        $result = $this->db->query(
            'select * from item_stock_adjust_mobile where "Status" = '.$Status.' order by "Unique" desc'
        )->result_array();

        $json["result"] = $result;  
        $json["StockAdjustUnique"] = $StockAdjustUnique;

        echo json_encode($json);
    }

    function update_stock_adjust_details(){
        $json = array();
        $Unique = $this->input->post("Unique");
        $Invoice = $this->input->post("Invoice");
        $Notes = $this->input->post("Notes");
        $grid = $this->input->post("grid");
        $griddata = json_decode($grid, true);
        $DeleteItemQty = $this->input->post("DeleteItemQty");
        $Completed = $this->input->post("Completed");
        $grid_item_delete = json_decode($DeleteItemQty, true);

        $Status = $this->input->post('Status');
        $data = array(
            "Invoice"   => $Invoice,
            "Notes"     => $Notes,
            "Updated"   => date("Y-m-d H:i:s"),
            "UpdatedBy" => 1     
        );
        $this->db->where("Unique", $Unique);
        $this->db->update("item_stock_adjust_mobile", $data);
        
        $UpdateQtyArr = [];
        $NewQtyArr = [];
        $ItemStockLineArr = [];
        $CompletedItems = [];
        foreach($griddata as $row){
            if(isset($row["Changed"])){
                unset(
                    $row["Changed"], 
                    $row["undefined"],
                    $row["visibleindex"],
                    $row["uniqueid"],
                    $row["boundindex"],
                    $row["uid"]
                );
                $UpdateQtyArr[] = array(
                    "Unique"    => $row["Unique"], 
                    "Quantity"  => $row["Quantity"],
                    "Updated"   => date("Y-m-d H:i:s"),
                    "UpdatedBy" => 1
                ); 

                if($row["StockLineUnique"]){
                    $ItemStockLineArr[] = array(
                        "Unique"    => $row["StockLineUnique"],
                        "Quantity"  => $row["Quantity"],
                        "Updated"   => date("Y-m-d H:i:s"),
                        "UpdatedBy" => 1
                    );
                }
            }

            if(!isset($row["AdjustUnique"])){
                $row["ItemUnique"] = $row["Unique"];
                unset(
                    $row["Unique"], 
                    $row["boundindex"], 
                    $row["uid"], 
                    $row["visibleindex"], 
                    $row["uniqueid"],
                    $row["ID"]
                );
                $row["AdjustUnique"] = $Unique;
                $row["Status"] = 1;
                $row["CreatedBy"] = 1;
                $NewQtyArr[] = $row;
            }
        }
        
        if($UpdateQtyArr){
            $this->db->update_batch("item_stock_adjust_mobile_details", $UpdateQtyArr, "Unique");
        }

        if($NewQtyArr){
            $this->db->insert_batch("item_stock_adjust_mobile_details", $NewQtyArr);
            if($Completed == 2){
                $initRes = $this->db->query(
                    'select a.*, b."StockAdjustDetailMobile" from item_stock_adjust_mobile_details a
                    left join item_stock_line b on b."StockAdjustDetailMobile"=a."Unique"
                    where a."AdjustUnique" = '.$Unique.' and a."Status" = 1'
                )->result_array();

                foreach($initRes as $row){
                    if($row["StockAdjustDetailMobile"] == null){
                        $CompletedItems[] = array(
                            "ItemUnique"=> $row["ItemUnique"],
                            "LocationUnique"  => 1,
                            "Type"      => 1,
                            "Quantity"  => $row["Quantity"],
                            "Created"   => date("Y-m-d H:i:s"),
                            "CreatedBy" => 1,
                            "status"    => 1,
                            "TransactionDate" => date("Y-m-d H:i:s"),
                            "trans_date" => date("Y-m-d"),
                            "unit_cost" => 0,
                            "Cost"      => 0,
                            "CostExtra" => 0,
                            "CostFreight"=> 0,
                            "CostDuty" => 0,
                            "StockAdjustDetailMobile" => $row["Unique"]
                        );
                    }
                }
            }
        }

        if($ItemStockLineArr){
            $this->db->update_batch("item_stock_line", $ItemStockLineArr, "Unique");
        }

        if($CompletedItems){
            $this->db->insert_batch("item_stock_line", $CompletedItems);
        }
        
        if($grid_item_delete){
            $data = [];
            $item_stock_line_arr_delete = [];
            foreach($grid_item_delete as $row){
                $data[] = array(
                    "Unique"    => $row["Unique"],
                    "Status"    => 0,
                    "Updated"   => date("Y-m-d H:i:s"),
                    "UpdatedBy" => 1 
                );

                if($row["StockLineUnique"]){
                    $item_stock_line_arr_delete[] = array(
                        "Unique"    => $row["StockLineUnique"],
                        "status"    => 0,
                        "Updated"   => date("Y-m-d H:i:s"),
                        "UpdatedBy" => 1 
                    );
                }
            }

            $this->db->update_batch("item_stock_adjust_mobile_details", $data, "Unique");

            if($item_stock_line_arr_delete){
                $this->db->update_batch("item_stock_line", $item_stock_line_arr_delete, "Unique");
            }
        }

        $result = $this->db->query(
            'select isa.*, isa."ItemUnique" as "ID", isa."Unique" as "StockAdjustDetailUnique", isl."Unique" as "StockLineUnique" 
            from item_stock_adjust_mobile_details isa
            left join item_stock_line isl on isl."StockAdjustDetailMobile"=isa."Unique"
            where isa."AdjustUnique" = '.$Unique.' and isa."Status" = 1 order by isa."Unique" desc'
        )->result_array();
        $json["details"] = $result;

        $result = $this->db->query(
            'select * from item_stock_adjust_mobile where "Status" = '.$Status.' order by "Unique" desc'
        )->result_array();
        $json["result"] = $result;

        echo json_encode($json);
    }

    function delete_stock_adjust() {
        $json = array();
        $Unique = $this->input->post("Unique");
        $Status = $this->input->post("Status");
        $data = array(
            "Status"    => 0,
            "Updated"   => date("Y-m-d H:i:s"),
            "UpdatedBy" => 1
        );
        $this->db->where("Unique", $Unique);
        $this->db->update("item_stock_adjust_mobile", $data);
        $this->db->where("AdjustUnique", $Unique);
        $this->db->update("item_stock_adjust_mobile_details", $data);

        $checkStockLine = $this->db->query(
            'select a.*, b."Unique" as "ItemStockLineUnique" from 
            item_stock_adjust_mobile_details a 
            left join item_stock_line b on b."StockAdjustDetailMobile"=a."Unique"
            where a."AdjustUnique" = '.$Unique.' order by a."Unique" asc'
        )->result_array();
        if($checkStockLine){
            $deleteStockLineArr = [];
            foreach($checkStockLine as $row){
                if(isset($row["ItemStockLineUnique"])){
                    $deleteStockLineArr[] = array(
                        "Unique" => $row["ItemStockLineUnique"],
                        "Updated"=> date("Y-m-d H:i:s"),
                        "UpdatedBy" => 1,
                        "status" => 0
                    );
                }
            }
            if($deleteStockLineArr){
                $this->db->update_batch("item_stock_line", $deleteStockLineArr, "Unique");
            }
        }

        $result = $this->db->query(
            'select * from item_stock_adjust_mobile where "Status" = '.$Status.' order by "Unique" desc'
        )->result_array();
        $json["result"] = $result;  
        echo json_encode($json);
    }

    function get_item_details(){
        $json = array();
        $AdjustUnique = $this->input->post("AdjustUnique");
        $result = $this->db->query(
            'select isa.*, isa."ItemUnique" as "ID", isa."Unique" as "StockAdjustDetailUnique", isl."Unique" as "StockLineUnique" 
            from item_stock_adjust_mobile_details isa
            left join item_stock_line isl on isl."StockAdjustDetailMobile"=isa."Unique"
            where isa."AdjustUnique" = '.$AdjustUnique.' and isa."Status" = 1 order by isa."Unique" desc'
        )->result_array();
        $json["result"] = $result;

        echo json_encode($json);
    }

    function complete_details(){
        $json = array();    
        $Unique = $this->input->post("Unique");
        $Status = $this->input->post("Status");
        $grid = $this->input->post("grid");
        $grid = json_decode($grid, true);
        $gridtosave = [];
        $storedTransID = [];
        foreach($grid as $row){
            if(!isset($row["StockLineUnique"])){
                $gridtosave = array(
                    "ItemUnique"=> $row["ID"],
                    "LocationUnique"  => 1,
                    "Type"      => 1,
                    "Quantity"  => $row["Quantity"],
                    "Created"   => date("Y-m-d H:i:s"),
                    "CreatedBy" => 1,
                    "status"    => 1,
                    "TransactionDate" => date("Y-m-d H:i:s"),
                    "trans_date" => date("Y-m-d"),
                    "unit_cost" => 0,
                    "Cost"      => 0,
                    "CostExtra" => 0,
                    "CostFreight"=> 0,
                    "CostDuty" => 0,
                    "StockAdjustDetailMobile" => $row["StockAdjustDetailUnique"]
                );
                $this->db->insert("item_stock_line", $gridtosave);
                $sql = "SELECT currval(pg_get_serial_sequence('item_stock_line', 'Unique')) as newid";
                $StockLineUnique = $this->db->query($sql)->row()->newid;
                $storedTransID[] = array(
                    "Unique"  => $StockLineUnique,
                    "TransID" => $StockLineUnique
                );
            }
        }

        if($storedTransID){
            $this->db->update_batch("item_stock_line", $storedTransID, "Unique");
        }

        $data = array(
            "Status"    => 2,
            "Updated"   => date("Y-m-d H:i:s"),
            "UpdatedBy" => 1
        );
        $this->db->where("Unique", $Unique);
        $result = $this->db->update("item_stock_adjust_mobile", $data);

        // reload stock adjust details grid
        $ItemStockLineResult = $this->db->query(
            'select isa.*, isa."ItemUnique" as "ID", isa."Unique" as "StockAdjustDetailUnique", isl."Unique" as "StockLineUnique" 
            from item_stock_adjust_mobile_details isa
            left join item_stock_line isl on isl."StockAdjustDetailMobile"=isa."Unique"
            where isa."AdjustUnique" = '.$Unique.' and isa."Status" = 1 order by isa."Unique" desc'
        )->result_array();
        $json["details"] = $ItemStockLineResult;

        $result = $this->db->query(
            'select * from item_stock_adjust_mobile where "Status" = '.$Status.' order by "Unique" desc'
        )->result_array();
        $json["result"] = $result; 
        echo json_encode($json);
    }
}