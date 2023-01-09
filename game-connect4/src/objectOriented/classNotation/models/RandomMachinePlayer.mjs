import { MachinePlayer } from "./MachinePlayer.mjs";
import { Coordinate } from "../types/Coordinate.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(color, turn) {
        super(color, turn);
    }

    accept(visitor){
        visitor.visitMachinePlayer(this);
    }

    getColumn(){
        let empty;
        do {
            this.turn.getCoordinate().setColumn(Math.floor(Math.random() * Coordinate.MAX_COLUMNS));
            empty = this.turn.coordinateColumnEmpty();
        } while (!empty);    
    }
}