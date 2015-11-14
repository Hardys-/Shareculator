/*talk.js focus on data send and receive*/
function saveData(gName,oName,isNew){
	$.ajax({
    		type: "POST",
    		url: "php/save.php",
		data: {json:$.toJSON(jsonData),group:gName,owner:oName,flag:isNew},
		success: function(msg){
    	    	// return value stored in msg variable
		}
				
	}).done(function(response) {			
			if(isNew == 1 && response !="Group & owner already existed!"){ //first save
				var fn = response.substring(13); 
				groupName = $("#groupNameText").val();
				ownerName = $("#ownerNameText").val();
				$("#groupNameText").val("");
				$("#ownerNameText").val("");	
				$("#save-panel").fadeOut(300);
				notification(response.substring(0,13),1);
				window.history.pushState("", "", "?Id="+fn);
				saved = true;
			}
			else if(response !="Group & owner already existed!") { //saved file update
				if(language == "en"){notification(response.substring(0,13),1);}
				else if(language == "cn"){notification("账单存储成功！",1);}
				if (saved == false) {saved = true; document.title =  document.title.substring(2);}
			}	
			else {
				if(language == "en"){notification(response,0)}
				else if(language == "cn"){notification("您输入的群名称和群主已存在！",0)}
			}	

		}).fail(function(response) {
		    	notifiction(response,0);		
		});
};

function loadData(gName,oName){
	var jsonFile;
	$.ajax({
    		type: "POST",
    		url: "php/load.php",
		data: {group:gName,owner:oName},
		success: function(msg){
    	    	// return value stored in msg variable
		}				
	}).done(function(response) {
			if(response != "Error" ) {//????????????????????????????????????????????? do not match, encode?
				jsonFile = response; 
				if(language == "en"){notification("Opening file "+ jsonFile,1);window.location.replace("index.php?Id="+jsonFile);}
				else if(language == "cn"){notification("成功打开文件："+ jsonFile,1);window.location.replace("index_cn.php?Id="+jsonFile);}
				
			}
	}).fail(function(response) {
		    	notifiction(response,0); return;		//no further actions
	});
	
}

function urlQueryLoad(){
	var id = getParameterByName("Id") ;
	if( id != ""){
		load(id);
		$.ajax({
			type: "POST",
			url: "php/getNameById.php",
			data: {Id:id},
			dataType: 'json',
		       	cache: false,
			success: function(msg){
			// return value stored in msg variable
				groupName = msg.group[0];
				ownerName = msg.owner[0];
				saved = true;
			}					
		}).done(function(response) {
				if(language == "en"){notification("File: "+id+" opened!",1);}
				else if(language == "cn"){notification("文件: "+id+" 已打开!",1);}			
		}).fail(function(response) {
				if(language == "en"){notification("Group & Owner name cannot be loaded",0);}
				else if(language == "cn"){notification("错误：无法载入账单！",0);}		
		});
	}	
}



function load(id){// find user credential(in XML) and load data(from a json file named as userName.json)
	$.get("data/"+id+".json", function(data, status){
		jsonData = data;
		$("#createButton").click();
		for(i =0; i < jsonData.sharerName.length; i++){
			/*add options*/	
			var optionString = "<option value=\""+jsonData.sharerName[i]+"\" selected>"+jsonData.sharerName[i]+"</option>";
		
			if(language == "en"){
				if($("#sharer :selected").text() == "Add a sharer"){
					$("#sharer").html(optionString);
					$("#sharer-list").append("Shared with &nbsp;");
				}else{
					$("#sharer").append(optionString);
				}
			}
			else if(language == "cn"){
				if($("#sharer :selected").text() == "请先添加一个用户"){
					$("#sharer").html(optionString);
					$("#sharer-list").append("参与者： &nbsp;");
				}else{
					$("#sharer").append(optionString);
				}
			}

			/*add checkboxs*/
			var checkboxString = "<input type=\"checkbox\" id=\""+jsonData.sharerName[i]+"\" value=\""+jsonData.sharerName[i]+"\" checked>"+jsonData.sharerName[i]+"&nbsp;";
			$("#sharer-list").append(checkboxString);
		}
		updateList();
		if(language == "en"){notification("File: "+id+" loaded!",1);}
		else if(language == "cn"){notification("文件: "+id+" 已载入!",1);}
		/*reset position*/
		if(jsonData.payerList.length>8){
			var h = jsonData.payerList.length * 20;
			$("#bottom").css({"position":"static","margin-top":h+"px"});
			$("#copyright").css({"position":"static"});
		}
	});
}



function getParameterByName(name) {//url string query
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function share(){
	$.ajax({
    		type: "POST",
    		url: "php/share.php",
		data: {email:$("#shareEmailText").val(),message:$("#shareMessage").val(),group:groupName,owner:ownerName,lan:language},
		success: function(msg){
    	    	// return value stored in msg variable
		}				
	}).done(function(response) {
		if(language == "en"){notification(response,1); return;}
		else if(language == "cn"){notification("链接已分享，请注意查收邮件！",1); return;}	
	}).fail(function(response) {
		if(language == "en"){notification(response,0); return;}
		else if(language == "cn"){notification("警告：分享失败！",0); return;}
	});
	
}

function checkEmail(email){
	 if (email == "") {                               //cannot be empty
		return false;
	 }

	 var invalidChars = " /:,;";
	 for (i=0; i<invalidChars.length; i++) {
		var invalidchar = invalidChars.charAt(i)
		if (email.indexOf(invalidchar,0) > -1) {   //found invalid char
		return false
		}
	 }

	 var periodPos = email.indexOf(".",atPos)
	 if (periodPos == -1) {     	        	   //must contain a . char
		return false
	 }
	 if (periodPos+2 > email.length) { return false; } //must have at least 2 chars after .

	 var atPos = email.indexOf("@",1)
	 if (atPos == -1) {			//cannot find @ char
		return false
	 }

	 if (email.indexOf("@",atPos+1) > -1) { //only need one @ char
		return false
	 }	 
	 return true;   //passed all check
}


function checkEmailList(str){
	str = str.replace(/ /g, ""); //remove all spaces
	var emailList = new Array();
	if(language == "en"){emailList = str.split(",");}
	else if(language == "cn"){emailList = str.split("，");}
	for(s in emailList){
	 	if(!checkEmail(emailList[s])) return false;		
	}
 	return true;
}


/*Copyright Hao Hu, MIT LICENSE*/
