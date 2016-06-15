var saved = false; // alert when quit without saving
var groupName = "";
var ownerName = "";
var language = ""; // set the language.
var checked = false;// check if already checked
var editName = ""; // to store the share name when edit
var isEditing = false; // edit status flag

function printOutJson(){
	var s1 = "Names: ";
	var s2 = "Costs: ";
	var s3 = "Payer: ";

	for(i = 0 ; i < jsonData.sharerName.length; i++){
		s1 += jsonData.sharerName[i]+", ";
	}

	for(i = 0 ; i < jsonData.sharerCosts.length; i++){
		s2 +="[";
		for(j =0; j < jsonData.sharerCosts[i].length ;j++ ){
			s2 += 	jsonData.sharerCosts[i][j]+","
		}
		s2 +="]";
	}

	for(i = 0 ; i < jsonData.payerList.length; i++){
		s3 += "[Payer: "+jsonData.payerList[i].payer+" | Consumer: ";
		for(j=0;j<jsonData.payerList[i].consumer.length ; j++){
			s3 += jsonData.payerList[i].consumer[j] + ", ";
		}
		s3 += " | Amount:"+ jsonData.payerList[i].amount+" ]"
	}
	console.log(s1);
	console.log(s2);
	console.log(s3);
}

function changeSharerName(editName, newName) {
	// update sharerNames
	for(i = 0 ; i < jsonData.sharerName.length; i++){
		if(jsonData.sharerName[i] === editName) {
			jsonData.sharerName[i] = newName;
		}
	}
	// update payerList: payer and consumer
	for(i = 0 ; i < jsonData.payerList.length; i++){
		if(jsonData.payerList[i].payer === editName) {
			jsonData.payerList[i].payer = newName;
		}
		for(j=0;j<jsonData.payerList[i].consumer.length ; j++){
			if (jsonData.payerList[i].consumer[j] === editName) {
				jsonData.payerList[i].consumer[j] = newName;
			}
		}
	}
	// update UI
	$("#list").fadeOut(300, function(){
		updateList();
	}).fadeIn(300);

}

function addMoney(){
	/*find out who paid this money*/
	var payer = $("#sharer :selected").val();
	var newAmount = $("#amount").val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string
    	newAmount = newAmount.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\,|\<|\>|\||\\|\&/g, "");
	if(isNaN(parseFloat(newAmount))){notification("This input is invalid",0); return;}
	if($( "input:checked" ).length == 0){notification("You need at least one sharer to share!",0); return;}
	var val = parseFloat(newAmount) ;
	var num = $( "input:checked" ).length;
	var payment ={"payer":"","consumer":[],"amount":"","memo":""};
	payment.payer = payer;

	/*find out who consumed this money, and add to their List*/
	var ranPayer = Math.floor((Math.random() * num)+1) // if payment not divisible, find random cosumer to pay.
	var remMoney = (val - num*(val/num).toFixed(2)).toFixed(2);
	var payerCount = 1;
	for(i =0 ; i< jsonData.sharerName.length; i++){
		if($("#"+jsonData.sharerName[i]).prop("checked")){//charge on include person
			payment.consumer.push(jsonData.sharerName[i]);
			if(payerCount == ranPayer){ //find the random payer
				var costValueTemp =  parseFloat((val/num).toFixed(2)) + parseFloat(remMoney);
				jsonData.sharerCosts[i].push(costValueTemp);
			}else{
				jsonData.sharerCosts[i].push(parseFloat((val/num).toFixed(2)));
			}
			payerCount ++;
		}else{
			jsonData.sharerCosts[i].push(0); //not include
		}
	}

	/*update cost*/
	payment.amount = val;
	payment.memo = $("#memo").val();
	jsonData.payerList.push(payment);
	updateList();

}

function undo(){
	/*delete latest record:sharerCosts[0-length].lastValue, payerList[length-1]*/
	for(i=0; i<jsonData.sharerCosts.length;i++){  //Traversal every sharer's cost and remove last one
		jsonData.sharerCosts[i].splice([jsonData.sharerCosts[i].length-1]);
	}

	jsonData.payerList.splice([jsonData.payerList.length-1]);
	updateList();

}

