const {coordinateIsHorizontal} = require("./coordinateIsHorizontal");
const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Coordenada origen:");
const abscissaOrigin = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateOrigin= console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln("Coordenada destino:");
const abscissaDestiny = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinateDestiny= console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln(coordinateIsHorizontal(abscissaOrigin, ordinateOrigin, abscissaDestiny, ordinateDestiny));
