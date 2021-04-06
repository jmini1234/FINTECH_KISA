const request = require("request");
const cheerio = require("cheerio");
const log = console.log;
function getData() {
    request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_CHFKRW&page=1", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            console.log('날짜', $(element).find('td:nth-of-type(1)').text());
            console.log('살때', $(element).find('td:nth-of-type(4)').text());
            console.log('팔때', $(element).find('td:nth-of-type(5)').text());
        });
    });
}
getData();
