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
        let empty;
        do {
            this.getColumn();
            empty = this.#turn.coordinateColumnEmpty();
            if (!empty) {
                this.#console.writeln(`La columna esta llena, intente con otra`);
            }
        } while (!empty);
        this.#turn.putCoordinate(this.#turn.getToken());
    }

    getColumn() {
        let coordinateView = new CoordinateView(this.#turn.getCoordinate(),this.#console);
        coordinateView.readColumn();
    }
}
