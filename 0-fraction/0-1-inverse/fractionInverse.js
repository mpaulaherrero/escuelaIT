const fractionInverse = (numerator, denominator) => {
    let gcd=numerator;
    let b=denominator;
    if(gcd < b){
        gcd=denominator;
        b=numerator;
    }

    while(gcd > b){
        gcd=gcd-b;
    }
    
    //console.writeln(`El máximo común divisor ${gcd}`);
    return `La fracción ${numerator}/${denominator} ${gcd>1 ?`= ${numerator/gcd}/${denominator/gcd} `:``}invertida es la fracción ${denominator/gcd}/${numerator/gcd}`;
}
module.exports = {fractionInverse}