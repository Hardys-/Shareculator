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
<script type="text/javascript" src="js/talk.js"></script>
<script type="text/javascript" src="js/index_cn.js"></script>
<script type="text/javascript" src="js/lib/jquery_json.js"></script>
<input id="lan" type="text" value="cn">
<img id="logo" src="http://hhao.hostei.com/shareculator/pic/logo.png"/> <span style="font-size: 8px;vertical-align: 7px; color: #a6a6a6;">Beta</span>

<p class ="title">   请选择一个开始 | <a href="index.php" class="nolink"><span id="changeLan"  class="menu" > 设置语言为 English </span></a> | <a href="" class="nolink"><span class="menu"> 第一次使用 ShareCulator?<span></a></p>
<div id="front-panel">
	<input id="logInButton" class="submit" type="submit" value="载入"> 或 
	<input id="createButton" class="submit" type="submit" value="新建">
</div>
<div id="login-panel">
		<div class="contact-form" id="contact-form" >
			<input class="input-text" type="text" name="user" placeholder="群名称"><b class="contact-required-field">&nbsp;*</b>
			<input class="input-text" type="text" name="pw" placeholder="群主邮箱"><b class="contact-required-field">&nbsp;*</b>
			<input id="login" class="submit" type="submit" value="登录">
		</div>
</div>
<div id = "main-panel">
	<div id="frame">
		<div id="user">
			<input id="addSharerButton" class="submit main-panel-button" type="submit" value="加入用户">&nbsp;&nbsp;
			<input id="saveButton" class="submit main-panel-button" type="submit" value="保存">&nbsp;&nbsp;
			<input id="shareButton" class="submit main-panel-button" type="submit" value="分享">&nbsp;&nbsp;	
		</div>
		<hr class="line" />
		<div id="opera">
			<select id="sharer">
				<option value="1" selected >请先添加一个用户</option>
			</select>	
			支付
			<input id="amount" class="input-text" type="text" name="amount" placeholder="金额"> 
			<input id="memo" class="input-text" type="text" name="amount" placeholder="备注">&nbsp;
			<div id="opera-button">
				<input id="addMoneyButton" class="submit main-panel-button" type="submit" value="记一笔">&nbsp;
				<input id="undoButton" class="submit main-panel-button" type="submit" value="撤销">&nbsp;
				<input id="checkOutButton" class="submit main-panel-button" type="submit" value="结算">
			</div>
			<div id="sharer-list">
			
			</div>
		</div>
		<div id="list"></div>

	</div>
	<div id="myCanvas">
	
	</div>
</div>
<hr id="bottom"/> <br/>
<p id ="copyright">版权所有 Copyright &#169;2015 Hao Hu, under the MIT License.</p>
<div id="add-sharer-panel">
	<input id="addNewSharerText"class="input-text" type="text" name="newSharer" placeholder="名字">&nbsp;&nbsp;
	<input id="addNewSharerButton" class="submit main-panel-button" type="submit" value="添加">
	<input id="addNewSharerCancelButton" class="submit main-panel-button" type="submit" value="X">
</div>

<div id="save-panel">
	群名:
	<input id="groupNameText"class="input-text" type="text" name="groupName" placeholder="为您的群组取个名字">&nbsp;群主邮箱:
	<input id="ownerNameText"class="input-text" type="text" name="ownerpName" placeholder="群主邮箱">&nbsp;
	<input id="savetoButton" class="submit main-panel-button" type="submit" value="保存">
	<input id="saveCancelButton" class="submit main-panel-button" type="submit" value="X">
</div>

<div id="share-panel">
	&nbsp;邮件地址（以逗号分隔）:<input id="shareCancelButton" class="submit main-panel-button" type="submit" value="X"><br/>
	<input id="shareEmailText"class="input-text" type="text" name="shareEmailText" placeholder="name1@example.com, name2@example.com"><br/>
	<textarea id="shareMessage"class="input-text" type="text" name="shareMessage">Hello! 我想把这个账单分享给你。</textarea><br/>
	<input id="sharetoButton" class="submit main-panel-button" type="submit" value="分享">
</div>

<div id="msg"></div>
</body>
</html>


