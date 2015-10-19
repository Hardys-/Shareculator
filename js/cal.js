var sharer = function(){
    this.cost = 0;
    this.paid = 0;
    this.paidList = [];
    this.costList = [];
    
    this.pay=function(amount){
    	this.paid += amount;
	this.paidList.push(amount);
    };
    
    this.cost=function(amount) {
    	this.cost += amount;
	this.costList.push(amount);
    };

    this.getPaid=function(){
    	return this.paid;
    };
    
    this.getCost=function(){
    	return this.cost;
    };
}


/*data used to store the whole data*/
var data = {
	"sharerName":[],          //e.g. [sharerName1,sharerName2,sharerName3,sharerName4]
	"sharerCosts":[],         //e.g. [[50,60,70,18,0,0],[0,0,10,20,30,40],[12,13,14,15],[0,0,0,0]] same #items as sharerName
	"payerList":[],	          //e.g. [sharerName2,sharerName3,sharerName4,sharerName1,sharerName2,sharerName6] 
}  
