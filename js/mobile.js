
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
   if(detectmob()){
    /* Change behaviors here*/
    // do things here
      
   }
})
