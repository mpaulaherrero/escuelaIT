const { Console } = require("console-mpds");
const console = new Console();

const text = console.readString("Dame la cadena de caracteres: ");

let cleanText = "";
for (let i = 0; i < text.length; i++){
    let char = text[i];
    switch(char){
        case " ":
            char = "";
            break;
        case "á":
            char = "a";
            break;
        case "é":
            char = "e";
            break;
        case "í":
            char = "i";
            break;    
        case "ó":
            char = "o";
            break;
        case "ú":
            char = "u";
            break;
    }
    cleanText += char;  
}
//console.log(cleanText);

let ifPalindrome = true;
for (let i = 0, j = cleanText.length-1; ifPalindrome && i < j; i++, j--){
    ifPalindrome = cleanText[i]===cleanText[j];
}
console.writeln( `La cadenas de caracteres "${text}" ${ifPalindrome? ``: `NO `}es Palindromo`);