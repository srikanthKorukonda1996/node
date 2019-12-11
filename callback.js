var num =10;
console.log('factorial of number>> 3 is');
var res = factorial(num);
function factorial(num){
  
    if(num > 1){
        var  fact = num * factorial(num-1);
        console.log('fact', fact);
        return fact;
    }
    else{
        return 1;
    }
       
   
    
};
console.log(res);