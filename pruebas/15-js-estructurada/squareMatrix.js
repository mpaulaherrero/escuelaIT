const { Console } = require("console-mpds");
const console = new Console();

const LONG_MATRIX = 5;
const rows = console.readNumber("Dame el número de filas: ");
const columns = console.readNumber("Dame el número de columnas: ");
let matrix = "";
for(let i=1; i<rows + LONG_MATRIX ; i++){
    for(let j=1; j<columns + LONG_MATRIX; j++){
        if( (j==columns && i>=rows) || 
            (j==columns+LONG_MATRIX-1 && i>=rows) || 
            (i==rows && j>=columns) || 
            (i==rows+LONG_MATRIX-1 && j>=columns)){
            matrix +="*";
        } else {
            matrix +=".";
        }
    }
    matrix += "\n";
}
console.writeln(matrix);
