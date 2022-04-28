const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Coordenada origen:");
const abscissaOrigin = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateOrigin= console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln("Coordenada destino:");
const abscissaDestiny = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateDestiny= console.readNumber("Dame la ordenada de la coordenada: ");

//movimiento a una casilla adyasente
const moveText = abscissaDestiny == abscissaOrigin && ordinateDestiny == ordinateOrigin ? "no es un movimiento" : (abscissaDestiny == abscissaOrigin-1 || abscissaDestiny == abscissaOrigin+1 || abscissaDestiny == abscissaOrigin) && (ordinateDestiny==ordinateOrigin-1 || ordinateDestiny==ordinateOrigin+1 || ordinateDestiny==ordinateOrigin) ? "si es un movimiento del rey" : "no es un movimiento del rey";

console.writeln(`La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`);