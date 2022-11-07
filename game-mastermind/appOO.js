const { Console } = require("console-mpds");
const console = new Console();

initMastermind().play();

function initMastermind() {
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
                 initGame().play();
             } while (that.askContinue());
         }
     }
 }

function initGame(){
    const that = {
        state: 2,

        proposedCombinations: [],
        secretCombination: initSecretCombination(),
        
        readProposeCombination(){
            const proposedCombination = initProposedCombination();
            let correctProposedCombination;
            do {
                proposedCombination.readValue();
                const errors = proposedCombination.checkErrors();
                correctProposedCombination = errors.length === 0;
                if (!correctProposedCombination) {
                   this.printErrors(errors);
                }
            } while (!correctProposedCombination);
            this.proposedCombinations[this.proposedCombinations.length] = proposedCombination;
        },
        compareSecretCombination(){
            this.proposedCombinations[that.proposedCombinations.length-1].compare(that.secretCombination);
        },
        checkEnd(){
            const STATES = { PLAYER_LOOSE: 0, PLAYER_WIN: 1, PLAYER_IN_GAME: 2 };
            const MAX_ATTEMPTS = 10;
    
            if (this.proposedCombinations[that.proposedCombinations.length-1].isWinner()) {
                this.state = STATES.PLAYER_WIN
            } else if (this.proposedCombinations.length === MAX_ATTEMPTS) {
                this.state  = STATES.PLAYER_LOOSE;
            } else{
                this.state = STATES.PLAYER_IN_GAME;
            }
            return this.state !== STATES.PLAYER_IN_GAME;
        },
        welcome(){
            console.writeln(`----- MASTERMIND -----`);
        },
        showResults(){
            console.writeln(`\n${that.proposedCombinations.length} attempt(s):\n****`);
            for (let i = 0; i < that.proposedCombinations.length; i++) {
                console.writeln(that.proposedCombinations[i].toString());
            }
        },
        printErrors(errors){
            for (let i = 0; i < errors.length; i++) {
                console.writeln(errors[i]);
            }
        },
        farewell(){
            const STATES_MESSAGE = ["You've lost!!! :-(", "You've won!!! ;-)","You're playing"];
            console.writeln(STATES_MESSAGE[this.state]);
        }
    }

    return {
        play(){
            that.welcome();
            do {
                that.showResults();
                that.readProposeCombination();
                that.compareSecretCombination();
            } while (!that.checkEnd());
            that.showResults();
            that.farewell();
        }
    }
}

function initCombination(){
    const that = {
       COMBINATION_LENGHT: 4,
       value: "",

       colors: initColors()

    }
    return {
        getLenght(){
            return that.COMBINATION_LENGHT;
        },
        setValue(value){
            that.value=value;
        },
        getValue(){
            return that.value;
        },
        validateLenght(){
            return that.COMBINATION_LENGHT !== that.value.length;
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
        getColorsString(){
            return that.colors.toString();
        }
    }
}

function initSecretCombination(){
    const that = {
        combination: initCombination(),
        generate(){
            for (let i = 0; i < this.combination.getLenght(); i++) {
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

function initProposedCombination(){
    const that = {
        combination: initCombination(),
        result: initResult()
    }
    
    return {
        readValue(){
            that.combination.setValue(console.readString(`Propose a combination: `));
        },
        checkErrors(){
            let errors = [];
            if (that.combination.validateLenght()) {
                errors[errors.length] = `Wrong proposed combination length`;
            }
            if (!that.combination.validateColors()) {
                errors[errors.length] = `Wrong colors, they must be: ${that.combination.getColorsString()}`;
            }
            if (!that.combination.validateUniqueColors()) {
                errors[errors.length] = `Wrong proposed combination, at least one color is repeated`;
            }
            return errors;
        },
        compare(secretCombination){
            for (let i = 0; i < that.combination.getLenght(); i++) {
                if (secretCombination.getValue()[i] === that.combination.getValue()[i]) {
                   that.result.addBlacks();
                } else {
                    if (secretCombination.hasColor(that.combination.getValue()[i])) {
                        that.result.addWhites();
                    }
                }
            }
            that.result.setWinner(that.combination.getLenght());
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
        setWinner(combinationLenght){
            that.isWinner = that.blacks === combinationLenght;
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
