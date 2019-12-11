console.log("Start");

async function firstAsync() {
    let promise = new Promise((res, rej) => {
        setTimeout(() => res("Now it's done!"), 1000)
    });

    // wait until the promise returns us a value
    let result = await promise;

    // "Now it's done!"
    console.log("RES::",result);
    return result;
}

firstAsync()
.then(result => {console.log("resout",result)})
.catch(err => { console.log("resout",err)});
console.log("End");
