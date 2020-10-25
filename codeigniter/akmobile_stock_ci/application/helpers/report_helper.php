<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('pointofsaleplguins'))
{
	function pointofsaleplguins()
	{
		print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
		print '<script src="'.base_url().'assets/js/bootstrap.min.js"></script>';
		print '<script src="'.base_url().'assets/js/custom.js"></script>';
		print '<script src="'.base_url().'assets/js/bootstrapValidator.js"></script>';
		print '<script src="'.base_url().'assets/js/bootstrap-switch.min.js"></script>';
		print '<script src="'.base_url().'assets/js/blockUI.js"></script>';
		print '<link href="'.base_url().'assets/css/normalize.css" rel="stylesheet" type="text/css">';
		print '<link href="'.base_url().'assets/css/global.css" rel="stylesheet" type="text/css">';
		print '<link href="'.base_url().'assets/css/font-awesome.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/css/bootstrapValidator.min.css" rel="stylesheet">';
		print '<link rel="stylesheet" href="'.base_url().'assets/css/bootstrap-switch.min.css">';
	}  
}

if ( ! function_exists('headerplugins'))
{
	function headerplugins(){
		print '<script src="'.base_url().'assets/js/angular/jquery-1.12.0.min.js"></script>';
	}
}	
if ( ! function_exists('reports_template'))
{
	function reports_template(){
		print '<link href="'.base_url().'assets/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/dist/css/timeline.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/dist/css/sb-admin-2.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/bower_components/morrisjs/morris.css" rel="stylesheet">';
		print '<link href="'.base_url().'assets/bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
	}
}
?>