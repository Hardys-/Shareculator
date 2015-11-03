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
	$subject = 'Your friend ('.$sender.') shared a ShareCulator Bill with you!';

	/* message */
	$message = '
	<html>
		<head>
		  <title>Your friend shared a ShareCulator Bill with you</title>
		</head>
		<body>
		  <script src="http://code.jquery.com/jquery-1.11.1.js"></script>
		  <style>
		      .submit{
		      -webkit-appearance: none;
		      -moz-appearance: none;
		      appearance: none;
		      font-family:Calibri;
		      font-size:14px;
		      padding:3px 18px;
		      color: #ffffff;
		      background-color:#19a5c8;
		      border: #19a5c8 solid 1px;
		      border-radius:4px;
		      width:120px;
		      box-shadow: 0 1px gray;
		      }

		      .submit:hover{cursor:pointer;}
		      a{color:#19a5c8;text-decoration:none;font-weight:bold;}
		      a:hover{color:#fe6161}
	 	      p{color:#626262; margin-left:20px;}
		      #msg{font-style: italic; font-size:16px; color:#484848;}
		  </style>
		  <script>
		    $( document ).ready(function() {
		      $(".submit").hover(function(){
			  $(this).stop().animate({
			    opacity:"0.8"
			  },300); //default 800
		      },function(){
			  $(this).stop().animate({
			    opacity:"1"
			  }, 300);//default 800
		      })
		    })
		  </script>
		  <img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span>
		  <br/><br/>
		  <p id="msg"> "'.$msg.'"  -- '$_POST['group']' </p>
		  <p><a href="'.$link.'">Click here</a> to check the bill, or copy the URL ("'.$link.'") to your browser to check.</p>
		  <br/>
		  <p> -- ShareCulator is an Open-source online share calculator. It allows multiple user access and edit a shared list of payments, and calculate the final payment that each sharer should pay.
		      ShareCulator is easy to load, save and share, and support graphic chart and finance analyze. </p>
		  <p>Try <a href="http://hhao.hostei.com/shareculator/index.php"><input class="submit" type="submit" value="ShareCulator"></a> now.</p>
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
