const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Coordenada origen:");
const abscissaOrigin = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateOrigin= console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln("Coordenada destino:");
const abscissaDestiny = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateDestiny= console.readNumber("Dame la ordenada de la coordenada: ");

let diffAbscissa = abscissaOrigin - abscissaDestiny;
diffAbscissa = diffAbscissa < 0 ? diffAbscissa * -1 : diffAbscissa;
let diffOrdinate = ordinateOrigin - ordinateDestiny;
diffOrdinate = diffOrdinate < 0 ? diffOrdinate * -1 : diffOrdinate;

// movimiento horizontal, vertical o diagonal
const moveText = ordinateOrigin == ordinateDestiny || abscissaOrigin == abscissaDestiny || diffAbscissa ==  diffOrdinate ? "si es un movimiento de la reina" : "no es un movimiento de la reina";

console.writeln(`La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`);