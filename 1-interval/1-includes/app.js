const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");
const point = console.readNumber("Introduce un punto: ")

const includeText = min <= point && point <= max ? `si incluye`: `no incluye`;

console.writeln(`${max >= min ? `El intervalo [${min}, ${max}] ${includeText} el punto ${point}`  : `El máximo del intervalo no es superior o igual al mínimo`}`);