const fs = require('fs');

function holidayslist(data){
    console.log('holiday data',data)
    console.log("For training people, its sunday");
    console.log("For employees, saturday and sunday");
}
console.log('start Asyncfunction');
fs.readFile('New Text Document.txt', 'utf-8',(err,data)=>{
    if(err) throw err;
    console.log("file data>>>", data);
    holidayslist(data);
})

console.log('End Async');
