const fractionSubstract = (num1, den1, num2, den2) => {
    return `La resta de la fracción ${num1}/${den1} y la fracción ${num2}/${den2} es la fracción ${num1*den2 - num2*den1}/${den1*den2}`;
}
module.exports = {fractionSubstract}