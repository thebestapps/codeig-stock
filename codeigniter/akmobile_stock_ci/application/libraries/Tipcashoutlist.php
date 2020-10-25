<?php defined('BASEPATH') OR exit('No direct script access allowed');
class TipCashOutList {
	private $receipt;
	private $tender;
	private $adjust;
	private $total;
	public function __construct($receipt = '', $tender = '', $adjust = '', $total = '') {
		$this -> receipt 	= $receipt;
		$this -> tender 	= $tender;
		$this -> adjust 	= $adjust;
		$this -> total 		= $total;
	}
	
	public function __toString() {
		$firstCols	= 11;
		$secondCols = 9;
		$thirdCols 	= 11;
		$fourthCols = 11;
		$first 	= str_pad($this -> receipt, $firstCols);
		$second = str_pad($this -> tender, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third 	= str_pad($this -> adjust, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
	}
}