import { MachinePlayer } from "./MachinePlayer.mjs";
import { Line } from './Line.mjs'
//import { logger } from "../utils/logger.mjs";

export class MinimaxMachinePlayer extends MachinePlayer {

    static #MAX_STEPS = 4; 
    static #MAX_COST = 1;
    static #MIN_COST = -1;
    static #MAX_LIMIT = 1000;

    #opositeColor

    constructor(color, board) {
        super(color, board);
        this.#opositeColor = this.getColor().getOpposite();
    }

    accept(visitor){
        visitor.visitMinimaxMachinePlayer();
    }

    setColumn(){
        let cost = this.#maximizePlay(0,this.getBoard());
        //logger.info("bestColumn: " + cost[0]);
        this.getCoordinate().setColumn(cost[0]);
    }
    
    #maximizePlay(steps, board) {
        if (this.#isEnd(steps, board)) return this.#getEndCost(board, MinimaxMachinePlayer.#MIN_COST);
        let max = [undefined, MinimaxMachinePlayer.#MIN_COST];
        let emptyColumns = board.getEmptyColumns();
        for (let column of emptyColumns) {
            let newBoard = board.clone();
            newBoard.putCoordinate(column, this.getColor());
            //logger.info("maximizePlay steps: " + steps + ", maxCost: " + max[1] + ", column: " + column);
            //logger.info(newBoard.toString());
            let next_move = this.#minimizePlay(steps + 1, newBoard);
            //logger.info("maximizePlay steps: " + steps + ", maxCost: " + max[1] + ", nextMoveCost: " + next_move[1]+ ", column: " + column);
            if (max[0] == undefined || next_move[1] > max[1]) {
                max[0] = column;
                max[1] = next_move[1];
                //logger.info("maximizePlay steps: " + steps + ", newCost: " + max[1] + ", newColumn: " + max[0]);
            }
        }
        return max;
    }

    #minimizePlay(steps, board) {
        //break
        if (this.#isEnd(steps, board)) return this.#getEndCost(board, MinimaxMachinePlayer.#MAX_COST);

        // Column, Score
        let min = [undefined, MinimaxMachinePlayer.#MAX_COST];

        // For all possible moves
        let emptyColumns = board.getEmptyColumns();
        for (let column of emptyColumns) {
            let newBoard = board.clone();
            newBoard.putCoordinate(column, this.#opositeColor);
            //logger.info("minimizePlay steps: " + steps + ", minCost: " + min[1] + ", columnCost: " + min[0] + ", column: " + column);
            //logger.info(newBoard.toString());
            let next_move = this.#maximizePlay(steps + 1, newBoard); // Recursive calling
            //logger.info("minimizePlay steps: " + steps + ", minCost: " + min[1] + ", nextMoveCost: " + next_move[1] + ", column: " + column);
            // Evaluate new move
            if (min[0] == undefined || next_move[1] < min[1]) {
                min[0] = column;
                min[1] = next_move[1];
                //logger.info("minimizePlay steps: " + steps + ", newCost: " + min[1] + ", newColumn: " + min[0]);
            }
        }
        return min;
    }

    #isEnd(steps, board) {
        return steps ===  MinimaxMachinePlayer.#MAX_STEPS || board.isFinished();
    }

    #getEndCost(board, cost){
        let result = [undefined, cost];
        if(!board.isLastTokenInLine()){
            result[1] = (this.#getBestScore(board) / MinimaxMachinePlayer.#MAX_LIMIT);
        }
        //logger.info(`${cost ===MinimaxMachinePlayer.#MAX_COST ? 'minimizePlay':'maximizePlay'} END cost: ${result[1]}`);
        return result; 
    }

    #getBestScore(board){
        let point = 0;
        for (let row = 0; row < board.getMaxRows() - 3; row++) {
            for (let column = 0; column < board.getMaxColumns(); column++) {
                point += this.#getInLinePoint(board, row, column, 1, 0);
            }    
        }
        for (let row = 0; row < board.getMaxRows(); row++) {
            for (let column = 0; column < board.getMaxColumns() - 3; column++) { 
                point += this.#getInLinePoint(board, row, column, 0, 1); 
            } 
        }
        for (let row = 0; row < board.getMaxRows() - 3; row++) {
            for (let column = 0; column < board.getMaxColumns() - 3; column++) {
                point += this.#getInLinePoint(board, row, column, 1, 1);
            }            
        }
        for (let row = 3; row < board.getMaxRows(); row++) {
            for (let column = 0; column <= board.getMaxColumns() - 4; column++) {
                point += this.#getInLinePoint(board, row, column, -1, +1);
            }
        }
        //logger.info(`Board.getLastTokenPoints-> Total points: ${point}`);
        return point;
    }
    
    #getInLinePoint(board, row, column, delta_y, delta_x) {
        let point = 0;
        //let stringLogger = `Board.isInLinePoint-> Coordination (${row},${column}) Direction (${delta_y},${delta_x})`
        for (let i = 0; i < Line.LENGTH; i++) {
            if (board.getToken(row, column) === this.getColor()) {
                point += 1;
            }
            row += delta_y;
            column += delta_x;
        }
        //logger.info(`${stringLogger} point: ${point}`);
        return point;
    }

}