const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primer intervalo:");
const min1 = console.readNumber("Introduce el mínimo del intervalo: ");
const max1 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln("Segundo intervalo:");
const min2 = console.readNumber("Introduce el mínimo del intervalo: ");
const max2 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

const minInter = min1 <= min2 ? min2 : min1;
const maxInter = max1 <= max2 ? max1 : max2;

const interText = max1 < min2 || max2 < min1 ? `El intervalo [${min1}, ${max1}] no intersecta con el intervalo [${min2}, ${max2}]` : `El intervalo [${min1}, ${max1}] intersección con el intervalo [${min2}, ${max2}] es el intervalo [${minInter}, ${maxInter}]`;

console.writeln(`${max1 >= min1 && max2 >= min2 ? `${interText}` : `En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo`}`);