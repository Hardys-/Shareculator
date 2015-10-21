var sharer = function(name){
    	this.name = name;
    	this.totalCost = 0;
    	this.paid = 0;
    	this.costList = [];
   
    
    	this.pay = function(amount){
    		this.paid += amount;
    	};
    
    	this.cost = function(amount) {
    		this.totalCost += amount;
		this.costList.push(amount);
    	};

    	this.getPaid = function(){
    		return this.paid;
    	};
    
    	this.getTotalCost = function(){
    		return this.totalCost;
    	};

	this.getName = function(){
		return this.name;
	}
}


/*data used to store the whole data*/
var jsonData = {
	"sharerName":[],          //e.g. [sharerName1,sharerName2,sharerName3,sharerName4]
	"sharerCosts":[],         //e.g. [[50,60,70,18,0,0],[0,0,10,20,30,40],[12,13,14,15],[0,0,0,0]] same #items as sharerName
	"payerList":[],	          //e.g. each record:{"payer":"sharerName2","consumer":[sharerName2,sharerName3,sharerName4],"amount":"$***","memo":"string memo"} 
}  

var sharerData = [];

var payerList = [];
