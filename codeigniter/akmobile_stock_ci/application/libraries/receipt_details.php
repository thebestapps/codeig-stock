<?php defined('BASEPATH') OR exit('No direct script access allowed');
class receipt_details {
	private $quantity;
	private $description;
	private $cost;
	public function __construct($quantity = '', $cost = '', $description = false){
		$this -> quantity = $quantity;
		$this -> description = $description;
		$this -> cost = $cost;
	}
	
	public function __toString() {
		$rightCols = 12;
		$leftCols = 30;
		$left = str_pad($this -> quantity, $leftCols);
		$right = str_pad($this -> cost, $rightCols, ' '.' ', STR_PAD_LEFT);
		return "$left$right\n";
	}
}