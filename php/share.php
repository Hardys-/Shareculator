<?php
	/*user info & multiple recipients*/
	$email = (string) $_POST['email'];
	$msg = (string) $_POST['message'];
	$sender = $_POST['owner'];
	$hash_string = hash('md5', $_POST['group'].$_POST['owner'],FALSE);
	$link = 'http://hhao.hostei.com/shareculator/index.php?Id='.$hash_string; //*****************************This link is hard coded***************** 

	/*format multiple email addresses*/
	$to  = ''; 
	$email_array = explode(",",trim($email)); // an array of multiple email addresses
	foreach ($email_array as &$value) {
	    $to .= $value.', '; // multiple email
	}
	$to .= $sender;

	/* subject */
	$subject = 'Your friend ('.$sender.') shared a ShareCulator Bill to you!';

	/* message */
	$message = '
	<html>
	<head>
	  <title>Your friend shared a ShareCulator Bill to you</title>
	</head>
	<body>
	  <img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span>
	  <br/><br/>
	  <p> &nbsp; '.$msg.'</p>
	  <p> &nbsp; Click <a href="'.$link.'">here</a> to check the bill.</p>
	  <p> &nbsp; Try <a href="http://hhao.hostei.com/shareculator/index.php">ShareCulator</a> now.</p>
	  <p> &nbsp; -- ShareCulator is an Open-source online share calculator. </p>
	</body>
	</html>
	';

	/* To send HTML mail, the Content-type header must be set */
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	/* Additional headers */
	$headers .= 'To: ';
	foreach ($email_array as &$value) {
	   $headers .= '<'.$value.'>, '; // multiple email
	}
	unset($value); 
	$headers .=$sender.' <'.$sender.'>'."\r\n";
	$headers .= 'From: '.$sender.' <'.$sender.'>' . "\r\n";
	//$headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
	///$headers .= 'Cc: birthdayarchive@example.com' . "\r\n";

	/* Mail it */
	mail($to, $subject, $message, $headers);

	echo "Shared with ".$email;
?>
