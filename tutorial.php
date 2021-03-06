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
<script type="text/javascript" src="js/tutorial.js"></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/lib/jquery_json.js"></script>
<input id="lan" type="text" value="en">
<img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span>

<div id = "main-panel">
	<div id="frame">
		<div id="user">
			<input id="addSharerButton" class="submit main-panel-button" type="submit" value="Sharer + ">&nbsp;&nbsp;
			<input id="saveButton" class="submit main-panel-button" type="submit" value="Save">&nbsp;&nbsp;
			<input id="shareButton" class="submit main-panel-button" type="submit" value="Share">&nbsp;&nbsp;
			<input id="printButton" class="submit main-panel-button" type="submit" value="Print">&nbsp;&nbsp;	
		</div>
		<hr class="line" />
		<div id="opera">
			<select id="sharer">
				<option value="1" selected >Add a sharer</option>
			</select>	
			paid
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
	<div id="Canvas">
		<div id="cnp" ></div>
		<div id="per" ></div>	
	</div>
</div>
<hr id="bottom"/>
<p id="copyright">Copyright &#169;2015 Hao Hu, under the MIT License.</p>
<div id="add-sharer-panel">
	<input id="addNewSharerText"class="input-text" type="text" name="newSharer" placeholder="Sharer Name">&nbsp;&nbsp;
	<input id="addNewSharerButton" class="submit main-panel-button" type="submit" value="Add">
	<input id="addNewSharerCancelButton" class="submit main-panel-button" type="submit" value="X">
</div>

<div id="save-panel">
	Group Name:
	<input id="groupNameText"class="input-text" type="text" name="groupName" placeholder="Pick up a name">&nbsp;Owner's Email:
	<input id="ownerNameText"class="input-text" type="text" name="ownerpName" placeholder="owner@example.com">&nbsp;
	<input id="savetoButton" class="submit main-panel-button" type="submit" value="Save">
	<input id="saveCancelButton" class="submit main-panel-button" type="submit" value="X">
</div>

<div id="share-panel">
	&nbsp;Email address:<input id="shareCancelButton" class="submit main-panel-button" type="submit" value="X"><br/>
	<input id="shareEmailText"class="input-text" type="text" name="shareEmailText" placeholder="name1@example.com, name2@example.com"><br/>
	<textarea id="shareMessage"class="input-text" type="text" name="shareMessage">Hey, I want to share this with you!</textarea><br/>
	<input id="sharetoButton" class="submit main-panel-button" type="submit" value="Share">
</div>

<div id="msg"></div>
</body>
</html>

