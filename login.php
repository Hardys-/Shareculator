<?php
	$REMOTE_IP = $_SERVER['REMOTE_ADDR']
	$first = $_POST['user'];
	$last = $_POST['pw'];
//	$xml = simplexml_load_file('message.xml');




?>
<!DOCTYPE html>
<html lang="en">
<title>Send a message</title>

<body>
	<main>
	<div class="message">
		<p>Thank you <?php echo $first; ?></p>
		<p>your ip is: <?php echo $REMOTE_IP?></p>
	</div>
	</main>
</body>
