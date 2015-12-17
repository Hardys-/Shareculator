lan_package_en = {
   steps:["Welcome ！ Shareculator allowed you simplify your share with your friends.\n Just click the button add 'sharer' to add the first sharer in your group consume.",
   "","",""], 
   other:"",
};

lan_package_cn = {
   steps:["","","",""], 
   other:"",
};


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

function getParameterByName(name) {//url string query
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


$( document ).ready(function() {
   if(detectmob() && language == getParameterByName("en")){
    /* Change behaviors here*/
    // do things here
      lan_package = lan_package_en;
      
   }else if(detectmob() && language == getParameterByName("cn")){
      lan_package = lan_package_cn; 
      
   }
})
