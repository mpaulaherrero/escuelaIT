import { YesNoDialog } from '../types/YesNoDialog.mjs'
import { NumPlayersMenu } from './NumPlayersMenu.mjs'
import { GameView } from './GameView.mjs'

export class MastermindView {

    #console
    #continueDialog
    #numPlayersMenu

    constructor(console){
        this.#console = console;
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