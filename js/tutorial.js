lan_package_en = {
   steps:["Welcome ！ Shareculator allowed you simplify your share with your friends.\n Just click the button add 'sharer' to add the first sharer in your group consume.",
   "","",""], 
   other:"",
};

lan_package_cn = {
   steps:["","","",""], 
   other:"",
};

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
