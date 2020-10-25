<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('load_print_grid'))
{
	function load_print_grid()
	{
		$CI = &get_instance();
		$CI->load->model('backoffice/Item_barcode_model');
		return $result = $CI->Item_barcode_model->get_config_item();
	}  
}

if(!function_exists('config_label_format'))
{
	function config_label_format()
	{
		$CI = &get_instance();
		$CI->load->model('Backoffice/Item_barcode_model');
		return $result = $CI->Item_barcode_model->config_label_format();
	}  
}

if ( ! function_exists('config_label_print'))
{
	function config_label_print()
	{
		$CI = &get_instance();
		$CI->load->model('Backoffice/Item_barcode_model');
		return $result = $CI->Item_barcode_model->config_label_print($CI->session->userdata("station_number"));
	}  
}

?>
