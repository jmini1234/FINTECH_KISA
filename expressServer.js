const express = require('express')
const app = express()

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sjm1771033',
  database : 'fintech'
});
 
connection.connect();
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/user', function(req,res){
    connection.query('SELECT * FROM user', function (error, results, fields) {
        console.log(results);
        res.send(results);
    });
})
 
app.listen(3000)