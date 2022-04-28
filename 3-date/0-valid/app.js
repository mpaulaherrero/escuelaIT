const {dateValid} = require("./dateValid");
const { Console } = require("console-mpds");
const console = new Console();

const day = console.readNumber("Dame el día: ");
const month = console.readNumber("Dame el mes: ");
const year = console.readNumber("Dame el año: ");

console.writeln(dateValid(day, month, year));