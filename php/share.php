<?php
	/*user info & multiple recipients*/
	$email = (string) $_POST['email'];
	$msg = (string) $_POST['message'];
	$lan = (string) $_POST['lan'];
	$sender = $_POST['owner'];
	$hash_string = hash('md5', $_POST['group'].$_POST['owner'],FALSE);
	//*****************************This link is hard coded**************/
	$link = 'http://hhao.hostei.com/shareculator/index.php?Id='.$hash_string; //default
	if($lan == 'cn'){$link = 'http://hhao.hostei.com/shareculator/index_cn.php?Id='.$hash_string;}	

	/*format multiple email addresses*/
	$to  = ''; 
	$email_array = explode(",",trim($email)); // an array of multiple email addresses
	foreach ($email_array as &$value) {
	    $to .= $value.', '; // multiple email
	}
	$to .= $sender;

	/* subject */
	$subject = 'Your friend ('.$sender.') shared a ShareCulator Bill with you!';

	/* message */
	$message = '
	<html>
		<head>
		  <title>Your friend shared a ShareCulator Bill with you</title>
		</head>
		<body>
		  <a href="http://hhao.hostei.com/shareculator/index.php" style="text-decoration:none;"><img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span></a>
		  <br/><br/>
		  <p id="msg" style="font-style: italic; font-size:16px; color:#484848; margin-left:20px;"> "'.$msg.'"  -- '.$_POST['group'].' </p>
		  <p style="color:#626262; margin-left:20px;"><a href="'.$link.'" style="color:#19a5c8;text-decoration:none;font-weight:bold;">Click here</a> to check the bill, or copy the URL ("'.$link.'") to your browser to check.</p>
		  <br/>
		  <p style="color:#626262; margin-left:20px;"> -- ShareCulator is an Open-source online share calculator. It allows multiple user access and edit a shared list of payments, and calculate the final payment that each sharer should pay.
		      ShareCulator is easy to load, save and share, and support graphic chart and finance analyze. </p>
		  <p style="color:#626262; margin-left:20px;"><a href="http://hhao.hostei.com/shareculator/index.php" style="color:#ffffff;text-decoration:none;font-weight:bold;background-color:#19a5c8;padding:6px 16px; border: #19a5c8 solid 1px; border-radius:4px;width:120px; box-shadow: 0 1px gray;">ShareCulator</a>  Try it now.</p>
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

	/* Mail it */
	mail($to, $subject, $message, $headers);

	echo "Shared with ".$email;
?>
