<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/* Company: AkamaiPOS
*  Title: Cashier Model
*  Created by: HD
*  Email: HD
*  Created: 11-14-2016
*/
class Cashier_model extends CI_Model {

  public function __construct(){
		// Call the CI_Model constructor
		parent::__construct();
		$timezone = "Pacific/Honolulu";
		if(function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
		ini_set('max_execution_time', 1000);
		$this->load->database('akfront');
	}

    function insert($table, $data){
        if($table == 'receipt_payment' || $table == 'receipt_payment_card' || $table == 'station_cashout'){
			$usefield = 'unique';
		}else{
			$usefield = 'Unique';
		}
        $this->db->insert($table, $data);
        $sql = "SELECT currval(pg_get_serial_sequence('$table', '$usefield')) as newid";
		$query = $this->db->query($sql);
		return $query->row()->newid;
        // $newid = $this->db->insert_id();
        // return $newid;
    }

	function insert_batch($table, $data){
      $query = $this->db->insert_batch($table, $data);
      return $query;
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

    function delete($table, $field){
        $where = $this->db->where($field);
        $query = $this->db->delete($table, $where);
        $result = $this->db->affected_rows();
        return $result;
    }

    function config_station_by_number($station_no){
        $this->db->select("*");
        $this->db->where("Number", $station_no);
        $query = $this->db->get("config_station");
        $result = $query->row_array();
        return $result;
    }

    function config_menu_functions_by_row_column($column, $row, $status, $station){
        $sql='SELECT a.*, b."FunctionUnique", b."ImageName", b."ImageWidth", b."ImageHeight", b."ButtonWidth", b."ButtonHeight" 
        FROM config_menu_functions a
        JOIN config_menu_functions_design b ON b."FunctionUnique"=a."Unique"
        WHERE a."StationUnique" IN (0, '.$station.')
        AND b."Interface" = \'Cashier\'
        AND a."Row" = '.$row.'
        AND a."Column" = '.$column.'
        AND a."Status" = '.$status.'
        ORDER BY a."StationUnique" DESC ';
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }


    function config_menu_functions_by_row_column_old($column, $row, $status, $station){
        $this->db->select("*");
        $this->db->where("Sort1", $row);
        $this->db->where("Sort2", $column);
        $this->db->where("Status", $status);
        $this->db->where_in("StationUnique", array(0, $station));
        $this->db->order_by("StationUnique", "desc");
        $query = $this->db->get("config_menu_functions");
        $result = $query->row_array();
        return $result;
    }

    function config_tables_by_column($column, $row){
        $this->db->select("a.*, b.Unique as ReceiptHeaderUnique, b.ReceiptNumber, b.TableStatus");
        $this->db->join("receipt_header b", "b.TableUnique=a.Unique AND b.TableStatus = 1 AND b.Status in (5,1)", "left");
        $this->db->where("a.Column", $column);
        $this->db->where("a.Row", $row);
        $this->db->order_by("a.Row","asc");
        $query = $this->db->get("config_tables a");
        $result = $query->row_array();
        return $result;
    }

    function find_station($StationName){
        $this->db->select("*");
        $this->db->from("config_station");
        $this->db->where("Name", $StationName);
        $result = $this->db->get();
        $row = $result->row_array();
        return $row["Number"];
    }

    function CashInCheck($data){
        $this->db->select("*");
        $this->db->where($data);
        $query = $this->db->get("station_cashier");
        $result = array(
            "data" => $query->row_array(),
            "num_rows" => $query->num_rows()
        );
        return $result;
    }

    function config_users($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $query = $this->db->get("config_user");
        $result = $query->row_array();
        return $result;
    }

    function check_passcode_restriction($code){
        $sql ='SELECT cu."Unique", cu."UserName", cup."ConfigPositionUnique", case when cps."Function" = \'TimeClockManager\' then \'Yes\' else \'No\' end as "TimeClockManager" FROM config_user cu ';
        $sql.='LEFT JOIN config_user_position cup ON cup."ConfigUserUnique"=cu."Unique" AND cup."PrimaryPosition" = 1 ';
        $sql.='left join (select "Position","Module","Function" from config_position_security where "Module" = \'BackOffice\' and "Function" = \'TimeClockManager\'
				and "Status" = 1) cps on cps."Position" = cup."ConfigPositionUnique"';
        $sql.='WHERE cu."Status" = 1 AND ';
        $sql.='(cu."Code" ~* '."'".$code."'".' OR ';
        $sql.='cu."AccessCard" ~* '."'".$code."'".') ';
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }


    function config_position_security_by_function($user, $position, $module, $function){
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

        /*
        $this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
        $this->db->where("cps.Position", $position);
        $this->db->where("cps.Module", $module);
        $this->db->where("cps.Function", $function);
        $this->db->where("cps.Status", 1);
        $query = $this->db->get("config_position_security cps");
        $result = $query->result_array();
        return $result;
        */
    }

    function config_user_by_code_old($code){
        $this->db->select("*");
        $this->db->where("Code", $code);
        $query = $this->db->get("config_user");
        $result = $query->row_array();
        return $result;
    }

    function config_user_by_code($code){
        $sql='SELECT * FROM config_user WHERE
            "Code" ~* '."'".$code."'".' OR
            "AccessCard" ~* '."'".$code."'".'
            AND "Status" = 1';
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }

    function config_table_design($tablename){
		$this->db->select("*");
		$this->db->where("TableName", $tablename);
        $query = $this->db->get("config_table_design");
        $result = $query->row_array();
        return $result;
    }
    
    function config_menu_cashier(){
        $this->db->select("*");
        $this->db->where("Default", 1);
        $query = $this->db->get("config_menu_cashier");
        $result = $query->row_array();
        return $result;
    }

    function set_theme($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $query = $this->db->get("config_menu_cashier");
        $result = $query->row_array();
        return $result;
    }

    function config_menu_cashier_list(){
        $this->db->select("*");
        $this->db->where("Status", 1);
        $this->db->order_by("MenuName", "asc");
        $query = $this->db->get("config_menu_cashier");
        $result = $query->result_array();
        return $result;
    }

    function station_setting($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("config_station");
        $result = $query->row_array();
        return $result;
    }

    function config_payments($Unique){
        $this->db->select("*");
        $this->db->where("Unique", $Unique);
        $this->db->order_by("SortOrder", "asc");
        $query = $this->db->get("config_payments");
        $result = $query->row_array();
        return $result;
    }

    function payment_config($Unique){
        $this->db->select("open_cash_drawer, over_tender");
        $this->db->where("Unique", $Unique);
        $query = $this->db->get("config_payments");
        $result = $query->row_array();
        return $result;
    }

    function Users($Unique){
      $this->db->select("*");
      $this->db->where("Unique", $Unique);
      $query = $this->db->get("config_user");
      $result = $query->row_array();
      return $result;
    }

    function StationCashierInfo_old($Unique){
      $this->db->select("created, SUM(penny + nickel + dime + quarter + one_dollar + five_dollar + ten_dollar + twenty_dollar + fifty_dollar + hundred_dollar + other) as total");
      $this->db->where("station_cashier_unique", $Unique);
      $this->db->where("status", 1);
      $this->db->where("type", 1);
      $this->db->group_by("created");
      $query = $this->db->get("station_cashier");
      $result = $query->row_array();
      return $result;
    }

    /*
    function StationCashierInfo($Unique){
      $this->db->select("*");
      $this->db->where("Unique", $Unique);
      $query = $this->db->get("station_server");
      $result = $query->row_array();
      return $result;
    }
    */

    function StationCashierInfo($Unique){
        $this->db->select("*");
        $this->db->where("Unique", $Unique);
        $this->db->where("Status", 1);
        $this->db->where("CashOut IS NULL");
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function StationCashOutInfo($Unique){
      $this->db->select("created, SUM(penny + nickel + dime + quarter + one_dollar + five_dollar + ten_dollar + twenty_dollar + fifty_dollar + hundred_dollar + other) as total");
      $this->db->where("station_cashier_unique", $Unique);
      $this->db->where("status", 1);
      $this->db->where("type", 2);
      $this->db->group_by("created");
      $query = $this->db->get("station_cashier");
      $result = $query->row_array();
      return $result;
    }

    function station_cashier_cashout_old($station_cashier_unique){
        $field = array(
            "a.unique" => $station_cashier_unique
        );
        $this->db->select("a.*, b.UserName, b.Unique as CashierUnique");
        $this->db->from("station_server a");
        $this->db->join("config_user b", "b.Unique=a.user_unique");
        $this->db->where($field);
        $query = $this->db->get();
        $result = array(
            "count_result" => $query->num_rows(),
            "data_result" => $query->row_array()
        );
        return $result;
    }

    function station_cashier_cashout($station_cashier_unique){
        $field = array(
            "a.Unique" => $station_cashier_unique
        );
        $this->db->select("a.*, b.UserName, b.Unique as CashierUnique");
        $this->db->from("station_server a");
        $this->db->join("config_user b", "b.Unique=a.UserUnique");
        $this->db->where($field);
        $query = $this->db->get();
        $result = array(
            "count_result" => $query->num_rows(),
            "data_result" => $query->row_array()
        );
        return $result;
    }

    function printer_default($unique){
        $fields = array("stationunique" => $unique, "default" => 1);
        $this->db->select("*");
        $this->db->where($fields);
        $query = $this->db->get("config_station_printers");
        $result = $query->row_array();
        return $result;
    }

    function getAllPaymentsCashout($Unique){
		$this->db->select("*");
        $this->db->where("station_cashier_unique", $Unique);
        $this->db->order_by("unique", "asc");
		$query = $this->db->get("station_cashout");
		$result = $query->result_array();
		return $result;
    }

	function getAllTax($unique){
       $sql=' select \'Tax\' as "TaxDescription", sum(round(coalesce("Tax",0),2)) as "TaxTotal"
		from receipt_header RH 
		where RH."Status" = 4 and "rh"."station_cashier_unique" =  '.$unique.' ';
	
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

	// Tax Not Correct
    function getAllTax_old($unique){
		$this->db->select("rt.TaxDescription, sum(rt.\"TotalTax\") as \"TaxTotal\"");
        $this->db->join("receipt_tax rt", "rh.Unique=rt.ReceiptHeaderUnique", "left");
        $this->db->join("receipt_details rd", "rd.Unique=rt.ReceiptDetailsUnique and rd.Status = 1");
		$this->db->where("rh.Status",4);
		$this->db->where("rt.Status",1);
		$this->db->where("rh.station_cashier_unique", $unique);
		$this->db->group_by("rt.TaxDescription");
		$query = $this->db->get("receipt_header rh");
		$result = $query->result_array();
		return $result;
	}

    function getAllPayOut($unique){
		$this->db->select("*");
		$this->db->where("StationCashierUnique", $unique);
		$query = $this->db->get("station_payout");
		$result = $query->result_array();
		return $result;
	}

    function category_sales($unique){
        $sql = 'SELECT case when cm."MainName" is null then \'Other\' else cm."MainName" end as "Category",
            round(SUM(rd."Quantity" * rd."SellPrice"),2) as "Sales",
            round(SUM(rd."Tax"),2) as "Tax", round(SUM(rd."Total"),2) as "Total",sum (RD."Quantity") as "Count"
            FROM receipt_details rd
            LEFT JOIN item i ON i."Unique"=rd."ItemUnique"
            LEFT JOIN category_main cm ON cm."Unique"=i."MainCategory"
            LEFT JOIN station_server SS ON SS."Unique"=rd."station_cashier_unique"
            WHERE rd."completed" = 4 and rd."Status" = 1 AND SS."Unique" = '.$unique.' and coalesce("Remove",0) != 2
            GROUP BY cm."MainName"
            ORDER BY cm."MainName" ASC';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function subcategory_sales($unique){
        $sql = 'SELECT case when cs."Name" is null then \'Other\' else cs."Name" end as "SubCategory",
                round(SUM(rd."Quantity" * rd."SellPrice"),2) as "Sales", round(SUM(coalesce(rd."Tax",0)),2) as "Tax",
                round(SUM(rd."Total"),2) as "Total",sum(rd."Quantity") as "Count"
                FROM receipt_details rd
                LEFT JOIN item I ON I."Unique"=rd."ItemUnique"
                LEFT JOIN category_sub cs ON cs."Unique"=i."CategoryUnique"
                LEFT JOIN station_server SS ON SS."Unique"=rd."station_cashier_unique"
                WHERE rd."Status" = 1 and rd."completed" = 4 AND SS."Unique" = '.$unique.' and coalesce("Remove",0) != 2
                GROUP BY cs."Name"
                ORDER BY cs."Name" ASC';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function discount_sales($unique){
        $sql='select SS."Closing",SS."Unique" as "CashIn",CU."UserName" as "Assign",
            CD."Name" as "Reason",count(RDI."Unique") as "Quantity",
            round(sum(RDI."DiscountTotal"),2) as "Amount"
            from receipt_details RD
            join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
            join receipt_discount RDI on RDI."ReceiptDetailsUnique" = RD."Unique"
            join config_discount CD on CD."Unique" = RDI."DiscountUnique"
            join station_server SS on SS."Unique" = RH.station_cashier_unique
            join config_user CU on CU."Unique" = RH."UserUnique"
            where rd."Status" = 1 and RD."completed" = 4 and RDI."DiscountAmount" != 0 and RDI."Status" = 1 and SS."Unique" = '.$unique.'
            group by SS."Closing",SS."Unique", CU."UserName",CD."Name"
            order by cd."Name", cu."UserName"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function refund_voids_old($unique){
        $sql='select SS."Unique" as "CashIn",CU."UserName" as "Assign",
            CR."ReturnReason" as "Reason",round(sum(RD."Quantity"),0) as "Quantity",round(sum(RD."Total" * -1),4) as "Amount"
            from receipt_details RD
            join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
            join config_returns CR on CR."Unique" = RD."ReturnUnique"
            join station_server SS on SS."Unique" = RD.station_cashier_unique
            join config_user CU on CU."Unique" = RH."UserUnique"
            where "ReturnUnique" is not null and rd."Status" = 1 and SS."Unique" = '.$unique.'
            group by SS."Unique", CU."UserName",CR."ReturnReason"
            order by "Reason"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function refund_voids($unique){
        $sql='select RH."ReceiptNumber" as "Receipt",
            RD."Description",round(RD."Quantity" * -1,0) as "Quantity",round((RD."Total" * -1),2) as "Total",
            CR."ReturnReason" as "Reason"
            from receipt_details RD
            left join receipt_header RH on RD."ReceiptHeaderUnique" = RH."Unique"
            left join station_server SS on SS."Unique" = RH.station_cashier_unique
            left join config_user CU on RD."created_by" = CU."Unique"
            left join config_returns CR on RD."ReturnUnique" = CR."Unique"
            where RD."Status" = 1 and RD."ReturnParent" is not null and RH."Status" in (4)
            and SS."Unique" = '.$unique.'

            UNION ALL

            select RH."ReceiptNumber" as "Receipt",
            RD."Description",round(RD."Quantity",0) as "Quantity",round(RD."ListPrice" * RD."Quantity",2) as "Total",
            CR."ReturnReason" as "Reason"
            from receipt_details RD
            left join receipt_header RH on RD."ReceiptHeaderUnique" = RH."Unique"
            left join station_server SS on SS."Unique" = RH.station_cashier_unique
            left join config_user CU on RD."created_by" = CU."Unique"
            left join config_returns CR on RD."ReturnUnique" = CR."Unique"
            where RD."Status" = 1 and RD."Remove" = 2 and RH."Status" in (4)
            and SS."Unique" = '.$unique.'
            order by "Receipt"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function PassCode_old($passcode){
      $this->db->select("*");
      $this->db->where("Code",$passcode);
      $query = $this->db->get("config_user");
      $result = $query->row_array();
      return $result;
    }

    function Passcode($code){
        $sql='SELECT * FROM config_user WHERE
            "Status" = 1 AND
            ("Code" ~* '."'".$code."'".' OR
            "AccessCard" ~* '."'".$code."'".') ';
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }

    function NextReceiptNumber(){
		$this->db->select("ReceiptNumber");
		$this->db->order_by("Unique", "desc");
		$query = $this->db->get("receipt_header");
		$row = $query->row_array();
		return $row["ReceiptNumber"];
	}

    function locationinfo($locationid){
      $this->db->select("*");
      $this->db->where("Unique", $locationid);
      $query = $this->db->get("config_location");
      $result = $query->row_array();
      return $result;
    }

    function timeclock_check($unique, $actual){
        $this->db->select("*");
        $this->db->where("user_unique", $unique);
        $this->db->where("clock_in_date", $actual);
        $this->db->where("clock_out_date is null");
        $query = $this->db->get("time_clock");
        $result = array(
            "num_rows" => $query->num_rows(),
            "dataresult" => $query->row_array()
        );
        return $result;
    }

    function station_cashier($location, $station){
        $field = array(
            "a.location_unique" => $location,
			"a.station_unique"  => $station,
            "a.cash_out"        => 'no'
        );
        $this->db->select("a.*, b.UserName, b.Unique as CashierUnique");
        $this->db->from("station_cashier a");
        $this->db->join("config_user b", "b.Unique=a.user_unique");
        $this->db->where($field);
        $query = $this->db->get();
        $result = array(
            "count_result" => $query->num_rows(),
            "data_result" => $query->row_array()
        );
        return $result;
    }

    function receipt_header_by_total($fields){
		$this->db->select("rh.*");
        $this->db->join("receipt_details rd","rd.ReceiptHeaderUnique=rh.Unique AND rd.Status = 1");
		$this->db->where($fields);
		$query = $this->db->get("receipt_header rh");
		$result = $query->result_array();
		return $result;
	}

    /*
    function cash_count_display($StationCashierUnique, $PaymentUnique){
        $sql = 'select a."unique", a."station_cashier_unique", b."payment_name",
                coalesce(a."counted",0) as counted,coalesce(a."calculated",0) as calculated, coalesce(a."totaldiff",0) as totaldiff,
                a."created", a."created_by", a."updated", a."updated_by"
                from (select config_payments."Name" as payment_name,config_payments."Default" from config_payments where "Status" = 1 and config_payments."PaymentMenu"='.$PaymentUnique.') b
                left join (select "unique","station_cashier_unique","payment_name","counted","calculated" ,
                sum("counted" - "calculated") as totaldiff, "created", "created_by", "updated", "updated_by"
                from station_cashout where "station_cashier_unique" = '.$StationCashierUnique.'
                group by "unique", "station_cashier_unique", "payment_name", "counted","calculated","created", "created_by", "updated", "updated_by") a
                on  a."payment_name" = b."payment_name"
                order by b."payment_name"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }
    */

    function cash_count_display($station_cashier_unique, $paymentmenu){
        $sql='SELECT a."unique", a."station_cashier_unique", b."payment_name",
            coalesce(a."PaymentCount") AS "PaymentCount",
            coalesce(a."counted",0) AS counted,coalesce(a."calculated",0) AS calculated, coalesce(a."totaldiff",0) AS totaldiff,
            a."created", a."created_by", a."updated", a."updated_by", b."CashOutCount", b."Unique" as "ConfigPaymentUnique"
            FROM (SELECT config_payments."Name" AS payment_name,config_payments."Default", config_payments."SortOrder", config_payments."CashOutCount", config_payments."Unique" FROM config_payments WHERE "Status" = 1 AND config_payments."PaymentMenu"= '.$paymentmenu.') b
            LEFT JOIN (SELECT "unique","station_cashier_unique","payment_name","counted","calculated", "PaymentCount",
            sum("counted" - "calculated") AS totaldiff, "created", "created_by", "updated", "updated_by"
            FROM station_cashout WHERE "station_cashier_unique" = '.$station_cashier_unique.'
            GROUP BY "unique", "station_cashier_unique", "payment_name", "counted","calculated","created", "created_by", "updated", "updated_by") a
            ON  a."payment_name" = b."payment_name"
            ORDER BY b."SortOrder" ASC';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    //-->For Checks
    function config_payments_by_integrated($integrated){
        $this->db->select("*");
		$this->db->where("integrated", $integrated);
		$query = $this->db->get("config_payments");
		$result = $query->row_array();
		return $result;
    }

    function receipt_payments_by_payment_unique($unique, $scu){
        $status = array(11,12,17);
        $this->db->select("*");
		$this->db->where("payment_unique", $unique);
        $this->db->where("station_cashier_unique", $scu);
        $this->db->where_in("status", $status);
        $this->db->order_by("unique", "asc");
		$query = $this->db->get("receipt_payment");
		$result = $query->result_array();
		return $result;
    }

    function config_menu_functions_by_station_unique($unique){
        $this->db->select("*");
        $this->db->where("StationUnique", $unique);
		$query = $this->db->get("config_menu_functions");
		$result = $query->result_array();
		return $result;
    }

    function GiftCardTotals_old($unique){
        $sql = 'SELECT RD."station_cashier_unique",RD."created",RD."Description",
                ROUND(RD."Quantity",0) * 100  AS "Quantity",
                ROUND(RD."Total",2) AS "Total"
                FROM receipt_details RD
                JOIN item IT ON RD."ItemUnique" = IT."Unique"
                WHERE IT."GiftCard" in (1,2)
                AND RD."Status" = 1
                AND "station_cashier_unique" = '.$unique.'
                ORDER BY RD."Unique" asc';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }


    // function GiftCardTotals($unique){
    //     $sql='SELECT RD."station_cashier_unique",RD."created",
    //         SUBSTRING("GiftCardNumber" FROM length("GiftCardNumber") - 4 ) AS "GiftCard","Operation",
    //         ROUND(RD."Quantity",0) * 1000 AS "Quantity",round(RD."Total",2) AS "Total"
    //         FROM receipt_details RD
    //         JOIN item IT ON RD."ItemUnique" = IT."Unique"
    //         JOIN receipt_giftcard RG ON RD."Unique" = RG."ReceiptDetailsUnique"
    //         WHERE IT."GiftCard" in (1,2) AND RD."Status" = 1
    //         AND RD.station_cashier_unique = '.$unique.'
    //         ORDER BY "station_cashier_unique" DESC, RD."created" ASC';
    //     $query = $this->db->query($sql);
    //     $result = $query->result_array();
    //     return $result;
    // }

    function GiftCardTotals($unique){
        $sql =  'SELECT RG."StationCashierUnique",RG."Created",
            SUBSTRING("GiftCardNumber" FROM length("GiftCardNumber") - 4 ) AS "GiftCard",\'CARD \' || "Operation" as "Operation",
			"ReceiptNumber" as "Receipt",
            case when RG."Amount" < 0 then -1 else 1 end AS "Quantity",round(RG."Amount",2) AS "Total"
            from (select * from receipt_giftcard where "Status" = 1 and "Response" = \'Approved\' 
			and "StationCashierUnique" = '.$unique.' ) RG 
			left join receipt_header RH on RH."Unique" = RG."ReceiptHeaderUnique" where RH."Status" = 4
            union all
            SELECT RD."station_cashier_unique",RD."created",
           left(RD."Description",8)  AS "GiftCard", case when coalesce("Quantity",0) > 0 then \'CERT Issue\' when coalesce("Quantity",0) < 0 then \'CERT Refund\' else \'\' end as "Operation",
		   "ReceiptNumber" as "Receipt",
           ROUND(coalesce(RD."Quantity",0),0) AS "Quantity", round(coalesce(RD."Total",0),2) AS "Total"
           FROM (select * from receipt_details where "Status" = 1 and "ItemUnique" in (select "Unique" from item 
		   where "GiftCard" = 3) AND station_cashier_unique = '.$unique.') RD
            left join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique" where RH."Status" = 4
            union all
            SELECT RP."station_cashier_unique",RP."created",
            left(RP."CheckNo",8)  AS "GiftCard", case when coalesce(paid,0) > 0 then \'CERT Payment\' when coalesce(paid,0) < 0 then \'CERT Refund\' else \'\' end as "Operation",
			RH."ReceiptNumber" as "Receipt",
            case when coalesce(paid,0) > 0 then -1 else 1 end AS "Quantity",
            case when coalesce(paid,0) > 0 then round(paid * - 1,2) else round(RP."paid",2) end AS "Total"
            FROM receipt_payment RP 
			join receipt_header RH on RH."Unique" = RP.receipt_header_unique
			where RP.payment_name = \'Gift Certificate\' and RP."status" in (11,12,17)
            AND RP.station_cashier_unique = '.$unique.' 
            ORDER BY "GiftCard" ASC, "Created" ';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function OrderType($unique){
        $sql= 'select "OrderType", count(receipt_header."Unique") as "Count", round(sum("Total"),2)
                as "Total" from receipt_header where "Status" = 4 and "station_cashier_unique" = '.$unique.'
                group  by "OrderType"';
        $result = $this->db->query($sql);
        return $result->result_array();
    }

    function DiscountBasedOnRD($unique){
        $sql='select CD."Description", sum(rd."Total") as "Total"
            from receipt_details RD
            join config_discount CD on RD."DiscountUnique" = CD."Unique"
            where "station_cashier_unique" = '.$unique.'
            group by CD."Description" order by "Description"';
        $result = $this->db->query($sql);
        return $result->result_array();
    }

    function OnHold($unique){
        $sql='select CU."UserName",count(RH."Unique") as "Count", round(sum("Total"),2) as "Total"
            from receipt_header RH
            left join config_user CU on RH."CreatedBy" = CU."Unique"
            where RH."Status" = 5 and RH."station_cashier_unique" = '.$unique.'
            group by CU."UserName"';
        $result = $this->db->query($sql);
        return $result->result_array();
    }

    function Config_menu_functions_by_Function($function, $status){
        $this->db->select("*");
        $this->db->where("Function", $function);
        $this->db->where("Status", $status);
        $query = $this->db->get("config_menu_functions");
        $result = $query->row_array();
        return $result;
    }

    function station_server_cashin_old($Unique, $Location){
        $CashInMethod = $this->session->userdata("CashInMethod");
        $where = array(
            "UserUnique"        => $Unique,
            "LocationUnique"    => $Location,
            "Status"            => 1,
            "CashInMethod"      => $CashInMethod
        );
        $this->db->select("*");
        $this->db->where($where);
        $this->db->where("CashOut IS NULL");
        $this->db->order_by("Unique", "asc");
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function station_server_cashin($Unique, $Location){
        $CashInMethod = $this->session->userdata("CashInMethod");
        $sql='select ss.*, cl."LocationName", cs."Name" as "StationName", cu."UserName" as "CashInBy", 
        case when ss."CashInMethod" = 2 then \'By User\' when ss."CashInMethod" = 3 then \'By Station\' else null end as "Method"
        from station_server ss
        left join config_location cl on cl."Unique"=ss."LocationUnique"
        left join config_station cs on cs."Unique"=ss."StationUnique"
        left join config_user cu on cu."Unique"=ss."UserUnique"
        where ss."UserUnique" = '.$Unique.'
        and ss."LocationUnique" = '.$Location.'
        and ss."Status" = 1
        and ss."CashInMethod" = '.$CashInMethod.'
        and ss."CashOut" IS NULL
        order by ss."Unique" asc';
        $result = $this->db->query($sql)->result_array();
        return $result;
    }

    function station_server_cashin_new($Unique, $Location, $Station){
        $CashInMethod = $this->session->userdata("CashInMethod");
        $sql='select ss.*, cl."LocationName", cs."Name" as "StationName", cu."UserName" as "CashInBy", 
        case when ss."CashInMethod" = 2 then \'By User\' when ss."CashInMethod" = 3 then \'By Station\' else null end as "Method",
        cu."Code" as "UserCode"
        from station_server ss
        left join config_location cl on cl."Unique"=ss."LocationUnique"
        left join config_station cs on cs."Unique"=ss."StationUnique"
        left join config_user cu on cu."Unique"=ss."UserUnique"
        where ss."UserUnique" = '.$Unique.'
        and ss."LocationUnique" = '.$Location.'
        and ss."StationUnique" = '.$Station.'
        and ss."Status" = 1
        and ss."CashInMethod" = '.$CashInMethod.'
        and ss."CashOut" IS NULL
        order by ss."Unique" asc';
        $result = $this->db->query($sql)->result_array();
        return $result;
    }

    function station_get_user_logged($Location, $Station){
        $CashInMethod = $this->session->userdata("CashInMethod");
        $sql='select ss.*, cl."LocationName", cs."Name" as "StationName", cu."UserName" as "CashInBy", 
        case when ss."CashInMethod" = 2 then \'By User\' when ss."CashInMethod" = 3 then \'By Station\' else null end as "Method",
        cu."Code" as "UserCode"
        from station_server ss
        left join config_location cl on cl."Unique"=ss."LocationUnique"
        left join config_station cs on cs."Unique"=ss."StationUnique"
        left join config_user cu on cu."Unique"=ss."UserUnique"
        where ss."LocationUnique" = '.$Location.'
        and ss."StationUnique" = '.$Station.'
        and ss."Status" = 1
        and ss."CashInMethod" = '.$CashInMethod.'
        and ss."CashOut" IS NULL
        order by ss."Unique" asc';
        $result = $this->db->query($sql)->result_array();
        return $result;
    }

    function station_cashin($Location, $Station){
        $where = array(
            "LocationUnique"    => $Location,
            "StationUnique"     => $Station
        );
        $this->db->select("*");
        $this->db->where($where);
        $this->db->where("CashOut IS NULL");
        $this->db->order_by("Unique", "asc");
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function Tips($unique){
        $sql = 'SELECT RP."station_cashier_unique" AS "StationCashier",
                "payment_name" AS "Payment", rtrim(RH."ReceiptNumber") AS "Receipt",
                round(coalesce("amount",0) - coalesce("Adjust",0),2) AS "Tender",
                round(coalesce("Adjust",0),2) AS "Adjust", round(coalesce("amount",0),2) AS "Total"
                FROM receipt_payment RP
                JOIN receipt_header RH ON RH."Unique" = RP.receipt_header_unique
                WHERE RP.station_cashier_unique = '.$unique.'
                AND RP."status" IN (11,12,17)
                AND RP.voided is NULL AND "Adjust" IS NOT NULL
                ORDER BY "Payment","created"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function GetLastUnique(){
        $this->db->select("Unique");
        $this->db->order_by("Unique", "desc");
        $query = $this->db->get("receipt_header", 1, 0);
        $row = $query->row_array();
        return $row["Unique"];
    }

    function Config_location_model_settings($LocationUnique, $StationUnique){
		$this->db->select("*");
		$this->db->where("Status", 1);
		//$this->db->where("LocationUnique", $LocationUnique);
		$this->db->where("stationunique", $StationUnique);
		$query = $this->db->get("config_location_settings");
		$result = $query->result_array();
		return $result;
	}

    function config_merchant_datacap($unique){
        $this->db->select("*");
        $this->db->where("StationUnique", $unique);
        $this->db->where("Status",1);
        $query = $this->db->get("config_merchant_datacap");
        $result = $query->result_array();
        return $result;
    }

    function ResearchHeaderUniqueAvaible($fieldSearch){
		$this->db->select("*");
		$this->db->where($fieldSearch);
		$this->db->order_by("Unique", "desc");
		$query  = $this->db->get("receipt_header", 1, 0);
		$result = $query->row_array();
		return $result;
    }

    /* Added 09-14-17 1458H */
    function receipt_details_by_receipt_header_unique($unique){
		$this->db->select("*");
		$this->db->where("ReceiptHeaderUnique", $unique);
		$this->db->where("Status", 1);
		$query = $this->db->get("receipt_details");
		$result = $query->row_array();
		return $result;
    }

    function config_order_type_unique($unique){
		$this->db->select("*");
		$this->db->where("Unique", $unique);
		$query = $this->db->get("config_order_type");
		$result = $query->row_array();
		return $result;
    }

    function current_total($NewSaleId){
		$status = array(1, 4);
		$this->db->select("Total");
		$this->db->where("Unique", $NewSaleId);
		$this->db->where_in("Status", $status);
		$query = $this->db->get("receipt_header");
		$result = $query->row_array();
		return $result["Total"];
    }

    function current_payments($NewSaleId){
		$status = array(11,12,17);
		$this->db->select("case when SUM(a.paid) IS NULL then 0 else SUM(a.paid) end amount");
		$this->db->where("receipt_header_unique", $NewSaleId);
		$this->db->where_in("status", $status);
		$query = $this->db->get("receipt_payment a");
		$result = $query->row_array();
		return $result["amount"];
    }

    function get_receipt_details_by_rhu($unique){
		$this->db->select("*");
		$this->db->where("ReceiptHeaderUnique", $unique);
		$this->db->where("Status",1);
		$query = $this->db->get("receipt_details");
		$result = $query->result_array();
		return $result;
    }

    function check_order_no_serve($unique){
		$this->db->select("*");
		$this->db->where("ReceiptHeaderUnique", $unique);
		$query = $this->db->get("receipt_orders");
		$result = $query->row_array();
		return $result;
    }

    function item_count($unique){
		$this->db->select('Count("Unique") as "ItemCount" ');
		$this->db->where("ReceiptHeaderUnique", $unique);
		$this->db->where("Status", 1);
		$query = $this->db->get("receipt_details");
		$row = $query->row_array();
		return $row["ItemCount"];
    }

    function receipt_check_item_count($unique){
		$this->db->select('ItemCount');
		$this->db->where("ReceiptHeaderUnique", $unique);
		$query = $this->db->get("receipt_orders");
		$result = $query->result_array();
		return $result;
    }

    function get_last_order_number($date){
		$sql = 'SELECT "OrderNo" FROM receipt_orders
				WHERE date_trunc(\'day\', "TransactionDate"::timestamp) = \''.$date.'\'
				ORDER BY "OrderNo" DESC LIMIT 1 OFFSET 0';
		$query = $this->db->query($sql);
		$row = $query->row_array();
		return $row["OrderNo"];
    }

    function check_last_order_number_if_exist($orderno, $date){
		$sql ='SELECT "OrderNo" FROM receipt_orders WHERE "OrderNo"='.$orderno.'
			   AND date_trunc(\'day\', "TransactionDate"::timestamp) = \''.$date.'\'';
		$query = $this->db->query($sql);
		$result = $query->row_array();
		return $result;
    }

    function receipt_print_by_rh($unique){
        $this->db->select("*");
        $this->db->where("ReceiptHeaderUnique", $unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("receipt_print");
        $result = $query->result_array();
        return $result;
    }

    function checkreceiptstatus($SaleId){
		$this->db->select("*");
		$this->db->where("Unique", $SaleId);
		$query = $this->db->get("receipt_header");
		$result = $query->row_array();
		return $result;
    }

    function checkiftheresorder($SaleId){
		$this->db->select("*");
		$this->db->where("ReceiptHeaderUnique", $SaleId);
		$this->db->where("Status", 1);
		$query = $this->db->get("receipt_details");
		$result = $query->num_rows();
		return $result;
    }

    function when_payments($NewSaleId){
        $this->db->select("*");
        $this->db->where("receipt_header_unique", $NewSaleId);
        $query = $this->db->get("receipt_payment");
        $result = $query->num_rows();
        return $result;
    }

    function receipt_payment_by_rhu($unique){
		$this->db->select("*");
		$this->db->where("receipt_header_unique", $unique);
		$this->db->where_in("status", array(11,12));
		$query = $this->db->get("receipt_payment");
		$result = $query->result_array();
		return $result;
    }

    function config_points(){
        $this->db->select("*");
        $this->db->where("Status", 1);
        $query = $this->db->get("config_points");
        $result = $query->result_array();
        return $result;
    }

    function config_user_position_by_unique($unique){
		$this->db->select("*");
		$this->db->where("ConfigUserUnique", $unique);
		$this->db->where("PrimaryPosition", 1);
		$query = $this->db->get("config_user_position");
		$result = $query->row_array();
		return $result;
    }

    function config_position_security($position, $module, $function, $user){
		$this->db->select("cps.*");
        $this->db->join("config_user_position cup", "cup.ConfigPositionUnique=cps.Position AND cup.PrimaryPosition = 1");
        $this->db->where("cps.Position", $position);
		$this->db->where("cps.Module", $module);
        $this->db->where("cps.Function", $function);
        $this->db->where("cps.Status", 1);
		$this->db->where("cup.ConfigUserUnique", $user);
        $query = $this->db->get("config_position_security cps");
        $result = $query->row_array();
        return $result;
    }

    function station_server($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function station_cashout_denomination_total($unique){
        $this->db->select('SUM("Penny" + "Nickel" + "Dime" + "Quarter" + "OneDollar" + "FiveDollar" + "TenDollar" + "TwentyDollar" + "FiftyDollar" + "HundredDollar") as "Total", "Other"');
        $this->db->where("StationCashierUnique", $unique);
        $this->db->group_by("Other");
        $query = $this->db->get("station_cashout_denomination");
        $result = $query->row_array();
        return $result;
    }

    function config_payment_by_unique($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $query = $this->db->get("config_payments");
        $result = $query->row_array();
        return $result;
    }

    function station_cashout_denomination($unique){
        $this->db->select("*");
        $this->db->where("StationCashierUnique", $unique);
        $query = $this->db->get("station_cashout_denomination");
        $result_array = array(
           "rowdata"  => $query->row_array(),
           "rowcount" => $query->num_rows()
        );
        return $result_array; 
    }

    function station_server_by_unique($unique){
        $this->db->select("*");
        $this->db->where("Unique", $unique);
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function station_payout($unique){
        $this->db->select("*");
        $this->db->where("StationCashierUnique", $unique);
        $query = $this->db->get("station_payout");
        $result = $query->row_array();
        return $result;
    }

    function config_menu_functions_design($interface){
        $this->db->select("*");
        $this->db->where("Interface", $interface);
        $this->db->where("Status", 1);
        $query = $this->db->get("config_menu_functions_design");
        $result = $query->result_array();
        return $result;
    }

    function config_station_printer(){
        $this->db->select("*");
        $this->db->where("Status", 1);
        $query = $this->db->get("config_station_receipt");
        $result = $query->result_array();
        return $result;
    }

    function StationCashierInfoPrint($Unique){
        $this->db->select("*");
        $this->db->where("Unique", $Unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function config_report_receipt($fncname){
		$this->db->select("*");
		$this->db->where_in("Status", array(1,2));
		$this->db->where_in("FunctionName",$fncname);
		$query = $this->db->get("config_report_receipt");
		$result = $query->result_array();
		return $result;
    }
    
    function time_clock_report($location, $datefrom, $dateto){
		$sql='select TC."Unique" as "ID",TC."Status",TC."UserName",TC."DateIn", TC."TimeIn",
				TC."DateOut",TC."TimeOut", 
				to_char((TC."DateIn" + TC."TimeIn"),\'MM/DD HH12:MI AM\') as "ClockIn" ,
				to_char((TC."DateOut" + TC."TimeOut"),\'MM/DD HH12:MI AM\') as "ClockOut" ,
				TC."Duration", TC."Total", TC."ClockInComment", TC."ClockOutComment"
					from timeclock TC
					left join config_location CLI on TC."LocationIn" = CLI."Unique"
					left join config_location CLO on TC."LocationOut" = CLO."Unique"
					left join config_station CSI on TC."StationIn" = CSI."Unique"
					left join config_station CSO on TC."StationOut" = CSO."Unique"
					left join config_user C 	on TC."User" = C."Unique"
					left join config_user CU on TC."CreatedBy" = CU."Unique"
					left join config_user CUC on TC."CreatedBy" = CUC."Unique" AND CUC."Status" = 1
					left join config_user CUU on TC."UpdatedBy" = CUU."Unique" AND CUU."Status" = 1
					join config_user CCC on TC."User" = CCC."Unique" AND (CCC."Suppress" is NULL OR CCC."Suppress" = 0)
					where (TC."Status" IN (\'1\',\'2\') AND date_trunc(\'day\', TC."DateIn"::timestamp) between  \' '.$datefrom.' \' and \' '.$dateto.' \' AND TC."LocationIn" IN ('.$location.'))
					or (TC."Status" IN (\'1\') AND TC."LocationIn" IN ('.$location.'))
					order by "UserName","DateIn","TimeIn"';
		$query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function customer_sales_summary($unique){
        $sql='select CU."Company" || \' \' || CU."FirstName" || \' \' || CU."LastName" as "Customer",
        sum(coalesce("TableCustomer",0)) as "Count", count (coalesce(RH."CustomerUnique",0)) as "Receipts",
        round(sum(RH."SubTotal"),2) as "Sales"
        from receipt_header RH
        left join customer CU on CU."Unique" = RH."CustomerUnique"
        where RH."Status" = 4 and RH."SubTotal" != 0 and RH.station_cashier_unique = '.$unique.'
        group by CU."Company", CU."FirstName", CU."LastName"'; 
        $query = $this->db->query($sql);
        return $query->result_array();
     }

     function item_sales_summary($unique){
		$sql='select RD."Description",round(sum(RD."Quantity"),0) as "Items",
		round(sum(RD."Quantity" * RD."SellPrice"),2) as "Sales"
		from receipt_header RH
		left join receipt_details RD on RD."ReceiptHeaderUnique" = RH."Unique"
		where RH."Status" = 4 and RD."Status" = 1 and coalesce("Remove",0) != 2 and RH.station_cashier_unique = '.$unique.'
		group by RD."Description" order by "Description"'; 
		$query = $this->db->query($sql);
        return $query->result_array();
     }
     
     function station_cashin_denomination($unique){
        $this->db->select("*");
        $this->db->where("StationCashierUnique", $unique);
        $query = $this->db->get("station_cashin_denomination");
        $result_array = array(
           "rowdata"  => $query->row_array(),
           "rowcount" => $query->num_rows()
        );
        return $result_array; 
    }

    function station_cashin_denomination_by_scu($unique){
        $this->db->select("*");
        $this->db->where("StationCashierUnique", $unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("station_cashin_denomination");
        $result = $query->row_array();
        return $result;
    }

    function station_cashout_denomination_by_scu($unique){
        $this->db->select("*");
        $this->db->where("StationCashierUnique", $unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("station_cashout_denomination");
        $result = $query->row_array();
        return $result;
    }

    function StationServerInfo($Unique){
        $this->db->select("*");
        $this->db->where("Unique", $Unique);
        $this->db->where("Status", 1);
        $query = $this->db->get("station_server");
        $result = $query->row_array();
        return $result;
    }

    function config_printer_settings_by_unique($unique){
		$this->db->select("*");
		$this->db->where("Unique", $unique);
		$query = $this->db->get("config_printer_settings");
		$result = $query->row_array();
		return $result;
    }
    
    function credit_details_old($unique){ //Issue duplicating receipt print
        $sql='select CLO."Unique" as "Closing", CU1."Unique", CU1."UserName" as "Server", CU2."UserName" as "Assign", RP."station_cashier_unique" as "StationCashier",
        "payment_name" as "Payment", rtrim(RH."ReceiptNumber") as "Receipt",
        round(coalesce("amount",0) - coalesce("Adjust",0),2) as "Tender",
        round(coalesce("Adjust",0),2) as "Adjust", round(coalesce("amount",0),2) as "Total", RP."Method", RP."card4"
        from receipt_payment RP
        join receipt_header RH on RH."Unique" = RP.receipt_header_unique
        join station_server SS on SS."Unique" = RP.station_cashier_unique
        left join station_closing CLO on CLO."Unique" = SS."Closing"
        join config_user CU1 on CU1."Unique"= SS."UserUnique"
        join config_user CU2 on CU2."Unique"= RH."UserUnique"
        join config_payments CP on CP."PaymentUnique" = RP.payment_unique
        where RP."status" in (11,12,17) and RP.voided is null and rp.amount !=0 and CP.type = 2
        and RP."station_cashier_unique" = '.$unique.'
        order by RH."ReceiptNumber" asc';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function credit_details($unique){
        $sql='select CU1."UserName" as "Assign", RP."station_cashier_unique" as "StationCashier",
        "payment_name" as "Payment", rtrim(RH."ReceiptNumber") as "Receipt",
        round(coalesce("amount",0) - coalesce("Adjust",0),2) as "Tender",
        round(coalesce("Adjust",0),2) as "Adjust", round(coalesce("amount",0),2) as "Total", RP."Method", RP."card4"
        from (select * from receipt_payment RP
        join (select * from config_payments CP where type = 2 and integrated = 2) CP on CP."PaymentUnique" = RP.payment_unique and RP.station_cashier_unique = '.$unique.') RP
        join receipt_header RH on RH."Unique" = RP.receipt_header_unique
        join config_user CU1 on CU1."Unique"= RH."UserUnique"
        where RP."status" in (11,12,17) and RP.voided is null and rp.amount !=0
        and RP."station_cashier_unique" = '.$unique.'
        order by RH."ReceiptNumber" asc';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function employee_sales($datefrom, $dateto, $location, $unique){
        $sql='select CU."UserName" as "Employee", RH."ReceiptNumber",date_trunc(\'minute\',RD."TransactionDate") as "Date", 
        RD."Description", RD."Quantity",
        (RD."Quantity" * "SellPrice") as "ExtPrice"
		from (select * from item where coalesce("NoCommission",0) = 0 ) IT
        left join receipt_details RD on RD."ItemUnique" = IT."Unique"
        join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
        join config_user CU on RH."UserUnique" = CU."Unique"
        left join Supplier SU on SU."Unique" = IT."SupplierUnique"
        left join category_sub CS on IT."CategoryUnique" = CS."Unique"
        left join category_main CM on IT."MainCategory" = CM."Unique"
        where RD."Status" = 1 and
        RD.location_unique = '.$location.' and
        RD."station_cashier_unique" = '.$unique.'
        and RH."Status" in (4) and coalesce(RD."Remove",0) != 2
        order by CU."UserName", RD."TransactionDate"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function daterange_receipt_total($datefrom, $dateto, $location, $unique){
        $sql='select sum("SubTotal") as "SubTotal",sum("Tax") as "Tax",sum("Total") as "Total"
        from receipt_header RH where RH."Status" in (4) and RH."TransactionDate" between \''.$datefrom.'\' and \''.$dateto.'\'
        and RH."LocationUnique" ='.$location.'
        and RH."station_cashier_unique"='.$unique;
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }

    function update_cashout_method($unique){
        $sql='update receipt_payment t1
        set "Method" = t2.payment_name
        from receipt_payment_card t2
        where t2.receipt_payment_unique = t1."unique" and t1.station_cashier_unique = '.$unique;
        $this->db->query($sql);
        $result = $this->db->affected_rows();
        if($result > 0){
          return true;
        }else{
          return false;
        }
    }

    function update_tax_total($unique){
        $sql='update receipt_tax t1
        set "StationCashierUnique" = t2.station_cashier_unique
        from receipt_header t2 where t2."Unique" = t1."ReceiptHeaderUnique" and t2.station_cashier_unique = '.$unique;
        $result = $this->db->query($sql);
        return $result;
    }

    function store_credit($unique){
        $sql='select CU."FirstName" || \' \' || cu."LastName" as "Customer",
             "StoreCreditNumber" as "CreditNumber","Operation", round("Amount",2) *-1 as "Amount"
             from receipt_storecredit RS
             left join customer CU on CU."Unique" = RS."CustomerUnique"
             where "StationCashierUnique" = '.$unique.'
             order by RS."Unique" asc';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }
    
    function store_credit_update($unique){
        $sql='update receipt_storecredit t1
              set "StationCashierUnique" = t2.station_cashier_unique
              from receipt_header t2 where t2."Unique" = t1."ReceiptHeaderUnique" 
              and t2.station_cashier_unique ='.$unique;
        $query = $this->db->query($sql);
        $result = $this->db->affected_rows();
        return $result;
    }

    function employee_sales_summary($datefrom, $dateto, $location, $unique){
        $sql='select case when CU1."UserName" is null then CU2."UserName" else CU1."UserName" end as "Employee",
        sum(round(coalesce(RD."Quantity",0))) as "Quantity",
        sum(round((coalesce(RD."Quantity",0) * coalesce("SellPrice",0)),2)) as "ExtPrice"
		from (select * from item where coalesce("NoCommission",0) = 0 ) IT
        left join receipt_details RD on RD."ItemUnique" = IT."Unique"
        join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
        left join config_user CU1 on RD."SalesPerson" = CU1."Unique"
        left join config_user CU2 on RH."UserUnique" = CU2."Unique"
        where
        RD.location_unique = '.$location.' and 
        RD.station_cashier_unique = '.$unique.'
        and RH."Status" in (4) and RD."Status" = 1 and coalesce(RD."Remove",0) != 2
        group by CU1."UserName",CU2."UserName"
        order by "Employee" ';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function cash_out_employee_sales_details($datefrom, $dateto, $location, $unique){
        $sql='select case when CU1."UserName" is null then CU2."UserName" else CU1."UserName" end as "Employee",
        RH."ReceiptNumber",date_trunc(\'minute\',RD."TransactionDate") as "Date",
        RD."Description", coalesce(RD."Quantity",0) as "Quantity",
        round((coalesce(RD."Quantity",0) * coalesce("SellPrice",0)),2) as "ExtPrice"
		from (select * from item where coalesce("NoCommission",0) = 0 ) IT
        left join receipt_details RD on RD."ItemUnique" = IT."Unique"
        join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
        left join config_user CU1 on RD."SalesPerson" = CU1."Unique"
        left join config_user CU2 on RH."UserUnique" = CU2."Unique"
        left join Supplier SU on SU."Unique" = IT."SupplierUnique"
        left join category_sub CS on IT."CategoryUnique" = CS."Unique"
        left join category_main CM on IT."MainCategory" = CM."Unique"
        where
        RD.location_unique = '.$location.' and 
        RD.station_cashier_unique = '.$unique.'
        and RH."Status" in (4) and RD."Status" = 1 and coalesce(RD."Remove",0) != 2
        order by CU1."UserName",CU2."UserName", RD."TransactionDate"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function cash_out_employee_sales_summary($datefrom, $dateto, $location, $unique){
        $sql='select case when CU1."UserName" is null then CU2."UserName" else CU1."UserName" end as "Employee",
        sum(round(coalesce(RD."Quantity",0))) as "Quantity",
        sum(round((coalesce(RD."Quantity",0) * coalesce("SellPrice",0)),2)) as "ExtPrice"
		from (select * from item where coalesce("NoCommission",0) = 0 ) IT
        left join receipt_details RD on RD."ItemUnique" = IT."Unique"
        join receipt_header RH on RH."Unique" = RD."ReceiptHeaderUnique"
        left join config_user CU1 on RD."SalesPerson" = CU1."Unique"
        left join config_user CU2 on RH."UserUnique" = CU2."Unique"
        where
        RD.location_unique = '.$location.' and 
        RD.station_cashier_unique = '.$unique.' 
        and RH."Status" in (4) and RD."Status" = 1 and coalesce(RD."Remove",0) != 2
        group by CU1."UserName",CU2."UserName"
        order by "Employee" ';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function cash_out_daterange_receipt_total($datefrom, $dateto, $location, $unique){
        $sql='select sum("SubTotal") as "SubTotal",sum("Tax") as "Tax",sum("Total") as "Total"
        from receipt_header RH where RH."Status" in (4) and RH."TransactionDate" between \''.$datefrom.'\' and \''.$dateto.'\'
        and RH."LocationUnique" ='.$location.'
        and RH."station_cashier_unique"='.$unique;
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }

    function config_report_receipt_print_email(){
        $sql='select * from config_report_receipt where "FunctionName"=\'CashOutReport\' ';
        $query = $this->db->query($sql);
        $result = $query->row_array();
        return $result;
    }

    function generate_receipt_number($prefix){
		//$sql='select  '.$prefix.' max("Unique") + 1 as "NextReceiptNumber" from receipt_header where "LocationUnique" = '.$location;
        $sql='select '.$prefix.' + nextval (\'"receipt_header_ReceiptNumber_seq"\') as "NextReceiptNumber"';
        $query = $this->db->query($sql);
		$result = $query->row_array();
		return $result;
    }
    
    function get_all_tables(){
        $sql='select * from config_tables where "Status" = 1 order by "TableNo" asc';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function get_onhold_by_server($StationServerUnique, $Location){
        $sql='select count(rh.*) as "OnHoldCount", cu."UserName"  from receipt_header rh 
            join config_user cu on cu."Unique"=rh."UserUnique"
            where rh."station_cashier_unique" = '.$StationServerUnique.'
            and rh."Status" = 5
            and rh."LocationUnique" = '.$Location.'
            group by cu."UserName"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function get_onhold_by_station($StationServerUnique, $Location){
        $sql='select count(rh.*) as "OnHoldCount", cu."UserName" from receipt_header rh
            join config_user cu on cu."Unique"=rh."UserUnique"
            where rh."station_cashier_unique" = '.$StationServerUnique.'
            and rh."Status" = 5 
            and rh."LocationUnique" = '.$Location.'
            group by cu."UserName"';
        $query = $this->db->query($sql);
        $result = $query->result_array();
        return $result;
    }

    function config_receipt_design(){
		$this->db->select("*");
		$this->db->where("Status", 1);
		$query = $this->db->get("config_receipt_design");
		$result = $query->result_array();
		return $result;
    }

    function cashier_menu_by_station($station){
		if (isset($station)){}
		else {$station=1;}
        // $sql='select a.*,b."FunctionUnique", b."ImageName", b."ImageWidth", b."ImageHeight", b."ButtonWidth", b."ButtonHeight", b."Image" 
        // from config_menu_functions a
        // left join config_menu_functions_design b
        // on b."ButtonClassName" = a."ButtonClassName"
        // where a."Menu" = '.$station.' and a."Interface" = \'Cashier\' and a."Status" in (1,4)
        // order by a."Row",a."Column"';
        $sql='select a."Unique", a."StationUnique", a."Menu", a."Interface", a."Function", a."Label" || \'<br/>\' || coalesce(a."Label2",\'\') as "Label", a."Status", 
        a."Row", a."Column", a."Sort1", a."Sort2", a."Note", a. "HTMLString", a."ButtonClassName",
        b."FunctionUnique", b."ImageName", b."ImageWidth", b."ImageHeight", b."ButtonWidth", b."ButtonHeight", b."Image" 
        from config_menu_functions a
        left join config_menu_functions_design b
        on b."ButtonClassName" = a."ButtonClassName"
        where a."Menu" = '.$station.' and a."Interface" = \'Cashier\' and a."Status" in (1,4)
        order by a."Row",a."Column"';
        $result = $this->db->query($sql)->result_array();
        return $result;
    }

    function config_ordertype(){
		$sql='select * from config_order_type where "Status" =1';
		return $this->db->query($sql)->result_array();
    }
    
    function station_server_all_cashin($Location, $Station){
        $CashInMethod = $this->session->userdata("CashInMethod");
		$where = array(
            "ss.LocationUnique"    => $Location,
            "ss.StationUnique"     => $Station,
            "ss.Status"            => 1,
            //"ss.CashInMethod"      => $CashInMethod
        );
		$this->db->select('ss.*, cu."Unique" as "UserUnique", cu.UserName');
		$this->db->join('config_user cu', 'cu.Unique=ss.UserUnique', "left");
		$this->db->where($where);
        $this->db->where("CashOut IS NULL");
        $this->db->order_by("CashInMethod", "desc");
		$query = $this->db->get("station_server ss");
		$result = $query->result_array();
		return $result;
    }
    
    function config_payments_all($PaymentMenu){
        $sql='select * from config_payments where "PaymentMenu"='.$PaymentMenu.' and "Status"=1 order by "SortOrder" asc ';
        return $this->db->query($sql)->result_array();
    }
    
    function station_cashout_by_name($unique, $name){
		$fields = array(
			"station_cashier_unique"	=> $unique,
			"payment_name"				=> $name
		);
		$this->db->select("*");
		$this->db->where($fields);
		$query = $this->db->get("station_cashout");
		$result = $this->db->affected_rows();
		if($result > 0){
			return true;
		}else{
			return false;
		}
    }
    
    function CashOut_CashIn_Check($Unique, $CashInMethod){
        $StationUnique = $this->session->userdata("station_number");
        if($CashInMethod == 2){
            return $this->db->query(
                'select "Unique", "CashIn","CashOut", now() - "CashIn" as "Interval",
                extract(epoch from (now() - "CashIn")) / 60 as "CashInMinutes"
                from station_server where "Status" = 1
                and "CashOut" is null
                and "Unique" = '.$Unique
            )->row_array();
        }else{
            return $this->db->query(
                'select "Unique", "CashIn","CashOut", now() - "CashIn" as "Interval",
                extract(epoch from (now() - "CashIn")) / 60 as "CashInMinutes"
                from station_server where "Status" = 1
                and "CashOut" is null
                and "Unique" = '.$Unique.'
                and "StationUnique" = '.$StationUnique
            )->row_array();
        }
    }

}
