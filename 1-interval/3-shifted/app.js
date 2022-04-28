const { Console } = require("console-mpds");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");
const factor = console.readNumber("Introduce un factor de desplazamiento: ")

console.writeln(`${max >= min ? `El intervalo [${min}, ${max}] con factor de desplazamiento ${factor} es el intervalo [${min+factor}, ${max+factor}]` : `El máximo del intervalo no es superior o igual al mínimo`}`);