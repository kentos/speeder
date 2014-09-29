<?php

sleep(2);

$url = $_GET['u'];
$html = file_get_contents($url);
$html = strip_tags($html);

echo $html;