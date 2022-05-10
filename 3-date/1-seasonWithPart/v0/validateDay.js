const validateDay = (day) => {
     return day < 1 || day > 30;
}
module.exports = {validateDay}