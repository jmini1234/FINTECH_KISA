const express = require('express')
const app = express();

// views 폴더에 view 파일 존재
app.set('views',__dirname+'/views');
// ejs를 view 엔진으로 사용
app.set('view engine','ejs');

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

app.get('/ejs',function(req,res){
    res.render('ejsTest');
})

app.post('/userData',function(req,res){
  console.log("사용자의 요청이 발생했습니다.");
  res.send(true);
})


app.get('/user', function(req,res){
    connection.query('SELECT * FROM user', function (error, results, fields) {
        console.log(results);
        res.send(results);
    });
})
 
app.listen(3000)