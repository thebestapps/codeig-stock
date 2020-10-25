<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*  Company: AkamaiPOS
*   Title: Back Office Email Controller
*   Created By: HD
*   Email: HD
*   Date: 07-16-2020
*/
require_once APPPATH.'libraries/swiftmailer/swift_required.php';
require_once APPPATH.'libraries/password_hash/passwordLib.php';
class Backoffice_email extends AK_Controller {
    function __construct() {
    	parent::__construct();
		$this->load->helper(array('form', 'url', 'date'));
        $this->load->library(
            array(
                'session', 'form_validation'
            )
        );
        $this->load->model('Backoffice/Backoffice_email_model', 'model');
    
        $timezone = $this->session->userdata("StationTimezone");
		if($timezone == '' || $timezone == NULL){
			$timezone = "Pacific/Honolulu";
		}
        if (function_exists('date_default_timezone_set')) date_default_timezone_set($timezone);
    }

    function index() {
        if($this->_is_logged_in()) {
            $storeid = $this->session->userdata("storeunique");
            $storename = $this->model->stores($storeid);
            $data['StoreName'] = $storename;
            $data["StationName"] = $this->session->userdata("station_name");
            $data['currentuser'] = $this->session->userdata('currentuser');
            $query = $this->db->get_where('config_user_email', array('UserUnique' => $this->session->userdata("userid")));
			$data['userdata'] = $query->row();			
            $this->load->view('backoffice/Backoffice_email_view', $data);
        }else{
            $data['error'] = "Your session has already expired!";
			$this->session->set_userdata($data);
			redirect('backoffice');
        }
    }

    /*Checking whether is logged or not*/
	function _is_logged_in(){
		if($this->session->userdata('logged_in')){
			return true;
		}else{
			return false;
		}
	}

    /*Logout*/
	function logout(){
		$this->session->sess_destroy();
		redirect('backoffice');
    }

    function multiexplode($delimiters,$string) {
		$ready = str_replace($delimiters, $delimiters[0], $string);
		$launch = explode($delimiters[0], $ready);
		return  $launch;
	}
    
