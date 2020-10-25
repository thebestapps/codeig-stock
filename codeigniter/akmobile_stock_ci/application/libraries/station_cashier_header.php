<?php defined('BASEPATH') OR exit('No direct script access allowed');
class station_cashier_header {
	private $station;
	private $cashier;
	public function __construct($station = '', $cashier = '') {
		$this -> station = $station;
		$this -> cashier = $cashier;
	}
	
	public function __toString() {
		$rightCols = 23;
		$leftCols = 19;
		$left = str_pad($this -> station, $leftCols);
		$right = str_pad($this -> cashier, $rightCols, ' '.' ', STR_PAD_LEFT);
		return "$left$right\n";
	}
}