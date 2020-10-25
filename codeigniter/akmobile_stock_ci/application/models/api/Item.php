<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Item extends CI_Model {

    public function __construct() {
        parent::__construct();
        
        // Load the database library
        $this->load->database("akfront");
        
        $this->userTbl = 'item';
    }

    /*
     * Get rows from the config_item table
     */
    function getRows($params = array()){
        $this->db->select('*');
        $this->db->from($this->userTbl);
        
        //fetch data by conditions
        if(array_key_exists("conditions",$params)){
            foreach($params['conditions'] as $key => $value){
                $this->db->where($key,$value);
            }
        }
        
        if(array_key_exists("Unique",$params)){
            $this->db->where('Unique',$params['Unique']);
            $query = $this->db->get();
            $result = $query->row_array();
        }else{
            //set start and limit
            if(array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit'],$params['start']);
            }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){
                $this->db->limit($params['limit']);
            }
            
            if(array_key_exists("returnType",$params) && $params['returnType'] == 'count'){
                $result = $this->db->count_all_results();    
            }elseif(array_key_exists("returnType",$params) && $params['returnType'] == 'single'){
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->row_array():false;
            }else{
                $query = $this->db->get();
                $result = ($query->num_rows() > 0)?$query->result_array():false;
            }
        }

        //return fetched data
        return $result;
    }
    
    /*
     * Insert item data
     */
    public function insert($data){
        //add Created and Updated date if not exists
        if(!array_key_exists("Created", $data)){
            $data['Created'] = date("Y-m-d H:i:s");
        }
        if(!array_key_exists("Updated", $data)){
            $data['Updated'] = date("Y-m-d H:i:s");
        }
        
        //insert item data to item table
        // $insert = $this->db->insert($this->userTbl, $data);
        $sql = "SELECT currval(pg_get_serial_sequence('$userTbl', 'Unique')) as newid";
        $insert = $this->db->query($sql)->row()->newid;
        
        //return the status
        return $insert?$this->db->insert_id():false;
    }
    
    /*
     * Update user data
     */
    public function update($data, $id){
        //add Updated date if not exists
        if(!array_key_exists('Updated', $data)){
            $data['Updated'] = date("Y-m-d H:i:s");
        }
        
        //update user data in config_user table
        $update = $this->db->update($this->userTbl, $data, array('Unique'=>$id));
        
        //return the status
        return $update?true:false;
    }
    
    /*
     * Delete item data
     */
    public function delete($id){
        //update user from item table
        $delete = $this->db->delete('item',array('Unique'=>$id));
        //return the status
        return $delete?true:false;
    }

}
