import { YesNoDialog } from './YesNoDialog.mjs'
import { NumPlayersMenu } from './NumPlayersMenu.mjs'
import { GameView } from './GameView.mjs'
import { ConsoleView } from './ConsoleView.mjs'

export class MastermindView {

    #console
    #continueDialog
    #numPlayersMenu

    constructor(){
        this.#console = new ConsoleView();
        this.#continueDialog = new YesNoDialog(`Do you want to continue? (y/n): `, this.#console);
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