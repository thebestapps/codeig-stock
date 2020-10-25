<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cash_out_gc {
	private $gcno;
    private $gcopr;
	private $gcqty;
	private $gctotal;
	public function __construct($gcno = '', $gcopr= '', $gcqty = '',  $gctotal = '') {
		$this -> gcno = $gcno;
        $this -> gcopr = $gcopr;
		$this -> gcqty = $gcqty;
		$this -> gctotal = $gctotal;
	}
	
	public function __toString() {
		$firstCols  = 13;//char to the right
		$secondCols = 13;//char to left
		$thirdCols  = 3;//char to left
        $fourthCols = 13;
		$first  = str_pad($this  -> gcno, $firstCols, ' '.' ', STR_PAD_RIGHT);
		$second = str_pad($this  -> gcopr, $secondCols, ' '.' ', STR_PAD_RIGHT);
		$third  = str_pad($this  -> gcqty, $thirdCols, ' '.' ', STR_PAD_LEFT);
        $fourth = str_pad($this  -> gctotal, $fourthCols, ' '.' ', STR_PAD_LEFT);
		return "$first$second$third$fourth\n";
	}
}