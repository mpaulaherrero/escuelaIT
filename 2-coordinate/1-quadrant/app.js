const { Console } = require("console-mpds");
const console = new Console();

const abscissa = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinate = console.readNumber("Dame la ordenada de la coordenada: ");

const axisText = abscissa == 0 && ordinate == 0 ? "no esta en ningun cuadrante" : (abscissa > 0 ? (ordinate > 0 ? "está en el 1º cuadrante" : "está en el 4º cuadrante") : (ordinate > 0 ? "está en el 2º cuadrante" : "está en el 3º cuadrante"));

console.writeln(`La coordenada (${abscissa},${ordinate}) ${axisText}.`);