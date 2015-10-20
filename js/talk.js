function loadXMLDoc()
{
var xmlhttp;
var txt,x,xx,i,result,record;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    txt="<p style=\"font-family:Calibri; color:#666666; font-style: italic;\">Found result:<br/></p>";
    result="";
    record="";
    x=xmlhttp.responseXML.documentElement.getElementsByTagName("record");
    for (i=0;i<x.length;i++)
      {
      txt=txt+"<strong style=\"background-color:#f39951;padding:1px 6px; border:0px; border-radius:2px;color:#ffffff; font-family:Calibri; \">";
      xx=x[i].getElementsByTagName("firstname");
        {
        try
          {
          txt=txt + xx[0].firstChild.nodeValue + " ";
	  record=record + xx[0].firstChild.nodeValue + " ";
          }
        catch (er)
          {
          txt=txt + "? ";
	  record=record + " ";
          }
        }
      xx=x[i].getElementsByTagName("lastname");
        {
        try
          {
          txt=txt + xx[0].firstChild.nodeValue + ":  </strong> <div style=\"list-style-type: none;margin-top:10px;margin-left:25px; color:#666666; font-family:Calibri; width:650px \">";
	  record=record + xx[0].firstChild.nodeValue + " ";
          }
        catch (er)
          {
          txt=txt + "?:  </strong> <div style=\"list-style-type: none;margin-top:10px;margin-left:25px; color:#666666; font-family:Calibri; width:650px \">";
	  record=record  + " ";
          }
        }
      xx=x[i].getElementsByTagName("email");
        {
        try
          {
          txt=txt + xx[0].firstChild.nodeValue + "</div><div style=\"list-style-type: none;margin-top:10px;margin-left:25px; color:#666666; font-family:Calibri; width:650px \">";
	  record=record + xx[0].firstChild.nodeValue + " ";
          }
        catch (er)
          {
          txt=txt + "?</div><div style=\"list-style-type: none;margin-top:10px;margin-left:25px; color:#666666; font-family:Calibri; width:650px \">";
	  record=record +  " ";
          }
        }
      xx=x[i].getElementsByTagName("message");
        {
        try
          {
          txt=txt +  xx[0].firstChild.nodeValue + "</div><br/><br/>";
	  record=record + xx[0].firstChild.nodeValue + " ";
          }
        catch (er)
          {
          txt=txt +  "? </div><br/><br/>";
	  record=record + " ";
          }
        }

	if (record.toLowerCase().indexOf($("#search").val().toLowerCase()) >= 0){
		result= result + txt;
      		$("header").css("height",$("header").height()+120+'px');
	}
	txt = "";
	record="";
      }
    if(result == ""){ result = "Cannot found records according to your search: \""+$("#search").val()+"\" !<br/>";};
    document.getElementById('search-result').innerHTML=result;
    }
  }
xmlhttp.open("GET","message.xml",true);
xmlhttp.send();
}

$( document ).ready(function() {
	if($("header").height() < 400){$("header").css("height",520+'px');}
	$("#submit").hover(function(){
			$(this).stop().animate({
				opacity:"0.8"
				}, 500);
			},function(){
				$(this).stop().animate({
				opacity:"1"
			}, 500);
	});

	var tag = false;
	$("#submit").click(function(){
		if(tag == false && $("#search").val()!= ""){
			$("div.content").stop().animate({"position": "relative","top":"-="+($(this).position().top-80)+"px","left":"-="+($(this).position().left-440)+"px"},"swing");
			$("div.content").css({"position": "relative", "top": "100px", "left": "100px" });
			tag = true;
		};

		if( $("#search").val()== ""){alert("Cannot search empty value.")}
		else{	
			loadXMLDoc();			
		}
	});

	$("#search").keydown(function(event) {
    		if (event.keyCode == 13) {
        		$("#submit").click();
        	}
	})
	

});

