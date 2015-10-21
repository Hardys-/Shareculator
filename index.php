<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" href="css/index.css">
<link rel="shortcut icon" href="pic/favicon.ico" >
<title>Shareculator</title>
</head>

<body>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script type="text/javascript" src="js/cal.js"></script>
<script type="text/javascript" src="js/index.js"></script>

<img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span>

<p class ="title">Please select one to begin. | Set English / Chinese <span id="lan" class="menu"> here</span>. | First time to use <span class="menu">ShareCulator?<span></p>
<div id="front-panel">
	<input id="logInButton" class="submit" type="submit" value="Load One"> or 
	<input id="createButton" class="submit" type="submit" value="Create One">
</div>
<div id="login-panel">
		<form class="contact-form" id="contact-form" action="login.php" method="post" onSubmit="return infoCheck(this)">
			<input class="input-text" type="text" name="user" placeholder="User"><b class="contact-required-field">&nbsp;*</b>
			<input class="input-text" type="text" name="pw" placeholder="Password"><b class="contact-required-field">&nbsp;*</b>
			<input id="login" class="submit" type="submit" value="Log In">
		</form>
</div>
<div id = "main-panel">
	<div id="frame">
		<div id="user">
			<input id="addSharerButton" class="submit main-panel-button" type="submit" value="Sharer + ">&nbsp;&nbsp;
			<input id="saveButton" class="submit main-panel-button" type="submit" value="Save">&nbsp;&nbsp;
			<input id="shareButton" class="submit main-panel-button" type="submit" value="Share">&nbsp;&nbsp;	
		</div>
		<hr class="line" />
		<div id="opera">
			<select id="sharer">
				<option value="1" selected >Add a sharer</option>
			</select>	
			paid <img src="http://hhao.hostei.com/shareculator/pic/edit_0.png"/>
			<input id="amount" class="input-text" type="text" name="amount" placeholder="Amount">for 
			<input id="memo" class="input-text" type="text" name="amount" placeholder="Memo">&nbsp;
			<div id="opera-button">
				<input id="addMoneyButton" class="submit main-panel-button" type="submit" value="Add">&nbsp;
				<input id="undoButton" class="submit main-panel-button" type="submit" value="Undo">&nbsp;
				<input id="checkOutButton" class="submit main-panel-button" type="submit" value="Check Out">
			</div>
			<div id="sharer-list">
			
			</div>
		</div>
		<div id="list"></div>

	</div>
	<div id="myCanvas">
	
	</div>
</div>
<hr class="line"/>
<p class="copyright">Copyright&#169;2015 Hardys Studio. All rights reserved.</p>
<div id="add-sharer-panel">
	<input id="addNewSharerText"class="input-text" type="text" name="newSharer" placeholder="Sharer Name">&nbsp;&nbsp;
	<input id="addNewSharerButton" class="submit main-panel-button" type="submit" value="Add">
	<input id="addNewSharerCancelButton" class="submit main-panel-button" type="submit" value="X">
</div>

<div id="msg"></div>
</body>
</html>

