const { Console } = require("console-mpds");
const console = new Console();

const numerator = console.readNumber("Introduce el numerador de la fracción: ");
const denominator = console.readNumber("Introduce el denominador de la fracción: ");

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
    console.writeln(`La fracción ${numerator}/${denominator} ${gcd>1 ?`= ${numerator/gcd}/${denominator/gcd} `:``}invertida es la fracción ${denominator/gcd}/${numerator/gcd}`);
} else {
    console.writeln(`La fracción ${numerator}/${denominator} no se puede invertir`);
}