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

let addValue = 0;
let newSeg = seg1 + seg2 
newSeg = newSeg < 60 ? newSeg: (addValue = 1, newSeg - 60);
let newMin = min1 + min2 + addValue;
addValue = 0;
newMin = newMin < 60 ? newMin: (addValue = 1, newMin - 60);
const newHour = hour1 + hour2 + addValue;

console.writeln(`La hora ${hour1}:${min1}:${seg1} sumada con la hora ${hour2}:${min2}:${seg2} es ${newHour}:${newMin}:${newSeg}`);