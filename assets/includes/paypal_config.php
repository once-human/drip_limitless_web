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
require 'assets/libraries/PayPal/vendor/autoload.php';
$paypal = new \PayPal\Rest\ApiContext(
  new \PayPal\Auth\OAuthTokenCredential(
    $wo['config']['paypal_id'],
    $wo['config']['paypal_secret']
  )
);
$paypal->setConfig(
    array(
      'mode' => $wo['config']['paypal_mode']
    )
);