const fs = require('fs');


console.log('start Asyn');
fs.readFile('OTSI.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  console.log("Asyn", data);
});
moreWork('asyn'); // will run before console.log
console.log('End Async');


console.log('start sync');
const data = fs.readFileSync('OTSI.txt', 'utf-8'); // blocks here until file is read
console.log("Sync:::", data);
moreWork('Sync'); // will run after console.log
console.log('end syn');



console.log('start Asyn');
fs.readFile('OTSI.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  console.log("Asyn", data);
});
moreWork('asyn'); // will run before console.log
console.log('End Async');