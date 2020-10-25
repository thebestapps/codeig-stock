<?php defined('BASEPATH') OR exit('No direct script access allowed');
class cashin_cashout {
    private $label;
    private $value;
    private $notapp;

    public function __construct($label = '', $value='', $notapp = '') {
        $this -> label = $label;
        $this -> value = $value;
        $this -> notapp = $notapp;
    }

    public function __toString() {
        $leftCols = 9;
        $rightCols = 32;
        $endCols = 1;
        $left = str_pad($this -> label, $leftCols);
        $right = str_pad($this -> value, $rightCols);
        $end = str_pad($this -> notapp, $endCols);
        return "$left$right$end";
    }
}