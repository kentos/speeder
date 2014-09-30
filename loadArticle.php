<?php
include_once 'app/article_parsers.php';

#sleep(2);

$url = $_GET['u'];
$data = parse($url);

header("Content-type: application/json");
echo json_encode($data);