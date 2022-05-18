const { Console } = require("console-mpds");
const console = new Console();

const MAX_SQUARE_INDEX = 4;
const CHAR_ASTERISK = "* ";
const CHAR_POINT = ". ";
const CHAR_END_LINE = "\n";

const rows = console.readNumber("Dame el número de filas: ");
const columns = console.readNumber("Dame el número de columnas: ");

let matrix = "";
for(let i=0; i<= MAX_SQUARE_INDEX * rows; i++){
    for(let j=0; j<= MAX_SQUARE_INDEX * columns; j++){
        if( i % MAX_SQUARE_INDEX===0 || j % MAX_SQUARE_INDEX===0) {
            matrix +=CHAR_ASTERISK;
        } else {
            matrix +=CHAR_POINT;
        }
    }
    matrix += CHAR_END_LINE;
}
console.writeln(matrix);
