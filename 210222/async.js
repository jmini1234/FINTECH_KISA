var fs = require('fs');

// 결과
// 첫번재 기능입니다. 
// 마지막 기능입니다. 
// 두번째 기능 ~~~

// 즉 순서에 상관없이 먼저 끝나는 일부터 처리하는 비동기 방식!

console.log("첫번째 기능입니다.");
fs.readFile('example/test.txt','utf8',function(err,result){
    if(err){
        console.log(err);
        throw err;
    }
    else{
        console.log("두번째 기능인데 읽어오느라 시간이 .. 조금...걸려요");
        console.log(result);
    }
});
console.log("마지막 기능입니다.");