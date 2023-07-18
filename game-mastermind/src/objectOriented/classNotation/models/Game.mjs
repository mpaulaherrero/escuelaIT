import { SecretCombination } from './SecretCombination.mjs'

export class Game {

    #state
    #proposedCombinations
    #secretCombination

    constructor(){
        this.#state = 2;
        this.#proposedCombinations = [];
        this.#secretCombination = new SecretCombination().create();
    }

    getProposedCombinationsLength(){
        return this.#proposedCombinations.length;
    }

    proposedCombinationToString(position){
        return this.#proposedCombinations[position].toString();
    }

    compareSecretCombination(){
        this.#proposedCombinations[this.#proposedCombinations.length-1].compare(this.#secretCombination);
    }

    setLastProposedCombination(proposedCombination){
        this.#proposedCombinations[this.#proposedCombinations.length] = proposedCombination;
    }

    checkEnd(){
        const STATES = { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 };
        const MAX_ATTEMPTS = 10;
    
        if (this.#proposedCombinations[this.#proposedCombinations.length-1].isWinner()) {
            this.#state = STATES.PLAYER_WIN
        } else if (this.#proposedCombinations.length === MAX_ATTEMPTS) {
            this.#state  = STATES.PLAYER_LOOSE;
        } else{
            this.#state = STATES.PLAYER_IN_GAME;
        }
        return this.#state !== STATES.PLAYER_IN_GAME;
    }

    getState(){
        return this.#state;
    }

    getSecretCombination(){
        return this.#secretCombination;
    }
}