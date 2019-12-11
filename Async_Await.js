console.log("start");
async function AddTwonumbers(){
    let promise = new Promise((res,rej)=>{
        setTimeout(() => res(2500+30),1000)
       
    });
    let result = await promise;
    console.log('Res::',result);
    return result;
}
AddTwonumbers()
.then(result =>{console.log("resout",result)})
.catch(err => {console.log("Error",err)});
console.log('end of function')