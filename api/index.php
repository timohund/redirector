<?php
include "./redirectLoader.php";

header('Content-Type: application/json');
$loader = new redirectLoader;

if(isset($_GET["checkUrl"])) {
   echo $loader->checkUrlStatusCode($_GET["checkUrl"]);
} else {
    echo $loader->getUrlList();
}