function checkOut(){
	// printOutJson();
	var totalPaid = [];
	var totalCost = [];
       	checkoutResult = []; // reset

	for(i=0;i < jsonData.sharerName.length; i++){ //add each sharer's cost to totalCost
		var personalCost = 0;
		totalPaid.push(0);
		for(j = 0; j < jsonData.sharerCosts[i].length; j++){//iteration each cost
			personalCost += jsonData.sharerCosts[i][j];
		}
		totalCost.push(personalCost);
	}

	for(i = 0; i< jsonData.payerList.length; i++){// check each payment
		for(j =0; j< jsonData.sharerName.length;j++){ // add to totalPaid[sharer], if the payer's name is correct.
			if(jsonData.payerList[i].payer == jsonData.sharerName[j]){ totalPaid[j] += jsonData.payerList[i].amount; continue;}
		}

	}

	var htmlStringLine1 ="<tr class=\"tableTotalCost\"><td></td><td>Total cost:</td>";
	var htmlStringLine2 ="<tr class=\"tableTotalPaid\"><td></td><td>Total paid:</td>";
	var htmlStringLine3 ="<tr class=\"tableResult\"><td></td><td></td>";
    	for(i = 0; i< totalPaid.length;i++){
		htmlStringLine1+="<td>"+totalCost[i].toFixed(2)+"</td>";
		htmlStringLine2+="<td>"+totalPaid[i].toFixed(2)+"</td>";
		htmlStringLine3+="<td>"+(totalPaid[i] - totalCost[i]).toFixed(2) +"</td>";
		checkoutResult.push({"name":jsonData.sharerName[i],"val":(totalPaid[i] - totalCost[i]).toFixed(2)});
	}
	htmlStringLine1 +="<td></td></tr>";
	htmlStringLine2 +="<td></td></tr>";
	htmlStringLine3 +="<td></td></tr>";

	$("#paymentTable").append(htmlStringLine1 + htmlStringLine2 + htmlStringLine3 );
	$(".tableTotalCost td").css({"border-top": "#fe6161 solid 1px",	"color": "#fe6161",	"font-size": "16px","font-weight": "bold","padding-top": "12px"});
	$(".tableTotalPaid td").css({"color": "#1daf99","font-size": "16px","font-weight": "bold","padding-top": "6px"});
	$(".tableResult td").css({"color": "#19a5c8","border-top": "#19a5c8  solid 1px","font-size": "16px","font-weight": "bold","padding-top": "12px"});
	recommendation();
}

// check if the name already existed
function isExistName(newName) {

	for(i = 0; i < jsonData.sharerName.length; i++ ){
		if(jsonData.sharerName[i] == newName){
			notification("Sharer \""+newName+"\" already exsited!",0);
			return true;
		}
		if(i == 7){
			notification("You can only add at most 8 Sharer",0);
			return true;
		} // the limitation of # of sharers.
	}
	// not existed, not exceed
	return false;
}

function add(){
	var newName = $("#addNewSharerText").val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string e.g. no space allowed since the jquery will not recognize them
	newName = newName.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\.|\,|\<|\>|\||\\|\&/g, "");
	/*check if name is available*/
	if( !isExistName(newName) ) {
		/*add options*/
		var optionString = "<option value=\""+newName+"\" selected>"+newName+"</option>";

		if($("#sharer :selected").text() == "Add a sharer"){
			$("#sharer").html(optionString);
			$("#sharer-list").append("Shared with &nbsp;");
		}else{
			$("#sharer").append(optionString);
		}

		/*add checkbox label and edit input*/
		var checkboxString = "<input type=\"checkbox\" id=\""+$("#sharer :selected").val()+
			"\" value=\"" + $("#sharer :selected").val() + "\" class=\"sharerCheckbox\" checked>" +
			"<input type='text' class='input-text sharerEdit' value=\"" + $("#sharer :selected").val() + "\">" +
			"<label class=\"sharerLabel\">"+
			$("#sharer :selected").val() + "</label>";

		$("#sharer-list").append(checkboxString);

		/*send notification*/
		if( $("#sharer :selected").text() == newName){
			notification(newName+" has been added",1);
		}

		/*add data to json & sharer class*/
		var costArray = [];
		jsonData.sharerName.push(newName);

		if(jsonData.sharerCosts.length == 0 ){ //initialization
			jsonData.sharerCosts.push(costArray);
		}
		else{
			for(i =0; i<jsonData.sharerCosts[0].length;i++){ //full fill
				costArray.push(0);
			}
			jsonData.sharerCosts.push(costArray);
		}

		/*finish adding*/
		$("#add-sharer-panel").fadeOut(300);
		$("#addNewSharerText").val("");
	}
}


