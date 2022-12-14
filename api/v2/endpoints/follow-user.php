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
    'api_status' => 400,
);
if (empty($_POST['user_id'])) {
    $error_code    = 3;
    $error_message = 'user_id (POST) is missing';
}
if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
    	$follow_message = 'invalid';
        if (Wo_IsFollowing($recipient_id, $wo['user']['user_id']) === true || Wo_IsFollowRequested($recipient_id, $wo['user']['user_id']) === true) {
            if (Wo_DeleteFollow($recipient_id, $wo['user']['user_id'])) {
                $follow_message = 'unfollowed';
            }
        } else {
            if (Wo_RegisterFollow($recipient_id, $wo['user']['user_id'])) {
                if (Wo_IsFollowRequested($recipient_id, $wo['user']['user_id'])) {
                    $follow_message = 'requested';
                }
                else{
                    $follow_message = 'followed';
                } 
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'follow_status' => $follow_message
		);
    }
}