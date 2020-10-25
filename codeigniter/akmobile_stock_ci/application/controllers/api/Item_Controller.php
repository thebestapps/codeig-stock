<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Item_Controller extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
        $this->load->library('session');
        $this->load->helper('form');
        $this->load->model('api/Item', 'item');
    }

    function item_data(){
        // API key
        $apiKey = 'AKCODE8483';

        // API auth credentials
        $apiUser = "admin";
        $apiPass = "1234";

        // Specify the ID of the user
        $userUnique = 1; 

        // API URL
        $url = base_url('api/authentication/item/'.$userUnique);

        // Create a new cURL resource
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("X-API-KEY: " . $apiKey));
        curl_setopt($ch, CURLOPT_USERPWD, "$apiUser:$apiPass");

        $result = curl_exec($ch);

        // Close cURL resource
        curl_close($ch);
    }
}

