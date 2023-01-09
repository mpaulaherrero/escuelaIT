import { Player } from './Player.mjs';

export class UserPlayer extends Player {
    
    constructor(color) {
        super(color);
    }

    accept(visitor){
        visitor.visitUserPlayer();
    }

}