function updateList(){ //updated when new data added or load a json
	//updateList();
	var htmlString = "";
	var htmlTitle  = "<tr><th> No. </th><th> Amount </th><th>";
	var totalAmount= 0;

	for(i=0;i < jsonData.sharerName.length; i++){// add each sharer's name to table header: <th></th>
		htmlTitle += jsonData.sharerName[i] + "</th><th>";
	}
	htmlTitle +="Memo</th></tr><br/>";

	for(i = 0 ; i < jsonData.sharerCosts[0].length ; i++){// add the detail of each payment, format a line
		var htmlLine = "<td>";
		for(j = 0 ; j < jsonData.sharerName.length ; j++){ // this is each line formatted by <tr><td></td>....</tr>
			if(jsonData.sharerCosts[j][i]=="0"){
				htmlLine += "</td><td>"; //no display on table if it is 0;
			}else{
				htmlLine += jsonData.sharerCosts[j][i]+"</td><td>";
			}

		}
		var htmlMemo = jsonData.payerList[i].payer+": "+ jsonData.payerList[i].memo+"<span class='recordNumber'>"+i+"</span><span class='deletePayment'>X</span></td></tr>";
		totalAmount = jsonData.payerList[i].amount;
		htmlString += "<tr><td>"+(i+1)+" </td><td><span>&#36;</span> "+totalAmount+"</td>" + htmlLine + htmlMemo; //format of each row in table
		totalAmount = 0;
	}

	$("#list").html("<table id=\"paymentTable\">"+htmlTitle+htmlString+"</table>"); //content of the table

	//reset position
	if($("#paymentTable").height()>300){
		var h = $("#paymentTable").height() - $(window).height()/5;
		$("#bottom").css({"position":"static","margin-top":h+"px"});
		$("#copyright").css({"position":"static"});
	}
	if($("#paymentTable").height()<300){
		$("#bottom").css({"position":"absolute","margin-top":"8px"});
		$("#copyright").css({"position":"absolute","margin-top":"12px"});
	}

}

function notification(str,flag){//(notification string, 0: ! mark / 1: correct mark)
      var htmlString ="";
      if(flag){
          htmlString = "<p class = \"msg-content\">&nbsp;&nbsp;<span class=\"attention1\">&#10003</span>&nbsp;&nbsp;"+str+"</p>";
      }else{
          htmlString = "<p class = \"msg-content\">&nbsp;&nbsp;<span class=\"attention2\">!</span>&nbsp;&nbsp;"+str+"</p>";
      }
      $("#msg").html(htmlString);
      if(detectmob()){
        $("#msg").stop().fadeIn( 1000 ).fadeOut( 2000 );
        $("#msg p").css({"font-size":"4em","margin-top":"1%"});
        $("#msg span").css({"height":"50px","width":"50px","line-height":"1em","font-size":"1em"});
      }else{
        $("#msg").css({"position":"fixed","width":"20%","left":"40%","top":"40px"});
        $("#msg").stop().fadeIn( 1000 ).fadeOut( 2000 );
      };
}

function detectmob() {//detect what mobile type the user is using.
   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
      return true;
    }
   else {
      return false;
    }
}



