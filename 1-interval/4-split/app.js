const { Console } = require("console-mpds");
const console = new Console();

let min;
let max;
let numInterval;
let error;

do{
    min = console.readNumber("Introduce el mínimo del intervalo: ");
    max = console.readNumber("Introduce el máximo del interval(superior o igual al mínimo): ")
    if (max < min){
        console.writeln(`Error!!! El máximo debe ser superior o igual al mínimo`);
        error=true;
    } else {
        error=false;
    }
} while(error)

do{
    numInterval = console.readNumber("Introduce una cantidad positiva de intervalos: ");
    if (numInterval <= 0){
        console.writeln(`Error!!! La cantidad debe ser positiva`);
        error=true;
    } else {
        error=false;
    }
} while(error)

const longInterval=(max-min)/numInterval;
//console.writeln(`Tamaño intervalo dividido ${longInterval}`);
let resultText = `El intervalo [${min}, ${max}] dividido en ${numInterval} son`
let minInterval = min;
let maxInterval = min+longInterval; 

for(let i=1; i<= numInterval; i++){
    resultText += ` [${minInterval}, ${maxInterval}]`;
    if(i===numInterval-1){
        resultText += ` y`;
    } else {
        if(i<numInterval-1){
            resultText += `,`;
        }    
    }
    minInterval = maxInterval;
    maxInterval = maxInterval + longInterval;
    
}

console.writeln(resultText);
//El intervalo [4, 10] dividido en 3 intervalos son [4, 6], [6, 8] y [8, 10]