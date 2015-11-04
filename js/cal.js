/*cal.js focus on calculation and data analyze*/

/*data used to store the whole data*/
var jsonData = {
	"sharerName":[],          //e.g. [sharerName1,sharerName2,sharerName3,sharerName4]
	"sharerCosts":[],         //e.g. [[50,60,70,18,0,0],[0,0,10,20,30,40],[12,13,14,15],[0,0,0,0]] same #items as sharerName
	"payerList":[],	          //e.g. each record:{"payer":"sharerName2","consumer":[sharerName2,sharerName3,sharerName4],"amount":"$***","memo":"string memo"} 
}  

var checkoutResult = [];          //for recommendation:[{"name":"sharerName1","val":"paymentResult1" },{"name":"sharerName2","val":"paymentResult2"}...]

var payerList = [];

function recommendation(){

	/*quicksort sorting*/
	function quicksort(arr, left, right){
		var index = partition(arr, left, right);
		if(left < index-1) quicksort(arr, left, index-1);
		if(right > index) quicksort(arr, index, right);
	}

	function partition(arr, left, right){
		var pivot = arr[Math.floor((left+right)/2)].val;
		while(left <= right){
			while(arr[left].val < pivot) {left ++;}
			while(arr[right].val > pivot) {right --;}
			if(left<=right){
				var temp = arr[left];
			        arr[left] = arr[right];
				arr[right] = temp;
				left ++;
				right --;

			}
		}
		return left;
	}


	function rem(arr){
		var outputString = [];
		/*find solution: 1 payer = 1 owe*/
		for(i = arr.length-1; i >=0; i--){
			for(j = 0; j < i;j++){
				if (Math.abs(parseFloat(arr[i].val) + parseFloat(arr[j].val)) <= 0.02 && parseFloat(arr[j].val) < 0){
					outputString.push("<div class=\"subRec\"><span class =\"rn\">"+arr[i].name+"</span> ("+arr[i].val+"):<br/>");
					var trans = "|&nbsp;&nbsp;<span class =\"rn\">"+arr[j].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[i].val))+"</span>.<br/><br/> ";
					outputString.push(trans+"</div>");
					arr[i].val = 0;
					arr[j].val = 0;		
				} 
			}
		}

		/*find solution: 1 payer = 2 owe*/
		if(checkoutResult.length >= 3){
			for(i = arr.length-1; i >=0; i--){
				for(j = 0; j < i;j++){
					for(k=j+1; k < i ; k++){
						if (Math.abs(parseFloat(arr[i].val) + parseFloat(arr[j].val)+ parseFloat(arr[k].val)) <= 0.02
						&& parseFloat(arr[k].val) < 0 
						&& parseFloat(arr[j].val) < 0){
							outputString.push("<div class=\"subRec\"><span class =\"rn\">"+arr[i].name+"</span> ("+arr[i].val+"):<br/>");
							var trans = "|&nbsp;&nbsp;<span class =\"rn\">"+arr[j].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[j].val))+"</span>.<br/> ";
							trans += "|&nbsp;&nbsp;<span class =\"rn\">"+arr[k].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[k].val))+"</span>.<br/><br/> ";
							outputString.push(trans+"</div>");
							arr[i].val = 0;
							arr[j].val = 0;	
							arr[k].val = 0;	
						} 
					}
				}
			}
		}
		
		/*find solution: 1 payer = 3 owe*/
		if(checkoutResult.length >= 4){
			for(i = arr.length-1; i >=0; i--){
				for(j = 0; j < i;j++){
					for(k=j+1; k < i ; k++){
						for(l=k+1; l < i; l++){
							if (Math.abs(parseFloat(arr[i].val) + parseFloat(arr[j].val)+ parseFloat(arr[k].val) +parseFloat(arr[l].val)) <= 0.02
							&& parseFloat(arr[l].val) < 0 
							&& parseFloat(arr[j].val) < 0
							&& parseFloat(arr[k].val) < 0){
								outputString.push("<div class=\"subRec\"><span class =\"rn\">"+arr[i].name+"</span> ("+arr[i].val+"):<br/>");
								var trans = "|&nbsp;&nbsp;<span class =\"rn\">"+arr[j].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[j].val))+"</span>.<br/> ";
								trans += "|&nbsp;&nbsp;<span class =\"rn\">"+arr[k].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[k].val))+"</span>.<br/> ";
								trans += "|&nbsp;&nbsp;<span class =\"rn\">"+arr[l].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[l].val))+"</span>.<br/><br/> "
								outputString.push(trans+"</div>");
								arr[i].val = 0;
								arr[j].val = 0;	
								arr[k].val = 0;	
								arr[l].val = 0;	
							}
						}	 
					}
				}
			}
		}

		/*Other issue: gready algorithm*/
		for(i = arr.length-1; i >=0; i--){
			if(arr[i].val > 0){
				outputString.push("<div class=\"subRec\"><span class =\"rn\">"+arr[i].name+"</span> ("+arr[i].val+"):<br/>");
				var trans = "";
				for(j = 0; j < i; j++ ){
					if(parseFloat(arr[i].val) + parseFloat(arr[j].val) > 0 && parseFloat(arr[j].val) < 0 ){
						trans += "|&nbsp;&nbsp;<span class =\"rn\">"+arr[j].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[j].val))+"</span>.<br/> ";
						arr[i].val = (parseFloat(arr[i].val) + parseFloat(arr[j].val)).toFixed(2);
						arr[j].val = 0;
					}
					else if(parseFloat(arr[i].val) + parseFloat(arr[j].val) <= 0 && parseFloat(arr[j].val) < 0 ){
						trans += "|&nbsp;&nbsp;<span class =\"rn\">"+arr[j].name + "</span> -> <span class =\"rn\">" + arr[i].name +"</span> <span class=\"rm\"> &#36;"+ Math.abs(parseFloat(arr[i].val))+"</span>.<br/> ";
						arr[j].val = (parseFloat(arr[j].val) + parseFloat(arr[i].val)).toFixed(2);
						arr[i].val = 0;
						outputString.push(trans+"</div>");
						break;		
					}
				}
			}
		}

		/*add to html*/	
		var recHtmlString ="";
		for(i = 0; i<outputString.length;i++){
			recHtmlString += outputString[i];
		}
		$("#list").append("<span class=\"rt\">Recommendation:</span><br/><br/><div id=\"recommendation\">"+recHtmlString+"</div>");

		/*extend height*/
		var h = jsonData.payerList.length * 30 + outputString.length * 28;
		$("#bottom").css({"position":"static","margin-top":h+"px"});
		$("#copyright").css({"position":"static"});
		
	}
	quicksort(checkoutResult, 0, checkoutResult.length-1); //sorting
	rem(checkoutResult);                                   //print recommendation

}

function consumeAna(){}

function drawChart(){}
