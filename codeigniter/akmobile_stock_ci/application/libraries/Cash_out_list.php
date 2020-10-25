<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_list {
	private $label;
	private $in;
	private $out;
	private $total;
	public function __construct($label = '', $in = '', $out = '', $total = '') {
		$this -> label = $label;
		$this -> in = $in;
		$this -> out = $out;
		$this -> total = $total;
	}
	
	public function __toString() {
		$firstCols = 11;
		$secondCols = 9;
		$thirdCols = 11;
		$fourthCols = 11;
		$first = str_pad($this -> label, $firstCols);
		$second = str_pad($this -> in, $secondCols, ' '.' ', STR_PAD_LEFT);
		$third = str_pad($this -> out, $thirdCols, ' '.' ', STR_PAD_LEFT);
		$fourth = str_pad($this -> total, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
	}
}