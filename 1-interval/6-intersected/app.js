const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primer intervalo:");
const min1 = console.readNumber("Introduce el mínimo del intervalo: ");
const max1 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln("Segundo intervalo:");
const min2 = console.readNumber("Introduce el mínimo del intervalo: ");
const max2 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

const interText = max1 < min2 || max2 < min1 ? "no intersecta" : "si intersecta";

console.writeln(`${max1 >= min1 && max2 >= min2 ? `El intervalo [${min1}, ${max1}] ${interText} con el intervalo [${min2}, ${max2}]` : `En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo`}`);