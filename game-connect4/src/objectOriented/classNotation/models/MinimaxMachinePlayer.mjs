import { MachinePlayer } from "./MachinePlayer.mjs";
//import { Console } from 'console-mpds';

export class MinimaxMachinePlayer extends MachinePlayer {

    static #MAX_STEPS = 3; 
    static #MAX_COST = 1;
    static #OTHER_COST = 0;
    static #MIN_COST = -1;

    #opositeColor
    #bestColumn 
    //#console = new Console();

    constructor(color, board) {
        super(color, board);
        this.#opositeColor = this.getColor().getOpposite();
    }

    accept(visitor){
        visitor.visitMinimaxMachinePlayer();
    }

    setColumn(){
        const emptyColumns = this.board.getEmptyColumns();
        this.#bestColumn = emptyColumns[0];
        //this.#console.writeln('bestColumn: ' + this.#bestColumn );
        const cost = this.getCost(-1, this.getColor(), MinimaxMachinePlayer.#MIN_COST, this.getMinCost, this.nextColumnCost);
        if (cost === MinimaxMachinePlayer.#OTHER_COST && this.#bestColumn === emptyColumns[0]){
            this.#bestColumn = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
        }
        this.getCoordinate().setColumn(this.#bestColumn);
    }
    
    getCost(steps, color, costLimit, getNextCost, nextCost) {
        if (this.isEnd(steps)) {
            const endCost = this.getEndCost(color.getOpposite())
            //this.#console.writeln('steps: ' + steps + ' isEnd. endCost: ' + endCost );
            return endCost;
        }
        let cost = costLimit;
        let emptyColumns = this.board.getEmptyColumns();
        for (let column of emptyColumns) {
            this.board.putCoordinate(column, color);
            //this.#console.writeln(this.board.toString());
            let oppositeCost = getNextCost(steps + 1, this);
            this.board.removeCoordinate(column);
            cost = nextCost(cost, oppositeCost, column, this);
            //this.#console.writeln('steps: ' + steps + ', cost: ' + cost + ', oppositeCost: ' + oppositeCost );
        }
        return cost;
    }

    isEnd(steps) {
        return steps ==  MinimaxMachinePlayer.#MAX_STEPS || this.isFinished();
    }

    isFinished() {
        return this.board.isComplete() || this.board.isLastTokenInLine();
    }

    getEndCost(color) {
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

    isAWinner() {
        return this.board.isLastTokenInLine();
    }

    getMinCost(steps,self) {
        return self.getCost(steps,self.#opositeColor, MinimaxMachinePlayer.#MAX_COST, self.getMaxCost, self.nextMinCost);
    }

    getMaxCost(steps,self) {
        return self.getCost(steps, self.getColor(), MinimaxMachinePlayer.#MIN_COST, self.getMinCost, self.nextMaxCost);
    }
    
    nextColumnCost(maxCost, minCost, column, self){
        if (minCost > maxCost) {
            maxCost = minCost;
            self.#bestColumn = column;
        }
        return maxCost;
    }

    nextMinCost(minCost, maxCost, column, self){
        if (maxCost < minCost){
            minCost = maxCost;
        }
        return minCost;
    }

    nextMaxCost(maxCost, cost, column, self){
        if (cost > maxCost){
            maxCost = cost;
        }
        return maxCost;
    }

}