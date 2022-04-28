const {intervalScale} = require("./intervalScale");
//const { Console } = require("console-mpds");
const { Console } = require("./console");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");
const scale = console.readFloat("Introduce un factor de escala positivo: ");

console.writeln(intervalScale(min, max, scale));
