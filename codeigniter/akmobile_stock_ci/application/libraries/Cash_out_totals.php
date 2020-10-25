<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_totals {
	private $space;
	private $label;
	private $total;
	public function __construct($space = '', $label = '', $total = '') {
		$this -> space = $space;
		$this -> label = $label;
		$this -> total = $total;
	}
	
	public function __toString() {
		$leftCols = 9;
		$middleCols = 20;
		$rightCols = 13;
		$left = str_pad($this -> space, $leftCols);
		$middle = str_pad($this -> label, $middleCols, ' '.' ', STR_PAD_LEFT);
		$right = str_pad($this -> total, $rightCols, ' '.' ', STR_PAD_LEFT);
		return "$left$middle$right\n";
	}
}