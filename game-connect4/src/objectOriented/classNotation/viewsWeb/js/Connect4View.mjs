import { NumPlayersMenu } from './NumPlayersMenu.mjs'
import { GameView } from './GameView.mjs'
import { DialogView } from './DialogView.mjs';

export class Connect4View {
    #numPlayersMenu
   
    constructor(){
        this.#numPlayersMenu = new NumPlayersMenu(this.play.bind(this));
        DialogView.writeWelcome();
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