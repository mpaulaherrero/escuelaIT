const { Console } = require("console-mpds");
const console = new Console();

const LOCALE = 'es-ES';

const NUM_INTERVALS = 2;
let min = 0;
let max = 1000000;
let guessNumber=false;
do{

    let quotient = 0;
    let remainder = max-min;
    while(remainder >= NUM_INTERVALS){
        remainder -= NUM_INTERVALS;
        quotient += 1;
    }
    let middlePoint = min + quotient;
    console.writeln(`Intervalo ${min}-${max}, middlePoint=${middlePoint}, rest=${remainder}`); 
    
    let answerd = console.readString(`¿Tu número es igual, menor o mayor que ${(middlePoint).toLocaleString(LOCALE)}?: `);
    if(answerd === "mayor"){
        min = middlePoint;
    } else if(answerd === "menor"){
        max = middlePoint;
    } else if(answerd === "igual"){
        guessNumber = true;
    } else {
        console.writeln(`Error!!! Por favor responde mayor, menor o igual`);
    }
    
    if (guessNumber){
        console.writeln(`Tu número es ${middlePoint.toLocaleString(LOCALE)}`);
    } 
} while(!guessNumber);