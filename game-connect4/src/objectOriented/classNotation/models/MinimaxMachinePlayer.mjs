import { MachinePlayer } from "./MachinePlayer.mjs";
import { Console } from 'console-mpds';

export class MinimaxMachinePlayer extends MachinePlayer {

    static #MAX_STEPS = 4; 
    static #MAX_COST = 1;
    static #OTHER_COST = 0;
    static #MIN_COST = -1;

    #opositeColor
    #console = new Console();

    constructor(color, board) {
        super(color, board);
        this.#opositeColor = this.getColor().getOpposite();
    }

    accept(visitor){
        visitor.visitMinimaxMachinePlayer();
    }

    setColumn(){
        let cost = this.#maximizePlay(0,this.getBoard());
        this.#console.writeln("bestColumn: " + cost[0]);
        this.getCoordinate().setColumn(cost[0]);
    }
    
    #maximizePlay(steps, board) {
        //break
        if (this.#isEnd(steps, board)) return this.#getEndCost(board, MinimaxMachinePlayer.#MIN_COST);
         
        // Column, Score
        let max = [null, MinimaxMachinePlayer.#MIN_COST];

        // For all possible moves
        let emptyColumns = board.getEmptyColumns();
        for (let column of emptyColumns) {
            let newBoard = board.clone(); // Create new board
            newBoard.putCoordinate(column, this.getColor());
            //this.#console.writeln("maximizePlay steps: " + steps + ", maxCost: " + max[1] + ", column: " + column);
            //this.#console.writeln(newBoard.toString());
            let next_move = this.#minimizePlay(steps + 1, newBoard); // Recursive calling
            //this.#console.writeln("maximizePlay steps: " + steps + ", maxCost: " + max[1] + ", nextMoveCost: " + next_move[1]+ ", column: " + column);
            // Evaluate new move
            if (max[0] == null || next_move[1] > max[1]) {
                max[0] = column;
                max[1] = next_move[1];
                //this.#console.writeln("maximizePlay steps: " + steps + ", newCost: " + max[1] + ", newColumn: " + max[0]);
            }
        }
        return max;
    }

    #minimizePlay(steps, board) {
        //break
        if (this.#isEnd(steps, board)) return this.#getEndCost(board, MinimaxMachinePlayer.#MAX_COST);

        // Column, Score
        let min = [null, MinimaxMachinePlayer.#MAX_COST];

        // For all possible moves
        let emptyColumns = board.getEmptyColumns();
        for (let column of emptyColumns) {
            let newBoard = board.clone();
            newBoard.putCoordinate(column, this.#opositeColor);
            //this.#console.writeln("minimizePlay steps: " + steps + ", minCost: " + min[1] + ", column: " + column);
            //this.#console.writeln(newBoard.toString());
            let next_move = this.#maximizePlay(steps + 1, newBoard); // Recursive calling
            //this.#console.writeln("minimizePlay steps: " + steps + ", minCost: " + min[1] + ", nextMoveCost: " + next_move[1] + ", column: " + column);
            // Evaluate new move
            if (min[0] == null || next_move[1] < min[1]) {
                min[0] = column;
                min[1] = next_move[1];
                //this.#console.writeln("minimizePlay steps: " + steps + ", newCost: " + min[1] + ", newColumn: " + min[0]);
            }
        }
        return min;
    }

    #isEnd(steps, board) {
        return steps ===  MinimaxMachinePlayer.#MAX_STEPS || board.isFinished();
    }

    #getEndCost(board, cost){
        let result = [null, cost];
        if(!board.isLastTokenInLine()){
            result[1] = MinimaxMachinePlayer.#OTHER_COST;
        }
        //this.#console.writeln("end cost: " + result[1]);
        return result; 
    }
}