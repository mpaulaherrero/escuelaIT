const { Console } = require("console-mpds");
const console = new Console();

const rows = console.readNumber("Dame el número de filas: ");
const columns = console.readNumber("Dame el número de columnas: ");
const longMatrix = 5;
let matrix = "";

for(let i=1; i<rows + longMatrix ; i++){
    for(let j=1; j<columns + longMatrix; j++){
        if( (j==columns && i>=rows) || 
            (j==columns+longMatrix-1 && i>=rows) || 
            (i==rows && j>=columns) || 
            (i==rows+longMatrix-1 && j>=columns)){
            matrix +="*";
        } else {
            matrix +=".";
        }
    }
    matrix += "\n";
}
console.writeln(matrix);
