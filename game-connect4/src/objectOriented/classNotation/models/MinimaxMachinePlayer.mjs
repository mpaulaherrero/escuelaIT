import { MachinePlayer } from "./MachinePlayer.mjs";
import { Console } from 'console-mpds';

export class MinimaxMachinePlayer extends MachinePlayer {

    static #MAX_STEPS = 1;
    static #MAX_COST = 1;
    static #OTHER_COST = 0;
    static #MIN_COST = -1;

    #opositeColor
    #bestColumn 
    #console = new Console();

    constructor(color, board) {
        super(color, board);
        this.#opositeColor = this.getColor().getOpposite();
    }

    accept(visitor){
        visitor.visitMinimaxMachinePlayer();
    }

    //getCost(-1, this.getColor(), MinimaxMachinePlayer.#MIN_COST, this.#getMinCost, this.#nextColumnCost (hay que hacer bestColumn general y no se revisa el if)    
    setColumn(){
        this.#bestColumn = this.board.getEmptyColumns()[0];
        this.#console.writeln('bestColumn: ' + this.#bestColumn );
        let maxCost = MinimaxMachinePlayer.#MIN_COST;
        let emptyColumns = this.board.getEmptyColumns();
        for (let column of emptyColumns) {
            this.#console.writeln('setColumn column: ' + column + ', Token: ' + this.getColor().getCode() + "\n");
            this.board.putCoordinate(column, this.getColor());
            let minCost = this.#getMinCost(0);
            this.board.removeCoordinate(column);
            this.#console.writeln('setColumn minCost: ' + minCost + ', maxCost: ' + maxCost );
            if (minCost > maxCost) {
                maxCost = minCost;
                this.#bestColumn = column;
            }
            this.#console.writeln('bestColumn: ' + this.#bestColumn + ', maxCost: ' + maxCost);
        }
        this.getCoordinate().setColumn(this.#bestColumn);
    }
    
    //getCost(steps,this.#opositeColor, MinimaxMachinePlayer.#MAX_COST, this.#getMaxCost, this.#nextMinCost)
    #getMinCost(steps) {
        if (this.#isEnd(steps)) {
            this.#console.writeln('getMinCost isEnd steps: ' + steps);
            return this.#getEndCost(this.getColor());
        }
        let minCost = MinimaxMachinePlayer.#MAX_COST;
        let emptyColumns = this.board.getEmptyColumns();
        for (let column of emptyColumns) {
            this.#console.writeln('getMinCost column: ' + column + ', Token: ' + this.#opositeColor.getCode() + "\n");
            this.board.putCoordinate(column, this.#opositeColor);
            let maxCost = this.#getMaxCost(steps + 1);
            this.board.removeCoordinate(column);
            if (maxCost < minCost){
                minCost = maxCost;
            }
            this.#console.writeln('getMinCost minCost: ' + minCost + ', maxCost: ' + maxCost );
        }
        return minCost;
    }

    //getCost(steps, this.getColor(), MinimaxMachinePlayer.#MIN_COST, this.#getMinCost, this.#nextMaxCost)
    #getMaxCost(steps) {
        if (this.#isEnd(steps)) {
            //this.#console.writeln('getMaxCost isEnd steps: ' + steps);
            return this.#getEndCost(this.#opositeColor);
        }
        let maxCost = MinimaxMachinePlayer.#MIN_COST;
        let emptyColumns = this.board.getEmptyColumns();
        for (let column of emptyColumns) {
            this.#console.writeln('getMaxCost column: ' + column + ', Token: ' + this.getColor().getCode() + "\n");
            this.board.putCoordinate(column, this.getColor());
            let minCost = this.#getMinCost(steps + 1);
            this.board.removeCoordinate(column);
            if (minCost > maxCost){
                maxCost = minCost;
            }
            this.#console.writeln('getMaxCost minCost: ' + minCost + ', maxCost: ' + maxCost );
        }
        return maxCost;
    }

    #isEnd(steps) {
        //this.#console.writeln('isEnd steps: ' + steps);
        return steps == MinimaxMachinePlayer.#MAX_STEPS || this.isFinished();
    }

    #getEndCost(color) {
        //this.#console.writeln('getEndCost LastToken: ' + this.board.getLastCoordinate().toString());
        if (this.isAWinner() && this.getColor() == color) {
            //this.#console.writeln('getEndCost Winner: ' + color.getCode());
            return MinimaxMachinePlayer.#MAX_COST;
        }
        if (this.isAWinner() && this.#opositeColor == color) {
            //this.#console.writeln('getEndCost Winner: ' + color.getCode());
            return MinimaxMachinePlayer.#MIN_COST;
        }
        //this.#console.writeln('getEndCost return OTHER_COST: '+ MinimaxMachinePlayer.#OTHER_COST);
        return MinimaxMachinePlayer.#OTHER_COST;
    }

    isFinished() {
        return this.board.isComplete() || this.board.isLastTokenInLine();
    }

    isAWinner() {
        return this.board.isLastTokenInLine();
    }
    
    #getCost(steps, color, costLimit, getNextCost, nextCost) {
        if (this.#isEnd(steps)) {
            return this.#getEndCost(color.getOpposite());
        }
        let cost = costLimit;
        let emptyColumns = this.board.getEmptyColumns();
        for (let column of emptyColumns) {
            this.board.putCoordinate(column, color);
            let oppositeCost = getNextCost(steps + 1);
            this.board.removeCoordinate(column);
            cost = nextCost(cost, oppositeCost, column);
        }
        return cost;
    }

    #nextColumnCost(maxCost, minCost, column){
        if (minCost > maxCost) {
            maxCost = minCost;
            this.#bestColumn = column;
        }
        return maxCost;
    }

    #nextMinCost(minCost, maxCost, column){
        if (maxCost < minCost){
            minCost = maxCost;
        }
        return minCost;
    }

    #nextMaxCost(maxCost, cost, column){
        if (cost > maxCost){
            maxCost = cost;
        }
        return maxCost;
    }

}