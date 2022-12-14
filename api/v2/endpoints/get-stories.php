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
$stories = array();

$options['limit'] = (!empty($_POST['limit'])) ? (int) $_POST['limit'] : 35;
$options['api'] = true;

$get_all_stories = Wo_GetFriendsStatus($options);

foreach ($get_all_stories as $key => $one_story) {
    $is_muted = $db->where('user_id',$wo['user']['id'])->where('story_user_id',$one_story['user_id'])->getValue(T_MUTE_STORY,'COUNT(*)');
    if ($is_muted == 0 && $wo['user']['id'] != $one_story['user_id']) {
        $get_stories = Wo_GetStroies(array('id' => $one_story['id']));
        foreach ($get_stories as $key => $story) {
            foreach ($non_allowed as $key => $value) {
               unset($story['user_data'][$value]);
            }
            if (!empty($story['thumb']['filename'])) {
                $story['thumbnail'] = $story['thumb']['filename'];
                unset($story['thumb']);
            } else {
                $story['thumbnail'] = $story['user_data']['avatar'];
            }
            $stories[] = $story;
        }
    } 
}

$response_data = array(
    'api_status' => 200,
    'stories' => $stories
);