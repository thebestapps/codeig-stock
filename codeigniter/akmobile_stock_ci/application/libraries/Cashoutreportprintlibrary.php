<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*------------------------------------------------------------------| 
|  Company: AkamaiPOS                                               |
|  Title: ReceiptReport Print Library Functions                     |
|  Created: by HD                                     |
|  Email: HD                                       |
|  Created: 06-06-2017                                              |
|------------------------------------------------------------------*/
class CashOutReportPrintLibrary {
    /*--------------------------------------------------------------|
    | Global Variable                                               |
    |--------------------------------------------------------------*/
	private $label;
    private $count;
    private $type;
    private $total;
    private $total2;
    private $total3;
    private $reason;
    private $quantity;
    private $sign;
    private $receipt;
    private $category_desc;
    private $category_sales;
    private $category_count;
    private $user;
    private $date;

    /*--------------------------------------------------------------|
    | Label on top of each section                                  |
    | @param $label string                                          |
    |--------------------------------------------------------------*/
    public function label_section($label=''){
        $this -> label = $label;
        $firstCols  = 42;
        $first  = str_pad($this -> label, $firstCols);
        return "$first\n";
    }
    /*--------------------------------------------------------------|
    | Dash Label                                                    |
    | @param $label string                                          |
    |--------------------------------------------------------------*/
    public function line_break_section($sign='', $count=0){
        $line = str_repeat($sign, $count);
        return "$line\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Category Sales Header                         |
    | @param $description string                                    |
    | @param $sales string                                          |
    | @param $count string                                          |
    |--------------------------------------------------------------*/
    public function category_sales_header($description='', $count='', $sales=''){
        $this -> category_description= $description;
        $this -> category_count      = $count;
        $this -> category_sales      = $sales;
        $firstCols  = 18;
        $secondCols = 11;
        $thirdCols  = 13;
        $first  = str_pad($this -> category_description, $firstCols);
		$second = str_pad($this -> category_count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> category_sales, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Category Sales                                |
    | @param $description string                                    |
    | @param $sales string                                          |
    | @param $count string                                          |
    |--------------------------------------------------------------*/
    public function category_sales($description='', $count='', $sales=''){
        $this -> category_description= $description;
        $this -> category_count      = $count;
        $this -> category_sales      = $sales;
        $firstCols  = 18;
        $secondCols = 11;
        $thirdCols  = 13;
        $first  = str_pad($this -> category_description, $firstCols);
		$second = str_pad($this -> category_count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> category_sales, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Category Sales Header                         |
    | @param $description string                                    |
    | @param $sales string                                          |
    | @param $count string                                          |
    |--------------------------------------------------------------*/
    public function subcategory_sales_header($description='', $count='', $sales=''){
        $this -> category_description= $description;
        $this -> category_count      = $count;
        $this -> category_sales      = $sales;
        $firstCols  = 18;
        $secondCols = 11;
        $thirdCols  = 13;
        $first  = str_pad($this -> category_description, $firstCols);
		$second = str_pad($this -> category_count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> category_sales, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Category Sales                                |
    | @param $description string                                    |
    | @param $sales string                                          |
    | @param $count string                                          |
    |--------------------------------------------------------------*/
    public function subcategory_sales($description='', $count='', $sales=''){
        $this -> category_description= $description;
        $this -> category_count      = $count;
        $this -> category_sales      = $sales;
        $firstCols  = 18;
        $secondCols = 11;
        $thirdCols  = 13;
        $first  = str_pad($this -> category_description, $firstCols);
		$second = str_pad($this -> category_count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> category_sales, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Refund & Void Header                          |
    | @param $receipt string                                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $reason string                                         |
    |--------------------------------------------------------------*/
    public function cashout_report_refund_void_header($receipt='', $label='', $total='', $reason=''){
        $this -> receipt = $receipt;
        $this -> label   = $label;
        $this -> total   = $total;
        $this -> reason  = $reason;
        $firstCols  = 9;
        $secondCols = 13;
        $thirdCols  = 11;
        $fourthCols = 9;
        $first  = str_pad($this -> receipt, $firstCols);
		$second = str_pad($this -> label, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth = str_pad($this -> reason, $fourthCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Report Refund & Void                                 |
    | @param $receipt string                                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $reason string                                         |
    |--------------------------------------------------------------*/
    public function cashout_report_refund_void_body($receipt='', $label='', $total=0, $reason=''){
        $this -> receipt = $receipt;
        $this -> label   = $label;
        $this -> total   = $total;
        $this -> reason  = $reason;
        $firstCols  = 9;
        $secondCols = 14;
        $thirdCols  = 10;
        $fourthCols = 9;
        $first  = str_pad($this -> receipt, $firstCols);
		$second = str_pad($this -> label, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth = str_pad($this -> reason, $fourthCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Denomination List                                    |
    | @param $receipt string                                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $reason string                                         |
    |--------------------------------------------------------------*/
    public function cashout_denomination_list($label='', $quantity=0, $total=0){
        $this -> label   = $label;
        $this -> quantity = $quantity;
        $this -> total = $total;
        $firstCols  = 18;
        $secondCols = 8;
        $thirdCols  = 16;
        $first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> quantity, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Report Date Cash In and Out                          |
    | @param $receipt string                                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $reason string                                         |
    |--------------------------------------------------------------*/
    public function cashout_date_cash_in_out($label='', $user='', $date){
        $this -> label = $label;
        $this -> user = $user;
        $this -> date = $date;
        $leftCols = 10;
        $rightCols = 12;
        $endCols = 20;
        $left = str_pad($this -> label, $leftCols);
        $right = str_pad($this -> user, $rightCols);
        $end = str_pad($this -> date, $endCols);
        return "$left$right$end\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Report Date Cash In and Out                          |
    | @param $receipt string                                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $reason string                                         |
    |--------------------------------------------------------------*/
    public function cashout_date_cash_daterange($label='', $user='', $date){
        $this -> label = $label;
        $this -> user = $user;
        $this -> date = $date;
        $leftCols = 10;
        $rightCols = 12;
        $endCols = 20;
        $left = str_pad($this -> label, $leftCols);
        $right = str_pad($this -> user, $rightCols);
        $end = str_pad($this -> date, $endCols);
        return "$left$right$end";
    }

    /*--------------------------------------------------------------|
    | Cash Out Customer Sales Summary Header                        |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function cash_out_customer_sales_summary_header($label, $total, $total2, $total3){
        $this -> label  = $label;
        $this -> total  = $total;
        $this -> total2 = $total2;
        $this -> total3 = $total3;
        $firstCols 	= 17;
		$secondCols = 7;
        $thirdCols 	= 8;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_RIGHT);
        $third 		= str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Customer Sales Summary                               |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function cash_out_customer_sales_summary($label, $total, $total2, $total3){
        $this -> label  = $label;
        $this -> total  = $total;
        $this -> total2 = $total2;
        $this -> total3 = $total3;
        $firstCols 	= 18;
		$secondCols = 4;
        $thirdCols 	= 10;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third 		= str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Items Sales Summary Header                           |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function cash_out_item_sales_header($label, $quantity, $total){
        $this -> label = $label;
        $this -> quantity = $quantity;
        $this -> total = $total;
        $firstCols 	= 23;
		$secondCols = 8;
        $thirdCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> quantity, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third 		= str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Items Sales Summary                                  |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function cash_out_item_sales_summary($label, $quantity, $total){
        $this -> label = $label;
        $this -> quantity = $quantity;
        $this -> total = $total;
        $firstCols 	= 23;
		$secondCols = 8;
        $thirdCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> quantity, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third 		= str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Credit Card Details Header                           |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function cash_out_cc_details_header($label, $total, $total2, $total3){
        $this -> label  = $label;
        $this -> total  = $total;
        $this -> total2 = $total2;
        $this -> total3 = $total3;
        $firstCols 	= 12;
		$secondCols = 8;
        $thirdCols  = 11;
        $fourthCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third 		= str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Credit Card Details                                  |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function cash_out_cc_details($label, $total, $total2, $total3){
        $this -> label  = $label;
        $this -> total  = $total;
        $this -> total2 = $total2;
        $this -> total3 = $total3;
        $firstCols 	= 12;
		$secondCols = 8;
        $thirdCols  = 11;
        $fourthCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third 		= str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Employee Sales                                       |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function employee_sales_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 8;
		$secondCols = 7;
        $thirdCols  = 11;
        $fourthCols = 16;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Employee Sales                                       |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    | @param $cols array                                            |
    |--------------------------------------------------------------*/
    public function employee_sales($label, $date, $description, $price, $cols){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= $cols[0];
		$secondCols = $cols[1];
        $thirdCols  = $cols[2];
        $fourthCols = $cols[3];
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.' ', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.' ', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Employee Sales Total                                 |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function employee_sales_total($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 7;
        $thirdCols  = 12;
        $fourthCols = 12;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.' ', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.' ', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Cash Out Employee Receipt Total                               |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function receipt_total($label='', $total='', $total2=''){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
        $firstCols 	= 14;
		$secondCols = 14;
        $thirdCols  = 14;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Store Credit Label                                   |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function store_credit_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 14;
		$secondCols = 9;
        $thirdCols  = 10;
        $fourthCols = 9;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Cash Out Store Credit                                         |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function store_credit($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 14;
		$secondCols = 9;
        $thirdCols  = 10;
        $fourthCols = 9;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Daily Sales Label                                             |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function daily_sales_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 16;
		$secondCols = 9;
        $thirdCols  = 7;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Daily Sales Label                                             |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function daily_sales($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Issue Redeem Label                                            |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function issue_redeem_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 16;
		$secondCols = 10;
        $thirdCols  = 7;
        $fourthCols = 9;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Issue Redeem                                                  |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function issue_redeem($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | In and Out Label                                              |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function in_out_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 19;
		$secondCols = 10;
        $thirdCols  = 6;
        $fourthCols = 7;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | In and Out                                                    |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function in_out($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Employee Sales Summary Label                                  |
    | @param $label string                                          |
    | @param $quantity string                                       |
    | @param $price string                                          |
    |--------------------------------------------------------------*/
    public function employee_summary_label($label='', $sales='', $returns='', $total=''){
        $this -> label          = $label;
        $this -> sales          = $sales;
        $this -> returns        = $returns;
        $this -> total          = $total;
        $firstCols 	= 16;
		$secondCols = 9;
        $thirdCols  = 7;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> sales, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> returns, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> total, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Employee Sales Summary Label                                  |
    | @param $label string                                          |
    | @param $quantity string                                       |
    | @param $price string                                          |
    |--------------------------------------------------------------*/
    public function employee_summary_label_cash_out($label='', $returns='', $total=''){
        $this -> label          = $label;
        $this -> returns        = $returns;
        $this -> total          = $total;
        $firstCols 	= 22;
		$secondCols = 13;
        $thirdCols  = 7;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> returns, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> total, $thirdCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Employee Sales Summary                                        |
    | @param $label string                                          |
    | @param $quantity string                                       |
    | @param $price string                                          |
    |--------------------------------------------------------------*/
    public function employee_summary($label='', $sales='', $returns='', $total=''){
        $this -> label          = $label;
        $this -> sales          = $sales;
        $this -> returns        = $returns;
        $this -> total          = $total;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> sales, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> returns, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Employee Sales Summary                                        |
    | @param $label string                                          |
    | @param $quantity string                                       |
    | @param $price string                                          |
    |--------------------------------------------------------------*/
    public function employee_summary_cash_out($label='', $returns='', $total=''){
        $this -> label          = $label;
        $this -> returns        = $returns;
        $this -> total          = $total;
        $firstCols 	= 11;
        $thirdCols  = 15;
        $fourthCols = 16;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> returns, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> total, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Deposits Label                                                |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function deposits_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 14;
		$secondCols = 13;
        $thirdCols  = 7;
        $fourthCols = 8;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Deposits                                                      |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function deposits($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Deposits Label                                                |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function store_sales_label($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 16;
		$secondCols = 12;
        $thirdCols  = 6;
        $fourthCols = 8;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_RIGHT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_RIGHT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Store Sales                                                   |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function store_sales($label, $date, $description, $price){
        $this -> label          = $label;
        $this -> date           = $date;
        $this -> description    = $description;
        $this -> price          = $price;
        $firstCols 	= 11;
		$secondCols = 10;
        $thirdCols  = 11;
        $fourthCols = 10;
        $first 		= str_pad($this -> label, $firstCols, ' '.'', STR_PAD_RIGHT);
		$second 	= str_pad($this -> date, $secondCols, ' '.'', STR_PAD_LEFT);
        $third 		= str_pad($this -> description, $thirdCols, ' '.'', STR_PAD_LEFT);
        $fourth     = str_pad($this -> price, $fourthCols, ' '.'', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Daily Sales Report Customer Summarry Header                   |
    | @param $label string                                          |
    | @param $quantity string                                       |
    | @param $count string                                          |
    |--------------------------------------------------------------*/
    public function daily_customer_summary_header($label='', $quantity='', $total=''){
        $this -> label = $label;
        $this -> quantity = $quantity;
        $this -> total = $total;
        $firstCols 	= 23;
		$secondCols = 8;
        $thirdCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> quantity, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third 		= str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Daily Sales Report Customer Summarry                          |
    | @param $label string                                          |
    | @param $quantity int                                          |
    | @param $count int                                             |
    |--------------------------------------------------------------*/
    public function daily_customer_summary($label='', $quantity='', $total){
        $this -> label = $label;
        $this -> quantity = $quantity;
        $this -> total = $total;
        $firstCols 	= 23;
		$secondCols = 8;
        $thirdCols = 11;
        $first 		= str_pad($this -> label, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> quantity, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third 		= str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }


}