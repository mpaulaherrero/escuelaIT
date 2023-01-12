import { MachinePlayer } from "./MachinePlayer.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(color, board) {
        super(color, board);
    }

    accept(visitor){
        visitor.visitMachinePlayer();
    }

    setColumn(){
       const emptyColumns = this.board.getEmptyColumns();
       this.getCoordinate().setColumn(emptyColumns[Math.floor(Math.random() * emptyColumns.length)]);
    }
}