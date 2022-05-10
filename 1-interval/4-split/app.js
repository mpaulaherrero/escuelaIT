const {validateMinMax} = require("./validateMinMax");
const {validateNumInterval} = require("./validateNumInterval");
const {intervalSplit} = require("./intervalSplit");
const { Console } = require("console-mpds");
const console = new Console();

let min;
let max;
let error;
do {
    min = console.readNumber("Introduce el mínimo del intervalo: ");
    max = console.readNumber("Introduce el máximo del interval(superior o igual al mínimo): ");
    error = validateMinMax(min, max);
    if(error){
        console.writeln(`Error!!! El máximo debe ser superior o igual al mínimo`);
    }
} while(error);

let numIntervals;
do {
    numIntervals = console.readNumber("Introduce una cantidad positiva de intervalos: ");
    error = validateNumInterval(numIntervals);
    if(error){
        console.writeln(`Error!!! La cantidad debe ser positiva`);
    }
} while(error);

console.writeln(intervalSplit(min, max, numIntervals));