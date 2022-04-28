const {fractionSubstract} = require("./fractionSubstract");
const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primera fracción:");
const num1 = console.readNumber("Introduce el numerador de la fracción: ");
const den1 = console.readNumber("Introduce el denominador de la fracción: ");

console.writeln("Segunda fracción:");
const num2 = console.readNumber("Introduce el numerador de la fracción: ");
const den2 = console.readNumber("Introduce el denominador de la fracción: ");

console.writeln(fractionSubstract(num1, den1, num2, den2));
