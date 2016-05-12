var saved = false; //alrt when quit without saving
var groupName = "";
var ownerName = "";
var language = ""; //set the language.
var checked = false;//check if already checked 

function printOutJson(){
	var s1 = "Names: ";
	var s2 = "Costs: ";
	var s3 = "Payer: ";

	for(i = 0 ; i < jsonData.sharerName.length ; i++){
		s1 += jsonData.sharerName[i]+", ";
	}

	for(i = 0 ; i < jsonData.sharerCosts.length ; i++){
		s2 +="[";
		for(j =0; j < jsonData.sharerCosts[i].length ;j++ ){
			s2 += 	jsonData.sharerCosts[i][j]+","
		};
		s2 +="]";
	}

	for(i = 0 ; i < jsonData.payerList.length;i++){
		s3 += "[Payer: "+jsonData.payerList[i].payer+" | Consumer: ";
		for(j=0;j<jsonData.payerList[i].consumer.length ; j++){
			s3 += jsonData.payerList[i].consumer[j] + ", ";
		};
		s3 += " | Amount:"+ jsonData.payerList[i].amount+" ]"

	}
	console.log(s1);
	console.log(s2);
	console.log(s3);
}


function addMoney(){
	/*find out who paid this money*/
	var payer = $("#sharer :selected").val();
	var newAmount = $("#amount").val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string
    	newAmount = newAmount.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\,|\<|\>|\||\\|\&/g, "");
	if(isNaN(parseFloat(newAmount))){notification("您的输入数字无效！",0); return;}
	if($( "input:checked" ).length == 0){notification("您至少需要添加一个用户才能开始！",0); return;}
	var val = parseFloat(newAmount) ;
	var num = $( "input:checked" ).length;
	var payment ={"payer":"","consumer":[],"amount":"","memo":""};
	payment.payer = payer;
	 
	/*find out who consumed this money, and add to their List*/
	var ranPayer = Math.floor((Math.random() * num)+1) // if payment not divisible, find random cosumer to pay.
	var remMoney = (val - num*(val/num).toFixed(2)).toFixed(2);
	var payerCount = 1;
	for(i =0 ; i< jsonData.sharerName.length; i++){
		if($("#"+jsonData.sharerName[i]).prop("checked")){
			payment.consumer.push(jsonData.sharerName[i]);
			if(payerCount == ranPayer){ //find the random payer
				var costValueTemp =  parseFloat((val/num).toFixed(2)) + parseFloat(remMoney); 
				jsonData.sharerCosts[i].push(costValueTemp); 
			}else{
				jsonData.sharerCosts[i].push(parseFloat((val/num).toFixed(2))); 
			}
			payerCount ++;	 
		}else{
			jsonData.sharerCosts[i].push(0); 
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
	//printOutJson();
	var totalPaid = []; 
	var totalCost = [];
       	checkoutResult = []; // reset
	
	for(i=0;i < jsonData.sharerName.length; i++){ //add each sharer's cost to totalCost
		var personalCost = 0;
		totalPaid.push(0);
		for(j = 0; j < jsonData.sharerCosts[i].length; j++){//iteration each cost 
			personalCost += jsonData.sharerCosts[i][j];	
		};
		totalCost.push(personalCost);
	
	}

	for(i = 0; i< jsonData.payerList.length; i++){//check each payment 
		for(j =0; j< jsonData.sharerName.length;j++){ // add to totalPaid[sharer], if the payer's name is correct.
			if(jsonData.payerList[i].payer == jsonData.sharerName[j]){ totalPaid[j] += jsonData.payerList[i].amount; continue;}		
		}
		
	}

	var htmlStringLine1 ="<tr class=\"tableTotalCost\"><td></td><td>总花费:</td>";
	var htmlStringLine2 ="<tr class=\"tableTotalPaid\"><td></td><td>总支付:</td>";   
	var htmlStringLine3 ="<tr class=\"tableResult\"><td></td><td></td>"; 
    	for(i = 0; i< totalPaid.length;i++){
		htmlStringLine1+="<td>"+totalCost[i].toFixed(2)+"</td>";
		htmlStringLine2+="<td>"+totalPaid[i].toFixed(2)+"</td>";
		htmlStringLine3+="<td>"+(totalPaid[i] - totalCost[i]).toFixed(2) +"</td>";
		checkoutResult.push({"name":jsonData.sharerName[i],"val":(totalPaid[i] - totalCost[i]).toFixed(2)});
	}
	htmlStringLine1 +="<td></td><td></td></tr>";
	htmlStringLine2 +="<td></td><td></td></tr>";
	htmlStringLine3 +="<td></td><td></td></tr>";

	$("#paymentTable").append(htmlStringLine1 + htmlStringLine2 + htmlStringLine3 );
	$(".tableTotalCost td").css({"border-top":"#fe6161  solid 1px","color":"#fe6161","font-size":"16px;","font-weight":"bold","padding-top":"12px"});
	$(".tableTotalPaid td").css({"color":"#1daf99","font-size":"16px;","font-weight":"bold","padding-top":"6px"});
	$(".tableResult td").css({"color":"#19a5c8","border-top":"#19a5c8  solid 1px","font-size":"16px;","font-weight":"bold","padding-top":"12px"});
	recommendation();
}

function add(){
	/*check if name is available*/
	var newName = $("#addNewSharerText").val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string e.g. no space allowed since the jquery will not recognize them
    	newName = newName.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\.|\,|\<|\>|\||\\|\&/g, "");

	for(i = 0; i < jsonData.sharerName.length; i++ ){
		if(jsonData.sharerName[i] == newName){notification("用户 \""+newName+"\" 已存在!",0);return; }
		if(i == 7){notification("您最多只能添加8个用户！",0);return;} //set the limitation of # of sharers.	
	}

	/*add options*/	
	var optionString = "<option value=\""+newName+"\" selected>"+newName+"</option>";
	
	if($("#sharer :selected").text() == "请先添加一个用户"){
		$("#sharer").html(optionString);
		$("#sharer-list").append("参与者： &nbsp;");
	}else{
		$("#sharer").append(optionString);
	}	

	/*add checkboxs*/
	var checkboxString = "<input type=\"checkbox\" id=\""+$("#sharer :selected").val()+"\" value=\""+$("#sharer :selected").val()+"\" checked>"+$("#sharer :selected").val()+"&nbsp;";
	$("#sharer-list").append(checkboxString);

	/*send notification*/
	if( $("#sharer :selected").text() == newName){
	       	notification("用户："+newName+" 已添加！",1);
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


function updateList(){ //updated when new data added or load a json 
	//updateList();	
	var htmlString = "";
	var htmlTitle  = "<tr><th> 编号 </th><th > 金额 </th><th>";
	var totalAmount= 0; 

	for(i=0;i < jsonData.sharerName.length; i++){// add each sharer's name to table header: <th></th>
		htmlTitle += jsonData.sharerName[i] + "</th><th >";
	}
	htmlTitle +="</th><th>备注</th></tr><br/>";

	for(i = 0 ; i < jsonData.sharerCosts[0].length ; i++){// add the detail of each payment, format a line
		var htmlLine = "<td>";
		for(j = 0 ; j < jsonData.sharerName.length ; j++){ // this is each line formatted by <tr><td></td>....</tr>
			if(jsonData.sharerCosts[j][i]=="0"){
				htmlLine += "</td><td>"; //no display on table if it is 0;
			}else{
				htmlLine += jsonData.sharerCosts[j][i]+"</td><td>";
			}
			
		}
		var htmlMemo = "</td><td>"+jsonData.payerList[i].payer+": "+ jsonData.payerList[i].memo+"</td></tr>";
		totalAmount = jsonData.payerList[i].amount;
		htmlString += "<tr><td> "+(i+1)+" </td><td><span>&#36;</span> "+totalAmount+"</td>" + htmlLine + htmlMemo; //format of each row in table
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
	})

	/*Front-page buttons*/

	$("#logInButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#login-panel").fadeIn(300);})
		$("p.title").html("请输入群名称和群主邮箱:");	
	});

	$("#createButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#main-panel").fadeIn(300);$("p.title").css({"display":"none"});})
		notification("请不要包含个人敏感信息！",0);		
	});

	$("#login").click(function(){//default 800
		if($("input[name='user']").val() == ""){notification("群名称不可以为空!",0);return;}
		else if($("input[name='pw']").val() =="" ){notification("群主邮箱不可以为空!",0);return;}
		else if(!checkEmail($("input[name='pw']").val())){notification("请输入有效的邮箱号码!",0);return;}
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
			notification("请输入用户名字！",0);
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
		if($("#groupNameText").val() == ""){notification("请输入您的群名称",0);return;};
		if(!checkEmail($("#ownerNameText").val())){notification("请输入有效的邮箱号码!",0);return;}
		saveData($("#groupNameText").val(), $("#ownerNameText").val(),1);//add a new user 		
	});

	$("#saveCancelButton").click(function(){//exit current panel
		$("#save-panel").fadeOut(300);
		$("#groupNameText").val("");
	});

	/*----------------share functions----------------*/
	$("#shareButton").click(function(){// open share panel
		if( saved == false || ownerName == "" || groupName == ""){  //did not save 
			$("#save-panel").css({"position":"absolute","left":"28%","top":"3%"});
			$("#save-panel").fadeIn(300);//default 800
			$("#groupNameText").focus();
			return;
		}else {
			$("#share-panel").css({"position":"absolute","left":"28%","top":"25%"});
			$("#share-panel").fadeIn(300);//default 800
			$("#shareEmailText").focus();
		}		
	});

	$("#sharetoButton").click(function(){// share
		if(!checkEmailList($("#shareEmailText").val())){notification("错误：有一个或多个邮箱无效!",0);return;}
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
	
	/*----------------opration functions----------------*/
	$("#addMoneyButton").click(function(){// open add sharer panel
		if( $("#sharer :selected").text() == "Add a sharer"){notification("请先添加要分享的用户名称！",0)}
		else if($("#amount").val() == ""){notification("请输入他/她支付的金额！",0)}
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
			return  '您有新的操作未保存。 \n';	
		}
		else if(saved == false && jsonData.sharerName.length > 0) {//User has some action and file not saved 
			return  '当前未保存编辑内容将会消失。\n';
		}
  	}

	/*Reset opera panel position when scrolling down*/
	$(window).scroll(function() {
    		if ($(this).scrollTop() > 100) {
			$("#opera").stop();
			$("#opera").animate({
		       	        padding: '10px 15px',
			        opacity: '0.85',
			       	top:'20px'	
			});
			$("#opera").css({"position": 'fixed',"box-shadow": '4px 4px 10px #888888',"background-image": 'url("pic/bg.png")'});
		};

		if ($(this).scrollTop() < 100) {
			$("#opera").stop();
			$("#opera").animate({
		       	        padding:'0px 0px',
			        opacity: '1'
			});

			$("#opera").css({"position": 'static',"box-shadow": 'none',"background-image": 'none',"margin-top": "40px"});
		};
	})

});
/*Copyright Hao Hu, MIT LICENSE*/
