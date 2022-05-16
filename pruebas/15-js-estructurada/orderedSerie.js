const { Console } = require("console-mpds");
const console = new Console();

const EXIT_NUMBER = 0;

let number;
let numberBefore=0;
let ifOrderedSerie=true;
let serie = "";
do {
    do{
        number = console.readNumber("Escriba un número: ");
        if (number < 0){
            console.writeln(`Error!!! El número debe ser positivo`);
        }     
    } while(number<0);

    if(number !== EXIT_NUMBER){
        serie += (numberBefore===0? "": ", ") + number;
        ifOrderedSerie &&= number >= numberBefore;
        numberBefore = number;
    }    
} while(number!==EXIT_NUMBER);

console.writeln( serie !== "" ? `La serie de números positivos "${serie}" ${ifOrderedSerie ? ``: `NO `}esta ordenada ascendentemente`: `No se colocó una serie`);