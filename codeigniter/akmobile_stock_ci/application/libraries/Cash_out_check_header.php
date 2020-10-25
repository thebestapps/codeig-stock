<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_check_header {
	private $check;
	private $name;
	private $receipt;
	private $amount;
	public function __construct($check = '', $name = '', $receipt = '', $amount = '') {
		$this -> check 	= $check;
		$this -> name 	= $name;
		$this -> receipt= $receipt;
		$this -> amount = $amount;
	}
	
	public function __toString() {
		$firstCols 	= 9;
		$secondCols = 11;
		$thirdCols 	= 11;
		$fourthCols = 11;
		$first 		= str_pad($this -> check, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second 	= str_pad($this -> name, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third 		= str_pad($this -> receipt, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth 	= str_pad($this -> amount, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
	}
}