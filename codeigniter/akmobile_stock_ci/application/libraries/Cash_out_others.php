<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_others {
	private $desc;
	private $count;
	private $total;
	public function __construct($desc = '', $count = '', $total = '') {
		$this -> desc = $desc;
		$this -> count = $count;
		$this -> total = $total;
	}
	
	public function __toString() {
		$leftCols = 12;
		$middleCols = 10;
		$rightCols = 20;
		$left = str_pad($this -> desc, $leftCols);
		$middle = str_pad($this -> count, $middleCols, ' '.' ', STR_PAD_LEFT);
		$right = str_pad($this -> total, $rightCols, ' '.' ', STR_PAD_LEFT);
		return "$left$middle$right\n";
	}
}