$( document ).ready(function() {
	/*URL string query: if this page contain json data*/
	urlQueryLoad();
	language = $("#lan").val();//read page language

	$(".submit").hover(function(){
			$(this).stop().animate({
				opacity:"0.8"
				},300); //default 800
			},function(){
				$(this).stop().animate({
				opacity:"1"
			}, 300);//default 800
	});

	/*Front-page buttons*/

	$("#logInButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#login-panel").fadeIn(300);})
		$("p.title").html("Please enter Group name and Owner Name:");
	});

	$("#createButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#main-panel").fadeIn(300);$("p.title").css({"display":"none"});})
		notification("Remember do not include personal information!",0);
	});

	$("#login").click(function(){//default 800
		if($("input[name='user']").val() == ""){notification("Group name cannot be empty!",0);return;}
		else if($("input[name='pw']").val() =="" ){notification("Owner name cannot be empty!",0);return;}
		else if(!checkEmail($("input[name='pw']").val())){notification("Please enter a valid email address!",0);return;}
		loadData($("input[name='user']").val(),$("input[name='pw']").val());
	});

	/*Create new buttons*/

	/*----------------add functions----------------*/
	$("#addSharerButton").click(function(){// open add sharer panel
		/*add panel*/
    $("#add-sharer-panel").css({"position":"absolute","left":"30%","top":"50%"});
		$("#add-sharer-panel").fadeIn(300);//default 800
		$("#addNewSharerText").focus();
	});

	$("#addNewSharerButton").click(function(){ //add new sharer
		if($("#addNewSharerText").val() != ""){
			add();
			if(saved == true){saved = false;document.title = "* " + document.title;}//check new actions after saving
		}else{
			notification("Please type in a name",0);
		}

	});

	$("#addNewSharerCancelButton").click(function(){ //exit current panel
		$("#add-sharer-panel").fadeOut(300);
		$("#addNewSharerText").val("");
	});

	/*----------------save functions----------------*/
	$("#saveButton").click(function(){// open save panel
		if( ownerName == "" || groupName == ""){  //did not saved
			$("#save-panel").css({"position":"absolute","left":"28%","top":"3%"});
			$("#save-panel").fadeIn(300);//default 800
			$("#groupNameText").focus();
		}else{
			saveData(groupName,ownerName,0); // Resave, not a new record
		}
	});

	$("#savetoButton").click(function(){ //confirm save
		if($("#groupNameText").val() == ""){notification("Please pick up a name for your group!",0);return;};
		if(!checkEmail($("#ownerNameText").val())){notification("Please enter a valid email address!",0);return;}
		saveData($("#groupNameText").val(), $("#ownerNameText").val(),1);//add a new user
	});

	$("#saveCancelButton").click(function(){//exit current panel
		$("#save-panel").fadeOut(300);
		$("#groupNameText").val("");
	});

	/*----------------share functions----------------*/
	$("#shareButton").click(function(){// open share panel
		if( saved == false || ownerName == "" || groupName == ""){  //did not save
			$("#save-panel").css({"position":"absolute","left":"28%","top":"3%"}).fadeIn(300);//default 800
			$("#groupNameText").focus();
			return;
		}else {
			$("#share-panel").css({"position":"absolute","left":"28%","top":"25%"}).fadeIn(300);//default 800
			$("#shareEmailText").focus();
		}
	});

	$("#sharetoButton").click(function(){// share
		if(!checkEmailList($("#shareEmailText").val())){notification("One or more email address is invalid!",0);return;}
		share();
		$("#share-panel").fadeOut(300);//default 800
	});

	$("#shareCancelButton").click(function(){ //exit current panel
		$("#share-panel").fadeOut(300);
		$("#shareEmailText").val("");
		$("#shareMessage").val("");
	});

	/*-----------------print function------------------*/
	$("#printButton").click(function(){
		window.print();
	});

	/*----------------operation functions----------------*/

	// set listenr when editing the sharer name
	$('#sharer-list').on('click', ".sharerLabel", function(){
		if(!isEditing) {
			editName = $(this).text();
			$(this).css({"display" : "none"});
			$(this).prev(".sharerEdit").css({"display": "inline"}).select();
			isEditing = true;
		}
	});

	// set listener when press enter to confirm change name
	$('#sharer-list').on('keypress', ".sharerEdit", function(e){
		// get new name and format it
		var newName = $(this).val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string e.g. no space allowed since the jquery will not recognize them
		newName = newName.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\.|\,|\<|\>|\||\\|\&/g, "");

		// press enter to finish edit, either not exist OR no change can pass
		if (e.keyCode == 13 && (newName == editName || !isExistName(newName) )) {
			// change id & value
			$(this).prev(".sharerCheckbox").attr({
				"id": newName,
				"value": newName
			});

			// change label and display
			$(this).css({
				"display": "none"
			}).next(".sharerLabel").css({
				"display": "inline"
			}).text(newName);

			$("#sharer option[value='"+editName+"']").val(newName).text(newName);

			changeSharerName(editName, newName);

			// edit complete, set attributes
			if(saved == true){saved = false;document.title = "* " + document.title;}//check new actions after saving
			isEditing = false;
			editName = '';
		}
	});

	$("#addMoneyButton").click(function(){// open add sharer panel
		if( $("#sharer :selected").text() == "Add a sharer"){notification("Please add a sharer first",0)}
		else if($("#amount").val() == ""){notification("Please enter the amount he/she paid",0)}
		else{
			addMoney();
			checked = false;
			if(saved == true){saved = false;document.title = "* " + document.title;}//check new actions after saving
		}
	});


	$("#undoButton").click(function(){// open add sharer panel
		undo();
		checked = false;
		if(saved == true){saved = false;document.title = "* " + document.title;}//check new actions after saving
	});


	$("#checkOutButton").click(function(){// open add sharer panel
		if(!checked){
			checkOut();
			checked = true;
		}
	});


	$("#addNewSharerText").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#addNewSharerButton").click();
        	}
	});

	/*press enter to save*/
	$("#groupNameText").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#savetoButton").click();
        	}
	});

	$("#ownerNameText").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#savetoButton").click();
        	}
	});
	/*--press enter to save--*/

	/*press enter to load*/
	$("input[name='user']").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#login").click();
        	}
	});

	$("input[name='pw']").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#login").click();
        	}
	});
	/*--press enter to load end--*/

	/*warning before leave*/
	window.onbeforeunload = confirmExit;
    	function confirmExit() {
       		if(saved == false && groupName != "" ){
			return  'You have been editing something without saving it. \n\n'
			+ 'If you leave before saving, your changes will be lost.';
		}
		else if(saved == false && jsonData.sharerName.length > 0) {//User has some action and file not saved
			return  'Are you sure you want to leave this page?';
		}
  	}

	/*Reset opera panel position when scrolling down*/
	$(window).scroll(function() {
    		if ($(this).scrollTop() > 100) {
			$("#opera").stop().animate({
		       	        padding: '10px 15px',
			        opacity: '0.85',
			       	top:'20px'
			}).css({"position": 'fixed',"box-shadow": '4px 4px 10px #888888',"background-image": 'url("pic/bg.png")'});
		}

		if ($(this).scrollTop() < 100) {
			$("#opera").stop().animate({
		       	  padding:'0px 0px',
			        opacity: '1'
			}).css({"position": 'static',"box-shadow": 'none',"background-image": 'none',"margin-top": "40px"});
		}
	});

// testing
	$("#printJson").click(function(){
		printOutJson();
	});

	$("#list").on("click", ".deletePayment", function(){

		// get the record number
		var rNum = parseInt($(this).prev(".recordNumber").text());
		if (Number.isInteger(rNum)){
			$(this).parent().parent().stop().fadeOut(300, function(){
				// need a confirm button
				deleteRecordByNumber(rNum);
				updateList();
				// set unsaved
				if(saved == true){saved = false;document.title = "* " + document.title;}//check new actions after saving
			});
		}
	});


	function deleteRecordByNumber(num){
		// delete every one's cost record by given num
		for(i = 0 ; i < jsonData.sharerCosts.length; i++) {
			if(num <= jsonData.sharerCosts[i].length) {
				jsonData.sharerCosts[i].splice(num, 1);
			}
		}

		// delete total payment record by given num
		if (num <= jsonData.payerList.length) {
			jsonData.payerList.splice(num, 1);
		}
	}
// testing

});



/*Copyright Hao Hu, MIT LICENSE*/
