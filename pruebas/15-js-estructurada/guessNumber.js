const { Console } = require("console-mpds");
const console = new Console();

const LOCALE = 'es-ES';

const NUM_INTERVALS = 2;
let min = 0;
let max = 1000000;
let middlePoint;
let guessNumber=false;
do{
    middlePoint = ((min + max) - ((min + max) % NUM_INTERVALS)) / NUM_INTERVALS;
    //console.writeln(`Intervalo ${min}-${max}, middlePoint=${middlePoint}`); 
    
    let answerd = console.readString(`¿Tu número es igual, menor o mayor que ${(middlePoint).toLocaleString(LOCALE)}?: `);
    switch(answerd){
        case "mayor":
            min = middlePoint + 1;
            break;
        case "menor":
            max = middlePoint - 1;
            break;
        case "igual":
            guessNumber=true;
            break;
        default:
            console.writeln(`Error!!! Por favor responde mayor, menor o igual`);
    }
} while(!guessNumber);

if (guessNumber){
    console.writeln(`Tu número es ${middlePoint.toLocaleString(LOCALE)}`);
} 