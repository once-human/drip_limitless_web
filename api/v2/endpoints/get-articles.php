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
$articles = array();

$options['limit'] = (!empty($_POST['limit'])) ? (int) $_POST['limit'] : 25;
$options['offset'] = (!empty($_POST['offset'])) ? (int) $_POST['offset'] : 0;
$options['user_id'] = (!empty($_POST['user_id'])) ? (int) $_POST['user_id'] : 0;
$options['category'] = (!empty($_POST['category'])) ? (int) $_POST['category'] : false;
$options['id'] = (!empty($_POST['article_id'])) ? (int) $_POST['article_id'] : 0;

$get_articles = Wo_GetBlogs($options);

foreach ($get_articles as $key => $article) {
    foreach ($non_allowed as $key => $value) {
       unset($article['author'][$value]);
    }
    $article['category'] = $wo['page_categories'][$article['category']];
    $article['posted'] = Wo_Time_Elapsed_String($article['posted']);
    $articles[] = $article;
}

$response_data = array(
    'api_status' => 200,
    'articles' => $articles
);