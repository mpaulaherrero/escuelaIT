const { Console } = require("console-mpds");
const console = new Console();

const numerator = console.readNumber("Introduce el numerador de la fracción: ");
const denominator = console.readNumber("Introduce el denominador de la fracción: ");

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

console.writeln(`La fracción ${numerator}/${denominator} ${gcd>1 ?`= ${numerator/gcd}/${denominator/gcd} `:``}invertida es la fracción ${denominator/gcd}/${numerator/gcd}`);