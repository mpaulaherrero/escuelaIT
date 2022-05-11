const { Console } = require("console-mpds");
const console = new Console();

const text = console.readString("Dame la cadena de caracteres: ");

let cleanText = "";
for (let i = 0; i < text.length; i++){
    let char = text[i];
    switch(char){
        case " ":
            char = "";
            break
        case "Á":
        case "á":
            char = "a";
            break;
        case "É":
        case "é":
            char = "e";
            break;
        case "Í":
        case "í":
            char = "i";
            break;    
        case "Ó":
        case "ó":
            char = "o";
            break;
        case "Ú":
        case "ú":
            char = "u";
            break;
        default:
            if ( 65<= char.charCodeAt(0) && char.charCodeAt(0) <= 90){
                char = String.fromCharCode(char.charCodeAt(0)+32);
            }    
    }
    cleanText += char;  
}
//console.log(cleanText);

let result = true;
for (let i = 0, j = cleanText.length-1; i < j; i++, j--){
    if(cleanText[i]!==cleanText[j]){
        result=false;
        break;
    }
}
console.writeln( `La cadenas de caracteres "${text}" ${result? `es`: `NO es`} Palindromo`);