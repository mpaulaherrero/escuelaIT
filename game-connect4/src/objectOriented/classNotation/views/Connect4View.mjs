import { Console } from 'console-mpds'
import { YesNoDialog } from './YesNoDialog.mjs'
import { GameView } from './GameView.mjs'

export class Connect4View {
    #continueDialog 
    #console
  
    constructor(){
        this.#console = new Console();
        this.#continueDialog = new YesNoDialog(`¿Quieres jugar otra partida? `, this.#console);
    }

    play() {
        do {
            const gameView = new GameView(this.#console);
            gameView.play();
            this.#continueDialog.read();
        } while (this.#continueDialog.isAffirmative());
    }    
}