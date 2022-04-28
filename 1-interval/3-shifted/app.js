const {intervalShifted} = require("./intervalShifted");
const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");
const factor = console.readNumber("Introduce un factor de desplazamiento: ")

console.writeln(intervalShifted(min, max, factor));