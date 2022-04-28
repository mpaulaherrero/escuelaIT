const datePrevious = (day, month, year) => {
    const validYear = year >= 0 ? true:false;
    const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true: false;
    const validMonth = 1<= month && month <= 12? true:false;
    let month30Days = month==4 || month==6 || month==9 || month==11 ? true: false;
    let maxMonthDays = (leapYear && month==2)? 29 : (!leapYear && month==2 ? 28 : (month30Days? 30: 31 ))
    const validDay = day > 0  && day <= maxMonthDays ? true: false;
    const validDate = validYear && validMonth && validDay;

    let newDay = day-1;
    let changeNewDay=false;
    let newMonth = newDay <= 0 ? (changeNewDay=true, month-1) : month; 
    const newYear = newMonth <=0 ? (newMonth=12, year-1) : year; 
    month30Days = newMonth==4 || newMonth==6 || newMonth==9 || newMonth==11 ? true: false;
    maxMonthDays = (leapYear && newMonth==2)? 29 : (!leapYear && newMonth==2 ? 28 : (month30Days? 30: 31 ))
    newDay = changeNewDay ? maxMonthDays: newDay;

    return validDate ? `La fecha ${day}/${month}/${year} y la anterior es ${newDay}/${newMonth}/${newYear}`: `La fecha ${day}/${month}/${year} no es válida`;
}
module.exports = {datePrevious}