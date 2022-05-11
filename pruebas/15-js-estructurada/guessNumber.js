const { Console } = require("console-mpds");
const console = new Console();

const NUM_INTERVALS = 2;
const LOCALE = 'es-ES';
let min = 0;
let max = 1000000;
let guessNumber=false;
do{
    const longInterval=parseInt((max-min)/NUM_INTERVALS);
    let answerd = console.readString(`¿Tu número es igual o mayor que ${(min + longInterval).toLocaleString(LOCALE)}? (Si/No): `);
    if(answerd==="Si" || answerd==="si" || answerd==="SI" || answerd==="s"){
        min += longInterval;
    } else if(answerd==="No" || answerd==="no" || answerd==="NO" || answerd==="n"){
        max -= longInterval;
    } else {
        console.writeln(`Error!!! Por favor responde Si o No`);
    }
    //console.writeln(`Intervalo ${min}-${max}, longInterval=${longInterval}`);   
    guessNumber = longInterval === 1;
    if (guessNumber){
        console.writeln(`Tu número es ${min.toLocaleString(LOCALE)}`);
    } 
} while(!guessNumber);