var http = require("http");

http.createServer(function(req,res){
    var body = "Hello server";
    res.setHeader('Content-type','text/html; charset=utf-8');
    res.end("<html><h1>안녕하세요</h1></html>");
}).listen(3000);