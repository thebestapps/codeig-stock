<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*------------------------------------------------------------------| 
|  Company: AkamaiPOS                                               |
|  Title: ReceiptReport Print Library Functions                     |
|  Created: by HD                                     |
|  Email: HD                                       |
|  Created: 06-02-2017                                              |
|------------------------------------------------------------------*/
class ClosingReportPrintLibrary {
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
    private $clockin;
    private $clockout;
    private $duration;
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
    | Payments Header                                               |
    | @param $label integer                                         |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function payments_header($label='', $total='', $total2='', $total3=''){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
		$this -> total3 = $total3;
        $firstCols = 9;
		$secondCols = 11;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
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
    | Closing Report Payments Header                                |
    | @param $label string                                          |
    | @param $count string                                          |
    | @param $total string                                          |
    |--------------------------------------------------------------*/
    public function closing_report_payments_header($label='', $count='', $total=''){
        $this -> label = $label;
        $this -> count = $count; 
		$this -> total = $total;
        $firstCols  = 15;
		$secondCols = 10;
        $thirdCols  = 17;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Closing Report Payments Body                                  |
    | @param $label string                                          |
    | @param $count integer                                         |
    | @param $total numeric                                         |
    |--------------------------------------------------------------*/
    public function closing_report_payments_body($label='', $count=0, $total=0){
        $this -> label = $label;
        $this -> count = $count; 
		$this -> total = $total;
        $firstCols  = 15;
		$secondCols = 10;
        $thirdCols  = 17;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> count, $secondCols, ' '.' ', STR_PAD_LEFT);
        $third  = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }
    /*--------------------------------------------------------------|
    | Closing Cash Due Header                                       |
    | @param $label string                                          |
    | @param $total string                                          |
    |--------------------------------------------------------------*/
    public function closing_cash_due_header($label='', $total=''){
        $this -> label = $label;
        $this -> total = $total;
        $firstCols  = 21;
		$secondCols = 21;
		$first  = str_pad($this -> label, $firstCols);
        $second  = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second\n";
    }
    /*--------------------------------------------------------------|
    | Closing Cash Due Body                                         |
    | @param $label integer                                         |
    | @param $total numeric                                         |
    |--------------------------------------------------------------*/
    public function closing_cash_due_body($label=0, $total=0){
        $this -> label = $label;
        $this -> total = $total;
        $firstCols  = 21;
		$secondCols = 21;
		$first  = str_pad($this -> label, $firstCols);
        $second  = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second\n";
    }
    /*--------------------------------------------------------------|
    | Closing Category Header                                       |
    | @param $label integer                                         |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function closing_category_header($label='', $total='', $total2='', $total3=''){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
		$this -> total3 = $total3;
        $firstCols = 9;
		$secondCols = 11;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Category Body                                         |
    | @param $label integer                                         |
    | @param $total numeric                                         |
    | @param $total2 numeric                                        |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function closing_category_body($label='', $total=0, $total2=0, $total3=0){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
		$this -> total3 = $total3;
        $firstCols = 9;
		$secondCols = 11;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Sub Category Body                                     |
    | @param $label string                                          |
    | @param $total string                                          |
    | @param $total2 string                                         |
    | @param $total3 string                                         |
    |--------------------------------------------------------------*/
    public function closing_sub_category_header($label='', $total='', $total2='', $total3=''){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
		$this -> total3 = $total3;
        $firstCols = 9;
		$secondCols = 11;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Sub Category Body                                     |
    | @param $label string                                          |
    | @param $total numeric                                         |
    | @param $total2 numeric                                        |
    | @param $total3 numeric                                        |
    |--------------------------------------------------------------*/
    public function closing_sub_category_body($label='', $total=0, $total2=0, $total3=0){
        $this -> label = $label;
		$this -> total = $total;
		$this -> total2 = $total2;
		$this -> total3 = $total3;
        $firstCols = 9;
		$secondCols = 11;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total2, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total3, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Tax Header                                            |
    | @param $label string                                          |
    | @param $total string                                          |
    |--------------------------------------------------------------*/
    public function closing_tax_header($label='', $total=''){
        $this -> label = $label;
		$this -> total = $total;
        $firstCols = 15;
		$secondCols = 27;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second\n";
    }
    /*--------------------------------------------------------------|
    | Closing Tax Body                                              |
    | @param $label string                                          |
    | @param $total numeric                                         |
    |--------------------------------------------------------------*/
    public function closing_tax_body($label='', $total=0){
        $this -> label = $label;
		$this -> total = $total;
        $firstCols = 15;
		$secondCols = 27;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> total, $secondCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second\n";
    }
    /*--------------------------------------------------------------|
    | Closing Discount Header                                       |
    | @param $label string                                          |
    | @param $reason string                                         |
    | @param $quantity string                                       |
    | @param $total string                                          |
    |--------------------------------------------------------------*/
    public function closing_discount_header($label='', $reason='', $quantity='', $total=''){
        $this -> label    = $label;
		$this -> reason   = $reason;
		$this -> quantity = $quantity;
		$this -> total    = $total;
        $firstCols  = 11;
		$secondCols = 9;
		$thirdCols  = 11;
		$fourthCols = 11;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> reason, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> quantity, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Discount Body                                         |
    | @param $label string                                          |
    | @param $reason string                                         |
    | @param $quantity integer                                      |
    | @param $total numeric                                         |
    |--------------------------------------------------------------*/
    public function closing_discount_body($label='', $reason='', $quantity=0, $total=0){
        $this -> label    = $label;
		$this -> reason   = $reason;
		$this -> quantity = $quantity;
		$this -> total    = $total;
        $firstCols = 11;
		$secondCols = 14;
		$thirdCols = 6;
		$fourthCols = 11;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> reason, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> quantity, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Refund and Void Header                                |
    | @param $label string                                          |
    | @param $reason string                                         |
    | @param $quantity string                                       |
    | @param $total string                                          |
    |--------------------------------------------------------------*/
    public function closing_refund_void_header($label='', $reason='', $quantity=0, $total=0){
        $this -> label    = $label;
		$this -> reason   = $reason;
		$this -> quantity = $quantity;
		$this -> total    = $total;
        $firstCols  = 14;
		$secondCols = 7;
		$thirdCols  = 10;
		$fourthCols = 11;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> reason, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> quantity, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }
    /*--------------------------------------------------------------|
    | Closing Refund and Void Body                                  |
    | @param $label string                                          |
    | @param $reason string                                         |
    | @param $quantity integer                                      |
    | @param $total numeric                                         |
    |--------------------------------------------------------------*/
    public function closing_refund_void_body($label='', $reason='', $quantity=0, $total=0){
        $this -> label    = $label;
		$this -> reason   = $reason;
		$this -> quantity = $quantity;
		$this -> total    = $total;
        $firstCols  = 13;
		$secondCols = 11;
		$thirdCols  = 7;
		$fourthCols = 11;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> reason, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> quantity, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
    }

    /*--------------------------------------------------------------|
    | Closing Time Clock Report Header                              |
    | @param $label string                                          |
    | @param $clockin string                                        |
    | @param $clockout string                                       |
    | @param $duration numeric                                      |
    |--------------------------------------------------------------*/
    public function closing_print_time_clock_header($label='', $clockin=NULL,$clockout=NULL){
        $this -> label = $label;
        $this -> clockin = $clockin;    
        $this -> clockout = $clockout;
        $firstCols  = 11;
		$secondCols = 10;
		$thirdCols  = 10;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> clockin, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> clockout, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Closing Time Clock Report                                     |
    | @param $label string                                          |
    | @param $clockin string                                        |
    | @param $clockout string                                       |
    | @param $duration numeric                                      |
    |--------------------------------------------------------------*/
    public function closing_print_time_clock($label='', $clockin=NULL,$clockout=NULL){
        $this -> label = $label;
        $this -> clockin = $clockin;    
        $this -> clockout = $clockout;
        $firstCols  = 12;
		$secondCols = 15;
		$thirdCols  = 15;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> clockin, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this -> clockout, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }


    /*--------------------------------------------------------------|
    | Closing Time Clock Report Header                              |
    | @param $label string                                          |
    | @param $clockin string                                        |
    | @param $clockout string                                       |
    | @param $duration numeric                                      |
    |--------------------------------------------------------------*/
    public function print_time_clock_report_header($label='', $clockin=NULL,$clockout=NULL){
        $this -> label = $label;
        $this -> clockin = $clockin;    
        $this -> clockout = $clockout;
        $firstCols  = 18;
		$secondCols = 13;
        $thirdCols  = 11;
		$first  = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> clockin, $secondCols, ' '.' ', STR_PAD_RIGHT);
        $third  = str_pad($this -> clockout, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
    }

    /*--------------------------------------------------------------|
    | Closing Time Clock Report                                     |
    | @param $clockin string                                        |
    | @param $clockout string                                       |
    | @param $subtotal string                                       |
    |--------------------------------------------------------------*/
    public function print_time_clock_report($clockin='', $clockout=null, $subtotal=null){
        $this -> clockin  = $clockin;
        $this -> clockout = $clockout;
        $this -> subtotal = $subtotal;
        $firstCols = 17;
        $secondCols = 17;
        $thirdCols = 8;
        $first  = str_pad($this -> clockin, $firstCols);
        $second = str_pad($this -> clockout, $secondCols, ' '.' ', STR_PAD_RIGHT);
        $third  = str_pad($this -> subtotal, $thirdCols, ' '.' ', STR_PAD_LEFT);
        return "$first$second$third\n";
    }
}