const {intervalUnion} = require("./intervalUnion");
const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primer intervalo:");
const min1 = console.readNumber("Introduce el mínimo del intervalo: ");
const max1 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln("Segundo intervalo:");
const min2 = console.readNumber("Introduce el mínimo del intervalo: ");
const max2 = console.readNumber("Introduce el máximo del intervalo (superior o igual al mínimo): ");

console.writeln(intervalUnion(min1, max1, min2, max2));

