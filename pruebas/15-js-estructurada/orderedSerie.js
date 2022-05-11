const { Console } = require("console-mpds");
const console = new Console();

let number;
let numberBefore=0;
let ifOrderedSerie=true;
let serie = "";
do {
    number = console.readNumber("Escriba un número: ");
    if(number>0){
        serie += (numberBefore===0? number: ", " + number );
        ifOrderedSerie = number >= numberBefore && ifOrderedSerie;
        numberBefore = number;
    } else if (number!==0){
        console.writeln(`Error!!! El número debe ser positivo`);
    } 
} while(number!==0);

console.writeln( serie !== "" ? `La serie de números positivos "${serie}" ${ifOrderedSerie ? `esta`: `NO esta`} ordenada ascendentemente`: `No se colocó una serie`);