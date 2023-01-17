import { NumPlayersMenu } from './NumPlayersMenu.mjs'
import { GameView } from './GameView.mjs'

export class Connect4View {
    #numPlayersMenu
   
    constructor(){
        this.#numPlayersMenu = new NumPlayersMenu(this.play.bind(this));
    }

    play() {
        const numPlayers = this.#numPlayersMenu.read();
        const gameView = new GameView(numPlayers);
        gameView.play();
    }    
}

window.onload = () => {
    new Connect4View().play();
}