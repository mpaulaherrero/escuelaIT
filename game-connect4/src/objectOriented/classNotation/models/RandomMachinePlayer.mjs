import { MachinePlayer } from "./MachinePlayer.mjs";
import { Coordinate } from "../types/Coordinate.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(color) {
        super(color);
    }

    getColumn(turn){
        let empty;
        do {
            turn.getCoordinate().setColumn(Math.floor(Math.random() * Coordinate.MAX_COLUMNS));
            empty = turn.coordinateColumnEmpty();
        } while (!empty);    
    }

    accept(visitor){
        visitor.visitMachinePlayer(this);
    }

}