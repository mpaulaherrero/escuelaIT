const {validateMinMax} = require("./validateMinMax");
const {validateNumInterval} = require("./validateNumInterval");
const {intervalSplit} = require("./intervalSplit");
const { Console } = require("console-mpds");
const console = new Console();

let min;
let max;
let numInterval;
let error;
do {
    min = console.readNumber("Introduce el mínimo del intervalo: ");
    max = console.readNumber("Introduce el máximo del interval(superior o igual al mínimo): ");
    error = validateMinMax(min, max);
    if(error!==''){
        console.writeln(error);
    }
} while(error!=='');

do {
    numInterval = console.readNumber("Introduce una cantidad positiva de intervalos: ");
    error = validateNumInterval(numInterval);
    if(error!==''){
        console.writeln(error);
    }
} while(error!=='');

console.writeln(intervalSplit(min, max, numInterval));