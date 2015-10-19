
function recmmendation(){}

function drawChart(){}

function updateName(){}

function undo(){}

function checkOut(){}

function add(){
	/*add options*/

	var optionString = "<option value=\""+$("#addNewSharerText").val()+"\" selected>"+$("#addNewSharerText").val()+"</option>";
	
	if($("#sharer :selected").text() == "Add a sharer"){
		$("#sharer").html(optionString);
		$("#sharer-list").append("Shared with &nbsp;");
	}else{
		$("#sharer").append(optionString);
	}	

	/*add checkboxs*/
	var checkboxString = "<input type=\"checkbox\" id=\""+$("#sharer :selected").val()+"\" value=\""+$("#sharer :selected").val()+"\" checked>"+$("#sharer :selected").val()+"&nbsp;";
	$("#sharer-list").append(checkboxString);

	/*add new instance*/


	if( $("#sharer :selected").text() == $("#addNewSharerText").val()){
	       	notification($("#addNewSharerText").val()+" has been added",1);
	}	
	$("#add-sharer-panel").fadeOut(300);
	$("#addNewSharerText").val("");	
	
}

function addMoney(){
	sharerData.push(new sharer());
	// sharerData[]
}

function save(){}// save to local & serverside

function load(){}// find user credential(in XML) and load data(from a json file named as userName.json)

function logIn(){}// encryped user info back-end php code

function notification(str,flag){
      var htmlString ="";
      if(flag){
          htmlString = "<p class = \"msg-content\">&nbsp;&nbsp;<span class=\"attention1\">&#10003</span>&nbsp;&nbsp;"+str+"</p>";
      }else{
          htmlString = "<p class = \"msg-content\">&nbsp;&nbsp;<span class=\"attention2\">!</span>&nbsp;&nbsp;"+str+"</p>";
      }
      $("#msg").html(htmlString);
      if(detectmob()){
        $("#msg").css({"position":"absolute","width":"100%","left":"0px","top":"0px","height":"8%","border":"0px","padding":"6px 0px"});
        $("#msg").fadeIn( 1000 ).fadeOut( 2000 );
        $("#msg p").css({"font-size":"4em","margin-top":"30px"});
        $("#msg span").css({"height":"50px","width":"50px","line-height":"1em","font-size":"1em"});   	
      }else{
        $("#msg").css({"position":"absolute","width":"20%","left":"40%","top":"40px"});
        $("#msg").fadeIn( 1000 ).fadeOut( 2000 );
      };
}

function detectmob() {
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
		$("p.title").html("Please enter your user name and password:");	
	});

	$("#createButton").click(function(){//default 800
		$("#front-panel").fadeOut(300,function(){$("#main-panel").fadeIn(300);$("p.title").css({"display":"none"});})		
	});

	$("#addSharerButton").click(function(){// open add sharer panel
		/*add panel*/
    		$("#add-sharer-panel").css({"position":"absolute","left":"30%","top":"50%"});
		$("#add-sharer-panel").fadeIn(300);//default 800
		$("#addNewSharerText").focus();	
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

