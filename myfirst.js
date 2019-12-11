// var http = require('http');
// var dt = require('./myfirstmodule')
// http.createServer(function (req,res){
//     res.writeHead(200,{'Content-Type':'text/html'});
// 	res.write("the current Date and Time is>>>>"+ dt.myDateTime());
// 	res.end('How are you?');
// }).listen(8080);
const express = require('express');
 const Joi = require('joi');
 var cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

const employees =[
    {"id":4000,"employeeName":"Surya","department":"RTA","skill":"JAVA"},
    {"id":4001,"employeeName":"Srikanth","department":"RTA","skill":"ANGULAR"},
    {"id":4002,"employeeName":"Vijay","department":"RTA","skill":"JAVA"},
    {"id":4003,"employeeName":"Shivani","department":"RTA","skill":"ANGULAR"},
    {"id":4004,"employeeName":"Simham","department":"RTA","skill":"ANGULAR"},
    {"id":4005,"employeeName":"Swathi","department":"RTA","skill":"JAVA"},
    {"id":4006,"employeeName":"Lavanya","department":"RTA","skill":"ReactNative"},
  ]

app.get('/',(req,res) =>{
	res.send('welcome to employees world');
})
app.get('/api/employees',(req,res)=>{
  res.send(employees);
});
// app.get('/api/employees/:id', (req,res) =>{
// 	const employee = employees.find( c => c.id === parseInt(req.params.id));
// 	if(!employee) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
// 	res.send(employee);
// })
app.post ('/api/employees',(req,res)=>{
	const { error } = validateemployee(req.body);
	if(error){
		res.status(400).send(error.details[0].message)
		
	}
	console.log('employeeName',req);
	const employee ={
		id: employees.length +1,
		employeeName: req.body.employeeName
	};
	employees.push(employee);
	res.send(employee);
	res.end(employee)
})


app.post('/profile', function (req, res, next) {
	console.log(req.body)
	res.json(req.body)
  })

//UPDATE Request Handler
app.put('/api/employees/:id', (req, res) => {
	const employee = employees.find(c=> c.id === parseInt(req.params.id));
	if (!employee) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
	 
	const { error } = validateemployee(req.body);
	if (error){
	res.status(400).send(error.details[0].message);
	return;
	}
	 
	employee.employeeName = req.body.employeeName;
	res.send(employee);
	});
	 
	//DELETE Request Handler
	// app.delete('/api/employees/:id', (req, res) => {
	 
	// const employee = employees.find( c=> c.id === parseInt(req.params.id));
	// if(!employee) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
	 
	// const index = employees.indexOf(employee);
	// employees.splice(index,1);
	 
	// res.send(employee);
	// });
	function validateemployee(employee) {
		const schema = {
		 employeeName: Joi.string().min(3).required()
		};
		return Joi.validate(employee, schema);
		 
		}
	const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
	