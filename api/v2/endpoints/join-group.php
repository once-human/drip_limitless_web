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
if (empty($_POST['group_id'])) {
    $error_code    = 3;
    $error_message = 'group_id (POST) is missing';
}
if (empty($error_code)) {
    $group_id   = Wo_Secure($_POST['group_id']);
    $group_data = Wo_GroupData($group_id);
    if (empty($group_data)) {
        $error_code    = 6;
        $error_message = 'Group not found';
    } else {
    	$join_message = 'invalid';
        if (Wo_IsGroupJoined($group_id) === true || Wo_IsJoinRequested($group_id, $wo['user']['user_id']) === true) {
            if (Wo_LeaveGroup($group_id, $wo['user']['user_id'])) {
                $join_message = 'left';
            }
        } else {
            if (Wo_RegisterGroupJoin($group_id, $wo['user']['user_id'])) {
                if ($group_data['join_privacy'] == 2) {
                    $join_message = 'requested';
                }
                else{
                    $join_message = 'joined';
                }
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'join_status' => $join_message
		);
    }
}