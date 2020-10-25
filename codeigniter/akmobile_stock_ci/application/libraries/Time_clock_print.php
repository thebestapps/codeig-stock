<?php defined('BASEPATH') OR exit('No direct script access allowed');
class time_clock_print {
	private $label;
	private $value;
	private $notapp;

	public function __construct($label = '', $value='', $notapp = '') {
		$this -> label = $label;
		$this -> value = $value;
		$this -> notapp = $notapp;
	}
	
	public function __toString() {
		$rightCols = 5;
		$leftCols = 10;
		$endCols = 27;
		$left = str_pad($this -> label, $leftCols);
		$right = str_pad($this -> value, $rightCols, ' '.' ', STR_PAD_LEFT);
		$end = str_pad($this -> notapp, $endCols, ' '.' ', STR_PAD_LEFT);
		return "$left$right$end"."\n";
	}
}