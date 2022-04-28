const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln(`${max >= min ? `La longitud del intervalo [${min}, ${max}] es ${max-min}` : `El máximo del intervalo no es superior o igual al mínimo`}`);


