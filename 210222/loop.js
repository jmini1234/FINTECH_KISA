var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat"];
var text = "";

var i;


// es6 
cars.map((car)=>{
    console.log(car);
});

for(i=0;i<cars.length;i++){
    text+=cars[i];
}

console.log(text);