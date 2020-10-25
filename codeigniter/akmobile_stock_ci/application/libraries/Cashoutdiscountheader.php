<?php defined('BASEPATH') OR exit('No direct script access allowed');
class CashOutDiscountHeader {
	private $label;
	private $qty;
	private $total;
	public function __construct($label = '', $qty = '', $total = '') {
		$this -> label = $label;
		$this -> qty = $qty;
		$this -> total = $total;
	}
	
	public function __toString() {
		$firstCols = 22;
		$secondCols = 9;
		$thirdCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> qty, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> total, $thirdCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third\n";
	}
}