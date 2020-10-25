<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

// Load the Rest Controller library
require APPPATH . '/libraries/REST_Controller.php';

class Authentication extends REST_Controller {

    public function __construct() { 
        parent::__construct();
        
        // Load the user model
        $this->load->model('api/Item', 'item');
    }

    public function item_get($unique = 0){
        // Returns all the items data if the id not specified,
        // Otherwise, a single item will be returned.
        $con = $unique?array('Unique' => $unique):'';
        // $items = 
        $items["data"] = $this->item->getRows($con);
        
        // Check if the item data exists
        if(!empty($items)){
            // Set the response and exit
            //OK (200) being the HTTP response code
            $this->response($items, REST_Controller::HTTP_OK);
        }else{
            // Set the response and exit
            //NOT_FOUND (404) being the HTTP response code
            $this->response([
                'status' => FALSE,
                'message' => 'No item was found.'
            ], REST_Controller::HTTP_NOT_FOUND);
        }
    }

    public function item_put(){
        $Unique = $this->put('Unique');
        $itemData = array();
        // Get the post data
        $itemData = strip_tags($this->put());
        // Validate the post data
        if(!empty($Unique)){
            // Update item's account data
            $update = $this->user->update($itemData, $Unique);
            
            // Check if the item data is updated
            if($update){
                // Set the response and exit
                $this->response([
                    'status' => TRUE,
                    'message' => 'The item info has been updated successfully.'
                ], REST_Controller::HTTP_OK);
            }else{
                // Set the response and exit
                $this->response("Some problems occurred, please try again.", REST_Controller::HTTP_BAD_REQUEST);
            }
        }else{
            // Set the response and exit
            $this->response("Provide at least one user info to update.", REST_Controller::HTTP_BAD_REQUEST);
        }
    }
}