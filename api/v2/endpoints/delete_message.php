<?php
// +------------------------------------------------------------------------+
// | @author Onkar Yaglewad (Sparck Tech Pvt. Ltd.)
// | @author_url 1: https://www.drip.sparck.tk/yaglewad_onkar
// | @author_url 2: https://sparck.tk/founder
// | @author_email: founder@sparck.tk  
// +------------------------------------------------------------------------+
// | Drip Limitless - Connecting Mankind Together
// | Copyright (c) 2021-22 Sparck Tech Pvt. Ltd. All rights reserved.
// +------------------------------------------------------------------------+
$response_data = array(
    'api_status' => 400
);
if (!empty($_POST['message_id']) && is_numeric($_POST['message_id']) && $_POST['message_id'] > 0) {
	$message_id = Wo_Secure($_POST['message_id']);
    $message = $db->where('id',$message_id)->getOne(T_MESSAGES);
    if (!empty($message) && !empty($message_id) && is_numeric($message_id) && $message_id > 0) {
        if (Wo_DeleteMessage($message_id) === true) {
            $response_data = array(
                                'api_status' => 200,
                                'message' => 'message successfully deleted.'
                            );
        }
        else{
        	$error_code    = 6;
		    $error_message = 'something went wrong';
        }
    }
    else{
    	$error_code    = 5;
	    $error_message = 'message_id can not be empty';
    }
}
else{
	$error_code    = 4;
    $error_message = 'message_id can not be empty';
}