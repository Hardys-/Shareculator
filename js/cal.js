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
