import { Color } from "../../types/Color.mjs"
import { DialogView } from './DialogView.mjs'
export class PlayerView{
    #player
    #boardView
    #callback
    #thinking

    constructor(player, boardView, callback) {
        this.#player = player;
        this.#boardView = boardView;
        this.#callback = callback;

        this.#renderHTML();
    }

    #renderHTML(){
        document.getElementById('turn').innerHTML = "";
        const title = document.createElement('h2');
        title.classList.add('turn-text');
        title.innerText= 'Turno';
        document.getElementById('turn').append(title);
        const div = document.createElement('div');
        div.classList.add('turn');
        div.append(this.#getTurnPlayerTable(Color.RED.getCode()));
        div.append(this.#getTurnPlayerTable(Color.YELLOW.getCode()));
        document.getElementById('turn').append(div);
    }    

    #getTurnPlayerTable(playerCode){
        const table = document.createElement('table');
        table.id = `turn_board_player${playerCode}`;
        table.classList.add('turn_board');
        const tbody = document.createElement('tbody');
        table.append(tbody);
        const tr = document.createElement('tr');
        tbody.append(tr);
        const td = document.createElement('td');
        td.classList.add('coin');
        td.classList.add(`player${playerCode}-coin`);
        tr.append(td)
        return table;
    }

    playTurn() {
        const playerCode = this.#player.getColor().getCode();
        const oppositeCode = this.#player.getColor().getOpposite().getCode();
        document.getElementById(`turn_board_player${oppositeCode}`).classList.remove('turn_active');
        document.getElementById(`turn_board_player${playerCode}`).classList.add('turn_active');
        this.#player.accept(this);
    }

    getBoardColumn(column){
        this.#player.getCoordinate().setColumn(column);
        if (!this.#player.isCoordinateColumnEmpty()) {
            DialogView.write(`La columna esta llena, intente con otra`);
        } else {
            this.#player.putCoordinate();
            document.getElementById('game_board').classList.remove('userPlayer');
            DialogView.write('');
            this.#boardView.removeEvent();
            this.#callback();
        }
    }

    visitUserPlayer() {
        document.getElementById('game_board').classList.add('userPlayer');
        DialogView.writeIfNotWelcome(`Selecciona una columna`);
        this.#boardView.addEvent(this.getBoardColumn.bind(this));
    }
    
    putToken(message){
        this.#thinking = document.createElement('div');
        this.#thinking.id="loading";
        this.#thinking.innerText=message;
        document.getElementsByClassName('box-left')[0].append(this.#thinking);

        document.getElementById('loading').style.display = "block";
        setTimeout(function() {
            this.#player.setColumn();
            this.#player.putCoordinate();
            document.getElementById('game_board').classList.remove('userPlayer');
            this.#callback();
            this.#thinking.remove();
        }.bind(this), 100);
    }

    visitMachinePlayer() {
        this.putToken("La Máquina esta pensado...");
    }

    visitMinimaxMachinePlayer() {
        this.putToken("La IA esta pensado...");
    }
}
