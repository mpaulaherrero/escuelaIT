import { Player } from './Player.mjs';

export class MachinePlayer extends Player {
    turn

    constructor(color,turn) {
        super(color);
        this.turn = turn;
    }

    accept(visitor){}
    
    getColumn(){}

}