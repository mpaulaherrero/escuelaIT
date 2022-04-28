const { Console } = require("console-mpds");
const console = new Console();

const abscissa = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinate = console.readNumber("Dame la ordenada de la coordenada: ");

const axisText = abscissa == 0 && ordinate == 0 ? "está en el eje de abcisas y de ordenadas" : (abscissa == 0 ? "está en el eje de abcisas" : (ordinate == 0 ? "está en el eje de ordenadas" : "no está en ningún eje"));

console.writeln(`La coordenada (${abscissa},${ordinate}) ${axisText}`);