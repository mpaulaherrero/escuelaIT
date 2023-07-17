const { Console } = require("console-mpds");
const console = new Console();

initMastermindView().play();

function initMastermindView() {
    const that = {
         askContinue(){
             let error;
             let answer;
             do {
               answer = console.readString(`Do you want to continue? (y/n): `);
               error = answer !== `y` && answer !== `n`;
               if (error) {
                 console.writeln(`Please, reply "y" or "n"`);
               }
             } while (error);
             return answer === `y`;
         }
    }
    return {
         play(){
             do {
                 initGameView().play();
             } while (that.askContinue());
         }
     }
 }

function initGameView() {
    const that = {
        game: initGame(),

        showResults(){
            console.writeln(`\n${this.game.getProposedCombinationsLength()} attempt(s):\n****`);
            for (let i = 0; i < this.game.getProposedCombinationsLength(); i++) {
                console.writeln(this.game.proposedCombinationToString(i));
            }
        },
        readProposedCombination(){
            this.game.setLastProposedCombination(initProposedCombinationView().readValue());
        }
    }

    return {
        play(){
            console.writeln(`----- MASTERMIND -----`);
            do {
                that.showResults();
                that.readProposedCombination();
                that.game.compareSecretCombination();
            } while (!that.game.checkEnd());
            that.showResults();
            const STATES_MESSAGE = ["You've lost!!! :-(", "You've won!!! ;-)","You're playing"];
            console.writeln(STATES_MESSAGE[that.game.getState()]);
        }
    }
}

function initGame(){
    const that = {
        state: 2,

        proposedCombinations: [],
        secretCombination: initSecretCombination()
    }

    return {
        getProposedCombinationsLength(){
            return that.proposedCombinations.length;
        },
        proposedCombinationToString(position){
            return that.proposedCombinations[position].toString();
        },
        compareSecretCombination(){
            that.proposedCombinations[that.proposedCombinations.length-1].compare(that.secretCombination);
        },
        setLastProposedCombination(proposedCombination){
            that.proposedCombinations[that.proposedCombinations.length] = proposedCombination;
        },
        checkEnd(){
            const STATES = { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 };
            const MAX_ATTEMPTS = 10;
        
            if (that.proposedCombinations[that.proposedCombinations.length-1].isWinner()) {
                that.state = STATES.PLAYER_WIN
            } else if (that.proposedCombinations.length === MAX_ATTEMPTS) {
                that.state  = STATES.PLAYER_LOOSE;
            } else{
                that.state = STATES.PLAYER_IN_GAME;
            }
            return that.state !== STATES.PLAYER_IN_GAME;
        },
        getState(){
            return that.state;
        }
    }
}

function initCombination(){
    const that = {
       COMBINATION_LENGTH: 4,
       value: "",

       colors: initColors()

    }
    return {
        getLength(){
            return that.COMBINATION_LENGTH;
        },
        setValue(value){
            that.value=value;
        },
        getValue(){
            return that.value;
        },
        validateLength(){
            return that.COMBINATION_LENGTH !== that.value.length;
        },
        validateColors() {
            let validColor = true;
            for (let i = 0; validColor && i < that.value.length; i++) {
              validColor = that.colors.validColor(that.value[i]);
            }
            return validColor;
        },
        validateUniqueColors() {
            let uniqueColor = true;
            for (let i = 0; uniqueColor && i < that.value.length; i++) {
              for (let j = i + 1; uniqueColor && j < that.value.length; j++) {
                uniqueColor = that.value[j] !== that.value[i];
              }
            }
            return uniqueColor;
        },
        hasColor(color){
            for (let i = 0; i < that.value.length; i++) {
                if (that.value[i] === color) {
                  return true;
                }
            }
            return false;
        },
        getRandomColor(){
            return that.colors.getRandomColor();
        },
        colorsToString(){
            return that.colors.toString();
        }
    }
}

function initSecretCombination(){
    const that = {
        combination: initCombination(),
        generate(){
            for (let i = 0; i < this.combination.getLength(); i++) {
                let uniqueColor;
                 do {
                    let randomColor = this.combination.getRandomColor();
                    let originalValue = this.combination.getValue();
                    this.combination.setValue(originalValue + randomColor);
                    uniqueColor = this.combination.validateUniqueColors();
                    if (!uniqueColor) {
                        this.combination.setValue(originalValue);
                    }
                } while (!uniqueColor);
            }
        }
    }
    that.generate();
    //console.writeln(`The secret combination is ${that.combination.getValue()}`);
    return that.combination;
}

function initProposedCombinationView(){
    const that = {
        proposedCombination: initProposedCombination(),
    }

    return {
        readValue(){
            let correctProposedCombination;
            do {
                that.proposedCombination.setValue(console.readString(`Propose a combination: `));
                const errors = that.proposedCombination.checkErrors();
                correctProposedCombination = errors.length === 0;
                if (!correctProposedCombination) {
                    for (let i = 0; i < errors.length; i++) {
                        console.writeln(errors[i]);
                    }
                }
            } while (!correctProposedCombination);
            return that.proposedCombination;
        }
    }

}

function initProposedCombination(){
    const that = {
        combination: initCombination(),
        result: initResult()
    }
    
    return {
        setValue(value){
            that.combination.setValue(value);
        },
        checkErrors(){
            let errors = [];
            if (that.combination.validateLength()) {
                errors[errors.length] = `Wrong proposed combination length`;
            }
            if (!that.combination.validateColors()) {
                errors[errors.length] = `Wrong colors, they must be: ${that.combination.colorsToString()}`;
            }
            if (!that.combination.validateUniqueColors()) {
                errors[errors.length] = `Wrong proposed combination, at least one color is repeated`;
            }
            return errors;
        },
        compare(secretCombination){
            for (let i = 0; i < that.combination.getLength(); i++) {
                if (secretCombination.getValue()[i] === that.combination.getValue()[i]) {
                   that.result.addBlacks();
                } else {
                    if (secretCombination.hasColor(that.combination.getValue()[i])) {
                        that.result.addWhites();
                    }
                }
            }
            that.result.setWinner(that.combination.getLength());
        },
        isWinner(){
            return that.result.isWinner();
        },
        toString(){
            return `${that.combination.getValue()}  --> ${that.result.getBlacks()} blacks and ${that.result.getWhites()} whites`;
        }
    }
}

function initResult(){
    const that = {
        blacks: 0,
        whites: 0,
        isWinner: false
    }

    return {
        addWhites(){
            that.whites++;
        },
        addBlacks(){
            that.blacks++;
        },
        getBlacks(){
            return that.blacks;
        },
        getWhites(){
            return that.whites;
        },
        setWinner(combinationLength){
            that.isWinner = that.blacks === combinationLength;
        },
        isWinner(){
            return that.isWinner;
        }
    }
}

function initColors(){
    const that = {
        COLORS: "rgybmc"
    }

    return {
        getRandomColor(){
            return that.COLORS[parseInt(Math.random() * that.COLORS.length)];
        },
        validColor(color){
            for (let i = 0; i < that.COLORS.length; i++) {
                if (that.COLORS[i] === color) {
                  return true;
                }
            }
            return false;
        },
        toString(){
            return that.COLORS;
        }
    }
}
