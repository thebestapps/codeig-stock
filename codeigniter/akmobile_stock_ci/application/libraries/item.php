<?php defined('BASEPATH') OR exit('No direct script access allowed');
class item {
	private $name;
	private $price;
	private $dollarSign;
	public function __construct($name = '', $price = '', $dollarSign = false) {
		$this -> name = $name;
		$this -> price = $price;
		$this -> dollarSign = $dollarSign;
	}
	
	public function __toString() {
		$rightCols = 10;
		$leftCols = 30;
		if($this -> dollarSign) {
			$leftCols = $leftCols / 2 - $rightCols / 2;
		}
		$left = str_pad($this -> name, $leftCols) ;
		
		$sign = ($this -> dollarSign ? '$ ' : '');
		$right = str_pad($sign . $this -> price, $rightCols, ' ', STR_PAD_BOTH);
		return "$left$right\n";
	}
}