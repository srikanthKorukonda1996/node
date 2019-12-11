var express = require('express');
var mysql = require("mysql");
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('you are now connected with mysql database...')
});


app.get('/history', function (req, res) {
   
    connection.query('SELECT emp.id,history.empsalary,history.updateDate,history.empoldsalary FROM employeedetails as emp RIGHT JOIN history ON emp.id = history.empId ORDER BY emp.id', function (error, results, fields) {
        if (error) throw error;
       
        res.send(JSON.stringify(results));
        res.end();
    })
});
app.get('/getEmployeesList', function (req, res) {
    var host = req.headers['authorization']; 
    console.log("host", host);
    if(host ="abcdefghijklmno"){
        connection.query('SELECT * FROM `userstable`', function (error, results, fields) {
            if (error) throw error;
            res.send(JSON.stringify(results));
            res.end();
        })
    }
   
});

app.get('/reactForm/countries', function (req, res) {
    connection.query('select * from countries', function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        res.end();
    })

})
app.get('/reactForm/states/:cId', function (req, res) {
    connection.query('select * from states where country_id =' + req.params.cId, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        res.end();
    })

})
app.get('/reactForm/cities/:sId', function (req, res) {
    connection.query('select * from cities where state_id =' + req.params.sId, function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        res.end();
    })

})

app.get('/employee', function (req, res) {
    connection.query('select * from employeedetails', function (error, results, fields) {
        res.status(200).json({ 'message': "data inserted!", "data": results });
        res.end();
    })
})
app.post('/newEmployeeDetails', function (req, res) {
    var params = req.body;
    console.log("INSERT INTO employeedetails VALUES (" + params.employeeName + "', '" + params.department + "', '" + params.salary + "', '" + params.status + "','" + params.skill + "')");
    connection.query("INSERT INTO employeedetails (employeeName,department,skill,status,salary) VALUES('" + params.employeeName + "', '" + params.department + "', '" + params.skill + "', '" + params.status + "','" + params.salary + "')", function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results));
        res.end();
    })
})
app.put('/updateEmployee', function (req, res) {
    connection.query('UPDATE `employeedetails` SET `employeeName`=?,`department`=?,`status`=?,`skill`=?,`salary`=? where `Id`=?', [req.body.employeeName, req.body.department, req.body.status, req.body.skill, req.body.salary, req.body.id], function (error, results, fields) {

        res.send(JSON.stringify(results));
        res.end();
    });
});
app.post('/createUser', function (req, res) {
    var params = req.body;
    console.log(params)
    console.log("select count(id) as count from `userstable` where 'email'='" + params.email + "'");
    connection.query("select count(id) as count from `userstable` where userEmail='" + params.email + "'", function (error, results, fields) {
        if (error) throw error;
        let count = results[0].count;
        console.log("results>>>>>", results);
        console.log("count>>>", count > 0);
        if (count > 0) {
            res.status(200).json({ 'status': 400, 'message': "Email Already Exists", "errors": null });
            res.end();
        } else {
            connection.query("INSERT INTO userstable (name,userEmail,password,technologies,country,state,city) VALUES('" + params.name + "', '" + params.email + "', '" + params.password + "', '" + JSON.stringify(params.technologies) + "','" + params.countries + "','" + params.states + "','" + params.cities + "')", function (error, results, fields) {
                if (error) {

                    res.status(200).json({ 'status': 500, 'message': error, "errors": error });
                    res.end();
                }
                res.status(200).json({ 'status': 200, 'message': "data inserted!", "errors": null });
                res.end();
            })

        }
    })

})
app.post('/checkUser', function (req, res) {
    var params = req.body;
    console.log(params)
    console.log("select * from `userstable` where userEmail='" + params.userEmail + "' and password='" + params.password);
    connection.query("select * from `userstable` where userEmail='" + params.userEmail + "' and password ='" + params.password + "'", function (error, results, fields) {
        if (error) {
            res.status(200).json({ 'status': 500, 'message': error, "errors": error });
            res.end();
        }
        console.log("resultsss>>",results);
        if(results.length != 0){
            res.status(200).json({ 'status': 200, 'message': "Successful login", 'data': results, "errors": null });
            res.end();
        }else{
            res.status(200).json({ 'status': 400, 'message': "User does not exists", "errors": null });
            res.end();
        }
       

    })

})
app.put('/changedEmployeeList', function (req, res) {
    var params = req.body;
    console.log(params,params.id);
    console.log('UPDATE `userstable` SET `name`=?,`userEmail`=?,`password`=?,`technologies`=?,`country`=?,`state`=?,`city`=? where `id`=?');
    connection.query('UPDATE `userstable` SET `name`=?,`userEmail`=?,`password`=?,`technologies`=?,`country`=?,`state`=?,`city`=? where `id`=?',[req.body.name,req.body.email,req.body.password,JSON.stringify(req.body.technologies),req.body.countries,req.body.states,req.body.cities,req.body.id] ,function (error, results, fields) {
        if (error) {
            res.status(200).json({ 'status': 500, 'message': error, "errors": error });
            res.end();
        }
        res.status(200).json({ 'status': 200, 'message': "Successful Updated", 'data': results, "errors": null });
        res.end();

    })

})

app.listen(8080);