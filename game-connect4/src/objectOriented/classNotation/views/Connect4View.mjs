import { YesNoDialog } from './YesNoDialog.mjs'
import { NumPlayersMenu } from './NumPlayersMenu.mjs'
import { GameView } from './GameView.mjs'

export class Connect4View {
    #continueDialog 
    #console
    #numPlayersMenu
  
    constructor(console){
        this.#console = console;
        this.#continueDialog = new YesNoDialog(`¿Quieres jugar otra partida? `, this.#console);
        this.#numPlayersMenu = new NumPlayersMenu(this.#console);
    }

    play() {
        do {
            const numPlayers = this.#numPlayersMenu.read();
            const gameView = new GameView(numPlayers,this.#console);
            gameView.play();
            this.#continueDialog.read();
        } while (this.#continueDialog.isAffirmative());
    }    
}