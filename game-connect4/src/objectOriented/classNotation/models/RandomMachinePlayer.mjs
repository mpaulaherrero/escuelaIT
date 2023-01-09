import { MachinePlayer } from "./MachinePlayer.mjs";
import { Coordinate } from "../types/Coordinate.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(color) {
        super(color);
    }

    getColumn(){
        return  Math.floor(Math.random() * Coordinate.MAX_COLUMNS);
    }

    accept(visitor){
        visitor.visitMachinePlayer(this);
    }

}