    function send_email(){
        $response = array();

        parse_str(urldecode($_POST['post']));	
		$setToArr  = $this->multiexplode(array(',',';'), trim($To) );
		$setTo     = array_map('strtolower', $setToArr);
		$setTo     = array_map('trim', $setToArr);

		$setBccArr = $this->multiexplode(array(',', ';'), trim($Bcc) );
		$setBcc    = array_map('strtolower', $setBccArr);
		$setBcc    = array_map('trim', $setBccArr);

		$setCcArr  = $this->multiexplode(array(',',';'),trim($Cc) );
		$setCc     = array_map('strtolower', $setCcArr);
        $setCc     = array_map('trim', $setCcArr);
        
        $file_path = $_SERVER["DOCUMENT_ROOT"]."/".BASE_URL_CONSTANT."/assets/download/";
		$send_result = 0;

        $EmailUnique = $this->session->userdata("emailUnique");
        
        $query = $this->db->get_where('config_user_email', array('UserUnique' => $this->session->userdata("userid")));
        $mail_setting 	= $query->row_array();
        
        $validations = $this->validate_mail(array("Name" => $Name, "To" => $To, "Bcc" => $Bcc, "Cc" => $Cc, "Subject" => $Subject));
		if ($validations['success']) {
			$string = null;
			$data = array(
				'From' 		=> $mail_setting["FromEmail"],
				'To'	 	=> $To,
				'BCC' 		=> (($Bcc)?$Bcc:''),
				'CC' 		=> (($Cc)?$Cc:''),
				'Subject'  	=> (($Subject)?$Subject:''),
				'Attachment'=> (isset($files) ? json_encode($files) : null),
				'Message'  	=> (($message_body)?$message_body:''),
				'Status'  	=> 2
			);			
			if(isset($EmailUnique)){
				$this->db->where('Unique', $this->session->userdata("emailUnique"));
				$this->db->update('email_messages', $data); 
			}else{
				$this->db->insert("email_messages", $data);
				$sql = "SELECT currval(pg_get_serial_sequence('email_messages', 'Unique')) as newid";
				$query = $this->db->query($sql);
				$EmailUnique = $query->row()->newid;
			}
			
			try {	
				$transport 		= Swift_SmtpTransport::newInstance('smtp.gmail.com',465,'ssl')
				->setUsername('reports@akamaipos.com')->setPassword('pwanmmxjwupcbmlg');
				
				$transport->setLocalDomain('['.$mail_setting["Host"].']');
				
				$message 		= Swift_Message::newInstance();
				$message->setTo($setTo);
				if($Cc):
					$message->setCc($setCc);
				endif;
				if($Bcc):
					$message->setBcc($setBcc);
				endif;
				if($Subject):
					$message->setSubject($Subject);
				endif;
				if($message_body):
					$message->setBody($message_body);
				endif;

				$message->setFrom(array($mail_setting["FromEmail"] => $mail_setting["FromName"]));

				if(isset($files)){
					foreach($files as $f):
						$file = $file_path.trim($f);
						if(file_exists($file)):
							$message->attach(Swift_Attachment::fromPath($file));
						endif;
					endforeach;
				}

				$mailer 	= Swift_Mailer::newInstance($transport);
				
				$send_result= $mailer->send($message, $status);

			} catch (Swift_TransportException $STe) {
				$string 	= $STe->getMessage();
			} catch (Exception $e) {
				$string 	= $e->getMessage();
			}	

			if ( $send_result >0 && $string === null ) { 
				$response 	= [
					'status'  		=> 'Success',
					'send_status'  	=> $status,
					'message' 		=> "Mail Sent.",
					'result'  		=> $string	
				];
				$data = array(
					'Status'  	=> 3,
					'Result'  	=> json_encode($response)
				);			
				$this->db->where('Unique', $EmailUnique);
				$this->db->update('email_messages', $data);	
			} else { 
				$status = 4;
				$failed_count = ($this->session->userdata("failed_count") + 1);
				$this->session->set_userdata("failed_count",$failed_count);		
				$msg['Error'] 	= "Mail Not Sent.";
				$string		 	= (strstr($string,'"535-5.7.8',true))?str_replace('"535-5.7.8','',strstr($string,'"535-5.7.8')):$string;
				$string		 	= (strstr($string,'['))?strstr($string,'[',true):$string;			
				$string		 	= (strstr($string,'Learn more',true))?strstr($string,'Learn more',true):$string;
				$msg['Reason'] 	= $string;
				$response = [
					'status'  		=> 'Error',
					'send_status'  	=> $status,
					'message' 		=> $msg,
					'result'  		=> $string,
					'failed_count' 	=> $failed_count
				];

				$data = array(
					'Status'  	=> 4,
					'Result'  	=> json_encode($response)
				);		
				$this->db->where('Unique', $EmailUnique);
				$this->db->update('email_messages', $data);
			} 
			if(!empty($files) && isset($_FILES['file']['name'])):
				foreach ($_FILES['file']['name'] as $f => $name):
					$file = $file_path.trim($name);
					if(file_exists($file)):
						@unlink($file);
					endif;
				endforeach;	
			endif;		
        } else {
			$failed_count = ($this->session->userdata("failed_count") + 1);
			$this->session->set_userdata("failed_count",$failed_count);			
            $response = [
                'status'  		=> 'error',
                'message' 		=> $validations['message'],
                'failed_count' 	=> $failed_count
            ];
			$data = array(
				'Status'  	=> 4
			);			
			$this->db->where('Unique', $EmailUnique);
			$this->db->update('email_messages', $data);         			
        }
        
        echo json_encode($response);
    }

    private function validate_mail($data) {
        $success = true;
        $message = [];
		if (is_null($data["Name"]) || $data["Name"] ==''){
            $success = false;
            $message['Name'] 	= 'Can\'t send email.';
            $message['Reason']  = 'Name is empty.';
        }
 		$regex ='/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/';
		if (!preg_match($regex, $data["To"]) || empty($data["To"]))
		{
            $success = false;
            $message['To'] 		= 'Can\'t send email.';
			$message['Reason'] 	= 'Recipient Mail Missing or Incorrect.';
		}

		if (!preg_match($regex, $data["Cc"]) || !empty($data["Cc"]))
		{
            $success = false;
            $message['Cc'] 		= 'Can\'t send email.';
            $message['Reason'] 	= 'Cc Mail Incorrect.';
		}
		if (!preg_match($regex, $data["Bcc"]) && !empty($data["Bcc"]))
		{
            $success = false;
            $message['Bcc'] 	= 'Can\'t send email.';
            $message['Reason'] 	= 'Bcc Mail Incorrect.';
        }

		if (is_null($data["Subject"]) || $data["Subject"]=='')
		{
            $success = false;
            $message['Subject'] = 'Can\'t send email.';
            $message['Reason'] 	= 'Subject must be enter.';
        }

 		$return = [
            'success' 	=> true,
            'message' 	=> $message
        ];

        return $return;
    }
}