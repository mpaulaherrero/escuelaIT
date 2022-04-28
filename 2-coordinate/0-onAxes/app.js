const {coordinateOnAxes} = require("./coordinateOnAxes");
const { Console } = require("console-mpds");
const console = new Console();

const abscissa = console.readNumber("Dame la abcisa de la coordenada: ");
const ordinate = console.readNumber("Dame la ordenada de la coordenada: ");

console.writeln(coordinateOnAxes(abscissa, ordinate));