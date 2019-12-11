function add(x, y) {
	console.log("add");
  return x + y
}

function sub() {
	console.log("sub");
  return "sub";
}

function higherOrderFunction(x, sub) {
	console.log("higherOrderFunction");
  return sub();
}

var res  = higherOrderFunction(10, sub)
console.log("Respopnse::",res);