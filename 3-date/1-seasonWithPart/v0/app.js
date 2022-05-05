const {dateSeasonWithPart} = require("./dateSeasonWithPart");
const { Console } = require("console-mpds");
const console = new Console();

const day = console.readNumber("Escriba un día (1-30): ");
const month = console.readNumber("Escriba un mes (1-12)");
const year = console.readNumber("Escriba un año (1-...): ");

console.writeln(dateSeasonWithPart(day, month, year));
