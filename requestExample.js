const request = require('request');
request('http://www.google.com', function(err,response, body){
    console.log('error',err);
    console.log('statusCode:',response && response.statusCode);
    console.log('body:', body);
})