import { CoordinateView } from '../views/CoordinateView.mjs'

export class TurnView{
    #turn
    #console

    constructor(turn, console) {
        this.#turn = turn;
        this.#console = console;
    }

    playTurn() {
        this.#console.writeln(`Turno para ${this.#turn.getToken().getCode()}`);
        this.getColumn();
        this.#turn.putCoordinate(this.#turn.getToken());
    }

    getColumn() {
        this.#turn.getActivePlayer().accept(this);
    }

    visitUserPlayer() {
        let coordinateView = new CoordinateView(this.#turn.getCoordinate(),this.#console);
        let empty;
        do {
            coordinateView.readColumn();
            empty = this.#turn.coordinateColumnEmpty();
            if (!empty) {
                this.#console.writeln(`La columna esta llena, intente con otra`);
            }
        } while (!empty);
    }
    
    visitMachinePlayer(machinePlayer) {
        machinePlayer.getColumn();
        this.#console.writeln(`Columna a colocar: ${this.#turn.getCoordinate().getColumn()+1}`); 
    }
}
