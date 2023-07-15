import { PlayersSelectorView } from './PlayersSelectorView.mjs'
import { GameView } from './GameView.mjs'
import { DialogView } from './DialogView.mjs';

export class Connect4View {
    #playersSelectorView

    constructor(){
        this.#playersSelectorView = new PlayersSelectorView(this.play.bind(this));
        DialogView.writeWelcome();
    }

    play() {
        const numPlayers = this.#playersSelectorView.read();
        const gameView = new GameView(numPlayers);
        gameView.play();
    }    
}

window.onload = () => {
    new Connect4View().play();
}