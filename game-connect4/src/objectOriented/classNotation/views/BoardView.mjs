export class BoardView {
    #board
    #console

    constructor(board,console) {
        this.#board = board;
        this.#console = console;
    }    

    writeTokens() {
        const VERTICAL_SEPARATOR = `|`;
        let boardToString = `\n`;
        for (let row = 0; row < this.#board.getMaxRows(); row++) {
          for (let column = 0; column < this.#board.getMaxColumns(); column++) {
            boardToString += `${VERTICAL_SEPARATOR} ${this.#board.getToken(row,column)} `;
          }
          boardToString += `${VERTICAL_SEPARATOR}\n`;
        }
        boardToString +=  `+---------------------------+\n`;
        boardToString +=  `  1   2   3   4   5   6   7  \n`;
        this.#console.writeln(boardToString);
    }
}    
