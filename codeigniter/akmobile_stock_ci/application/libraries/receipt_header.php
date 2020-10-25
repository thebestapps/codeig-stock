<?php defined('BASEPATH') OR exit('No direct script access allowed');
class receipt_header {
	private $quantity;
	private $description;
	private $cost;
	public function __construct($quantity = '', $description = '', $cost = '') {
		$this -> quantity = $quantity;
		$this -> description = $description;
		$this -> cost = $cost;
	}
	
	public function __toString() {
		$rightCols = 33;
		$middleCols = 4;
		$leftCols = 5;
		$left = str_pad($this -> quantity, $rightCols);
		$middle =  str_pad($this -> description, $middleCols);
		$right = str_pad($this -> cost, $leftCols);
		return "$left$middle$right\n";
	}
}