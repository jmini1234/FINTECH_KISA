const request = require('request');
request('http://newsapi.org/v2/everything?q=tesla&from=2021-01-23&sortBy=publishedAt&apiKey=78bc6ddd8cdb48ceac76f5f9b9dfc4c5',function(error,response,body){
    var data = JSON.parse(body);
    data.articles.map((article) => {
        console.log(article.title);
    });
});