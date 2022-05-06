const { Console } = require("console-mpds");
const console = new Console();

let min;
let max;
let error;
do{
    min = console.readNumber("Introduce el mínimo del intervalo: ");
    max = console.readNumber("Introduce el máximo del interval(superior o igual al mínimo): ")
    error = max < min;
    if (error){
        console.writeln(`Error!!! El máximo debe ser superior o igual al mínimo`);
    } 
} while(error)

let numIntervals;
do{
    numIntervals = console.readNumber("Introduce una cantidad positiva de intervalos: ");
    error = numIntervals <= 0;
    if (error){
        console.writeln(`Error!!! La cantidad debe ser positiva`);
    }
} while(error)

const longInterval=(max-min)/numIntervals;

let resultText = `El intervalo [${min}, ${max}] dividido en ${numIntervals} intervalos son`
let minInterval = min;

for(let i=0; i<numIntervals; i++){
    resultText += ` [${minInterval}, ${minInterval + longInterval}]`;
    resultText += i < numIntervals-2 ? `,`: i===numIntervals-2 ? ` y`: ``;
    minInterval = minInterval + longInterval;
}

console.writeln(resultText);