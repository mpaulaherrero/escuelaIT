const { Console } = require("console-mpds");
const console = new Console();

let min = 0;
let max = 1000000;
let numIntervals = 2;
let guessNumber=false;
do{
    const longInterval=parseInt((max-min)/numIntervals);
    let answerd = console.readString(`¿Tu número es igual o mayor que ${(min + longInterval).toLocaleString('es-ES')}? (Si/No): `);
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
        console.writeln(`Tu número es ${min.toLocaleString('es-ES')}`);
    } 
} while(!guessNumber);