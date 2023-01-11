import { Player } from './Player.mjs';

export class MachinePlayer extends Player {
    constructor(color, board) {
        super(color, board);
    }

    accept(visitor){}
    
    getColumn(){}

    setColumn(){
        do {
            this.getCoordinate().setColumn(this.getColumn());
        } while (!this.isCoordinateColumnEmpty());    
    }

}