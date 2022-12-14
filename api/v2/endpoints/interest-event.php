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
if (empty($_POST['event_id'])) {
    $error_code    = 3;
    $error_message = 'event_id (POST) is missing';
}
if (empty($error_code)) {
    $event_id   = Wo_Secure($_POST['event_id']);
    $event_data = Wo_EventData($event_id);
    if (empty($event_data)) {
        $error_code    = 6;
        $error_message = 'event not found';
    } else {
    	$intreset_message = 'invalid';
        if (Wo_EventInterestedExists($event_id) === true) {
            if (Wo_UnsetEventInterestedUsers($event_id)) {
                $intreset_message = 'not-interested';
            }
        } else {
            if (Wo_AddEventInterestedUsers($event_id)) {
                $intreset_message = 'interested';
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'interest_status' => $intreset_message
		);
    }
}