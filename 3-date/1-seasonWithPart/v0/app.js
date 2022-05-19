const { Console } = require("console-mpds");
const console = new Console();

const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 12 * DAYS_PER_MONTH;
const MONTHS_PER_SEASON = 3;
const DAYS_PER_SEASON = MONTHS_PER_SEASON * DAYS_PER_MONTH;
const OFFSET_DAYS = 21 + 2 * DAYS_PER_MONTH;

let error;
let day;
do {
    day = console.readNumber("Escriba un día (1-30): ");
    error =  day < 1 || day > 30;
    if (error){
        console.writeln(`Error!!! El día debe ser un número entre 1-30`);
    } 
} while(error);

let month;
do {
    month = console.readNumber("Escriba un mes (1-12): ");
    error = month < 1 || month > 12;
    if (error){
        console.writeln(`Error!!! El mes debe ser un número entre 1-12`);
    } 
} while(error);

let year;
do {
    year = console.readNumber("Escriba un año (1-...): ");
    error = year < 1;
    if (error){
        console.writeln(`Error!!! El año debe ser un número mayor o igual a 1`);
    } 
} while(error);

const periods = [`a primeros`,  `a mediados`, `a finales` ];
const seasons = [`primavera`,  `verano`, `otoño`, `invierno` ];

const dayOfYear = DAYS_PER_MONTH * (month - 1) + day;
let dayOfSolarYear = dayOfYear - OFFSET_DAYS + 1;
if(dayOfSolarYear < 1){
    dayOfSolarYear = dayOfYear - OFFSET_DAYS + DAYS_PER_YEAR;
}
let iPeriods = (dayOfSolarYear-dayOfSolarYear % DAYS_PER_MONTH) / DAYS_PER_MONTH;
let iSeasons = ((dayOfSolarYear-1)-(dayOfSolarYear-1) % DAYS_PER_SEASON) / DAYS_PER_SEASON;

const period=periods[iPeriods % MONTHS_PER_SEASON];
const season=seasons[iSeasons];

console.writeln(`El día ${day} del ${month} de ${year} cae a ${period} de ${season}.`);