const express = require('express')
const path = require('path');
const app = express();
const request = require('request');
var jwt = require('jsonwebtoken');
var auth = require('./lib/auth')
var moment = require('moment');

var companyId = "M202111570U"
require('dotenv').config();

// json 타입에 데이터 전송을 허용한다.
app.use(express.json());
// form 타입에 데이터 전송을 허용한다.
app.use(express.urlencoded({extended:false}));
// to us static asset 
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/authTest',auth,function(req,res){
  res.send("정상적으로 로그인 하셨다면 해당 화면이 보입니다.");
})

app.get('/signup',function(req,res){
  res.render('signup');
})

app.get('/main',function(req,res){
  res.render('main');
})

app.get('/login',function(req,res){
  res.render('login');
})

app.post('/login',function(req,res){
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var sql = "SELECT * FROM user WHERE email = ?";
  connection.query(sql, [userEmail], function(err, result){
      if(err){
          console.error(err);
          res.json(0);
          throw err;
      }
      else {
          if(result.length == 0){
              res.json(3)
          }
          else {
              var dbPassword = result[0].password;
              if(dbPassword == userPassword){
                  var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%"
                  jwt.sign(
                    {
                        userId : result[0].id,
                        userEmail : result[0].email
                    },
                    tokenKey,
                    {
                        expiresIn : '10d',
                        issuer : 'fintech.admin',
                        subject : 'user.login.info'
                    },
                    function(err, token){
                        console.log('로그인 성공', token)
                        res.json(token)
                    }
                  )            
              }
              else {
                  res.json(2);
              }
          }
      }
  })
})

app.post('/list', auth, function(req, res){
  var user = req.decoded;
  var sql = "SELECT * FROM user WHERE id = ?";
  connection.query(sql,[user.userId], function(err, result){
      if(err) throw err;
      else {
          var dbUserData = result[0];
          var option = {
              method : "GET",
              url : "https://testapi.openbanking.or.kr/v2.0/user/me",
              headers : {
                  Authorization : "Bearer " + dbUserData.accesstoken
              },
              qs : {
                  user_seq_no : dbUserData.userseqno
              }
          }
          request(option, function(err, response, body){
              if(err){
                  console.error(err);
                  throw err;
              }
              else {
                  var listRequestResult = JSON.parse(body);
                  res.json(listRequestResult)
              }
          })        
      }
  })
})

app.get('/balance',function(req,res){
  res.render('balance');
})

app.post('/balance', auth, function(req,res){
  // 사용자 정보 조회
  // 사용자 정보를 바탕으로 request (잔액조회 api) 요청 작성하기 
  var user = req.decoded;
  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  var transId = companyId + countnum;
  var sql = "SELECT * FROM user WHERE id = ?";
  var transdtime = moment(new Date()).format('YYYYMMDDhhmmss');
  connection.query(sql,[user.userId], function(err, result){
      if(err) throw err;
      else {
          var dbUserData = result[0];
          var option = {
              method : "GET",
              url : "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
              headers : {
                  Authorization : "Bearer " + dbUserData.accesstoken
              },
              qs : {
                bank_tran_id : transId,
                fintech_use_num : req.body.fin_use_num,
                tran_dtime : transdtime,
              }
          }
          request(option, function(err, response, body){
              if(err){
                  console.error(err);
                  throw err;
              }
              else {
                  var balanceRequestResult = JSON.parse(body);
                  res.json(balanceRequestResult)
              }
          })
      }
  })
})

app.post('/transactionList', auth, function(req,res){
  var user = req.decoded;
  var countnum = Math.floor(Math.random() * 1000000000) + 1;
  var transId = companyId + countnum;
  var sql = "SELECT * FROM user WHERE id = ?";
  var transdtime = moment(new Date()).format('YYYYMMDDhhmmss');
  connection.query(sql,[user.userId], function(err, result){
      if(err) throw err;
      else {
          var dbUserData = result[0];
          var option = {
              method : "GET",
              url : "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
              headers : {
                  Authorization : "Bearer " + dbUserData.accesstoken
              },
              qs : {
                bank_tran_id : transId,
                fintech_use_num : req.body.fin_use_num,
                inquiry_type : "A",
                inquiry_base : "D",
                from_date : "20160404", 
                to_date : "20160405",
                sort_order : "D",
                tran_dtime : transdtime
              }
          }
          request(option, function(err, response, body){
              if(err){
                  console.error(err);
                  throw err;
              }
              else {
                  var transRequestResult = JSON.parse(body);
                  res.json(transRequestResult)
              }
          })
      }
  }) 
})

app.post('/signup',function(req,res){
  // 사용자가 입력한 정보 저장
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  var userAccessToken = req.body.userAccessToken;
  var userRefreshToken = req.body.userRefreshToken;
  var userSeqNo = req.body.userSeqNo;

  var sql = "INSERT INTO user (name, email, password, accesstoken, refreshtoken, userseqno) VALUES (?,?,?,?,?,?)";
  connection.query(sql,[userName, userEmail, userPassword, userAccessToken, userRefreshToken, userSeqNo], function(error,results){
    if(error){
      console.error(error);
      throw error;
    }
    else{
      res.json(1);
    }
  });
})
 

// 인증 후 code를 받는 url
app.get('/authResult',function(req,res){
  var authCode = req.query.code;
  var option = {
      method : "POST",
      url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
      header : {
          'Content-Type' : 'application/x-www-form-urlencoded'
      },
      form : {
        code : authCode,
        client_id : "4e1719d3-5bc9-47c7-9316-851c72c85038",
        client_secret : process.env.client_secret,
        redirect_uri : "http://localhost:3000/authResult",
        grant_type : "authorization_code"
      }
  }
  request(option, function(err, response, body){
      if(err){
          console.error(err);
          throw err;
      }
      else {
          var accessRequestResult = JSON.parse(body);
          console.log(accessRequestResult);
          res.render('resultChild', {data:accessRequestResult});
      }
  })

})

app.listen(3000)