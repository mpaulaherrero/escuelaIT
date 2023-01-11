import { Player } from './Player.mjs';
import { assert} from "../utils/assert.mjs";

export class UserPlayer extends Player {
    
    constructor(color, board) {
        super(color, board);
    }

    accept(visitor){
        visitor.visitUserPlayer();
    }

    getColumn(){
        assert(false,"El usuario escoge su columna mediante la vista");
    }
    
}