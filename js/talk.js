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
			if(isNew == 1 && response !="Group & owner already existed!"){
				saved = true;
				groupName = $("#groupNameText").val();
				ownerName = $("#ownerNameText").val();
				$("#groupNameText").val("");
				$("#ownerNameText").val("");	
				$("#save-panel").fadeOut(300);
			}


			if(response !="Group & owner already existed!")	notification(response,1)
			else 	notification(response,0);

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
				notification("Opening file "+ jsonFile,1);
				window.location.replace("index.php?Id="+jsonFile);
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
				notification("File: "+id+" opened!",1);
		}).fail(function(response) {
				notification("Group & Owner name cannot be loaded",0);		
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
		
			if($("#sharer :selected").text() == "Add a sharer"){
				$("#sharer").html(optionString);
				$("#sharer-list").append("Shared with &nbsp;");
			}else{
				$("#sharer").append(optionString);
			}	

			/*add checkboxs*/
			var checkboxString = "<input type=\"checkbox\" id=\""+jsonData.sharerName[i]+"\" value=\""+jsonData.sharerName[i]+"\" checked>"+jsonData.sharerName[i]+"&nbsp;";
			$("#sharer-list").append(checkboxString);
		}
		updateList();
		notification("File: "+id+" opened!",1);
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
		data: {email:$("#shareEmailText").val(),message:$("#shareMessage").val(),group:groupName,owner:ownerName},
		success: function(msg){
    	    	// return value stored in msg variable
		}				
	}).done(function(response) {
			notification(response,1); return;
	}).fail(function(response) {
		    	notification(response,0); return;
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
	emailList = str.split(",");
	for(s in emailList){
	 	if(!checkEmail(emailList[s])) return false;		
	}
 	return true;
}
