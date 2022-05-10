const fractionInverse = (numerator, denominator) => {
    let gcd=numerator;
    let rest=denominator;
    if(gcd < rest){
        gcd=denominator;
        rest=numerator;
    }
    if(rest!=0){
        while(gcd > rest){
            gcd=gcd-rest;
        }
        return `La fracción ${numerator}/${denominator} ${gcd>1 ?`= ${numerator/gcd}/${denominator/gcd} `:``}invertida es la fracción ${denominator/gcd}/${numerator/gcd}`;
    } else {
        return `La fracción ${numerator}/${denominator} no se puede invertir`;
    }
}
module.exports = {fractionInverse}