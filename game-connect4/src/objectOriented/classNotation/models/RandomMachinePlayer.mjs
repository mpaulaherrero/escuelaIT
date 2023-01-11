import { MachinePlayer } from "./MachinePlayer.mjs";
import { Coordinate } from "../types/Coordinate.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(color, board) {
        super(color, board);
    }

    accept(visitor){
        visitor.visitMachinePlayer(this);
    }

    setColumn(){
        do {
           this.getCoordinate().setColumn(Math.floor(Math.random() * Coordinate.MAX_COLUMNS));
        } while (!this.isCoordinateColumnEmpty());
    }
}