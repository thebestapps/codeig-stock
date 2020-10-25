<?php 
class CheckSession extends CI_Controller{
    public function __construct(){
        parent::__construct(); 
        $this->load->helper(array('form', 'url'));
        $this->load->library( 
            array(
                'session', 'form_validation'
            )
        );

        $this->load->model(
            array('Pos_model', 'Config_location_model')
        );
    }
    public function check_session(){
       $json = array(); 
       //Below last_visited should be updated everytime a page is accessed.
       $station_number = $this->session->userdata("station_number");
       if(!$station_number){
           $DecimalsQuantity = $this->Pos_model->config_location_settings('');
       }
       //$fiveMinutesBefore = date("YmdHi", "-5 minutes");
       //echo date("YmdHi", strtotime($lastVisitTime)) > $fiveMinutesBefore > 1 : 0;
       $json["loggedStation"] = $station_number;
       echo json_encode($json);
    }
}