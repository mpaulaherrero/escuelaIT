const {dateSeasonWithPart} = require("./dateSeasonWithPart");
const {validateDay} = require("./validateDay");
const {validateMonth} = require("./validateMonth");
const {validateYear} = require("./validateYear");
const { Console } = require("console-mpds");
const console = new Console();

let error;
let day;
do {
    day = console.readNumber("Escriba un día (1-30): ");
    error =  validateDay(day);
    if (error){
        console.writeln(`Error!!! El día debe ser un número entre 1-30`);
    } 
} while(error);

let month;
do {
    month = console.readNumber("Escriba un mes (1-12): ");
    error = validateMonth(month);
    if (error){
        console.writeln(`Error!!! El mes debe ser un número entre 1-12`);
    } 
} while(error);

let year;
do {
    year = console.readNumber("Escriba un año (1-...): ");
    error = validateYear(year);
    if (error){
        console.writeln(`Error!!! El año debe ser un número mayor o igual a 1`);
    } 
} while(error);

console.writeln(dateSeasonWithPart(day, month, year));