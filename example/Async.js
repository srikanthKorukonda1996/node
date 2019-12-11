const fs = require('fs');

function moreWork(data) {
  console.log("dat:", data);
}

console.log('start Asyn');
fs.readFile('OTSI.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  console.log("Asyn", data);
});
moreWork('asyn'); // will run before console.log
console.log('End Async');