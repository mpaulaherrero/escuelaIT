import { CoordinateView } from './CoordinateView.mjs'

export class PlayerView{
    #player
    #console

    constructor(player, console) {
        this.#player = player;
        this.#console = console;
    }

    playTurn() {
        this.#console.writeln(`Turno para ${this.#player.getColor().getCode()}`);
        this.#player.accept(this);
        this.#player.putCoordinate();
    }

    visitUserPlayer() {
        let coordinateView = new CoordinateView(this.#player.getCoordinate(),this.#console);
        let empty;
        do {
            coordinateView.readColumn();
            empty = this.#player.isCoordinateColumnEmpty();
            if (!empty) {
                this.#console.writeln(`La columna esta llena, intente con otra`);
            }
        } while (!empty);
    }
    
    visitMachinePlayer() {
        this.#player.setColumn();
        this.#console.writeln(`Columna a colocar: ${this.#player.getCoordinate().getColumn()+1}`); 
    }
}
