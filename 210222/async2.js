function aFucn(){
    setTimeout(function(){
        console.log('a');
    },1700);
}

function bFucn(){
    setTimeout(function(){
        console.log('b');
    },1000);
}

function cFucn(){
    setTimeout(function(){
        console.log('c');
    },500);
}
// cba 순으로 실행된다. 
// abc 순으로 실행되긴 했지만, 먼저 끝나는 순서대로 진행된다.
aFucn();
bFucn();
cFucn();