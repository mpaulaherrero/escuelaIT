const dateValid = (day, month, year) => {
    const validYear = year >= 0 ? true:false;
    const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? true: false;
    const validMonth = 1<= month && month <= 12? true:false;
    const month30Days = month==4 || month==6 || month==9 || month==11 ? true: false;
    const maxMonthDays = (leapYear && month==2)? 29 : (!leapYear && month==2 ? 28 : (month30Days? 30: 31 ))
    const validDay = day > 0  && day <= maxMonthDays ? true: false;
    const validText = validYear && validMonth && validDay ? "sí es válida": "no es válida";
    
    return `La fecha ${day}/${month}/${year} ${validText}`;
}
module.exports = {dateValid}