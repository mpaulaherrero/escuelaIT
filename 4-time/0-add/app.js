const {timeAdd} = require("./timeAdd");
const { Console } = require("console-mpds");
const console = new Console();

console.writeln("Primera duración:")
const hour1 = console.readNumber("Dame las horas: ");
const min1 = console.readNumber("Dame los minutos: ");
const seg1 = console.readNumber("Dame los segundos: ");

console.writeln("Segunda duración:")
const hour2 = console.readNumber("Dame las horas: ");
const min2 = console.readNumber("Dame los minutos: ");
const seg2 = console.readNumber("Dame los segundos: ");

console.writeln(timeAdd(hour1, min1, seg1, hour2, min2, seg2));
