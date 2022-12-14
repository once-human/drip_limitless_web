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
if (!empty(Wo_GetUserFromSessionID($_GET['access_token']))) {
	$cookie = Wo_Secure($_GET['access_token']);
	$_SESSION['user_id'] = $cookie;
	setcookie("user_id", $cookie, time() + (10 * 365 * 24 * 60 * 60));
	header("Location: " . Wo_SeoLink('index.php?link1=get_news_feed'));
	exit();
}