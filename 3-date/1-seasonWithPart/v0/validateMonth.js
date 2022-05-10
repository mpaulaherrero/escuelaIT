const validateMonth = (month) => {
    return month < 1 || month > 12
}
module.exports = {validateMonth}