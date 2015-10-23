<?php
$name = $_POST['group'];
$owner = $_POST['owner'];
$json =  stripcslashes($_POST['json']);
$myfile = fopen('data/'.$name.$owner.'.json', "w") or die("Unable to open file!");//depande on the user info
fwrite($myfile, $json);
fclose($myfile);
echo "success!";
?>
