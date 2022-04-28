const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln(`${max >= min ? `El intervalo [${min}, ${max}] simétrico al origen es  [${max*-1}, ${min*-1}]` : `El máximo del intervalo no es superior o igual al mínimo`}`);