import { UserPlayer } from '../models/UserPlayer.mjs'
import { RandomMachinePlayer } from '../models/RandomMachinePlayer.mjs'

export class Turn {
    static NUMBER_PLAYERS  = 2;

    #players
    #activePlayer

    constructor(board, numOfPlayers){
        this.#players = [];
        this.#activePlayer = 0;

        for (let i = 0; i < Turn.NUMBER_PLAYERS; i++) {
            this.#players[i] = i < numOfPlayers ?
              new UserPlayer(i,board) :
              new RandomMachinePlayer(i, board);
        }
    }

    next() {
        this.#activePlayer = (this.#activePlayer + 1) % Turn.NUMBER_PLAYERS;
    }
    
    getToken() {
        return this.#players[this.#activePlayer].getColor();
    }

    getActivePlayer() {
        return this.#players[this.#activePlayer];
    }
}
