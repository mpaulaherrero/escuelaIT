import { Line } from "../../models/Line.mjs";
import { Color } from "../../types/Color.mjs";

export class BoardView {

    static GAME_BOARD_ID = "game_board";

    #board
    #tBody
    #eventListener

    constructor(board) {
      this.#board = board;
      this.#tBody = document.createElement('tbody');

      this.#renderHTML();
    }

    #renderHTML(){
      document.getElementsByClassName('box-left')[0].innerHTML="";
      let boardHTML = document.createElement('table');
      boardHTML.id = BoardView.GAME_BOARD_ID;
      boardHTML.append(this.#tBody);
      document.getElementsByClassName('box-left')[0].append(boardHTML);

      for (let row = 0; row < this.#board.getMaxRows(); row++) {
        let tr = document.createElement('tr');
        for (let column = 0; column < this.#board.getMaxColumns(); column++) {
          let td = document.createElement('td');
          td.classList.add('empty');
          tr.append(td);
        }
        this.#tBody.append(tr);
      }  
    }

    addEvent(callback){
      document.getElementById(BoardView.GAME_BOARD_ID).classList.add('userPlayer');
      this.#eventListener = (e) => {
        callback(e.target.cellIndex);
      }
      this.#tBody.addEventListener('click', this.#eventListener);
    }

    removeEvent(){
      document.getElementById(BoardView.GAME_BOARD_ID).classList.remove('userPlayer');
      this.#tBody.removeEventListener('click', this.#eventListener);
    }

    writeTokens() {
      for (let row = 0; row < this.#board.getMaxRows(); row++) {
        const tr = this.#tBody.children[row];
        for (let column = 0; column < this.#board.getMaxColumns(); column++) {
          const td = tr.children[column];
          const token = this.#board.getToken(row,column)
          switch(token){
            case Color.NULL:
              td.classList.add('empty');
              break;
            default:
              td.classList.add('coin');
              td.classList.add(`player${token.getCode()}-coin`);
              
          }
        }
      }
    }

    displayWinnerLine(){
      document.getElementById(BoardView.GAME_BOARD_ID).className = "finished";
      const winnerLine = this.#board.getWinnerLine().getCoordinates();
      for (var i = 0; i < Line.LENGTH; i++) {
          document.getElementById('game_board').rows[winnerLine[i].getRow()].cells[winnerLine[i].getColumn()].classList.add("win");
      }
    }
}    
