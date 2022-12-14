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
if (empty($_POST['user_id'])) {
    $error_code    = 3;
    $error_message = 'user_id (POST) is missing';
}
if (empty($_POST['request_action'])) {
    $error_code    = 4;
    $error_message = 'request_action (POST) is missing';
} else {
    if (!in_array($_POST['request_action'], array('accept', 'decline'))) {
        $error_code    = 5;
        $error_message = 'Incorrect value for (request_action), allowed: accept|decline';
    }
}

if (empty($error_code)) {
    $recipient_id   = Wo_Secure($_POST['user_id']);
    $recipient_data = Wo_UserData($recipient_id);
    if (empty($recipient_data)) {
        $error_code    = 6;
        $error_message = 'Recipient user not found';
    } else {
        $request = false;
        if ($_POST['request_action'] == 'accept') {
            $request = Wo_AcceptFollowRequest($recipient_id, $wo['user']['user_id']);
        }
        if ($_POST['request_action'] == 'decline') {
            $request = Wo_DeleteFollowRequest($recipient_id, $wo['user']['user_id']);
        }
        if ($request) {
            $response_data = array(
                'api_status' => 200
            );
        }
    }
}