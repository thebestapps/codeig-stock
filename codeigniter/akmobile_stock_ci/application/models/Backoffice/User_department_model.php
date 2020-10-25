<?php
defined('BASEPATH') or exit('No direct script access allowed');
class User_department_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();

        $timezone = $this->session->userdata("StationTimezone");
        if ($timezone == '' || $timezone == null) {
            $timezone = "Pacific/Honolulu";
        }
        if (function_exists('date_default_timezone_set')) {
            date_default_timezone_set($timezone);
        }
        ini_set('max_execution_time', 1000);
        $this->load->database('akback');
    }

    public function check_department_exists($deptName)
    {
        $sql = "select * from config_position_department where \"Department\" = '" . $deptName . "'";
        $query = $this->db->query($sql);

        $ifExists = (bool) count($query->result_array());
        return $ifExists;
    }

    public function get_user_departments()
    {
        $sql = "select DE.\"Unique\", DE.\"Department\", DE.\"Sort\",  DE.\"Default\",
        DE.\"Created\", CU1.\"UserName\" as \"CreatedBy\", DE.\"Updated\", CU2.\"UserName\" as \"UpdatedBy\"
        from config_position_department DE
        left join
        (select * from config_user) CU1 on CU1.\"Unique\" = DE.\"CreatedBy\"
        left join
        (select * from config_user) CU2 on CU2.\"Unique\" = DE.\"UpdatedBy\"
        where DE.\"Status\" = 1
        order by DE.\"Sort\", DE.\"Unique\", DE.\"Updated\", DE.\"Created\"
        ";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function get_user_department($departmentId)
    {
        $sql = "select DE.\"Unique\", DE.\"Department\", DE.\"Sort\",  DE.\"Default\",
        DE.\"Created\", CU1.\"UserName\" as \"CreatedBy\", DE.\"Updated\", CU2.\"UserName\" as \"UpdatedBy\"
        from config_position_department DE
        left join
        (select * from config_user) CU1 on CU1.\"Unique\" = DE.\"CreatedBy\"
        left join
        (select * from config_user) CU2 on CU2.\"Unique\" = DE.\"UpdatedBy\"
        where DE.\"Status\" = 1
        and DE.\"Unique\" = " . $departmentId . "
        order by DE.\"Sort\", DE.\"Unique\", DE.\"Updated\", DE.\"Created\"
        ";
        $query = $this->db->query($sql);
        return $query->result_array();
    }

    public function delete_user_department($departmentId, $updatingUser)
    {
        $deleteObject = (object) [
            'Status' => 0,
            'UpdatedBy' => $updatingUser,
            'Unique' => $departmentId,
        ];
        try {
            $this->db->where('Unique', $deleteObject->Unique);
            $this->db->update('config_position_department', $deleteObject);
            return (object) ['status' => true];
        } catch (Exception $e) {
            return (object) ['message' => $e->getMessage(), 'status' => false];
        }
    }

    public function create_user_department($postData)
    {
        $this->db->insert('config_position_department', $postData);
        $createdDeptId = $this->db->insert_id();
        return $this->get_user_department($createdDeptId);
    }

    public function update_user_department($postData)
    {
        $data = array(
            'Sort' => $postData->Sort,
            'Department' => $postData->Department,
            'Default' => $postData->Default,
            'UpdatedBy' => $postData->User,
            'Updated' => 'now()',
        );

        if(isset($postData->Default) && $postData->Default == 1){
            $sql = "update config_position_department set \"Default\" = 0 where \"Default\" = 1";
            $this->db->query($sql);
        }
        
        $this->db->where('Unique', $postData->Unique);
        $this->db->update('config_position_department', $data);

        return $this->get_user_department($postData->Unique);

    }
}
