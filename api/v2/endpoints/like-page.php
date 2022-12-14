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
if (empty($_POST['page_id'])) {
    $error_code    = 3;
    $error_message = 'page_id (POST) is missing';
}
if (empty($error_code)) {
    $page_id   = Wo_Secure($_POST['page_id']);
    $page_data = Wo_PageData($page_id);
    if (empty($page_data)) {
        $error_code    = 6;
        $error_message = 'Page not found';
    } else {
    	$like_message = 'invalid';
        if (Wo_IsPageLiked($page_id, $wo['user']['user_id']) === true) {
            if (Wo_DeletePageLike($page_id, $wo['user']['user_id'])) {
                $like_message = 'unliked';
            }
        } else {
            if (Wo_RegisterPageLike($page_id, $wo['user']['user_id'])) {
                $like_message = 'liked';
            }
        }
        $response_data = array(
		    'api_status' => 200,
		    'like_status' => $like_message
		);
    }
}