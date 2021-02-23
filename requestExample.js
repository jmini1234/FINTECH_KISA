const request = require('request');
var parseString = require('xml2js').parseString;

request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function(err,response, body){
    var xml = body;
    parseString(xml, function (err, result) {
        // 배열에 접근 
        console.dir(result.rss.channel[0].item[0].description[0].header[0].wf);
    });
})