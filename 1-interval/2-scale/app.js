//const { Console } = require("console-mpds");
const { Console } = require("./console");
const console = new Console();

const min = console.readNumber("Introduce el mínimo del intervalo: ");
const max = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");
const scale = console.readFloat("Introduce un factor de escala positivo: ");

const middle = max >= min && scale >=0 ? (min + max) / 2 : undefined;
const distance = middle != undefined ? (max-middle) * scale : undefined;

console.writeln(`${distance != undefined ? `El intervalo [${min}, ${max}] con factor de escala ${scale} es el intervalo [${middle-distance}, ${middle+distance}]` : `El máximo del intervalo no es superior o igual al mínimo o el factor de escala no es positivo`}`);
