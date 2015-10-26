var saved = false;
var groupName = "";
var ownerName = "";

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

function updateName(){}

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
	for(i =0 ; i< jsonData.sharerName.length; i++){
		if($("#"+jsonData.sharerName[i]).prop("checked")){
			payment.consumer.push(jsonData.sharerName[i]);
			jsonData.sharerCosts[i].push(parseFloat((val/num).toFixed(2))); 
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
	printOutJson();
	var totalPaid=[]; 
	var totalCost=[];


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

	var htmlStringLine1 ="<tr class=\"tableTotalCost\"><td>Total cost:</td>";
	var htmlStringLine2 ="<tr class=\"tableTotalPaid\"><td>Total paid:</td>";   
	var htmlStringLine3 ="<tr class=\"tableResult\"><td></td>"; 
    	for(i = 0; i< totalPaid.length;i++){
		htmlStringLine1+="<td>"+totalCost[i].toFixed(2)+"</td>";
		htmlStringLine2+="<td>"+totalPaid[i].toFixed(2)+"</td>";
		htmlStringLine3+="<td>"+(totalPaid[i] - totalCost[i]).toFixed(2) +"</td>";
	}
	htmlStringLine1 +="<td></td><td></td></tr>";
	htmlStringLine2 +="<td></td><td></td></tr>";
	htmlStringLine3 +="<td></td><td></td></tr>";

	$("#paymentTable").append(htmlStringLine1 + htmlStringLine2 + htmlStringLine3 );
	$(".tableTotalCost td").css({"border-top":"#fe6161  solid 1px","color":"#fe6161","font-size":"16px;","font-weight":"bold","padding-top":"12px"});
	$(".tableTotalPaid td").css({"color":"#1daf99","font-size":"16px;","font-weight":"bold","padding-top":"6px"});
	$(".tableResult td").css({"color":"#19a5c8","border-top":"#19a5c8  solid 1px","font-size":"16px;","font-weight":"bold","padding-top":"12px"});
}

function add(){
	/*check if name is available*/
	var newName = $("#addNewSharerText").val().replace(/ |!|@|%|{|}|;|:|"|'/g, "");	//format string e.g. no space allowed since the jquery will not recognize them
    	newName = newName.replace(/\/|\?|\#|\$|\^|\*|\(|\)|\[|\]|\.|\,|\<|\>|\||\\|\&/g, "");

	for(i = 0; i < jsonData.sharerName.length; i++ ){
		if(jsonData.sharerName[i] == newName){notification("Sharer \""+newName+"\" already exsited!",0);return; }
		if(i == 7){notification("You can only add at most 8 Sharer",0);return;} //set the limitation of # of sharers.	
	}

	/*add options*/	
	var optionString = "<option value=\""+newName+"\" selected>"+newName+"</option>";
	
	if($("#sharer :selected").text() == "Add a sharer"){
		$("#sharer").html(optionString);
		$("#sharer-list").append("Shared with &nbsp;");
	}else{
		$("#sharer").append(optionString);
	}	

	/*add checkboxs*/
	var checkboxString = "<input type=\"checkbox\" id=\""+$("#sharer :selected").val()+"\" value=\""+$("#sharer :selected").val()+"\" checked>"+$("#sharer :selected").val()+"&nbsp;";
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


function updateList(){ //updated when new data added or load a json 
	//updateList();	
	var htmlString = "";
	var htmlTitle  = "<tr><th > Amount </th><th>";
	var totalAmount= 0; 

	for(i=0;i < jsonData.sharerName.length; i++){// add each sharer's name to table header: <th></th>
		htmlTitle += jsonData.sharerName[i] + "</th><th >";
	}
	htmlTitle +="</th><th>Memo</th></tr><br/>";

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
		htmlString += "<tr><td><span>&#36;</span> "+totalAmount+"</td>" + htmlLine + htmlMemo; //format of each row in table
		totalAmount = 0;
	}

	$("#list").html("<table id=\"paymentTable\">"+htmlTitle+htmlString+"</table>"); //content of the table
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
        $("#msg").fadeIn( 1000 ).fadeOut( 2000 );
        $("#msg p").css({"font-size":"4em","margin-top":"1%"});
        $("#msg span").css({"height":"50px","width":"50px","line-height":"1em","font-size":"1em"});   	
      }else{
        $("#msg").css({"position":"absolute","width":"20%","left":"40%","top":"40px"});
        $("#msg").fadeIn( 1000 ).fadeOut( 2000 );
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

	$(".submit").hover(function(){
			$(this).stop().animate({
				opacity:"0.8"
				},300); //default 800
			},function(){
				$(this).stop().animate({
				opacity:"1"
			}, 300);//default 800
	})

	$("#logInButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#login-panel").fadeIn(300);})
		$("p.title").html("Please enter Group name and Owner Name:");	
	});

	$("#createButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#main-panel").fadeIn(300);$("p.title").css({"display":"none"});})		
	});

	$("#login").click(function(){//default 800
			loadData();
	});

	$("#addSharerButton").click(function(){// open add sharer panel
		/*add panel*/
    		$("#add-sharer-panel").css({"position":"absolute","left":"30%","top":"50%"});
		$("#add-sharer-panel").fadeIn(300);//default 800
		$("#addNewSharerText").focus();	
	});

	$("#saveButton").click(function(){// open save panel
		if( saved == false|| ownerName == "" || groupName == ""){  //did not saved 
			$("#save-panel").css({"position":"absolute","left":"28%","top":"3%"});
			$("#save-panel").fadeIn(300);//default 800
			$("#groupNameText").focus();
		}else{
			saveData(groupName,ownerName);
		}
	});

	$("#savetoButton").click(function(){ //confirm save
		if($("#groupNameText").val() == ""){notification("Please pick up a name for your group!",0);return;};
		if(!checkEmail($("#ownerNameText").val())){notification("Please enter a valid email address!",0);return;}
		saved = true;
		groupName = $("#groupNameText").val();
		ownerName = $("#ownerNameText").val();
		$("#save-panel").fadeOut(300);
		saveData(groupName,ownerName);		
		$("#groupNameText").val("");
		$("#ownerNameText").val("");
	});

	$("#saveCancelButton").click(function(){ //exit current panel
		$("#save-panel").fadeOut(300);
		$("#groupNameText").val("");
	});

	$("#shareButton").click(function(){// open add sharer panel
		notification("Sorry, this function not available currently!",0);
		alert(getParameterByName("Id"));
	});

	$("#addMoneyButton").click(function(){// open add sharer panel
		if( $("#sharer :selected").text() == "Add a sharer"){notification("Please add a sharer first",0)}
		else if($("#amount").val() == ""){notification("Please enter the amount he/she paid",0)}
		else{
			addMoney();
		}		
	});

	$("#undoButton").click(function(){// open add sharer panel
		undo();
	});

	$("#checkOutButton").click(function(){// open add sharer panel
		checkOut();
	});

	$("#addNewSharerCancelButton").click(function(){ //exit current panel
		$("#add-sharer-panel").fadeOut(300);
		$("#addNewSharerText").val("");
	});

	$("#addNewSharerButton").click(function(){ //add new sharer
		if($("#addNewSharerText").val() != ""){
			add();
		}else{
			notification("Please type in a name",0);
		}
		
	});
	
	$("#addNewSharerText").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#addNewSharerButton").click();
        	}
	});


});

