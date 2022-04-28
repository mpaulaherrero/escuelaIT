const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primera fracción:");
const num1 = console.readNumber("Introduce el numerador de la fracción: ");
const den1 = console.readNumber("Introduce el denominador de la fracción: ");

console.writeln("Segunda fracción:");
const num2 = console.readNumber("Introduce el numerador de la fracción: ");
const den2 = console.readNumber("Introduce el denominador de la fracción: ");

console.writeln(`La suma de la fracción ${num1}/${den1} y la fracción ${num2}/${den2} es la fracción ${num1*den2 + num2*den1}/${den1*den2}`);