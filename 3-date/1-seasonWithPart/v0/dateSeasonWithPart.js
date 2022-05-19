const dateSeasonWithPart = (day, month, year) => {

    const DAYS_PER_MONTH = 30;
    const DAYS_PER_YEAR = 12 * DAYS_PER_MONTH;
    const MONTHS_PER_SEASON = 3;
    const DAYS_PER_SEASON = MONTHS_PER_SEASON * DAYS_PER_MONTH;
    const OFFSET_DAYS = 21 + 2 * DAYS_PER_MONTH;

    const periods = [`primeros`,  `mediados`, `finales` ];
    const seasons = [`primavera`,  `verano`, `otoño`, `invierno` ];

    const dayOfYear = DAYS_PER_MONTH * (month - 1) + day;
    let dayOfSolarYear = dayOfYear - OFFSET_DAYS + 1;
    if(dayOfSolarYear < 1){
        dayOfSolarYear = dayOfYear - OFFSET_DAYS + DAYS_PER_YEAR;
    }

    const period=periods[parseInt(dayOfSolarYear / DAYS_PER_MONTH) % MONTHS_PER_SEASON];
    const season=seasons[parseInt((dayOfSolarYear-1) / DAYS_PER_SEASON)];

    return `El día ${day} del ${month} de ${year} cae a ${period} de ${season}.`;
}
module.exports = {dateSeasonWithPart}