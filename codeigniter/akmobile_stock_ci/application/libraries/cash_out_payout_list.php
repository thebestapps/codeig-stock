<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_payout_list {
	private $label;
	private $tax;
	public function __construct($label = '', $tax = '') {
		$this -> label = $label;
		$this -> in = $tax;
	}
	
	public function __toString() {
		$firstCols = 20;
		$secondCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> in, $secondCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second\n";
	}
}