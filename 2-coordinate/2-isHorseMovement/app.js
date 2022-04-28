const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Coordenada origen:");
const abscissaOrigin = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateOrigin= console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln("Coordenada destino:");
const abscissaDestiny = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateDestiny= console.readNumber("Dame la ordenada de la coordenada: ");

//hay 8 posibles movimientos: 
//1) x+2, y+1. 2) x+2, y-1. 
//3) x-2, y+1. 4) x-2, y-1. 
//5) x+1, y+2. 6) x+1, y-2. 
//7) x-1, y+2. 8) x-1, y-2

const moveText = abscissaOrigin+2 == abscissaDestiny && ( ordinateOrigin+1==ordinateDestiny || ordinateOrigin-1==ordinateDestiny) ||
    abscissaOrigin-2 == abscissaDestiny && ( ordinateOrigin+1==ordinateDestiny || ordinateOrigin-1==ordinateDestiny) ||
    abscissaOrigin+1 == abscissaDestiny && ( ordinateOrigin+2==ordinateDestiny || ordinateOrigin-2==ordinateDestiny) ||
    abscissaOrigin-1 == abscissaDestiny && ( ordinateOrigin+2==ordinateDestiny || ordinateOrigin-2==ordinateDestiny) ? "si es un movimiento del caballo" : "no es un movimiento del caballo";

console.writeln(`La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`);