function onSuccess () {
  console.log('Success!')
}

function onError () {
  console.log('💩')
}
var num =10 ;
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
   if(num === 30){
    resolve();
   }else{
     reject();
   }
  
  }, 2000)
})

promise.then(onSuccess)
promise.catch(onError)