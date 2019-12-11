var exprees = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = exprees();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}))
app.use(cors());

var connection = mysql.createConnection({
    host :'localhost',
    user :'root',
    password :'password',
    database :'employee'
})

connection.connect(function(err){
    if(err) throw err
    console.log('your are now Connected with mysql database...');
});
app.get('/history',function(req,res){
    connection.query('SELECT emp.id,history.empsalary,history.timeStamp,history.empoldsalary FROM employeedetails as emp RIGHT JOIN history ON emp.id = history.empId ORDER BY emp.id',function(error, results, fields){
        if(error) throw error;
        // res.status(500).send({error: 'Internal server error happened'})
        // res.status(400).send({error: 'Error in Request'})
        res.send(JSON.stringify(results));
        res.end();
    })
});
app.listen(8080);