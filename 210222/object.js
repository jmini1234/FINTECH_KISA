var car1 = {
    name : "sonata",
    ph : "500ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function(){
        console.log("engine is stopped");
    }
}

var car2 = {
    name : "BMW",
    ph : "500ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function(){
        console.log("engine is stopped");
    }
}

var car3 = {
    name : "Volvo",
    ph : "500ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function(){
        console.log("engine is stopped");
    }
}

//console.log(car3.name);

var cars = [car1, car2, car3];

// #work2 자동차 배열에서 bmw 찾으면 "!" 출력

for(i=0;i<cars.length;i++){
    if(cars[i].name=="BMW"){
        console.log("!");
    }
}