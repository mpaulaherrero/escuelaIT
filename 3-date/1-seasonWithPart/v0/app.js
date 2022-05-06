const { Console } = require("console-mpds");
const console = new Console();

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

let seasonPartText = ` de `;
switch(month){
    case 12:
    case 1:
    case 2:
        seasonPartText = seasonPartText + `invierno`;
        break;
    case 3:
    case 4:
    case 5:
        seasonPartText = seasonPartText + `primavera`;
        break;    
    case 6:
    case 7:
    case 8:
        seasonPartText = seasonPartText + `verano`;
        break;
    case 8:
    case 10:
    case 11:
        seasonPartText = seasonPartText + `otoño`;   
}

switch(month){
    case 3:
    case 6:
    case 9:
    case 12:
        seasonPartText = (day>=21 ?  `primeros` : `finales`) + seasonPartText;
        break;
    case 4:
    case 7:
    case 10:
    case 1:
        seasonPartText = (day>=21 ?  `mediados` : `primeros`) + seasonPartText;
        break;
    case 5:
    case 8:
    case 11:
    case 2:
        seasonPartText = (day>=21 ?  `finales` : `mediados`) + seasonPartText;
}

console.writeln(`El día ${day} del ${month} de ${year} cae a ${seasonPartText}.`);