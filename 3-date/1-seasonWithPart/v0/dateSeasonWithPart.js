const dateSeasonWithPart = (day, month, year) => {
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

    return `El día ${day} del ${month} de ${year} cae a ${seasonPartText}.`;
}
module.exports = {dateSeasonWithPart}